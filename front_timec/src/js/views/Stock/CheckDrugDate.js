import qs from 'query-string';
import React from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import { RenderSelect, RenderInputWithDiv } from '../../components/formInputs';
import agent from '../../services/agent';
import moment from 'moment'
import { FormatterUtils } from '../../utils/javascriptUtils';

const selector = formValueSelector("CheckDrugDate");

const validate = values => {
    const errors = {};
    return errors;
}
const mapStateToProps = state => {
    return {
        currentUser: state.common.currentUser,
        currentValues: selector(state,
            'initialFormDate',
            'initialTodDate',
            'initialValuesSearch'
        ),
    };
};

const mapDispatchToProps = dispatch => ({
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "CheckDrugDate", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});

class CheckDrugDate extends React.Component {
    constructor() {
        super();
        this.state = {
            listStock: null,
            listConfigDayDrug: null,
        }

        this.handleSearchForm = this.handleSearchForm.bind(this);
    };

    handleSearchForm(values) {
        let numberDay = 'ALL';
        let search = "";
        if (values) {
            values.search ? search = values.search : search;
            values.numberDay ? numberDay = values.numberDay : numberDay;
        }
        let setStateInRequest = (list) => { this.setState({ listStock: list }) }
        return agent.asyncRequests.get('/report/checkDateReport?numberDay=' + numberDay + '&search=' + search).then(function (res) {
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
        this.handleSearchForm();
        this.getAllConfigDayDrug();
    };

    getAllConfigDayDrug(){
        let setStateInRequest = (list) => { this.setState({ listConfigDayDrug: list }) }
        return agent.asyncRequests.get('/configDayDrug/listAll').then(function (res) {
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
    render() {
        const { handleSubmit, submitting } = this.props;

        const data = this.state.listStock;
        if (!data) {
            return null;
        }
        var optionDay = [
            { label: "Tất Cả", value: "ALL" }
        ];
        let dataConfigDayDrug = this.state.listConfigDayDrug;
        if(dataConfigDayDrug){
            dataConfigDayDrug.map( item => {
                optionDay.push({ label:"Ít hơn " + item.numberDay + " ngày", value: item.numberDay })
            })  
        }

        var page = qs.parse(this.props.location.search).page;
        if (!page) {
            page = 1;
        }

        var rows = this.renderRowsFromDataContent(data);

        return (
            <div className="content-wrapper">
                <div className="page-header page-header-default">
                    <div className="breadcrumb-line">
                        <ul className="breadcrumb">
                            <li><a href=""><i className="icon-home2 position-left"></i> Home</a> </li>
                            <li className="active">Quản Lý Nhà Thuốc</li>
                            <li className="active">Cảnh Báo Hết Hạn Thuốc</li>
                        </ul>
                        <div className="heading-elements">
                            <div className="heading-btn-group">

                                <ReactHTMLTableToExcel
                                    id="test-table-xls-button"
                                    className="btn bg-teal"
                                    table="table-to-xls"
                                    filename={"Thuốc Sắp Hết Hạn"}
                                    sheet="1"
                                    buttonText="Download File Excel " />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="row">
                        <div className="col col-md-12">
                            <div style={{ paddingTop: "20px" }}>
                                <form className="form-horizontal" role="form" onSubmit={handleSubmit(this.handleSearchForm)}>
                                    <div className="row">
                                        <div className="page-header"> </div>
                                    </div>
                                    <div className="row">
                                        <div className="col col-md-12">
                                            <div className="col col-md-3" style={{ paddingLeft: "20px" }}>
                                                <Field label="Chọn Khoảng Thời Gian" name="numberDay" options={optionDay} component={RenderSelect}></Field>
                                            </div>
                                            <div className="col col-md-8" style={{ paddingLeft: "20px" }}>
                                                <Field label="Tìm Kiếm" name="search" placeholder="Tìm theo mã/tên Thuốc..." autoFocus={true} component={RenderInputWithDiv}></Field>
                                            </div>
                                            <div className="col col-md-1" style={{ paddingLeft: "10px", paddingTop: "27px" }}>
                                                <button type="submit" className="btn bg-success btn-xlg">Tìm</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>


                        <table className="table table-xxs table-bordered" id="table-to-xls" style={{ display: 'none' }}>
                            <thead>
                                <tr className="bg-teal">
                                    <th data-toggle="true">STT</th>
                                    <th width="15%" data-toggle="true">Hoạt Chất</th>
                                    <th data-toggle="true">Tên Thuốc</th>
                                    <th data-toggle="true">Hàm Lượng</th>
                                    <th data-toggle="true">Đơn Vị Tính</th>
                                    <th data-toggle="true">Đơn Giá</th>
                                    <th data-toggle="true">Số Ngày Còn Lại </th>
                                    <th data-toggle="true">Ngày Hết Hạn </th>
                                    <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows}
                            </tbody>
                        </table>

                        <div className="panel panel-flat">
                            <table className="table table-xxs table-bordered" id="table-screen">
                                <thead>
                                <tr className="bg-teal">
                                    <th data-toggle="true">STT</th>
                                    <th width="15%" data-toggle="true">Hoạt Chất</th>
                                    <th data-toggle="true">Tên Thuốc</th>
                                    <th data-toggle="true">Hàm Lượng</th>
                                    <th data-toggle="true">Đơn Vị Tính</th>
                                    <th data-toggle="true">Đơn Giá</th>
                                    <th data-toggle="true">Số Ngày Còn Lại </th>
                                    <th data-toggle="true">Ngày Hết Hạn </th>
                                    <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        );
    }

    renderRowsFromDataContent(dataContent) {
        let currentNo = 0;
        return dataContent.map(item => {
            currentNo++;
            let today = new Date();
            var expiredDate = new Date(item.expiredDate);
            // var Difference_In_Time =  today.getTime() - expiredDate.getTime();
            var Difference_In_Time =  today - expiredDate;
            return (
                <tr key={item.id}>
                    <td>{currentNo}</td>
                    <td>{item.drug.ingredient}</td>
                    <td>{item.drug.name}</td>
                    <td>{item.drug.hamLuong}</td>
                    <td>{item.drug.uom}</td>
                    <td>{item.drug.salePrice}</td>
                    <td>{FormatterUtils.formatCurrency(Difference_In_Time / (1000 * 3600 * 24))}</td>
                    <td>{moment(item.expiredDate).format(" DD/MM/YYYY ")  }</td>
                </tr>);
        });
    }
}

export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'CheckDrugDate',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(CheckDrugDate)));
