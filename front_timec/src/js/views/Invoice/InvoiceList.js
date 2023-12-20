import React, {Component} from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import TablePagination from '../../components/TablePagination';
import { Field, reduxForm, formValueSelector, getFormValues } from 'redux-form';
import agent from '../../services/agent';
import { connect } from 'react-redux';
import ModalInvoice from './ModalInvoice';
import ModalInvoiceFromPrescription from './ModalInvoiceFromPrescription';
import { RenderDatePicker, RenderInputWithDiv, RenderSelect } from '../../components/formInputs';
import moment from 'moment'
import InvoiceItemRows from './InvoiceItemRows';
import ModalInputNamePatientForDrugRetail from './ModalInputNamePatientForDrugRetail';
import { PermanentCacheService } from '../../services/middleware';
import dateFns from 'date-fns';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import pdfMake from 'pdfmake/build/pdfmake';
import { FormatterUtils } from '../../utils/javascriptUtils';


const formValue = getFormValues("InvoiceList");
const selector = formValueSelector('InvoiceList');
const validate = values => {
    const errors = {};
    if (moment(values.toDate) < moment(values.fromDate)) {
        errors.toDate = 'Ngày kết thúc nhỏ hơn ngày bắt đầu!, vui lòng thử lại!'
    }
    return errors;
}
const mapStateToProps = state => {
    return {
        formValueProps: formValue(state),
        currentUser: state.common.currentUser
    };
};

const mapDispatchToProps = dispatch => ({
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "InvoiceList", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});
class InvoiceList extends React.Component {
    constructor() {
        super();
        let initialFormDate = new Date();
        initialFormDate = PermanentCacheService.getItem("selected_invoice_startDate") ? new Date(PermanentCacheService.getItem("selected_invoice_startDate")) : dateFns.setDate(initialFormDate, 1);
        let initialTodDate = new Date();
        initialTodDate = PermanentCacheService.getItem("selected_invoice_endDate") ? new Date(PermanentCacheService.getItem("selected_invoice_endDate")) : dateFns.setDate(initialTodDate, 1);
        let initialInvoiceStatus = 'ALL';
        initialInvoiceStatus = PermanentCacheService.getItem("selected_invoice_status") ? PermanentCacheService.getItem("selected_invoice_status") : initialInvoiceStatus;
        let initialInvoiceBarcode = '';
        initialInvoiceBarcode = PermanentCacheService.getItem("selected_invoice_invoiceBarCode") ? PermanentCacheService.getItem("selected_invoice_status") : initialInvoiceStatus;
        let initialValuesSearch = '';
        initialValuesSearch = PermanentCacheService.getItem("selected_invoice_valuesSearch") ? PermanentCacheService.getItem("selected_invoice_valuesSearch") : initialValuesSearch;

        this.state = {
            initialFormDate: initialFormDate,
            initialTodDate: initialTodDate,
            initialInvoiceStatus: initialInvoiceStatus,
            initialInvoiceBarcode: initialInvoiceBarcode,
            initialValuesSearch: initialValuesSearch,
            listInvoice: null,
            isListTable: false,
            isInvoiceModalShown: false,
            objectinvoice: null,
            isInvoiceFromPrescriptionModalShown: false,
            idInvoice: null,
            isShowModalInputNamePatientForDrugRetail: false,
            isPage : false

        }
        this.handleShowmodal = this.handleShowmodal.bind(this);
        this.handleSearchForm = this.handleSearchForm.bind(this);
        this.handleCreatePrescription = this.handleCreatePrescription.bind(this);
        this.handleFindAll = this.handleFindAll.bind(this);
        this.getInvoiceById = this.getInvoiceById.bind(this);
        this.handlePrintTotalPrescription = this.handlePrintTotalPrescription.bind(this);

        this.handleHidemodal = () => {
            this.setState({ isInvoiceModalShown: false });
        };
        this.handleHideModalFromPrescriptionModal = (obj) => {
            if (obj) {
                this.setState({
                    isListTable: true
                });
                this.getInvoiceById(obj.id);
            }
            this.setState({ isInvoiceFromPrescriptionModalShown: false, isShowModalInputNamePatientForDrugRetail: false });
            this.handleSearchForm({ fromDate: new Date(), toDate: new Date() });
        }
        this.setPermanetCache = (values) => {
            if (values.fromDate) {
                PermanentCacheService.setItem("selected_invoice_startDate", values.fromDate);
            }
            if (values.toDate) {
                PermanentCacheService.setItem("selected_invoice_endDate", values.toDate);
            }
            if (values.status) {
                PermanentCacheService.setItem("selected_invoice_status", values.status);
            }

            if (values.invoiceBarCode) {
                PermanentCacheService.setItem("selected_invoice_invoiceBarCode", values.invoiceBarCode);
            } else {
                PermanentCacheService.setItem("selected_invoice_invoiceBarCode", "");
            }

            if (values.search) {
                PermanentCacheService.setItem("selected_invoice_valuesSearch", values.search);
            } else {
                PermanentCacheService.setItem("selected_invoice_valuesSearch", "");
            }

            if (values.drugBarcode) {
                PermanentCacheService.setItem("selected_invoice_valuesSearchBarcode", values.drugBarcode);
            } else {
                PermanentCacheService.setItem("selected_invoice_valuesSearchBarcode", "");
            }

            this.setState({
                initialFormDate: values.fromDate ? values.fromDate : this.state.initialFormDate,
                initialTodDate: values.toDate ? values.toDate : this.state.initialTodDate,
                initialInvoiceStatus: values.status ? values.status : this.state.initialInvoiceStatus,
                initialInvoiceBarCode: values.invoiceBarCode ? values.invoiceBarCode : this.state.initialInvoiceBarCode,
                initialValuesSearch: values ? (values.search ? values.search : "") : this.state.initialValuesSearch,
            }, () => this.handleSearchForm(values));
        };
    };

