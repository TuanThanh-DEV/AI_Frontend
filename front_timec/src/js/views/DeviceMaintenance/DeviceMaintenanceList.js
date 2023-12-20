import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { ScriptUtils } from '../../utils/javascriptUtils';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import ModalDeviceMaintenance from './ModalDeviceMaintenance';
import moment from 'moment'

class DeviceMaintenanceList extends React.Component {
    constructor() {
        super();
        this.state = {
            listDeviceMaintenance: null,
            isDeviceMaintenanceModalShown: false,
            objectdeviceMaintenance: null, 
            idDeviceMaintenance: ""
        }
        this.handleShowmodal = this.handleShowmodal.bind(this);
        this.handleHidemodal = () => {
            this.setState({ isDeviceMaintenanceModalShown: false });
            this.UpdateListDeviceMaintenance();
        };

    };
    handleShowmodal(id) {
        this.setState({
            isDeviceMaintenanceModalShown: true,
            idDeviceMaintenance: id
        });
    }
    UpdateListDeviceMaintenance(){
        var search = qs.parse(this.props.location.search).search;
        var page = qs.parse(this.props.location.search).page;
        let setStateInRequest = (list) => { this.setState({ listDeviceMaintenance: list }) }
        return agent.DeviceMaintenanceApi.listDeviceMaintenance(search, page
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
        this.UpdateListDeviceMaintenance();
        
    };

    deleteDeviceMaintenance(id) {
        if (confirm("Bạn có chắc sẽ xoá !")) {
            var url = `/deviceMaintenance/${id}`;
            return agent.asyncRequests.del(url
            ).then(function (res) {
                var result = res.body.resultData;
                if (result && !result.error) {
                    toast.success("Xóa Thành Công", { autoClose: 5000, position: toast.POSITION.TOP_RIGHT});
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
        const data = this.state.listDeviceMaintenance;
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
                    <td>{item.device.name}</td>
                    <td>{moment(item.maintenanceDate).format("DD/MM/YYYY HH:mm")}</td>
                    <td>{item.cost ? item.cost  : "0"} VNĐ</td>
                    <td>{item.note}</td>
                    <td className="text-center footable-visible footable-last-column">
                        <ul className="icons-list">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="icon-menu9"></i>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-right">
                                    <li><a onClick={() => this.handleShowmodal(item.id)}><i className="icon-pencil"></i>Chỉnh Sửa</a></li>
                                    <li><a onClick={() => this.deleteDeviceMaintenance(item.id)}><i className="icon-cross2"></i>Xóa</a></li>
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
                        <li className="active">Quản Lí Thiết Bị</li>
                        <li className="active">Bảo Trì Thiết Bị</li>
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
                                                <input type="text" className="form-control input-xlg" placeholder="Tìm kiếm theo tên thiết bị..." name="search" defaultValue={search} autoFocus={true} />
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
                                            <th data-toggle="true">Tên Thiết Bị</th>  
                                            <th data-toggle="true">Ngày Bảo Trì</th>    
                                            <th data-toggle="true">Giá Tiền</th>       
                                            <th data-toggle="true">Ghi Chú</th>         
                                            <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows}
                                    </tbody>
                                </table>
                            </div>
                            {this.state.isDeviceMaintenanceModalShown ? <ModalDeviceMaintenance 
                                   title= {this.state.idDeviceMaintenance ? "Chỉnh Sửa Bảo Trì Thiết Bị" : "Thêm Mới Bảo Trì Thiết Bị"} 
                                idDeviceMaintenance={this.state.idDeviceMaintenance} 
                                show={this.state.isDeviceMaintenanceModalShown} 
                                onHide={this.handleHidemodal} /> : null
                            }
                        </div>
                        <TablePagination data={data} baseUrl="/listDeviceMaintenance" />
                    </div>
                </div>
            </div>
            
        );
    }
}
export default translate('translations')(DeviceMaintenanceList);