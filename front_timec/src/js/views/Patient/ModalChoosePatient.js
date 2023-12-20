import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderTextArea, RenderDatePicker, RenderSelect, RenderBarcode } from '../../components/formInputs';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_PATIENT } from './action-types';
import moment from 'moment';
import isEmail from 'sane-email-validation';
const selector = formValueSelector("ModalPersonel");
import qs from 'query-string';
import SecuredComponent from '../../components/SecuredComponent';
import { Link } from 'react-router-dom';
import ModalPatientDrugRetail from './ModalPatientDrugRetail';
import { DateUtils } from '../../utils/javascriptUtils';
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
        ...state.patientReducer.updatingPatient,
        birthday: state.patientReducer.updatingPatient && state.patientReducer.updatingPatient.birthday ? moment(state.patientReducer.updatingPatient.birthday) : null,
        createdDate: state.patientReducer.updatingPatient && state.patientReducer.updatingPatient.createdDate ? moment(state.patientReducer.updatingPatient.createdDate) : null,
        nation: state.patientReducer.updatingPatient && state.patientReducer.updatingPatient.nation ? state.patientReducer.updatingPatient.nation : "Việt Nam",

    };
    return {
        initialValues: updateValue,
        patientName: selector(state, "patientName"),
    };
};
const mapDispatchToProps = dispatch => ({
    loadPatient: (payload) =>
        dispatch({ type: LOAD_UPDATING_PATIENT, payload: payload })
});


class ModalChoosePatient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllInsuranceType: [],
            listPatient: null,
        }
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.updateListPatient = this.updateListPatient.bind(this);
        this.handleHidemodalPatient = (id) => {
            this.setState({ isPatientModalShown: false });
            if (id) {
                this.updatePrescriptionWithPatientId(id);
                this.updateListPatient();
            }

        };
    }
    handleAddPatient() {
        this.setState({
            isPatientModalShown: true
        });

    }
    componentWillMount() {
        const { loadPatient } = this.props;
        this.updateListPatient();
    }

    handleChoosePatient(patientId) {
        if (!patientId) {
            return null;
        }
        var onHide = this.props.onHide;
        var _this = this;
        var handleChoosePatientObject = this.props.handleChoosePatientObject;
        return agent.PatientApi.getPatient(patientId
        ).then(function (res) {
            var result = res.resultData;
            if (result) {
                onHide(result.id);
                handleChoosePatientObject(result);
            }
            else {
                toast.error("Có lỗi khi load dữ liệu. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi load dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    }
    updateListPatient(values) {

        var { patientName } = this.state;
        patientName = values && values.patientName ? values.patientName : "";

        var page = 1;
        let setStateInRequest = (list) => { this.setState({ listPatient: list }) }
        return (agent.PatientApi.listPatientSearchAll(patientName, page).then(function (res) {
            var result = res.body.resultData;
            if (result) {

                setStateInRequest(result);

            }
            else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        }))
    }
    updatePrescriptionWithPatientId(patientId) {
        if (!patientId) {
            return null;
        }
        var onHide = this.props.onHide;
        var prescriptionId = this.props.prescriptionId;
        let setStateInRequest = (list) => { this.setState({ listPatient: list }) }
        return agent.asyncRequests.get("/prescription/updatePrescriptionWithPatientId?prescriptionId=" + prescriptionId + "&patientId=" + patientId
        ).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                onHide(result.patientId);
            }
            else {
                toast.error("Có lỗi khi load dữ liệu. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi load dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
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
        var page = 100;
        var id = this.props.idPatient;
        var search = "";
        var optionGender = [

            { label: "Nam ", value: "MALE" },
            { label: "Nữ ", value: "FEMALE" },
            { label: "Khác ", value: "OTHER" },
        ]
        var optionType = [];
        this.state.listAllInsuranceType.map(item => {
            optionType.push({ label: item.name, value: item.id })
        })
        var newModal = null;
        const data = this.state.listPatient;
        if (!data) {
            return null;
        }
        var rows = data.map(item => {
            // currentNo++

            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>
                        <SecuredComponent allowedPermission="admin.patient.goToProjectYear"><Link to={"/projectProgress/" + item.id}><i className="icon-arrow-right16"> </i></Link>
                        </SecuredComponent>
                        {" " + item.fullName}
                    </td>
                    <td>{DateUtils.formatDateForScreen(item.birthday)}</td>
                    <td>{item.phone}</td>
                    <td>{item.email}</td>
                    <td className="text-center footable-visible footable-last-column">
                        <a onClick={() => this.handleChoosePatient(item.id)}><i className="icon-pencil"></i>Chọn</a>
                    </td>
                </tr>);
        });

        newModal =
            <div style={{ width: '30%' }}>
                <Modal {...modalConfig} aria-labelledby="contained-modal-title-lg"  >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-sm"><center>{title}</center> </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="">
                            <div className="row">
                                <div className="panel-flat">
                                    <form className="main-search" role="form" onSubmit={handleSubmit(this.updateListPatient)}>

                                        <div className="col-md-8">
                                            <Field name="patientName" placeholder="Tìm Theo Tên Bệnh Nhân  , SĐT, Email,...." component={RenderInputWithDiv}></Field>
                                        </div>
                                        <div className="col-md-2">
                                            <button type="submit" className="btn bg-success btn-xlg" disabled={submitting} >Tìm Kiếm</button>
                                        </div>
                                        {/* <div className="col-md-2">
                                            <button className="btn bg-teal" onClick={() => this.handleAddPatient()}>Thêm Mới</button>
                                        </div> */}
                                    </form>
                                </div>
                            </div>
                            <div className="row">
                                <div className="panel panel-flat">
                                    <table className="table table-togglable table-hover">
                                        <thead>
                                            <tr className="bg-teal">
                                                <th data-toggle="true">STT</th>
                                                <th data-toggle="true">Họ và Tên</th>
                                                <th data-toggle="true">Ngày Sinh</th>
                                                <th data-hide="phone">Số điện thoại</th>
                                                <th data-hide="phone">Email</th>
                                                <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {rows}
                                        </tbody>
                                    </table>
                                </div>
                                {this.state.isPatientModalShown ? <ModalPatientDrugRetail
                                    title={this.state.idPatient ? "Chỉnh Sửa Bệnh Nhân" : "Thêm Mới Bệnh Nhân"}
                                    show={this.state.isPatientModalShown}
                                    onHide={this.handleHidemodalPatient} /> : null}
                            </div>
                        </div>



                    </Modal.Body>
                </Modal>
            </div>
        return newModal;
    }
};


export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'ModalChoosePatient',
            destroyOnUnmount: true,
            enableReinitialize: true,

        })(ModalChoosePatient)));
