import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderTextArea, RenderDatePicker, RenderSelect, RenderBarcode } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_ACCOUNT_CODE } from './action-types';
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
    if (!values.code) {
        errors.code = 'Vui lòng nhập mã số.';
    }
    if (!values.title) {
        errors.title = 'Vui lòng nhập tên chỉ tiêu.';
    }
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


const mapStateToProps = state => {
    var updateValue = {
        ...state.accountCodeReducer.updatingAccountCode,

    };
    return {
        initialValues: updateValue
    };
};
const mapDispatchToProps = dispatch => ({
    loadAccountCode: (payload) =>
        dispatch({ type: LOAD_UPDATING_ACCOUNT_CODE, payload: payload })
});


class ModalAccountCode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
    }

    componentWillMount() {
      
        const { loadAccountCode } = this.props;

        var id = this.props.idAccountCode;
        const dataPromise = agent.AccountCodeApi.getAccountCode(id);
        loadAccountCode(Promise.resolve(dataPromise))



    }
    
    handleAdd(values) {
        var onHide = this.props.onHide;
        var id = this.props.idAccountCode;
        var url = '/accountCode/add';
        var bodyObject = {
            title: values.title,
            code: values.code,
            description: values.description,
        };
        if (id) {
            url = '/accountCode/update';
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

        var id = this.props.idAccountCode;
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
                                            <Field name="code" label="Mã Số (*)" placeholder="Nhập mã số..." component={RenderInputWithDiv}></Field>
                                            <Field name="title" label="Tên Chỉ Tiêu" placeholder="Nhập nhập tên chỉ tiêu..." component={RenderInputWithDiv}></Field>
                                            <Field name="description"  label="Mô Tả" placeholder="Nhập mô tả..." component={RenderInputWithDiv}></Field>
                                   
                                    
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
            form: 'ModalAccountCode',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalAccountCode)));
