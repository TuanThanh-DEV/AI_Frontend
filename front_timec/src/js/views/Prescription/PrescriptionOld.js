import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { ScriptUtils } from '../../utils/javascriptUtils';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import moment from 'moment';
import ModalDiagnosisReport from '../DiagnosisReport/ModalDiagnosisReport';

class PrescriptionOld extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowPrescriptionItem : false,
            listPrescriptionItem: null,
            listDiagnosiReport: null,
            countCart : 0,
            isDiagnosisReportModalShown: false
        }
        this.handleShowPrescriptionItem = this.handleShowPrescriptionItem.bind(this);
        this.getListPrescriptionItemById = this.getListPrescriptionItemById.bind(this);
        this.handleChooseAll = this.handleChooseAll.bind(this);
        this.handleShowmodalDiagnosisReport = (id) => {
            this.setState({
                isDiagnosisReportModalShown: true,
                idDiagnosisReport: id
            });
        };
        this.handleHidemodal = () => {
            this.setState({isDiagnosisReportModalShown: false});
        };
    };

    handleShowPrescriptionItem(prescriptionId){
        let isShowPrescriptionItem  = this.state.isShowPrescriptionItem;
        isShowPrescriptionItem = !this.state.isShowPrescriptionItem;
        this.setState({isShowPrescriptionItem:isShowPrescriptionItem})
        if(isShowPrescriptionItem){
            this.getListPrescriptionItemById(prescriptionId);
        }
    }
    getListPrescriptionItemById(prescriptionId){
        let setStateInRequest = (list) => { this.setState({ listPrescriptionItem: list }) };
        let setStateDiagnosisReport = (list) => { this.setState({ listDiagnosiReport: list }) };
        
        return [(agent.asyncRequests.get("/prescriptionItem/listFindByPrescriptionId?prescriptionId="+prescriptionId).then(function(res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + res.body.errorMessage, {
                    autoClose: 15000
                });
            }
        }, function(err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", {
                autoClose: 15000
            });
        })),
        (agent.asyncRequests.get("/diagnosisReport/listFindByPrescriptionId?prescriptionId="+prescriptionId).then(function(res) {
            var result = res.body.resultData;
            if (result) {
                setStateDiagnosisReport(result);
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + res.body.errorMessage, {
                    autoClose: 15000
                });
            }
        }, function(err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", {
                autoClose: 15000
            });
        }))];
    }
    handleChooseAll(prescriptionIdOld){
        console.log(this.state.countCart)
        var currentPrescriptionId = this.props.prescriptionId;
        const {onHide} =  this.props;
        var _this = this;
        if(currentPrescriptionId != 'new'){
            let setStateInRequest = (number) => { this.setState({ countCart: this.state.countCart + number }) }
            return (agent.asyncRequests.get("/prescription/chooseDrugAll?prescriptionIdOld="+prescriptionIdOld +"&currentPrescriptionId=" + currentPrescriptionId).then(function(res) {
                var result = res.body;
                if (result) {
                    setStateInRequest(result);
                    _this.props.handleSumNumberDrugChoose(result);
                } else {
                    toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + res.body.errorMessage, {
                        autoClose: 5000
                    });
                }
            }, function(err) {
                toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", {
                    autoClose: 15000
                });
            }))
        }else{
            toast.info("Vui Mời Bệnh Nhân trước khi chọn Thuốc!",  {autoClose: 5000});
            onHide();
        }
        
    }
    
    componentWillMount() {
    };
    
    render() {
        const { prescriptionObject, key, t} = this.props;
        var isShowPrescriptionItem = this.state.isShowPrescriptionItem;
        var listPrescriptionItem = this.state.listPrescriptionItem;
        var listDiagnosiReport = this.state.listDiagnosiReport;
        var PrescriptionOlds = [];
        if(listPrescriptionItem){
            PrescriptionOlds = listPrescriptionItem.map(item=>{
                return (
                    <tr key={"listPrescriptionItem_" + item.id}>
                        <td colSpan="6">
                            <div style={{paddingLeft:"20px"}}>
                                <div > {item.drug ? item.drug.name  + " " + item.drug.hamLuongBHYT + " (" + item.totalAmount + " " + item.drug.uom + ") ": null }</div>
                                <div > {item.instruction}</div>
                            </div>
                        </td>
                    </tr>
                );
            })
        };

        var diagnosisReportOlds = [];
        if (listDiagnosiReport) {
            diagnosisReportOlds = listDiagnosiReport.map(item => {
                return (
                    <tr key={"diagnosisReportId" + item.id} >
                    <td>{item.quantity}</td>
                    <td colSpan="3">{item.diagnosisService.name + ". Kết quả: " + (item.description ? item.description : '')}</td>
                    <td><a className="pull-left" onClick={() => this.handleShowmodalDiagnosisReport(item.id)}> Xem </a></td>
                    <td>Trạng thái: {t(item.status)}</td>
                    </tr>
                )
            });
        }

        var prescriptionData = <tr>
            <td colSpan="6">
            <div><i>Triệu chứng: </i>{prescriptionObject.cls}</div>
            <div><i>Chẩn đoán: </i>{prescriptionObject.analysis}</div>
            <div><i>Lời dặn: </i>{prescriptionObject.note}</div>
            </td>
            
        </tr>
        var modalDiagnosisReport = this.state.isDiagnosisReportModalShown ? <ModalDiagnosisReport
            title="Kết Quả Chỉ Định"
            idDiagnosisReport={this.state.idDiagnosisReport}
            show={this.state.isDiagnosisReportModalShown}
            onHide={this.handleHidemodal}
            prescriptionId = {prescriptionObject.id}
            hospitalId={prescriptionObject.hospitalId}
            isActiveDoctor = {true}
            isEditale = {false}
            /> : null;
        
        return (
            [<tr key={"prescriptionObject_"+prescriptionObject.id}>
            <td style={{textAlign:"center"}}> 
                {isShowPrescriptionItem ? <button className="bg-info-600 icon-dash"  onClick={() => this.handleShowPrescriptionItem(prescriptionObject.id)}></button> 
                : 
                <button className="bg-info-600 icon-plus22"  onClick={() => this.handleShowPrescriptionItem(prescriptionObject.id)}></button>}
                </td>
            {/* <td>{prescriptionObject.id}</td> */}
            <td colSpan="5">{prescriptionObject.finishTime ? moment(prescriptionObject.finishTime).format("DD-MM-YYYY") : ""} - {prescriptionObject.patient ? prescriptionObject.patient.fullName : ''}</td>
            {/* <td>{prescriptionObject.user.fullName}</td> */}
            {/* <td>{prescriptionObject.icd ? prescriptionObject.icd.name : null}</td> */}
            {/* <td>
                <div>
                    <button className="btn btn-info" onClick={() => this.handleChooseAll(prescriptionObject.id)}> Dùng Lại</button>
                </div>
            </td> */}
        </tr>,
        modalDiagnosisReport].concat(isShowPrescriptionItem ? prescriptionData : null).concat(isShowPrescriptionItem ? [PrescriptionOlds, diagnosisReportOlds] : null)
        );
    }
}
export default translate('translations')(PrescriptionOld);