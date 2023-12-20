// import React from 'react';
// import { toast } from 'react-toastify';
// import { translate } from 'react-i18next';
// import agent from '../../services/agent';
// import ModalPrescriptionItem from '../PrescriptionItem/ModalPrescriptionItem';
// import pdfFonts from 'pdfmake/build/vfs_fonts';
// import pdfMake from 'pdfmake/build/pdfmake';
// import moment from 'moment';
// import Barcode from 'react-barcode';
// import JsBarcode from 'jsbarcode';
// import { FormatterUtils } from '../../utils/javascriptUtils';

// class TabPrescription extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             isPrescriptionModalShown: false,
//             prescriptionId:null,
//             patientId:null,
//             isPDFModalShown:false,
//             listPrescriptionItem: [],
//             imageLogo:"", 
//             isShowModalPrescriptionItemOld : false
//         }
//         this.handlePrintDrugInvoice = this.handlePrintDrugInvoice.bind(this);
//         this.handleShowmodalPrescriptionItem = this.handleShowmodalPrescriptionItem.bind(this);
//         this.handleHideAndClear=this.handleHideAndClear.bind(this);
//         this.handleHidemodal = () => {           
//             this.setState({ isPrescriptionModalShown: false,isShowModalPrescriptionItemOld : false});
//                  this.getListPrescriptionItemByPrescriptionId();            
//         };
//         this.handleHidemodalPDF = () => {           
//             this.setState({ isPDFModalShown: false , });
//         };
//         this.getListPrescriptionItemByPrescriptionId = this.getListPrescriptionItemByPrescriptionId.bind(this);    
//         this.handleSavePDF = (dataExport) => {
        
          

//             pdfMake.vfs = pdfFonts.pdfMake.vfs;
//             pdfMake.createPdf(dataExport).print();
        
//         }
//     };
   
//     getDataExport(dataPrescriptionItemList) {
//         var imageLogo = this.state.imageLogo;

//         var currentPrescription = this.props.currentPrescription;
//         // Show list items
//         var currentNo = 0;
//         var patientBarcode =  FormatterUtils.convertTextToBarcode("DT" + currentPrescription.id);
     
//         var itemRows = dataPrescriptionItemList.map(item => {
//             currentNo++;
//             return [[currentNo +'. '], [item.drug.name,"Hướng dẫn sử dụng: "+ item.instruction],[ item.totalAmount], [item.drug.uom]
//                    ];
//         });
//         const currentUser=this.props.currentUser;
//         const {t} = this.props;
//         var today = new Date();
        
//         var tableItems = {
//             style: 'tableExample',
          
           
// 			table: {
//                 widths: ['auto','*','auto', 'auto'],
               
//                 body:itemRows,

                
// 			},
// 			layout: 'noBorders'
// 		},
//         dataExport = {


//             content: [

//                 {
//                     columns: [
//                         { text: 'Sở Y Tế TPHCM' + '\n Phòng Khám Đa Khoa Quốc Tế TIMEC'+'\n Số: ...../20...../GCT', fontSize: 11,alignment: 'center' },
//                         // { text: 'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM'+'\n Độc lập - Tự do - Hạnh phúc'+ '\n ---------------', fontSize: 11, alignment: 'center' },
//                         { text: 'Mã Toa: '+ (currentPrescription?currentPrescription.id:' ....')+'\n Mã Bệnh Nhân: '+(currentPrescription?currentPrescription.patient.id:' ....'), fontSize: 11,alignment: 'center' },
//                     ]
//                 },           
//                 {
//                     columns:[
//                         imageLogo ? {
//                             image: imageLogo,
//                             fit: [100,100],
//                             alignment: 'left',
//                             margin : [60, 0, 0 , 0],
//                         } : null,
//                     ]
//                 },
//                 {
//                     columns: [
//                         { text: '\n ĐƠN THUỐC', fontSize: 15, alignment: 'center' },
//                     ]                    
//                 },
//                     {image: patientBarcode,fit:[150,100],alignment: 'center'},
//                     {text:''+ "DT" + currentPrescription.id, fontSize: 11, alignment: 'center'} ,

//                 {
//                     columns: [
                       
//                         { width:'auto', text: '\n Họ tên người bệnh: '+ (currentPrescription.patient?currentPrescription.patient.fullName:''),fontSize: 11},
//                         { text: '\n Giới tính: '+t(currentPrescription.patient?currentPrescription.patient.gender:''), fontSize: 11,alignment: 'right'},
//                         { text: '\n Ngày Sinh: ' + (currentPrescription.patient? FormatterUtils.formatYearFromBirthday(currentPrescription.patient.birthday) :''), fontSize: 11,alignment: 'right'},
                        
//                     ]
//                 },
//                 {
//                     columns: [
//                         { text: '\n Địa chỉ: '+ (currentPrescription.patient.address ? currentPrescription.patient.address : '') , fontSize: 11,},
                        
                        
//                     ]
//                 },
//                 {
//                     columns: [
//                         { text: '\n Chẩn Đoán: '+ currentPrescription.analysis, fontSize: 11,},
//                         {text:'\n\n\n'},
                        
//                     ]
//                 },
//                 tableItems,

