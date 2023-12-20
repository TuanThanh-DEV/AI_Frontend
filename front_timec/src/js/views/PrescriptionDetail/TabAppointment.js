// import React from 'react';
// import { toast } from 'react-toastify';
// import { translate } from 'react-i18next';
// import { ScriptUtils } from '../../utils/javascriptUtils';
// import TablePagination from '../../components/TablePagination';
// import agent from '../../services/agent';
// import ModalAppointment from '../Appointment/ModalAppointment';
// import moment from 'moment';

// class TabAppointment extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             isAppointmentModalShown:false,
//             hospitalId:null,
//             patientId:null,
//             doctorId:null,
//             listAppointment:[],
//         }
//         var _this = this;
//         this.handleShowmodalAppointment = this.handleShowmodalAppointment.bind(this);
//         this.getListAppointmentByPrescriptionId=this.getListAppointmentByPrescriptionId.bind(this);
//         this.handleHideAndClear = this.handleHideAndClear.bind(this);
//         this.handleHidemodal = () => {
//             this.setState({isAppointmentModalShown: false});
//             this.getListAppointmentByPrescriptionId();
//         };
//     };
  
//     handleShowmodalAppointment(id,prescriptionId,patientId,hospitalId,doctorId){
//         this.setState({
//             isAppointmentModalShown: true,
//             idAppointment: id,
//             prescriptionId:prescriptionId,
//             patientId:patientId,
//             hospitalId:hospitalId,
//             doctorId:doctorId,
//         });
//     }
//     handleHideAndClear() {
//         const { destroy, backToList,onHide } = this.props;
//         onHide();
//         destroy();
//         backToList();
//     }

//     componentWillMount() {
//         this.getListAppointmentByPrescriptionId();
//     }

//     getListAppointmentByPrescriptionId() {
//         var id = this.props.prescriptionId;
//         if (id != 'new') {
//             let setStateInRequest = (list) => { this.setState({ listAppointment: list }) }
//             return agent.asyncRequests.get('/appointment/listFindByPrescriptionId?prescriptionId=' + id
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
   
// render() {

//     const dataAppointment = this.state.listAppointment;
//     const {prescriptionId, patientId, doctorId, hospitalId} = this.props;
//     // if (!prescriptionId || !patientId || !doctorId || !hospitalId) {
//     //     return null;
//     // }
//     var appointmentRows =null;
//     if (dataAppointment) {
//         var appointmentCurrentNo = 0;
//         appointmentRows = dataAppointment.map(items => {
//             appointmentCurrentNo++
//             return (
//                 <tr key={"appointmentId" + items.id}>
//                 <td>{appointmentCurrentNo}</td>
//                 <td>{moment(items.appointDate).format("DD/MM/YYYY HH:mm")}</td>
//                 <td>{items.status}</td>
//                 {/* <td>{items.patient.fullName}</td>
//                 <td>{items.user.fullName}</td>
//                 <td>{items.hospital.name}</td> */}
            
//                 <td><a onClick={() => this.handleShowmodalAppointment(items.id)}><i className="icon-eye"></i> Xem </a></td>
//                  </tr>
//             )
//         })
//     }
    

//     return <div className="tab-pane" id="default-justified-tab5">
//     <table className="table table-xxs table-bordered">
//         <thead>
//             <tr className="bg-teal">
//             <th data-toggle="true">STT</th>
//             <th data-toggle="true">Tái Khám Vào Lúc</th>
//             <th data-toggle="true">Nội Dung Cuộc Hẹn</th>
//             {/* <th data-toggle="true">Tên Bệnh Nhân</th>
//             <th data-toggle="true">Tên Bác Sĩ</th>
//             <th data-toggle="true">Phòng Khám</th>   */}
//                 <th className="text-center footable-visible footable-last-column" style={{ width: '70px' }}><i className="icon-menu-open2"></i></th>
//              </tr>
//         </thead>
//         <tbody>
//             {appointmentRows}
//         </tbody>
//     </table>
//     {this.state.isAppointmentModalShown ? <ModalAppointment 
//         title= "Thêm Cuộc Hẹn"
//         idAppointment={this.state.idAppointment} 
//         show={this.state.isAppointmentModalShown} 
//         onHide={this.handleHidemodal} 
//         prescriptionId = {this.props.prescriptionId}
//         patientId={this.props.patientId}
//         hospitalId={this.props.hospitalId}
//         doctorId={this.props.doctorId}
//         /> : null
//     }

// </div>
// }
// }


// export default translate('translations')(TabAppointment);