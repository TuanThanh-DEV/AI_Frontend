import 'package:flutter/material.dart';
import 'package:timecprj/UI/pages/home_page.dart';
import 'package:timecprj/UI/pages/method_login_page.dart';
import 'package:timecprj/service/agent.dart';
// import 'package:timecprj/state/mybutton.dart';

class regulationsInAppPage extends StatefulWidget {
  const regulationsInAppPage({super.key});

  @override
  State<regulationsInAppPage> createState() => _regulationsInAppPageState();
}

class _regulationsInAppPageState extends State<regulationsInAppPage> {
  @override
  Widget build(BuildContext context) {
    double screenWidth = MediaQuery.of(context).size.width;
    //double screenHeight = MediaQuery.of(context).size.height;
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          toolbarHeight: 65,
          backgroundColor: const Color.fromARGB(255, 28, 160, 154),
          title: Container(
            margin: const EdgeInsets.only(right: 50),
            child: const Center(
              child: Text('QUY ĐỊNH SỬ DỤNG',
                  style: TextStyle(
                      color: Colors.white,
                      fontSize: 17,
                      fontWeight: FontWeight.bold)),
            ),
          ),
        ),
        body: ListView(children: [
          Column(
            children: [
              const Padding(
                padding: EdgeInsets.only(top: 20, left: 30, right: 30),
                child: Text(
                  'VUI LÒNG ĐỌC VÀ ĐỒNG Ý TRƯỚC KHI TIẾP TỤC',
                  textAlign: TextAlign.center,
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18),
                ),
              ),
              const SizedBox(
                height: 8,
              ),
              Padding(
                padding: const EdgeInsets.all(8.0),
                child: textForm(
                  '  1-Thời gian đăng ký khám bệnh trong vòng 30 ngày đến 16h30 trước ngày khám\n 2-Quý khách có thể đăng ký khám 01 hoặc nhiều chuyên khoa.\n 3-Phí đăng ký khám trực tuyến bao gồm:\n \t\t\t\t\t\t\t\t +Tiền khám 01 {hoặc nhiều} chuyên khoa.\n \t\t\t\t\t\t\t\t +Phí tiện ích: phí sử dụng dịch vụ đăng ký khám bệnh trực tuyến, bao gồm phí tin nhắn thông báo lịch hẹn, thông báo giao dịch trên tài khoản thẻ, huỷ khám, nhắc tái khám...( chỉ trả 01 lần phí tiện ích cho 01 lượt đăng ký khám nhiều chuyênn khoa).\n4-Phương thức thanh toán: Phí khám bệnh được trừ vào tài khoản thẻ:;\n \t\t\t\t\t\t\t\t+Thẻ khám bệnh của Phòng Khám Đa Khoa Quốc Tế TIMEC: Người bệnh đăng ký chức năng thanh toán trực tuyến tại Phòng Khám hoặc các chi nhánh VietinBank trước khi sử dụng.\n \t\t\t\t\t\t\t\t+Các loại thẻ ATM nội địa(đã kích hoạt thanh toán trực tuyến).\n +Các thẻ thanh toán quốc tế ( Visa/MasterCard...).\n 5-Phiếu khám bệnh được gửi đến Quý khách qua email và tin nhắn SMS ngay sau khi đăng ký khám bệnh thành công.\n 6-Đến ngày khám, Người bệnh có mặt trước trong vòng 15 phút:\n \t\t\t\t\t\t\t\t+Người bệnh đủ điều kiện hưởng BHYT tại Phòng Khám: đến quầy đăng ký khám bệnh AAAA tầng AAAA xác nhận BHYT.\n \t\t\t\t\t\t\t\t+Người bệnh không BHYT đến thẳng phòng khám chuyên khoa theo lịch hẹn.',
                ),
              ),
              const SizedBox(
                height: 50,
              ),
            ],
          ),
        ]),
      ),
    );
  }

  Container textForm(label) {
    return Container(
        child: Text(
      label,
      style: const TextStyle(
        color: Colors.black,
      ),
      textAlign: TextAlign.justify,
    ));
  }
}
