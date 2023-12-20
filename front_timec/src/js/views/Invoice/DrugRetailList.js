import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { RenderInputWithDiv, RenderDatePicker, RenderSelect, RenderNumberInput, RenderDatePickerWithTime, RenderTextAreaShortCode, RenderMoneyFormat } from '../../components/formInputs';
import { Field, reduxForm, formValueSelector, reset } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LOAD_UPDATING_PRESCRIPTION } from './action-types';
import { FIRE_REDIRECT } from '../../constants/action-types';
import { UPDATE_PREVIOUS_URL } from '../../constants/action-types';
import TabDrugRetail from './TabDrugRetail';
import { FormatterUtils } from '../../utils/javascriptUtils';
import TabDrugGroup from './TabDrugGroup';
import ModalPatientDrugRetail from '../Patient/ModalPatientDrugRetail';
import ModalSearchpatient from '../Patient/ModalSearchpatient';

const validate = values => {
    const errors = {};
    return errors;
}
const selector = formValueSelector('DrugRetailList');
var today = new Date();

const mapStateToProps = state => {
    var updateValue = {
        ...state.prescriptionReducer.updatingPrescription,
        solution: state.prescriptionReducer.updatingPrescription && state.prescriptionReducer.updatingPrescription.solution ? state.prescriptionReducer.updatingPrescription.solution : "KhongToa",
        insuranceTypeId: state.prescriptionReducer.updatingPrescription && state.prescriptionReducer.updatingPrescription.insuranceTypeId ? state.prescriptionReducer.updatingPrescription.insuranceTypeId : 0,
    };
    return {
        initialValues: updateValue,
        hospitalId: selector(state, "hospitalId"),
        doctorId: selector(state, "userId"),
        hospitalIdSelector: selector(state, "hospitalId"),
        patientIdSelector: selector(state, "patientId"),
        currentUser: state.common.currentUser,
        insuranceTypeIdSelector: selector(state, "insuranceTypeId"),
        idOfGroup: selector(state, "nameOfGroup"),
        numberOfGroup: selector(state, "numberOfGroup"),

    };
};

const mapDispatchToProps = dispatch => ({
    backToList: () =>
        dispatch({ type: FIRE_REDIRECT, toUrl: "/listPrescription" }),
    // goToEdit: (id) =>
    //     window.location.href = "/editPrescription/" + id,
    storePreviousUrl: (previousUrl) =>
        dispatch({ type: UPDATE_PREVIOUS_URL, previousUrl }),
    loadPrescription: (payload) =>
        dispatch({ type: LOAD_UPDATING_PRESCRIPTION, payload: payload }),

    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "DrugRetailList", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        }),

});

// const DRUG_GROUP_SALE_PRICE = 5000;

