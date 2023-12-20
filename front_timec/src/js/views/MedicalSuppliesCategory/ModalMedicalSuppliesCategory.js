import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderSelect} from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_MEDICALSUPPIESCATEGORY } from './action-types';


const validate = values => {
    const errors = {};
    if(!values.name){
        errors.name = "Vui lòng nhập tên vật tư!"
    }
    if(!values.importPrice){
        errors.importPrice = "Vui lòng nhập giá nhập!"
    }
    if(!values.salePrice){
        errors.salePrice = "Vui lòng nhập giá bán!"
    }
    return errors;
}
const mapStateToProps = state => {
    var updateValue = {
        ...state.medicalSuppliesCategoryReducer.updatingMedicalSuppliesCategory,
    };
    return {
        initialValues: updateValue
    };
};
const mapDispatchToProps = dispatch => ({
    loadMedicalSuppliesCategory: (payload) =>
        dispatch({ type: LOAD_UPDATING_MEDICALSUPPIESCATEGORY, payload: payload })
});
class ModalMedicalSuppliesCategory extends React.Component {
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
        var id = this.props.idMedicalSuppliesCategory;
        var url = '/medicalSuppliesCategory/add';
        var bodyObject = {
            name: values.name,
            drugType :'MEDICAL'
        };
        if (id) {
            url = '/medicalSuppliesCategory/update';
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
        const { loadMedicalSuppliesCategory } = this.props;
        var id = this.props.idMedicalSuppliesCategory;
        {
            const dataPromise = agent.MedicalSuppliesCategoryApi.getMedicalSuppliesCategory(id);
            loadMedicalSuppliesCategory(Promise.resolve(dataPromise))
        }
    }
    render() {
        const { handleSubmit, submitting, title, invalid } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show,bsSize:"sm",  
        onHide: this.props.onHide, 
        submitting: this.props.submitting };
        // var id = this.props.idMedicalSuppliesCategory;
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
                                <Field name="name" label="Nhóm vật tư y tế (*)" placeholder="Nhập tên nhóm vật tư y tế..." component={RenderInputWithDiv}></Field>
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
            form: 'ModalMedicalSuppliesCategory',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalMedicalSuppliesCategory)));
