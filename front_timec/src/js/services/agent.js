import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';
import { CacheService } from './middleware';

const superagent = superagentPromise(_superagent, global.Promise);

let backendUrl = null;

let getBackendUrl = () => {
    return backendUrl;
}

let setBackendUrl = (_backendUrl) => { backendUrl = _backendUrl };

let getApiRoot = () => {
    return backendUrl +  '/api';
}
let getApiToken = () => {
    return backendUrl +  '/oauth/token';
}

const encode = encodeURIComponent;
const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
    if (token) {
        req.set('Authorization', `Bearer ${token}`); // TODO: Check how to set request header
    }
};

const requests = {
    del: url =>
        superagent.del(`${getApiRoot()}${url}`).withCredentials().use(tokenPlugin).then(responseBody),
    get: url =>
        superagent.get(`${getApiRoot()}${url}`).withCredentials().use(tokenPlugin).then(responseBody),
    put: (url, body) =>
        superagent.put(`${getApiRoot()}${url}`, body).withCredentials().use(tokenPlugin).then(responseBody),
    post: (url, body) =>
        superagent.post(`${getApiRoot()}${url}`, body).withCredentials().use(tokenPlugin).then(responseBody),
    getPage: (url, page, size) => {
        if (!size) {
            size = 100;
        }
        if (!page) {
            page = 0;
        } else {
            page = page - 1; // to look url same as pagination
        }
        if (url.indexOf('?') != -1) {
            return superagent.get(`${getApiRoot()}${url}` + '&page=' + encode(page) + '&size=' + encode(size)).withCredentials().use(tokenPlugin)
        } else {
            return superagent.get(`${getApiRoot()}${url}` + '?page=' + encode(page) + '&size=' + encode(size)).withCredentials().use(tokenPlugin)
        }
    }

};

const asyncRequests = {
    del: url =>
        superagent.del(`${getApiRoot()}${url}`).withCredentials().use(tokenPlugin),
    get: url =>
        superagent.get(`${getApiRoot()}${url}`).withCredentials().use(tokenPlugin),
    put: (url, body) =>
        superagent.put(`${getApiRoot()}${url}`, body).withCredentials().use(tokenPlugin),
    post: (url, body) =>
        superagent.post(`${getApiRoot()}${url}`, body).withCredentials().use(tokenPlugin),
    getPage: (url, page, size) => {
            if (!size) {
                size = 100;
            }
            
            if (!page) {
                page = 0;
            } else {
                page = page - 1; // to look url same as pagination
            }
            if (url.indexOf('?') != -1) {
                return superagent.get(`${getApiRoot()}${url}` + '&page=' + encode(page) + '&size=' + encode(size)).withCredentials().use(tokenPlugin)
            } else {
                return superagent.get(`${getApiRoot()}${url}` + '?page=' + encode(page) + '&size=' + encode(size)).withCredentials().use(tokenPlugin)
            }
        }
};

const AuthService = {
    initBackendUrl: () => {
        superagent.get("/assets/config_data.json").then((data) => {
            var backendUrl = data.body.backendUrl;
            window.sessionStorage.setItem("backendUrl", backendUrl);
            setBackendUrl(backendUrl);
        });
    },
    current: () =>
        requests.get('/auth/getCurrentUser'),
    login: (email, password) => {
        return superagent.post(`${getApiToken()}`, `username=${encode(email)}&password=${encode(password)}&grant_type=password`)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', 'Basic ' + btoa("loghisclientid1:TK7umcdNzl1002"))
            .withCredentials().then(responseBody);
    },
    loginRememberMe: (refreshToken) =>
        superagent.post(`${getApiToken()}`, `refresh_token=${encode(refreshToken)}&grant_type=refresh_token`)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', 'Basic ' + btoa("loghisclientid1:TK7umcdNzl1002"))
            .withCredentials().then(responseBody),
};

