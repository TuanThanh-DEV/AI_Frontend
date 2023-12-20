import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:timecprj/UI/pages/confirm_all_page.dart';
import 'package:timecprj/service/agent.dart';

class confirmBookPage extends StatefulWidget {
  final dynamic infoPatientData;
  final dynamic selectedDateData;
  final dynamic selectedTimeData;
  final dynamic departmentData;
  final dynamic doctorData;
  final dynamic valueBHYTData;
  final dynamic contentAppointmentData;
  final dynamic relationshipData;
  const confirmBookPage(
      {super.key,
      this.infoPatientData,
      this.selectedDateData,
      this.selectedTimeData,
      this.valueBHYTData,
      this.departmentData,
      this.doctorData,
      this.contentAppointmentData,
      this.relationshipData});

  @override
  State<confirmBookPage> createState() => _confirmBookPageState();
}

class _confirmBookPageState extends State<confirmBookPage> {
  Map<String, dynamic>? body;

  setBody() {
    DateTime newDateTime = DateTime(
      (widget.selectedDateData).year,
      (widget.selectedDateData).month,
      (widget.selectedDateData).day,
      (widget.selectedTimeData).hour,
      (widget.selectedTimeData).minute,
    );
    print(newDateTime);
    body = {
      "appointDate": newDateTime,
      "departmentId": widget.departmentData['id'],
      "hospitalId": 1,
      "patientId": widget.infoPatientData['id'],
      "status": widget.contentAppointmentData,
      "userId": null,
    };
    print((widget.selectedTimeData).runtimeType);
  }

  @override
  Widget build(BuildContext context) {
    String formattedDate =
        DateFormat('dd-MM-yyyy').format(widget.selectedDateData);
    double screenWidth = MediaQuery.of(context).size.width;
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          toolbarHeight: 65,
          backgroundColor: Color.fromARGB(255, 28, 160, 154),
          title: Container(
            alignment: Alignment.center,
            child: const Text(
              "XÁC NHẬN LỊCH KHÁM",
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
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
                    const Center(
                        child: Text(
                      "XÁC NHẬN THÔNG TIN ĐẶT LỊCH",
                      style: TextStyle(
                          color: Colors.black,
                          fontWeight: FontWeight.bold,
                          fontSize: 18),
                    )),
                    const SizedBox(
                      height: 25,
                    ),
                    Container(
                      width: screenWidth,
                      height: 50,
                      alignment: Alignment.centerLeft,
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
                      ),
                    ),
                    Container(
                      width: screenWidth,
                      height: 50,
                      alignment: Alignment.centerLeft,
                      child: RichText(
                        text: const TextSpan(
                          style: TextStyle(color: Colors.black),
                          children: [
                            TextSpan(
                              text: 'Phòng khám : ',
                              style: TextStyle(
                                  fontWeight: FontWeight.bold, fontSize: 16),
                            ),
                            TextSpan(
                                text: 'Đa khoa Quốc tế TIMEC',
                                style: TextStyle(fontSize: 16)),
                          ],
                        ),
                      ),
                    ),
                    Container(
                      width: screenWidth,
                      height: 50,
                      alignment: Alignment.centerLeft,
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
                                text: "${widget.departmentData['name']}",
                                style: const TextStyle(fontSize: 16)),
                          ],
                        ),
                      ),
                    ),
                    Container(
                      width: screenWidth,
                      height: 50,
                      alignment: Alignment.centerLeft,
                      child: RichText(
                        text: TextSpan(
                          style: const TextStyle(color: Colors.black),
                          children: [
                            const TextSpan(
                              text: 'Ngày khám : ',
                              style: TextStyle(
                                  fontWeight: FontWeight.bold, fontSize: 16),
                            ),
                            TextSpan(
                                text: formattedDate,
                                style: TextStyle(fontSize: 16)),
                          ],
                        ),
                      ),
                    ),
                    Container(
                      width: screenWidth,
                      height: 50,
                      alignment: Alignment.centerLeft,
                      child: RichText(
                        text: TextSpan(
                          style: const TextStyle(color: Colors.black),
                          children: [
                            const TextSpan(
                              text: 'Giờ khám bệnh : ',
                              style: TextStyle(
                                  fontWeight: FontWeight.bold, fontSize: 16),
                            ),
                            TextSpan(
                                text: '${_formatTime(widget.selectedTimeData)}',
                                style: const TextStyle(fontSize: 16)),
                          ],
                        ),
                      ),
                    ),
                    Container(
                      width: screenWidth,
                      height: 50,
                      alignment: Alignment.centerLeft,
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
                                text: '${widget.contentAppointmentData}',
                                style: const TextStyle(fontSize: 16)),
                          ],
                        ),
                      ),
                    ),
                    const SizedBox(
                      height: 15,
                    ),
                    Row(
                      children: [
                        Padding(
                          padding: const EdgeInsets.only(left: 0),
                          child: Container(
                            alignment: Alignment.topLeft,
                            child: const Text(
                              'Bảo hiểm y tế :',
                              style: TextStyle(
                                  fontSize: 16, fontWeight: FontWeight.bold),
                            ),
                          ),
                        ),
                        Checkbox(
                          value: (widget.valueBHYTData == 6) ? true : false,
                          onChanged: null,
                        ),
                        const Text(
                          'Có',
                          style: TextStyle(
                            fontSize: 16,
                          ),
                        ),
                        Checkbox(
                          value: (widget.valueBHYTData == 1) ? true : false,
                          onChanged: null,
                        ),
                        const Text(
                          'Không',
                          style: TextStyle(
                            fontSize: 16,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(
                      height: 15,
                    ),
                    const SizedBox(
                      height: 30,
                    ),
                    Container(
                      height: 50,
                      width: screenWidth,
                      child: ElevatedButton(
                          onPressed: () {
                            setBody();
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                  builder: (context) => confirmAllPage(
                                      bodyData: body,
                                      valueBHYTData: widget.valueBHYTData,
                                      departmentData: widget.departmentData,
                                      doctorData: widget.doctorData,
                                      infoPatientData: widget.infoPatientData,
                                      contentAppointmentData:
                                          widget.contentAppointmentData,
                                      relationshipData:
                                          widget.relationshipData)),
                            );
                          },
                          style: ElevatedButton.styleFrom(
                            primary: const Color.fromARGB(255, 247, 120, 30),
                          ),
                          child: const Text(
                            'XÁC NHẬN THÔNG TIN',
                            style: TextStyle(
                                color: Color.fromARGB(255, 255, 255, 255),
                                fontSize: 15),
                          )),
                    ),
                  ]),
                ),
              ]),
            ),
            const Divider(
              thickness: 1,
              color: Colors.blue,
            ),
            const SizedBox(
              height: 15,
            ),
            Row(
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
          ],
        ),
      ),
    );
  }

  String _formatTime(TimeOfDay time) {
    return '${time.hour}:${time.minute.toString().padLeft(2, '0')}';
  }
}
