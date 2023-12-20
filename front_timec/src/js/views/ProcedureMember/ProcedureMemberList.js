import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { ScriptUtils } from '../../utils/javascriptUtils';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import ModalProcedureMember from './ModalProcedureMember';
import moment from 'moment';
class ProcedureMemberList extends React.Component {
    constructor() {
        super();
        this.state = {
            listProcedureMember: null,
            isProcedureMemberModalShown: false,
            objectdrocedureMember: null,
            idProcedureMember: ""
        }
        this.handleShowmodal = this.handleShowmodal.bind(this);
        this.handleHidemodal = () => {
            this.setState({ isProcedureMemberModalShown: false });
            this.UpdateListProcedureMember();
        };

    };
    handleShowmodal(id) {
        this.setState({
            isProcedureMemberModalShown: true,
            idProcedureMember: id
        });
    }
    UpdateListProcedureMember() {
        var search = qs.parse(this.props.location.search).search;
        var page = qs.parse(this.props.location.search).page;
        let setStateInRequest = (list) => { this.setState({ listProcedureMember: list }) }
        return agent.ProcedureMemberApi.listProcedureMember(search, page
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
    componentWillMount() {
        this.UpdateListProcedureMember();

    };

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

    render() {
        var search = qs.parse(this.props.location.search).search;
        const data = this.state.listProcedureMember;
        if (!data) {
            return null;
        }
        var currentNo = 0;
        var page = qs.parse(this.props.location.search).page;
        if (!page) {
            page = 1;
        }

        var currentNo = ((page - 1) * 20);
        let getProcedureGroup = (groupProcedure, procedureReportId) => {
            for (var i = 0; i < groupProcedure.length; i++) {
                if (groupProcedure[i].procedureReportId == procedureReportId) {
                    return groupProcedure[i];
                }
            }
            return null;
        }

        var groupRows = [];
        // [group1, group2, {procedureReportId, [proceduremember1, proceduremember2]}]
        data.content.map(item => {
            var getGroupProcedure = getProcedureGroup(groupRows, item.procedureReportId);
            if (!getGroupProcedure) {
                var groupObject = {
                    procedureReportId: item.procedureReportId,
                    procedureServiceName:
                        (item.procedureReport.prescription && item.procedureReport.prescription.patient ? item.procedureReport.prescription.id + " - " + item.procedureReport.prescription.patient.fullName : null) + " - "
                        + (item.procedureReport.procedureService ? item.procedureReport.procedureService.name : null),
                    listMember: [item]
                }
                groupRows.push(groupObject);
            } else {
                getGroupProcedure.listMember.push(item);
            }
        })
        var rows = groupRows.map(group => {
            var memberRows = group.listMember.map(item => {
                return <tr>
                    <td>{item.user ? item.user.fullName : null}</td>
                    <td>{item.role}</td>
                    <td className="text-center footable-visible footable-last-column">
                        <ul className="icons-list">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="icon-menu9"></i>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-right">
                                    <li><a onClick={() => this.handleShowmodal(item.id)}><i className="icon-pencil"></i>Chỉnh Sửa</a></li>
                                    <li><a onClick={() => this.deleteProcedureMember(item.id)}><i className="icon-cross2"></i>Xóa</a></li>
                                </ul>
                            </li>
                        </ul>
                    </td>

                </tr>
            });
            return [<tr>
                <td style={{ borderRight: '1px solid #ddd' }} rowSpan={group.listMember.length + 1}>{group.procedureServiceName}</td>
            </tr>].concat(memberRows)
        });
        return (
            <div className="content-wrapper">
                <div className="page-header page-header-default">
                    <div className="breadcrumb-line">
                        <ul className="breadcrumb">
                            <li><a href=""><i className="icon-home2 position-left"></i> Home</a> </li>
                            <li className="active">Khám Bệnh</li>
                            <li className="active">Thành Viên Tham Gia Thủ Thuật</li>
                        </ul>
                        <div className="heading-elements">
                            <div className="heading-btn-group">
                                <button className="btn bg-teal" onClick={() => this.handleShowmodal()}>Thêm Mới</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <form className="main-search" role="form">
                                <div className="input-group content-group">
                                    <div className="has-feedback has-feedback-left">
                                        <input type="text" className="form-control input-xlg" placeholder="Tìm kiếm theo tên phiếu thủ thuật.." name="search" defaultValue={search} autoFocus={true} />
                                        <div className="form-control-feedback">
                                            <i className="icon-search4 text-muted text-size-base"></i>
                                        </div>
                                    </div>
                                    <div className="input-group-btn">
                                        <button type="submit" className="btn bg-teal btn-xlg">Tìm</button>
                                    </div>
                                </div>
                            </form>
                            <div className="panel panel-flat">
                                <table className="table table-xxs table-bordered">
                                    <thead>
                                        <tr className="bg-teal">
                                            <th style={{ width: '40%' }}>Phiếu Thủ Thuật ( Mã bệnh Án - Tên Bệnh Nhân - Tên Thủ Thuật )</th>
                                            <th style={{ width: '30%' }} data-toggle="true">Thành Viên Phẩu Thuật</th>
                                            <th style={{ width: '25%' }} data-toggle="true">Chức Vụ</th>
                                            <th style={{ width: '5%' }} className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows}
                                    </tbody>
                                </table>

                            </div>
                            {this.state.isProcedureMemberModalShown ? <ModalProcedureMember
                                title="Thành Viên Thủ Thuật"
                                idProcedureMember={this.state.idProcedureMember}
                                show={this.state.isProcedureMemberModalShown}
                                onHide={this.handleHidemodal} /> : null
                            }
                            <TablePagination data={data} baseUrl="/listProcedureMember" />
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
export default translate('translations')(ProcedureMemberList);