const UserApi = {
    listPersonel: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/user/list?search=' + encode(search), page, 100);
    },
    listAllPersonel: () => requests.get('/user/listAll'),
    getPersonel: (id) => requests.get('/user/' + id),
    getRole: (id) => requests.get('/role/' + id),
    getAllDoctor : () => requests.get('/user/listAllDoctor')
};
const PatientApi = {
    listPatient: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/patient/list?search=' + encode(search), page, 100);
    },
    listPatientSearchAll: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/patient/listSearchAll?search=' + encode(search), page, 100);
    },
    
    listAllPatient: () => requests.get('/patient/listAll'),
    getPatient: (id) => requests.get('/patient/' + id),
   
};
const QueueApi = {
    listQueue: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/queue/list?search=' + encode(search), page, 100);
    },
    listAllQueue: () => requests.get('/queue/listAll'),
    getQueue: (id) => requests.get('/queue/' + id),
   
};
const DiagnosisReportApi = {
    listDiagnosisReport: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/diagnosisReport/list?search=' + encode(search), page, 100);
    },
    listAllDiagnosisReport: () => requests.get('/diagnosisReport/listAll'),
    getDiagnosisReport: (id) => requests.get('/diagnosisReport/' + id),
   
};
const DiagnosisGroupApi = {
    listDiagnosisGroup: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/diagnosisGroup/list?search=' + encode(search), page, 100);
    },
    listAllDiagnosisGroup: () => requests.get('/diagnosisGroup/listAll'),
    getDiagnosisGroup: (id) => requests.get('/diagnosisGroup/' + id),
   
};

const IcdCategoryApi = {
    listIcdCategory: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/icdCategory/list?search=' + encode(search), page, 100);
    },
    listAllIcdCategory: () => requests.get('/icdCategory/listAll'),
    getIcdCategory: (id) => requests.get('/icdCategory/' + id)
};

const IcdApi = {
    listIcd: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/icd/list?search=' + encode(search), page, 100);
    },
    listAllIcd: () => requests.get('/icd/listAll'),
    getIcd: (id) => requests.get('/icd/' + id)
};

const DashboardNotificationApi = {
    listDashboardNotification: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/dashboardNotification/list?search=' + encode(search), page, 100);
    },
    listAllDashboardNotification: () => requests.get('/dashboardNotification/listAll'),
    getDashboardNotification: (id) => requests.get('/dashboardNotification/' + id)
};

const AppointmentApi = {
    listAppointment: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/appointment/list?search=' + encode(search), page, 100);
    },
    listAllAppointment: () => requests.get('/appointment/listAll'),
    getAppointment: (id) => requests.get('/appointment/' + id)
};

const UomApi = {
    listUom: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/uom/list?search=' + encode(search), page, 100);
    },
    listAllUom: () => requests.get('/uom/listAll'),
    getUom: (id) => requests.get('/uom/' + id),
   
};
const ShortCodeApi = {
    listShortCode: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/shortCode/list?search=' + encode(search), page, 100);
    },
    listAllShortCode: () => requests.get('/shortCode/listAll'),
    listMyShortCode: () => requests.get('/shortCode/listMyShortCode'),
    getShortCode: (id) => requests.get('/shortCode/' + id),
   
};

const DrugCategoryApi = {
    listDrugCategory: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/drugCategory/list?search=' + encode(search), page, 100);
    },
    listAllDrugCategory: () => requests.get('/drugCategory/listAll'),
    getDrugCategory: (id) => requests.get('/drugCategory/' + id),
   
};

const DrugApi = {
    listDrug: (search, supplierId, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/drug/list?search=' + encode(search) + '&supplierId=' + supplierId, page, 100);
    },
    listAllDrug: () => requests.get('/drug/listAll'),
    getDrug: (id) => requests.get('/drug/' + id),
   
};



const DiagnosisServiceApi = {
    listDiagnosisService: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/diagnosisService/list?search=' + encode(search), page, 100);
    },
    listAllDiagnosisService: () => requests.get('/diagnosisService/listAll'),
    listAllDiagnosisServiceBHYT: () => requests.get('/diagnosisService/listBhyt'),
    listBhytDiagnosisService: () => requests.get('/diagnosisService/listBhyt'),
    getDiagnosisService: (id) => requests.get('/diagnosisService/' + id),
   
};

