import qs from 'query-string';
import React from 'react';
import { translate } from 'react-i18next';
import { toast } from 'react-toastify';
import ModalUploadExcelFile from '../../components/ModalUploadExcelFile';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import ModalDepartment from './ModalDepartment';

class DepartmentList extends React.Component {
    constructor() {
        super();
        this.state = {
            listDepartment: null,
            isDepartmentModalShown: false,
            idDepartment: null,
            isImportExcelShown:false,
            urlToImportExcel:null
        }
        this.handleShowmodal = this.handleShowmodal.bind(this);
        this.handleHidemodal = () => {
            this.setState({ isDepartmentModalShown: false,
             isImportExcelShown:false});
            this.UpdateListDepartment();
        };
        this.handleShowImportExcel=()=> {
            this.setState({
                urlToImportExcel: '/importDepartmentData',
                isImportExcelShown: true
            })
        }

    };
    handleShowmodal(id) {
        this.setState({
            isDepartmentModalShown: true,
            idDepartment: id
        });
    }
    UpdateListDepartment(){
        var search = qs.parse(this.props.location.search).search;
        var page = qs.parse(this.props.location.search).page;
        let setStateInRequest = (list) => { this.setState({ listDepartment: list }) }
        return agent.DepartmentApi.listDepartment(search, page
        ).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
            +" Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });

    }
    componentWillMount() {
        this.UpdateListDepartment();
        
    };

    deleteDepartment(id) {
        if (confirm("Bạn có chắc sẽ xoá !")) {
            var url = `/department/${id}`;
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
        const data = this.state.listDepartment;
        if (!data) {
            return null; }
        var currentNo = 0;
        var page = qs.parse(this.props.location.search).page;
        if (!page) {
            page = 1; }
        var currentNo = ((page - 1) * 20);
        var rows = data.content.map(item => {
            currentNo++
            return (
                <tr key={item.id}>
                    <td>{currentNo}</td>
                    <td>{item.departmentCode}</td>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.hospital ? item.hospital.name : "Chưa Có" }</td>
                    <td  className={item.hasActive ? "text-success" : "text-warning"}>{item.hasActive ? "Đang Hoạt Động" : "Vô Hiệu Hoá"}</td>
                    <td className="text-center footable-visible footable-last-column">
                        <ul className="icons-list">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="icon-menu9"></i>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-right">
                                    <li><a onClick={() => this.handleShowmodal(item.id)}><i className="icon-pencil"></i>Chỉnh Sửa</a></li>
                                    {/* <li><a onClick={() => this.deleteDepartment(item.id)}><i className="icon-cross2"></i>Xóa</a></li> */}
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
                        <li className="active">Quản Lý Hệ Thống</li>
                        <li className="active">Chuyên Khoa</li>
                    </ul>
                    <div className="heading-elements">
							<div className="heading-btn-group">
                            <button className="btn bg-teal" onClick={() => this.handleShowmodal()}>Thêm Mới</button>
                            <button className="btn bg-teal" onClick={() => this.handleShowImportExcel()}>Import Excel</button>
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
                                                <input type="text" className="form-control input-xlg" placeholder="Tìm kiếm chuyên khoa..." name="search" defaultValue={search} autoFocus={true} />
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
                                            <th data-toggle="true">Mã Chuyên Khoa</th>
                                            <th data-toggle="true">Tên Chuyên Khoa</th>
                                            <th data-toggle="true">Mô tả Chuyên Khoa</th>   
                                            <th data-toggle="true">Thuộc Phòng Khám</th>   
                                            <th data-toggle="true">Trạng Thái</th>  
                                            <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows}
                                    </tbody>
                                </table>
                            </div>
                            {this.state.isDepartmentModalShown ? <ModalDepartment 
                                title= {this.state.idDepartment ? "Chỉnh sửa Chuyên Khoa" : "Thêm Mới Chuyên Khoa"} 
                                idDepartment={this.state.idDepartment} 
                                show={this.state.isDepartmentModalShown} 
                                onHide={this.handleHidemodal} /> : null
                            }
                            {this.state.isImportExcelShown ? <ModalUploadExcelFile title={"Upload Excel"} urlToImportExcel={this.state.urlToImportExcel} show={this.state.isImportExcelShown} 
                                onHide={this.handleHidemodal}></ModalUploadExcelFile>: null}
                        </div>       
                        <TablePagination data={data} baseUrl="/listDepartment" />                
                    </div>
                </div>
            </div>
            
        );
    }
}
export default translate('translations')(DepartmentList);