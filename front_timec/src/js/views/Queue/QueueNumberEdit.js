import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import {
    RenderTextArea, RenderSelect, RenderNumberInput, RenderDatePickerWithTime, RenderInputWithDiv, RenderDatePicker, RenderBarcode, RenderHiddenInput
} from '../../components/formInputs';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LOAD_UPDATING_QUEUE_NUMBER } from './action-types';
import ModalPatient from '../Patient/ModalPatient';
import moment from 'moment';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { LoadingScreen } from '../../components/commonWidgets';
import ModalChoosePatient from '../Patient/ModalChoosePatient';
import { FormatterUtils } from '../../utils/javascriptUtils';
import {QueuePrintService} from './QueuePrintService';
import { DataPrintService } from '../DataPrintService';

const validate = values => {
    const errors = {};
    if (!values.queueId) {
        errors.queueId = "Vui lòng chọn hàng đợi chuyên khoa!"
    }
    if (!values.fullName) {
        errors.fullName = "Vui lòng nhập tên bệnh nhân!"
    }
    if (!values.gender) {
        errors.gender = "Vui lòng nhập giới tính!"
    }
    if (!values.code) {
        errors.code = "Vui lòng nhập mã bệnh nhân!"
    }
    if (!values.birthday) {
        errors.birthday = "Vui lòng nhập ngày sinh!"
    }
    if (!values.phone) {
        errors.phone = "Vui lòng nhập số điện thoại (dùng mã bệnh nhân nếu không được cung cấp)!"
    }
    if (values.insuranceCode && values.queueId) {
        if (values.insuranceTypeId ==1) {
            errors.insuranceTypeId = "Vui lòng chọn loại BHYT phù hợp!"
        }
        if (!values.fromDate) {
            errors.fromDate = "Vui lòng nhập ngày bắt đầu của thẻ!"
        }
        if (!values.toDate) {
            errors.toDate = "Vui lòng nhập ngày kết thúc của thẻ!"
        }
        if (!values.addressBHYT) {
            errors.addressBHYT = "Vui lòng nhập địa chỉ thẻ!"
        }
        if (!values.addressDKBD) {
            errors.addressDKBD = "Vui lòng nhập địa chỉ cơ sở KCB ban đầu!"
        }
        if (!values.maDKBD) {
            errors.maDKBD = "Vui lòng nhập mã cơ sở KCB ban đầu!"
        }
      
    }

    return errors;
}

const selector = formValueSelector("QueueNumberEdit");

var today = new Date;
const mapStateToProps = state => {
    var updateValue = {
        ...state.queueNumberReducer.updatingQueueNumber,
        // callTime: state.queueNumberReducer.updatingQueueNumber && state.queueNumberReducer.updatingQueueNumber.callTime ? moment(state.queueNumberReducer.updatingQueueNumber.callTime) : null
        status: state.queueNumberReducer.updatingQueueNumber && state.queueNumberReducer.updatingQueueNumber.status ? state.queueNumberReducer.updatingQueueNumber.status : "TODO",
        callTime: state.queueNumberReducer.updatingQueueNumber && state.queueNumberReducer.updatingQueueNumber.callTime ? moment(state.queueNumberReducer.updatingQueueNumber.callTime) : today,
        type: state.queueNumberReducer.updatingQueueNumber && state.queueNumberReducer.updatingQueueNumber.type ? state.queueNumberReducer.updatingQueueNumber.type : "KHONG_UU_TIEN",
        reasonForReceiving: state.queueNumberReducer.updatingQueueNumber && state.queueNumberReducer.updatingQueueNumber.reasonForReceiving ? state.queueNumberReducer.updatingQueueNumber.reasonForReceiving : "KHAM_BENH",
        formArrived: state.queueNumberReducer.updatingQueueNumber && state.queueNumberReducer.updatingQueueNumber.formArrived ? state.queueNumberReducer.updatingQueueNumber.formArrived : "TU_DEN",
        insuranceTypeId: state.queueNumberReducer.updatingQueueNumber && state.queueNumberReducer.updatingQueueNumber.insuranceTypeId ? state.queueNumberReducer.updatingQueueNumber.insuranceTypeId : 1,
    };
    return {
        initialValues: updateValue,
        patientCode: selector(state, "code"),
        patientFullName: selector(state, "fullName"),
        patientBirthday: selector(state, "birthday"),
    };
};

