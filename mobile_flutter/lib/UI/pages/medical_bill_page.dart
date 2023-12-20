import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:timecprj/service/agent.dart';

class medicalBillPage extends StatefulWidget {
  final String idPrescription;

  const medicalBillPage({super.key, required this.idPrescription});

  @override
  State<medicalBillPage> createState() => _medicalBillPageState();
}

class _medicalBillPageState extends State<medicalBillPage> {
  dynamic detailPrescription = [];
  dynamic itemPrescription = [];
  dynamic diagnosisReport = [];
  String examineTime = "Chưa cập nhật";
  String finishTime = "Chưa cập nhật";
  String namePatient = "";
  String department = "";
  String bhyt = "";
  String status = "";
  String analysis = "";
  int sttItem = 0;
  int sttReport = 0;
  num totalPrice = 0;
  num totalPriceReport = 0;
  String resultDiagnosis = "";
  String dayBack = "Chưa có";

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) async {
      await getDetailPrescription();
      await getDiagnosisReport();
      await getItemPrescription();
    });
  }

  Future<void> getDetailPrescription() async {
    var asyncRequest = AsyncRequest();
    Map<String, dynamic> result = await asyncRequest
        .apiMethodGet('prescription/${widget.idPrescription}');
    setState(() {
      detailPrescription = result['resultData'];
      if (result['resultData']['examineTime'] != null) {
        examineTime = (DateFormat('dd-MM-yyyy HH:mm:ss')
            .format(DateTime.fromMillisecondsSinceEpoch(
                result['resultData']['examineTime']))
            .toString());
      }
      if (result['resultData']['finishTime'] != null) {
        finishTime = (DateFormat('dd-MM-yyyy HH:mm:ss')
            .format(DateTime.fromMillisecondsSinceEpoch(
                result['resultData']['finishTime']))
            .toString());
      }
      if (result['resultData']['dayBack'] != null) {
        dayBack = (DateFormat('dd-MM-yyyy')
            .format(DateTime.fromMillisecondsSinceEpoch(
                result['resultData']['dayBack']))
            .toString());
      }
      namePatient = (result['resultData']['patient']['fullName']).toString();
      department = ((result['resultData']['department'] == null)
          ? "Chưa cập nhật"
          : result['resultData']['department']['name']);
      bhyt = ((result['resultData']['insuranceType'] == null)
              ? "Chưa cập nhật"
              : result['resultData']['insuranceType']['name'])
          .toString();
      analysis = (result['resultData']['analysis'] != null)
          ? (result['resultData']['analysis']).toString()
          : "Không có";
      status = result['resultData']['status'];
    });
  }

  Future<void> getDiagnosisReport() async {
    var asyncRequest = AsyncRequest();
    Map<String, dynamic> result = await asyncRequest.apiMethodGet(
        'diagnosisReport/listFindByPrescriptionId?prescriptionId=${widget.idPrescription}');
    if (result['resultData'].isEmpty) {
      setState(() {
        resultDiagnosis = "Không có";
      });
    }
    setState(() {
      diagnosisReport = result['resultData'];
    });
  }

  Future<void> getItemPrescription() async {
    var asyncRequest = AsyncRequest();
    Map<String, dynamic> result = await asyncRequest.apiMethodGet(
        'prescriptionItem/listFindByPrescriptionId?prescriptionId=${widget.idPrescription}');
    setState(() {
      itemPrescription = result['resultData'];
      sttItem = 0;
      totalPrice = 0;
      totalPriceReport = 0;
      sttReport = 0;
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
    } else {
      return "";
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
    } else {
      return Colors.white;
    }
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
            child: Text(
              "PHIẾU KHÁM BỆNH ${widget.idPrescription}",
              textAlign: TextAlign.center,
              style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
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
                    Container(
                      padding: const EdgeInsets.only(right: 17, left: 17),
                      alignment: Alignment.topLeft,
                      height: 200,
                      width: screenWidth,
                      decoration: BoxDecoration(
                          border: Border.all(
                              color: Colors.black,
                              width: 1,
                              style: BorderStyle.solid)),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: [
                          Center(
                              child: Text(
                            getStatusPrescription(status),
                            style: TextStyle(
                                color: getColorByStatus(status),
                                fontWeight: FontWeight.bold,
                                fontSize: 17),
                          )),
                          Container(
                              alignment: Alignment.topLeft,
                              child: RichText(
                                text: TextSpan(
                                  style: const TextStyle(color: Colors.black),
                                  children: [
                                    const TextSpan(
                                      text: 'Mã số phiếu : ',
                                      style: TextStyle(
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                    TextSpan(
                                      text: widget.idPrescription,
                                    ),
                                  ],
                                ),
                              )),
                          Container(
                              alignment: Alignment.topLeft,
                              child: RichText(
                                text: TextSpan(
                                  style: const TextStyle(color: Colors.black),
                                  children: [
                                    const TextSpan(
                                      text: 'Họ tên bệnh nhân : ',
                                      style: TextStyle(
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                    TextSpan(
                                      text: namePatient,
                                    ),
                                  ],
                                ),
                              )),
                          Container(
                            width: screenWidth,
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
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
                                const SizedBox(
                                  height: 15,
                                ),
                                RichText(
                                  text: TextSpan(
                                    style: const TextStyle(color: Colors.black),
                                    children: [
                                      const TextSpan(
                                        text: 'BHYT : ',
                                        style: TextStyle(
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                      TextSpan(
                                        text: bhyt,
                                      ),
                                    ],
                                  ),
                                )
                              ],
                            ),
                          ),
                          Container(
                            width: screenWidth,
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                RichText(
                                  text: TextSpan(
                                    style: const TextStyle(color: Colors.black),
                                    children: [
                                      const TextSpan(
                                        text: 'Giờ vào : ',
                                        style: TextStyle(
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                      TextSpan(
                                        text: examineTime,
                                      ),
                                    ],
                                  ),
                                ),
                                const SizedBox(
                                  height: 15,
                                ),
                                RichText(
                                  text: TextSpan(
                                    style: const TextStyle(color: Colors.black),
                                    children: [
                                      const TextSpan(
                                        text: 'Giờ ra : ',
                                        style: TextStyle(
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                      TextSpan(
                                        text: finishTime,
                                      ),
                                    ],
                                  ),
                                )
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(
                      height: 20,
                    ),
                    Column(
                      children: [
                        Container(
                            alignment: Alignment.topLeft,
                            child: RichText(
                              text: TextSpan(
                                style: const TextStyle(color: Colors.black),
                                children: [
                                  const TextSpan(
                                    text: 'Chuẩn đoán : ',
                                    style: TextStyle(
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  TextSpan(
                                    text: analysis,
                                  ),
                                ],
                              ),
                            )),
                        const SizedBox(
                          height: 20,
                        ),
                        //xét nghiệm
                        Container(
                            alignment: Alignment.topLeft,
                            child: RichText(
                              text: TextSpan(
                                style: const TextStyle(color: Colors.black),
                                children: [
                                  const TextSpan(
                                    text: 'Xét nghiệm : ',
                                    style: TextStyle(
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                  TextSpan(
                                    text: resultDiagnosis,
                                  ),
                                ],
                              ),
                            )),
                        const SizedBox(
                          height: 10,
                        ),
                        Container(
                          child: Column(children: [
                            ...diagnosisReport.map((diagnosis) {
                              sttReport++;
                              totalPriceReport +=
                                  diagnosis['diagnosisService']['price'];
                              return Container(
                                alignment: Alignment.topLeft,
                                margin: const EdgeInsets.only(bottom: 8),
                                child: Column(children: [
                                  Container(
                                    width: screenWidth,
                                    child: Text(
                                        '$sttReport. ${diagnosis['diagnosisService']['name']}',
                                        textAlign: TextAlign.left,
                                        style: const TextStyle(
                                            color: Colors.blue,
                                            fontWeight: FontWeight.bold)),
                                  ),
                                  const SizedBox(
                                    height: 5,
                                  ),
                                  Table(
                                      border:
                                          TableBorder.all(color: Colors.grey),
                                      columnWidths: const {
                                        0: FractionColumnWidth(0.3),
                                        1: FractionColumnWidth(0.7),
                                      },
                                      children: [
                                        TableRow(
                                          children: [
                                            TableCell(
                                              child: Container(
                                                color: Colors.black,
                                                child: const Padding(
                                                  padding: EdgeInsets.all(6.0),
                                                  child: Text(
                                                    'Kết quả:',
                                                    textAlign: TextAlign.left,
                                                    style: TextStyle(
                                                        color: Colors.white),
                                                  ),
                                                ),
                                              ),
                                            ),
                                            TableCell(
                                              child: Container(
                                                child: Padding(
                                                  padding: EdgeInsets.all(6.0),
                                                  child: Text(
                                                    '${(diagnosis['description'] == null) ? "Chưa cập nhật" : diagnosis['description']}',
                                                    textAlign: TextAlign.left,
                                                  ),
                                                ),
                                              ),
                                            ),
                                          ],
                                        ),
                                        TableRow(
                                          children: [
                                            TableCell(
                                              child: Container(
                                                color: Colors.black,
                                                child: const Padding(
                                                  padding:
                                                      const EdgeInsets.all(6.0),
                                                  child: Text(
                                                    'Trạng thái:',
                                                    textAlign: TextAlign.left,
                                                    style: TextStyle(
                                                        color: Colors.white),
                                                  ),
                                                ),
                                              ),
                                            ),
                                            TableCell(
                                              child: Container(
                                                child: Padding(
                                                  padding:
                                                      const EdgeInsets.all(6.0),
                                                  child: Text(
                                                    getStatusPrescription(
                                                        diagnosis['status']),
                                                    textAlign: TextAlign.left,
                                                    style: TextStyle(
                                                        color: getColorByStatus(
                                                            diagnosis[
                                                                'status'])),
                                                  ),
                                                ),
                                              ),
                                            ),
                                          ],
                                        ),
                                        TableRow(
                                          children: [
                                            TableCell(
                                              child: Container(
                                                color: Colors.black,
                                                child: const Padding(
                                                  padding:
                                                      const EdgeInsets.all(6.0),
                                                  child: Text(
                                                    'Đơn giá:',
                                                    textAlign: TextAlign.left,
                                                    style: TextStyle(
                                                        color: Colors.white),
                                                  ),
                                                ),
                                              ),
                                            ),
                                            TableCell(
                                              child: Container(
                                                child: Padding(
                                                  padding:
                                                      const EdgeInsets.all(6.0),
                                                  child: Text(
                                                    '${NumberFormat.decimalPattern().format(diagnosis['diagnosisService']['price'])}đ',
                                                    textAlign: TextAlign.left,
                                                  ),
                                                ),
                                              ),
                                            ),
                                          ],
                                        )
                                      ])
                                ]),
                              );
                            })
                          ]),
                        ),
                        const SizedBox(
                          height: 6,
                        ),
                        Container(
                          child: RichText(
                            text: TextSpan(
                              style: const TextStyle(color: Colors.black),
                              children: [
                                const TextSpan(
                                  text: 'Tổng tiền xét nghiệm : ',
                                  style: TextStyle(
                                      fontWeight: FontWeight.bold,
                                      fontSize: 16),
                                ),
                                TextSpan(
                                    text:
                                        '${NumberFormat.decimalPattern().format(totalPriceReport)}đ',
                                    style: const TextStyle(fontSize: 16)),
                              ],
                            ),
                          ),
                        ),
                        const SizedBox(
                          height: 10,
                        ),
                        // đơn thuốc
                        Container(
                          alignment: Alignment.topLeft,
                          child: const Text(
                            'Đơn thuốc :',
                            style: TextStyle(fontWeight: FontWeight.bold),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(
                      height: 10,
                    ),
                    Container(
                      child: Table(
                        border: TableBorder.all(color: Colors.grey),
                        columnWidths: const {
                          0: FractionColumnWidth(0.1),
                          1: FractionColumnWidth(0.5),
                          2: FractionColumnWidth(0.2),
                          3: FractionColumnWidth(0.2),
                        },
                        children: [
                          TableRow(
                            children: [
                              TableCell(
                                child: Container(
                                  color: Colors.black, // Màu nền đen
                                  child: const Padding(
                                    padding: const EdgeInsets.all(6.0),
                                    child: Center(
                                      child: Text(
                                        'STT',
                                        style: TextStyle(
                                            color:
                                                Colors.white), // Màu chữ trắng
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                              TableCell(
                                child: Container(
                                  color: Colors.black, // Màu nền đen
                                  child: const Padding(
                                    padding: const EdgeInsets.all(6.0),
                                    child: Center(
                                      child: Text(
                                        'Tên thuốc',
                                        style: TextStyle(
                                            color:
                                                Colors.white), // Màu chữ trắng
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                              TableCell(
                                child: Container(
                                  color: Colors.black, // Màu nền đen
                                  child: const Padding(
                                    padding: const EdgeInsets.all(6.0),
                                    child: Center(
                                      child: Text(
                                        'SL',
                                        style: TextStyle(
                                            color:
                                                Colors.white), // Màu chữ trắng
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                              TableCell(
                                child: Container(
                                  color: Colors.black, // Màu nền đen
                                  child: const Padding(
                                    padding: const EdgeInsets.all(6.0),
                                    child: Center(
                                      child: Text(
                                        'Đơn giá',
                                        style: TextStyle(
                                            color:
                                                Colors.white), // Màu chữ trắng
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                            ],
                          ),
                          ...itemPrescription.map((item) {
                            sttItem++;
                            totalPrice = totalPrice +
                                (item['totalAmount'] *
                                    item['drug']['salePrice']);
                            String formattedSalePrice =
                                NumberFormat.decimalPattern()
                                    .format(item['drug']['salePrice']);

                            return TableRow(
                              children: [
                                TableCell(
                                    child: Padding(
                                  padding: const EdgeInsets.all(8.0),
                                  child: Center(child: Text('$sttItem')),
                                )),
                                TableCell(
                                    child: Padding(
                                  padding: const EdgeInsets.all(8.0),
                                  child: Text('${item['drug']['name']}',
                                      textAlign: TextAlign.left),
                                )),
                                TableCell(
                                    child: Padding(
                                  padding: const EdgeInsets.all(8.0),
                                  child: Center(
                                      child: Text('${item['totalAmount']}')),
                                )),
                                TableCell(
                                    child: Padding(
                                  padding: const EdgeInsets.all(8.0),
                                  child: Text('$formattedSalePriceđ',
                                      textAlign: TextAlign.right),
                                )),
                              ],
                            );
                          }).toList(),
                        ],
                      ),
                    ),
                    Container(
                      child: Table(
                        border: TableBorder.all(color: Colors.grey),
                        columnWidths: const {
                          0: FractionColumnWidth(0.6),
                          1: FractionColumnWidth(0.4),
                        },
                        children: [
                          TableRow(
                            children: [
                              TableCell(
                                child: Container(
                                  color: Colors.black,
                                  child: const Padding(
                                    padding: const EdgeInsets.all(6.0),
                                    child: Text(
                                      'Tổng cộng',
                                      textAlign: TextAlign.left,
                                      style: TextStyle(color: Colors.white),
                                    ),
                                  ),
                                ),
                              ),
                              TableCell(
                                child: Container(
                                  color: Colors.black,
                                  child: Padding(
                                    padding: const EdgeInsets.all(6.0),
                                    child: Text(
                                      '${NumberFormat.decimalPattern().format(totalPrice)}đ',
                                      textAlign: TextAlign.right,
                                      style: TextStyle(color: Colors.white),
                                    ),
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ]),
                ),
              ]),
            ),
            SizedBox(
              height: 20,
            ),
            Container(
              height: 50,
              width: screenWidth,
              alignment: Alignment.center,
              color: Color.fromARGB(223, 255, 137, 53),
              // decoration: BoxDecoration(
              //     border: Border.all(
              //         color: const Color.fromARGB(255, 247, 120, 30))),
              child: Text(
                "Hẹn ngày khám : ${dayBack} ",
                style: TextStyle(color: Colors.white),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
