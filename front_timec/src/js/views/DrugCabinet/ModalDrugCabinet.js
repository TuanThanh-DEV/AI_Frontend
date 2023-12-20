import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderSelect, RenderMoneyFormat} from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_DRUG_CABINET } from './action-types';
import { PermanentCacheService } from '../../services/middleware';


const validate = values => {
    const errors = {};
    // if(!values.name){
    //     errors.name = "Vui lòng nhập tên thuốc!"
    // }
   
    return errors;
}
const mapStateToProps = state => {
    var updateValue = {
        ...state.drugCabinetReducer.updatingDrugCabinet,
    };
    return {
        initialValues: updateValue
    };
};
const mapDispatchToProps = dispatch => ({
    loadDrug: (payload) =>
        dispatch({ type: LOAD_UPDATING_DRUG_CABINET, payload: payload })
});
class ModalDrugCabinet extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            departments : []
           
        }

        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
     };

    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        onHide();
        destroy(); 
    };
    
    handleAdd(values) {
        const {id, onHide} = this.props;
        var userId = PermanentCacheService.getItem("currentUser").id;
        var url = '/drugCabinet/add';
        var bodyObject = {
            name: values.name,
            departmentId : values.departmentId,
            description : values.description,
            userId : userId
        };
        if (id) {
            url = '/drugCabinet/update';
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

    getAllDepartment(){
        let setStateInRequest = (list) => {this.setState({ departments : list})};
        return agent.DepartmentApi.listAllDepartment(
            ).then(function (res) {
                var result = res.resultData;
                if(result){
                    setStateInRequest(result);
                }

            }, function (err) {
                toast.error("Không thể xóa dữ liệu đang được sử dụng từ màn hình khác! ", { autoClose: 15000 });
            });
    }

    componentWillMount() {

        const { loadDrug, id} = this.props;
        if(id){
            const dataPromise = agent.DrugCabinetApi.getDrugCabinet(id);
            loadDrug(Promise.resolve(dataPromise))
        }
        this.getAllDepartment();
    }

    render() {
        const { handleSubmit, submitting, title, invalid } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show,bsSize:"sm",  
        onHide: this.props.onHide, 
        submitting: this.props.submitting };
        const {id} = this.props;
        const dataDepartment = this.state.departments;
        var optionDepartment = []
        if(dataDepartment){
            dataDepartment.map(item =>{
                optionDepartment.push({ label: item.name, value: item.id})
            })
        }
        
        var newModal = null;
        newModal =
            <div style={{ width: '30%' }}>
                <Modal
                    {...modalConfig}
                    aria-labelledby="contained-modal-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-sm"><center>{id ? "Chỉnh Sửa " +  title : "Thêm Mới " + title}</center> </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {submitting ? <LoadingScreen /> :
                            <form className="form-horizontal" role="form" onSubmit={handleSubmit(this.handleAdd)}>
                                 <Field name="name" label="Tên Tủ Thuốc (*)" placeholder="Nhập tên tủ thuốc..." component={RenderInputWithDiv}></Field>
                                 <Field name="departmentId" label="Chuyên Khoa" options={optionDepartment} component={RenderSelect}></Field>
                                 <Field name="description" label="Mô Tả" placeholder="Nhập mô tả..." component={RenderInputWithDiv}></Field>
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
            form: 'ModalDrugCabinet',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalDrugCabinet)));
