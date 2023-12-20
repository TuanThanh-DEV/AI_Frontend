// import React from 'react';
// import { connect } from 'react-redux';
// import agent from '../../services/agent';
// import { RenderInputWithDiv, RenderDatePicker, RenderSelect, RenderNumberInput, RenderDatePickerWithTime, RenderTextAreaShortCode } from '../../components/formInputs';
// import { Field, reduxForm, formValueSelector } from 'redux-form';
// import { toast } from 'react-toastify';
// import { translate } from 'react-i18next';
// import { LoadingScreen } from '../../components/commonWidgets';
// import { LOAD_UPDATING_PRESCRIPTION } from './action-types';
// import { FIRE_REDIRECT, REDIRECT_TO_PREVIOUS_URL } from '../../constants/action-types';
// import { UPDATE_PREVIOUS_URL } from '../../constants/action-types';
// import TabPrescription from './TabPrescription';
// import TabDiagnosisReport from './TabDiagnosisReport';
// import TabProcedureReport from './TabProcedureReport';
// import TabTransferForm from './TabTransferForm';
// import TabAppointment from './TabAppointment';
// import TabPrescriptionHistory from './TabPrescriptionHistory';

// const validate = values => {
//     const errors = {};
//     if (!values.patientId ) {
//         errors.patientId =  "Vui lòng chọn Bệnh Nhân" 
//     }
//     if (!values.departmentId) {
//         errors.departmentId =  "Vui lòng chọn Chuyên Khoa" 
//     }
//     if (!values.hospitalId) {
//         errors.hospitalId =  "Vui lòng chọn Phòng Khám" 
//     }

//     return errors;
// }
// const selector = formValueSelector('PrescriptionDetail');
// const mapStateToProps = state => {
//     var updateValue = {
//         ...state.prescriptionReducer.updatingPrescription,
//         solution: state.prescriptionReducer.updatingPrescription && state.prescriptionReducer.updatingPrescription.solution ?state.prescriptionReducer.updatingPrescription.solution : "KhongToa",
//     };
//     return {
//         initialValues: updateValue,
//         hospitalId: selector(state, "hospitalId"),
//         doctorId: selector(state, "userId"),
//         hospitalIdSelector :selector(state,"hospitalId"),
//         patientIdSelector:selector(state,"patientId"),
//         currentUser: state.common.currentUser,
        
//     };
// };

// const mapDispatchToProps = dispatch => ({
//     backToList: () =>
//         dispatch({ type: FIRE_REDIRECT, toUrl: "/listPrescription" }),
//     goToEdit: (id) =>
//         window.location.href = "/editPrescription/" + id,
//     storePreviousUrl: (previousUrl) =>
//         dispatch({ type: UPDATE_PREVIOUS_URL, previousUrl }),
//     loadPrescription: (payload) =>
//         dispatch({ type: LOAD_UPDATING_PRESCRIPTION, payload: payload }),
    
//         updateField: (fieldName, value) =>
//         dispatch({
//             meta: { form: "PrescriptionDetail", field: fieldName },
//             payload: value,
//             type: "@@redux-form/CHANGE"
//         })
// });
// class PrescriptionDetail extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             listAllPersonel: [],
//             listAllPatient: [],
//             listAllDepartment: [],
//             listAllHospital: [],
//             listAllIcd: [],            
//             listAllProcedureService: [],            
//             isPrescriptionItemShown: false,
//             listShortCodes: [],          
//             isShowButtonNewPrescription : false,
//             listTranferForm : [],
//             isShowMenuControl: false,
//             currentPrescription: null
//         }
//         this.handleHidemodal = () => {
//             this.setState({
//                 isPrescriptionItemShown: false,
//             });
//             this.getListTranferFormByPrescriptionId();
            
//         }
//         this.handleHidemodalControl = () => {
//             this.setState({
//                 isShowMenuControl: false,
//             });
//         }
//         this.handleChangeHospital=(hospitalId)=>{
//             const {updateField,hospitalIdSelector} = this.props;
//             if(hospitalId !=hospitalIdSelector){
//             updateField("departmentId", null);
//             }
//         }
           
