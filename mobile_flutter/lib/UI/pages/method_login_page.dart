import 'package:flutter/material.dart';
import 'package:get_storage/get_storage.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:intl/intl.dart';
import 'package:timecprj/UI/pages/home_page.dart';
import 'package:timecprj/UI/pages/login_page.dart';
import 'package:timecprj/UI/pages/regulations_page.dart';
import 'package:timecprj/UI/widgets/loading_widget.dart';
import 'package:timecprj/service/agent.dart';
import 'package:timecprj/service/middleware.dart';

class methodLoginPage extends StatefulWidget {
  const methodLoginPage({super.key});

  @override
  State<StatefulWidget> createState() {
    return methodLoginPageState();
  }
}

class methodLoginPageState extends State<methodLoginPage> {
  dynamic token = "";
  @override
  void initState() {
    super.initState();
    Future.delayed(Duration.zero, () {
      checkLogin();
    });
  }

  checkLogin() async {
    final box = GetStorage();
    String accessToken = localStorage.getItem("access_token");
    dynamic expriresIn = localStorage.getItem("expires_in");
    DateTime currentDate = DateTime.now();
    DateFormat format = DateFormat("E MMM dd HH:mm:ss 'ICT' yyyy");
    // Chuyển đổi chuỗi ngày tháng thành đối tượng DateTime
    DateTime dateLocal = format.parse(expriresIn);
    bool isBeforeOrSame = currentDate.isBefore(dateLocal);
    setState(() {
      token = accessToken;
    });
    if (accessToken != "" && isBeforeOrSame) {
      Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => const homePage(),
          )
        );
    }
  }

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: ListView(children: [
          Center(
            child: Column(
              children: [
                HeaderMethodLoginPage(),
                //ImageMethodLoginPage(),
                AreaButtonMethodLoginPage()
              ],
            ),
          ),
        ]),
      ),
    );
  }
}

