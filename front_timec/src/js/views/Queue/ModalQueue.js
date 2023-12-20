import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderDatePicker, RenderSelect } from '../../components/formInputs';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_QUEUE } from './action-types';
import moment from 'moment';

const validate = values => {
    const errors = {};
    if (!values.name) {
        errors.name = "Vui lòng nhập!"
    }

    return errors;
}
const selector = formValueSelector('ModalQueue');
var today = moment(new Date, "DD/MM/YYYY");
const mapStateToProps = state => {
    var updateValue = {
        ...state.queueReducer.updatingQueue,
        createdDate: state.queueReducer.updatingQueue && state.queueReducer.updatingQueue.createdDate ? moment(state.queueReducer.updatingQueue.createdDate) : today,
        status: state.queueReducer.updatingQueue && state.queueReducer.updatingQueue.status ? state.queueReducer.updatingQueue.status : "OPEN",
        // caller: state.queueReducer.updatingQueue && state.queueReducer.updatingQueue.caller ? state.queueReducer.updatingQueue.caller : currentUser.id,
    };
    return {
        initialValues: updateValue,
        createdUser: selector(state, "caller"),
        currentUser: state.common.currentUser
    };
};
const mapDispatchToProps = dispatch => ({
    loadQueue: (payload) =>
        dispatch({ type: LOAD_UPDATING_QUEUE, payload: payload }),
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalQueue", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })

});
class ModalQueue extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listAllUserDepartment: [],
            listAllUser: [],
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
    };

    getListAllDepartment(userId) {
        if (userId) {
            let setStateInRequest = (list) => { this.setState({ listAllUserDepartment: list }) }
            return agent.asyncRequests.get("/department/listAll"
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
        } else {
            return null;
        }
    }

    getlistAllUser() {
        let setStateInRequest = (list) => { this.setState({ listAllUser: list }) }
        return agent.UserApi.getAllDoctor(
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

    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        onHide();
        destroy();
    }
    handleAdd(values) {
        var onHide = this.props.onHide;
        var id = this.props.idQueue;
        var url = '/queue/add';
        var bodyObject = {
            name: '',
            departmentId: values.departmentId,
            callerId: values.callerId,
            currentNumber: values.currentNumber ? values.currentNumber : 0,
            nextNumber: values.nextNumber ? values.nextNumber : 0,
            maxNumber: 30,
            createdDate: values.createdDate,
            status: values.status
        };
        if (id) {
            url = '/queue/update';
            bodyObject.id = id;
        }
        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body;
            if (result.resultData) {
                onHide(result.status);
            } else if (result.errorMessage) {
                toast.error("Lỗi, Đã có Hàng Chờ, Vui lòng đóng Hàng Chờ và thử lại...!", { autoClose: 15000 });
                onHide();
            }
            else {
                toast.error("Có lỗi khi lưu trữ. Lỗi: ", { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    };

    componentWillMount() {
        const { loadQueue, currentUser, updateField } = this.props;
        var id = this.props.idQueue;
        if (id) {
            const dataPromise = agent.QueueApi.getQueue(id);
            loadQueue(Promise.resolve(dataPromise))
        }
        //TODO  get role ADMIN
        this.getlistAllUser();
        updateField("callerId", currentUser.id);
        this.getListAllDepartment(currentUser.id);
    }
    render() {
        const { handleSubmit, submitting, title, invalid, currentUser, createdUser, idQueue } = this.props;
        const modalConfig = {
            backdrop: 'static', show: this.props.show, bsSize: "medium",
            onHide: this.props.onHide,
            submitting: this.props.submitting
        };

        var optionDepartment = [];
        var dataListUserDepartment = this.state.listAllUserDepartment;
        if (dataListUserDepartment) {
            dataListUserDepartment.map(item => {
                optionDepartment.push({ label: item.name, value: item.id });
            })
        }

        var optionAllDoctor = [];
        var dataListUser = this.state.listAllUser;
        if (dataListUser) {
            dataListUser.map(item => {
                optionAllDoctor.push({ label: item.fullName, value: item.id });
            })
        }
        var showCreatedUser = [];
        // Push created user
        showCreatedUser.push({
            label: createdUser ? createdUser.fullName
                : currentUser.fullName,
            value: createdUser ? createdUser.id : currentUser.id
        });
        var id = this.props.idQueue;
        var optionStatus = [
            { label: "Mở ", value: "OPEN" },
            { label: "Tạm Dừng Nhận Số", value: "SUSPENDED" },
            { label: "Đóng ", value: "CLOSED" },
        ]
        var optionStatus = [
            { label: "Mở ", value: "OPEN" },
            { label: "Tạm Dừng Nhận Số", value: "SUSPENDED" },
            { label: "Đóng ", value: "CLOSED" },
        ]
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
                                        <div className="col-md-6">
                                            <Field name="callerId" label="Tên Bác Sĩ" options={optionAllDoctor} component={RenderSelect}></Field>
                                        </div>
                                        <div className="col-md-6"> <Field name="departmentId" label="Chuyên Khoa" options={optionDepartment} component={RenderSelect}></Field>
                                        </div>
                                        {/* <div className="col-md-6">
                                            <br /><Field name="name" label="Tên Hàng Chờ Chi Tiết" placeholder="Nhập hàng chờ chi tiết ..." component={RenderInputWithDiv}></Field>
                                        </div> */}
                                        {/* <Field name="currentNumber" label="Số thự tự hiện tại "    placeholder="Nhập số thứ tự hiện tại ..." component={RenderInputWithDiv}></Field>
                                <Field name="nextNumber" label="Số thự tự tiếp theo "    placeholder="Nhập số thứ tự tiếp theo ..." component={RenderInputWithDiv}></Field> */}
                                        {/* <div className="col-md-6">   <br />
                                            <Field name="maxNumber" label="Hàng Đợi Tối Đa" placeholder="Nhập hàng đợi tối đa..." component={RenderInputWithDiv}></Field>
                                        </div> */}
                                        <div className="col-md-6">
                                            <br /> <Field disabled={true} name="createdDate" dateFormat="DD/MM/YYYY" label="Ngày Hiện Tại" placeholder="Nhập ngày hiện tại ..." component={RenderDatePicker}></Field>
                                        </div>                                    
                                        <div className="col-md-6">
                                            <br /> <Field disabled={idQueue ? false : true} name="status" label="Trạng Thái " options={optionStatus} component={RenderSelect}></Field>
                                        </div>                                  
                                        {/* <Field name="diagnosisService.id" label="Tên nhóm dịch vụ Chỉ Định"  options={optionAllDiagnosisService}component={RenderSelect}></Field> */}
                                    </div>
                                    <br />
                                    <div className="text-right">
                                        <button type="button" className="btn btn-default" onClick={this.handleHideAndClear} ><i class="icon-cross" aria-hidden="true"></i> Đóng</button>
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
            form: 'ModalQueue',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalQueue)));
