import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { ScriptUtils } from '../../utils/javascriptUtils';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import moment from 'moment'
import { FormatterUtils } from '../../utils/javascriptUtils';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import pdfMake from 'pdfmake/build/pdfmake';
import OutputFormOutputStockRow from './OutputFormOutputStockRow';
class OutputForm extends React.Component {
    constructor() {
        super();
        this.state = {
            listOutputForm: null,
            isOutputFormModalShown: false,
            idOutputForm: ""
        }
        this.handleShowmodal = this.handleShowmodal.bind(this);
        this.handleHidemodal = () => {
            this.setState({ isOutputFormModalShown: false });
            this.UpdateListOutputForm();
        };
        this.handleSavePDF = (outputForm) => {
            pdfMake.vfs = pdfFonts.pdfMake.vfs;
            pdfMake.createPdf(outputForm).download('Phieu-nhap-kho.pdf');
        
        }

    };

    renderPDF(dataExportOutputStock){
        var totalInvoicePrice = 0;
        var itemRows = dataExportOutputStock.map(item => {
                totalInvoicePrice += (item.salePrice * item.outAmount);
                return [
                    [item.drug.name + " " + item.drug.hamLuongBHYT],
                    [item.outAmount],
                    [{ text: FormatterUtils.formatCurrency(item.salePrice * item.outAmount), alignment: 'right' }],
                ]
        });
        var today = moment(new Date, "DD/MM/YYYY");
        var tableItems = {
            style: 'tableExample',
            table: {
                widths: [150, 50, 50],
                body: itemRows
            },
            layout: 'noBorders'
        },
            dataExportOutputStock =
            {
                content: [
                    {
                        columns:
                            [
                                {
                                    width: 300,
                                    fontSize: 20,
                                    alignment: 'center',
                                    text: 'TIMEC \n\n'
                                }
                            ]
                    },

                    {
                        fontSize: 14,
                        text: 'Kính chào quý khách : khách hàng \n\n'
                    },
                    {
                        fontSize: 14,
                        text: '* * * * * * * * * * * * * * * * * * * * * * * * * * * * \n\n'

                    },
                    {
                        columns:
                            [
                                {
                                    // fontSize: 12,
                                    width: 300,
                                    alignment: 'left',
                                    text: ['Địa chỉ: Nguyễn Cửu Phú, P. Tân Tạo A,\nQ. Bình Tân,TP.HCM \n']
                                }
                            ]
                    },
                    {
                        style: 'tableExample',
                        table: {
                            widths: [150, 100],
                            fontSize: 10,
                            body: [
                                [['Ngày: ' + today.date() + '/' + today.month() + '/' + today.year()], [{ text: 'Giờ: ' + today.hour() + ':' + (today.minutes() > 10 ? today.minutes() : "0"+today.minutes() ) , alignment: 'right' }]],
                            ]
                        },
                        layout: 'noBorders'
                    },
                    {
                        fontSize: 14,
                        text: '* * * * * * * * * * * * * * * * * * * * * * * * * * * * \n\n'

                    },
                    {
                        style: 'tableExample',
                        table: {
                            widths: [150, 50, 50],
                            body: [
                                ['Tên', 'SL', { text: 'TT', alignment: 'right' }],

                            ]
                        },
                        layout: 'noBorders'
                    },
                    tableItems,
                    {
                        fontSize: 14,
                        text: '\n- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  \n'

                    },
                    {
                        style: 'tableExample',
                        table: {
                            widths: [150, 100],
                            body: [
                                // ['Tổng', { text: FormatterUtils.formatCurrency(totalInvoicePrice) + '', alignment: 'right' }],

                            ]
                        },
                        layout: 'noBorders'
                    },
                    {
                        fontSize: 14,
                        text: '- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  \n'

                    },
                    {
                        style: 'tableExample',
                        table: {
                            widths: [200, 100],
                            body: [
                                ['Tiền mặt', { text: '' + '\n\n', alignment: 'right' }],
                                ['Trả lại (Tiền mặt)', { text: '' + '\n', alignment: 'right' }],
                                ['Điểm tích luỹ trong giao dịch', { text: '' + '\n', alignment: 'right' }],
                                ['Điểm sử dụng trong giao dịch', { text: '' + '\n\n', alignment: 'right' }],
                            ]
                        },
                        layout: 'noBorders'
                    },
                    {
                        columns:
                            [
                                {
                                    fontSize: 10,
                                    width: 250,
                                    alignment: 'center',
                                    text: '\tCảm ơn quý khách đã sử dụng dịch vụ TIMEC'
                                }
                            ]
                    },

                ]
            }
        return dataExportOutputStock;
    }

