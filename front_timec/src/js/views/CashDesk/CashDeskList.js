import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { ScriptUtils } from '../../utils/javascriptUtils';
import { FormatterUtils } from '../../utils/javascriptUtils';
import { RenderDatePicker, RenderInputWithDiv, RenderSelect } from '../../components/formInputs';
import TablePagination from '../../components/TablePagination';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import agent from '../../services/agent';
import ModalCashDesk from './ModalCashDesk';
import moment from 'moment'
const validate = values => {
    const errors = {};
    // if(!values.fromDate){
    //     errors.fromDate = "Vui lòng nhập ngày bắt đầu..."
    // }
    // if(!values.toDate){
    //     errors.toDate = "Vui lòng nhập Ngày kết thúc..."
    // }
    if (moment(values.toDate) < moment(values.fromDate)) {
        errors.toDate = 'Ngày kết thúc nhỏ hơn ngày bắt đầu!, vui lòng thử lại!'
    }
    return errors;
}
const mapStateToProps = state => {
    // var updateValue = {
    //     toDate: new Date(),
    //     search: 'hihi'
    // };
    // return {
    //     initialValues: updateValue,
    // };
};

const mapDispatchToProps = dispatch => ({
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "CashDeskList", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});
class CashDeskList extends React.Component {
    constructor() {
        super();
        this.state = {
            listCashDesk: null,
            isCashDeskModalShown: false,
            objectcashDesk: null, 
            listAllUser: [],
            idCashDesk: ""
        }
        this.handleSearchForm = this.handleSearchForm.bind(this);
        this.handleShowmodal = this.handleShowmodal.bind(this);
        this.handleHidemodal = () => {
            this.setState({ isCashDeskModalShown: false });
            var startOfMonth = moment(new Date).startOf('month');
            var endOfMonth = moment(new Date).endOf('month');
            this.handleSearchForm({fromDate: startOfMonth, toDate: endOfMonth });
        };

    };
    handleShowmodal(id) {
        this.setState({
            isCashDeskModalShown: true,
            idCashDesk: id
        });
    }
  
    componentWillMount() {
        var startOfMonth = moment(new Date).startOf('month');
        var endOfMonth = moment(new Date).endOf('month');
        this.handleSearchForm({fromDate: startOfMonth, toDate: endOfMonth });
        const { updateField } = this.props;
        updateField("fromDate",startOfMonth);
        updateField("toDate",endOfMonth);
        updateField("cashierId",'ALL');
        updateField("isBalanced",'ALL');
        this.getlistAllPersonel();
    
        
    };
    
