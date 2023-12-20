import qs from 'query-string';
import React from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import { RenderDatePicker, RenderInputWithDiv } from '../../components/formInputs';
import agent from '../../services/agent';
import moment from 'moment'

const selector = formValueSelector("RefunCompany");

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
            meta: { form: "RefunCompany", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});

class RefunCompany extends React.Component {
    constructor() {
        super();
        this.state = {
            listStock: null,
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
        return agent.asyncRequests.get('/report/renfunCompany?fromDate=' + fromDate + '&toDate=' + toDate
            + '&search=' + search).then(function (res) {
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
    };

    render() {
        const { handleSubmit, submitting } = this.props;

        const data = this.state.listStock;
        if (!data) {
            return null;
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
                            <li className="active">DS Xuất Trả Công Ty</li>
                        </ul>
                        <div className="heading-elements">
                            <div className="heading-btn-group">

                                <ReactHTMLTableToExcel
                                    id="test-table-xls-button"
                                    className="btn bg-teal"
                                    table="table-to-xls"
                                    filename={"DS Xuất Trả Công Ty"}
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
                                            <div className="col col-md-7" style={{ paddingLeft: "20px" }}>
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
                                    <th data-toggle="true">Hoạt Chất</th>
                                    <th data-toggle="true">Tên Thuốc</th>
                                    <th data-toggle="true">Hàm Lượng</th>
                                    <th data-toggle="true">Đơn Vị Tính</th>
                                    <th data-toggle="true">Đơn Giá Mua</th>
                                    <th data-toggle="true">Nhập</th>
                                    <th data-toggle="true">Số Lô Thuốc</th>
                                    <th data-toggle="true">Hạn Dùng</th>
                                    <th data-toggle="true">Ngày Mua</th>
                                    <th data-toggle="true">Số Hóa Đơn</th>
                                    <th data-toggle="true">Số Thuốc Trả</th>
                                    <th data-toggle="true">Công Ty Trả Thuốc</th>
                                    <th data-toggle="true">Ngày Trả</th>
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
                                        <th data-toggle="true">Hoạt Chất</th>
                                        <th data-toggle="true">Tên Thuốc</th>
                                        <th data-toggle="true">Hàm Lượng</th>
                                        <th data-toggle="true">Đơn Vị Tính</th>
                                        <th data-toggle="true">Đơn Giá Mua</th>
                                        <th data-toggle="true">Nhập</th>
                                        <th data-toggle="true">Số Lô Thuốc</th>
                                        <th width="10%" data-toggle="true">Hạn Dùng</th>
                                        <th width="10%" data-toggle="true">Ngày Mua</th>
                                        <th data-toggle="true">Số Hóa Đơn</th>
                                        <th data-toggle="true">Số Thuốc Trả</th>
                                        <th data-toggle="true">Công Ty Trả Thuốc</th>
                                        <th data-toggle="true">Ngày Trả</th>
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
            // get day between Date
            var inputDate = new Date(item.inputStock.inputDate);
            var producedDate = new Date(item.inputStock.producedDate);
            var Difference_In_Time = inputDate .getTime() - producedDate.getTime();
  
            return (
                <tr key={item.id}>
                    <td>{currentNo}</td>
                    <td>{item.drug.ingredient}</td>
                    <td>{item.drug.name}</td>
                    <td>{item.drug.hamLuong}</td>
                    <td>{item.drug.uom}</td>
                    <td>{item.inputStock.importPrice}</td>
                    <td>{item.inputStock.inputAmount}</td>
                    <td>{item.inputStock.inputForm.producedCode}</td>
                    <td>{(Difference_In_Time / (1000 * 3600 * 24))}</td>
                    <td>{moment(item.inputStock.inputDate).format("DD-MM-YYYY") }</td>
                    <td>{item.inputStock.inputForm.invoiceAmountSupplier}</td>
                    <td>{item.outAmount}</td>
                    <td>{item.outputForm.supplier ? item.outputForm.supplier.name : ''}</td>
                    <td>{moment(item.outputDate).format("DD-MM-YYYY") }</td>
                </tr>);
        });
    }
}

export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'RefunCompany',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(RefunCompany)));
