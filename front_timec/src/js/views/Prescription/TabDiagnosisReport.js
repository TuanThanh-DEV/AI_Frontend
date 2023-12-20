import React from 'react';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import agent from '../../services/agent';
import ModalDiagnosisReport from '../DiagnosisReport/ModalDiagnosisReport';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import pdfMake from 'pdfmake/build/pdfmake';
import moment from 'moment';
import { DateUtils, FormatterUtils } from '../../utils/javascriptUtils';
import ModalCheckBoxListDiagnosisReport from '../DiagnosisReport/ModalCheckBoxListDiagnosisReport';
import ModalUpdateQuantityDiagnosis from './ModalUpdateQuantityDiagnosis';
import { RenderPDFDiagnosisReport } from './RenderPDFDiagnosisReport';
class TabDiagnosisReport extends React.Component {
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
        this.getListDiagnosisReportByPrescriptionId = this.getListDiagnosisReportByPrescriptionId.bind(this);
        this.handlePrintdiagnosisReportInvoice = this.handlePrintdiagnosisReportInvoice.bind(this);
        this.handleShowmodalDiagnosisReport = this.handleShowmodalDiagnosisReport.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.handleShowCheckBoxTree = this.handleShowCheckBoxTree.bind(this);
        this.deleteDiagnosisReport = this.deleteDiagnosisReport.bind(this);
        this.handleHidemodal = () => {
            this.setState({ isDiagnosisReportModalShown: false, isShowCheckBoxTree: false, isModalUpdateQuantityShown: false });
            this.getListDiagnosisReportByPrescriptionId();
        };
        this.handleSavePDF = (dataExport) => {

            pdfMake.vfs = pdfFonts.pdfMake.vfs;
            pdfMake.createPdf(dataExport).print();
        };
        this.showModalUpdateQuantity = (diagnosisReport) => {
            this.setState({ isModalUpdateQuantityShown: true, currentDiagnosisReport: diagnosisReport });
        }
    };

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
    getListDiagnosisReportByPrescriptionId() {
        var id = this.props.prescriptionId;
        if (id != 'new') {
            let setStateInRequest = (list) => { this.setState({ listDiagnosisReport: list }) }
            return agent.asyncRequests.get('/diagnosisReport/listFindByPrescriptionId?prescriptionId=' + id
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
                    this_.getListDiagnosisReportByPrescriptionId();
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
        this.getListDiagnosisReportByPrescriptionId();
        var url = '/assets/images/logo_timec.png';
        FormatterUtils.downloadImageDataUri(url, this, "imageLogo");

        var urlLeftCorner = '/assets/images/left_corner_logo_timec.png';
        FormatterUtils.downloadImageDataUri(urlLeftCorner, this, "leftCornerLogo");
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
                        {/* {item.prescription.insuranceTypeId > 1 ? <td>{FormatterUtils.formatCurrency(item.diagnosisService.donGiaBhyt )}</td> : null}  */}

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


        return <div className="tab-pane" id="default-justified-tab21">
            <table className="table table-xxs table-bordered">
                <thead>
                    <tr className="bg-teal">
                        <th data-toggle="true">STT</th>
                        <th data-toggle="true">Dịch Vụ Chỉ Định</th>
                        <th data-toggle="true">Đơn Giá</th>
                        {/* {currentPrescription.insuranceTypeId && currentPrescription.insuranceTypeId > 1 ? <th data-toggle="true">Đơn Giá BHYT</th> : null} */}
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

            {this.state.isShowCheckBoxTree ? <ModalCheckBoxListDiagnosisReport
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
                    <button type="button" className="btn btn-default" onClick={() => this.handleSavePDF(RenderPDFDiagnosisReport.getDataExportNoPayment(dataDiagnosisReport, this))}><i className="icon-printer2"></i> In Chỉ Định Chưa Thanh Toán</button>
                    <button type="button" className="btn btn-default" onClick={() => this.handleSavePDF(RenderPDFDiagnosisReport.getDataExport(dataDiagnosisReport, this))}><i className="icon-printer2"></i> In Tất Cả Chỉ Định</button>
                    {/* <button type="button" className="btn btn-info" onClick={() => this.handleShowmodalDiagnosisReport(null,this.props.prescriptionId,this.props.hospitalId)}>Chọn Chỉ Định</button> */}
                    {prescriptionStatus != 'DONE' ? <button type="button" className="btn btn-info" onClick={() => this.handleShowCheckBoxTree()}>Chọn Chỉ Định</button> : null}

                </div>
            </div>
            <div className='pull-left' style={{display : 'flex'}}>  Lưu Ý : <p style={{color : 'green'}}> ✓ </p>  =   Đã Thanh Toán</div>
        </div>
    }
}


export default translate('translations')(TabDiagnosisReport);