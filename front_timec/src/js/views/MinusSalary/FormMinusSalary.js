import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderTextArea, RenderSelect, RenderDatePickerWithTime, RenderInputWithDiv,RenderNumberInput, RenderMoneyFormat } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_MINUS_SALARY } from './action-types';


const validate = values => {
    const errors = {};
    if(!values.name){
        errors.name = "Vui lòng nhập chú thích!"
    }
    if(!values.amount){
        errors.amount = "Vui lòng nhập số tiền!"
    }
    return errors;
}
const mapStateToProps = state => {
    var updateValue = {
        ...state.minusSalaryReducer.updatingMinusSalary
    };
    return {
        initialValues: updateValue
    };
};
const mapDispatchToProps = dispatch => ({
    loadMinusSalary : (payload) =>
        dispatch({ type: LOAD_UPDATING_MINUS_SALARY, payload: payload }),
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "FormMinusSalary", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});

class FormMinusSalary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           listAllMinusSalary : null,
           idMinusSalary: null
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.handleUpdateSalary = this.handleUpdateSalary.bind(this);
    };
    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        this.handleUpdateSalary();
        onHide();
        // destroy();
    }
    handleUpdateSalary(){
        const {onHide} = this.props;
        var idUserSalary = this.props.idUserSalary;
        return agent.asyncRequests.get("/userSalary/udateSalaryById?id="+idUserSalary
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
    }
    handleAdd(values) {
        const {destroy} = this.props;
        var id = this.props.idMinusSalary;
        var id = this.state.idMinusSalary;
        var idUserSalary = this.props.idUserSalary;
        var _this = this;
        var url = '/minusSalary/add';
        var bodyObject = {
            name: values.name,
            amount: values.amount,
            userSalaryId : idUserSalary
        };
        if (id) {
            url = '/minusSalary/update';
            bodyObject.id = id;
        }
        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && result.id) {
                _this.getlistAllMinusSalaryByUserSalaryId(idUserSalary);
                destroy();
            } else {
                toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    };

    componentWillMount() {
        var id = this.props.idUserSalary;
        this.getlistAllMinusSalaryByUserSalaryId(id);
    }
    getlistAllMinusSalaryByUserSalaryId(id) {
        let setStateInRequest = (list) => { this.setState({ listAllMinusSalary: list }) }
        return agent.asyncRequests.get("/minusSalary/listByUserSalaryId?userSalaryId="+id
        ).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    }
    handleEditMinusSalary(item){
        const {updateField} = this.props;
        updateField("name", item.name);
        updateField("amount", item.amount);
        this.setState({
            idMinusSalary : item.id
        })
    }
    handleDeleteMinusSalary(id){
        if (confirm("Bạn có chắc sẽ xoá:")) {
            var _this = this;
            var idUserSalary = this.props.idUserSalary;
            var url = `/minusSalary/${id}`;
            return agent.asyncRequests.del(url
            ).then(function (res) {
                var result = res.body.resultData;
                if (result && !result.error) {
                _this.getlistAllMinusSalaryByUserSalaryId(idUserSalary);
                    
                } else {
                    toast.error("Có lỗi khi xóa dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Không thể xóa dữ liệu đang được sử dụng từ màn hình khác! ", { autoClose: 15000 });
            });
        } else {
        }
    }
    render() {
        const { handleSubmit, submitting, title} = this.props;
        const modalConfig = {
            backdrop: 'static', show: this.props.show, bsSize: "medium",
            onHide: this.props.onHide,
            submitting: this.props.submitting
        };

        var listAllMinusSalary = this.state.listAllMinusSalary;
        if(listAllMinusSalary){
            var row = listAllMinusSalary.map( item =>{
                return (
                    <tr>
                        <td>{item.name}</td>
                        <td>{item.amount}</td>
                        <td>
                            <a onClick={()=> this.handleEditMinusSalary(item)}><i className="icon-pencil4"></i></a>
                        </td>
                        <td>
                            <a onClick={()=> this.handleDeleteMinusSalary(item.id)}><i className="icon-cross2"></i></a>
                        </td>
                    </tr>
                )
            })
        }
        var newModal = null;
        newModal =
            <div style={{ width: '30%' }}>
                <Modal data-keyboard="false"
                    {...modalConfig}
                    aria-labelledby="contained-modal-title-lg"
                >


                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-large"><center>{title}</center></Modal.Title>

                    </Modal.Header>

                    <Modal.Body   >
                        {submitting ? <LoadingScreen /> :
                        <div>
                            <form className="form-horizontal" role="form" onSubmit={handleSubmit(this.handleAdd)}>
                                <div className="form-group">
                                    <div className="row">

                                        <div className="col-md-5 ">
                                            <Field  name="name" label="Chú Thích Thêm (*)" placeholder="Vui lòng nhập chú thích..."  component={RenderInputWithDiv}></Field>
                                        </div>
                                        <div className="col-md-5 ">
                                            <Field  name="amount" label="Số Tiền (*)" placeholder="Vui lòng nhập số tiền..."  component={RenderMoneyFormat}></Field>
                                        </div>
                                        <div>
                                            <button style={{marginTop: "30px"}} type="submit" className="btn bg-success" disabled={submitting}>Lưu Lại</button>
                                        </div>
                                    </div>
                                    
                                </div>
                            </form>
                            <table className="table table-bordered table-xxs">
                                <thead>
                                    <tr className="bg-teal">
                                        <th ><center>Chú Thích Trừ</center></th>
                                        <th ><center>Số Tiền</center></th>
                                        <th width="10%" ></th>
                                        <th width="10%" ></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {row}
                                </tbody>
                            </table>
                            <br/>
                                    <div className="text-right">
                                            <button type="button" style={{marginRight:"20px"}} className="btn btn-default" onClick={this.handleHideAndClear} ><i class="icon-cross" aria-hidden="true"></i> Đóng</button>
                                            <button type="button" className="btn bg-success" onClick={this.handleUpdateSalary} > Cập Nhật</button>
                                        </div>
                        </div> }
                    </Modal.Body>
                </Modal>
            </div>
        return newModal;
    }
};
export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'FormMinusSalary',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(FormMinusSalary)));
