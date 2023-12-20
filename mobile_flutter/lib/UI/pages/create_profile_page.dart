import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:intl/intl.dart';
import 'package:timecprj/UI/pages/choose_profile_page.dart';
import 'package:timecprj/UI/pages/confirm_infor_patient_page.dart';
import 'package:timecprj/service/agent.dart';

class createProfilePage extends StatefulWidget {
  const createProfilePage({super.key});

  @override
  State<createProfilePage> createState() => _createProfilePageState();
}

class _createProfilePageState extends State<createProfilePage> {
  bool isShowingPatientInfo = true;
  bool isShowingRelativesInfo = false;
  List<int> days = List<int>.generate(31, (int index) => index + 1);
  List<int> months = List<int>.generate(12, (int index) => index + 1);
  List<int> years = List<int>.generate(200, (int index) => 2024 - index);
  int? selectedDay;
  int? selectedMonth;
  int? selectedYear;
  String gender_user = "MALE";
  var _value = '1';
  var _value1 = '-1';
  TextEditingController firstName = TextEditingController();
  TextEditingController lastName = TextEditingController();
  TextEditingController phone = TextEditingController();
  TextEditingController email = TextEditingController();
  TextEditingController address = TextEditingController();
  List<dynamic> listCountry = [];
  Map<String, dynamic>? selectedCountry;

  TextEditingController relativeName = TextEditingController();
  String? relationship = "";
  TextEditingController relativePhone = TextEditingController();
  Map<String, dynamic>? body;

  @override
  void initState() {
    super.initState();
    loadDataFromJsonFile();
  }

  Future<void> loadDataFromJsonFile() async {
    final String jsonString =
        await rootBundle.loadString('images/countries.json');
    List<Map<String, dynamic>> countries =
        json.decode(jsonString).cast<Map<String, dynamic>>();
    setState(() {
      listCountry = countries;
      selectedCountry = countries[232];
    });
  }

  setBody() {
    DateTime birthday = DateTime(selectedYear!, selectedMonth!, selectedDay!);
    String formattedBirthday = DateFormat('yyyy-MM-dd').format(birthday);
    DateTime now = DateTime.now();
    String formattedNow = DateFormat('yyyy-MM-dd').format(now);

    body = {
      "fullName": "${firstName.text} ${lastName.text}",
      "gender": gender_user,
      "birthday": formattedBirthday,
      "phone": phone.text,
      "email": email.text,
      "address": address.text,
      "fatherName": relativeName.text,
      "fatherPhone": relativePhone.text,
      "motherName": null,
      "motherPhone": null,
      "code": null,
      "note": null,
      "createdDate": formattedNow,
      "insuranceCode": "",
      "patientId": "",
      "insuranceTypeId": "",
      "nation": selectedCountry?['name'],
      "customerLevel": "BASIC",
      "addressBHYT": "",
      "maDKBD": "",
      "addressDKBD": "",
    };
  }

