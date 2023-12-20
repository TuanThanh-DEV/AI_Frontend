import React from 'react';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import agent from '../../services/agent';
import ModalProcedureReport from '../ProcedureReport/ModalProcedureReport';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import pdfMake from 'pdfmake/build/pdfmake';
import moment from 'moment';
import { DateUtils, FormatterUtils } from '../../utils/javascriptUtils';
import ModalCheckBoxListProcedureReport from '../ProcedureReport/ModalCheckBoxListProcedureReport';

class TabProcedureReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isProcudureReportModalShown: false,
            prescriptionId:null,
            patientId:null,
            listProcedureReport: [],
            imageLogo:"",
            isShowCheckBoxTree : false,

        }
        this.getListProcedureReportByPrescriptionId=  this.getListProcedureReportByPrescriptionId.bind(this);
        this.handlePrintProcedureReportInvoice = this.handlePrintProcedureReportInvoice.bind(this);
        this.handleShowModalProcedureReport = this.handleShowModalProcedureReport.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.handleShowModalCheckBoxTreeProcedureReport = this.handleShowModalCheckBoxTreeProcedureReport.bind(this);
        this.handleHidemodal = () => {
            this.setState({ isProcudureReportModalShown: false , isShowCheckBoxTree : false});            
            this.getListProcedureReportByPrescriptionId();
        };
        this.handleSavePDF = (dataExport) => {
            pdfMake.vfs = pdfFonts.pdfMake.vfs;
            pdfMake.createPdf(dataExport).print();
        }
    };
   
    getDataExport(dataProcedureReport){
        var currentPrescription = this.props.currentPrescription;
    
        var imageLogo = this.state.imageLogo;

         
        var checkCodeId = currentPrescription.id;
        var numberRandomRange = 7 ;
        var checkCode = checkCodeId.toString().length;
        var totalRange = numberRandomRange - checkCode;
        var title = "PTT";
        var codeNumber = "";
        for (var i = 0; i < totalRange ; i++) {
            codeNumber += '0';
        }
        var barcode = title + codeNumber + currentPrescription.id;
        var patientBarcode = FormatterUtils.convertTextToBarcode(barcode);
        // var patientBarcode =  FormatterUtils.convertTextToBarcode("PTT" + currentPrescription.id);
        const {t} = this.props;
        const currentUser=this.props.currentUser;
        // Show list items
        
        var today = new Date();
        var itemName = dataProcedureReport.map(item => {
        
            return [[item.procedureService ? item.procedureService.name : "N/A"]
                    ];
        });
        var itemDepartment = dataProcedureReport.map(item => {
         
            return [[ item.procedureService && item.procedureService.department ? item.procedureService.department.name : "N/A"]
                    ];
        });
        var itemPrice = dataProcedureReport.map(item => {
          
            return[ item.procedureService ? item.procedureService.price : "N/A"
                    ];
        });
        // var sumPrice =+ itemPrice;
        var tableItems = {
                   
            style: 'tableExample',
            alignment:'center',
            table: {
                widths: ['*', '*', '*'],
                body:[
                    [{text:'Tên Thủ Thuật', alignment: 'center'},{text:'Chuyên Khoa', alignment: 'center'},{text:'Đơn giá (VNĐ)', alignment: 'center'},],
                     [ itemName,itemDepartment,FormatterUtils.formatCurrency(itemPrice)],
              ]
            }
        },
        dataExport = {
            content: [
                {
                    columns: [
                        { text: 'Sở Y Tế TPHCM' + '\n Phòng Khám Đa Khoa Quốc Tế TIMEC'+'\n Số: ...../20...../GCT', fontSize: 11,alignment: 'center' },
                        { text: 'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM'+'\n Độc lập - Tự do - Hạnh phúc'+ '\n ---------------', fontSize: 11, alignment: 'center' },
                        { text: 'Mã Bệnh Án : '+ (currentPrescription ? currentPrescription.id:' ....')+'\n Mã Bệnh Nhân: '+(currentPrescription ? currentPrescription.patient.code:' ....'), fontSize: 11,alignment: 'center' },
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
                        {image: patientBarcode,fit:[100,100],alignment: 'right',  margin : [0, -20, 15 , 0]},
                    ]
                },
                {
                    columns :[
                        {text: barcode, fontSize: 11, alignment: 'right', margin : [0, 0, 50 , 0]} ,
                    ]
                },
                {
                    columns: [
                        { text: '\n PHIẾU PHẪU THUẬT/THỦ THUẬT', fontSize: 15, alignment: 'center' },
                    ]
                },
                    
                { text: ['\n Họ và tên người bệnh: ', {text : currentPrescription.patient?currentPrescription.patient.fullName : "...................................................................."}, "\t Nam/Nữ: ", 
                {text : t(currentPrescription.patient?currentPrescription.patient.gender : "..................")},
                "\t Ngày sinh: ", {text : currentPrescription.patient? DateUtils.formatDateForScreen(currentPrescription.patient.birthday ) :"......................" }], fontSize: 11, alignment: 'left' },
                {
                    columns: [
                        { text: '\n Địa chỉ: '+( currentPrescription.patient?currentPrescription.patient.address:''), fontSize: 11,},
                        
                        
                    ]
                },
                {
                    columns: [
                       
                        { text: 'Chẩn đoán: '+ currentPrescription.analysis ? currentPrescription.analysis :"N/A", fontSize: 11},
                      
                        
                    ]
                },
                {
                    columns: [
                       
                        { text: 'Bác sĩ chỉ định: '+(currentUser?currentUser.fullName:null), fontSize: 11},
                        { text: '', fontSize: 11},
                        { text: 'Ngày thực hiện: '+moment(today).format("DD/MM/YYYY"),alignment: 'right', fontSize: 11},                        
                    ]
                },
                // {
                //     columns: [
                       
                //         { text: '\n Phẫu Thuật Viên Chính: ', fontSize: 11},
                //         { text: '\n Phẫu Thuật Viên Phụ: ',alignment: 'left', fontSize: 11},                        
                //     ]
                // },
              
                tableItems,

                {
                    columns: [
                       
                        { text: '', fontSize: 11},
                        { text: '', fontSize: 11},
                        { text:'Ngày '+ moment(today).format("LL"),alignment: 'center', fontSize: 11},                        
                    ]
                },
                {
                    columns: [
                       
                        { text: '', fontSize: 11},
                        { text: '', fontSize: 11},
                        { text:'\nBác sĩ thực hiện' ,alignment: 'center', fontSize: 11},                        
                    ]
                },
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
    
    handlePrintProcedureReportInvoice(){
    
        // var id = this.props.idPrescription;

        const {idPrescription} = this.props;
        if (idPrescription != 'new') {
            return agent.asyncRequests.get('/invoice/createInvoiceFromProcudureReport?prescriptionId=' + idPrescription
            ).then(function (res) {
                var result = res.body.resultData;
                if (result) {
                    toast.info("Đã lưu thành công Invoice Id " + result.id, { autoClose: 1000 });
                } else {
                    toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                    + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
            });
        }
    }


    handleShowModalProcedureReport(id,prescriptionId,patientId) {
        this.setState({
            isProcudureReportModalShown: true,
            idProcedureReport: id,
            prescriptionId:prescriptionId,
            patientId:patientId,
        });
    }
    handleShowModalCheckBoxTreeProcedureReport() {
        this.setState({
            isShowCheckBoxTree: true,
        });
    }
    handleHideAndClear() {
        const { destroy, backToList,onHide } = this.props;
        onHide();
        destroy();
        backToList()
    }
    getListProcedureReportByPrescriptionId() {
        var id = this.props.prescriptionId;
        if (id != 'new') {
            let setStateInRequest = (list) => { this.setState({ listProcedureReport: list }) }
            return agent.asyncRequests.get('/procedureReport/listFindByPrescriptionId?prescriptionId=' + id
            ).then(function (res) {
                var result = res.body.resultData;
                if (result) {
                    setStateInRequest(result);
                } else {
                    toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                    + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
            });
        }
    }

    deleteProcedureReport(id) {
        if (confirm("Bạn có chắc sẽ xoá !")) {
            var url = `/procedureReport/${id}`;
            return agent.asyncRequests.del(url
            ).then(function (res) {
                var result = res.body.resultData;
                if (result && !result.error) {
                    // toast.success("Xoá Thành Công", { autoClose: 2000, position: toast.POSITION.TOP_RIGHT});
                    window.location.reload(true);
                } else {
                    toast.error("Có lỗi khi xóa dữ liệu. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Không thể xóa dữ liệu đang được sử dụng từ màn hình khác! ", { autoClose: 15000 });
            });
        } else {

        }
    }

    componentWillMount() {
        this.getListProcedureReportByPrescriptionId();

        var url = '/assets/images/logo_timec.png';
        FormatterUtils.downloadImageDataUri(url, this, "imageLogo");
    }

render() {
    const {t}= this.props;
    const dataProcedureReport = this.state.listProcedureReport;
    var procedureReportRows = null;
    if (dataProcedureReport) {
        var procedureReportCurrentNo = 0;
        // var dataExport = this.getDataExport(dataProcedureReport);
        procedureReportRows = dataProcedureReport.map(item => {
            procedureReportCurrentNo++
            var elementColor = ""
            var elementColor = ""
            if (item.status == "OPEN") {
                elementColor = { 'color': '#0040ff' }
            } else if (item.status == "IN_PROGRESS") {
                elementColor = { 'color': '#ff0000' }
            }
            else if (item.status == "DONE") {
                elementColor = { 'color': '#039296' }
            } else {
                elementColor = {'color': '#777' }
            }
            var elementRed = <a className="pull-left" onClick={() => this.handleShowModalProcedureReport(item.id)}> Xem </a> ;
            var elementClear = item.status != "DONE" ? <a className="pull-right" onClick={() => this.deleteProcedureReport(item.id)}> Xoá </a> : "";

            return (
                <tr key={"procedureReportId" + item.id}>
                    <td>{procedureReportCurrentNo}</td>                     
                    <td>{item.procedureService.name}</td>
                    <td>{item.patient.fullName}</td>
                    <td>{item.note}</td>
                    <td style={elementColor}>{t(item.status)}</td>
                    <td  width="10%" >
                        {elementRed}
                        {elementClear}
                    </td>
                </tr>
            )
        })
    }

        return <div className="tab-pane" id="default-justified-tab22">
        <table className="table table-xxs table-bordered">
            <thead>
                <tr className="bg-teal">
                    <th data-toggle="true">STT</th>
                    <th data-toggle="true">Tên Thủ Thuật</th>
                    <th data-toggle="true">Tên Bệnh Nhân</th>
                    <th data-toggle="true">Ghi Chú</th>
                    <th data-toggle="true">Trạng Thái</th>
                    <th width="10%" className="text-center footable-visible footable-last-column" style={{ width: '70px' }}><i className="icon-menu-open2"></i></th>
                </tr>
            </thead>
            <tbody>
            {procedureReportRows}
            </tbody>
        </table>
        {
            this.state.isProcudureReportModalShown ? <ModalProcedureReport
                title="Chọn Thủ Thuật"
                idProcedureReport={this.state.idProcedureReport}
                show={this.state.isProcudureReportModalShown}
                onHide={this.handleHidemodal} 
                prescriptionId = {this.props.prescriptionId}
                patientId = {this.props.patientId}
                currentUser={this.props.currentUser}
                isEditale = {false}
                /> : null
                
        }
        {
            this.state.isShowCheckBoxTree ? <ModalCheckBoxListProcedureReport
                title="Chọn Thủ Thuật"
                idProcedureReport={this.state.idProcedureReport}
                show={this.state.isShowCheckBoxTree}
                onHide={this.handleHidemodal} 
                prescriptionId = {this.props.prescriptionId}
                patientId = {this.props.patientId}
                /> : null
                
        }
        <div className="panel-body">
            <div className="heading-elements">
                <button type="button" className="btn btn-default" onClick={() =>  this.handleSavePDF(this.getDataExport(dataProcedureReport))}>In Thủ thuật</button>
                {/* <button type="button" className="btn btn-info" onClick={() => this.handleShowModalProcedureReport(null,this.props.prescriptionId,this.props.patientId)}>Chọn Thủ Thuật</button> */}
                <button type="button" className="btn btn-info" onClick={() => this.handleShowModalCheckBoxTreeProcedureReport()}>Chọn Thủ Thuật</button>
            </div>
        </div>
    </div>
                   
                
    }
}


export default translate('translations')(TabProcedureReport);