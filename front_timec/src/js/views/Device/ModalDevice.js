import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderDatePicker, RenderSelect} from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_DEVICE } from './action-types';
import moment from 'moment';

const validate = values => {
    const errors = {};
    if(!values.name){
        errors.name = "Vui lòng nhập!"
    }
    if(!values.code){
        errors.code  = "Vui lòng nhập!"
    }
    if (moment(values.expiredDate) < moment(values.userDate) ) {
        errors.expiredDate = 'Hạn sử dụng không được nhỏ hơn ngày đưa vào sử dụng!, vui lòng thử lại!'
    }
    return errors;
}
const mapStateToProps = state => {
    var updateValue = {
        ...state.deviceReducer.updatingDevice,
        userDate: state.deviceReducer.updatingDevice && state.deviceReducer.updatingDevice.userDate ? moment(state.deviceReducer.updatingDevice.userDate) : null,
        expiredDate: state.deviceReducer.updatingDevice && state.deviceReducer.updatingDevice.expiredDate ? moment(state.deviceReducer.updatingDevice.expiredDate) : null,
    };
    return {
        initialValues: updateValue
    };
};
const mapDispatchToProps = dispatch => ({
    loadDevice: (payload) =>
        dispatch({ type: LOAD_UPDATING_DEVICE, payload: payload })
});
class ModalDevice extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listAllSupplier: [],
       }

        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
     };

     getlistAllSupplier(){
        let setStateInRequest = (list) => { this.setState({ listAllSupplier: list }) }
        return agent.SupplierApi.listAllSupplier(
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
        var id = this.props.idDevice;
        var url = '/device/add';
        var bodyObject = {
            code: values.code,
            name:values.name,
            deviceCategory:values.deviceCategory,
            madeIn: values.madeIn,
            supplierId: values.supplierId,
            userDate:values.userDate,
            expiredDate:values.expiredDate,
            maintenanceCycle: values.maintenanceCycle
        };
        if (id) {
            url = '/device/update';
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
        const { loadDevice } = this.props;
        var id = this.props.idDevice;
       {
            const dataPromise = agent.DeviceApi.getDevice(id);
            loadDevice(Promise.resolve(dataPromise))
        }

    
        this.getlistAllSupplier();
    }
    render() {
        const { handleSubmit, submitting, title, invalid } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show,bsSize:"sm",  
        onHide: this.props.onHide, 
        submitting: this.props.submitting };

        var optionAllSupplier=[];
        var dataListSupplier = this.state.listAllSupplier;
        if(dataListSupplier){
            dataListSupplier.map(item=>{
                optionAllSupplier.push({label:item.name,value:item.id});
            })
        }
        var optionDeviceCategory = [
            {label: "Thiết Bị Xét Nghiệm",value: "DIAGNOSIS"},
            {label: "Thiết Bị Thường",value: "NOMAL"}
        ]
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
                                        <Field name="code" label="Mã Thiết Bị" placeholder="Nhập mã thiết bị ..." component={RenderInputWithDiv}></Field>
                                        </div>

                                        <div className="col-md-6"> 
                                        <br/>
                                        <Field name="name" label="Tên Thiết Bị" placeholder="Nhập tên thiết bị ..." component={RenderInputWithDiv}></Field>
                                        </div>

                                        <div className="col-md-6"> 
                                        <br/>
                                        <Field name="deviceCategory" label="Nhóm  " placeholder="Nhập nhóm thiết bị ..." options={optionDeviceCategory} component={RenderSelect}></Field>
                                        </div>

                                        <div className="col-md-6"> 
                                        <br/>
                                        <Field name="madeIn" label="Xuất xứ "    placeholder="Nhập xuất xứ ..." component={RenderInputWithDiv}></Field>
                                        </div>

                                        <div className="col-md-6"> 
                                        <br/>
                                        <Field name="supplierId" label="Nhà cung cấp"    options={optionAllSupplier} component={RenderSelect}></Field>
                                        </div>

                                        <div className="col-md-6"> 
                                        <br/>
                                        <Field name="userDate" dateFormat="DD/MM/YYYY" label="Ngày đưa vào sử dụng " placeholder="Nhập ngày đưa vào sử dụng  ..."component={RenderDatePicker}></Field>
                                        </div>

                                        <div className="col-md-6"> 
                                        <br/>
                                        <Field name="expiredDate" dateFormat="DD/MM/YYYY" label="Hạn sử dụng  " placeholder="Nhập hạn sử dụng    ..."component={RenderDatePicker}></Field>
                                        </div>
                                        
                                        <div className="col-md-6"> 
                                        <br/>
                                        <Field name="maintenanceCycle" label="Chu kì bảo dưỡng  " placeholder="Nhập chu kì bảo dưỡng ..." component={RenderInputWithDiv}></Field>
                                        </div>
                                    </div>
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
            form: 'ModalDevice',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalDevice)));















       