import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderSelect, RenderDatePicker, RenderBarcode, RenderInputWithDiv } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_INSURANCE_CARD } from './action-types';
import moment from 'moment';

const validate = values => {
    const errors = {};
    if (!values.description) {
        errors.description = "Vui lòng nhập mã Chuyên Khoa!"
    }
    if (!values.name) {
        errors.name = "Vui lòng nhập tên Chuyên Khoa!"
    }
    if (!values.hospital) {
        errors.hospital = { id: "Vui lòng chọn Phòng Khám" }
    }
    if (moment(values.toDate) < moment(values.fromDate)) {
        errors.toDate = 'Ngày kết thúc nhỏ hơn ngày bắt đầu!, vui lòng thử lại!'
    }
    return errors;
}
const mapStateToProps = state => {
    var updateValue = {
        ...state.insuranceCardReducer.updatingInsuranceCard,
        fromDate: state.insuranceCardReducer.updatingInsuranceCard && state.insuranceCardReducer.updatingInsuranceCard.fromDate ? moment(state.insuranceCardReducer.updatingInsuranceCard.fromDate) : null,
        toDate: state.insuranceCardReducer.updatingInsuranceCard && state.insuranceCardReducer.updatingInsuranceCard.toDate ? moment(state.insuranceCardReducer.updatingInsuranceCard.toDate) : null,
    };
    return {
        initialValues: updateValue
    };
};
const mapDispatchToProps = dispatch => ({
    loadInsuranceCard: (payload) =>
        dispatch({ type: LOAD_UPDATING_INSURANCE_CARD, payload: payload })
});
class ModalInsuranceCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllInsuranceType: [],
            listAllPatient: []
        }

        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
    };
    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        onHide();
        destroy();
    }
    handleAdd(values) {
        var onHide = this.props.onHide;
        var id = this.props.idInsuranceCard;
        var url = '/insuranceCard/add';
        var bodyObject = {
            insuranceCode: values.insuranceCode,
            patientId: values.patientId,
            insuranceTypeId: values.insuranceTypeId,
            fromDate: values.fromDate,
            toDate: values.toDate,
            addressBHYT: values.addressBHYT,
            maDKBD: values.maDKBD,
            addressDKBD: values.addressDKBD,

        };
        if (id) {
            url = '/insuranceCard/update';
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

    componentWillMount() {
        const { loadInsuranceCard, reset, destroy } = this.props;
        var id = this.props.idInsuranceCard;
        if (id) {
            const dataPromise = agent.InsuranceCardApi.getInsuranceCard(id);
            loadInsuranceCard(Promise.resolve(dataPromise))
        } else {
            reset();
            destroy();
        }
        this.getlistAllInsuranceType();
        this.getlistAlPatient();
    }

    getlistAllInsuranceType() {
        let setStateInRequest = (list) => { this.setState({ listAllInsuranceType: list }) }
        return agent.InsuranceTypeApi.listAllInsuranceType().then(function (res) {
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

    getlistAlPatient() {
        let setStateInRequest = (list) => { this.setState({ listAllPatient: list }) }
        return agent.PatientApi.listAllPatient().then(function (res) {
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
        const modalConfig = {
            backdrop: 'static', show: this.props.show, bsSize: "medium",
            onHide: this.props.onHide,
            submitting: this.props.submitting
        };
        var optionType = [];
        this.state.listAllInsuranceType.map(item => {
            optionType.push({ label: item.name, value: item.id })
        })
        var optionPatient = [];
        this.state.listAllPatient.map(item => {
            optionPatient.push({ label: item.fullName, value: item.id })
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
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <Field name="insuranceCode" label="Mã Bảo Hiểm" placeholder="Nhập Mã Bảo Hiểm..." component={RenderBarcode}></Field>
                                        </div>
                                        <div className="col-md-6">
                                            <Field name="patientId" label="Tên Bệnh Nhân (*)" options={optionPatient} component={RenderSelect}></Field>
                                        </div>
                                        <div className="col-md-6">
                                            <Field name="insuranceTypeId" label="Loại Bảo Hiểm Hỗ Trợ" options={optionType} component={RenderSelect}></Field>
                                        </div>
                                        <div className="col-md-6">
                                            <Field name="addressDKBD" label="Nơi Đăng Ký KCB Ban Đầu" component={RenderInputWithDiv}></Field>
                                        </div>
                                        <div className="col-md-6">
                                            <Field name="addressBHYT" label="Địa Chỉ Thẻ " component={RenderInputWithDiv}></Field>
                                        </div>
                                        <div className="col-md-6">
                                            <Field name="maDKBD" label="Mã Nơi Đăng Ký KCB Ban Đầu" component={RenderInputWithDiv}></Field>
                                        </div>

                                        <div className="col-md-6">
                                            <br />
                                            <Field name="fromDate" label="Từ Ngày " component={RenderDatePicker}></Field>
                                        </div>
                                        <div className="col-md-6">
                                            <br />
                                            <Field name="toDate" label="Đến Ngày" component={RenderDatePicker}></Field>
                                        </div>
                                    </div>
                                    <br />
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
            form: 'ModalInsuranceCard',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalInsuranceCard)));
