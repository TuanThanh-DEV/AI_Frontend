import 'package:flutter/material.dart';

class medicalExaminationProcessPage extends StatelessWidget {
  const medicalExaminationProcessPage({super.key});

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
          toolbarHeight: 65,
          backgroundColor: const Color.fromARGB(255, 28, 160, 154),
          title: Container(
            margin: const EdgeInsets.only(right: 60),
            child: const Center(
              child: Text(
                "QUY TRÌNH ",
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
                      "Quy trình khám bệnh ",
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
                    "1.Đăng ký:",
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "   Bạn sẽ được yêu cầu đăng ký khi đến phòng khám. Trong quá trình đăng ký, bạn cần cung cấp thông tin cá nhân, thông tin y tế cơ bản và thông tin bảo hiểm nếu có.",
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "2.Gặp bác sĩ:",
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "   Sau khi đăng ký, bạn sẽ được đưa vào phòng khám để gặp bác sĩ. Bác sĩ sẽ thảo luận với bạn về tình trạng sức khỏe của bạn, triệu chứng và bất kỳ thông tin y tế quan trọng nào.",
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "3.Lịch sử y tế:",
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "   Bạn có thể được yêu cầu điền một biểu mẫu lịch sử y tế hoặc trả lời các câu hỏi về lịch sử y tế của bạn, bao gồm bất kỳ tình trạng bệnh lý, thuốc bạn đang dùng, tiền sử gia đình và thói quen sinh hoạt.",
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "4.Khám lâm sàng:",
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "   Bác sĩ sẽ tiến hành khám lâm sàng để đánh giá tình trạng của bạn. Khám lâm sàng có thể bao gồm kiểm tra huyết áp, nghe tim và phổi, kiểm tra vùng bệnh đau, và các xét nghiệm cận lâm sàng nếu cần.",
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "5.Xét nghiệm và chẩn đoán:",
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "   Dựa trên kết quả khám lâm sàng và lịch sử y tế của bạn, bác sĩ có thể ra quyết định về các xét nghiệm bổ sung hoặc chẩn đoán cụ thể để xác định tình trạng sức khỏe của bạn.",
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "6.Đề xuất điều trị:",
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "   Sau khi đặt chẩn đoán, bác sĩ sẽ thảo luận với bạn về phương pháp điều trị hoặc các quy trình cần thiết. Bạn có thể được tư vấn về thuốc, phẫu thuật, điều trị y học hay lối sống lành mạnh, tùy thuộc vào tình trạng của bạn.",
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "7.Lên kế hoạch điều trị:",
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "   Bạn và bác sĩ sẽ cùng nhau xây dựng kế hoạch điều trị, bao gồm lịch trình, thuốc, và các chỉ đạo cụ thể.",
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "8.Thanh toán:",
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "   Sau khi hoàn tất khám và điều trị, bạn sẽ thanh toán chi phí khám bệnh, và bệnh viện có thể chấp nhận thanh toán bằng tiền mặt, thẻ tín dụng hoặc bảo hiểm y tế.",
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "9.Lên lịch tái khám (nếu cần):",
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                ),
                SizedBox(
                  height: 5,
                ),
                Container(
                  alignment: Alignment.topLeft,
                  child: Text(
                    "   Bác sĩ có thể đề xuất lên lịch tái khám để theo dõi tình trạng sức khỏe của bạn hoặc điều trị tiếp theo.",
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
