import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv,RenderSelect, RenderDatePickerWithTime, RenderMoneyFormat } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_INSURANCEINVOICE } from './action-types';


const validate = values => {
    const errors = {};
    if(!values.invoice){
        errors.invoice ={id: "Vui lòng chọn hóa đơn!"}
    }
    if(!values.userId){
        errors.userId =  "Vui lòngchọn người chịu trách nhiệm!"
    }
    if(!values.createdDate){
        errors.stacreatedDatetus = "Vui lòngchọn ngày lập!"
    }
    if(!values.insuranceRefundDate){
        errors.insuranceRefundDate = "Vui lòng chọn ngày trả về!!"
    }
    if(!values.insurranceAmount){
        errors.insurranceAmount = "Vui lòng nhập tiền bảo hiểm!"
    }

    return errors;
}
const mapStateToProps = state => {
    var updateValue = {
        ...state.insuranceInvoiceReducer.updatingInsuranceInvoice
    };
    return {
        initialValues: updateValue
    };
};
const mapDispatchToProps = dispatch => ({
    loadInsuranceInvoice: (payload) =>
        dispatch({ type: LOAD_UPDATING_INSURANCEINVOICE, payload: payload })
});
class ModalInsuranceInvoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllInvoice:[],
            listAllPersonel:[],
           
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
        var id = this.props.idInsuranceInvoice;
        var url = '/insuranceInvoice/add';
        var bodyObject = {
            invoiceId: values.invoiceId,
            userId: values.userId,
            createdDate: values.createdDate,
            insuranceRefundDate: values.insuranceRefundDate,
            totalAmountNoVat: values.totalAmountNoVat,
            totalAmountWithVat: values.totalAmountWithVat,
            insurranceAmount: values.insurranceAmount,
            status: values.status
        };
        if (id) {
            url = '/insuranceInvoice/update';
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
        const { loadInsuranceInvoice } = this.props;
        var id = this.props.idInsuranceInvoice;
        {
            const dataPromise = agent.InsuranceInvoiceApi.getInsuranceInvoice(id);
            loadInsuranceInvoice(Promise.resolve(dataPromise))
        }
        this.getlistAllInvoice();
        this.getlistAllUser();
        
    }
    getlistAllInvoice(){
        let setStateInRequest = (list) => { this.setState({ listAllInvoice: list }) }
        return agent.InvoiceApi.listAllInvoice().then(function (res) {
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
    getlistAllUser(){
        let setStateInRequest = (list) => { this.setState({ listAllPersonel: list }) }
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

    render() {
        const { handleSubmit, submitting, title, invalid } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show,bsSize:"medium",
        onHide: this.props.onHide, 
        submitting: this.props.submitting };
        // var id = this.props.idInsuranceInvoice;

        var optionInvoice = []; 
        this.state.listAllInvoice.map(item=>{
            optionInvoice.push({label:item.id,value:item.id})
        })
        var optionUser = []; 
        this.state.listAllPersonel.map(item=>{
            optionUser.push({label:item.fullName,value:item.id})
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
                                <div className="col-md-6">                                 
                                <Field name="invoiceId" label="Hóa Đơn (*)" options={optionInvoice} component={RenderSelect}></Field>
                                </div>
                                <div className="col-md-6"> 
                                
                                <Field name="userId" label="Người Chịu Trách Nhiệm (*)" options={optionUser} component={RenderSelect}></Field>  
                                </div>
                                <div className="col-md-6"> 
                                <br/>
                                <Field name="createdDate" label="Ngày Lập (*)" dateFormat="dd/MM/yyyy hh:mm:aa"  component={RenderDatePickerWithTime}></Field>                      
                                </div>    
                                <div className="col-md-6"> 
                                <br/>
                                <Field name="insuranceRefundDate" label="Ngày Trả (*)" dateFormat="dd/MM/yyyy hh:mm:aa"  component={RenderDatePickerWithTime}></Field>                      
                                </div>
                                <div className="col-md-6"> 
                                <br/>
                                <Field name="totalAmountNoVat" label="No VAT (*)" placeholder="Vui lòng nhập tiền không VAT..."  component={RenderMoneyFormat}></Field>                                   
                                </div>    
                                <div className="col-md-6"> 
                                <br/>
                                <Field name="totalAmountWithVat" label="Có VAT (*)" placeholder="Vui lòng nhập tiền có VAT..."  component={RenderMoneyFormat}></Field>                                   
                                </div>   
                                <div className="col-md-6"> 
                                <br/>
                                <Field name="insurranceAmount" label="Tiền Bảo Hiểm (*)" placeholder="Vui lòng Nhập tiền..." component={RenderMoneyFormat}></Field>                                   
                                </div>   
                                <div className="col-md-6"> 
                                <br/>
                                <Field name="status" label="Trạng Thái (*)" placeholder="Vui lòng nhập trạng thái..." component={RenderInputWithDiv}></Field>                                   
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
            form: 'ModalInsuranceInvoice',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalInsuranceInvoice)));
