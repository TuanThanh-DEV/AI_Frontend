import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv,  RenderDatePicker,  RenderSelect} from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_INSURANCEMAPPING } from './action-types';
import moment from 'moment';

const validate = values => {
    const errors = {};
    // if(!values.status){
    //     errors.status = "Vui lòng nhập nội dung cuộc hẹn!"
    // }
    if (moment(values.endDateValid) < moment(values.startDateValid) ) {
        errors.endDateValid = 'Ngày cấp không được lớn hơn ngày ngày hết hạn!, vui lòng thử lại!'
    }
    return errors;
}
const mapStateToProps = state => {
    var updateValue = {
        ...state.insuranceMappingReducer.updatingInsuranceMapping,
        startDateValid: state.insuranceMappingReducer.updatingInsuranceMapping && state.insuranceMappingReducer.updatingInsuranceMapping.startDateValid ? moment(state.insuranceMappingReducer.updatingInsuranceMapping.startDateValid) : null,
        endDateValid: state.insuranceMappingReducer.updatingInsuranceMapping && state.insuranceMappingReducer.updatingInsuranceMapping.endDateValid ? moment(state.insuranceMappingReducer.updatingInsuranceMapping.endDateValid) : null,
    };
    return {
        initialValues: updateValue
    };
};
const mapDispatchToProps = dispatch => ({
    loadInsuranceMapping: (payload) =>
        dispatch({ type: LOAD_UPDATING_INSURANCEMAPPING, payload: payload })
});
class ModalInsuranceMapping extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllDrug:[],
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
        var id = this.props.idInsuranceMapping;
        var url = '/insuranceMapping/add';
        var bodyObject = {
            drugId: values.drugId,
            insuranceItemCode: values.insuranceItemCode,
            startDateValid: values.startDateValid,
            endDateValid: values.endDateValid,
            
        };
        if (id) {
            url = '/insuranceMapping/update';
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
        const { loadInsuranceMapping } = this.props;
        var id = this.props.idInsuranceMapping;
        {
            const dataPromise = agent.InsuranceMappingApi.getInsuranceMapping(id);
            loadInsuranceMapping(Promise.resolve(dataPromise))
        }
        this.getlistAllDrug();
        
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
   

    render() {
        const { handleSubmit, submitting, title, invalid } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show,bsSize:"md",
        onHide: this.props.onHide, 
        submitting: this.props.submitting };
        // var id = this.props.idInsuranceMapping;

        var optionDrug = []; 
        this.state.listAllDrug.map(item=>{
            optionDrug.push({label:item.name,value:item.id})
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
                                <Field name="drugId" label="Tên Thuốc"  options={optionDrug} component={RenderSelect}></Field>  
                                </div>  
                                <div className="col-md-6"> 
                                <br/>
                                <Field name="insuranceItemCode" label="Mã Bảo Hiểm"  placeholder="Vui lòng nhập mã bảo hiểm..." component={RenderInputWithDiv}></Field>  
                                </div>
                                <div className="col-md-6"> 
                                <br/>
                                <Field name="startDateValid" label="Ngày Cấp"  component={RenderDatePicker}></Field>                      
                                </div>    
                                <div className="col-md-6"> 
                                <br/>
                                <Field name="endDateValid" label="Ngày Hết Hạn" component={RenderDatePicker}></Field>                      
                                </div>
                                                                                     
                                </div>
                                <br/>
                                <div className="text-right">
                                <button type="button"  style={{marginRight:"20px"}} className="btn btn-default" onClick={this.handleHideAndClear} ><i class="icon-cross" aria-hidden="true"></i> Đóng</button>                                
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
            form: 'ModalInsuranceMapping',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalInsuranceMapping)));
