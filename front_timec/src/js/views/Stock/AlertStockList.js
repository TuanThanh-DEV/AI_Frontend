import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import ModalAlertStock from './ModalAlertStock';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { RenderInputWithDiv, RenderSelect } from '../../components/formInputs';
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import { constant } from 'lodash';
import { PermanentCacheService } from '../../services/middleware';

const validate = values => {
    const errors = {};
    return errors;
}
const mapStateToProps = state => {
    return {
        currentUser: state.common.currentUser
    };
};

const mapDispatchToProps = dispatch => ({
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "AlertStockList", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});

class AlertStockList extends React.Component {
    constructor() {
        super();
        this.state = {
            listStock: null,
            isStockModalShown: false,
            objectstock: null,
            idStock: "",
            optionDrugStore: [],
            hasDownloadedExcel: false,
            allExcelData: null
        }
        this.handleShowModalAlertStock = this.handleShowModalAlertStock.bind(this);
        this.handleHidemodal = () => {
            const {handleSubmit} = this.props;
            this.setState({ isStockModalShown: false });
            this.handleSubmit(this.handleSearchForm)();
        };
        this.setPermanentCache = (values) => {
            if (values) {
                if (values.drugStoreId) {
                    PermanentCacheService.setItem("AlertStockList_selected_drugStoreId", values.drugStoreId);
                }
                if (values.status) {
                    PermanentCacheService.setItem("AlertStockList_selected_status", values.status);
                }
                if (values.search) {
                    PermanentCacheService.setItem("AlertStockList_selected_search", values.search);
                }
                
            }
        };

        this.handleSearchForm = this.handleSearchForm.bind(this);
        this.handleSearchAllForExcel = this.handleSearchAllForExcel.bind(this);

    };
    handleShowModalAlertStock(id) {
        this.setState({
            isStockModalShown: true,
            idStock: id
        });
    }

