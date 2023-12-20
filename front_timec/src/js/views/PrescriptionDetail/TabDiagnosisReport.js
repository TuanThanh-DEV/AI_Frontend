// import React from 'react';
// import { toast } from 'react-toastify';
// import { translate } from 'react-i18next';
// import agent from '../../services/agent';
// import ModalDiagnosisReport from '../DiagnosisReport/ModalDiagnosisReport';
// import pdfFonts from 'pdfmake/build/vfs_fonts';
// import pdfMake from 'pdfmake/build/pdfmake';
// import moment from 'moment';
// import { FormatterUtils } from '../../utils/javascriptUtils';
// class TabDiagnosisReport extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             isDiagnosisReportModalShown:false,
//             prescriptionId:null,
//             hospitalId:null,
//             listDiagnosisReport: [],
//             imageLogo:""
//         }
//         var _this=this;
//         this.getListDiagnosisReportByPrescriptionId=this.getListDiagnosisReportByPrescriptionId.bind(this);
//         this.handlePrintdiagnosisReportInvoice = this.handlePrintdiagnosisReportInvoice.bind(this);
//         this.handleShowmodalDiagnosisReport = this.handleShowmodalDiagnosisReport.bind(this);
//         this.handleHideAndClear = this.handleHideAndClear.bind(this);
//         this.handleHidemodal = () => {
//             this.setState({isDiagnosisReportModalShown: false});
//             this.getListDiagnosisReportByPrescriptionId();
//         };
//         this.handleSavePDF = (dataExport) => {
        
//             pdfMake.vfs = pdfFonts.pdfMake.vfs;
//             pdfMake.createPdf(dataExport).print();
//         }
//     };

//     getDataExport(dataDiagnosisReport){
//         var imageLogo = this.state.imageLogo;
//         var currentPrescription = this.props.currentPrescription;
//         var patientBarcode =  FormatterUtils.convertTextToBarcode("PXN" + currentPrescription.id);
//         const {t} = this.props;
//         const currentUser=this.props.currentUser;
//         // Show list items
       
//         var today = new Date();
//         var itemfileName = dataDiagnosisReport.map(item => {
//             return [[item.fileName]
//                     ];
//         });
//         var itemDiagnosisService = dataDiagnosisReport.map(item => {
//             return [[item.diagnosisService?item.diagnosisService.name:null]
//                     ];
//         });
//         var itemReportType = dataDiagnosisReport.map(item => {
//             return [[ item.reportType]
//                     ];
//         });
//         var itemLaboratorist = dataDiagnosisReport.map(item => {
//             return [[ item.laboratorist?item.laboratorist.fullName:null]
//                     ];
//         });
//         var itemDescription = dataDiagnosisReport.map(item => {
//             return [[ item.description]
//                     ];
//         });
//         var tableItems = {
                   
//             style: 'tableExample',
//             table: {
//                 widths: ['*', '*', 'auto','*', '*'],
//                 body:[
//                   [{text:'Tên Chỉ Định', alignment: 'center'},{text:'Dịch Vụ Chỉ Định', alignment: 'center'},{text:'Kiểu Chỉ Định', alignment: 'center'},{text:'Nhân Viên Thực Hiện ', alignment: 'center'},{text:'Ghi Chú', alignment: 'center'} ],
//                    [ itemfileName,itemDiagnosisService,itemReportType,itemLaboratorist,itemDescription],
//             ]
//             },
//         },
//         dataExport = {
//             content: [
//                 {
//                     columns: [
//                         { text: 'Sở Y Tế TPHCM' + '\n Phòng Khám Đa Khoa Quốc Tế TIMEC'+'\n Số: ...../20...../GCT', fontSize: 11,alignment: 'center' },
//                         { text: 'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM'+'\n Độc lập - Tự do - Hạnh phúc'+ '\n ---------------', fontSize: 11, alignment: 'center' },
//                         { text: 'Mã Bệnh Án : '+ (currentPrescription ? currentPrescription.id:' ....')+'\n Mã Bệnh Nhân: '+(currentPrescription ? currentPrescription.patient.id:' ....'), fontSize: 11,alignment: 'center' },
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
//                         {text: "PXN" + currentPrescription.id, fontSize: 11, alignment: 'right', margin : [0, 0, 70 , 0]} ,

//                     ]
//                 },
//                 // {text:''+ "PXN"+currentPrescription.patient?currentPrescription.patient.code:null, fontSize: 11, alignment: 'right'} ,
                
            
//                 {
//                     columns: [
                       
//                         { text: '\n PHIẾU CHỈ ĐỊNH', fontSize: 15, alignment: 'center' },
                        
//                     ]
//                 },

//                 { text: ['\n Họ và tên người bệnh: ', {text : currentPrescription.patient?currentPrescription.patient.fullName : "...................................................................."}, "\t Nam/Nữ: ", 
//                 {text : t(currentPrescription.patient?currentPrescription.patient.gender : "..................")},
//                 "\t Tuổi: ", {text : currentPrescription.patient? FormatterUtils.formatYearFromBirthday(currentPrescription.patient.birthday) :"......................" }], fontSize: 11, alignment: 'left' },

