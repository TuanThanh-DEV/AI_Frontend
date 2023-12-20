// import React from 'react';
// import { toast } from 'react-toastify';
// import { translate } from 'react-i18next';
// import agent from '../../services/agent';
// import ModalTransferForm from '../TransferForm/ModalTransferForm';
// import ModalPDFTransferFrom from '../TransferForm/ModalPDFTransferFrom';
// import pdfFonts from 'pdfmake/build/vfs_fonts';
// import pdfMake from 'pdfmake/build/pdfmake';import { FormatterUtils } from '../../utils/javascriptUtils';
// import moment from 'moment';


// class TabTransferForm extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             isTransferFormModalShown: false,
//             prescriptionId:null,
//             patientId:null,
//             isPDFModalShown : false,
//             imageLogo:""
//         }
//         this.handlePrintDrugInvoice = this.handlePrintDrugInvoice.bind(this);
//         this.handleShowModalTransferForm = this.handleShowModalTransferForm.bind(this);
//         this.handleHideAndClear=this.handleHideAndClear.bind(this);
//         this.handleHidemodal = () => {
//             const {ReloadTransferForm} =this.props;
//             this.setState({ isTransferFormModalShown: false,
//                  });
//                  ReloadTransferForm();
//         };
//         this.handleHidemodalPDF = () => {
//             this.setState({ isPDFModalShown: false , });
//             this.updateListTransferForm();
//         };

//         this.handleSavePDF = (dataExport) => {
//             pdfMake.vfs = pdfFonts.pdfMake.vfs;
//             pdfMake.createPdf(dataExport).print();
        
//         }
//     };
//     componentWillMount() {
//         var url = '/assets/images/logo_timec.png';
//         FormatterUtils.downloadImageDataUri(url, this, "imageLogo");
//     }

//     handlePrintDrugInvoice() {
    
//         // var id = this.props.match.params.id;
//         const {idTransferForm} = this.props;
//         if (idTransferForm != 'new') {
//             return agent.asyncRequests.get('/invoice/createInvoiceFromTransferForm?prescriptionId=' + idTransferForm
//             ).then(function (res) {
//                 var result = res.body.resultData;
//                 if (result) {
//                     toast.info("Đã lưu thành công Invoice Id " + result.id, { autoClose: 1000 });
//                 } else {
//                     toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
//                 }
//             }, function (err) {
//                 toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
//                     + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
//             });
//         }
//     }

//     handleShowModalTransferForm(id,prescriptionId,patientId) {
//             this.setState({
//                 isTransferFormModalShown: true,
//                 // idTransferForm: id,
//                 // prescriptionId: prescriptionId,
//                 // patientId:patientId,
//             });
//     }


//     handleHideAndClear() {
//         const { destroy, backToList,onHide } = this.props;
//          onHide();
//         destroy();
//         backToList()
//     }

//     getDataExport(dataPDF) {
        
//         var imageLogo = this.state.imageLogo;
//         var patientBarcode =  FormatterUtils.convertTextToBarcode("GCV" + dataPDF.prescription.id);
//         const {currentUser, t, currentPrescription}=this.props;
//         var addressLocalTime =" Chuyên Khoa " +(dataPDF.prescription?  (dataPDF.prescription.department ? dataPDF.prescription.department.name:  "") :"")
//                             + ", Phòng Khám " +(dataPDF.prescription?  (dataPDF.prescription.hospital ? dataPDF.prescription.hospital.name:  "") :"")
//         var today = moment(new Date,"DD/MM/YYYY");
//         var  dataExport = {
//             content: [
//                 {
//                     columns: [
//                         { text: 'Sở Y Tế TPHCM' + '\n Phòng Khám Đa Khoa Quốc Tế TIMEC'+'\n Số: ...../20...../GCT', fontSize: 11,alignment: 'center' },
//                         { text: 'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM'+'\n Độc lập - Tự do - Hạnh phúc'+ '\n ---------------', fontSize: 11, alignment: 'center' },
//                         { text: 'Mã Bệnh Án : '+ (dataPDF.prescription ? dataPDF.prescription.id:' ....')+'\n Mã Bệnh Nhân: '+(dataPDF.prescription ? dataPDF.prescription.patient.id:' ....'), fontSize: 11,alignment: 'center' },
//                     ]
//                 },           
//                 {
//                     columns:[
//                         imageLogo ? {
//                             image: imageLogo,
//                             fit: [100,100],
//                             alignment: 'left',
//                             margin : [20, 0, 0 , 0],
//                         } : null,
//                         {image: patientBarcode,fit:[100,100],alignment: 'right',  margin : [0, -20, 15 , 0]},
//                     ]
//                 },
//                 {
//                     columns :[
//                         {text:''+ "GCV" + dataPDF.prescription.id, fontSize: 11, alignment: 'right', margin : [0, 0, 70 , 0]} ,
//                     ]
//                 },
//                     { text: '\n GIẤY CHUYỂN TUYẾN KHÁM BỆNH, CHỮA BỆNH BẢO HIỂM Y TẾ', fontSize: 15, alignment: 'center' },
//                     {text :'Kính gửi:'+ (dataPDF.transferHospital ? dataPDF.transferHospital.name : "............................................"), fontSize: 13, alignment: 'center'}, 
                    
