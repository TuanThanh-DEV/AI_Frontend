import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { ScriptUtils, FormatterUtils } from '../../utils/javascriptUtils';
import { connect } from 'react-redux';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import { Link } from 'react-router-dom';
import SecuredComponent from '../../components/SecuredComponent';
import ModalTrialBalance from './ModaTrialBalance'
const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
});
const mapDispatchToProps = dispatch => ({

});
class TrialBalanceList extends React.Component {
    constructor() {
        super();
        this.state = {
            listTrialBalance: [],
            isTrialBalanceModalShown: false,
            idTrialBalance: null
        }
        this.handleShowmodal = this.handleShowmodal.bind(this);
        this.handleHidemodal = () => {
            this.setState({ isTrialBalanceModalShown: false });
            this.updateListTrialBalance();
        };
    };

    updateListTrialBalance() {

        var yearBalanceDto = this.props.location.state.yearBalanceDto;
        var search = qs.parse(this.props.location.search).search;
        var page = qs.parse(this.props.location.search).page;
        let setStateInRequest = (list) => { this.setState({ listTrialBalance: list }) }
        return (agent.asyncRequests.get("/trialBalance/listFindByYearBalance?yearBalanceId="+yearBalanceDto.id, page
        ).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);

            }
            else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        }))
    }
    componentWillMount() {
        this.updateListTrialBalance();
    };

    componentDidUpdate() {
        ScriptUtils.loadFootable();
    }
    //Delete Company Function
    deleteTrialBalance(id) {
        if (confirm("Bạn có chắc sẽ xoá!")) {
            var url = `/trialBalance/${id}`;
            return agent.asyncRequests.del(url
            ).then(function (res) {
                var result = res.body.resultData;
                if (result && !result.error) {
                    alert("Xoá Thành Công! ");
                    window.location.reload(true);
                } else {
                    toast.error("Có lỗi khi xóa dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Không thể xóa dữ liệu đang được sử dụng từ màn hình khác! ", { autoClose: 15000 });
            });
        } else {
        }
    }

    handleShowmodal(id) {
        this.setState({
            isTrialBalanceModalShown: true,
            idTrialBalance: id
        });
    }
    render() {
        var search = qs.parse(this.props.location.search).search;
        var yearBalanceDto = this.props.location.state.yearBalanceDto;
        const data = this.state.listTrialBalance;
        if (!data) {
            return null;
        }
        var currentNo = 0;
        var page = qs.parse(this.props.location.search).page;
        if (!page) {
            page = 1;
        }
        var currentNo = ((page - 1) * 20);


        var rows = data.map(item => {
            currentNo++

            return (
                <tr key={item.id}>
                    <td>{currentNo}</td>
                    <td>{item.accountCode ? item.accountCode.code : "N/A"}</td>
                    <td>{item.accountCode ? item.accountCode.title : "N/A"}</td>
                    <td>{FormatterUtils.formatCurrency(item.beginYearAmount)}</td>
                    <td>{FormatterUtils.formatCurrency(item.endYearAmount)}</td>
                    <td>{item.note}</td>
                    {/* <td className="text-center footable-visible footable-last-column">
                        <ul className="icons-list">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="icon-menu9"></i>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-right">

                                    <SecuredComponent allowedPermission="admin.trialBalance.update">

                                        <li><a onClick={() => this.handleShowmodal(item.id)}><i className="icon-pencil"></i>Chỉnh Sửa</a></li>
                                    </SecuredComponent>
                                    <SecuredComponent allowedPermission="admin.trialBalance.delete">

                                        <li><a onClick={() => this.deleteTrialBalance(item.id)}><i className="icon-cross2"></i>Xóa</a></li>
                                    </SecuredComponent>

                                </ul>
                            </li>
                        </ul>
                    </td> */}
                </tr>);
        });

        var search = qs.parse(this.props.location.search).search;

        return (

            <div className="content-wrapper">
                <div className="page-header page-header-default">
                    <div className="breadcrumb-line">
                        <ul className="breadcrumb">
                            <li><a href=""><i className="icon-home2 position-left"></i> Home</a> </li>
                            <li className="active">Danh Mục Kế Toán</li>
                            <li className="active">Bản Cân Đối Kế Toán Chi Tiết</li>
                        </ul>
                        <div className="heading-elements">
                          
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="row">
                        <div className="col-md-12">
                        <div className="panel panel-flat">
                            <center ><h1>Bảng Cân Đối Kế Toán</h1>
                            <h3>({yearBalanceDto.date})</h3>
                            </center>
                            </div>
                          

                            <div className="panel panel-flat">
                                <table className="table table-togglable table-hover">
                                    <thead>
                                        <tr className="bg-teal">
                                            <th data-toggle="true">STT</th>
                                            <th data-toggle="true">Mã Số Kế Toán</th>
                                            <th data-toggle="true">Diễn giải</th>
                                            <th data-toggle="true">Số Đầu Kỳ</th>
                                            <th data-toggle="true">Số Cuối Kỳ</th>
                                            <th data-toggle="true">Ghi Chú</th>
                                            {/* <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows}
                                    </tbody>
                                </table>
                            </div>
                            {this.state.isTrialBalanceModalShown ? <ModalTrialBalance
                                title={this.state.idTrialBalance ? "Chỉnh Sửa Mã Số" : "Thêm Mới Mã Số"}
                                idTrialBalance={this.state.idTrialBalance}
                                show={this.state.isTrialBalanceModalShown}
                                onHide={this.handleHidemodal} /> : null}

                            {/* <TablePagination data={data} baseUrl="/listTrialBalance" /> */}
                        </div>
                    </div>
                </div>

            </div>
        );
    }

}

export default translate('translations')(connect(mapStateToProps, mapDispatchToProps)(TrialBalanceList));