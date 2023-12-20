import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import ModalPayment from './ModalPayment';
import moment from 'moment'
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { RenderDatePicker, RenderInputWithDiv, RenderSelect } from '../../components/formInputs';
import { FormatterUtils } from '../../utils/javascriptUtils';
import { LoadingScreen } from '../../components/commonWidgets';
import PaymentInvoiceRows from './PaymentInvoiceRows';
import ModalPaymentForBarCode from './ModalPaymentForBarCode';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { PermanentCacheService } from '../../services/middleware';
import ModalInvoiceFromPrescription from '../Invoice/ModalInvoiceFromPrescription';
import PagePaymentGroup from './PagePaymentGroup';
const validate = values => {
    const errors = {};
    if (moment(values.toDate) < moment(values.fromDate)) {
        errors.toDate = 'Ngày kết thúc nhỏ hơn ngày bắt đầu!, vui lòng thử lại!'
    }
    return errors;
}
const mapStateToProps = state => {

};

const mapDispatchToProps = dispatch => ({
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "PaymentList", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});
class PaymentList extends React.Component {
    constructor() {
        super();
        this.state = {
            listPayment: null,
            isPaymentModalShown: false,
            objectpayment: null,
            idPayment: null,
            listAllUser: [],
            dataPayments: [],
            imageLogo: "",
            isPaymentModalPaymentForBarCode : false ,
            isInvoiceFromPrescriptionModalShown : false,
            invoiceDto : null,
            isShowModalPaymentGroup : false, 
        }
      
        this.handleSearchForm = this.handleSearchForm.bind(this);
        this.handleHidemodal = this.handleHidemodal.bind(this);
        this.handleShowFromPrescriptionModal = this.handleShowFromPrescriptionModal.bind(this);
        this.handleShowModalPaymentForBarCode = this.handleShowModalPaymentForBarCode.bind(this);
        this.handleShowModalPaymentGroup = this.handleShowModalPaymentGroup.bind(this);
        
      
    };

    handleHidemodal (invoice){
        if(invoice){
            if(!invoice.id){
                this.setState({ isPaymentModalPaymentForBarCode : false, isInvoiceFromPrescriptionModalShown : false ,isPaymentModalShown: false, isShowModalPaymentGroup : false});
                var today = moment(new Date);
                this.handleSearchForm({fromDate: today, toDate: today });
            }else{
                this.setState({ isPaymentModalPaymentForBarCode : false, isInvoiceFromPrescriptionModalShown : false , isShowModalPaymentGroup : false,isPaymentModalShown: true,
                    invoiceDto: invoice });
                    var today = moment(new Date);
                this.handleSearchForm({fromDate: today, toDate: today , search : invoice.barCode});
            }
        }else{
            this.setState({ isPaymentModalPaymentForBarCode : false, isInvoiceFromPrescriptionModalShown : false ,isPaymentModalShown: false, isShowModalPaymentGroup : false});
                var today = moment(new Date);
                this.handleSearchForm({fromDate: today, toDate: today });
        }

    };

    handleShowmodal(id) {
        this.setState({
            isPaymentModalShown: true,
            idPayment: id
        });
    }

    
    getlistAllPersonel() {
        let setStateInRequest = (list) => { this.setState({ listAllUser: list }) };
        return agent.UserApi.listAllPersonel().then(function (res) {
            var result = res.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    }

    componentWillMount() {
        var today = moment(new Date);
        var cashierId = PermanentCacheService.getItem("currentUser").id;
        const { updateField } = this.props;
        this.handleSearchForm({cashierId: cashierId, fromDate: today, toDate: today });
        updateField("fromDate",today);
        updateField("toDate",today);
        updateField("cashierId", cashierId);
        this.getlistAllPersonel();
        var url = '/assets/images/logo_timec.png';
        FormatterUtils.downloadImageDataUri(url, this, "imageLogo");


    };

    handleShowModalPaymentForBarCode(value){
        var titleModal = "";
        if(value === "idPrescription"){
            titleModal = "Tìm Phiếu Thu Theo Mã Bệnh Án"
        }else if(value === "idInvoice"){
            titleModal = "Tìm Phiếu Thu Theo Mã Hoá Đơn"
        }else{
            titleModal = "Tìm Phiếu Thu Theo Mã Bệnh Nhân"
        }

        this.setState({
            isPaymentModalPaymentForBarCode : true,
            firstCode : value,
            tileModalPaymentForBarCode : titleModal
        })
    }

    handleShowFromPrescriptionModal() {
        this.setState({
            isInvoiceFromPrescriptionModalShown: true
        });
    }

    handleSearchForm(values) {
        const {updateField} = this.props;

        var fromDate = moment(values.fromDate).format("YYYY-MM-DD-HH:mm:ss");
        var toDate = moment(values.toDate).format("YYYY-MM-DD-HH:mm:ss");
        var patientNameOrPatientCode = values.search;
        if (!patientNameOrPatientCode) {
            patientNameOrPatientCode = ''
        }
        var status = values.status;
        if (!status) {
            status = ''
        }
        var cashierId = values.cashierId;
        if (!cashierId) {
            cashierId = ''
        }

        var page = qs.parse(this.props.location.search).page;
        if (!page) {
            page = 1;
        }


        let setStateInRequest = (list) => { this.setState({ listPayment: list }) }

        return agent.asyncRequests.getPage('/payment/listFindByPayment?fromDate=' + fromDate + '&toDate=' + toDate
            + '&patientNameOrPatientCode=' + patientNameOrPatientCode + '&cashierId=' + cashierId + '&status=' + status, page, 1000 
        ).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                updateField("fromDate" , values.fromDate ? values.fromDate : new Date());
                updateField("toDate" , values.toDate ? values.toDate : new Date());
                setStateInRequest(result);
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        })
    }