    handleShowmodal(id) {
        this.setState({
            isOutputFormModalShown: true,
            idOutputForm: id
        });
    }
    UpdateListOutputForm() {
        var search = qs.parse(this.props.location.search).search;
        var page = qs.parse(this.props.location.search).page;
        let setStateInRequest = (list) => { this.setState({ listOutputForm: list }) }
        return agent.OutputFormApi.listOutputForm(search, page
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
    getListOutputStockByOutputFormId(id) {
        var _this = this;
        return agent.asyncRequests.get("/outputStock/findByOutputFormId?outputFormId=" + id
        ).then(function (res) {
            var result = res.body.resultData;
            if (result.length > 0) {
                // alert(result);
                _this.handleSavePDF(_this.renderPDF(result));
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });

    }

    renderPDF(dataExportOuttock) {
        var imageLogo = this.state.imageLogo;

        const { t } = this.props;
        var today = new Date();
        var batchBarcode = [];
        var drugName = [];
        var expiredDate = [];
        var inputAmount = [];
        var salePrice = [];
        dataExportOuttock.map(item => {

            drugName.push(item.drug ? item.drug.name + " " + item.drug.hamLuongBHYT : null);
            inputAmount.push(item.outAmount);
            // amountWithVat.push(item.batchBarcode);
            batchBarcode.push(item.batchBarcode);
            expiredDate.push(item.expiredDate);
            salePrice.push(item.salePrice);
            return (
                drugName, inputAmount, salePrice, batchBarcode, expiredDate
            )
        });

        var tableItems = {
            style: 'tableExample',
            table: {
                widths: ['*', '*', 'auto', '*', '*'],
                body: [
                    [{ text: 'Mã lô thuốc', style: 'tableHeader', alignment: 'center' }, { text: 'Tên thuốc', style: 'tableHeader', alignment: 'center' }, { text: 'Hết Hạn', style: 'tableHeader', alignment: 'center' }, { text: 'Giá Bán', style: 'tableHeader', alignment: 'center' }, { text: 'Số lượng', style: 'tableHeader', alignment: 'center' }],
                    [batchBarcode, drugName,  expiredDate, salePrice, inputAmount],
                ]

            },
        },
            dataExport = {
                content: [
                    {
                        columns: [
                            { text: 'Sở Y Tế TPHCM' + '\n Phòng Khám Đa Khoa Quốc Tế TIMEC' + '\n Số: ...../20...../GCT', fontSize: 11, alignment: 'center' },
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

                                text: '\n Ngày ' + moment(today).format("LL") + '\n\n NGƯỜI LẬP PHIẾU \n\n\n' + '', alignment: 'center', fontSize: 11,

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
        pdfMake.createPdf(dataExportRetail).download('PHIEU-XUAT-Kho.pdf');
    }
    handlegetListToPrint(id) {
        this.getListOutputStockByOutputFormId(id);
    }
    componentWillMount() {
        this.UpdateListOutputForm();
        var url = '/assets/images/logo_timec.png';
        FormatterUtils.downloadImageDataUri(url, this, "imageLogo");
    };

    render() {
        var search = qs.parse(this.props.location.search).search;
        const data = this.state.listOutputForm;
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
                // <tr key={item.id}>
                //     <td>{currentNo}</td>
                //     <td>{item.drugStore ? item.drugStore.name : " "}</td>
                //     <td>{item.createdUser ? item.createdUser.fullName : ""}</td>
                //     {/* <td>{item.validatedUser ? item.validatedUser.fullName : ""}</td> */}
                //     <td>{item.outputDate}</td>

                //     <td className="text-center footable-visible footable-last-column">
                //         <a onClick={() => this.handlegetListToPrint(item.id)}><i className="icon-file-pdf"></i></a>
                //     </td>
                // </tr>
                <OutputFormOutputStockRow key={"inputStock_" + item.id} OutputFormObj={item}></OutputFormOutputStockRow>
                );
        });
        return (
            <div className="content-wrapper">
                <div className="page-header page-header-default">
                    <div className="breadcrumb-line">
                        <ul className="breadcrumb">
                            <li><a href=""><i className="icon-home2 position-left"></i> Home</a> </li>
                            <li className="active">Quản Lý Nhà Thuốc</li>
                            <li className="active">Danh Sách Xuất Kho</li>
                        </ul>

                    </div>
                </div>
                <div class="content">
                    <div class="row">
                        <div className="col-md-12">
                            {/* <form className="main-search" role="form">
                                        <div className="input-group content-group">
                                            <div className="has-feedback has-feedback-left">
                                                <input type="text" className="form-control input-xlg" placeholder="Tìm kiếm tên thuốc..." name="search" defaultValue={search} autoFocus={true} />
                                                <div className="form-control-feedback">
                                                    <i className="icon-search4 text-muted text-size-base"></i>
                                                </div>
                                            </div>
                                            <div className="input-group-btn">
                                                <button type="submit" className="btn bg-teal btn-xlg">Tìm</button>
                                            </div>
                                        </div>
                                    </form>     */}
                            <div className="panel panel-flat">
                                <table className="table table-xxs table-bordered">
                                    <thead>
                                        <tr className="bg-teal">
                                            <th data-toggle="true">STT</th>
                                            <th colSpan="1" data-toggle="true">Mã Phiếu</th>
                                            <th colSpan="2" data-toggle="true">Kho Thuốc</th>
                                            <th colSpan="2" data-toggle="true">Ngày Xuất Kho</th>
                                            <th colSpan="1" data-toggle="true">Người Xuất Kho</th>
                                            <th colSpan="1" data-toggle="true">Người Duyệt</th>
                                            <th colSpan="2" data-toggle="true">Trạng Thái</th>
                                            <th className="text-center footable-visible footable-last-column"><i className="icon-menu-open2"></i></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows}
                                    </tbody>
                                </table>
                            </div>

                        </div>
                        <TablePagination data={data} baseUrl="/listAllOutputForm" />
                    </div>
                </div>
            </div>

        );
    }
}
export default translate('translations')(OutputForm);