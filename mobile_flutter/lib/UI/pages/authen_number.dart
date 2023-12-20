import 'package:flutter/material.dart';

class authenNumberPage extends StatefulWidget {
  const authenNumberPage({super.key});

  @override
  State<authenNumberPage> createState() => _authenNumberPageState();
}

class _authenNumberPageState extends State<authenNumberPage> {
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          toolbarHeight: 65,
          backgroundColor: const Color.fromARGB(255, 28, 160, 154),
          title: const Center(
            child: Text(' Xác thực số điện thoại',
                style: TextStyle(
                    color: Colors.white,
                    fontSize: 16,
                    fontWeight: FontWeight.bold)),
          ),
        ),
        body: Column(
          children: [
            Container(
              child: Text(
                  'Vui lòng nhập lại đầy đủ mã xác nhận vừa được gửi đến số điện thoại' +
                      '$textNumber()' ' vào ô bên dưới :'),
            ),
            const SizedBox(
              height: 20,
            ),
            Container(
              child: TextFormField(
                decoration: (InputDecoration(
                    filled: true,
                    hintText: "Nhập mã xác nhận",
                    enabledBorder: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(5),
                        borderSide:
                            const BorderSide(color: Colors.grey, width: 1.0)))),
              ),
            ),
            const SizedBox(
              height: 30,
            ),
            Container(
              height: 40,
              width: 100,
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(8),
                color: const Color.fromARGB(255, 28, 160, 154),
              ),
              child: TextButton(
                child: const Text(
                  "Xác nhận ",
                  style: TextStyle(color: Colors.white),
                ),
                onPressed: () {},
              ),
            ),
           const SizedBox(
              height: 10,
            ),
            const Row(
              children: [
                Icon(Icons.arrow_right_outlined),
                Text(
                  'Bạn không được mã xác nhận?',
                  style: TextStyle(
                    color: Colors.black,
                  ),
                )
              ],
            )
          ],
        ),
      ),
    );
  }

  void textNumber() {
    Container(
      child: const Text(
        '',
        style: TextStyle(
          color: Color.fromARGB(255, 28, 160, 154),
        ),
      ),
    );
  }
}
