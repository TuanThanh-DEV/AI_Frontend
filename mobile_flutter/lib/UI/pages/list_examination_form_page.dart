import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:timecprj/UI/pages/medical_bill_page.dart';
import 'package:timecprj/service/agent.dart';

class listExaminationFormPage extends StatefulWidget {
  const listExaminationFormPage({super.key});

  @override
  State<listExaminationFormPage> createState() =>
      _listExaminationFormPageState();
}

class _listExaminationFormPageState extends State<listExaminationFormPage> {
  List<dynamic> prescriptions = [];

  @override
  void initState() {
    super.initState();
    getPrescription();
  }

  Future<void> getPrescription() async {
    var asyncRequest = AsyncRequest();
    Map<String, dynamic> jsonMap =
        json.decode(localStorage.getItem('currentUser'));
    String idCurrentUser = jsonMap['idPatient'].toString();
    Map<String, dynamic> result = await asyncRequest.apiMethodGet(
        'prescription/listAllFindByPatientId?patientId=$idCurrentUser');
    setState(() {
      prescriptions = result['resultData'];
    });
  }

  dynamic getStatusPrescription(String status) {
    if (status == "OPEN") {
      return "Mở";
    } else if (status == "IN_PROGRESS") {
      return "Chờ xử lý";
    } else if (status == "DONE") {
      return "Hoàn thành";
    } else if (status == "CANCELLED") {
      return "Hủy";
    }
  }

  dynamic getColorByStatus(String status) {
    if (status == "OPEN") {
      return Colors.blue;
    } else if (status == "IN_PROGRESS") {
      return Colors.orange;
    } else if (status == "DONE") {
      return Colors.green;
    } else if (status == "CANCELLED") {
      return Colors.red;
    }
  }

  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;
    //double screenHeight = MediaQuery.of(context).size.height;

    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          toolbarHeight: 65,
          backgroundColor: const Color.fromARGB(255, 28, 160, 154),
          title: Container(
            margin: const EdgeInsets.only(left: 28),
            child: const Text(
              "DANH SÁCH PHIẾU KHÁM",
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
          ),
        ),
        body: ListView(children: [
          Column(children: [
            const SizedBox(
              height: 5,
            ),
            Container(
              child: const Text(
                "Vui lòng chọn mã phiếu để được biết thêm thông tin chi tiết!",
                style: TextStyle(color: Colors.blue),
              ),
            ),
            const SizedBox(height: 10),
            ...prescriptions.map((appointment) {
              dynamic date = "Chưa có";
              if (appointment['arriveTime'] != null) {
                date = DateFormat('dd-MM-yyyy').format(
                    DateTime.fromMillisecondsSinceEpoch(
                        appointment['arriveTime']));
              }
              String department = "Chưa có";
              if (appointment['department'] != null) {
                Map<String, dynamic> jsonMap = appointment['department'];
                department = jsonMap['name'];
              }
              return Padding(
                padding: const EdgeInsets.only(bottom: 15.0),
                child: ElevatedButton(
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => medicalBillPage(
                            idPrescription: '${appointment['id']}'),
                      ),
                    );
                  },
                  style: ButtonStyle(
                      backgroundColor: MaterialStateProperty.all(
                          const Color.fromARGB(255, 255, 255, 255)),
                      elevation: MaterialStateProperty.all(0),
                      shape: MaterialStateProperty.all(RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(0)))),
                  child: Container(
                    width: screenWidth,
                    decoration: BoxDecoration(
                        border: Border.all(
                      color: Color.fromARGB(255, 28, 160, 154),
                      width: 1,
                      style: BorderStyle.solid,
                    )),
                    child: Padding(
                      padding: const EdgeInsets.all(15.0),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                        children: [
                          const Center(
                              child: Text(
                            "PHIẾU KHÁM",
                            style: TextStyle(
                                color: Colors.black,
                                fontWeight: FontWeight.bold,
                                fontSize: 15),
                          )),
                          const SizedBox(
                            height: 10,
                          ),
                          Row(
                            children: [
                              RichText(
                                text: TextSpan(
                                  style: const TextStyle(color: Colors.black),
                                  children: [
                                    const TextSpan(
                                      text: 'Mã phiếu khám bệnh : ',
                                      style: TextStyle(
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                    TextSpan(
                                      text: '${appointment['id']}',
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(
                            height: 5,
                          ),
                          Row(
                            children: [
                              RichText(
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
                                      text:
                                          '${appointment['patient']['fullName']}',
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(
                            height: 5,
                          ),
                          Row(
                            children: [
                              RichText(
                                text: TextSpan(
                                  style: const TextStyle(color: Colors.black),
                                  children: [
                                    const TextSpan(
                                      text: 'Ngày khám : ',
                                      style: TextStyle(
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                    TextSpan(
                                      text: date,
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(
                            height: 5,
                          ),
                          Row(
                            children: [
                              RichText(
                                text: TextSpan(
                                  style: const TextStyle(color: Colors.black),
                                  children: [
                                    const TextSpan(
                                      text: 'Chuyên khoa : ',
                                      style: TextStyle(
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                    TextSpan(
                                      text: department,
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(
                            height: 5,
                          ),
                          Row(
                            children: [
                              RichText(
                                text: TextSpan(
                                  style: const TextStyle(color: Colors.black),
                                  children: [
                                    const TextSpan(
                                      text: 'Trạng thái : ',
                                      style: TextStyle(
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                    TextSpan(
                                        text: getStatusPrescription(
                                            appointment['status']),
                                        style: TextStyle(
                                            color: getColorByStatus(
                                                appointment['status']))),
                                  ],
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              );
            }).toList(),
          ]),
        ]),
      ),
    );
  }
}
