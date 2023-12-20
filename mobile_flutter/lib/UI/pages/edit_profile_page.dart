import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:intl/intl.dart';
import 'package:timecprj/UI/pages/choose_profile_page.dart';
import 'package:timecprj/UI/pages/confirm_infor_patient_page.dart';
import 'package:timecprj/service/agent.dart';
//import 'package:timecprj/UI/widgets/input_field.dart';

class editProfilePage extends StatefulWidget {
  final dynamic idPatientData;
  const editProfilePage({super.key, this.idPatientData});

  @override
  State<editProfilePage> createState() => _editProfilePageState();
}

class _editProfilePageState extends State<editProfilePage> {
  bool isShowingPatientInfo = true;
  bool isShowingRelativesInfo = false;
  int selectedButton = 1;
  List<int> days = List<int>.generate(31, (int index) => index + 1);
  List<int> months = List<int>.generate(12, (int index) => index + 1);
  List<int> years = List<int>.generate(200, (int index) => 1900 + index);
  int? selectedDay;
  int? selectedMonth;
  int? selectedYear;
  String gender_user = "MALE";
  var _value = '-1';
  var _value1 = '-1';
  TextEditingController fullName = TextEditingController();
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
    getInfoPatient();
  }

  void selectButton(int buttonNumber) {
    setState(() {
      selectedButton = buttonNumber;
    });
    if (buttonNumber == 1) {
      setState(() {
        isShowingPatientInfo = true;
        isShowingRelativesInfo = false;
      });
    } else {
      setState(() {
        isShowingPatientInfo = false;
        isShowingRelativesInfo = true;
      });
    }
  }

  Future<void> loadDataFromJsonFile() async {
    final String jsonString =
        await rootBundle.loadString('images/countries.json');
    List<Map<String, dynamic>> countries =
        json.decode(jsonString).cast<Map<String, dynamic>>();
    setState(() {
      listCountry = countries;
      selectedCountry = countries[0];
    });
  }

  Future<void> getInfoPatient() async {
    var asyncRequest = AsyncRequest();
    Map<String, dynamic> jsonMap =
        json.decode(localStorage.getItem('currentUser'));
    String idCurrentUser = jsonMap['idPatient'].toString();
    Map<String, dynamic> result =
        await asyncRequest.apiMethodGet('patient/${widget.idPatientData}');
    Map<String, dynamic> resultRelationship = await asyncRequest.apiMethodGet(
        'patientbyaccount/findbyidpatientaccountandidpatient?idaccountpatient=$idCurrentUser&idpatient=${widget.idPatientData}');
    if (result['resultData'] == "Có lỗi khi kết nối với server." ||
        resultRelationship['resultData'] == "Có lỗi khi kết nối với server.") {
      showMyDialog("THÔNG BÁO", "Có lỗi khi kết nối với server", 0);
    } else {
      if (result['resultData']['birthday'] != null) {
        List<String> parts = (result['resultData']['birthday']).split('-');
        selectedYear = int.parse(parts[0]);
        selectedMonth = int.parse(parts[1]);
        selectedDay = int.parse(parts[2]);
      }
      setState(() {
        body = result['resultData'];
      });
      fullName.text = result['resultData']['fullName'];
      address.text = (result['resultData']['address'] != null)
          ? result['resultData']['address']
          : "Chưa có";
      if (result['resultData']['gender'] == "MALE") {
        _value = "1";
      } else {
        _value = "2";
      }
      if (idCurrentUser != widget.idPatientData) {
        if (resultRelationship['resultData']['relationship'] != null) {
          _value1 = resultRelationship['resultData']['relationship'];
          relationship = resultRelationship['resultData']['relationship'];
        }
      }

      phone.text = (result['resultData']['phone'] != null)
          ? result['resultData']['phone']
          : "Chưa có";
      email.text = (result['resultData']['email'] != null)
          ? result['resultData']['email']
          : "Chưa có";
      relativeName.text = (result['resultData']['fatherName'] != null)
          ? result['resultData']['fatherName']
          : "Chưa có";
      relativePhone.text = (result['resultData']['fatherPhone'] != null)
          ? result['resultData']['fatherPhone']
          : "Chưa có";
      if (result['resultData']['nation'] != null) {
        print(result['resultData']['nation']);
        for (dynamic country in listCountry) {
          if (country['name'] == result['resultData']['nation']) {
            selectedCountry = country;
            break;
          }
        }
      }
    }
  }

  Future<void> updatedPatient() async {
    var asyncRequest = AsyncRequest();
    Map<String, dynamic> jsonMap =
        json.decode(localStorage.getItem('currentUser'));
    String idCurrentUser = jsonMap['idPatient'].toString();
    DateTime birthday = DateTime(selectedYear!, selectedMonth!, selectedDay!);
    String formattedBirthday = DateFormat('yyyy-MM-dd').format(birthday);
    body!['fullName'] = fullName.text;
    body!['address'] = address.text;
    body!['gender'] = gender_user;
    body!['phone'] =
        (phone.text == "Chưa có" || phone.text == "") ? null : phone.text;
    body!['email'] =
        (email.text == "Chưa có" || email.text == "") ? null : email.text;
    body!['fatherName'] =
        (relativeName.text == "Chưa có" || relativeName.text == "")
            ? null
            : relativeName.text;
    body!['fatherPhone'] =
        (relativePhone.text == "Chưa có" || relativePhone.text == "")
            ? null
            : relativePhone.text;
    body!['birthday'] = formattedBirthday;
    body!['nation'] = selectedCountry?['name'];
    Map<String, dynamic> result =
        await asyncRequest.apiMethodPost('patient/update', body!);
    if (idCurrentUser != widget.idPatientData) {
      Map<String, dynamic> resultUpdateRelationship =
          await asyncRequest.apiMethodGet(
              'patientbyaccount/updated?idaccountpatient=$idCurrentUser&idpatient=${widget.idPatientData}&relationship=$relationship');
    }

    if (result['resultData'] == "Có lỗi khi kết nối với server.") {
      showMyDialog("THÔNG BÁO", "Có lỗi khi kết nối với server", 0);
    } else {
      showMyDialog("THÀNH CÔNG", "Sửa hồ sơ thành công", 1);
    }
  }

  Future<void> showMyDialog(String title, String noti, int valueStatus) async {
    return showDialog<void>(
      context: context,
      barrierDismissible: false, // user must tap button!
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
                    const Size(200, 40.0), // Độ rộng full width và độ cao 50.0
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

  GlobalKey<FormState> formKey = GlobalKey<FormState>();
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
              alignment: Alignment.center,
              child: const Text(
                "SỬA HỒ SƠ BỆNH NHÂN",
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
            ),
          ),
          body: Form(
            key: formKey,
            child: Column(
              children: [
                Expanded(
                  child: ListView(children: [
                    Container(
                      padding: const EdgeInsets.all(15),
                      child: Column(
                        children: [
                          Container(
                            decoration: BoxDecoration(
                              border: Border.all(
                                color: Colors.black,
                                width: 2.0,
                              ),
                            ),
                            child: Stack(
                              children: [
                                Padding(
                                  padding: const EdgeInsets.all(15.0),
                                  child: Column(children: [
                                    Container(
                                      margin: const EdgeInsets.only(bottom: 20),
                                      alignment: Alignment.center,
                                      child: const Center(
                                        child: Text("THÔNG TIN BỆNH NHÂN",
                                            style: TextStyle(
                                                color: Color.fromARGB(
                                                    255, 28, 160, 154),
                                                fontSize: 17,
                                                fontWeight: FontWeight.bold)),
                                      ),
                                    ),
                                    Container(
                                      alignment: Alignment.topLeft,
                                      child: const Text(
                                        'Họ tên bệnh nhân',
                                        style: TextStyle(
                                            fontWeight: FontWeight.w500,
                                            fontSize: 16),
                                      ),
                                    ),
                                    Container(
                                        child: TextFormField(
                                      controller: fullName,
                                      decoration: const InputDecoration(
                                        hintText: 'Họ và chữ lót',
                                      ),
                                      validator: (value) {
                                        if (value == null || value.isEmpty) {
                                          return 'Vui lòng nhập họ và tên';
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
                                        style: TextStyle(
                                            fontWeight: FontWeight.w500,
                                            fontSize: 16),
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
                                      mainAxisAlignment:
                                          MainAxisAlignment.spaceBetween,
                                      children: [
                                        Column(children: [
                                          Container(
                                            child: const Text('Năm sinh*',
                                                style: TextStyle(
                                                    fontWeight: FontWeight.w500,
                                                    fontSize: 16)),
                                          ),
                                          Row(children: [
                                            const Text(
                                              'Chọn',
                                              style: TextStyle(
                                                fontSize: 15,
                                                color: Color.fromARGB(
                                                    255, 28, 160, 154),
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
                                                style: TextStyle(
                                                    fontWeight: FontWeight.w500,
                                                    fontSize: 16)),
                                          ),
                                          Row(children: [
                                            const Text(
                                              'Chọn',
                                              style: TextStyle(
                                                fontSize: 15,
                                                color: Color.fromARGB(
                                                    255, 28, 160, 154),
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
                                                  child:
                                                      Text(months.toString()),
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
                                                style: TextStyle(
                                                    fontWeight: FontWeight.w500,
                                                    fontSize: 16)),
                                          ),
                                          Row(children: [
                                            const Text(
                                              'Chọn',
                                              style: TextStyle(
                                                fontSize: 15,
                                                color: Color.fromARGB(
                                                    255, 28, 160, 154),
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
                                      child: const Text(
                                        'Giới tính *',
                                        style: TextStyle(
                                            fontWeight: FontWeight.w500,
                                            fontSize: 16),
                                      ),
                                    ),
                                    DropdownButtonFormField(
                                      value: _value,
                                      items: const [
                                        DropdownMenuItem(
                                          value: '-1',
                                          child: Text(
                                            "Chọn ",
                                            style: TextStyle(
                                              color: Color.fromARGB(
                                                  255, 28, 160, 154),
                                            ),
                                          ),
                                        ),
                                        DropdownMenuItem(
                                          value: '1',
                                          child: Text(
                                            "Nam ",
                                            style: TextStyle(
                                                color: Colors.grey,
                                                fontSize: 15),
                                          ),
                                        ),
                                        DropdownMenuItem(
                                          value: '2',
                                          child: Text(
                                            "Nữ ",
                                            style: TextStyle(
                                                color: Colors.grey,
                                                fontSize: 15),
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
                                          style: TextStyle(
                                              fontWeight: FontWeight.w500,
                                              fontSize: 16)),
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
                                            width: 200,
                                            child: Text(
                                              country['name'],
                                              style:
                                                  const TextStyle(fontSize: 16),
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
                                      height: 20,
                                    ),
                                    const SizedBox(
                                      height: 20,
                                    ),
                                    Container(
                                      alignment: Alignment.topLeft,
                                      child: const Text('Số điện thoại*',
                                          style: TextStyle(
                                              fontWeight: FontWeight.w500,
                                              fontSize: 16)),
                                    ),
                                    Container(
                                        child: TextFormField(
                                      controller: phone,
                                      decoration: const InputDecoration(
                                          hintText: 'Nhập số điện thoại',
                                          hintStyle: TextStyle(
                                              fontStyle: FontStyle.italic)),
                                      validator: (value) {
                                        if (value == null || value.isEmpty) {
                                          return 'Vui lòng nhập số điện thoại';
                                        } else if (value.length != 10 ||
                                            int.tryParse(value) == null) {
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
                                          style: TextStyle(
                                              fontWeight: FontWeight.w500,
                                              fontSize: 16)),
                                    ),
                                    Container(
                                        child: TextFormField(
                                      controller: email,
                                      decoration: const InputDecoration(
                                          hintText: 'Email',
                                          hintStyle: TextStyle(
                                              fontStyle: FontStyle.italic)),
                                      validator: (value) {
                                        if (value == null || value.isEmpty) {
                                          return 'Vui lòng nhập email';
                                        } else if (!value
                                            .endsWith('@gmail.com')) {
                                          return 'Email phải có định dạng @gmail.com';
                                        }
                                        return null;
                                      },
                                    )),
                                    const SizedBox(
                                      height: 50,
                                    ),
                                  ]),
                                ),
                              ],
                            ),
                          ),
                          Container(
                            margin: EdgeInsets.only(top: 15),
                            decoration: BoxDecoration(
                              border: Border.all(
                                color: Colors.black,
                                width: 2.0,
                              ),
                            ),
                            child: Stack(
                              children: [
                                Padding(
                                  padding: const EdgeInsets.all(15.0),
                                  child: Column(
                                    children: [
                                      Container(
                                        margin:
                                            const EdgeInsets.only(bottom: 20),
                                        alignment: Alignment.center,
                                        child: const Center(
                                          child: Text("THÔNG TIN BỆNH NHÂN",
                                              style: TextStyle(
                                                  color: Color.fromARGB(
                                                      255, 28, 160, 154),
                                                  fontSize: 17,
                                                  fontWeight: FontWeight.bold)),
                                        ),
                                      ),
                                      Container(
                                        alignment: Alignment.topLeft,
                                        child: const Text(
                                          'Tên người thân',
                                          style: TextStyle(
                                              fontWeight: FontWeight.w500,
                                              fontSize: 16),
                                        ),
                                      ),
                                      Container(
                                          child: TextField(
                                        controller: relativeName,
                                        decoration: const InputDecoration(
                                            hintText: 'Nhập tên ',
                                            hintStyle: TextStyle(
                                                fontStyle: FontStyle.italic)),
                                      )),
                                      const SizedBox(
                                        height: 15,
                                      ),
                                      Container(
                                        alignment: Alignment.topLeft,
                                        child: const Text(
                                            'Quan hệ với người bệnh',
                                            style: TextStyle(
                                                fontWeight: FontWeight.w500,
                                                fontSize: 16)),
                                      ),
                                      DropdownButtonFormField(
                                        value: _value1,
                                        items: const [
                                          DropdownMenuItem(
                                            value: '-1',
                                            child: Text(
                                              "Chọn ",
                                              style: TextStyle(
                                                  color: Color.fromARGB(
                                                      255, 28, 160, 154),
                                                  fontSize: 15,
                                                  fontStyle: FontStyle.italic),
                                            ),
                                          ),
                                          DropdownMenuItem(
                                            value: 'Cha/mẹ',
                                            child: Text(
                                              "Cha/mẹ",
                                              style: TextStyle(
                                                  color: Color.fromARGB(
                                                      255, 0, 0, 0),
                                                  fontSize: 15),
                                            ),
                                          ),
                                          DropdownMenuItem(
                                            value: 'Vợ/chồng',
                                            child: Text(
                                              "Vợ/chồng",
                                              style: TextStyle(
                                                  color: Color.fromARGB(
                                                      255, 0, 0, 0),
                                                  fontSize: 15),
                                            ),
                                          ),
                                          DropdownMenuItem(
                                            value: 'Con cái',
                                            child: Text(
                                              " Con cái ",
                                              style: TextStyle(
                                                  color: Color.fromARGB(
                                                      255, 0, 0, 0),
                                                  fontSize: 15),
                                            ),
                                          ),
                                          DropdownMenuItem(
                                            value: 'Bạn bè',
                                            child: Text(
                                              " Bạn bè ",
                                              style: TextStyle(
                                                  color: Color.fromARGB(
                                                      255, 0, 0, 0),
                                                  fontSize: 15),
                                            ),
                                          ),
                                          DropdownMenuItem(
                                            value: 'Anh/chị/em',
                                            child: Text(
                                              " Anh/chị/em ",
                                              style: TextStyle(
                                                  color: Color.fromARGB(
                                                      255, 0, 0, 0),
                                                  fontSize: 15),
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
                                          style: TextStyle(
                                              fontWeight: FontWeight.w500,
                                              fontSize: 16),
                                        ),
                                      ),
                                      Container(
                                          child: TextField(
                                        controller: relativePhone,
                                        decoration: const InputDecoration(
                                            hintText: 'Nhập số điện thoại ',
                                            hintStyle: TextStyle(
                                                fontStyle: FontStyle.italic)),
                                      )),
                                      SizedBox(
                                        height: 30,
                                      )
                                    ],
                                  ),
                                )
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  ]),
                ),
                Divider(
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
                            // setState(() {
                            //   isShowingRelativesInfo = false;
                            //   isShowingPatientInfo = true;
                            // });
                            Navigator.push(
                                context,
                                MaterialPageRoute(
                                    builder: (context) =>
                                        const chooseProfile()));
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
                              fontSize: 16,
                            ),
                          )),
                    ),
                    const SizedBox(
                      height: 10,
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
                              updatedPatient();
                            }
                          },
                          style: ButtonStyle(
                              backgroundColor: MaterialStateProperty.all<Color>(
                                  const Color.fromARGB(255, 28, 160, 154))),
                          child: const Text(
                            'XÁC NHẬN',
                            style: TextStyle(
                                color: Color.fromARGB(255, 255, 255, 255),
                                fontSize: 16),
                          )),
                    ),
                  ],
                ),
                SizedBox(
                  height: 15,
                )
              ],
            ),
          )),
    );
  }
}
