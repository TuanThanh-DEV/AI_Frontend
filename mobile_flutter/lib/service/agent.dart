import 'dart:convert';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:timecprj/UI/pages/method_login_page.dart';
import 'package:timecprj/service/middleware.dart';
import 'package:http/http.dart' as http;
import 'dart:convert' as convert;

// const backendUrl = "http://10.0.2.2:8080/api";

final localStorage = localStorageMiddleware();

// function auth_service
class AuthService {

  var asyncRequest = AsyncRequest();

  dynamic backendUrl = localStorage.getItem("urlBackend");

  Future<String> login(String phone, String password) async {
    try{
      final responseUserLogin = await http.get(Uri.parse('$backendUrl/userpatient/login?phone=$phone&password=$password'));
      if(responseUserLogin.statusCode == 200){
        var jsonResponseUserLogin = convert.jsonDecode(responseUserLogin.body) as Map<String, dynamic>;
        String result = jsonResponseUserLogin['resultData'];
        if(result == "Sai mật khẩu" || result == "Không tìm thấy tài khoản này"){
          return "Sai thông tin đăng nhập, vui lòng kiểm tra lại.";
        } else {
          var jsonResponseToken = convert.jsonDecode(jsonResponseUserLogin['resultData']) as Map<String, dynamic>;
          localStorage.setItem('access_token', jsonResponseToken['access_token']);
          localStorage.setItem('refresh_token', jsonResponseToken['refresh_token']);
          localStorage.setItem('expires_in', jsonResponseToken['expires_in']);
          getCurrentUser("normal");
          // print(currentUser);
          // Map<String, dynamic>? jsonMap = json.decode(localStorage.getItem('currentUser'));
          // print(jsonMap?['idPatient']);
          return "Đăng nhập thành công";
        }
      } else {
          return "Có lỗi khi kết nối với server.";
      }
    } catch (e) {
      return "Đường dẫn backend không tồn tại";
    }
  }

  Future<String> loginGoogle() async {
      GoogleSignInAccount? googleUser = await GoogleSignIn().signIn();
      if (googleUser == null) {
        return "";
      } else {
        GoogleSignInAuthentication? googleAuth = await googleUser.authentication;
        if (googleAuth == false || (googleAuth.accessToken == null && googleAuth.idToken == null)) {
          return "Có lỗi khi đăng nhập với tài khoản Google";
        } else {
          AuthCredential credential = GoogleAuthProvider.credential(
            accessToken: googleAuth.accessToken,
            idToken: googleAuth.idToken,
          );
          UserCredential userCredential = await FirebaseAuth.instance.signInWithCredential(credential);
          User? user = userCredential.user;
          String? email = user?.email;
          String? accesstoken = googleAuth.accessToken;
          final responseUserGoogleLogin = await http.get(Uri.parse('$backendUrl/userpatient/logingoogle?email=$email&accesstoken=$accesstoken'));
          if(responseUserGoogleLogin.statusCode == 200){
            var jsonResponseUserGoogleLogin = convert.jsonDecode(responseUserGoogleLogin.body) as Map<String, dynamic>;
            String result = jsonResponseUserGoogleLogin['resultData'];
            if(result == "Không tìm thấy tài khoản này"){
              GoogleSignIn().signOut();
              return result;
            } else {
              var jsonResponseGoogleToken = convert.jsonDecode(jsonResponseUserGoogleLogin['resultData']) as Map<String, dynamic>;
              localStorage.setItem('access_token', jsonResponseGoogleToken['access_token']);
              localStorage.setItem('refresh_token', jsonResponseGoogleToken['refresh_token']);
              getCurrentUser("google");
              return "Đăng nhập bằng Google thành công";
            }
          } else {
              return "Có lỗi khi kết nối với server.";
          }
        }
      }
  }

  Future<void> getCurrentUser(String type) async {
    Map<String, dynamic> currentUser = await asyncRequest.apiMethodGet('auth/getCurrentUserPatient?typeuser=$type');
    localStorage.setItem('currentUser', json.encode(currentUser));
  }

  Future<void> logout (BuildContext context) async {
    localStorage.clearStorage();
    GoogleSignIn().signOut();
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => const methodLoginPage()),
    );
  }

}

// function asyncRequest

class AsyncRequest {

  dynamic backendUrl = localStorage.getItem("urlBackend");

  dynamic tokenPlugin () {
    var token = localStorage.getItem('access_token');
    final Map<String, String> headers;
    if(token != null){
      headers = {
        'Authorization': 'Bearer $token',
      };
      return headers;
    }
    return "";
  }


  Future<Map<String,dynamic>> apiMethodGet(String url) async {

    print(tokenPlugin());

    final response = await http.get(
      Uri.parse('$backendUrl/$url'),
      headers: tokenPlugin()
    );

    if (response.statusCode == 200) {
      final Map<String, dynamic> data = convert.jsonDecode(response.body);
      return data;
    } else {
      Map<String, dynamic> data = json.decode('{"resultData": "Có lỗi khi kết nối với server."}');
      return data;
    }
  }

  Future<Map<String, dynamic>> apiMethodPost(String url, Map<String, dynamic> body) async {
      final response = await http.post(
        Uri.parse('$backendUrl/$url'),
        headers: {
          'Content-Type': 'application/json',
          ...tokenPlugin()
        },
        body: jsonEncode(body),
      );

      if (response.statusCode == 200) {
        final Map<String, dynamic> data = convert.jsonDecode(response.body);
        return data;
      } else {
         Map<String, dynamic> data = json.decode('{"resultData": "Có lỗi khi kết nối với server."}');
      return data;
      }
    }

}