class HeaderMethodLoginPage extends StatelessWidget {
  const HeaderMethodLoginPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.only(top: 20, bottom: 10),
      width: double.infinity,
      child: Column(
        children: [
          Image.asset(
            'images/logo-timec.png',
            width: 250,
          ),
          const Text(
            'ĐĂNG KÝ KHÁM BỆNH ONLINE',
            style: TextStyle(
              color: Color(0xFF008D8C),
              fontSize: 18,
              fontWeight: FontWeight.w400,
            ),
          ),
          const Padding(
            padding: EdgeInsets.only(top: 15.0),
            child: Text(
              'CHÀO MỪNG BẠN ĐẾN VỚI ỨNG DỤNG',
              style: TextStyle(
                color: Color(0xFF008D8C),
                fontSize: 15,
                fontWeight: FontWeight.w400,
              ),
            ),
          ),
          const Padding(
            padding: EdgeInsets.only(right: 50.0, left: 50.0),
            child: Text(
              'Đăng ký khám bệnh trước ngày khám của Phòng Khám Đa Khoa Quốc Tế TIMEC',
              textAlign: TextAlign.center,
              style: TextStyle(
                color: Color(0xFF008D8C),
                fontSize: 15,
                fontWeight: FontWeight.w400,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class ImageMethodLoginPage extends StatelessWidget {
  const ImageMethodLoginPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(top: 50),
      child: Image.asset(
        'images/doctor.png',
        cacheHeight: 500,
      ),
    );
  }
}

class AreaButtonMethodLoginPage extends StatefulWidget {
  const AreaButtonMethodLoginPage({super.key});
  @override
  State<StatefulWidget> createState() {
    return AreaButtonMethodLoginPageState();
  }
}

class AreaButtonMethodLoginPageState extends State<AreaButtonMethodLoginPage> {
  final localStorage = localStorageMiddleware();
  String infoError = "";
  String token = "";
  BuildContext? dialogContext;

  // function login google
  signInWithGoogle(BuildContext context) async {
    bool checkLogin = false;
    var agentAuthService = AuthService();
    showLoading(true);
    String result = await agentAuthService.loginGoogle();
    setState(() {
      infoError = result;
      token = localStorage.getItem('refresh_token');
    });
    if (result.toString() != "Đăng nhập bằng Google thành công" &&
        result.toString() != "") {
      checkLogin = true;
      WidgetsBinding.instance.addPostFrameCallback((_) async {
        showLoading(false);
        showMyDialog();
      });
    } else if (result.toString() != "") {
      checkLogin = true;
      showLoading(false);
      // ignore: use_build_context_synchronously
      Navigator.push(
        context,
        MaterialPageRoute(builder: (context) => const regulationsPage()),
      );
    }
    if (!checkLogin) {
      showLoading(false);
    }
  }

  // function logout google
  logoutWithGoogle() async {
    var agentAuthService = AuthService();
    agentAuthService.logout(context);
  }

  // function noti error login
  Future<void> showMyDialog() async {
    return showDialog<void>(
      context: context,
      barrierDismissible: false, // user must tap button!
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Center(
            child: Text(
              'THÔNG BÁO',
              style: TextStyle(color: Colors.red, fontWeight: FontWeight.bold),
            ),
          ),
          content: SingleChildScrollView(
            child: ListBody(
              children: <Widget>[
                Center(child: Text(infoError.toString())),
                const Center(child: Text('Vui lòng nhập lại')),
              ],
            ),
          ),
          actions: <Widget>[
            Center(
              child: ElevatedButton(
                style: ButtonStyle(
                  backgroundColor: MaterialStateProperty.all<Color>(Colors.red),
                  foregroundColor:
                      MaterialStateProperty.all<Color>(Colors.white),
                  minimumSize: MaterialStateProperty.all<Size>(
                    const Size(200, 40.0), // Độ rộng full width và độ cao 50.0
                  ),
                ),
                onPressed: () {
                  Navigator.of(context).pop();
                },
                child: const Text(
                  'ĐÓNG',
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 17),
                ),
              ),
            ),
          ],
        );
      },
    );
  }

  // function loading login google
  Future<void> showLoading(bool status) async {
    if (status) {
      return showDialog<void>(
        context: context,
        barrierDismissible: false,
        builder: (BuildContext context) {
          dialogContext = context;
          return LoadingDialog();
        },
      );
    } else {
      if (dialogContext != null) {
        Navigator.of(dialogContext!)
            .pop(); // Đóng AlertDialog nếu status là false
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;
    double screenHeight = MediaQuery.of(context).size.height;
    return Container(
      width: double.infinity,
      child: Column(
        children: [
          Container(
            child: Image.asset('images/doctor.png'),
          ),
          const SizedBox(
            height: 20,
          ),
          SizedBox(
            width: screenWidth,
            height: 50,
            child: Container(
              padding: const EdgeInsets.only(right: 20, left: 20),
              child: TextButton(
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) => const loginPage()),
                    );
                  },
                  style: TextButton.styleFrom(
                    backgroundColor: const Color(0xFF008D8C),
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(5.0), // BorderRadius
                    ),
                  ),
                  child: const Text(
                    'Đăng nhập bằng số điện thoại',
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.w400),
                  )),
            ),
          ),
          const SizedBox(
            height: 15,
          ),
          const Text(
            'HOẶC',
            style: TextStyle(color: Color(0xFF999999), fontSize: 18),
          ),
          const SizedBox(
            height: 15,
          ),
          SizedBox(
            width: screenWidth,
            height: 50,
            child: Container(
              padding: const EdgeInsets.only(right: 20, left: 20),
              child: TextButton(
                  onPressed: () {
                    signInWithGoogle(context);
                  },
                  style: TextButton.styleFrom(
                      backgroundColor: Colors.white,
                      foregroundColor: Colors.black,
                      shape: RoundedRectangleBorder(
                        borderRadius:
                            BorderRadius.circular(5.0), // BorderRadius
                      ),
                      side: const BorderSide(color: Colors.black, width: 1)),
                  child: const Text(
                    'Đăng nhập bằng tài khoản Google',
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.w400),
                  )),
            ),
          ),
        ],
      ),
    );
  }
}