    handleSearchForm(values) {
        this.setPermanentCache(values);
        var page = qs.parse(this.props.location.search).page;
        if (!page) {
            page = 1;
        }
        if (!values.search) {
            values.search = '';
        }
        let setStateInRequest = (list) => {
            this.setState({
                listStock: list,
                hasDownloadedExcel: false
                // fromDate:cacheFromDate,
                // toDate:cacheFromDate
            })
        }
        return agent.asyncRequests.getPage('/stock/filterDrugname?status=' + values.status + '&drugStoreId=' + values.drugStoreId + '&drugName=' + values.search, page
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

    handleSearchAllForExcel(values) {
        this.setPermanentCache(values);
        var page = qs.parse(this.props.location.search).page;
        if (!page) {
            page = 1;
        }
        if (!values.search) {
            values.search = '';
        }
        let setStateInRequest = (list) => {
            this.setState({
                allExcelData: list,
                hasDownloadedExcel: true
            })
        }
        return agent.asyncRequests.getPage('/stock/filterDrugname?status=' + values.status + '&drugStoreId=' + values.drugStoreId + '&drugName=' + values.search, page, 100000
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
        const {updateField} = this.props;
        agent.DrugStoreApi.loadOptionsComboBox(this);
        // Always show 3 is the main drugStore
        var initialDrugStoreId = PermanentCacheService.getItem("AlertStockList_selected_drugStoreId") ? PermanentCacheService.getItem("AlertStockList_selected_drugStoreId") : "3";
        var initialStatus = PermanentCacheService.getItem("AlertStockList_selected_status") ? PermanentCacheService.getItem("AlertStockList_selected_status") : "ALL";
        var initialSearch = PermanentCacheService.getItem("AlertStockList_selected_search") ? PermanentCacheService.getItem("AlertStockList_selected_search") : "";
        updateField("drugStoreId", initialDrugStoreId);
        updateField("status", initialStatus);
        updateField("search", initialSearch);

        this.handleSearchForm({ drugStoreId: initialDrugStoreId, status: initialStatus, search: initialSearch });
    };

    render() {
        const { handleSubmit, submitting } = this.props;

        var optionStatus = [
            { label: "Tất Cả", value: "ALL" },
            { label: "Cảnh Báo thấp", value: "warningGrey" },
            { label: "Cảnh Báo vừa", value: "warningYellow" },
            { label: "Cảnh Báo cao", value: "warningRed" },
            { label: "Chưa Có Cảnh Báo", value: "notWarning" }
        ];

        const data = this.state.listStock;
        if (!data) {
            return null;
        }
        
        var page = qs.parse(this.props.location.search).page;
        if (!page) {
            page = 1;
        }

        var rows = this.renderRowsFromDataContent(data.content);

        var rowsForExcel = [];
        if (this.state.hasDownloadedExcel && this.state.allExcelData) {
            rowsForExcel = this.renderRowsFromDataContent(this.state.allExcelData.content);
        }
        return (
            <div className="content-wrapper">
                <div className="page-header page-header-default">
                    <div className="breadcrumb-line">
                        <ul className="breadcrumb">
                            <li><a href=""><i className="icon-home2 position-left"></i> Home</a> </li>
                            <li className="active">Quản Lý Nhà Thuốc</li>
                            <li className="active">Cảnh Báo Hết Thuốc - Vật Tư</li>
                        </ul>
                        <div className="heading-elements">
                            <div className="heading-btn-group">
                                {this.state.hasDownloadedExcel ? 
                                <ReactHTMLTableToExcel
                                id="test-table-xls-button"
                                className="btn bg-teal"
                                table="table-to-xls"
                                filename={"Cảnh báo thuốc "}
                                sheet="Thuốc Cảnh Báo"
                                buttonText="Download File Excel Tất Cả" />:
                                <button className="btn" onClick={() => handleSubmit(this.handleSearchAllForExcel)()}>Xuất File Excel Tất Cả</button> 
                                }
                                
                                {/* <button className="btn bg-teal" onClick={() => this.handleShowModalAlertStock()}>Thêm Cảnh Báo</button> */}
                                {/* {/* <button className="btn bg-teal" onClick={() => this.handleShowModalAlertStock()}>Nhập Thuốc</button> */}
                                {/* <button className="btn bg-teal" >Xuất Excel Dữ Liệu Tìm Được</button>  */}
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
                                                <Field name="drugStoreId" label="Kho Thuốc" options={this.state.optionDrugStore} component={RenderSelect}></Field>
                                            </div>
                                            <div className="col col-md-3" style={{ paddingLeft: "20px" }}>
                                                <Field name="status" label="Cảnh Báo Hết Thuốc" options={optionStatus} component={RenderSelect}></Field>
                                            </div>
                                            <div className="col col-md-5" style={{ paddingLeft: "20px" }}>
                                                <Field label="Tìm Kiếm" name="search" placeholder="Tìm Tên Thuốc..." autoFocus={true} component={RenderInputWithDiv}></Field>
                                            </div>
                                            <div className="col col-md-1" style={{ paddingLeft: "10px", paddingTop: "27px" }}>
                                                <button type="submit" className="btn bg-success btn-xlg">Tìm</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        
                            <table className="table table-xxs table-bordered" id="table-to-xls" style={{display: 'none'}}>
                                <thead>
                                    <tr className="bg-teal">
                                        <th data-toggle="true">STT</th>
                                        <th data-toggle="true">Tên Thuốc</th>
                                        <th data-toggle="true">Hoạt Chất</th>
                                        <th data-toggle="true">Kho Thuốc</th>
                                        <th data-toggle="true">Tồn Kho</th>
                                        <th data-toggle="true">Cảnh báo thấp</th>
                                        <th data-toggle="true">Cảnh báo vừa</th>
                                        <th data-toggle="true">Cảnh báo cao</th>
                                        <th data-toggle="true">SL bán trong 7 ngày</th>
                                        <th data-toggle="true">SL bán trong 30 ngày</th>
                                        <th data-toggle="true">SL bán trong 90 ngày</th>
                                        <th data-toggle="true">Giá Nhập</th>
                                        <th data-toggle="true">Giá Bán</th>
                                        <th data-toggle="true">ĐVT</th>

                                        <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rowsForExcel}
                                </tbody>
                            </table>


                        <div className="panel panel-flat">
                            <table className="table table-xxs table-bordered" id="table-screen">
                                <thead>
                                    <tr className="bg-teal">
                                        <th data-toggle="true">STT</th>
                                        <th data-toggle="true">Tên Thuốc</th>
                                        <th data-toggle="true">Hoạt Chất</th>
                                        <th data-toggle="true">Kho Thuốc</th>
                                        <th data-toggle="true">Tồn Kho</th>
                                        <th data-toggle="true">Cảnh báo thấp</th>
                                        <th data-toggle="true">Cảnh báo vừa</th>
                                        <th data-toggle="true">Cảnh báo cao</th>
                                        <th data-toggle="true">SL bán trong 7 ngày</th>
                                        <th data-toggle="true">SL bán trong 30 ngày</th>
                                        <th data-toggle="true">SL bán trong 90 ngày</th>
                                        <th data-toggle="true">Giá Nhập</th>
                                        <th data-toggle="true">Giá Bán</th>
                                        <th data-toggle="true">ĐVT</th>

                                        <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows}
                                </tbody>
                            </table>
                        </div>
                        {this.state.isStockModalShown ? <ModalAlertStock
                            title="Thông Tin Cảnh Báo Tồn Kho"
                            idStock={this.state.idStock}
                            show={this.state.isStockModalShown}
                            onHide={this.handleHidemodal} /> : null
                        }
                    </div>
                    <TablePagination data={data} baseUrl="/listAlertStock" />
                </div>
            </div>

        );
    }

    renderRowsFromDataContent(dataContent) {
        return dataContent.map(item => {
            var alertBackgroundColor = '';
            if(!item.drug.deleted && item.drug.sellable){

                if (item.available < item.warningRed) {
                    alertBackgroundColor = 'red';
                } else if (item.available < item.warningYellow) {
                    alertBackgroundColor = 'yellow';
                } else if (item.available < item.warningGrey) {
                    alertBackgroundColor = 'grey';
                } else {
                    alertBackgroundColor = '';
                }
                return (
                    <tr key={item.id}>
                        <td>{item.idcurrentNo}</td>
                        <td style={{ backgroundColor: alertBackgroundColor }}>{item.drug.name + " " + item.drug.hamLuongBHYT}</td>
                        <td>{item.drug.ingredient}</td>
                        <td>{item.drugStore.name}</td>
                        <td>{item.available}</td>
                        <td>{item.warningGrey}</td>
                        <td>{item.warningYellow}</td>
                        <td>{item.warningRed}</td>
                        <td>{item.soldLastWeek}</td>
                        <td>{item.soldLastMonth}</td>
                        <td>{item.soldLastQuater}</td>
                        <td>{item.drug.importPrice}</td>
                        <td>{item.drug.salePrice}</td>
                        <td>{item.drug.uom}</td>
                        <td><a onClick={() => this.handleShowModalAlertStock(item.id)}><i className="icon-pencil"></i></a></td>

                    </tr>);
            }
        });
    }
}

export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'AlertStockList',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(AlertStockList)));
        