import React from "react";
import ReactDOM from "react-dom";
import Script from 'react-load-script';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { push } from 'react-router-redux';
import { toast, ToastContainer } from 'react-toastify';
import { reduxForm } from 'redux-form';
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";
import { APP_LOAD, FIRE_REDIRECT, LOGIN, REDIRECT } from './constants/action-types';
import agent from './services/agent';
import { store } from './store/index';
import AccountCodeList from "./views/AccountCode/AccountCodeList";
import AppointmentList from "./views/Appointment/AppointmentList";
import BHYTList from "./views/BHYT/BHYTList";
import BHYTListReport from "./views/BHYT/BHYTListReport";
import BHYTPageXML1 from "./views/BHYTPageXML1/BHYTPageXML1";
import BHYTPageXML1Edit from "./views/BHYTPageXML1/BHYTPageXML1Edit";
import BHYTPageXML2 from "./views/BHYTPageXML2/BHYTPageXML2";
import BHYTPageXML3 from "./views/BHYTPageXML3/BHYTPageXML3";
import BHYTPageXML4 from "./views/BHYTPageXML4/BHYTPageXML4";
import BHYTPageXML5 from "./views/BHYTPageXML5/BHYTPageXML5";
import BillingList from "./views/Billing/BillingList";
import BookingGroupList from "./views/BookingGroup/BookingGroupList";
import CashDeskList from "./views/CashDesk/CashDeskList";
import CashWidrawalList from "./views/CashWidrawal/CashWidrawalList";
import CompanyList from "./views/Company/CompanyList";
import ConfigDayDrugList from "./views/ConfigDayDrug/ConfigDayDrugList";
import ConfigTableList from "./views/ConfigTable/ConfigTableList";
import ConfigWarningDrugList from "./views/ConfigWarningDrug/ConfigWarningDrugList";
import CouponList from "./views/Coupon/CouponList";
import Dashboard from "./views/Dashboard/Dashboard";
import DashboardNotificationList from "./views/DashboardNotification/DashboardNotificationList";
import DayRevenueList from "./views/DayRevenue/DayRevenueList";
import DoctorRevenueReport from "./views/DayRevenue/DoctorRevenueReport";
import DoctorRevenueReportByDepartment from "./views/DayRevenue/DoctorRevenueReportByDepartment";
import RevenueDashboard from "./views/DayRevenue/RevenueDashboard";
import DepartmentList from "./views/Department/DepartmentList";
import DeviceList from "./views/Device/DeviceList";
import DeviceMaintenanceList from "./views/DeviceMaintenance/DeviceMaintenanceList";
import DiagnosisGroupList from "./views/DiagnosisGroup/DiagnosisGroupList";
import DiagnosisReportList from "./views/DiagnosisReport/DiagnosisReportList";
import DiagnosisServiceList from "./views/DiagnosisService/DiagnosisServiceList";
import DrugList from "./views/Drug/DrugList";
import DrugByStorePage from "./views/drugByStore/DrugByStorePage";
import TabDrugByStore from "./views/drugByStore/TabDrugByStore";
import DrugCabinetList from "./views/DrugCabinet/DrugCabinetList";
import DrugCabinetListAll from "./views/DrugCabinet/DrugCabinetListAll";
import DrugCategoryList from "./views/DrugCategory/DrugCategoryList";
import DrugStoreList from "./views/DrugStore/DrugStoreList";
import GroupList from "./views/Group/GroupList";
import HelpCommentList from "./views/HelpComment/HelpCommentList";
import HelpTicketList from "./views/HelpTicket/HelpTicketList";
import HospitalList from "./views/Hospital/HospitalList";
import IcdList from "./views/Icd/IcdList";
import IcdCategoryList from "./views/IcdCategory/IcdCategoryList";
import InputCabinetForm from "./views/InputCabinetForm/InputCabinetForm";
import InputCabinetFormList from "./views/InputCabinetForm/InputCabinetFormList";
import InputFormAllList from "./views/InputForm/InputFormList";
import InputFormList from "./views/InputStock/InputStockFrom";
import InputStockList from "./views/InputStock/InputStockList";
import InsuranceCardList from "./views/InsuranceCard/InsuranceCardList";
import InsuranceInvoiceList from "./views/InsuranceInvoice/InsuranceInvoiceList";
import InsuranceInvoiceItemList from "./views/InsuranceInvoiceItem/InsuranceInvoiceItemList";
import InsuranceMappingList from "./views/InsuranceMapping/InsuranceMappingList";
import InsuranceTypeList from "./views/InsuranceType/InsuranceTypeList";
import DrugRetailList from "./views/Invoice/DrugRetailList";
// import UserSalaryList from "./views/UserSalary/UserSalaryList";
import InvoiceList from "./views/Invoice/InvoiceList";
import InvoiceItemList from "./views/InvoiceItem/InvoiceItemList";
import JournalList from "./views/Journal/JournalList";
import LedgerList from "./views/Ledger/LedgerList";
import Login from './views/login';
import MaintenancePlanList from "./views/MaintenancePlan/MaintenancePlanList";
import MedicalSuppliesList from "./views/MedicalSupplies/MedicalSuppliesList";
import MedicalSuppliesCategoryList from "./views/MedicalSuppliesCategory/MedicalSuppliesCategoryList";
import MonthRevenueList from "./views/MonthRevenue/MonthRevenueList";
import MoveStoreFormAllList from "./views/MoveStoreForm/MoveStoreFormList";
import MyCashDesk from "./views/MyCashDesk/MyCashDesk";
import MyPrescriptionReview from "./views/MyPrescriptionReview/MyPrescriptionReview";
import NursingList from "./views/Nursing/NursingList";
import OutputFormAllList from "./views/OutputForm/OutputFormList";
import OutputFormList from "./views/OutputStock/OutputStockFrom";
import PackageList from "./views/Package/PackageList";
import PatientList from "./views/Patient/PatientList";
import PaymentList from "./views/Payment/PaymentList";
import PersonelList from "./views/personel/PersonelList";
import RoleEdit from "./views/personel/RoleEdit";
import RoleList from "./views/personel/RoleList";
import UserChangePassword from "./views/personel/UserChangePassword";
import PrescriptionEdit from "./views/Prescription/PrescriptionEdit";
import PrescriptionList from "./views/Prescription/PrescriptionList";
// import PrescriptionDetail from "./views/PrescriptionDetail/PrescriptionDetail";
import PrescriptionFormList from "./views/PrescriptionForm/PrescriptionFormList";
import PrescriptionFormItemList from "./views/PrescriptionFormItem/PrescriptionFormItemList";
import PrescriptionItemList from "./views/PrescriptionItem/PrescriptionItemList";
import PrescriptionReviewList from "./views/PrescriptionReview/PrescriptionReviewList";
import PreTemplateList from "./views/PreTemplate/PreTemplateList";
import PreTemplateFieldList from "./views/PreTemplateField/PreTemplateFieldList";
import PreTemplateItemList from "./views/PreTemplateItem/PreTemplateItemList";
import ProcedureMemberList from "./views/ProcedureMember/ProcedureMemberList";
import ProcedureReportList from "./views/ProcedureReport/ProcedureReportList";
import ProcedureServiceList from "./views/ProcedureService/ProcedureServiceList";
import QueueList from "./views/Queue/QueueList";
import QueueListByDepartment from "./views/Queue/QueueListByDepartment";
import QueueNumberEdit from "./views/Queue/QueueNumberEdit";
import RevenueList from "./views/Revenue/RevenueList";
import ShortCodeList from "./views/ShortCode/ShortCodeList";
import AlertStockList from "./views/Stock/AlertStockList";
import CheckDrugDate from "./views/Stock/CheckDrugDate";
import CheckFollowInput from "./views/Stock/CheckFollowInput";
import CheckFollowOutput from "./views/Stock/CheckFollowOutput";
import CheckStockReport from "./views/Stock/CheckStockReport";
import DamageDrug from "./views/Stock/DamageDrug";
import DrugStoresServiceList from "./views/Stock/DrugStoresServiceList";
import RefunCompany from "./views/Stock/RefunCompany";
import ReportCheckDrugList from "./views/Stock/ReportCheckDrugList";
import StockList from "./views/Stock/StockList";
import SupplierDrugList from "./views/Supplier/SupplierDrugList";
import SupplierList from "./views/Supplier/SupplierList";
import TransferFormList from "./views/TransferForm/TransferFormList";
import TransferHospitalList from "./views/TransferHospital/TransferHospitalList";
import TrialBalanceList from "./views/TrialBalance/TrialBalanceList";
import UomList from "./views/Uom/UomList";
import UserAttendanceList from "./views/UserAttendance/UserAttendanceList";
import UserConfigList from "./views/UserConfig/UserConfigList";
import UserContextList from "./views/UserContext/UserContextList";
import UserSalaryList from "./views/UserSalary/UserSalaryList";
import YearBalanceList from "./views/YearBalance/YearBalanceList";




