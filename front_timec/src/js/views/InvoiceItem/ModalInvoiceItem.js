import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderSelect, RenderNumberInput, RenderMoneyFormat } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_INVOICEITEM } from './action-types';

const validate = values => {
    const errors = {};
    if(!values.status){
        errors.status = "Vui lòng nhập nội dung cuộc hẹn!"
    }
    return errors;
}
const mapStateToProps = state => {
    var updateValue = {
        ...state.invoiceItemReducer.updatingInvoiceItem
    };
    return {
        initialValues: updateValue
    };
};
const mapDispatchToProps = dispatch => ({
    loadInvoiceItem: (payload) =>
        dispatch({ type: LOAD_UPDATING_INVOICEITEM, payload: payload })
});
class ModalInvoiceItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllInvoice:[],
            listAllDrug:[],
            listAllDiagnosService:[],
            listAllProcedureService:[],
            listAllPrescription:[],
           
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
        var id = this.props.idInvoiceItem;
        var url = '/invoiceItem/add';
        var bodyObject = {
            invoiceId: values.invoiceId,
            drugId: values.drugId,
            diagnosisServiceId: values.diagnosisServiceId,
            procedureServiceId: values.procedureServiceId,
            prescriptionId: values.prescriptionId,
            numberOfItems: values.numberOfItems,
            amountNoVat: values.amountNoVat,
            amountWithVat: values.amountWithVat,
        };
        if (id) {
            url = '/invoiceItem/update';
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
        const { loadInvoiceItem } = this.props;
        var id = this.props.idInvoiceItem;
        {
            const dataPromise = agent.InvoiceItemApi.getInvoiceItem(id);
            loadInvoiceItem(Promise.resolve(dataPromise))
        }
        this.getlistAllInvoice();
        this.getlistAllDrug();
        this.getlistAllDiagnosisService();
        this.getlistAllProcedureService();
        this.getlistAllPrescription();
       
    }
    getlistAllPrescription(){
        let setStateInRequest = (list) => { this.setState({ listAllPrescription: list }) }
        return agent.PrescriptionApi.listAllPrescription().then(function (res) {
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
    getlistAllProcedureService(){
        let setStateInRequest = (list) => { this.setState({ listAllProcedureService: list }) }
        return agent.ProcedureServiceApi.listAllProcedureService().then(function (res) {
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
    getlistAllDiagnosisService(){
        let setStateInRequest = (list) => { this.setState({ listAllDiagnosService: list }) }
        return agent.DiagnosisServiceApi.listAllDiagnosisService().then(function (res) {
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
    getlistAllDrug(){
        let setStateInRequest = (list) => { this.setState({ listAllDrug: list }) }
        return agent.DrugApi.listAllDrug().then(function (res) {
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
    render() {
        const { handleSubmit, submitting, title, invalid } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show,bsSize:"medium",
        onHide: this.props.onHide, 
        submitting: this.props.submitting };
        

        var optionInvoice = []; 
        this.state.listAllInvoice.map(item=>{
            optionInvoice.push({label:item.id,value:item.id})
        })
        var optionDrug = []; 
        this.state.listAllDrug.map(item=>{
            optionDrug.push({label:item.name,value:item.id})
        })
        var optionDiagnosService = []; 
        this.state.listAllDiagnosService.map(item=>{
            optionDiagnosService.push({label:item.name,value:item.id})
        })
        var optionProcedureService = []; 
        this.state.listAllProcedureService.map(item=>{
            optionProcedureService.push({label:item.name,value:item.id})
        })
        var optionPrescription = []; 
        this.state.listAllPrescription.map(item=>{
            optionPrescription.push({label:item.patient ? item.patient.fullName : null,value:item.id})
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
                                <div className="col-md-12">                                 
                                <Field name="invoiceId" label="Hóa Đơn(*)"  options={optionInvoice} component={RenderSelect}></Field>
                                </div>
                                <div className="col-md-6"> 
                                <br/>
                                <Field name="drugId" label="Thuốc"  options={optionDrug}  component={RenderSelect}></Field>  
                                </div>
                                <div className="col-md-6"> 
                                <br/>
                                <Field name="diagnosisServiceId" label="Dịch Vụ Chỉ Định"  options={optionDiagnosService} component={RenderSelect}></Field>                      
                                </div>    
                                <div className="col-md-6"> 
                                <br/>
                                <Field name="procedureServiceId" label="Dịch Vụ Thủ Thuật"   options={optionProcedureService} component={RenderSelect}></Field>                      
                                </div>
                                <div className="col-md-6"> 
                                <br/>       
                                <Field name="prescriptionId" label="Đơn Thuốc"  options={optionPrescription} component={RenderSelect}></Field>                                   
                                </div>    
                                <div className="col-md-6"> 
                                <br/>
                                <Field name="numberOfItems" label="Số Hạn Mục (*)" placeholder="Vui lòng nhập hạng mục..." component={RenderInputWithDiv}></Field>                                   
                                </div> 
                                <div className="col-md-6"> 
                                <br/>
                                <Field name="amountNoVat" label="Số Tiền Không VAT (*)" placeholder="Vui lòng nhập số tiền..." component={RenderMoneyFormat}></Field>                                   
                                </div> 
                                <div className="col-md-6"> 
                                <br/>
                                <Field name="amountWithVat" label="Số Tiền Gồm VAT (*)" placeholder="Vui lòng nhập số tiền..." component={RenderMoneyFormat}></Field>                                   
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
            form: 'ModalInvoiceItem',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalInvoiceItem)));