  GlobalKey<FormState> formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
          appBar: AppBar(
            toolbarHeight: 65,
            backgroundColor: const Color.fromARGB(255, 28, 160, 154),
            title: Container(
              alignment: Alignment.center,
              child: const Text(
                "TẠO HỒ SƠ BỆNH NHÂN",
                style: TextStyle(fontSize: 17, fontWeight: FontWeight.bold),
              ),
            ),
          ),
          body: Padding(
            padding: const EdgeInsets.all(15.0),
            child: Form(
              key: formKey,
              child: Column(
                children: [
                  Expanded(
                    child: ListView(children: [
                      const SizedBox(
                        height: 10,
                      ),
                      Container(
                        decoration: BoxDecoration(
                          border: Border.all(
                            color: Colors.black,
                            width: 2.0,
                          ),
                        ),
                        child: Column(
                          children: [
                            const SizedBox(
                              height: 10,
                            ),
                            Container(
                              child: const Text(
                                "THÔNG TIN NGƯỜI BỆNH",
                                style: TextStyle(
                                  color: Color.fromARGB(255, 28, 160, 154),
                                  fontSize: 16,
                                  fontWeight: FontWeight.bold,
                                  decorationColor: Colors.blue,
                                  decorationThickness: 3.0,
                                ),
                              ),
                            ),
                            _inforPatient(),
                            const SizedBox(
                              height: 30,
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(
                        height: 20,
                      ),
                      Container(
                          decoration: BoxDecoration(
                              border: Border.all(
                            color: Colors.black,
                            width: 2,
                          )),
                          child: Column(children: [
                            const SizedBox(
                              height: 10,
                            ),
                            Container(
                              child: const Text(
                                "THÔNG TIN NGƯỜI THÂN",
                                style: TextStyle(
                                  color: Color.fromARGB(255, 28, 160, 154),
                                  fontSize: 16,
                                  fontWeight: FontWeight.bold,
                                  decorationColor: Colors.blue,
                                  decorationThickness: 3.0,
                                ),
                              ),
                            ),
                            _inforRelatives(),
                            const SizedBox(
                              height: 30,
                            )
                          ])),
                    ]),
                  ),
                  const Divider(
                    thickness: 1,
                    color: Colors.blue,
                  ),
                  const SizedBox(
                    height: 30,
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
                                      builder: ((context) => chooseProfile())));
                            },
                            style: ButtonStyle(
                              backgroundColor: MaterialStateProperty.all<Color>(
                                  Colors.white),
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
                                fontSize: 16,
                              ),
                            )),
                      ),
                      const SizedBox(
                        width: 5,
                      ),
                      Container(
                        height: 50,
                        width: 150,
                        child: ElevatedButton(
                            onPressed: () {
                              if (formKey.currentState!.validate() &&
                                  selectedYear != null &&
                                  selectedMonth != null &&
                                  selectedDay != null) {
                                setBody();
                                Navigator.push(
                                  context,
                                  MaterialPageRoute(
                                      builder: (context) =>
                                          confirmInforPatientPage(
                                            bodyData: body,
                                            relationshipData: relationship,
                                          )),
                                );
                              }
                            },
                            style: ButtonStyle(
                                backgroundColor: MaterialStateProperty.all<
                                        Color>(
                                    const Color.fromARGB(255, 28, 160, 154))),
                            child: const Text(
                              'TIẾP TỤC',
                              style: TextStyle(
                                  color: Color.fromARGB(255, 255, 255, 255),
                                  fontSize: 16),
                            )),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          )),
    );
  }