//         this.getListTranferFormByPrescriptionId = this.getListTranferFormByPrescriptionId.bind(this);        
//         this.fillDataFromQueueNumberToPresciption = this.fillDataFromQueueNumberToPresciption.bind(this);
//         this.handleSave = this.handleSave.bind(this);
//         this.handleFinish = this.handleFinish.bind(this);
//         this.handleHideAndClear = this.handleHideAndClear.bind(this);
//         this.newPrescription = this.newPrescription.bind(this);
//         this.handleShowMenuControl = this.handleShowMenuControl.bind(this);
//         this.handleSuspendedQueue = this.handleSuspendedQueue.bind(this);
//      };
  

//     getListTranferFormByPrescriptionId() {
//         var id = this.props.match.params.id;
//         if (id != 'new') {
//             let setStateInRequest = (list) => { this.setState({ listTranferForm: list }) }
//             return agent.asyncRequests.get('/tranferForm/listFindByPrescriptionId?prescriptionId=' + id
//             ).then(function (res) {
//                 var result = res.body.resultData;
//                 if (result) {
//                     setStateInRequest(result);
//                 } else {
//                     toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
//                 }
//             }, function (err) {
//                 toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
//                     + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
//             });
//         }
//     }
    
//     getlistAllDoctor() {
//         let setStateInRequest = (list) => { this.setState({ listAllPersonel: list }) }
//         return agent.UserApi.listAllPersonel(
//         ).then(function (res) {
//             var result = res.resultData;
//             if (result) {
//                 setStateInRequest(result);
//             } else {
//                 toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
//             }
//         }, function (err) {
//             toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
//                 + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
//         });

//     }

//     getMyShortCodes() {
//         let setStateInRequest = (list) => { this.setState({ listShortCodes: list }) }
//         return agent.ShortCodeApi.listMyShortCode(
//         ).then(function (res) {
//             var result = res.resultData;
//             if (result) {
//                 var list = result.map(item => {
//                     return {shortCode: item.shortcode, replaceText: item.replaceText};
//                 });
//                 setStateInRequest(list);
//             } else {
//                 toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
//             }
//         }, function (err) {
//             toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
//                 + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
//         });

//     }

//     getlistAllProcedureService(){
//         let setStateInRequest = (list) => { this.setState({ listAllProcedureService: list }) }
//         return agent.ProcedureServiceApi.listAllProcedureService(
//         ).then(function (res) {
//             var result = res.resultData;
//             if (result) {
//                 setStateInRequest(result);
//             } else {
//                 toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
//             }
//         }, function (err) {
//             toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
//             +" Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
//         });

//     }

//     getlistAllPatient() {
//         let setStateInRequest = (list) => { this.setState({ listAllPatient: list }) }
//         return agent.PatientApi.listAllPatient(
//         ).then(function (res) {
//             var result = res.resultData;
//             if (result) {
//                 setStateInRequest(result);
//             } else {
//                 toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
//             }
//         }, function (err) {
//             toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
//                 + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
//         });

//     }

//     getlistAllDepartment() {
//         let setStateInRequest = (list) => { this.setState({ listAllDepartment: list }) }
//         return agent.DepartmentApi.listAllDepartment(
//         ).then(function (res) {
//             var result = res.resultData;
//             if (result) {
//                 setStateInRequest(result);
//             } else {
//                 toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
//             }
//         }, function (err) {
//             toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
//                 + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
//         });

//     }
//     getlistAllHospital() {
//         let setStateInRequest = (list) => { this.setState({ listAllHospital: list }) }
//         return agent.HospitalApi.listAllHospital(
//         ).then(function (res) {
//             var result = res.resultData;
//             if (result) {
//                 setStateInRequest(result);
//             } else {
//                 toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
//             }
//         }, function (err) {
//             toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
//                 + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
//         });

//     } 

