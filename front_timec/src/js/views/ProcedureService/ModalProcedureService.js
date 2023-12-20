import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderSelect } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_PROCEDURESERVICE } from './action-types';

const validate = values => {
    const errors = {};
    if(!values.name){
        errors.name = "Vui lòng nhập tên dịch vụ thủ thuật!"
    }
    if(!values.departmentId){
        errors.departmentId =  "Vui lòng chọn chuyên khoa!"
    }
    return errors;
}
const mapStateToProps = state => {
    var updateValue = {
        ...state.procedureServiceReducer.updatingProcedureService,
    };
    return {
        initialValues: updateValue
    };
};
const mapDispatchToProps = dispatch => ({
    loadProcedureService: (payload) =>
        dispatch({ type: LOAD_UPDATING_PROCEDURESERVICE, payload: payload })
});
class ModalProcedureService extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listAllDepartment: [],
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
     };

     getlistAllDepartment(){
        let setStateInRequest = (list) => { this.setState({ listAllDepartment: list }) }
        return agent.DepartmentApi.listAllDepartment(
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

    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        onHide();
        destroy(); }
    handleAdd(values) {
        var onHide = this.props.onHide;
        var id = this.props.idProcedureService;
        var url = '/procedureService/add';
        var bodyObject = {
            name: values.name,
            price: values.price,
            departmentId: values.departmentId,
            code: values.code,
        };
        if (id) {
            url = '/procedureService/update';
            bodyObject.id = id;
        }
        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && result.id) {
                onHide();
                toast.info("Lưu Thành Công.", {autoClose: 1000});
            } else {
                toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    };

    componentWillMount() {
        const { loadProcedureService } = this.props;
        var id = this.props.idProcedureService;
        {
            const dataPromise = agent.ProcedureServiceApi.getProcedureService(id);
            loadProcedureService(Promise.resolve(dataPromise))
        }

        this.getlistAllDepartment();

    }
    render() {
        const { handleSubmit, submitting, title, invalid } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show,bsSize:"sm",  
        onHide: this.props.onHide, 
        submitting: this.props.submitting };

        var optionAllDepartment=[];
        var dataListDepartment = this.state.listAllDepartment;
        if(dataListDepartment){
            dataListDepartment.map(item=>{
                optionAllDepartment.push({label:item.name,value:item.id});
            })
        }
     
        var id = this.props.idProcedureService;
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
                                <Field name="departmentId" label="Chuyên Khoa"  options={optionAllDepartment} component={RenderSelect} ></Field>
                                <Field name="name" label="Tên Dịch vụ Thủ Thuật (*)" placeholder="Nhập tên dịch vụ thủ thuẩt..." component={RenderInputWithDiv}></Field>     
                                <Field name="code" label="Mã Dịch Vụ Thủ Thuật" component={RenderInputWithDiv}></Field>
                                <Field name="price" label="Đơn Giá" placeholder="Nhập đơn giá..." component={RenderInputWithDiv}></Field>                                
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
            form: 'ModalProcedureService',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalProcedureService)));
