import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:timecprj/UI/pages/appointment_list_page.dart';
import 'package:timecprj/UI/pages/book_page.dart';
import 'package:timecprj/UI/pages/confirm_book_page.dart';
import 'package:timecprj/UI/pages/list_examination_form_page.dart';
import 'package:timecprj/service/agent.dart';

class confirmAllPage extends StatefulWidget {
  final dynamic bodyData;
  final dynamic valueBHYTData;
  final dynamic departmentData;
  final dynamic doctorData;
  final dynamic infoPatientData;
  final dynamic contentAppointmentData;
  final dynamic relationshipData;
  const confirmAllPage({
    super.key,
    required this.bodyData,
    this.valueBHYTData,
    this.infoPatientData,
    this.departmentData,
    this.doctorData,
    this.contentAppointmentData,
    this.relationshipData,
  });

  @override
  State<confirmAllPage> createState() => _confirmAllPageState();
}

class _confirmAllPageState extends State<confirmAllPage> {
  DateTime? appointDate;
  void addPrescription() async {
    var asyncRequest = AsyncRequest();
    Map<String, dynamic> body = widget.bodyData;
    final outputFormat = DateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
    final appointDateAfterConvert = outputFormat.format(
        (DateTime.parse(body['appointDate'].toIso8601String())).toUtc());
    body['appointDate'] = appointDateAfterConvert;
    Map<String, dynamic> result =
        await asyncRequest.apiMethodPost('/appointment/add', body);
    if (result['resultData'] == "Có lỗi khi kết nối với server.") {
      showMyDialog("THÔNG BÁO", "Có lỗi khi kết nối với server", 0);
    } else {
      showMyDialog("THÀNH CÔNG", "Đặt lịch khám thành công", 1);
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
                          builder: (context) => const appointmentListPage()));
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
  void initState() {
    // TODO: implement initState
    super.initState();
    print((widget.bodyData['appointDate'].runtimeType));
    print((widget.bodyData['appointDate']));
    setState(() {
      appointDate = widget.bodyData['appointDate'];
    });
  }

  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;
    double screenHeight = MediaQuery.of(context).size.height;
    return SafeArea(
      child: Scaffold(
          appBar: AppBar(
            toolbarHeight: 65,
            backgroundColor: const Color.fromARGB(255, 28, 160, 154),
            title: Container(
              margin: const EdgeInsets.only(left: 42),
              child: const Text(
                "XÁC NHẬN THÔNG TIN",
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
            ),
          ),
          body: Column(
            children: [
              Expanded(
                child: ListView(children: [
                  Column(
                    children: [
                      const SizedBox(
                        height: 20,
                      ),
                      _inforExamination(
                          context,
                          widget.departmentData,
                          widget.doctorData,
                          widget.bodyData,
                          widget.valueBHYTData,
                          widget.contentAppointmentData),
                      const SizedBox(height: 5),
                      _inforPatient(context, widget.infoPatientData),
                    ],
                  ),
                ]),
              ),
              const SizedBox(height: 5),
              const Divider(
                thickness: 1,
                color: Colors.blue,
              ),
              const SizedBox(
                height: 10,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  Container(
                    height: 50,
                    width: 150,
                    child: ElevatedButton(
                        onPressed: () {
                          Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (context) => bookPage(
                                        idPatientData:
                                            '${widget.bodyData['patientId']}',
                                      )));
                        },
                        style: ButtonStyle(
                          backgroundColor:
                              MaterialStateProperty.all<Color>(Colors.white),
                          foregroundColor:
                              MaterialStateProperty.all<Color>(Colors.blue),
                          elevation: MaterialStateProperty.all<double>(0),
                          side: MaterialStateProperty.all<BorderSide>(
                            const BorderSide(
                                color: Color.fromARGB(255, 28, 160, 154),
                                width: 2.0),
                          ),
                        ),
                        child: const Text(
                          'QUAY LẠI',
                          style: TextStyle(
                            color: Color.fromARGB(255, 28, 160, 154),
                            fontSize: 13,
                          ),
                        )),
                  ),
                  Container(
                    height: 50,
                    width: 150,
                    child: ElevatedButton(
                        onPressed: addPrescription,
                        style: ButtonStyle(
                            backgroundColor: MaterialStateProperty.all<Color>(
                                const Color.fromARGB(255, 28, 160, 154))),
                        child: const Text(
                          'HOÀN THÀNH',
                          style: TextStyle(
                              color: Color.fromARGB(255, 255, 255, 255),
                              fontSize: 13),
                        )),
                  ),
                ],
              ),
              SizedBox(
                height: 10,
              )
            ],
          )),
    );
  }

  _inforExamination(context, dynamic departmentData, dynamic doctorData,
      dynamic bodyData, dynamic valueBHYTData, dynamic contentAppointmentData) {
    double screenHeight = MediaQuery.of(context).size.height;
    double screenWidth = MediaQuery.of(context).size.height;
    return Column(
      children: [
        Container(
          margin: const EdgeInsets.only(left: 15, right: 15),
          width: screenWidth,
          decoration: BoxDecoration(
              border: Border.all(
                  color: const Color.fromARGB(255, 22, 98, 152),
                  width: 2,
                  style: BorderStyle.solid)),
          child: Padding(
            padding: const EdgeInsets.only(left: 15.0, right: 15),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                const SizedBox(
                  height: 10,
                ),
                const Center(
                    child: Text(
                  "THÔNG TIN KHÁM BỆNH",
                  style: TextStyle(
                      color: Colors.black,
                      fontWeight: FontWeight.bold,
                      fontSize: 17),
                )),
                const SizedBox(
                  height: 20,
                ),
                Container(
                    alignment: Alignment.topLeft,
                    child: RichText(
                      text: TextSpan(
                        style: const TextStyle(color: Colors.black),
                        children: [
                          const TextSpan(
                            text: 'Tên bệnh nhân : ',
                            style: TextStyle(
                                fontWeight: FontWeight.bold, fontSize: 16),
                          ),
                          TextSpan(
                              text: '${widget.infoPatientData['fullName']}',
                              style: const TextStyle(fontSize: 16)),
                        ],
                      ),
                    )),
                const SizedBox(
                  height: 10,
                ),
                Container(
                    alignment: Alignment.topLeft,
                    child: RichText(
                      text: TextSpan(
                        style: const TextStyle(color: Colors.black),
                        children: [
                          const TextSpan(
                            text: 'Chuyên khoa : ',
                            style: TextStyle(
                                fontWeight: FontWeight.bold, fontSize: 16),
                          ),
                          TextSpan(
                              text: '${widget.departmentData['name']}',
                              style: const TextStyle(fontSize: 16)),
                        ],
                      ),
                    )),
                const SizedBox(
                  height: 5,
                ),
                const SizedBox(
                  height: 5,
                ),
                Container(
                    alignment: Alignment.topLeft,
                    child: RichText(
                      text: TextSpan(
                        style: const TextStyle(color: Colors.black),
                        children: [
                          const TextSpan(
                            text: 'Thời gian : ',
                            style: TextStyle(
                                fontWeight: FontWeight.bold, fontSize: 16),
                          ),
                          TextSpan(
                              text:
                                  '${DateFormat('dd-MM-yyyy HH:mm:ss').format(appointDate!)}',
                              style: const TextStyle(fontSize: 16)),
                        ],
                      ),
                    )),
                const SizedBox(
                  height: 5,
                ),
                const SizedBox(
                  height: 5,
                ),
                Container(
                    alignment: Alignment.topLeft,
                    child: RichText(
                      text: TextSpan(
                        style: const TextStyle(color: Colors.black),
                        children: [
                          const TextSpan(
                            text: 'Bảo hiểm y tế : ',
                            style: TextStyle(
                                fontWeight: FontWeight.bold, fontSize: 16),
                          ),
                          TextSpan(
                              text: (valueBHYTData == 1) ? "chưa có" : "có",
                              style: const TextStyle(fontSize: 16)),
                        ],
                      ),
                    )),
                const SizedBox(
                  height: 10,
                ),
                Container(
                    alignment: Alignment.topLeft,
                    child: RichText(
                      text: TextSpan(
                        style: const TextStyle(color: Colors.black),
                        children: [
                          const TextSpan(
                            text: 'Nội dung cuộc hẹn : ',
                            style: TextStyle(
                                fontWeight: FontWeight.bold, fontSize: 16),
                          ),
                          TextSpan(
                              text: contentAppointmentData,
                              style: const TextStyle(fontSize: 16)),
                        ],
                      ),
                    )),
                const SizedBox(
                  height: 25,
                )
              ],
            ),
          ),
        ),
      ],
    );
  }

  _inforPatient(context, dynamic infoPatientData) {
    double screenWidth = MediaQuery.of(context).size.width;
    return Padding(
      padding: const EdgeInsets.all(15.0),
      child: Column(children: [
        Container(
          width: screenWidth,
          decoration: BoxDecoration(
              border: Border.all(
                  color: const Color.fromARGB(255, 22, 98, 152),
                  width: 2,
                  style: BorderStyle.solid)),
          child: Container(
            padding:
                const EdgeInsets.only(top: 7, left: 17, right: 17, bottom: 25),
            alignment: Alignment.topLeft,
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                const SizedBox(
                  height: 10,
                ),
                const Center(
                    child: Text(
                  "THÔNG TIN BỆNH NHÂN",
                  style: TextStyle(
                      color: Colors.black,
                      fontWeight: FontWeight.bold,
                      fontSize: 17),
                )),
                const SizedBox(
                  height: 20,
                ),
                Container(
                    alignment: Alignment.topLeft,
                    child: RichText(
                      text: TextSpan(
                        style: const TextStyle(color: Colors.black),
                        children: [
                          const TextSpan(
                            text: 'Họ tên : ',
                            style: TextStyle(
                                fontWeight: FontWeight.bold, fontSize: 16),
                          ),
                          TextSpan(
                              text: '${infoPatientData['fullName']}',
                              style: const TextStyle(fontSize: 16)),
                        ],
                      ),
                    )),
                const SizedBox(
                  height: 13,
                ),
                Row(
                  children: [
                    RichText(
                      text: TextSpan(
                        style: const TextStyle(color: Colors.black),
                        children: [
                          const TextSpan(
                            text: 'Mã số bệnh nhân : ',
                            style: TextStyle(
                                fontWeight: FontWeight.bold, fontSize: 16),
                          ),
                          TextSpan(
                              text: (infoPatientData['code'] == null)
                                  ? 'Chưa cập nhật'
                                  : '${infoPatientData['code']}',
                              style: const TextStyle(fontSize: 16)),
                        ],
                      ),
                    )
                  ],
                ),
                const SizedBox(
                  height: 13,
                ),
                Container(
                    alignment: Alignment.topLeft,
                    child: RichText(
                      text: TextSpan(
                        style: const TextStyle(color: Colors.black),
                        children: [
                          const TextSpan(
                            text: 'Sinh ngày : ',
                            style: TextStyle(
                                fontWeight: FontWeight.bold, fontSize: 16),
                          ),
                          TextSpan(
                              text:
                                  '${DateFormat('dd-MM-yyyy').format(DateTime.parse(infoPatientData['birthday']))}',
                              style: const TextStyle(fontSize: 16)),
                        ],
                      ),
                    )),
                const SizedBox(
                  height: 13,
                ),
                Container(
                    alignment: Alignment.topLeft,
                    child: RichText(
                      text: TextSpan(
                        style: const TextStyle(color: Colors.black),
                        children: [
                          const TextSpan(
                            text: 'Giới tính : ',
                            style: TextStyle(
                                fontWeight: FontWeight.bold, fontSize: 16),
                          ),
                          TextSpan(
                              text: (infoPatientData['gender'] == "MALE")
                                  ? "Nam"
                                  : "Nữ",
                              style: const TextStyle(fontSize: 16)),
                        ],
                      ),
                    )),
                const SizedBox(
                  height: 13,
                ),
                Container(
                    alignment: Alignment.topLeft,
                    child: RichText(
                      text: TextSpan(
                        style: const TextStyle(color: Colors.black),
                        children: [
                          const TextSpan(
                            text: 'Quốc gia : ',
                            style: TextStyle(
                                fontWeight: FontWeight.bold, fontSize: 16),
                          ),
                          TextSpan(
                              text: '${infoPatientData['nation']}',
                              style: const TextStyle(fontSize: 16)),
                        ],
                      ),
                    )),
                const SizedBox(
                  height: 13,
                ),
                Container(
                    alignment: Alignment.topLeft,
                    child: RichText(
                      text: TextSpan(
                        style: const TextStyle(color: Colors.black),
                        children: [
                          const TextSpan(
                            text: 'Số điện thoại : ',
                            style: TextStyle(
                                fontWeight: FontWeight.bold, fontSize: 16),
                          ),
                          TextSpan(
                              text: '${infoPatientData['phone']}',
                              style: const TextStyle(fontSize: 16)),
                        ],
                      ),
                    )),
                const SizedBox(
                  height: 13,
                ),
                Container(
                    alignment: Alignment.topLeft,
                    child: RichText(
                      text: TextSpan(
                        style: const TextStyle(color: Colors.black),
                        children: [
                          const TextSpan(
                            text: 'Email : ',
                            style: TextStyle(
                                fontWeight: FontWeight.bold, fontSize: 16),
                          ),
                          TextSpan(
                              text: (infoPatientData['email'] == null)
                                  ? "Chưa cập nhật"
                                  : '${infoPatientData['email']}',
                              style: const TextStyle(fontSize: 16)),
                        ],
                      ),
                    )),
              ],
            ),
          ),
        ),
        const SizedBox(
          height: 25,
        ),
        Container(
          width: screenWidth,
          decoration: BoxDecoration(
              border: Border.all(
                  color: Color.fromARGB(255, 22, 98, 152),
                  width: 2,
                  style: BorderStyle.solid)),
          child: Padding(
            padding: const EdgeInsets.only(left: 15.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                const SizedBox(
                  height: 20,
                ),
                Container(
                  child: const Text(
                    "THÔNG TIN NGƯỜI THÂN",
                    style: TextStyle(
                        color: Colors.black,
                        fontWeight: FontWeight.bold,
                        fontSize: 17),
                  ),
                ),
                const SizedBox(
                  height: 20,
                ),
                Container(
                    alignment: Alignment.topLeft,
                    child: RichText(
                      text: TextSpan(
                        style: const TextStyle(color: Colors.black),
                        children: [
                          const TextSpan(
                            text: 'Họ tên người thân : ',
                            style: TextStyle(
                                fontWeight: FontWeight.bold, fontSize: 16),
                          ),
                          TextSpan(
                              text: (infoPatientData['fatherName'] != null)
                                  ? infoPatientData['fatherName']
                                  : "",
                              style: const TextStyle(fontSize: 16)),
                        ],
                      ),
                    )),
                const SizedBox(
                  height: 13,
                ),
                Container(
                    alignment: Alignment.topLeft,
                    child: RichText(
                      text: TextSpan(
                        style: const TextStyle(color: Colors.black),
                        children: [
                          const TextSpan(
                            text: 'Quan hệ với bệnh nhân : ',
                            style: TextStyle(
                                fontWeight: FontWeight.bold, fontSize: 16),
                          ),
                          TextSpan(
                              text: widget.relationshipData,
                              style: const TextStyle(fontSize: 16)),
                        ],
                      ),
                    )),
                const SizedBox(
                  height: 13,
                ),
                Container(
                    alignment: Alignment.topLeft,
                    child: RichText(
                      text: TextSpan(
                        style: const TextStyle(color: Colors.black),
                        children: [
                          const TextSpan(
                            text: 'Số điện thoại của người thân : ',
                            style: TextStyle(
                                fontWeight: FontWeight.bold, fontSize: 16),
                          ),
                          TextSpan(
                              text: (infoPatientData['fatherPhone'] != null)
                                  ? infoPatientData['fatherPhone']
                                  : "",
                              style: const TextStyle(fontSize: 16)),
                        ],
                      ),
                    )),
                const SizedBox(
                  height: 100,
                ),
              ],
            ),
          ),
        ),
      ]),
    );
  }
}