const UserAttendanceApi = {
    listUserAttendancey: (search, page) => {
        if (!search) {
            search = 0;
        }
        return requests.getPage('/userAttendance/list?search=' + encode(search), page, 100);
    },
    listAllUserAttendance: () => requests.get('/userAttendance/listAll'),
    getUserAttendance: (id) => requests.get('/userAttendance/' + id)
};
const TransferHospitalApi = {
    listTransferHospital: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/transferHospital/list?search=' + encode(search), page, 100);
    },
    listAllTransferHospital: () => requests.get('/transferHospital/listAll'),
    getTransferHospital: (id) => requests.get('/transferHospital/' + id),
   
};


const UserSalaryApi = {
    listUserSalary: (search, page) => {
        if (!search) {
            search = 0;
        }
        return requests.getPage('/userSalary/list?search=' + encode(search), page, 100);
    },
    listAllUserSalary: () => requests.get('/userSalary/listAll'),
    getUserSalary: (id) => requests.get('/userSalary/' + id)
};

const TransferFormApi = {
    listTransferForm: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/transferForm/list?search=' + encode(search), page, 100);
    },
    listAllTransferForm: () => requests.get('/transferForm/listAll'),
    getTransferForm: (id) => requests.get('/transferForm/' + id),
   
};
const DepartmentApi = {
    listDepartment: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/department/list?search=' + encode(search), page, 100);
    },
    listAllDepartment: () => requests.get('/department/listAll'),
    getDepartment: (id) => requests.get('/department/' + id),
    getDepartmentByhospital: (id) => requests.get('/department/listAllByHospitalId?hospitalId=' + id),
   
};
const HospitalApi = {
    listHospital: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/hospital/list?search=' + encode(search), page, 100);
    },
    listAllHospital: () => requests.get('/hospital/listAll'),
    getHospital: (id) => requests.get('/hospital/' + id),
   
};

const DrugStoreApi = {
    listDrugStore: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/drugStore/list?search=' + encode(search), page, 100);
    },
    listAllDrugStore: () => requests.get('/drugStore/listAll'),
    getDrugStore: (id) => requests.get('/drugStore/' + id),
    loadOptionsComboBox: (objectClass, loadAll) => {
        let setStateInRequest = (list) => { objectClass.setState({optionDrugStore: list }) }
        return (asyncRequests.get('/drugStore/listAll').then(function (res) {
          var result = res.body.resultData;
          if (result) {
            var optionDrugStore = [];
            if (loadAll) {
                optionDrugStore.push({ label: "Tất Cả Nhà Thuốc", value: "" });
            }
            if (result) {
                result.map(item => {
                    optionDrugStore.push({ label: item.name, value: item.id })
                })
            }
            setStateInRequest(optionDrugStore);
          }
          else {
            toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
          }
        }, function (err) {
          toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        }))
    }
   
};

const StockApi = {
    listStock: (search, drugStoreId, supplierId, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/stock/list?search=' + encode(search) 
        + '&drugStoreId=' + drugStoreId 
        + '&supplierId=' + supplierId, page, 100);
    },
    listAllStock: () => requests.get('/stock/listAllByCurrentDrugStore'),
    listAllStockBHYT: () => requests.get('/stock/getAllStockBHYT'),
    getStock: (id) => requests.get('/stock/' + id),
    getByStoreId: (id) => requests.get('/stock/fingByIdDrugStore?idDrugStore=' + id),
   
};
const CashDeskApi = {
    listCashDesk: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/cashDesk/list?search=' + encode(search), page, 100);
    },
    listAllCashDesk: () => requests.get('/cashDesk/listAll'),
    getCashDesk: (id) => requests.get('/cashDesk/' + id),
   
};
const CashWidrawalApi = {
    listCashWidrawal: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/cashWidrawal/list?search=' + encode(search), page, 100);
    },
    listAllCashWidrawal: () => requests.get('/cashWidrawal/listAll'),
    getCashWidrawal: (id) => requests.get('/cashWidrawal/' + id),
   
};
const PrescriptionApi = {
    listPrescription: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/prescription/list?search=' + encode(search), page, 100);
    },
    listAllPrescription: () => requests.get('/prescription/listAll'),
    findByPatientId: (patientId) => requests.get('/prescription/listFindByPatientId?patientId=' + patientId),
    getPrescription: (id) => requests.get('/prescription/' + id),
    getPrescriptionBHYT: (id) => requests.get('/prescription/getByBhytPrescriptionId?bhytPrescriptionId=' + id),
    cancelPrescription: (id) => requests.get('/prescription/cancel?prescriptionId=' + id),
   
};
const InvoiceApi = {
    listAllInvoice: () => requests.get('/invoice/listAll'),
    getInvoice: (id) => requests.get('/invoice/' + id),
   
};

