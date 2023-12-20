import moment from 'moment';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import React from 'react';
import { translate } from 'react-i18next';
import { toast } from 'react-toastify';
import agent from '../../services/agent';
import { DateUtils, FormatterUtils } from '../../utils/javascriptUtils';
import ModalCheckBoxListDiagnosisReportBHYT from '../DiagnosisReport/ModalCheckBoxListDiagnosisReportBHYT';
import ModalDiagnosisReport from '../DiagnosisReport/ModalDiagnosisReport';
import ModalUpdateQuantityDiagnosis from './ModalUpdateQuantityDiagnosis';

class TabDiagnosisReportBHYT extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDiagnosisReportModalShown: false,
            hospitalId: null,
            listDiagnosisReport: [],
            imageLogo: "",
            isShowCheckBoxTree: false,
            isModalUpdateQuantityShown: false,
            currentDiagnosisReport: null
        }
        var _this = this;
        this.getListDiagnosisReportByPrescriptionBHYTId = this.getListDiagnosisReportByPrescriptionBHYTId.bind(this);
        this.handlePrintdiagnosisReportInvoice = this.handlePrintdiagnosisReportInvoice.bind(this);
        this.handleShowmodalDiagnosisReport = this.handleShowmodalDiagnosisReport.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.handleShowCheckBoxTree = this.handleShowCheckBoxTree.bind(this);
        this.deleteDiagnosisReport = this.deleteDiagnosisReport.bind(this);
        this.handleHidemodal = () => {
            this.setState({ isDiagnosisReportModalShown: false, isShowCheckBoxTree: false, isModalUpdateQuantityShown: false });
            this.getListDiagnosisReportByPrescriptionBHYTId();
        };
        this.handleSavePDF = (dataExport) => {

            pdfMake.vfs = pdfFonts.pdfMake.vfs;
            pdfMake.createPdf(dataExport).print();
        };
        this.showModalUpdateQuantity = (diagnosisReport) => {
            this.setState({ isModalUpdateQuantityShown: true, currentDiagnosisReport: diagnosisReport });
        }
    };

    getDataExport(dataDiagnosisReport) {
        const { t, currentUser } = this.props;
        var imageLogo = this.state.imageLogo;
        var currentPrescription = this.props.currentPrescription;
        var bhytPrescription = this.props.bhytPrescription;

        var dataInsuranceCard = this.props.listIncuranceCard;
        var insuranceCode = dataInsuranceCard[0].insuranceCode;

        var checkCodeId = currentPrescription.id;
        var numberRandomRange = 7;
        var checkCode = checkCodeId.toString().length;
        var totalRange = numberRandomRange - checkCode;
        var title = "DVBHYT";
        var codeNumber = "";
        for (var i = 0; i < totalRange; i++) {
            codeNumber += '0';
        }
        var barcode = title + codeNumber + bhytPrescription.id;
        var patientBarcode = FormatterUtils.convertTextToBarcode(barcode);
        var bodyContent = [];
        var contents = [];
        var prescriptionDate = currentPrescription.arriveTime;
        var diagnosisGroupId = null;
        var group = [];
        var service = [];

        var address = null;
        var patientName = null;
        var gender = null;
        var tuoi = null;
        var analysis = null;
        var itemPrice = 0;
        var pageBreaks = 'after';
        analysis = currentPrescription.analysis ? currentPrescription.analysis : "";
        var cls = currentPrescription.cls ? currentPrescription.cls : "";
        dataDiagnosisReport.map((item, index) => {

            address = item.prescription.patient ? item.prescription.patient.address : null;
            patientName = item.prescription.patient ? item.prescription.patient.fullName : "....................................................................";
            gender = item.prescription.patient ? item.prescription.patient.gender : "..................";
            tuoi = item.prescription.patient ? DateUtils.formatDateForScreen(item.prescription.patient.birthday) : "......................";
            itemPrice = item.diagnosisService.price;

            if (diagnosisGroupId == null) {
                diagnosisGroupId = item.diagnosisService.diagnosisGroupId;
                service.push(item);
            } else if (diagnosisGroupId == item.diagnosisService.diagnosisGroupId) {
                service.push(item);
            } else if (diagnosisGroupId != item.diagnosisService.diagnosisGroupId) {
                group.push(service);
                diagnosisGroupId = item.diagnosisService.diagnosisGroupId;
                service = [];
                service.push(item);
            }
            if (index + 1 == dataDiagnosisReport.length) {
                group.push(service);
            }
        })

        group.map((itemListService, index) => {

            if (index + 1 == group.length) {
                pageBreaks = "";;
            }
            var groupName = null;
            var dataRowTable = [[{ text: 'Dịch Vụ :', alignment: 'lefr' }],]

            itemListService.map(item => {
                groupName = item.diagnosisService.diagnosisGroup.name;

                // return [[{text:'Tên Chỉ Định', alignment: 'center'},{text:'Nhóm Dịch Vụ', alignment: 'center'},{text:'Đơn Giá (VNĐ)', alignment: 'center'}], [ item.diagnosisService.name ,item.diagnosisService.diagnosisGroup.name,FormatterUtils.formatCurrency(itemPrice)]]
                // return [ [ item.diagnosisService.name ],[ FormatterUtils.formatCurrency(item.diagnosisService.price) + ' VNĐ']]
                return dataRowTable.push([' - ' + item.diagnosisService.name  + (item.quantity > 1 ? ( ". SL : " + item.quantity ) : " ") ])

            });

            var tableBody = {
                style: 'tableExample',
                table: {
                    // widths: ['*', '*'],
                    widths: ['*'],
                    body: dataRowTable
                },
                layout: "boder"
            },

                bodyContent = [
                    {
                        columns: [
                            { text: 'Sở Y Tế TPHCM' + '\n Phòng Khám Đa Khoa Quốc Tế TIMEC' + '\n Số: ...../20...../GCT', fontSize: 11, alignment: 'center' },
                            { text: 'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM' + '\n Độc lập - Tự do - Hạnh phúc' + '\n ---------------', fontSize: 11, alignment: 'center' },
                            { text: 'Mã Bệnh Án : ' + (currentPrescription ? currentPrescription.id : ' ....') + '\n Mã Bệnh Nhân: ' + (currentPrescription ? currentPrescription.patient.code : ' ....'), fontSize: 11, alignment: 'center' },
                        ]
                    },
                    {
                        columns: [
                            imageLogo ? {
                                image: imageLogo,
                                fit: [100, 100],
                                alignment: 'left',
                                margin: [20, 0, 0, 0],
                            } : null,
                            { image: patientBarcode, fit: [100, 100], alignment: 'right', margin: [0, -20, 15, 0] },
                        ]
                    },
                    {
                        columns: [
                            { text: barcode, fontSize: 11, alignment: 'right', margin: [0, 0, 35, 0] },

                        ]
                    },
                    {
                        columns: [
                            { text: '\n PHIẾU CHỈ ĐỊNH', fontSize: 15, alignment: 'center' },
                        ]
                    },

                    {
                        text: ['\n Họ và Tên: ', { text: patientName }, "\t Nam/Nữ: ",
                            { text: t(gender) },
                            "\t Ngày Sinh: ", { text: tuoi }], fontSize: 11, alignment: 'left'
                    },
                    {
                        columns: [
                            { text: 'Mã Thẻ BHYT: ' + insuranceCode + '\n', fontSize: 11, },
                        ]
                    },
                    {
                        columns: [
                            { text: 'Địa Chỉ: ' + (address ? address : ''), fontSize: 11, },
                        ]
                    },
                    { text: '\n', fontSize: 11 },
                    {
                        text: [
                            { text: 'Chẩn Đoán:  ', fontSize: 11, bold: true },
                            { text: analysis + '\n', fontSize: 11 },
                        ]
                    },
                    { text: '\n', fontSize: 11 },

                    {
                        text: [
                            { text: 'Triệu Chứng:  ', fontSize: 11, bold: true },
                            { text: cls + '\n', fontSize: 11 },
                        ]
                    },
                    { text: '\n', fontSize: 11 },
                    {
                        columns: [
                            { text: 'Bác Sĩ chỉ định: ' + (currentUser ? currentUser.fullName : null), fontSize: 11 },
                            { text: '', fontSize: 11 },
                            { text: 'Ngày thực hiện: ' + moment(prescriptionDate).format("DD/MM/YYYY"), alignment: 'right', fontSize: 11 },
                        ]
                    },
                    '\n',
                    {
                        columns: [{ text: 'Nhóm : ' + groupName, fontSize: 11 },],
                    },
                    // groupName
                    // content table
                    tableBody,
                    {
                        columns: [
                            { text: '', fontSize: 11 },
                            { text: '', fontSize: 11 },
                            { text: 'Ngày ' + moment(prescriptionDate).format("LL"), alignment: 'center', fontSize: 11 },
                        ]
                    },
                    {
                        columns: [
                            { text: '', fontSize: 11 },
                            { text: '', fontSize: 11 },
                            { text: '\n Bác sĩ chỉ định ', pageBreak: pageBreaks, alignment: 'center', fontSize: 11 },
                        ]
                    },
                ]

            contents.push(bodyContent);

        });

        var dataExport = {
            content: contents,
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
    getDataExportNoPayment(dataDiagnosisReportAll) {
        let dataDiagnosisReport = [];
        if(dataDiagnosisReportAll.length > 0){
            dataDiagnosisReportAll.map( item => {
                if(!item.statusPayment){
                    dataDiagnosisReport.push(item);
                }
            })
        }
        const { t, currentUser } = this.props;
        var imageLogo = this.state.imageLogo;
        var currentPrescription = this.props.currentPrescription;
        var bhytPrescription = this.props.bhytPrescription;

        var dataInsuranceCard = this.props.listIncuranceCard;
        var insuranceCode = dataInsuranceCard[0].insuranceCode;

        var checkCodeId = currentPrescription.id;
        var numberRandomRange = 7;
        var checkCode = checkCodeId.toString().length;
        var totalRange = numberRandomRange - checkCode;
        var title = "DVBHYT";
        var codeNumber = "";
        for (var i = 0; i < totalRange; i++) {
            codeNumber += '0';
        }
        var barcode = title + codeNumber + bhytPrescription.id;
        var patientBarcode = FormatterUtils.convertTextToBarcode(barcode);
        var bodyContent = [];
        var contents = [];
        var prescriptionDate = currentPrescription.arriveTime;
        var diagnosisGroupId = null;
        var group = [];
        var service = [];

        var address = null;
        var patientName = null;
        var gender = null;
        var tuoi = null;
        var analysis = null;
        var itemPrice = 0;
        var pageBreaks = 'after';
        analysis = currentPrescription.analysis ? currentPrescription.analysis : "";
        var cls = currentPrescription.cls ? currentPrescription.cls : "";
        dataDiagnosisReport.map((item, index) => {

            address = item.prescription.patient ? item.prescription.patient.address : null;
            patientName = item.prescription.patient ? item.prescription.patient.fullName : "....................................................................";
            gender = item.prescription.patient ? item.prescription.patient.gender : "..................";
            tuoi = item.prescription.patient ? DateUtils.formatDateForScreen(item.prescription.patient.birthday) : "......................";
            itemPrice = item.diagnosisService.price;

            if (diagnosisGroupId == null) {
                diagnosisGroupId = item.diagnosisService.diagnosisGroupId;
                service.push(item);
            } else if (diagnosisGroupId == item.diagnosisService.diagnosisGroupId) {
                service.push(item);
            } else if (diagnosisGroupId != item.diagnosisService.diagnosisGroupId) {
                group.push(service);
                diagnosisGroupId = item.diagnosisService.diagnosisGroupId;
                service = [];
                service.push(item);
            }
            if (index + 1 == dataDiagnosisReport.length) {
                group.push(service);
            }
        })

        group.map((itemListService, index) => {

            if (index + 1 == group.length) {
                pageBreaks = "";;
            }
            var groupName = null;
            var dataRowTable = [[{ text: 'Dịch Vụ :', alignment: 'lefr' }],]

            itemListService.map(item => {
                groupName = item.diagnosisService.diagnosisGroup.name;

                // return [[{text:'Tên Chỉ Định', alignment: 'center'},{text:'Nhóm Dịch Vụ', alignment: 'center'},{text:'Đơn Giá (VNĐ)', alignment: 'center'}], [ item.diagnosisService.name ,item.diagnosisService.diagnosisGroup.name,FormatterUtils.formatCurrency(itemPrice)]]
                // return [ [ item.diagnosisService.name ],[ FormatterUtils.formatCurrency(item.diagnosisService.price) + ' VNĐ']]
                return dataRowTable.push([' - ' + item.diagnosisService.name  + (item.quantity > 1 ? ( ". SL : " + item.quantity ) : " ") ])

            });

            var tableBody = {
                style: 'tableExample',
                table: {
                    // widths: ['*', '*'],
                    widths: ['*'],
                    body: dataRowTable
                },
                layout: "boder"
            },

                bodyContent = [
                    {
                        columns: [
                            { text: 'Sở Y Tế TPHCM' + '\n Phòng Khám Đa Khoa Quốc Tế TIMEC' + '\n Số: ...../20...../GCT', fontSize: 11, alignment: 'center' },
                            { text: 'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM' + '\n Độc lập - Tự do - Hạnh phúc' + '\n ---------------', fontSize: 11, alignment: 'center' },
                            { text: 'Mã Bệnh Án : ' + (currentPrescription ? currentPrescription.id : ' ....') + '\n Mã Bệnh Nhân: ' + (currentPrescription ? currentPrescription.patient.code : ' ....'), fontSize: 11, alignment: 'center' },
                        ]
                    },
                    {
                        columns: [
                            imageLogo ? {
                                image: imageLogo,
                                fit: [100, 100],
                                alignment: 'left',
                                margin: [20, 0, 0, 0],
                            } : null,
                            { image: patientBarcode, fit: [100, 100], alignment: 'right', margin: [0, -20, 15, 0] },
                        ]
                    },
                    {
                        columns: [
                            { text: barcode, fontSize: 11, alignment: 'right', margin: [0, 0, 35, 0] },

                        ]
                    },
                    {
                        columns: [
                            { text: '\n PHIẾU CHỈ ĐỊNH', fontSize: 15, alignment: 'center' },
                        ]
                    },

                    {
                        text: ['\n Họ và Tên: ', { text: patientName }, "\t Nam/Nữ: ",
                            { text: t(gender) },
                            "\t Ngày Sinh: ", { text: tuoi }], fontSize: 11, alignment: 'left'
                    },
                    {
                        columns: [
                            { text: 'Mã Thẻ BHYT: ' + insuranceCode + '\n', fontSize: 11, },
                        ]
                    },
                    {
                        columns: [
                            { text: 'Địa Chỉ: ' + (address ? address : ''), fontSize: 11, },
                        ]
                    },
                    { text: '\n', fontSize: 11 },
                    {
                        text: [
                            { text: 'Chẩn Đoán:  ', fontSize: 11, bold: true },
                            { text: analysis + '\n', fontSize: 11 },
                        ]
                    },
                    { text: '\n', fontSize: 11 },

                    {
                        text: [
                            { text: 'Triệu Chứng:  ', fontSize: 11, bold: true },
                            { text: cls + '\n', fontSize: 11 },
                        ]
                    },
                    { text: '\n', fontSize: 11 },
                    {
                        columns: [
                            { text: 'Bác Sĩ chỉ định: ' + (currentUser ? currentUser.fullName : null), fontSize: 11 },
                            { text: '', fontSize: 11 },
                            { text: 'Ngày thực hiện: ' + moment(prescriptionDate).format("DD/MM/YYYY"), alignment: 'right', fontSize: 11 },
                        ]
                    },
                    '\n',
                    {
                        columns: [{ text: 'Nhóm : ' + groupName, fontSize: 11 },],
                    },
                    // groupName
                    // content table
                    tableBody,
                    {
                        columns: [
                            { text: '', fontSize: 11 },
                            { text: '', fontSize: 11 },
                            { text: 'Ngày ' + moment(prescriptionDate).format("LL"), alignment: 'center', fontSize: 11 },
                        ]
                    },
                    {
                        columns: [
                            { text: '', fontSize: 11 },
                            { text: '', fontSize: 11 },
                            { text: '\n Bác sĩ chỉ định ', pageBreak: pageBreaks, alignment: 'center', fontSize: 11 },
                        ]
                    },
                ]

            contents.push(bodyContent);

        });

        var dataExport = {
            content: contents,
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
    handlePrintdiagnosisReportInvoice() {

        // var id = this.props.prescriptionId;

        const { prescriptionId } = this.props;
        if (prescriptionId != 'new') {
            return agent.asyncRequests.get('/invoice/createInvoiceFromDiagnosisReport?prescriptionId=' + prescriptionId
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

    handleShowmodalDiagnosisReport(id) {
        this.setState({
            isDiagnosisReportModalShown: true,
            idDiagnosisReport: id
        });
    }
    handleShowCheckBoxTree() {
        this.setState({
            isShowCheckBoxTree: true,
        })
    }


    handleHideAndClear() {
        const { destroy, backToList, onHide } = this.props;
        onHide();
        destroy();
        backToList()
    }

    getListDiagnosisReportByPrescriptionBHYTId() {
        var id = this.props.prescriptionId;
        if (id != 'new') {
            let setStateInRequest = (list) => { this.setState({ listDiagnosisReport: list }) }
            return agent.asyncRequests.get('/diagnosisReport/getByPrescriptionBHYTId?prescriptionId=' + id
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
    deleteDiagnosisReport(id) {
        let this_ = this;
        if (confirm("Bạn có chắc sẽ xoá!")) {
            var url = `/diagnosisReport/${id}`;
            return agent.asyncRequests.del(url
            ).then(function (res) {
                var result = res.body.resultData;
                if (result && !result.error) {
                    // toast.success("Xoá Thành Công", { autoClose: 2000, position: toast.POSITION.TOP_RIGHT});
                    this_.getListDiagnosisReportByPrescriptionBHYTId();
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
        this.getListDiagnosisReportByPrescriptionBHYTId();
        var url = '/assets/images/logo_timec.png';
        FormatterUtils.downloadImageDataUri(url, this, "imageLogo");
    }


    render() {
        const { t, prescriptionStatus, currentPrescription } = this.props;
        const dataDiagnosisReport = this.state.listDiagnosisReport;
        var diagnosisReportRows = null;
        let sumPrice = 0;
        if (dataDiagnosisReport) {
            // var dataExport = this.getDataExport(dataDiagnosisReport);
            var diagnosisReportCurrentNo = 0;
            diagnosisReportRows = dataDiagnosisReport.map(item => {
                diagnosisReportCurrentNo++
                var elementRed = <a className="pull-left" onClick={() => this.handleShowmodalDiagnosisReport(item.id)}> Xem </a>;
                var elementClear = (prescriptionStatus != 'DONE' && item.status != "DONE") ? <a className="pull-right" onClick={() => this.deleteDiagnosisReport(item.id)}> Xoá </a> : "";
                var elementColor = ""
                if (item.status == "OPEN") {
                    elementColor = { 'color': '#0040ff' }
                } else if (item.status == "IN_PROGRESS") {
                    elementColor = { 'color': '#ff0000' }
                }
                else if (item.status == "DONE") {
                    elementColor = { 'color': '#039296' }
                } else {
                    elementColor = { 'color': '#777' }
                }
                sumPrice += item.diagnosisService.price * item.quantity;

                return (
                    <tr key={"diagnosisReportId" + item.id} >
                        <td>{diagnosisReportCurrentNo} {item.statusPayment ? <p style={{color : 'green'}}>✓</p> : ''}</td>
                        <td>{item.diagnosisService.name}</td>
                        <td>{FormatterUtils.formatCurrency(item.diagnosisService.price)}</td>
                        {item.prescription.insuranceTypeId > 1 ? <td>{FormatterUtils.formatCurrency(item.diagnosisService.donGiaBhyt)}</td> : null}

                        <td><span>{item.quantity}</span> {prescriptionStatus != 'DONE' && item.status != "DONE" ? <span className="pull-right"><button onClick={() => this.showModalUpdateQuantity(item)}>+</button></span> : ''} </td>
                        <td>{FormatterUtils.formatCurrency(item.diagnosisService.price * item.quantity)}</td>
                        <td>{item.description}
                            {item.diagnosisReportlUploadFile.map(file => {
                                return <span><br /> <a href={agent.getBackendUrl() + file.fileDownloadUri}> {file.fileName} </a></span>
                            })}
                        </td>
                        <td style={elementColor}>{t(item.status)}</td>
                        <td width="10%">
                            {elementRed}
                            {elementClear}
                        </td>
                    </tr>
                )
            })
        }


        return <div className="tab-pane active" id="default-justified-TabDiagnosisReportBHYT">
            <table className="table table-xxs table-bordered">
                <thead>
                    <tr className="bg-teal">
                        <th data-toggle="true">STT</th>
                        <th data-toggle="true">Dịch Vụ Chỉ Định</th>
                        <th data-toggle="true">Đơn Giá</th>
                        {currentPrescription.insuranceTypeId && currentPrescription.insuranceTypeId > 1 ? <th data-toggle="true">Đơn Giá BHYT</th> : null}
                        <th data-toggle="true">Số lượng</th>
                        <th data-toggle="true">Thành Tiền Đơn Giá</th>
                        <th data-toggle="true">Kết quả Chỉ Định</th>
                        <th data-toggle="true">Trạng Thái</th>
                        <th width="10%" className="text-center footable-visible footable-last-column" style={{ width: '70px' }}><i className="icon-menu-open2"></i></th>
                    </tr>
                </thead>
                <tbody>
                    {diagnosisReportRows}
                </tbody>
            </table>
            {this.state.isDiagnosisReportModalShown ? <ModalDiagnosisReport
                title="Chọn Dịch Vụ"
                idDiagnosisReport={this.state.idDiagnosisReport}
                show={this.state.isDiagnosisReportModalShown}
                onHide={this.handleHidemodal}
                prescriptionId={this.props.prescriptionId}
                hospitalId={this.props.hospitalId}
                isActiveDoctor={true}
                isEditale={false}
            /> : null
            }

            {this.state.isShowCheckBoxTree ? <ModalCheckBoxListDiagnosisReportBHYT
                title={currentPrescription.insuranceTypeId > 1 ? "Chọn Dịch Vụ BHYT" : "Chọn Dịch Vụ"}
                show={this.state.isShowCheckBoxTree}
                onHide={this.handleHidemodal}
                prescriptionId={this.props.prescriptionId}
                isAllService={!currentPrescription.insuranceTypeId}
            /> : null
            }
            {this.state.isModalUpdateQuantityShown ? <ModalUpdateQuantityDiagnosis
                title="Nhập Số Lượng Dịch Vụ"
                show={this.state.isModalUpdateQuantityShown}
                onHide={this.handleHidemodal}
                diagnosisReport={this.state.currentDiagnosisReport}
            /> : null
            }
            <div className="panel-body">
            <div className='pull-left'>
                    Tổng tiền : {FormatterUtils.formatCurrency(sumPrice)} VNĐ
                </div>
                <div className="heading-elements">
                    <button type="button" className="btn btn-default" onClick={() => this.handleSavePDF(this.getDataExportNoPayment(dataDiagnosisReport))}><i className="icon-printer2"></i> In Chỉ Định Chưa Thanh Toán</button>
                    <button type="button" className="btn btn-default" onClick={() => this.handleSavePDF(this.getDataExport(dataDiagnosisReport))}><i className="icon-printer2"></i> In Tất Cả Chỉ Định</button>
                    
                    {/* <button type="button" className="btn btn-default" onClick={() => this.handleSavePDF(this.getDataExport(dataDiagnosisReport))}><i className="icon-printer2"></i> In Chỉ Định</button> */}
                    {/* <button type="button" className="btn btn-info" onClick={() => this.handleShowmodalDiagnosisReport(null,this.props.prescriptionId,this.props.hospitalId)}>Chọn Chỉ Định</button> */}
                    {prescriptionStatus != 'DONE' ? <button type="button" className="btn btn-info" onClick={() => this.handleShowCheckBoxTree()}>Chọn Chỉ Định</button> : null}

                </div>
            </div>
            <div className='pull-left' style={{display : 'flex'}}>  Lưu Ý : <p style={{color : 'green'}}> ✓ </p>  =   Đã Thanh Toán</div>
        </div>
    }
}


export default translate('translations')(TabDiagnosisReportBHYT);