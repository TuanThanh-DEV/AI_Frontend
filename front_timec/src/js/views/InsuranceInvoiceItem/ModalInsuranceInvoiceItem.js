import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderSelect, RenderNumberInput, RenderMoneyFormat } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_INSURANCEINVOICEITEM } from './action-types';


const validate = values => {
    const errors = {};
    if(!values.insuranceInvoiceId){
        errors.insuranceInvoiceId = "Vui lòng chọn hóa đơn!"
    }
    if(!values.insuranceMappingId){
        errors.insuranceMappingId = "Vui lòng chọn mapping bảo hiểm!"
    }
    if(values.insurancePercent > 101){
        errors.insurancePercent = "Bảo hiểm không được vượt quá 100%"
    }
    return errors;
}
const mapStateToProps = state => {
    var updateValue = {
        ...state.insuranceInvoiceItemReducer.updatingInsuranceInvoiceItem,


    };
    return {
        initialValues: updateValue
    };
};
const mapDispatchToProps = dispatch => ({
    loadInsuranceInvoiceItem: (payload) =>
        dispatch({ type: LOAD_UPDATING_INSURANCEINVOICEITEM, payload: payload })
});
class ModalInsuranceInvoiceItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllInsuranceInvoice:[],
            listAllInsuranceMapping:[],
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
        var id = this.props.idInsuranceInvoiceItem;
        var url = '/insuranceInvoiceItem/add';
        var bodyObject = {
            insuranceInvoiceId: values.insuranceInvoiceId,
            insuranceMappingId: values.insuranceMappingId,
            originAmount: values.originAmount,
            insurancePercent: values.insurancePercent,
            insuranceAmount: values.insuranceAmount,
            
        };
        if (id) {
            url = '/insuranceInvoiceItem/update';
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
        const { loadInsuranceInvoiceItem } = this.props;
        var id = this.props.idInsuranceInvoiceItem;
        {
            const dataPromise = agent.InsuranceInvoiceItemApi.getInsuranceInvoiceItem(id);
            loadInsuranceInvoiceItem(Promise.resolve(dataPromise))
        }
        this.getlistAllInsuranceInvoice();
        this.getlistAllInsuranceMapping();
        
    }
    getlistAllInsuranceInvoice(){
        let setStateInRequest = (list) => { this.setState({ listAllInsuranceInvoice: list }) }
        return agent.InsuranceInvoiceApi.listAllInsuranceInvoice().then(function (res) {
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
   
    getlistAllInsuranceMapping(){
        let setStateInRequest = (list) => { this.setState({ listAllInsuranceMapping: list }) }
        return agent.InsuranceMappingApi.listAllInsuranceMapping().then(function (res) {
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
        const modalConfig = { backdrop: 'static', show: this.props.show,bsSize:"md",
        onHide: this.props.onHide, 
        submitting: this.props.submitting };
        // var id = this.props.idInsuranceInvoiceItem;

        var optionInsuranceInvoice = []; 
        this.state.listAllInsuranceInvoice.map(item=>{
            optionInsuranceInvoice.push({label:item.id,value:item.id})
        })
      
        var optionInsuranceMapping = []; 
        this.state.listAllInsuranceMapping.map(item=>{
            optionInsuranceMapping.push({label:item.id,value:item.id})
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
                                <br/>
                                <Field name="insuranceInvoiceId" label="Hóa Đơn Bảo Hiểm"  options={optionInsuranceInvoice} component={RenderSelect}></Field>  
                                </div>  
                                <div className="col-md-6"> 
                                <br/>
                                <Field name="insuranceMappingId" label="Bảo Hiểm Mapping" options={optionInsuranceMapping}  component={RenderSelect}></Field>  
                                </div>
                                <div className="col-md-6"> 
                                <br/>
                                <Field name="originAmount" label="Số Tiền Gốc"  component={RenderMoneyFormat}></Field>                      
                                </div>    
                                <div className="col-md-6"> 
                                <br/>
                                <Field name="insurancePercent" label="Phần Trăm Bảo Hiểm" component={RenderInputWithDiv}></Field>                      
                                </div>
                                <div className="col-md-6"> 
                                <br/>
                                <Field name="insuranceAmount" label="Tiền Bảo Hiểm" component={RenderMoneyFormat}></Field>                      
                                </div>                                              
                                </div>
                                <br/>
                                <div className="text-right">
                                <button type="button"  style={{marginRight:"20px"}}className="btn btn-default" onClick={this.handleHideAndClear} ><i class="icon-cross" aria-hidden="true"></i> Đóng</button>                                
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
            form: 'ModalInsuranceInvoiceItem',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalInsuranceInvoiceItem)));
