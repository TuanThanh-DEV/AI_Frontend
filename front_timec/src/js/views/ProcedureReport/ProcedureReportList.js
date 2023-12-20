import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { ScriptUtils } from '../../utils/javascriptUtils';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import ModalProcedureReport from './ModalProcedureReport';
import moment from 'moment';
import ProcedureReportMemberRow from './ProcedureReportMemberRow';
class ProcedureReportList extends React.Component {
    constructor() {
        super();
        this.state = {
            listProcedureReport: null,
            isProcedureReportModalShown: false,
            objectdrocedureReport: null,
            idProcedureReport: null
        }
        this.handleShowmodal = this.handleShowmodal.bind(this);
        this.handleHidemodal = () => {
            this.setState({ isProcedureReportModalShown: false });
            this.UpdateListProcedureReport();
        };

    };
    handleShowmodal(id) {
        this.setState({
            isProcedureReportModalShown: true,
            idProcedureReport: id
        });
    }
    UpdateListProcedureReport() {
        var search = qs.parse(this.props.location.search).search;
        var page = qs.parse(this.props.location.search).page;
        let setStateInRequest = (list) => { this.setState({ listProcedureReport: list }) }
        return agent.ProcedureReportApi.listProcedureReport(search, page
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
        this.UpdateListProcedureReport();

    };

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

    render() {
        const { t } = this.props;
        var search = qs.parse(this.props.location.search).search;
        const data = this.state.listProcedureReport;
        if (!data) {
            return null;
        }
        var currentNo = 0;
        var page = qs.parse(this.props.location.search).page;
        if (!page) {
            page = 1;
        }
        var currentNo = ((page - 1) * 20);
        var rows = data.content.map(item => {
            // currentNo++
            // var Delete = ""

            // var elementColor = ""
            // if (item.status == "OPEN") {
            //     elementColor = <td style={{ 'color': '#0040ff' }}>{t(item.status)}</td>;
            //     Delete = <li><a onClick={() => this.deleteProcedureReport(item.id)}><i className="icon-cross2"></i>Xóa</a></li>;
            // } else if (item.status == "IN_PROGRESS") {
            //     elementColor = <td style={{ 'color': '#ff0000' }}>{t(item.status)}</td>;
            // }
            // else if (item.status == "DONE") {
            //     elementColor = <td style={{ 'color': '#039296' }}>{t(item.status)}</td>;
            // } else {
            //     elementColor = <td style={{ 'color': '#777' }}>{t(item.status)}</td>;
            // }
            return (
                <ProcedureReportMemberRow
                    memberObj={item}
                    UpdateListProcedureReport={this.UpdateListProcedureReport}
                    onHide={this.handleHidemodal}
                ></ProcedureReportMemberRow>
            );
        });
        return (
            <div className="content-wrapper">
                <div className="page-header page-header-default">
                    <div className="breadcrumb-line">
                        <ul className="breadcrumb">
                            <li><a href=""><i className="icon-home2 position-left"></i> Home</a> </li>
                            <li className="active">Khám Bệnh</li>
                            <li className="active">Phiếu Thủ Thuật</li>
                        </ul>
                        <div className="heading-elements">
                            <div className="heading-btn-group">
                                {/* <button className="btn bg-teal" onClick={() => this.handleShowmodal()}>Thêm Mới</button> */}
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
                                            <th data-toggle="true">STT</th>
                                            <th data-toggle="true">Dịch Vụ Thủ Thuật</th>
                                            <th colSpan="2" data-toggle="true"><center>Mã Bệnh Án - Tên Bệnh nhân</center></th>
                                            <th data-toggle="true">Thời Gian Tiếp Nhận</th>
                                            <th data-toggle="true">Thời Gian Bắt Đầu</th>
                                            <th data-toggle="true">Thời Gian Hoàn Thành</th>
                                            <th data-toggle="true">Trạng Thái</th>

                                            <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows}
                                    </tbody>
                                </table>
                            </div>
                            {this.state.isProcedureReportModalShown ? <ModalProcedureReport
                                title="Phiếu Thủ Thuật"
                                idProcedureReport={this.state.idProcedureReport}
                                show={this.state.isProcedureReportModalShown}
                                onHide={this.handleHidemodal} 
                                isEditale = {true}
                                /> : null
                            }
                            <TablePagination data={data} baseUrl="/listProcedureReport" />
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
export default translate('translations')(ProcedureReportList);