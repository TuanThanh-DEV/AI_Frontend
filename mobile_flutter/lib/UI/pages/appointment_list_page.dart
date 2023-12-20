import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:timecprj/UI/pages/home_page.dart';
import 'package:timecprj/UI/pages/medical_bill_page.dart';
import 'package:timecprj/service/agent.dart';

class appointmentListPage extends StatefulWidget {
  const appointmentListPage({super.key});

  @override
  State<appointmentListPage> createState() => _appointmentListPageState();
}

class _appointmentListPageState extends State<appointmentListPage> {
  List<dynamic> appointments = [];

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
        'appointment/listAllFindByPatientId?patientId=$idCurrentUser');
    print(result['resultData']);
    setState(() {
      appointments = result['resultData'];
    });
  }


  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;
    //double screenHeight = MediaQuery.of(context).size.height;

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
                      child: Text("DANH SÁCH CUỘC HẸN")),
                ),
              ),
              leading: Builder(
                builder: (context) => IconButton(
                  icon: const Icon(Icons.arrow_back_outlined),
                  onPressed: () {
                    Navigator.push(context,
                        MaterialPageRoute(builder: (context) => homePage()));
                  },
                ),
              ),
            ),
            body: ListView(children: [
              Column(children: [
                const SizedBox(
                  height: 5,
                ),
                const SizedBox(height: 10),
                ...appointments.map((appointment) {

                  dynamic patientName =
                      (appointment['patient']['fullName'] != null)
                          ? appointment['patient']['fullName']
                          : "Chưa có";
                  dynamic dateAppointment = (appointment['appointDate'] != null)
                      ? DateFormat('dd-MM-yyyy').format(
                          DateTime.fromMillisecondsSinceEpoch(
                              appointment['appointDate']))
                      : "Chưa có";
                  dynamic timeAppoitment = (appointment['appointDate'] != null)
                      ? DateFormat('HH:mm:ss').format(
                          DateTime.fromMillisecondsSinceEpoch(
                              appointment['appointDate']))
                      : "Chưa có";
                  dynamic department = (appointment['departmentId'] != null)
                      ? appointment['department']['name']
                      : "Chưa có";
                  dynamic contentAppointment = (appointment['status'] != null)
                      ? appointment['status']
                      : "Chưa có";
                  return Padding(
                    padding: const EdgeInsets.only(bottom: 15.0),
                    child: ElevatedButton(
                      onPressed: () {
                      },
                      style: ButtonStyle(
                          backgroundColor: MaterialStateProperty.all(
                              const Color.fromARGB(255, 255, 255, 255)),
                          elevation: MaterialStateProperty.all(0),
                          shape: MaterialStateProperty.all(
                              RoundedRectangleBorder(
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
                                "THÔNG TIN CUỘC HẸN",
                                style: TextStyle(
                                    color: Color.fromARGB(255, 28, 160, 154),
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
                                      style:
                                          const TextStyle(color: Colors.black),
                                      children: [
                                        const TextSpan(
                                          text: 'Tên bệnh nhân: ',
                                          style: TextStyle(
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                        TextSpan(
                                          text: patientName,
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
                                      style:
                                          const TextStyle(color: Colors.black),
                                      children: [
                                        const TextSpan(
                                          text: 'Ngày hẹn : ',
                                          style: TextStyle(
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                        TextSpan(
                                          text: dateAppointment,
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
                                      style:
                                          const TextStyle(color: Colors.black),
                                      children: [
                                        const TextSpan(
                                          text: 'Giờ hẹn : ',
                                          style: TextStyle(
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                        TextSpan(
                                          text: timeAppoitment,
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
                                      style:
                                          const TextStyle(color: Colors.black),
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
                                      style:
                                          const TextStyle(color: Colors.black),
                                      children: [
                                        const TextSpan(
                                          text: 'Nội dung cuộc hẹn : ',
                                          style: TextStyle(
                                            fontWeight: FontWeight.bold,
                                          ),
                                        ),
                                        TextSpan(
                                          text: contentAppointment,
                                        ),
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
        ));
  }
}