    handleShowmodal(id) {
        this.setState({
            isInvoiceModalShown: true,
            idInvoice: id
        });
    }

    handleShowFromPrescriptionModal() {
        this.setState({
            isInvoiceFromPrescriptionModalShown: true
        });
    }
    // handleGetDataInvoice
    handlePrintTotalPrescription (dataInvoiceItem){
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        pdfMake.createPdf(this.renderPDFBarCode(dataInvoiceItem)).print();
    }

    // handleGetDataInvoice() {
    //     const { initialValuesSearch } = this.state;
    //     if(initialValuesSearch != ""){
    //         this.getInvoiceItem(initialValuesSearch);
    //     }else{
    //         toast.error("Vui lòng nhập mã bệnh nhân vào ô 'Tìm Kiếm'", { autoClose: 15000 });
    //     }
    // }

    // getInvoiceItem(initialValuesSearch) {
    //     const { initialFormDate, initialTodDate} = this.state;
    //     var _this = this;
    //     var url = "/invoice/getAllInvoiceDetailByPatientCode?patientCode=" + initialValuesSearch+"&fromDate=" + moment(initialFormDate).format("YYYY-MM-DD-HH:mm:ss") +"&toDate=" + moment(initialTodDate).format("YYYY-MM-DD-HH:mm:ss");
    //     return agent.asyncRequests.get(url
    //     ).then(function (res) {
    //         var result = res.body.resultData;
    //         if (result) {
    //             _this.handlePrintTotalPrescription(result);
    //         } else {
    //             toast.error("Có lỗi khi tải dữ liệu.", { autoClose: 15000 });
    //         }
    //     }, function (err) {
    //         toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
    //             + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
    //     });
    // }