const InsuranceCardApi = {
    listInsuranceCard: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/insuranceCard/list?search=' + encode(search), page, 100);
    },
    listAllInsuranceCard: () => requests.get('/insuranceCard/listAll'),
    getInsuranceCard: (id) => requests.get('/insuranceCard/' + id),
   
};

const InsuranceTypeApi = {
    listInsuranceType: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/insuranceType/list?search=' + encode(search), page, 100);
    },
    listAllInsuranceType: () => requests.get('/insuranceType/listAll'),
    getInsuranceType: (id) => requests.get('/insuranceType/' + id),
   
};

const UserConfigApi = {
    listUserConfig: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/userConfig/list?search=' + encode(search), page, 100);
    },
    listAllUserConfig: () => requests.get('/userConfig/listAll'),
    getUserConfig: (id) => requests.get('/userConfig/' + id),
   
};
const ProcedureServiceApi = {
    listProcedureService: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/procedureService/list?search=' + encode(search), page, 100);
    },
    listAllProcedureService: () => requests.get('/procedureService/listAll'),
    getProcedureService: (id) => requests.get('/procedureService/' + id),
   
};

const ProcedureReportApi = {
    listProcedureReport: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/procedureReport/list?search=' + encode(search), page, 100);
    },
    listAllProcedureReport: () => requests.get('/procedureReport/listAll'),
    getProcedureReport: (id) => requests.get('/procedureReport/' + id),
   
};
const ProcedureMemberApi = {
    listProcedureMember: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/procedureMember/list?search=' + encode(search), page, 100);
    },
    listAllProcedureMember: () => requests.get('/procedureMember/listAll'),
    getProcedureMember: (id) => requests.get('/procedureMember/' + id),
   
};
const PaymentApi = {
    listPayment: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/payment/list?search=' + encode(search), page, 100);
    },
    listAllPayment: () => requests.get('/payment/listAll'),
    getPayment: (id) => requests.get('/payment/' + id),
   
};
const PrescriptionItemApi = {
    listPrescriptionItem: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/prescriptionItem/list?search=' + encode(search), page, 100);
    },
    findByPrescriptionId: (prescriptionId) => requests.get('/prescriptionItem/listFindByPrescriptionId?prescriptionId='+prescriptionId),
    findByPrescriptionBHYTId: (prescriptionBHYTId) => requests.get('/prescriptionItem/getBHYTByPrescriptionId?prescriptionBHYTId='+prescriptionBHYTId),

    getPrescriptionItem: (id) => requests.get('/prescriptionItem/' + id),}
const InvoiceItemApi = {
    listInvoiceItem: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/invoiceItem/list?search=' + encode(search), page, 100);
    },
    getInvoiceItem: (id) => requests.get('/invoiceItem/' + id),
   
};

const InputStockApi = {
    listInputStock: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/inputStock/list?search=' + encode(search), page, 100);
    },
    listAllInputStock: () => requests.get('/inputStock/listAll'),
    getInputStock: (id) => requests.get('/inputStock/' + id),
   
};

const OutputStockApi = {
    listOutputStock: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/outputStock/list?search=' + encode(search), page, 100);
    },
    listAllOutputStock: () => requests.get('/outputStock/listAll'),
    getOutputStock: (id) => requests.get('/outputStock/' + id),
   
};

