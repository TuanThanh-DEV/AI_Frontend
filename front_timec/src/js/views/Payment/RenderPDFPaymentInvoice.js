import moment from 'moment';
import { DateUtils, FormatterUtils } from '../../utils/javascriptUtils';

const RenderPDFPaymentInvoice = {
    getDataExport(dataInvoice, dataPayment, _this) {
        var leftCornerLogo = _this.state.leftCornerLogo;
        const {t} = _this.props;
        var patientBarcode = FormatterUtils.convertTextToBarcodeDisplayValue(dataInvoice.barCode);
        var dataInvoices = _this.state.listInvoiceItem;
        var prescriptionDate = dataPayment.paymentDate;
        var currentNo = 1;
        var currentNoList = [];
        var itemName = [];
        var numberOfItems = [];
        var unitPrices = [];
        var amountNoVat = [];
        var amountWithVat = [];
        var tienPhuThu = [];
        var tienBHYT = [];
        var tienDongChiTra = [];
        dataInvoices.map(item => {
            currentNoList.push(currentNo++);
            if (dataInvoice.invoiceType == "DRUG") {
                itemName.push(item.drug ? item.drug.name  + " " + item.drug.hamLuongBHYT: null);
            } else if (dataInvoice.invoiceType == "DIAGNOSIS_SERVICE") {
                itemName.push(item.diagnosisService ? item.diagnosisService.name : null);
            } else if (dataInvoice.invoiceType == "PACKAGE") {
                itemName.push(item.prescription.packages ? item.prescription.packages.name : null);
            }

            numberOfItems.push(item.numberOfItems);
            amountNoVat.push(FormatterUtils.formatCurrency(item.amountNoVat));
            unitPrices.push(FormatterUtils.formatCurrency(item.amountNoVat / item.numberOfItems));
            amountWithVat.push(item.amountWithVat);
            tienPhuThu.push(item.phuThu);
            tienBHYT.push(item.bhyt);
            tienDongChiTra.push(item.dongChiTra);
            return (itemName, numberOfItems, amountNoVat, amountWithVat, currentNoList, tienPhuThu, tienBHYT, tienDongChiTra);

        });
        var tableItems = null;
        
        // if(dataInvoice.bhyt > 1 ||  ( dataInvoice.diagnosisService && dataInvoice.diagnosisService.diagnosisGroupId != 88 )){
        if(dataInvoice.prescription && (dataInvoice.prescription.insuranceTypeId > 1 && dataInvoice.prescription.bhytPrescriptionId)){
            if (dataInvoice.invoiceType == "DRUG") {
                tableItems = {
    
                    style: ["marginBottomBase"],
                    table: {
                        widths: [30, 150, 'auto', '*','*','*','*'],
                        body: [
                            [{ text: 'STT', style: 'tableHeader', alignment: 'center' }, { text: 'TÊN THUỐC', style: 'tableHeader', alignment: 'center' }, { text: 'SỐ LƯỢNG', style: 'tableHeader', alignment: 'center' }, { text: 'GIÁ TIỀN', style: 'tableHeader', alignment: 'center' }, { text: 'Phụ Thu', style: 'tableHeader', alignment: 'center' }, { text: 'BHYT', style: 'tableHeader', alignment: 'center' }, { text: 'Đồng Chi Trả', style: 'tableHeader', alignment: 'center' }],
                            [currentNoList, itemName, numberOfItems, FormatterUtils.formatCurrency(amountNoVat), FormatterUtils.formatCurrency(tienPhuThu), FormatterUtils.formatCurrency(tienBHYT), FormatterUtils.formatCurrency(tienDongChiTra)],
    
                        ]
                    },
                }
            }
            if (dataInvoice.invoiceType == "DIAGNOSIS_SERVICE") {
                tableItems = {
    
                    style: ["marginBottomBase"],
                    table: {
                        widths: [30, 150, 'auto', 'auto','*','*','*'],
                        body: [
                            [{ text: 'STT', style: 'tableHeader', alignment: 'center' }, { text: 'TÊN DỊCH VỤ', style: 'tableHeader', alignment: 'center' }, { text: 'SỐ LƯỢNG', style: 'tableHeader', alignment: 'center' }, { text: 'GIÁ TIỀN', style: 'tableHeader', alignment: 'center' }, { text: 'Phụ Thu', style: 'tableHeader', alignment: 'center' }, { text: 'BHYT', style: 'tableHeader', alignment: 'center' }, { text: 'Đồng Chi Trả', style: 'tableHeader', alignment: 'center' }],
                            [currentNoList, itemName, numberOfItems, FormatterUtils.formatCurrency(amountNoVat), FormatterUtils.formatCurrency(tienPhuThu), FormatterUtils.formatCurrency(tienBHYT), FormatterUtils.formatCurrency(tienDongChiTra)],
                        ]
                    },
                }
            }
        }else{
            if (dataInvoice.invoiceType == "DRUG") {
                tableItems = {
    
                    style: ["marginBottomBase"],
                    table: {
                        widths: ["auto", "*", "auto", "auto", "auto"],
                        body: [
                            
                            [{fillColor: "#eeeeee",style: ["textCenter"], text:[{ text: 'STT', style: ["bold", ""], alignment: 'center'}, { text: '\n (No.)', style: ["textSmall", "italics"]}]}, 
                            {fillColor: "#eeeeee",style: ["textCenter"], text:[{ text: 'TÊN THUỐC', style: ["bold", ""], alignment: 'center'}, { text: '\n (Medicine name)', style: ["textSmall", "italics"]}]}, 
                            {fillColor: "#eeeeee",style: ["textCenter"], text:[{ text: 'SỐ LƯỢNG', style: ["bold", ""], alignment: 'center'}, { text: '\n (Quantity)', style: ["textSmall", "italics"]}]}, 
                            {fillColor: "#eeeeee",style: ["textCenter"], text:[{ text: 'ĐƠN GIÁ', style: ["bold", ""], alignment: 'center'}, { text: '\n (Price Unit)', style: ["textSmall", "italics"]}]}, 
                            {fillColor: "#eeeeee",style: ["textCenter"], text:[{ text: 'THÀNH TIỀN', style: ["bold", ""], alignment: 'center'}, { text: '\n (Amount)', style: ["textSmall", "italics"]}]}],
                            
                            [currentNoList, itemName, numberOfItems, unitPrices, amountNoVat],
    
                        ]
                    },
                }
            }
            if (dataInvoice.invoiceType == "DIAGNOSIS_SERVICE") {
                tableItems = {
    
                    style: ["marginBottomBase"],
                    table: {
                        widths: ["auto", "*", "auto", "auto", "auto"],
                        body: [
                            // [{ text: 'STT', style: 'tableHeader', alignment: 'center' }, { text: 'TÊN DỊCH VỤ', style: 'tableHeader', alignment: 'center' }, { text: 'SỐ LƯỢNG', style: 'tableHeader', alignment: 'center' }, { text: 'ĐƠN GIÁ', style: 'tableHeader', alignment: 'center' }, { text: 'THÀNH TIỀN', style: 'tableHeader', alignment: 'center' }],
                            // [currentNoList, itemName, numberOfItems, FormatterUtils.formatCurrency(amountNoVat)],
                            [
                            {fillColor: "#eeeeee",style: ["textCenter"], text:[{ text: 'STT', style: ["bold", ""], alignment: 'center'}, { text: '\n (No.)', style: ["textSmall", "italics"]}]}, 
                            {fillColor: "#eeeeee",style: ["textCenter"], text:[{ text: 'TÊN DỊCH VỤ', style: ["bold", ""], alignment: 'center'}, { text: '\n (Service name)', style: ["textSmall", "italics"]}]}, 
                            {fillColor: "#eeeeee",style: ["textCenter"], text:[{ text: 'SỐ LƯỢNG', style: ["bold", ""], alignment: 'center'}, { text: '\n (Quantity)', style: ["textSmall", "italics"]}]}, 
                            {fillColor: "#eeeeee",style: ["textCenter"], text:[{ text: 'ĐƠN GIÁ', style: ["bold", ""], alignment: 'center'}, { text: '\n (Price Unit)', style: ["textSmall", "italics"]}]}, 
                            {fillColor: "#eeeeee",style: ["textCenter"], text:[{ text: 'THÀNH TIỀN', style: ["bold", ""], alignment: 'center'}, { text: '\n (Amount)', style: ["textSmall", "italics"]}]}
                            ],
                            
                            [currentNoList, itemName, numberOfItems, unitPrices, amountNoVat],
                        ]
                    },
                }
            }
        }

        if (dataInvoice.invoiceType == "PRESCRIPTION") {
            tableItems = {
                columns: [
                    { text: '\n Phí Khám (Prescription fee): ' + FormatterUtils.formatCurrency(dataInvoice.originAmount), fontSize: 11, fontSize: 11, alignment: 'Left' },
                ]
            }
        }

        if (dataInvoice.invoiceType == "PACKAGE") {
            tableItems = {

                style: ["marginBottomBase"],
                table: {
                    widths: ["auto", "*", "auto", "auto", "auto"],
                    body: [
                        // [{ text: 'STT', style: 'tableHeader', alignment: 'center' }, { text: 'TÊN DỊCH VỤ', style: 'tableHeader', alignment: 'center' }, { text: 'SỐ LƯỢNG', style: 'tableHeader', alignment: 'center' }, { text: 'GIÁ TIỀN', style: 'tableHeader', alignment: 'center' }],
                        // [currentNoList, itemName, numberOfItems, FormatterUtils.formatCurrency(amountNoVat)],

                        [{ text: 'STT', style: 'tableHeader', alignment: 'center' }, { text: 'TÊN DỊCH VỤ', style: 'tableHeader', alignment: 'center' }, { text: 'SỐ LƯỢNG', style: 'tableHeader', alignment: 'center' }, { text: 'ĐƠN GIÁ', style: 'tableHeader', alignment: 'center' }, { text: 'THÀNH TIỀN', style: 'tableHeader', alignment: 'center' }],
                        [{fillColor: "#eeeeee",style: ["textCenter"], text:[{ text: 'STT', style: ["bold", ""], alignment: 'center'}, { text: '\n (No.)', style: ["textSmall", "italics"]}]}, 
                        {fillColor: "#eeeeee",style: ["textCenter"], text:[{ text: 'TÊN DỊCH VỤ', style: ["bold", ""], alignment: 'center'}, { text: '\n (Service name)', style: ["textSmall", "italics"]}]}, 
                        {fillColor: "#eeeeee",style: ["textCenter"], text:[{ text: 'SỐ LƯỢNG', style: ["bold", ""], alignment: 'center'}, { text: '\n (Quantity)', style: ["textSmall", "italics"]}]}, 
                        {fillColor: "#eeeeee",style: ["textCenter"], text:[{ text: 'ĐƠN GIÁ', style: ["bold", ""], alignment: 'center'}, { text: '\n (Price Unit)', style: ["textSmall", "italics"]}]}, 
                        {fillColor: "#eeeeee",style: ["textCenter"], text:[{ text: 'THÀNH TIỀN', style: ["bold", ""], alignment: 'center'}, { text: '\n (Amount)', style: ["textSmall", "italics"]}]}],
                            
                        [currentNoList, itemName, numberOfItems, unitPrices, amountNoVat],
                    ]
                },
            }
        }
        if (dataInvoice.invoiceType == "PRESCRIPTIONCOMPANY") {
            tableItems = {
                columns: [
                    { text: '\n Phí Khám (Prescription fee): ' + FormatterUtils.formatCurrency(dataInvoice.originAmount), fontSize: 11, fontSize: 11, alignment: 'Left' },
                ]
            }
        }
        if (dataInvoice.invoiceType == "PROCEDURE_SERVICE") {
            tableItems = {
                columns: [
                    { text: '\n Phí Khám (Prescription fee): ' + FormatterUtils.formatCurrency(dataInvoice.originAmount), fontSize: 11, fontSize: 11, alignment: 'Left' },
                ]
            }
        }
        var contentPrescriptionCompany = null;
        if (dataInvoice.invoiceType == "PRESCRIPTIONCOMPANY") {
            tableItems = [
                { text: '\n Nội Dung (Content): ', fontSize: 11, fontSize: 11, alignment: 'Left' },
                { text: '\n' + dataPayment.note, fontSize: 11, fontSize: 11, alignment: 'Left' }
            ]
        }

        var dataExport = {
            // Setup Page Dimensions
            pageMargins: [20, 25, 20, 40],
            // Footer
            footer: function () {
                return [
                    // Line Break
                    {
                        style: ["marginBottomSmall"],
                        canvas: [
                            {
                                type: "line",
                                x1: 20,
                                y1: 0,
                                x2: 515 + 20 + 20 + 20,
                                y2: 0,
                                lineWidth: 1,
                            },
                        ],
                    },
                    // Content
                    {
                        columnGap: 20,
                        margin: [20, 0, 20, 0],
                        columns: [
                            {
                                width: "*",
                                stack: [
                                    {
                                        text:
                                            "Block F - G, Tecco Town Bình Tân, 4449 Nguyễn Cửu Phú, P.Tân Tạo A, Bình Tân, TP. Hồ Chí Minh",
                                        style: ["textSmall"],
                                    },
                                    {
                                        text:
                                            "(Block F-G, Tecco Town Binh Tan, 4449 Nguyen Cuu Phu Street, Tan Tao A Ward, Bình Tan Dist, HCM city)",
                                        style: ["textSmall", "italics"],
                                    },
                                ],
                            },
        
                            {
                                width: "auto",
                                stack: [
                                    {
                                        text: "0879 115 115",
                                        style: ["textSmall"],
                                    },
                                    {
                                        text: "https://timec.vn/",
                                        style: ["textSmall"],
                                    },
                                ],
                            },
                        ],
                    },
                ];
            },
            // Contant Page
            content: [
                // Block 1: Header Page
                {
                    style: ["marginBottomLarge"],
                    layout: "noBorders",
                    table: {
                        widths: ["*", "auto"],
                        body: [
                            [
                                // Column 1
                                {
                                    stack: [
                                        {
                                            image: leftCornerLogo,
                                            width: 150,
                                            height: 75,
                                        },
                                        
                                    ],
                                },
                                // End
                                // Column 2
                                {
                                    style: ["textCenter"],
                                    stack: [
                                        {
                                            text: "PHIẾU THU",
                                            style: ["bold", "textLarge"],
                                        },
                                        {
                                            text: "(Invoice)",
                                            style: ["textLarge", "italics"],
                                        },
                                        {
                                            text: "Liên 2: Giao Người Nộp Tiền",
                                            style: ["textSmall", "italics"],
                                        },
                                        {
                                            text: "(Sheet 2: To Payment Applicant)",
                                            style: ["textSmall", "italics"],
                                        },
                                    ],
                                    margin: [0, 0, 50, 0],
                                },
                                // End
                            ],
                        ],
                    },
                },
                // End Block 1
                // Block 2: BreadCrumb Page
                {
                    style: ["marginBottomBase"],
                    layout: "noBorders",
                    table: {
                        widths: ["auto", "*"],
                        body: [
                            [
                                {
                                    fillColor: "#eeeeee",
                                    margin: [15, 0, 15, 0],
                                    text: [
                                        {
                                            text: "Mã số khách hàng ",
                                            style: ["bold", "textSmall"],
                                        },
                                        {
                                            text: "(Customer code): ",
                                            style: ["textSmall", "italics"],
                                        },
                                        {
                                            text: dataInvoice.patient ? dataInvoice.patient.code : "",
                                            style: ["bold", ""],
                                        },
                                    ],
                                },
                                {
                                    alignment: "right",
                                    style: ["textMedium"],
                                    text: [
                                        "Ngày ",
                                        {
                                            text: "(Date) ",
                                            style: ["textSmall", "italics"],
                                        },
                                        moment(prescriptionDate).format("DD"),
                                        " Tháng ",
                                        {
                                            text: "(Month) ",
                                            style: ["textSmall", "italics"],
                                        },
                                        moment(prescriptionDate).format("MM"),,
                                        " Năm ",
                                        {
                                            text: "(Year) ",
                                            style: ["textSmall", "italics"],
                                        },
                                        moment(prescriptionDate).format("YYYY"),,
                                    ],
                                },
                            ],
                        ],
                    },
                },
                // End Block 2
                // Block 3: Customer Infomation
                {
                    style: ["marginBottomLarge", "textMedium"],
                    layout: {
                        vLineWidth: function (i, node) {
                            return i === 1 || i === node.table.body.length ? 0 : 1;
                        },
                        paddingLeft: function (i, node) {
                            return 15;
                        },
                        paddingRight: function (i, node) {
                            return 15;
                        },
                        paddingTop: function (i, node) {
                            return 10;
                        },
                        paddingBottom: function (i, node) {
                            return 10;
                        },
                    },
                    table: {
                        widths: ["*", "auto"],
                        body: [
                            [
                                // Column 1
                                {
                                    stack: [
                                        {
                                            style: ["marginBottomSmall"],
                                            text: [
                                                "Họ và Tên ",
                                                {
                                                    text: "(Name): ",
                                                    style: ["textSmall", "italics"],
                                                },
                                                dataInvoice.patient ? dataInvoice.patient.fullName : ' ......',
                                            ],
                                        },
                                        {
                                            style: ["marginBottomSmall"],
                                            text: [
                                                "Ngày sinh ",
                                                {
                                                    text: "(Date of birth): ",
                                                    style: ["textSmall", "italics"],
                                                },
                                                dataInvoice.patient ? DateUtils.formatDateForScreen(dataInvoice.patient.birthday) : "................" + "                             ",
                                                "     Giới tính ",
                                                {
                                                    text: "(Sex): ",
                                                    style: ["textSmall", "italics"],
                                                },
                                                dataInvoice.patient ? t(dataInvoice.patient.gender) : "..................",
                                            ],
                                        },
                                        {
                                            style: ["marginBottomSmall"],
                                            text: [
                                                "Địa chỉ ",
                                                {
                                                    text: "(Address): ",
                                                    style: ["textSmall", "italics"],
                                                },
                                                dataInvoice.patient && dataInvoice.patient.address ? dataInvoice.patient.address : "",
                                            ],
                                        },
                                        {
                                            style: ["marginBottomSmall"],
                                            text: [
                                                "Số điện thoại ",
                                                {
                                                    text: "(Phone number): ",
                                                    style: ["textSmall", "italics"],
                                                },
                                                dataInvoice.patient && dataInvoice.patient.phone ? dataInvoice.patient.phone : "",
                                            ],
                                        },
                                        {
                                            style: ["marginBottomSmall"],
                                            text: [
                                                "Mã lượt khám ",
                                                {
                                                    text: "(Prescription code): ",
                                                    style: ["textSmall", "italics"],
                                                },
                                                dataInvoice.prescription ? dataInvoice.prescription.id : "",
                                            ],
                                        },
                                        {
                                            text: [
                                                "Ngày khám ",
                                                {
                                                    text: "(Date of Examination): ",
                                                    style: ["textSmall", "italics"],
                                                },
                                                dataInvoice.createdDate ? DateUtils.formatDateForScreen(dataInvoice.createdDate) : "",
                                            ],
                                        },
                                    ],
                                },
                                // End
                                // Column 2
                                {
                                    image: patientBarcode,
                                    width: 110,
                                    height: 55,
                                },
                                
                                // End
                            ],
                        ],
                    },
                },
                // End Block 3
                // Block 4: Services
                {
                    style: ["marginBottomBase"],
                    text: [
                        {
                            text: "Dịch vụ ",
                            style: ["bold", ""],
                        },
                        {
                            text: "(Service): ",
                            style: ["textSmall", "italics"],
                        },
        
                        "Chỉ định ",
                        {
                            text: "(Indication): ",
                            style: ["textSmall", "italics"],
                        },
                    ],
                },

                tableItems,
                
                // End Block 4
                // Block 5: Price Total
                {
                    columns: [
                        { width: "*", text: "" },
                        {
                            width: "auto",
                            style: ["marginBottomBase"],
                            fillColor: "#eeeeee",
                            layout: {
                                hLineWidth: function (i, node) {
                                    return i === 0 || i === node.table.body.length
                                        ? 0
                                        : 1;
                                },
                                vLineWidth: function (i, node) {
                                    return 0;
                                },
                                hLineStyle: function (i, node) {
                                    if (i === 0 || i === node.table.body.length) {
                                        return null;
                                    }
                                    return { dash: { length: 2, space: 2 } };
                                },
                                paddingLeft: function (i, node) {
                                    return 15;
                                },
                                paddingRight: function (i, node) {
                                    return 15;
                                },
                                paddingTop: function (i, node) {
                                    return 5;
                                },
                                paddingBottom: function (i, node) {
                                    return 5;
                                },
                            },
                            table: {
                                body: [
                                    [
                                        {
                                            text: [
                                                {
                                                    text: "Tổng cộng ",
                                                    style: ["bold", ""],
                                                },
                                                {
                                                    text: "(Total Amount): ",
                                                    style: ["textSmall", "italics"],
                                                },
                                            ],
                                        },
                                        FormatterUtils.formatCurrency(dataInvoice.originAmount) + " VNĐ",
                                    ],
                                    [
                                        {
                                            text: [
                                                {
                                                    text: "Giảm ",
                                                    style: ["bold", ""],
                                                },
                                                {
                                                    text: "(Discount): ",
                                                    style: ["textSmall", "italics"],
                                                },
                                            ],
                                        },
                                        FormatterUtils.formatCurrency(dataInvoice.reducedAmount) + " VNĐ",
                                    ],
                                    // [
                                    //     {
                                    //         text: [
                                    //             {
                                    //                 text: "Thuế giá trị gia tăng ",
                                    //                 style: ["bold", ""],
                                    //             },
                                    //             {
                                    //                 text: "(Value-Added Tax): ",
                                    //                 style: ["textSmall", "italics"],
                                    //             },
                                    //         ],
                                    //     },
                                    //     "1.999.999.999 VNĐ",
                                    // ],
                                    [
                                        {
                                            text: [
                                                {
                                                    text: "Thành tiền ",
                                                    style: ["bold", ""],
                                                },
                                                {
                                                    text: "(Total Payment): ",
                                                    style: ["textSmall", "italics"],
                                                },
                                            ],
                                        },
                                        FormatterUtils.formatCurrency(dataInvoice.totalAmountWithVat) + " VNĐ",
                                    ],
                                ],
                            },
                        },
                    ],
                },
                // End Block 5
                // Block 6: Note
                {
                    style: ["marginBottomBase"],
                    fillColor: "#eeeeee",
                    layout: {
                        hLineWidth: function (i, node) {
                            return i === 0 || i === node.table.body.length ? 0 : 1;
                        },
                        vLineWidth: function (i, node) {
                            return 0;
                        },
                        hLineStyle: function (i, node) {
                            if (i === 0 || i === node.table.body.length) {
                                return null;
                            }
                            return { dash: { length: 2, space: 2 } };
                        },
                        paddingLeft: function (i, node) {
                            return 15;
                        },
                        paddingRight: function (i, node) {
                            return 15;
                        },
                        paddingTop: function (i, node) {
                            return 5;
                        },
                        paddingBottom: function (i, node) {
                            return 5;
                        },
                    },
                    table: {
                        widths: ["*"],
                        body: [
                            [
                                {
                                    text: [
                                        {
                                            text: "Tổng số tiền viết bằng chữ ",
                                            style: ["bold"],
                                        },
                                        {
                                            text: "(Amount in Word): ",
                                            style: ["textSmall", "italics"],
                                        },
                                        FormatterUtils.capitalizeFirstLetter(FormatterUtils.number2words(dataInvoice.totalAmountWithVat)) + " đồng",
                                    ],
                                },
                            ],
                        ],
                    },
                },
                {
                    style: ["marginBottomBase", "textMedium"],
                    text: [
                        "* Đề nghị Quý Khách Hàng ghi rõ số hóa đơn khi chuyển khoản cho chúng tôi. Quý khách có nhu cầu xuất hóa đơn xin vui lòng liên hệ tiếp tân. Phiếu có giá trị xuất hóa đơn trong ngày. ",
                        {
                            text:
                                "(Please quote exactly the invoice number when making bank transfer. Please contact receptionist to issue invoice VAT if you need. VAT can only be issued by prescription day.)",
                            style: ["textSmall"],
                        },
                    ],
                },
                // End Block 6
                // Block 7: Signature
                {
                    style: ["textCenter"],
                    layout: {
                        hLineWidth: function (i, node) {
                            return i === 1 ? 0 : 1;
                        },
                        vLineWidth: function (i, node) {
                            return 0;
                        },
                        paddingTop: function (i, node) {
                            return 20;
                        },
                    },
                    // margin: [0, 15, 0, 0],
                    table: {
                        widths: ["*", "*"],
                        body: [
                            [
                                // Column 1
                                {
                                    stack: [
                                        {
                                            text: "NGƯỜI NỘP TIỀN",
                                            style: ["bold", "marginBottomSmall"],
                                        },
                                        {
                                            text: "(Ký, ghi rõ họ tên)",
                                            style: ["bold", "marginBottomSmall"],
                                        },
                                        {
                                            text:
                                                "(Payment Applicant - Signature and full name)",
                                            style: ["textSmall", "italics"],
                                        },
                                    ],
                                },
                                // End
                                // Column 2
                                {
                                    stack: [
                                        {
                                            text: "NGƯỜI LẬP PHIẾU",
                                            style: ["bold", "marginBottomSmall"],
                                        },
                                        {
                                            text: "(Ký, ghi rõ họ tên)",
                                            style: ["bold", "marginBottomSmall"],
                                        },
                                        {
                                            text:
                                                "(Prepared by - Signature and full name)",
                                            style: ["textSmall", "italics"],
                                        },
                                    ],
                                },
                                // End
                            ],
                        ],
                    },
                },
                // End Block 7
            ],
            // Styles
            styles: {
                bold: {
                    bold: true,
                },
                italics: {
                    italics: true,
                },
                textLarge: {
                    fontSize: 20,
                    lineHeight: 1,
                },
                textMedium: {
                    fontSize: 10,
                },
                textSmall: {
                    fontSize: 9,
                    lineHeight: 1.2,
                },
                textCenter: {
                    alignment: "center",
                },
                marginBottomLarge: {
                    margin: [0, 0, 0, 20],
                },
                marginBottomBase: {
                    margin: [0, 0, 0, 10],
                },
                marginBottomSmall: {
                    margin: [0, 0, 0, 5],
                },
                bgMain: {
                    background: "#eeeeee",
                },
            },
            defaultStyle: {
                fontSize: 11,
                lineHeight: 1,
            },
        };
        return dataExport;
    }
}
export { RenderPDFPaymentInvoice };



