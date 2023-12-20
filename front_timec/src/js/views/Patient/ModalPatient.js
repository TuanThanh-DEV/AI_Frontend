import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderTextArea, RenderDatePicker, RenderSelect, RenderBarcode } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_PATIENT } from './action-types';
import moment from 'moment';
import isEmail from 'sane-email-validation';


const validate = values => {
    // const errors = {};
    // const regexp = /^\d{10,11}$/;
    // const phone = regexp.exec(values.phone);
    // const fatherPhone = regexp.exec(values.fatherPhone);
    // const motherPhone = regexp.exec(values.motherPhone);
    // var today = new Date();
    // if (moment(values.createdDate) < moment(values.birthday) ) {
    //     errors.createdDate = 'Ngày nhập viện phải lớn hơn ngày sinh.'
    // }
    // if (moment(today) < moment(values.birthday) ) {
    //     errors.birthday = 'Ngày sinh không được lớn hơn ngày hiện tại.'
    // }
    // if (!values.email) {
    //     errors.email = 'Vui lòng nhập email.';
    // } else if (!isEmail(values.email)) {
    //     errors.email = 'Email không hợp lệ.';
    // }
    // if (!values.fullName) {
    //     errors.fullName = 'Vui lòng nhập họ tên.';
    // }
    // if (!values.gender) {
    //     errors.gender = 'Vui lòng chọn giới tính.';
    // }
    // if (!values.birthday) {
    //     errors.birthday = 'Vui lòng nhập ngày sinh.';
    // }
    // if(phone == null){
    //     errors.phone = 'Số điện thoại phải có 10 - 11 chữ số.';
    // }
    // if(fatherPhone == null){
    //     errors.fatherPhone = 'Số điện thoại phải có 10 - 11 chữ số.';
    // }
    // if(motherPhone == null){
    //     errors.motherPhone = 'Số điện thoại phải có 10 - 11 chữ số.';
    // }
    // return errors;
}


const mapStateToProps = state => {
    var updateValue = {
        ...state.patientReducer.updatingPatient,
        birthday: state.patientReducer.updatingPatient && state.patientReducer.updatingPatient.birthday ? moment(state.patientReducer.updatingPatient.birthday) : null,
        createdDate: state.patientReducer.updatingPatient && state.patientReducer.updatingPatient.createdDate ? moment(state.patientReducer.updatingPatient.createdDate) : null,

        nation: state.patientReducer.updatingPatient && state.patientReducer.updatingPatient.nation ? state.patientReducer.updatingPatient.nation : "Việt Nam",
        insuranceCode: state.patientReducer.updatingPatient && state.patientReducer.updatingPatient.insuranceCode ? state.patientReducer.updatingPatient.insuranceCode : '',
        fromDate: state.patientReducer.updatingPatient && state.patientReducer.updatingPatient.fromDate ? moment(state.patientReducer.updatingPatient.fromDate) : null,
        toDate: state.patientReducer.updatingPatient && state.patientReducer.updatingPatient.toDate ? moment(state.patientReducer.updatingPatient.toDate) : null,
        insuranceTypeId: state.patientReducer.updatingPatient && state.patientReducer.updatingPatient.insuranceTypeId ? state.patientReducer.updatingPatient.insuranceTypeId : 1,
        customerLevel: state.patientReducer.updatingPatient && state.patientReducer.updatingPatient.customerLevel ? state.patientReducer.updatingPatient.customerLevel : "BASIC"
    };
    return {
        initialValues: updateValue
    };
};
const mapDispatchToProps = dispatch => ({
    loadPatient: (payload) =>
        dispatch({ type: LOAD_UPDATING_PATIENT, payload: payload })
});


