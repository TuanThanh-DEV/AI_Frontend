import React from 'react';
import { Modal } from 'react-bootstrap';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Field, reduxForm } from 'redux-form';
import { LoadingScreen } from '../../components/commonWidgets';
import { RenderInputWithDiv, RenderNumberInput, RenderSelect } from '../../components/formInputs';
import agent from '../../services/agent';
import { LOAD_UPDATING_CONFIG_TABLE } from './action-types';


const validate = values => {
    const errors = {};
    if(!values.name){
        errors.name = "Vui lòng nhập tên công ty!"
    }  
    return errors;
}
const mapStateToProps = state => {
    var updateValue = {
        ...state.configTableReducer.updatingConfigTable,
    };
    return {
        initialValues: updateValue
    };
};
const mapDispatchToProps = dispatch => ({
    loadConfigTable: (payload) =>
        dispatch({ type: LOAD_UPDATING_CONFIG_TABLE, payload: payload })
});
class ModalConfigTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllUser : []
        }
        super(props);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.getlistAllPersonel = this.getlistAllPersonel.bind(this);
     };
    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        onHide();
        destroy(); }
    handleAdd(values) {
        var onHide = this.props.onHide;
        var id = this.props.idConfigTable;
        var url = '/configTable/add';
        var bodyObject = {
            configCode: values.configCode,
            configValue: values.configValue,
            updatedById: values.updatedById,
            description: values.description,
        };
        if (id) {
            url = '/configTable/update';
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
    getlistAllPersonel(){
        let setStateInRequest = (list) => { this.setState({ listAllUser: list }) }
        return agent.UserApi.listAllPersonel().then(function (res) {
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
    componentWillMount() {
        const { loadConfigTable } = this.props;
        var id = this.props.idConfigTable;
        this.getlistAllPersonel();

        const dataPromise = agent.ConfigTableApi.getConfigTable(id);
        loadConfigTable(Promise.resolve(dataPromise))
    }
    render() {
        const { handleSubmit, submitting, title, invalid } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show,bsSize:"medium",  
        onHide: this.props.onHide, 
        submitting: this.props.submitting };
        var newModal = null;
        var optionUserPersonel = []; 
        let dataUser = this.state.listAllUser;
        if(dataUser) {
            dataUser.map(item=>{
            optionUserPersonel.push({label:item.fullName,value:item.id})
        }) 
    }
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
                                            <Field name="configCode" label="Mã Phí Khám" placeholder="Mã Phí Khám..." component={RenderInputWithDiv}></Field>
                                        </div>
                                        <div className="col-md-6">
                                            <Field name="configValue" label="Số Tiền Phí Khám" placeholder="Số Tiền Phí Khám..." component={RenderNumberInput}></Field>
                                        </div>
                                        <div className="col-md-6">
                                            <Field name="updatedById" label="Người Tạo" placeholder="Người Tạo..." options={optionUserPersonel} component={RenderSelect}></Field>
                                        </div>
                                        <div className="col-md-6">
                                            <Field name="description" label="Tài Khoản Ngân Hàng" placeholder="Nhập tài khoản ngân hàng..." component={RenderNumberInput}></Field>
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
            form: 'ModalConfigTable',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalConfigTable)));
