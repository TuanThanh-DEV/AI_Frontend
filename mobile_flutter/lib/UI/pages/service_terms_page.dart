import 'package:flutter/material.dart';

class serviceTermsPage extends StatelessWidget {
  const serviceTermsPage({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          toolbarHeight: 65,
          backgroundColor: const Color.fromARGB(255, 28, 160, 154),
          title: Container(
            margin: const EdgeInsets.only(left: 43),
            child: const Text(
              "ĐIỀU KHOẢN DỊCH VỤ",
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
          ),
        ),
        body: ListView(children: [
          Padding(
            padding: EdgeInsets.all(15),
            child: Column(
              children: [
                Container(
                  child: Image.asset('images/doctor2.jpg'),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "1-Chất lượng dịch vụ:",
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "    Phòng khám cam kết cung cấp dịch vụ y tế chất lượng và an toàn, tuân theo các tiêu chuẩn ngành y tế.",
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "2-Phí dịch vụ:",
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "   Thông tin về các khoản phí và chi phí dịch vụ y tế, bao gồm việc thanh toán, bảo hiểm y tế, và các chi phí phụ.",
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "3-Lịch hẹn và hủy lịch:",
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "   Quy định về lịch hẹn, thời gian chờ đợi, và quy trình hủy lịch hẹn nếu cần.",
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "4-Bảo mật thông tin:",
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "   Cam kết bảo vệ thông tin cá nhân của bệnh nhân và tuân thủ các quy định về bảo mật dữ liệu.",
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "5-Quyền và nghĩa vụ của bệnh nhân:",
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "   Mô tả quyền và nghĩa vụ của bệnh nhân, bao gồm quyền lựa chọn và từ chối điều trị.",
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "6-Giải quyết tranh chấp:",
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "   Quy định về giải quyết tranh chấp nếu có sự không đồng ý hoặc khiếu nại về dịch vụ.",
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "7-Chấp nhận bảo hiểm:",
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "   Thông tin về việc phòng khám có chấp nhận bảo hiểm y tế và quy định liên quan đến việc gửi hồ sơ bồi thường bảo hiểm.",
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "8-Thay đổi và cập nhật điều khoản:",
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "   Quy định về việc phòng khám có thể thay đổi và cập nhật điều khoản dịch vụ theo thời gian.",
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "9-Các quy định pháp luật và quy định:",
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "   Tuân theo các quy định và luật pháp y tế địa phương và quốc tế.",
                  ),
                ),
              ],
            ),
          ),
        ]),
      ),
    );
  }
}
