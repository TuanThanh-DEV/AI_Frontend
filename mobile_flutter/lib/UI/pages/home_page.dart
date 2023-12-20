import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:timecprj/UI/pages/appointment_list_page.dart';
import 'package:timecprj/UI/pages/choose_profile_page.dart';
import 'package:timecprj/UI/pages/contact_page.dart';
import 'package:timecprj/UI/pages/introduce_page.dart';
import 'package:timecprj/UI/pages/list_examination_form_page.dart';
import 'package:timecprj/UI/pages/create_profile_page.dart';
import 'package:timecprj/UI/pages/login_page.dart';
import 'package:timecprj/UI/pages/medical_examination_process_page.dart';
import 'package:timecprj/UI/pages/privacy_policy_page.dart';
import 'package:timecprj/UI/pages/regulations_in_app_page.dart';
import 'package:timecprj/UI/pages/regulations_page.dart';
import 'package:timecprj/UI/pages/service_terms_page.dart';
import 'package:timecprj/UI/pages/user_manual_page.dart';
import 'package:timecprj/service/agent.dart';

class homePage extends StatefulWidget {
  const homePage({super.key});

  @override
  State<homePage> createState() => _homePageState();
}

class _homePageState extends State<homePage> {
  String fullName = "";
  String phone = "";

  logoutAccount() async {
    var agentAuthService = AuthService();
    agentAuthService.logout(context);
  }

