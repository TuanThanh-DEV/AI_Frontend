import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import ModalHospital from './ModalHospital';
import HospitalDepartmentRows from './HospitalDepartmentRows';

class HospitalList extends React.Component {
    constructor() {
        super();
        this.state = {
            listHospital: null,
            isHospitalModalShown: false,
            idHospital: null,
            isShowDepartmentRows:false,
            listDepartment: []
        }
        this.handleShowmodal = this.handleShowmodal.bind(this);
        this.handleHidemodal = () => {
            this.setState({ isHospitalModalShown: false });
            this.UpdateListHospital();
        };
    };

    handleShowmodal(id) {
        this.setState({ isHospitalModalShown: true, idHospital: id });
    }

    UpdateListHospital(){
        var search = qs.parse(this.props.location.search).search;
        var page = qs.parse(this.props.location.search).page;
        let setStateInRequest = (list) => { this.setState({ listHospital: list }) }
        return agent.HospitalApi.listHospital(search, page
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
        this.UpdateListHospital();
    };

    deleteHospital(id) {
        if (confirm("Bạn có chắc sẽ xoá !")) {
            var url = `/hospital/${id}`;
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
        var isShowDepartmentRows = this.state.isShowDepartmentRows;
        const data = this.state.listHospital;
        const dataDepartment = this.state.listDepartment;
        if (!data) {
            return null; }
        var currentNo = 0;
        var page = qs.parse(this.props.location.search).page;
        if (!page) {
            page = 1; }
        var currentNo = ((page - 1) * 20);
        
        // Item bellow is hospital object
        var rows = data.content.map((item, index) => {
            currentNo++
          return ( 
              
             <HospitalDepartmentRows key={"hospital_"+item.id}  
             hospitalObject ={item}
             handleShowmodal={this.handleShowmodal}
             handleHidemodal = {this.handleHidemodal}
             UpdateListHospital = { this.UpdateListHospital}
             >
                  </HospitalDepartmentRows>
                );
        });
        return (
            <div className="content-wrapper">
            <div className="page-header page-header-default">
                <div className="breadcrumb-line">
                    <ul className="breadcrumb">
                        <li><a href=""><i className="icon-home2 position-left"></i> Home</a> </li>
                        <li className="active">Quản Lý Hệ Thống</li>
                        <li className="active">Phòng Khám</li>
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
                                                <input type="text" className="form-control input-xlg" placeholder="Tìm kiếm phòng khám..." name="search" defaultValue={search} autoFocus={true} />
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
                                            <th data-toggle="true">Mã Phòng Khám</th>   
                                            <th data-toggle="true">Tên Phòng Khám</th>   
                                            <th data-toggle="true">Trạng Thái</th>   
                                            <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows}
                                    </tbody>
                                </table>
                            </div>
                            {this.state.isHospitalModalShown ? <ModalHospital 
                                title= {this.state.idHospital ? "Chỉnh sửa Phòng Khám" : "Thêm Mới Phòng Khám"} 
                                idHospital={this.state.idHospital} 
                                show={this.state.isHospitalModalShown} 
                                onHide={this.handleHidemodal}
                                // handleShowmodal =  {this.handleShowmodal()}
                             /> : null
                            }
                        </div>       
                        <TablePagination data={data} baseUrl="/listHospital" />                
                    </div>
                </div>
            </div>
        );
    }
}
export default translate('translations')(HospitalList);

