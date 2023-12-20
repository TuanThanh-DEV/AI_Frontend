import 'package:flutter/material.dart';

class introducePage extends StatelessWidget {
  const introducePage({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          toolbarHeight: 65,
          backgroundColor: const Color.fromARGB(255, 28, 160, 154),
          title: const Center(
            child: Text(
              "GIỚI THIỆU CHUNG",
              textAlign: TextAlign.center,
            ),
          ),
        ),
        body: ListView(children: [
          Padding(
            padding: EdgeInsets.all(15),
            child: Column(
              children: [
                Container(
                  child: const Text(
                    'Giới thiệu TIMEC- Phòng Khám Đa Khoa Quốc Tế TIMEC',
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 17,
                      decoration: TextDecoration.underline,
                      decorationColor: Color.fromARGB(255, 0, 0, 0),
                      decorationThickness: 0.5,
                    ),
                  ),
                ),
                SizedBox(
                  height: 10,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "-Giới Thiệu Về TIMEC :\n\nTIMEC có tên đầy đủ là CÔNG TY CỔ PHẦN CHĂM SÓC Y TẾ QUỐC TẾ TECCO là thương hiệu Y TẾ được đầu tư Tập đoàn Tecco.",
                  ),
                ),
                Image.asset(
                  'images/logo-timec.png',
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      "Hotline :",
                      style: TextStyle(fontSize: 17),
                    ),
                    SizedBox(
                      width: 10,
                    ),
                    Text(
                      "0879 115 115",
                      style: TextStyle(
                        fontSize: 30,
                        fontWeight: FontWeight.bold,
                        color: Colors.red,
                      ),
                    )
                  ],
                ),
                SizedBox(
                  height: 20,
                ),
                Container(
                  child: Text(
                      "Timec cũng là thành viên của Singapore Medical Group. Timec Vietnam cung cấp các dịch vụ chăm sóc sức khoẻ ngoại trú chất lượng cao với giá  tốt nhất cho bệnh nhân tại Thành phố Hồ Chí Minh và các khu vực lân cận. Timec với hệ thống hơn 18 chuyên khoa, hệ thống máy móc ngoại nhập chất lượng, đội ngũ bác Sĩ có kinh nghiệm – trình độ kỹ thuật cao và tận tình,… "),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  child: Text(
                    'Đến với Timec bạn sẽ được hỗ trợ:',
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 17,
                      decoration: TextDecoration.underline,
                      decorationColor: Color.fromARGB(255, 0, 0, 0),
                      decorationThickness: 0.5,
                    ),
                  ),
                ),
                Container(
                  child: Text(
                      "1.Hỗ trợ bệnh nhân 24/7\n Sẵn sàng phục vụ bệnh nhân trong nước và quốc tế. SMG hỗ trợ:\n \t\t +Thanh toán viện phí, tư vấn tài chính và thủ tục bảo hiểm\n\t\t +Vé máy bay, gia hạn visa và các trợ giúp liên quan đến du lịch khám chữa bệnh\n\t\t +Sơ tán, hồi hương và nhập viện trực tiếp\n\t\t +Đặt chỗ lưu trú, đón tiếp tại sân bay và di chuyển\n\t\t +Dịch vụ Phiên dịch"),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  child: Text(
                    'Đội ngũ nhân viên y tế đa quốc gia của SMG:',
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 17,
                      decoration: TextDecoration.underline,
                      decorationColor: Color.fromARGB(255, 0, 0, 0),
                      decorationThickness: 0.5,
                    ),
                  ),
                ),
                Container(
                  child: Text(
                      "-Chăm sóc chuyên biệt cho từng bệnh nhân\n-Hỗ trợ tiếp cận với các chuyên gia y tế hàng đầu tại SMG và mạng lưới thành viên\n-Có kiến thức sâu rộng về:\n\t\t\t+Thực nghiệm y tế và lâm sàng tốt nhất\n\t\t\t+Các công nghệ y học tiên tiến"),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  child: Text(
                    'Chuyên khoa Timec',
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 17,
                      decoration: TextDecoration.underline,
                      decorationColor: Color.fromARGB(255, 0, 0, 0),
                      decorationThickness: 0.5,
                    ),
                  ),
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                      "-Khoa Da Liễu\n-Sản Phụ Khoa\n-Khoa Tai-Mũi-Họng\n-Khoa Mắt\n-Khoa Nội Thần Kinh\n-Khoa Gan – Tiêu hóa\n-Khoa Hô Hấp\n-Khoa Tim Mạch\n-Nha Khoa\n-Khoa Nhi\n-Khoa nội tổng quát"),
                ),
                SizedBox(
                  height: 10,
                ),
                Container(
                  child: Text(
                    'VỚI TIMEC - BỆNH NHÂN LÀ NGƯỜI NHÀ',
                    style: TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 18,
                        color: Colors.red),
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
