import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderInputWithGen, RenderTextArea, RenderDatePicker, RenderCheckbox, RenderSelect, RenderNumberInput, RenderMoneyFormat, RenderDatePickerWithTime } from '../../components/formInputs';import { Field, reduxForm,formValueSelector } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_CASHWIDRAWAL } from './action-types';
import moment from 'moment';
import { FormatterUtils } from '../../utils/javascriptUtils';

const validate = (values,props) => {
    const errors = {};
    if(!values.status){
        errors.status = "Vui lòng nhập nội dung cuộc hẹn!"
    }
    if(!values.widrawalAmount){
        errors.widrawalAmount = "Vui Lòng Nhập Số Tiền Rút"
    }else{
        // Not check the withdrawal to simplify the business
        // if(parseInt(values.widrawalAmount)>parseInt(props.initialAmountCheck)){
        //     errors.widrawalAmount = "Số Tiền Rút Vượt Quá Số Tiền Ban Đầu " + FormatterUtils.formatCurrency(props.initialAmountCheck) +" VNĐ"
        // }
    }
    return errors;
}
var today = new Date;
const mapStateToProps = state => {
    var updateValue = {
        ...state.cashWidrawalReducer.updatingCashWidrawal,
        openTime: state.cashDeskReducer.updatingCashDesk && state.cashDeskReducer.updatingCashDesk.openTime ? moment(state.cashDeskReducer.updatingCashDesk.openTime) : today,
    };
    return {
        initialValues: updateValue
    };
};
const mapDispatchToProps = dispatch => ({
    loadCashWidrawal: (payload) =>
        dispatch({ type: LOAD_UPDATING_CASHWIDRAWAL, payload: payload }),
        updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalCashWidrawal", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});
class ModalCashWidrawal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllCashDesk:[],
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
        var id = this.props.idCashWidrawal;
        var url = '/cashWidrawal/add';
        var today = moment();
        var bodyObject = {
            cashDeskId: values.cashDeskId,
            validateUserId: values.validateUserId,
            widrawalAmount: values.widrawalAmount,
            widrawalTime: today,
            note: values.note
        };
        if (id) {
            url = '/cashWidrawal/update';
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
        const { loadCashWidrawal, cashWidrawalDto,updateField } = this.props;
        var id = this.props.idCashWidrawal;
        
            const dataPromise = agent.CashWidrawalApi.getCashWidrawal(id);
            loadCashWidrawal(Promise.resolve(dataPromise))
        
        if(!id&&cashWidrawalDto){
        updateField("cashDeskId",cashWidrawalDto.id)
         
        }
        this.getlistAllCashDesk();
        this.getlistAllPersonel();
    }
    getlistAllPersonel(){
        let setStateInRequest = (list) => { this.setState({ listAllUser: list }) }
        return agent.UserApi.listAllPersonel().then(function (res) {
            var result = res.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    }
    getlistAllCashDesk(){
        let setStateInRequest = (list) => { this.setState({ listAllCashDesk: list }) }
        return agent.CashDeskApi.listAllCashDesk().then(function (res) {
            var result = res.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    }
    render() {
        const { handleSubmit, submitting, title, invalid, cashWidrawalDto } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show,bsSize:"medium",
        onHide: this.props.onHide, 
        submitting: this.props.submitting };
        var id = this.props.idCashWidrawal;

        var optionUserCashDesk = []; 
        this.state.listAllCashDesk.map(item=>{
            optionUserCashDesk.push({label:item.cashier.fullName,value:item.id})
        })
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
                        <Modal.Title  id="contained-modal-title-large"><center>{title}</center></Modal.Title>
                   
                       </Modal.Header>  
                    
                    <Modal.Body>
                        {submitting ? <LoadingScreen /> :
                            <form className="form-horizontal" role="form" onSubmit={handleSubmit(this.handleAdd)}>
                                <div className="form-group"> 
                                <div className="row">
                                <div className="col-md-6 hidden">
                                <Field disabled={cashWidrawalDto?true:null}  name="cashDeskId" label="Người Quản Lý Quầy Thu Ngân (*)" placeholder="Vui lòng chọn Quầy thu ngân..." options={optionUserCashDesk} component={RenderSelect}></Field>                      
                                </div>    
                                <div className="col-md-6 hidden"> 
                                <Field disabled={today?true:null} name="widrawalTime" label="Thời Gian Rút Tiền" dateFormat="dd/MM/yyyy hh:mm:aa"  component={RenderDatePickerWithTime}></Field> 
                               </div>
                                <div className="col-md-6">  
                                <Field disabled={id?true:false} name="validateUserId" label="Người Rút Tiền (*)" placeholder="Vui lòng chọn Người rút tiền..." options={optionUserPersonel} component={RenderSelect}></Field>                      
                                </div>  
                                <div className="col-md-6">
                                <Field name="widrawalAmount" label="Số Tiền Rút (*)" placeholder="Nhập số tiền Muốn rút..." component={RenderMoneyFormat}></Field> 
                                </div>
                                <div className="col-md-12">  
                                <br />                               
                                <Field name="note" label="Ghi Chú (*)" placeholder="Nhập nội dung ghi chú..." row={3} component={RenderTextArea}></Field>
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
            form: 'ModalCashWidrawal',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalCashWidrawal)));
