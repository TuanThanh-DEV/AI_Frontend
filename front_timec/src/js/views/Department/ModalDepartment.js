import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderSelect, RenderCheckbox } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_DEPARTMENT } from './action-types';

const validate = values => {
    const errors = {};
    if(!values.description){
        errors.description = "Vui lòng nhập mã Chuyên Khoa!"
    }  
    if(!values.name){
        errors.name = "Vui lòng nhập tên Chuyên Khoa!"
    }  
    if(!values.hospital){
        errors.hospital = {id: "Vui lòng chọn Phòng Khám"}
    }  
    return errors;
}
const mapStateToProps = state => {
    var updateValue = {
        ...state.departmentReducer.updatingDepartment,
        // hospital: state.departmentReducer.updatingDepartment && state.departmentReducer.updatingDepartment.hospital ? state.departmentReducer.updatingDepartment.hospital : "KHONG",
    };
    return {
        initialValues: updateValue
    };
};
const mapDispatchToProps = dispatch => ({
    loadDepartment: (payload) =>
        dispatch({ type: LOAD_UPDATING_DEPARTMENT, payload: payload }),
        updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalDepartment", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});
class ModalDepartment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllHospital:[],
        }

        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
     };
    handleHideAndClear() {
        const { destroy, onHide, idHospitalForDepartment } = this.props;
        onHide(idHospitalForDepartment);
        destroy(); 
    }
    handleAdd(values) {
        var {onHide, idHospitalForDepartment} = this.props;
        var id = this.props.idDepartment;
        var url = '/department/add';
        var bodyObject = {
            description: values.description,
            name: values.name,
            hospitalId : values.hospitalId,
            hasActive : values.hasActive,
            departmentCode : values.departmentCode,
            maBhyt : values.maBhyt,
            tenBhyt : values.tenBhyt,
        };
        if (id) {
            url = '/department/update';
            bodyObject.id = id;
        }
        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && result.id) {
                onHide(idHospitalForDepartment);
            } else {
                toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    };

    componentWillMount() {
        const { loadDepartment, idHospitalForDepartment, updateField } = this.props;
        var id = this.props.idDepartment;
        
            const dataPromise = agent.DepartmentApi.getDepartment(id);
            loadDepartment(Promise.resolve(dataPromise))
        
        this.getlistAllHospital();
        if(idHospitalForDepartment){
            updateField("hospitalId", idHospitalForDepartment);
        }
        
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
            optionHospital.push({label:item.name ,value:item.id})
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
                                <Field name="departmentCode" label="Mã Chuyên Khoa (*)" placeholder="ví dụ P012..." component={RenderInputWithDiv}></Field>
                                <Field name="name" label="Tên Chuyên Khoa (*)" placeholder="Nhập tên Chuyên Khoa..." component={RenderInputWithDiv}></Field>
                                <Field name="description" label="Mô Tả Chuyên Khoa (*)" placeholder="Nhập Mô Tả Chuyên Khoa..." component={RenderInputWithDiv}></Field>
                                <Field name="maBhyt" label="Mã BHYT" placeholder="Nhập Mã BHYT..." component={RenderInputWithDiv}></Field>
                                <Field name="tenBhyt" label="Tên BHYT" placeholder="Nhập Tên BHYT..." component={RenderInputWithDiv}></Field>
                                <Field name="hospitalId" label="Phòng Khám" options={optionHospital} component={RenderSelect}></Field>
                                <Field name="hasActive" label="Trạng Thái" checkLabel="Đang Hoạt Động"  component={RenderCheckbox}></Field>
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
            form: 'ModalDepartment',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalDepartment)));