const mapStateToProps = state => {
    return {
        appLoaded: state.common.appLoaded,
        currentUser: state.common.currentUser,
        redirectTo: state.common.redirectTo
    }};

const mapDispatchToProps = dispatch => ({
    onLoad: (payload, token) =>
    dispatch({ type: APP_LOAD, payload: payload, token: token, skipTracking: true }),
    onRedirect: () =>
        dispatch({ type: REDIRECT }),
    fireRedirect: (url) =>
        dispatch({ type: FIRE_REDIRECT, toUrl: url }),
    loginRememberMe: (refreshToken, isRequiredRedirect) =>
        dispatch({ type: LOGIN, payload: agent.AuthService.loginRememberMe(refreshToken), rememberMe: true, isRequiredRedirect}),

});

class App extends React.Component {
    componentWillReceiveProps(nextProps) {
        if (nextProps.redirectTo) {
            if (nextProps.redirectTo == "/login" || nextProps.redirectTo == "/" || nextProps.redirectTo == "/Dashboard") {
                // Full load the index page using the window.location to ensure scripts are executed
                window.location.href = nextProps.redirectTo;
            } else {
                store.dispatch(push(nextProps.redirectTo));
                this.props.onRedirect();
            }
        }
    }

    componentWillMount() {
        const backendUrl = window.sessionStorage.getItem('backendUrl');
        if (backendUrl) {
            agent.setBackendUrl(backendUrl);
        } else {
            agent.AuthService.initBackendUrl();
        }

        const token = window.sessionStorage.getItem('jwt');
        const expiredTime = window.sessionStorage.getItem('jwtExpiredTime');
        var now = new Date();
        var currentUrl = this.props.location.pathname;
        if (token && now.getTime() < expiredTime) {
            agent.setToken(token);
            this.props.onLoad(agent.AuthService.current(), token);
        } else {
            const refreshToken = window.localStorage.getItem('remember_jwt');
            if (refreshToken) {
                // Only login need to redirect to dashboard page
                var isRequiredRedirect = currentUrl == "/" || currentUrl.indexOf("/login") != -1;
                this.props.loginRememberMe(refreshToken, isRequiredRedirect);
            } else {
                if (currentUrl.indexOf("/login") == -1 &&
                    currentUrl.indexOf("/quen-mat-khau") == -1 &&
                    currentUrl.indexOf("/validateLeave") == -1 &&
                    currentUrl.indexOf("/doi-mat-khau") == -1) {
                    this.props.fireRedirect("/login");
                }
            }
        }
    }

