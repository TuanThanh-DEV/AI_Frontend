import React from 'react';
import { connect } from 'react-redux';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { RenderInputWithDiv, RenderInputWithGen, RenderTextArea, RenderDatePicker, RenderCheckbox, RenderSelect, RenderMultiSelect, RenderNumberInput, RenderInputPassword, RenderNumber, RenderNumberInputPhone, RenderMoneyFormat, RenderHiddenInput } from '../../components/formInputs';
import { translate } from 'react-i18next';
import { ScriptUtils, UrlUtils } from '../../utils/javascriptUtils';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import ModalPrescription from './ModalPrescription';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_PRESCRIPTION } from './action-types';
import { PermanentCacheService } from '../../services/middleware';
import dateFns from 'date-fns';
import isValid from 'date-fns/is_valid';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const encode = encodeURIComponent;
const selector = formValueSelector("ModalPersonel");


var today = moment(new Date, "DD/MM/YYYY");
const mapStateToProps = state => {

    var updateValue = {
        ...state.prescriptionReducer.updatingPrescription,

    };
    return {

        initialValues: updateValue,
        fromDate: selector(state, "fromDate"),
        toDate: selector(state, "toDate"),
        userId: selector(state, "userId"),
        patientName: selector(state, "patientName"),
        departmentId: selector(state, "departmentId"),
        insuranceTypeId: selector(state, "insuranceTypeId"),
        prescriptionType: selector(state, "prescriptionType"),
        status: selector(state, "status"),
        currentUser: state.common.currentUser,
    };
};
const mapDispatchToProps = dispatch => ({
    loadHospital: (payload) =>
        dispatch({ type: LOAD_UPDATING_PRESCRIPTION, payload: payload }),
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "PrescriptionList", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })

});

