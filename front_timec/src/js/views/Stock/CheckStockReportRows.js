import qs from 'query-string';
import React from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import { RenderDatePicker, RenderInputWithDiv, RenderSelect } from '../../components/formInputs';
import agent from '../../services/agent';
import moment from 'moment'
import { FormatterUtils } from '../../utils/javascriptUtils';

const selector = formValueSelector("CheckStockReport");

const validate = values => {
    const errors = {};
    return errors;
}
const mapStateToProps = state => {
    return {
        currentUser: state.common.currentUser,
        fromDate: selector(state, 'fromDate'),
        toDate: selector(state, 'toDate'),
        drugStoreId: selector(state, 'drugStoreId'),
        search: selector(state, 'search'),
    };
};

const mapDispatchToProps = dispatch => ({
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "CheckStockReportRows", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});

class CheckStockReportRows extends React.Component {
    constructor() {
        super();
        this.state = {
            isShowStockMovementRows: false,
            listDetail: null
        }
        this.handleShowRow = this.handleShowRow.bind(this);
        this.getListStockMovements = this.getListStockMovements.bind(this);
    };

    componentWillMount() {
    };

    handleShowRow() {
        let isShowStockMovementRows = this.state.isShowStockMovementRows;
        isShowStockMovementRows = !this.state.isShowStockMovementRows;
        this.setState({ isShowStockMovementRows: isShowStockMovementRows, listDetail: null })
        if (isShowStockMovementRows) {
            this.getListStockMovements();
        }
    }

