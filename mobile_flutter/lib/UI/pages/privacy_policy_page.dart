import 'package:flutter/material.dart';

class privacyPolicyPage extends StatelessWidget {
  const privacyPolicyPage({super.key});

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
              "CHÍNH SÁCH BẢO MẬT",
              textAlign: TextAlign.center,
               style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold
                ),
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
                  height: 10,
                ),
                Container(
                  child: Center(
                    child: Text(
                      "CHÍNH SÁCH BẢO MẬT THÔNG TIN",
                      style: TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 16,
                        color: Color.fromARGB(255, 28, 160, 154),
                      ),
                    ),
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "1.Mục đích thu thập thông tin:",
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "    Mô tả rõ ràng mục đích thu thập thông tin cá nhân, bao gồm việc chăm sóc bệnh nhân, quản lý hồ sơ y tế, thanh toán và liên lạc với bệnh nhân.",
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "2.Loại thông tin được thu thập:",
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "   Liệt kê các loại thông tin cá nhân mà bệnh viện thu thập, chẳng hạn như tên, địa chỉ, số điện thoại, thông tin y tế, và thông tin tài chính.",
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "3.Bảo mật thông tin:",
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "   Cam kết bảo vệ thông tin cá nhân của bệnh nhân khỏi sự truy cập trái phép hoặc việc sử dụng thông tin này một cách không đúng đắn.",
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "4.Chia sẻ thông tin:",
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "   Thông báo rằng thông tin cá nhân có thể được chia sẻ với các bác sĩ, nhân viên y tế, hoặc các bên thứ ba (ví dụ: công ty bảo hiểm y tế) trong mục đích chăm sóc sức khỏe và quản lý hồ sơ y tế.",
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "5.Quyền bệnh nhân:",
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "   Đề cập đến quyền của bệnh nhân liên quan đến thông tin cá nhân, bao gồm quyền truy cập, sửa đổi, và yêu cầu xóa thông tin.",
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "6.Đảm bảo tuân thủ:",
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "   Cam kết tuân thủ các luật và quy định bảo vệ thông tin cá nhân, bao gồm Hiệp định Bảo vệ Dữ liệu Châu Âu (GDPR) hoặc HIPAA (cho các tổ chức tại Hoa Kỳ).",
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "7..Bảo mật thông tin y tế:",
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "   Quy định cách bảo mật thông tin y tế đặc biệt, bao gồm việc lưu trữ an toàn, truy cập hạn chế, và mã hóa dữ liệu.",
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "8.Theo dõi và báo cáo vi phạm:",
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "   Quy định cách theo dõi vi phạm bảo mật thông tin và báo cáo những vi phạm này đến cơ quan có thẩm quyền.",
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "9.Chấp nhận thông tin và điều khoản:",
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "   Liệt kê cách bệnh viện thu thập sự đồng ý của bệnh nhân và điều khoản sử dụng thông tin cá nhân.",
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
