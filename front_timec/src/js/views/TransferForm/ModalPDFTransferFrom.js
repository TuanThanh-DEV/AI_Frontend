import { DateUtils, FormatterUtils } from "../../utils/javascriptUtils";
import moment from 'moment';

const printTransferFormPDF = {
    getTransferFormDataExport:(dataPDF,imageLogo,props)=>{
        var patientBarcode =  FormatterUtils.convertTextToBarcode(dataPDF.barCode);
        const {t}=props;
        var addressLocalTime =" Chuyên Khoa " +(dataPDF.prescription?  (dataPDF.prescription.department ? dataPDF.prescription.department.name:  "") :"")
                            + ", Phòng Khám " +(dataPDF.prescription?  (dataPDF.prescription.hospital ? dataPDF.prescription.hospital.name:  "") :"")
        var today = moment(new Date,"DD/MM/YYYY");
        var  dataExport = {
            content: [
                {
                    columns: [
                        { text: 'Sở Y Tế TPHCM' + '\n Phòng Khám Đa Khoa Quốc Tế TIMEC'+'\n Số: ...../20...../GCT', fontSize: 11,alignment: 'center', margin:[-50,0,0,0] },
                        { text: 'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM'+'\n\n Độc lập - Tự do - Hạnh phúc'+ '\n ---------------', fontSize: 11, alignment: 'center',  margin:[-30,0,-30,0] },
                        { text: 'Mã Bệnh Án : '+ (dataPDF.prescription ? dataPDF.prescription.id:' ....')+'\n Mã Bệnh Nhân: '+(dataPDF.prescription && dataPDF.prescription.patient ? dataPDF.prescription.patient.code:' ....'), fontSize: 11,alignment: 'center', margin:[0,0,-70,0] },
                    ]
                },           
                {
                    columns:[
                        imageLogo ? {
                            image: imageLogo,
                            fit: [100,100],
                            alignment: 'left',
                            margin : [20, 0, 0 , 0],
                        } : null,
                        {image: patientBarcode,fit:[100,100],alignment: 'right',  margin : [0, -20, 0 , 0]},
                    ]
                },
                {
                    columns :[
                        {text:''+ dataPDF.barCode, fontSize: 11, alignment: 'right', margin : [0, 0, 20 , 0]} ,
                    ]
                },
                    { text: '\n GIẤY CHUYỂN TUYẾN KHÁM BỆNH, CHỮA BỆNH BẢO HIỂM Y TẾ', fontSize: 15, alignment: 'center' },
                    {text :'Kính gửi:'+ (dataPDF.transferHospital ? dataPDF.transferHospital.name : "............................................"), fontSize: 13, alignment: 'center'}, 
                    
                    { text: ['\n Cơ sở khám bệnh, chữa bệnh: ', {text : addressLocalTime? addressLocalTime 
                        :"................................"}, ". Trân trọng giới thiệu:" ], fontSize: 11, alignment: 'left' },
                    { text: ['\n - Họ và tên người bệnh: ', {text : dataPDF.prescription.patient ? dataPDF.prescription.patient.fullName : "...................................................................."}, "\t Nam/Nữ: ", 
                        {text : t(dataPDF.prescription.patient ? dataPDF.prescription.patient.gender : "..................")},
                        "\t Ngày Sinh: ", {text : dataPDF.prescription.patient ? DateUtils.formatDateForScreen(dataPDF.prescription.patient.birthday) :"......................" }], fontSize: 11, alignment: 'left' },

                    { text: ['\n - Địa chỉ: ', {text : dataPDF.prescription.patient ? (dataPDF.prescription.patient.address != null ? 
                        dataPDF.prescription.patient.address: " .................................................................................................................................................................") 
                        : " ..............................................................................................................................................................."}], fontSize: 11, alignment: 'left' },
                    
                    { text: ['\n - Dân tộc: ........................................................................................', {text : "\t Quốc tịch: .................................................."}], fontSize: 11, alignment: 'left' },
                    
                    { text: '\n - Nghề nghiệp:  .......................................................................................................................................................', fontSize: 11, alignment: 'left' },
                    
                    { text: ['\n - Nơi làm việc: .........................................................................................................................................................'], fontSize: 11, alignment: 'left' },

                    {
                        columns:[
                        '\n Số thẻ bảo hiểm: ',
                        {
                            table: {
                                body: [
                                    ['Col1', 'Col2', 'Col3'],
                                ]
                            },width: '*',
                        },
                        "\n Hạn sử dụng: ................................",
                    ],fontSize: 11, alignment: 'left'},

                    { text: ['\n Đã được khám bệnh/điều trị:'], fontSize: 11, alignment: 'left' },

                    { text: ['\n + Tại: .............................................................................( Tuyến: .................... ) \t  Ngày: ........./........./.............'], fontSize: 11, alignment: 'left' },
                    
                    { text: ['\n TÓM TẮT BỆNH ÁN'], fontSize: 13, alignment: 'left' },
                    
                    { text: ['\n - Dấu hiệu lâm sàng: ', {text: dataPDF.cls ? dataPDF.cls  : '..........................................................................................................................................'}], fontSize: 11, alignment: 'left' },
                    // { text: ['\n .............................................................................................................................................................................'], fontSize: 11, alignment: 'left' },
                    
                    { text: ['\n - Kết quả xét nghiệm, cận lâm sàng: ', {text: dataPDF.diagnosisReports ? dataPDF.diagnosisReports  : '...................................................................................................................'}], fontSize: 11, alignment: 'left' },
                    // { text: ['\n .............................................................................................................................................................................'], fontSize: 11, alignment: 'left' },
                    
                    { text: ['\n - Chẩn đoán:  ', {text: dataPDF.analysis ? dataPDF.analysis  : '........................................................................................................................................................'}], fontSize: 11, alignment: 'left' },
                    // { text: ['\n .............................................................................................................................................................................'], fontSize: 11, alignment: 'left' },
                    
                    { text: ['\n - Phương pháp, thủ thuật, kỹ thuật, thuốc đã sử dụng trong điều trị: ', {text: dataPDF.therapyNote ? dataPDF.therapyNote  : '...............................................................'}], fontSize: 11, alignment: 'left' },
                    // { text: ['\n .............................................................................................................................................................................'], fontSize: 11, alignment: 'left' },
                    
                    { text: ['\n - Tình trạng người bệnh lúc chuyển tuyến: ', {text: dataPDF.patientStatus ? dataPDF.patientStatus  : '.........................................................................................................'}], fontSize: 11, alignment: 'left' },
                    // { text: ['\n .............................................................................................................................................................................'], fontSize: 11, alignment: 'left' },
                    
                    { text: ['\n - Lí do chuyển tuyến: Khoanh tròn vào lý do chuyển tuyến phù hợp sau đây:'], fontSize: 11, alignment: 'left' },
                    
                    { text: ['\n 1. Đủ điều kiện chuyển tuyến.'], fontSize: 11, alignment: 'left' },
                    
                    { text: ['\n 2. Theo yêu cầu của người bệnh hoặc người đại diện hợp pháp của người bệnh.'], fontSize: 11, alignment: 'left' },
                    
                    { text: ['\n - Hướng điều trị: ', {text: dataPDF.treatmentGuide ? dataPDF.treatmentGuide  : "......................................................................................................................................................"}], fontSize: 11, alignment: 'left' },
                    
                    { text: ['\n - Chuyển tuyến hồi:\t ', {text :  today.hour() }, " giờ \t", {text: today.minutes() }, " phút\t", " ngày \t" ,{text:  today.date() }, " tháng \t", {text: (today.month() + 1) }, " năm \t" ,{ text: today.year() },"."], fontSize: 11, alignment: 'left' },
                    
                    { text: ['\n - Phương tiện vận chuyển: ', {text: dataPDF.transportMethod ? dataPDF.transportMethod  : '.............................................................................................................................'}], fontSize: 11, alignment: 'left' },
                    
                    { text: ['\n - Họ tên, chức danh, trình độ chuyên môn của người hộ tống: ', {text: dataPDF.transportPerson ? dataPDF.transportPerson  : ' ..........................................................................'}], fontSize: 11, alignment: 'left' },
                    
                    {
                        columns:[
                            {text : "\n Y, BÁC SĨ KHÁM, ĐIỀU TRỊ \n \n (Ký và ghi rõ họ tên) \n " , fontSize: 11, alignment: 'center' },
                            {text : "\n Ngày .... tháng .... năm 20......... \n \n NGƯỜI CÓ THẨM QUYỀN CHUYỂN TUYẾN \n \n (Ký tên, đóng dấu) \n ", fontSize: 11, alignment: 'center'  }
                        ]
                    }
                ],
            styles: {
                header: {
                    fontSize: 10,
                    bold: true
                },
                bigger: {
                    fontSize: 10,
                    italics: true
                },
                tableExample: {
                    margin: [0, 5, 0, 15]
                },
                tableHeader: {
                    bold: true,
                    fontSize: 13,
                    color: 'black'
                }
            },
            defaultStyle: {
                columnGap: 10
            }
        }
        return dataExport;
    }
}
export{
    printTransferFormPDF
}