    getListStockMovements() {
        const { item, fromDate, toDate, drugStoreId } = this.props;

        let fromDateParam = "";
        let toDateParam = "";
        let drugStoreIdParam = "ALL"

        fromDate ? fromDateParam = moment(fromDate).format("YYYY-MM-DD") : fromDateParam;
        toDate ? toDateParam = moment(toDate).format("YYYY-MM-DD") : toDateParam;
        drugStoreId ? drugStoreIdParam = drugStoreId : drugStoreIdParam;

        let setStateInRequest = (list) => { this.setState({ listDetail: list }) }
        return agent.asyncRequests.get('/report/checkStockReportByDrugId?fromDate=' + fromDateParam + '&toDate=' + toDateParam
            + '&drugId=' + item.drug.id + "&drugStoreId=" + drugStoreIdParam).then(function (res) {
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
        const { handleSubmit, item, t, currentNo } = this.props;
        var detailTableRow = [];
        var dataDetail = this.state.listDetail;
        const { isShowStockMovementRows } = this.state;
        if (dataDetail) {
            let drugStoreId = 0;
            let stt = 1;
            let type = '';
            detailTableRow = dataDetail.map(item => {
                if (item.movementType == "XUAT_KHO") {
                    type = 'Xuất Kho'
                }
                if (item.movementType == "KIEM_KHO") {
                    type = 'Kiểm Kho'
                }
                if (item.movementType == "NHAP_KHO") {
                    type = 'Nhập Kho'
                }
                if (item.movementType == "BAN_LE") {
                    type = 'Xuất - Bán Lẻ'
                }

                if (drugStoreId == 0) {
                    drugStoreId = item.drugStoreId;
                    return ([<tr>
                        <td>{currentNo + ' . ' + stt}</td>
                        <td colSpan={2}>{item.drugStore.name}</td>
                        <td colSpan={2}>{t(item.movementType)}</td>
                        <td colSpan={2}>{FormatterUtils.formatCurrency(item.movementItemPrice)}</td>
                        <td colSpan={2}>{FormatterUtils.formatCurrency(item.drug.salePrice)}</td>
                        <td colSpan={2}>{item.quantity}</td>
                        <td colSpan={2}>{moment(item.movementDate).format("DD-MM-YYYY")}</td>
                    </tr>])
                } else if (drugStoreId == item.drugStoreId) {
                    return [<tr>
                        <td></td>
                        <td colSpan={2}></td>
                        <td colSpan={2}>{t(item.movementType)}</td>
                        <td colSpan={2}>{FormatterUtils.formatCurrency(item.movementItemPrice)}</td>
                        <td colSpan={2}>{FormatterUtils.formatCurrency(item.drug.salePrice)}</td>
                        <td colSpan={2}>{item.quantity}</td>
                        <td colSpan={2}>{moment(item.movementDate).format("DD-MM-YYYY")}</td>
                    </tr>]
                } else if (drugStoreId != item.drugStoreId) {
                    stt++;
                    drugStoreId = item.drugStoreId;
                    return ([<tr>
                        <td>{currentNo + ' . ' + stt}</td>
                        <td colSpan={2}>{item.drugStore.name}</td>
                        <td colSpan={2}>{t(item.movementType)}</td>
                        <td colSpan={2}>{FormatterUtils.formatCurrency(item.movementItemPrice)}</td>
                        <td colSpan={2}>{FormatterUtils.formatCurrency(item.drug.salePrice)}</td>
                        <td colSpan={2}>{item.quantity}</td>
                        <td colSpan={2}>{moment(item.movementDate).format("DD-MM-YYYY")}</td>
                    </tr>])
                }
                // if (drugStoreId == 0) {
                //     drugStoreId = item.drugStoreId;
                //     return ([<tr>
                //         <td>{currentNo + ' . ' + stt}</td>
                //         <td colSpan={2}>{item.drugStore.name}</td>
                //     </tr>, <tr>
                //         <td></td>
                //         <td colSpan={2}></td>
                //         <td colSpan={2}>{t(item.movementType)}</td>
                //         <td colSpan={2}>{FormatterUtils.formatCurrency(item.movementItemPrice)}</td>
                //         <td colSpan={2}>{FormatterUtils.formatCurrency(item.drug.salePrice)}</td>
                //         <td colSpan={2}>{item.quantity}</td>
                //         <td colSpan={2}>{moment(item.movementDate).format("DD-MM-YYYY")}</td>
                //         {/* <td></td>
                //         <td colSpan={2}></td>
                //         <td colSpan={2}>{type}</td>
                //         <td colSpan={2}>{FormatterUtils.formatCurrency(item.inputPrice)}</td>
                //         <td colSpan={2}>{FormatterUtils.formatCurrency(item.outputPrice)}</td>
                //         <td colSpan={2}>{item.quantity}</td>
                //         <td colSpan={2}>{moment(item.dateMovement).format("DD-MM-YYYY")}</td> */}
                //     </tr>])
                // } else if (drugStoreId == item.drugStoreId) {
                //     return [<tr>
                //         <td></td>
                //         <td colSpan={2}></td>
                //         <td colSpan={2}>{t(item.movementType)}</td>
                //         <td colSpan={2}>{FormatterUtils.formatCurrency(item.movementItemPrice)}</td>
                //         <td colSpan={2}>{FormatterUtils.formatCurrency(item.drug.salePrice)}</td>
                //         <td colSpan={2}>{item.quantity}</td>
                //         <td colSpan={2}>{moment(item.movementDate).format("DD-MM-YYYY")}</td>
                //     </tr>]
                // } else if (drugStoreId != item.drugStoreId) {
                //     stt++;
                //     drugStoreId = item.drugStoreId;
                //     return [<tr>
                //         <td>{currentNo + ' . ' + stt}</td>
                //         <td colSpan={2}>{item.drugStore.Name}</td>
                //     </tr>, <tr>
                //     <td></td>
                //         <td colSpan={2}></td>
                //         <td colSpan={2}>{t(item.movementType)}</td>
                //         <td colSpan={2}>{FormatterUtils.formatCurrency(item.movementItemPrice)}</td>
                //         <td colSpan={2}>{FormatterUtils.formatCurrency(item.drug.salePrice)}</td>
                //         <td colSpan={2}>{item.quantity}</td>
                //         <td colSpan={2}>{moment(item.movementDate).format("DD-MM-YYYY")}</td>
                //     </tr>]
                // }

            })
        }
        var detailTable = [<tr className="success">
            <th >STT</th>
            <th colSpan={2}>Kho Thuốc</th>
            <th colSpan={2}>Loại</th>
            <th colSpan={2}>Giá Nhập</th>
            <th colSpan={2}>Giá Bán</th>
            <th colSpan={2}>Số Lượng</th>
            <th colSpan={2}>Ngày</th>
        </tr>].concat(detailTableRow);
        return (
            [<tr key={'CheckStockReportRows_ ' + item.id}>
                <td>{currentNo}
                    {isShowStockMovementRows ? <button className="bg-info-600 icon-dash" onClick={() => this.handleShowRow()}></button> :
                        <button className="bg-info-600 icon-plus22" onClick={() => this.handleShowRow()}></button>}
                </td>
                <td>{item.drug.thongTinThau}</td>
                <td>{moment(item.drug.publishedDate).format("DD/MM/YYYY")}</td>
                <td>{item.drug.maHoatChat}</td>
                <td>{item.drug ? item.drug.ingredient : ''}</td>
                <td>{item.drug.name}</td>
                <td>{item.drug.hamLuong}</td>

                <td>{item.drug.duongDungBHYT}</td>
                <td>{item.drug.producerCompany}</td>
                <td>{item.drug.producerCountry}</td>

                <td>{item.drug.uom}</td>
                <td>{item.drug.salePrice}</td>
                <td>{item.beforeStock}</td>
                <td>{item.totalInputStock}</td>
                <td>{Math.abs(item.totalOutputStock)}</td>
                <td>{item.kiemkho}</td>
                <td>{item.beforeStock + item.totalInputStock + item.totalOutputStock + item.kiemkho}</td>
                <td>{item.drug.deleted ? 'Có' : 'Không'}</td>
            </tr>].concat(isShowStockMovementRows ? detailTable : null)
        );
    }
}

export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'CheckStockReportRows',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(CheckStockReportRows)));
