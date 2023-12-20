import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import {  RenderTextArea,  RenderSelect } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_PATIENTBOOKINGGROUP } from './action-types';
import ModalPatient from '../Patient/ModalPatient';

const validate = values => {
    const errors = {};
    if(!values.name){
        errors.name = "Vui lòng nhập!"
    }
    return errors;
}

const mapStateToProps = state => {
    var updateValue = {
        ...state.patientBookingGroupReducer.updatingPatientBookingGroup,
        status: state.patientBookingGroupReducer.updatingPatientBookingGroup && state.patientBookingGroupReducer.updatingPatientBookingGroup.status ? state.patientBookingGroupReducer.updatingPatientBookingGroup.status: "DANG_CHO",
        type: state.patientBookingGroupReducer.updatingPatientBookingGroup && state.patientBookingGroupReducer.updatingPatientBookingGroup.type ? state.patientBookingGroupReducer.updatingPatientBookingGroup.type: "KHONG_UU_TIEN"
        
    };
    return {
        initialValues: updateValue ,
    };
};
const mapDispatchToProps = dispatch => ({
    loadPatientBookingGroup: (payload) =>
        dispatch({ type: LOAD_UPDATING_PATIENTBOOKINGGROUP, payload: payload }),
        updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalPatientBookingGroup", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});
class ModalPatientBookingGroup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listAllBookingGroup: [],
            listAllPatient : [],
            isPatientModalShown: false,
            listPatientBookingCheck:[] // This list check patient has been booked or open 
                                        // remember to disabled patient has been booked or open

        }
       
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.handlShowModalPatient = this.handlShowModalPatient.bind(this);
        this.onReloadAndFillDataModalParent = this.onReloadAndFillDataModalParent.bind(this);
        this.handleHidemodal = () => {
            this.setState({ isPatientModalShown: false });
        };
      
     };

     onReloadAndFillDataModalParent(patientId){ 
        const { updateField} = this.props;
        this.getlistAllPatient();
        updateField("patientId",patientId);


     }
     
     getlistAllPatient(){
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
            +" Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });

    }
     getListPatientBookingCheck(){
        let setStateInRequest = (list) => { this.setState({ listPatientBookingCheck: list }) }
        return agent.asyncRequests.get("/patientBookingGroup/findByStatusCheck"
        ).then(function (res) {
            var result = res.body.resultData;
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
    getlistAllBookingGroup(){
        let setStateInRequest = (list) => { this.setState({ listAllBookingGroup: list }) }
        return agent.BookingGroupApi.listAllBookingGroup(
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
    handlShowModalPatient(id) {
        this.setState({
            isPatientModalShown: true,
            idPatient: id
        });
    }
   
    componentWillMount() {
        const { loadPatientBookingGroup,updateField,idCompany } = this.props;
        var id = this.props.idPatientBookingGroup;
       {
            const dataPromise = agent.PatientBookingGroupApi.getPatientBookingGroup(id);
            loadPatientBookingGroup(Promise.resolve(dataPromise))
        }
        if(!id&&idCompany){
            updateField("bookingGroupId",idCompany.id)
             
            }
    return(
        this.getlistAllPatient(), 
        this.getlistAllBookingGroup(),
        this.getListPatientBookingCheck() 
    )
 
    }
    
    handleAdd(values) {
        // var onHide = this.props.onHide;
        var handleAfterSave = this.props.handleAfterSave;
        var id = this.props.idPatientBookingGroup;
        var url = '/patientBookingGroup/add';
        var bodyObject = {
            bookingGroupId: values.bookingGroupId,
            patientId: values.patientId,
            status: values.status,
            note:values.note

        };
        if (id) {
            url = '/patientBookingGroup/update';
            bodyObject.id = id;
        }
        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && result.id) {
                handleAfterSave();
                toast.success("Lưu Thành Công", { autoClose: 1000, position: toast.POSITION.TOP_RIGHT});
            } else {
                toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
                 });
    };
    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        onHide();
        destroy(); }
    

    render() {
        const { handleSubmit, submitting, title, invalid,isUpdateStatus } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show,bsSize:"sm",  
        onHide: this.props.onHide, 
        submitting: this.props.submitting };
        const  dataBookingGroup= this.state.listAllBookingGroup;
        const dataPatient = this.state.listAllPatient;
        const dataPatientBookingCheck = this.state.listPatientBookingCheck;
        var optionAllBookingGroup = [];
        var optionAllPatient = [];
        var arrayPatientIdsBookingCheck = [];
        if(dataPatientBookingCheck){
            dataPatientBookingCheck.map(item=>{
                arrayPatientIdsBookingCheck.push(item.patientId);
            })
           
        }
        if(dataBookingGroup){
            dataBookingGroup.map(item=>{
                optionAllBookingGroup.push({label: item.company.name,value:item.id})
            })
        }
        console.log(arrayPatientIdsBookingCheck);
        if(dataPatient){
            dataPatient.map(item=>{ 
                if(arrayPatientIdsBookingCheck.includes(item.id)){
                    optionAllPatient.push({label: item.fullName ,value:item.id,disabled: true})
                }else{
                    optionAllPatient.push({label: item.fullName,value:item.id})
                }
            })  
        }

        var optionPatientBookingGroupStatus = [
            {label:"Mở",value:"OPEN"},
            {label:"Đặt Lịch",value:"BOOKED"},
            {label:"Hoàn Thành",value:"DONE"},
            {label:"Hủy Bỏ",value:"CANCELLED"},
        ];

     

        var id = this.props.idPatientBookingGroup;
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
                         <div className="col-md-12">                                 
                         <Field name="patientId" label="Chọn Bệnh Nhân Để Khám" options={optionAllPatient} component={RenderSelect}></Field>
                         Chưa Đăng Kí Thông Tin Người Bệnh? <button class="label bg-teal" onClick={() => this.handlShowModalPatient()}> + </button>
                         </div>
                         <div className="col-md-6 hidden"> 
                         <br/>
                         <Field name="bookingGroupId" label="Chọn Nhóm Công Ty" options={optionAllBookingGroup} component={RenderSelect}></Field>                  
                         </div>    
                         <div className="col-md-12"> 
                         <br/>
                         <Field name="status" label="Trạng Thái"  options={optionPatientBookingGroupStatus} component={RenderSelect}></Field>     
                         </div>
                         <div className="col-md-12"> 
                         <br/>
                         <Field name="note" label="Ghi Chú" placeholder="Nhập nội dung ghi chú..." row={3} component={RenderTextArea}></Field>                              
                         </div>                                                        
                         </div>
                         <br/>
                         <div className="text-right">
                         <button type="button" style={{marginRight:"20px"}} className="btn btn-default" onClick={this.handleHideAndClear} ><i class="icon-cross" aria-hidden="true"></i> Đóng</button>                                
                         <button type="submit"  className="btn bg-success" disabled={submitting}> Lưu Lại</button>
                              </div>
                         </div>            
                     </form>
                        }
                    </Modal.Body>
                </Modal>
                {this.state.isPatientModalShown ? <ModalPatient 
                    title="Thêm Mới Bệnh Nhân" 
                    idPatient={this.state.idPatient} 
                    isAddParentFromBookingModal= {true}
                    onReloadAndFillDataModalParent = {this.onReloadAndFillDataModalParent}
                    show={this.state.isPatientModalShown} 
                    onHide={this.handleHidemodal} /> : null
                }
            </div>
        return newModal;
    }
};


export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'ModalPatientBookingGroup',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalPatientBookingGroup)));
