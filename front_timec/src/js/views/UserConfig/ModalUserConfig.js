import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderMoneyFormat, RenderSelect, RenderCheckbox } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_USER_CONFIG } from './action-types';

const validate = values => {
    const errors = {};
    if (!values.incomeTax) {
        errors.incomeTax = "Vui lòng nhập Thuế Thu Nhập Cá Nhân!"
    }
    if (!values.grossSalary) {
        errors.grossSalary = "Vui lòng nhập Lương Theo Giờ!"
    }
    if (!values.userId) {
        errors.userId = "Vui lòng chọn Nhân Viên"
    }
    return errors;
}
const mapStateToProps = state => {
    var updateValue = {
        ...state.userConfigReducer.updatingUserConfig,
    };
    return {
        initialValues: updateValue
    };
};
const mapDispatchToProps = dispatch => ({
    loadUserConfig: (payload) =>
        dispatch({ type: LOAD_UPDATING_USER_CONFIG, payload: payload })
});
class ModalUserConfig extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllUser: null,
            listAllUserConfig: null,
        }

        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.getlistAlUserActiveNoConfig = this.getlistAlUserActiveNoConfig.bind(this);
    };
    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        onHide();
        destroy();
    }
    handleAdd(values) {
        var onHide = this.props.onHide;
        var id = this.props.idUserConfig;
        var url = '/userConfig/add';
        var bodyObject = {
            userId: values.userId,
            hasSalary: values.hasSalary,
            birthdayFee: values.birthdayFee,
            holidayFee: values.holidayFee,
            lunchFee: values.lunchFee,
            diligenceFee: values.diligenceFee,
            otherSupportFee: values.otherSupportFee,
            grossSalary: values.grossSalary,
            incomeTax: values.incomeTax,
            otherSupportFeeNote: values.otherSupportFeeNote

        };
        if (id) {
            url = '/userConfig/update';
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
        const { loadUserConfig } = this.props;
        let id = this.props.idUserConfig;

        const dataPromise = agent.UserConfigApi.getUserConfig(id);
        loadUserConfig(Promise.resolve(dataPromise))

        if (id) {
            this.getlistAlUser();
        } else {
            this.getlistAlUserActiveNoConfig();
        }
    }
    getlistAlUser() {
        let setStateInRequest = (list) => { this.setState({ listAllUser: list }) }
        return agent.UserApi.listAllPersonel().then(function (res) {
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

    getlistAlUserActiveNoConfig() {
        let setStateInRequest = (list) => { this.setState({ listAllUser: list }) }
        return agent.asyncRequests.get("/user/findAllActiveNoConfig").then(function (res) {
            var result = res.body.resultData;
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
            backdrop: 'static', show: this.props.show, bsSize: "md",
            onHide: this.props.onHide,
            submitting: this.props.submitting
        };

        let id = this.props.idUserConfig;
        var optionUser = [];
        var listAllUser = this.state.listAllUser;
        if (listAllUser != null) {
            listAllUser.map(user => {
                optionUser.push({ label: user.fullName, value: user.id })
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
                                        <div className="col-md-6">
                                            <Field name="userId" disabled={id ? true : false} label="Tên Nhân Viên" options={optionUser} component={RenderSelect}></Field>
                                            <Field name="grossSalary" label="Lương Theo Giờ" placeholder="Nhập Lương Theo Giờ..." thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                            <Field name="lunchFee" label="Hỗ Trợ Ăn Trưa" placeholder="Nhập Hỗ Trợ Ăn Trưa..." thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                            <Field name="diligenceFee" label="Chuyên Cần" placeholder="Nhập Chuyên Cần..." thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                        </div>
                                        <div className="col-md-6">
                                            <Field name="incomeTax" label="Thuế Thu Nhập Cá Nhân" placeholder="Nhập Thuế Thu Nhập Cá Nhân..." thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                            <Field name="birthdayFee" label="Thưởng Sinh Nhật" placeholder="Nhập Thưởng Sinh Nhật..." thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                            <Field name="holidayFee" label="Thưởng Ngày Lễ" placeholder="Nhập Thưởng Ngày Lễ..." thousandSeparator={true} component={RenderMoneyFormat}></Field>
                                            {/* <Field name="otherSupportFee" label="Cộng Khác" placeholder="Nhập Cộng Khác..." thousandSeparator={true} component={RenderMoneyFormat}></Field> */}
                                            <Field name="hasSalary" label="Trạng Thái" checkLabel="Đang Làm Việc" component={RenderCheckbox}></Field>
                                        </div>
                                        <div className="col-md-12">
                                            <Field name="otherSupportFeeNote" label="Ghi Chú" placeholder="Nhập Ghi Chú..." thousandSeparator={true} row={3} component={RenderInputWithDiv}></Field>
                                        </div>
                                    </div>

                                </div>

                                <div className="text-right">
                                    <button type="button" style={{ marginRight: "20px" }} className="btn btn-default" onClick={this.handleHideAndClear} ><i class="icon-cross" aria-hidden="true"></i> Đóng</button>
                                    <button type="submit" className="btn bg-success" disabled={submitting}> Lưu Lại</button>
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
            form: 'ModalUserConfig',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalUserConfig)));
