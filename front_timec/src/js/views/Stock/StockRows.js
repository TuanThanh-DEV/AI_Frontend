import moment from 'moment';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import React from 'react';
import { translate } from 'react-i18next';
import { toast } from 'react-toastify';
import SecuredComponent from '../../components/SecuredComponent';
import agent from '../../services/agent';
import { FormatterUtils, DateUtils } from '../../utils/javascriptUtils';
import ModalDrug from '../Drug/ModalDrug';
import ModalCheckStock from './ModalCheckStock';

class StockRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listStockMovements: null,
            isShowStockMovementRows: false,
            isCheckStockModalShown: false,
            isDrugModalShown: false,
        }
        this.handleShowStockMovement = this.handleShowStockMovement.bind(this);
        this.getListStockMovements = this.getListStockMovements.bind(this);
        this.handleHideModal = () => {
            this.setState({ 
                isCheckStockModalShown: false,
                isDrugModalShown: false
            });
            this.props.onReloadSearch();
        };
        this.showCheckStockModal = () => {
            this.setState({ isCheckStockModalShown : true });
        };

        this.showDrugModal = () => {
            this.setState({ isDrugModalShown : true });
        }

    };

    getListStockMovements() {
        const stockId = this.props.stockItem.id;
        let setStateInRequest = (list) => { this.setState({ listStockMovements: list }) }
        return (agent.asyncRequests.get("/stockMovement/listAllByStockId?stockId=" + stockId).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + res.body.errorMessage, {
                    autoClose: 15000
                });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", {
                autoClose: 15000
            });
        }))
    }

    handleShowStockMovement() {
        let isShowStockMovementRows = this.state.isShowStockMovementRows;
        isShowStockMovementRows = !this.state.isShowStockMovementRows;
        this.setState({ isShowStockMovementRows: isShowStockMovementRows, listStockMovements : null })
        if (isShowStockMovementRows) {
            this.getListStockMovements();
        }
    }

    handleShowModalOutputStock(id){
        this.setState({
            isShowModalOutputStock : true,
            idInvoice : id
        })
    }

    componentWillMount() {
        var url = '/assets/images/logo_timec.png';
        FormatterUtils.downloadImageDataUri(url, this, "imageLogo");
    };

    render() {
        const { t, stockItem} = this.props;
        var isShowStockMovementRows = this.state.isShowStockMovementRows;
        var stockMovementTable = [];
        var stockMovementRows = [];
        var listStockMovements = this.state.listStockMovements;
        if (listStockMovements) {
            var movementCurrentNo = 0;
            var totalInputAmount = 0;
            var totalOutputAmount = 0;
            var totalCheckStockAmount = 0;
            stockMovementRows = listStockMovements.map( (item, index) => {
                movementCurrentNo++;
                if (item.movementType == 'NHAP_KHO') {
                    totalInputAmount += item.quantity;
                } else if (item.movementType == 'XUAT_KHO') {
                    if(item.invoiceStatus == 'CLOSED'){
                        totalOutputAmount += item.quantity;
                    }
                } else if (item.movementType == 'KIEM_KHO') {
                    totalCheckStockAmount += item.quantity;
                }
                return (
                    <tr className="success" key={"invoice_" + index}>
                        <td >{movementCurrentNo}</td>
                        <td >{t(item.movementType)}</td>
                        <td >{DateUtils.formatDateForScreen(item.movementDate) }</td>
                        <td >{FormatterUtils.formatCurrency(item.quantity)}</td>
                        <td >{item.createdUser ? item.createdUser.fullName : ""}</td>
                        {item.movementType == 'KIEM_KHO' ? 
                            <td colSpan="6">{"Số lượng tồn kho sau kiểm: " + (item.preQuantity+item.quantity) +' . '+ (item.note != null ? item.note : '') + (item.invoiceStatus == 'CANCELLED' ? ' ( Đã Hủy )' : '' )}</td>
                            : <td colSpan={6}></td>
                        }
                        <td ></td>
                    </tr>
                );
            })
            stockMovementRows.push(<tr className="success" key={"movementStock_" + stockItem.id}>
                    <td colSpan="2"></td>
                    <td colSpan="2"><i>Tổng nhập trong kỳ: {totalInputAmount} {stockItem.drug.uom}</i></td>
                    <td colSpan="2"><i>Tổng xuất: {totalOutputAmount} {stockItem.drug.uom}</i></td>
                    <td colSpan="2"><i>SL Thay Đổi Kiểm Kho: {totalCheckStockAmount} {stockItem.drug.uom}</i></td>
                    <td colSpan="4"></td>
                </tr>);
            stockMovementTable = [<tr className="success">
                <th data-toggle="true">STT</th>
                <th data-toggle="true">Loại</th>
                <th data-toggle="true">Ngày thực hiện</th>
                <th data-toggle="true">Số lượng thay đổi</th>
                <th data-toggle="true">Người thực hiện</th>
                <th colSpan="6" data-toggle="true">Ghi chú</th>
                <th ></th>
            </tr>
            ].concat(stockMovementRows);
        }
        

        return (
            [<tr key={stockItem.id}>
                <td> {isShowStockMovementRows ? <button className="bg-info-600 icon-dash" onClick={() => this.handleShowStockMovement(stockItem.id)}></button> :
                    <button className="bg-info-600 icon-plus22" onClick={() => this.handleShowStockMovement(stockItem.id)}></button>}
                </td>
                <td>{stockItem.id}</td>
                {/* <td>{stockItem.drug.name + " " + stockItem.drug.hamLuongBHYT}</td> */}
                <td>{stockItem.drug.name + " " + (stockItem.drug.hamLuongBHYT != null ? stockItem.drug.hamLuongBHYT : '')}</td>

                <td>{stockItem.drug.barCode}</td>
                <td>{stockItem.drug.supplier ? stockItem.drug.supplier.name : ""}</td>
                <td>{stockItem.drug.uom}</td>
                <td>{stockItem.drug.packageUom ? stockItem.drug.packageUom + " (" + stockItem.drug.numberOfPackageItems + " " + stockItem.drug.uom + ")" : ""}</td>
                <td>{FormatterUtils.formatCurrency(stockItem.drug.importPrice)}</td>
                <td>{FormatterUtils.formatCurrency(stockItem.drug.salePrice)}</td>
                <td>{stockItem.drugStore.name}</td>
                <td>{FormatterUtils.formatCurrency(stockItem.available) }</td>
                <td className="text-center footable-visible footable-last-column">
                    <ul className="icons-list">
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                <i className="icon-menu9"></i>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-right">
                            <SecuredComponent allowedPermission="admin.stock.checkAndUpdate">
                                <li><a onClick={() => this.showCheckStockModal()}><i className="icon-stack-check"></i>Kiểm Kho</a></li>
                            </SecuredComponent>
                            <SecuredComponent allowedPermission="admin.drug.update">
                                <li><a onClick={() => this.showDrugModal()}><i className="icon-pencil"></i>Chỉnh Sửa Thuốc</a></li>
                            </SecuredComponent>
                                
                                
                            </ul>
                        </li>
                    </ul>
                </td>

                {this.state.isDrugModalShown ? <ModalDrug
                    title={stockItem.drug.id ? "Chỉnh Sửa Thuốc" : "Thêm Thuốc"}
                    idDrug={stockItem.drug.id}
                    show={this.state.isDrugModalShown}
                    onHide={this.handleHideModal} /> : null
                }

                {this.state.isCheckStockModalShown ? <ModalCheckStock
                                title={"Cập Nhật Kiểm Kho" }
                                stockObj={this.props.stockItem}
                                show={this.state.isCheckStockModalShown}
                                onHide={this.handleHideModal} /> : null
                            }
            </tr>].concat(isShowStockMovementRows ? stockMovementTable : null)

        );

    }
}
export default translate('translations')(StockRow);