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
import DayRevenueRows from './DayRevenueRows';
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
const selector = formValueSelector("DayRevenueList");

const mapStateToProps = state => {

    return {
        currentUser: state.common.currentUser,
        fromDateProps: selector(state, "fromDate"),
        toDateProps: selector(state, "toDate"),
        timeFilterProps: selector(state, "timeFilter"),
        hospitalIdProps: selector(state, "hospitalId"),
        statusProps: selector(state, "status")

    };
};
const mapDispatchToProps = dispatch => ({
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "DayRevenueList", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});
class DayRevenueList extends React.Component {
    constructor() {
        super();
        let initialFromDate = new Date();
        initialFromDate = PermanentCacheService.getItem("selected_DayRevenue_fromDate") ? new Date(PermanentCacheService.getItem("selected_DayRevenue_fromDate")) : dateFns.setDate(initialFromDate, 1);
        let initialToDate = new Date();
        initialToDate = PermanentCacheService.getItem("selected_DayRevenue_toDate") ? new Date(PermanentCacheService.getItem("selected_DayRevenue_toDate")) : dateFns.setDate(initialToDate, parseInt(moment(new Date()).format("DD")));
        let initialTimeFilter = 'THIS_MONTH';
        initialTimeFilter = PermanentCacheService.getItem("selected_DayRevenue_timeFilter") ? PermanentCacheService.getItem("selected_DayRevenue_timeFilter") : initialTimeFilter;
        let initialHospitalId = 'ALL';
        initialHospitalId = PermanentCacheService.getItem("selected_DayRevenue_hospitalId") ? PermanentCacheService.getItem("selected_DayRevenue_hospitalId") : initialHospitalId;
        let initialStatus = 'ALL';
        initialStatus = PermanentCacheService.getItem("selected_DayRevenue_status") ? PermanentCacheService.getItem("selected_DayRevenue_status") : initialStatus;

        this.state = {
            listDayRevenue: [],
            objectDayRevenue: null,
            idDayRevenue: null,
            listAllHospital: [],
            fromDate: initialFromDate,
            toDate: initialToDate,
            timeFilter: initialTimeFilter,
            hospitalId: initialHospitalId,
            status: initialStatus

        }
        this.handleSearchForm = this.handleSearchForm.bind(this);
        this.setPermanentCache = (timeFilter, fromDate, toDate, hospitalId, status) => {
            if (fromDate) {
                PermanentCacheService.setItem("selected_DayRevenue_fromDate", fromDate);
            }
            if (toDate) {
                PermanentCacheService.setItem("selected_DayRevenue_toDate", toDate);
            }
            if (timeFilter) {
                PermanentCacheService.setItem("selected_DayRevenue_timeFilter", timeFilter);
            }
            if (hospitalId) {
                PermanentCacheService.setItem("selected_DayRevenue_hospitalId", hospitalId);
            }
            if (status) {
                PermanentCacheService.setItem("selected_DayRevenue_status", status);
            }
            this.setState({
                fromDate: fromDate ? fromDate : this.state.fromDate,
                toDate: toDate ? toDate : this.state.toDate,
                hospitalId: hospitalId ? hospitalId : this.state.hospitalId,
                status: status ? status : this.state.status,
                timeFilter: timeFilter ? timeFilter : this.state.timeFilter,
            }, () => this.handleSearchForm());
        };
        this.handleTimeFilter = (timeFilter, hospitalId, status) => {
            const {updateField} = this.props;
            if (timeFilter == "TODAY") {
                this.setPermanentCache(timeFilter, new Date(), new Date(), hospitalId, status);
                updateField("fromDate", new Date());
                updateField("toDate", new Date());
            } else if (timeFilter == "YESTERDAY") {
                var yesterday = moment().subtract(1, 'days').toDate();
                this.setPermanentCache(timeFilter, yesterday, yesterday, hospitalId, status);
                updateField("fromDate", yesterday);
                updateField("toDate", yesterday);
            } else if (timeFilter == "7_DAYS") {
                var sevenDaysAgo = moment().subtract(7, 'days').toDate();
                this.setPermanentCache(timeFilter, sevenDaysAgo, new Date(), hospitalId, status);
                updateField("fromDate", sevenDaysAgo);
                updateField("toDate", new Date());
            } else if (timeFilter == "THIS_MONTH") {
                const startOfMonth = moment().startOf('month').toDate();
                this.setPermanentCache(timeFilter, startOfMonth, new Date(), hospitalId, status);
                updateField("fromDate", startOfMonth);
                updateField("toDate", new Date());
            } else if (timeFilter == "LAST_MONTH") {
                const startOfLastMonth = moment().subtract(1, 'months').startOf('month').toDate();
                const endOfLastMonth = moment().subtract(1, 'months').endOf('month').toDate();
                this.setPermanentCache(timeFilter, startOfLastMonth, endOfLastMonth, hospitalId, status);
                updateField("fromDate", startOfLastMonth);
                updateField("toDate", endOfLastMonth);
            }

        };

        // NOT use this on screen anymore, the report service must be run by crontab
        this.createdRevenueForToday = () => {
            var _this = this;
            return agent.asyncRequests.get('/dayRevenue/createdDayRevenue?' + "&applyDate=" + moment().format("YYYY-MM-DD")
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
    getlistAllHospital() {
        let setStateInRequest = (list) => { this.setState({ listAllHospital: list }) }
        return agent.HospitalApi.listAllHospital().then(function (res) {
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
            hospitalId,
            status } = this.state;

        this.handleSearchForm();
        // this.handleSearchForm({fromDate: startOfMonth, toDate: endOfMonth });
        updateField("fromDate", fromDate);
        updateField("toDate", toDate);
        updateField("timeFilter", timeFilter);
        updateField("hospitalId", hospitalId);
        updateField("status", status);
        this.getlistAllHospital();
    };
    handleSearchForm() {
        var { fromDate,
            toDate,
            hospitalId,
            status, } = this.state;
        var page = qs.parse(this.props.location.search).page;
        let setStateInRequest = (list) => { this.setState({ listDayRevenue: list }) };
        return agent.asyncRequests.getPage('/dayRevenue/listFindByDayRevenue?fromDate=' + moment(fromDate).format("YYYY-MM-DD-HH:mm:ss") + '&toDate=' + moment(toDate).format("YYYY-MM-DD-HH:mm:ss")
            + '&status=' + status + '&hospitalId=' + hospitalId, page
        ).then(function (res) {
            var result = res.body.resultData.content;
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

    getDataChart(dayRevenueList) {
        var dataChart = [[
            'Ngày',
            'Doanh Thu',
            'Giá Vốn',
            'Lãi Gộp',
        ]];
        var listItems = dayRevenueList.map(item => {
            return [moment(item.applyDate).toDate(), item.revenueAmount/ 1000000.0, item.buyAmount/ 1000000.0, item.totalAmount / 1000000.0];
        });
        return dataChart.concat(listItems);
    }
    render() {

        var optionStatus = [
            { label: "Tất Cả", value: "ALL" },
            { label: "Chưa Xét Duyệt", value: "OPEN" },
            { label: "Đã Xét Duyệt", value: "VALIDATED" },
        ];
        var optionUserHospital = [{ label: "Tất Cả", value: "ALL" }];
        this.state.listAllHospital.map(item => {
            optionUserHospital.push({ label: item.name, value: item.id })
        })
        const optionsChart = {
            chart: { title: 'Báo Cáo Bán Hàng  ', subtitle: 'Triệu đồng' },
            hAxis: {
                format: 'd/M'
            }
        };

        const { handleSubmit, submitting, currentUser,
            fromDateProps,
            toDateProps,
            timeFilterProps,
            hospitalIdProps,
            statusProps } = this.props;
        const dataDayRevenue = this.state.listDayRevenue;
        var isDayRevenueExist = false;
        if (!dataDayRevenue) {
            return <LoadingScreen></LoadingScreen>;
        }
        var currentNo = 0;
        var page = qs.parse(this.props.location.search).page;
        if (!page) {
            page = 1;
        }
        var currentNo = ((page - 1) * 20);
        if (!dataDayRevenue.length && dataDayRevenue.length != 0) {
            if (dataDayRevenue.applyDate == moment().format("YYYY-MM-DD")) {
                isDayRevenueExist = true;
            }
            // dataDayRevenue is the object
            var rows = <DayRevenueRows reloadDayRevenue={this.handleSearchForm} currentUser={this.props.location.state.currentUser} dayRevenueObj={dataDayRevenue}></DayRevenueRows>
        } else {
            var totalObject = {};
            totalObject.revenueAmount = 0;
            totalObject.buyAmount = 0;
            totalObject.internalDrugAmount = 0;
            totalObject.totalAmount = 0;
            totalObject.saleDrugAmount = 0;
            totalObject.salePrescriptionAmount = 0;
            totalObject.saleDiagnosisAmount = 0;
            totalObject.saleProcedureAmount = 0;
            totalObject.saleInsuranceAmount = 0;
            totalObject.saleOtherAmount = 0;
            var rows = dataDayRevenue.map((item, index) => {
                if (item.applyDate == moment().format("YYYY-MM-DD")) {
                    isDayRevenueExist = true;
                }
                currentNo++;
                totalObject.revenueAmount += item.revenueAmount;
                totalObject.buyAmount += item.buyAmount;
                totalObject.internalDrugAmount += item.internalDrugAmount;
                totalObject.totalAmount += item.totalAmount;
                totalObject.saleDrugAmount += item.saleDrugAmount;
                totalObject.salePrescriptionAmount += item.salePrescriptionAmount;
                totalObject.saleDiagnosisAmount += item.saleDiagnosisAmount;
                totalObject.saleProcedureAmount += item.saleProcedureAmount;
                totalObject.saleInsuranceAmount += item.saleInsuranceAmount;
                totalObject.saleOtherAmount += item.saleOtherAmount;

                return (
                    // dataDayRevenue is list object
                    <DayRevenueRows reloadDayRevenue={this.handleSearchForm} currentUser={this.props.location.state.currentUser} key={index} dayRevenueObj={item}></DayRevenueRows>

                );
            });
            rows = rows.concat(
                [
                <tr key="total" style={{backgroundColor: '#f8c733'}}>
                {/* <tr key="total" className="bg-primary"> */}
                    <td> 
                    </td>
                    <td>TỔNG CỘNG</td>
                    <td><i>{FormatterUtils.formatCurrency(totalObject.revenueAmount)}</i></td>
                    <td><i>{FormatterUtils.formatCurrency(totalObject.buyAmount)}</i></td>
                    <td><i>{FormatterUtils.formatCurrency(totalObject.internalDrugAmount)}</i></td>
                    <td><i>{FormatterUtils.formatCurrency(totalObject.totalAmount)}</i></td>
                    <td><i>{FormatterUtils.formatCurrency(totalObject.saleDrugAmount)}</i></td>
                    <td><i>{FormatterUtils.formatCurrency(totalObject.salePrescriptionAmount)}</i></td>
                    <td><i>{FormatterUtils.formatCurrency(totalObject.saleDiagnosisAmount)}</i></td>
                    {/* <td><i>{FormatterUtils.formatCurrency(totalObject.saleProcedureAmount)}</i></td> */}
                    <td><i>{FormatterUtils.formatCurrency(totalObject.saleInsuranceAmount)}</i></td>
                    <td className="footable-last-column"><i>{FormatterUtils.formatCurrency(totalObject.saleOtherAmount)}</i></td>
                    
                </tr>]
            );
        }


        var dataChart = this.getDataChart(dataDayRevenue);

        return (
            <div className="content-wrapper">
                <div className="page-header page-header-default">
                    <div className="breadcrumb-line">
                        <ul className="breadcrumb">
                            <li><a href=""><i className="icon-home2 position-left"></i> Home</a> </li>
                            <li className="active">Quản Lý Doanh Thu</li>
                            <li className="active">Doanh Thu Theo Ngày</li>
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
                                {/* <button className="btn bg-primary" disabled={isDayRevenueExist} onClick={() => this.createdRevenueForToday()}>Tổng Hợp Doanh Thu</button> */}
                                <ReactHTMLTableToExcel
                                    id="test-table-all-day-revenue-xls-button"
                                    className="download-day-revenue-xls-button btn btn-info marginL"
                                    table="table-all-day-revenue-xls"
                                    filename="Báo Cáo Doanh Thu"
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
                                                <Field onChangeAction={(value) => this.handleTimeFilter(value, hospitalIdProps, statusProps)} label="Thời Gian" name="timeFilter" options={optionsTimeFilter} component={RenderSelect}></Field>
                                            </div>
                                            <div className="col col-md-4">
                                                <div className="col col-md-6" style={{ paddingLeft: "20px" }}>
                                                    <Field onChangeAction={(value) => this.setPermanentCache(timeFilterProps, value, toDateProps, hospitalIdProps, statusProps)} label="Từ Ngày" name="fromDate" component={RenderDatePicker}></Field>
                                                </div>
                                                <div className="col col-md-6" style={{ paddingLeft: "20px" }}>
                                                    <Field onChangeAction={(value) => this.setPermanentCache(timeFilterProps, fromDateProps, value, hospitalIdProps, statusProps)} label="Đến Ngày" name="toDate" component={RenderDatePicker}></Field>
                                                </div>
                                            </div>
                                            <div className="col col-md-4">
                                                <Field onChangeAction={(value) => this.setPermanentCache(timeFilterProps, fromDateProps, toDateProps, value, statusProps)} name="hospitalId" label="Bệnh Viện" options={optionUserHospital} component={RenderSelect}></Field>
                                            </div>
                                            {/* <div className="col col-md-2" style={{ paddingLeft: "20px" }}>
                                                <Field onChangeAction={(value) => this.setPermanentCache(timeFilterProps, fromDateProps, toDateProps, hospitalIdProps, value)} name="status" label="Trạng Thái" options={optionStatus} component={RenderSelect}></Field>
                                            </div> */}
                                            {/* <div className="col col-md-1" style={{ paddingLeft: "10px", paddingTop: "30px" }}>
                                                <button type="submit" className="btn bg-success btn-xlg"> <i className="icon-search4"></i>Tìm</button>
                                            </div> */}
                                        </div>
                                    </div>
                                </form>



                            </div>

                            <div className="panel panel-flat">
                                <table className="table table-xxs table-bordered" id="table-all-day-revenue-xls">
                                    <thead>
                                        <tr className="bg-teal">
                                            <th data-toggle="true">STT</th>
                                            <th data-toggle="true">Ngày</th>
                                            <th data-toggle="true">Doanh Thu</th>
                                            <th data-toggle="true">Giá Vốn Thuốc</th>
                                            <th data-toggle="true">Vật Tư Phòng Khám</th>
                                            <th data-toggle="true">Lãi Gộp</th>
                                            <th data-toggle="true">Thu Đơn Thuốc</th>
                                            <th data-toggle="true">Thu Khám Bệnh</th>
                                            <th data-toggle="true">Thu Dịch Vụ</th>
                                            {/* <th data-toggle="true">Thu Thủ Thuật</th> */}
                                            <th data-toggle="true">Thu BHYT</th>
                                            <th data-toggle="true">Thu Gói Khám</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                        {/* <TablePagination data={dataDayRevenue} baseUrl="/listDayRevenue" /> */}
                    </div>
                    <div className="row">
                    <div className="col-lg-8">
                            <div className="panel panel-flat">
                                <div className="tab-content">
                                    <Chart
                                        width={'100%'}
                                        height={'500px'}

                                        chartType="LineChart"
                                        loader={<div>Loading Chart</div>}
                                        data={dataChart}
                                        options={optionsChart}
                                        rootProps={{ 'data-testid': '3' }}
                                    />
                                </div>
                            </div>
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
            form: 'DayRevenueList',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(DayRevenueList)));