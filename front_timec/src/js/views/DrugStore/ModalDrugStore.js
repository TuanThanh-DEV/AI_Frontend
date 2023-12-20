import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderSelect } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_DRUGSTORE } from './action-types';

const validate = values => {
    const errors = {};
    if(!values.name){
        errors.name = "Vui lòng nhập tên kho thuốc!"
    }
   
    return errors;
}
const mapStateToProps = state => {
    var updateValue = {
        ...state.drugStoreReducer.updatingDrugStore,
    };
    return {
        initialValues: updateValue
    };
};
const mapDispatchToProps = dispatch => ({
    loadDrugStore: (payload) =>
        dispatch({ type: LOAD_UPDATING_DRUGSTORE, payload: payload })
});
class ModalDrugStore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllHospital:[],
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
        var id = this.props.idDrugStore;
        var url = '/drugStore/add';
        var bodyObject = {
            name: values.name,
            description: values.description,
            hospitalId: values.hospitalId,
        };
        if (id) {
            url = '/drugStore/update';
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
        const { loadDrugStore } = this.props;
        var id = this.props.idDrugStore;
      
            const dataPromise = agent.DrugStoreApi.getDrugStore(id);
            loadDrugStore(Promise.resolve(dataPromise))
        

        this.getlistAllHospital();
    }

    getlistAllHospital(){
        let setStateInRequest = (list) => { this.setState({ listAllHospital: list }) }
        return agent.HospitalApi.listAllHospital().then(function (res) {
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
        const modalConfig = { backdrop: 'static', show: this.props.show,bsSize:"sm",  
        onHide: this.props.onHide, 
        submitting: this.props.submitting };

        var optionHospital = []; 
        this.state.listAllHospital.map(item=>{
            optionHospital.push({label:item.name,value:item.id})
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
                                <Field name="name" label="Quầy Thuốc(*)" placeholder="Nhập tên quầy thuốc..." component={RenderInputWithDiv}></Field>
                                <Field name="description" label="Mô Tả" placeholder="Nhập mô tả..." component={RenderInputWithDiv}></Field>
                                <Field name="hospitalId" label="Thuộc Phòng Khám"  options={optionHospital}  component={RenderSelect}></Field>

                                
                                <div className="text-right">
                                <button type="button" style={{marginRight:"20px"}} className="btn btn-default" onClick={this.handleHideAndClear} ><i class="icon-cross" aria-hidden="true"></i> Đóng</button>                                
                                <button type="submit"  className="btn bg-success" disabled={submitting}> Lưu Lại</button>
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
            form: 'ModalDrugStore',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalDrugStore)));
