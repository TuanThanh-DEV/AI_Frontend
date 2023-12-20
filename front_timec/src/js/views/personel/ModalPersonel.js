import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderPassword, RenderSwitch, RenderInputWithGen, RenderTextArea, RenderDatePicker, RenderCheckbox, RenderSelect, RenderMultiSelect, RenderNumberInput, RenderInputPassword, RenderNumber, RenderNumberInputPhone, RenderMoneyFormat } from '../../components/formInputs';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import isEmail from 'sane-email-validation';
import { StringUtils, SecurityUtils } from '../../utils/javascriptUtils';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_PERSONEL } from './action-types';
import { FIRE_REDIRECT } from '../../constants/action-types';
import { isNull } from 'util';
import moment from 'moment';
import UserAvatar from '../../components/UserAvatar';
import SecuredComponent from '../../components/SecuredComponent';
import ListFile from '../../components/ListFile';

const validate = values => {

    var today = new Date();
    var birthdaymin = moment(today, "DD/MM/YYYY").add(-18, 'years');
    const errors = {};
    if (!values.email) {
        errors.email = 'Vui lòng nhập email.';
    } else if (!isEmail(values.email)) {
        errors.email = 'Email không hợp lệ.';
    };
    if (!values.id && !values.password) {
        errors.password = 'Vui lòng nhập mật khẩu.';
    };
    if (values.leaveDayYear > 36) {
        errors.leaveDayYear = 'Vui lòng nhập nhỏ hơn 36 ngày';
    } else if (values.password) {
        if (values.password.length < 6) {
            errors.password = "Để bảo mật, mật khẩu phải chứa 6 ký tự trở lên.";
        }
    };
    if (!values.code) {
        errors.code = 'Vui lòng nhập mã nhân viên!';
    };
    if (!values.fullName) {
        errors.fullName = 'Vui lòng nhập họ tên!';
    };
    if (values.birthday) {
        if (moment(values.birthday).format("YYYY") > moment(birthdaymin).format("YYYY")) {
            errors.birthday = "Ngày Sinh của Nhân viên chưa đúng. Vui lòng nhập năm sinh nhỏ hơn hoặc bằng năm " + moment(birthdaymin).format("YYYY");
        }
    }
    if (!values.roles || values.roles == "" || (values.roles && values.roles.length == 0)) {
        errors.roles = "Vui Chọn Bộ Phận!"
    }
    if (!values.hospitalId) {
        errors.hospitalId = 'Vui lòng chọn phòng khám ( Bệnh Viện )!';
    };

    return errors;
}
const selector = formValueSelector("ModalPersonel");
const mapStateToProps = state => {
    var updateValue = {
        ...state.personelReducer.updatingPersonel,
        birthday: state.personelReducer.updatingPersonel && state.personelReducer.updatingPersonel.birthday ? moment(state.personelReducer.updatingPersonel.birthday) : null,
        roles: state.personelReducer.updatingPersonel && state.personelReducer.updatingPersonel.roles ? state.personelReducer.updatingPersonel.roles.map(role => { return { label: role.name, value: role.id } }) : null,
        startWorkDate: state.personelReducer.updatingPersonel && state.personelReducer.updatingPersonel.startWorkDate ? moment(state.personelReducer.updatingPersonel.startWorkDate) : null,
        issuedDate: state.personelReducer.updatingPersonel && state.personelReducer.updatingPersonel.issuedDate ? moment(state.personelReducer.updatingPersonel.issuedDate) : null,
        departments: state.personelReducer.updatingPersonel && state.personelReducer.updatingPersonel.departments ? state.personelReducer.updatingPersonel.departments.map(department => { return { label: department.name, value: department.id } }) : null,
    };
    return {
        initialValues: updateValue,
        currentUser: state.common.currentUser,
        hosipitalIdSelector: selector(state, "hospitalId")
    };
};

const mapDispatchToProps = dispatch => ({
    loadPersonel: (payload) =>
        dispatch({ type: LOAD_UPDATING_PERSONEL, payload: payload }),
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalPersonel", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })

});


