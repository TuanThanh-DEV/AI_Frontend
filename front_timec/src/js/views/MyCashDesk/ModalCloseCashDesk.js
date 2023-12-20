import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderNumberInput, RenderMoneyFormat} from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_CASHDESK } from './action-types';


const validate = values => {
    const errors = {};
    if(!values.status){
        errors.status = "Vui lòng nhập nội dung cuộc hẹn!"
    }
    return errors;
}
const mapStateToProps = state => {
    var updateValue = {
        ...state.cashDeskReducer.updatingCashDesk
    };
    return {
        initialValues: updateValue
    };
};
const mapDispatchToProps = dispatch => ({
    loadCashDesk: (payload) =>
        dispatch({ type: LOAD_UPDATING_CASHDESK, payload: payload })
});
class ModalCashDeskClose extends React.Component {
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
        var id = this.props.idCashDesk;
        var url = '/cashDesk/closeCashDesk';
        var bodyObject = {
            id : id,
            closeTime: today,
            closeAmount: values.closeAmount

        };
        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && result.id) {
                onHide();
                toast.success("Đóng Quầy Thành Công", { autoClose: 5000, position: toast.POSITION.TOP_RIGHT});
            } else {
                toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    };

    componentWillMount() {
        const { loadCashDesk } = this.props;
        var id = this.props.idCashDesk;
       
            const dataPromise = agent.CashDeskApi.getCashDesk(id);
            loadCashDesk(Promise.resolve(dataPromise))
        
    }
   
    render() {
        const { handleSubmit, submitting, title, invalid } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show,bsSize:"sm",
        onHide: this.props.onHide, 
        submitting: this.props.submitting };
        var id = this.props.idCashDesk;

        
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
                                <Field name="closeAmount" label="Số Tiền Sau Khi Đóng Quầy (*)" placeholder="Nhập số tiền sau khi đóng quầy..." component={RenderMoneyFormat}></Field> 
                                </div>                                                
                                </div>
                                <br/>
                                <div className="text-right">
                                <button type="button" style={{marginRight:"20px"}} className="btn btn-default" onClick={this.handleHideAndClear} ><i class="icon-cross" aria-hidden="true"></i> Đóng</button>                                
                                <button type="submit"  className="btn bg-success" disabled={submitting}> Đóng Quầy Ngay</button>
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
            form: 'ModalCashDeskClose',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalCashDeskClose)));
