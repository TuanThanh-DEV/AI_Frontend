import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { ScriptUtils } from '../../utils/javascriptUtils';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { FormatterUtils } from '../../utils/javascriptUtils';
import { RenderDatePicker, RenderInputWithDiv, RenderSelect } from '../../components/formInputs';
import ModalCashWidrawal from './ModalCashWidrawal';
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
            meta: { form: "CashWidrawalList", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});

class CashWidrawalList extends React.Component {
    constructor() {
        super();
        this.state = {
            listCashWidrawal: null,
            isCashWidrawalModalShown: false,
            objectcashWidrawal: null, 
            listAllUser: [],
            idCashWidrawal: ""
        }
        this.handleShowmodal = this.handleShowmodal.bind(this);
        this.handleSearchForm = this.handleSearchForm.bind(this);
        this.handleHidemodal = () => {
            this.setState({ isCashWidrawalModalShown: false });
            var startOfMonth = moment(new Date).startOf('month');
            var endOfMonth = moment(new Date).endOf('month');
            this.handleSearchForm({fromDate: startOfMonth, toDate: endOfMonth });
        };

    };  
    handleShowmodal(id) {
        this.setState({
            isCashWidrawalModalShown: true,
            idCashWidrawal: id
        });
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
    handleSearchForm(values) {
        var fromDate = moment(values.fromDate).format("YYYY-MM-DD-HH:mm:ss");
        var toDate = moment(values.toDate).format("YYYY-MM-DD-HH:mm:ss");
        
        var cashDeskId = values.cashDeskId;
        if (!cashDeskId) {
            cashDeskId = 'ALL'
        }
        var validateUserId = values.validateUserId;
        if (!validateUserId) {
            validateUserId = 'ALL'
        }

        var page = qs.parse(this.props.location.search).page;
        if (!page) {
            page = 1;
        }


        let setStateInRequest = (list) => { this.setState({ listCashWidrawal: list }) }

        return agent.asyncRequests.getPage('/cashWidrawal/listFindByCashWidrawal?fromDate=' + fromDate + '&toDate=' + toDate
            + '&cashDeskId=' + cashDeskId + '&validateUserId=' + validateUserId, page
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
    componentWillMount() {
        var startOfMonth = moment(new Date).startOf('month');
        var endOfMonth = moment(new Date).endOf('month');
        this.handleSearchForm({fromDate: startOfMonth, toDate: endOfMonth });
        const {updateField} = this.props;
        updateField("fromDate",startOfMonth);
        updateField("toDate",endOfMonth);
        this.getlistAllPersonel();
        updateField("cashDeskId",'ALL');
        updateField("validateUserId",'ALL');
        
    };

    deleteCashWidrawal(id) {
        if (confirm("Bạn có chắc sẽ xoá !")) {
            var url = `/cashWidrawal/${id}`;
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
        var optionUserPersonel = [{label: "Tất Cả", value: "ALL"}];
        this.state.listAllUser.map(item => {
            optionUserPersonel.push({ label: item.fullName, value: item.id })
        })
        const { handleSubmit, submitting } = this.props;
        var search = qs.parse(this.props.location.search).search;
        const data = this.state.listCashWidrawal;
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
                    <td>{item.cashDesk &&  item.cashDesk.cashier ?  item.cashDesk.cashier.fullName: "N/A"}</td>
                    <td>{FormatterUtils.formatCurrency(item.widrawalAmount)}</td>
                    <td>{moment(item.widrawalTime).format("DD/MM/YYYY HH:mm")}</td>
                    <td>{item.validateUser ? item.validateUser.fullName : "N/A"}</td>
                    <td>{item.note}</td>
                    <td className="text-center footable-visible footable-last-column">
                        <ul className="icons-list">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="icon-menu9"></i>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-right">
                                    <li><a onClick={() => this.handleShowmodal(item.id)}><i className="icon-pencil"></i>Chỉnh Sửa</a></li>
                                    <li><a onClick={() => this.deleteCashWidrawal(item.id)}><i className="icon-cross2"></i>Xóa</a></li>
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
                        <li className="active">Rút Tiền Mặt</li>
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
                                                <Field name="cashDeskId" label="Thu Ngân" options={optionUserPersonel} component={RenderSelect}></Field>
                                            </div>
                                            <div className="col col-md-2" style={{ paddingLeft: "20px" }}>
                                            <Field name="validateUserId" label="Người Rút Tiền" options={optionUserPersonel} component={RenderSelect}></Field>
                                              </div>
                                          
                                            <div className="col col-md-1" style={{ paddingLeft: "10px", paddingTop: "30px" }}>
                                                <button type="submit" className="btn bg-success btn-xlg"> <i className="icon-search4"></i> Tìm</button>
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
                                            <th data-toggle="true">Người Quản Lý Quầy Thu Ngân</th>  
                                            <th data-toggle="true">Số Tiền Đã Rút</th>    
                                            <th data-toggle="true">Thời Gian Rút Tiền</th>    
                                            <th data-toggle="true">Người Rút Tiền</th>    
                                            <th data-toggle="true">Ghi Chú</th>         
                                            <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows}
                                    </tbody>
                                </table>
                            </div>
                            {this.state.isCashWidrawalModalShown ? <ModalCashWidrawal 
                                   title= {this.state.idAppointment ? "Thêm Mới Rút Tiền" : "Chỉnh Sửa Rút Tiền"} 
                                idCashWidrawal={this.state.idCashWidrawal} 
                                show={this.state.isCashWidrawalModalShown} 
                                onHide={this.handleHidemodal} /> : null
                            }
                        </div>
                        <TablePagination data={data} baseUrl="/listCashWidrawal" />
                    </div>
                </div>
            </div>
            
        );
    }
}
export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'CashWidrawalList',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(CashWidrawalList)));