class PrescriptionList extends React.Component {
    constructor() {
        super();

        this.state = {
            listPrescription: null,

            isPrescriptionModalShown: false,
            objectprescription: null,
            idPrescription: null,
            listDepartment: null,
            listAllHospital: null,
            listICD: null,
            listInsuranceType: null,
            listDoctor: null,
            hasDownloadedExcel: false,
            allExcelData: null


        }
        this.handleShowmodal = this.handleShowmodal.bind(this);
        this.getListDepartment = this.getListDepartment.bind(this);
        this.getListHospital = this.getListHospital.bind(this);
        this.handleSearchForm = this.handleSearchForm.bind(this);
        this.getListInsuranceType = this.getListInsuranceType.bind(this);
        this.getListDoctor = this.getListDoctor.bind(this);
        this.deletePrescription = this.deletePrescription.bind(this);
        this.handleHidemodal = () => {
            this.setState({ isPrescriptionModalShown: false });
            this.UpdateListPrescription();

        };
        this.handleChangeHospital = (hospitalId) => {
            const { updateField } = this.props;
            updateField("departmentId", null);
            this.getListDepartment(hospitalId);

        }
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.getListICD = this.getListICD.bind(this);
        this.handleClearFormSearch = this.handleClearFormSearch.bind(this);
        this.setPermanentCache = (values) => {
            if (values) {
                if (values.fromDate) {
                    PermanentCacheService.setItem("PrescriptionList_selected_fromDate", values.fromDate);
                }
                if (values.toDate) {
                    PermanentCacheService.setItem("PrescriptionList_selected_toDate", values.toDate);
                }
                if (values.userId) {
                    PermanentCacheService.setItem("PrescriptionList_selected_userId", values.userId);
                }

                values.patientName = values.patientName ? values.patientName : '';
                PermanentCacheService.setItem("PrescriptionList_selected_patientName", values.patientName);

                if (values.departmentId) {
                    PermanentCacheService.setItem("PrescriptionList_selected_departmentId", values.departmentId);
                }
                if (values.status) {
                    PermanentCacheService.setItem("PrescriptionList_selected_status", values.status ? values.status : 'ALL');
                }
                if (values.insuranceTypeId) {
                    PermanentCacheService.setItem("PrescriptionList_selected_insuranceTypeId", values.insuranceTypeId);
                }

                if (values.prescriptionType) {
                    PermanentCacheService.setItem("PrescriptionList_selected_prescriptionType", values.prescriptionType);
                }

            }
        };
        this.handleSearchAllForExcel = (values) => {
            today = new Date();
            var fromDate = values && values.fromDate ? values.fromDate : today;
            var toDate = values && values.toDate ? values.toDate : today;
            var userId = values && values.userId ? values.userId : "ALL";
            var patientName = values && values.patientName ? values.patientName : "";
            var departmentId = values && values.departmentId ? values.departmentId : "ALL";
            var insuranceTypeId = values && values.insuranceTypeId ? values.insuranceTypeId : "ALL";
            var prescriptionType = values && values.prescriptionType ? values.prescriptionType : "ALL";
            var status = values && values.status ? values.status : "ALL";
            this.setPermanentCache(values);
            var page = qs.parse(this.props.location.search).page;
            if (!page) {
                page = 1;
            }
            let setStateInRequest = (list) => {
                this.setState({
                    allExcelData: list,
                    hasDownloadedExcel: true
                })
            }
            return agent.asyncRequests.getPage('/prescription/list/filterPrescription?fromDate=' + moment(fromDate).format("YYYY-MM-DD-HH:mm:ss") + '&toDate=' + moment(toDate).format("YYYY-MM-DD-HH:mm:ss") + "&status=" + status + '&patient=' + patientName
                + '&userId=' + userId + '&departmentId=' + departmentId + '&insuranceTypeId=' + insuranceTypeId + '&prescriptionType=' + (prescriptionType ? prescriptionType : "PRESCRIPTION"), page, 100000
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
            })

        }
    };
    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        onHide();
        destroy();
    }
    handleClearFormSearch() {
        const { destroy } = this.props;
        const { updateField } = this.props;
        var fromDate = new Date;
        var toDate = new Date;
        updateField("fromDate", fromDate);
        updateField("toDate", toDate);
        this.handleSearchForm({ fromDate: fromDate, toDate: toDate });
        destroy();
    }

    handleShowmodal(id) {
        this.setState({
            isPrescriptionModalShown: true,
            idPrescription: id
        });
    }

    getListDepartment(hospitalId) {

        let setStateInRequest = (list) => { this.setState({ listAllDepartment: list }) }
        if (hospitalId) {
            return agent.asyncRequests.get("/department/listAllByHospitalId?hospitalId=" + hospitalId).then(function (res) {
                var result = res.body.resultData;
                if (result) {
                    setStateInRequest(result);
                } else {
                    toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
            });
        } else {
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

    handleSearchForm(values) {
        // var search = qs.parse(values.doctorNameOrPatientNameOrPatientAddress).search;
        // alert(fromDate);
        today = new Date();
        var page = qs.parse(this.props.location.search).page;
        var fromDate = values && values.fromDate ? values.fromDate : today;
        var toDate = values && values.toDate ? values.toDate : today;
        var userId = values && values.userId ? values.userId : "ALL";
        var patientName = values && values.patientName ? values.patientName : "";
        var departmentId = values && values.departmentId ? values.departmentId : "ALL";
        var insuranceTypeId = values && values.insuranceTypeId ? values.insuranceTypeId : "ALL";
        var prescriptionType = values && values.prescriptionType ? values.prescriptionType : "ALL";
        var status = values && values.status ? values.status : "ALL";

        this.setPermanentCache(values);

        // var currentUser = this.props.currentUser;
        // const {dataDoctor} = this.state;
        // dataDoctor != null ? dataDoctor.map(item => {
        //     if (item.id == currentUser.id) {
        //         userId = currentUser.id;
        //     } else {
        //         userId = "ALL";
        //     }
        // }) : []
        if (!page) {
            page = 1;
        }

        let setStateInRequest = (list) => {
            this.setState({
                listPrescription: list,
                hasDownloadedExcel: false
            })
        }
        //TODO list/filterPrescription
        return agent.asyncRequests.getPage('/prescription/list/filterPrescription?fromDate=' + moment(fromDate).format("YYYY-MM-DD-HH:mm:ss") + '&toDate=' + moment(toDate).format("YYYY-MM-DD-HH:mm:ss") + '&status=' + status + '&patient=' + patientName
            + '&userId=' + userId + '&departmentId=' + departmentId + '&insuranceTypeId=' + insuranceTypeId + '&prescriptionType=' + (prescriptionType ? prescriptionType : "PRESCRIPTION") , page
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
        })
    }
    getListICD() {
        let setStateInRequest = (list) => this.setState({
            listICD: list
        });
        return agent.IcdApi.listAllIcd().then(function (res) {
            var result = res.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error(res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    }

    getListInsuranceType() {
        let setStateInRequest = (list) => this.setState({
            listInsuranceType: list
        });
        return agent.InsuranceTypeApi.listAllInsuranceType().then(function (res) {
            var result = res.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error(res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    }

    getListDoctor() {
        let setStateInRequest = (list) => this.setState({
            listDoctor: list
        });
        return agent.asyncRequests.get("/user/listAllDoctor").then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error(res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    }

    componentWillMount() {
        let initialFromDate = new Date();
        initialFromDate = PermanentCacheService.getItem("PrescriptionList_selected_fromDate") ? new Date(PermanentCacheService.getItem("PrescriptionList_selected_fromDate")) : initialFromDate;
        let initialToDate = new Date();
        initialToDate = PermanentCacheService.getItem("PrescriptionList_selected_toDate") ? new Date(PermanentCacheService.getItem("PrescriptionList_selected_toDate")) : initialFromDate;
        var initialuserId = PermanentCacheService.getItem("PrescriptionList_selected_userId") ? PermanentCacheService.getItem("PrescriptionList_selected_userId") : "ALL";


        var initialPatientName = PermanentCacheService.getItem("PrescriptionList_selected_patientName") ? PermanentCacheService.getItem("PrescriptionList_selected_patientName") : "";;

        var initialStatus = PermanentCacheService.getItem("PrescriptionList_selected_status") ? PermanentCacheService.getItem("PrescriptionList_selected_status") : "ALL";
        var initialdepartmentId = PermanentCacheService.getItem("PrescriptionList_selected_departmentId") ? PermanentCacheService.getItem("PrescriptionList_selected_departmentId") : "ALL";
        var initialinsuranceTypeId = PermanentCacheService.getItem("PrescriptionList_selected_insuranceTypeId") ? PermanentCacheService.getItem("PrescriptionList_selected_insuranceTypeId") : "ALL";
        var initialPrescriptionType = PermanentCacheService.getItem("PrescriptionList_selected_prescriptionType") ? PermanentCacheService.getItem("PrescriptionList_selected_prescriptionType") : "ALL";
        const { updateField } = this.props;
        updateField("fromDate", moment(initialFromDate));
        updateField("toDate", moment(initialToDate));
        updateField("patientName", initialPatientName);
        updateField("departmentId", initialdepartmentId);
        updateField("insuranceTypeId", initialinsuranceTypeId);
        updateField("prescriptionType", initialPrescriptionType);
        updateField("status", initialStatus);

        var selectUserId = initialuserId;
        if (initialuserId) {
            updateField("userId", initialuserId);
        } else {
            setTimeout(() => {
                var currentUser = this.props.currentUser;
                if (currentUser != null) {
                    updateField("userId", currentUser.id);
                    selectUserId = currentUser.id;
                } else {
                    updateField("userId", "ALL");
                    selectUserId = "ALL";
                }
            }, 50);
        }

        this.getListDoctor();
        this.getListHospital();
        this.getListDepartment();
        this.getListICD();
        this.getListInsuranceType();
        this.handleSearchForm({
            fromDate: initialFromDate, toDate: initialToDate, patientName: initialPatientName,
            departmentId: initialdepartmentId, insuranceTypeId: initialinsuranceTypeId,
            prescriptionType: initialPrescriptionType, status: initialStatus, userId: initialuserId
        });

    };

    deletePrescription(id) {
        let initialFromDate = new Date();
        initialFromDate = PermanentCacheService.getItem("PrescriptionList_selected_fromDate") ? new Date(PermanentCacheService.getItem("PrescriptionList_selected_fromDate")) : initialFromDate;
        let initialToDate = new Date();
        initialToDate = PermanentCacheService.getItem("PrescriptionList_selected_toDate") ? new Date(PermanentCacheService.getItem("PrescriptionList_selected_toDate")) : initialFromDate;
        let initialuserId = PermanentCacheService.getItem("PrescriptionList_selected_userId") ? PermanentCacheService.getItem("PrescriptionList_selected_userId") : "ALL";


        let initialPatientName = PermanentCacheService.getItem("PrescriptionList_selected_patientName") ? PermanentCacheService.getItem("PrescriptionList_selected_patientName") : "";;

        let initialdepartmentId = PermanentCacheService.getItem("PrescriptionList_selected_departmentId") ? PermanentCacheService.getItem("PrescriptionList_selected_departmentId") : "ALL";
        let initialinsuranceTypeId = PermanentCacheService.getItem("PrescriptionList_selected_insuranceTypeId") ? PermanentCacheService.getItem("PrescriptionList_selected_insuranceTypeId") : "ALL";
        let initialPrescriptionType = PermanentCacheService.getItem("PrescriptionList_selected_prescriptionType") ? PermanentCacheService.getItem("PrescriptionList_selected_prescriptionType") : "ALL";
        let initialStatus = PermanentCacheService.getItem("PrescriptionList_selected_status") ? PermanentCacheService.getItem("PrescriptionList_selected_status") : "ALL";

        let this_ = this;
        if (confirm("Bạn có chắc sẽ xoá !")) {
            var url = `/prescription/${id}`;
            return agent.asyncRequests.del(url
            ).then(function (res) {
                var result = res.body.resultData;
                if (result && !result.error) {
                    alert("Xoá Thành Công !");
                    this_.handleSearchForm({
                        fromDate: initialFromDate, toDate: initialToDate, patientName: initialPatientName,
                        departmentId: initialdepartmentId, insuranceTypeId: initialinsuranceTypeId,
                        prescriptionType: initialPrescriptionType, status: initialStatus, userId: initialuserId
                    });
                } else {
                    toast.error("Có lỗi khi xóa dữ liệu. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Không thể xóa dữ liệu đang được sử dụng từ màn hình khác! ", { autoClose: 15000 });
            });
        } else {
        }
    }

    render() {
        const { handleSubmit, submitting, t } = this.props;
        var baseUrl = UrlUtils.getPathWithParamsNotPaging()
        const data = this.state.listPrescription;
        var optionHospital = [];
        var dataHospital = this.state.listAllHospital
        if (dataHospital) {
            dataHospital.map(item => {
                optionHospital.push({ label: item.name, value: item.id })
            })
        }
        var dataListICD = this.state.listICD;
        var optionIcD = [];
        if (dataListICD) {
            dataListICD.map(item => {
                optionIcD.push({ label: item.name, value: item.id });
            })
        }
        // var dataListInsuranceType = this.state.listInsuranceType;
        // var optionInsuranceType = [];
        // if (dataListInsuranceType) {
        //     optionInsuranceType.push({ label: "Viện Phí", value: 0 });
        //     dataListInsuranceType.map(item => {
        //         optionInsuranceType.push({ label: item.name, value: item.id });
        //     })
        // }
        var optionDepartment = [];
        optionDepartment.push({ label: "Tất cả", value: "ALL" });
        var dataDepartment = this.state.listAllDepartment;
        if (dataDepartment) {
            dataDepartment.map(item => {
                optionDepartment.push({ label: item.name, value: item.id });
            })
        }

        var dataListDoctor = this.state.listDoctor;
        var optionDoctor = [];
        optionDoctor.push({ label: "Tất cả", value: "ALL" });
        if (dataListDoctor) {
            dataListDoctor.map(item => {
                optionDoctor.push({ label: item.fullName, value: item.id });
            })
        }
        let optionPrescriptionType = [
            { label: "Tất cả", value: "ALL" },
            { label: "Bệnh Án", value: "PRESCRIPTION" },
            { label: "Khám Đoàn", value: "PRESCRIPTIONCOMPANY" }
        ]
        let optionInsuranceType = [
            { label: "Tất cả", value: "ALL" },
            { label: "BHYT", value: "BHYT" },
            { label: "Viện Phí", value: "SERVICE" }
        ]
        let optionStatus = [
            { label: "Tất cả", value: "ALL" },
            { label: "Chờ Khám", value: "OPEN" },
            { label: "Đã Hoàn Thành", value: "DONE" },
            { label: "Đang Xử Lý", value: "IN_PROGRESS" },
            { label: "Hủy", value: "CANCELLED" }
        ]

        if (!data) {
            return null;
        }
        var rows = this.renderRowsFromDataContent(data, t, false);
        var rowsForExcel = [];
        if (this.state.hasDownloadedExcel && this.state.allExcelData) {
            rowsForExcel = this.renderRowsFromDataContent(this.state.allExcelData, t, true);
        }

        return (
            <div className="content-wrapper">
                <div className="page-header page-header-default" >
                    <div className="breadcrumb-line">
                        <ul className="breadcrumb">
                            <li><a href=""><i className="icon-home2 position-left"></i> Home</a> </li>
                            <li className="active">Khám Bệnh</li>
                            <li className="active">Danh Sách Bệnh Án</li>
                        </ul>
                        <div className="heading-elements">
                            <div className="heading-btn-group">
                                {/* <a type="button" className="btn bg-teal" href={"/editPrescription/new"}> Khám Bệnh</a> */}
                                {this.state.hasDownloadedExcel ?
                                    <ReactHTMLTableToExcel
                                        id="test-table-xls-button"
                                        className="btn bg-teal"
                                        table="table-to-xls"
                                        filename={"Thống kê lượt khám"}
                                        sheet="Lượt Khám"
                                        buttonText="Download File Excel Tất Cả" /> :
                                    <button className="btn" onClick={() => handleSubmit(this.handleSearchAllForExcel)()}>Xuất File Excel Tất Cả</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content" >
                    <form className="main-search" role="form" onSubmit={handleSubmit(this.handleSearchForm)} >
                        {/* <div className="row">
                        <h4><p class="font-weight-bold" style={{fontWeight: "bold"}}>Chọn Khoảng Thời Gian Hiển Thị Danh Sách</p></h4>
                    </div> */}
                        <div className="row">
                            <div className="col-md-2">
                                <Field name="fromDate" label="Chọn Ngày Bắt Đầu" component={RenderDatePicker} ></Field>
                            </div>
                            <div className="col-md-3">
                                <Field name="userId" label="Bác Sĩ Điều Trị" options={optionDoctor} component={RenderSelect}></Field>
                            </div>
                            <div className="col-md-3">
                                <Field name="departmentId" label="Chuyên Khoa" options={optionDepartment} component={RenderSelect}></Field>
                            </div>
                            <div className="col-md-3">
                                <Field name="prescriptionType" label="Hình Thức Khám" options={optionPrescriptionType} component={RenderSelect}></Field>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-2">
                                <Field name="toDate" label="Chọn Ngày Kết Thúc" component={RenderDatePicker}></Field>
                            </div>
                            <div className="col-md-3">
                                <Field name="patientName" label="Tên Bệnh Nhân" placeholder="Tìm Theo Tên Bệnh Nhân..." component={RenderInputWithDiv}></Field>
                            </div>
                            <div className="col-md-2">
                                <Field name="insuranceTypeId" label="Hình Thức Khám" options={optionInsuranceType} component={RenderSelect}></Field>
                            </div>
                            <div className="col-md-2">
                                <Field name="status" label="Trạng Thái" options={optionStatus} component={RenderSelect}></Field>
                            </div>
                            <div className="col-md-2" style={{ paddingTop: "30px" }} >
                                <div className="pull-left">
                                    <button type="submit" className="btn bg-success btn-xlg" disabled={submitting} >Tìm Kiếm</button>
                                </div>
                                {/* <div className="pull-left">
                                    <button type="button" className="btn bg-warning btn-xlg" onClick={this.handleClearFormSearch} >Làm Mới</button>
                                </div> */}

                            </div>
                        </div>

                    </form>

                    <table className="table table-xxs table-bordered" id="table-to-xls" style={{ display: 'none' }}>
                        <thead>
                            <tr className="bg-teal">
                                <th data-toggle="true">Mã</th>
                                <th data-toggle="true">Bác Sĩ Điều Trị</th>
                                <th data-toggle="true">Tên Bệnh Nhân </th>
                                <th data-toggle="true">Mã Bệnh Nhân </th>
                                <th data-toggle="true">Điện Thoại </th>
                                <th data-toggle="true">Ngày Sinh</th>
                                <th data-toggle="true">Địa Chỉ</th>
                                <th data-toggle="true">Phòng Khám</th>
                                <th data-toggle="true">Đối Tượng BHYT</th>
                                <th data-toggle="true">Ngày Khám</th>
                                <th data-toggle="true">Trạng Thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rowsForExcel}
                        </tbody>
                    </table>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="panel panel-flat">
                                <table className="table table-xxs table-bordered">
                                    <thead>
                                        <tr className="bg-teal">
                                            <th data-toggle="true">Mã</th>
                                            <th data-toggle="true">Bác Sĩ Điều Trị</th>
                                            <th data-toggle="true">Tên Bệnh Nhân </th>
                                            <th data-toggle="true">Mã Bệnh Nhân </th>
                                            <th data-toggle="true">Điện Thoại </th>
                                            <th data-toggle="true">Ngày Sinh</th>
                                            <th data-toggle="true">Địa Chỉ</th>
                                            <th data-toggle="true">Phòng Khám</th>
                                            <th data-toggle="true">Đối Tượng BHYT</th>
                                            <th data-toggle="true">Ngày Khám</th>
                                            <th data-toggle="true">Trạng Thái</th>
                                            <th className="text-center footable-visible footable-last-column" ><i className="icon-menu-open2"></i></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows}
                                    </tbody>
                                </table>
                            </div>
                            {this.state.isPrescriptionModalShown ? <ModalPrescription
                                title="Khám Bệnh"
                                idPrescription={this.state.idPrescription}
                                show={this.state.isPrescriptionModalShown}
                                onHide={this.handleHidemodal}
                            /> : null
                            }
                            <TablePagination data={data} baseUrl={baseUrl} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderRowsFromDataContent(data, t, isExcel) {
        return data.content.map(item => {
            var elementColor = "";
            if (item.status == "OPEN") {
                elementColor = { 'color': '#0040ff' };
            } else if (item.status == "IN_PROGRESS") {
                elementColor = { 'color': '#ff0000' };
            }
            else if (item.status == "DONE") {
                elementColor = { 'color': '#039296' };
            } else {
                elementColor = { 'color': '#777' };
            }
            if (!item.bhytPrescriptionId) {

                return (
                    <tr key={item.id}>
                        <td>{item.id} <br /> <button className='btn btn-warning' onClick={() => this.deletePrescription(item.id)} >X</button></td>
                        <td>{item.user ? item.user.fullName : null}</td>
                        <td>{item.patient ? item.patient.fullName : null}</td>
                        <td>{item.patient ? item.patient.code : null}</td>
                        <td>{item.patient ? item.patient.phone : null}</td>
                        <td>{item.patient ? moment(item.patient.birthday).format("DD/MM/YYYY") : null}</td>
                        <td>{item.patient ? item.patient.address : null}</td>

                        <td>{item.department ? item.department.name : null}</td>
                        <td>{(item.insuranceType && item.insuranceTypeId > 1) ? item.insuranceType.name : "Viện Phí"}</td>
                        <td>{moment(item.arriveTime).format("DD/MM/YYYY hh:mm")}</td>
                        <td style={elementColor}> {t(item.status)} <br /><p style={{ color: 'black' }}> {item.insuranceType && item.insuranceTypeId > 1 ? (item.hasUploadedXML ? ' - Đã Hoàn Tất XML' : '- Chưa Upload XML') : ''}</p></td>
                        {!isExcel ? <td><a href={"/editPrescription/" + item.id}>Vào Khám</a></td> : null}


                    </tr>);
            }
        });
    }
}
export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'PrescriptionList',
            destroyOnUnmount: true,
            enableReinitialize: true,
            // validate
        })(PrescriptionList)));