  _inforPatient() {
    double screenWidth = MediaQuery.of(context).size.width;
    double screenHeight = MediaQuery.of(context).size.height;
    return Padding(
      padding: const EdgeInsets.all(15.0),
      child: Column(children: [
        Container(
          alignment: Alignment.topLeft,
          child: const Text(
            'Họ và chữ lót (Có dấu)*',
            style: TextStyle(fontWeight: FontWeight.w500, fontSize: 16),
          ),
        ),
        Container(
          child: TextFormField(
            controller: firstName,
            decoration: const InputDecoration(
              hintText: 'Họ và chữ lót',
            ),
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Vui lòng nhập họ và chữ lót';
              }
              return null;
            },
          ),
        ),
        const SizedBox(
          height: 30,
        ),
        Container(
          alignment: Alignment.topLeft,
          child: const Text(
            'Tên bệnh nhân (Có dấu)*',
            style: TextStyle(fontWeight: FontWeight.w500, fontSize: 16),
          ),
        ),
        Container(
            child: TextFormField(
          controller: lastName,
          decoration: const InputDecoration(
            hintText: 'Tên bệnh nhân',
          ),
          validator: (value) {
            if (value == null || value.isEmpty) {
              return 'Vui lòng nhập tên bệnh nhân';
            }
            return null;
          },
        )),
        const SizedBox(
          height: 15,
        ),
        Container(
          alignment: Alignment.topLeft,
          child: const Text(
            'Địa chỉ',
            style: TextStyle(fontWeight: FontWeight.w500, fontSize: 16),
          ),
        ),
        Container(
            child: TextFormField(
          controller: address,
          decoration: const InputDecoration(
            hintText: 'Địa chỉ',
          ),
          validator: (value) {
            if (value == null || value.isEmpty) {
              return 'Vui lòng nhập địa chỉ';
            }
            return null;
          },
        )),
        const SizedBox(
          height: 30,
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Column(children: [
              Container(
                child: const Text(
                  'Năm sinh*',
                  style: TextStyle(fontWeight: FontWeight.w500, fontSize: 16),
                ),
              ),
              Row(children: [
                const Text(
                  'Chọn',
                  style: TextStyle(
                    fontSize: 15,
                    color: Color.fromARGB(255, 28, 160, 154),
                  ),
                ),
                const SizedBox(
                  width: 10,
                ),
                DropdownButton<int?>(
                  value: selectedYear,
                  hint: null,
                  items: years.map((int year) {
                    return DropdownMenuItem<int?>(
                      value: year,
                      child: Text(year.toString()),
                    );
                  }).toList(),
                  onChanged: (int? newValue) {
                    setState(() {
                      selectedYear = newValue;
                    });
                  },
                ),
              ]),
            ]),
            Column(children: [
              Container(
                child: const Text('Tháng sinh*',
                    style:
                        TextStyle(fontWeight: FontWeight.w500, fontSize: 16)),
              ),
              Row(children: [
                const Text(
                  'Chọn',
                  style: TextStyle(
                    fontSize: 15,
                    color: Color.fromARGB(255, 28, 160, 154),
                  ),
                ),
                const SizedBox(
                  width: 10,
                ),
                DropdownButton<int?>(
                  value: selectedMonth,
                  items: months.map((int months) {
                    return DropdownMenuItem<int?>(
                      value: months,
                      child: Text(months.toString()),
                    );
                  }).toList(),
                  onChanged: (int? newValue) {
                    setState(() {
                      selectedMonth = newValue;
                    });
                  },
                ),
              ]),
            ]),
            Column(children: [
              Container(
                child: const Text('Ngày sinh*',
                    style:
                        TextStyle(fontWeight: FontWeight.w500, fontSize: 16)),
              ),
              Row(children: [
                const Text(
                  'Chọn',
                  style: TextStyle(
                    fontSize: 15,
                    color: Color.fromARGB(255, 28, 160, 154),
                  ),
                ),
                const SizedBox(
                  width: 10,
                ),
                DropdownButton<int?>(
                  value: selectedDay,
                  items: days.map((int days) {
                    return DropdownMenuItem<int?>(
                      value: days,
                      child: Text(days.toString()),
                    );
                  }).toList(),
                  onChanged: (int? newValue) {
                    setState(() {
                      selectedDay = newValue;
                    });
                  },
                ),
              ]),
            ]),
          ],
        ),
        if (selectedYear == null ||
            selectedMonth == null ||
            selectedDay == null)
          const Text(
            'Vui lòng chọn ngày, tháng, và năm sinh',
            style: TextStyle(color: Colors.red),
          ),
        const SizedBox(
          height: 15,
        ),
        Container(
          alignment: Alignment.topLeft,
          child: const Text('Giới tính *',
              style: TextStyle(fontWeight: FontWeight.w500, fontSize: 16)),
        ),
        DropdownButtonFormField(
          value: _value,
          items: const [
            DropdownMenuItem(
              value: '1',
              child: Text(
                "Nam ",
                style: TextStyle(color: Colors.black, fontSize: 15),
              ),
            ),
            DropdownMenuItem(
              value: '2',
              child: Text(
                "Nữ ",
                style: TextStyle(color: Colors.black, fontSize: 15),
              ),
            )
          ],
          onChanged: (String? value) {
            if (value == '1') {
              setState(() {
                gender_user = "MALE";
              });
            } else if (value == '2') {
              setState(() {
                gender_user = "FEMALE";
              });
            }
          },
          validator: (value) {
            if (value == '-1') {
              return 'Vui lòng chọn giới tính';
            }
            return null;
          },
        ),
        const SizedBox(
          height: 20,
        ),
        Container(
          alignment: Alignment.topLeft,
          child: const Text('Quốc gia',
              style: TextStyle(fontWeight: FontWeight.w500, fontSize: 16)),
        ),
        DropdownButtonFormField<dynamic>(
          decoration: const InputDecoration(
            fillColor: Colors.orange,
          ),
          value: selectedCountry,
          items: listCountry.map((country) {
            return DropdownMenuItem(
              value: country,
              child: Container(
                width: 250,
                child: Text(
                  country['name'],
                  style: const TextStyle(fontSize: 16),
                ),
              ),
            );
          }).toList(),
          onChanged: (newValue) {
            setState(() {
              selectedCountry = newValue;
            });
          },
        ),
        const SizedBox(
          height: 40,
        ),
        Container(
          alignment: Alignment.topLeft,
          child: const Text(
            'Số điện thoại*',
            style: TextStyle(fontWeight: FontWeight.w500, fontSize: 16),
          ),
        ),
        Container(
            child: TextFormField(
          controller: phone,
          decoration: const InputDecoration(
              hintText: 'Nhập số điện thoại',
              hintStyle: TextStyle(fontStyle: FontStyle.italic)),
          validator: (value) {
            if (value == null || value.isEmpty) {
              return 'Vui lòng nhập số điện thoại';
            } else if (value.length != 10 || int.tryParse(value) == null) {
              return 'Số điện thoại phải là số nguyên 10 chữ số';
            }
            return null;
          },
        )),
        const SizedBox(
          height: 20,
        ),
        Container(
          alignment: Alignment.topLeft,
          child: const Text(
            'Email (dùng để nhận phiêu khám bệnh)*',
            style: TextStyle(fontWeight: FontWeight.w500, fontSize: 16),
          ),
        ),
        Container(
            child: TextFormField(
          controller: email,
          decoration: const InputDecoration(
              hintText: 'Email',
              hintStyle: TextStyle(fontStyle: FontStyle.italic)),
          validator: (value) {
            if (value == null || value.isEmpty) {
              return 'Vui lòng nhập email';
            } else if (!value.endsWith('@gmail.com')) {
              return 'Email phải có định dạng @gmail.com';
            }
            return null;
          },
        )),
      ]),
    );
  }

  _inforRelatives() {
    //double screenWidth = MediaQuery.of(context).size.width;
    //double screenHeight = MediaQuery.of(context).size.height;
    if (isShowingRelativesInfo) {
      isShowingRelativesInfo = true;
    }
    return Padding(
      padding: const EdgeInsets.all(15.0),
      child: Column(
        children: [
          Container(
            alignment: Alignment.topLeft,
            child: const Text(
              'Tên người thân',
              style: TextStyle(fontWeight: FontWeight.w500, fontSize: 16),
            ),
          ),
          Container(
              child: TextFormField(
            controller: relativeName,
            decoration: const InputDecoration(
                hintText: 'Nhập tên ',
                hintStyle: TextStyle(fontStyle: FontStyle.italic)),
          )),
          const SizedBox(
            height: 15,
          ),
          Container(
            alignment: Alignment.topLeft,
            child: const Text('Quan hệ với người bệnh',
                style: TextStyle(fontWeight: FontWeight.w500, fontSize: 16)),
          ),
          DropdownButtonFormField(
            value: _value1,
            items: const [
              DropdownMenuItem(
                value: '-1',
                child: Text(
                  "Chọn ",
                  style: TextStyle(
                      color: Color.fromARGB(255, 28, 160, 154),
                      fontSize: 15,
                      fontStyle: FontStyle.italic),
                ),
              ),
              DropdownMenuItem(
                value: 'Cha/mẹ',
                child: Text(
                  "Cha/mẹ",
                  style: TextStyle(
                      color: Color.fromARGB(255, 0, 0, 0), fontSize: 15),
                ),
              ),
              DropdownMenuItem(
                value: 'Vợ/chồng',
                child: Text(
                  "Vợ/chồng",
                  style: TextStyle(
                      color: Color.fromARGB(255, 0, 0, 0), fontSize: 15),
                ),
              ),
              DropdownMenuItem(
                value: 'Con cái',
                child: Text(
                  " Con cái ",
                  style: TextStyle(
                      color: Color.fromARGB(255, 0, 0, 0), fontSize: 15),
                ),
              ),
              DropdownMenuItem(
                value: 'Bạn bè',
                child: Text(
                  " Bạn bè ",
                  style: TextStyle(
                      color: Color.fromARGB(255, 0, 0, 0), fontSize: 15),
                ),
              ),
              DropdownMenuItem(
                value: 'Anh/chị/em',
                child: Text(
                  " Anh/chị/em ",
                  style: TextStyle(
                      color: Color.fromARGB(255, 0, 0, 0), fontSize: 15),
                ),
              )
            ],
            onChanged: (String? value) {
              setState(() {
                relationship = value;
              });
            },
          ),
          const SizedBox(
            height: 15,
          ),
          Container(
            alignment: Alignment.topLeft,
            child: const Text(
              'Số điện thoại người thân',
              style: TextStyle(fontWeight: FontWeight.w500, fontSize: 16),
            ),
          ),
          Container(
              child: TextFormField(
            controller: relativePhone,
            decoration: const InputDecoration(
                hintText: 'Nhập số điện thoại ',
                hintStyle: TextStyle(fontStyle: FontStyle.italic)),
          )),
        ],
      ),
    );
  }
}
