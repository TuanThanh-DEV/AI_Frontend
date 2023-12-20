import moment from 'moment';
import React from 'react';
import { Modal } from 'react-bootstrap';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { LoadingScreen } from '../../components/commonWidgets';
import { RenderDatePicker, RenderInputWithDiv, RenderMoneyFormat, RenderMoneyFormat2, RenderSelect } from '../../components/formInputs';
import agent from '../../services/agent';
import { FormatterUtils } from '../../utils/javascriptUtils';
import { LOAD_UPDATING_PAYMENT } from './action-types';

const validate = values => {
    const errors = {};
    if (!values.cashDeskId) {
        errors.cashDeskId = "Vui Lòng Mở Quầy Thu Ngân Để Tiếp Tục Thanh Toán!"
    }

    if (!values.paymentMethod) {
        errors.paymentMethod = "Vui lòng chọn hình thức thanh toán!"
    }
    if (!values.createdDate) {
        errors.createdDate = "Vui lòng chọn ngày lập!"
    }
    if (!values.status) {
        errors.status = "Vui lòng cập nhật trạng thái!"
    }

    return errors;
}
var today = moment(new Date, "HH:mm DD/MM/YYYY");
var todays = new Date;
const selector = formValueSelector('ModalPayment');
const mapStateToProps = state => {
    var updateValue = {
        ...state.paymentReducer.updatingPayment,
        paymentMethod: state.paymentReducer.updatingPayment && state.paymentReducer.updatingPayment.paymentMethod ? state.paymentReducer.updatingPayment.paymentMethod : "CASH",
        createdDate: state.paymentReducer.updatingPayment && state.paymentReducer.updatingPayment.createdDate ? moment(state.paymentReducer.updatingPayment.createdDate) : today,

    };
    return {
        initialValues: updateValue,
        currentUser: state.common.currentUser,
        beforAmountSelector: selector(state, "beforAmount")

    };
};
const mapDispatchToProps = dispatch => ({
    loadPayment: (payload) =>
        dispatch({ type: LOAD_UPDATING_PAYMENT, payload: payload }),
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalPayment", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});
class ModalPayment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            invoiceObject: null,
            listInvoiceItem: [],
            listAllPatient: [],
            listAllCashDesk: [],
            isShowFormInsurance: false,
            listAllInsuranceCompany: [],
            listCoupon: []
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.handleChangAmount = this.handleChangAmount.bind(this);
        this.handleChangeDirectAmount = this.handleChangeDirectAmount.bind(this);
        this.handleCancelInvoice = this.handleCancelInvoice.bind(this);
    };
    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        onHide();
        destroy();
    }

    handleCancelInvoice() {
        const { invoiceDto , onHide} = this.props;
        if (confirm("Bạn có chắc sẽ hủy đơn hàng này? Số hóa đơn " + invoiceDto.barCode)) {
            var url = `/invoice/cancel?id=${invoiceDto.id}`;
            return agent.asyncRequests.post(url
            ).then(function (res) {
                var result = res.body.resultData;
                if (result && !result.error) {
                    if(result.dongChiTraAm > 0){
                        toast.success("Đã hủy thành công! Số tiền Đồng Chi Trả các phiếu trước phải trả lại là : " + FormatterUtils.formatCurrency( result.dongChiTraAm), { autoClose: 15000, position: toast.POSITION.TOP_RIGHT });
                        onHide();
                    }else{
                        onHide();
                        toast.success("Đã Hủy Thành Công!", { autoClose: 5000, position: toast.POSITION.TOP_RIGHT });
                    }
                } else {
                    toast.error("Có lỗi khi xóa dữ liệu. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Không thể hủy đơn hàng! Vui lòng liên hệ Admin. ", { autoClose: 15000 });
            });
        } else {
        }
    }
    handleAdd(values) {
        var status = 'PAID';
        var dataCoupon = this.state.listCoupon;
        const { invoiceDto } = this.props;
        var onHide = this.props.onHide;
        var id = this.props.idPayment;
        var url = '/payment/add';
        var reducedAmount = values.reducedAmount;

        var bodyObject = {
            cashDeskId: values.cashDeskId,
            invoiceId: values.invoiceId,
            amount: values.amount ? values.amount : 0,
            paymentMethod: values.paymentMethod,
            patientId: values.patientId,
            insuranceCompanyId: values.insuranceCompanyId,
            paymentDate: new Date(),
            createdDate: values.createdDate,
            status: status,
            hasAccounted: values.hasAccounted,
            note: (" Giảm giá " + reducedAmount),
            reducedAmount: reducedAmount,
            payper: values.payper,
            note: invoiceDto.note,
        };
        if (id) {
            url = '/payment/update';
            bodyObject.id = id;
        }
        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && result.id) {
                onHide("success");
                toast.success("Lưu Thành Công", { autoClose: 1000, position: toast.POSITION.TOP_RIGHT });
            } else {
                toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    };
    getDataExport(dataInvoice) {
        var _this = this;
        let setStateInRequest = (list) => { this.setState({ listInvoiceItem: list }) }
        return (agent.asyncRequests.get("/invoiceItem/listAllByInvoiceId?invoiceId=" + dataInvoice).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result)
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + res.body.errorMessage, {
                    autoClose: 15000
                });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", {
                autoClose: 15000
            });
        }))
    }
    componentWillMount() {
        const { loadPayment, invoiceDto, updateField } = this.props;
        var id = this.props.idPayment;

        if (id) {
            const dataPromise = agent.PaymentApi.getPayment(id);
            loadPayment(Promise.resolve(dataPromise))
        }
        this.getInvoiceObject(invoiceDto.id);
        this.getlistAllPatient();
        this.getlistAllCashDesk();
        this.getListCoupon();
        // this.getlistAllInsuranceInvoice();
        this.getlistAllInsuranceCompany();
        if (!id && invoiceDto) {
            updateField("invoiceId", invoiceDto.id)
            updateField("patientId", invoiceDto.patientId ? invoiceDto.patientId : null)
            updateField("beforAmount", invoiceDto.originAmount)
            updateField("amount", invoiceDto.totalAmountWithVat + invoiceDto.dongChiTra)
            updateField("tienDongChiTraBHYT", invoiceDto.dongChiTra)
            // updateField("status",invoiceDto.status)
        }
    }
    getInvoiceObject(id) {
        let setStateInRequest = (list) => { this.setState({ invoiceObject: list }) }
        return agent.InvoiceApi.getInvoice(id).then(function (res) {
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

    getListCoupon() {
        let setStateInRequest = (list) => { this.setState({ listCoupon: list }) }
        return agent.asyncRequests.get('/coupon/listStillExpiryDate').then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    }
    handleChangAmount(id) {
        const { updateField, beforAmountSelector, invoiceDto } = this.props;
        var dataCoupon = this.state.listCoupon;
        if (beforAmountSelector > 0) {
            var reducedAmount = 0;
            dataCoupon.map(item => {
                if (item.id == id) {
                    reducedAmount = (beforAmountSelector * item.discountPercent) / 100;
                }
            })
            updateField("reducedAmount", reducedAmount);
            updateField("amount", invoiceDto.totalAmountWithVat - reducedAmount + invoiceDto.dongChiTra);
        }

    }

    handleChangeDirectAmount(reducedAmount) {
        const { updateField, beforAmountSelector, invoiceDto } = this.props;
        if (beforAmountSelector > 0) {
            // updateField ("amount", beforAmountSelector - reducedAmount);
            updateField("amount", invoiceDto.totalAmountWithVat - reducedAmount + invoiceDto.dongChiTra);
        }

    }
    getlistAllCashDesk() {
        const { currentUser, updateField } = this.props;
        let setStateInRequest = (list) => { this.setState({ listAllCashDesk: list }) }
        return agent.CashDeskApi.listAllCashDesk().then(function (res) {
            var result = res.resultData;
            if (result) {

                setStateInRequest(result);
                result.map(item => {
                    if (currentUser.email == item.cashier.email && item.closeTime == null) {
                        setTimeout(() => {
                            updateField("cashDeskId", item.id);
                        }, 100);

                    } else {
                        return null;
                    }

                })


            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    }
    getlistAllPatient() {
        let setStateInRequest = (list) => { this.setState({ listAllPatient: list }) }
        return agent.PatientApi.listAllPatient().then(function (res) {
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
    handleShowFormInsurance() {
        const idPatient = this.props.idPatient;
        this.setState({
            isShowFormInsurance: !this.state.isShowFormInsurance,
        })
    }
    getlistAllInsuranceCompany() {
        let setStateInRequest = (list) => { this.setState({ listAllInsuranceCompany: list }) }
        return agent.InsuranceCompanyApi.listAllInsuranceCompany().then(function (res) {
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
    render() {
        const { handleSubmit, submitting, title, invalid, invoiceDto } = this.props;
        const modalConfig = {
            backdrop: 'static', show: this.props.show, bsSize: "lg",
            onHide: this.props.onHide,
            submitting: this.props.submitting
        };
        var id = this.props.idPayment;
        var optionUserCashDesk = [];
        this.state.listAllCashDesk.map(item => {
            optionUserCashDesk.push({ label: item.cashier ? item.cashier.fullName : "", value: item.id })
        })
        var invoiceObject = this.state.invoiceObject;
        var optionUserInvoice = [];
        if (invoiceObject != null) {
            optionUserInvoice.push({ label: invoiceObject.user.fullName, value: invoiceObject.id })
        }
        var optionCoupon = [];
        this.state.listCoupon.map(item => {
            optionCoupon.push({ label: item.code, value: item.id })
        })
        var optionUserPatient = [];
        this.state.listAllPatient.map(item => {
            optionUserPatient.push({ label: item.fullName, value: item.id })
        })
        let elementButton = <button type="button" style={{ 'font-size': '13px' }} className="btn btn-success btn-block" onClick={() => this.handleShowFormInsurance()}>Thêm Bảo Hiểm</button>
        if (this.state.isShowFormInsurance) {
            elementButton = <button type="button" style={{ 'font-size': '13px' }} className="btn btn-info btn-block" onClick={() => this.handleShowFormInsurance()}>Xoá Bảo Hiểm</button>
        }
        var optionInsuranceCompany = [];
        this.state.listAllInsuranceCompany.map(item => {
            optionInsuranceCompany.push({ label: item.name, value: item.id })
        })

        var paymentMethod = [
            { label: "Tiền Mặt", value: "CASH", },
            { label: "Chuyển Khoản", value: "BANK_TRANSFER", },
            { label: "Thẻ Tín Dụng", value: "CREDIT_CARD", },
            // {label:"Trả Trước",value:"CREDIT NOTE",}
        ]
        var status = [
            { label: "Chưa Thanh Toán", value: "TO DO", },
            { label: "Đang Thanh Toán", value: "IN PROCESS", },
            { label: "Đã Thanh Toán", value: "DONE", }
        ]

        var newModal = null;
        newModal =
            <div style={{ width: '30%' }}>
                <Modal
                    {...modalConfig}
                    aria-labelledby="contained-modal-title-lg"
                >


                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-large"><center>{title}</center></Modal.Title>

                    </Modal.Header>

                    <Modal.Body  >
                        {submitting ? <LoadingScreen /> :
                            <form className="form-horizontal" role="form" onSubmit={handleSubmit(this.handleAdd)}>
                                <div className="form-group">
                                    <div className="row">

                                        <div className="col-md-6">
                                            <br />
                                            <Field disabled={invoiceDto ? true : null} name="invoiceId" label="Người Lập Hóa Đơn (*)" placeholder="Vui lòng chọn Hóa Đơn..." options={optionUserInvoice} component={RenderSelect}></Field>
                                        </div>
                                        <div className="col-md-6">
                                            <br />
                                            <Field disabled={invoiceDto ? true : null} name="patientId" label="Bệnh Nhân (*)" placeholder="Vui lòng chọn Bệnh nhân..." options={optionUserPatient} component={RenderSelect}></Field>
                                        </div>

                                        <div className="col-md-6">
                                            <br />
                                            <Field disabled={true} name="beforAmount" label="Giá Tiền Hóa Đơn" thousandSeparator={true} component={RenderMoneyFormat2}></Field>
                                        </div>
                                        <div className="col-md-6">
                                            <br />
                                            <Field name="paymentMethod" label="Phương Thức Thanh Toán" options={paymentMethod} component={RenderSelect}></Field>
                                        </div>

                                        <div className="col-md-6">
                                            <br />
                                            <Field disabled={true} name="tienDongChiTraBHYT" label="Tiền Cùng Chi Trả BHYT" thousandSeparator={true} component={RenderMoneyFormat2}></Field>
                                        </div>
                                        <div className="col-md-6">
                                            <br />
                                            <Field name="payper" label="Người Thanh Toán" placeholder="Vui lòng nhập người thanh toán..." component={RenderInputWithDiv}></Field>
                                        </div>

                                        <div className="col-md-6">
                                            <br />
                                            <Field name="createdDate" label="Ngày Lập Hóa Đơn" component={RenderDatePicker}></Field>
                                        </div>
                                        <div className="col-md-6">
                                            <br />
                                            <Field name="couponId" label="Giảm Voucher" options={optionCoupon} onChangeAction={(value) => this.handleChangAmount(value)} component={RenderSelect}></Field>
                                        </div>
                                        <div className="col-md-6">
                                            <br />
                                            <Field name="reducedAmount" label="Giảm Trực Tiếp" onChangeAction={(value) => this.handleChangeDirectAmount(value)} thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                        </div>
                                        <div className="col-md-6">
                                            <br />
                                            <Field disabled={true} name="cashDeskId" label="Quầy Thu Ngân" placeholder="Bạn Chưa Có Quầy Thu Ngân Vui Lòng Mở Quầy..." options={optionUserCashDesk} component={RenderSelect}></Field>
                                        </div>
                                        <div className="col-md-6">
                                            <br />
                                            Mã Hóa Đơn: {invoiceDto.barCode}
                                            <br />
                                            <div className='text-left'>
                                                <button type="button" style={{ marginRight: "20px" }} className="btn btn-warning" onClick={this.handleCancelInvoice} ><i class="icon-cross" aria-hidden="true"></i> Hủy Đơn</button>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <br />
                                            <Field disabled={true} name="amount" label="Thành Tiền" thousandSeparator={true} component={RenderMoneyFormat2}></Field>
                                        </div>
                                    </div>
                                    <br />
                                    <div className="text-right">
                                        <button type="button" style={{ marginRight: "20px" }} className="btn btn-default" onClick={this.handleHideAndClear} ><i class="icon-cross" aria-hidden="true"></i> Đóng</button>
                                        <button type="submit" className="btn bg-success" disabled={submitting}> Thanh Toán</button>
                                    </div>
                                </div>
                            </form>
                        }
                    </Modal.Body>
                </Modal>
            </div>
        return newModal;
    }
};
export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'ModalPayment',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalPayment)));








