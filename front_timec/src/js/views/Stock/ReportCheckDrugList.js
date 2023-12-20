import moment from 'moment';
import React from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import { RenderDatePicker, RenderInputWithDiv } from '../../components/formInputs';
import agent from '../../services/agent';
import { FormatterUtils } from '../../utils/javascriptUtils';

const selector = formValueSelector("ReportCheckDrugList");

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
            meta: { form: "ReportCheckDrugList", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});

class ReportCheckDrugList extends React.Component {
    constructor() {
        super();
        this.state = {
            listStock: null,
            listAllDrugStore : []
        }

        this.handleSearchForm = this.handleSearchForm.bind(this);
    };

    handleSearchForm(values) {
        let fromDate = "";
        let toDate = "";
        let search = "";
        if (values) {

            values.fromDate ? fromDate = moment(values.fromDate).format("YYYY-MM-DD") : fromDate;
            values.toDate ? toDate = moment(values.toDate).format("YYYY-MM-DD") : toDate;
            values.search ? search = values.search : search; 
        }
        let setStateInRequest = (list) => { this.setState({ listStock: list }) }
        return agent.asyncRequests.get('/report/checkStockReportByCheckDrug?fromDate=' + fromDate + '&toDate=' + toDate
            + '&search=' + search ).then(function (res) {
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
    getAllDrugStogare(){
        let setStateInRequest = (list) => { this.setState({ listAllDrugStore: list }) }
        return agent.DrugStoreApi.listAllDrugStore().then(function (res) {
                var result = res.resultData;
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
        this.getAllDrugStogare();
    };

    render() {
        const { handleSubmit } = this.props;

        const data = this.state.listStock;
        const dataStore = this.state.listAllDrugStore;
        let optopnStore = [ { label: "Tất Cả", value: "ALL" } ];
        if(dataStore){
            dataStore.map(item => {
                optopnStore.push({value : item.id,label : item.name})
            })
        }
        var rows = null;
        if (!data) {
            return null;
        }
        var currentNo = 1;
        rows = data.map(item => {
            let type = '';
            if(item.type == 'REFUND_COMPANY'){
                type = 'Xuất Trả NCC'
            }else if(item.type == 'DAMAGE_DRUG'){
                type = 'Xuất Hủy'
            }else if(item.type == 'CHECK_STOCK'){
                type = 'Kiểm Kho'
            }
            return <tr>
                <td>{currentNo++}</td>
                <td>{item.drug.name}</td>
                <td>{item.drug.ingredient}</td>
                <td>{item.drug.uom}</td>
                <td>{FormatterUtils.formatCurrency( item.drug.salePrice)}</td>
                <td>{item.number}</td>
                <td>{type}</td>
                <td>{moment(item.date).format("DD-MM-YYYY")}</td>
                <td>{item.nameCompanyRefun}</td>
            </tr>

        });
        
        return (
            <div className="content-wrapper">
                <div className="page-header page-header-default">
                    <div className="breadcrumb-line">
                        <ul className="breadcrumb">
                            <li><a href=""><i className="icon-home2 position-left"></i> Home</a> </li>
                            <li className="active">Quản Lý Nhà Thuốc</li>
                            <li className="active">Kiểm Tra Kho Tổng Quát</li>
                        </ul>
                        <div className="heading-elements">
                            <div className="heading-btn-group">

                                <ReactHTMLTableToExcel
                                    id="test-table-xls-button"
                                    className="btn bg-teal"
                                    table="table-to-xls"
                                    filename={"Danh Sách Kiểm Kho"}
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
                                            <div className="col col-md-2" style={{ paddingLeft: "20px" }}>
                                                <Field label="Từ Ngày" name="fromDate" component={RenderDatePicker}></Field>
                                            </div>
                                            <div className="col col-md-2" style={{ paddingLeft: "20px" }}>
                                                <Field label="Đến Ngày" name="toDate" component={RenderDatePicker}></Field>
                                            </div>
                                            <div className="col col-md-5" style={{ paddingLeft: "20px" }}>
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

                        <div className="panel panel-flat">
                            <table className="table table-xxs table-bordered" id="table-to-xls">
                                <thead>
                                    <tr className="bg-teal">
                                        <th width='5%'>STT</th>
                                        <th width='10%'>Tên Thuốc</th>
                                        <th width='15%'>Hoạt Chất</th>
                                        <th width='5%'>Đơn Vị Tính</th>
                                        <th width='5%'>Đơn Giá</th>
                                        <th width='5%'>Số Lượng</th>
                                        <th width='10%'>Loại</th>
                                        <th width='10%'>Ngày</th>
                                        <th width='15%'>Công Ty Trả</th>
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
}

export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'ReportCheckDrugList',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ReportCheckDrugList)));