//     getlistAllIcd() {
//         let setStateInRequest = (list) => { this.setState({ listAllIcd: list }) }
//         return agent.IcdApi.listAllIcd(
//         ).then(function (res) {
//             var result = res.resultData;
//             if (result) {
//                 setStateInRequest(result);
//             } else {
//                 toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
//             }
//         }, function (err) {
//             toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
//                 + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
//         });

//     }

//     handleHideAndClear() {
//         const { destroy, backToList } = this.props;
//         // onHide();
//         destroy();
//         backToList()
//     }

//     handleShowMenuControl(){
//         this.setState({
//             isShowMenuControl : true
//         })
//     }
//     handleSave(values) {
//         var id = this.props.match.params.id;
//         var url = '/prescription/update';
//         var bodyObject = {
//             id: id,
//             userId : values.userId,
//             diagnosisReport:values.diagnosisReport,
//             patientId: values.patientId,
//             departmentId: values.departmentId,
//             procedureService: values.procedureService,
//             cls: values.cls,
//             analysis: values.analysis,
//             hospitalId: values.hospitalId,
//             procedureReport:values.procedureReport,
//             arriveTime: values.arriveTime,
//             examineTime: values.examineTime,
//             finishTime: values.finishTime,
//             icdId: values.icdId,
//             subIcdId: values.subIcdId,
//             solution: values.solution ? values.solution : "KhongToa",
//             numberDayOff: values.numberDayOff,
//             fromDayOff: values.fromDayOff,
//             mach: values.mach,
//             nhipTho: values.nhipTho,
//             nhietDo: values.nhietDo,
//             huyetAp: values.huyetAp,
//             height: values.height,
//             weight: values.weight,
//             status : "IN_PROGRESS",
//         };
//         var _this = this;
//         return agent.asyncRequests.post(url, bodyObject
//         ).then(function (res) {            
//             var result = res.body.resultData;
//             if (result) {
//                 // backToList();
//                 // this.setState({isShowButtonNewPrescription : true})
//                 toast.info("Đã Lưu!", { autoClose: 5000 });
//                 _this.state.currentPrescription = bodyObject;

//             } else {
//                 toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
//             }
//         }, function (err) {
//             toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
//         });
//     };

//     handleFinish(values) {
//         // var backToList = this.props.backToList;
//         const{updateField}=this.props;
        
//         var today =new Date();
//         var id = this.props.match.params.id;
//         var url = '/prescription/finish';
//         var bodyObject = {
//             id: id,
//             userId: values.userId,
//             diagnosisReport:values.diagnosisReport,
//             patientId: values.patientId,
//             departmentId: values.departmentId,
//             procedureService: values.procedureService,
//             cls: values.cls,
//             analysis: values.analysis,
//             hospitalId: values.hospitalId,
//             procedureReport:values.procedureReport,
//             arriveTime: values.arriveTime,
//             examineTime: values.examineTime,
//             finishTime: today,
//             icdId: values.icdId,
//             subIcdId: values.subIcdId,
//             solution: values.solution ? values.solution : "KhongToa",
//             numberDayOff: values.numberDayOff,
//             fromDayOff: values.fromDayOff,
//             mach: values.mach,
//             nhipTho: values.nhipTho,
//             nhietDo: values.nhietDo,
//             huyetAp: values.huyetAp,
//             height: values.height,
//             weight: values.weight,
//             status : "DONE",
//         };
//         var _this = this;
//         return agent.asyncRequests.post(url, bodyObject
//         ).then(function (res) {            
//             var result = res.body.resultData;
//             if (result) {
//                 // backToList();
//                 // this.setState({isShowButtonNewPrescription : true})
//                 toast.info("Đã Lưu! Mời gọi Bệnh Nhân tiếp theo.", { autoClose: 5000 });
//                 _this.state.currentPrescription = bodyObject;
//                 updateField("finishTime",today);
//             } else {
//                 toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
//             }
//         }, function (err) {
//             toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
//         });
//     };

