import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { ScriptUtils } from '../../utils/javascriptUtils';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import ModalPrescriptionItem from './ModalPrescriptionItem';

class PrescriptionItemList extends React.Component {
    constructor() {
        super();
        this.state = {
            listList: null,
            isPrescriptionItemShown: false,
            objectPrescriptionItem: null,
            idPrescriptionItem: null,
            isPDFModalShown:false,
            PrescriptionItem:[],
        }
        this.handleShowmodal = this.handleShowmodal.bind(this);
        this.handleHidemodal = () => {
            this.setState({ isPrescriptionItemShown: false });
            this.UpdatePrescriptionItem();
        };
        this.handleHidemodalPDF = () => {
            this.setState({ isPDFModalShown: false , });
            this.UpdatePrescriptionItem();
        };

    };
    handleShowmodal(id) {
        this.setState({
            isPrescriptionItemShown: true,
            idPrescriptionItem: id
        });
    }

    handleShowPDFmodal(PrescriptionItem) {
        this.setState({
            isPDFModalShown: true,
            PrescriptionItem: PrescriptionItem
        });
    }
    UpdatePrescriptionItem() {
        var search = qs.parse(this.props.location.search).search;
        var page = qs.parse(this.props.location.search).page;
        if(!page){
            page = 1
        }

        let setStateInRequest = (list) => { this.setState({ listPrescriptionItem: list }) }
        return agent.PrescriptionItemApi.listPrescriptionItem(search, page
        ).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });

    }
    componentWillMount() {
        this.UpdatePrescriptionItem();

    };

    deletePrescriptionItem(id) {
        if (confirm("Bạn có chắc sẽ xoá !")) {
            var url = `/prescriptionItem/${id}`;
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
        const data = this.state.listPrescriptionItem;
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
                    <td>{item.prescription && item.prescription.patient ? item.prescription.patient.fullName : null}</td>
                    {/* <td>{item.prescription ? item.prescription.analysis : null}</td> */}
                    <td>{item.drug ? item.drug.name + " " + item.drug.hamLuongBHYT : null}</td>
                    <td>{item.morningAmount}</td>
                    <td>{item.noonAmount}</td>
                    <td>{item.afternoonAmount}</td>
                    <td>{item.eveningAmount}</td>
                    <td>{item.numberOfDays}</td>
                    <td>{item.totalAmount}</td>
                    <td>{item.instruction}</td>
                    <td className="text-center footable-visible footable-last-column">
                        <ul className="icons-list">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="icon-menu9"></i>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-right">
                                <li><a onClick={() => this.handleShowPDFmodal(item)}><i className="icon-pencil"></i>InPDF</a></li>
                                    <li><a onClick={() => this.handleShowmodal(item.id)}><i className="icon-pencil"></i>Chỉnh Sửa</a></li>
                                    <li><a onClick={() => this.deletePrescriptionItem(item.id)}><i className="icon-cross2"></i>Xóa</a></li>
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
                        <li className="active">Khám Bệnh</li>
                        <li className="active">Quản Lý Đơn Thuốc</li>
                    </ul>
                    <div className="heading-elements">
							<div className="heading-btn-group">
                            {/* <button className="btn bg-teal" onClick={() => this.handleShowmodal()}>Thêm Mới</button> */}
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
                                        <input type="text" className="form-control input-xlg" placeholder="Tìm kiếm ..." name="search" defaultValue={search} autoFocus={true} />
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
                                            <th data-toggle="true">Tên bệnh nhận</th>
                                            <th data-toggle="true">Tên thuốc</th>
                                            <th data-toggle="true">Buổi sáng</th>
                                            <th data-toggle="true">Buổi trưa</th>
                                            <th data-toggle="true">Buổi chiều</th>
                                            <th data-toggle="true">Buổi tối</th>
                                            <th data-toggle="true">Số ngày</th>
                                            <th data-toggle="true">Tổng cộng</th>
                                            <th data-toggle="true">Chỉ dẫn</th>
                                            <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows}
                                    </tbody>
                                </table>
                            </div>
                            {this.state.isPrescriptionItemShown ? <ModalPrescriptionItem
                                title="Chỉnh Sửa Toa Thuốc"
                                idPrescriptionItem={this.state.idPrescriptionItem}
                                show={this.state.isPrescriptionItemShown}
                                onHide={this.handleHidemodal} /> : null
                            }
                          
                        </div>
                        <TablePagination data={data} baseUrl="/listPrescriptionItem" />
                    </div>
                </div>
            </div>

        );
    }
}
export default translate('translations')(PrescriptionItemList);