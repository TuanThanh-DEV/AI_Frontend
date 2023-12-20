import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { ScriptUtils } from '../../utils/javascriptUtils';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import ModalProcedureReport from './ModalProcedureReport';
import moment from 'moment';
import ModalProcedureMember from '../ProcedureMember/ModalProcedureMember';

class ProcedureReportMemberRow extends React.Component {
    constructor() {
        super();
        this.state = {
            listProcedureReport: null,
            isShowReportRows: false,
            listProcedureReport: [],
            memberObj: [],
            isShowModalOutputStock: false,
            idInvoice: null,
            stateFromRow : false
        }
        this.handleShowProcedureReport = this.handleShowProcedureReport.bind(this);
        this.getListProcedureReportId = this.getListProcedureReportId.bind(this);
        this.handleHidemodalMember = this.handleHidemodalMember.bind(this);
        this.handleHidemodal = () => {
            const { onHide } = this.props;
            this.setState({ isProcedureReportModalShown: false , stateFromRow : false });
            onHide();
        };

    };
    handleShowProcedureReport() {
        let isShowReportRows = this.state.isShowReportRows;
        isShowReportRows = !this.state.isShowReportRows;
        this.setState({ isShowReportRows: isShowReportRows })
        this.getListProcedureReportId();

    }
    handleHidemodalMember() {
        this.setState({ isProcedureMemberModalShown: false });
        this.getListProcedureReportId();
    };
    // handleHideProcedureReport() {
    //     this.setState({
    //         isProcedureReportModalShown: false,
    //         isProcedureMemberModalShown: false
    //     })
    // }

    handleShowmodal(id) {
        this.setState({
            isProcedureReportModalShown: true,
            idProcedureReport: id
        });

    }
    handleShowmodalMember(id) {
        const procedureReportId = this.props.memberObj.id;
        this.setState({
            isProcedureMemberModalShown: true,
            idProcedureMember: id,
            procedureReportId : procedureReportId,
            stateFromRow : true
        });

    }
    
