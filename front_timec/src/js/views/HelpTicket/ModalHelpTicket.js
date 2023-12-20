import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderDatePicker, RenderSelect, RenderTextAreaShortCode } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_HELPTICKET } from './action-types';
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
const mapStateToProps = state => {
    var updateValue = {
        ...state.helpTicketReducer.updatingHelpTicket
    };
    return {
        initialValues: updateValue,
        currentUser: state.common.currentUser
    };
};
const mapDispatchToProps = dispatch => ({
    loadHelpTicket: (payload) =>
        dispatch({ type: LOAD_UPDATING_HELPTICKET, payload: payload })
});
class ModalHelpTicket extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listAllUser: [],
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




    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        onHide();
        destroy();
    }
    handleAdd(values) {
        var { onHide,currentUser } = this.props;
        var id = this.props.idHelpTicket;
        var url = '/helpTicket/add';
        var bodyObject = {
            reporterId: currentUser.id,
            assigneeId: values.assigneeId,
            question: values.question,
            status: values.status
        };
        if (id) {
            url = '/helpTicket/update';
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
        const { loadHelpTicket } = this.props;
        var id = this.props.idHelpTicket;
        {
            const dataPromise = agent.HelpTicketApi.getHelpTicket(id);
            loadHelpTicket(Promise.resolve(dataPromise))
        }
        


        this.getlistAllUser();
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

        var optionAllUsers = [];
        var dataListUsers = this.state.listAllUser;
        if (dataListUsers) {
            dataListUsers.map(item => {
                optionAllUsers.push({ label: item.fullName, value: item.id });
            })
        }
        var optionStatus = [
            { label: "Mở", value: "OPEN" },
            { label: "Phân tích", value: "PLANNED" },
            { label: "Kiểm tra", value: "QA" },
            { label: "Hoàn Thành", value: "DONE" }
        ];
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
                                            <Field name="question" label="Nội dung cần hỗ trợ" placeholder="Nhập Nội Dung ..." component={RenderTextAreaShortCode}></Field>
                                        </div>
                                        {/* <div className="col-md-12">
                                            <Field name="reporterId" label="Người báo cáo" placeholder="Nhập tên Người báo cáo ..." options={optionAllUsers} component={RenderSelect}></Field>
                                        </div> */}
                                        <div className="col-md-12">
                                            <Field name="assigneeId" label="Người chỉ đinh" placeholder="Nhập tên Người chỉ đinh ..." options={optionAllUser} component={RenderSelect}></Field>
                                        </div>
                                        <div className="col-md-12">
                                            <Field name="status" label="Trạng thái" placeholder="" options={optionStatus} component={RenderSelect}></Field>
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
            form: ' ModalHelpTicket',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalHelpTicket)));















