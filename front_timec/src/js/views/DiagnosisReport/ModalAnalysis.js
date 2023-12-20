import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv,  RenderTextArea, RenderSelect,RenderDatePickerWithTime, RenderHiddenInput } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_DIAGNOSISREPORT } from './action-types';
import moment from 'moment';

const validate = values => {
    const errors = {};
    return errors;
}
var today = moment(new Date,"DD/MM/YYYY HH:mm");
const mapStateToProps = state => {
    var updateValue = {
        ...state.diagnosisReportReducer.updatingDiagnosisReport,
        diagnosisDate: state.diagnosisReportReducer.updatingPrescription && state.diagnosisReportReducer.updatingPrescription.diagnosisDate ? moment(state.diagnosisReportReducer.updatingPrescription.diagnosisDate) : today,
    };
    return {
        initialValues: updateValue
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
            listAllDiagnosService: [],
            listAllPersonel: [],
            listAllHospital: [],
            listAllPrescription: [],

        }

        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
     };

     getlistAllDiagnosisReport(){
        let setStateInRequest = (list) => { this.setState({ listAllDiagnosisReport: list }) }
        return agent.DiagnosisReportApi.listAllDiagnosisReport(
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

    getlistAllPrescription(){
        let setStateInRequest = (list) => { this.setState({ listAllPrescription: list }) }
        return agent.PrescriptionApi.listAllPrescription(
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
    getlistAllDoctor() {
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
getlistAllHospital() {
        let setStateInRequest = (list) => { this.setState({ listAllHospital: list }) }
        return agent.HospitalApi.listAllHospital(
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

    getlistAllDiagnosisService(){
        let setStateInRequest = (list) => { this.setState({ listAllDiagnosService: list }) }
        return agent.DiagnosisServiceApi.listAllDiagnosisService(
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

    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        onHide();
        destroy(); }
    handleAdd(values) {
        var onHide = this.props.onHide;
        var id = this.props.idDiagnosisReport;
        var url = '/diagnosisReport/add';
        var bodyObject = {
            fileName: values.fileName,
            reportType:values.reportType,
            prescriptionId: values.prescriptionId,
            description: values.description,
            diagnosisDate:values.diagnosisDate,
            laboratoristId: values.laboratoristId,
            hospitalId:values.hospitalId,
            diagnosisServiceId: values.diagnosisServiceId,
            quantity: values.quantity
        };
        if (id) {
            url = '/diagnosisReport/update';
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
        const { loadDiagnosisReport,updateField,
            hospitalId,
            doctorId } = this.props;
        var id = this.props.idDiagnosisReport;
       {
            const dataPromise = agent.DiagnosisReportApi.getDiagnosisReport(id);
            loadDiagnosisReport(Promise.resolve(dataPromise))
        }

        this.getlistAllPrescription();
        this.getlistAllDoctor();
        this.getlistAllHospital();
        this.getlistAllDiagnosisService();
        
       
       if(doctorId){
        updateField("laboratoristId",doctorId);

       }
       if(hospitalId){
        updateField("hospitalId",hospitalId);

       }
    }
    render() {
        const { handleSubmit, submitting, title, invalid } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show,bsSize:"sm",  
        onHide: this.props.onHide, 
        submitting: this.props.submitting };

        var optionAllDiagnosisService=[];
        var dataListDiagnosisService = this.state.listAllDiagnosService;
        if(dataListDiagnosisService){
            dataListDiagnosisService.map(item=>{
                optionAllDiagnosisService.push({label:item.name,value:item.id});
            })
        }
        var optionPrescription =[];
        var dataPrescription = this.state.listAllPrescription;
        if(dataPrescription){
            dataPrescription.map(item => {
                optionPrescription.push({ label: item.id, value: item.id });
            })
    }


        var optionAllDoctor = [];
        var dataListDoctor = this.state.listAllPersonel;
        if (dataListDoctor) {
            dataListDoctor.map(item => {
                optionAllDoctor.push({ label: item.fullName, value: item.id });
            })
        }
        var optionAllHospital = [];
        var dataListHospital = this.state.listAllHospital;
        if (dataListHospital) {
            dataListHospital.map(item => {
                optionAllHospital.push({ label: item.name, value: item.id });
            })
        }

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
                                <Field name="reportType" label="Kiểu Chỉ Định" placeholder="Kiểu Chỉ Định ..." component={RenderInputWithDiv}></Field>
                                <Field name="fileName" label="Tên(*)" placeholder="Nhập tên..." component={RenderInputWithDiv}></Field>
                                <Field name="prescriptionId" label="ID Thuốc" options={optionPrescription}component={RenderSelect}>  </Field>
                                <Field name="description" label="Mô tả"    placeholder="Nhập mô tả ..." row={3} component={RenderTextArea}></Field>
                                <Field name="diagnosisDate" label="Ngày Chỉ Định" label="Nhập ngày Chỉ Định "  dateFormat="dd/MM/yyyy hh:mm:aa"  component={RenderDatePickerWithTime}></Field>
                                <Field name="laboratoristId" label=" Nhân Viên Chỉ Định" placeholder=" Nhân viên Chỉ Định ..." options={optionAllDoctor}component={RenderSelect}></Field>
                                <Field name="hospitalId" label=" Bệnh Viện" placeholder=" Bệnh Viện ..." options={optionAllHospital}component={RenderSelect}></Field>
                               
                                <Field name="diagnosisServiceId" label="Dịch vụ Chỉ Định"  options={optionAllDiagnosisService}component={RenderSelect}></Field>
                                <Field name="quantity" label="Số lượng"  component={RenderHiddenInput}></Field>
                                
                                <div className="text-right">
                                <button type="button" style={{marginRight:"20px"}} className="btn btn-default" onClick={this.handleHideAndClear} ><i class="icon-cross" aria-hidden="true"></i> Đóng</button>                                
                                <button type="submit"  className="btn bg-success" disabled={submitting}> Lưu Lại</button>
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
