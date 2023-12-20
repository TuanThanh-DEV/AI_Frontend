import React from 'react';
import { translate } from 'react-i18next';
import { toast } from 'react-toastify';
import agent from '../../services/agent';
import ModalConfigTable from './ModalConfigTable';

class ConfigTableList extends React.Component {
    constructor() {
        super();
        this.state = {
            listConfigTable: null,
            isConfigTableModalShown: false,
            objectconfigTable: null, 
            idConfigTable: ""
        }
        this.handleShowmodal = this.handleShowmodal.bind(this);
        this.handleHidemodal = () => {
            this.setState({ isConfigTableModalShown: false });
            this.UpdateListConfigTable();
        };

    };
    handleShowmodal(id) {
        this.setState({
            isConfigTableModalShown: true,
            idConfigTable: id
        });
    }
    UpdateListConfigTable(){
        let setStateInRequest = (list) => { this.setState({ listConfigTable: list }) }
        return agent.ConfigTableApi.getAllConfigTable(
        ).then(function (res) {
            var result = res.resultData;
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
        this.UpdateListConfigTable();
    };
    
    render() {
        const data = this.state.listConfigTable;
        if (!data) {
            return null; }
        var rows = data.map(item => {
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td style={{whiteSpace:'nowrap'}}>{item.configCode}</td>
                    <td>{item.configValue}</td>
                    <td>{item.updatedBy.fullName}</td>
                    <td>{item.description}</td>
                    <td className="text-center footable-visible footable-last-column">
                        <ul className="icons-list">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="icon-menu9"></i>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-right">
                                    <li><a onClick={() => this.handleShowmodal(item.id)}><i className="icon-pencil"></i>Chỉnh Sửa</a></li>
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
                        <li className="active">Số Thứ Tự</li>
                        <li className="active">Công Ty Khách Hàng</li>
                    </ul>
                </div>
            </div>
            <div class="content">
                <div class="row">                    
                        <div className="col-md-12">   
                            <div className="panel panel-flat">
                                <table className="table table-xxs table-bordered">
                                    <thead>
                                        <tr className="bg-teal">
                                            <th data-toggle="true">STT</th>
                                            <th data-toggle="true">Mã Phí</th>    
                                            <th data-toggle="true">Giá Phí</th>  
                                            <th data-toggle="true">Người Tạo</th>   
                                            <th data-toggle="true">Mô Tả</th>     
                                            <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows}
                                    </tbody>
                                </table>
                            </div>
                            {this.state.isConfigTableModalShown ? <ModalConfigTable 
                                title= {this.state.idConfigTable ? "Chỉnh Sửa Công Ty Khách Hàng" : "Thêm Mới Công Ty Khách Hàng"} 
                                idConfigTable={this.state.idConfigTable} 
                                show={this.state.isConfigTableModalShown} 
                                onHide={this.handleHidemodal} /> : null
                            }
                        </div>
                    </div>
                </div>
            </div>
            
        );
    }
}
export default translate('translations')(ConfigTableList);