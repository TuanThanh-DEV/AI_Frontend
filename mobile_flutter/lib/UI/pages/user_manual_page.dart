import 'package:flutter/material.dart';

class usermanualPage extends StatelessWidget {
  const usermanualPage({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          toolbarHeight: 65,
          backgroundColor: const Color.fromARGB(255, 28, 160, 154),
          title: Container(
            margin: const EdgeInsets.only(right: 50),
            child: const Center(
              child: Text(
                "HƯỚNG DẪN SỬ DỤNG ",
                textAlign: TextAlign.center,
                style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold
              ),
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
                  child: Image.asset('images/doctor.png'),
                ),
                SizedBox(
                  height: 10,
                ),
                Container(
                  child: Center(
                    child: Text(
                      "Hướng dẫn sử dụng ứng dụng ",
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
                    "1.Tải và cài đặt ứng dụng:",
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "   Trước hết, bạn cần tải và cài đặt ứng dụng đặt lịch khám bệnh từ cửa hàng ứng dụng trên điện thoại của mình (ví dụ: App Store cho iOS hoặc Google Play Store cho Android).",
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "2.Đăng nhập hoặc tạo tài khoản:",
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "   Mở ứng dụng và đăng nhập bằng tài khoản đã có (nếu có) hoặc tạo một tài khoản mới. Thông tin tài khoản có thể bao gồm tên, địa chỉ email, số điện thoại và mật khẩu.",
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "3.Tìm bác sĩ hoặc phòng khám:",
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "   Sử dụng tính năng tìm kiếm hoặc danh mục bác sĩ để tìm bác sĩ hoặc phòng khám mà bạn muốn đặt lịch khám.",
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "4.Chọn ngày và thời gian:",
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "   Chọn ngày và thời gian phù hợp cho cuộc hẹn của bạn. Một số ứng dụng sẽ hiển thị sẵn lịch khám trống của bác sĩ hoặc phòng khám.",
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "5.Điền thông tin cần thiết:",
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "   Điền thông tin cá nhân như tên, ngày sinh, số điện thoại và bất kỳ thông tin y tế cơ bản nào cần thiết.",
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "6.Xác nhận và xem lại thông tin:",
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "   Kiểm tra thông tin cuộc hẹn, ngày giờ, và bác sĩ hoặc phòng khám bạn đã chọn. Đảm bảo mọi thông tin là chính xác.",
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "7.Xác nhận đặt lịch:",
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "  Xác nhận cuộc hẹn bằng cách bấm nút 'Đặt lịch' hoặc tương tự. Bạn có thể nhận được xác nhận qua email hoặc tin nhắn SMS.",
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "8.Nhắc nhở và quản lý cuộc hẹn:",
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    " \t\tMột số ứng dụng có tính năng nhắc nhở và cho phép bạn quản lý cuộc hẹn. Đảm bảo bạn sẵn sàng đến cuộc hẹn.",
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
