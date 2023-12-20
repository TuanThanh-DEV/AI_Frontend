import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderTextArea, RenderDatePicker, RenderSelect, RenderBarcode, RenderCheckbox } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_BILLING } from './action-types';
import moment from 'moment';
import isEmail from 'sane-email-validation';


const validate = values => {
    const errors = {};
    // const regexp = /^\d{10,11}$/;
    // const phone = regexp.exec(values.phone);
    // const fatherPhone = regexp.exec(values.fatherPhone);
    // const motherPhone = regexp.exec(values.motherPhone);
    // var today = new Date();
    // if (moment(values.createdDate) < moment(values.birthday) ) {
    //     errors.createdDate = 'Ngày nhập viện phải lớn hơn ngày sinh.'
    // }
    // if (moment(today) < moment(values.birthday) ) {
    //     errors.birthday = 'Ngày sinh không được lớn hơn ngày hiện tại.'
    // }
    // if (!values.email) {
    //     errors.email = 'Vui lòng nhập email.';
    // } else if (!isEmail(values.email)) {
    //     errors.email = 'Email không hợp lệ.';
    // }
    // if (!values.code) {
    //     errors.code = 'Vui lòng nhập mã số.';
    // }
    // if (!values.title) {
    //     errors.title = 'Vui lòng nhập tên chỉ tiêu.';
    // }
    // if (!values.birthday) {
    //     errors.birthday = 'Vui lòng nhập ngày sinh.';
    // }
    // if(phone == null){
    //     errors.phone = 'Số điện thoại phải có 10 - 11 chữ số.';
    // }
    // if(fatherPhone == null){
    //     errors.fatherPhone = 'Số điện thoại phải có 10 - 11 chữ số.';
    // }
    // if(motherPhone == null){
    //     errors.motherPhone = 'Số điện thoại phải có 10 - 11 chữ số.';
    // }
    return errors;
}

var today = moment(new Date, "HH:mm DD/MM/YYYY");
const mapStateToProps = state => {
    var updateValue = {
        ...state.billingReducer.updatingBilling,
        createdDate:state.billingReducer.updatingBilling && state.billingReducer.updatingBilling.createdDate ? moment(state.billingReducer.updatingBilling.createdDate):today,

    };
    return {
        initialValues: updateValue
    };
};
const mapDispatchToProps = dispatch => ({
    loadBilling: (payload) =>
        dispatch({ type: LOAD_UPDATING_BILLING, payload: payload })
});


class ModalBilling extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllAccountCode:[]
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
      
        const { loadBilling } = this.props;
        this.getAccountCode();  
        var id = this.props.idBilling;
        const dataPromise = agent.BillingApi.getBilling(id);
        loadBilling(Promise.resolve(dataPromise))



    }
    
    handleAdd(values) {
        var onHide = this.props.onHide;
        var id = this.props.idBilling;
        var url = '/billing/add';
        var bodyObject = {
            receiver:values.receiver,
            createdDate:values.createdDate,
            accountCodeId:values.accountCodeId,
            hasAccounted:values.hasAccounted,
        };
        if (id) {
            url = '/billing/update';
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
        if(dataAccountCode){
            dataAccountCode.map(item=>{
                optionAccountCode.push({label: item.code+" - "+ item.title ,value:item.id })
            })
        }
        
        var id = this.props.idBilling;
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
                                            <Field name="receiver" label="Người Nhận (*)" placeholder="Nhập tên người nhận..." component={RenderInputWithDiv}></Field>
                                            <Field name="createdDate" label="Ngày Tạo" placeholder="Chọn ngày tạo..." component={RenderDatePicker}></Field>
                                            <Field name="accountCodeId" label="Mã Số Kế Toán" placeholder="Chọn mã số kế toán..." options={optionAccountCode} component={RenderSelect}></Field>
                                            <Field name="hasAccounted"  checkLabel="Hoạch Toán ?" component={RenderCheckbox}></Field>
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
            form: 'ModalBilling',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalBilling)));
