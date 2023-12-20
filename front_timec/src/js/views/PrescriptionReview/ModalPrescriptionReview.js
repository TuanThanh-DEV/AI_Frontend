import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderSelect,RenderDatePickerWithTime } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_PRESCRIPTIONREVIEW } from './action-types';


const validate = values => {
    const errors = {};
    if(!values.reviewerId){
        errors.reviewerId = "Vui lòng nhập người chấm điểm!"
    }
    if(!values.prescriptionId){
        errors.prescriptionId =  "Vui lòng nhập người chấm điểm!"
    }
    if(!values.doctorId){
        errors.doctorId =  "Vui lòng nhập người chấm điểm!"
    }
    if(!values.score){
        errors.score = "Vui lòng nhập điểm!"
    }
    if(!values.createdDate){
        errors.createdDate = "Vui lòng nhập ngày chấm điểm!"
    } if(!values.status){
        errors.status = "Vui lòng nhập trạng thái!"
    }
    if (values.score > 100 || values.score < 0) {
        errors.score = 'Số điểm chỉ tự 0-100 vui lòng nhập lại!'
    }
    return errors;
}
var today = new Date();
const mapStateToProps = state => {
    var updateValue = {
        ...state.prescriptionReviewReducer.updatingPrescriptionReview,
        // finishDate: state.prescriptionReviewReducer.updatingPrescriptionReview && state.prescriptionReviewReducer.updatingPrescriptionReview.finishDate ?
        //  moment(state.prescriptionReviewReducer.updatingPrescriptionReview.finishDate) : today,
    };
    return {
        initialValues: updateValue
    };
};
const mapDispatchToProps = dispatch => ({
    loadPrescriptionReview: (payload) =>
        dispatch({ type: LOAD_UPDATING_PRESCRIPTIONREVIEW, payload: payload }),
        updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalPrescriptionReview", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});
class ModalPrescriptionReview extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listAllPersonel:[],
            listAllPrescription:[],
        }

        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.handleLoadDoctorByPrescriptionId=(prescriptionId)=>{
            const {updateField} = this.props;
            var dataPrescription =  this.state.listAllPrescription;
            if(dataPrescription){
                dataPrescription.map(item=>{
                        if(prescriptionId==item.id){
                            setTimeout(() => {
                            updateField("doctorId",item.user.id);
                        }, 50);
                        }
                    })
                }
        }
     };

    
    getlistAllReviewer(){
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

    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        onHide();
        destroy(); }
    handleAdd(values) {
        var onHide = this.props.onHide;
        
        var id = this.props.idPrescriptionReview;
        var url = '/prescriptionReview/add';
        var bodyObject = {
            reviewerId: values.reviewerId,
            prescriptionId: values.prescriptionId,
            doctorId: values.doctorId,
            score: values.score,
            createdDate: values.createdDate,
            dueDate: values.dueDate,
            finishDate:values.finishDate,
            note: values.note,
            status: values.status,
        };
        if (id) {
            url = '/prescriptionReview/update';
            bodyObject.id = id;
        }
        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && result.id) {
                onHide();
                toast.info("Lưu Thành Công.", {autoClose: 1000});
            } else {
                toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    };

    componentWillMount() {
        const { loadPrescriptionReview } = this.props;
        var id = this.props.idPrescriptionReview;
        
            const dataPromise = agent.PrescriptionReviewApi.getPrescriptionReview(id);
            loadPrescriptionReview(Promise.resolve(dataPromise))
        

        this.getlistAllReviewer();
        this.getlistAllPrescription();
    }
    render() {
        const { handleSubmit, submitting, title, invalid } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show,bsSize:"lg",  
        onHide: this.props.onHide, 
        submitting: this.props.submitting };

        
        var optionReviewer = []; 
        this.state.listAllPersonel.map(item=>{
            optionReviewer.push({label:item.fullName, value:item.id})
        })
        var optionPrescription = []; 
        this.state.listAllPrescription.map(item=>{
            optionPrescription.push({label:item.user.fullName +' - '+(item.department? item.department.name: null), value:item.id})
        })
        var optionDoctor = []; 
        this.state.listAllPersonel.map(item=>{
            optionDoctor.push({label:item.fullName, value:item.id})
        })
            var status=[
                {label:"Mở",value:"OPEN",},
                {label:"Đang Chấm Điểm",value:"IN_PROGRESS",},
                {label:"Hoàn Thành",value:"DONE",}
            ]



       


        var id = this.props.idPrescriptionReview;
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
                                        <br/>
                                        <Field disabled={id?true:false} name="reviewerId" label="Người Chấm Điểm(*)" options={optionReviewer} component={RenderSelect}></Field>
                                        </div>
                                        <div className="col-md-6"> 
                                        <br/>
                                        <Field disabled={id?true:false} name="prescriptionId" label="Phiếu Khám(*)"  placeholder="Chọn phiếu khám..." options={optionPrescription}
                                        onChangeAction={(value)=>this.handleLoadDoctorByPrescriptionId(value)} component={RenderSelect} ></Field>
                                        </div>
                                        <div className="col-md-6"> 
                                        <br/>
                                        {!id?
                                        <Field  name="doctorId" label="Bác Sĩ(*)" options={optionDoctor} component={RenderSelect}></Field>:
                                        <Field disabled={id?true:false} name="doctorId" label="Bác Sĩ(*)"options={optionDoctor} component={RenderSelect}></Field>
                                        }
                                        </div>
                                        <div className="col-md-6"> 
                                        <br/>
                                        <Field name="createdDate" label="Ngày Chấm Điểm(*)" placeholder="Nhập ngày chấm điểm..." component={RenderDatePickerWithTime}></Field>
                                        </div>
                                        <div className="col-md-6"> 
                                        <br/>
                                        <Field name="dueDate" label="Thời Hạn"  component={RenderDatePickerWithTime}></Field>
                                        </div>
                                        <div className="col-md-6 hidden"> 
                                        <Field disabled={id?true:false} name="finishDate" label="Ngày Hoàn Thành" placeholder="Nhập ngày hoàn thành..." component={RenderDatePickerWithTime}></Field>
                                        </div>
                                        <div className="col-md-6"> 
                                        <br/>
                                        <Field name="score" label="Điểm(*)" placeholder="Nhập điểm..." component={RenderInputWithDiv}></Field>
                                        </div>
                                        <div className="col-md-12"> 
                                        <br/>
                                        <Field name="note" label="Ghi Chú" placeholder="Nhập ghi chú..." component={RenderInputWithDiv}></Field>
                                        </div>
                                        <div className="col-md-12"> 
                                        <br/>
                                        <Field name="status" label="Trạng Thái(*)" options={status} component={RenderSelect}></Field>
                                        </div>

                                    </div>
                                </div> 


                                
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
            form: 'ModalPrescriptionReview',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalPrescriptionReview)));