    getListProcedureReportId() {
        const procedureReportId = this.props.memberObj.id;
        let setStateInRequest = (list) => { this.setState({ listProcedureReport: list }) }
        return (agent.asyncRequests.get("/procedureMember/listAllByProcedureReportId?procedureReportId=" + procedureReportId).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);

            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + res.body.errorMessage, {
                    autoClose: 15000
                });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", {
                autoClose: 15000
            });
        }))
    }
    deleteProcedureReport(id) {
        if (confirm("Bạn có chắc sẽ xoá !")) {
            var url = `/procedureReport/${id}`;
            return agent.asyncRequests.del(url
            ).then(function (res) {
                var result = res.body.resultData;
                if (result && !result.error) {
                    alert("Xoá Thành Công !");
                    window.location.reload(true);
                } else {
                    toast.error("Có lỗi khi xóa dữ liệu. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Không thể xóa dữ liệu đang được sử dụng từ màn hình khác! ", { autoClose: 15000 });
            });
        } else {

        }
    }
    deleteProcedureMember(id) {
        if (confirm("Bạn có chắc sẽ xoá !")) {
            var url = `/procedureMember/${id}`;
            return agent.asyncRequests.del(url
            ).then(function (res) {
                var result = res.body.resultData;
                if (result && !result.error) {
                    alert("Xoá Thành Công !");
                    window.location.reload(true);
                } else {
                    toast.error("Có lỗi khi xóa dữ liệu. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Không thể xóa dữ liệu đang được sử dụng từ màn hình khác! ", { autoClose: 15000 });
            });
        } else {
        }
    }
    componentWillMount() {

    };
    // /procedureMember/listAllByProcedureReportId?ProcedureReportId UpdateListProcedureReport
    render() {
        const { memberObj, t, onHide } = this.props;
        var isShowReportRows = this.state.isShowReportRows;
        var dataReport = this.state.listProcedureReport;
        var reportRows = [];
        var report = [];
        var reportCurrentNo = 0;
        var Delete = ""
        var DeleteMember = ""

        var elementColor = ""
        if (memberObj.status == "OPEN") {
            elementColor = <td style={{ 'color': '#0040ff' }}>{t(memberObj.status)}</td>;
            Delete = <li><a onClick={() => this.deleteProcedureReport(memberObj.id)}><i className="icon-cross2"></i>Xóa</a></li>;
            
        } else if (memberObj.status == "IN_PROGRESS") {
            elementColor = <td style={{ 'color': '#ff0000' }}>{t(memberObj.status)}</td>;
        }
        else if (memberObj.status == "DONE") {
            elementColor = <td style={{ 'color': '#039296' }}>{t(memberObj.status)}</td>;
        } else {
            elementColor = <td style={{ 'color': '#777' }}>{t(memberObj.status)}</td>;
        }
        // var elementTh = <th colSpan="1" data-toggle="true">STT</th>
        if (dataReport) {
            reportRows = dataReport.map(item => {
                if(memberObj.status == "OPEN" ){
                    DeleteMember = <li><a onClick={() => this.deleteProcedureMember(item.id)}><i className="icon-cross2"></i>Xóa</a></li>; 
                }
                reportCurrentNo++;
                return (
                    <tr key={"invoice_" + item.id}>
                        <td >{reportCurrentNo}</td>
                        <td colSpan="4" style={{ width: '50%' }}>{item.user.fullName}</td>
                        <td colSpan="3" style={{ width: '50%' }}>{item.role}</td>
                        <td className="text-center footable-visible footable-last-column">
                            <ul className="icons-list">
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                        <i className="icon-menu9"></i>
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-right">
                                        <li><a onClick={() => this.handleShowmodalMember(item.id)}><i className="icon-pencil"></i>Chỉnh Sửa</a></li>
                                        {DeleteMember}

                                    </ul>
                                </li>
                            </ul>
                        </td>
                    </tr>
                );
            })
            report = [<tr className="success">

                <th data-toggle="true">STT</th>
                <th colSpan="4" style={{ width: '50%' }} data-toggle="true">Tên bác sĩ</th>
                <th colSpan="3" style={{ width: '50%' }} data-toggle="true">Chức vụ </th>
                <th className="text-center footable-visible footable-last-column" ><i className="icon-menu-open2"></i></th>

            </tr>
            ].concat(isShowReportRows ? reportRows : null);
        }

        return (
            // currentNo++

            [<tr key={memberObj.id}>
                <td> {isShowReportRows ? <button className="bg-info-600 icon-dash" onClick={() => this.handleShowProcedureReport()}></button> :
                    <button className="bg-info-600 icon-plus22" onClick={() => this.handleShowProcedureReport(memberObj.id)}></button>}
                </td>
                {/* <td>{currentNo}</td> */}
                <td>{memberObj.procedureService.name}</td>
                <td>{memberObj.prescription.id}</td>
                <td>{memberObj.patient.fullName}</td>
                <td>{moment(memberObj.arriveTime).format("DD/MM/YYYY HH:mm")}</td>
                <td>{moment(memberObj.startTime).format("DD/MM/YYYY HH:mm")}</td>
                <td>{moment(memberObj.doneTime).format("DD/MM/YYYY HH:mm")}</td>
                {/* <td>{memberObj.note}</td> */}
                {elementColor}
                <td className="text-center footable-visible footable-last-column">
                    <ul className="icons-list">
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                <i className="icon-menu9"></i>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-right">
                                {/* <button className="btn bg-teal" onClick={() => this.handleShowmodalMember()}>Thêm Mới</button> */}
                                <li><a onClick={() => this.handleShowmodalMember()}><i className="icon-new"></i>Thêm Thành Viên Thủ Thuật</a></li>
                                <li><a onClick={() => this.handleShowmodal(memberObj.id)}><i className="icon-pencil"></i>Chỉnh Sửa</a></li>
                                {Delete}
                            </ul>
                        </li>
                    </ul>
                </td>



                {this.state.isProcedureReportModalShown ? <ModalProcedureReport
                    title="Phiếu Thủ Thuật"
                    idProcedureReport={this.state.idProcedureReport}
                    show={this.state.isProcedureReportModalShown}
                    UpdateListProcedureReport={this.props.UpdateListProcedureReport}
                    onHide={this.handleHidemodal} 
                    isEditale = {true}
                    /> : null
                }
                {this.state.isProcedureMemberModalShown ? <ModalProcedureMember
                    title="Thành Viên Thủ Thuật"
                    idProcedureMember={this.state.idProcedureMember}
                    show={this.state.isProcedureMemberModalShown}
                    onHide={(idProcedureMember) => this.handleHidemodalMember(idProcedureMember)}
                    idProcedureReport={memberObj.id}
                /> : null
                }
            </tr>].concat(isShowReportRows ? report : null)

        );
    }
}
export default translate('translations')(ProcedureReportMemberRow);