// import React from 'react';
// import { toast } from 'react-toastify';
// import { translate } from 'react-i18next';
// import { ScriptUtils } from '../../utils/javascriptUtils';
// import TablePagination from '../../components/TablePagination';
// import agent from '../../services/agent';
// import moment from 'moment';

// class TabPrescriptionHitory extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             isPrescriptionHitoryModalShown:false,
//             listPatientHistory:[],           
//         }
//         this.getListPrescriptionHitoryByPrescriptionId = this.getListPrescriptionHitoryByPrescriptionId.bind(this);
//         this.handleHideAndClear = this.handleHideAndClear.bind(this);
//         this.handleHidemodal = () => {
//             this.setState({isPrescriptionHitoryModalShown: false});
//             this.getListPrescriptionHitoryByPrescriptionId();
//         };
//     };
//     handleHideAndClear() {
//         const { destroy, backToList,onHide } = this.props;
//         onHide();
//         destroy();
//         backToList()
//     }
//     componentWillMount() {
//         this.getListPrescriptionHitoryByPrescriptionId();
//     }

//     getListPrescriptionHitoryByPrescriptionId() {
//         const patientId = this.props.patientId;
//         if(patientId){
//             let setStateInRequest = (list) => { this.setState({ listPatientHistory: list }) }
//             return agent.PrescriptionApi.findByPatientId(patientId
//             ).then(function (res) {
//                 var result = res.resultData;
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
   
// render() {

//     const dataPatient = this.state.listPatientHistory;
//     var PatientRows=null;
//     if(dataPatient){
//         PatientRows = dataPatient.map(item=>{
//             return(
//                 <tr key={"patientId" + item.id}>
//                 <td>{item.examineTime ? moment(item.examineTime).format(" HH:mm DD/MM/YYYY") : null}</td>
//                 <td>CĐ: {item.analysis ? item.analysis:null} 
//                     /ICD: {item.icd ? item.icd.name:null} 
//                     /Điều Trị: {item.solution?item.solution:null} 
                    
//                     </td>
//                 <td>{item.user ? item.user.fullName : null} </td>
//                 <td>{item.department ? item.department.name : null}</td>

//                 </tr>
//             )
//         })
//     }
//     return <div className="tab-pane" id="default-justified-tab6">
//     <table className="table table-xxs table-bordered">
//         <thead>
//             <tr className="bg-teal">
//             <th data-toggle="true">Giờ\Ngày Tháng Năm</th>
//             <th data-toggle="true">Nội Dung Điều Trị</th>
//             <th data-toggle="true">Bác Sĩ</th>
//             <th data-toggle="true">Khoa Điều Trị</th>
//             </tr>
//         </thead>
//         <tbody>
//             {PatientRows}
//         </tbody>
//     </table>
   
// </div>
// }
// }


// export default translate('translations')(TabPrescriptionHitory);