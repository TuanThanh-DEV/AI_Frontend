import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderNumber, RenderNumberInput } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_INSURANCE_TYPE } from './action-types';

const validate = values => {
    const errors = {};
    if(!values.code){
        errors.code = "Vui lòng nhập mã loại Bảo Hiểm!"
    }  
    if(!values.name){
        errors.name = "Vui lòng nhập tên loại Bảo Hiểm!"
    }  
    if(!values.percentPaid ){
        errors.percentPaid = "Vui lòng nhập số % Bảo Hiểm Hỗ Trợ"
    }  
    if(values.percentPaid > 101 ){
        errors.percentPaid = "Bảo Hiểm Hỗ Trợ không được vượt quá 100%"
    }  
    return errors;
}
const mapStateToProps = state => {
    var updateValue = {
        ...state.insuranceTypeReducer.updatingInsuranceType,
    };
    return {
        initialValues: updateValue
    };
};
const mapDispatchToProps = dispatch => ({
    loadInsuranceType: (payload) =>
        dispatch({ type: LOAD_UPDATING_INSURANCE_TYPE, payload: payload })
});
class ModalInsuranceType extends React.Component {
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
        var id = this.props.idInsuranceType;
        var url = '/insuranceType/add';
        var bodyObject = {
            code : values.code,
            name : values.name,
            percentPaid : values.percentPaid,
            note : values.note
        };
        if (id) {
            url = '/insuranceType/update';
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
        const { loadInsuranceType } = this.props;
        var id = this.props.idInsuranceType;
            const dataPromise = agent.InsuranceTypeApi.getInsuranceType(id);
            loadInsuranceType(Promise.resolve(dataPromise))
        
    };

    render() {
        const { handleSubmit, submitting, title, invalid } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show,bsSize:"sm",  
        onHide: this.props.onHide, 
        submitting: this.props.submitting };
        var optionHospital = []; 
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
                                <Field name="code" label="Mã Loại Bảo Hiểm" placeholder="Nhập Mã Loại Bảo Hiểm..." component={RenderInputWithDiv}></Field>
                                <Field name="name" label="Tên Loại Bảo Hiểm" placeholder="Nhập Tên Loại Bảo Hiểm..." component={RenderInputWithDiv}></Field>
                                <Field name="percentPaid" label="Số % Bảo Hiểm Hỗ Trợ" component={RenderNumberInput}></Field>
                                <Field name="note" label="Ghi Chú"  placeholder="Nhập Ghi Chú..." row={3} component={RenderInputWithDiv}></Field>
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
            form: 'ModalInsuranceType',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalInsuranceType)));
