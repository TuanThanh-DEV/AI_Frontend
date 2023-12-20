import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:timecprj/UI/pages/book_page.dart';
import 'package:timecprj/UI/pages/create_profile_page.dart';
import 'package:timecprj/UI/pages/edit_profile_page.dart';
import 'package:timecprj/UI/pages/home_page.dart';
import 'package:timecprj/service/agent.dart';

class chooseProfile extends StatefulWidget {
  const chooseProfile({super.key});

  @override
  State<chooseProfile> createState() => _chooseProfileState();
}

class _chooseProfileState extends State<chooseProfile> {
  dynamic listPatientInfo = [];

  @override
  void initState() {
    super.initState();
    getListPatientInfo();
  }

  Future<void> getListPatientInfo() async {
    var asyncRequest = AsyncRequest();
    Map<String, dynamic> jsonMap =
        json.decode(localStorage.getItem('currentUser'));
    String idCurrentUser = jsonMap['idPatient'].toString();
    Map<String, dynamic> result = await asyncRequest
        .apiMethodGet('userpatient/listuserpatient?idpatient=$idCurrentUser');
    setState(() {
      listPatientInfo = result['resultData'];
    });
  }

  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;
    return MaterialApp(
        debugShowCheckedModeBanner: false,
        home: SafeArea(
          child: Scaffold(
            appBar: AppBar(
              toolbarHeight: 65,
              backgroundColor: const Color.fromARGB(255, 28, 160, 154),
              title: Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  IconButton(
                    icon: const Icon(Icons.arrow_back_outlined),
                    onPressed: () {
                      Navigator.push(context,
                          MaterialPageRoute(builder: (context) => homePage()));
                    },
                  ),
                  Container(
                    margin: const EdgeInsets.only(left: 40, right: 40),
                    child: const Text(
                      "HỒ SƠ BỆNH NHÂN",
                      style:
                          TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                    ),
                  ),
                  Container(
                    child: IconButton(
                      icon: const Icon(
                        Icons.person_add,
                        size: 30,
                      ),
                      onPressed: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                              builder: (context) => const createProfilePage()),
                        );
                      },
                    ),
                  ),
                ],
              ),
            ),
            body: ListView(children: [
              Column(
                children: [
                  const SizedBox(
                    height: 10,
                  ),
                  Padding(
                    padding: const EdgeInsets.all(15.0),
                    child: Container(
                      child: const Center(
                        child: Text(
                          "Vui lòng chọn 1 trong các hồ sơ bên dưới, hoặc bấm vào biểu tượng ở trên để thêm hồ sơ người bệnh",
                          textAlign: TextAlign.center,
                          style: TextStyle(color: Color.fromARGB(255, 38, 16, 235), fontSize: 16),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(
                    height: 20,
                  ),
                  Container(
                    child: const Center(
                      child: Text(
                        "Vui lòng tạo hồ sơ người bệnh để sử dụng dịch vụ",
                        textAlign: TextAlign.center,
                        style: TextStyle(color: Color.fromARGB(255, 38, 16, 235), fontSize: 16),
                      ),
                    ),
                  ),
                  const SizedBox(
                    height: 10,
                  ),
                  ...listPatientInfo.map((patient) {
                    return Padding(
                      padding: const EdgeInsets.only(
                          bottom: 15, left: 15, right: 15, top: 0),
                      child: ElevatedButton(
                        onPressed: () {
                          _setCalendar(patient['id'].toString());
                        },
                        style: ButtonStyle(
                          backgroundColor:
                              MaterialStateProperty.all(Colors.white),
                          side: MaterialStateProperty.all(const BorderSide(
                            color: Colors.black,
                            width: 1.0,
                          )),
                          minimumSize:
                              MaterialStateProperty.all(const Size(150, 50)),
                          fixedSize:
                              MaterialStateProperty.all(Size(screenWidth, 100)),
                        ),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            const Center(
                                child: Text(
                              "HỒ SƠ",
                              style: TextStyle(
                                  color: Colors.black,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 15),
                            )),
                            const SizedBox(
                              height: 10,
                            ),
                            Container(
                                margin: const EdgeInsets.only(left: 10),
                                alignment: Alignment.topLeft,
                                child: RichText(
                                  text: TextSpan(
                                    style: const TextStyle(color: Colors.black),
                                    children: [
                                      const TextSpan(
                                        text: 'Tên bệnh nhân : ',
                                        style: TextStyle(
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                      TextSpan(
                                        text: '${patient['fullName']}',
                                      ),
                                    ],
                                  ),
                                )),
                            const SizedBox(
                              height: 10,
                            ),
                            Container(
                                margin: const EdgeInsets.only(left: 10),
                                alignment: Alignment.topLeft,
                                child: RichText(
                                  text: TextSpan(
                                    style: const TextStyle(color: Colors.black),
                                    children: [
                                      const TextSpan(
                                        text: 'Số điện thoại : ',
                                        style: TextStyle(
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                      TextSpan(
                                        text: '${patient['phone']}',
                                      ),
                                    ],
                                  ),
                                )),
                          ],
                        ),
                      ),
                    );
                  }),
                ],
              ),
            ]),
          ),
        ));
  }

  void _setCalendar(String idPatient) {
    double screenWidth = MediaQuery.of(context).size.width;

    showModalBottomSheet(
        context: context,
        builder: (BuildContext ctx) {
          return Padding(
            padding: EdgeInsets.only(
                top: 20,
                left: 20,
                right: 20,
                bottom: MediaQuery.of(ctx).viewInsets.bottom + 20),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  height: 70,
                  width: screenWidth,
                  child: ElevatedButton(
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) =>
                                bookPage(idPatientData: idPatient)),
                      );
                    },
                    style: ElevatedButton.styleFrom(
                      primary: const Color.fromARGB(255, 28, 160, 154),
                    ),
                    child: const Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.calendar_today, color: Colors.white),
                        SizedBox(width: 10),
                        Text(
                          'ĐẶT LỊCH KHÁM',
                          style: TextStyle(color: Colors.white),
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(
                  height: 10,
                ),
                Container(
                  width: screenWidth,
                  height: 70,
                  child: ElevatedButton(
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                            builder: (context) =>
                                editProfilePage(idPatientData: idPatient)),
                      );
                    },
                    style: ElevatedButton.styleFrom(
                      primary: Color.fromARGB(255, 28, 160, 154),
                    ),
                    child: const Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.person, color: Colors.white),
                        SizedBox(width: 10),
                        Text(
                          'CHỈNH SỬA THÔNG TIN',
                          style: TextStyle(color: Colors.white),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          );
        });
  }
}