    renderPDFBarCode(dataInvoieForPDFs) {
        const {t} = this.props;

                if (dataInvoieForPDFs != null) {
                    var today = moment(new Date).format('DD/MM/YYYY')
                    var patientBarCode =null;
                    var patientName = "";
                    var prescriptionId = 0;
                    var  totalAmountWithVat =[];
                    var totalAmountNoVat = [];
                    var dataMedicalServiceName = [];
                    var dataInvoideDrug = [];
                    var sumAllServiceWidthVAT = 0;

                    var drugName = [];
                    var drugNumber = [];
                    var drugUom = [];
                    var totalDrugAmountWidthVAT =[];
                    var totalDrugAmountNoVAT =[];
                    var sumAllrugWidthVAT = 0;

                  

                    var invoice = dataInvoieForPDFs.map(item => {

                        
                            
                            patientName = item.invoice.patient.fullName;
                            patientBarCode = item.invoice.patient.code;
                            prescriptionId= item.prescriptionId;
                            if(item.drugId != null){
                                return dataInvoideDrug.push(item);
                            }
                            else if(item.diagnosisServiceId != null){
                                dataMedicalServiceName.push(item.diagnosisService.name);
                                totalAmountWithVat.push(item.amountWithVat);
                                totalAmountNoVat.push(item.amountNoVat);
                                sumAllServiceWidthVAT += item.amountWithVat;
                            }else if(item.procedureServiceId != null){
                                dataMedicalServiceName.push(item.procedureService.name);
                                totalAmountWithVat.push(item.amountWithVat);
                                totalAmountNoVat.push(item.amountNoVat);
                                sumAllServiceWidthVAT += item.amountWithVat;
                            }
                      
                    });

                    if(dataInvoideDrug != null){
                        dataInvoideDrug.map(drugItem => {
                            drugName.push(drugItem.drug.name + " " + item.drug.hamLuongBHYT);
                            drugNumber.push(drugItem.numberOfItems);
                            drugUom.push(drugItem.drug.uom);
                            totalDrugAmountWidthVAT.push(drugItem.amountWithVat);
                            totalDrugAmountNoVAT.push(drugItem.amountNoVat);
                            sumAllrugWidthVAT += drugItem.amountWithVat;
                        }) 
                    }

                    var tableMedicalService = [{ text: '- Dịch Vụ Y Tế', alignment: 'Left', fontSize: 11 },{
                                                    style: 'tableExample',
                                                    alignment: 'center',
                                                    table: {
                                                        widths: ['*', 'auto', '*'],
                                                        body: [
                                                            [ { text: 'Tên dịch vụ', alignment: 'center' }, { text: 'Tiền chưa có VAT', alignment: 'center' }, { text: 'Tiền đã cộng VAT', alignment: 'center' }],
                                                            [dataMedicalServiceName, FormatterUtils.formatCurrency(totalAmountNoVat), FormatterUtils.formatCurrency(totalAmountWithVat)],
                                                        ]
                                                    },
                                                }, {
                                                    columns: [
                                                        { text: '', fontSize: 11 },
                                                        { text: '', fontSize: 11 },
                                                        { text: '\n Thành Tiền :' + FormatterUtils.formatCurrency(sumAllServiceWidthVAT) , alignment: 'Right', fontSize: 11 },
                                                    ]
                                                }]

                    var tableMedicalServices = (dataMedicalServiceName.length != 0 )? tableMedicalService : null;

                    var tableDrug =[{ text: '- Đơn Thuốc', alignment: 'Left', fontSize: 11 }, {
                                        style: 'tableExample',
                                        alignment: 'center',
                                        table: {
                                            widths: ['*', 'auto', '*', '*', '*'],
                                            body: [
                                                [ { text: 'Tên thuốc', alignment: 'center' }, { text: 'Số Lượng', alignment: 'center' }, { text: 'Đơn Vị', alignment: 'center' }, { text: 'Tiền chưa có VAT', alignment: 'center' }, { text: 'Tiền đã cộng VAT', alignment: 'center' }],
                                                [drugName, drugNumber, drugUom, FormatterUtils.formatCurrency(totalDrugAmountWidthVAT), FormatterUtils.formatCurrency(totalDrugAmountNoVAT)],
                                            ]
                                        },
                                    }, {
                                        columns: [
                                            { text: '', fontSize: 11 },
                                            { text: '', fontSize: 11 },
                                            { text: '\n Thành Tiền :' + FormatterUtils.formatCurrency(sumAllrugWidthVAT) , alignment: 'Right', fontSize: 11 },
                                        ]
                                    }]

                    var tableDrugs = (dataInvoideDrug.length != 0) ? tableDrug : null;

                    // var imageBarcode = FormatterUtils.convertTextToBarcode(drugBarcode);
                    var imageLogo = this.state.imageLogo;

                    var dataExport = {
                        content: [
                            {
                                columns: [
                                    imageLogo ? {
                                        image: imageLogo,
                                        fit: [150, 150],
                                        alignment: 'left',
                                        margin: [20, 0, 0, 0],
                                    } : null
                                ]
                            
                            },
                            {
                                columns: [
                                    { text: "Mã Phiếu Khám : " + prescriptionId, fontSize: 11, alignment: 'right', margin: [0, -50, 20, 0], style : ['quote'] },
                                ]
                            },
                            {
                                columns: [
                                    { text: "Ngày : " + today, fontSize: 11, alignment: 'right', margin: [0, -35, 20, 0], style : ['quote']},
                                ]
                            },
                            {
                                columns: [
                                    { text: '\n PHIẾU TỔNG HÓA ĐƠN', fontSize: 15, alignment: 'center' },
                                ]
                            },
                            {
                                columns: [
                                    { text: 'Tên Bệnh Nhân : ' +  patientName, alignment: 'Left', fontSize: 11 },
                                    {},
                                    { text: 'Mã Bệnh Nhân : ' +  patientBarCode, alignment: 'Left', fontSize: 11 },
                                ]
                            },
                            {text :'\n\n'},

                            //tableMedicalServices
                           
                            tableMedicalServices,
                            

                            // table drug
                            // { text: '1.Đơn Thuốc ', alignment: 'Left', fontSize: 11 },
                           tableDrugs,
                           
                        {
                            columns: [
                                { text: '', fontSize: 11 },
                                { text: '', fontSize: 11 },
                                { text: '\n Tổng Tiền :' + FormatterUtils.formatCurrency(sumAllrugWidthVAT + sumAllServiceWidthVAT) , alignment: 'Right', fontSize: 11 },
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
                            },	quote: {
                                italics: true
                            },
                        },
                        defaultStyle: {
                            columnGap: 10
                        }
                    }

                    return dataExport;
                }
    }

    getInvoiceById(id) {
        let setStateInRequest = (obj) => { this.setState({ listInvoice: obj }) }
        return agent.InvoiceApi.getInvoice(id)
            .then(function (res) {
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

    handleCheckOpenTimeByUserId() {
        const { currentUser } = this.props;
        var this_ = this;
        var url = '/cashDesk/checkOpenTimeByUserId?userId=';
        return agent.asyncRequests.get(url + currentUser.id
        ).then(function (res) {
            var result = res.body;
            if (result.resultData) {
                this_.handleCreatePrescription();
            } else {
                toast.info("Không thành công! Vui lòng mở quầy thu ngân trước!", { autoClose: 4000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    }

    handleCreatePrescription() {
        const { currentUser } = this.props;
        // this.setState({
        //     isShowModalInputNamePatientForDrugRetail: true
        // });

        return agent.asyncRequests.get("/prescription/newPrescription?currentUserId=" + currentUser.id
        ).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                window.location.href = "/drugRetail/" + result.id;
            } else {
                toast.error("Không thể tạo mới đơn khám bệnh cho bán thuốc ngoài luồng ( Đơn bán lẻ )! Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });

    }

    componentWillMount() {
        const { initialFormDate, initialTodDate,
            initialInvoiceStatus, initialInvoiceBarCode, initialValuesSearch } = this.state;
        const { updateField } = this.props;

        var url = '/assets/images/logo_timec.png';
        FormatterUtils.downloadImageDataUri(url, this, "imageLogo");

        updateField("fromDate", moment(initialFormDate));
        updateField("toDate", moment(new Date()));
        updateField("status", initialInvoiceStatus);
        updateField("invoiceBarCode", initialInvoiceBarCode);
        updateField("search", initialValuesSearch);
        this.handleSearchForm();
    };

    handleFindAll() {
        const { formValueProps } = this.props;
        const { updateField } = this.props;
        var startOfMonth = moment(new Date).startOf('day');
        var endOfMonth = moment(new Date).endOf('day');
        this.setState({
            isListTable: false,
            initialFormDate: startOfMonth,
            initialTodDate: endOfMonth
        });
        updateField("fromDate", startOfMonth);
        updateField("toDate", endOfMonth);
        updateField("status", 'ALL');
        updateField("invoiceBarCode", '');
        updateField("search", "");
        updateField("drugBarcode", "");
        this.setPermanetCache(formValueProps)
    }



    handleSearchForm(value) {
        const { initialFormDate, initialTodDate,
            initialInvoiceStatus,
            initialValuesSearch } = this.state;

        var page = qs.parse(this.props.location.search).page;
        var drugBarcode = "";
        if(value && value.drugBarcode){
            drugBarcode = value.drugBarcode;
        }

        var invoiceBarCode = "";
        if(value && value.invoiceBarCode){
            invoiceBarCode = value.invoiceBarCode;
        }

        if (!page) {
            page = 1;
        }
        let _this =this;
        let setStateInRequest = (list) => { this.setState({ listInvoice: list }) }
        return agent.asyncRequests.getPage('/invoice/listFindByInvoice?fromDate=' + moment(initialFormDate).format("YYYY-MM-DD-HH:mm:ss") + '&toDate=' + moment(initialTodDate).format("YYYY-MM-DD-HH:mm:ss")
        + '&invoiceBarCode=' + invoiceBarCode + '&patientNameOrPatientCode=' + initialValuesSearch + '&status=' + initialInvoiceStatus +"&drugBarcode="+drugBarcode, page
        ).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                if(result.content){
                    _this.setState({
                        isPage :true
                    })
                }else{
                    _this.setState({
                        isPage :false
                    })
                }
                setStateInRequest(result);
                
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        }
        )
    }
    render() {

        const { handleSubmit, submitting } = this.props;
        const data = this.state.listInvoice;
        if (!data) {
            return null;
        }
        var page = qs.parse(this.props.location.search).page;
        if (this.state.isListTable) {
            var rows = <InvoiceItemRows invoiceObject={data} handleSearchForm={(ev) => this.handleSearchForm(ev)}></InvoiceItemRows>
        } else {
            if (data.content) {
                var rows = data.content.map(item => {
                    return (
                        <InvoiceItemRows key={"invoice_" + item.id} invoiceObject={item} handleSearchForm={(ev) => this.handleSearchForm(ev)}></InvoiceItemRows>
                    );
                });
            }else{
                var rows = data.map(item => {
                    return (
                        <InvoiceItemRows key={"invoice_" + item.id} invoiceObject={item} handleSearchForm={(ev) => this.handleSearchForm(ev)}></InvoiceItemRows>
                    );
                });
            }

        }

        var optionStatus = [
            { label: "Mở", value: "OPEN" },
            { label: "Hủy Bỏ", value: "CANCELLED" },
            { label: "Đóng", value: "CLOSED" },
            { label: "Tất Cả", value: "ALL" }
        ];

        return (
            <div className="content-wrapper">
                <div className="page-header page-header-default">
                    <div className="breadcrumb-line">
                        <ul className="breadcrumb">
                            <li><a href=""><i className="icon-home2 position-left"></i> Home</a> </li>
                            <li className="active">Quản Lý Hóa Đơn</li>
                            <li className="active">Danh Sách Hóa Đơn</li>
                        </ul>
                        <div className="heading-elements">
                            <div className="heading-btn-group">
                                <button className="btn bg-teal" onClick={() => this.handleCheckOpenTimeByUserId()}>Tạo Đơn Thuốc Bán Lẻ</button>
                                {/* <button className="btn bg-teal" onClick={() => this.handleShowFromPrescriptionModal()}>Tạo Hoá Đơn</button> */}
                                {/* <button className="btn bg-teal" onClick={() => this.handleGetDataInvoice()}>In Phiếu Tổng</button> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div>
                                <form className="form-horizontal" role="form" onSubmit={handleSubmit(this.setPermanetCache)}>
                                    <div className="row">
                                        <div className="page-header"> </div>
                                    </div>
                                    <div className="row">
                                        <div className="col col-md-12">
                                            <div className="col col-md-3">
                                                <div className="col col-md-6" style={{ paddingLeft: "20px" }}>
                                                    <Field label="Từ Ngày" name="fromDate" component={RenderDatePicker}></Field>
                                                </div>
                                                <div className="col col-md-6" style={{ paddingLeft: "20px" }}>
                                                    <Field label="Đến Ngày" name="toDate" component={RenderDatePicker}></Field>
                                                </div>
                                            </div>
                                            <div className="col col-md-1" style={{ paddingLeft: "20px" }}>
                                                <Field name="status" label="Trạng Thái" options={optionStatus} component={RenderSelect}></Field>
                                            </div>
                                            <div className="col col-md-2" style={{ paddingLeft: "20px" }}>
                                                <Field label="Thuốc" name="drugBarcode" placeholder="Mã Thuốc..." component={RenderInputWithDiv}></Field>
                                            </div>
                                            <div className="col col-md-2" style={{ paddingLeft: "20px" }}>
                                                <Field label="Bệnh Nhân" name="search" placeholder="Tìm Tên, Mã Bệnh Nhân..." component={RenderInputWithDiv}></Field>
                                            </div>
                                            <div className="col col-md-2" style={{ paddingLeft: "20px" }}>
                                                <Field label="Hóa Đơn" name="invoiceBarCode" placeholder="Tìm Mã  Hóa Đơn..." autoFocus={true} component={RenderInputWithDiv}></Field>
                                            </div>
                                            <div className="col col-md-1" style={{ paddingLeft: "10px", paddingTop: "28px" }}>
                                                <button type="submit" className="btn bg-success btn-xlg">Tìm</button>
                                            </div>
                                            <div className="col col-md-1" style={{ paddingLeft: "10px", paddingTop: "28px" }}>
                                                <button type="button" className="btn bg-success btn-xlg" onClick={this.handleFindAll}>Làm mới</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="panel panel-flat">
                                <table className="table table-xxs table-bordered">
                                    <thead>
                                        <tr className="bg-teal">
                                            <th data-toggle="true"></th>
                                            <th data-toggle="true">Mã Hoá Đơn</th>
                                            <th colSpan="2" data-toggle="true"><center>Mã Bệnh Án - Mã/Tên Bệnh nhân</center></th>
                                            <th data-toggle="true">Ngày Lập</th>
                                            <th data-toggle="true">Ngày Thanh Toán</th>
                                            <th data-toggle="true">Tổng Tiền Không VAT</th>
                                            <th data-toggle="true">Tổng Tiền Gồm  VAT</th>
                                            <th data-toggle="true">Tiền Bảo Hiểm</th>
                                            <th data-toggle="true">Trạng Thái</th>
                                            <th data-toggle="true">Loại Hóa Đơn</th>
                                            <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                        </tr>

                                    </thead>
                                    <tbody>
                                        {rows}
                                    </tbody>
                                </table>
                            </div>
                            {this.state.isInvoiceModalShown ? <ModalInvoice
                                title="Cập Nhật Hóa Đơn"
                                idInvoice={this.state.idInvoice}
                                show={this.state.isInvoiceModalShown}
                                onHide={this.handleHidemodal} /> : null
                            }

                            {this.state.isInvoiceFromPrescriptionModalShown ? <ModalInvoiceFromPrescription
                                title="Tạo Hoá Đơn"
                                show={this.state.isInvoiceFromPrescriptionModalShown}
                                onHide={(obj) => this.handleHideModalFromPrescriptionModal(obj)} /> : null
                            }
                            {this.state.isShowModalInputNamePatientForDrugRetail ? <ModalInputNamePatientForDrugRetail
                                title="Nhập Tên Người Mua"
                                show={this.state.isShowModalInputNamePatientForDrugRetail}
                                onHide={this.handleHideModalFromPrescriptionModal} /> : null
                            }
                        </div>
                        {this.state.isPage ? <TablePagination data={data} baseUrl="/listInvoice" /> : null}
                    </div>
                </div>
            </div>
        );
    }
}
export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'InvoiceList',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(InvoiceList)));