//                     { text: ['\n Cơ sở khám bệnh, chữa bệnh: ', {text : addressLocalTime? addressLocalTime 
//                         :"................................"}, ". Trân trọng giới thiệu:" ], fontSize: 11, alignment: 'left' },
//                     { text: ['\n - Họ và tên người bệnh: ', {text : dataPDF.prescription.patient ? dataPDF.prescription.patient.fullName : "...................................................................."}, "\t Nam/Nữ: ", 
//                         {text : t(dataPDF.prescription.patient ? dataPDF.prescription.patient.gender : "..................")},
//                         "\t Ngày Sinh: ", {text : dataPDF.prescription.patient ? FormatterUtils.formatYearFromBirthday(dataPDF.prescription.patient.birthday) :"......................" }], fontSize: 11, alignment: 'left' },

//                     { text: ['\n - Địa chỉ: ', {text : dataPDF.prescription.patient ? (dataPDF.prescription.patient.address != null ? 
//                         dataPDF.prescription.patient.address: " .................................................................................................................................................................") 
//                         : " ..............................................................................................................................................................."}], fontSize: 11, alignment: 'left' },
                    
//                     { text: ['\n - Dân tộc: ........................................................................................', {text : "\t Quốc tịch: .................................................."}], fontSize: 11, alignment: 'left' },
                    
//                     { text: '\n - Nghề nghiệp:  .......................................................................................................................................................', fontSize: 11, alignment: 'left' },
                    
//                     { text: ['\n - Nơi làm việc: .........................................................................................................................................................'], fontSize: 11, alignment: 'left' },

//                     {
//                         columns:[
//                         '\n Số thẻ bảo hiểm: ',
//                         {
//                             table: {
//                                 body: [
//                                     ['Col1', 'Col2', 'Col3'],
//                                 ]
//                             },width: '*',
//                         },
//                         "\n Hạn sử dụng: ................................",
//                     ],fontSize: 11, alignment: 'left'},

//                     { text: ['\n Đã được khám bệnh/điều trị:'], fontSize: 11, alignment: 'left' },

//                     { text: ['\n + Tại: .............................................................................( Tuyến: .................... ) \t  Ngày: ........./........./.............'], fontSize: 11, alignment: 'left' },
                    
//                     { text: ['\n TÓM TẮT BỆNH ÁN'], fontSize: 13, alignment: 'left' },
                    
//                     { text: ['\n - Dấu hiệu lâm sàng: ..........................................................................................................................................'], fontSize: 11, alignment: 'left' },
//                     { text: ['\n .............................................................................................................................................................................'], fontSize: 11, alignment: 'left' },
                    
//                     { text: ['\n - Kết quả xét nghiệm, cận lâm sàng: ...................................................................................................................'], fontSize: 11, alignment: 'left' },
//                     { text: ['\n .............................................................................................................................................................................'], fontSize: 11, alignment: 'left' },
                    
//                     { text: ['\n - Chẩn đoán:  ........................................................................................................................................................'], fontSize: 11, alignment: 'left' },
//                     { text: ['\n .............................................................................................................................................................................'], fontSize: 11, alignment: 'left' },
                    
//                     { text: ['\n - Phương pháp, thủ thuật, kỹ thuật, thuốc đã sử dụng trong điều trị: ...............................................................'], fontSize: 11, alignment: 'left' },
//                     { text: ['\n .............................................................................................................................................................................'], fontSize: 11, alignment: 'left' },
                    
//                     { text: ['\n - Tình trạng người bệnh lúc chuyển tuyến: .........................................................................................................'], fontSize: 11, alignment: 'left' },
//                     { text: ['\n .............................................................................................................................................................................'], fontSize: 11, alignment: 'left' },
                    
//                     { text: ['\n - Lí do chuyển tuyến: Khoanh tròn vào lý do chuyển tuyến phù hợp sau đây:'], fontSize: 11, alignment: 'left' },
                    
//                     { text: ['\n 1. Đủ điều kiện chuyển tuyến.'], fontSize: 11, alignment: 'left' },
                    
