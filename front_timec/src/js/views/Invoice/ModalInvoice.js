import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderSelect, RenderDatePickerWithTime, RenderDatePicker, RenderMoneyFormat } from '../../components/formInputs';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_INVOICE } from './action-types';
import moment from 'moment';
const validate = values => {
    const errors = {};
    if (!values.patientId) {
        errors.patientId = "Vui lòng chọn tên bệnh nhân!"
    }
    if (!values.userId) {
        errors.userId = "Vui lòng chọn tên người chịu trách nhiệm!"
    }
    if (!values.cashDesk) {
        errors.cashDesk = "Vui lòng chọn quầy thu ngân"
    }
    if (!values.prescriptionId) {
        errors.prescriptionId = "Vui lòng chọn đơn thuốc"
    }
    if (!values.createdDate) {
        errors.createdDate = "Vui lòng chọn ngày lập"
    }
    if (!values.paymentDate) {
        errors.paymentDate = "Vui lòng chọn ngày thanh toán"
    }
    return errors;
}
const selector = formValueSelector('ModalInvoice');
var today = moment(new Date, "HH:mm DD/MM/YYYY");
const mapStateToProps = state => {

    var updateValue = {
        ...state.invoiceReducer.updatingInvoice,
        createdDate: state.invoiceReducer.updatingInvoice && state.invoiceReducer.updatingInvoice.createdDate ? moment(state.invoiceReducer.updatingInvoice.createdDate) : today,
        userId: state.invoiceReducer.updatingInvoice && state.invoiceReducer.updatingInvoice.userId ? state.invoiceReducer.updatingInvoice.userId : state.common.currentUser

    };
    return {
        initialValues: updateValue,
        createdUser: selector(state, "userId"),
        currentUser: state.common.currentUser,
    };
};
const mapDispatchToProps = dispatch => ({
    loadInvoice: (payload) =>
        dispatch({ type: LOAD_UPDATING_INVOICE, payload: payload }),
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalInvoice", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});
class ModalInvoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllPatient: [],
            // listAllPersonel:[],
            listAllCashDesk: [],
            listAllPrescription: [],
        }

        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.handleLoadPatientCodeByPatientId = (patientId) => {
            const { updateField } = this.props;
            var dataPatient = this.state.listAllPatient;
            if (dataPatient) {
                dataPatient.map(item => {
                    if (patientId == item.id) {
                        setTimeout(() => {
                            updateField("patientCodeLink", item.code);
                        }, 50);
                    }
                })
            }
        }
    };
    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        destroy();
        onHide();
    }
    handleAdd(values) {
        var onHide = this.props.onHide;
        var id = this.props.idInvoice;
        var url = '/invoice/add';
        var bodyObject = {
            name: values.name,
            code: values.code,
            patientId: values.patientId,
            userId: values.userId,
            prescriptionId: values.prescriptionId,
            createdDate: values.createdDate,
            paymentDate: values.paymentDate,
            totalAmountNoVat: values.totalAmountNoVat,
            totalAmountWithVat: values.totalAmountWithVat,
            insurranceAmount: values.insurranceAmount,
            status: values.status,
            invoiceType: values.invoiceType
        };
        if (id) {
            url = '/invoice/update';
            bodyObject.id = id;
        }
        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && result.id) {
                onHide();
            } else {
                toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    };

    componentWillMount() {
        const { loadInvoice , currentUser } = this.props;
        var id = this.props.idInvoice;
        const dataPromise = agent.InvoiceApi.getInvoice(id);
        loadInvoice(Promise.resolve(dataPromise))
        this.getlistAllPatient();
        // this.getlistAllUser();
        this.getlistAllCashDesk();
        this.getlistAllPrescription();

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
    // getlistAllUser(){
    //     let setStateInRequest = (list) => { this.setState({ listAllPersonel: list }) }
    //     return agent.UserApi.listAllPersonel().then(function (res) {
    //         var result = res.resultData;
    //         if (result) {
    //             setStateInRequest(result);
    //         } else {
    //             toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
    //         }
    //     }, function (err) {
    //         toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
    //     });
    // }

    getlistAllCashDesk() {
        let setStateInRequest = (list) => { this.setState({ listAllCashDesk: list }) }
        return agent.CashDeskApi.listAllCashDesk().then(function (res) {
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

    getlistAllPrescription() {
        let setStateInRequest = (list) => { this.setState({ listAllPrescription: list }) }
        return agent.PrescriptionApi.listAllPrescription().then(function (res) {
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
        const { handleSubmit, submitting, title, invalid, createdUser, currentUser, } = this.props;
        const modalConfig = {
            backdrop: 'static', show: this.props.show, bsSize: "medium",
            onHide: this.props.onHide,
            submitting: this.props.submitting
        };
        var id = this.props.idInvoice;

        var showCreatedUser = [];
        showCreatedUser.push({
            label: createdUser ? createdUser.fullName
                : currentUser.fullName,
            value: createdUser ? createdUser.id : currentUser.id
        });

        var optionPatient = [];
        this.state.listAllPatient.map(item => {
            optionPatient.push({ label: item.fullName, value: item.id })
        })

        // var optionUser = []; 
        // this.state.listAllPersonel.map(item=>{
        //     optionUser.push({label:item.fullName ,value:item.id})
        // })
        var optionCashDesk = [];
        this.state.listAllCashDesk.map(item => {
            optionCashDesk.push({ label: item.cashier ? item.cashier.fullName : "", value: item.id })
        })

        var optionPrescription = [];
        this.state.listAllPrescription.map(item => {
            optionPrescription.push({ label: item.department ? item.department.name : "" + ' - ' + (item.patient ? item.patient.fullName : ""), value: item.id })
        })
        var status = [
            { label: "Mở", value: "OPEN", },
            { label: "Hủy", value: "CANCELLED", },
            { label: "Đóng", value: "CLOSED", }
        ]

        var invoiceType = [
            { label: "Thuốc", value: "DRUG", },
            { label: "Dịch Vụ Chỉ Định", value: "DIAGNOSIS_SERVICE", },
            { label: "Dịch Vụ Thủ Thuật", value: "PROCEDURE_SERVICE", }
        ]
        var newModal = null;
        newModal =
            <div style={{ width: '30%' }}>
                <Modal
                    {...modalConfig}
                    aria-labelledby="contained-modal-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-sm"><center>{title}</center> </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {submitting ? <LoadingScreen /> :
                            <form className="form-horizontal" role="form" onSubmit={handleSubmit(this.handleAdd)}>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <Field disabled={id ? true : false} name="patientId" label="Tên Bệnh Nhân (*)" options={optionPatient} component={RenderSelect} onChangeAction={(value) => this.handleLoadPatientCodeByPatientId(value)}></Field>
                                        </div>
                                        <div className="col-md-6">
                                            {!id ?
                                                <Field disabled={true} name="patientCodeLink" label="Mã Bệnh Nhân" component={RenderInputWithDiv}></Field> :
                                                <Field disabled={id ? true : false} name="patient.code" label="Mã Bệnh Nhân" component={RenderInputWithDiv}></Field>
                                            }
                                        </div>
                                        <div className="col-md-6">

                                            <Field disabled={true} name="userId" label="Người Chịu Trách Nhiệm" options={showCreatedUser} component={RenderSelect}></Field>
                                        </div>
                                        <div className="col-md-6">
                                            <br />
                                            <Field name="prescriptionId" label="Đơn Thuốc" options={optionPrescription} component={RenderSelect}></Field>
                                        </div>
                                        <div className="col-md-6">
                                            <br />
                                            <Field name="createdDate" disabled={true} label="Ngày Lập" component={RenderDatePicker}></Field>
                                        </div>
                                        <div className="col-md-6">
                                            <br />
                                            <Field name="paymentDate" label="Ngày Thanh Toán" component={RenderDatePickerWithTime}></Field>
                                        </div>
                                        <div className="col-md-6">
                                            <br />
                                            <Field name="totalAmountNoVat" label="Tổng Tiền Không VAT" placeholder="Nhập tổng tiền không VAT..." component={RenderMoneyFormat}></Field>
                                        </div>
                                        <div className="col-md-6">
                                            <br />
                                            <Field name="totalAmountWithVat" label="Tổng Tiền Gồm VAT" placeholder="Nhập tổng tiền gồm VAT..." component={RenderMoneyFormat}></Field>
                                        </div>
                                        <div className="col-md-6">
                                            <br />
                                            <Field name="insurranceAmount" label="Tiền Bảo Hiểm" placeholder="Nhập tiền bảo hiểm..." component={RenderMoneyFormat}></Field>
                                        </div>
                                        <div className="col-md-6">
                                            <br />
                                            <Field name="status" label="Trạng Thái" options={status} component={RenderSelect}></Field>
                                        </div>
                                        <div className="col-md-6">
                                            <br />
                                            <Field name="invoiceType" label="Loại Hóa Đơn" options={invoiceType} component={RenderSelect}></Field>
                                        </div>
                                    </div>

                                    <br />
                                    <div className="text-right">
                                        <button type="button" className="btn btn-default" onClick={this.handleHideAndClear} ><i class="icon-cross" aria-hidden="true"></i> Đóng</button>
                                        <button type="submit" className="btn bg-success" disabled={submitting}> Lưu Lại</button>
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
            form: 'ModalInvoice',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalInvoice)));