//     componentWillMount() {
//         const { loadPrescription } = this.props;
//         var id = this.props.match.params.id;
//         const dataPromise = agent.PrescriptionApi.getPrescription(id);
//         loadPrescription(Promise.resolve(dataPromise))
//         this.getlistAllDoctor();
//         this.getlistAllPatient();
//         this.getlistAllDepartment();
//         this.getlistAllHospital();
//         this.getlistAllIcd();         
//         this.getMyShortCodes();
//         this.getListTranferFormByPrescriptionId();
//     }
//     // just fill data when have value. in presciption
//     fillDataFromQueueNumberToPresciption(presciptionId){
//         // const { loadPrescription , currentUser,updateField} = this.props;
//         // const dataPromise =agent.PrescriptionApi.getPrescription(presciptionId);          
//         // loadPrescription(Promise.resolve(dataPromise));        
//         // this.setState({isShowButtonNewPrescription : false});        
//         const { goToEdit } = this.props;
//         goToEdit(presciptionId);
//     }
//     handleSuspendedQueue(){
//         const {currentUser} = this.props;
//         return agent.asyncRequests.get('/queue/suspened?callerId=' + currentUser.id
//             ).then(function (res) {
//                 var result = res.body;
//                 if (result.resultData) {
//                     toast.info("Ngưng nhận số thành công!", { autoClose: 1000 });
//                 } else {
//                     toast.warn(result.errorMessage ,{ autoClose: 1500 });
//                 }
//             }, function (err) {
//                 toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
//                     + " Hoặc liên hệ quản trị viên.", { autoClose: 1500 });
//             });
        
//     }
//     componentDidMount() {
//         this.props.storePreviousUrl(window.location.pathname + window.location.search);
//     };

//     newPrescription(){
//         const { currentUser} = this.props;
//         var today = new Date();
//         const fillDataFromQueueNumberToPresciption = this.fillDataFromQueueNumberToPresciption;
//         // const dataPromise = agent.PrescriptionApi.getPrescription(id);
//         var url = "/prescriptionEdit/createPrescriptionForNext";
//         var bodyObject = {
//             user : currentUser,
//         //    arriveTime : today,
//             examineTime:today
//         }
//         return agent.asyncRequests.post(url, bodyObject ).then(function (res) {
//                 var result = res.body.resultData;
//                 if (result) {
//                     fillDataFromQueueNumberToPresciption(result.id);
//                     // toast.info("Lưu Thành Công.", { autoClose: 1000 });
//                 } else {
//                     toast.info('Đã hết "Hàng Đợi Thường"! Vui lòng tạo thêm "Hàng Đợi Thường" hoặc "Ngừng Nhận Bênh Nhân "', { autoClose: 15000 });
//                 }
//             }, function (err) {
//                 toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
//             });
//         // isShowNewPrescription

//     }
//     render() {
//     const { handleSubmit, submitting, title, updateField,invalid,patientIdSelector, backToList, hospitalId,hospitalIdSelector,
//             doctorId, currentUser } = this.props;
//         const modalConfig = {
//             backdrop: 'static', show: this.props.show, bsSize: "sm",
//             onHide: this.props.onHide,
//             submitting: this.props.submitting,
//             idPrescription : this.props.idPrescription
//         };
        
//         var listShortCodes = this.state.listShortCodes;
//         var optionAllProcedureService=[];
//         var dataListProcedureService = this.state.listAllProcedureService;
//         if(dataListProcedureService){
//             dataListProcedureService.map(item=>{
//                 optionAllProcedureService.push({label:item.name,value:item.id});
//             })
//         }
    
//         var optionAllDoctor = [];
//         var dataListDoctor = this.state.listAllPersonel;
//         if (dataListDoctor) {
//             dataListDoctor.map(item => {
//                 if(currentUser.email == item.email){
//                     optionAllDoctor.push({ label: item.fullName, value: item.id });
//                     updateField("userId", item.id);
//                 }
//             })
//         }

//         var optionAllPatient = [];
//         var dataListPatient = this.state.listAllPatient;
//         if (dataListPatient) {
//             dataListPatient.map(item => {
//                 optionAllPatient.push({ label: item.fullName, value: item.id });

//             })
//         }

