import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { ScriptUtils, UrlUtils } from '../../utils/javascriptUtils';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import { Link } from 'react-router-dom';
import ModalPersonel from './ModalPersonel';
import SecuredComponent from '../../components/SecuredComponent';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
});

const mapDispatchToProps = dispatch => ({
});

class PersonelList extends React.Component {
    constructor() {
        super();
        this.state = {
            listPersonel: null,
            isPersonelModalShown: false,
        }
        this.handleShowmodal = this.handleShowmodal.bind(this);
        this.handleHidemodal = () => {
            this.setState({ isPersonelModalShown: false });
            this.updateListPersonel();
        };
    };

    updateListPersonel() {
        var search = qs.parse(this.props.location.search).search;
        search = search ? search : "";
        var page = qs.parse(this.props.location.search).page;
        let setStateInRequest = (list) => { this.setState({ listPersonel: list }) }
        return agent.asyncRequests.getPage('/user/findByFullNameOrPhoneOrEmail?fullNameOrPhoneOrEmail=' + search, page
        ).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    }
  
    componentWillMount() {
        var search = qs.parse(this.props.location.search).search;
        search = search ? search : "";
        var page = qs.parse(this.props.location.search).page;
        
        let setStateInRequest = (list) => { this.setState({ listPersonel: list }) }
        return agent.asyncRequests.getPage('/user/findByFullNameOrPhoneOrEmail?fullNameOrPhoneOrEmail=' + search,page
        ).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    };

    componentDidUpdate() {
        ScriptUtils.loadFootable();
    }
    //Delete Personel Function
    deletePersonel(id, fullName) {

        if (confirm("Bạn có chắc sẽ xoá Nhân Viên: " + "'" + fullName + "'")) {
            var url = `/user/${id}`;
            return agent.asyncRequests.del(url
            ).then(function (res) {
                var result = res.body.resultData;
                if (result && !result.error) {
                    toast.info("Xoá Thành Công Nhân Viên: " + fullName, {autoClose: 2000});
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
            
            isPersonelModalShown: true,
            idUser: id
        });

    }
    render() {
        var baseUrl = UrlUtils.getPathWithParamsNotPaging()
        const data = this.state.listPersonel;
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
            currentNo++
            return (
                <tr key={item.id}>
                    <td>{currentNo}</td>
                   
                    <td style={{whiteSpace:'nowrap'}}><a onClick={() => this.handleShowmodal(item.id)}>{item.code} || {item.fullName}</a></td>
                    <td>{item.email}
                    </td>
                    {/* <td style={{whiteSpace:'nowrap'}} >{item.code} || {item.fullName}</td> */}
                    <td>{item.roles.map(role=>{
                        return role.name 
                    })}</td>
                    <td>{item.currentAddress}</td>
                    <td>{item.position}</td>
                    <td>{item.phone}</td>
                    <td className="active-font" target={item.active ? "Đang Hoạt Động" : "Vô Hiệu Hoá"}>{item.active ? "Đang Hoạt Động" : "Vô Hiệu Hoá"}</td>
                    <td className="text-center footable-visible footable-last-column">
                        <ul className="icons-list">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="icon-menu9"></i>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-right">
                                    <SecuredComponent allowedPermission="admin.users.update">
                                        <li><a onClick={() => this.handleShowmodal(item.id)}><i className="icon-pencil"></i>Sửa</a></li>
                                    </SecuredComponent>
                                    <SecuredComponent allowedPermission="admin.users.delete">
                                        <li><a onClick={() => this.deletePersonel(item.id, item.fullName)}><i className="icon-cross2"></i>Xóa</a></li>
                                    </SecuredComponent>

                                </ul>
                            </li>
                        </ul>
                    </td>
                </tr>);
        });

        return (
            <div className="content-wrapper">
            <div className="page-header page-header-default">
                <div className="breadcrumb-line">
                    <ul className="breadcrumb">
                        <li><a href=""><i className="icon-home2 position-left"></i> Home</a> </li>
                        <li className="active">Quản Lý Nhân Sự</li>
                        <li className="active">Danh Sách Nhân Viên  </li>
                    </ul>
                    <ul className="breadcrumb-elements">
                        <li><button className="btn bg-teal" onClick={() => this.handleShowmodal()}>Thêm Mới</button></li>
                    </ul>
                </div>
            </div>
            <div className="content">
                <div className="row">                    
                        <div className="col-md-12">   
                        <form className="main-search" role="form">
                                        <div className="input-group content-group">
                                            <div className="has-feedback has-feedback-left">
                                            <input type="text" className="form-control input-xlg" placeholder="Tìm kiếm theo: Tên nhân viên, Số điện thoại, Email..." name="search" autoFocus={true} />
                                                <div className="form-control-feedback">
                                                    <i className="icon-search4 text-muted text-size-base"></i>
                                                </div>
                                            </div>
                                            <div className="input-group-btn">
                                                <button type="submit" className="btn bg-teal btn-xlg">Tìm</button>
                                            </div>
                                        </div>
                                    </form>                 
                            {this.state.isPersonelModalShown ? <ModalPersonel title="Nhân Viên" idUser={this.state.idUser} show={this.state.isPersonelModalShown} onHide={this.handleHidemodal} /> : null}
                            <div className="panel panel-flat">
                                <table style={{textAlign: 'center'}} className="table table-togglable table-xxs">
                                    <thead>
                                        <tr className="bg-teal">
                                            <th data-toggle="true">STT</th>
                                            {/* <th data-hide="phone">Hình Ảnh</th> */}
                                            <th data-hide="phone"><center>Mã Nhân Viên & Họ Tên</center></th>
                                            <th data-toggle="true"><center>Email</center></th>
                                            <th data-hide="phone"><center>Quyền Hệ Thống</center></th>
                                            <th data-hide="phone"><center>Địa chỉ</center></th>
                                            <th data-hide="phone"><center>Chức Vụ </center></th>
                                            <th data-hide="phone"><center>Điện thoại</center></th>
                                            <th data-hide="phone"><center>Trạng Thái</center></th>
                                            <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                        </tr>
                                        
                                    </thead>
                                    <tbody>
                                        {rows}
                                    </tbody>
                                   
                                </table>
                            </div>
                            <TablePagination data={data} baseUrl={baseUrl} />
                        </div>
                    </div>
                </div>

            </div>
        );
    }

}

export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(PersonelList));