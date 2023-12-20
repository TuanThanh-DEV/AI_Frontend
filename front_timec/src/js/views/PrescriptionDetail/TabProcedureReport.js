// import React from 'react';
// import { toast } from 'react-toastify';
// import { translate } from 'react-i18next';
// import agent from '../../services/agent';
// import ModalProcedureReport from '../ProcedureReport/ModalProcedureReport';
// import pdfFonts from 'pdfmake/build/vfs_fonts';
// import pdfMake from 'pdfmake/build/pdfmake';
// import moment from 'moment';
// import { FormatterUtils } from '../../utils/javascriptUtils';

// class TabProcedureReport extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             isProcudureReportModalShown: false,
//             prescriptionId:null,
//             patientId:null,
//             listProcedureReport: [],
//             imageLogo:""
//         }
//         this.getListProcedureReportByPrescriptionId=  this.getListProcedureReportByPrescriptionId.bind(this);
//         this.handlePrintProcedureReportInvoice = this.handlePrintProcedureReportInvoice.bind(this);
//         this.handleShowmodalProcedureReport = this.handleShowmodalProcedureReport.bind(this);
//         this.handleHideAndClear = this.handleHideAndClear.bind(this);
//         this.handleHidemodal = () => {
//             this.setState({ isProcudureReportModalShown: false });            
//             this.getListProcedureReportByPrescriptionId();
//         };
//         this.handleSavePDF = (dataExport) => {
//             pdfMake.vfs = pdfFonts.pdfMake.vfs;
//             pdfMake.createPdf(dataExport).print();
//         }
//     };
   
//     getDataExport(dataProcedureReport){
//         var currentPrescription = this.props.currentPrescription;
    
//         var imageLogo = this.state.imageLogo;

         
//         var patientBarcode =  FormatterUtils.convertTextToBarcode("PTT" + currentPrescription.id);
//         const {t} = this.props;
//         const currentUser=this.props.currentUser;
//         // Show list items
        
//         var today = new Date();
//         var itemName = dataProcedureReport.map(item => {
        
//             return [[item.procedureService.name]
//                     ];
//         });
//         var itemNote = dataProcedureReport.map(item => {
         
//             return [[ item.note]
//                     ];
//         });
//         var itemStartTime = dataProcedureReport.map(item => {
          
//             return[moment(item.startTime).format("HH:ss - DD/MM/YYYY")
//                     ];
//         });

//         var tableItems = {
                   
//             style: 'tableExample',
//             table: {
//                 widths: ['*', '*', '*', '*'],
//                 body:[
//                     [{text:'Tên Thủ Thuật', alignment: 'center'},{text:'Thời Gian Bắt Đầu', alignment: 'center'},{text:'Ghi Chú', alignment: 'center'},],
//                      [ itemName,itemStartTime,itemNote],
//               ]
//             }
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
//                         {text: "PTT" + currentPrescription.id, fontSize: 11, alignment: 'right', margin : [0, 0, 70 , 0]} ,
//                     ]
//                 },
//                 {
//                     columns: [
//                         { text: '\n PHIẾU PHẪU THUẬT/THỦ THUẬT', fontSize: 15, alignment: 'center' },
//                     ]
//                 },
                    
//                 { text: ['\n Họ và tên người bệnh: ', {text : currentPrescription.patient?currentPrescription.patient.fullName : "...................................................................."}, "\t Nam/Nữ: ", 
//                 {text : t(currentPrescription.patient?currentPrescription.patient.gender : "..................")},
//                 "\t Ngày Sinh: ", {text : currentPrescription.patient? FormatterUtils.formatYearFromBirthday(currentPrescription.patient.birthday) :"......................" }], fontSize: 11, alignment: 'left' },
//                 {
//                     columns: [
//                         { text: '\n Địa chỉ: '+( currentPrescription.patient?currentPrescription.patient.address:''), fontSize: 11,},
                        
                        
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
//                 {
//                     columns: [
                       
//                         { text: '\n Phẫu Thuật Viên Chính: ', fontSize: 11},
//                         { text: '\n Phẫu Thuật Viên Phụ: ',alignment: 'left', fontSize: 11},                        
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
//                         { text:'\nBác sĩ thực hiện',alignment: 'center', fontSize: 11},                        
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
    
//     handlePrintProcedureReportInvoice(){
    
//         // var id = this.props.idPrescription;

//         const {idPrescription} = this.props;
//         if (idPrescription != 'new') {
//             return agent.asyncRequests.get('/invoice/createInvoiceFromProcudureReport?prescriptionId=' + idPrescription
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


//     handleShowmodalProcedureReport(id,prescriptionId,patientId) {
//         this.setState({
//             isProcudureReportModalShown: true,
//             idProcedureReport: id,
//             prescriptionId:prescriptionId,
//             patientId:patientId,
//         });
//     }
//     handleHideAndClear() {
//         const { destroy, backToList,onHide } = this.props;
//         onHide();
//         destroy();
//         backToList()
//     }
//     getListProcedureReportByPrescriptionId() {
//         var id = this.props.prescriptionId;
//         if (id != 'new') {
//             let setStateInRequest = (list) => { this.setState({ listProcedureReport: list }) }
//             return agent.asyncRequests.get('/procedureReport/listFindByPrescriptionId?prescriptionId=' + id
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
//         this.getListProcedureReportByPrescriptionId();

//         var url = '/assets/images/logo_timec.png';
//         FormatterUtils.downloadImageDataUri(url, this, "imageLogo");
//     }

// render() {
//     const {t}= this.props;
//     const dataProcedureReport = this.state.listProcedureReport;
//     var procedureReportRows = null;
//     if (dataProcedureReport) {
//         var procedureReportCurrentNo = 0;
//         // var dataExport = this.getDataExport(dataProcedureReport);
//         procedureReportRows = dataProcedureReport.map(items => {
//             procedureReportCurrentNo++
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
//                 <tr key={"procedureReportId" + items.id}>
//                     <td>{procedureReportCurrentNo}</td>                     
//                     <td>{items.procedureService.name}</td>
//                     <td>{items.patient.fullName}</td>
//                     <td>{items.note}</td>
//                     <td className={elementColor}>{t(items.status)}</td>
//                     <td><a onClick={() => this.handleShowmodalProcedureReport(items.id)}><i className="icon-eye"></i> Xem </a></td>
//                 </tr>
//             )
//         })
//     }

//         return <div className="tab-pane" id="default-justified-tab3">
//         <table className="table table-xxs table-bordered">
//             <thead>
//                 <tr className="bg-teal">
//                     <th data-toggle="true">STT</th>
//                     <th data-toggle="true">Tên Thủ Thuật</th>
//                     <th data-toggle="true">Tên Bệnh Nhân</th>
//                     <th data-toggle="true">Ghi Chú</th>
//                     <th data-toggle="true">Trạng Thái</th>
//                     <th className="text-center footable-visible footable-last-column" style={{ width: '70px' }}><i className="icon-menu-open2"></i></th>
//                 </tr>
//             </thead>
//             <tbody>
//             {procedureReportRows}
//             </tbody>
//         </table>
//         {
//             this.state.isProcudureReportModalShown ? <ModalProcedureReport
//                 title="Chọn Thủ Thuật"
//                 idProcedureReport={this.state.idProcedureReport}
//                 show={this.state.isProcudureReportModalShown}
//                 onHide={this.handleHidemodal} 
//                 prescriptionId = {this.props.prescriptionId}
//                 patientId = {this.props.patientId}
//                 /> : null
                
//         }
//     </div>
                   
                
//     }
// }


// export default translate('translations')(TabProcedureReport);