//         var optionAllDepartment = [];
//         var dataListDepartment = this.state.listAllDepartment;
//         if (dataListDepartment) {
//             dataListDepartment.map(item => {
//                 if(hospitalIdSelector == item.hospital.id){
//                     optionAllDepartment.push({label:item.name,value:item.id});
//                 }
//             })
//         }

//         var optionAllHospital = [];
//         var dataListHospital = this.state.listAllHospital;
//         if (dataListHospital) {
//             dataListHospital.map(item => {
//                 optionAllHospital.push({ label: item.name, value: item.id });
//             })
//         }

//         var optionAllIcd = [];
//         var dataListIcd = this.state.listAllIcd;
//         if (dataListIcd) {
//             dataListIcd.map(item => {
//                 optionAllIcd.push({ label: item.name, value: item.id });
//             })
//         }

//         var optionGender =[

//             {label:"Nam ",value:"MALE"},
//             {label:"Nữ ",value:"FEMALE"},
//             {label:"Khác ",value:"OTHER"},
//         ]

//         var optionsolution=[
//             {label:"Cấp Toa Cho Về ",value:"CapToa"},
//             {label:"Điều Trị Ngoại Trú ",value:"DieuTriNgoaiTru"},
//             {label:"Cấp Toa và Hẹn Tái Khám ",value:"CapToaHenTaiKham"},
//             {label:"Chuyển Viện ",value:"ChuyenVien"},
//             {label:"Cho Thực Hiện CLS ",value:"Khac"},
//             {label:"Không Toa ",value:"KhongToa"}
//         ]

//         var currentPrescription = null;
//         if (this.state.currentPrescription) {
//             currentPrescription = this.state.currentPrescription;
//         } else {
//             currentPrescription = this.props.initialValues;
//         }
   
//         var newModal = null;
//         newModal =
//             <div className="content-wrapper">
//                 <div className="page-header page-header-default">
//                     <div className="breadcrumb-line">
//                         <ul className="breadcrumb">
//                             <li><a href=""><i className="icon-home2 position-left"></i> Home</a> </li>
//                             <li className="active">Khám Bệnh</li>
//                             <li className="active">Khám Bệnh</li>
//                         </ul>
                    
//                     </div>
//                 </div>
//                 <div className="content">
//                     <div className="row">
//                         <div className="panel panel-flat">
//                             <div className="panel-body">
//                                 {submitting ? <LoadingScreen /> :
//                                     <div className="row">                         
//                                         <div className="col col-md-12">
//                                         <legend class="text-semibold"><i class="icon-reading position-left"></i> Thông Tin Khám Bệnh</legend>
//                                         <form id="save-prescription" role="form" onSubmit={handleSubmit(this.handleSave)}>
//                                             <div className="row">
//                                                 <div className="col col-md-6">
//                                                     <div className="col col-md-7">
//                                                         <div className="form-group">
//                                                                 <Field  disabled={true} name="patientId" label="Họ Và Tên" options={optionAllPatient} component={RenderSelect} ></Field>
//                                                             </div>
                                                        
//                                                         <div className="form-group">
//                                                                 <Field  disabled={true} name="hospitalId" label="Phòng Khám" options={optionAllHospital} onChangeAction={(value)=>{this.handleChangeHospital(value)}} component={RenderSelect}></Field>
//                                                             </div>
                                                        
//                                                             <div className="form-group">
//                                                                 <Field  disabled={true} name="userId" label="Bác Sĩ Khám" options={optionAllDoctor} component={RenderSelect}></Field>
//                                                             </div>
                                                        
//                                                             <div className="form-group">
//                                                                 <Field disabled={true} name="arriveTime" label="Tiếp Nhận Lúc" component={RenderDatePickerWithTime}></Field>
//                                                         </div>
                                                        
//                                                         <div className="form-group">
//                                                                 <Field disabled={true} name="mach" label="Mạch" placeholder="Nhập số lần mạch đập..." component={RenderNumberInput}></Field>

//                                                             </div>
//                                                             <div className="form-group">
//                                                                 <Field disabled={true} name="nhietDo" label="Nhiệt Độ" placeholder="Nhập nhiệt độ (°C)..." component={RenderNumberInput}></Field>
//                                                             </div>
                                                        
