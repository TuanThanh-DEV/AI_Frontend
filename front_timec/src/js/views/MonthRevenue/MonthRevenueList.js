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
const selector = formValueSelector("MonthRevenueList");
const mapStateToProps = state => {
    var updateValue = null;
    return {
        initialValues: updateValue,
        yearSelected: selector(state, "year")
    };
};

const mapDispatchToProps = dispatch => ({
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "MonthRevenueList", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});
class MonthRevenueList extends React.Component {
    constructor() {
        super();
        this.state = {
            listMonthRevenue: null,
            objectMonthRevenue: null,
            idMonthRevenue: null,
            listAllHospital: [],
            trQuarterlySelectedList: []

        }

        this.handleSearchForm = this.handleSearchForm.bind(this);
        this.handleShowQuarteryDetail = (quarterlyNumber) => {
            var currentTrQuarterlySelectedList = this.state.trQuarterlySelectedList;
            if (!currentTrQuarterlySelectedList.includes(quarterlyNumber)) {
                currentTrQuarterlySelectedList.push(quarterlyNumber);
            } else {
                currentTrQuarterlySelectedList.map((item, index) => {
                    if (item == quarterlyNumber) {
                        currentTrQuarterlySelectedList.splice(index, 1);
                    }
                })
            }

            this.setState({
                trQuarterlySelectedList: currentTrQuarterlySelectedList
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
        var year = moment().year();
        this.handleSearchForm({ year: year });
        const { updateField } = this.props;

        updateField("year", year);
        updateField("hospitalId", '1');
        updateField("status", 'ALL');
        this.getlistAllHospital();

    };



    handleSearchForm(values) {

        var year = values.year;
        if (!year) {
            year = moment().year()
        }

        var status = values.status;
        if (!status) {
            status = ''
        }
        var hospitalId = values.hospitalId;
        if (!hospitalId) {
            hospitalId = '1'
        }

        var page = qs.parse(this.props.location.search).page;
        if (!page) {
            page = 1;
        }


        let setStateInRequest = (list) => { this.setState({ listMonthRevenue: list }) }

        return agent.asyncRequests.getPage('/monthRevenue/listFindByMonthRevenue?year=' + year + '&hospitalId=' + hospitalId + '&status=' + status, page
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

        var optionStatus = [
            { label: "Tất Cả", value: "ALL" },
            { label: "Chưa Xét Duyệt", value: "OPEN" },
            { label: "Đã Xét Duyệt", value: "VALIDATED" },
        ];
        var optionYear = [
            { label: "2019", value: "2019" },
            { label: "2020", value: "2020" },
            { label: "2021", value: "2021" },
            { label: "2022", value: "2022" },
            { label: "2023", value: "2023" },
            { label: "2024", value: "2024" },
            { label: "2025", value: "2025" },
            { label: "2026", value: "2026" },
            { label: "2027", value: "2027" },
            { label: "2028", value: "2028" },
            { label: "2029", value: "2029" },
        ];
        var optionUserHospital = [{ label: "Tất Cả", value: "ALL" }];
        this.state.listAllHospital.map(item => {
            optionUserHospital.push({ label: item.name, value: item.id })
        })

        const { handleSubmit, submitting, yearSelected } = this.props;
        const dataMonthRevenue = this.state.listMonthRevenue;
        var { trQuarterlySelectedList } = this.state;

        var groupByYear = [];
        var listMonthGroupByQuarterly = [];

        var groupRows = [];

        var totalYearRevenue = 0;
        var totalYearProfit = 0;
        var totalQuarterlyRevenue = 0;
        var totalQuarterlyProfit = 0;




        if (!dataMonthRevenue) {
            return <LoadingScreen></LoadingScreen>
        }

        dataMonthRevenue.map(item => {
            var monthCheck = parseInt(item.month);
            if (monthCheck == 1 || monthCheck == 2 || monthCheck == 3) {
                var groupObject = {
                    quarterly: "01",
                    dataByMonth: item
                }
                listMonthGroupByQuarterly.push(groupObject);
            }
            else if (monthCheck == 4 || monthCheck == 5 || monthCheck == 6) {
                var groupObject = {
                    quarterly: "02",
                    dataByMonth: item
                }
                listMonthGroupByQuarterly.push(groupObject);
            }
            else if ((monthCheck == 7 || monthCheck == 8 || monthCheck == 9)) {

                var groupObject = {
                    quarterly: "03",
                    dataByMonth: item
                }
                listMonthGroupByQuarterly.push(groupObject);
            }
            else if (monthCheck == 10 || monthCheck == 11 || monthCheck == 12) {
                var groupObject = {
                    quarterly: "04",
                    dataByMonth: item
                }
                listMonthGroupByQuarterly.push(groupObject);
            }
        })
        let getQuarterlyGroup = (groupQuarterly, quarterly) => {
            debugger;
            for (var i = 0; i < groupQuarterly.length; i++) {
                if (groupQuarterly[i].quarterly == quarterly) {
                    return groupQuarterly[i];
                }
            }
            return null;
        };
        if (listMonthGroupByQuarterly) {
            listMonthGroupByQuarterly.map(item => {
                debugger;
                var quarterlyGroup = getQuarterlyGroup(groupRows, item.quarterly)
                if (!quarterlyGroup) {
                    var groupObject = {
                        quarterly: item.quarterly,
                        monthList: [item.dataByMonth]

                    };
                    groupRows.push(groupObject);
                } else {
                    quarterlyGroup.monthList.push(item.dataByMonth);
                }
            })
        }

        if (groupRows) {
            var rows = groupRows.map((group, index) => {
                totalQuarterlyRevenue = 0;
                totalQuarterlyProfit = 0;
                var monthRows = group.monthList.map(item => {
                    totalQuarterlyRevenue  +=item.revenue;
                    totalQuarterlyProfit +=item.profit;
                    return <tr className="bg-success-300">
                          <td></td>
                        <td>Tháng {item.month}</td>
                        <td>Tổng Doanh Thu: {FormatterUtils.formatCurrency(item.revenue)} VNĐ</td>
                        <td>Tổng Lợi Nhuận: {FormatterUtils.formatCurrency(item.profit)} VNĐ</td>
                    </tr>
                })
                totalYearRevenue += totalQuarterlyRevenue;
                totalYearProfit += totalQuarterlyProfit;
                return [<tr>
                     <td> {trQuarterlySelectedList.includes(group.quarterly) ? <button className="bg-info-600 icon-dash" onClick={() => this.handleShowQuarteryDetail(group.quarterly)}></button> :
                    <button className="bg-info-600 icon-plus22" onClick={() => this.handleShowQuarteryDetail(group.quarterly)}></button>}
                </td>
                   
                    <td>Quý {group.quarterly}/{yearSelected} </td>
                    <td>Tổng Doanh Thu: {FormatterUtils.formatCurrency(totalQuarterlyRevenue)} VNĐ</td>
                    <td>Tổng Lợi Nhuận: {FormatterUtils.formatCurrency(totalQuarterlyProfit)} VNĐ</td>
                </tr>].concat(trQuarterlySelectedList.includes(group.quarterly) ? monthRows : null)
            })
        }

        // var firstQuarterly = [
        //     <tr>
        //         <td><button onClick={()=>this.handleShowQuarteryDetail("quartery")}><i>+</i></button></td>
        //         <td>Quý  - Năm {year} </td>
        // <td>Tổng Doanh Thu {quarterRevenue}</td>
        // <td>Tổng Doanh Thu {totalProfit}</td>
        //     </tr>].concat(isShowQuarterly ? : null);

        // var secoundQuarterly = [
        //     <tr>
        //         <td><button onClick={()=>this.handleShowQuarteryDetail("quartery")}><i>+</i></button></td>
        //         <td>Quý  - Năm {year} </td>
        // <td>Tổng Doanh Thu {quarterRevenue}</td>
        // <td>Tổng Doanh Thu {totalProfit}</td>
        //     </tr>].concat(isShowQuarterly ? : null);

        // var thirdQuarterly = [
        //     <tr>
        //         <td><button onClick={()=>this.handleShowQuarteryDetail("quartery")}><i>+</i></button></td>
        //         <td>Quý  - Năm {year} </td>
        // <td>Tổng Doanh Thu {quarterRevenue}</td>
        // <td>Tổng Doanh Thu {totalProfit}</td>
        //     </tr>].concat(isShowQuarterly ? : null);

        // var fourQuarterly = [
        //     <tr>
        //         <td><button onClick={()=>this.handleShowQuarteryDetail("quartery")}><i>+</i></button></td>
        //         <td>Quý  - Năm {year} </td>
        // <td>Tổng Doanh Thu {quarterRevenue}</td>
        // <td>Tổng Doanh Thu {totalProfit}</td>
        //     </tr>].concat(isShowQuarterly ? : null);
        var currentNo = 0;
        var page = qs.parse(this.props.location.search).page;
        if (!page) {
            page = 1;
        }
        var currentNo = ((page - 1) * 20);






        return (
            <div className="content-wrapper">
                <div className="page-header page-header-default">
                    <div className="breadcrumb-line">
                        <ul className="breadcrumb">
                            <li><a href=""><i className="icon-home2 position-left"></i> Home</a> </li>
                            <li className="active">Quản Lý Doanh Thu</li>
                            <li className="active">Doanh Thu Theo Tháng/Năm</li>
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
                            <div>
                                <form className="form-horizontal" role="form" onSubmit={handleSubmit(this.handleSearchForm)}>
                                    <div className="row">
                                        <div className="page-header"> </div>
                                    </div>
                                    <div className="row">
                                    <div style={{ height: '100%', width: '100%' }} className="input-group content-group">
                    <span>
                         <center style={{ fontSize: "25px" }}>DOANH THU PHÒNG KHÁM NĂM {yearSelected}</center> 
                      </span>
                  </div>
                                        <div className="col col-md-12">
                                        <div className="col col-md-2"></div>
                                            <div className="col col-md-2">
                                                <Field name="year" label="Năm" options={optionYear} component={RenderSelect}></Field>
                                            </div>
                                            <div className="col col-md-2" style={{ paddingLeft: "20px" }}>
                                                <Field name="hospitalId" label="Bệnh Viện" options={optionUserHospital} component={RenderSelect}></Field>
                                            </div>
                                            <div className="col col-md-2" style={{ paddingLeft: "20px" }}>
                                                <Field name="status" label="Trạng Thái" options={optionStatus} component={RenderSelect}></Field>
                                            </div>
                                            <div className="col col-md-2" style={{ paddingLeft: "10px", paddingTop: "30px" }}>
                                                <button type="submit" className="btn bg-success btn-xlg"> <i className="icon-search4"></i>Tìm</button>
                                            </div>
                                            <div className="col col-md-2"></div>
                                        </div>
                                    </div>
                                </form>
                                
                            </div>
                            <div className="panel panel-flat">
                                <table className="table table-togglable table-xxs">
                                    <thead>
                                
                                  
                                  
                                    <tr className="bg-teal">
                                    <th></th>
                                    
                                            <th>Năm {yearSelected}</th>
                                            <th>Tổng Doanh Thu: {FormatterUtils.formatCurrency(totalYearRevenue)} VNĐ</th>
                                            <th>Tổng Lợi Nhuận: {FormatterUtils.formatCurrency(totalYearProfit)} VNĐ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                        {dataMonthRevenue.content ?
                            <TablePagination data={dataMonthRevenue} baseUrl="/listMonthRevenue" />
                            : null}
                    </div>
                </div>
            </div>

        );
    }
}
export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'MonthRevenueList',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(MonthRevenueList)));