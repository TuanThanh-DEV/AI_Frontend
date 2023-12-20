import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import agent from '../../services/agent';
import moment from 'moment';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import pdfMake from 'pdfmake/build/pdfmake';
import ModalPayment from '../Payment/ModalPayment';
import ModalInvoice from './ModalInvoice';
import ModalInvoiceRefurn from './ModalInvoiceRefurn';
import { DateUtils, FormatterUtils } from '../../utils/javascriptUtils';
import {InvoicePrintService} from './InvoicePrintService';
import SecuredComponent from '../../components/SecuredComponent';

class InvoiceItemRows extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listInvoiceItem: "",
            isShowInvoiceItemRows: false,
            isInvoiceItemModalShown: false,
            // isInvoiceItemRefurnModalShown: false,
            idInvoiceItem: "",
            listInvoiceItem: [],
            invoiceDto: "",
            isPaymentModalShown: false,
            listInvoice: "",
            idInvoice: "",
            imageLogo: "",
            dataInvoices: [],
            invoiceType: "",
            listPrescriptionItem: [],
            dataPrescriptionItemList: []
        }
        this.handleShowmodalPayment = this.handleShowmodalPayment.bind(this);
        this.handleShowmodal = this.handleShowmodal.bind(this);
        // this.handleShowmodalRefurn = this.handleShowmodalRefurn.bind(this);
        this.handleHideInvoiceItemRows = this.handleHideInvoiceItemRows.bind(this);
        this.getListPrescriptionItemByPrescriptionId = this.getListPrescriptionItemByPrescriptionId.bind(this);
        this.handleShowInvoiceItem = this.handleShowInvoiceItem.bind(this);
        this.handleCancelInvoice = this.handleCancelInvoice.bind(this);
        this.handleHidemodal = () => {
            var this_ = this.props;
            this.setState({ isInvoiceModalShown: false });
            this.setState({ isPaymentModalShown: false });
            this_.handleSearchForm(new Date, new Date);
            // this.updateListInvoice();
        };
        this.handleHidemodalRefurn = () => {
            var this_ = this.props;
            this.setState({ isInvoiceModalRefurnShown: false });
            this.setState({ isPaymentModalShown: false });
            this_.handleSearchForm(new Date, new Date);
            // this.updateListInvoice();
        };
        this.handleSavePDF = (dataExport) => {
            pdfMake.vfs = pdfFonts.pdfMake.vfs;
            pdfMake.createPdf(dataExport).print();
        }
        this.getlistInvoiceItemToExportPdf = (dataInvoice) => {
            var _this = this;
            let setStateInRequest = (list) => { this.setState({ listInvoiceItem: list }) }
            return (agent.asyncRequests.get("/invoiceItem/listAllByInvoiceId?invoiceId=" + dataInvoice.id).then(function (res) {
                var result = res.body.resultData;
                if (result) {
                    setStateInRequest(result)
                    _this.handleSavePDF(_this.getDataExport(dataInvoice));
                } else {
                    toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + res.body.errorMessage, {
                        autoClose: 15000
                    });
                }
            }))
        }
    };

    getDataExport(dataInvoice) {
        var imageLogo = this.state.imageLogo;
        var status = dataInvoice.status.replace("OPEN", "Đang mở").replace("CANCELLED", "Hủy bỏ").replace("CLOSED", "Đóng");
        var thanhtoan = moment(dataInvoice.paymentDate).format("DD/MM/YYYY").replace("Invalid date", "Chưa thanh toán");
        var patientBarcode = FormatterUtils.convertTextToBarcode(dataInvoice.barCode);
        const { t } = this.props;
        var dataInvoices = this.state.listInvoiceItem;
        var today = new Date();
        var currentNo = 1;
        var currentNoList = [];
        var drugName = [];
        var numberOfItems = [];
        var amountNoVat = [];
        var amountWithVat = [];
        dataInvoices.map(item => {
            currentNoList.push(currentNo++);
            drugName.push(item.drug ? item.drug.name  + " " + item.drug.hamLuongBHYT: null);
            numberOfItems.push(item.numberOfItems);
            amountNoVat.push(item.amountNoVat);
            amountWithVat.push(item.amountWithVat);
            return (drugName, numberOfItems, amountNoVat, amountWithVat, currentNoList);
        
        });
        var tableItems = {

            style: 'tableExample',
            table: {
                widths: ['*', '*', 'auto', '*', '*'],
                body: [
                    [{ text: 'STT', style: 'tableHeader', alignment: 'center' }, { text: 'TÊN THUỐC', style: 'tableHeader', alignment: 'center' }, { text: 'SỐ LƯỢNG', style: 'tableHeader', alignment: 'center' }, { text: 'TIỀN KHÔNG VAT', style: 'tableHeader', alignment: 'center' }, { text: 'TIỀN GỒM VAT', style: 'tableHeader', alignment: 'center' }],
                    [currentNoList, drugName, numberOfItems, FormatterUtils.formatCurrency(amountNoVat), FormatterUtils.formatCurrency(amountWithVat)],
                    [{ text: 'Tổng:              ' + FormatterUtils.formatCurrency(dataInvoice.totalAmountWithVat), colSpan: 5, alignment: 'right' }],
                ]
            },
        },

            dataExport = {
                content: [
                    {
                        columns: [
                            { text: 'Sở Y Tế TPHCM' + '\n Phòng Khám Đa Khoa Quốc Tế TIMEC' + '\n Số: ...../20...../GCT', fontSize: 11, alignment: 'center' },
                            { text: 'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM' + '\n Độc Lập - Tự Do - Hạnh Phúc' + '\n ---------------', fontSize: 11, alignment: 'center' },
                            { text: 'Mã Bệnh Án : ' + (dataInvoice ? dataInvoice.prescription.id : ' ....') + '\n Mã Bệnh Nhân: ' + (dataInvoice.patient ? dataInvoice.patient.code : ' ....'), fontSize: 11, alignment: 'center' },
                        ]
                    },
                    {
                        columns: [
                            imageLogo ? {
                                image: imageLogo,
                                fit: [100, 100],
                                alignment: 'left',
                                margin: [20, 0, 0, 0],
                            } : "",
                            { image: patientBarcode, fit: [100, 100], alignment: 'right', margin: [0, -20, 15, 0] },
                        ]
                    },
                    {
                        columns: [
                            { text: dataInvoice.barCode, fontSize: 11, alignment: 'right', margin: [0, 0, 50, 0] },

                        ]
                    },
                    // {text:''+ "PXN"+dataInvoice.patient?dataInvoice.patient.code:"", fontSize: 11, alignment: 'right'} ,


                    {
                        columns: [

                            { text: '\n THÔNG TIN HÓA ĐƠN', fontSize: 15, alignment: 'center' },

                        ]
                    },

                    {
                        text: ['\n Họ và tên người bệnh: ', { text: dataInvoice.patient ? dataInvoice.patient.fullName : "...................................................................." },
                            "\t Giới tính: ", { text: t(dataInvoice.patient ? dataInvoice.patient.gender : "..................") },
                            "\t Ngày Sinh: ", { text: dataInvoice.patient ? DateUtils.formatDateForScreen(dataInvoice.patient.birthday) : "......................" }], fontSize: 11, alignment: 'left'
                    },

                    {
                        columns: [
                            { text: 'Địa chỉ: ' + (dataInvoice.patient ? dataInvoice.patient.address : ""), fontSize: 11, },


                        ]
                    },
                    {
                        columns: [

                            { text: 'Phòng ban: ' + (dataInvoice.prescription && dataInvoice.prescription.department ? dataInvoice.prescription.department.name : ""), fontSize: 11 },


                        ]
                    },
                    {
                        columns: [

                            { text: 'Ngày tạo hóa đơn: ' + moment(dataInvoice.createdDate).format("DD/MM/YYYY"), fontSize: 11 },
                            { text: '', fontSize: 11 },
                            { text: '', fontSize: 11 },
                        ]
                    },

                    tableItems,

                    {
                        columns: [
                            { text: 'Ngày thanh toán: ' + thanhtoan + '\n\n Trạng thái: ' + status, fontSize: 11 },
                            { text: 'TỔNG CỘNG:                    ' + FormatterUtils.formatCurrency(dataInvoice.totalAmountWithVat), style: 'tableHeader', alignment: 'right', fontSize: 11 },
                        ]
                    },
                    {
                        columns: [
                            {
                                text: '\n\n\n BỆNH NHÂN \n\n\n' + (dataInvoice.patient ? dataInvoice.patient.fullName : ""), alignment: 'center', fontSize: 11,
                            },
                            {
                                text: '', alignment: 'center', fontSize: 11,
                            },
                            {

                                text: '\n Ngày ' + moment(today).format("LL") + '\n\n NGƯỜI LẬP PHIẾU \n\n\n' , alignment: 'center', fontSize: 11,

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

    handleShowmodalPayment(invoiceDto) {
        if (invoiceDto.status == 'OPEN') {
            this.setState({
                isPaymentModalShown: true,
                invoiceDto: invoiceDto,
                idPayment: ""
            });
        } else {
            toast.error("Hóa Đơn Này Đã Thanh Toán Rồi!", {
                autoClose: 5000
            });
        }
    }
    handleShowInvoiceItem(invoiceId, invoiceType) {
        this.setState({
            isShowInvoiceItemRows: true,
            invoiceType: invoiceType
        })
        let setStateInRequest = (list) => { this.setState({ listInvoiceItem: list }) }
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
    handleHideInvoiceItemRows() {
        this.setState({ isShowInvoiceItemRows: false })
    }
    handleShowmodal(id) {
        this.setState({
            isInvoiceItemModalShown: true,
            idInvoiceItem: id,
            isInvoiceModalShown: true,
            idInvoice: id,

        });
    }
    // handleShowmodalRefurn(idrefurn) {
    //     this.setState({
    //         isInvoiceItemRefurnModalShown: true,
    //         idInvoiceItemRefurn: idrefurn,
    //         isInvoiceModalRefurnShown: true,

    //     });
    // }
    updateListInvoice() {
        var search = qs.parse(this.props.location.search).search;
        var page = qs.parse(this.props.location.search).page;
        let setStateInRequest = (list) => { this.setState({ listInvoice: list }) }
        return agent.InvoiceApi.listInvoice(search, page
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
    };

    componentWillMount() {
        var url = '/assets/images/logo_timec.png';
        FormatterUtils.downloadImageDataUri(url, this, "imageLogo");
    };

    handleCancelInvoice(id) {
       let this_ = this.props;
        if (confirm("Bạn có chắc sẽ hủy đơn hàng này? Số hóa đơn " + id)) {
            var url = `/invoice/cancel?id=${id}`;
            return agent.asyncRequests.post(url
            ).then(function (res) {
                var result = res.body.resultData;
                if (result && !result.error) {
                    if(result.dongChiTraAm > 0){
                        toast.success("Đã hủy thành công! Số tiền Đồng Chi Trả các phiếu trước phải trả lại là : " + FormatterUtils.formatCurrency( result.dongChiTraAm), { autoClose: 15000, position: toast.POSITION.TOP_RIGHT });
                        this_.handleSearchForm(new Date, new Date);
                    }else{                        
                        toast.success("Đã Hủy Thành Công!", { autoClose: 5000, position: toast.POSITION.TOP_RIGHT });
                        this_.handleSearchForm(new Date, new Date);
                    }
                } else {
                    toast.error("Có lỗi khi xóa dữ liệu. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Không thể hủy đơn hàng! Vui lòng liên hệ Admin. ", { autoClose: 15000 });
            });
        } else {
        }
    }

    handleCancelInvoiceBHYT(id) {
        if (confirm("Bạn có chắc sẽ hủy 'Tất Cả' đơn hàng BHYT này? Số hóa đơn " + id)) {
            var url = `/invoice/cancelBHYT?id=${id}`;
            return agent.asyncRequests.post(url
            ).then(function (res) {
                var result = res.body.resultData;
                if (result && !result.error) {
                    toast.success("Đã Hủy Thành Công", { autoClose: 5000, position: toast.POSITION.TOP_RIGHT });
                    window.location.reload(true);
                } else {
                    toast.error("Có lỗi khi xóa dữ liệu. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Không thể hủy đơn hàng! Vui lòng liên hệ Admin. ", { autoClose: 15000 });
            });
        } else {
        }
    }

    deleteInvoice(id) {
        if (confirm("Bạn có chắc sẽ xoá !")) {
            var url = `/invoice/${id}`;
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

    handleVAT(id) {
        
    }

    getListPrescriptionItemByPrescriptionId(id) {
        const {currentUser} = this.props;
        var invoiceDto = this.state.invoiceDto;
        return agent.PrescriptionItemApi.findByPrescriptionId(id
        ).then(function (res) {
            var result = res.resultData;
            if (result) {
                // alert(result);
                InvoicePrintService.handleSavePDFRetail(InvoicePrintService.getDataExportRetail(result, currentUser, invoiceDto));
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });

    }
    // handleSavePDFRetail(dataExportRetail) {
    //     pdfMake.vfs = pdfFonts.pdfMake.vfs;
    //     pdfMake.createPdf(dataExportRetail).print();
    // }
    handlegetListToPrint(id) {
        this.getListPrescriptionItemByPrescriptionId(id);
    }
    render() {
        var startOfMonth = moment(new Date).startOf('day');
        var endOfMonth = moment(new Date).endOf('day');
        var dataPrescriptionItemList = this.state.listPrescriptionItem;
        var isShowInvoiceItemRows = this.state.isShowInvoiceItemRows;
        var invoiceType = this.state.invoiceType;
        const { invoiceObject, t } = this.props;
        var dataInvoiceItem = this.state.listInvoiceItem;
        var invoiceItemRows = [];
        var groupDrugTypeHeader = [];
        var drug = [];
        var invoiceItemCurrentNo = 0;
        if (dataInvoiceItem) {
            invoiceItemRows = dataInvoiceItem.map(item => {
                if (item.invoice.invoiceType == "DRUG") {
                    invoiceItemCurrentNo++;
                    return (
                        <tr key={item.id} >
                            <td></td>
                            <td>{invoiceItemCurrentNo}</td>
                            {/* <td >{item.invoice.patient.fullName}</td> */}
                            <td colSpan="2" >{item.drug ? item.drug.name  + " " + item.drug.hamLuongBHYT : ""}</td>
                            <td colSpan="2" >{item.drug ? item.drug.barCode : ""}</td>
                            <td colSpan="2" >{FormatterUtils.formatCurrency(item.numberOfItems)}</td>
                            <td colSpan="2" >{FormatterUtils.formatCurrency(item.amountNoVat)}</td>
                            <td colSpan="2" >{FormatterUtils.formatCurrency(item.amountWithVat)}</td>
                        </tr>
                    );
                } else if (item.invoice.invoiceType == "DIAGNOSIS_SERVICE") {
                    invoiceItemCurrentNo++;
                    return (
                        <tr key={item.id}>
                            <td></td>
                            <td>{invoiceItemCurrentNo}</td>
                            {/* <td >{item.invoice.patient.fullName}</td> */}
                            <td colSpan="3" >{item.diagnosisService ? item.diagnosisService.name : ""}</td>
                            <td colSpan="3" > {(item.prescription ? item.prescription.analysis : "")}</td>
                            {/* <td colSpan="2" >{item.numberOfItems}</td> */}
                            <td colSpan="2" >{item.amountNoVat}</td>
                            <td colSpan="2" >{item.amountWithVat}</td>
                        </tr>
                    );
                } else if (item.invoice.invoiceType == "PROCEDURE_SERVICE") {
                    invoiceItemCurrentNo++;
                    return (
                        [<tr key={item.id}>
                            <td></td>
                            <td>{invoiceItemCurrentNo}</td>
                            <td colSpan="3">{item.procedureService ? item.procedureService.name : ""}</td>
                            <td colSpan="3">{(item.prescription ? item.prescription.analysis : "")}</td>
                            {/* <td colSpan="2">{item.numberOfItems}</td> */}
                            <td colSpan="2">{item.amountNoVat}</td>
                            <td colSpan="2">{item.amountWithVat}</td>
                        </tr>
                        ].concat(isShowInvoiceItemRows ? invoiceItemRows : "")

                    )
                };
            })
        }
        if (invoiceType && invoiceType == "DRUG") {
            drug = [
                <tr className="success">
                    <th > </th>
                    <th style={{ textAlign: "center" }} data-toggle="true">STT</th>
                    {/* <th  data-toggle="true">Tên Bệnh Nhân </th> */}
                    <th style={{ textAlign: "center" }} colSpan="2" data-toggle="true">Tên Thuốc </th>
                    <th style={{ textAlign: "center" }} colSpan="2" data-toggle="true">Mã barcode </th>
                    <th style={{ textAlign: "center" }} colSpan="2" data-toggle="true"> Số Lượng Thuốc </th>
                    <th style={{ textAlign: "center" }} colSpan="2" data-toggle="true">Tiền Không VAT </th>
                    <th style={{ textAlign: "center" }} colSpan="2" data-toggle="true">Tiền Gồm VAT </th>
                </tr>
            ].concat(isShowInvoiceItemRows ? invoiceItemRows : "")
        } else if (invoiceType && invoiceType == "DIAGNOSIS_SERVICE") {
            drug = [
                <tr className="success">
                    <th > </th>
                    <th data-toggle="true">STT</th>
                    {/* <th   data-toggle="true">Tên Bệnh Nhân </th>                */}
                    <th colSpan="3" data-toggle="true">Tên Dịch Vụ</th>
                    <th colSpan="3" data-toggle="true">Chẩn đoán </th>
                    {/* <th colSpan="2" data-toggle="true">Số  Chẩn Đoán</th> */}
                    <th colSpan="2" data-toggle="true">Tiền Không VAT </th>
                    <th colSpan="2" data-toggle="true">Tiền Gồm VAT </th>
                </tr>
            ].concat(isShowInvoiceItemRows ? invoiceItemRows : "")
        } else if (invoiceType && invoiceType == "PROCEDURE_SERVICE") {
            drug = [
                <tr className="success">
                    <th > </th>
                    <th data-toggle="true">STT</th>
                    {/* <th   data-toggle="true">Tên Bệnh Nhân </th>         */}
                    <th  colSpan="3" data-toggle="true">Tên Dịch Vụ Thủ Thuật </th>
                    <th  colSpan="3" data-toggle="true">Chẩn đoán</th>
                    {/* <th  colSpan="2" data-toggle="true">Số Thủ Thuật </th> */}
                    <th  colSpan="2" data-toggle="true">Tiền Không VAT </th>
                    <th  colSpan="2" data-toggle="true">Tiền Gồm VAT </th>
                </tr>
            ].concat(isShowInvoiceItemRows ? invoiceItemRows : "")
        }
        var elementColor = isShowInvoiceItemRows ? "#fff" : "";
        return (
            [<tr key={invoiceObject.id} style={{ backgroundColor: elementColor }}>
                <td>
                    {isShowInvoiceItemRows ?
                        <button className="bg-info icon-arrow-up22" onClick={() => this.handleHideInvoiceItemRows()}></button> :
                        <button className="bg-info icon-arrow-down22" onClick={() => this.handleShowInvoiceItem(invoiceObject.id, invoiceObject.invoiceType)}></button>}
                </td>
                <td className="text-center">{invoiceObject.barCode ? invoiceObject.barCode : " - "}</td>
                <td>{invoiceObject.prescription ? invoiceObject.prescription.id : ""}</td>
                <td >{invoiceObject.patient ? invoiceObject.patient.code : ""} <br /> {invoiceObject.patient ? invoiceObject.patient.fullName : ""}</td>
                {/* <td>{invoiceObject.user.fullName}</td>  */}
                {/* <td>{invoiceObject.prescription.patient ? invoiceObject.prescription.patient.fullName : "" + ' - ' + invoiceObject.prescription.id}</td> */}
                <td>{moment(invoiceObject.createdDate).format("HH:mm DD/MM/YYYY ")}</td>
                {invoiceObject.invoiceGroup == 'REFUND' ? <td>{moment(invoiceObject.paymentDate).format("HH:mm DD/MM/YYYY ").replace("Invalid date", "Chưa Hoàn Trả")}</td>  : <td>{moment(invoiceObject.paymentDate).format("HH:mm DD/MM/YYYY ").replace("Invalid date", "Chưa Thanh Toán")}</td>}                    
                <td>{FormatterUtils.formatCurrency(invoiceObject.totalAmountNoVat) }</td>
                <td>{FormatterUtils.formatCurrency(invoiceObject.totalAmountWithVat)}</td>
                <td>{FormatterUtils.formatCurrency(invoiceObject.insurranceAmount)}</td>
                <td>{invoiceObject.status == "OPEN"? "Chưa Thanh Toán" : invoiceObject.status == "CLOSED" ? "Đã Thanh Toán" : "Đã Hủy"}</td>
                <td>{t(invoiceObject.invoiceType)}</td>
                <td className="text-center footable-visible footable-last-column">
                    <ul className="icons-list">
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                <i className="icon-menu9"></i>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-right">

                                {invoiceObject.status == 'OPEN' ? <li><a onClick={() => this.handleShowmodalPayment(invoiceObject)}><i className="icon-coin-dollar"></i>Thanh Toán</a></li> : ""}
                                {invoiceObject.status == 'CLOSED' ? [invoiceObject.patient != null ? <li><a onClick={() => this.getlistInvoiceItemToExportPdf(invoiceObject)}><i className="icon-clipboard3"></i>In Thông Tin Hóa Đơn</a></li> 
                                : <li><a onClick={() => this.handlegetListToPrint(invoiceObject.prescription ? invoiceObject.prescription.id : 1)}><i className="icon-clipboard3"></i>In Hóa Đơn Bán Lẻ</a></li> ] : ""}
                                
                                {/* <li><a onClick={() => this.handleVAT(invoiceObject.id)}><i className="icon-calculator"></i>Xuất hóa đơn VAT</a></li> */}
                                
                                {invoiceObject.status == 'OPEN' ? <li><a href={"/drugRetail/" + (invoiceObject.prescription ? invoiceObject.prescription.id: 1)}><i className="icon-pencil"></i>Chỉnh Sửa</a></li>: null}
                                
                                <SecuredComponent allowedPermission="admin.invoice.cancel">
                                {invoiceObject.status == 'CLOSED' || invoiceObject.status == 'OPEN' ? <li><a onClick={() => this.handleCancelInvoice(invoiceObject.id)}><i className="icon-minus-circle2"></i>Hủy Đơn Hàng</a></li>: null}
                                </SecuredComponent>

                                {/* <SecuredComponent allowedPermission="admin.invoice.cancel">
                                {invoiceObject.status == 'CLOSED' && invoiceObject.prescription && invoiceObject.prescription.insuranceTypeId > 1 || invoiceObject.status == 'OPEN' ? <li><a onClick={() => this.handleCancelInvoiceBHYT(invoiceObject.id)}><i className="icon-minus-circle2"></i>Hủy Đơn Hàng BHYT</a></li>: null}
                                </SecuredComponent> */}
                                
                            
                                {/* {invoiceObject.invoiceGroup !== 'REFUND' && startOfMonth == invoiceObject.createdDate  ?   <li><a onClick={() => this.handleShowmodalRefurn(invoiceObject)}><i className="icon-pencil"></i>Hoàn Trả</a></li> : ""}             */}
                                        
                                {/* {invoiceObject.status != 'CLOSED' ? <li><a onClick={() => this.deleteInvoice(invoiceObject.id)}><i className="icon-cross2"></i>Xóa</a></li> : null} */}
                                
                            </ul>
                        </li>
                    </ul>
                </td>

                {this.state.isPaymentModalShown ? <ModalPayment
                    title="Thanh Toán Hóa Đơn"
                    invoiceDto={this.state.invoiceDto}
                    idPayment={this.state.idPayment}
                    show={this.state.isPaymentModalShown}
                    onHide={this.handleHidemodal}
                    idPatient={this.state.idPatient} /> : ""
                }
                {this.state.isInvoiceModalShown ? <ModalInvoice
                    title="Chỉnh Sửa Hóa Đơn"
                    idInvoice={this.state.idInvoice}
                    show={this.state.isInvoiceModalShown}
                    onHide={this.handleHidemodal} /> : ""
                }
                 {/* {this.state.isInvoiceModalRefurnShown ? <ModalInvoiceRefurn
                    title="Hoàn Trả Đơn Thuốc"
                    idInvoiceItemRefurn={this.state.idInvoiceItemRefurn}
                    show={this.state.isInvoiceModalRefurnShown}
                    onHide={this.handleHidemodalRefurn} /> : ""
                } */}
            </tr>].concat(isShowInvoiceItemRows ? drug : "")
        );
    }
}
export default translate('translations')(InvoiceItemRows);