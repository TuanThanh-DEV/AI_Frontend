import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderTextArea, RenderSelect, RenderDatePickerWithTime } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_APPOINTMENT } from './action-types';
import { DateUtils } from '../../utils/javascriptUtils';


const validate = values => {
    const errors = {};
    if (!values.hospitalId) {
        errors.hospitalId = "Vui lòng chọn bệnh viện!"
    }
    // if (!values.userId) {
    //     errors.userId = "Vui lòng chọn bác sĩ!"
    // }
    if (!values.patientId) {
        errors.patientId = "Vui lòng chọn bệnh nhân!"
    }
    if (!values.appointDate) {
        errors.appointDate = "Nhập ngày cho cuộc hẹn!"
    }
    if (!values.status) {
        errors.status = "Vui lòng nhập nội dung cuộc hẹn!"
    }
    return errors;
}
const mapStateToProps = state => {
    var updateValue = {
        ...state.appointmentReducer.updatingAppointment,
        hospitalId: state.appointmentReducer.updatingAppointment && state.appointmentReducer.updatingAppointment.hospitalId ? state.appointmentReducer.updatingAppointment.hospitalId : 1
    };
    return {
        initialValues: updateValue
    };
};
const mapDispatchToProps = dispatch => ({
    loadAppointment: (payload) =>
        dispatch({ type: LOAD_UPDATING_APPOINTMENT, payload: payload }),
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalAppointment", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});
class ModalAppointment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllHospital: [],
            listAllPatient: [],
            listAllUser: [],
            listAllPrescription: [],
            listAllUserDepartment: [],
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.getListAllDepartment = () => {
            let setStateInRequest = (list) => { this.setState({ listAllUserDepartment: list }) }
            return agent.asyncRequests.get("/department/listAll"
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
    };
    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        onHide();
        destroy();
    }
    handleAdd(values) {
        var onHide = this.props.onHide;
        var id = this.props.idAppointment;
        var prescriptionId = this.props.prescriptionId;

        var url = '/appointment/add';
        var bodyObject = {
            appointDate: values.appointDate,
            status: values.status,
            userId: values.userId,
            patientId: values.patientId,
            hospitalId: values.hospitalId,
            departmentId: values.departmentId,
            prescriptionId: prescriptionId
        };
        if (id) {
            url = '/appointment/update';
            bodyObject.id = id;
        }
        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && result.id) {
                onHide();
                // toast.success("Lưu Thành Công", { autoClose: 1000, position: toast.POSITION.TOP_RIGHT});
            } else {
                toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    };

    componentWillMount() {
        const { loadAppointment, prescriptionId, updateField, patientId, hospitalId, doctorId } = this.props;
        var id = this.props.idAppointment;

        const dataPromise = agent.AppointmentApi.getAppointment(id);
        loadAppointment(Promise.resolve(dataPromise))
        this.getlistAllHospital();
        this.getlistAllPatient();
        this.getlistAllPersonel();
        this.getlistAllPrescription();
        this.getListAllDepartment();


        if (patientId && patientId != 'new') {
            updateField("patientId", patientId);
        }
        if (hospitalId && hospitalId != 'new') {
            updateField("hospitalId", hospitalId);

        }
        if (doctorId && doctorId != 'new') {
            updateField("userId", doctorId);

        }
    }
    getlistAllPrescription() {
        const { updateField, prescriptionId } = this.props;
        let setStateInRequest = (list) => { this.setState({ listAllPrescription: list }) }
        return agent.PrescriptionApi.listAllPrescription(
        ).then(function (res) {
            var result = res.resultData;
            if (result) {
                setStateInRequest(result);
                if (prescriptionId && prescriptionId != 'new') {
                    updateField("prescriptionId", prescriptionId);
                }
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    }
    getlistAllPersonel() {
        let setStateInRequest = (list) => { this.setState({ listAllUser: list }) }
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
    getlistAllHospital() {
        let setStateInRequest = (list) => { this.setState({ listAllHospital: list }) }
        return agent.HospitalApi.listAllHospital().then(function (res) {
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
        const { handleSubmit, submitting, title, invalid ,hospitalId, patientId,doctorId} = this.props;
        const modalConfig = {
            backdrop: 'static', show: this.props.show, bsSize: "medium",
            onHide: this.props.onHide,
            submitting: this.props.submitting
        };
        var id = this.props.idAppointment;

        var optionUserHospital = [];
        this.state.listAllHospital.map(item => {
            optionUserHospital.push({ label: item.name, value: item.id })
        })
        var optionUserPatient = [];
        this.state.listAllPatient.map(item => {
            optionUserPatient.push({ label: item.fullName + " " + DateUtils.formatDateForScreen(item.birthday), value: item.id })
        })
        var optionUserPersonel = [];
        this.state.listAllUser.map(item => {
            optionUserPersonel.push({ label: item.fullName, value: item.id })
        })
        var optionPrescription = [];
        this.state.listAllPrescription.map(item => {
            optionPrescription.push({ label: item.patient ? item.patient.fullName : "N/A", value: item.id })
        })

        var optionDepartment = [];
        var dataListUserDepartment = this.state.listAllUserDepartment;
        if (dataListUserDepartment) {
            dataListUserDepartment.map(item => {
                optionDepartment.push({ label: item.name, value: item.id });
            })
        }
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

                    <Modal.Body>
                        {submitting ? <LoadingScreen /> :
                            <form className="form-horizontal" role="form" onSubmit={handleSubmit(this.handleAdd)}>
                                <div className="form-group">
                                    <div className="row">

                                        <div className="col-md-6 " style={{display: 'none'}}>
                                            <Field disabled={hospitalId ? true : false} name="hospitalId" label="Bệnh Viện (*)" placeholder="Vui lòng chọn Bệnh viện..." options={optionUserHospital} component={RenderSelect}></Field>
                                        </div>
                                        <div className="col-md-6 ">
                                            <Field name="departmentId" label="Chuyên Khoa" placeholder="Vui lòng chọn chuyên khoa..." options={optionDepartment} component={RenderSelect}></Field>
                                        </div>
                                        <div className="col-md-6 ">
                                            <Field disabled={doctorId ? true : false} name="userId" label="Bác Sĩ" placeholder="Vui lòng chọn Bác sĩ..." options={optionUserPersonel} component={RenderSelect}></Field>
                                        </div>
                                        <div className="col-md-6 ">
                                            <br />
                                            <Field disabled={patientId ? true : false} name="patientId" label="Bệnh Nhân (*)" placeholder="Vui lòng chọn Bệnh nhân..." options={optionUserPatient} countAccents={true} component={RenderSelect}></Field>
                                        </div>
                                        <div className="col-md-6">
                                            <br />
                                            <Field name="appointDate" label="Cuộc Hẹn Vào Lúc" dateFormat="dd/MM/yyyy hh:mm:aa" component={RenderDatePickerWithTime}></Field>
                                        </div>
                                        <div className="col-md-12">
                                            <br />
                                            <Field name="status" label="Nội Dung Cuộc Hẹn (*)" placeholder="Nhập nội dung cuộc hẹn..." row={3} component={RenderTextArea}></Field>
                                        </div>
                                    </div>
                                    <br />
                                    <div className="text-right">
                                        <button type="button" style={{marginRight:"20px"}} className="btn btn-default" onClick={this.handleHideAndClear} ><i class="icon-cross" aria-hidden="true"></i> Đóng</button>
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
            form: 'ModalAppointment',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalAppointment)));
