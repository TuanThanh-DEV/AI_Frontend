import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderTextArea, RenderDatePicker, RenderSelect, RenderBarcode, RenderCheckbox, RenderMoneyFormat } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_YEAR_BALANCE } from './action-types';
import moment from 'moment';
import isEmail from 'sane-email-validation';
const validate = values => {
    const errors={};
    if (!values.code) {
        errors.code = 'Vui lòng nhập mã số.';
    }
    if (!values.title) {
        errors.title = 'Vui lòng nhập tên chỉ tiêu.';
    }
    return errors
}
var today = moment(new Date, "HH:mm DD/MM/YYYY");
const mapStateToProps = state => {
    var updateValue = {
        ...state.yearBalanceReducer.updatingYearBalance,
        date :state.yearBalanceReducer.updatingYearBalance && state.yearBalanceReducer.updatingYearBalance.date ? moment(state.yearBalanceReducer.updatingYearBalance.date):today,
    };
    return {
        initialValues: updateValue
    };
};
const mapDispatchToProps = dispatch => ({
    loadYearBalance: (payload) =>
        dispatch({ type: LOAD_UPDATING_YEAR_BALANCE, payload: payload })
});
class ModalYearBalance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllAccountCode:[],
            listAllUser: []
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
    }
    getAccountCode(){
         let setStateInRequest = (list) => { this.setState({ listAllAccountCode: list }) }
         return (agent.asyncRequests.get("/accountCode/listAll").then(function(res) {
             var result = res.body.resultData;
             if (result) {
                 setStateInRequest(result)
             } else {
                 toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + res.body.errorMessage, {
                     autoClose: 15000
                 });
             }
         }, function(err) {
             toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", {
                 autoClose: 15000
             });
         }))
     } 
     getUser(){
            let setStateInRequest = (list) => { this.setState({ listAllUser: list }) }
            return (agent.asyncRequests.get("/user/listAll").then(function(res) {
                var result = res.body.resultData;
                if (result) {
                    setStateInRequest(result)
                } else {
                    toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + res.body.errorMessage, {
                        autoClose: 15000
                    });
                }
            }, function(err) {
                toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", {
                    autoClose: 15000
                });
            }))
        } 
    componentWillMount() {
        const { loadYearBalance } = this.props;
        this.getAccountCode(); 
        this.getUser();
        var id = this.props.idYearBalance;
        const dataPromise = agent.YearBalanceApi.getYearBalance(id);
        loadYearBalance(Promise.resolve(dataPromise));
    } 
    handleAdd(values) {
        var onHide = this.props.onHide;
        var id = this.props.idYearBalance;
        var url = '/yearBalance/add';
        var bodyObject = {
            date : values.date,
            code:values.code,
            companyName : values.companyName,
            address : values.address,
            note : values.note,
            hasValidated : values.hasValidated,
            validatedById : values.validatedById,
        };
        if (id) {
            url = '/yearBalance/update';
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
    }
    ///Hide and Clean Value
    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        // event.preventDefault();
        onHide();
        destroy();
    }
    render() {
        // const { objectCompany, listfile, title, onHide } = this.props;
        const { handleSubmit, submitting, title, invalid } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show, bsSize: "medium", onHide: this.props.onHide, submitting: this.props.submitting };
        const dataAccountCode = this.state.listAllAccountCode; 
        var optionAccountCode =[];
        const dataUsers = this.state.listAllUser; 
        if(dataAccountCode){
            dataAccountCode.map(item=>{
                optionAccountCode.push({label: item.code+" - "+ item.title ,value:item.id })
            })
        }
        var optionsValidatedBy = [];
        if(dataUsers){
            dataUsers.map(item=>{
                optionsValidatedBy.push({value:item.id,label:item.fullName})
            })
        }
        var id = this.props.idYearBalance;
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
                                            <Field name="date"                      label="Ngày"                    placeholder="Chọn Ngày ..."            component={RenderDatePicker}></Field>
                                            <Field name="code"               label="Mã Số Báo Cáo"             placeholder="Nhập mã số báo cáo..."                component={RenderInputWithDiv}></Field>
                                            <Field name="companyName"               label="Tên Công Ty"             placeholder="Nhập tên công ty..."                component={RenderInputWithDiv}></Field>
                                            <Field name="address"                   label="Địa Chỉ"                 placeholder="nhập địa chỉ..."               component={RenderInputWithDiv}></Field>
                                            <Field name="note"                      label="Ghi Chú"                 placeholder="Nhập ghi chú..."  rows={3}        component={RenderTextArea}></Field>
                                            <Field name="hasValidated"              checkLabel="Đã Duyệt ?"                   component={RenderCheckbox}></Field>
                                            <Field name="validatedById"             label="Duyệt Bởi ?"             options={optionsValidatedBy}        component={RenderSelect}></Field>
                                    <div className="text-right">
                                        <button type="button" style={{ marginRight: "20px" }} className="btn btn-default" onClick={this.handleHideAndClear} ><i class="icon-cross" aria-hidden="true"></i> Đóng</button>
                                        <button type="submit" className="btn bg-success" disabled={submitting}> Lưu Lại</button>
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
            form: 'ModalYearBalance',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalYearBalance)));
