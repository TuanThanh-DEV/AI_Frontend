import { combineReducers } from "redux";
import reduceReducers from 'reduce-reducers';
import { reducer as formReducer } from 'redux-form';
import auth from "./auth";
import commonReducer from "./common";
import personelReducer from '../views/personel/reducer';
import icdCategoryReducer from '../views/IcdCategory/reducer';
import icdReducer from '../views/Icd/reducer';
import dashboardNotificationReducer from '../views/DashboardNotification/reducer';
import monthRevenueReducer from '../views/MonthRevenue/reducer';
import cashDeskReducer from '../views/CashDesk/reducer';
import cashWidrawalReducer from '../views/CashWidrawal/reducer';    
import dayRevenueReducer from '../views/DayRevenue/reducer'; 
import dashboardReducer from '../views/Dashboard/reducer';
import myCashDeskReducer from '../views/MyCashDesk/reducer';
import myPrescriptionReview from '../views/MyPrescriptionReview/reducer';
import appointmentReducer from '../views/Appointment/reducer';
import { routerReducer } from 'react-router-redux';
import { LOGOUT } from '../constants/action-types';
import patientReducer from '../views/Patient/reducer';
import uomReducer from '../views/Uom/reducer';
import drugCategoryReducer from '../views/DrugCategory/reducer';
import drugReducer from '../views/Drug/reducer';
import diagnosisServiceReducer from '../views/DiagnosisService/reducer';
import diagnosisGroupReducer from '../views/DiagnosisGroup/reducer';
import shortCodeReducer from '../views/ShortCode/reducer';
import userAttendanceReducer from '../views/UserAttendance/reducer';
import transferHospitalReducer from '../views/TransferHospital/reducer';
import transferFormReducer from '../views/TransferForm/reducer';
import userSalaryReducer from '../views/UserSalary/reducer';
import hospitalReducer from '../views/Hospital/reducer';
import departmentReducer from '../views/Department/reducer';
import drugStoreReducer from '../views/DrugStore/reducer';
import stockReducer from '../views/Stock/reducer';
import diagnosisReportReducer from '../views/DiagnosisReport/reducer';
import queueReducer from '../views/Queue/reducer';
import invoiceReducer from '../views/Invoice/reducer';
import insuranceCardReducer from '../views/InsuranceCard/reducer';
import insuranceTypeReducer from '../views/InsuranceType/reducer';
import userConfigReducer from '../views/UserConfig/reducer';
import procedureServiceReducer from '../views/ProcedureService/reducer';
import procedureReportReducer from '../views/ProcedureReport/reducer';
import procedureMemberReducer from '../views/ProcedureMember/reducer';
import prescriptionReducer from '../views/Prescription/reducer';
import paymentReducer from '../views/Payment/reducer';
import prescriptionItemReducer from '../views/PrescriptionItem/reducer';
import queueNumberReducer from '../views/QueueNumber/reducer';
import patientBookingGroupReducer from '../views/PatientBookingGroup/reducer';
import invoiceItemReducer from '../views/InvoiceItem/reducer';
import deviceReducer from '../views/Device/reducer';
import deviceMaintenanceReducer from '../views/DeviceMaintenance/reducer';
import maintenancePlanReducer from '../views/MaintenancePlan/reducer';
import companyReducer from '../views/Company/reducer';
import supplierReducer from '../views/Supplier/reducer';
import insuranceMappingReducer from '../views/InsuranceMapping/reducer';
import insuranceInvoiceReducer from '../views/InsuranceInvoice/reducer';
import insuranceInvoiceItemReducer from '../views/InsuranceInvoiceItem/reducer';
import bookingGroupReducer from '../views/BookingGroup/reducer';
import prescriptionReviewReducer from '../views/PrescriptionReview/reducer';
import medicalSuppliesReducer from '../views/MedicalSupplies/reducer';
import medicalSuppliesCategoryReducer from '../views/MedicalSuppliesCategory/reducer';
import groupReducer from '../views/Group/reducer';
import inputStockReducer from '../views/InputStock/reducer';
import outputStockReducer from '../views/OutputStock/reducer';
import userContextReducer from '../views/UserContext/reducer';
import inputFormReducer from '../views/InputForm/reducer';
import outputFormReducer from '../views/OutputForm/reducer';
import moveStoreFormReducer from '../views/MoveStoreForm/reducer';
import addSalaryReducer from '../views/AddSalary/reducer';
import minusSalaryReducer from '../views/MinusSalary/reducer';
import helpTicketReducer from '../views/HelpTicket/reducer';
import helpCommentReducer from '../views/HelpComment/reducer';
import accountCodeReducer from '../views/AccountCode/reducer';
import billingReducer from '../views/Billing/reducer';
import journalReducer from '../views/Journal/reducer';
import ledgerReducer from '../views/Ledger/reducer';
import trialBalanceReducer from '../views/TrialBalance/reducer';
import yearBalanceReducer from '../views/YearBalance/reducer';
import packageReducer from '../views/package/reducer';
import packageItemReducer from '../views/packageItem/reducer';
import couponReducer from '../views/coupon/reducer';
import prescriptionFormReducer from '../views/PrescriptionForm/reducer';
import prescriptionFormItemReducer from '../views/PrescriptionFormItem/reducer';
import preTemplateReducer from '../views/PreTemplate/reducer';
import preTemplateItemReducer from '../views/PreTemplateItem/reducer';
import preTemplateFieldReducer from '../views/PreTemplateField/reducer';
import drugCabinetReducer from '../views/DrugCabinet/reducer';
import configTableReducer from '../views/ConfigTable/reducer';
import configWarningDrugReducer from '../views/ConfigWarningDrug/reducer';
import configDayDrugReducer from '../views/ConfigDayDrug/reducer';

