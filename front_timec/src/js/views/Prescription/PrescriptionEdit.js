import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import React from 'react';
import { translate } from 'react-i18next';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import { LoadingScreen } from '../../components/commonWidgets';
import { RenderDatePicker, RenderDatePickerWithTime, RenderHiddenInput, RenderInputWithDiv, RenderNumberInput, RenderSelect, RenderTextAreaShortCode } from '../../components/formInputs';
import { FIRE_REDIRECT, UPDATE_PREVIOUS_URL } from '../../constants/action-types';
import agent from '../../services/agent';
import { SecurityUtils } from '../../utils/javascriptUtils';
import { LOAD_UPDATING_PRESCRIPTION } from './action-types';
import ModalChooseICD from './ModalChooseICD';
import ModalMenuControll from './ModalMenuControll';
import ModalMovingDepartment from './ModalMovingDepartment';
import PrescriptionOld from './PrescriptionOld';
import PrescriptionSummaryEdit from './PrescriptionSummaryEdit';
import { RenderPDFKBCB01x1 } from './RenderPDFKBCB01x1';
import TabDiagnosisReport from './TabDiagnosisReport';
import TabDiagnosisReportBHYT from './TabDiagnosisReportBHYT';
import TabMenuControll from './TabMenuControll';
import TabPrescription from './TabPrescription';
import TabPrescriptionBHYT from './TabPrescriptionBHYT';
import TabPrescriptionOld from './TabPrescriptionOld';
import TabProcedureReport from './TabProcedureReport';
import TabResult from './TabResult';
import TabResultDone from './TabResultDone';
import TabTransferForm from './TabTransferForm';
import TabWaitResult from './TabWaitResult';


const validate = values => {
    const errors = {};
    // if (!values.userId) {
    //     errors.userId =  "Vui lòng chọn Bác Sĩ" 
    // }
    // if (!values.patientId) {
    //     errors.patientId = "Vui lòng chọn Bệnh Nhân"
    // }
    if (!values.departmentId) {
        errors.departmentId = "Vui lòng chọn Chuyên Khoa"
    }
    if (!values.hospitalId) {
        errors.hospitalId = "Vui lòng chọn Phòng Khám"
    }
    // if (!values.icdId) {
    //     errors.icdId =  "Vui lòng chọn Mã Icd" 
    // }
    // if (!values.subIcd) {
    //     errors.subIcd = { id: "Vui lòng chọn Mã Icd phụ" }
    // }
    // if (!values.arriveTime) {
    //     errors.arriveTime = "Vui lòng chọn ngày & giờ!"
    // }
    // if (!values.examineTime) {
    //     errors.examineTime = "Vui lòng chọn ngày & giờ!"
    // }
    // if (!values.finishTime) {
    //     errors.finishTime = "Vui lòng chọn ngày & giờ!"
    // }
    // if (!values.fromDayOff) {
    //     errors.fromDayOff = "Vui lòng chọn Ngày!"
    // }

    return errors;
}
const selector = formValueSelector('PrescriptionEdit');
var today = new Date();

const mapStateToProps = state => {
    var updateValue = {
        ...state.prescriptionReducer.updatingPrescription,
        solution: state.prescriptionReducer.updatingPrescription && state.prescriptionReducer.updatingPrescription.solution ? state.prescriptionReducer.updatingPrescription.solution : "KhongToa",
        insuranceTypeId: state.prescriptionReducer.updatingPrescription && state.prescriptionReducer.updatingPrescription.insuranceTypeId ? state.prescriptionReducer.updatingPrescription.insuranceTypeId : 1,
        // patientId: state.prescriptionReducer.updatingPrescription && state.prescriptionReducer.updatingPrescription.patientId ? state.prescriptionReducer.updatingPrescription.patientId : null,
    };
    return {
        initialValues: updateValue,
        hospitalId: selector(state, "hospitalId"),
        doctorId: selector(state, "userId"),
        hospitalIdSelector: selector(state, "hospitalId"),
        departmentIdSelector: selector(state, "departmentId"),
        patientIdSelector: selector(state, "patient.id"),
        currentUser: state.common.currentUser,
        insuranceTypeIdSelector: selector(state, "insuranceTypeId"),
        analysisSelector: selector(state, "analysis"),
        statusSelector: selector(state, "status"),
        patientCodeSelector: selector(state, "patient.code"),
        XMLTypeSelector: selector(state, "xmlType"),
        icdIdSelector: selector(state, "icdId")

    };
};

const mapDispatchToProps = dispatch => ({
    backToList: () =>
        dispatch({ type: FIRE_REDIRECT, toUrl: "/listPrescription" }),
    goToEdit: (id) =>
        window.location.href = "/editPrescription/" + id,
    storePreviousUrl: (previousUrl) =>
        dispatch({ type: UPDATE_PREVIOUS_URL, previousUrl }),
    loadPrescription: (payload) =>
        dispatch({ type: LOAD_UPDATING_PRESCRIPTION, payload: payload }),

    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "PrescriptionEdit", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});