const InsuranceInvoiceApi = {
    listInsuranceInvoice: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/insuranceInvoice/list?search=' + encode(search), page, 100);
    },
    listAllInsuranceInvoice: () => requests.get('/insuranceInvoice/listAll'),
    getInsuranceInvoice: (id) => requests.get('/insuranceInvoice/' + id),
   
};



const QueueNumberApi = {
    listAllQueueNumber: () => requests.get('/queueNumber/listAll'),
    getQueueNumber: (id) => requests.get('/queueNumber/' + id),
   
};
const PatientBookingGroupApi = {
    listAllPatientBookingGroup: () => requests.get('/patientBookingGroup/listAll'),
    getPatientBookingGroup: (id) => requests.get('/patientBookingGroup/' + id),
   
};
const SupplierApi = {
    listSupplier: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/supplier/list?search=' + encode(search), page, 100);
    },
    listAllSupplier: () => requests.get('/supplier/listAll'),
    getSupplier: (id) => requests.get('/supplier/' + id),
    loadOptionsComboBox: (objectClass) => {
        let setStateInRequest = (list) => { objectClass.setState({optionSupplier: list }) }
        return (asyncRequests.get('/supplier/listAll').then(function (res) {
          var result = res.body.resultData;
          if (result) {
            var optionSupplier = [{ label: "Tất Cả Nhà Cung Cấp", value: "" }];
            if (result) {
                result.map(item => {
                    optionSupplier.push({ label: item.name, value: item.id })
                })
            }
            setStateInRequest(optionSupplier);
          }
          else {
            toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
          }
        }, function (err) {
          toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        }))
    }
   
};
const DeviceApi = {
    listDevice: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/device/list?search=' + encode(search), page, 100);
    },
    listAllDevice: () => requests.get('/device/listAll'),
    getDevice: (id) => requests.get('/device/' + id),
   
};

const DeviceMaintenanceApi = {
    listDeviceMaintenance: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/deviceMaintenance/list?search=' + encode(search), page, 100);
    },
    listAllDeviceMaintenance: () => requests.get('/deviceMaintenance/listAll'),
    getDeviceMaintenance: (id) => requests.get('/deviceMaintenance/' + id),
   
};

const MaintenancePlanApi = {
    listMaintenancePlan: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/maintenancePlan/list?search=' + encode(search), page, 100);
    },
    listAllMaintenancePlan: () => requests.get('/maintenancePlan/listAll'),
    getMaintenancePlan: (id) => requests.get('/maintenancePlan/' + id),
   
};

const InsuranceInvoiceItemApi = {
    listInsuranceInvoiceItem: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/insuranceInvoiceItem/list?search=' + encode(search), page, 100);
    },
    listAllInsuranceInvoiceItem: () => requests.get('/insuranceInvoiceItem/listAll'),
    getInsuranceInvoiceItem: (id) => requests.get('/insuranceInvoiceItem/' + id),
   
};

const InsuranceMappingApi = {
    listInsuranceMapping: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/insuranceMapping/list?search=' + encode(search), page, 100);
    },
    listAllInsuranceMapping: () => requests.get('/insuranceMapping/listAll'),
    getInsuranceMapping: (id) => requests.get('/insuranceMapping/' + id),
   
};

const InsuranceCompanyApi = {
    listInsuranceCompanyItem: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/insuranceCompany/list?search=' + encode(search), page, 100);
    },
    listAllInsuranceCompany: () => requests.get('/insuranceCompany/listAll'),
    getInsuranceCompany: (id) => requests.get('/insuranceCompany/' + id),
   
};

const CompanyApi = {
    listCompany: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/company/list?search=' + encode(search), page, 100);
    },
    listAllCompany: () => requests.get('/company/listAll'),
    getCompany: (id) => requests.get('/company/' + id),
   
};

const BookingGroupApi = {
    listBookingGroup: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/bookingGroup/list?search=' + encode(search), page, 100);
    },
    listAllBookingGroup: () => requests.get('/bookingGroup/listAll'),
    getBookingGroup: (id) => requests.get('/bookingGroup/' + id),
   
};