class DrugRetailList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listAllPersonel: [],
            listAllPatient: [],
            listAllDepartment: [],
            listAllHospital: [],
            listAllIcd: [],
            listAllProcedureService: [],
            isPrescriptionItemShown: false,
            listShortCodes: [],
            listAllGroups: [],
            isShowButtonNewPrescription: false,
            listTranferForm: [],
            isShowMenuControl: false,
            currentPrescription: null,
            listIncuranceCard: null,
            objectInsuranceCard: null,
            totalPrice: 0,
            drugRetailPrice: 0,
            drugGroupPrice: 0,
            additionalPrice: 0,
            drugGroupItem: null,
            countReloadTabDrugRetail: 0,
            focusedFieldName: "",
            listPrescription: null
        }
        this.handleHidemodal = () => {
            this.setState({
                isPrescriptionItemShown: false,
            });

        }
        this.handleHidemodalControl = () => {
            this.setState({
                isShowMenuControl: false,
            });
        }
        this.focusField = (focusedFieldName) => {
            this.setState({
                focusedFieldName: focusedFieldName,
            });

        }
        this.handleShowPrice = () => {
            var prescriptionId = this.props.match.params.id;
            var _this = this;
            return agent.PrescriptionItemApi.findByPrescriptionId(prescriptionId
                ).then(function (res) {
                    var listItems = res.resultData;
                    if (listItems) {
                        var totalPrice = 0;
                        listItems.map(item => {
                            totalPrice += _this.calculateTotalSaleAmount(item);
                        });
                        _this.setState({
                            totalPrice: totalPrice
                        });
                    } else {
                        toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                    }
                }, function (err) {
                    toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                        + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
                });
        }

        this.handleSave = this.handleSave.bind(this);
        this.handleFinish = this.handleFinish.bind(this);
        this.handleDoneDrugGroupOfInvoice = this.handleDoneDrugGroupOfInvoice.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.getListDrugGroups = this.getListDrugGroups.bind(this);
        this.getListPrescription = this.getListPrescription.bind(this);
        this.addOrUpdateDrugGroupOfInvoice = this.addOrUpdateDrugGroupOfInvoice.bind(this);
        this.handleAddPatient = this.handleAddPatient.bind(this);
        this.handleHidemodalPatient = (id) => {
            this.setState({ isPatientModalShown: false });
            this.getListPrescription();
        };
    };
    handleAddPatient() {
        this.setState({
            isPatientModalShown: true
        });

    }
    handleHideAndClear() {
        const { destroy, backToList } = this.props;
        // onHide();
        destroy();
        backToList()
    }

    reloadPage() {
        var countReloadTabDrugRetail = this.state.countReloadTabDrugRetail + 1;
        this.setState({ countReloadTabDrugRetail: countReloadTabDrugRetail });
    }

    handleDoneDrugGroupOfInvoice() {
        this.setState({drugGroupItem: null});
        this.props.updateField("nameOfGroup", null);
        this.props.updateField("numberOfGroup", null);
        this.reloadPage();
    }

    handleSave(values) {
        const { goToEdit } = this.props;
        var id = this.props.match.params.id;
        var url = '/prescription/update';
        var bodyObject = {
            id: id,
            userId: values.userId,
            diagnosisReport: values.diagnosisReport,
            patientId: values.patientId,
            departmentId: values.departmentId,
            procedureService: values.procedureService,
            cls: values.cls,
            analysis: values.analysis,
            hospitalId: values.hospitalId,
            procedureReport: values.procedureReport,
            arriveTime: values.arriveTime,
            examineTime: values.examineTime,
            finishTime: values.finishTime,
            icdId: values.icdId,
            subIcdId: values.subIcdId,
            solution: values.solution ? values.solution : "KhongToa",
            numberDayOff: values.numberDayOff,
            fromDayOff: values.fromDayOff,
            mach: values.mach,
            nhipTho: values.nhipTho,
            nhietDo: values.nhietDo,
            huyetAp: values.huyetAp,
            height: values.height,
            weight: values.weight,
            dayPrescription: values.dayPrescription,
            status: "IN_PROGRESS",
            insuranceTypeId: (values.insuranceTypeId == 0 ? "" : values.insuranceTypeId)
        };
        var _this = this;
        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                // backToList();
                // this.setState({isShowButtonNewPrescription : true})
                toast.info("Đã Lưu!", { autoClose: 5000 });
                _this.state.currentPrescription = bodyObject;
                // this.getListTranferFormByPrescriptionId();
                goToEdit(id);
            } else {
                toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    };

    handleFinish(values) {
        // var backToList = this.props.backToList;
        const { updateField } = this.props;
        var today = new Date();
        var id = this.props.match.params.id;
        var url = '/prescription/finish';
        var bodyObject = {
            id: id,
            userId: values.userId,
            diagnosisReport: values.diagnosisReport,
            patientId: values.patientId,
            departmentId: values.departmentId,
            procedureService: values.procedureService,
            cls: values.cls,
            analysis: values.analysis,
            hospitalId: values.hospitalId,
            procedureReport: values.procedureReport,
            arriveTime: values.arriveTime,
            examineTime: values.examineTime,
            finishTime: today,
            icdId: values.icdId,
            subIcdId: values.subIcdId,
            solution: values.solution ? values.solution : "KhongToa",
            numberDayOff: values.numberDayOff,
            fromDayOff: values.fromDayOff,
            mach: values.mach,
            nhipTho: values.nhipTho,
            nhietDo: values.nhietDo,
            huyetAp: values.huyetAp,
            height: values.height,
            weight: values.weight,
            dayPrescription: values.dayPrescription,
            status: "DONE",
            insuranceTypeId: (values.insuranceTypeId == 0 ? null : values.insuranceTypeId)
        };
        var _this = this;
        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                // backToList();
                // this.setState({isShowButtonNewPrescription : true})
                toast.info("Đã Lưu! Mời gọi Bệnh Nhân tiếp theo.", { autoClose: 5000 });
                _this.state.currentPrescription = bodyObject;
                updateField("finishTime", today);
            } else {
                toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    };

    getListPrescription() {
        var id = this.props.match.params.id;
        let setStateInRequest = (list) => { this.setState({ listPrescription: list }) }
        return agent.PrescriptionApi.getPrescription(id
        ).then(function (res) {
            var result = res.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error("Có lỗi khi xóa dữ liệu. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Không thể xóa dữ liệu đang được sử dụng từ màn hình khác! ", { autoClose: 15000 });
        });
    }
    componentWillMount() {
        this.setState({
            totalPrice: 0
        });
        this.getListDrugGroups();
        this.getListPrescription();
    }
    componentDidMount() {
        this.props.storePreviousUrl(window.location.pathname + window.location.search);
    };
    handleBackInvoiceList() {
        window.location.href = "/listInvoice";
    }

    getListDrugGroups() {
        let setStateInRequestEmployee = (listDrugGroups) => { this.setState({ listAllGroups: listDrugGroups }) }
        return agent.GroupApi.listAllGroup().then(function (res) {
            var result = res.resultData;
            if (result) {
                setStateInRequestEmployee(result);
            }
            else {
                toast.error("Có lỗi khi load dữ liệu. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi load dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    }
    
    addOrUpdateDrugGroupOfInvoice() {
        const { idOfGroup, numberOfGroup } = this.props;
        if (!idOfGroup || !numberOfGroup) {
            return; // no action if id is not set
        }
        var _this = this;
        let setStateInRequestEmployee = (drugGroupItem) => { this.setState({ drugGroupItem: drugGroupItem }) }
        var prescriptionId = this.props.match.params.id;
        return agent.GroupApi.addOrUpdateGroupOfInvoice(prescriptionId, idOfGroup, numberOfGroup).then(function (res) {
            var result = res.resultData;
            if (result) {
                setStateInRequestEmployee(result);
                // reload screen
                _this.handleShowPrice();
                _this.reloadPage();
            }
            else {
                toast.error("Có lỗi khi load dữ liệu. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi load dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    }



    render() {
        const { handleSubmit, submitting, title, updateField, invalid, patientIdSelector, backToList, hospitalId, hospitalIdSelector,
            doctorId, currentUser, insuranceTypeIdSelector } = this.props;
        const modalConfig = {
            backdrop: 'static', show: this.props.show, bsSize: "sm",
            onHide: this.props.onHide,
            submitting: this.props.submitting,
            idPrescription: this.props.idPrescription
        };
        var dataPrescription = this.state.listPrescription;
        var patient = dataPrescription && dataPrescription.patient ? dataPrescription.patient : null;
        var currentPrescription = null;
        if (this.state.currentPrescription) {
            currentPrescription = this.state.currentPrescription;
        } else {
            currentPrescription = this.props.initialValues;
        }

        var dataDrugGroups = this.state.listAllGroups;
        var optionDrugGroups = [];
        dataDrugGroups.map(item => {
            optionDrugGroups.push({ label: item.barCode + " - " + item.name, value: item.id })
        });

        var totalPrice = this.state.totalPrice;
        var newModal = null;
        newModal =
            <div className="content-wrapper">
                <div className="page-header page-header-default">
                    <div className="breadcrumb-line">
                        <ul className="breadcrumb">
                            <li><a href=""><i className="icon-home2 position-left"></i> Home</a> </li>
                            <li className="active">Đơn Thuốc Bán Lẻ</li>
                        </ul>
                        <div className="heading-elements">
                            <div className="heading-btn-group">
                                <button className="btn bg-teal" onClick={() => this.handleBackInvoiceList()}>Về Danh Sách Hoá Đơn</button>
                                <button className="btn bg-teal" onClick={() => this.handleAddPatient()}>Chọn bệnh nhân</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="row">
                        <div className="panel panel-flat">
                            <div className="panel-body">
                                <div className="pull-right" style={{ width: '200px', marginRight: "32px", height: '30px' }}>
                                    <div className="bg bg-teal" style={{ height: "50px", lineHeight: "30px", fontSize: "13px", paddingLeft: "10px" }} >
                                        <span>Tổng Tiền: </span>{FormatterUtils.formatCurrency(totalPrice)} VNĐ
                                </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="panel panel-flat">

                                        <div className="panel-body">
                                            <div className="tabbable">

                                                <ul className="nav nav-tabs nav-tabs-solid nav-tabs-component bg-teal" style={{ marginBottom: "0" }}>


                                                    <li className="active">
                                                        <a href="#default-justified-tab1" data-toggle="tab"><i className="icon-menu6"></i> Đơn Thuốc Lẻ</a>
                                                    </li>
                                                    <li style={{ color: "#000000", padding: "10px" }}>{patient ? "Tên Bệnh Nhân : " + patient.fullName : ""}</li>
                                                    <li style={{ color: "#000000", padding: "10px" }}>{patient ? "Số điện thoại : " + patient.phone : ""}</li>
                                                    <li style={{ color: "#000000", padding: "10px" }}>{patient ? "Email : " + patient.email : ""}</li>


                                                </ul>

                                                <div className="tab-content">
                                                    <TabDrugRetail currentUser={currentUser}
                                                        prescriptionId={this.props.match.params.id}
                                                        countReloadTabDrugRetail={this.state.countReloadTabDrugRetail}
                                                        handleShowPrice={() => this.handleShowPrice()}
                                                    >
                                                    </TabDrugRetail>
                                                </div>
                                            </div>


                                            {/* <form className="form-horizontal" role="form" onSubmit={handleSubmit(this.handleAdd)}> */}

                                            <form className="form-horizontal" role="form">
                                                <div className="form-group">
                                                    <div className="col-md-6">
                                                        <Field name="nameOfGroup" label="Tên liều thuốc" options={optionDrugGroups} component={RenderSelect}
                                                            onChangeAction={(value) => this.focusField("numberOfGroup")}>
                                                        </Field>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <Field name="numberOfGroup" autoFocus={"numberOfGroup" == this.state.focusedFieldName} 
                                                            label="Số lượng" placeholder="Chọn số lượng và nhấn Enter"
                                                            component={RenderInputWithDiv}
                                                            onEnterAction={(e) => this.addOrUpdateDrugGroupOfInvoice()}
                                                        ></Field>
                                                    </div>

                                                </div>
                                            </form>

                                            <div className="tabbable">

                                                <ul className="nav nav-tabs nav-tabs-solid nav-tabs-component bg-teal" style={{ marginBottom: "0" }}>
                                                    <li className="active">
                                                        <a href="#default-justified-tab2" data-toggle="tab"><i className="icon-menu6"></i> Thuốc theo liều </a>
                                                    </li>
                                                </ul>
                                                <div className="tab-content">
                                                    <TabDrugGroup currentUser={currentUser}
                                                        handleDoneDrugGroupOfInvoice={this.handleDoneDrugGroupOfInvoice}
                                                        prescriptionId={this.props.match.params.id}
                                                        handleShowPrice={() => this.handleShowPrice()}
                                                        groupId={this.state.drugGroupItem ? this.state.drugGroupItem.id : null}
                                                    >
                                                    </TabDrugGroup>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                {/* {this.state.isPatientModalShown ? <ModalPatientDrugRetail
                    title={this.state.idPatient ? "Chỉnh Sửa Bệnh Nhân" : "Thêm Mới Bệnh Nhân"}

                    show={this.state.isPatientModalShown}
                    onHide={this.handleHidemodalPatient} /> : null} */}
                {this.state.isPatientModalShown ? <ModalSearchpatient
                    title={this.state.idPatient ? "Chỉnh Sửa Bệnh Nhân" : "Thêm Mới Bệnh Nhân"}
                    prescriptionId={this.props.match.params.id}
                    show={this.state.isPatientModalShown}
                    onHide={this.handleHidemodalPatient} /> : null}
            </div >
        return newModal;
    }

    calculateTotalSaleAmount(prescriptionItem) {
        var totalSaleAmount = 0;
        if (prescriptionItem.invoiceItemType == 'DRUG_GROUP') {
            // totalSaleAmount = prescriptionItem.totalAmount * DRUG_GROUP_SALE_PRICE;
            totalSaleAmount = prescriptionItem.totalAmount * prescriptionItem.drug.salePrice;
        }
        else if (prescriptionItem.saleUom == prescriptionItem.drug.packageUom) {
            totalSaleAmount = prescriptionItem.totalAmount * prescriptionItem.drug.packageSalePrice;
        }
        else { // basic uom drug
            totalSaleAmount = prescriptionItem.totalAmount * prescriptionItem.drug.salePrice;
        }
        return totalSaleAmount;
    }
};
export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'DrugRetailList',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(DrugRetailList)));
