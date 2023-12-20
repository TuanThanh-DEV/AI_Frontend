import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import {  RenderSelect, RenderNumberInput, RenderMoneyFormat} from '../../components/formInputs';
import { Field, reduxForm,formValueSelector } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_PRESCRIPTIONITEM } from './action-types';


const validate = values => {
    const errors = {};
    if(!values.numberOfDays){
        errors.numberOfDays = 'Vui lòng nhập số ngày!'
    }  
    if(!values.name){
        errors.name = "Vui lòng nhập tên ICD!"
    }  
    if(!values.drugId){
        errors.drugId = "Vui lòng chọn Thuốc!"
    }  
    return errors;
}
const selector = formValueSelector("ModalPrescriptionItem")
const mapStateToProps = state => {
    var updateValue = {
        ...state.prescriptionItemReducer.updatingPrescriptionItem,
    };
    return {
        initialValues: updateValue,
            morningAmount: selector(state,"morningAmount"),
            noonAmount: selector(state,"noonAmount"),
            afternoonAmount: selector(state,"afternoonAmount"),
            eveningAmount: selector(state,"eveningAmount"),
            numberOfDays: selector(state,"numberOfDays"),
    };
};
const mapDispatchToProps = dispatch => ({
    loadPrescriptionItem: (payload) =>
        dispatch({ type: LOAD_UPDATING_PRESCRIPTIONITEM, payload: payload }),
        updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalPrescriptionItem", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});
class ModalPrescriptionItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllPrescription:[],
            listAllStock:[],
            listAllPatient:[],
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.handleTotalDrugQuantity= (
            morningAmount,
            noonAmount,
            afternoonAmount,
            eveningAmount,
            numberOfDays
        ) => {
            const {updateField} = this.props;
            var morningAmount = morningAmount?morningAmount: 0
            var noonAmount = noonAmount?noonAmount: 0
            var afternoonAmount = afternoonAmount?afternoonAmount: 0
            var eveningAmount = eveningAmount?eveningAmount: 0
            var numberOfDays = numberOfDays?numberOfDays: 0
            if(morningAmount &&
                noonAmount &&
                afternoonAmount &&
                eveningAmount &&
                numberOfDays){
                    setTimeout(() => {
                    updateField("totalAmount",
                    ((parseInt(morningAmount) +parseInt(noonAmount)+parseInt(afternoonAmount)+parseInt(eveningAmount)) * parseInt(numberOfDays) )
                    )
                }, 100);  

                }
        }
     };
    handleHideAndClear() {
        const { destroy, onHide,  } = this.props;
        onHide();
        //onHideTab();
        destroy(); 
    }
    handleAdd(values) {
        var onHide = this.props.onHide;
        var {reload} = this.props;
        var id = this.state.idPrescriptionItem;
        
        var url = '/prescriptionItem/add';
        var bodyObject = {
            
            prescriptionId: values.prescriptionId,
            drugId: values.drugId,
            morningAmount: values.morningAmount,
            noonAmount: values.noonAmount,
            afternoonAmount: values.afternoonAmount,
            eveningAmount: values.eveningAmount,
            numberOfDays: values.numberOfDays,
           
            totalAmount: (values.morningAmount?values.morningAmount:0) * values.numberOfDays + 
            (values.noonAmount?values.noonAmount:0) * values.numberOfDays + (values.afternoonAmount?values.afternoonAmount:0) * values.numberOfDays + 
            (values.eveningAmount?values.eveningAmount:0) * values.numberOfDays,

            instruction: "Sáng " + (values.morningAmount ? values.morningAmount : 0) + " , Trưa " + (values.noonAmount  ? values.noonAmount :0)
            + " , Chiều " + (values.afternoonAmount ? values.afternoonAmount : 0) + " , Tối " + (values.eveningAmount ? values.eveningAmount : 0 ),

        };
       
        if (id) {
            url = '/prescriptionItem/update';
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
        const { loadPrescriptionItem} = this.props;
        var id = this.props.idPopupPrescriptionItem;
        const dataPromise = agent.PrescriptionItemApi.getPrescriptionItem(id);
        loadPrescriptionItem(Promise.resolve(dataPromise))
        this.getlistAllPrescription();
        this.getlistAllStock();
        this.getlistAllPatient();
    }

    getlistAllStock(){
        let setStateInRequest = (list) => { this.setState({ listAllStock: list }) }
        return agent.StockApi.listAllStock(
            ).then(function (res) {
                var result = res.resultData;
                if (result) {
                    setStateInRequest(result);
                } else {
                    toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                +" Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
            });
    }
    getlistAllPatient(){
        const {patientId,updateField} = this.props;
        let setStateInRequest = (list) => { this.setState({ listAllPatient: list }) }
        return agent.PatientApi.listAllPatient(
            ).then(function (res) {
                var result = res.resultData;
                if (result) {
                    setStateInRequest(result);
                    if(patientId && patientId != 'new'){
                        setTimeout(() => {
                        updateField("patientId",patientId);
                        }, 100);   
                    }
                } else {
                    toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                +" Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
            });
    }

    getlistAllPrescription(){
        const {updateField,prescriptionId} = this.props;
        let setStateInRequest = (list) => { this.setState({ listAllPrescription: list }) }
        return agent.PrescriptionApi.listAllPrescription(
            ).then(function (res) {
                var result = res.resultData;
                if (result) {
                    setStateInRequest(result);
                    if(prescriptionId && prescriptionId != 'new'){
                        updateField("prescriptionId",prescriptionId);
                        
                    }
                } else {
                    toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                +" Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
            });
    }

    render() {
        const { handleSubmit, submitting, title, invalid,morningAmount,
            noonAmount,
            afternoonAmount,
            eveningAmount,
            numberOfDays } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show,bsSize:"sm",  
        onHide: this.props.onHide, 
        submitting: this.props.submitting };
        var id = this.props.idPrescriptionItem;
        var optionPrecsription = []; 
        this.state.listAllPrescription.map(item=>{
            optionPrecsription.push({label:(item.patient ? item.patient.fullName :"")+ ' - '+ (item.department ? item.department.name : ""), value:item.id})
        })

        var optionPatient = []; 
        this.state.listAllPatient.map(item=>{
            optionPatient.push({label:item.fullName , value:item.id})
        })
        // var morningAmount = 0;
        // var noonAmount = 0;
        // var afternoonAmount = 0;
        // var eveningAmount = 0;
        // var numberOfDays = 0;
        // var totalAmountgen = (noonAmount + morningAmount + afternoonAmount + eveningAmount)*numberOfDays;
        var optionStock = []; 
        this.state.listAllStock.map(item=>{
            optionStock.push({label:item.drug.name + " " + item.drug.hamLuongBHYT + ' (' + item.available +')', value:item.id})
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

                                <div className="col-md-6"> 
                                <br/>
                                <Field  disabled={true} name="prescriptionId" label="Phiếu Khám Bệnh" placeholder="Chọn tên bệnh nhân ..." options={optionPrecsription} component={RenderSelect}></Field>                      
                                </div>
                                <div className="col-md-6"> 
                                <br/>
                                <Field disabled={true} name="patientId" label="Tên bệnh nhân (*)" placeholder="Chọn tên bệnh nhân ..." options={optionPatient} component={RenderSelect}></Field>                      
                                </div>
                                <div className="col-md-6"> 
                                <br/>
                                <Field name="drugId" label="Thuốc (*)" options={optionStock}  component={RenderSelect}></Field>
                                </div>  
                                <div className="col-md-6"> 
                                <br/>
                                <Field name="morningAmount" label="Buổi sáng" placeholder="Số lượng buổi sáng..." onChangeAction={(value)=> this.handleTotalDrugQuantity(value,noonAmount, afternoonAmount ,eveningAmount,numberOfDays)} component={RenderNumberInput}></Field>
                                </div>
                              
                                 <div className="col-md-6">   
                                <br/>     
                                <Field name="noonAmount" label="Buổi trưa" placeholder="Số lượng buổi trưa..." onChangeAction={(value)=> this.handleTotalDrugQuantity(morningAmount,value, afternoonAmount ,eveningAmount,numberOfDays)} component={RenderNumberInput}></Field>
                                </div>
                                <div className="col-md-6">   
                                <br/>     
                                <Field name="afternoonAmount" label="Buổi chiều" placeholder="Số lượng buổi chiều..." onChangeAction={(value)=> this.handleTotalDrugQuantity(morningAmount,noonAmount, value ,eveningAmount,numberOfDays)} component={RenderNumberInput}></Field>
                                </div> 
                                {/* <div className="col-md-6">   
                                <br/>     
                                <Field name="insuranceInvoice.id" label="Hóa Đơn Bảo Hiểm" options={optionInsuranceInvoice} component={RenderSelect}></Field> 
                                </div>                                  */}
                                <div className="col-md-6"> 
                                <br/>
                                <Field name="eveningAmount" label="Buổi tối" placeholder="Số lượng buổi tối..." onChangeAction={(value)=> this.handleTotalDrugQuantity(morningAmount,noonAmount, afternoonAmount ,value,numberOfDays)} component={RenderNumberInput}></Field>
                                </div>  
                                <div className="col-md-6"> 
                                <br/>
                                <Field name="numberOfDays" label="Số ngày(*)" placeholder="Nhập số ngày..." onChangeAction={(value)=> this.handleTotalDrugQuantity(morningAmount,noonAmount, afternoonAmount ,eveningAmount,value)} component={RenderNumberInput}></Field>
                                </div> 
                                 <div className="col-md-12">   
                                <br/>     
                                <Field name="totalAmount" label="Tổng cộng" placeholder="Tổng cộng ..." component={RenderMoneyFormat}></Field>
                                </div>
                                
                                
                                </div>
                                <div className="text-right">
                                    <br />
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
            form: 'ModalPrescriptionItem',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalPrescriptionItem)));






      


                               
                                
                               