const PrescriptionReviewApi = {
    listPrescriptionReview: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/prescriptionReview/list?search=' + encode(search), page, 100);
    },
    listAllPrescriptionReview: () => requests.get('/prescriptionReview/listAll'),
    getPrescriptionReview: (id) => requests.get('/prescriptionReview/' + id),
   
};
const MedicalSuppliesApi = {
    listMedicalSupplies: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/medicalSupplies/list?search=' + encode(search), page, 100);
    },
    listAllMedicalSupplies: () => requests.get('/medicalSupplies/listAll'),
    getMedicalSupplies: (id) => requests.get('/medicalSupplies/' + id),
   
};
const MedicalSuppliesCategoryApi = {
    listMedicalSuppliesCategory: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/medicalSuppliesCategory/list?search=' + encode(search), page, 100);
    },
    listAllMedicalSuppliesCategory: () => requests.get('/medicalSuppliesCategory/listAll'),
    getMedicalSuppliesCategory: (id) => requests.get('/medicalSuppliesCategory/' + id),
   
};
const GroupApi = {
    listGroup: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/group/list?search=' + encode(search), page, 100);
    },
    listAllGroup: () => requests.get('/group/listAll'),
    addOrUpdateGroupOfInvoice: (prescriptionId, groupId, numberOfGroup) => requests.get('/group/addOrUpdateGroupOfInvoice?prescriptionId=' + 
    prescriptionId + '&groupId=' + groupId + '&numberOfGroup=' + numberOfGroup),
    getGroup: (id) => requests.get('/group/' + id),
   
};
const UserContextApi = {
    listUserContext: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/userContext/list?search=' + encode(search), page, 100);
    },
    listAllUserContext: () => requests.get('/userContext/listAll'),
    getUserContext: (id) => requests.get('/userContext/' + id),
   
};

const InputFormApi = {
    listInputForm: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/inputForm/list?search=' + encode(search), page, 100);
    },
    listAllInputForm: () => requests.get('/inputForm/listAll'),
    getInputForm: (id) => requests.get('/inputForm/getId?id='+id), // TODO: change to template
   
};
const OutputFormApi = {
    listOutputForm: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/outputForm/list?search=' + encode(search), page, 100);
    },
    listAllOutputForm: () => requests.get('/outputForm/listAll'),
    getOutputForm: (id) => requests.get('/outputForm/' + id),
   
};

const AddSalaryApi = {
    listAddSalary: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/addSalary/list?search=' + encode(search), page, 100);
    },
    listAllAddSalary: () => requests.get('/addSalary/listAll'),
    getAddSalary: (id) => requests.get('/addSalary/' + id),
   
};

const MinusSalaryApi = {
    listMinusSalary: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/minusSalary/list?search=' + encode(search), page, 100);
    },
    listAllMinusSalary: () => requests.get('/minusSalary/listAll'),
    getMinusSalary: (id) => requests.get('/minusSalary/' + id),
   
};
const HelpTicketApi = {
    listHelpTicket: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/helpTicket/list?search=' + encode(search), page, 100);
    },
    listAllHelpTicket: () => requests.get('/helpTicket/listAll'),
    getHelpTicket: (id) => requests.get('/helpTicket/' + id),
   
};
const HelpCommentApi = {
    listHelpComment: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/helpComment/list?search=' + encode(search), page, 100);
    },
    listAllHelpComment: () => requests.get('/helpComment/listAll'),
    getHelpComment: (id) => requests.get('/helpComment/' + id),
};
const DayRevenueApi = {
   
    getDayRevenue: (id) => requests.get('/dayRevenue/' + id),
   
};
const AccountCodeApi = {
    listAccountCode: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/accountCode/list?search=' + encode(search), page, 100);
    },
    listAllAccountCode: () => requests.get('/accountCode/listAll'),
    getAccountCode: (id) => requests.get('/accountCode/'+id),
}

const BillingApi = {
    listBilling: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/billing/list?search=' + encode(search), page, 100);
    },
    listAllBilling: () => requests.get('/billing/listAll'),
    getBilling: (id) => requests.get('/billing/'+id),
}

