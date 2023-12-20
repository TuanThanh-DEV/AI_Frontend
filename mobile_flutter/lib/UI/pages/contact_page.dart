import 'package:flutter/material.dart';

class contactPage extends StatelessWidget {
  const contactPage({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          toolbarHeight: 65,
          backgroundColor: const Color.fromARGB(255, 28, 160, 154),
          title: Container(
            margin: const EdgeInsets.only(left: 105),
            child: const Text(
              "LIÊN HỆ",
              textAlign: TextAlign.center,
              style: TextStyle(
                color: Colors.white,
                fontSize: 17,
                fontWeight: FontWeight.bold
              )
            ),
          ),
        ),
        body: Padding(
          padding: EdgeInsets.all(15),
          child: Column(
            children: [
              Container(
                child: Image.asset('images/doctor2.jpg'),
              ),
              const SizedBox(
                height: 20,
              ),
              const Text(' Thông tin liên hệ  ',
                  style: TextStyle(
                    fontSize: 16,
                    color: Color.fromARGB(
                      255,
                      28,
                      160,
                      154,
                    ),
                    fontWeight: FontWeight.bold,
                  )),
              const SizedBox(
                height: 10,
              ),
              Text(
                  'Địa chỉ: Phòng khám  Sảnh Block F-G, Teco Town 4449 Nguyễn Cửu Phú, P. Tân Tạo A, Q. Bình Tân, Tp.HCM.\n\nThời gian làm việc:\n \t\t\tThứ 2 – Thứ 7: 7:30 – 20:30\n\t\t\t\tChủ nhật: 7:30 – 11:30\n\n Hotline: 0879 115 115\n Email: info@timec.vn ')
            ],
          ),
        ),
      ),
    );
  }
}