//                                                             <div className="form-group">
//                                                                 <Field disabled={true} name="height" label="Chiều Cao" placeholder="Nhập chiều cao (cm)..." component={RenderNumberInput}></Field>
//                                                             </div>
                                                
//                                                         </div>
//                                                         <div className="col col-md-5">
//                                                             <div className="form-group">
//                                                                 <Field disabled={true} name="patient.gender" label="Giới Tính " label="Giới Tính " options={optionGender} component={RenderSelect}></Field>
//                                                             </div>
                                                        
                                                        
//                                                             <div className="form-group">
//                                                                 <Field disabled={true} name="examineTime" label="Khám Lúc" component={RenderDatePickerWithTime}></Field>
//                                                             </div>
//                                                             <div className="form-group">
//                                                                 <Field disabled={true} name="departmentId" label="Chuyên Khoa" options={optionAllDepartment} component={RenderSelect}></Field>
//                                                             </div>
//                                                             <div className="form-group">
//                                                                 <Field disabled={true} name="finishTime" label="Chỉ Định Lúc" component={RenderDatePickerWithTime}></Field>
//                                                             </div>
//                                                             <div className="form-group">
//                                                                 <Field disabled={true} name="nhipTho" label="Nhịp Thở" placeholder="Nhập số lần nhịp thở..." component={RenderNumberInput}></Field>
//                                                             </div>
//                                                             <div className="form-group">
//                                                                 <Field disabled={true} name="huyetAp" label="Huyết Áp" placeholder="Nhập huyết áp (mmHg)..." component={RenderNumberInput}></Field>
//                                                             </div>
//                                                             <div className="form-group">
//                                                                 <Field  disabled={true} name="weight" label="Cân Nặng" placeholder="Nhập cân nặng (kg)..." component={RenderNumberInput}></Field>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 <div className="col col-md-6">
//                                                     <div className="col col-md-5">
//                                                         <div className="form-group">
//                                                             <Field disabled={true} name="patient.birthday" label="Ngày Sinh" component={RenderDatePicker} ></Field>
//                                                         </div>
//                                                     </div>
//                                                     <div className="col col-md-7">
//                                                         <div className="form-group">
//                                                             <Field disabled={true}name="patient.address" label="Nguyên Quán" component={RenderInputWithDiv} ></Field>
//                                                         </div>
//                                                     </div>
//                                                     <div className="col col-md-12">
//                                                         <div className="form-group">
//                                                             <Field disabled={true} name="cls" autofocus="true" rows="2" label="Triệu Chứng" placeholder="Có thể dùng gõ tắt..." 
//                                                                 listShortCodes={listShortCodes} component={RenderTextAreaShortCode}></Field> 
//                                                         </div>
//                                                         <div className="form-group">
//                                                             <Field disabled={true} name="analysis" rows="2" label="Chẩn Đoán" placeholder="Có thể dùng gõ tắt..." 
//                                                                 listShortCodes={listShortCodes} component={RenderTextAreaShortCode}></Field> 
//                                                         </div>
//                                                     </div>
//                                                     <div className="col col-md-6">
//                                                         <div className="form-group">
//                                                             <Field disabled={true} name="icdId" label="Mã ICD" options={optionAllIcd} component={RenderSelect}></Field>
//                                                         </div>
//                                                     </div>
//                                                     <div className="col col-md-6">
//                                                         <div className="form-group">
//                                                             <Field disabled={true} name="subIcdId" label="Mã ICD Phụ" options={optionAllIcd} component={RenderSelect}></Field>
//                                                         </div>
//                                                     </div>
//                                                     <div className="col col-md-12">
//                                                         <div className="form-group">
//                                                             <Field disabled={true} name="solution" options={optionsolution} label="Cách Giải Quyết" component=
//                                                                 {RenderSelect}></Field>
//                                                         </div>
//                                                     {/* TODO: analyze re-appointment business later */}
//                                                     {/* <div className="form-group">
//                                                         <Field name="appointment" label="Lịch tái khám" component={RenderDatePicker}></Field>
//                                                     </div> */}
//                                                     </div>
//                                                     <div className="col col-md-6">
//                                                         <div className="form-group">
//                                                             <Field disabled={true} name="numberDayOff" label="Số Ngày Nghỉ" placeholder="Nhập số ngày nghỉ..." component={RenderNumberInput}></Field>
//                                                         </div>
//                                                     </div>
//                                                     <div className="col col-md-6">
//                                                         <div className="form-group">
//                                                             <Field disabled={true} name="fromDayOff" label="Từ Ngày" component={RenderDatePicker}></Field>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </form>
//                                     </div>
//                                 </div>}
//                                 <div className="col-md-12">
//                                     <div className="panel panel-flat">
//                                         <div className="panel-body">
//                                             <div className="tabbable">
//                                                 <ul className="nav nav-tabs nav-tabs-solid nav-tabs-component bg-teal" style={{marginBottom:"0"}}>
//                                                     <li className="active">
//                                                         <a href="#default-justified-tab1" data-toggle="tab"><i className="icon-menu6"></i> Đơn Thuốc </a>
//                                                     </li>
//                                                     <li>
//                                                         <a href="#default-justified-tab2" data-toggle="tab"><i className="icon-statistics"></i> Chỉ Định</a>
//                                                     </li>
//                                                     <li>
//                                                         <a href="#default-justified-tab3" data-toggle="tab"><i className="icon-stack-plus"></i> Thủ Thuật</a>
//                                                     </li>
//                                                     <li>
//                                                         <a href="#default-justified-tab4" data-toggle="tab"><i className="icon-city"></i> Chuyển Tuyến</a>
//                                                     </li>
//                                                     <li>
//                                                         <a href="#default-justified-tab5" data-toggle="tab"><i className="icon-city"></i> Hẹn Tái Khám</a>
//                                                     </li>
//                                                     <li>
//                                                         <a href="#default-justified-tab6" data-toggle="tab"><i className="icon-city"></i> Lịch Sử KCB</a>
//                                                     </li>
//                                                 </ul>
//                                                 <div className="tab-content">
//                                                     {patientIdSelector ||  currentUser? 
//                                                    [<TabPrescription patientId={patientIdSelector} currentUser={currentUser} prescriptionId={this.props.match.params.id}
//                                                      idPrescription={this.props.match.params.id} currentPrescription={currentPrescription} >
//                                                     </TabPrescription>,
                                                 
