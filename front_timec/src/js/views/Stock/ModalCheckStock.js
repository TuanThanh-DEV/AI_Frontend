import moment from 'moment';
import React from 'react';
import { Modal } from 'react-bootstrap';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { LoadingScreen } from '../../components/commonWidgets';
import { RenderDatePicker, RenderHiddenInput, RenderInputWithDiv, RenderMoneyFormat, RenderNumberInput, RenderSelect, RenderTextArea } from '../../components/formInputs';
import agent from '../../services/agent';
import { LOAD_UPDATING_PAYMENT } from './action-types';

const validate = values => {
    const errors = {};
    if(!values.paymentId){
        errors.paymentId = "Vui Lòng Chọn Payment!"
    }
  
    return errors;
}
var today = moment(new Date, "HH:mm DD/MM/YYYY");
var todays = new Date;
const selector = formValueSelector('ModalCheckStock');
const mapStateToProps = state => {
    return {
    };
};
const mapDispatchToProps = dispatch => ({
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalCheckStock", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});
class ModalCheckStock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.onUpdateQuantity = (value) => {
            const { updateField, stockObj } = this.props;
            if(value){
                updateField("changedQuantity", parseInt(value) - stockObj.available );
            }else{
                updateField("changedQuantity", 0 );

            }
        }
     };
    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        onHide();
        destroy(); 
    }

    handleAdd(values) {
        const {stockObj, onHide } = this.props;
        var bodyObject = {
            stockId: values.stockId,
            quantity: values.changedQuantity,
            note: values.note,
        }
        var url = '/stockMovement/addStockMovement';
        
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
        const { updateField, stockObj } = this.props;
        updateField("stockId", stockObj.id);
        updateField("drugStoreName", stockObj.drugStore ? stockObj.drugStore.name : '');
        updateField("available", stockObj.available);

    }
    
    render() {
        const { handleSubmit, submitting, title} = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show,bsSize:"small",
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
                        <Modal.Title  id="contained-modal-title-large"><center>{title}</center></Modal.Title>
                   
                       </Modal.Header>  
                    
                    <Modal.Body  >
                        {submitting ? <LoadingScreen /> :
                            <form className="form-horizontal" role="form"  onSubmit={handleSubmit(this.handleAdd)}>
                                <div className="form-group"> 
                                <div className="row">
                                <div className="col-md-12"> 
                                    <Field name="stockid" label="Item" component={RenderHiddenInput}></Field>                      
                                </div>
                                <div className="col-md-12"> 
                                    <Field name="drugStoreName" label="Kho" component={RenderInputWithDiv} disabled></Field>                      
                                </div>
                                <div className="col-md-12">    
                                    <Field name="available" label="Tồn Kho Hệ Thống"  component={RenderInputWithDiv} ></Field> 
                                </div>
                                <div className="col-md-12">    
                                    <Field name="availableCurrent" label="Tồn Kho Hiện Tại"  component={RenderNumberInput} onChangeAction={(quantity) => this.onUpdateQuantity(quantity)}></Field> 
                                </div>
                                <div className="col-md-12">     
                                    <Field name="changedQuantity" label="Số lượng Dư / Hao Hụt"  component={RenderInputWithDiv} ></Field> 
                                </div>
                                {/* <span className="help-block has-error"><i>{"* Điền số dương khi Dư số lượng, số âm khi Hao Hụt, 0 khi tồn kho đúng."}</i></span>  */}
                                <div className="col-md-12">     
                                    <Field name="note" label="Ghi chú"  component={RenderTextArea}></Field> 
                                </div> 
                                <div className="col-md-12">    
                                    <Field name="availableAfterChanged" label="Tồn Kho Sau Thay Đổi"  component={RenderInputWithDiv} disabled></Field> 
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
            form: 'ModalCheckStock',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalCheckStock)));







       
        