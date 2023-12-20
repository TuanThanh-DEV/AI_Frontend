import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderDatePicker, RenderSelect, RenderTextAreaShortCode } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_HELPCOMMENT } from './action-types';
import moment from 'moment';

const validate = values => {
    const errors = {};
    // if(!values.name){
    //     errors.name = "Vui lòng nhập!"
    // }
    // if(!values.code){
    //     errors.code  = "Vui lòng nhập!"
    // }
    // if (moment(values.expiredDate) < moment(values.userDate) ) {
    //     errors.expiredDate = 'Hạn sử dụng không được nhỏ hơn ngày đưa vào sử dụng!, vui lòng thử lại!'
    // }
    return errors;
}
const mapStateToProps = (state, props) => {
    var updateValue = {
        ...state.helpCommentReducer.updatingHelpComment,
        questionShow: state.helpCommentReducer.updatingHelpComment && state.helpCommentReducer.updatingHelpComment.helpTicket ? state.helpCommentReducer.updatingHelpComment.helpTicket.question : "N/A",
        helpTicketId: props.idHospitalForDepartment ? props.idHospitalForDepartment : null
    };
    return {
        initialValues: updateValue,
        currentUser: state.common.currentUser
    };
};
const mapDispatchToProps = dispatch => ({

    loadHelpTicket: (payload) =>
        dispatch({ type: LOAD_UPDATING_HELPCOMMENT, payload: payload }),
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalHelpComment", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});
class ModalHelpComment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listAllUser: [],
            listAllHelpTicket: [],
        }

        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
    };

    getlistAllUser() {
        let setStateInRequest = (list) => { this.setState({ listAllUser: list }) }
        return agent.UserApi.listAllPersonel(
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
    getlistAllHelpTicket() {
        let setStateInRequest = (list) => { this.setState({ listAllHelpTicket: list }) }
        return agent.HelpTicketApi.listAllHelpTicket(
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
        const { destroy, onHide, idHospitalForDepartment } = this.props;
        onHide(idHospitalForDepartment);
        destroy();
    }
    handleAdd(values) {
        var { onHide, idHospitalForDepartment,currentUser } = this.props;
        var id = this.props.idHelpComment;
        var url = '/helpComment/add';
        var bodyObject = {
            helpTicketId: values.helpTicketId,
            createdBy: currentUser.id,
            content: values.content,
            attachedFiles: values.attachedFiles
        };
        if (id) {
            url = '/helpComment/update';
            bodyObject.id = id;
        }
        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && result.id) {
                onHide(idHospitalForDepartment);
            } else {
                toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    };

    componentWillMount() {
        const { loadHelpTicket } = this.props;
        var id = this.props.idHelpComment;
        {
            const dataPromise = agent.HelpCommentApi.getHelpComment(id);
            loadHelpTicket(Promise.resolve(dataPromise))
        }

        this.getlistAllUser();
        this.getlistAllHelpTicket();


    }
    render() {
        const { handleSubmit, submitting, title, invalid } = this.props;
        const modalConfig = {
            backdrop: 'static', show: this.props.show, bsSize: "sm",
            onHide: this.props.onHide,
            submitting: this.props.submitting
        };

        var optionAllUser = [];
        var dataListUser = this.state.listAllUser;
        if (dataListUser) {
            dataListUser.map(item => {
                optionAllUser.push({ label: item.fullName, value: item.id });
            })
        }
        var optionAllHelpTicket = [];
        var dataListHelpTicket = this.state.listAllHelpTicket;
        if (dataListHelpTicket) {
            dataListHelpTicket.map(item => {
                optionAllHelpTicket.push({ label: item.question, value: item.id });
            })
        }

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
                                            <Field disabled={true} name="helpTicketId" label="Nội dung yêu cầu " placeholder="Nhập Câu trả lời ..." options={optionAllHelpTicket} component={RenderSelect}></Field>
                                        </div>
                                        <div className="col-md-12">
                                            <Field rows="2" name="content" label="Nội dung trả lời " placeholder="Nhập Câu trả lời ..." component={RenderTextAreaShortCode}></Field>
                                        </div>
                                        {/* <div className="col-md-12">
                                            <Field name="createdBy" label="Người Trả lời" options={optionAllUser} component={RenderSelect}></Field>
                                        </div> */}
                                        {/* <div className="col-md-12">
                                            <Field name="attachedFiles" label="File" placeholder="" component={RenderInputWithDiv}></Field>
                                        </div> */}
                                    </div>
                                    {/* <Field type={"hidden"} name="helpTicketId" placeholder="Nhập Nội Dung ..." component={RenderInputWithDiv}></Field> */}
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
            form: ' ModalHelpComment',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalHelpComment)));