class PrescriptionEdit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listAllPersonel: [],
            listAllDepartment: [],
            listAllHospital: [],
            listAllIcd: [],
            listAllProcedureService: [],
            isPrescriptionItemShown: false,
            listShortCodes: [],
            isShowButtonNewPrescription: false,
            listTranferForm: [],
            isShowMenuControl: false,
            currentPrescription: null,
            listIncuranceCard: null,
            objectInsuranceCard: null,
            listPrescriptionItem: null,
            listPrescriptionItemOld: null,
            isShowPrescriptionItem: false,
            defauXML: '<?xml version="1.0" encoding="utf-8"?>',
            countCart: 0,
            insuranceTypeState: 1,
            isShowModalChooseICD: false,
            icdType: null,
            isShowModalMovingDepartment: false,
            listAllInvoiceItem: [],
            icdCode: '',
            subIcdCode: '',
            listPrescriptionItem: [],
            bhytPrescription: null,
            listPrescriptionItemBHYT: [],
            listAllProcedureServiceBHYT: [],
        }
        this.handleHidemodal = () => {
            this.setState({
                isPrescriptionItemShown: false,
            });
            // this.UpdatePrescriptionItem();

            this.getListTranferFormByPrescriptionId();

        }
        this.handleHidemodalControl = () => {
            this.setState({
                isShowMenuControl: false,
            });
            // this.UpdatePrescriptionItem();
            // this.getListPrescriptionItemByPrescriptionId();        
            // this.getListTranferFormByPrescriptionId();

        }

        this.handleChangeIcd = (icdId) => {
            var icdString = "";
            var dataListIcd = this.state.listAllIcd;
            for (var i = 0; i < dataListIcd.length; i++) {
                if (dataListIcd[i].id == icdId) {
                    icdString = dataListIcd[i].code + " - " + dataListIcd[i].name;
                    break;
                }
            }

            const { updateField, analysisSelector } = this.props;
            if (analysisSelector) {
                updateField("analysis", analysisSelector + ", " + icdString);
            } else {
                updateField("analysis", icdString);
            }
        }
        this.handleChangeHospital = (hospitalId) => {
            const { updateField, hospitalIdSelector } = this.props;
            if (hospitalId != hospitalIdSelector) {
                updateField("departmentId", null);
            }
        }

        this.onButtonF1 = (e) => {
            // alert("hihi");
            document.getElementById("tab1").click();
        }
        this.onButtonF2 = (e) => {
            // alert("hihi");
            document.getElementById("tab2").click();
            document.getElementsByName("cls").autofocus();
        }
        this.onButtonF3 = (e) => {
            // alert("hihi");
            document.getElementById("tab3").click();
        }
        this.onButtonF4 = (e) => {
            // alert("hihi");
            document.getElementById("tab4").click();
        }

        this.handleHideModalChooseICD = (analysisByModal, id, icdType, icdCodes) => {
            this.setState({
                isShowModalChooseICD: false,
            })
            const { updateField, analysisSelector } = this.props;
            if (analysisByModal && icdCodes) {
                if (analysisSelector) {
                    updateField("analysis", analysisSelector + ", " + analysisByModal);
                } else {
                    updateField("analysis", analysisByModal);
                }

                if (icdType == "ICD") {
                    updateField("icdId", id);
                    this.setState({
                        icdCode: this.state.icdCode + ", " + icdCodes
                    })
                }
                if (icdType == "SUBICD") {
                    updateField("subIcdId", id);
                    this.setState({
                        subIcdCode: this.state.subIcdCode + ", " + icdCodes
                    })
                }
            }

        }

        this.handleHideModalMovingDepartment = () => {
            this.setState({
                isShowModalMovingDepartment: false
            })
        }

        this.getListTranferFormByPrescriptionId = this.getListTranferFormByPrescriptionId.bind(this);
        this.fillDataFromQueueNumberToPresciption = this.fillDataFromQueueNumberToPresciption.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleFinish = this.handleFinish.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.newPrescription = this.newPrescription.bind(this);
        this.handleShowMenuControl = this.handleShowMenuControl.bind(this);
        this.handleSuspendedQueue = this.handleSuspendedQueue.bind(this);
        this.getListInsuranceTypeByPrescription = this.getListInsuranceTypeByPrescription.bind(this);
        this.handleShowPrescriptionItem = this.handleShowPrescriptionItem.bind(this);
        this.getListPrescriptionItemById = this.getListPrescriptionItemById.bind(this);
        this.reOpenPrescription = this.reOpenPrescription.bind(this);
        this.handleExportPdfKBCB = this.handleExportPdfKBCB.bind(this);
        this.handleDowloadXML = this.handleDowloadXML.bind(this);
        this.handleChangeInsuranceType = this.handleChangeInsuranceType.bind(this);
        this.handleDoneUploadXML = this.handleDoneUploadXML.bind(this);
        this.handleCancel = this.handleCancel.bind(this);

    };

    listAllInvoiceItem() {
        var id = this.props.match.params.id;
        let setStateInRequest = (list) => { this.setState({ listAllInvoiceItem: list }) }
        return agent.asyncRequests.post('/invoiceItem/getAllBHYTByPrescriptionId?prescriptionId=' + id
        ).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    }

    reOpenPrescription() {
        const { goToEdit } = this.props;
        var id = this.props.match.params.id;
        var url = '/prescription/reOpenPrescription?id=' + id;

        return agent.asyncRequests.post(url
        ).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                toast.info("Đã Mở Lại Phiếu Khám!", { autoClose: 5000 });
                goToEdit(id);
            } else {
                toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    }

    getListTranferFormByPrescriptionId() {
        var id = this.props.match.params.id;
        if (id != 'new') {
            let setStateInRequest = (list) => { this.setState({ listTranferForm: list }) }
            return agent.asyncRequests.get('/tranferForm/listFindByPrescriptionId?prescriptionId=' + id
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
    }

    getPrescriptionItem() {
        let id = this.props.match.params.id;
        let setStateInRequest = (list) => { this.setState({ listPrescriptionItem: list }) }
        return agent.PrescriptionItemApi.findByPrescriptionId(id
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
    getPrescriptionBHYTItem() {
        let id = this.props.match.params.id;
        let setStateInRequest = (list) => { this.setState({ listPrescriptionItemBHYT: list }) }
        return agent.PrescriptionItemApi.findByPrescriptionBHYTId(id
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
    getlistAllProcedureServiceBHYT() {
        let id = this.props.match.params.id;
        let setStateInRequest = (list) => { this.setState({ listAllProcedureServiceBHYT: list }) }
        return agent.asyncRequests.get('/diagnosisReport/getByPrescriptionBHYTId?prescriptionId=' + id
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

    getPrescriptionBHYT() {
        let id = this.props.match.params.id;
        let setStateInRequest = (list) => { this.setState({ bhytPrescription: list }) }
        return agent.PrescriptionApi.getPrescriptionBHYT(id
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

    handleCancel() {
        if (confirm("Xác Nhận Hủy Phiếu Khám")) {
            let id = this.props.match.params.id;
            return agent.PrescriptionApi.cancelPrescription(id
            ).then(function (res) {
                var result = res.resultData;
                if (result) {
                    toast.success("Hủy Phiếu Thành Công!", { autoClose: 1500 });
                } else {
                    toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                    + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
            });
        }
    }

    getlistAllDoctor() {
        let setStateInRequest = (list) => { this.setState({ listAllPersonel: list }) }
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



    getMyShortCodes() {
        let setStateInRequest = (list) => { this.setState({ listShortCodes: list }) }
        return agent.ShortCodeApi.listMyShortCode(
        ).then(function (res) {
            var result = res.resultData;
            if (result) {
                var list = result.map(item => {
                    return { shortCode: item.shortcode, replaceText: item.replaceText };
                });
                setStateInRequest(list);
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });

    }

    getlistAllProcedureService() {
        let setStateInRequest = (list) => { this.setState({ listAllProcedureService: list }) }
        return agent.ProcedureServiceApi.listAllProcedureService(
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

    getlistAllDepartment() {
        let setStateInRequest = (list) => { this.setState({ listAllDepartment: list }) }
        return agent.DepartmentApi.listAllDepartment(
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
    getlistAllHospital() {
        let setStateInRequest = (list) => { this.setState({ listAllHospital: list }) }
        return agent.HospitalApi.listAllHospital(
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

    getlistAllIcd() {
        let setStateInRequest = (list) => { this.setState({ listAllIcd: list }) }
        return agent.IcdApi.listAllIcd(
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
        const { destroy, backToList } = this.props;
        // onHide();
        destroy();
        backToList()
    }

    handleShowMenuControl() {
        this.setState({
            isShowMenuControl: true
        })
    }
    handleSave(values) {
        const { goToEdit, initialValues } = this.props;
        var id = this.props.match.params.id;
        var url = '/prescription/update';
        var bodyObject = {
            ...initialValues,
            ...values,
            id: id,
            userId: values.userId,
            note: values.note,
            dayBack: values.dayBack,
            diagnosisReport: values.diagnosisReport,
            // patientId: values.patientId,
            departmentId: values.departmentId,
            procedureService: values.procedureService,
            cls: values.cls,
            analysis: values.analysis,
            hospitalId: values.hospitalId,
            drugStoreId: values.drugStoreId,
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
            status: "IN_PROGRESS",
            insuranceTypeId: (values.insuranceTypeId == 0 ? "" : values.insuranceTypeId),
            prescriptionType: values.prescriptionType,
            packageId: values.packageId,
            summary0: values.summary0,
            summary1: values.summary1,
            summary2: values.summary2,
            summary3: values.summary3,
            summary4: values.summary4,
            dayPrescription: values.dayPrescription,
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
        const { updateField, initialValues } = this.props;
        var today = new Date();
        var id = this.props.match.params.id;
        var url = '/prescription/finish';
        var bodyObject = {
            ...initialValues,
            ...values,
            id: id,
            userId: values.userId,
            note: values.note,
            dayBack: values.dayBack,
            diagnosisReport: values.diagnosisReport,
            // patientId: values.patientId,
            departmentId: values.departmentId,
            procedureService: values.procedureService,
            cls: values.cls,
            analysis: values.analysis,
            hospitalId: values.hospitalId,
            drugStoreId: values.drugStoreId,
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
            status: "DONE",
            insuranceTypeId: (values.insuranceTypeId == 0 ? null : values.insuranceTypeId),
            prescriptionType: values.prescriptionType,
            packageId: values.packageId,
            summary1: values.summary1,
            summary2: values.summary2,
            summary3: values.summary3,
            summary4: values.summary4,
            dayPrescription: values.dayPrescription,

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
                window.location.reload(true);
            } else {
                toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    };
    getListInsuranceTypeByPrescription(idPrescription) {
        if (idPrescription != "new") {
            let setStateInRequest = (list) => { this.setState({ listIncuranceCard: list }) }
            return agent.asyncRequests.get("/incuranceCard/listByPatient?idPrescription=" + idPrescription
            ).then(function (res) {
                var result = res.body.resultData;
                if (result) {
                    setStateInRequest(result);
                } else {
                    return
                    // toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                    + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
            });
        }
    }
    handlerAutoClick() {

    }
    componentWillMount() {
        const { loadPrescription } = this.props;
        var id = this.props.match.params.id;
        if (id) {
            const dataPromise = agent.PrescriptionApi.getPrescription(id);
            loadPrescription(Promise.resolve(dataPromise))
        }
        this.getlistAllDoctor();
        this.getlistAllDepartment();
        this.getlistAllHospital();
        this.getlistAllIcd();
        this.getMyShortCodes();
        this.getListTranferFormByPrescriptionId();
        this.getListInsuranceTypeByPrescription(id);
        this.handlerAutoClick();
        this.listAllInvoiceItem();
        this.getPrescriptionItem();
        this.getPrescriptionBHYTItem();
        this.getlistAllProcedureServiceBHYT();
        this.getPrescriptionBHYT();
    }

    // just fill data when have value. in presciption
    fillDataFromQueueNumberToPresciption(presciptionId) {
        // const { loadPrescription , currentUser,updateField} = this.props;
        // const dataPromise =agent.PrescriptionApi.getPrescription(presciptionId);          
        // loadPrescription(Promise.resolve(dataPromise));        
        // this.setState({isShowButtonNewPrescription : false});        
        const { goToEdit } = this.props;
        goToEdit(presciptionId);
    }

    handleShowPrescriptionItem(prescriptionId) {
        let isShowPrescriptionItem = this.state.isShowPrescriptionItem;
        isShowPrescriptionItem = !this.state.isShowPrescriptionItem;
        this.setState({ isShowPrescriptionItem: isShowPrescriptionItem })
        if (isShowPrescriptionItem) {
            this.getListPrescriptionItemById(prescriptionId);
        }
    }

    getListPrescriptionItemById(prescriptionId) {
        let setStateInRequest = (list) => { this.setState({ listPrescriptionItemById: list }) }
        return (agent.asyncRequests.get("/prescriptionItem/listFindByPrescriptionId?prescriptionId=" + prescriptionId).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + res.body.errorMessage, {
                    autoClose: 15000
                });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", {
                autoClose: 15000
            });
        }))
    }

    handleSuspendedQueue() {
        const { currentUser } = this.props;
        return agent.asyncRequests.get('/queue/suspened?callerId=' + currentUser.id
        ).then(function (res) {
            var result = res.body;
            if (result.resultData) {
                toast.info("Ngưng nhận số thành công!", { autoClose: 3000 });
            } else {
                toast.info(result.errorMessage, { autoClose: 3000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                + " Hoặc liên hệ quản trị viên.", { autoClose: 1500 });
        });

    }

    handleDoneUploadXML() {
        if (confirm("Xác Nhận Hoàn Tất Upload XML?")) {
            var id = this.props.match.params.id;
            return agent.asyncRequests.get('/prescription/doneUploadXML?presciptionId=' + id
            ).then(function (res) {
                var result = res.body.resultData;
                if (result) {
                    alert("Đã Hoàn Tất!");
                    window.location.reload(true);
                } else {
                    toast.info(result.errorMessage, { autoClose: 3000 });
                }
            }, function (err) {
                toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                    + " Hoặc liên hệ quản trị viên.", { autoClose: 1500 });
            });
        }
    }

    componentDidMount() {
        this.props.storePreviousUrl(window.location.pathname + window.location.search);
    };

    newPrescription() {
        const { currentUser } = this.props;
        var today = new Date();
        const fillDataFromQueueNumberToPresciption = this.fillDataFromQueueNumberToPresciption;
        // const dataPromise = agent.PrescriptionApi.getPrescription(id);
        var url = "/prescriptionEdit/createPrescriptionForNext";
        var bodyObject = {
            user: currentUser,
            //    arriveTime : today,
            examineTime: today
        }
        return agent.asyncRequests.post(url, bodyObject).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                fillDataFromQueueNumberToPresciption(result.id);
                // toast.info("Lưu Thành Công.", { autoClose: 1000 });
            } else {
                toast.info('Đã hết "Hàng Đợi Thường"! Vui lòng tạo thêm "Hàng Đợi Thường" hoặc "Ngừng Nhận Bênh Nhân "', { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
        // isShowNewPrescription

    }
    handleExportPdfKBCB() {
        var id = this.props.match.params.id;

        let setStateInRequest = (prescription) => {
            var dataExport = RenderPDFKBCB01x1.getDataExport(prescription, this.props, this.state)
            if (dataExport) {
                pdfMake.vfs = pdfFonts.pdfMake.vfs;
                pdfMake.createPdf(dataExport).download('Biểu 01 KBCB' + '.pdf');
            }
        }
        return (agent.asyncRequests.get("/prescription/" + id).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + res.body.errorMessage, {
                    autoClose: 15000
                });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", {
                autoClose: 15000
            });
        }))

    }

    handleDowloadXML(typeXML) {
        const { XMLTypeSelector, icdIdSelector } = this.props;
        var id = this.props.match.params.id;

        let setStateInRequest = (list) => {
            const fileName = typeXML;
            const json = this.state.defauXML + list;
            const blob = new Blob([json], { type: 'application/json' });
            const href = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = href;
            link.download = fileName + ".xml";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }

        if (!icdIdSelector) {
            toast.info("Vui lòng nhập ICD", {
                autoClose: 3000, position: toast.POSITION.TOP_RIGHT
            });
        } else {
            return (agent.asyncRequests.get("/bhyt/downloadXML/" + typeXML + "?xmlType=" + typeXML + "&prescriptionId=" + id).then(function (res) {
                // return (agent.asyncRequests.get("/bhyt/downloadXML?xmlType=" + XMLTypeSelector + "&prescriptionId=" +id).then(function (res) {
                var result = res.text;
                if (result.length == 0) {
                    toast.warning(typeXML + " Không có dữ liệu!", {
                        autoClose: 3000, position: toast.POSITION.TOP_RIGHT
                    });
                } else if (result.length > 0) {
                    let str1 = result.replace(/&gt;/g, '>');
                    let str2 = str1.replace(/&lt;/g, '<');
                    setStateInRequest(str2);
                } else {
                    toast.info("Có lỗi xảy ra. Không tìm thấy thông tin BHYT!", {
                        autoClose: 3000, position: toast.POSITION.TOP_RIGHT
                    });
                }
            }, function (err) {
                toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", {
                    autoClose: 15000
                });
            }))
        }

    }

    handleChangeInsuranceType(values) {
        this.setState({
            insuranceTypeState: values
        })
    }

    handleShowModalChooseICD(icdType) {
        this.setState({
            isShowModalChooseICD: true,
            icdType: icdType
        })
    }
    handleMovingDepartment() {
        this.setState({
            isShowModalMovingDepartment: true,
        })
    }



    render() {
        const { handleSubmit, submitting, title, updateField, invalid, patientIdSelector, backToList, hospitalId, hospitalIdSelector,
            doctorId, currentUser, insuranceTypeIdSelector, departmentIdSelector, patientCodeSelector, statusSelector, XMLTypeSelector } = this.props;
        const modalConfig = {
            backdrop: 'static', show: this.props.show, bsSize: "sm",
            onHide: this.props.onHide,
            submitting: this.props.submitting,
            idPrescription: this.props.idPrescription
        };
        var objectInsuranceCard = this.state.objectInsuranceCard != null ? this.state.objectInsuranceCard : null;
        var listShortCodes = this.state.listShortCodes;
        const listPrescriptionItemOld = this.state.listPrescriptionItemOld;
        var optionAllProcedureService = [];
        var dataListProcedureService = this.state.listAllProcedureService;
        var dataPrescriptionItem = this.state.listPrescriptionItem;
        var patientId = this.state.patientIdSelector;

        const { insuranceTypeState } = this.state;

        console.log(patientId);
        if (!currentUser) {
            return <LoadingScreen></LoadingScreen>
        } else {

            if (dataListProcedureService) {
                dataListProcedureService.map(item => {
                    optionAllProcedureService.push({ label: item.name, value: item.id });
                })
            }

            var optionAllDoctor = [];
            var dataListDoctor = this.state.listAllPersonel;
            if (dataListDoctor) {
                dataListDoctor.map(item => {
                    if (currentUser.email == item.email) {
                        optionAllDoctor.push({ label: item.fullName, value: item.id });
                        updateField("userId", item.id);
                    }
                })
            }

            var optionAllDepartment = [];
            var dataListDepartment = this.state.listAllDepartment;
            if (dataListDepartment) {
                dataListDepartment.map(item => {
                    if (hospitalIdSelector == item.hospital.id) {
                        optionAllDepartment.push({ label: item.name, value: item.id });
                    }
                })
                dataListDepartment.map(item => {
                    optionAllDepartment.push({ label: item.name, value: item.id });
                })
            }

            var optionAllHospital = [];
            var dataListHospital = this.state.listAllHospital;
            if (dataListHospital) {
                dataListHospital.map(item => {
                    optionAllHospital.push({ label: item.name, value: item.id });
                })
            }
            var optionInsuranceType = []
            var dataInsuranceCard = this.state.listIncuranceCard;
            if (dataInsuranceCard) {
                optionInsuranceType.push({ label: "Dịch vụ", value: 1 });
                dataInsuranceCard.map(item => {
                    optionInsuranceType.push({
                        label: item.insuranceType.name, value: item.insuranceType.id
                    })
                })
            }

            var optionAllIcdCode = [];
            var dataListIcd = this.state.listAllIcd;
            if (dataListIcd) {
                dataListIcd.map(item => {
                    optionAllIcdCode.push({ label: item.code, value: item.id });
                })
            }

            var optionGender = [

                { label: "Nam ", value: "MALE" },
                { label: "Nữ ", value: "FEMALE" },
                { label: "Khác ", value: "OTHER" },
            ]
            var optionTypeXML = [

                { label: "File Hồ Sơ Tổng Hợp ", value: "XML1" },
                { label: "File Chi Tiết Thuốc ", value: "XML2" },
                { label: "File Chi Tiết DVKT ", value: "XML3" },
                { label: "File Cận Lâm Sàng ", value: "XML4" },
                { label: "File Chi Tiết Diễn Biến ", value: "XML5" },
            ]

            var optionsolution = [
                { label: "Cấp Toa Cho Về ", value: "CapToa" },
                { label: "Điều Trị Ngoại Trú ", value: "DieuTriNgoaiTru" },
                { label: "Cấp Toa và Hẹn Tái Khám ", value: "CapToaHenTaiKham" },
                { label: "Chuyển Viện ", value: "ChuyenVien" },
                { label: "Cho Thực Hiện CLS ", value: "Khac" },
                { label: "Không Toa ", value: "KhongToa" }
            ]

            var currentPrescription = null;
            if (this.state.currentPrescription) {
                currentPrescription = this.state.currentPrescription;
            } else {
                currentPrescription = this.props.initialValues;
            }

        }
        if (listPrescriptionItemOld) {
            if (listPrescriptionItemOld.content) {
                var rowOld = listPrescriptionItemOld.content.map(item => {
                    return <PrescriptionOld prescriptionObject={item} key={"prescription_" + item.id}
                    // prescriptionId ={this.props.presciptionId}
                    // handleSumNumberDrugChoose = { (number ) => this.handleSumNumberDrugChoose(number)}
                    ></PrescriptionOld>
                })
            }
        }

        var newModal = null;
        newModal =
            <div className="content-wrapper">

                <div className="content">
                    <div className="row">
                        <div className="panel panel-flat">
                            <div className="panel-body">
                                {submitting ? <LoadingScreen /> :
                                    <div className="row">

                                        <div className="tabbable" id="clickAll">
                                            <KeyboardEventHandler handleKeys={['f1']} handleFocusableElements onKeyEvent={(e) => this.onButtonF1(e)} />
                                            <KeyboardEventHandler handleKeys={['f2']} handleFocusableElements onKeyEvent={(e) => this.onButtonF2(e)} />
                                            <KeyboardEventHandler handleKeys={['f3']} handleFocusableElements onKeyEvent={(e) => this.onButtonF3(e)} />
                                            <KeyboardEventHandler handleKeys={['f4']} handleFocusableElements onKeyEvent={(e) => this.onButtonF4(e)} />

                                            <ul className="nav nav-tabs nav-tabs-solid nav-tabs-component bg-teal" style={{ marginBottom: "0" }}>
                                                <li >
                                                    <a href="#default-justified-tab1" id="tab1" data-toggle="tab" ><i className="icon-menu6"></i> Hàng đợi khám </a>
                                                </li>
                                                <li className="active">

                                                    <a href="#default-justified-tab2" id="tab2" data-toggle="tab" ><i className="icon-aid-kit"></i> Khám bệnh</a>

                                                </li>
                                                <li>
                                                    <a href="#default-justified-tab3" data-toggle="tab" id="tab3"  ><i className="icon-clipboard3"></i> Chỉ định CLS</a>
                                                </li>
                                                <li>
                                                    <a href="#default-justified-tab4" data-toggle="tab" id="tab4"><i className="icon-car2"></i> Chuyển tuyến</a>
                                                </li>
                                                {currentPrescription && currentPrescription.packageId ?
                                                    <li>
                                                        <a href="#default-justified-tab5" data-toggle="tab" id="tab5"><i className="icon-city"></i> Kết quả Khám Tổng Quát</a>
                                                    </li> : null
                                                }

                                                {patientIdSelector ?
                                                    <li>
                                                        <a href="#default-justified-tab6" data-toggle="tab" id="tab5"><i className="icon-folder-open2"></i> Bệnh Sử - Toa Cũ</a>
                                                    </li> : null
                                                }

                                                {(statusSelector == 'DONE' || statusSelector == 'CANCELLED') && SecurityUtils.hasPermission(currentUser, 'admin.prescription.reopen') ?
                                                    <li className="pull-right">
                                                        <button type="button" className="btn btn-default" onClick={() => this.reOpenPrescription()}> Mở Lại Phiếu Khám</button>
                                                    </li> : null}
                                                <div className="pull-right">
                                                    {insuranceTypeIdSelector > 1 && currentPrescription.status == "DONE" && !currentPrescription.hasUploadedXML ?
                                                        <button className="btn btn-success" onClick={() => this.handleDoneUploadXML()}>Hoàn Tất Upload XML</button> : <button className="btn btn-info" >Đã Upload XML</button>}
                                                    {insuranceTypeIdSelector > 1 && currentPrescription.status == "DONE" ?
                                                        <button className="btn btn-success" onClick={() => this.handleExportPdfKBCB()}>In Biểu 01-KBCB</button> : null}
                                                    <button className="btn btn-success" onClick={() => this.handleMovingDepartment()}> <i className="icon-enter"></i> Chuyển Chuyên Khoa</button>
                                                </div>

                                                {insuranceTypeIdSelector > 1 && currentPrescription.status == "DONE" ? <div className="col-md-12 text-right" style={{margin : '5px'}} >
                                                    <button style={{}} className="btn btn-success" onClick={() => this.handleDowloadXML('XML1')}>XML1 Tổng Hợp</button>
                                                    {this.state.listPrescriptionItemBHYT.length > 0 ?
                                                        <button style={{}} className="btn btn-success" onClick={() => this.handleDowloadXML('XML2')}>XML2 Thuốc</button>
                                                        : <button style={{}} className="btn btn-secondary" onClick={() => this.handleDowloadXML('XML2')}>XML2 Thuốc</button>}

                                                    <button style={{}} className="btn btn-success" onClick={() => this.handleDowloadXML('XML3')}>XML3 DVKT</button>
                                                    {this.state.listAllProcedureServiceBHYT.length > 0 ?
                                                        <button style={{}} className="btn btn-success" onClick={() => this.handleDowloadXML('XML4')}>XML4 CLS</button>
                                                        : <button style={{}} className="btn btn-secondary" onClick={() => this.handleDowloadXML('XML4')}>XML4 CLS</button>}
                                                    <button style={{}} className="btn btn-success" onClick={() => this.handleDowloadXML('XML5')}>XML5 Diễn Biến</button>
                                                </div> : null}

                                            </ul>
                                            <div className="tab-content">
                                                <div className="tab-pane" id="default-justified-tab1">
                                                    <div className="row" style={{ padding: "20px 0 0 10px" }} >
                                                        <a type="button" className="btn bg-success" onClick={() => this.newPrescription()}><i className="icon-enter"></i> Mời Bệnh Nhân</a>
                                                        <a className="btn bg-success" onClick={this.handleShowMenuControl}><i className="glyphicon glyphicon-list-alt"></i>Xem Hàng Đợi</a>
                                                        <a className="btn bg-success" onClick={this.handleSuspendedQueue}><i className="icon icon-stop"></i>Ngừng Nhận Bênh Nhân</a>
                                                    </div>
                                                    <div className="tabbable" style={{ paddingTop: "20px" }}>
                                                        <ul className="nav nav-tabs nav-tabs-solid nav-tabs-component" style={{ display: "flex", marginBottom: "0" }}>
                                                            <li className="active" style={{ flexGrow: "1" }}>
                                                                <a href="#default-justified-tab11" data-toggle="tab"> STT </a>
                                                            </li>
                                                            <li style={{ flexGrow: "1" }}>
                                                                <a href="#default-justified-tab12" data-toggle="tab"> Đang Xử Lý</a>
                                                            </li>
                                                            {/* <li style={{ flexGrow: "1" }}>
                                                                <a href="#default-justified-tab13" data-toggle="tab"> Có Kết Quả</a>
                                                            </li> */}
                                                            <li style={{ flexGrow: "1" }}>
                                                                <a href="#default-justified-tab14" data-toggle="tab"> Hoàn Tất</a>
                                                            </li>
                                                        </ul>
                                                        <div className="tab-content">
                                                            {patientIdSelector || currentUser ?
                                                                [<TabMenuControll
                                                                    currentUser={currentUser}
                                                                    fillDataFromQueueNumberToPresciption={(id) => this.fillDataFromQueueNumberToPresciption(id)}
                                                                ></TabMenuControll>,

                                                                <TabWaitResult currentUser={currentUser}
                                                                    patientIdSelector={patientIdSelector}
                                                                // fillDataFromQueueNumberToPresciption ={(id) => this.fillDataFromQueueNumberToPresciption(id)}
                                                                ></TabWaitResult>,

                                                                <TabResult currentUser={currentUser}
                                                                    fillDataFromQueueNumberToPresciption={(id) => this.fillDataFromQueueNumberToPresciption(id)}
                                                                ></TabResult>
                                                                    ,
                                                                <TabResultDone currentUser={currentUser}
                                                                    fillDataFromQueueNumberToPresciption={(id) => this.fillDataFromQueueNumberToPresciption(id)}>

                                                                </TabResultDone>
                                                                ] : <LoadingScreen />}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="tab-pane active" id="default-justified-tab2" >
                                                    <div className="col col-md-12" style={{ paddingTop: "20px" }}>
                                                        {/* <legend class="text-semibold"><i class="icon-reading position-left"></i> Thông Tin Khám Bệnh</legend> */}
                                                        <form id="save-prescription" role="form" onSubmit={handleSubmit(this.handleSave)}>
                                                            <div className="row">

                                                                <div className="col-md-12">
                                                                    <div className="col-md-2">
                                                                        <Field disabled={true} name="hospitalId" label="Phòng Khám" options={optionAllHospital} onChangeAction={(value) => { this.handleChangeHospital(value) }} component={RenderSelect}></Field>
                                                                    </div>

                                                                    <Field disabled={true} name="drugStoreId" label="Kho thuốc" component={RenderHiddenInput}></Field>

                                                                    <div className="col-md-2">
                                                                        <Field disabled={true} name="departmentId" label="Chuyên Khoa" options={optionAllDepartment} component={RenderSelect}></Field>
                                                                    </div>
                                                                    <div className="col-md-2">
                                                                        <Field disabled={true} name="userId" label="Bác Sĩ Khám" options={optionAllDoctor} component={RenderSelect}></Field>
                                                                    </div>
                                                                    {/* <div className="col-md-2">
                                                                        <Field disabled={true} name="user.fullName" label="Bác Sĩ Khám" component={RenderInputWithDiv}></Field>
                                                                    </div> */}
                                                                    <div className="col-md-2">
                                                                        <Field disabled={true} name="arriveTime" label="Tiếp Nhận Lúc" component={RenderDatePickerWithTime}></Field>
                                                                    </div>
                                                                    <div className="col-md-2">
                                                                        <Field disabled={true} name="examineTime" label="Khám Lúc" component={RenderDatePickerWithTime}></Field>
                                                                    </div>
                                                                    <div className="col-md-2">
                                                                        <Field disabled={true} name="finishTime" label="Chỉ Định Lúc" component={RenderDatePickerWithTime}></Field>
                                                                    </div>

                                                                </div>
                                                                <div className="col-md-12">

                                                                    <div className="col-md-2">
                                                                        <Field disabled={true} className="form-control-plaintext" name="patient.fullName" label="Họ Và Tên" component={RenderInputWithDiv} ></Field>
                                                                    </div>
                                                                    <div className="col-md-2">
                                                                        <Field disabled={true} name="patient.gender" label="Giới Tính " options={optionGender} component={RenderSelect}></Field>
                                                                    </div>
                                                                    <div className="col-md-2">
                                                                        <Field disabled={true} name="patient.birthday" label="Ngày Sinh" component={RenderDatePicker} ></Field>
                                                                    </div>
                                                                    <div className="col-md-1">
                                                                        <Field name="mach" label="Mạch" className="" placeholder="Nhập số lần mạch đập..." component={RenderInputWithDiv}></Field>
                                                                    </div>
                                                                    <div className="col-md-1">
                                                                        <Field name="nhietDo" label="Nhiệt Độ" placeholder="Nhập nhiệt độ (°C)..." component={RenderInputWithDiv}></Field>
                                                                    </div>
                                                                    <div className="col-md-1">
                                                                        <Field name="nhipTho" label="Nhịp Thở" placeholder="Nhập số lần nhịp thở..." component={RenderInputWithDiv}></Field>
                                                                    </div>
                                                                    <div className="col-md-1">
                                                                        <Field name="huyetAp" label="Huyết Áp" placeholder="Nhập huyết áp (mmHg)..." component={RenderInputWithDiv}></Field>
                                                                    </div>
                                                                    <div className="col-md-1">
                                                                        <Field name="height" label="Chiều Cao" placeholder="Nhập chiều cao (cm)..." component={RenderInputWithDiv}></Field>
                                                                    </div>
                                                                    <div className="col-md-1">
                                                                        <Field name="weight" label="Cân Nặng" placeholder="Nhập cân nặng (kg)..." component={RenderInputWithDiv}></Field>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-12">
                                                                    <div className="col-md-3">
                                                                        <Field name="cls" autofocus="true" rows="5" label="Triệu Chứng" placeholder="Có thể dùng gõ tắt..."
                                                                            listShortCodes={listShortCodes} component={RenderTextAreaShortCode}></Field>
                                                                    </div>
                                                                    <div className="col-md-2">
                                                                        {/* countAccents = true (not ignore Accents) to improve performance for big list */}
                                                                        <div>
                                                                            <div className="col-md-10">
                                                                                <Field name="icdId" label="Mã ICD" options={optionAllIcdCode} onChangeAction={(value) => { this.handleChangeIcd(value) }} component={RenderSelect} countAccents={true}></Field>
                                                                            </div>
                                                                            <div className="col-md-2" style={{ marginTop: 30 }}>
                                                                                <button type="button" style={{ left: -20 }} className="btn btn-default" onClick={() => this.handleShowModalChooseICD("ICD")} ><i className="icon-search4"></i></button>
                                                                            </div>
                                                                        </div>
                                                                        <div>
                                                                            <div className="col-md-10">
                                                                                <Field name="subIcdId" label="Mã ICD Phụ" options={optionAllIcdCode} onChangeAction={(value) => { this.handleChangeIcd(value) }} component={RenderSelect} countAccents={true}></Field>
                                                                            </div>
                                                                            <div className="col-md-2" style={{ marginTop: 30 }}>
                                                                                <button type="button" style={{ left: -20 }} className="btn btn-default" onClick={() => this.handleShowModalChooseICD("SUBICD")} ><i className="icon-search4"></i></button>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="col-md-4">
                                                                        <Field name="analysis" rows="5" label="Chẩn Đoán" placeholder="Có thể dùng gõ tắt..."
                                                                            listShortCodes={listShortCodes} component={RenderTextAreaShortCode}></Field>

                                                                    </div>
                                                                    <div className="col-md-3">
                                                                        <Field name="note" rows="5" label="Lời Dặn" placeholder="Có thể dùng gõ tắt..."
                                                                            listShortCodes={listShortCodes} component={RenderTextAreaShortCode}></Field>

                                                                    </div>
                                                                </div>
                                                                <div className="col-md-12">
                                                                    <div className="col-md-1">
                                                                        <Field name="dayPrescription" label="Số Ngày Điều Trị" component={RenderNumberInput}></Field>
                                                                    </div>
                                                                    <div className="col-md-2">
                                                                        <Field name="dayBack" label="Ngày Tái Khám" component={RenderDatePicker}></Field>
                                                                    </div>
                                                                    <div className="col-md-2">
                                                                        <Field name="insuranceTypeId" label="Đối Tượng" options={optionInsuranceType} onChangeAction={(values) => this.handleChangeInsuranceType(values)} component={RenderSelect}></Field>
                                                                    </div>
                                                                    <div className="col-md-2">
                                                                        <Field name="solution" options={optionsolution} label="Cách Giải Quyết" component={RenderSelect}></Field>
                                                                    </div>
                                                                    <div className="col-md-2">
                                                                        <Field name="numberDayOff" label="Số Ngày Nghỉ" placeholder="Nhập số ngày nghỉ..." component={RenderNumberInput}></Field>
                                                                    </div>
                                                                    <div className="col-md-3">
                                                                        <Field name="fromDayOff" label="Từ Ngày" component={RenderDatePicker}></Field>
                                                                    </div>
                                                                    <Field disabled={true} name="prescriptionType" label="Hình Thức Khám" component={RenderHiddenInput}></Field>
                                                                    <Field disabled={true} name="packageId" label="Gói khám" component={RenderHiddenInput}></Field>
                                                                    <Field disabled={true} name="summary0" label="Kết luận 0" component={RenderHiddenInput}></Field>
                                                                    <Field disabled={true} name="summary1" label="Kết luận 1" component={RenderHiddenInput}></Field>
                                                                    <Field disabled={true} name="summary2" label="Kết luận 2" component={RenderHiddenInput}></Field>
                                                                    <Field disabled={true} name="summary3" label="Kết luận 3" component={RenderHiddenInput}></Field>
                                                                    <Field disabled={true} name="summary4" label="Kết luận 4" component={RenderHiddenInput}></Field>
                                                                </div>

                                                                {statusSelector != 'DONE' ?
                                                                    <div className="col-md-12">
                                                                        <div className="pull-left">
                                                                            <i>* Bác sĩ nhấn Lưu Tạm để tiếp tục chỉnh sửa trong ngày. Khi nhấn Khám Xong, phiếu khám sẽ hoàn thành, không hỗ trợ sửa.</i>

                                                                        </div>
                                                                        {statusSelector != 'CANCELLED' ?
                                                                            <div className="pull-right">
                                                                                <button type="button" className="btn btn-warning" onClick={handleSubmit(this.handleCancel)}>Hủy Phiếu</button>
                                                                                <button type="button" className="btn btn-default" onClick={handleSubmit(this.handleFinish)}>Khám Xong</button>
                                                                                <button type="submit" className="btn bg-success" form="save-prescription" disabled={submitting}>Lưu Tạm</button>
                                                                            </div> : null}
                                                                    </div>
                                                                    : null}

                                                                {/* {row} */}
                                                            </div>
                                                            {/* <hr /> */}

                                                        </form>
                                                        {!(currentPrescription.insuranceTypeId > 1) ?
                                                            <div className="row" style={{ paddingTop: '10px' }}>
                                                                <div className="col-md-12">
                                                                    {patientIdSelector && departmentIdSelector && currentUser ?
                                                                        [<TabPrescription prescriptionStatus={statusSelector} patientId={patientIdSelector} currentUser={currentUser} prescriptionId={this.props.match.params.id}
                                                                            idPrescription={this.props.match.params.id} currentPrescription={currentPrescription} >
                                                                        </TabPrescription>,
                                                                        ] : <LoadingScreen />}
                                                                </div>

                                                            </div>
                                                            : <div className="row" style={{ paddingTop: '10px' }}>
                                                                <ul className="nav nav-tabs nav-tabs-solid nav-tabs-component" style={{ display: "flex", marginBottom: "0", paddingTop: "30px" }}>
                                                                    <li className="active" style={{ flexGrow: "1" }}>
                                                                        <a href="#default-justified-TabPrescriptionBHYT" id="tab2" data-toggle="tab" ><i className="icon-aid-kit"></i> Thuốc Chỉ Định BHYT</a>
                                                                    </li>
                                                                    <li style={{ flexGrow: "1" }}>
                                                                        <a href="#default-justified-TabPrescription" id="tab1" data-toggle="tab" ><i className="icon-menu6"></i> Thuốc Chỉ Định </a>
                                                                    </li>
                                                                </ul>
                                                                <div className="tab-content">
                                                                    {patientIdSelector && departmentIdSelector && currentUser ?
                                                                        [<TabPrescription prescriptionStatus={statusSelector} patientId={patientIdSelector} currentUser={currentUser} prescriptionId={this.props.match.params.id}
                                                                            idPrescription={this.props.match.params.id} currentPrescription={currentPrescription} >
                                                                        </TabPrescription>,
                                                                        <TabPrescriptionBHYT prescriptionStatus={statusSelector} patientId={patientIdSelector} currentUser={currentUser} prescriptionId={this.props.match.params.id}
                                                                            idPrescription={this.props.match.params.id} currentPrescription={currentPrescription} bhytPrescription={this.state.bhytPrescription} listIncuranceCard={this.state.listIncuranceCard}>
                                                                        </TabPrescriptionBHYT>
                                                                        ] : <LoadingScreen />}
                                                                </div>
                                                            </div>}
                                                    </div>
                                                </div>

                                                <div className="tab-pane" id="default-justified-tab3">

                                                    {!(currentPrescription.insuranceTypeId > 1) ?
                                                        <div className="row" style={{ paddingTop: '10px' }}>
                                                            <div className="col-md-12">
                                                                <TabDiagnosisReport hospitalId={hospitalIdSelector} prescriptionId={this.props.match.params.id}
                                                                    prescriptionStatus={statusSelector}
                                                                    currentUser={currentUser}
                                                                    currentPrescription={currentPrescription} >
                                                                </TabDiagnosisReport>
                                                            </div>
                                                        </div> :
                                                        <div>
                                                            <ul className="nav nav-tabs nav-tabs-solid nav-tabs-component" style={{ display: "flex", marginBottom: "0", paddingTop: "30px" }}>
                                                                <li className="active" style={{ flexGrow: "1" }}>
                                                                    <a href="#default-justified-TabDiagnosisReportBHYT" data-toggle="tab"> Chỉ Định / Dịch Vụ BHYT</a>
                                                                </li>
                                                                <li style={{ flexGrow: "1" }}>
                                                                    <a href="#default-justified-tab21" data-toggle="tab"> Chỉ Định / Dịch Vụ </a>
                                                                </li>
                                                            </ul>
                                                            <div className="tab-content" >
                                                                <TabDiagnosisReport hospitalId={hospitalIdSelector} prescriptionId={this.props.match.params.id}
                                                                    prescriptionStatus={statusSelector}
                                                                    currentUser={currentUser}
                                                                    currentPrescription={currentPrescription} >
                                                                </TabDiagnosisReport>
                                                                <TabDiagnosisReportBHYT hospitalId={hospitalIdSelector} prescriptionId={this.props.match.params.id}
                                                                    prescriptionStatus={statusSelector}
                                                                    currentUser={currentUser}
                                                                    currentPrescription={currentPrescription}
                                                                    bhytPrescription={this.state.bhytPrescription}
                                                                    listIncuranceCard={this.state.listIncuranceCard}>
                                                                </TabDiagnosisReportBHYT>

                                                                {/* <TabProcedureReport patientId={patientIdSelector} prescriptionId={this.props.match.params.id}
                                                                idPrescription={this.props.match.params.id} currentUser={currentUser} currentPrescription={currentPrescription}>
                                                            </TabProcedureReport> */}
                                                            </div>
                                                        </div>}
                                                </div>
                                                <div className="tab-pane" id="default-justified-tab4">
                                                    <TabTransferForm prescriptionId={this.props.match.params.id} dataListTranferFormon={this.state.listTranferForm} ReloadTransferForm={this.getListTranferFormByPrescriptionId} listIncuranceCard={this.state.listIncuranceCard}>
                                                    </TabTransferForm>
                                                </div>
                                                {currentPrescription && currentPrescription.packageId ?
                                                    <div className="tab-pane" id="default-justified-tab5">
                                                        <PrescriptionSummaryEdit prescriptionId={this.props.match.params.id}>
                                                        </PrescriptionSummaryEdit>
                                                    </div> : null
                                                    // TODO: form input Ket Luan
                                                }
                                                {patientIdSelector ?
                                                    <div className="tab-pane" id="default-justified-tab6">
                                                        <TabPrescriptionOld patientId={patientIdSelector} prescriptionId={this.props.match.params.id}></TabPrescriptionOld>
                                                    </div> : null
                                                }

                                            </div>
                                        </div>

                                    </div>}

                                {this.state.isShowModalChooseICD ? <ModalChooseICD
                                    title={this.state.icdType == "ICD" ? "Chọn ICD" : "Chọn ICD Phụ"}
                                    show={this.state.isShowModalChooseICD}
                                    icdType={this.state.icdType}
                                    onHide={this.handleHideModalChooseICD}
                                /> : null}

                                {this.state.isShowModalMovingDepartment ? <ModalMovingDepartment
                                    title={"Chuyển Chuyên Khoa"}
                                    show={this.state.isShowModalMovingDepartment}
                                    icdType={this.state.icdType}
                                    onHide={this.handleHideModalMovingDepartment}
                                    prescriptionId={this.props.match.params.id}
                                    insuranceCard={dataInsuranceCard[0]}

                                /> : null}
                            </div>
                        </div>
                    </div>
                </div>
                {
                    this.state.isShowMenuControl ? <ModalMenuControll
                        title="Hàng Chờ"
                        currentUser={currentUser}
                        show={this.state.isShowMenuControl}
                        onHide={this.handleHidemodalControl}
                        fillDataFromQueueNumberToPresciption={(id) => this.fillDataFromQueueNumberToPresciption(id)}
                    /> : null
                }


            </div >
        return newModal;
    }
};
export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'PrescriptionEdit',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(PrescriptionEdit)));
