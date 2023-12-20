import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { ScriptUtils, FormatterUtils, DateUtils } from '../../utils/javascriptUtils';
import { connect } from 'react-redux';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import { Link } from 'react-router-dom';
import SecuredComponent from '../../components/SecuredComponent';
import ModalPatient from './ModalPatient';
import { DataPrintService } from '../DataPrintService';
import moment from 'moment';


const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
});
const mapDispatchToProps = dispatch => ({


});
class PatientList extends React.Component {
    constructor() {
        super();
        this.state = {
            listPatient: null,
            isPatientModalShown: false,
            objectpatient: null,
            idpatient: null
        }
        this.handleShowmodal = this.handleShowmodal.bind(this);
        this.handleHidemodal = () => {
            this.setState({ isPatientModalShown: false });
            this.updateListPatient();
        };




    };

    updateListPatient() {

        var search = qs.parse(this.props.location.search).search;
        var page = qs.parse(this.props.location.search).page;

        let setStateInRequest = (list) => { this.setState({ listPatient: list }) }
        return (agent.PatientApi.listPatient(search, page
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
        this.updateListPatient();
    };

    componentDidUpdate() {
        ScriptUtils.loadFootable();
    }
    //Delete Company Function
    deletePatient(id) {

        if (confirm("Bạn có chắc sẽ xoá!")) {
            var url = `/patient/${id}`;
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
            isPatientModalShown: true,
            idPatient: id
        });

    }


    render() {

        var search = qs.parse(this.props.location.search).search;
        const data = this.state.listPatient;
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
                    <td>
                        <SecuredComponent allowedPermission="admin.patient.goToProjectYear"><Link to={"/projectProgress/" + item.id}><i className="icon-arrow-right16"> </i></Link>
                        </SecuredComponent>
                        {" " + item.fullName}
                    </td>
                    <td>{item.gender}</td>
                    <td>{DateUtils.formatDateForScreen(item.birthday)}</td>
                    <td>{item.phone}</td>
                    <td>{item.address}</td>
                    <td>{DateUtils.formatDateForScreen(item.createdDate) }</td>
                    <td>{item.code}</td>
                    <td>{item.note}</td>
                    <td className="text-center footable-visible footable-last-column">
                        <ul className="icons-list">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="icon-menu9"></i>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-right">
                                    <li><a onClick={() => DataPrintService.handleGetListToPrintBarcode(item.code, item.fullName + " " + moment(item.birthday).year())}><i className="icon-printer"></i>In Barcode</a></li>

                                    <SecuredComponent allowedPermission="admin.patient.update">

                                        <li><a onClick={() => this.handleShowmodal(item.id)}><i className="icon-pencil"></i>Chỉnh Sửa</a></li>
                                    </SecuredComponent>
                                    {/* <SecuredComponent allowedPermission="admin.patient.delete">

                                        <li><a onClick={() => this.deletePatient(item.id)}><i className="icon-cross2"></i>Xóa</a></li>
                                    </SecuredComponent> */}

                                </ul>
                            </li>
                        </ul>
                    </td>
                </tr>);
        });

        var search = qs.parse(this.props.location.search).search;

        return (

            <div className="content-wrapper">
                <div className="page-header page-header-default">
                    <div className="breadcrumb-line">
                        <ul className="breadcrumb">
                            <li><a href=""><i className="icon-home2 position-left"></i> Home</a> </li>
                            <li className="active">Quản Lý Bệnh Nhân</li>
                            <li className="active">Danh Sách Bệnh Nhân</li>
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
                                        <input type="text" className="form-control input-xlg" placeholder="Tìm kiếm theo tên, mã bệnh nhân..." name="search" defaultValue={search} autoFocus={true} />
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
                                            <th data-toggle="true">Họ và Tên</th>
                                            <th data-toggle="true">Giới tính </th>
                                            <th data-hide="phone">Ngày sinh</th>
                                            <th data-hide="phone">Số điện thoại</th>
                                            <th data-hide="phone">Địa chỉ</th>
                                            <th data-hide="phone">Ngày tạo</th>
                                            <th data-hide="phone">Mã bệnh nhân</th>
                                            <th data-hide="phone">Ghi chú</th>
                                            <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows}
                                    </tbody>
                                </table>
                            </div>
                            {this.state.isPatientModalShown ? <ModalPatient
                                title={this.state.idPatient ? "Chỉnh Sửa Bệnh Nhân" : "Thêm Mới Bệnh Nhân"}
                                idPatient={this.state.idPatient}
                                show={this.state.isPatientModalShown}
                                onHide={this.handleHidemodal} /> : null}

                            <TablePagination data={data} baseUrl="/listPatient" />
                        </div>
                    </div>
                </div>

            </div>
        );
    }

}

export default translate('translations')(connect(mapStateToProps, mapDispatchToProps)(PatientList));