const JournalApi = {
    listJournal: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/journal/list?search=' + encode(search), page, 100);
    },
    listAllJournal: () => requests.get('/journal/listAll'),
    getJournal: (id) => requests.get('/journal/'+id),
}

const LedgerApi = {
    listLedger: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/ledger/list?search=' + encode(search), page, 100);
    },
    listAllLedger: () => requests.get('/ledger/listAll'),
    getLedger: (id) => requests.get('/ledger/'+id),
}

const TrialBalanceApi = {
    listTrialBalance: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/trialBalance/list?search=' + encode(search), page, 100);
    },
    listAllTrialBalance: () => requests.get('/trialBalance/listAll'),
    getTrialBalance: (id) => requests.get('/trialBalance/'+id),
}

const YearBalanceApi = {
    listYearBalance: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/yearBalance/list?search=' + encode(search), page, 100);
    },
    listAllYearBalance: () => requests.get('/yearBalance/listAll'),
    getYearBalance: (id) => requests.get('/yearBalance/'+id),
}
const PackageApi = {
    listPackage: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/package/list?search=' + encode(search), page, 100);
    },
    listAllPackage: () => requests.get('/package/listAll'),
    getPackage: (id) => requests.get('/package/'+id),
}
const PackageItemApi = {
    listPackageItem: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/packageItem/list?search=' + encode(search), page, 100);
    },
    listAllPackageItem: () => requests.get('/packageItem/listAll'),
    getPackageItem: (id) => requests.get('/packageItem/'+id),
}
const CouponApi = {
    listCoupon: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/coupon/list?search=' + encode(search), page, 100);
    },
    listAllCoupon: () => requests.get('/coupon/listAll'),
    getCoupon: (id) => requests.get('/coupon/'+id),
}
const PrescriptionFormApi = {
    listPrescriptionForm: () => {
        return requests.getPage('/prescriptionForm/list');
    },
    listAllPrescriptionForm: () => requests.get('/prescriptionForm/listAll'),
    getPrescriptionForm: (id) => requests.get('/prescriptionForm/'+id),
}
const PrescriptionFormItemApi = {
    listPrescriptionFormItem: (search, page) => {
        if (!search) {
            search = "";
        }
        return requests.getPage('/prescriptionFormItem/list?search=' + encode(search), page, 100);
    },
    listAllPrescriptionFormItem: () => requests.get('/prescriptionFormItem/listAll'),
    getPrescriptionFormItem: (id) => requests.get('/prescriptionFormItem/'+id),
}
const PreTemplateApi = {
    listPreTemplate: (page) => {
        return requests.getPage('/preTemplate/list',page,20);
    },
    listAllPreTemplate: () => requests.get('/preTemplate/listAll'),
    getPreTemplate: (id) => requests.get('/preTemplate/'+id),
}
const PreTemplateItemApi = {
    listPreTemplateItem: () => {
        return requests.getPage('/preTemplateItem/list');
    },
    listAllPreTemplateItem: () => requests.get('/preTemplateItem/listAll'),
    getPreTemplateItem: (id) => requests.get('/preTemplateItem/'+id),
}
const PreTemplateFieldApi = {
    listPreTemplateField: (page) => {
        return requests.getPage('/preTemplateField/list', page, 100);
    },
    listAllPreTemplateField: () => requests.get('/preTemplateField/listAll'),
    getPreTPreTemplateField: (id) => requests.get('/preTemplateField/'+id),
}

const StockCabinetApi = {
    listStockCabinet: (search, drugCabinetId, page) => {
        if (!search) {
            search = "";
        }
        if(!page){
            page = 1
        }
        return requests.getPage('/stockCabinet/list?search=' + encode(search) +'&drugCabinetId=' +drugCabinetId, page, 100);
    },
    // listAllPrescriptionFormItem: () => requests.get('/prescriptionFormItem/listAll'),
    getStockCabinet: (id) => requests.get('/stockCabinet/'+id),
}
const DrugCabinetApi = {
    list: (search, page) => {
        if (!search) {
            search = "";
        }
        if(!page){
            page = 1
        }
        return requests.getPage('/drugCabinet?search=' + encode(search) , page, 100);
    },
    // listAllPrescriptionFormItem: () => requests.get('/prescriptionFormItem/listAll'),
    getDrugCabinet: (id) => requests.get('/drugCabinet/'+id),
   
}

