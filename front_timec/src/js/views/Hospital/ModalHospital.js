import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderSelect, RenderCheckbox } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_HOSPITAL } from './action-types';

const validate = values => {
    const errors = {};
    if(!values.code){
        errors.code = "Vui lòng nhập mã Phòng Khám!"
    }  
    if(!values.name){
        errors.name = "Vui lòng nhập tên Phòng Khám!"
    }  
    return errors;
}
const mapStateToProps = state => {
    var updateValue = {
        ...state.hospitalReducer.updatingHospital,
    };
    return {
        initialValues: updateValue
    };
};
const mapDispatchToProps = dispatch => ({
    loadHospital: (payload) =>
        dispatch({ type: LOAD_UPDATING_HOSPITAL, payload: payload })
});
class ModalHospital extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
        var id = this.props.idHospital;
        var url = '/hospital/add';
        var bodyObject = {
            code: values.code,
            name: values.name,
            hasActive: values.hasActive

        };
        if (id) {
            url = '/hospital/update';
            bodyObject.id = id;
        }
        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && result.id) {
                window.location.reload(true);
                onHide();
            } else {
                toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    };

    componentWillMount() {
        const { loadHospital } = this.props;
        var id = this.props.idHospital;
        
            const dataPromise = agent.HospitalApi.getHospital(id);
            loadHospital(Promise.resolve(dataPromise))
        
    }

    

    render() {
        const { handleSubmit, submitting, title, invalid } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show,bsSize:"sm",  
        onHide: this.props.onHide, 
        submitting: this.props.submitting };
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
                                <Field name="code" label="Mã Phòng Khám (*)" placeholder="Nhập mã code Phòng Khám..." component={RenderInputWithDiv}></Field>
                                <Field name="name" label="Tên Phòng Khám (*)" placeholder="Nhập tên Tên Phòng Khám..." component={RenderInputWithDiv}></Field>
                                <Field name="hasActive" label="Trạng Thái" checkLabel="Đang Hoạt Động"  component={RenderCheckbox}></Field>
                                
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
            form: 'ModalHospital',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalHospital)));
