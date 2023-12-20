import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderTextArea,  RenderSelect,  RenderDatePickerWithTime, RenderSwitch, RenderNumberInput, RenderMoneyFormat } from '../../components/formInputs';
import { Field, reduxForm,formValueSelector } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_CASHDESK } from './action-types';
import moment from 'moment';

const validate = values => {
    const errors = {};
    if(!values.initialAmount){
        errors.initialAmount = "Vui lòng nhập số tiền ban đầu!"
    }
    return errors;
}
var today = new Date;
const mapStateToProps = state => {
    var updateValue = {
        ...state.cashDeskReducer.updatingCashDesk,
        openTime: state.cashDeskReducer.updatingCashDesk && state.cashDeskReducer.updatingCashDesk.openTime ? moment(state.cashDeskReducer.updatingCashDesk.openTime) : today,
    };
    return {
        initialValues: updateValue,
        currentUser: state.common.currentUser
    };
};
const mapDispatchToProps = dispatch => ({
    loadCashDesk: (payload) =>
        dispatch({ type: LOAD_UPDATING_CASHDESK, payload: payload }),
        updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalCashDesk", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});
class ModalCashDesk extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllUser:[],
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
     };
    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        onHide();
        destroy(); }
    handleAdd(values) {
        var onHide = this.props.onHide;
        var id = this.props.idCashDesk;
        var url = '/cashDesk/add';
        var bodyObject = {
            cashierId: values.cashierId,
            openTime: values.openTime,
            initialAmount: values.initialAmount ? values.initialAmount : 0,
            closeAmount: values.closeAmount ? values.closeAmount : 0,
            closeTime: values.closeTime,
            isBalanced: values.isBalanced,
            note: values.note,
            saleAmount: values.saleAmount ? values.saleAmount : 0,
            withdrawalAmount: values.withdrawalAmount ? values.withdrawalAmount : 0
        };
        if (id) {
            url = '/cashDesk/update';
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
        const { loadCashDesk } = this.props;
        var id = this.props.idCashDesk;

            const dataPromise = agent.CashDeskApi.getCashDesk(id);
            loadCashDesk(Promise.resolve(dataPromise))
        
    
        this.getlistAllPersonel();
    }
    getlistAllPersonel(){
        const { currentUser,updateField} =  this.props;
        let setStateInRequest = (list) => { this.setState({ listAllUser: list }) }
        return agent.UserApi.listAllPersonel().then(function (res) {
            var result = res.resultData;
            if (result) {
                setStateInRequest(result);
                result.map(item=>{
                    if(currentUser.email == item.email){
                        setTimeout(() => {
                            updateField("cashierId",item.id);
                        }, 100);
                           
                    }else{
                        return null;
                }
            })
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    }
 
    render() {
        const { handleSubmit, submitting, title, invalid } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show,bsSize:"sm",  
        onHide: this.props.onHide, 
        submitting: this.props.submitting };
        var id = this.props.idCashDesk;

        var optionUserPersonel = []; 
        this.state.listAllUser.map(item=>{
            optionUserPersonel.push({label:item.fullName,value:item.id})
        })
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
                                <div className="col-md-6 hidden">                                
                                <Field disabled={true} name="cashierId" label="Chọn Tên Người Thu Ngân (*)" placeholder="Vui lòng chọn thu ngân..." options={optionUserPersonel} component={RenderSelect}></Field>                      
                                </div>
                                <div className="col-md-12">     
                                <Field name="initialAmount" autoFocus={true} label="Số Tiền Ban Đầu Của Quầy (*)" placeholder="Nhập số tiền ban đầu..." component={RenderMoneyFormat} ></Field> 
                                </div>  
                                <div className="col-md-6 hidden">   
                                <br/>     
                                <Field name="closeAmount" label="Số Tiền Sau Khi Đóng (*)" placeholder="Nhập số tiền sau khi đóng..." component={RenderMoneyFormat}></Field> 
                                </div>
                                <div className="col-md-6 hidden">   
                                <br/>
                                <Field name="isBalanced" label="Trạng Thái"  component={RenderSwitch}></Field>
                                </div>  
                                <div className="col-md-6 hidden">   
                                <br/>     
                                <Field name="saleAmount" label="Số Tiền Đã Bán (*)" placeholder="Nhập số tiền đã bán..." component={RenderMoneyFormat} disabled></Field> 
                                </div>
                                <div className="col-md-6 hidden">   
                                <br/>     
                                <Field name="withdrawalAmount" label="Số Tiền Đã Rút (*)" placeholder="Nhập số tiền đã rút..." component={RenderMoneyFormat} disabled></Field> 
                                </div>
                                <div className="col-md-12">         
                                <br/>                     
                                <Field name="note" label="Ghi Chú (*)" placeholder="Nhập nội dung ghi chú..." row={3} component={RenderTextArea}></Field>
                                </div>
                                <div className="col-md-6 hidden"> 
                                <br/>
                                <Field name="openTime" label="Thời Gian Mở" dateFormat="dd/MM/yyyy hh:mm:aa"  component={RenderDatePickerWithTime}></Field>  
                                </div>
                                <div className="col-md-6 hidden"> 
                                <br/>
                                <Field name="closeTime" label="Thời Gian Đóng" dateFormat="dd/MM/yyyy hh:mm:aa"  component={RenderDatePickerWithTime}></Field>  
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
            form: 'ModalCashDesk',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalCashDesk)));