//                     { text: ['\n 2. Theo yêu cầu của người bệnh hoặc người đại diện hợp pháp của người bệnh.'], fontSize: 11, alignment: 'left' },
                    
//                     { text: ['\n - Hướng điều trị: ', {text: dataPDF.treatmentGuide ? dataPDF.treatmentGuide  : "......................................................................................................................................................"}], fontSize: 11, alignment: 'left' },
                    
//                     { text: ['\n - Chuyển tuyến hồi:\t ', {text :  today.hour() }, " giờ \t", {text: today.minutes() }, " phút\t", " ngày \t" ,{text:  today.date() }, " tháng \t", {text: today.month() }, " năm \t" ,{ text: today.year() },"."], fontSize: 11, alignment: 'left' },
                    
//                     { text: ['\n - Phương tiện vận chuyển: .............................................................................................................................'], fontSize: 11, alignment: 'left' },
                    
//                     { text: ['\n - Họ tên, chức danh, trình độ chuyên môn của người hộ tống: ..........................................................................'], fontSize: 11, alignment: 'left' },
                    
//                     {
//                         columns:[
//                             {text : "\n Y, BÁC SĨ KHÁM, ĐIỀU TRỊ \n \n (Ký và ghi rõ họ tên) \n " , fontSize: 11, alignment: 'center' },
//                             {text : "\n Ngày .... tháng .... năm 20......... \n \n NGƯỜI CÓ THẨM QUYỀN CHUYỂN TUYẾN \n \n (Ký tên, đóng dấu) \n ", fontSize: 11, alignment: 'center'  }
//                         ]
//                     }
//                 ],
//             styles: {
//                 header: {
//                     fontSize: 10,
//                     bold: true
//                 },
//                 bigger: {
//                     fontSize: 10,
//                     italics: true
//                 },
//                 tableExample: {
//                     margin: [0, 5, 0, 15]
//                 },
//                 tableHeader: {
//                     bold: true,
//                     fontSize: 13,
//                     color: 'black'
//                 }
//             },
//             defaultStyle: {
//                 columnGap: 10
//             }
//         }
//         return dataExport;
//     }
  
// render() {

//     const {dataListTranferFormon} = this.props;
//     var prescriptionRows = [];
//         if (dataListTranferFormon) {
//             var presciptionCurrentNo = 0;
//             prescriptionRows = dataListTranferFormon.map(item => {
//                 presciptionCurrentNo++
//                 return (
//                     <tr key={"presciptionId" + item.id}>
//                     <td>{item.patientStatus}</td>
//                     <td>{item.cls}</td>
//                     <td>{item.analysis}</td>
//                     <td>{item.therapyNote}</td>
//                     <td>{item.transferHospital ? item.transferHospital.name : null}</td>
//                     <td>{item.transferReason}</td>
//                     <td>{item.treatmentGuide}</td>
//                     <td><button type="button" className="btn btn-default" onClick={() => this.handleSavePDF(this.getDataExport(item))}>In </button></td>
//                     </tr>
//                 )
//             })
//         }

//         return <div className="tab-pane" id="default-justified-tab4">
//         <table className="table table-xxs table-bordered">
//             <thead>
//                 <tr className="bg-teal">
//                     <th data-toggle="true">Tình Trạng Bệnh Nhân</th>
//                     <th data-toggle="true">Dấu Hiệu Lâm Sàng</th>
//                     <th data-toggle="true">Chẩn Đoán</th>
//                     <th data-toggle="true">Phương Pháp Điều Trị</th>
//                     <th data-toggle="true">Tên Bệnh Viện Chuyển Đến</th>
//                     <th data-toggle="true">Lý Do Chuyển</th>
//                     <th data-toggle="true">Hướng Điều Trị</th>
//                     <th></th>
//                 </tr>
//             </thead>
//             <tbody>
//             {prescriptionRows}
//             </tbody>
//         </table>
//         {this.state.isTransferFormModalShown ? <ModalTransferForm 
//             title="Giấy Chuyển Viện" 
//             idTransferForm={this.state.idTransferForm} 
//             show={this.state.isTransferFormModalShown} 
//             onHide={this.handleHidemodal}
//             prescriptionId = {this.props.prescriptionId} /> : null
//         }
//         {this.state.isPDFModalShown ? <ModalPDFTransferFrom title="Đơn Nghỉ Phép" 
//             TransferForm={this.state.TransferForm}
//             show={this.state.isPDFModalShown} 
//             onHide={this.handleHidemodalPDF} 
//             dataTransferForm = {this.state.TransferForm}
//             /> : null}
//         </div>
                        
//     }
// }


// export default translate('translations')(TabTransferForm);