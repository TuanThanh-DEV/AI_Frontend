import React from 'react';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import agent from '../../services/agent';

class TabWaitResulitPR extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listWaitResulitProcedureReport: null
        }
        this.getListWaitResulitProcedureReport = this.getListWaitResulitProcedureReport.bind(this);
    }

        getListWaitResulitProcedureReport(){
            var currentUser = this.props.currentUser;
            if(currentUser){
                let setStateInRequest = (list) => this.setState({
                    listWaitResulitProcedureReport: list
                });
                return agent.asyncRequests.get('/procedureReport/listFindByStausInProgress?hospitalId='+currentUser.hospitalId
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
        this.getListWaitResulitProcedureReport();
    }
    
    render() {
        const listWaitResulitProcedureReport = this.state.listWaitResulitProcedureReport;
        var row = null;
            if(listWaitResulitProcedureReport){
                row =  listWaitResulitProcedureReport.map(item =>{

                    return (<tr key={item.id} className={item.status == "OPEN" ? "" : "bg-success text-white"}>
                                <td>{item.prescription ? item.prescription.patient.fullName : null}</td>
                                <td>{item.procedureService ? item.procedureService.name : null}</td>
                                <td>{item.status}</td>
                            </tr>)
                })
            }
            return <div className="tab-pane" id="default-justified-tab8">
                        <table className="table table-xxs table-bordered">  
                        <thead>
                        <tr className="bg-teal">
                            <th width={"35%"} >Tên Bệnh Nhân</th>
                            <th width={"35%"} >Tên Thủ Thuật</th>
                            <th width={"30%"} >Tiến Độ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {row}
                    </tbody>
                        </table>
                    </div>
    }
}


export default translate('translations')(TabWaitResulitPR);