import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderTextArea, RenderDatePicker, RenderSelect, RenderBarcode } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_PATIENT } from './action-types';
import moment from 'moment';
import isEmail from 'sane-email-validation';

const validate = values => {
    const errors = {};
    const regexp = /^\d{10,11}$/;
    const phone = regexp.exec(values.phone);

    if (!values.fullName) {
        errors.fullName = 'Vui lòng nhập họ tên.';
    }

    if (phone == null) {
        errors.phone = 'Số điện thoại phải có 10 - 11 chữ số.';
    }

    return errors;
}
const mapStateToProps = state => {
    var updateValue = {
        ...state.patientReducer.updatingPatient
    };
    return {
        initialValues: updateValue
    };
};
const mapDispatchToProps = dispatch => ({
    loadPatient: (payload) =>
        dispatch({ type: LOAD_UPDATING_PATIENT, payload: payload })
});


class ModalPatientDrugRetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllInsuranceType: [],
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
    }

    componentWillMount() {
        const { loadPatient, reset, destroy } = this.props;
        var id = this.props.idPatient;
        const dataPromise = agent.PatientApi.getPatient(id);
        loadPatient(Promise.resolve(dataPromise))



    }
    handleAdd(values) {
        var onHide = this.props.onHide;
        var url = '/patient/add';
        var bodyObject = {
            fullName: values.fullName,
            phone: values.phone,
            email: values.email
        };
        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && result.id) {
                onHide(result.id);
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
        var id = this.props.idPatient;
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
                                <div className="row">
                                    <div className="form-group">
                                        <div className="col-md-4">
                                            <Field name="fullName" label="Họ Và Tên (*) " placeholder="Nhập họ và tên..." component={RenderInputWithDiv}></Field>
                                        </div>
                                        <div className="col-md-4">
                                            <Field name="phone" label="Số Điện Thoại (*)" placeholder="Nhập số điện thoại..." component={RenderInputWithDiv}></Field>
                                        </div>
                                        <div className="col-md-4">
                                            <Field name="email" type="email" label="Email" placeholder="Nhập email..." component={RenderInputWithDiv}></Field>
                                        </div>
                                    </div>


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
            form: 'ModalPatientDrugRetail',
            destroyOnUnmount: true,
            enableReinitialize: true,

        })(ModalPatientDrugRetail)));
