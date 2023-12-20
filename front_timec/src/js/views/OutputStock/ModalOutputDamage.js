import React from 'react';
import { Modal } from 'react-bootstrap';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Field, reduxForm } from 'redux-form';
import { LoadingScreen } from '../../components/commonWidgets';
import { RenderSelect } from '../../components/formInputs';
import agent from '../../services/agent';
import { PermanentCacheService } from '../../services/middleware';
import { LOAD_UPDATING_OUTPUT_FORM } from '../OutputForm/action-types';

const validate = values => {
    const errors = {};
    if (!values.drugStoreId) {
        errors.drugStoreId = 'Vui lòng chọn kho thốc!';
    }
    if (values.drugStoreId == values.toDrugStoreId) {
        errors.toDrugStoreId = 'Hai kho không được trùng nhau!';
    }
    return errors;
}
const mapStateToProps = state => {
    var updateValue = {
        ...state.outputFormReducer.updatingOutputForm,
    };
    return {
        initialValues: updateValue ,
        currentUser: state.common.currentUser,
    };
};
const mapDispatchToProps = dispatch => ({
    loadOutputForm: (payload) =>
        dispatch({ type: LOAD_UPDATING_OUTPUT_FORM, payload: payload })
});
class ModalOutputDamage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllDrugStore : null,
            lisstAllSupplier : null
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
     };

     getlistAllDrugStore(){
        let setStateInRequest = (list) => { this.setState({ listAllDrugStore: list }) }
        return agent.DrugStoreApi.listAllDrugStore(
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

    getAllSupplier(){
        let setStateInRequest = (list) => { this.setState({ lisstAllSupplier: list }) }
        return agent.SupplierApi.listAllSupplier(
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
  

    componentWillMount() {
        const {loadOutputForm, idOutputForm } = this.props;
        this.getlistAllDrugStore();
        this.getAllSupplier();
        if (idOutputForm != null) {
            const dataPromise = agent.OutputFormApi.getOutputForm(idOutputForm);
            loadOutputForm(Promise.resolve(dataPromise))
        }
    }
    
    handleAdd(values) {
        var {onHide, idOutputForm} = this.props;
        var currentUser = PermanentCacheService.getItem("currentUser");
       
        var bodyObject = {
            drugStoreId : values.drugStoreId,
            createdUserId : currentUser.id,
            toDrugStoreId : values.toDrugStoreId,
            supplierId : values.supplierId,
            outputFormType : 'DAMAGE_DRUG'
        };
        var url = '/outputForm/newOutputForm';
        if(idOutputForm){
            var url = '/outputForm/moveStock';
            bodyObject.id = idOutputForm;
        }
        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && result.id) {
                onHide();
                window.location.href = "/outputForm/" + result.id;
            } else {
                toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    };

    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        onHide();
        destroy(); }
    

    render() {
        const { handleSubmit, submitting, title, invalid,isUpdateStatus, idOutputForm } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show,bsSize:"sm",  
        onHide: this.props.onHide, 
        submitting: this.props.submitting };

        const dataDrugStore = this.state.listAllDrugStore;
        const dataSupplier = this.state.lisstAllSupplier;
        var optionDrugStore = [];
        let optionSupplier=[];
        if(dataSupplier){
            dataSupplier.map( item=>{
                optionSupplier.push({label : item.name, value : item.id})
            })
        }
        if(dataDrugStore){
            dataDrugStore.map(item=>{
                optionDrugStore.push({label:item.name + ' / ' +(item.hospital ? item.hospital.name : null ), value:item.id});
            })
        }
        var labelSubmit = idOutputForm ?  "Lưu" : "Tạo" ;
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
                                <Field disabled={idOutputForm ? true : false} name="drugStoreId" label="Chon Kho Xuất Thuốc"    placeholder="Chọn Kho Xuất..." options={optionDrugStore} component={RenderSelect}></Field>
                                <div className="text-right">
                                    <button type="button" style={{marginRight:"20px"}} className="btn btn-default" onClick={this.handleHideAndClear} ><i class="icon-cross" aria-hidden="true"></i> Đóng</button>                                
                                    <button type="submit"  className="btn bg-success" disabled={submitting}> {labelSubmit}  </button>
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
            form: 'ModalOutputDamage',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalOutputDamage)));
