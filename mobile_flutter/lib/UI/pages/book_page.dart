import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:timecprj/UI/pages/choose_profile_page.dart';
import 'package:timecprj/UI/pages/confirm_book_page.dart';
import 'package:timecprj/service/agent.dart';

import '../widgets/input_field.dart';

class bookPage extends StatefulWidget {
  final String idPatientData;

  const bookPage({super.key, required this.idPatientData});

  @override
  State<bookPage> createState() => _bookPageState();
}

class _bookPageState extends State<bookPage> {
  int valueBHYT = 1;
  DateTime _selectedDate = DateTime.now();
  TimeOfDay _selectedTime = TimeOfDay.now();
  TextEditingController contentAppointment = TextEditingController();

  List<dynamic> departments = [];
  Map<String, dynamic>? selectedDepartment;
  List<dynamic> doctors = [];
  Map<String, dynamic>? selectedDoctor;
  String relationship = "";

  dynamic infoPatient = [];

  @override
  void initState() {
    super.initState();
    getDepartmentsAndDoctors();
    getInfoPatient();
  }

  Future<void> getDepartmentsAndDoctors() async {
    var asyncRequest = AsyncRequest();
    Map<String, dynamic> resultDepartment =
        await asyncRequest.apiMethodGet('department/listAll');
    setState(() {
      departments = resultDepartment['resultData'];
      if (resultDepartment['resultData'].isEmpty) {
        departments = [
          {"name": 'Chưa có chuyên khoa nào'}
        ];
        selectedDepartment = departments[0];
      } else {
        selectedDepartment = departments[0];
      }
    });
    Map<String, dynamic> resultDoctor =
        await asyncRequest.apiMethodGet('user/listAllDoctor/active');
    setState(() {
      doctors = resultDoctor['resultData'];
      if (resultDoctor['resultData'].isEmpty) {
        doctors = [
          {"fullName": 'Chưa có bác sĩ nào'}
        ];
        selectedDoctor = doctors[0];
      } else {
        selectedDoctor = doctors[0];
      }
    });
  }

  Future<void> getInfoPatient() async {
    var asyncRequest = AsyncRequest();
    Map<String, dynamic> result =
        await asyncRequest.apiMethodGet('patient/${widget.idPatientData}');
    Map<String, dynamic> jsonMap =
        json.decode(localStorage.getItem('currentUser'));
    String idCurrentUser = jsonMap['idPatient'].toString();
    Map<String, dynamic> resultRelationship = await asyncRequest.apiMethodGet(
        'patientbyaccount/findbyidpatientaccountandidpatient?idaccountpatient=$idCurrentUser&idpatient=${widget.idPatientData}');
    print(result);
    print(resultRelationship);
    setState(() {
      infoPatient = result['resultData'];
      relationship = (resultRelationship['resultData']['relationship'] != null)
          ? resultRelationship['resultData']['relationship']
          : "";
    });
  }

