import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderSelect } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_USERCONTEXT } from './action-types';


const validate = values => {
    const errors = {};
    if (!values.name) {
        errors.name = "Vui lòng nhập đơn vị tính!"
    }

    return errors;
}
const mapStateToProps = state => {
    var updateValue = {
        ...state.userContextReducer.updatingUserContext,
    };
    return {
        initialValues: updateValue
    };
};
const mapDispatchToProps = dispatch => ({
    loadUserContext: (payload) =>
        dispatch({ type: LOAD_UPDATING_USERCONTEXT, payload: payload })
});
class ModalUserContext extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllDrugStore: [],
            listAllUser: []
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
    };
    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        onHide();
        destroy();
    }
    handleAdd(values) {
        var onHide = this.props.onHide;
        var id = this.props.idUserContext;
        var url = '/userContext/add';
        var bodyObject = {
            userId: values.userId,
            drugStoreId: values.drugStoreId,
        };
        if (id) {
            url = '/userContext/update';
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
    getlistAlUser() {
        let setStateInRequest = (list) => { this.setState({ listAllUser: list }) }
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
    getlistAllDrugStore() {
        let setStateInRequest = (list) => { this.setState({ listAllDrugStore: list }) }
        return agent.DrugStoreApi.listAllDrugStore(
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
    componentWillMount() {
        const { loadUserContext } = this.props;
        var id = this.props.idUserContext;
        
            const dataPromise = agent.UserContextApi.getUserContext(id);
            loadUserContext(Promise.resolve(dataPromise))
        
        this.getlistAlUser();
        this.getlistAllDrugStore();
    }
    render() {
        const { handleSubmit, submitting, title, invalid } = this.props;
        const modalConfig = {
            backdrop: 'static', show: this.props.show, bsSize: "sm",
            onHide: this.props.onHide,
            submitting: this.props.submitting
        };
        var dataDrugStore = this.state.listAllDrugStore;
        var optionDrugStore = [];
        if (dataDrugStore) {
            dataDrugStore.map(item => {
                optionDrugStore.push({ label: item.name, value: item.id });
            })
        }
        var optionUser = [];
        var listAllUser = this.state.listAllUser;
        if (listAllUser) {
            listAllUser.map(user => {
                optionUser.push({ label: user.fullName, value: user.id })
            })
        }
        var id = this.props.idUserContext;
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
                                <Field name="userId" label="Tên nhân viên (*)"  placeholder="Nhập Tên nhân viên..." options={optionUser} component={RenderSelect}></Field>
                                <Field name="drugStoreId" label="Kho thuốc (*)" placeholder="Nhập Kho thuốc..."   options={optionDrugStore} component={RenderSelect}></Field>
                                <div className="text-right">
                                    <button type="button" style={{marginRight:"20px"}} className="btn btn-default" onClick={this.handleHideAndClear} ><i class="icon-cross" aria-hidden="true"></i> Đóng</button>
                                    <button type="submit" className="btn bg-success" disabled={submitting}> Lưu Lại</button>
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
            form: 'ModalUserContext',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalUserContext)));
