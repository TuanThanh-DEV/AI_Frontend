import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderTextArea } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_TRANSFERHOSPITAL} from './action-types';

const validate = values => {
    const errors = {};
    if(!values.name){
        errors.name = "không thể trống!"
    }
    if(!values.contactEmail){
        errors.contactEmail = "không thể trống!"
    }
    if(!values.contactPhone){
        errors.contactPhone = "không thể trống!"
    }
    if(!values.address){
        errors.address = "không thể trống!"
    }
    return errors;
}
const mapStateToProps = state => {
    var updateValue = {
        ...state.transferHospitalReducer.updatingTransferHospital,
    };
    return {
        initialValues: updateValue
    };
};
const mapDispatchToProps = dispatch => ({
    loadTransferHospital: (payload) =>
        dispatch({ type: LOAD_UPDATING_TRANSFERHOSPITAL, payload: payload })
});
class ModalTransferHospital extends React.Component {
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
        var id = this.props.idTransferHospital;
        var url = '/transferHospital/add';
        var bodyObject = {
            name: values.name,
            contactEmail: values.contactEmail,
            contactPhone: values.contactPhone,
            address: values.address,
            note: values.note,
        };
        if (id) {
            url = '/transferHospital/update';
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
        const { loadTransferHospital } = this.props;
        var id = this.props.idTransferHospital;
    
            const dataPromise = agent.TransferHospitalApi.getTransferHospital(id);
            loadTransferHospital(Promise.resolve(dataPromise))
        
    }
    render() {
        const { handleSubmit, submitting, title, invalid } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show,bsSize:"sm",  
        onHide: this.props.onHide, 
        submitting: this.props.submitting };
        var id = this.props.idTransferHospital;
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
                                <Field name="name" label="Tên Bệnh Viện (*)" placeholder="Nhập tên bệnh viện..." component={RenderInputWithDiv}></Field>
                                <Field name="contactEmail" label="Email Liên Lạc (*)" placeholder="Nhập Email..." component={RenderInputWithDiv}></Field>
                                <Field name="contactPhone" label="SĐT Liên Lạc (*)" placeholder="Nhập SĐT..." component={RenderInputWithDiv}></Field>
                                <Field name="address" label="Địa Chỉ Bệnh Viện (*)" placeholder="Nhập địa chỉ..." row={3} component={RenderTextArea}></Field>
                                <Field name="note" label="Ghi Chú" placeholder="Nhập ghi chú..." row={3} component={RenderTextArea}></Field>

                                <div className="text-right">
                                <button type="button" className="btn btn-default" onClick={this.handleHideAndClear} ><i class="icon-cross" aria-hidden="true"></i> Đóng</button>                                
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
            form: 'ModalTransferHospital',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalTransferHospital)));
