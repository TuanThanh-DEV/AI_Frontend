import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderTextArea, RenderSelect, RenderNumberInput, RenderDatePickerWithTime } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_QUEUE_NUMBER } from './action-types';
import ModalPatient from '../Patient/ModalPatient';
import moment from 'moment';
import KeyboardEventHandler from 'react-keyboard-event-handler';

const validate = values => {
    const errors = {};
    if (!values.name) {
        errors.name = "Vui lòng nhập!"
    }
    if (!values.patientId) {
        errors.patientId = "Vui lòng chọn Bệnh Nhân!"
    }
    if (!values.callTime) {
        errors.callTime = "Vui lòng chọn thời gian"
    }

    return errors;
}
var today = new Date;
const mapStateToProps = state => {
    var updateValue = {
        ...state.queueNumberReducer.updatingQueueNumber,
        // callTime: state.queueNumberReducer.updatingQueueNumber && state.queueNumberReducer.updatingQueueNumber.callTime ? moment(state.queueNumberReducer.updatingQueueNumber.callTime) : null
        status: state.queueNumberReducer.updatingQueueNumber && state.queueNumberReducer.updatingQueueNumber.status ? state.queueNumberReducer.updatingQueueNumber.status : "TODO",
        callTime: state.queueNumberReducer.updatingQueueNumber && state.queueNumberReducer.updatingQueueNumber.callTime ? moment(state.queueNumberReducer.updatingQueueNumber.callTime) : today,
        type: state.queueNumberReducer.updatingQueueNumber && state.queueNumberReducer.updatingQueueNumber.type ? state.queueNumberReducer.updatingQueueNumber.type : "KHONG_UU_TIEN",
        reasonForReceiving: state.queueNumberReducer.updatingQueueNumber && state.queueNumberReducer.updatingQueueNumber.reasonForReceiving ? state.queueNumberReducer.updatingQueueNumber.reasonForReceiving : "CAP_CUU",
        formArrived: state.queueNumberReducer.updatingQueueNumber && state.queueNumberReducer.updatingQueueNumber.formArrived ? state.queueNumberReducer.updatingQueueNumber.formArrived : "TU_DEN"
    };
    return {
        initialValues: updateValue,
    };
};
const mapDispatchToProps = dispatch => ({
    loadQueueNumber: (payload) =>
        dispatch({ type: LOAD_UPDATING_QUEUE_NUMBER, payload: payload }),
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalQueueNumber", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});
class ModalQueueNumber extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listAllQueue: [],
            listAllPatient: [],
            listAllPackage: [],
            listAllCoupon :[]
        }

        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.handlShowModalPatient = this.handlShowModalPatient.bind(this);
        this.onReloadAndFillDataModalParent = this.onReloadAndFillDataModalParent.bind(this);
        this.handleHidemodal = () => {
            this.setState({ isPatientModalShown: false });
        };
    };

    onReloadAndFillDataModalParent(patientId) {
        const { updateField } = this.props;
        this.getlistAllPatient();
        updateField("patientId", patientId);


    }
    getlistAllPatient() {
        let setStateInRequest = (list) => { this.setState({ listAllPatient: list }) }
        return agent.PatientApi.listAllPatient(
        ).then(function (res) {
            var result = res.resultData;
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
    getlistAllPackage() {
        let setStateInRequest = (list) => { this.setState({ listAllPackage: list }) }
        return agent.PackageApi.listAllPackage(
        ).then(function (res) {
            var result = res.resultData;
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
    getlistAllCoupon() {
        let setStateInRequest = (list) => { this.setState({ listAllCoupon: list }) }
        return agent.CouponApi.listAllCoupon(
        ).then(function (res) {
            var result = res.resultData;
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
    getlistAllQueue() {
        let setStateInRequest = (list) => { this.setState({ listAllQueue: list }) }
        return agent.asyncRequests.get("/queue/findAllToday"
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
    getNextTheNumber(queueObject) {
        const { updateField } = this.props;
        return agent.asyncRequests.get("/queueNumber/nextTheNumber?queueId=" + queueObject.id
        ).then(function (res) {
            var result = res.body;
            if (result.resultData != null) {
                updateField("theNumber", result.resultData.theNumber + 1);
            } else if (result.errorMessage == "NO_THE_NUMBER") {
                updateField("theNumber", 1);
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    }

    componentWillMount() {
        const { loadQueueNumber, queueObject, updateField } = this.props;
        var id = this.props.idQueueNumber;
        if (id) {
            const dataPromise = agent.QueueNumberApi.getQueueNumber(id);
            loadQueueNumber(Promise.resolve(dataPromise))
        } else {
            this.getNextTheNumber(queueObject);
        }
        if (queueObject) {
            updateField("queueId", queueObject.id);
        }
        return (
            this.getlistAllPatient(),
            this.getlistAllQueue(),
            this.getlistAllPackage(),
            this.getlistAllCoupon()
        )
    }
    handlShowModalPatient(id) {
        this.setState({
            isPatientModalShown: true,
            idPatient: id
        });
    }
    handleAdd(values) {
        var onHide = this.props.onHide;
        var id = this.props.idQueueNumber;
        var url = '/queueNumber/add';
        var bodyObject = {
            queueId: values.queueId,
            theNumber: values.theNumber,
            patientId: values.patientId,
            callTime: values.callTime,
            type: values.type,
            note: values.note,
            reasonForReceiving: values.reasonForReceiving,
            formArrived: values.formArrived,
            status: values.status,
            packageId: values.packageId,
            couponId: values.couponId,

        };
        if (id) {
            url = '/queueNumber/update';
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
    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        onHide();
        destroy();
    }


    render() {
        const { handleSubmit, submitting, title, invalid, isUpdateStatus } = this.props;
        const modalConfig = {
            backdrop: 'static', show: this.props.show, bsSize: "medium",
            onHide: this.props.onHide,
            submitting: this.props.submitting
        };
        const dataQueue = this.state.listAllQueue;
        const dataPatient = this.state.listAllPatient;
        var optionAllQueue = [];
        var optionAllPatient = [];
        if (dataQueue) {
            dataQueue.map(item => {
                optionAllQueue.push({ label: item.name + " - Bác Sĩ: " + item.caller.fullName, value: item.id });
            })
        }
        if (dataPatient) {
            dataPatient.map(item => {
                optionAllPatient.push({ label: item.code + " - " + item.fullName, value: item.id })
            })
        }
        var optionAllPackage = [];
        var dataListPackage = this.state.listAllPackage;
        if (dataListPackage) {
            dataListPackage.map(item => {
                optionAllPackage.push({ label: item.name, value: item.id });
            })
        }
        var optionAllCoupon = [];
        var dataListCoupon = this.state.listAllCoupon;
        if (dataListCoupon) {
            dataListCoupon.map(item => {
                optionAllCoupon.push({ label: item.code, value: item.id });
            })
        }
        var optionQueueNumberType = [
            { label: "Không Ưu Tiên", value: "KHONG_UU_TIEN" },
            { label: "Ưu Tiên", value: "UU_TIEN" },
        ];
        var optionQueueNumberStatus = [
            { label: "Đang Chờ", value: "TODO" },
            { label: "Hoàn Tất", value: "DONE" },
            { label: "Hủy", value: "HUY" },
        ];

        var optionReasonForReceiving = [
            { label: "Cấp Cứu", value: "CAP_CUU" },
            { label: "Khám Bệnh", value: "KHAM_BENH" },
        ];

        var optionFormArrived = [
            { label: "Chuyển Viện", value: "TU_DEN" },
            { label: "Tự Đến", value: "CHUYEN_VIEN" },
        ];
        var id = this.props.idQueueNumber;
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
                                            <KeyboardEventHandler handleKeys={['shift+T']} handleFocusableElements onKeyEvent={(e) => this.handlShowModalPatient(e)} />
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <Field disabled={isUpdateStatus ? false : true} name="queueId" label="Tên Hàng Chờ" options={optionAllQueue} component={RenderSelect}></Field>
                                        </div>
                                        <div className="col-md-6"> <Field disabled={isUpdateStatus ? true : false} name="patientId" label="Tên Bệnh Nhân (*)" placeholder="Chọn tên bệnh nhân ..." options={optionAllPatient} component={RenderSelect}></Field>
                                            Chưa Đăng Kí Thông Tin Người Bệnh? <button class="label bg-teal" onClick={() => this.handlShowModalPatient()}> + </button>
                                        </div>
                                        {/* TODO ALLOW USER CAN INPUT NEW PATIENT WHEN PATIENT DON'T HAVE IN LIST */}
                                        {/* <Field name="patientName" label="Tên Bệnh Nhân" placeholder="Chọn tên bệnh nhân ..." component={RenderInputWithDiv}></Field>
                                <Field name="phone" label="Tên Bệnh Nhân" placeholder="Chọn tên bệnh nhân ..." component={RenderInputWithDiv}></Field> */}
                                        <div className="col-md-6"><br />
                                            <Field disabled={isUpdateStatus ? false : true} name="theNumber" label="Số Thứ Tự" placeholder="Nhập số thứ tự..." component={RenderNumberInput}></Field>
                                        </div>
                                        <div className="col-md-6"><br /> <Field disabled={isUpdateStatus ? false : true} name="callTime" label="Thời Gian Đặt Số (*)" placeholder="Chọn thời gian đặt số..." dateFormat="dd/MM/yyyy hh:mm:aa" component={RenderDatePickerWithTime}></Field>
                                        </div>
                                        <div className="col-md-6"><br />
                                            <Field disabled={isUpdateStatus ? true : false} name="type" label="Loại Số" placeholder="Chọn loại số..." options={optionQueueNumberType} component={RenderSelect}></Field>
                                        </div>
                                        <div className="col-md-6"><br />
                                            <Field disabled={isUpdateStatus ? false : true} name="status" label="Trạng Thái" placeholder="Chọn trạng thái..." options={optionQueueNumberStatus} component={RenderSelect}></Field>
                                        </div>
                                        <div className="col-md-6"><br />
                                            <Field disabled={isUpdateStatus ? true : false} name="reasonForReceiving" label="Lý Do Tiếp Nhận" placeholder="Chọn lý do tiếp nhận..." options={optionReasonForReceiving} component={RenderSelect}></Field>
                                        </div>
                                        <div className="col-md-6"><br />
                                            <Field disabled={isUpdateStatus ? true : false} name="formArrived" label="Hình Thức Đến" placeholder="Chọn hình thức đến..." options={optionFormArrived} component={RenderSelect}></Field>
                                        </div>
                                        <div className="col-md-6"><br />
                                            <Field disabled={isUpdateStatus ? true : false} name="couponId" label="Mã giảm giá"  options={optionAllCoupon} component={RenderSelect}></Field>
                                        </div>
                                        <div className="col-md-6"><br />
                                            <Field disabled={isUpdateStatus ? true : false} name="packageId" label="Gói khám"  options={optionAllPackage} component={RenderSelect}></Field>
                                        </div>
                                        <div className="col-md-12"><br />
                                            <Field name="note" label="Ghi Chú" placeholder="Nhập ghi chú..." rows={3} component={RenderTextArea}> </Field>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <button style={{ marginRight: "20px" }} type="button" className="btn btn-default" onClick={this.handleHideAndClear} ><i class="icon-cross" aria-hidden="true"></i> Đóng</button>
                                        <button type="submit" className="btn bg-success" disabled={submitting}> Lưu Lại</button>
                                    </div>
                                </div>
                            </form>
                        }
                    </Modal.Body>
                </Modal>
                {this.state.isPatientModalShown ? <ModalPatient
                    title="Thêm Mới Bệnh Nhân"
                    idPatient={this.state.idPatient}
                    isAddParentFromBookingModal={true}
                    onReloadAndFillDataModalParent={this.onReloadAndFillDataModalParent}
                    show={this.state.isPatientModalShown}
                    onHide={this.handleHidemodal} /> : null
                }
            </div>
        return newModal;
    }
};
export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'ModalQueueNumber',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalQueueNumber)));
