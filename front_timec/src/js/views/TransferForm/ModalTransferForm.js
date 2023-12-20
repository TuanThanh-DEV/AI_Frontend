import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderDatePicker, RenderCheckbox, RenderSelect } from '../../components/formInputs';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_TRANSFERFORM } from './action-types';
import moment from 'moment';

const validate = values => {
    const errors = {};
    // if (!values.cls) {
    //     errors.cls = 'Vui lòng nhập dấu hiệu lâm sàng'
    // }
    // if (!values.transferHospitalId) {
    //     errors.transferHospitalId = 'Vui lòng nhập dấu hiệu lâm sàng'
    // }

    return errors;
}
const selector = formValueSelector('ModalTransferForm');
var today = moment(new Date, "DD/MM/YYYY");

const mapStateToProps = state => {
    var updateValue = {
        ...state.transferFormReducer.updatingTransferForm,
        createdDate: state.transferFormReducer.updatingTransferForm && state.transferFormReducer.updatingTransferForm.createdDate ? moment(state.transferFormReducer.updatingTransferForm.createdDate) : today,
        transferDate: state.transferFormReducer.updatingTransferForm && state.transferFormReducer.updatingTransferForm.transferDate ? moment(state.transferFormReducer.updatingTransferForm.transferDate) : null,
        transferType: state.transferFormReducer.updatingTransferForm && state.transferFormReducer.updatingTransferForm.transferType ? state.transferFormReducer.updatingTransferForm.transferType : 'EMERGENCY',
    };
    return {
        initialValues: updateValue,
        currentUser: state.common.currentUser,
        transferType: selector(state, "transferType"),
    };
};
const mapDispatchToProps = dispatch => ({
    loadTransferForm: (payload) =>
        dispatch({ type: LOAD_UPDATING_TRANSFERFORM, payload: payload }),
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalTransferForm", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});
class ModalTransferForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllTransferHospital: [],
            prescription: null,
            user: null
        }

        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.handleChangePrescription = (objFromGetPrescription) => {
            const { updateField } = this.props;
            setTimeout(() => {
                updateField("insuranceCardLink", objFromGetPrescription.insuranceType ? objFromGetPrescription.insuranceType.name : "");
                updateField("doctorFullName", objFromGetPrescription.user ? objFromGetPrescription.user.fullName : "N/A");
                updateField("departmentNameLink", objFromGetPrescription.department ? objFromGetPrescription.department.name : "N/A");
                updateField("cls", objFromGetPrescription.cls);
                updateField("analysis", objFromGetPrescription.analysis);
                updateField("transferDate", today);
            }, 100);
        }
    };
    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        onHide();
        destroy();
    }

    getlistAllTransferHospital() {
        let setStateInRequest = (list) => { this.setState({ listAllTransferHospital: list }) }
        return agent.TransferHospitalApi.listAllTransferHospital(
        ).then(function (res) {
            var result = res.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
            +" Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    }
    getPrescription(prescriptionId) {
        const { updateField } = this.props;
        const handleChangePrescription = this.handleChangePrescription;
        let setStateInRequest = (list) => { this.setState({ prescription: list }) }
        return agent.PrescriptionApi.getPrescription(prescriptionId
        ).then(function (res) {
            var result = res.resultData;
            if (result) {
                setStateInRequest(result);
                if (prescriptionId && prescriptionId != 'new') {
                    updateField("prescriptionId", prescriptionId);
                    handleChangePrescription(result)
                } else {
                    return;
                }
            } else {
                toast.error("Có lỗi khi tải dữ liệu. " + result.errorMessage ? +" Lỗi: " + result.errorMessage : "", { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    }

    getUserCreate(userId) {
        const { updateField } = this.props;
        let setStateInRequest = (list) => { this.setState({ user: list }) }
        return agent.UserApi.getPersonel(userId
        ).then(function (res) {
            var result = res.resultData;
            if (result) {
                setStateInRequest(result);
                updateField("createdById", result.id)
            } else {
                toast.error("Có lỗi khi tải dữ liệu. " + result.errorMessage ? +" Lỗi: " + result.errorMessage : "", { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    }

    handleAdd(values) {
        const { updateField, initialValues } = this.props;
        var onHide = this.props.onHide;
        var url = '/transferForm/add';

        
        var bodyObject = {
            ...initialValues,
            ...values,
            prescriptionId: values.prescriptionId,
            transferHospitalId: values.transferHospitalId,
            createdById: values.createdById,
            createdDate: values.createdDate,
            cls: values.cls,
            diagnosisReports: values.diagnosisReports,
            analysis: values.analysis,
            therapyNote: values.therapyNote,
            patientStatus: values.patientStatus,
            transferReason: values.transferReason,
            treatmentGuide: values.treatmentGuide,
            transferDate: values.transferDate,
            transportMethod: values.transportMethod,
            transportPerson: values.transportPerson,
            shouldReview: values.shouldReview,
        };

        var id = this.props.idTransferForm;
        if (id) {
            url = '/transferForm/update';
            bodyObject.id = id;
            
        }
        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && result.id) {
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
        this.getlistAllTransferHospital();
        const { loadTransferForm, prescriptionId, idTransferForm, currentUser, updateField, destroy } = this.props;
        var this_ = this;
        var id = idTransferForm;
        // destroy();
        if (id != null) {
            // const dataPromise = agent.TransferFormApi.getTransferForm(idTransferForm);
            // transferForm
            return agent.asyncRequests.get("/transferForm/" + id
            ).then(function (res) {
                var result = res.body.resultData;
                if (result) {
                    loadTransferForm({ resultData: result })
                    setTimeout(() => {
                        this_.getPrescription(result.prescriptionId)
                        this_.getUserCreate(result.createdById)
                    }, 100);

                } else {
                    toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
            });

        } else {
            loadTransferForm({ resultData: null })
            this.getPrescription(prescriptionId),
                updateField("createdById", currentUser.id)
        }
        
    }


    render() {
        const { handleSubmit, submitting, title, invalid, currentUser, transferType } = this.props;
        const modalConfig = {
            backdrop: 'static', show: this.props.show, bsSize: "lg",
            onHide: this.props.onHide,
            submitting: this.props.submitting
        };
        var dataPresciption = this.state.prescription;
        var optionPrescription = [];
        if (dataPresciption != null) {
            optionPrescription.push({ label: dataPresciption.patient ? dataPresciption.patient.fullName : "" , value: dataPresciption.id })
        }
        var optionAllTransferHospital = [];
        var dataListTransferHospital = this.state.listAllTransferHospital;
        if (dataListTransferHospital) {
            dataListTransferHospital.map(item => {
                optionAllTransferHospital.push({ label: item.name, value: item.id });
            })
        }
        var optionTransferType = [
            {label: "CHUYỂN VIỆN CẤP CỨU", value: 'EMERGENCY'},
            {label: "GIẤY GIỚI THIỆU", value: 'INTRODUCE'}
        ];
        var showCreatedUser = [];
        var dateUserCreate = this.state.user;
        if (dateUserCreate != null) {
            showCreatedUser.push({ label: dateUserCreate.fullName, value: dateUserCreate.id });
        } else {
            showCreatedUser.push({ label: currentUser.fullName, value: currentUser.id });
        }

        var newModal = null;
        newModal =
            <div style={{ width: '30%' }}>
                <Modal
                    {...modalConfig}
                    aria-labelledby="contained-modal-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-sm"><center>{transferType == 'EMERGENCY' ? 'GIẤY CHUYỂN VIỆN' : 'GIẤY GIỚI THIỆU'}</center> </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {submitting ? <LoadingScreen /> :
                            <form className="form-horizontal" role="form" onSubmit={handleSubmit(this.handleAdd)}>

                                <div className="form-group">
                                    <div className="row">
                                        <div className="col col-md-4">
                                            <Field disabled={true} name="prescriptionId" label="Sổ Bệnh Án Của Bệnh Nhân" placeholder="Chọn Sổ Bệnh Án Của Bệnh Nhân..." options={optionPrescription} component={RenderSelect} onChangeAction={(value) => this.handleChangePrescription(value)}></Field>
                                            <Field disabled={true} name="departmentNameLink" label="Khoa Điều Trị" component={RenderInputWithDiv}></Field>
                                            <Field name="transferHospitalId" label="Bệnh Viện Chuyển Đi (*)" options={optionAllTransferHospital} component={RenderSelect}></Field>
                                        </div>
                                        <div className="col col-md-4">
                                            <Field disabled={true} name="insuranceCardLink" label="Mã Y Tế" component={RenderInputWithDiv}></Field>
                                            <Field disabled={true} name="createdDate" label="Ngày Lập" placeholder="Nhập Ngày Lập..." dateFormat="DD/MM/YYYY" component={RenderDatePicker}></Field>
                                            <Field name="transferDate" label="Ngày Chuyển Viện" placeholder="Nhập Ngày Chuyển Viện..." dateFormat="DD/MM/YYYY" component={RenderDatePicker}></Field>
                                        </div>
                                        <div className="col col-md-4">
                                            <Field name="transferType" label="Loại phiếu chuyển" options={optionTransferType} component={RenderSelect}></Field>
                                            <Field disabled={true} name="doctorFullName" label="Tên Bác Sĩ Điều Trị" component={RenderInputWithDiv}></Field>
                                            <Field name="createdById" label="Người Lập" placeholder="Nhập Người Lập..." options={showCreatedUser} component={RenderSelect}></Field>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col col-md-6">
                                            <Field name="cls" label="Triệu Chứng Lâm Sàng" placeholder="Triệu Chứng Lâm Sàng Lấy Từ Phiếu Khám..." component={RenderInputWithDiv}></Field>
                                            <Field name="patientStatus" label="Tình Trạng Bệnh Nhân" placeholder="Nhập Tình Trạng Bệnh Nhân..." component={RenderInputWithDiv}></Field>
                                            <Field name="therapyNote" label="Phương Pháp Điều Trị" placeholder="Nhập Phương Pháp Điều Trị..." component={RenderInputWithDiv}></Field>
                                            <Field name="transferReason" label={transferType == 'EMERGENCY' ? "Lý Do Chuyển Viện" : "Lý Do Giới Thiệu"} placeholder="Nhập Lý Do Chuyển Viện..." component={RenderInputWithDiv}></Field>
                                            <Field name="transportPerson" label="Người Đưa Đi" placeholder="Nhập Người Đưa Đi..." component={RenderInputWithDiv}></Field>
                                        </div>
                                        <div className="col col-md-6">
                                            <Field name="analysis" label="Chẩn Đoán" placeholder="Chẩn Đoán Lấy Từ Phiếu Khám..." component={RenderInputWithDiv}></Field>
                                            <Field name="diagnosisReports" label="Các Chỉ Định" placeholder="Nhập Các Chỉ Định..." component={RenderInputWithDiv}></Field>
                                            <Field name="treatmentGuide" label="Hướng Điều Trị" placeholder="Nhập Hướng Điều Trị..." component={RenderInputWithDiv}></Field>
                                            <Field name="transportMethod" label="Phương Pháp Vận Chuyển" placeholder="Nhập Phương Pháp Vận Chuyển..." component={RenderInputWithDiv}></Field>
                                            {/* <Field name="shouldReview" label="Nội dung chuyên môn cần rút kinh nghiệm" checkLabel="Có" component={RenderCheckbox}></Field> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                <button type="button" style={{marginRight:"20px"}} className="btn btn-default" onClick={this.handleHideAndClear} ><i class="icon-cross" aria-hidden="true"></i> Đóng</button>           
                                    <button type="submit" className="btn bg-orange" disabled={submitting}>Lưu Lại</button>
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
            form: 'ModalTransferForm',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalTransferForm)));


