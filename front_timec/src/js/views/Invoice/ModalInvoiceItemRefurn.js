import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderSelect,RenderNumberInput, RenderMoneyFormat } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_INVOICEITEM } from './action-types';
import moment from 'moment';
const validate = (values,props) => {
    const errors = {};
    if (parseInt(values.numberOfItems) > parseInt(props.idInvoiceItem.numberOfItems)) {
        errors.numberOfItems = 'Không được refurn nhiều hơn số lượng ban đầu'
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
    updateField: (fieldName, value) =>
    dispatch({
        meta: { form: "ModalInvoiceItem", field: fieldName },
        payload: value,
        type: "@@redux-form/CHANGE"
    }),
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
        var today = moment(new Date, "HH:mm DD/MM/YYYY");
        var invoiceType = this.props.invoiceType;
        var invoiceIds = this.props.invoiceId;
        var totalamountNoVat = values.amountNoVat/values.numberOfItemsData;
        var totalamountWithVat = values.amountWithVat/values.numberOfItemsData;
        var url = '/invoice/add';
        var bodyObject = {
            name: invoiceIds.name,
            code: invoiceIds.code,
            patientId: invoiceIds.patientId,
            userId: invoiceIds.userId,
            prescriptionId: invoiceIds.prescriptionId,
            createdDate: today,
            paymentDate: '',
            totalAmountNoVat: -totalamountNoVat*values.numberOfItems,
            totalAmountWithVat: -totalamountWithVat*values.numberOfItems,
            insurranceAmount: invoiceIds.insurranceAmount,
            status: 'OPEN',
            invoiceType: invoiceIds.invoiceType,
            originInvoiceId: invoiceIds.id,
            invoiceGroup: 'REFUND'
        };

        
        return agent.asyncRequests.post(url, bodyObject
            ).then(function (res) {
                var result = res.body.resultData;
                if (result && result.id) {
                    var url = '/invoiceItem/add';
                    var bodyObject = {
                        invoiceId: result.id,
                        drugId: values.drugId,
                        diagnosisServiceId: values.diagnosisServiceId,
                        procedureServiceId: values.procedureServiceId,
                        prescriptionId: values.prescriptionId,
                        numberOfItems: -values.numberOfItems,
                        amountNoVat: -totalamountNoVat*values.numberOfItems,
                        amountWithVat: -totalamountWithVat*values.numberOfItems,
                    };
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
                    toast.success("Lưu Thành Công", { autoClose: 1000, position: toast.POSITION.TOP_RIGHT});
                } else {
                    toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
            });
        
            
    };

    componentWillMount() {
        const { loadInvoiceItem,updateField } = this.props;
        var id = this.props.idInvoiceItem;
        {
            const dataPromise = agent.InvoiceItemApi.getInvoiceItem(id);
            loadInvoiceItem(Promise.resolve(dataPromise))
        }
        updateField("invoiceId", id.invoiceId);
        updateField("drugId", id.drugId);
        updateField("diagnosisServiceId", id.diagnosisServiceId);
        updateField("procedureServiceId", id.procedureServiceId);
        updateField("numberOfItemsData", id.numberOfItems);
        updateField("prescriptionId", id.prescriptionId);
        updateField("amountNoVat", id.amountNoVat);
        updateField("amountWithVat", id.amountWithVat);
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
                                <div className="col-md-12 hidden">                                 
                                <Field name="invoiceId" label="Hóa Đơn(*)"  options={optionInvoice} component={RenderSelect}></Field>
                                </div>
                                <div className="col-md-6 hidden"> 
                                <br/>
                                <Field name="drugId" label="Thuốc"  options={optionDrug}  component={RenderSelect}></Field>  
                                </div>
                                <div className="col-md-6 hidden"> 
                                <br/>
                                <Field name="diagnosisServiceId" label="Dịch Vụ Chỉ Định"  options={optionDiagnosService} component={RenderSelect}></Field>                      
                                </div>    
                                <div className="col-md-6 hidden"> 
                                <br/>
                                <Field name="procedureServiceId" label="Dịch Vụ Thủ Thuật"   options={optionProcedureService} component={RenderSelect}></Field>                      
                                </div>
                                <div className="col-md-6 hidden"> 
                                <br/>       
                                <Field name="prescriptionId" label="Đơn Thuốc"  options={optionPrescription} component={RenderSelect}></Field>                                   
                                </div>    
                                <div className="col-md-12"> 
                                <br/>
                                <Field name="numberOfItems" label="Số Lượng Muốn Trả (*)" placeholder="Vui lòng nhập số lượng muốn trả..." component={RenderNumberInput}></Field>                                   
                                </div> 
                                <div className="col-md-12 hidden"> 
                                <br/>
                                <Field name="numberOfItemsData" label="Số Lượng Thuốc (*)" placeholder="Số lượng thuốc..." component={RenderNumberInput}></Field>                                   
                                </div> 
                                <div className="col-md-6 hidden"> 
                                <br/>
                                <Field name="amountNoVat" label="Số Tiền Không VAT (*)" placeholder="Vui lòng nhập số tiền..." component={RenderMoneyFormat}></Field>                                   
                                </div> 
                                <div className="col-md-6 hidden"> 
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
