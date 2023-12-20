import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderInputWithGen, RenderTextArea, RenderDatePicker, RenderCheckbox, RenderSelect, RenderDatePickerWithTime, RenderNumberInput, RenderMoneyFormat } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import isEmail from 'sane-email-validation';
import { StringUtils } from '../../utils/javascriptUtils';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_PROCEDUREREPORT } from './action-types';
import { FIRE_REDIRECT } from '../../constants/action-types';
import ListFile from '../../components/ListFile';
import { isNull } from 'util';
import moment from 'moment';

const validate = values => {
    const errors = {};
    if (!values.procedureServiceId) {
        errors.procedureServiceId = "Vui lòng nhập tên dịch vụ thủ thuật!"
    }
    if (!values.patientId) {
        errors.patientId = "Vui lòng chọn Bệnh Nhân"
    }
    if (!values.arriveTime) {
        errors.arriveTime = "Vui lòng chọn ngày & giờ!"
    }
    if (!values.prescriptionId) {
        errors.prescriptionId = "Vui lòng chọn Phiếu Khám"
    }

    return errors;
}
var today = new Date();
const mapStateToProps = state => {
    var updateValue = {
        ...state.procedureReportReducer.updatingProcedureReport,
        arriveTime: state.diagnosisReportReducer.updatingQueue && state.diagnosisReportReducer.updatingQueue.arriveTime ? moment(state.diagnosisReportReducer.updatingQueue.arriveTime) : today,
    };
    return {
        initialValues: updateValue
    };
};
const mapDispatchToProps = dispatch => ({
    loadProcedureReport: (payload) =>
        dispatch({ type: LOAD_UPDATING_PROCEDUREREPORT, payload: payload }),
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalProcedureReport", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});
class ModalProcedureReport extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listAllProcedureService: [],
            listAllPatient: [],
            listAllPrescription: [],
        }

        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
    };

    getlistAllProcedureService() {
        let setStateInRequest = (list) => { this.setState({ listAllProcedureService: list }) }
        return agent.ProcedureServiceApi.listAllProcedureService(
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

    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        onHide();
        destroy();
    }
    handleAdd(values) {
        const { currentUser } = this.props;
        var onHide = this.props.onHide;
        var id = this.props.idProcedureReport;
        var url = '/procedureReport/add';
        var bodyObject = {
            procedureServiceId: values.procedureServiceId,
            patientId: values.patientId,
            prescriptionId: values.prescriptionId,
            arriveTime: values.arriveTime,
            startTime: values.startTime,
            doneTime: values.doneTime,
            note: values.note,
            status: values.status,
            hospitalId: values.hospitalId

        };
        if (id) {
            url = '/procedureReport/update';
            bodyObject.id = id;
        }
        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && result.id) {

                toast.info("Lưu Thành Công.", { autoClose: 1000 });
                onHide();
            } else {
                toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    };

    componentWillMount() {
        const { loadProcedureReport, prescriptionId, patientId,
            updateField } = this.props;
        var id = this.props.idProcedureReport;
        {
            const dataPromise = agent.ProcedureReportApi.getProcedureReport(id);
            loadProcedureReport(Promise.resolve(dataPromise))
        }
        if (prescriptionId && prescriptionId != 'new') {
            updateField("prescriptionId", prescriptionId);
        }
        if (patientId && patientId != 'new') {
            updateField("patientId", patientId);
        }
        this.getlistAllProcedureService();
        this.getlistAllPatient();
        this.getlistAllPrescription();
    }
    render() {
        const { handleSubmit, submitting, title, invalid , isEditale} = this.props;
        const modalConfig = {
            backdrop: 'static', show: this.props.show, bsSize: "sm",
            onHide: this.props.onHide,
            submitting: this.props.submitting
        };

        var optionAllProcedureService = [];
        var dataListProcedureService = this.state.listAllProcedureService;
        if (dataListProcedureService) {
            dataListProcedureService.map(item => {
                optionAllProcedureService.push({ label: item.name, value: item.id });
            })
        }
        var optionAllPatient = [];
        var dataListPatient = this.state.listAllPatient;
        if (dataListPatient) {
            dataListPatient.map(item => {
                optionAllPatient.push({ label: item.fullName, value: item.id });
            })
        }
        var optionPrescription = [];
        this.state.listAllPrescription.map(item => {
            optionPrescription.push({ label: item.department ? item.department.name : "N/A" + ' - ' + (item.patient ? item.patient.fullName : ""), value: item.id })
        })

        var optionStatus = [
            { value: "OPEN", label: "Khởi Tạo" },
            { value: "IN_PROGRESS", label: "Đang Xử Lý" },
            { value: "DONE", label: "Hoàn Tất" },
            { value: "CANCELLED", label: "Đã Hủy" },
            // Khởi tạo, Đang Xử Lý, Hoàn tất, Đã Hủy nha
        ]
        var elementSave = isEditale == true ? <button type="submit"  className="btn bg-success" disabled={submitting}> Lưu Lại</button> : null
        var elementCancel = isEditale == true ?  <button type="button" style={{marginRight:"20px"}} className="btn btn-default" onClick={this.handleHideAndClear} ><i class="icon-cross" aria-hidden="true"></i> Đóng</button>            : null
        var id = this.props.idProcedureReport;
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
                                            <br />
                                            <Field disabled={true} name="prescriptionId" label="Phiếu Khám (*)" options={optionPrescription} component={RenderSelect}></Field>
                                        </div>
                                        <div className="col-md-6">
                                            <br />
                                            <Field disabled={true} name="patientId" label="Bệnh Nhân (*)" options={optionAllPatient} component={RenderSelect}></Field>
                                        </div>
                                        <div className="col-md-6">
                                            <br />
                                            <Field disabled={true}  name="procedureServiceId" label="Dịch Vụ Thủ Thuật(*)" placeholder="chọn dịch vụ thủ thuật" options={optionAllProcedureService} component={RenderSelect} ></Field>
                                        </div>
                                        <div className="col-md-6">
                                            <br />
                                            <Field disabled={true} name="arriveTime" dateFormat="DD/MM/YYYY HH:mm" label="Thời gian tiếp nhận" component={RenderDatePickerWithTime}></Field>
                                        </div>
                                        <div className="col-md-6">
                                            <br />
                                            <Field name="startTime" label="Thời Gian Bắt Đầu" component={RenderDatePickerWithTime}></Field>
                                        </div>
                                        <div className="col-md-6">
                                            <br />
                                            <Field name="doneTime" label="Thời Gian Hoàn Thành" component={RenderDatePickerWithTime}></Field>
                                        </div>
                                        <div className="col-md-12">
                                            <br />
                                            <Field disabled={true} name="status" label="Trạng thái" placeholder="Nhập Trạng Thái..." options={optionStatus} component={RenderSelect}></Field>
                                        </div>
                                        <div className="col-md-12">
                                            <br />
                                            <Field name="note" label="Ghi Chú" placeholder="Nhập ghi chú..." row={3} component={RenderTextArea}></Field>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <br />
                                        {elementCancel}       
                                        {elementSave}
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
            form: 'ModalProcedureReport',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalProcedureReport)));
