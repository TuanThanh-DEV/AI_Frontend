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

class OutputFormOutputStockRow extends React.Component {
    constructor() {
        super();
        this.state = {
            listOutForm: null,
            isShowOutStockRows: false,
            OutputFormObj: [],
            isShowModalOutputStock: false,
            idInvoice: null
        }
        this.handleShowOutputStock = this.handleShowOutputStock.bind(this);
    };


    renderPDF(dataExportInputStock) {

        var outputFormObj = this.props.OutputFormObj;

        var imageLogo = this.state.imageLogo;

        const { t } = this.props;
        var today = new Date();
        var producedDate = [];
        var drugName = [];
        var expiredDate = [];
        var outAmount = [];
        var salePrice = [];
        var importPrice=[];
        var totalPrice=[];
        var totalAllImport = 0;
        dataExportInputStock.map(item => {

            drugName.push(item.drug ? item.drug.name + " " + item.drug.hamLuongBHYT : null);
            outAmount.push(FormatterUtils.formatCurrency(item.outAmount));
            // amountWithVat.push(item.batchBarcode);
            producedDate.push(item.producedDate);
            expiredDate.push(item.expiredDate);
            salePrice.push(item.salePrice);
            importPrice.push(FormatterUtils.formatCurrency(item.importPrice));
            totalPrice.push(FormatterUtils.formatCurrency(item.importPrice * item.outAmount));
            totalAllImport += item.importPrice * item.outAmount;
            return (
                drugName, outAmount, salePrice, producedDate, expiredDate
            )
        });

        var tableItems = {
            style: 'tableExample',
            table: {
                widths: ['*', 'auto', 'auto', 'auto', 'auto'],
                body: [
                    [{ text: 'Tên thuốc', style: 'tableHeader', alignment: 'center' }, { text: 'Ngày sản xuất', style: 'tableHeader', alignment: 'center' }, { text: 'Số Lượng', style: 'tableHeader', alignment: 'center' }, { text: 'Đơn Giá', style: 'tableHeader', alignment: 'center' }, { text: 'Thành Tiền', style: 'tableHeader', alignment: 'center' }],
                    [drugName, producedDate, outAmount, importPrice, totalPrice],
                ]

            },
        },
            dataExport = {
                content: [
                    {
                        columns: [
                            { text: 'Sở Y Tế TPHCM' + '\n Phòng Khám Đa Khoa Quốc Tế TIMEC' + '\n Số: '+ outputFormObj.id + '/2020/PXK', fontSize: 11, alignment: 'center' },
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

                            { text: '\n THÔNG TIN PHIẾU XUẤT KHO \n\n', fontSize: 15, alignment: 'center' },

                        ]
                    },

                    tableItems,

                    {
                        columns: [
                            {

                                text: '\n Tổng Tiền Xuất: ' + FormatterUtils.formatCurrency(totalAllImport), alignment: 'center', fontSize: 11,

                            }
                        ]
                    },

                    {
                        columns: [
                            {

                                text: '\n Ngày xuất: ' + moment(outputFormObj.outputDate).format("LL") + '\n\n NGƯỜI LẬP PHIẾU \n\n\n' + '', alignment: 'center', fontSize: 11,

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
        pdfMake.createPdf(dataExportRetail).download('PHIEU-XUAT-KHO.pdf');
    }
    handlegetListToPrint(id) {
        this.getListInputStockByInputFormId(id);
    }
    getListInputStock() {
        const outputFormId = this.props.OutputFormObj.id;
        let setStateInRequest = (list) => { this.setState({ listOutForm: list }) }
        return (agent.asyncRequests.get("/outputStock/findByOutputFormId?outputFormId=" + outputFormId).then(function (res) {
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
        const outputFormId = this.props.OutputFormObj.id;
        let setStateInRequest = (list) => { this.setState({ listOutForm: list }) }
        return (agent.asyncRequests.get("/outputStock/findByOutputFormId?outputFormId=" + outputFormId).then(function (res) {
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


    handleShowOutputStock() {
        let isShowOutStockRows = this.state.isShowOutStockRows;
        isShowOutStockRows = !this.state.isShowOutStockRows;
        this.setState({ isShowOutStockRows: isShowOutStockRows })
        if (isShowOutStockRows) {
            this.getListInputStock();
        }
    }

    componentWillMount() {

        var url = '/assets/images/logo_timec.png';
        FormatterUtils.downloadImageDataUri(url, this, "imageLogo");
    };

    render() {
        const { OutputFormObj, t } = this.props;
        var isShowOutStockRows = this.state.isShowOutStockRows;
        var dataInputForm = this.state.listOutForm;
        var inputStockRows = [];
        var inputStock = [];
        var CurrentNo = 0;


        if (dataInputForm) {
            inputStockRows = dataInputForm.map(item => {


                return (
                    <tr key={"inputStock_" + item.id}>
                        <td> {CurrentNo++}</td>
                        <td colSpan="1">{item.batchBarcode}</td>
                        <td colSpan="1">{item.drug.name + " " + item.drug.hamLuongBHYT}</td>
                        <td colSpan="1">{item.inputDate}</td>
                        <td colSpan="1">{item.expiredDate}</td>
                        <td colSpan="1">{FormatterUtils.formatCurrency(item.importPrice) }</td>
                        <td colSpan="1">{FormatterUtils.formatCurrency(item.salePrice)}</td>
                        <td colSpan="1">{FormatterUtils.formatCurrency(item.outAmount)}</td>
                        {/* handlegetListToPrintBarcode */}
                        
                    </tr>
                );
            })
            inputStock = [<tr className="success">
                <th>STT </th>
                <th>Mã Thuốc</th>
                <th>Thuốc</th>
                <th>Ngày sản xuất</th>
                <th>Hết hạn</th>
                <th>Giá nhập</th>
                <th>Giá bán</th>
                <th>Số lượng</th>
            </tr>
            ].concat(isShowOutStockRows ? inputStockRows : null);
        }

        return (
            [<tr key={OutputFormObj.id}>
                <td> {isShowOutStockRows ? <button className="bg-info-600 icon-dash" onClick={() => this.handleShowOutputStock(OutputFormObj.id)}></button> :
                    <button className="bg-info-600 icon-plus22" onClick={() => this.handleShowOutputStock(OutputFormObj.id)}></button>}
                </td>
                <td colSpan="1">{OutputFormObj.id}</td>
                <td colSpan="2">{OutputFormObj.drugStore.name}</td>
                <td colSpan="2">{moment(OutputFormObj.outputDate).format("DD/MM/YYYY")}</td>
                <td colSpan="1">{OutputFormObj.createdUser ? OutputFormObj.createdUser.fullName : ""}</td>
                <td colSpan="1">{OutputFormObj.validatedUser ? OutputFormObj.validatedUser.fullName : ""}</td>
                <td colSpan="2">{OutputFormObj.status}</td>
                {/* <td className="text-center footable-visible footable-last-column">
                    <a onClick={() => this.handlegetListToPrint(OutputFormObj.id)}><i className="icon-file-pdf"></i></a>
                </td> */}
                <td colSpan="3" className="text-center footable-visible footable-last-column">
                        <ul className="icons-list">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="icon-menu9"></i>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-right">
                                    <li><a href={"/outputForm/" + OutputFormObj.id}><i className="icon-pencil"></i>Xem Chi Tiết</a></li>
                                    <li><a onClick={() => this.handlegetListToPrint(OutputFormObj.id)}><i className="icon-file-pdf"></i>In Phiếu Xuất Kho</a></li>
                                    
                                </ul>
                            </li>
                        </ul>
                </td>
            </tr>].concat(isShowOutStockRows ? inputStock : null)

        );

    }
}
export default translate('translations')(OutputFormOutputStockRow);