const combinedReducer = combineReducers({
    form: formReducer,
    auth,
    common: commonReducer,
    supplierReducer:supplierReducer,
    deviceReducer: deviceReducer,
    companyReducer: companyReducer,
    monthRevenueReducer: monthRevenueReducer,
    patientBookingGroupReducer: patientBookingGroupReducer,
    deviceMaintenanceReducer: deviceMaintenanceReducer,
    maintenancePlanReducer: maintenancePlanReducer,
    personelReducer: personelReducer,
    router: routerReducer,
    bookingGroupReducer: bookingGroupReducer,
    icdCategoryReducer: icdCategoryReducer,
    icdReducer: icdReducer,
    dashboardNotificationReducer: dashboardNotificationReducer,
    dashboardReducer: dashboardReducer,
    outputStockReducer: outputStockReducer,
    inputStockReducer: inputStockReducer,
    myCashDeskReducer: myCashDeskReducer,
    myPrescriptionReview: myPrescriptionReview,
    appointmentReducer: appointmentReducer,
    patientReducer:patientReducer,
    diagnosisGroupReducer:diagnosisGroupReducer,
    uomReducer: uomReducer,
    cashDeskReducer: cashDeskReducer,
    cashWidrawalReducer: cashWidrawalReducer,
    drugCategoryReducer: drugCategoryReducer,
    drugReducer: drugReducer,
    diagnosisServiceReducer:diagnosisServiceReducer,
    diagnosisReportReducer:diagnosisReportReducer,
    shortCodeReducer:shortCodeReducer,
    userAttendanceReducer : userAttendanceReducer,
    transferHospitalReducer: transferHospitalReducer,
    transferFormReducer: transferFormReducer,
    userSalaryReducer : userSalaryReducer,
    hospitalReducer : hospitalReducer,
    departmentReducer : departmentReducer,
    drugStoreReducer : drugStoreReducer,
    queueReducer:queueReducer,
    stockReducer : stockReducer,
    invoiceItemReducer, invoiceItemReducer,
    invoiceReducer: invoiceReducer,
    insuranceCardReducer: insuranceCardReducer,
    insuranceTypeReducer: insuranceTypeReducer,
    userConfigReducer: userConfigReducer,
    procedureServiceReducer: procedureServiceReducer,
    procedureReportReducer: procedureReportReducer,
    procedureMemberReducer: procedureMemberReducer,
    prescriptionReducer:prescriptionReducer,
    dayRevenueReducer:dayRevenueReducer,
    paymentReducer: paymentReducer,
    prescriptionItemReducer: prescriptionItemReducer,
    queueNumberReducer : queueNumberReducer,
    insuranceMappingReducer: insuranceMappingReducer,
    insuranceInvoiceReducer: insuranceInvoiceReducer,
    insuranceInvoiceItemReducer: insuranceInvoiceItemReducer,
    insuranceMappingReducer: insuranceMappingReducer,
    prescriptionReviewReducer: prescriptionReviewReducer,
    medicalSuppliesReducer: medicalSuppliesReducer,
    medicalSuppliesCategoryReducer: medicalSuppliesCategoryReducer,
    groupReducer : groupReducer,
    userContextReducer : userContextReducer,
    inputFormReducer : inputFormReducer,
    outputFormReducer : outputFormReducer,
    moveStoreFormReducer : moveStoreFormReducer,
    addSalaryReducer : addSalaryReducer,
    minusSalaryReducer : minusSalaryReducer,
    helpTicketReducer : helpTicketReducer,
    helpCommentReducer : helpCommentReducer,
    accountCodeReducer: accountCodeReducer,
    billingReducer: billingReducer,
    journalReducer: journalReducer,
    ledgerReducer: ledgerReducer,
    trialBalanceReducer: trialBalanceReducer,
    yearBalanceReducer: yearBalanceReducer,
    packageReducer: packageReducer,
    packageItemReducer: packageItemReducer,
    couponReducer: couponReducer,
    prescriptionFormReducer: prescriptionFormReducer,
    prescriptionFormItemReducer: prescriptionFormItemReducer,
    preTemplateReducer: preTemplateReducer,
    preTemplateItemReducer: preTemplateItemReducer,
    preTemplateFieldReducer: preTemplateFieldReducer,
    drugCabinetReducer: drugCabinetReducer,
    configTableReducer: configTableReducer,
    configWarningDrugReducer: configWarningDrugReducer,
    configDayDrugReducer: configDayDrugReducer,
});

const crossSliceReducer = (state, action) => {
    switch (action.type) {
        case LOGOUT:
            // Modify state if needed. The LOGOUT is handled in each reducer now.
            return state;
        default: return state;
    }
};

const rootReducer = reduceReducers(combinedReducer, crossSliceReducer);

export default rootReducer;
