import moment from 'moment';
import React from 'react';
import { Modal } from 'react-bootstrap';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { LoadingScreen } from '../../components/commonWidgets';
import { RenderDatePicker, RenderInputWithDiv, RenderMoneyFormat, RenderSelect } from '../../components/formInputs';
import agent from '../../services/agent';
import { LOAD_UPDATING_PAYMENT } from './action-types';

const validate = values => {
    const errors = {};
    if(!values.paymentId){
        errors.paymentId = "Vui Lòng Chọn Payment!"
    }
    
    if(!values.paymentMethod){
        errors.paymentMethod = "Vui lòng chọn hình thức thanh toán!"
    }
  
    return errors;
}
var today = moment(new Date, "HH:mm DD/MM/YYYY");
var todays = new Date;
const selector = formValueSelector('ModalUpdatePaymentMethod');
const mapStateToProps = state => {
    return {
    };
};
const mapDispatchToProps = dispatch => ({
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalUpdatePaymentMethod", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});
class ModalUpdatePaymentMethod extends React.Component {
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
        const {invoiceDto} = this.props;
        var onHide = this.props.onHide;
        var url = '/payment/changePaymentMethod?paymentId=' + values.paymentId + '&newPaymentMethod=' + values.paymentMethod;
        
        return agent.asyncRequests.get(url
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
        const { updateField, paymentObj } = this.props;
        updateField("paymentId", paymentObj.id);
        updateField("amount", paymentObj.amount);
        updateField("paymentMethod", paymentObj.paymentMethod);
    }
    
    render() {
        const { handleSubmit, submitting, title, invalid} = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show,bsSize:"small",
        onHide: this.props.onHide, 
        submitting: this.props.submitting };
       
        var paymentMethod=[
            {label:"Tiền Mặt",value:"CASH",},
            {label:"Chuyển Khoản",value:"BANK_TRANSFER",},
            {label:"Thẻ Tín Dụng",value:"CREDIT_CARD",},
            // {label:"Trả Trước",value:"CREDIT_NOTE",}
        ]
        

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
                    
                    <Modal.Body  >
                        {submitting ? <LoadingScreen /> :
                            <form className="form-horizontal" role="form"  onSubmit={handleSubmit(this.handleAdd)}>
                                <div className="form-group"> 
                                <div className="row">
                                <div className="col-md-12"> 
                                    <Field name="paymentId" label="Mã Thanh Toán" component={RenderInputWithDiv} disabled></Field>                      
                                </div>
                                <div className="col-md-12">     
                                    <Field disabled={true} name="amount" label="Số Tiền"  component={RenderMoneyFormat}></Field> 
                                </div> 
                                <div className="col-md-12">    
                                    <Field name="paymentMethod" label="Đổi Phương Thức Thanh Toán"  options={paymentMethod} component={RenderSelect}></Field> 
                                </div> 
                                
                                </div>
                                <br/>
                                <div className="text-right">
                                <button type="button" style={{marginRight:"20px"}} className="btn btn-default" onClick={this.handleHideAndClear} ><i class="icon-cross" aria-hidden="true"></i> Đóng</button>                                
                                <button  type="submit"  className="btn bg-success"  disabled={submitting}> Cập Nhật</button>
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
            form: 'ModalUpdatePaymentMethod',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalUpdatePaymentMethod)));







       
        