class ModalPersonel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllRoles: [],
            listAllHospital: [],
            listAllDepartment: [],
            disableDataManipulation: true,
            isShowFormSalary: false,
            isSalary: null
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.handleShowFormSalary = this.handleShowFormSalary.bind(this);
        this.handleChangeHospital = (hospitalId) => {
            const { updateField, hosipitalIdSelector } = this.props;
            if (hospitalId != hosipitalIdSelector) {
                updateField("departments", null);
            }
        }
    }

    componentWillMount() {
        const { loadPersonel } = this.props;
        var id = this.props.idUser;
        const dataPromise = agent.UserApi.getPersonel(id);
        loadPersonel(Promise.resolve(dataPromise));

        return (
            this.getListRoles(),
            this.getListHospital(),
            this.getListDepartment()
        )
    }

    getListHospital() {
        let setStateInRequest = (list) => { this.setState({ listAllHospital: list }) }
        return agent.asyncRequests.get("/hospital/listAll").then(function (res) {
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

    getListDepartment() {
        let setStateInRequest = (list) => { this.setState({ listAllDepartment: list }) }
        return agent.asyncRequests.get("/department/listAll").then(function (res) {
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

    getListRoles() {
        let setStateInRequest = (list) => { this.setState({ listAllRoles: list }) }
        return agent.asyncRequests.get("/role/listAll").then(function (res) {
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

    handleAdd(values) {
        const { currentUser } = this.props;
        var onHide = this.props.onHide;
        var id = this.props.idUser;
        var url = '/user/add';
        var bodyObject = {
            imageUpload: values.imageUpload,
            image: values.image,
            email: values.email,
            password: values.password,
            fullName: values.fullName,
            phone: values.phone,
            role: "ADMIN",
            roles: values.roles.map(item => {
                return { id: item.value }
            }),
            departments: values.departments.map(item => { return { id: item.value } }),
            address: values.address,
            birthday: values.birthday,
            active: values.active,
            leaveDayYear: values.leaveDayYear,
            labourContract: values.labourContract,
            department: values.department,
            hospitalId: values.hospitalId,
            // Profile in File
            profiles: values.profiles,
            // End Profile in File
            identityCardNumber: values.identityCardNumber,
            issuedDate: values.issuedDate,
            issuedAt: values.issuedAt,
            permanentAddress: values.permanentAddress,
            currentAddress: values.currentAddress,
            startWorkDate: values.startWorkDate,
            position: values.position,
            numberOfYear: values.numberOfYear,
            jobDescription: values.jobDescription,
            degree: values.degree,
            trainingPlace: values.trainingPlace,
            profession: values.profession,
            graduationYear: values.graduationYear,
            foreignLanguageSkill: values.foreignLanguageSkill,
            level: values.level,
            familyInformation: values.familyInformation,
            gender: values.gender,
            code: values.code,
            createdUserEmail: !id ? currentUser.email : values.createdUserEmail,
            lastedUpdateUserEmail: id && values.lastedUpdateUserEmail ? values.lastedUpdateUserEmail : currentUser.email,
            userType: values.userType,
            maChungChiHanhNgheBacSi: values.maChungChiHanhNgheBacSi,
            UserConfig: {
                hasSalary: values.hasSalary,
                birthdayFee: values.birthdayFee,
                holidayFee: values.holidayFee,
                lunchFee: values.lunchFee,
                grossSalary: values.grossSalary,
                diligenceFee: values.diligenceFee,
                otherSupportFee: values.otherSupportFee,
                incomeTax: values.incomeTax,
                otherSupportFeeNote: values.otherSupportFeeNote
            }
        };
        if (id) {
            url = '/user/update';
            bodyObject.id = id;
        }

        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && result.id) {
                onHide();
                toast.info("Lưu Thành Công.", { autoClose: 1000 });
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
        onHide();
        destroy();
    }
    handleShowFormSalary(id) {
        this.setState({
            isShowFormSalary: !this.state.isShowFormSalary,
            isSalary: id
        })
    }

    render() {
        const { handleSubmit, submitting, title, invalid, currentUser, hosipitalIdSelector } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show, bsSize: "lg", onHide: this.props.onHide, submitting: this.props.submitting };
        var disableDataManipulation = this.state.disableDataManipulation;

        var id = this.props.idUser;
        if (SecurityUtils.hasPermission(currentUser, "admin.users.update")) {
            disableDataManipulation = false
        }
        var optionUserRoles = [];
        this.state.listAllRoles.map(item => {
            optionUserRoles.push({ label: item.name, value: item.id })
        })
        var optionHospital = [];
        this.state.listAllHospital.map(item => {
            optionHospital.push({ label: item.name, value: item.id })
        })
        var optionDepartment = [];
        this.state.listAllDepartment.map(item => {
            if (hosipitalIdSelector == item.hospital.id) {
                optionDepartment.push({ label: item.name, value: item.id });
            }
        })

        let elementButton = <button type="button" style={{ width: '30%', 'font-size': '13px' }} className="btn btn-success" onClick={() => this.handleShowFormSalary(id)}>Thêm Lương Cơ Bản</button>
        if (this.state.isShowFormSalary) {
            elementButton = <button type="button" style={{ width: '30%', 'font-size': '13px' }} className="btn btn-info btn-block" onClick={() => this.handleShowFormSalary(id)}>Ẩn Lương Cơ Bản</button>
        }
        var newModal = null;
        var dateNoew = new Date();
        var optionGender = [
            { label: "Nam", value: "MALE" },
            { label: "Nữ", value: "FEMALE" },
            { label: "Khác", value: "OTHER" }
        ];
        var optionuserType = [
            { label: "QUẢN TRỊ VIÊN", value: "ADMIN" },
            { label: "BÁC SĨ", value: "DOCTOR" },
            { label: "Y TÁ", value: "NURSE" },
            { label: "CHUYÊN VIÊN KỸ THUẬT", value: "LABORATORIST" },
            { label: "LỄ TÂN", value: "RECEPTIONIST" },
            { label: "KẾ TOÁN", value: "ACCOUNTANT" },
            { label: "THU NGÂN", value: "CASHIER" },
            { label: "DƯỢC SĨ", value: "PHARMACIST" }
        ];

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
                                <fieldset disabled={disableDataManipulation}>
                                    <div className="form-group">
                                        <Field name="imageUpload" component={UserAvatar}></Field>
                                        <div className="form-group">
                                            <br />
                                            <div className="row">
                                                <div className="col-md-3">
                                                    {/* <Field name="id" type={"hidden"} component={RenderInputWithDiv}></Field> */}
                                                    <Field name="fullName" label="Họ Tên(*)" placeholder="Nhập họ tên người dùng..." component={RenderInputWithDiv}></Field>
                                                    <Field name="email" type="email" label="Email(*)" placeholder="Nhập email người dùng..." component={RenderInputWithDiv}></Field>
                                                    <Field name="identityCardNumber" label="Số CMND" placeholder="Nhập số chứng minh nhân dân..." component={RenderNumberInput}></Field>
                                                    <Field name="position" label="Chức Vụ" placeholder="Nhập chức vụ..." component={RenderInputWithDiv}></Field>
                                                    <Field disabled={name ? true : false} name="hospitalId" label="Phòng Khám (*) " options={optionHospital} onChangeAction={(value) => { this.handleChangeHospital(value) }} component={RenderSelect}></Field>
                                                    <Field name="numberOfYear" label="Số Năm" placeholder="Nhập số năm làm việc..." component={RenderNumber}></Field>

                                                </div>
                                                <div className="col-md-3">
                                                    <Field name="code" label="Mã Nhân Viên(*)" placeholder="Nhập mã nhân viên..." component={RenderInputWithDiv}></Field>
                                                    <Field name="password" label="Mật khẩu(*)" placeholder="Nhập mật khẩu..." component={RenderPassword}></Field>
                                                    <Field name="issuedAt" label="Nơi Cấp" placeholder="Nhập nơi cấp..." component={RenderInputWithDiv}></Field>
                                                    <Field name="labourContract" label="Loại HĐLD" placeholder="Nhập loaị Hợp Đồng Lao Động..." component={RenderInputWithDiv}></Field>
                                                    <Field name="userType" label="Loại Nhân Viên" options={optionuserType} component={RenderSelect}></Field>
                                                    <Field name="leaveDayYear" label="Số Ngày Phép / Năm" placeholder="Nhập số ngày phép của nhân viên / năm..." component={RenderNumber}></Field>
                                                </div>
                                                <div className="col-md-3">
                                                    <Field name="phone" type="number" label="Số Điện Thoại" placeholder="Nhập số điện thoại..." component={RenderNumber}></Field>
                                                    <Field name="birthday" label="Ngày Sinh" component={RenderDatePicker}></Field>
                                                    <Field name="issuedDate" label="Ngày Cấp" maxDate={dateNoew} component={RenderDatePicker}></Field>
                                                    <Field name="startWorkDate" label="Ngày Vào Công Ty" component={RenderDatePicker}></Field>
                                                    <Field disabled={name ? true : false} name="departments" label="Chuyên Khoa (*) " options={optionDepartment} component={RenderMultiSelect}></Field>
                                                    <Field name="jobDescription" label="Mô Tả Công Việc Đang Làm" placeholder="Nhập mô tả công việc đang làm..." row={3} component={RenderTextArea}></Field>
                                                </div>
                                                <div className="col-md-3">
                                                    <Field name="gender" label="Giới Tính" options={optionGender} component={RenderSelect}></Field>
                                                    <Field name="currentAddress" label="Địa Chỉ Hiện Tại" placeholder="Nhập địa chỉ hiện tại..." component={RenderInputWithDiv}></Field>
                                                    <Field name="permanentAddress" label="Địa Chỉ Thường Trú" placeholder="Nhập dịa chỉ thường trú..." component={RenderInputWithDiv}></Field>
                                                    <Field name="active" label="Đang Làm Việc" component={RenderSwitch}></Field>
                                                    <Field name="roles" label="Bộ Phận" placeholder="Chọn bộ phận..." options={optionUserRoles} component={RenderMultiSelect}></Field>
                                                </div>
                                            </div>
                                            {/* <hr/>
                                        {elementButton}
                                        {this.state.isShowFormSalary ?<div className="row">
                                            <br/>
                                            <div className="col-md-6">
                                                <Field  name="hasSalary" label="Trạng Thái Lương" checkLabel="Đang Hoạt Động"  component={RenderCheckbox}></Field>
                                                <Field  name="birthdayFee" label="Thưởng Sinh Nhật"   thousandSeparator={true}  component={RenderMoneyFormat} ></Field>
                                                <Field  name="holidayFee" label="Thưởng Ngày Lễ"  thousandSeparator={true}  component={RenderMoneyFormat} ></Field>
                                                <Field  name="lunchFee" label="Phụ Cấp Ăn Trưa"   thousandSeparator={true}  component={RenderMoneyFormat} ></Field>
                                            </div>
                                            <div className="col-md-6">
                                                <Field  name="grossSalary" label="Lương Cơ Bản"   thousandSeparator={true}  component={RenderMoneyFormat} ></Field>
                                                <Field  name="diligenceFee" label="Thưởng Chuyên Cần"   thousandSeparator={true}  component={RenderMoneyFormat} ></Field>
                                                <Field  name="otherSupportFee" label="Phụ Cấp Thêm"   thousandSeparator={true}  component={RenderMoneyFormat} ></Field>
                                                <Field  name="incomeTax" label="Thuế Thu Nhập Cá Nhân"  thousandSeparator={true}  component={RenderMoneyFormat} ></Field>
                                                <div ></div>
                                            </div>
                                            <br/>
                                            <div className="col-md-12">
                                                <Field  name="otherSupportFeeNote" label="Ghi Chú Tiền Cộng Thêm" placeholder="Nhập Ghi Chú Tiền Cộng Thêm..."  row={3} component={RenderTextArea} ></Field>
                                            </div>
                                        </div> : null} */}
                                            {/* <hr/> */}


                                            <div className="row">
                                                <center> <h5>Bằng Cấp</h5></center>
                                                <div className="col-md-3">

                                                    <Field name="degree" label="Bằng Cấp Chuyên Ngành" placeholder="Nhập bằng cấp chuyên ngành..." component={RenderInputWithDiv}></Field>
                                                    <Field name="level" label="Cấp Độ" placeholder="Nhập cấp độ..." component={RenderInputWithDiv}></Field>
                                                </div>
                                                <div className="col-md-3">
                                                    <Field name="trainingPlace" label="Nơi Đào Tạo" placeholder="Nhập nơi đào tạo..." component={RenderInputWithDiv}></Field>
                                                    <Field name="foreignLanguageSkill" label="Ngoại Ngữ" placeholder="Nhập Ngoại Ngữ..." component={RenderInputWithDiv}></Field>
                                                </div>
                                                <div className="col-md-3">
                                                    <Field name="profession" label="Chuyên Ngành" placeholder="Nhập chuyên ngành..." component={RenderInputWithDiv}></Field>

                                                    <Field name="graduationYear" label="Năm Tốt Nghiệp" placeholder="Nhập năm tốt nghiệp..." component={RenderNumberInput}></Field>

                                                </div>

                                                <div className="col-md-3">

                                                    <Field name="familyInformation" label="Thông Tin Gia Đình" placeholder="Nhập thông tin gia đình..." row={3} component={RenderTextArea}></Field>

                                                </div>
                                                <div className="col-md-3">

                                                    <Field name="maChungChiHanhNgheBacSi" label="Mã Chứng Chỉ Hành Nghề" placeholder="Nhập mã chứng chỉ hành nghề"  component={RenderInputWithDiv}></Field>

                                                </div>



                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md">
                                        <Field name="profiles" component={ListFile} modalUrl="/uploadUserProfile" labelUploadFile={'Hồ Sơ Nhân Viên'}></Field>
                                    </div>
                                    <div className="text-right">
                                        <button type="button" style={{ marginRight: "20px" }} style={{ marginRight: "20px" }} className="btn btn-default" onClick={this.handleHideAndClear} ><i class="icon-cross" aria-hidden="true"></i> Đóng</button>
                                        <button type="submit" className="btn bg-success" disabled={submitting}> Lưu Lại</button>
                                    </div>
                                </fieldset>
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
            form: 'ModalPersonel',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalPersonel)));