    componentDidUpdate() {
        ReactDOM.render(
            <div>
                <Script url="/assets/js/core/app.js"/>
                <Script url="/assets/js/pages/form_layouts.js"/>
            </div>,
            document.getElementById("addedLibs"));
    }

    render() {
        const {currentUser} = this.props;
        return (
           // <BrowserRouter history={history} basename='/#'>
           // --history-api-fallback is used to make /login working when refresh browser.
                <div>
                    <ToastContainer  autoClose={8000} position={toast.POSITION.TOP_CENTER}/>
                    <TopBar/>
                    <div className="page-container" style={{minHeight:'721px'}}>
                        <div className="page-content">
                            <SideBar/>
                            <Switch>
                                <Route exact path="/" render={() => {
                                    const token = window.sessionStorage.getItem('jwt') ? window.sessionStorage.getItem('jwt') : window.localStorage.getItem('jwt');
                                    if (token) {
                                        return (<Redirect to="/Dashboard" />);
                                    } else {
                                        return (<Redirect to="/login" />)
                                    }
                                    }
                                } />
                                <Route path="/login" component={Login}/>
                                <Route path="/listPersonel" component={PersonelList}/>
                                <Route path="/listRole" component={RoleList}/>
                                <Route path="/editRole/:id" component={RoleEdit}/>
                                <Route path="/UserChangePassword" component={UserChangePassword}/>
                                <Route path="/listIcdCategory" component={IcdCategoryList}/>
                                <Route path="/listDashboardNotification" component={DashboardNotificationList}/>
                                <Route path="/Dashboard" component={Dashboard}/>
                                <Route path="/MyCashDesk" component={MyCashDesk}/>
                                <Route path="/MyPrescriptionReview" component={MyPrescriptionReview}/>
                                <Route path="/listCashDesk" component={CashDeskList}/>
                                <Route path="/listCashWidrawal" component={CashWidrawalList}/>
                                <Route path="/listAppointment" component={AppointmentList}/>
                                <Route path="/listIcd" component={IcdList}/>
                                <Route path="/listPatient" component={PatientList}/>
                                <Route path="/listUom" component={UomList}/>
                                <Route path="/listDrugCategory" component={DrugCategoryList}/>
                                <Route path="/listDrug" component={DrugList}/>
                                <Route path="/listDiagnosisService" component={DiagnosisServiceList}/>
                                <Route path="/listDiagnosisGroup" component={DiagnosisGroupList}/>
                                <Route path="/listShortCode" component={ShortCodeList}/>
                                <Route path="/listTransferHospital" component={TransferHospitalList}/>
                                <Route path="/listUserAttendance" component={UserAttendanceList}/>
                                <Route path="/listUserSalary" component={UserSalaryList}/>
                                <Route path="/listTransferForm" component={TransferFormList}/>
                                <Route path="/listHospital" component={HospitalList}/>
                                <Route path="/listDepartment" component={DepartmentList}/>
                                <Route path="/listDrugStore" component={DrugStoreList}/>
                                <Route path="/listStock" component={StockList}/>
                                <Route path="/listAlertStock" component={AlertStockList}/>
                                <Route path="/listQueue" component={QueueList}/>
                                <Route path="/listPrescription" component={PrescriptionList}/>
                                <Route path="/listInvoice" component={InvoiceList}/>
                                <Route path="/listDiagnosisReport" component={DiagnosisReportList}/>
                                <Route path="/listInsuranceCard" component={InsuranceCardList}/>
                                <Route path="/listInsuranceType" component={InsuranceTypeList}/>
                                <Route path="/listUserConfig" component={UserConfigList}/>
                                <Route path="/listProcedureService" component={ProcedureServiceList}/>
                                <Route path="/listProcedureReport" component={ProcedureReportList}/>
                                <Route path="/listProcedureMember" component={ProcedureMemberList}/>
                                <Route path="/listPayment" component={PaymentList}/>
                                <Route path="/listDayRevenue" component={DayRevenueList}/>
                                <Route path="/doctorRevenueReport" component={DoctorRevenueReport}/>
                                <Route path="/doctorRevenueReportDepartment" component={DoctorRevenueReportByDepartment}/>
                                <Route path="/revenueDashboard" component={RevenueDashboard}/>
                                <Route path="/listMonthRevenue" component={MonthRevenueList}/>
                                <Route path="/listSupplier" component={SupplierList}/>
                                <Route path="/listSupplierDrug" component={SupplierDrugList}/>
                                <Route path="/listDevice" component={DeviceList}/>
                                <Route path="/listDeviceMaintenance" component={DeviceMaintenanceList}/>
                                <Route path="/listMaintenancePlan" component={MaintenancePlanList}/>
                                <Route path="/listCompany" component={CompanyList}/>
                                <Route path="/listBookingGroup" component={BookingGroupList}/>
                                <Route path="/listInvoiceItem" component={InvoiceItemList}/>
                                <Route path="/listPrescriptionItem" component={PrescriptionItemList}/>
                                <Route path="/listInputStock" component={InputStockList}/>
                                <Route path="/listInsuranceInvoice" component={InsuranceInvoiceList}/>
                                <Route path="/listInsuranceInvoiceItem" component={InsuranceInvoiceItemList}/>
                                <Route path="/listInsuranceMapping" component={InsuranceMappingList}/>
                                {/* <Route path="/listUserSalary" component={UserSalaryList}/> */}
                                <Route path="/editPrescription/:id" component={PrescriptionEdit}/>
                                {/* <Route path="/detailPrescription/:id" component={PrescriptionDetail}/> */}
                                <Route path="/listPrescriptionReview" component={PrescriptionReviewList}/>
                                <Route path="/listMedicalSupplies" component={MedicalSuppliesList}/>
                                <Route path="/listMedicalSuppliesCategory" component={MedicalSuppliesCategoryList}/>
                                <Route path="/drugRetail/:id" component={DrugRetailList}/>
                                <Route path="/listRevenue" component={RevenueList}/>
                                <Route path="/listDrugStoresService" component={DrugStoresServiceList}/>
                                <Route path="/listGroup" component={GroupList}/>
                                <Route path="/inputForm/:id" component={InputFormList}/>
                                <Route path="/outputForm/:id" component={OutputFormList}/>
                                <Route path="/listUserContext" component={UserContextList}/>
                                <Route path="/listAllInputForm" component={InputFormAllList}/>
                                <Route path="/listAllOutputForm" component={OutputFormAllList}/>
                                <Route path="/listAllMoveStoreForm" component={MoveStoreFormAllList}/>
                                <Route path="/listHelpTicket" component={HelpTicketList}/>
                                <Route path="/listHelpComment" component={HelpCommentList}/>
                                <Route path="/listAccountCode"  component={AccountCodeList}/>
                                <Route path="/listBilling"      component={BillingList}/>
                                <Route path="/listJournal"      component={JournalList}/>
                                <Route path="/listLedger"       component={LedgerList}/>
                                <Route path="/listTrialBalance" component={TrialBalanceList}/>
                                <Route path="/listYearBalance"  component={YearBalanceList}/>
                                <Route path="/listTrialBalance/:id" component={TrialBalanceList}/>
                                <Route path="/listCoupon/" component={CouponList}/>
                                <Route path="/listPackage/" component={PackageList}/>
                                <Route path="/listByDepartment/" component={QueueListByDepartment}/>
                                <Route path="/listPrescriptionForm/" component={PrescriptionFormList}/>
                                <Route path="/listPrescriptionFormItem/" component={PrescriptionFormItemList}/>
                                <Route path="/listPreTemplate/" component={PreTemplateList}/>
                                <Route path="/listPreTemplateItem/" component={PreTemplateItemList}/>
                                <Route path="/listPreTemplateField/" component={PreTemplateFieldList}/>
                                <Route path="/editQueueNumber/:id" component={QueueNumberEdit}/>
                                <Route path="/listDrugCabinet"      component={DrugCabinetList}/>
                                <Route path="/listAllDrugCabinet"      component={DrugCabinetListAll}/>
                                <Route path="/inputCabinetForm/:id" component={InputCabinetForm}/>
                                <Route path="/listInputCabinetForm" component={InputCabinetFormList}/>
                                <Route path="/listNursing" component={NursingList} />
                                <Route path="/listConfigTable" component={ConfigTableList} />
                                <Route path="/drugByStore" component={DrugByStorePage} />
                                <Route path="/drugByStoreRetail" component={TabDrugByStore} />
                                <Route path="/apiBHYT" component={BHYTList} />
                                <Route path="/apiBHYT-xml1" component={BHYTPageXML1} />
                                <Route path="/apiBHYT-xml1-edit/:id" component={BHYTPageXML1Edit} />
                                <Route path="/apiBHYT-xml2" component={BHYTPageXML2} />
                                <Route path="/apiBHYT-xml3" component={BHYTPageXML3} />
                                <Route path="/apiBHYT-xml4" component={BHYTPageXML4} />
                                <Route path="/apiBHYT-xml5" component={BHYTPageXML5} />
                                <Route path="/configWarningDrug" component={ConfigWarningDrugList} />
                                <Route path="/checkStockReport" component={CheckStockReport} />
                                <Route path="/checkFollowInput" component={CheckFollowInput} />
                                <Route path="/checkFollowOutput" component={CheckFollowOutput} />
                                <Route path="/configDayDrug" component={ConfigDayDrugList} />
                                <Route path="/refunCompany" component={RefunCompany} />
                                <Route path="/damageDrug" component={DamageDrug} />
                                <Route path="/checkDrugDate" component={CheckDrugDate} />
                                <Route path="/listReportBHYT" component={BHYTListReport} />
                                <Route path="/listCheckDrug" component={ReportCheckDrugList} />

                            </Switch>
                        </div>
                    </div>
                </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'MainApp',
    destroyOnUnmount: false
})(App));
