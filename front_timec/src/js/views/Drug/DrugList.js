import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { ScriptUtils } from '../../utils/javascriptUtils';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import ModalDrug from './ModalDrug';
import { RenderSelect } from '../../components/formInputs';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { FormatterUtils } from '../../utils/javascriptUtils';
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import SecuredComponent from '../../components/SecuredComponent';
import { DataPrintService } from '../DataPrintService';

const validate = values => {
    const errors = {};
    return errors;
};


const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
});

const mapDispatchToProps = dispatch => ({
});

class DrugList extends React.Component {
    constructor() {
        super();
        this.state = {
            listDrug: null,
            isDrugModalShown: false,
            objectdrug: null,
            idDrug: "",
            optionSupplier: [],
            listAllDrug: [],
        }
        this.handleShowmodal = this.handleShowmodal.bind(this);
        this.handleHidemodal = () => {
            this.setState({ isDrugModalShown: false });
            this.updateListDrug();
        };

    };
    handleShowmodal(id) {
        this.setState({
            isDrugModalShown: true,
            idDrug: id
        });
    }
    updateListDrug(supplierId) {
        supplierId = supplierId ? supplierId : "";
        var search = qs.parse(this.props.location.search).search;
        var page = qs.parse(this.props.location.search).page;
        let setStateInRequest = (list) => { this.setState({ listDrug: list }) }
        return agent.DrugApi.listDrug(search, supplierId, page
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
    exportListDrug() {
        let setStateInRequest = (list) => { this.setState({ listAllDrug: list }) }
        return agent.DrugApi.listAllDrug(
        ).then(function (res) {
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
        this.updateListDrug();
        this.exportListDrug();
        agent.SupplierApi.loadOptionsComboBox(this);

    };

    deleteDrug(id) {
        if (confirm("Bạn có chắc sẽ xoá !")) {
            var url = `/drug/${id}`;
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
        const data = this.state.listDrug;
        const datalistAllDrug = this.state.listAllDrug;
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
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.placeCode}</td>
                    <td>{item.ingredient}</td>
                    <td>{item.barCode}</td>
                    <td>{FormatterUtils.formatCurrency(item.salePrice) + " / " + item.uom}</td>
                    <td>{FormatterUtils.formatCurrency(item.packageSalePrice) + (item.packageUom ? " / " + item.packageUom + ' (' + item.numberOfPackageItems + ' ' + item.uom + ')': '') }</td>
                    <td>{item.supplier ? item.supplier.name : ""}</td>
                    {/* <td>{item.uom ? item.uom : null}</td> */}
                    <td>{item.drugCategory ? item.drugCategory.name : null}</td>
                    <td>{item.sellable ? "Có" : "Không"}</td>
                    <td>{item.deleted ? "Có" : "Không"}</td>
                    <td className="text-center footable-visible footable-last-column">
                        <ul className="icons-list">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="icon-menu9"></i>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-right">
                                <li><a onClick={() => DataPrintService.handleGetListToPrintBarcode(item.barCode)}><i className="icon-printer"></i>In Barcode</a></li>
                                <SecuredComponent allowedPermission="admin.drug.update">
                                    <li><a onClick={() => this.handleShowmodal(item.id)}><i className="icon-pencil"></i>Chỉnh Sửa</a></li>
                                </SecuredComponent>
                                <SecuredComponent allowedPermission="admin.drug.delete">
                                    <li><a onClick={() => this.deleteDrug(item.id)}><i className="icon-cross2"></i>Xóa</a></li>
                                </SecuredComponent>
                                </ul>
                            </li>
                        </ul>
                    </td>
                </tr>);
        });
        var rowslistAllDrug = datalistAllDrug.map(item => {
            currentNo++
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.placeCode}</td>
                    <td>{item.ingredient}</td>
                    <td>{"'" + item.barCode}</td>
                    <td>{FormatterUtils.formatCurrency(item.salePrice)}</td>
                    <td>{item.supplier ? item.supplier.name : ""}</td>
                    <td>{item.uom ? item.uom : null}</td>
                    <td>{item.drugCategory ? item.drugCategory.name : null}</td>
                    <td>{item.sellable ? "Có" : "Không"}</td>
                    <td>{item.deleted ? "Có" : "Không"}</td>
                </tr>);
        });
        return (
            <div className="content-wrapper">
                <div className="page-header page-header-default">
                    <div className="breadcrumb-line">
                        <ul className="breadcrumb">
                            <li><a href=""><i className="icon-home2 position-left"></i> Home</a> </li>
                            <li className="active">Quản Lý Nhà Thuốc</li>
                            <li className="active">Thuốc</li>
                        </ul>
                        <div className="heading-elements">
                            <div className="heading-btn-group">
                                <ReactHTMLTableToExcel
                                    id="test-table-all-employee-xls-button"
                                    className="download-table-xls-button btn btn-info marginL"
                                    table="table-all-employee-xls-button"
                                    filename="Danh sách thuốc"
                                    sheet="DanhSachThuoc"
                                    buttonText="Download Excel Thuốc" />
                                <button className="btn bg-teal" onClick={() => this.handleShowmodal()}>Thêm Mới</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="panel panel-flat">

                                <div className="panel-body">
                                    <form className="main-search" role="form">
                                        <div className="input-group content-group">
                                            <div className="has-feedback has-feedback-left">
                                                <input type="text" className="form-control input-xlg" placeholder="Tìm kiếm theo tên thuốc, mã thuốc, hoạt chất..." name="search" defaultValue={search} autoFocus={true} />
                                                <div className="form-control-feedback">
                                                    <i className="icon-search4 text-muted text-size-base"></i>
                                                </div>
                                            </div>
                                            <div className="input-group-btn">
                                                <button type="submit" className="btn bg-teal btn-xlg">Tìm</button>
                                            </div>
                                        </div>
                                    </form>
                                    <Field name="supplierId" placeholder="Tìm Nhà Cung Cấp"
                                        options={this.state.optionSupplier} component={RenderSelect}
                                        onChangeAction={(supplierId) => this.updateListDrug(supplierId)}></Field>
                                </div>
                            </div>

                            <div className="panel panel-flat">
                                <table className="table table-xxs table-bordered">
                                    <thead>
                                        <tr className="bg-teal">
                                            <th data-toggle="true">ID</th>
                                            <th data-toggle="true">Tên Thuốc</th>
                                            <th data-toggle="true">Mã Vị Trí</th>
                                            <th data-toggle="true">Hoạt Chất</th>
                                            <th data-toggle="true">Barcode</th>
                                            <th data-toggle="true">Giá Bán Lẻ</th>
                                            <th data-toggle="true">Giá Bán Sỉ</th>
                                            <th data-toggle="true">Nhà cung cấp</th>
                                            {/* <th data-toggle="true">Đơn Vị Tính</th> */}
                                            <th data-toggle="true">Loại Thuốc</th>
                                            <th data-toggle="true">Được Bán</th>
                                            <th data-toggle="true">Ẩn Thuốc</th>
                                            <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows}
                                    </tbody>
                                </table>
                                <table className="table table-xxs table-bordered" id="table-all-employee-xls-button" style={{ display: "none" }}>
                                    <thead>
                                        <tr className="bg-teal">
                                            <th data-toggle="true">STT</th>
                                            <th data-toggle="true">Tên Thuốc</th>
                                            <th data-toggle="true">Mã Vị Trí</th>
                                            <th data-toggle="true">Hoạt Chất</th>
                                            <th data-toggle="true">Barcode</th>
                                            <th data-toggle="true">Giá Bán</th>
                                            <th data-toggle="true">Nhà cung cấp</th>
                                            <th data-toggle="true">Đơn Vị Tính</th>
                                            <th data-toggle="true">Loại Thuốc</th>
                                            <th data-toggle="true">Được Bán</th>
                                            <th data-toggle="true">Ẩn Thuốc</th>
                                            {/* <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rowslistAllDrug}
                                    </tbody>
                                </table>
                            </div>
                            {this.state.isDrugModalShown ? <ModalDrug
                                title={this.state.idDrug ? "Chỉnh Sửa Thuốc" : "Thêm Thuốc"}
                                idDrug={this.state.idDrug}
                                show={this.state.isDrugModalShown}
                                onHide={this.handleHidemodal} /> : null
                            }

                            <TablePagination data={data} baseUrl="/listDrug" />
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
            form: 'DrugList',
            destroyOnUnmount: false,
            enableReinitialize: true,
            validate
        })(DrugList)));