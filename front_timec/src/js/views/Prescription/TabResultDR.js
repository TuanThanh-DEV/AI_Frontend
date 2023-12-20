import React from 'react';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import agent from '../../services/agent';
import { Link } from 'react-router-dom';

class TabResultDR extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listWaitResultDiagnosisReport: null
        }
        this.getListWaitResultDiagnosisReport = this.getListWaitResultDiagnosisReport.bind(this);
        this.handleChooseAndNewPrescription = (idQueueNumber) => {
            if(idQueueNumber){
                if (confirm("Xác nhận mời bệnh nhânh!")){
                    const {onHide} = this.props;
                    var _this = this;
                    return agent.asyncRequests.get("/prescriptionEdit/createPrescriptionForChoose?idQueueNumber="+ idQueueNumber 
                    ).then(function (res) {
                        var result = res.body.resultData;
                        if (result) {
                            _this.props.fillDataFromQueueNumberToPresciption(result.id);
                            onHide();
                        } else {
                            toast.info('Đã hết "Hàng Đợi Thường"! Vui lòng tạo thêm "Hàng Đợi Thường" hoặc "Ngừng Nhận Bênh Nhân "', { autoClose: 15000 });
                        }
                    }, function (err) {
                        toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
                    });
                }else{
                    return null
                }
            }
        }
    }

    getListWaitResultDiagnosisReport(){
        var currentUser = this.props.currentUser;
        if(currentUser){
            let setStateInRequest = (list) => this.setState({
                listWaitResultDiagnosisReport: list
            });
            return agent.asyncRequests.get('/diagnosisReport/findAllByStatusDone?hospitalId='+currentUser.hospitalId
            ).then(function (res) {
                var result = res.body.resultData;
                if (result) {
                    setStateInRequest(result);
                } else {
                    toast.info(res.body.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
            });
        }
    }

    componentWillMount(){
        this.getListWaitResultDiagnosisReport();
    }
  
render() {

    const listWaitResultDiagnosisReport = this.state.listWaitResultDiagnosisReport;
    var row = null;
        if(listWaitResultDiagnosisReport){
            row =  listWaitResultDiagnosisReport.map(item =>{

                return (<tr key={item.id}>
                            <td>{item.prescription ? item.prescription.patient.fullName : null}</td>
                            <td>{item.diagnosisService ? item.diagnosisService.name : null}</td>
                            <td style={{padding:"0"}}>
                                        <button style={{marginRight:"0"}} className="btn btn-info" href={"/editPrescription/" + item.prescription.id}>Mời</button>
                                    {/* <div className="col-md-12">
                                        <button  style={{width:"100%"}} className="btn btn-warning" onClick={() => this.handleRemoveQueueNumber(item.id)} >Xoá</button>
                                    </div> */}
                            </td>
                        </tr>)
            })
        }


    return <div className="tab-pane active" id="default-justified-tab131">
                <table className="table table-xxs table-bordered">  
                    <thead>
                        <tr className="bg-teal">
                            <th width={"45%"} >Tên Bệnh Nhân</th>
                            <th width={"35%"} >Tên Chỉ Định</th>
                            <th width={"10%"} className="text-center footable-visible footable-last-column"><i className="icon-menu-open2"></i></th>

                        </tr>
                    </thead>
                    <tbody>
                        {row}
                    </tbody>
                </table>
            </div>
    }
}


export default translate('translations')(TabResultDR);