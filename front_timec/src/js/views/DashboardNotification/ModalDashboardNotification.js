import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderTextArea, RenderDatePicker,  RenderSelect} from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_DASHBOARDNOTIFICATION } from './action-types';
import moment from 'moment';
const validate = values => {
    const errors = {};
    if(!values.title){
        errors.title = "Vui lòng nhập tên thông báo!"
    }  
    if(!values.description){
        errors.description = "Vui lòng nhập nội dung thông báo!"
    }  
    if (moment(values.toDate) < moment(values.fromDate)) {
        errors.toDate = 'Ngày kết thúc nhỏ hơn ngày bắt đầu!, vui lòng thử lại!'
    }
    return errors;
}
const mapStateToProps = state => {
    var updateValue = {
        ...state.dashboardNotificationReducer.updatingDashboardNotification,
        fromDate: state.dashboardNotificationReducer.updatingDashboardNotification && state.dashboardNotificationReducer.updatingDashboardNotification.fromDate ? moment(state.dashboardNotificationReducer.updatingDashboardNotification.fromDate) : null,
        toDate: state.dashboardNotificationReducer.updatingDashboardNotification && state.dashboardNotificationReducer.updatingDashboardNotification.toDate ? moment(state.dashboardNotificationReducer.updatingDashboardNotification.toDate) : null,
   };
    return {
        initialValues: updateValue
    };
};
const mapDispatchToProps = dispatch => ({
    loadDashboardNotification: (payload) =>
        dispatch({ type: LOAD_UPDATING_DASHBOARDNOTIFICATION, payload: payload })
});
class ModalDashboardNotification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllHospital:[],
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
        var id = this.props.idDashboardNotification;
        var url = '/dashboardNotification/add';
        var bodyObject = {
            title: values.title,
            description: values.description,
            fromDate: values.fromDate,
            toDate: values.toDate,
            hospitalId: values.hospitalId
        };
        if (id) {
            url = '/dashboardNotification/update';
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
        const { loadDashboardNotification } = this.props;
        var id = this.props.idDashboardNotification;
            const dataPromise = agent.DashboardNotificationApi.getDashboardNotification(id);
            loadDashboardNotification(Promise.resolve(dataPromise))
        
        this.getlistAllHospital();
    }
    getlistAllHospital(){
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
        const { handleSubmit, submitting, title, invalid } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show,bsSize:"medium",  
        onHide: this.props.onHide, 
        submitting: this.props.submitting };
        var id = this.props.idDashboardNotification;
        var optionUserHospital = []; 
        this.state.listAllHospital.map(item=>{
            optionUserHospital.push({label:item.name,value:item.id})
        })
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
                                <Field name="title" label="Tên Thông Báo (*)" placeholder="Nhập tên thông báo..." component={RenderInputWithDiv}></Field>
                                <Field name="description" label="Nội Dung Thông Báo (*)" placeholder="Nhập nội dung thông báo..." row={3} component={RenderTextArea}></Field>
                                </div>
                                <div className="col-md-4"> 
                                <br/>
                                <Field name="fromDate" label="Ngày Bắt Đầu" component={RenderDatePicker}></Field>  
                                </div>
                                <div className="col-md-4"> 
                                <br/>
                                <Field name="toDate" label="Ngày Kết Thúc"  component={RenderDatePicker}></Field>  
                                </div>                       
                                <div className="col-md-4">     
                                <br/>                    
                                <Field name="hospitalId" label="Phòng Khám(*)"  options={optionUserHospital} component={RenderSelect}></Field>   
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
            form: 'ModalDashboardNotification',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalDashboardNotification)));