//                                                     <TabDiagnosisReport hospitalId={hospitalIdSelector} prescriptionId={this.props.match.params.id}  
//                                                     idPrescription={this.props.match.params.id} currentUser={currentUser} currentPrescription={currentPrescription} >
//                                                     </TabDiagnosisReport>,
                                                   
//                                                     <TabProcedureReport patientId={patientIdSelector} prescriptionId={this.props.match.params.id}  
//                                                     idPrescription={this.props.match.params.id} currentUser={currentUser} currentPrescription={currentPrescription}>                                                    
//                                                     </TabProcedureReport>,

//                                                     <TabTransferForm prescriptionId={this.props.match.params.id}  dataListTranferFormon = {this.state.listTranferForm} ReloadTransferForm={this.getListTranferFormByPrescriptionId}>
//                                                     </TabTransferForm>,

//                                                     <TabAppointment  doctorId={doctorId} hospitalId={hospitalIdSelector} patientId={patientIdSelector} prescriptionId={this.props.match.params.id}>
//                                                     </TabAppointment>,

//                                                     <TabPrescriptionHistory  prescriptionId={this.props.match.params.id} patientId={patientIdSelector}>
//                                                     </TabPrescriptionHistory>]:null}
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
              
//             </div >
//         return newModal;
//     }
// };
// export default translate('translations')(connect(
//     mapStateToProps, mapDispatchToProps)(
//         reduxForm({
//             form: 'PrescriptionDetail',
//             destroyOnUnmount: true,
//             enableReinitialize: true,
//             validate
//         })(PrescriptionDetail)));
