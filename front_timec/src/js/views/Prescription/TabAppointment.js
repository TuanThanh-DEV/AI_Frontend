import React from 'react';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { ScriptUtils } from '../../utils/javascriptUtils';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import ModalAppointment from '../Appointment/ModalAppointment';
import moment from 'moment';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import pdfMake from 'pdfmake/build/pdfmake';import { FormatterUtils } from '../../utils/javascriptUtils';
import { LoadingScreen } from '../../components/commonWidgets';


class TabAppointment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAppointmentModalShown:false,
            hospitalId:null,
            patientId:null,
            doctorId:null,
            listAppointment:[],
            imageLogo : null,
            objectInsuranceCard : null
        }
        var _this = this;
        this.handleShowmodalAppointment = this.handleShowmodalAppointment.bind(this);
        this.getListAppointmentByPrescriptionId=this.getListAppointmentByPrescriptionId.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.getInsuranceCard = this.getInsuranceCard.bind(this);
        this.handleHidemodal = () => {
            this.setState({isAppointmentModalShown: false});
            this.getListAppointmentByPrescriptionId();
        };
        this.handleSavePDF = (dataExport) => {
            pdfMake.vfs = pdfFonts.pdfMake.vfs;
            pdfMake.createPdf(dataExport).print();
        
        }
    };
  
    handleShowmodalAppointment(id,prescriptionId,patientId,hospitalId,doctorId){
        this.setState({
            isAppointmentModalShown: true,
            idAppointment: id,
            prescriptionId:prescriptionId,
            patientId:patientId,
            hospitalId:hospitalId,
            doctorId:doctorId,
        });
    }
    handleHideAndClear() {
        const { destroy, backToList,onHide } = this.props;
        onHide();
        destroy();
        backToList();
    }

    getInsuranceCard(idPatient, idInsuranceType){
        let setStateInRequest = (list) => { this.setState({ objectInsuranceCard: list }) }
        return agent.asyncRequests.get("/incuranceCard/listByPatientAndInsuranceType?idPatient=" +idPatient +"&idInsuranceType=" +idInsuranceType
        ).then(function (res) {
            var result = res.body;
            if (result.resultData) {
                setStateInRequest(result);
            } else if (result.errorMessage) {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    }

    getListAppointmentByPrescriptionId() {
        var id = this.props.prescriptionId;
        if (id != 'new') {
            let setStateInRequest = (list) => { this.setState({ listAppointment: list }) }
            return agent.asyncRequests.get('/appointment/listFindByPrescriptionId?prescriptionId=' + id
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
    // getInsuranceCard(Appointment){
    //     var idPatient = Appointment.prescription ? Appointment.prescription.patient.id : null;
    //     if(idPatient){
    //         let setStateInRequest = (list) => { this.setState({ insuranceCard: list }) }
    //         return agent.asyncRequests.get('/insuranceCard/findByPatientId?patientId=' + idPatient
    //         ).then(function (res) {
    //             var result = res.body.resultData;
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
    // }

    componentWillMount() {
        this.getListAppointmentByPrescriptionId();
        var url = '/assets/images/logo_timec.png';
        FormatterUtils.downloadImageDataUri(url, this, "imageLogo");
        const {patientId,insuranceTypeId } = this.props;
        // alert(this.props.patientId +", "+ this.props.insuranceTypeId)
        if(patientId != null && insuranceTypeId !=0 && insuranceTypeId != null ){
            this.getInsuranceCard(patientId, insuranceTypeId);
        }
    }

    getDataExport(dataPDF) {
        var objectInsuranceCard = this.state.objectInsuranceCard;
        var dataInsuranceCard = [];
        if(objectInsuranceCard){
            dataInsuranceCard = objectInsuranceCard;
        }else{
            <LoadingScreen></LoadingScreen>
        }
        var imageLogo = this.state.imageLogo;
        var patientBarcode =  FormatterUtils.convertTextToBarcode("HTK" + dataPDF.prescription.id);
        const {currentUser, t, currentPrescription}=this.props;
        var appointDatea = moment(dataPDF.appointDate).format("DD/MM/YYYY");
         var appointDate = moment(appointDatea,"DD/MM/YYYY");
        var  dataExport = {
            content: [
                {
                    columns: [
                        { text: 'Sở Y Tế TPHCM' + '\n Phòng Khám Đa Khoa Quốc Tế TIMEC'+'\n Số: ...../20...../GCT', fontSize: 11,alignment: 'center', margin:[-50,0,0,0] },
                        { text: 'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM'+'\n\n Độc lập - Tự do - Hạnh phúc'+ '\n ---------------', fontSize: 11, alignment: 'center',  margin:[-30,0,-30,0] },
                        { text: 'Mã Bệnh Án : '+ (dataPDF.prescription ? dataPDF.prescription.id:' ....')+'\n Mã Bệnh Nhân: '+(dataPDF.prescription ? dataPDF.prescription.patient.id:' ....'), fontSize: 11,alignment: 'center', margin:[0,0,-70,0] },
                    ]
                },           
                {
                    columns:[
                        imageLogo ? {
                            image: imageLogo,
                            fit: [100,100],
                            alignment: 'left',
                            margin : [20, 0, 0 , 0],
                        } : null,
                        {image: patientBarcode,fit:[100,100],alignment: 'right',  margin : [0, -20, 0 , 0]},
                    ]
                },
                {
                    columns :[
                        {text:''+ "HTK" + dataPDF.prescription.id, fontSize: 11, alignment: 'right', margin : [0, 0, 35 , 0]} ,
                    ]
                },
              
                { text: '\n GIẤY HẸN KHÁM LẠI', fontSize: 15, alignment: 'center' },
                {
                    columns :[
                        {text : ['\n\n - Họ và tên người bệnh:\t' , {text : dataPDF.prescription.patient ? dataPDF.prescription.patient.fullName : "....................................................................", bold: true, alignment:"left"}], fontSize: 11} ,
                        {text : "\n \n  Nam/Nữ:\t" + t(dataPDF.prescription.patient ? dataPDF.prescription.patient.gender : ".................."), alignment: 'right' , fontSize: 11, margin:[0,0,50,0] }
                    ]
                }
            
                ,{text:['\n - Ngày Sinh:\t', {text : dataPDF.prescription.patient ? moment(dataPDF.prescription.patient.birthday).format("DD/MM/YYYY") :"......................" }], fontSize: 11},
                { text: ['\n - Địa chỉ:\t ', {text : dataPDF.prescription.patient ? (dataPDF.prescription.patient.address != null ? 
                    dataPDF.prescription.patient.address: " .................................................................................................................................................................") 
                    : " ..............................................................................................................................................................."}], fontSize: 11, alignment: 'left' },
                
                { text: ['\n - Số Thẻ BHYT: \t' , {text : dataInsuranceCard.insuranceCode} ], fontSize: 11, alignment: 'left' },
                { text: ['\n - Hạn Sử Dụng: Từ\t', {text : moment(dataInsuranceCard.fromDate).format("DD/MM/YYYY") + '\t Đến: \t' + moment(dataInsuranceCard.toDate).format("DD/MM/YYYY")}], fontSize: 11, alignment: 'left' },
                { text: ['\n - Ngày Khám Bệnh: \t', {text : moment( dataPDF.prescription.arriveTime).format("DD/MM/YYYY")} ], fontSize: 11, alignment: 'left' },
                { text: ['\n - Ngày vào viện: \t' , {text : '.......................................' + '\t Ngày ra viện: \t' + '.......................................'}], fontSize: 11, alignment: 'left' },
                { text: ['\n - Chẩn Đoán: \t', {text : dataPDF.prescription.analysis}], fontSize: 11, alignment: 'left' },
                { text: ['\n\n - Bệnh Kèm Theo: \t'], fontSize: 11, alignment: 'left' },
                { text: ['\n ','\t * Hẹn tái khám vào ngày: ', {text:  appointDate.date() }, " tháng ", {text: (appointDate.month() + 1) }, " năm " ,{ text: appointDate.year() }, '\t , hoặc đến bất kỳ thời gian nào trước ngày được hẹn khám lại nếu có dấu hiệu (triệu chứng) bất thường.'], fontSize: 11, alignment: 'left' },
                { text: ['\n ','\t * Giấy hẹn khám lạilại chỉ có giá trị sử dụng 01 (một) lần trong thời hạn 10 ngày làm việc, kể từ ngày được hẹn khám lại. \t'], fontSize: 11, alignment: 'left' },
                {
                    columns:[
                        {text : "\n Y, BÁC SĨ KHÁM, ĐIỀU TRỊ \n \n (Ký và ghi rõ họ tên) \n " , fontSize: 11, alignment: 'center' },
                        {text : "\n Ngày .... tháng .... năm 20......... \n \n NGƯỜI CÓ THẨM QUYỀN CHUYỂN TUYẾN \n \n (Ký tên, đóng dấu) \n ", fontSize: 11, alignment: 'center'  }
                    ]
                }
                ],
            styles: {
                header: {
                    fontSize: 10,
                    bold: true
                },
                bigger: {
                    fontSize: 10,
                    italics: true
                },
                tableExample: {
                    margin: [0, 5, 0, 15]
                },
                tableHeader: {
                    bold: true,
                    fontSize: 13,
                    color: 'black'
                }
            },
            defaultStyle: {
                columnGap: 10
            }
        }
        return dataExport;
    }
   
render() {

    const dataAppointment = this.state.listAppointment;
    const {prescriptionId, patientId, doctorId, hospitalId, insuranceTypeId, patientIdSelector} = this.props;
    // if (!prescriptionId || !patientId || !doctorId || !hospitalId) {
    //     return null;
    // }
    var appointmentRows =null;
    if (dataAppointment) {
        var appointmentCurrentNo = 0;
        appointmentRows = dataAppointment.map(items => {
            appointmentCurrentNo++
            return (
                <tr key={"appointmentId" + items.id}>
                <td>{appointmentCurrentNo}</td>
                <td>{moment(items.appointDate).format("DD/MM/YYYY HH:mm")}</td>
                <td>{items.status}</td>
                {/* <td>{items.patient.fullName}</td>
                <td>{items.user.fullName}</td>
                <td>{items.hospital.name}</td> */}
            
                <td width="15%">
                    <div style={{float:"left"}}>
                        <a onClick={() => this.handleShowmodalAppointment(items.id)}><i className="icon-eye"></i> Xem </a>
                    </div>
                    <div style={{float:"left", paddingLeft:"10px"}}>
                        <button onClick={() => this.handleSavePDF(this.getDataExport(items))}>In Giấy Hẹn</button>
                    </div>
                </td>
                 </tr>
            )
        })
    }
    

    return <div className="tab-pane" id="default-justified-tab5">
    <table className="table table-xxs table-bordered">
        <thead>
            <tr className="bg-teal">
            <th data-toggle="true">STT</th>
            <th data-toggle="true">Tái Khám Vào Lúc</th>
            <th data-toggle="true">Nội Dung Cuộc Hẹn</th>
            {/* <th data-toggle="true">Tên Bệnh Nhân</th>
            <th data-toggle="true">Tên Bác Sĩ</th>
            <th data-toggle="true">Phòng Khám</th>   */}
                <th width="15%" className="text-center footable-visible footable-last-column" style={{ width: '70px' }}><i className="icon-menu-open2"></i></th>
             </tr>
        </thead>
        <tbody>
            {appointmentRows}
        </tbody>
    </table>
    {this.state.isAppointmentModalShown ? <ModalAppointment 
        title= "Thêm Cuộc Hẹn"
        idAppointment={this.state.idAppointment} 
        show={this.state.isAppointmentModalShown} 
        onHide={this.handleHidemodal} 
        prescriptionId = {this.props.prescriptionId}
        patientId={this.props.patientId}
        hospitalId={this.props.hospitalId}
        doctorId={this.props.doctorId}
        /> : null
    }

    <div className="panel-body">
        <div className="heading-elements">
            <button type="button" className="btn btn-info" onClick={() => this.handleShowmodalAppointment(null,this.props.prescriptionId,this.props.patientId,this.props.hospitalId,this.props.doctorId)}> Hẹn Tái Khám</button>
        </div>
    </div>
</div>
}
}


export default translate('translations')(TabAppointment);