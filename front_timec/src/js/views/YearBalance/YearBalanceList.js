import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { ScriptUtils } from '../../utils/javascriptUtils';
import { connect } from 'react-redux';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import { Link } from 'react-router-dom';
import SecuredComponent from '../../components/SecuredComponent';
import ModalYearBalance from './ModalYearBalance';
const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
});
const mapDispatchToProps = dispatch => ({

});
class YearBalanceList extends React.Component {
    constructor() {
        super();
        this.state = {
            listYearBalance: [],
            isYearBalanceModalShown: false,
            idYearBalance: null
        }
        this.handleShowmodal = this.handleShowmodal.bind(this);
        this.handleHidemodal = () => {
            this.setState({ isYearBalanceModalShown: false });
            this.updateListYearBalance();
        };
    };

    updateListYearBalance() {
        var search = qs.parse(this.props.location.search).search;
        var page = qs.parse(this.props.location.search).page;
        let setStateInRequest = (list) => { this.setState({ listYearBalance: list }) }
        return (agent.YearBalanceApi.listYearBalance(search, page
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
        this.updateListYearBalance();
    };

    componentDidUpdate() {
        ScriptUtils.loadFootable();
    }
    //Delete Company Function
    deleteYearBalance(id) {
        if (confirm("Bạn có chắc sẽ xoá!")) {
            var url = `/yearBalance/${id}`;
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
            isYearBalanceModalShown: true,
            idYearBalance: id
        });
    }
    render() {
        var search = qs.parse(this.props.location.search).search;
        const data = this.state.listYearBalance;
        if (!data) {
            return null;
        }
        var currentNo = 0;
        var page = qs.parse(this.props.location.search).page;
        if (!page) {
            page = 1;
        }
        var currentNo = ((page - 1) * 20);


        var rows = data && data.content? data.content.map(item => {
            currentNo++
            return (
                <tr key={item.id}>
                    <td>{currentNo}</td>
                    <td>{item.code}</td>
                    <td>{item.companyName}</td>
                    <td>{item.address}</td>
                    <td>{item.date}</td>
                    <td className="active-font" style={{ color: item.hasValidated == true ? 'green' : 'red' }}>{item.hasValidated ? "Đã Duyệt" : "Chưa Duyệt"}</td>
                    <td>{item.validatedBy? item.validatedBy.fullName : null}</td>
                    <td>{item.note}</td>
                    <td className="text-center footable-visible footable-last-column">
                        <ul className="icons-list">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="icon-menu9"></i>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-right">
                                    <SecuredComponent allowedPermission="admin.yearBalance.update">
                                        <li><a onClick={() => this.handleShowmodal(item.id)}><i className="icon-pencil"></i>Chỉnh Sửa</a></li>
                                    </SecuredComponent>
                                    <SecuredComponent allowedPermission="admin.yearBalance.delete">

                                        <li><a onClick={() => this.deleteYearBalance(item.id)}><i className="icon-cross2"></i>Xóa</a></li>
                                    </SecuredComponent>
                                    <SecuredComponent allowedPermission="admin.yearBalance.goToDetail">
                                   <li> <Link

														to={{
															pathname: '/listTrialBalance/'+item.id,
															state: {
																yearBalanceDto: item
															}
														}}

													><i className="icon-enter2"></i>Đến Chi Tiết</Link> </li>
                                    </SecuredComponent>

                                </ul>
                            </li>
                        </ul>
                    </td>
                </tr>);
        }):null;

        var search = qs.parse(this.props.location.search).search;

        return (

            <div className="content-wrapper">
                <div className="page-header page-header-default">
                    <div className="breadcrumb-line">
                        <ul className="breadcrumb">
                            <li><a href=""><i className="icon-home2 position-left"></i> Home</a> </li>
                            <li className="active">Danh Mục Kế Toán</li>
                            <li className="active">Bảng Cân Đối Kế Toán Theo Năm</li>
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
                                        <input type="text" className="form-control input-xlg" placeholder="Tìm kiếm theo mã số..." name="search" defaultValue={search} autoFocus={true} />
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
                                <table className="table table-togglable table-hover">
                                    <thead>
                                        <tr className="bg-teal">
                                        
                                            <th data-toggle="true">STT</th>
                                            <th data-toggle="true">Mã Số Báo Cáo</th>
                                            <th data-toggle="true">Tên Công Ty</th>
                                            <th data-toggle="true">Địa Chỉ</th>
                                            <th data-toggle="true">Ngày Tạo</th>
                                            
                                            <th data-toggle="true">Đã Duyệt ? </th>
                                            <th data-toggle="true">Duyệt Bởi</th>
                                            <th data-toggle="true">Ghi Chú</th>
                                            <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows}
                                    </tbody>
                                </table>
                            </div>
                            {this.state.isYearBalanceModalShown ? <ModalYearBalance
                                title={this.state.idYearBalance ? "Chỉnh Sửa Mã Số" : "Thêm Mới Mã Số"}
                                idYearBalance={this.state.idYearBalance}
                                show={this.state.isYearBalanceModalShown}
                                onHide={this.handleHidemodal} /> : null}

                            <TablePagination data={data} baseUrl="/listYearBalance" />
                        </div>
                    </div>
                </div>

            </div>
        );
    }

}

export default translate('translations')(connect(mapStateToProps, mapDispatchToProps)(YearBalanceList));