class ModalPatient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllInsuranceType: [],
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
    }

    componentWillMount() {
        this.getlistAllInsuranceType();
        const { loadPatient, reset, destroy } = this.props;

        var id = this.props.idPatient;
        const dataPromise = agent.PatientApi.getPatient(id);
        loadPatient(Promise.resolve(dataPromise))



    }
    getlistAllInsuranceType() {
        let setStateInRequest = (list) => { this.setState({ listAllInsuranceType: list }) }
        return agent.InsuranceTypeApi.listAllInsuranceType().then(function (res) {
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
    handleAdd(values) {
        var onHide = this.props.onHide;
        const { isAddParentFromBookingModal } = this.props;
        const { onReloadAndFillDataModalParent } = this.props;
        var id = this.props.idPatient;
        var url = '/patient/add';
        var bodyObject = {
            fullName: values.fullName,
            id: values.id,
            gender: values.gender,
            birthday: values.birthday,
            phone: values.phone,
            email: values.email,
            address: values.address,
            fatherName: values.fatherName,
            fatherPhone: values.fatherPhone,
            motherName: values.motherName,
            motherPhone: values.motherPhone,
            createdDate: values.createdDate,
            nation: values.nation,
            note: values.note,
            code: values.code,
            insuranceCode: values.insuranceCode,
            insuranceTypeId: values.insuranceTypeId,
            fromDate: values.fromDate,
            toDate: values.toDate,
            customerLevel: values.customerLevel,
            addressBHYT: values.addressBHYT,
            addressDKBD: values.addressDKBD,
            maDKBD: values.maDKBD,
        };
        if (id) {
            url = '/patient/update';
            bodyObject.id = id;
        }

        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && result.id) {
                onHide();
                if (isAddParentFromBookingModal == true) {
                    onReloadAndFillDataModalParent(result.id)

                }

            } else {

                toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });

    }

    ///Hide and Clean Value
    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        // event.preventDefault();
        onHide();
        destroy();
    }
    render() {
        // const { objectCompany, listfile, title, onHide } = this.props;

        const { handleSubmit, submitting, title, invalid } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show, bsSize: "lg", onHide: this.props.onHide, submitting: this.props.submitting };

        var id = this.props.idPatient;

        var optionGender = [

            { label: "Nam ", value: "MALE" },
            { label: "Nữ ", value: "FEMALE" },
            { label: "Khác ", value: "OTHER" },
        ]
        var optionCustomerLevel = [

            { label: "Thẻ Thường ", value: "BASIC" },
            { label: "Thẻ Vàng ", value: "GOLD" },
        ]
        var optionType = [];
        this.state.listAllInsuranceType.map(item => {
            optionType.push({ label: item.name, value: item.id })
        })
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
                                <div className="row">
                                    <div className="form-group">
                                        <div className="col-md-3">
                                            <Field name="fullName" label="Họ Và Tên (*) " placeholder="Nhập họ và tên..." component={RenderInputWithDiv}></Field>
                                        </div>
                                        <div className="col-md-3">
                                            <Field name="phone" label="Số Điện Thoại (*)" placeholder="Nhập số điện thoại..." component={RenderInputWithDiv}></Field>
                                        </div>
                                        <div className="col-md-3">
                                            <Field name="email" type="email" label="Email" placeholder="Nhập email..." component={RenderInputWithDiv}></Field>
                                        </div>
                                        <div className="col-md-3">
                                            <Field name="customerLevel" label="Loại Thẻ Thành Viên" options={optionCustomerLevel} component={RenderSelect}></Field>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-3">
                                            <Field name="gender" label="Giới Tính (*)" placeholder="Chọn giới tính..." options={optionGender} component={RenderSelect}></Field>
                                        </div>
                                        <div className="col-md-3">
                                            <Field name="birthday" label="Ngày Sinh (*)" component={RenderDatePicker}></Field>
                                        </div>

                                        <div className="col-md-3">
                                            <Field name="nation" label="Quốc tịch " placeholder="Nhập Quốc tịch..." component={RenderInputWithDiv}></Field>
                                        </div>
                                        <div className="col-md-3">
                                            <Field name="address" label="Địa Chỉ " placeholder="Nhập địa chỉ..." component={RenderInputWithDiv}></Field>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-3">
                                            <Field name="fatherName" label="Người Thân 1" placeholder="Nhập tên người thân 1..." component={RenderInputWithDiv}></Field>
                                        </div>
                                        <div className="col-md-3">
                                            <Field name="fatherPhone" label="SĐT Người Thân 1" placeholder="Nhập sđt người thn 1..." component={RenderInputWithDiv}></Field>
                                        </div>
                                        <div className="col-md-3">
                                            <Field name="motherName" label="Người Thân 2" placeholder="Nhập tên người thân 2..." component={RenderInputWithDiv}></Field>
                                        </div>
                                        <div className="col-md-3">
                                            <Field name="motherPhone" label="SĐT Người Thân 2" placeholder="Nhập sđt người thân 2..." component={RenderInputWithDiv}></Field>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-6">
                                            <Field name="createdDate" dateFormat="DD/MM/YYYY" label="Ngày Nhập Viện Lần Đầu" placeholder="Nhập ngày nhập viện..." component={RenderDatePicker}></Field>
                                            <Field name="note" label="Ghi Chú" placeholder="Nhập ghi chú..." rows={3} component={RenderTextArea}></Field>
                                        </div>
                                        <div className="col-md-6">
                                            <Field name="code" placeholder="ddmmyyyystt (số cuối 6 khám lẻ, 9 khám đoàn)" label="Mã Bệnh Nhân" component={RenderBarcode}></Field>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-3">
                                            <Field name="insuranceCode" label="Mã Bảo Hiểm" placeholder="Nhập Mã Bảo Hiểm..." component={RenderInputWithDiv}></Field>
                                        </div>

                                        <div className="col-md-3">
                                            <Field name="insuranceTypeId" label="Loại Bảo Hiểm Hỗ Trợ" options={optionType} component={RenderSelect}></Field>
                                        </div>

                                        <div className="col-md-3">
                                            <Field name="addressBHYT" label="Địa Chỉ Thẻ BHYT" component={RenderInputWithDiv}></Field>
                                        </div>
                                        <div className="col-md-3">
                                            <Field name="addressDKBD" label="Nơi Đăng Ký KCB Ban Đầu" component={RenderInputWithDiv}></Field>
                                        </div>
                                        <div className="col-md-3">
                                            <Field name="maDKBD" label="Mã Nơi Đăng Ký KCB Ban Đầu" component={RenderInputWithDiv}></Field>
                                        </div>

                                        <div className="col-md-3">

                                            <Field name="fromDate" label="Từ Ngày " component={RenderDatePicker}></Field>
                                        </div>
                                        <div className="col-md-3">

                                            <Field name="toDate" label="Đến Ngày" component={RenderDatePicker}></Field>
                                        </div>


                                    </div>
                                    <div className="text-right">
                                        <button type="button" style={{ marginRight: "20px" }} className="btn btn-default" onClick={this.handleHideAndClear} ><i class="icon-cross" aria-hidden="true"></i> Đóng</button>
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
            form: 'ModalPatient',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalPatient)));
