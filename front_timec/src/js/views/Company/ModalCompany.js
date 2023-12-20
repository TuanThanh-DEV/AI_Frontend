import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderTextArea, RenderNumberInput} from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_COMPANY } from './action-types';


const validate = values => {
    const errors = {};
    if(!values.name){
        errors.name = "Vui lòng nhập tên công ty!"
    }  
    return errors;
}
const mapStateToProps = state => {
    var updateValue = {
        ...state.companyReducer.updatingCompany,
    };
    return {
        initialValues: updateValue
    };
};
const mapDispatchToProps = dispatch => ({
    loadCompany: (payload) =>
        dispatch({ type: LOAD_UPDATING_COMPANY, payload: payload })
});
class ModalCompany extends React.Component {
    constructor(props) {
        super(props);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
     };
    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        onHide();
        destroy(); }
    handleAdd(values) {
        var onHide = this.props.onHide;
        var id = this.props.idCompany;
        var url = '/company/add';
        var bodyObject = {
            name: values.name,
            taxCode: values.taxCode,
            address: values.address,
            bankAccount: values.bankAccount,
            note: values.note
        };
        if (id) {
            url = '/company/update';
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
        const { loadCompany } = this.props;
        var id = this.props.idCompany;
        
            const dataPromise = agent.CompanyApi.getCompany(id);
            loadCompany(Promise.resolve(dataPromise))
    }
    render() {
        const { handleSubmit, submitting, title, invalid } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show,bsSize:"medium",  
        onHide: this.props.onHide, 
        submitting: this.props.submitting };
        var id = this.props.idCompany;
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
                                <Field name="name" label="Tên Công Ty (*)" placeholder="Nhập tên công ty..." component={RenderInputWithDiv}></Field>
                                </div>
                                <div className="col-md-6">
                                <Field name="taxCode" label="Mã Số Thuế" placeholder="Nhập mã số thuế..." component={RenderInputWithDiv}></Field>
                                </div>
                                <div className="col-md-6">
                                <br />
                                <Field name="address" label="Địa Chỉ" placeholder="Nhập địa chỉ công ty..." component={RenderInputWithDiv}></Field>
                                </div>
                                <div className="col-md-6">
                                <br />
                                <Field name="bankAccount" label="Tài Khoản Ngân Hàng" placeholder="Nhập tài khoản ngân hàng..." component={RenderNumberInput}></Field>
                                </div>
                                <div className="col-md-12">
                                <br />
                                <Field name="note" label="Ghi Chú (*)" placeholder="Nhập nội dung ghi chú..." row={3} component={RenderTextArea}></Field>
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
            form: 'ModalCompany',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalCompany)));