const mapDispatchToProps = dispatch => ({
    backToList: () =>
        dispatch({ type: REDIRECT_TO_PREVIOUS_URL }),
    loadQueueNumber: (payload) =>
        dispatch({ type: LOAD_UPDATING_QUEUE_NUMBER, payload: payload }),
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "QueueNumberEdit", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});

class QueueNumberEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllQueueToday: [],
            listAllPatient: [],
            listAllPackage: [],
            listAllCoupon: [],
            listAllInsuranceType: [],
            currentQueueNumber: {},
            configTable : null,
            insuranceCode : null,
        }

        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.handlShowModalPatient = this.handlShowModalPatient.bind(this);
        this.onReloadAndFillDataModalParent = this.onReloadAndFillDataModalParent.bind(this);
        this.handleChoosePatientObject = this.handleChoosePatientObject.bind(this);
        this.handleHidemodal = () => {
            this.setState({ isPatientModalShown: false });
        };
        this.handleHidemodalPatient = (id) => {
            this.setState({ isPatientIdModalShown: false });
        };
        this.handleOnChangeCustomerType = (value) => {
            const { updateField } = this.props;
            let setStateInRequest = (patientCode) => { this.setState({ patientCode: patientCode }) };
            
            return agent.asyncRequests.get("/patient/generatePatientCode?customerType=" + value
            ).then(function (res) {
                var result = res.body.resultData;
                if (result) {
                    setStateInRequest(result);
                    updateField("code", result);
                } else {
                    toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                    + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
            });

        }
    }

    onReloadAndFillDataModalParent(patientId) {
        const { updateField } = this.props;
        this.getlistAllPatient(); // TODO BANGPC!! NEVER LOAD ALL PATIENT (may be 10.000 record)
        updateField("patientId", patientId);


    }
    getlistAllPatient() {
        let setStateInRequest = (list) => { this.setState({ listAllPatient: list }) }
        return agent.PatientApi.listAllPatient(
        ).then(function (res) {
            var result = res.resultData;
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
    getlistAllPackage() {
        let setStateInRequest = (list) => { this.setState({ listAllPackage: list }) }
        return agent.PackageApi.listAllPackage(
        ).then(function (res) {
            var result = res.resultData;
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
    getlistAllCoupon() {
        let setStateInRequest = (list) => { this.setState({ listAllCoupon: list }) }
        return agent.CouponApi.listAllCoupon(
        ).then(function (res) {
            var result = res.resultData;
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
    getlistAllQueueToday() {
        let setStateInRequest = (list) => { this.setState({ listAllQueueToday: list }) }
        return agent.asyncRequests.get("/queue/findAllToday"
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
    // getNextTheNumber(queueObject) {
    //     const { updateField } = this.props;
    //     return agent.asyncRequests.get("/queueNumber/nextTheNumber?queueId=" + queueObject.id
    //     ).then(function (res) {
    //         var result = res.body;
    //         if (result.resultData != null) {
    //             updateField("theNumber", result.resultData.theNumber + 1);
    //         } else if (result.errorMessage == "NO_THE_NUMBER") {
    //             updateField("theNumber", 1);
    //         }
    //     }, function (err) {
    //         toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
    //             + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
    //     });
    // }
    getConfigTable() {
        let setStateInRequest = (list) => { this.setState({ configTable : list }) }
        return agent.ConfigTableApi.getAllConfigTable().then(function (res) {
            var result = res.resultData[0];
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    }
    getlistAllInsuranceType(){
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
    componentWillMount() {
        const { loadQueueNumber, queueObject, updateField } = this.props;
        var id = this.props.idQueueNumber;
        if (id) {
            const dataPromise = agent.QueueNumberApi.getQueueNumber(id);
            loadQueueNumber(Promise.resolve(dataPromise))
        }
        // else {
        //     this.getNextTheNumber(queueObject);
        // }
        if (queueObject) {
            updateField("queueId", queueObject.id);
        }
        var url = '/assets/images/logo_timec.png';
        FormatterUtils.downloadImageDataUri(url, this, "imageLogo");
        return (
            this.getlistAllPatient(),
            this.getlistAllQueueToday(),
            this.getlistAllPackage(),
            this.getlistAllCoupon(),
            this.getlistAllInsuranceType(),
            this.getConfigTable()
        )
    }
    handlShowModalPatient(id) {
        this.setState({
            isPatientModalShown: true,
            idPatient: id
        });
    }
    handleAddPatient() {
        this.setState({
            isPatientIdModalShown: true
        });
    }
    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        onHide();
        destroy();
    }
    handleAdd(values) {
        const { backToList } = this.props;
        var id = this.props.match.params.id;
        var idPatient = this.state.patientId;
        var url = '/queueNumber/addPatient';
        var bodyObject = {
            fullName: values.fullName,
            phone: values.phone,
            code: values.code,
            birthday: values.birthday,
            reasonForReceiving: values.reasonForReceiving,
            formArrived: values.formArrived,
            gender: values.gender,
            address: values.address,
            fatherName: values.fatherName,
            fatherPhone: values.fatherPhone,
            motherName: values.motherName,
            motherPhone: values.motherPhone,
            nation: values.nation,
            insuranceCode: values.insuranceCode,
            insuranceTypeId: values.insuranceTypeId,
            fromDate: values.fromDate,
            toDate: values.toDate,
            createdDate: values.createdDate,
            queueId: values.queueId,
            type: values.type,
            status: values.status,
            couponId: values.couponId,
            packageId: values.packageId,
            theNumber: values.theNumber ?  values.theNumber : 1,
            callTime: values.callTime,
            patientId: values.patientId,
            addressBHYT: values.addressBHYT,
            addressDKBD: values.addressDKBD,
            maDKBD: values.maDKBD,
        };
        let setStateInRequest = (objQueueNumber) => {
            this.setState({
                currentQueueNumber: objQueueNumber
            })
        }
        var handleNewPrescription = this.handleNewPrescription;
        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && result.id) {
                // backToList();
                setStateInRequest(result)
                handleNewPrescription(result.id, values.insuranceTypeId)
                toast.info("Đã đưa vào hàng chờ thành công", { autoClose: 15000 });
            } else {
                toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    }
    handleNewPrescription(queueuNumberId, insuranceTypeId) {
        return agent.asyncRequests.get("/prescriptionEdit/createPrescriptionForChooseAndInsuranceTypeId?idQueueNumber=" + queueuNumberId + "&insuranceTypeId=" +insuranceTypeId
        ).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                // window.location.href = "/editPrescription/" + result.id;
            } else {
                toast.error("Có lỗi khi xóa dữ liệu. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Không thể xóa dữ liệu đang được sử dụng từ màn hình khác! ", { autoClose: 15000 });
        });

    }
    

    handleChoosePatientObject(ObjectPatient) {
        const { updateField } = this.props;
        updateField("patientId", ObjectPatient.id);
        updateField("fullName", ObjectPatient.fullName);
        updateField("phone", ObjectPatient.phone);
        updateField("code", ObjectPatient.code);
        updateField("birthday", ObjectPatient.birthday);
        updateField("reasonForReceiving", ObjectPatient.reasonForReceiving);
        updateField("formArrived", ObjectPatient.formArrived);
        updateField("gender", ObjectPatient.gender);
        updateField("address", ObjectPatient.address);
        updateField("fatherName", ObjectPatient.fatherName);
        updateField("fatherPhone", ObjectPatient.fatherPhone);
        updateField("motherName", ObjectPatient.motherName);
        updateField("motherPhone", ObjectPatient.motherPhone);
        updateField("nation", ObjectPatient.nation);
        // TODO insert insuranceCard from server
        updateField("insuranceCode", ObjectPatient.insuranceCode);
        updateField("insuranceTypeId", ObjectPatient.insuranceTypeId);
        updateField("fromDate", ObjectPatient.fromDate);
        updateField("toDate", ObjectPatient.toDate);
        updateField("createdDate", ObjectPatient.createdDate);
        updateField("addressBHYT", ObjectPatient.addressBHYT);
        updateField("addressDKBD", ObjectPatient.addressDKBD);
        updateField("maDKBD", ObjectPatient.maDKBD);
        this.setState({
            insuranceCode : ObjectPatient.insuranceCode
        })
    }
    
    render() {
        const { backToList, handleSubmit, submitting, title, invalid, isUpdateStatus,
            patientCode, patientFullName, patientBirthday } = this.props;
        // const { backToList, handleSubmit, submitting, invalid } = this.props;
        var id = this.props.match.params.id;
        const dataQueue = this.state.listAllQueueToday;
        const dataPatient = this.state.listAllPatient;
        var optionAllQueueToday = [];
        var optionAllPatient = [];

        var imageLogo = this.state.imageLogo;
        var configTable = this.state.configTable;

        var queueNumberId = this.state.currentQueueNumber.id;

        if (dataQueue) {
            dataQueue.map(item => {
                optionAllQueueToday.push({ label: item.name + " - Bác Sĩ: " + item.caller.fullName, value: item.id });
            })
        }
        if (dataPatient) {
            dataPatient.map(item => {
                optionAllPatient.push({ label: item.code + " - " + item.fullName, value: item.id })
            })
        }

        var optionAllPackage = [];
        var dataListPackage = this.state.listAllPackage;
        if (dataListPackage) {
            dataListPackage.map(item => {
                optionAllPackage.push({ label: item.name, value: item.id });
            })
        }
        var optionAllCoupon = [];
        var dataListCoupon = this.state.listAllCoupon;
        if (dataListCoupon) {
            dataListCoupon.map(item => {
                optionAllCoupon.push({ label: item.code, value: item.id });
            })
        }
        var optionQueueNumberType = [
            { label: "Không Ưu Tiên", value: "KHONG_UU_TIEN" },
            { label: "Ưu Tiên", value: "UU_TIEN" },
        ];
        var optionQueueNumberStatus = [
            { label: "Đang Chờ", value: "TODO" },
            { label: "Hoàn Tất", value: "DONE" },
            { label: "Hủy", value: "HUY" },
        ];

        var optionReasonForReceiving = [
            { label: "Khám Bệnh", value: "KHAM_BENH" },
            { label: "Cấp Cứu", value: "CAP_CUU" },
        ];

        var optionFormArrived = [
            { label: "Tự Đến", value: "TU_DEN" },
            { label: "Chuyển Viện", value: "CHUYEN_VIEN" },
        ];
        var optionGender = [

            { label: "Nam ", value: "MALE" },
            { label: "Nữ ", value: "FEMALE" },
            { label: "Khác ", value: "OTHER" },
        ]

        var optionCustomerType = [
            { label: "Khách Lẻ ", value: "6" },
            { label: "Khách Đoàn ", value: "9" }
        ]

        var optionType = [];
        this.state.listAllInsuranceType.map(item => {
            optionType.push({ label: item.name, value: item.id })
        })
        var idQueueNumber = this.state.currentQueueNumber.id;
        var buttonPrintQueuNumber = idQueueNumber ? <a className="btn btn-info" onClick={() => QueuePrintService.handlePrinter(queueNumberId, imageLogo, configTable, "KB", this.state.insuranceCode)}><i className="icon-printer"></i> In Số Khám </a> : null;
        var buttonPrintPatientCode = idQueueNumber ? <a className="btn btn-default" onClick={() => DataPrintService.handleGetListToPrintBarcode(patientCode, patientFullName + " " + moment(patientBirthday).year())}><i className="icon-printer"></i> In Barcode BN</a> : null;
        
        var editView =
            <div className="content-wrapper">
                <div className="page-header">
                    <div className="page-header-content">
                        <div className="page-title">
                            {id == "new" ?
                                <h4>
                                    <i className="icon-plus-circle2 position-left"></i> <span
                                        className="text-semibold"></span> - Thêm mới
                        </h4> :
                                <h4>
                                    <i className="icon-pencil position-left"></i> <span
                                        className="text-semibold"></span> Tiếp Nhập Bệnh
                        </h4>}
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h6 className="">Thông tin  <a class="btn btn-primary" onClick={() => this.handleAddPatient()}><i class="icon-plus22"></i>Chọn bệnh nhân </a></h6>
                           
                        </div>
                        <div className="panel-body">
                            {submitting ? <LoadingScreen /> :
                                <form className="form-horizontal" role="form" onSubmit={handleSubmit(this.handleAdd)}>
                                    <div className="row">
                                        <div className="form-group">
                                            <div className="col-md-4">
                                                <div className="col-md-12">
                                                </div>
                                                {/* <Field name="code" placeholder="Nhập mã..." label="Nhập Mã" component={RenderBarcode}></Field> */}
                                                <div className="col-md-12">
                                                    <Field name="patientId" label="patientId " placeholder="ID..." component={RenderHiddenInput}></Field>
                                                    <Field name="fullName" label="Họ Và Tên (*) " placeholder="Nhập họ và tên..." component={RenderInputWithDiv}></Field>
                                                    <Field name="phone" label="Số Điện Thoại (*)" placeholder="Nhập số điện thoại..." component={RenderInputWithDiv}></Field>
                                                    <Field name="birthday" label="Ngày Sinh (*)" component={RenderDatePicker}></Field>
                                                    <Field name="reasonForReceiving" label="Lý Do Tiếp Nhận" placeholder="Chọn lý do tiếp nhận..." options={optionReasonForReceiving} component={RenderSelect}></Field>
                                                    <Field name="formArrived" label="Hình Thức Đến" placeholder="Chọn hình thức đến..." options={optionFormArrived} component={RenderSelect}></Field>
                                                    <Field disabled={true} name="callTime" label="Thời Gian Đặt Số (*)" placeholder="Chọn thời gian đặt số..." dateFormat="dd/MM/yyyy hh:mm:aa" component={RenderDatePickerWithTime}></Field>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <Field name="gender" label="Giới Tính (*)" placeholder="Chọn giới tính..." options={optionGender} component={RenderSelect}></Field>
                                                <Field name="customerType" label="Loại Khách (*)" placeholder="Chọn loại khách" options={optionCustomerType} component={RenderSelect}
                                                onChangeAction={(value) => this.handleOnChangeCustomerType(value)}></Field>
                                                <Field name="code" label="Đặt Mã Bệnh Nhân" placeholder="ddmmyyyystt (số cuối 6 khám lẻ, 9 khám đoàn)" component={RenderInputWithDiv}></Field>
                                                <Field name="address" label="Địa Chỉ " placeholder="Nhập địa chỉ..." component={RenderInputWithDiv}></Field>
                                                <Field name="fatherName" label="Người Thân 1" placeholder="Nhập tên người thân 1..." component={RenderInputWithDiv}></Field>
                                                <Field name="fatherPhone" label="SĐT Người Thân 1" placeholder="Nhập sđt người thn 1..." component={RenderInputWithDiv}></Field>
                                                <Field name="motherName" label="Người Thân 2" placeholder="Nhập tên người thân 2..." component={RenderInputWithDiv}></Field>
                                                <Field name="motherPhone" label="SĐT Người Thân 2" placeholder="Nhập sđt người thân 2..." component={RenderInputWithDiv}></Field>
                                            </div>
                                            <div className="col-md-4">
                                                {/* <Field name="nation" label="Quốc tịch " placeholder="Nhập Quốc tịch..." component={RenderInputWithDiv}></Field> */}
                                                <Field name="insuranceCode" label="Mã Bảo Hiểm" placeholder="Nhập Mã Bảo Hiểm..." component={RenderInputWithDiv}></Field>
                                                <Field name="insuranceTypeId" label="Loại Bảo Hiểm Hỗ Trợ" options={optionType} component={RenderSelect}></Field>
                                                <Field name="fromDate" label="BHYT Từ Ngày " component={RenderDatePicker}></Field>
                                                <Field name="toDate" label="BHYT Đến Ngày" component={RenderDatePicker}></Field>
                                                <Field name="addressBHYT" label="Địa Chỉ Thẻ BHYT" component={RenderInputWithDiv}></Field>
                                                <Field name="addressDKBD" label="Nơi Đăng Ký KCB Ban Đầu" component={RenderInputWithDiv}></Field>
                                                <Field name="maDKBD" label="Mã Nơi Đăng Ký KCB Ban Đầu" component={RenderInputWithDiv}></Field>
                                                <Field name="createdDate" dateFormat="DD/MM/YYYY" label="Ngày Nhập Viện Lần Đầu" placeholder="Nhập ngày nhập viện..." component={RenderDatePicker}></Field>
                                                
                                                {/* <Field name="note" label="Ghi Chú" placeholder="Nhập ghi chú..." row={3} component={RenderTextArea}></Field> */}
                                            </div>


                                            {/* <Field name="note" label="Ghi Chú" placeholder="Nhập ghi chú..." rows={3} component={RenderTextArea}> </Field> */}
                                            {/* <Field name="patientId" label="Tên Bệnh Nhân (*)" placeholder="Chọn tên bệnh nhân ..." options={optionAllPatient} component={RenderSelect}></Field> */}
                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="form-group">
                                            <div className="col-md-2">
                                                <Field name="queueId" label="Hàng chờ theo chuyên khoa (*)" options={optionAllQueueToday} component={RenderSelect}></Field>
                                            </div>
                                            <div className="col-md-2">
                                                <Field name="type" label="Loại Số" placeholder="Chọn loại số..." options={optionQueueNumberType} component={RenderSelect}></Field>
                                            </div>
                                            <div className="col-md-2">
                                                <Field name="status" label="Trạng Thái" placeholder="Chọn trạng thái..." options={optionQueueNumberStatus} component={RenderSelect}></Field>
                                            </div>
                                            {/* <div className="col-md-2">
                                                <Field name="couponId" label="Mã giảm giá" options={optionAllCoupon} component={RenderSelect}></Field>
                                            </div> */}
                                            <div className="col-md-2">
                                                <Field name="packageId" label="Gói khám" options={optionAllPackage} component={RenderSelect}></Field>
                                                {/* <Field name="email" type="Email" label="Email" placeholder="Nhập email..." component={RenderInputWithDiv}></Field> */}
                                            </div>
                                            <div className="col-md-2">
                                                <Field name="theNumber" disabled={true} label="Số Thứ Tự" placeholder="Nhập số thứ tự..." component={RenderInputWithDiv}></Field>
                                                {/* <Field name="email" type="Email" label="Email" placeholder="Nhập email..." component={RenderInputWithDiv}></Field> */}
                                            </div>
                                            <Field name="callTime" label="Thời Gian Đặt Số (*)" placeholder="Chọn thời gian đặt số..." dateFormat="dd/MM/yyyy hh:mm:aa" component={RenderHiddenInput}></Field>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <button type="button" className="btn btn-link" onClick={backToList}>Hủy</button>
                                        {!idQueueNumber ? <button onClick={handleSubmit(this.handleAdd)} className="btn btn-primary" disabled={submitting || invalid}>Lưu Tiếp Nhận</button>: null}
                                        <a className="btn btn-warning" href={"/editQueueNumber/new"} >Tiếp nhận mới</a>

                                        {buttonPrintQueuNumber}
                                        {buttonPrintPatientCode}
                                    </div>
                                </form>
                            }
                        </div>
                    </div>
                </div>
                {
                    this.state.isPatientIdModalShown ? <ModalChoosePatient
                        title={this.state.idPatient ? "Chỉnh Sửa Bệnh Nhân" : "Thêm Mới Bệnh Nhân"}
                        patientId={this.props.match.params.id}
                        show={this.state.isPatientIdModalShown}
                        onHide={this.handleHidemodalPatient}
                        handleChoosePatientObject={this.handleChoosePatientObject}
                    /> : null
                }
            </div >
        return editView;
    }
};

export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'QueueNumberEdit',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(QueueNumberEdit)));
