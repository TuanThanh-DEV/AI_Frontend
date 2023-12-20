import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { ScriptUtils } from '../../utils/javascriptUtils';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import moment from 'moment';
// import ModalPayment from './ModalPayment';
import { FormatterUtils } from '../../utils/javascriptUtils';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import pdfMake from 'pdfmake/build/pdfmake';
import ModalOutputStockForInvoiceList from '../OutputStock/ModalOutputStockForInvoiceList';
import SecuredComponent from '../../components/SecuredComponent';
import { DataPrintService } from '../DataPrintService';


class InputFormInputStockRow extends React.Component {
    constructor() {
        super();
        this.state = {
            listInputForm: null,
            isShowInputStockRows: false,
            InputFormObj: [],
            isShowModalOutputStock: false,
            idInvoice: null
        }
        this.handleShowInputStock = this.handleShowInputStock.bind(this);
        this.renderPDF = this.renderPDF.bind(this);
    };


    renderPDF(dataExportInputStock) {

        var inputFormObj = this.props.InputFormObj;

        var imageLogo = this.state.imageLogo;

        const { t } = this.props;
        var today = new Date();
        var producedDate = [];
        var drugName = [];
        var expiredDate = [];
        var inputAmount = [];
        var salePrice = [];
        var importPrice=[];
        var totalPrice=[];
        var totalAllImport = 0;
        dataExportInputStock.map(item => {

            drugName.push(item.drug ? item.drug.name  + " " + item.drug.hamLuongBHYT : null);
            inputAmount.push(FormatterUtils.formatCurrency(item.inputAmount));
            // amountWithVat.push(item.batchBarcode);
            producedDate.push(item.producedDate);
            expiredDate.push(item.expiredDate);
            salePrice.push(item.salePrice);
            importPrice.push(FormatterUtils.formatCurrency(item.importPrice));
            totalPrice.push(FormatterUtils.formatCurrency(item.importPrice * item.inputAmount));
            totalAllImport += item.importPrice * item.inputAmount;
            return (
                drugName, inputAmount, salePrice, producedDate, expiredDate
            )
        });

        var tableItems = {
            style: 'tableExample',
            table: {
                widths: ['*', 'auto', 'auto', 'auto', 'auto'],
                body: [
                    [{ text: 'Tên thuốc', style: 'tableHeader', alignment: 'center' }, { text: 'Ngày sản xuất', style: 'tableHeader', alignment: 'center' }, { text: 'Số Lượng', style: 'tableHeader', alignment: 'center' }, { text: 'Đơn Giá', style: 'tableHeader', alignment: 'center' }, { text: 'Thành Tiền', style: 'tableHeader', alignment: 'center' }],
                    [drugName, producedDate, inputAmount, importPrice, totalPrice],
                ]

            },
        },
            dataExport = {
                content: [
                    {
                        columns: [
                            { text: 'Sở Y Tế TPHCM' + '\n Phòng Khám Đa Khoa Quốc Tế TIMEC' + '\n Số:'+ inputFormObj.id + '/2020/GCT', fontSize: 11, alignment: 'center' },
                            imageLogo ? {
                                image: imageLogo,
                                fit: [100, 100],
                                alignment: 'left',
                                margin: [20, 0, 0, 0],
                            } : "",
                            { text: 'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM' + '\n Độc Lập - Tự Do - Hạnh Phúc' + '\n ---------------', fontSize: 11, alignment: 'center' },
                        ]
                    },

                    {
                        columns: [

                            { text: '\n THÔNG TIN PHIẾU NHẬP KHO \n\n', fontSize: 15, alignment: 'center' },

                        ]
                    },

                    tableItems,

                    {
                        columns: [
                            {

                                text: '\n Tổng Tiền Nhập: ' + FormatterUtils.formatCurrency(totalAllImport), alignment: 'center', fontSize: 11,

                            }
                        ]
                    },

                    {
                        columns: [
                            {

                                text: '\n Ngày nhập: ' + moment(inputFormObj.inputDate).format("LL") + '\n\n NGƯỜI LẬP PHIẾU \n\n\n' + '', alignment: 'center', fontSize: 11,

                            }
                        ]
                    },

                ],
                styles: {
                    header: {
                        fontSize: 10,
                        bold: true
                    },
                    bigger: {
                        fontSize: 10,
                        italics: true
                    },
                    tableExample: {
                        margin: [0, 5, 0, 15]
                    },
                    tableHeader: {
                        bold: true,
                        fontSize: 13,
                        color: 'black'
                    }
                },
                defaultStyle: {
                    columnGap: 10
                }

            }
        return dataExport;
    }
    
    handleSavePDF(dataExportRetail) {
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        pdfMake.createPdf(dataExportRetail).download('PHIEU-NHAP-KHO.pdf');
    }
    handlegetListToPrint(id) {
        this.getListInputStockByInputFormId(id);
    }
    handleEditInputStock(id) {
        this.getListEditInputStock(id);
    }