//                 {
//                     columns: [
//                         { text: ' ', fontSize: 11},
//                         { text: ' ', fontSize: 11},
//                         { text:moment(today).format("DD/MM/YYYY")+ '\nBác Sĩ điều trị \n\n\n\n',alignment: 'center', fontSize: 11},
                       
                        
//                     ]
//                 },
//                 {
//                     columns: [
//                         { text: 'Lời dặn:',decoration: 'underline',bold:'true', fontSize: 11},
//                         { text: ' ', fontSize: 11},
//                         { text: ' ', fontSize: 11},
                       
                        
//                     ]
//                 },
//                 {
//                     columns: [
//                         { text: '\n\n Tái khám:',bold:'true', fontSize: 11},
//                         { text: ' ', fontSize: 11},
//                         { text:'\n\n'+currentUser.fullName,alignment: 'center', fontSize: 11},
                       
                        
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
        
        
//             // TODO build json
//         }
//         return dataExport;

            
//     }
//     getListPrescriptionItemByPrescriptionId() {
//         var id = this.props.prescriptionId;
//         if (id != 'new') {
//             let setStateInRequest = (list) => { this.setState({ listPrescriptionItem: list }) }
//             return agent.PrescriptionItemApi.findByPrescriptionId(id
//             ).then(function (res) {
//                 var result = res.resultData;
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
//     handlePrintDrugInvoice() {
    
//         // var id = this.props.match.params.id;
//        // const {idPrescription} = this.props;
        
//         // TODO: Invoice screen must generate invoice from PrescriptionItemList (not here!!!)
//         // if (idPrescription != 'new') {
//         //     return agent.asyncRequests.get('/invoice/createInvoiceFromPrescriptionItem?prescriptionId=' + idPrescription
//         //     ).then(function (res) {
//         //         var result = res.body.resultData;
//         //         if (result) {
//         //             toast.info("Đã lưu thành công Invoice Id " + result.id, { autoClose: 1000 });
                    
//         //         } else {
//         //             toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
//         //         }
//         //     }, function (err) {
//         //         toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
//         //             + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
//         //     });
//         // }

//         // this.handleSavePDF(dataExport);

//         // this.setState({
//         //     isPDFModalShown: true,
//         //     // PrescriptionItem: PrescriptionItem
//         // });
//     }

//     handleShowmodalPrescriptionItem(id,prescriptionId,patientId) {
//             this.setState({
//                 isPrescriptionModalShown: true,
//                 idPopupPrescriptionItem: id,
//                 prescriptionId: prescriptionId,
//                 patientId:patientId,
//             });
//     }
//     handleHideAndClear() {
//         const { destroy, backToList,onHide } = this.props;
//          onHide();
//         destroy();
//         backToList()
//     }
//     componentWillMount() {
//         this.getListPrescriptionItemByPrescriptionId();
//         var url = '/assets/images/logo_timec.png';
//         FormatterUtils.downloadImageDataUri(url, this, "imageLogo");
       
//     }
//     handleShowModalPrescriptionItemOld(){
//         this.setState({
//             isShowModalPrescriptionItemOld : true
//         })
//     }
// render() {
//     const {prescriptionId,patientId}=this.props;
//     // if(!prescriptionId || !patientId)
//     // {
//     //     return null;
//     // }
//     const dataPrescriptionItemList = this.state.listPrescriptionItem;
//     var prescriptionItemRows = [];
//         if (dataPrescriptionItemList) {
//             // var dataExport = this.getDataExport(dataPrescriptionItemList);
//             var presciptionCurrentNo = 0;
//             prescriptionItemRows = dataPrescriptionItemList.map(item => {
//                 presciptionCurrentNo++
//                 return (<tr key={"prescriptionItemId" + item.id} >
//                             <td>{presciptionCurrentNo}</td>
//                             <td>{item.drug ? item.drug.name : null}</td>
//                             <td>{item.totalAmount}</td>
//                             <td>{item.instruction}</td>
//                                      </tr>
//                 )
//             })
//         }

//         return <div className="tab-pane active" id="default-justified-tab1">
//                     <table className="table table-xxs table-bordered">
//                         <thead>
//                             <tr className="bg-teal">
//                                     <th data-toggle="true">STT</th>
//                                 <th data-toggle="true">Tên Thuốc</th>
//                                 <th data-toggle="true">Số Lượng</th>
//                                 <th data-toggle="true">Chỉ Dẫn</th>
//                                             </tr>
//                         </thead>
//                         <tbody>
//                             {prescriptionItemRows}
//                         </tbody>
//                         {
//                     this.state.isPrescriptionModalShown ? <ModalPrescriptionItem
//                         title={this.state.idPopupPrescriptionItem?"Chỉnh Sửa Đơn Thuốc":"Nhập Đơn Thuốc"}
//                         idPopupPrescriptionItem={this.state.idPopupPrescriptionItem}
//                         show={this.state.isPrescriptionModalShown}
//                         onHide={this.handleHidemodal}
//                         prescriptionId = {this.props.prescriptionId}
//                         patientId = {this.props.patientId}
//                          /> : null
//                     }
                    
//                     </table>
//                     {
//                     this.state.isShowModalPrescriptionItemOld ? <ModalPrescriptionItemOld
//                         title={"Danh Sách Đơn Thuốc"}
//                         // idPopupPrescriptionItem={this.state.idPopupPrescriptionItem}
//                         show={this.state.isShowModalPrescriptionItemOld}
//                         onHide={this.handleHidemodal}
//                         // prescriptionId = {this.props.prescriptionId}
//                         // patientId = {this.props.patientId}
//                          /> : null
//                     }
//                 </div>
                
//     }
// }


// export default translate('translations')(TabPrescription);