    handleShowModalPaymentGroup(){
        this.setState({
            isShowModalPaymentGroup : true
        })
    }

    render() {

        var optionStatus = [
            {label: "Tất cả", value: "ALL"},
            { label: "Mở", value: "OPEN" },
            { label: "Đã Thanh Toán", value: "PAID" },
            { label: "Trong Tiến Trình", value: "IN_PROGRESS" },
            { label: "Hủy Bỏ", value: "CANCELLED" }
        ];
        var optionUserPersonel = [{label: "Tất cả", value: "ALL"}];
        this.state.listAllUser.map(item => {
            optionUserPersonel.push({ label: item.fullName, value: item.id })
        });

        const { handleSubmit, submitting } = this.props;
        let onReloadSearch = () => {
            handleSubmit(this.handleSearchForm)(); // execute Handle Submit
        }
        const dataPayment = this.state.listPayment;
        if (!dataPayment) {
            return null;
        }
        var currentNo = 0;
        var page = qs.parse(this.props.location.search).page;
        if (!page) {
            page = 1;
        }
        var currentNo = ((page - 1) * 20);
        var totalAmount = 0;
        var totalBankTransfer = 0;
        var totalCreditCard = 0;
        var totalCash = 0;
        var rows = dataPayment.content.map((item, index) => {
            totalAmount += item.amount;
            if (item.paymentMethod == 'CASH') {
                totalCash += item.amount;
            } else if (item.paymentMethod == 'BANK_TRANSFER') {
                totalBankTransfer += item.amount;
            } else if (item.paymentMethod == 'CREDIT_CARD' || item.paymentMethod == 'CREDIT CARD') {
                totalCreditCard += item.amount;
            }
            currentNo++;
            return (               
                <PaymentInvoiceRows onReloadSearch={() => onReloadSearch()} key={index} paymentObj={item} isPaymentModalShown={this.state.isPaymentModalShown} onHide={this.handleHidemodal}></PaymentInvoiceRows>
            );
        });
        rows = rows.concat(
            [<tr key="totalAmount" style={{backgroundColor: '#f8c733'}}>
                <td></td>
                <td></td>
                <td>TỔNG CỘNG</td>
                <td></td>
                <td></td>
                <td>{FormatterUtils.formatCurrency(totalAmount)}</td>
                <td colSpan='7'></td>
            </tr>,
            <tr key="totalCash" style={{backgroundColor: '#f8c733'}}>
                <td></td>
                <td></td>
                <td>TIỀN MẶT</td>
                <td></td>
                <td></td>
                <td>{FormatterUtils.formatCurrency(totalCash)}</td>
                <td colSpan='7'></td>
            </tr>,
            <tr key="totalBankTransfer" style={{backgroundColor: '#f8c733'}}>
                <td></td>
                <td></td>
                <td>CHUYỂN KHOẢN</td>
                <td></td>
                <td></td>
                <td>{FormatterUtils.formatCurrency(totalBankTransfer)}</td>
                <td colSpan='7'></td>
            </tr>,
            <tr key="totalCreditCard" style={{backgroundColor: '#f8c733'}}>
                <td></td>
                <td></td>
                <td>THẺ TÍN DỤNG</td>
                <td></td>
                <td></td>
                <td>{FormatterUtils.formatCurrency(totalCreditCard)}</td>
                <td colSpan='7'></td>
            </tr>
            ]
        );

        return (
            <div className="content-wrapper">
                <div className="page-header page-header-default">
                    <div className="breadcrumb-line">
                        <ul className="breadcrumb">
                            <li><a href=""><i className="icon-home2 position-left"></i> Home</a> </li>
                            <li className="active">Quản Lý Thanh Toán</li>
                            <li className="active">Phiếu Thu Bán Lẻ</li>
                        </ul>
                        <div className="heading-elements">
                            <div className="heading-btn-group">
                                <button className="btn bg-teal" onClick={() => this.handleShowFromPrescriptionModal()}>Tạo Phiếu Thu</button>
                                {/* <button className="btn bg-teal" onClick={() => this.handleShowModalPaymentForBarCode("idInvoice")}>Tìm Theo Hoá Đơn</button>
                                <button className="btn bg-teal" onClick={() => this.handleShowModalPaymentForBarCode("idPrescription")}>Tìm Theo Mã Bệnh Án</button>
                                <button className="btn bg-teal" onClick={() => this.handleShowModalPaymentForBarCode("patientCode")}>Tìm Theo Mã Bệnh Nhân</button> */}
                                {/* <button className="btn bg-success" onClick={() => this.handleShowmodal()}>Tạo Phiếu Thu</button> */}
                                <ReactHTMLTableToExcel
                                    id="test-table-all-payment-xls-button"
                                    className="download-payment-xls-button btn btn-info marginL"
                                    table="table-all-payment-xls"
                                    filename="Báo Cáo Quầy Thanh Toán"
                                    sheet="QuayThanhToan"
                                    buttonText="Xuất Excel Báo Cáo" />
                            <button className="btn bg-teal" onClick={() => this.handleShowModalPaymentGroup()}>Tạo Phiếu Thu Khám Đoàn</button> 
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div>
                                <form className="form-horizontal" role="form" onSubmit={handleSubmit(this.handleSearchForm)}>
                                    <div className="row">
                                        <div className="page-header"> </div>
                                    </div>
                                    <div className="row">
                                        <div className="col col-md-12">
                                            <div className="col col-md-4">
                                                <div className="col col-md-6" style={{ paddingLeft: "20px" }}>
                                                    <Field label="Từ Ngày" name="fromDate" component={RenderDatePicker}></Field>
                                                </div>
                                                <div className="col col-md-6" style={{ paddingLeft: "20px" }}>
                                                    <Field label="Đến Ngày" name="toDate" component={RenderDatePicker}></Field>
                                                </div>
                                            </div>
                                            <div className="col col-md-2">
                                                <Field name="cashierId" label="Thu Ngân" options={optionUserPersonel} component={RenderSelect}></Field>
                                            </div>
                                            <div className="col col-md-2" style={{ paddingLeft: "20px" }}>
                                                <Field name="status" label="Trạng Thái" options={optionStatus} component={RenderSelect}></Field>
                                            </div>
                                            <div className="col col-md-3" style={{ paddingLeft: "20px" }}>
                                                <Field label="Tìm Kiếm" name="search" placeholder="Tìm Tên, Mã Bệnh Nhân..." autoFocus={true} component={RenderInputWithDiv}></Field>
                                            </div>
                                            <div className="col col-md-1" style={{ paddingLeft: "10px", paddingTop: "30px" }}>
                                                <button type="submit" className="btn bg-success btn-xlg"> <i className="icon-search4"></i>Tìm</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="panel panel-flat">
                                <table className="table table-xxs table-bordered" id="table-all-payment-xls">
                                    <thead>
                                        <tr className="bg-teal">
                                            <th data-toggle="true">STT</th>
                                            <th data-toggle="true">Mã TT</th>
                                            <th data-toggle="true">Người Thu Ngân</th>
                                            <th data-toggle="true">Hóa Đơn</th>
                                            <th data-toggle="true">Loại Hóa Đơn</th>
                                            <th data-toggle="true">Thanh Toán</th>
                                            <th data-toggle="true">Đã Giảm</th>
                                            <th data-toggle="true">Phương Thức</th>
                                            <th data-toggle="true">Người Kê Đơn</th>
                                            <th data-toggle="true">Tên Bệnh Nhân</th>
                                            {/* <th data-toggle="true">Công Ty Bảo Hiểm</th> */}
                                            <th data-toggle="true">Ngày Thanh Toán</th>
                                            {/* <th data-toggle="true">Ngày Tạo</th> */}
                                            <th data-toggle="true">Trạng Thái</th>
                                            {/* <th data-hide="phone">Hoạch Toán?</th> */}
                                            <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows}
                                    </tbody>
                                </table>
                            </div>
                            {this.state.isPaymentModalShown ? <ModalPayment
                                title={this.state.idPayment ? "Sửa Phiếu Thu" : "Thêm Mới Phiếu Thu"}
                                idPayment={this.state.idPayment}
                                show={this.state.isPaymentModalShown}
                                invoiceDto ={this.state.invoiceDto}
                                onHide={this.handleHidemodal} /> : null
                            }
                            {this.state.isInvoiceFromPrescriptionModalShown ? <ModalInvoiceFromPrescription
                                title="Tạo Hoá Đơn"
                                show={this.state.isInvoiceFromPrescriptionModalShown}
                                onHide={this.handleHidemodal} /> : null
                            }
                            {this.state.isShowModalPaymentGroup ? <PagePaymentGroup
                                title="Tạo Hoá Đơn"
                                show={this.state.isShowModalPaymentGroup}
                                onHide={this.handleHidemodal} /> : null
                            }

                            {this.state.isPaymentModalPaymentForBarCode ? <ModalPaymentForBarCode
                                show={this.state.isPaymentModalPaymentForBarCode}
                                firstCode = {this.state.firstCode}
                                listPaymentObj = {(list) => this.setState({ listPayment: list })}
                                title = {this.state.tileModalPaymentForBarCode}
                                onHide={this.handleHidemodal} /> : null
                            }
                        </div>
                        <TablePagination data={dataPayment} baseUrl="listPayment" />
                    </div>
                </div>
            </div>

        );
    }
}
export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'PaymentList',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(PaymentList)));