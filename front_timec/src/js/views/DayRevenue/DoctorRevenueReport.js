import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import moment from 'moment'
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { RenderDatePicker, RenderInputWithDiv, RenderSelect } from '../../components/formInputs';
import { FormatterUtils } from '../../utils/javascriptUtils';
import { LoadingScreen } from '../../components/commonWidgets';
import dateFns from 'date-fns';
import { PermanentCacheService } from '../../services/middleware';
import { optionsTimeFilter } from './action-types';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Chart from 'react-google-charts';

const validate = values => {
    const errors = {};
    if (moment(values.toDate) < moment(values.fromDate)) {
        errors.toDate = 'Ngày kết thúc nhỏ hơn ngày bắt đầu!, vui lòng thử lại!'
    }
    return errors;
}
const selector = formValueSelector("DoctorRevenueReport");

const mapStateToProps = state => {

    return {
        currentUser: state.common.currentUser,
        fromDateProps: selector(state, "fromDate"),
        toDateProps: selector(state, "toDate"),
        timeFilterProps: selector(state, "timeFilter"),
        userIdProps: selector(state, "userId")

    };
};
const mapDispatchToProps = dispatch => ({
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "DoctorRevenueReport", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});
class DoctorRevenueReport extends React.Component {
    constructor() {
        super();
        let initialFromDate = new Date();
        initialFromDate = PermanentCacheService.getItem("selected_DoctorRevenue_fromDate") ? new Date(PermanentCacheService.getItem("selected_DoctorRevenue_fromDate")) : dateFns.setDate(initialFromDate, 1);
        let initialToDate = new Date();
        initialToDate = PermanentCacheService.getItem("selected_DoctorRevenue_toDate") ? new Date(PermanentCacheService.getItem("selected_DoctorRevenue_toDate")) : dateFns.setDate(initialToDate, parseInt(moment(new Date()).format("DD")));
        let initialTimeFilter = 'THIS_MONTH';
        initialTimeFilter = PermanentCacheService.getItem("selected_DoctorRevenue_timeFilter") ? PermanentCacheService.getItem("selected_DoctorRevenue_timeFilter") : initialTimeFilter;
        let initialuserId = 'ALL';
        initialuserId = PermanentCacheService.getItem("selected_DoctorRevenue_userId") ? PermanentCacheService.getItem("selected_DoctorRevenue_userId") : initialuserId;
        
        this.state = {
            listDoctorRevenue: [],
            objectDoctorRevenue: null,
            idDoctorRevenue: null,
            listAllDoctor: [],
            fromDate: initialFromDate,
            toDate: initialToDate,
            timeFilter: initialTimeFilter,
            userId: initialuserId

        }
        this.handleSearchForm = this.handleSearchForm.bind(this);
        this.setPermanentCache = (timeFilter, fromDate, toDate, userId) => {
            if (fromDate) {
                PermanentCacheService.setItem("selected_DoctorRevenue_fromDate", fromDate);
            }
            if (toDate) {
                PermanentCacheService.setItem("selected_DoctorRevenue_toDate", toDate);
            }
            if (timeFilter) {
                PermanentCacheService.setItem("selected_DoctorRevenue_timeFilter", timeFilter);
            }
            if (userId) {
                PermanentCacheService.setItem("selected_DoctorRevenue_userId", userId);
            }
            
            this.setState({
                fromDate: fromDate ? fromDate : this.state.fromDate,
                toDate: toDate ? toDate : this.state.toDate,
                userId: userId ? userId : this.state.userId,
                timeFilter: timeFilter ? timeFilter : this.state.timeFilter,
            }, () => this.handleSearchForm());
        };
        this.handleTimeFilter = (timeFilter, userId) => {
            const {updateField} = this.props;
            if (timeFilter == "TODAY") {
                this.setPermanentCache(timeFilter, new Date(), new Date(), userId);
                updateField("fromDate", new Date());
                updateField("toDate", new Date());
            } else if (timeFilter == "YESTERDAY") {
                var yesterday = moment().subtract(1, 'days').toDate();
                this.setPermanentCache(timeFilter, yesterday, yesterday, userId);
                updateField("fromDate", yesterday);
                updateField("toDate", yesterday);
            } else if (timeFilter == "7_DAYS") {
                var sevenDaysAgo = moment().subtract(7, 'days').toDate();
                this.setPermanentCache(timeFilter, sevenDaysAgo, new Date(), userId);
                updateField("fromDate", sevenDaysAgo);
                updateField("toDate", new Date());
            } else if (timeFilter == "THIS_MONTH") {
                const startOfMonth = moment().startOf('month').toDate();
                this.setPermanentCache(timeFilter, startOfMonth, new Date(), userId);
                updateField("fromDate", startOfMonth);
                updateField("toDate", new Date());
            } else if (timeFilter == "LAST_MONTH") {
                const startOfLastMonth = moment().subtract(1, 'months').startOf('month').toDate();
                const endOfLastMonth = moment().subtract(1, 'months').endOf('month').toDate();
                this.setPermanentCache(timeFilter, startOfLastMonth, endOfLastMonth, userId);
                updateField("fromDate", startOfLastMonth);
                updateField("toDate", endOfLastMonth);
            }

        };

        // NOT use this on screen anymore, the report service must be run by crontab
        this.createdRevenueForToday = () => {
            var _this = this;
            return agent.asyncRequests.get('/DoctorRevenue/createdDoctorRevenue?' + "&applyDate=" + moment().format("YYYY-MM-DD")
            ).then(function (res) {
                var result = res.body.resultData;
                if (result == "LOAD_DAY_REVENUE_SUCCESS") {
                    _this.handleSearchForm();
                } else {
                    toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                    + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
            })

        }

    };
    getlistAllDoctor() {
        let setStateInRequest = (list) => { this.setState({ listAllDoctor: list }) }
        return agent.UserApi.getAllDoctor().then(function (res) {
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
    componentWillMount() {
        const { updateField } = this.props;
        const { fromDate,
            toDate,
            timeFilter,
            userId } = this.state;

        this.handleSearchForm();
        // this.handleSearchForm({fromDate: startOfMonth, toDate: endOfMonth });
        updateField("fromDate", fromDate);
        updateField("toDate", toDate);
        updateField("timeFilter", timeFilter);
        updateField("userId", userId);
        this.getlistAllDoctor();
    };
    handleSearchForm() {
        var { fromDate,
            toDate,
            userId,
            } = this.state;
        if (!userId || userId == 'ALL') {
            this.setState({ listDoctorRevenue: [] })
            return;
        }
        let setStateInRequest = (list) => { this.setState({ listDoctorRevenue: list }) };
        return agent.asyncRequests.get('/dayRevenue/listDoctorRevenue?fromDate=' + moment(fromDate).format("YYYY-MM-DD-HH:mm:ss") + '&toDate=' + moment(toDate).format("YYYY-MM-DD-HH:mm:ss")
             + '&userId=' + userId
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

    
    render() {
        
        const { handleSubmit, submitting,
            fromDateProps,
            toDateProps,
            timeFilterProps,
            userIdProps            
        } = this.props;

        var optionDoctor = [{ label: "Tất Cả", value: "ALL" }];
        this.state.listAllDoctor.map(item => {
            optionDoctor.push({ label: item.fullName, value: item.id })
        })

        var currentNo = 0;
        var rows = this.state.listDoctorRevenue.map(item => {
            currentNo++
            return (
                <tr key={currentNo}>
                    <td>{currentNo}</td>
                    <td>{item.serviceName}</td>
                    <td>{item.quantity}</td>
                    <td>{item.unitName}</td>
                    <td>{FormatterUtils.formatCurrency(item.servicePrice)}</td>
                    <td>{item.unitCommission}</td>
                    <td>{item.totalCommission}</td>
                    {/* <td className="text-center footable-visible footable-last-column">
                        <ul className="icons-list">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="icon-menu9"></i>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-right">
                                </ul>
                            </li>
                        </ul>
                    </td> */}
                </tr>);
        });
        
        return (
            <div className="content-wrapper">
                <div className="page-header page-header-default">
                    <div className="breadcrumb-line">
                        <ul className="breadcrumb">
                            <li><a href=""><i className="icon-home2 position-left"></i> Home</a> </li>
                            <li className="active">Báo cáo</li>
                            <li className="active">Thống kê chỉ định bác sĩ</li>
                        </ul>
                        <div className="heading-elements">
                            <div className="heading-btn-group">
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="pull-right">
                                {/* <button className="btn bg-primary" disabled={isDoctorRevenueExist} onClick={() => this.createdRevenueForToday()}>Tổng Hợp Doanh Thu</button> */}
                                <ReactHTMLTableToExcel
                                    id="test-table-all-day-revenue-xls-button"
                                    className="download-day-revenue-xls-button btn btn-info marginL"
                                    table="table-all-day-revenue-xls"
                                    filename="Báo Cáo Bác Sĩ"
                                    sheet="TongHop"
                                    buttonText="Xuất Excel Báo Cáo" />
                            </div>
                            <div>
                                <form className="form-horizontal" role="form" >
                                    <div className="row">
                                        <div className="page-header"> </div>
                                    </div>
                                    <div className="row">
                                        <div className="col col-md-12">
                                            <div className="col col-md-2">
                                                <Field onChangeAction={(value) => this.handleTimeFilter(value, userIdProps)} label="Thời Gian" name="timeFilter" options={optionsTimeFilter} component={RenderSelect}></Field>
                                            </div>
                                            <div className="col col-md-4">
                                                <div className="col col-md-6" style={{ paddingLeft: "20px" }}>
                                                    <Field onChangeAction={(value) => this.setPermanentCache(timeFilterProps, value, toDateProps, userIdProps)} label="Từ Ngày" name="fromDate" component={RenderDatePicker}></Field>
                                                </div>
                                                <div className="col col-md-6" style={{ paddingLeft: "20px" }}>
                                                    <Field onChangeAction={(value) => this.setPermanentCache(timeFilterProps, fromDateProps, value, userIdProps)} label="Đến Ngày" name="toDate" component={RenderDatePicker}></Field>
                                                </div>
                                            </div>
                                            <div className="col col-md-4">
                                                <Field onChangeAction={(value) => this.setPermanentCache(timeFilterProps, fromDateProps, toDateProps, value)} name="userId" label="Bác sĩ" options={optionDoctor} component={RenderSelect}></Field>
                                            </div>
                                        </div>
                                    </div>
                                </form>



                            </div>

                            <div className="panel panel-flat">
                                <table className="table table-xxs table-bordered" id="table-all-day-revenue-xls">
                                    <thead>
                                        <tr className="bg-teal">
                                            <th data-toggle="true">STT</th>
                                            <th data-toggle="true">Tên công việc</th>
                                            <th data-toggle="true">Số lượng</th>
                                            <th data-toggle="true">Đơn vị tính</th>
                                            <th data-toggle="true">Đơn giá niêm yết</th>
                                            <th data-toggle="true">Thưởng</th>
                                            <th data-toggle="true">Tổng cộng</th>
                                            {/* <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows}
                                    </tbody>
                                </table>
                                
                            </div>
                            <div><i>* Lưu ý: Báo cáo được tính theo số lượng dịch vụ đã được thanh toán do bác sĩ chỉ định.</i></div>

                        </div>
                    </div>
                    
                </div>
            </div>

        );
    }
}
export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'DoctorRevenueReport',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(DoctorRevenueReport)));