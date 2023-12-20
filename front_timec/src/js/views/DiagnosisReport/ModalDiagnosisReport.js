import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderTextArea, RenderSelect, RenderDatePickerWithTime, RenderDatePicker, RenderHiddenInput } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_DIAGNOSISREPORT } from './action-types';
import ListFile from '../../components/ListFile';
import moment from 'moment';

const validate = values => {
    const errors = {};
    if (!values.diagnosisServiceId) {
        errors.diagnosisServiceId = "Vui lòng chọn dịch vụ Chỉ Định!"
    }

    return errors;
}
var today = new Date();
const mapStateToProps = state => {
    var updateValue = {
        ...state.diagnosisReportReducer.updatingDiagnosisReport,
        diagnosisDate: state.diagnosisReportReducer.updatingDiagnosisReport && state.diagnosisReportReducer.updatingDiagnosisReport.diagnosisDate ? moment(state.diagnosisReportReducer.updatingDiagnosisReport.diagnosisDate) : null,

    };
    return {
        initialValues: updateValue,
        currentUser: state.common.currentUser,
    };
};
const mapDispatchToProps = dispatch => ({
    loadDiagnosisReport: (payload) =>
        dispatch({ type: LOAD_UPDATING_DIAGNOSISREPORT, payload: payload }),
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalDiagnosisReport", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});
class ModalDiagnosisReport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllPersonel: [],
            dataDianosisReport : null
        }

        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
    };

    getlistAllDoctor() {
        const {updateField, prescriptionId, currentUser} = this.props;
        let setStateInRequest = (list) => { this.setState({ listAllPersonel: list }) }
        return agent.UserApi.listAllPersonel(
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

    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        onHide();
        destroy();
    }
    handleAdd(values) {
        var onHide = this.props.onHide;
        var id = this.props.idDiagnosisReport;
        var url = '/diagnosisReport/add';
        var bodyObject = {
            fileName: values.fileName,
            reportType: values.reportType,
            prescriptionId: values.prescriptionId,
            description: values.description,
            diagnosisDate: values.diagnosisDate, 
            laboratoristId: values.laboratoristId,
            hospitalId: values.hospitalId,
            diagnosisServiceId: values.diagnosisServiceId,
            status: "DONE",
            diagnosisReportlUploadFile: values.diagnosisReportlUploadFile,
            diagnose : values.diagnose,
            quantity : values.quantity

        };
        if (id) {
            url = '/diagnosisReport/update';
            bodyObject.id = id;
        }
        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                onHide();
                toast.info("Lưu Thành Công.", { autoClose: 1000 });
            } else {
                toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    };

    componentWillMount() {
        const { loadDiagnosisReport, updateField,
            hospitalId, prescriptionId,currentUser,
            doctorId, idDiagnosisReport } = this.props;
        this.getlistAllDoctor();
        let setStateInRequest = (data) => { loadDiagnosisReport({resultData : data}), this.setState({ dataDianosisReport: data })}
        return agent.DiagnosisReportApi.getDiagnosisReport(idDiagnosisReport
                ).then(function (res) {
                    var result = res.resultData;
                    if (result) {
                        setStateInRequest(result);
                        if(result.laboratoristId == null && prescriptionId ==  null){
                            updateField("laboratoristId", currentUser.id)
                        }
                    } else {
                        toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                    }
                }, function (err) {
                    toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                        + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
                });
    }
    render() {
        const { handleSubmit, submitting, title, invalid, isEditale } = this.props;
        const modalConfig = {
            backdrop: 'static', show: this.props.show, bsSize: "large",
            onHide: this.props.onHide,
            submitting: this.props.submitting
        };

        var optionAllDoctor = [];
        var dataListDoctor = this.state.listAllPersonel;
        if (dataListDoctor) {
            dataListDoctor.map(item => {
                optionAllDoctor.push({ label: item.fullName, value: item.id });
            })
        }

        var dataDianosisReport = this.state.dataDianosisReport;

        var {isActiveDoctor} = this.props;

        var optionAllDiagnosisService = [];
       
        var optionPrescription = [];
        
        var optionAllHospital = [];

        if(dataDianosisReport != null){
            var dataPrescription = dataDianosisReport.prescription;
            if(dataPrescription != null){
                optionPrescription.push({ label: (dataPrescription.id + " - " + (dataPrescription.patient ?  dataPrescription.patient.fullName : "N/A")), value: dataPrescription.id });
            }

            var dataDiagnosisService = dataDianosisReport.diagnosisService;
            if (dataDiagnosisService) {
                optionAllDiagnosisService.push({ label: dataDiagnosisService.name, value: dataDiagnosisService.id });
            }

            var dataListHospital = dataDianosisReport.hospital;
            if (dataListHospital) {
                optionAllHospital.push({ label: dataListHospital.name, value: dataListHospital.id });
            }

        }
      
        var optionStatus = [
            { value: "OPEN", label: "Khởi Tạo" },
            { value: "IN_PROGRESS", label: "Đang Xử Lý" },
            { value: "DONE", label: "Hoàn Tất" },
            { value: "CANCELLED", label: "Đã Hủy" },
        ]
        var elementSave = isEditale == true ? <button type="submit"  className="btn bg-success" disabled={submitting}> Lưu Lại</button> : null
        var elementCancel = isEditale == true ?  <button type="button" style={{marginRight:"20px"}} className="btn btn-default" onClick={this.handleHideAndClear} ><i class="icon-cross" aria-hidden="true"></i> Đóng</button>            : null
        var id = this.props.idDiagnosisReport;
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
                                            <Field disabled={id ? true : false} name="prescriptionId" label="Phiếu Khám" options={optionPrescription} component={RenderSelect}>  </Field>
                                            <Field name="quantity" label="Số Lượng" component={RenderHiddenInput}>  </Field>
                                        </div>
                                        <div className="col-md-6">
                                            <br />
                                            <Field disabled={id ? true : false} name="diagnosisServiceId" label="Dịch Vụ Chỉ Định(*)" options={optionAllDiagnosisService} component={RenderSelect}></Field>
                                        </div>
                                        {/* unused */}
                                        
                                        <div className="col-md-6">
                                            <br />
                                            <Field disabled={id ? true : false} name="hospitalId" label="Phòng Khám" placeholder="Phòng Khám..." options={optionAllHospital} component={RenderSelect}></Field>
                                        </div>
                                        <div className="col-md-6">
                                            <br />
                                            <Field disabled={id ? true : false} name="laboratoristId" label=" Người Thực Hiện" placeholder=" Nhân viên thực hiện ..." options={optionAllDoctor} component={RenderSelect}></Field>
                                        </div>
                                        <div className="col-md-6">
                                            <br />
                                            <Field name="diagnosisDate" label="Ngày Chỉ Định" label="Nhập ngày Chỉ Định " dateFormat="dd/MM/YYYY" component={RenderDatePicker}></Field>
                                        </div>
                                        <div className="col-md-6">
                                            <br />
                                            <Field disabled={id ? true : false} name="status" label="Trạng Thái" placeholder="Nhập Trạng Thái..." options={optionStatus} component={RenderSelect}></Field>
                                        </div>
                                        <div className="col-md-12">
                                            <br />
                                            <Field disabled={isActiveDoctor ? false : true} name="description" label="Mô Tả" placeholder="Nhập mô tả ..." rows={5} component={RenderTextArea}></Field>
                                        </div>
                                        <div className="col-md-12">
                                            <br />
                                            <Field disabled={isActiveDoctor ? false : true} name="diagnose" label="Chẩn Đoán" placeholder="Nhập Chẩn Đoán ..." row={2} component={RenderTextArea}></Field>
                                        </div>
                                        <div className="col-md-12">
                                            <br />
                                            <Field name="diagnosisReportlUploadFile" label="File Kết Quả" component={ListFile} modalUrl="/uploadDiagnosisReportFile"></Field>
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
            form: 'ModalDiagnosisReport',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalDiagnosisReport)));