const ConfigTableApi = {
    list: (search, page) => {
        if (!search) {
            search = "";
        }
        if(!page){
            page = 1
        }
        return requests.getPage('/configTable?search=' + encode(search) , page, 100);
    },
    // listAllPrescriptionFormItem: () => requests.get('/prescriptionFormItem/listAll'),
    getConfigTable: (id) => requests.get('/configTable/'+id),
    getAllConfigTable: () => requests.get('/configTable/listAll')
}

const ConfigWarningDrugAPI = {
    list: (search, page) => {
        if (!search) {
            search = "";
        }
        if(!page){
            page = 1
        }
        return requests.getPage('/configWarningDrug/search?search=' + encode(search) , page, 100);
    },
    getConfigWarningDrug: (id) => requests.get('/configWarningDrug/'+id),
    getAllConfigWarningDrug: () => requests.get('/configWarningDrug/listAll')
}

const ConfigDayDrugAPI = {
    list: (search, page) => {
        if (!search) {
            search = "";
        }
        if(!page){
            page = 1
        }
        return requests.getPage('/configDayDrug/search?search=' + encode(search) , page, 100);
    },
    getConfigDayDrug: (id) => requests.get('/configDayDrug/'+id),
    getAllConfigDayDrug: () => requests.get('/configDayDrug/listAll')
}
export default {
    asyncRequests,
    AuthService,
    SupplierApi,
    PatientBookingGroupApi,
    CompanyApi,
    BookingGroupApi,
    DeviceApi,
    DeviceMaintenanceApi,
    MaintenancePlanApi,
    UserApi,
    IcdCategoryApi,
    IcdApi,
    PatientApi,
    UomApi,
    DrugCategoryApi,
    DrugApi,
    DiagnosisServiceApi,
    DiagnosisGroupApi,
    ShortCodeApi,
    UserAttendanceApi,
    TransferHospitalApi,
    TransferFormApi,
    UserSalaryApi,
    DashboardNotificationApi,
    AppointmentApi,
    HospitalApi,
    DepartmentApi,
    DrugStoreApi,
    DiagnosisReportApi,
    StockApi,
    QueueApi,
    CashDeskApi,
    CashWidrawalApi,
    PrescriptionApi,
    InvoiceApi,
    InsuranceCardApi,
    InsuranceTypeApi,
    UserConfigApi,
    ProcedureServiceApi,
    ProcedureMemberApi,
    ProcedureReportApi,
    PaymentApi,
    PrescriptionItemApi,
    QueueNumberApi,
    InputStockApi,
    OutputStockApi,
    InvoiceItemApi,
    InsuranceMappingApi,
    InsuranceInvoiceApi,
    ProcedureReportApi,
    InsuranceInvoiceItemApi,
    InsuranceCompanyApi,
    PrescriptionReviewApi,
    MedicalSuppliesApi,
    MedicalSuppliesCategoryApi,
    GroupApi,
    UserContextApi,
    InputFormApi,
    OutputFormApi,
    AddSalaryApi,
    MinusSalaryApi,
    HelpTicketApi,
    HelpCommentApi,
    DayRevenueApi,
    AccountCodeApi,
    BillingApi,
    JournalApi,
    LedgerApi,
    TrialBalanceApi,
    YearBalanceApi,
    PackageApi,
    PackageItemApi,
    CouponApi,
    PrescriptionFormApi,
    PrescriptionFormItemApi,
    PreTemplateApi,
    PreTemplateItemApi,
    PreTemplateFieldApi,
    StockCabinetApi,
    DrugCabinetApi,
    ConfigTableApi,
    ConfigWarningDrugAPI,
    ConfigDayDrugAPI,
    setToken: _token => { token = _token },
    setBackendUrl,
    getBackendUrl,
}