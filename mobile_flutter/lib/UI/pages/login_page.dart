import 'package:flutter/material.dart';
import 'package:timecprj/UI/pages/regulations_page.dart';
import 'package:timecprj/UI/widgets/loading_widget.dart';
import 'package:timecprj/service/agent.dart';

class loginPage extends StatefulWidget {
  const loginPage({Key? key}) : super(key: key);

  @override
  State<loginPage> createState() => _loginPageState();
}

class _loginPageState extends State<loginPage> {
  TextEditingController textUrlBackend = TextEditingController();
  final _formKey = GlobalKey<FormState>();
  bool isObscurePassword = true;
  bool? check1 = false;
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  String infoError = "";
  BuildContext? dialogContext;
  dynamic urlBackendStorage ;

  @override
  void initState() {
    super.initState();
    setState(() {
      urlBackendStorage = localStorage.getItem("urlBackend");
    });
  }

  // change urlbackend
  changeUrlBackend () {
    if((textUrlBackend.text).replaceAll(' ', '') != ""){
      setState(() {
            urlBackendStorage = textUrlBackend.text;
          });
      localStorage.setItem("urlBackend", textUrlBackend.text);
    }
  }

  // function login
  _login(BuildContext context) async {
    var agentAuthService = AuthService();
    final String phone = _emailController.text;
    final String password = _passwordController.text;
    
    if (_formKey.currentState!.validate()) {
      showLoading(true);
      String result = await agentAuthService.login(phone, password);
      setState(() {
        infoError = result;
      });
      if (result.toString() != "Đăng nhập thành công") {
        WidgetsBinding.instance.addPostFrameCallback((_) async {
          showLoading(false);
          showMyDialog();
        });
      } else {
        showLoading(false);
        // ignore: use_build_context_synchronously
        Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => const regulationsPage()),
        );
      }
    }
  }

  Future<void> _showAlertDialog(BuildContext context) async {
    return showDialog<void>(
      context: context,
      builder: (BuildContext context) {
        return Center(
          child: AlertDialog(
            title: const Text(
              'NHẬP ĐƯỜNG LINK URL ĐẾN BACKEND',
              textAlign: TextAlign.center,
              style: TextStyle(
                fontWeight: FontWeight.bold,
                color: Color.fromARGB(255, 43, 14, 190),
              ),
            ),
            content: Container(
              width: 300,
              padding: const EdgeInsets.symmetric(vertical: 20.0),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Text(
                    'URL ĐẾN BACKEND HIỆN TẠI',
                    style: TextStyle(
                      color: Colors.red,
                      fontSize: 17,
                      fontWeight: FontWeight.bold
                    ),
                    ),
                  Text(urlBackendStorage, style: const TextStyle(fontSize: 17),),
                  TextFormField(
                    controller: textUrlBackend,
                    decoration: const InputDecoration(
                      labelText: 'ĐƯỜNG LINK URL BACKEND',
                    ),
                  ),
                  const SizedBox(height: 30),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    children: [
                      ElevatedButton(
                        onPressed: () {
                          Navigator.of(context).pop();
                        },
                        style: ButtonStyle(
                          backgroundColor:
                              MaterialStateProperty.all<Color>(Colors.grey),
                        ),
                        child: Text('THOÁT'),
                      ),
                      ElevatedButton(
                        onPressed: () {
                          // String enteredText = _textFieldController.text;
                          // print('Entered Text: $enteredText');
                          changeUrlBackend();
                          Navigator.of(context).pop();
                        },
                        child: Text('LƯU'),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        );
      },
    );
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
                Center(child: Text(infoError.toString(), textAlign: TextAlign.center,)),
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
    return SafeArea(
      child: Scaffold(
        body: ListView(children: [
          Column(children: [
            Container(
              alignment: Alignment.bottomRight,
              child: IconButton(
                icon: const Icon(
                  Icons.settings,
                  size: 30,
                  //color: Color.fromARGB(255, 28, 160, 154),
                ),
                onPressed: () {
                  textUrlBackend.text = "";
                  _showAlertDialog(context);
                },
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(top: 150),
              child: Container(
                child: Image(
                    height: MediaQuery.of(context).size.height * 0.1,
                    width: MediaQuery.of(context).size.width,
                    image: const AssetImage(
                      'images/timec.png',
                    )),
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(top: 20),
              child: Container(
                child: const Text(
                  "Đăng nhập tài khoản",
                  style: TextStyle(
                    fontSize: 21,
                    color: Colors.black,
                  ),
                ),
              ),
            ),
            Container(
              child: const Text(
                "Để phục vụ công việc ",
                style: TextStyle(
                  fontSize: 16,
                  color: Colors.grey,
                ),
              ),
            ),
            Container(
              child: Padding(
                padding: const EdgeInsets.only(top: 35),
                child: SizedBox(
                  width: 360,
                  child: Form(
                    key: _formKey,
                    child: Column(children: [
                      TextFormField(
                        controller: _emailController,
                        decoration: (InputDecoration(
                            filled: true,
                            prefixIcon: const Icon(Icons.phone),
                            hintText: "Số điện thoại",
                            enabledBorder: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(5),
                                borderSide: const BorderSide(
                                    color: Colors.grey, width: 1.0)))),
                        validator: (value) {
                          if (value == null || value.isEmpty) {
                            return 'Vui lòng nhập số điện thoại';
                          }
                          return null;
                        },
                      ),
                      Padding(
                        padding: const EdgeInsets.only(top: 30),
                        child: TextFormField(
                          controller: _passwordController,
                          obscureText:
                              true, // ẩn các ký tự khi nhập vào textfield
                          decoration: InputDecoration(
                            filled: true,
                            prefixIcon: const Icon(Icons.lock),
                            hintText: "Mật khẩu",
                            enabledBorder: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(5),
                                borderSide: const BorderSide(
                                    color: Colors.grey, width: 1.0)),
                          ),
                          validator: (value) {
                            // hàm này sẽ được gọi khi phương thức validate được kích hoạt
                            if (value == null || value.isEmpty) {
                              // nếu giá trị là null hoặc rỗng, trả về một chuỗi lỗi
                              return 'Vui lòng nhập mật khẩu';
                            }
                            return null; // nếu không có lỗi, trả về null
                          },
                        ),
                      ),
                    ]),
                  ),
                ),
              ),
            ),
            // Padding(
            //   padding: const EdgeInsets.only(top: 25.0, left: 5.0),
            //   child: Container(
            //     child: Row(
            //       mainAxisAlignment: MainAxisAlignment.center,
            //       children: [
            //         Transform.scale(
            //           scale: 1.5,
            //           child: Checkbox(
            //               //chỉ có ô checkbox
            //               value: check1, //không được chọn
            //               onChanged: (bool? value) {
            //                 //giá trị được trả về khi ô checkbox được nhấp
            //                 setState(() {
            //                   check1 = value;
            //                 });
            //               }),
            //         ),
            //         Container(
            //           child: const Text(
            //             "Tự động đăng nhập.",
            //             style: TextStyle(fontSize: 17),
            //           ),
            //         ),
            //         Padding(
            //           padding: const EdgeInsets.only(left: 40.0),
            //           child: Container(
            //               child: TextButton(
            //             child: const Text('Quên mật khẩu?',
            //                 style: TextStyle(fontSize: 17)),
            //             onPressed: () {},
            //           )),
            //         ),
            //       ],
            //     ),
            //   ),
            // ),
            SizedBox(
              height: 30,
            ),
            Padding(
              padding: const EdgeInsets.only(top: 20.0),
              child: SizedBox(
                  width: 360,
                  height: 50,
                  child: SizedBox(
                    child: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.cyan,
                        padding: const EdgeInsets.symmetric(
                            horizontal: 20, vertical: 10),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(2),
                        ),
                      ),
                      onPressed: () {
                        _login(context);
                      },
                      child: const Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          Text('Đăng nhập',
                              style: TextStyle(color: Colors.white)),
                          SizedBox(width: 10),
                          Icon(Icons.arrow_forward, color: Colors.white),
                        ],
                      ),
                    ),
                  )),
            ),
          ]),
        ]),
      ),
    );
  }
}