  Future<void> showMyDialog() async {
    return showDialog<void>(
      context: context,
      barrierDismissible: false,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Center(
            child: Text(
              'THÔNG BÁO',
              style: TextStyle(color: Colors.red, fontWeight: FontWeight.bold),
            ),
          ),
          content: const SingleChildScrollView(
            child: ListBody(
              children: <Widget>[
                Center(child: Text('Chưa có chuyên khoa hoặc bác sĩ')),
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
                    const Size(200, 40.0),
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

  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          toolbarHeight: 65,
          backgroundColor: const Color.fromARGB(255, 28, 160, 154),
          title: Container(
            alignment: Alignment.center,
            child: const Text(
              "ĐẶT LỊCH KHÁM",
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
                      "NHẬP THÔNG TIN ĐẶT LỊCH",
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
                                text:
                                    '${(infoPatient.isEmpty) ? "" : infoPatient['fullName']}',
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
                    const SizedBox(
                      height: 20,
                    ),
                    Container(
                      alignment: Alignment.topLeft,
                      child: const Text(
                        'Chọn chuyên khoa',
                        style: TextStyle(
                            color: Colors.black,
                            fontSize: 16,
                            fontWeight: FontWeight.bold),
                      ),
                    ),
                    DropdownButtonFormField<dynamic>(
                      decoration: const InputDecoration(
                        fillColor: Colors.orange,
                      ),
                      value: selectedDepartment,
                      items: departments.map((deparment) {
                        return DropdownMenuItem(
                          value: deparment,
                          child: Text(
                            deparment['name'],
                            style: const TextStyle(fontSize: 16),
                          ),
                        );
                      }).toList(),
                      onChanged: (newValue) {
                        setState(() {
                          selectedDepartment = newValue;
                        });
                      },
                    ),
                    const SizedBox(
                      height: 20,
                    ),
                    const SizedBox(
                      height: 20,
                    ),
                    Container(
                      alignment: Alignment.topLeft,
                      child: const Text(
                        'Nội dung cuộc hẹn',
                        style: TextStyle(
                            fontWeight: FontWeight.w700, fontSize: 16),
                      ),
                    ),
                    Container(
                        child: TextFormField(
                      controller: contentAppointment,
                      decoration: const InputDecoration(
                          hintText: 'Nhập nội dung cuộc hẹn',
                          hintStyle: TextStyle(fontStyle: FontStyle.italic)),
                    )),
                    InputField(
                      title: "Chọn ngày khám ",
                      hint: DateFormat.yMd().format(_selectedDate),
                      widget: IconButton(
                        icon: (const Icon(
                          Icons.calendar_month_sharp,
                          color: Colors.grey,
                        )),
                        onPressed: () {
                          _getDateFromUser();
                        },
                      ),
                    ),
                    InputField(
                      title: "Chọn giờ khám",
                      hint: _formatTime(_selectedTime),
                      widget: IconButton(
                        icon: const Icon(
                          Icons.access_time,
                          color: Colors.grey,
                        ),
                        onPressed: () {
                          _getTimeFromUser();
                        },
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
                          value: (valueBHYT == 6) ? true : false,
                          onChanged: (bool? value) {
                            setState(() {
                              valueBHYT = 6;
                            });
                          },
                          activeColor: Colors.orange,
                        ),
                        Text(
                          'Có',
                          style: TextStyle(
                            color:
                                (valueBHYT == 6) ? Colors.orange : Colors.black,
                            fontSize: 16,
                          ),
                        ),
                        Checkbox(
                          value: (valueBHYT == 1) ? true : false,
                          onChanged: (bool? value) {
                            setState(() {
                              valueBHYT = 1;
                            });
                          },
                          activeColor: Colors.orange,
                        ),
                        Text(
                          'Không',
                          style: TextStyle(
                            color:
                                (valueBHYT == 1) ? Colors.orange : Colors.black,
                            fontSize: 16,
                          ),
                        ),
                      ],
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
              height: 25,
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                Container(
                  height: 50,
                  width: 120,
                  child: ElevatedButton(
                      onPressed: () {
                        Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) => chooseProfile()));
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
                          fontSize: 14,
                        ),
                      )),
                ),
                Container(
                  height: 50,
                  width: 120,
                  child: ElevatedButton(
                      onPressed: () {
                        if (selectedDepartment?['name'] ==
                            "Chưa có hàng chuyên khoa nào") {
                          showMyDialog();
                        } else if (selectedDoctor?['fullName'] ==
                            "Chưa có bác sĩ nào") {
                          showMyDialog();
                        } else {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                                builder: (context) => confirmBookPage(
                                      infoPatientData: infoPatient,
                                      selectedDateData: _selectedDate,
                                      selectedTimeData: _selectedTime,
                                      departmentData: selectedDepartment,
                                      doctorData: selectedDoctor,
                                      valueBHYTData: valueBHYT,
                                      contentAppointmentData:
                                          contentAppointment.text,
                                      relationshipData: relationship,
                                    )),
                          );
                        }
                      },
                      style: ButtonStyle(
                          backgroundColor: MaterialStateProperty.all<Color>(
                              const Color.fromARGB(255, 28, 160, 154))),
                      child: const Text(
                        'TIẾP TỤC',
                        style: TextStyle(
                            color: Color.fromARGB(255, 255, 255, 255),
                            fontSize: 14),
                      )),
                ),
              ],
            ),
            SizedBox(
              height: 15,
            )
          ],
        ),
      ),
    );
  }

  _getDateFromUser() async {
    final DateTime? _pickedDate = await showDatePicker(
        context: context,
        initialDate: _selectedDate,
        initialDatePickerMode: DatePickerMode.day,
        firstDate: DateTime(2015),
        lastDate: DateTime(2101));
    if (_pickedDate != null) {
      setState(() {
        _selectedDate = _pickedDate;
      });
    }
  }

  String _formatTime(TimeOfDay time) {
    return '${time.hour}:${time.minute.toString().padLeft(2, '0')}';
  }

  _getTimeFromUser() async {
    final TimeOfDay? _pickedTime = await showTimePicker(
      context: context,
      initialTime: _selectedTime,
      builder: (BuildContext context, Widget? child) {
        return MediaQuery(
          data: MediaQuery.of(context).copyWith(alwaysUse24HourFormat: true),
          child: child!,
        );
      },
    );
    if (_pickedTime != null) {
      setState(() {
        _selectedTime = _pickedTime;
      });
    }
  }
}
