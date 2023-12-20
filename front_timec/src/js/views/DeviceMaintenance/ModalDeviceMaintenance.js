import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderTextArea, RenderSelect, RenderDatePickerWithTime } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_DEVICEMAINTENCANCE } from './action-types';

const validate = values => {
    const errors = {};
    if(!values.status){
        errors.status = "Vui lòng nhập nội dung cuộc hẹn!"
    }
    return errors;
}
const mapStateToProps = state => {
    var updateValue = {
        ...state.deviceMaintenanceReducer.updatingDeviceMaintenance,
             };
    return {
        initialValues: updateValue
    };
};
const mapDispatchToProps = dispatch => ({
    loadDeviceMaintenance: (payload) =>
        dispatch({ type: LOAD_UPDATING_DEVICEMAINTENCANCE, payload: payload })
});
class ModalDeviceMaintenance extends React.Component {
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
        var id = this.props.idDeviceMaintenance;
        var url = '/deviceMaintenance/add';
        var bodyObject = {
            deviceId: values.deviceId,
            maintenanceDate: values.maintenanceDate,
            cost: values.cost,
            note: values.note
        };
        if (id) {
            url = '/deviceMaintenance/update';
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
        const { loadDeviceMaintenance } = this.props;
        var id = this.props.idDeviceMaintenance;
     {
            const dataPromise = agent.DeviceMaintenanceApi.getDeviceMaintenance(id);
            loadDeviceMaintenance(Promise.resolve(dataPromise))
        }
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
      


        
        var  optionUserDevice = [];
        var datalistDevice = this.state.listAllDevice;
        if(datalistDevice){
            datalistDevice.map(item=>{
                optionUserDevice.push({label:item.name, value:item.id});
            })
        }
        var id = this.props.idDeviceMaintenance;
        var newModal = null;
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
                                <div className="col-md-12">                                 
                                <Field name="deviceId" label="Tên Thiết Bị (*)" placeholder="Vui lòng chọn Thiết Bị..." options={optionUserDevice} component={RenderSelect}></Field>                  
                                </div>
                                <div className="col-md-6"> 
                                <br/>
                                <Field name="maintenanceDate" label="Ngày Bảo Trì" dateFormat="dd/MM/yyyy hh:mm:aa"  component={RenderDatePickerWithTime}></Field>  
                                </div>
                                <div className="col-md-6"> 
                                <br/>
                                <Field name="cost" label="Giá Tiền (*)" placeholder="Nhập giá tiền..." component={RenderInputWithDiv}></Field>                     
                                </div>    
                                <div className="col-md-12"> 
                                <br/>
                                <Field name="note" label="Ghi Chú" placeholder="Nhập nội dung cuộc hẹn..." row={3} component={RenderTextArea}></Field>             
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
            form: 'ModalDeviceMaintenance',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalDeviceMaintenance)));
