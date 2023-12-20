import moment from 'moment';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import React from 'react';
import { translate } from 'react-i18next';
import { toast } from 'react-toastify';
import agent from '../../services/agent';
import { DateUtils, FormatterUtils } from '../../utils/javascriptUtils';
import ModalOutputStockForInvoiceList from '../OutputStock/ModalOutputStockForInvoiceList';
import ModalPayment from './ModalPayment';
import ModalUpdatePaymentMethod from './ModalUpdatePaymentMethod';
import { RenderPDFPaymentInvoice } from './RenderPDFPaymentInvoice';

class PaymentInvoiceRows extends React.Component {
    constructor() {
        super();
        this.state = {
            listInvoice: null,
            isShowInvoiceRows: false,
            paymentObj: [],
            // isShowModalOutputStock : false,
            idInvoice: null,
            // isPaymentModalShown : false,
            isUpdatePaymentMethodModalShown: false
        }
        this.handleShowInvoice = this.handleShowInvoice.bind(this);
        this.getInvoiceById = this.getInvoiceById.bind(this);
        this.handleShowModalOutputStock = this.handleShowModalOutputStock.bind(this);
        this.handleHideModal = () => {
            this.setState({
                // isShowModalOutputStock : false,
                isUpdatePaymentMethodModalShown: false
            });
            this.props.onReloadSearch();
        };
        this.showUpdatePaymentMethodModal = () => {
            this.setState({ isUpdatePaymentMethodModalShown: true });
        }
        this.handleSavePDF = (dataExport) => {

            pdfMake.vfs = pdfFonts.pdfMake.vfs;
            pdfMake.createPdf(dataExport).print();
        }
        this.getlistInvoiceItemToExportPdf = (dataPayment) => {
            var _this = this;
            let setStateInRequest = (list) => { this.setState({ listInvoiceItem: list }) }
            return (agent.asyncRequests.get("/invoiceItem/listAllByInvoiceId?invoiceId=" + dataPayment.invoice.id).then(function (res) {
                var result = res.body.resultData;
                if (result) {
                    setStateInRequest(result)
                    _this.getInvoiceById(dataPayment.invoice.id, dataPayment);
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

        this.getlistInvoiceItemToExportPdfBHYT = (dataPayment) => {
            var _this = this;
            let setStateInRequest = (list) => { this.setState({ listInvoiceItem: list }) }
            return (agent.asyncRequests.get("/invoiceItem/listAllByInvoiceId?invoiceId=" + dataPayment.invoice.id).then(function (res) {
                var result = res.body.resultData;
                if (result) {
                    _this.handleSavePDF(_this.getDataExportBHYT(dataPayment.invoice, dataPayment, result));
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

    };
    getInvoiceById(id, dataPayment) {
        var _this = this;
        const { t } = this.props;
        return agent.InvoiceApi.getInvoice(id)
            .then(function (res) {
                var result = res.resultData;
                if (result) {
                    _this.handleSavePDF(RenderPDFPaymentInvoice.getDataExport(result, dataPayment, _this));
                } else {
                    toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                    + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
            });
    }

    getDataExportBHYT(dataInvoice, dataPayment, listInvoiceItem) {
        var imageLogo = this.state.imageLogo;
        var patientBarcode = FormatterUtils.convertTextToBarcode(dataInvoice.barCode);
        const { t } = this.props;
        var dataInvoices = listInvoiceItem;
        var prescriptionDate = dataPayment.paymentDate;
        var currentNo = 1;
        var tongThucDong = 0;

        var itemRows = [
            [
                { text: 'STT', style: 'tableHeader', alignment: 'center' },
                { text: 'Tên Dịch Vụ', style: 'tableHeader', alignment: 'center' },
                { text: 'SL', style: 'tableHeader', alignment: 'center' },
                { text: 'Đơn Vị', style: 'tableHeader', alignment: 'center' },
                { text: 'Đơn Giá', style: 'tableHeader', alignment: 'center' },
                { text: 'Phụ Thu', style: 'tableHeader', alignment: 'center' },
                { text: 'BHYT Hỗ Trợ', style: 'tableHeader', alignment: 'center' },
                { text: 'Đồng Chi Trả', style: 'tableHeader', alignment: 'center' },
                { text: 'Thực Đóng', style: 'tableHeader', alignment: 'center' },
            ],
        ]; 

        listInvoiceItem.map(item => {
            if(item.invoice.status == "CLOSED"){
                if (item.invoiceItemType == "DRUG_ITEM") {
                    itemRows.push([
                        { text: currentNo, style: 'tableHeader', alignment: 'left' },
                        { text: item.drug.name  + " " + item.drug.hamLuongBHYT, style: 'tableHeader', alignment: 'left' },
                        { text: item.numberOfItems, style: 'tableHeader', alignment: 'left' },
                        { text: item.drug.uom, style: 'tableHeader', alignment: 'left' },
                        { text: FormatterUtils.formatCurrency( (item.bhyt + item.dongChiTra + item.phuThu) / item.numberOfItems ), style: 'tableHeader', alignment: 'left' },
                        { text: FormatterUtils.formatCurrency(item.phuThu), style: 'tableHeader', alignment: 'left' },
                        { text: FormatterUtils.formatCurrency(item.bhyt), style: 'tableHeader', alignment: 'left' },
                        { text: FormatterUtils.formatCurrency(item.dongChiTra), style: 'tableHeader', alignment: 'left' },
                        { text: FormatterUtils.formatCurrency(item.phuThu), style: 'tableHeader', alignment: 'left' },
                    ])
                    tongThucDong += item.phuThu;

                } else if (item.invoiceItemType == "KHAM_BENH_ITEM" || item.invoiceItemType == "CHUYEN_KHOA_KHAM_BENH") {
                    itemRows.push([
                        { text: currentNo, style: 'tableHeader', alignment: 'left' },
                        { text: (item.prescription.department ? item.prescription.department.name : "" ), style: 'tableHeader', alignment: 'left' },
                        { text: item.numberOfItems, style: 'tableHeader', alignment: 'left' },
                        { text: 'Lần', style: 'tableHeader', alignment: 'left' },
                        { text: FormatterUtils.formatCurrency( (item.bhyt + item.dongChiTra + item.phuThu) / item.numberOfItems ), style: 'tableHeader', alignment: 'left' },
                        { text: FormatterUtils.formatCurrency(item.phuThu), style: 'tableHeader', alignment: 'left' },
                        { text: FormatterUtils.formatCurrency(item.bhyt), style: 'tableHeader', alignment: 'left' },
                        { text: FormatterUtils.formatCurrency(item.dongChiTra), style: 'tableHeader', alignment: 'left' },
                        { text: FormatterUtils.formatCurrency(item.phuThu), style: 'tableHeader', alignment: 'left' },
                    ])
                    tongThucDong += item.phuThu;
                
                } else if (item.invoiceItemType == "DIAGNOSIS_SERVICE_ITEM" ) {
                    itemRows.push([
                        { text: currentNo, style: 'tableHeader', alignment: 'left' },
                        { text: (item.diagnosisService ? item.diagnosisService.name : "" ), style: 'tableHeader', alignment: 'left' },
                        { text: item.numberOfItems, style: 'tableHeader', alignment: 'left' },
                        { text: 'Lần', style: 'tableHeader', alignment: 'left' },
                        { text: FormatterUtils.formatCurrency( (item.bhyt + item.dongChiTra + item.phuThu) / item.numberOfItems ), style: 'tableHeader', alignment: 'left' },
                        { text: FormatterUtils.formatCurrency(item.phuThu), style: 'tableHeader', alignment: 'left' },
                        { text: FormatterUtils.formatCurrency(item.bhyt), style: 'tableHeader', alignment: 'left' },
                        { text: FormatterUtils.formatCurrency(item.dongChiTra), style: 'tableHeader', alignment: 'left' },
                        { text: FormatterUtils.formatCurrency(item.phuThu), style: 'tableHeader', alignment: 'left' },
                    ])
                    tongThucDong += item.phuThu;
                
                } else if (item.invoiceItemType == "DONG_CHI_TRA" ) {
                    itemRows.push([
                        { text: currentNo, style: 'tableHeader', alignment: 'left' },
                        { text: (item.diagnosisService ? item.diagnosisService.name : "" ), style: 'tableHeader', alignment: 'left' },
                        { text: item.numberOfItems, style: 'tableHeader', alignment: 'left' },
                        { text: 'Lần', style: 'tableHeader', alignment: 'left' },
                        { text: FormatterUtils.formatCurrency( (item.bhyt + item.dongChiTra + item.phuThu) / item.numberOfItems ), style: 'tableHeader', alignment: 'left' },
                        { text: FormatterUtils.formatCurrency(item.phuThu), style: 'tableHeader', alignment: 'left' },
                        { text: FormatterUtils.formatCurrency(item.bhyt), style: 'tableHeader', alignment: 'left' },
                        { text: FormatterUtils.formatCurrency(item.dongChiTra), style: 'tableHeader', alignment: 'left' },
                        { text: FormatterUtils.formatCurrency(item.amountWithVat), style: 'tableHeader', alignment: 'left' },
                    ])
                    tongThucDong += item.amountWithVat;
                } 
                currentNo++;
            }
        })
        
        var tableItems = {
            style: 'tableExample',
            headerRows: 1,
            table: {
                widths: [25, '*', 15, 30,  50, 50, 50, 50, 50],
                body: itemRows
            },
            layout: {
                fillColor: function (rowcurrentNoBody, node, columncurrentNoBody) {
                    return (rowcurrentNoBody < 1) ? '#FFD700' : null;
                }
            }
        }

        var dataExport = {
            content: [

                {
                    columns: [
                        imageLogo ? {
                            image: imageLogo,
                            fit: [100, 100],
                            alignment: 'left',
                            margin: [-20, -15, 0, 0],
                        } : "",
                        { image: patientBarcode, fit: [100, 100], alignment: 'right', margin: [0, -20, -10, 0] },
                    ]
                },
                {
                    columns: [
                        { text: dataInvoice.barCode, fontSize: 11, alignment: 'right', margin: [0, 0, -5, 0] },

                    ]
                },
                { text: 'PHÒNG KHÁM ĐA KHOA QUỐC TẾ TIMEC ', fontSize: 15, alignment: 'center', bold: true },
                // { text: 'Mã Bệnh Án : ' + (dataInvoice ? dataInvoice.prescription.id : ' ....') + '\n Mã Bệnh Nhân: ' + (dataInvoice.patient ? dataInvoice.patient.code : ' ....'), fontSize: 11, alignment: 'left' },
                { text: 'Địa Chỉ : Lô F-G, Chung cư TECCO TOWN, 4449 Nguyễn Cữu Phú, P.Tân Tạo A \n Q.Bình Tân, TP.HCM', fontSize: 11, alignment: 'center' },
                { text: 'Điện Thoại: 0879.115.115', fontSize: 11, alignment: 'center' },

                { text: '\n PHIẾU THU', fontSize: 15, alignment: 'center' },
                { text: 'Liên 2: Giao Người Nộp Tiền', fontSize: 11, italics: true, alignment: 'center' },


                {
                    text: ['\n Họ và Tên : ', { text: dataInvoice.patient ? dataInvoice.patient.fullName : "...................................................................." },
                        "\t Giới tính: ", { text: t(dataInvoice.patient ? dataInvoice.patient.gender : "..................") },
                        "\t Ngày Sinh: ", { text: dataInvoice.patient ? DateUtils.formatDateForScreen(dataInvoice.patient.birthday) : "......................" }], fontSize: 11, alignment: 'left'
                },

                {
                    columns: [
                        { text: 'Địa chỉ: ' + (dataInvoice.patient && dataInvoice.patient.address ? dataInvoice.patient.address : ""), fontSize: 11, },


                    ]
                },
                {
                    columns: [
                        { text: 'Số Điện Thoại: ' + (dataInvoice.patient && dataInvoice.patient.phone ? dataInvoice.patient.phone : ""), fontSize: 11 },
                    ]
                },
                {
                    columns: [
                        { text: 'Dịch Vụ: ' + t(dataInvoice.invoiceType), fontSize: 11 },
                    ]
                },
                {
                    columns: [

                        // { text: 'Ngày tạo hóa đơn: ' + moment(dataInvoice.createdDate).format("DD/MM/YYYY"), fontSize: 11 },
                        { text: '', fontSize: 11 },
                        { text: '', fontSize: 11 },
                    ]
                },

                tableItems,

                { text: '\n Tổng :              ' + FormatterUtils.formatCurrency(tongThucDong), fontSize: 11, alignment: 'right' },
                { text: ' Giảm :              ' + FormatterUtils.formatCurrency(dataInvoice.reducedAmount), fontSize: 11, alignment: 'right' },
                { text: 'Thành Tiền :              ' + FormatterUtils.formatCurrency(tongThucDong - dataInvoice.reducedAmount), bold: true, fontSize: 11, alignment: 'right' },

                {
                    style: ["marginBottomBase", "textMedium"],
                    text: [
                        "* Đề nghị Quý Khách Hàng ghi rõ số hóa đơn khi chuyển khoản cho chúng tôi. Quý khách có nhu cầu xuất hóa đơn xin vui lòng liên hệ tiếp tân. Phiếu có giá trị xuất hóa đơn trong ngày. ",
                        
                    ],
                },
                {
                    columns: [
                        {
                            text: '\n\n\n NGƯỜI NỘP TIỀN \n\n\n', alignment: 'center', fontSize: 11,
                        },
                        {
                            text: '', alignment: 'center', fontSize: 11,
                        },
                        {

                            text: '\n Ngày ' + moment(prescriptionDate).format("LL") + '\n\n NGƯỜI LẬP PHIẾU \n\n\n', alignment: 'center', fontSize: 11,

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

    deletePayment(id) {
        if (confirm("Bạn có chắc sẽ xoá !")) {
            var url = `/payment/${id}`;
            return agent.asyncRequests.del(url
            ).then(function (res) {
                var result = res.body.resultData;
                if (result && !result.error) {
                    toast.success("Xóa Thành Công", { autoClose: 5000, position: toast.POSITION.TOP_RIGHT });
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

    getListInvoiceId() {
        const invoiceId = this.props.paymentObj.invoice.id;
        let setStateInRequest = (list) => { this.setState({ listInvoice: list }) }
        return (agent.asyncRequests.get("/invoiceItem/listAllByInvoiceId?invoiceId=" + invoiceId).then(function (res) {
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

    handleShowInvoice() {
        let isShowInvoiceRows = this.state.isShowInvoiceRows;
        isShowInvoiceRows = !this.state.isShowInvoiceRows;
        this.setState({ isShowInvoiceRows: isShowInvoiceRows })
        if (isShowInvoiceRows) {
            this.getListInvoiceId();
        }
    }

    handleShowModalOutputStock(id) {
        this.setState({
            isShowModalOutputStock: true,
            idInvoice: id
        })
    }

    componentWillMount() {
        var url = '/assets/images/logo_timec.png';
        FormatterUtils.downloadImageDataUri(url, this, "imageLogo");

        var urlLeftCorner = '/assets/images/left_corner_logo_timec.png';
        FormatterUtils.downloadImageDataUri(urlLeftCorner, this, "leftCornerLogo");
    };

    render() {
        const { paymentObj, t } = this.props;
        var isShowInvoiceRows = this.state.isShowInvoiceRows;
        var dataInvoice = this.state.listInvoice;
        var invoiceRows = [];
        var invoice = [];
        var invoiceCurrentNo = 0;

        var elementTh = (<th colSpan="1" data-toggle="true">STT</th>)
        var elementTh2 = null;
        var elementTh3 = null;
        if (dataInvoice) {
            invoiceRows = dataInvoice.map(item => {
                invoiceCurrentNo++;
                var elementTd1 = <td colSpan="1">{invoiceCurrentNo}</td>
                var elementTd2 = null;
                var elementTd3 = null;
                var elementTDonGiaService = <td colSpan="1">{FormatterUtils.formatCurrency(item.amountWithVat / item.numberOfItems)}</td>
                if (item.invoice.invoiceType === "DRUG") {
                    elementTh2 = <th colSpan="1" data-toggle="true">Tên Thuốc</th>
                    elementTd2 = <td colSpan="1">{item.drug ? item.drug.name + " " + item.drug.hamLuongBHYT : null}</td>
                    elementTh3 = <th colSpan="1">ĐVT</th>
                    elementTd3 = <td colSpan="1">{item.drug ? item.drug.uom : null}</td>
                    if(item.invoiceItemType === "DONG_CHI_TRA"){
                        elementTd2 = <td colSpan="1">{item.diagnosisService ? item.diagnosisService.name : null}</td>
                        elementTd3 = <td colSpan="1">Lần</td>
                    }
                    // elementTd =  invoiceCurrentNo > 1 != true ? <td colSpan="1"><button className="btn btn-info" onClick={() => this.handleShowModalOutputStock(item.invoice.id)}>Xem Phiếu Xuất Kho</button></td> : <td colSpan="2" ></td> ;
                } else if (item.invoice.invoiceType === "DIAGNOSIS_SERVICE") {
                    elementTh2 = <th colSpan="1" >Tên Chỉ Định</th>;
                    elementTd2 = <td colSpan="1">{item.diagnosisService ? item.diagnosisService.name : null}</td>
                    if(item.bhyt > 0){
                        elementTDonGiaService = <td colSpan="1">{FormatterUtils.formatCurrency((item.phuThu + item.bhyt + item.dongChiTra) / item.numberOfItems)}</td>
                    }else{
                        elementTDonGiaService = <td colSpan="1">{FormatterUtils.formatCurrency((item.amountWithVat) / item.numberOfItems)}</td>
                    }
                } else if (item.invoice.invoiceType === "PACKAGE") {
                    elementTh2 = <th colSpan="1" >Tên Gói Khám</th>;
                    elementTd2 = <td colSpan="1">{item.prescription.packages ? item.prescription.packages.name : null}</td>
                } else if(item.invoice.invoiceType === "PRESCRIPTION"){
                    elementTh3 = <th colSpan="1">Tên Chuyên Khoa</th>
                    elementTd3 = <td colSpan="1">{item.prescription.department ? item.prescription.department.name: ""}</td>
                    if(item.invoiceItemType === "DONG_CHI_TRA"){
                        elementTd3 = <td colSpan="1">{item.diagnosisService ? item.diagnosisService.name : null}</td>
                    }
                }
                // invoiceItemType
                return (
                    <tr className="success" key={"invoice_" + item.id}>
                        {elementTd1}
                        {elementTd2}
                        {elementTd3}
                        <td colSpan="1">{item.numberOfItems}</td>
                        {elementTDonGiaService}
                        <td colSpan="1">{FormatterUtils.formatCurrency(item.amountNoVat)}</td>
                        <td colSpan="1">{FormatterUtils.formatCurrency(item.amountWithVat)}</td>
                        <td colSpan="1">{t(item.invoice.invoiceType)}</td>
                        <td colSpan="1">{FormatterUtils.formatCurrency(item.phuThu)}</td>
                        <td colSpan="1">{FormatterUtils.formatCurrency(item.bhyt)}</td>
                        <td colSpan="1">{FormatterUtils.formatCurrency(item.dongChiTra)}</td>
                        <td colSpan="3"></td>
                    </tr>
                );
            })
            invoice = [<tr className="success">
                {elementTh}
                {elementTh2}
                {elementTh3}
                {/* <th colSpan="2" data-toggle="true">Tên bệnh nhân</th> */}
                <th colSpan="1" data-toggle="true">Số lượng</th>
                <th colSpan="1" data-toggle="true">Đơn giá</th>
                <th colSpan="1" data-toggle="true">Số tiền không VAT</th>
                <th colSpan="1" data-toggle="true">Số tiền có VAT</th>
                <th colSpan="1" data-toggle="true">Loại hoá đơn</th>
                <th colSpan="1" data-toggle="true">Tiền Phụ Thu</th>
                <th colSpan="1" data-toggle="true">Tiền BHYT Hỗ Trợ</th>
                <th colSpan="1" data-toggle="true">Tiền Đồng Chi Trả BHYT</th>
                <th colSpan="3" data-toggle="true"></th>
            </tr>
            ].concat(isShowInvoiceRows ? invoiceRows : null);
        }

        return (
            [<tr key={paymentObj.id}>
                <td> {isShowInvoiceRows ? <button className="bg-info-600 icon-dash" onClick={() => this.handleShowInvoice(paymentObj.id)}></button> :
                    <button className="bg-info-600 icon-plus22" onClick={() => this.handleShowInvoice(paymentObj.id)}></button>}
                </td>
                <td>{paymentObj.id}</td>
                <td>{paymentObj.cashDesk ? paymentObj.cashDesk.cashier.fullName : null}</td>
                <td>{paymentObj.invoice ? paymentObj.invoice.barCode : ""}</td>
                <td>{paymentObj.invoice ? t(paymentObj.invoice.invoiceType) : ""}</td>
                <td>{FormatterUtils.formatCurrency(paymentObj.amount)}</td>
                <td>{FormatterUtils.formatCurrency(paymentObj.reducedAmount)}</td>
                <td>{paymentObj.paymentMethod}</td>
                <td>{paymentObj.invoice && paymentObj.invoice.prescription && paymentObj.invoice.prescription.user ? paymentObj.invoice.prescription.user.fullName : ""}</td>
                <td>{paymentObj.patient ? paymentObj.patient.code : null} <br /> {paymentObj.patient ? paymentObj.patient.fullName : null}</td>
                {/* <td>{paymentObj.insuranceCompany ? paymentObj.insuranceCompany.name : null}</td> */}
                <td>{paymentObj.paymentDate ? moment(paymentObj.paymentDate).format("DD/MM/YYYY HH:mm") : null}</td>
                {/* <td>{moment(paymentObj.createdDate).format("DD/MM/YYYY HH:mm")}</td> */}
                <td>{paymentObj.status}</td>
                <td className="text-center footable-visible footable-last-column">
                    <ul className="icons-list">
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                <i className="icon-menu9"></i>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-right">
                                <li><a onClick={() => this.showUpdatePaymentMethodModal()}><i className="icon-pencil"></i>Đổi Phương Thức Thanh Toán</a></li>
                                
                                {/* <li><a onClick={() => this.getlistInvoiceItemToExportPdfBHYT(paymentObj)}><i className="icon-printer"></i>In Phiếu Thu BHYT</a></li> 
                                <li><a onClick={() => this.getlistInvoiceItemToExportPdf(paymentObj)}><i className="icon-printer"></i>In Phiếu Thu Dịch Vụ</a></li>  */}

                                {/* { paymentObj && paymentObj.invoice && paymentObj.invoice.prescription && paymentObj.invoice.prescription.insuranceTypeId && paymentObj.invoice.prescription.insuranceTypeId > 1 ? 
                                <li><a onClick={() => this.getlistInvoiceItemToExportPdfBHYT(paymentObj)}><i className="icon-printer"></i>In Phiếu Thu BHYT</a></li> 
                                : <li><a onClick={() => this.getlistInvoiceItemToExportPdf(paymentObj)}><i className="icon-printer"></i>In Thông Tin Phiếu Thu</a></li> } */}
                                <li><a onClick={() => this.getlistInvoiceItemToExportPdfBHYT(paymentObj)}><i className="icon-printer"></i>In Phiếu Thu BHYT</a></li> 
                                <li><a onClick={() => this.getlistInvoiceItemToExportPdf(paymentObj)}><i className="icon-printer"></i>In Phiếu Thu Dịch Vụ</a></li>

                            </ul>
                        </li>
                    </ul>
                </td>

                {/* {this.state.isShowModalOutputStock ? <ModalOutputStockForInvoiceList
                    title={this.state.idInvoice ? "Phiếu Xuất Kho" : "Thêm Mới Phiếu Xuất Kho"}
                    idInvoice={this.state.idInvoice}
                    show={this.state.isShowModalOutputStock}
                    onHide={this.handleHideModal} /> : null
                } */}

                {this.state.isUpdatePaymentMethodModalShown ? <ModalUpdatePaymentMethod
                    title={"Thay Đổi Phương Thức Thanh Toán"}
                    paymentObj={paymentObj}
                    show={this.state.isUpdatePaymentMethodModalShown}
                    onHide={this.handleHideModal} /> : null
                }
            </tr>].concat(isShowInvoiceRows ? invoice : null)

        );

    }
}
export default translate('translations')(PaymentInvoiceRows);