  @override
  void initState() {
    super.initState();
    Map<String, dynamic> jsonMap =
        json.decode(localStorage.getItem('currentUser'));
    fullName = jsonMap['fullName'].toString();
    phone = jsonMap['phone'].toString();
  }

  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;
    double screenHeight = MediaQuery.of(context).size.height;

    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: SafeArea(
        child: Scaffold(
          appBar: AppBar(
            toolbarHeight: 65,
            backgroundColor: const Color.fromARGB(255, 28, 160, 154),
            title: Container(
              margin: const EdgeInsets.only(right: 62),
              child: Center(
                child: Align(
                  alignment: Alignment.center,
                  child: Image.asset(
                    'images/timecwhite.png',
                    height: 33,
                  ),
                ),
              ),
            ),
            leading: Builder(
              builder: (context) => IconButton(
                icon: const Icon(Icons.menu),
                onPressed: () => Scaffold.of(context).openDrawer(),
              ),
            ),
          ),
          drawer: Drawer(
              child: ListView(padding: EdgeInsets.zero, children: [
            // Tạo ra một tiêu đề cho menu bên
            Container(
              height: 120,
              child: DrawerHeader(
                decoration: const BoxDecoration(
                  color: Color.fromARGB(255, 28, 160, 154),
                ),
                child: Container(
                  alignment: Alignment.bottomLeft,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text('Xin chào,',
                          style: TextStyle(
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                              fontSize: 17)),
                      const SizedBox(
                        height: 3,
                      ),
                      Text(fullName,
                          style: const TextStyle(
                              color: Colors.white,
                              fontSize: 15,
                              fontWeight: FontWeight.w400)),
                      const SizedBox(
                        height: 3,
                      ),
                      Text('($phone)',
                          style: const TextStyle(
                              color: Colors.white,
                              fontSize: 15,
                              fontWeight: FontWeight.w400))
                    ],
                  ),
                ),
              ),
            ),

            ListTile(
              leading: const Icon(Icons.recent_actors),
              title: const Text('Hồ sơ bệnh nhân'),
              onTap: () {
                Navigator.of(context)
                    .push(MaterialPageRoute(builder: (context) {
                  return const chooseProfile();
                }));
              },
            ),
            ListTile(
              leading: const Icon(Icons.assignment),
              title: const Text('Phiếu khám bệnh'),
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) => const listExaminationFormPage()),
                );
              },
            ),
            ListTile(
              leading: const Icon(Icons.view_list),
              title: const Text('Danh sách cuộc hẹn'),
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) => const appointmentListPage()),
                );
              },
            ),
            ListTile(
              leading: const Icon(Icons.notifications),
              title: const Text('Thông báo'),
              onTap: () {
                Navigator.of(context)
                    .push(MaterialPageRoute(builder: (context) {
                  return const homePage();
                }));
              },
            ),
            ListTile(
              leading: const Icon(Icons.pan_tool),
              title: const Text('Hướng dẫn sử dụng'),
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) => const usermanualPage()),
                );
              },
            ),
            ListTile(
              leading: const Icon(Icons.recycling),
              title: const Text('Quy  trình khám bệnh'),
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) =>
                          const medicalExaminationProcessPage()),
                );
              },
            ),
            ListTile(
              leading: const Icon(Icons.domain),
              title: const Text('Điều khoản dịch vụ'),
              onTap: () {
                Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) => serviceTermsPage()));
              },
            ),
            ListTile(
              leading: const Icon(Icons.new_releases),
              title: const Text('Chính sách bảo mật'),
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                      builder: (context) => const privacyPolicyPage()),
                );
              },
            ),
            ListTile(
              leading: const Icon(Icons.auto_stories),
              title: const Text('Quy định sử dụng'),
              onTap: () {
                Navigator.of(context)
                    .push(MaterialPageRoute(builder: (context) {
                  return const regulationsInAppPage();
                }));
              },
            ),
            ListTile(
              leading: const Icon(Icons.contacts),
              title: const Text('Liên hệ'),
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const contactPage()),
                );
              },
            ),
            // ListTile(
            //   leading: const Icon(Icons.check_circle),
            //   title: const Text('Giới thiệu'),
            //   onTap: () {
            //     Navigator.push(
            //       context,
            //       MaterialPageRoute(builder: (context) => introducePage()),
            //     );
            //   },
            // ),

            Padding(
              padding: EdgeInsets.all(30.0),
              child: Divider(
                height: 20,
                thickness: 1,
                indent: 20,
                endIndent: 0,
                color: Color.fromARGB(255, 21, 183, 246),
              ),
            ),
            TextButton(
                onPressed: logoutAccount,
                child: const Text(
                  'Đăng xuất',
                  style: TextStyle(
                    color: Color.fromARGB(255, 28, 160, 154),
                  ),
                ))
          ])),
          body: Column(
            children: [
              Expanded(
                child: ListView(children: [
                  Column(children: [
                    Container(
                      child: Image.asset('images/doctor2.jpg'),
                    ),
                    const SizedBox(
                      height: 10,
                    ),
                    Container(
                      height: 80,
                      width: screenWidth,
                      child: Padding(
                        padding: const EdgeInsets.all(8.0),
                        child: ElevatedButton(
                            onPressed: () {
                              Navigator.push(
                                context,
                                MaterialPageRoute(
                                    builder: (context) =>
                                        const chooseProfile()),
                              );
                            },
                            style: ElevatedButton.styleFrom(
                              primary: const Color.fromARGB(
                                  255, 247, 120, 30), //màu nền của nút
                            ),
                            child: const Text(
                              'ĐẶT LỊCH KHÁM',
                              style: TextStyle(
                                  color: Color.fromARGB(255, 255, 255, 255),
                                  fontSize: 15),
                            )),
                      ),
                    ),
                    const SizedBox(
                      height: 10,
                    ),
                    Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: Container(
                        width: screenWidth,
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: [
                            Expanded(
                              child: ElevatedButton(
                                onPressed: () {
                                  Navigator.push(
                                      context,
                                      MaterialPageRoute(
                                          builder: (context) =>
                                              const listExaminationFormPage()));
                                },
                                style: ButtonStyle(
                                  backgroundColor: MaterialStateProperty.all(
                                      const Color.fromARGB(255, 255, 255, 255)),
                                  side: MaterialStateProperty.all(
                                    const BorderSide(
                                      color: Colors.black, // Màu đường viền
                                      width: 1.0, // Độ dày đường viền
                                    ),
                                  ),
                                ),
                                child: Container(
                                  height: 120,
                                  width: screenWidth,
                                  child: const Column(
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    children: [
                                      Icon(
                                        Icons.medical_services,
                                        color: Color.fromARGB(255, 102, 98, 98),
                                      ),
                                      SizedBox(
                                        height: 5,
                                      ),
                                      Text(
                                        "DANH SÁCH PHIẾU KHÁM",
                                        textAlign: TextAlign.center,
                                        style: TextStyle(
                                            color: Colors.black,
                                            fontWeight: FontWeight.w500),
                                      ),
                                    ],
                                  ),
                                ),
                              ),
                            ),
                            SizedBox(
                              width: 10,
                            ),
                            Expanded(
                              child: ElevatedButton(
                                onPressed: () {
                                  Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                      builder: (context) =>
                                          const appointmentListPage(),
                                    ),
                                  );
                                },
                                style: ButtonStyle(
                                  backgroundColor: MaterialStateProperty.all(
                                    const Color.fromARGB(255, 255, 255, 255),
                                  ),
                                  side: MaterialStateProperty.all(
                                    const BorderSide(
                                      color: Colors.black, // Màu đường viền
                                      width: 1.0, // Độ dày đường viền
                                    ),
                                  ),
                                ),
                                child: Container(
                                  width: screenWidth,
                                  height: 120,
                                  child: const Column(
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    children: [
                                      Icon(
                                        Icons.edit_calendar,
                                        color: Color.fromARGB(255, 102, 98, 98),
                                      ),
                                      SizedBox(
                                        height: 5,
                                      ),
                                      Text(
                                        "DANH SÁCH CUỘC HẸN",
                                        textAlign: TextAlign.center,
                                        style: TextStyle(
                                          color: Colors.black,
                                          fontWeight: FontWeight.w500,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ),
                            ),
                            SizedBox(
                              width: 10,
                            ),

                            // Create the third container with an icon and a text
                            Expanded(
                              child: ElevatedButton(
                                onPressed: () {
                                  Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                      builder: (context) =>
                                          const chooseProfile(),
                                    ),
                                  );
                                },
                                style: ButtonStyle(
                                  backgroundColor: MaterialStateProperty.all(
                                    const Color.fromARGB(255, 255, 255, 255),
                                  ),
                                  side: MaterialStateProperty.all(
                                    const BorderSide(
                                      color: Colors.black, // Màu đường viền
                                      width: 1.0, // Độ dày đường viền
                                    ),
                                  ),
                                ),
                                child: Container(
                                  width: screenWidth,
                                  height: 120,
                                  child: const Column(
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    children: [
                                      Icon(
                                        Icons.person,
                                        color: Color.fromARGB(255, 102, 98, 98),
                                      ),
                                      SizedBox(
                                        height: 5,
                                      ),
                                      Text(
                                        "DANH SÁCH HỒ SƠ BỆNH NHÂN",
                                        textAlign: TextAlign.center,
                                        style: TextStyle(
                                          color: Colors.black,
                                          fontWeight: FontWeight.w500,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ]),
                ]),
              ),
              IntrinsicHeight(
                child: Container(
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      Column(
                        children: [
                          Container(child: const Text('Hỗ trợ chuyên môn')),
                          Container(
                            child: const Text(
                              "0879 115 115",
                              style: TextStyle(
                                color: Color.fromARGB(255, 28, 160, 154),
                              ),
                            ),
                          )
                        ],
                      ),
                      const VerticalDivider(
                        color: Colors.black,
                        thickness: 2,
                      ),
                      Column(
                        children: [
                          Container(child: const Text('Hỗ trợ đặt khám')),
                          Container(
                            child: const Text(
                              "0879 115 115",
                              style: TextStyle(
                                color: Color.fromARGB(255, 28, 160, 154),
                              ),
                            ),
                          )
                        ],
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
