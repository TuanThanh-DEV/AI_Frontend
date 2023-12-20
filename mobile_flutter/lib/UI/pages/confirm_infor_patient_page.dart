import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:timecprj/UI/pages/book_page.dart';
import 'package:timecprj/UI/pages/choose_profile_page.dart';
import 'package:timecprj/service/agent.dart';

class confirmInforPatientPage extends StatefulWidget {
  final dynamic bodyData;
  final dynamic relationshipData;
  const confirmInforPatientPage(
      {super.key, this.bodyData, this.relationshipData});

  @override
  State<confirmInforPatientPage> createState() =>
      _confirmInforPatientPageState();
}

class _confirmInforPatientPageState extends State<confirmInforPatientPage> {
  int selectedButton = 0;
  List<int> days = List<int>.generate(31, (int index) => index + 1);
  List<int> months = List<int>.generate(12, (int index) => index + 1);
  List<int> years = List<int>.generate(200, (int index) => 1900 + index);
  int? selectedDay;
  int? selectedMonth;
  int? selectedYear;

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    print((widget.bodyData['birthday'].runtimeType));
  }

  Future<void> addPatient() async {
    var asyncRequest = AsyncRequest();
    Map<String, dynamic> jsonMap =
        json.decode(localStorage.getItem('currentUser'));
    String idCurrentUser = jsonMap['idPatient'].toString();
    widget.bodyData['fatherName'] = (widget.bodyData['fatherName'] == "")
        ? null
        : widget.bodyData['fatherName'];
    widget.bodyData['fatherPhone'] = (widget.bodyData['fatherPhone'] == "")
        ? null
        : widget.bodyData['fatherName'];
    Map<String, dynamic> result =
        await asyncRequest.apiMethodPost('patient/add', widget.bodyData);
    if (result['resultData'] == "Có lỗi khi kết nối với server.") {
      showMyDialog("THÔNG BÁO", "Có lỗi khi kết nối với server", 0);
    } else {
      Map<String, dynamic> bodyPatientByAccount = {
        "idAccountPatient": idCurrentUser,
        "idPatient": result['resultData']['id'],
        "relationship":
            (widget.relationshipData == "") ? null : widget.relationshipData
      };
      Map<String, dynamic> resultPatientByAccount =
          await asyncRequest.apiMethodPost(
              'userpatient/addpatientbyaccount', bodyPatientByAccount);
      if (resultPatientByAccount['resultData'] ==
          "Có lỗi khi kết nối với server.") {
        showMyDialog("THÔNG BÁO", "Có lỗi khi kết nối với server", 0);
      } else {
        showMyDialog("THÀNH CÔNG", "Thêm hồ sơ thành công", 1);
      }
    }
  }

  Future<void> showMyDialog(String title, String noti, int valueStatus) async {
    return showDialog<void>(
      context: context,
      barrierDismissible: false,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Center(
            child: Text(
              title,
              style: TextStyle(
                  color: (valueStatus == 1) ? Colors.green : Colors.red,
                  fontWeight: FontWeight.bold),
            ),
          ),
          content: SingleChildScrollView(
            child: ListBody(
              children: <Widget>[
                Center(child: Text(noti)),
              ],
            ),
          ),
          actions: <Widget>[
            Center(
              child: ElevatedButton(
                style: ButtonStyle(
                  backgroundColor: MaterialStateProperty.all<Color>(
                      (valueStatus == 1) ? Colors.green : Colors.red),
                  foregroundColor:
                      MaterialStateProperty.all<Color>(Colors.white),
                  minimumSize: MaterialStateProperty.all<Size>(
                    const Size(200, 40.0),
                  ),
                ),
                onPressed: () {
                  Navigator.of(context).pop();
                  Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) => const chooseProfile()));
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

  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;

    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          toolbarHeight: 65,
          backgroundColor: const Color.fromARGB(255, 28, 160, 154),
          title: Center(
            child: const Text(
              "XÁC NHẬN THÔNG TIN BỆNH NHÂN",
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 17, fontWeight: FontWeight.bold),
            ),
          ),
        ),
        body: Column(
          children: [
            Expanded(
              child: ListView(children: [
                Padding(
                  padding: const EdgeInsets.all(15.0),
                  child: Column(children: [
                    const SizedBox(
                      height: 10,
                    ),
                    const Text(
                      'Vui lòng kiểm tra thông tin đã đăng ký trước khi bấm xác nhận ! ',
                      style: TextStyle(color: Colors.blue),
                    ),
                    const SizedBox(
                      height: 20,
                    ),
                    Container(
                      width: screenWidth,
                      decoration: BoxDecoration(
                          border: Border.all(
                        color: Color.fromARGB(255, 28, 160, 154),
                        width: 2.0,
                        style: BorderStyle.solid,
                      )),
                      child: Column(
                        children: [
                          const SizedBox(
                            height: 10,
                          ),
                          Container(
                            margin: const EdgeInsets.only(top: 10, bottom: 15),
                            child: const Text(
                              "THÔNG TIN BỆNH NHÂN",
                              style: TextStyle(
                                  color: Colors.black,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 17),
                            ),
                          ),
                          const SizedBox(
                            height: 10,
                          ),
                          Container(
                              padding:
                                  const EdgeInsets.only(left: 20, right: 20),
                              alignment: Alignment.centerLeft,
                              child: RichText(
                                text: TextSpan(
                                  style: const TextStyle(color: Colors.black),
                                  children: [
                                    const TextSpan(
                                        text: 'Họ tên bệnh nhân : ',
                                        style: TextStyle(
                                            fontWeight: FontWeight.bold,
                                            fontSize: 16)),
                                    TextSpan(
                                        text: '${widget.bodyData['fullName']}',
                                        style: const TextStyle(fontSize: 16)),
                                  ],
                                ),
                              )),
                          const SizedBox(
                            height: 20,
                          ),
                          Container(
                              padding:
                                  const EdgeInsets.only(left: 20, right: 20),
                              alignment: Alignment.centerLeft,
                              child: RichText(
                                text: TextSpan(
                                  style: const TextStyle(color: Colors.black),
                                  children: [
                                    const TextSpan(
                                        text: 'Ngày sinh : ',
                                        style: TextStyle(
                                            fontWeight: FontWeight.bold,
                                            fontSize: 16)),
                                    TextSpan(
                                        text:
                                            '${DateFormat('dd-MM-yyyy').format(DateTime.parse(widget.bodyData['birthday']))}',
                                        style: const TextStyle(fontSize: 16)),
                                  ],
                                ),
                              )),
                          const SizedBox(
                            height: 20,
                          ),
                          Container(
                              padding:
                                  const EdgeInsets.only(left: 20, right: 20),
                              alignment: Alignment.centerLeft,
                              child: RichText(
                                text: TextSpan(
                                  style: const TextStyle(color: Colors.black),
                                  children: [
                                    const TextSpan(
                                        text: 'Giới tính : ',
                                        style: TextStyle(
                                            fontWeight: FontWeight.bold,
                                            fontSize: 16)),
                                    TextSpan(
                                        text: (widget.bodyData['gender'] ==
                                                "MALE")
                                            ? "Nam"
                                            : "Nữ",
                                        style: const TextStyle(fontSize: 16)),
                                  ],
                                ),
                              )),
                          const SizedBox(
                            height: 20,
                          ),
                          Container(
                              padding:
                                  const EdgeInsets.only(left: 20, right: 20),
                              alignment: Alignment.centerLeft,
                              child: RichText(
                                text: TextSpan(
                                  style: const TextStyle(color: Colors.black),
                                  children: [
                                    const TextSpan(
                                        text: 'Quốc gia : ',
                                        style: TextStyle(
                                            fontWeight: FontWeight.bold,
                                            fontSize: 16)),
                                    TextSpan(
                                        text: '${widget.bodyData['nation']}',
                                        style: const TextStyle(fontSize: 16)),
                                  ],
                                ),
                              )),
                          const SizedBox(
                            height: 20,
                          ),
                          Container(
                              padding:
                                  const EdgeInsets.only(left: 20, right: 20),
                              alignment: Alignment.centerLeft,
                              child: RichText(
                                text: TextSpan(
                                  style: const TextStyle(color: Colors.black),
                                  children: [
                                    const TextSpan(
                                        text: 'Số điện thoại : ',
                                        style: TextStyle(
                                            fontWeight: FontWeight.bold,
                                            fontSize: 16)),
                                    TextSpan(
                                        text: '${widget.bodyData['phone']}',
                                        style: const TextStyle(fontSize: 16)),
                                  ],
                                ),
                              )),
                          const SizedBox(
                            height: 20,
                          ),
                          Container(
                              padding:
                                  const EdgeInsets.only(left: 20, right: 20),
                              alignment: Alignment.centerLeft,
                              child: RichText(
                                text: TextSpan(
                                  style: const TextStyle(color: Colors.black),
                                  children: [
                                    const TextSpan(
                                        text: 'Email : ',
                                        style: TextStyle(
                                            fontWeight: FontWeight.bold,
                                            fontSize: 16)),
                                    TextSpan(
                                        text: '${widget.bodyData['email']}',
                                        style: const TextStyle(fontSize: 16)),
                                  ],
                                ),
                              )),
                          const SizedBox(
                            height: 20,
                          ),
                          Container(
                              padding:
                                  const EdgeInsets.only(left: 20, right: 20),
                              alignment: Alignment.centerLeft,
                              child: RichText(
                                text: TextSpan(
                                  style: const TextStyle(color: Colors.black),
                                  children: [
                                    const TextSpan(
                                        text: 'Địa chỉ : ',
                                        style: TextStyle(
                                            fontWeight: FontWeight.bold,
                                            fontSize: 16)),
                                    TextSpan(
                                        text: '${widget.bodyData['address']}',
                                        style: const TextStyle(fontSize: 16)),
                                  ],
                                ),
                              )),
                          const SizedBox(
                            height: 20,
                          )
                        ],
                      ),
                    ),
                    const SizedBox(
                      height: 20,
                    ),
                    Container(
                        width: screenWidth,
                        decoration: BoxDecoration(
                            border: Border.all(
                          color: Color.fromARGB(255, 28, 160, 154),
                          width: 2.0,
                          style: BorderStyle.solid,
                        )),
                        child: Column(children: [
                          const SizedBox(
                            height: 10,
                          ),
                          Container(
                            margin: const EdgeInsets.only(top: 10, bottom: 15),
                            child: const Text(
                              "THÔNG TIN NGƯỜI THÂN",
                              style: TextStyle(
                                  color: Colors.black,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 17),
                            ),
                          ),
                          const SizedBox(
                            height: 10,
                          ),
                          Container(
                              padding:
                                  const EdgeInsets.only(left: 20, right: 20),
                              alignment: Alignment.centerLeft,
                              child: RichText(
                                text: TextSpan(
                                  style: const TextStyle(color: Colors.black),
                                  children: [
                                    const TextSpan(
                                        text: 'Tên người thân : ',
                                        style: TextStyle(
                                            fontWeight: FontWeight.bold,
                                            fontSize: 16)),
                                    TextSpan(
                                        text:
                                            '${widget.bodyData['fatherName']}',
                                        style: const TextStyle(fontSize: 16)),
                                  ],
                                ),
                              )),
                          const SizedBox(
                            height: 20,
                          ),
                          Container(
                              padding:
                                  const EdgeInsets.only(left: 20, right: 20),
                              alignment: Alignment.centerLeft,
                              child: RichText(
                                text: TextSpan(
                                  style: const TextStyle(color: Colors.black),
                                  children: [
                                    const TextSpan(
                                        text: 'Quan hệ : ',
                                        style: TextStyle(
                                            fontWeight: FontWeight.bold,
                                            fontSize: 16)),
                                    TextSpan(
                                        text: "${widget.relationshipData}",
                                        style: const TextStyle(fontSize: 16)),
                                  ],
                                ),
                              )),
                          const SizedBox(
                            height: 20,
                          ),
                          Container(
                              padding:
                                  const EdgeInsets.only(left: 20, right: 20),
                              alignment: Alignment.centerLeft,
                              child: RichText(
                                text: TextSpan(
                                  style: const TextStyle(color: Colors.black),
                                  children: [
                                    const TextSpan(
                                        text: 'Số điện thoại người thân : ',
                                        style: TextStyle(
                                            fontWeight: FontWeight.bold,
                                            fontSize: 16)),
                                    TextSpan(
                                        text:
                                            '${widget.bodyData['fatherPhone']}',
                                        style: const TextStyle(fontSize: 16)),
                                  ],
                                ),
                              )),
                          const SizedBox(
                            height: 40,
                          ),
                        ])),
                  ]),
                ),
              ]),
            ),
            SizedBox(
              height: 20,
            ),
            Container(
              height: 50,
              width: 200,
              child: ElevatedButton(
                  onPressed: () {
                    addPatient();
                  },
                  style: ButtonStyle(
                      backgroundColor: MaterialStateProperty.all<Color>(
                          const Color.fromARGB(255, 28, 160, 154))),
                  child: const Text(
                    'XÁC NHẬN ',
                    style: TextStyle(
                        color: Color.fromARGB(255, 255, 255, 255),
                        fontSize: 16),
                  )),
            ),
          ],
        ),
      ),
    );
  }
}
