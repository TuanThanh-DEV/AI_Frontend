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
import ModalDevice from './ModalDevice';
import ModalImportExcelFileForDevice from './ModalImportExcelFileForDevice';
import moment from 'moment'


const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
});
const mapDispatchToProps = dispatch => ({
  

});
class DeviceList extends React.Component {
    constructor() {
        super();
        this.state = {
            listDevice: null,
            isDeviceModalShown: false,
            objectdevice:null,
            iddevice: null,
            isShowModalImportDeviceFile : false
        }
        this.handleShowmodal = this.handleShowmodal.bind(this);
        this.handleHidemodal = () => {
            this.setState({ isDeviceModalShown: false, isShowModalImportDeviceFile : false });
            this.updateListDevice();
        };
        this.handleImportDeviceFile = () =>{
            this.setState({ isShowModalImportDeviceFile: true });
        }




    };

    updateListDevice() {

        var search = qs.parse(this.props.location.search).search;
        var page = qs.parse(this.props.location.search).page;

        let setStateInRequest = (list) => { this.setState({ listDevice: list }) }
        return (agent.DeviceApi.listDevice(search, page
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
        this.updateListDevice();
    };

    componentDidUpdate() {
        ScriptUtils.loadFootable();
    }
    //Delete Company Function
    deleteDevice(id) {

       if (confirm("Bạn có chắc sẽ xoá!")) {
            var url = `/device/${id}`;
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
            isDeviceModalShown: true,
            idDevice: id
        });

    }


    render() {
        
        var search=qs.parse(this.props.location.search).search;
        const data = this.state.listDevice;
        if(!data)
        {
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
        
                    <td>{item.code}</td>
                    <td>{item.name}</td>
                    <td>{item.deviceCategory}</td>
                    <td>{item.madeIn}</td>
                    <td>{item.supplier?item.supplier.name:null}</td>
                    <td>{moment(item.userDate).format("DD/MM/YYYY")}</td>
                    <td>{moment(item.expiredDate).format("DD/MM/YYYY")}</td>
                    <td>{item.maintenanceCycle}</td>
                   
                    <td className="text-center footable-visible footable-last-column">
                        <ul className="icons-list">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="icon-menu9"></i>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-right">

                                <SecuredComponent allowedPermission="admin.users.update">
                                   
                                   <li><a onClick={() => this.handleShowmodal(item.id)}><i className="icon-pencil"></i>Chỉnh Sửa</a></li>
                               </SecuredComponent>
                                    <SecuredComponent allowedPermission="admin.users.delete">
                                        
                                        <li><a onClick={() => this.deleteDevice(item.id)}><i className="icon-cross2"></i>Xóa</a></li> 
                                    </SecuredComponent>
                                    
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
                        <li className="active">Quản Lý Thiết Bị</li>
                        <li className="active">Thiết Bị</li>
                    </ul>
                    <div className="heading-elements">
                        <div className="heading-btn-group">
                            <button className="btn bg-teal" onClick={() => this.handleImportDeviceFile()}>Nhập Thiết Bị Theo File</button>
                    
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
                                <table className="table table-togglable table-hover">
                                    <thead>
                                        <tr className="bg-teal">
                                            <th data-toggle="true">STT</th>
                                            <th data-toggle="true"> Mã Thiết Bị</th>
                                            <th data-toggle="true">Tên Thiết Bị </th>
                                            <th data-hide="phone">Nhóm</th>
                                            <th data-hide="phone">Xuất Xứ</th>
                                            <th data-hide="phone">Nhà Cung Cấp</th>
                                            <th data-hide="phone">Ngày đưa vào sử dụng</th>
                                            <th data-hide="phone">Hạn Sử Dụng</th>
                                            <th data-hide="phone">Chu kỳ bảo dưỡng</th>
                                      <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows}
                                    </tbody>
                                </table>
                            </div>
                            {this.state.isDeviceModalShown ? <ModalDevice 
                             title= {this.state.idDevice ? "Chỉnh Sửa Thiết Bị"  : "Thêm Thiết Bị" } 
                            idDevice={this.state.idDevice} 
                            show={this.state.isDeviceModalShown} 
                            onHide={this.handleHidemodal} /> : null}

                                {this.state.isShowModalImportDeviceFile ? <ModalImportExcelFileForDevice title={" Excel"}  show={this.state.isShowModalImportDeviceFile} 
                                onHide={this.handleHidemodal}></ModalImportExcelFileForDevice>: null}

                            <TablePagination data={data} baseUrl="/listDevice" />
                        </div>
                    </div>
                </div>

            </div>
        );
    }

}

export default translate('translations')(connect(mapStateToProps, mapDispatchToProps)(DeviceList));