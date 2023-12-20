import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { ScriptUtils } from '../../utils/javascriptUtils';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import ModalInsuranceCard from './ModalInsuranceCard';
import moment from 'moment';

class InsuranceCardList extends React.Component {
    constructor() {
        super();
        this.state = {
            listInsuranceCard: null,
            isInsuranceCardModalShown: false,
            idInsuranceCard: ""
        }
        this.handleShowmodal = this.handleShowmodal.bind(this);
        this.handleHidemodal = () => {
            this.setState({ isInsuranceCardModalShown: false });
            this.UpdateListInsuranceCard();
        };

    };
    handleShowmodal(id) {
        this.setState({
            isInsuranceCardModalShown: true,
            idInsuranceCard: id
        });
    }
    UpdateListInsuranceCard(){
        var search = qs.parse(this.props.location.search).search;
        var page = qs.parse(this.props.location.search).page;
        let setStateInRequest = (list) => { this.setState({ listInsuranceCard: list }) }
        return agent.InsuranceCardApi.listInsuranceCard(search, page
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
        this.UpdateListInsuranceCard();
        
    };

    deleteInsuranceCard(id) {
        if (confirm("Bạn có chắc sẽ xoá !")) {
            var url = `/insuranceCard/${id}`;
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
        const data = this.state.listInsuranceCard;
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
                    <td>{item.insuranceCode}</td>
                    <td>{item.patient ? item.patient.fullName : "Chưa Có" }</td>
                    <td>{item.insuranceType ? item.insuranceType.name : "Chưa Có" }</td>
                    <td className="text-center">{moment(item.fromDate).format("DD/MM/YYYY")}</td>
                    <td className="text-center">{moment(item.toDate).format("DD/MM/YYYY")}</td>
                    <td className="text-center footable-visible footable-last-column">
                        <ul className="icons-list">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="icon-menu9"></i>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-right">
                                    <li><a onClick={() => this.handleShowmodal(item.id)}><i className="icon-pencil"></i>Chỉnh Sửa</a></li>
                                    <li><a onClick={() => this.deleteInsuranceCard(item.id)}><i className="icon-cross2"></i>Xóa</a></li>
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
                        <li className="active">Bảo Hiểm Y Tế</li>
                        <li className="active">Thẻ Bảo Hiểm Bệnh Nhân</li>
                    </ul>
                    <div className="heading-elements">
							<div className="heading-btn-group">
                            <button className="btn bg-teal" onClick={() => this.handleShowmodal()}>Thêm Mới</button>
							</div>
						</div>
                </div>
            </div>
            <div class="content">
                <div class="row">                    
                        <div className="col-md-12">   
                        <form className="main-search" role="form">
                                        <div className="input-group content-group">
                                            <div className="has-feedback has-feedback-left">
                                                <input type="text" className="form-control input-xlg" placeholder="Tìm kiếm theo: Mã thẻ Bảo Hiểm, Tên Bệnh Nhân..." name="search" defaultValue={search} autoFocus={true} />
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
                                            <th rowSpan="2" data-toggle="true">STT</th>
                                            <th rowSpan="2" data-toggle="true">Mã Thẻ Bảo Hiểm</th>
                                            <th rowSpan="2" data-toggle="true">Tên Bệnh Nhân</th>   
                                            <th rowSpan="2" data-toggle="true">Loại Bảo Hiểm</th>  
                                            <th colSpan="2" className="text-center" data-toggle="true">Thời Hạn Bảo Hiểm </th>
                                            <th rowSpan="2" className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                        </tr>
                                        <tr className="bg-teal">
                                            <th className="text-center" data-toggle="true">Từ Ngày</th> 
                                            <th className="text-center" data-toggle="true">Đến Ngày</th>  
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows}
                                    </tbody>
                                </table>
                            </div>
                            {this.state.isInsuranceCardModalShown ? <ModalInsuranceCard 
                                title= {this.state.idInsuranceCard ? "Chỉnh sửa Thẻ Bảo Hiểm" : "Thêm Mới Thẻ Bảo Hiểm"} 
                                idInsuranceCard={this.state.idInsuranceCard} 
                                show={this.state.isInsuranceCardModalShown} 
                                onHide={this.handleHidemodal} /> : null
                            }
                        </div>       
                        <TablePagination data={data} baseUrl="/listInsuranceCard" />                
                    </div>
                </div>
            </div>
            
        );
    }
}
export default translate('translations')(InsuranceCardList);