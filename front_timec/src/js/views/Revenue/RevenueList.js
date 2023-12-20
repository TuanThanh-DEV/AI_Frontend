
import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { ScriptUtils } from '../../utils/javascriptUtils';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import moment from 'moment';

// var today = moment(new Date, "YYYY-MM-DD");

class RevenueList extends React.Component {
    constructor() {
        super();
        this.state = {
        }
    };

    componentWillMount() {
    };

    render() {
        
        return (
            <div className="content-wrapper">
            <div className="page-header page-header-default">
                <div className="breadcrumb-line">
                    <ul className="breadcrumb">
                        <li><a href=""><i className="icon-home2 position-left"></i> Home</a> </li>
                        <li className="active">Quản Lý Hệ Thống</li>
                        <li className="active">Chuyên Khoa</li>
                    </ul>
                </div>
            </div>
            <div className="content">
                <div className="row">                    
                        <div className="col-md-12">   
                        <form className="main-search" role="form">
                                        <div className="input-group content-group">
                                            <div className="has-feedback has-feedback-left">
                                                <input type="text" className="form-control input-xlg" placeholder="Tìm kiếm chuyên khoa..." name="search"/>
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
                                <table style={{fontSize:"12px"}} className="table table-xxs table-bordered">
                                    <thead>
                                        <tr className="bg-teal">
                                            <th data-toggle="true">STT</th>
                                            <th data-toggle="true">Tên Chuyên Khoa</th>
                                            <th data-toggle="true">Mô tả Chuyên Khoa</th>   
                                            <th data-toggle="true">Thuộc Phòng Khám</th>   
                                            <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* {rows} */}
                                    </tbody>
                                </table>
                            </div>
                        </div>       
                        {/* <TablePagination data={data} baseUrl="/listRevenue" />                 */}
                    </div>
                </div>
            </div>
            
        );
    }
}
export default translate('translations')(RevenueList);