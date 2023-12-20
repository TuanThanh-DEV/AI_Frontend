import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderTextArea, RenderDatePicker, RenderSelect, RenderBarcode, RenderCheckbox, RenderMoneyFormat } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_TRIAL_BALANCE } from './action-types';
import moment from 'moment';
import isEmail from 'sane-email-validation';
const validate = values => {
    if (!values.code) {
        errors.code = 'Vui lòng nhập mã số.';
    }
    if (!values.title) {
        errors.title = 'Vui lòng nhập tên chỉ tiêu.';
    }
}
var today = moment(new Date, "HH:mm DD/MM/YYYY");
const mapStateToProps = state => {
    var updateValue = {
        ...state.trialBalanceReducer.updatingTrialBalance,
        createdDate:state.trialBalanceReducer.updatingTrialBalance && state.trialBalanceReducer.updatingTrialBalance.createdDate ? moment(state.trialBalanceReducer.updatingTrialBalance.createdDate):today,
    };
    return {
        initialValues: updateValue
    };
};
const mapDispatchToProps = dispatch => ({
    loadTrialBalance: (payload) =>
        dispatch({ type: LOAD_UPDATING_TRIAL_BALANCE, payload: payload })
});
class ModalTrialBalance extends React.Component {
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
    componentWillMount() {
        const { loadTrialBalance } = this.props;
        this.getAccountCode(); 
        var id = this.props.idTrialBalance;
        const dataPromise = agent.TrialBalanceApi.getTrialBalance(id);
        loadTrialBalance(Promise.resolve(dataPromise));
    } 
    handleAdd(values) {
        var onHide = this.props.onHide;
        var id = this.props.idTrialBalance;
        var url = '/trialBalance/add';
        var bodyObject = {
            accountCodeId :values.accountCodeId,
            beginYearAmount :values.beginYearAmount,
            endYearAmount :values.endYearAmount,
            note :values.note,
        };
        if (id) {
            url = '/trialBalance/update';
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
        const modalConfig = { backdrop: 'static', show: this.props.show, bsSize: "lg", onHide: this.props.onHide, submitting: this.props.submitting };
        const dataAccountCode = this.state.listAllAccountCode; 
        var optionAccountCode =[];
        if(dataAccountCode){
            dataAccountCode.map(item=>{
                optionAccountCode.push({label: item.code+" - "+ item.title ,value:item.id })
            })
        }
        var id = this.props.idTrialBalance;
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
                                            <Field name="accountCodeId"     label="Mã Số Kế Toán"        placeholder="Chọn mã số kế toán..."            component={RenderDatePicker}></Field>
                                            <Field name="beginYearAmount"   label="Số Đầu Kỳ"            placeholder="Nhập số đầu kỳ..."                component={RenderMoneyFormat}></Field>
                                            <Field name="endYearAmount"     label="Số Cuối Kỳ"           placeholder="Chọn số cuối kỳ..."               component={RenderMoneyFormat}></Field>
                                            <Field name="note"              label="Ghi Chú"              placeholder="Nhập ghi chú..."  rows={3}        component={RenderTextArea}></Field>
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
            form: 'ModalTrialBalance',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalTrialBalance)));