    handleCancelDoneInputForm(id) {
        if (confirm("Bạn có chắc sẽ hủy phiếu đã nhập? Lưu ý tồn kho sẽ thay đổi sau khi hủy phiếu này.")) {
            var url = `/inputForm/cancelInputStock?inputFormId=${id}`;
            return agent.asyncRequests.get(url
            ).then(function (res) {
                var result = res.body.resultData;
                if (result == "success") {
                    toast.info("Hủy Thành Công Phiếu Nhập Kho.", {autoClose: 2000});
                    window.location.reload(true);
                } else {
                    toast.error("Có lỗi khi xóa dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Không thể xóa dữ liệu đang được sử dụng từ màn hình khác! ", { autoClose: 15000 });
            });


        } else {
        }
    }
    

    getListInputStock() {
        const inputFormId = this.props.InputFormObj.id;
        let setStateInRequest = (list) => { this.setState({ listInputForm: list }) }
        return (agent.asyncRequests.get("/inputStock/findByInputFormId?inputFormId=" + inputFormId).then(function (res) {
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
    getListInputStockByInputFormId() {
        var _this = this;
        const inputFormId = this.props.InputFormObj.id;
        let setStateInRequest = (list) => { this.setState({ listInputForm: list }) }
        return (agent.asyncRequests.get("/inputStock/findByInputFormId?inputFormId=" + inputFormId).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                _this.handleSavePDF(_this.renderPDF(result));
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
    getListEditInputStock(id){
        window.location.href = "/inputForm/" + id;

     }

    handleShowInputStock() {
        let isShowInputStockRows = this.state.isShowInputStockRows;
        isShowInputStockRows = !this.state.isShowInputStockRows;
        this.setState({ isShowInputStockRows: isShowInputStockRows })
        if (isShowInputStockRows) {
            this.getListInputStock();
        }
    }

    componentWillMount() {

        var url = '/assets/images/logo_timec.png';
        FormatterUtils.downloadImageDataUri(url, this, "imageLogo");
    };

    render() {
        const { InputFormObj, t } = this.props;
        var isShowInputStockRows = this.state.isShowInputStockRows;
        var dataInputForm = this.state.listInputForm;
        var inputStockRows = [];
        var inputStock = [];
        var CurrentNo = 0;


        if (dataInputForm) {
            inputStockRows = dataInputForm.map(item => {


                return (
                    <tr key={"inputStock_" + item.id}>
                        <td> {CurrentNo++}</td>
                        <td colSpan="3">{item.batchBarcode}</td>
                        <td colSpan="4">{item.drug.name + " " + item.drug.hamLuongBHYT}</td>
                        <td colSpan="1">{item.drug.uom}</td>
                        <td colSpan="1">{item.inputDate}</td>
                        <td colSpan="1">{item.expiredDate}</td>
                        <td colSpan="1">{FormatterUtils.formatCurrency(item.importPrice) }</td>
                        <td colSpan="1">{FormatterUtils.formatCurrency(item.salePrice)}</td>
                        <td colSpan="1">{FormatterUtils.formatCurrency(item.inputAmount)}</td>
                        
                        {/* handlegetListToPrintBarcode */}
                        <td className="text-center footable-visible footable-last-column">
                            <a onClick={() => DataPrintService.handleGetListToPrintBarcode(item.batchBarcode)}><i className="icon-printer"></i></a>
                        </td>
                    </tr>
                );
            })
            inputStock = [<tr className="success">
                <th>STT </th>
                <th colSpan="3">Mã Thuốc</th>
                <th colSpan="4">Thuốc</th>
                <th>ĐVT</th>
                <th>Ngày Sản Xuất</th>
                <th>Hết Hạn</th>
                <th>Giá Nhập</th>
                <th>Giá Bán</th>
                <th>Số Lượng</th>
                
                <th colSpan="3" className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                
            </tr>
            ].concat(isShowInputStockRows ? inputStockRows : null);
        }

        return (
            [<tr key={InputFormObj.id}>
                <td> {isShowInputStockRows ? <button className="bg-info-600 icon-dash" onClick={() => this.handleShowInputStock(InputFormObj.id)}></button> :
                    <button className="bg-info-600 icon-plus22" onClick={() => this.handleShowInputStock(InputFormObj.id)}></button>}
                </td>
                <td colSpan="1">{ InputFormObj.id}</td>
                <td colSpan="2">{ InputFormObj.drugStore ? InputFormObj.drugStore.name : ""}</td>
                <td colSpan="2">{moment(InputFormObj.inputDate).format("DD/MM/YYYY")}</td>
                <td colSpan="1">{InputFormObj.createdUser ? InputFormObj.createdUser.fullName : ""}</td>
                <td colSpan="1">{InputFormObj.validatedUser ? InputFormObj.validatedUser.fullName : ""}</td>
                <td colSpan="1">{InputFormObj.status}</td>
                <td colSpan="1">{FormatterUtils.formatCurrency(InputFormObj.invoiceAmountSupplier)}</td>
                <td colSpan="2">{InputFormObj.invoiceNumberSupplier}</td>
                <td colSpan="3">{InputFormObj.note}</td>
                <td colSpan="3" className="text-center footable-visible footable-last-column">
                        <ul className="icons-list">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="icon-menu9"></i>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-right">
                                    <li><a href={"/inputForm/" + InputFormObj.id}><i className="icon-pencil"></i>Xem Chi Tiết</a></li>
                                    <li><a onClick={() => this.handlegetListToPrint(InputFormObj.id)}><i className="icon-printer2"></i>In Thông Tin Phiếu Nhập Kho</a></li>
                                    {InputFormObj.status == 'DONE'  && InputFormObj.hasCancellable ? 
                                    <SecuredComponent allowedPermission="admin.allInputForm.cancelDoneInputForm">
                                    <li><a onClick={() => this.handleCancelDoneInputForm(InputFormObj.id)}><i className="icon-pencil"></i>Hủy Phiếu!</a></li></SecuredComponent> : ""}
                                </ul>
                            </li>
                        </ul>
                    </td>              
            </tr>].concat(isShowInputStockRows ? inputStock : null)

        );

    }
}
export default translate('translations')(InputFormInputStockRow);