//                 {
//                     columns: [
//                         { text: 'Địa chỉ: '+( currentPrescription.patient?currentPrescription.patient.address:''), fontSize: 11,},
                        
                        
//                     ]
//                 },
//                 {
//                     columns: [
                       
//                         { text: 'Chẩn đoán: '+currentPrescription.analysis, fontSize: 11},
                      
                        
//                     ]
//                 },
//                 {
//                     columns: [
                       
//                         { text: 'Bác sĩ chỉ định: '+(currentUser?currentUser.fullName:null), fontSize: 11},
//                         { text: '', fontSize: 11},
//                         { text: 'Ngày thực hiện: '+moment(today).format("DD/MM/YYYY"),alignment: 'right', fontSize: 11},                        
//                     ]
//                 },
              
//                 tableItems,

//                 {
//                     columns: [
                       
//                         { text: '', fontSize: 11},
//                         { text: '', fontSize: 11},
//                         { text:'Ngày '+ moment(today).format("LL"),alignment: 'center', fontSize: 11},                        
//                     ]
//                 },
//                 {
//                     columns: [
                       
//                         { text: '', fontSize: 11},
//                         { text: '', fontSize: 11},
//                         { text:'\n Bác sĩ chỉ định',alignment: 'center', fontSize: 11},                        
//                     ]
//                 },
//             ],
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
//     handlePrintdiagnosisReportInvoice() {
    
//         // var id = this.props.idPrescription;

//         const {idPrescription} = this.props;
//         if (idPrescription != 'new') {
//             return agent.asyncRequests.get('/invoice/createInvoiceFromDiagnosisReport?prescriptionId=' + idPrescription
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

//     handleShowmodalDiagnosisReport(id,prescriptionId,hospitalId){
//         this.setState({
//             isDiagnosisReportModalShown: true,
//             idDiagnosisReport: id,
//             prescriptionId:prescriptionId,
//             hospitalId:hospitalId,
//         });
//     }
//     handleHideAndClear() {
//         const { destroy, backToList,onHide } = this.props;
//         onHide();
//         destroy();
//         backToList()
//     }
//     getListDiagnosisReportByPrescriptionId() {
//         var id = this.props.prescriptionId;
//         if (id != 'new') {
//             let setStateInRequest = (list) => { this.setState({ listDiagnosisReport: list }) }
//             return agent.asyncRequests.get('/diagnosisReport/listFindByPrescriptionId?prescriptionId=' + id
//             ).then(function (res) {
//                 var result = res.body.resultData;
//                 if (result) {
//                     setStateInRequest(result);
//                 } else {
//                     toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
//                 }
//             }, function (err) {
//                 toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
//                     + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
//             });
//         }
//     }
//     componentWillMount() {
//         this.getListDiagnosisReportByPrescriptionId();
//         var url = '/assets/images/logo_timec.png';
//         FormatterUtils.downloadImageDataUri(url, this, "imageLogo");
//     }


// render() {
//     const {t}= this.props;
//     const dataDiagnosisReport = this.state.listDiagnosisReport;
//     var diagnosisReportRows =null;
//     if (dataDiagnosisReport) {
//         // var dataExport = this.getDataExport(dataDiagnosisReport);
//         var diagnosisReportCurrentNo = 0;
//         diagnosisReportRows = dataDiagnosisReport.map(items => {
//             diagnosisReportCurrentNo++
//             var elementColor = ""
//                     if(items.status == "OPEN"){
//                         elementColor =  "bg-default-300";
//                     }else if(items.status == "IN_PROGRESS") {
//                         elementColor =  "bg-info-300";
//                     }
//                     else if(items.status == "DONE") {
//                         elementColor =  "bg-success-300";
//                     } else{
//                         elementColor =  "bg-warning-300";
//                     }
//             return (
//                 <tr key={"diagnosisReportId" + items.id} >
//                 <td>{diagnosisReportCurrentNo}</td>
//                 <td>{items.fileName}</td>
//                 <td>{items.diagnosisService.name}</td>
//                 <td>{t(items.status)}</td>
//                       </tr>
//             )
//         })
//     }
    

//     return <div className="tab-pane" id="default-justified-tab2">
//                 <table className="table table-xxs table-bordered">
//                     <thead>
//                         <tr className="bg-teal">
//                             <th data-toggle="true">STT</th>
//                             <th data-toggle="true">Tên Chỉ Định</th>
//                             <th data-toggle="true">Dịch Vụ Chỉ Định</th>
//                             <th data-toggle="true">Trạng Thái</th>
//                                     </tr>
//                     </thead>
//                     <tbody>
//                         {diagnosisReportRows}
//                     </tbody>
//                 </table>
//                 {this.state.isDiagnosisReportModalShown ? <ModalDiagnosisReport
//                     title="Chọn Chỉ Định"
//                     idDiagnosisReport={this.state.idDiagnosisReport}
//                     show={this.state.isDiagnosisReportModalShown}
//                     onHide={this.handleHidemodal}
//                     prescriptionId = {this.props.prescriptionId}
//                     hospitalId={this.props.hospitalId}
//                     /> : null
//                 }
//         </div>
//     }
// }


// export default translate('translations')(TabDiagnosisReport);