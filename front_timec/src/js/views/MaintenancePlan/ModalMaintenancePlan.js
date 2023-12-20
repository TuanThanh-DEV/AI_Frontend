import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import {  RenderTextArea, RenderDatePicker,  RenderSelect } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_MAINTENANCEPLAN } from './action-types';
import moment from 'moment';

var today = new Date();
const validate = values => {
    const errors = {};
    if (!values.createdDate) {
        errors.createdDate = "Vui lòng chọn Ngày Nhập!"
    }
    if (!values.planDate) {
        errors.planDate = "Vui lòng chọn Ngày Nhập!"
    }
    if (values.planDate < values.createdDate) {
        errors.planDate = "Vui lòng chọn lại ngày lớn hơn!"
    }
    return errors;
}
const mapStateToProps = state => {
    var updateValue = {
        ...state.maintenancePlanReducer.updatingMaintenancePlan,
        createdDate: state.maintenancePlanReducer.updatingMaintenancePlan && state.maintenancePlanReducer.updatingMaintenancePlan.createdDate ? moment(state.maintenancePlanReducer.updatingMaintenancePlan.createdDate) : null,
        planDate: state.maintenancePlanReducer.updatingMaintenancePlan && state.maintenancePlanReducer.updatingMaintenancePlan.planDate ? moment(state.maintenancePlanReducer.updatingMaintenancePlan.planDate) : null,
             };
    return {
        initialValues: updateValue
    };
};
const mapDispatchToProps = dispatch => ({
    loadMaintenancePlan: (payload) =>
        dispatch({ type: LOAD_UPDATING_MAINTENANCEPLAN, payload: payload })
});
class ModalMaintenancePlan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllDevice:[],
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
     };
    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        onHide();
        destroy(); }
    handleAdd(values) {
        var onHide = this.props.onHide;
        var id = this.props.idMaintenancePlan;
        var url = '/maintenancePlan/add';
        var bodyObject = {
            deviceId: values.deviceId,
            createdDate: values.createdDate,
            planDate: values.planDate,
            status: values.status,
            note: values.note
        };
        if (id) {
            url = '/maintenancePlan/update';
            bodyObject.id = id;
        }
        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && result.id) {
                onHide();
                toast.success("Lưu Thành Công", { autoClose: 1000, position: toast.POSITION.TOP_RIGHT});
            } else {
                toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    };

    componentWillMount() {
   
        const { loadMaintenancePlan} = this.props;
        var id = this.props.idMaintenancePlan;
            const dataPromise = agent.MaintenancePlanApi.getMaintenancePlan(id);
            loadMaintenancePlan(Promise.resolve(dataPromise))
        this.getlistAllDevice();
    }
    getlistAllDevice(){
        let setStateInRequest = (list) => { this.setState({ listAllDevice: list }) }
        return agent.DeviceApi.listAllDevice().then(function (res) {
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
        const { handleSubmit, submitting, title} = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show,bsSize:"medium",
        onHide: this.props.onHide, 
        submitting: this.props.submitting };
      

        var optionUserDevice = []; 
        this.state.listAllDevice.map(item=>{
            optionUserDevice.push({label:item.name,value:item.id})
        })
        
        
        var id = this.props.idMaintenancePlan;
        var newModal = null;
        var optionStatus = [
            {label: "Mở", value: "OPEN" },
            {label: "Đóng", value: "DONE" },
            {label: "Hủy Bỏ", value: "CANCELLED" }
        ];
        newModal =
            <div style={{ width: '30%' }}>
                <Modal
                    {...modalConfig}
                    aria-labelledby="contained-modal-title-lg" 
                >
        
            
                    <Modal.Header closeButton>
                        <Modal.Title  id="contained-modal-title-large"><center>{title}</center></Modal.Title>
                   
                       </Modal.Header>  
                    
                    <Modal.Body>
                        {submitting ? <LoadingScreen /> :
                            <form className="form-horizontal" role="form" onSubmit={handleSubmit(this.handleAdd)}>
                                <div className="form-group"> 
                                <div className="row">
                                <div className="col-md-6">                                 
                                <Field name="deviceId" label="Tên Thiết Bị (*)" placeholder="Vui lòng chọn Thiết Bị..." options={optionUserDevice} component={RenderSelect}></Field>                  
                                </div>
                                <div className="col-md-6">
                                <Field name="status" label="Trạng Thái" options={optionStatus} component={RenderSelect}></Field>             
                                </div>    
                                <div className="col-md-6"> 
                                <br/>
                                <Field name="createdDate" label="Ngày Tạo" component={RenderDatePicker}></Field>  
                                </div>
                                <div className="col-md-6"> 
                                <br/>
                                <Field name="planDate" label="Ngày Kế Hoạch" component={RenderDatePicker}></Field>  
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
            </div>
        return newModal;
    }
};
export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'ModalMaintenancePlan',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalMaintenancePlan)));
