import React from 'react';
import { translate } from 'react-i18next';
import TabResultDR from './TabResultDR';
import TabResultPR from './TabResultPR';
import agent from '../../services/agent';
import moment from 'moment';
import { DateUtils } from '../../utils/javascriptUtils';

class TabResult extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listPrescription : null
        }
        this.getListPrescriptionInProgress = this.getListPrescriptionInProgress.bind(this);
    }
    getListPrescriptionInProgress(){
        var currentUser = this.props.currentUser;
            let setStateInRequest = (list) => this.setState({
                listPrescription: list
            });
            return agent.asyncRequests.get('/prescriptionEdit/findByInProgressAndDiagnosisDone?doctorId='+ currentUser.id
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
    componentWillMount() {
        var currentUser = this.props.currentUser;
        if(currentUser){
            this.getListPrescriptionInProgress();
        }
    }
    
render() {
    const {currentUser, patientIdSelector, t} = this.props;
    const listPrescription = this.state.listPrescription;
        if(listPrescription){
            var row = listPrescription.map(item =>{
                var yearOld= null;
                var patientCodeShow = null;
                var patientCode = (item.patient? item.patient.code : null);
                // if(item.patient.code.length > 8){
                //     patientCodeShow = patientCode + "...";
                // }else{
                    patientCodeShow = patientCode;
                // }
                if(item.patient){
                    yearOld = DateUtils.formatDateForScreen(item.patient.birthday);
                }
                return (<tr key={item.id}>
                            <td width={"10%"}>{item.queueNumber ? item.queueNumber.theNumber : null}</td>
                            <td width={"20%"}><td width={"20%"}>{patientCodeShow}</td></td>
                            <td width={"40%"}>{item.patient? item.patient.fullName : null}</td>
                            <td width={"10"}>{yearOld}</td>
                            <td width={"20%"}style={{textAlign:"center"}}>
                            <a style={{color:"#fff"}} href={"/editPrescription/" + item.id}><button className="btn btn-info"  >Mời</button></a>
                            </td>
                        </tr>)
            })
        }
        return  <div className="tab-pane" id="default-justified-tab13">
                    {/* <div className="panel panel-flat">
                        <div className="tabbable">
                            <ul className="nav nav-tabs nav-tabs-solid nav-tabs-component" style={{display:"flex", marginBottom:"0"}}>
                                <li className="active" style={{flexGrow:"1"}}>
                                    <a href="#default-justified-tab131" data-toggle="tab"> Chỉ Định </a>
                                </li>
                                <li style={{flexGrow:"1"}}>
                                    <a href="#default-justified-tab132" data-toggle="tab">Thủ Thuật</a>
                                </li>
                            </ul>
                            <div className="tab-content">
                                 {patientIdSelector || currentUser ?
                                    [<TabResultDR
                                        currentUser={currentUser} 
                                        fillDataFromQueueNumberToPresciption ={(id) => this.fillDataFromQueueNumberToPresciption(id)}
                                    ></TabResultDR>,

                                    <TabResultPR currentUser = {currentUser}
                                    patientIdSelector= {patientIdSelector}
                                    // fillDataFromQueueNumberToPresciption ={(id) => this.fillDataFromQueueNumberToPresciption(id)}
                                    ></TabResultPR>
                                ]: null}
                                
                            </div>
                        </div>
                    </div> */}
                    <table className="table table-xxs table-bordered">  
                        <thead>
                            <tr className="bg-teal">
                                <th width={"10%"}>Số Hàng Đợi</th>
                                <th width={"20%"} >Mã Y Tế</th>
                                <th width={"40%"} >Tên Bệnh Nhân</th>
                                <th width={"10%"} >Ngày Sinh</th>
                                <th width={"20%"} className="text-center footable-visible footable-last-column"><i className="icon-menu-open2"></i></th>
                            </tr>
                        </thead>
                        <tbody>
                            {row}
                        </tbody>
                    </table>
                </div>
    }
}


export default translate('translations')(TabResult);