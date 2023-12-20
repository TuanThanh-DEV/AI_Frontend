import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv} from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_PRESCRIPTIONREVIEW } from './action-types';


const validate = values => {
    const errors = {};
    if(!values.score){
        errors.score = "Vui lòng nhập điểm!"
    }
    if (values.score > 100 || values.score < 0) {
        errors.score = 'Số điểm chỉ tự 0-100 vui lòng nhập lại!'
    }
    return errors;
}
const mapStateToProps = state => {
    // var updateValue = {
    //     ...state.prescriptionReviewReducer.updatingPrescriptionReview
    // };
    // return {
    //     initialValues: updateValue
    // };
};
const mapDispatchToProps = dispatch => ({
    loadPrescriptionReview: (payload) =>
        dispatch({ type: LOAD_UPDATING_PRESCRIPTIONREVIEW, payload: payload })
});
class ModalMark extends React.Component {
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
        var today = new Date;
        var status = 'DONE';
        var id = this.props.idPrescriptionReview;
        var url = '/prescriptionReview/mark';
        var bodyObject = {
            id : id,
            finishDate: today,
            score: values.score,
            status: status

        };
        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && result.id) {
                onHide();
                toast.success("Chấm Điểm Thành Công", { autoClose: 5000, position: toast.POSITION.TOP_RIGHT});
            } else {
                toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    };

    componentWillMount() {
        const { loadPrescriptionReview } = this.props;
        var id = this.props.idPrescriptionReview;
        
            const dataPromise = agent.PrescriptionReviewApi.getPrescriptionReview(id);
            loadPrescriptionReview(Promise.resolve(dataPromise))
        
    }
   
    render() {
        const { handleSubmit, submitting, title, invalid } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show,bsSize:"sm",
        onHide: this.props.onHide, 
        submitting: this.props.submitting };
        var id = this.props.idPrescriptionReview;

        
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
                                <Field name="score" label="Nhập Số Điểm Chấm(*)" placeholder="Nhập số điểm chấm cho bác sĩ..." component={RenderInputWithDiv}></Field> 
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
            form: 'ModalMark',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalMark)));