    handleSearchForm(values) {
        var fromDate = moment(values.fromDate).format("YYYY-MM-DD-HH:mm:ss");
        var toDate = moment(values.toDate).format("YYYY-MM-DD-HH:mm:ss");
     
        var isBalanced = values.isBalanced;
        if (!isBalanced) {
            isBalanced = 'ALL'
        }
        var cashierId = values.cashierId;
        if (!cashierId) {
            cashierId = 'ALL'
        }

        var page = qs.parse(this.props.location.search).page;
        if (!page) {
            page = 1;
        }


        let setStateInRequest = (list) => { this.setState({ listCashDesk: list }) }

        return agent.asyncRequests.getPage('/cashDesk/listFindByCashDesk?fromDate=' + fromDate + '&toDate=' + toDate
            + '&cashierId=' + cashierId + '&isBalanced=' + isBalanced, page
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
        })
    }
    getlistAllPersonel() {
        let setStateInRequest = (list) => { this.setState({ listAllUser: list }) }
        return agent.UserApi.listAllPersonel().then(function (res) {
            var result = res.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    }
    deleteCashDesk(id) {
        if (confirm("Bạn có chắc sẽ xoá !")) {
            var url = `/cashDesk/${id}`;
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
        const { handleSubmit, submitting } = this.props;
        var optionIsBalanced = [
            {label: "Tất Cả", value: "ALL"},
            { label: "Chưa Cân Bằng", value: "0" },
            { label: "Đã Cân Bằng", value: "1" }
        ];
        var optionUserPersonel = [{label: "Tất Cả", value: "ALL"}];
        this.state.listAllUser.map(item => {
            optionUserPersonel.push({ label: item.fullName, value: item.id })
        })
        var search = qs.parse(this.props.location.search).search;
        const data = this.state.listCashDesk;
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
                    <td>{item.cashier ? item.cashier.fullName : "N/A"}</td>
                    <td>{moment(item.openTime).format("DD/MM/YYYY HH:mm")}</td>
                    <td>{moment(item.closeTime).format("HH:mm DD/MM/YYYY ").replace("Invalid date", "Chưa Đóng Quầy")}</td>
                    <td>{FormatterUtils.formatCurrency(item.initialAmount)} VNĐ</td>
                    <td>{FormatterUtils.formatCurrency(item.closeAmount)} VNĐ</td>
                    <td>{FormatterUtils.formatCurrency(item.saleAmount)} VNĐ</td>
                    <td>{FormatterUtils.formatCurrency(item.withdrawalAmount)} VNĐ</td>
                    <td>{item.isBalanced ? <img src="assets/images/icon-check.png" width="18" height="18" /> : <img src="assets/images/icon-uncheck.png" width="18" height="18" />}</td>
                    <td>{item.note}</td>
                    <td className="text-center footable-visible footable-last-column">
                        <ul className="icons-list">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="icon-menu9"></i>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-right">
                                    <li><a onClick={() => this.handleShowmodal(item.id)}><i className="icon-pencil"></i>Chỉnh Sửa</a></li>
                                    {/* <li><a onClick={() => this.deleteCashDesk(item.id)}><i className="icon-cross2"></i>Xóa</a></li> */}
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
                        <li className="active">Thanh Toán</li>
                        <li className="active">Quầy Thu Ngân</li>
                    </ul>
                    <div className="heading-elements">
							{/* <div className="heading-btn-group">
                            <button className="btn bg-teal" onClick={() => this.handleShowmodal()}>Thêm Mới</button>
							</div> */}
						</div>
                </div>
            </div>
            <div className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div>
                                <form className="form-horizontal" role="form" onSubmit={handleSubmit(this.handleSearchForm)}>
                                    <div className="row">
                                        <div className="page-header"> </div>
                                    </div>
                                    <div className="row">
                                        <div className="col col-md-12">
                                            <div className="col col-md-4">
                                                <div className="col col-md-6" style={{ paddingLeft: "20px" }}>
                                                    <Field label="Từ Ngày" name="fromDate" component={RenderDatePicker}></Field>
                                                </div>
                                                <div className="col col-md-6" style={{ paddingLeft: "20px" }}>
                                                    <Field label="Đến Ngày" name="toDate" component={RenderDatePicker}></Field>
                                                </div>
                                            </div>
                                            <div className="col col-md-2">
                                                <Field name="cashierId" label="Thu Ngân" options={optionUserPersonel} component={RenderSelect}></Field>
                                            </div>
                                            <div className="col col-md-2" style={{ paddingLeft: "20px" }}>
                                                <Field name="isBalanced" label="Trạng Thái" options={optionIsBalanced} component={RenderSelect}></Field>
                                            </div>
                                            <div className="col col-md-1" style={{ paddingLeft: "10px", paddingTop: "30px" }}>
                                                <button type="submit" className="btn bg-success btn-xlg"> <i className="icon-search4"></i>Tìm</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="panel panel-flat">
                                <table className="table table-xxs table-bordered">
                                    <thead>
                                        <tr className="bg-teal">
                                            <th data-toggle="true">STT</th>
                                            <th data-toggle="true">Tên Người Thu Ngân</th>       
                                            <th data-toggle="true">Thời Gian Mở</th>      
                                            <th data-toggle="true">Thời Gian Đóng</th>   
                                            <th data-toggle="true">Số Tiền Ban Đầu</th>       
                                            <th data-toggle="true">Số Tiền Sau Khi Đóng</th>  
                                            <th data-toggle="true">Số Tiền Đã Bán</th>   
                                            <th data-toggle="true">Số Tiền Đã Rút</th>   
                                            <th data-toggle="true">Cân Bằng</th>  
                                            <th data-toggle="true">Ghi Chú  </th>                                   
                                            <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows}
                                    </tbody>
                                </table>
                            </div>
                            {this.state.isCashDeskModalShown ? <ModalCashDesk 
                                   title= {this.state.idCashDesk ? "Chỉnh Sửa Thu Ngân" : "Thêm Mới Thu Ngân"} 
                                idCashDesk={this.state.idCashDesk} 
                                show={this.state.isCashDeskModalShown} 
                                onHide={this.handleHidemodal} /> : null
                            }
                        </div>
                        <TablePagination data={data} baseUrl="/listCashDesk" />
                    </div>
                </div>
            </div>
            
        );
    }
}
export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'CashDeskList',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(CashDeskList)));