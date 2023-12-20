
import React from 'react';
import { translate } from 'react-i18next';
import agent from '../../services/agent';
import moment from 'moment';
import { DateUtils } from '../../utils/javascriptUtils';

class TabMenuControll extends React.Component {
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
            return agent.asyncRequests.get('/prescriptionEdit/findByInProgress?doctorId='+ currentUser.id
            ).then(function (res) {
                var result = res.body.resultData;
                if (result) {
                    setStateInRequest(result);
                } else {
                    toast.info(res.body.errorMessage, { autoClose: 15000 });
                }
            }, function () {
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
    const listPrescription = this.state.listPrescription;
    var row = [];
        if(listPrescription){
            row = listPrescription.map(item =>{
                if(item.bhytPrescriptionId == null){
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
                    return (<tr key={"TabMenuControll_"+item.id}>
                                <td width={"10%"}>{item.queueNumber ? item.queueNumber.theNumber : null}</td>
                                <td width={"20%"}><td width={"20%"}>{patientCodeShow}</td></td>
                                <td width={"40%"}>{item.patient? item.patient.fullName : null}</td>
                                <td width={"10%"}>{yearOld}</td>
                                <td width={"20%"}style={{textAlign:"center"}}>
                                <a style={{color:"#fff"}} href={"/editPrescription/" + item.id}><button className="btn btn-info"  >Mời</button></a>
                                </td>
                            </tr>)
                }
            })
            
        }
        return  <div className="tab-pane active" id="default-justified-tab11">
                   
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


export default translate('translations')(TabMenuControll);