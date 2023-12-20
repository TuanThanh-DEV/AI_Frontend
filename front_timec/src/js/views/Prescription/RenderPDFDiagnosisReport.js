import moment from 'moment';
import { DateUtils, FormatterUtils } from '../../utils/javascriptUtils';

const RenderPDFDiagnosisReport = {
    getDataExport(dataDiagnosisReport, _this) {
        var leftCornerLogo = _this.state.leftCornerLogo;
        const {t} = _this.props;

        var currentPrescription = _this.props.currentPrescription;
        var checkCodeId = currentPrescription.id;
        var numberRandomRange = 7;
        var checkCode = checkCodeId.toString().length;
        var totalRange = numberRandomRange - checkCode;
        var title = "PXN";
        var codeNumber = "";
        for (var i = 0; i < totalRange; i++) {
            codeNumber += '0';
        }
        var barcode = title + codeNumber + currentPrescription.id;
        var patientBarcode = FormatterUtils.convertTextToBarcodeDisplayValue(barcode);
        var bodyContent = [];
        var contents = [];
        var prescriptionDate = currentPrescription.arriveTime;
        var diagnosisGroupId = null;
        var group = [];
        var service = [];

        var address = null;
        var patientName = null;
        var patientCode = null;
        var gender = null;
        var tuoi = null;
        var analysis = null;
        var itemPrice = 0;
        var pageBreaks = 'after';

        analysis = currentPrescription.analysis ? currentPrescription.analysis : "";
        var cls = currentPrescription.analysis ? currentPrescription.cls : "";
        dataDiagnosisReport.map((item, index) => {

            address = item.prescription.patient ? item.prescription.patient.address : null;
            patientName = item.prescription.patient ? item.prescription.patient.fullName : "....................................................................";
            patientCode = item.prescription.patient ? item.prescription.patient.code : "....................................................................";
            gender = item.prescription.patient ? item.prescription.patient.gender : "..................";
            tuoi = item.prescription.patient ? DateUtils.formatDateForScreen(item.prescription.patient.birthday) : "......................";
            itemPrice = item.diagnosisService.price;

            if (diagnosisGroupId == null) {
                diagnosisGroupId = item.diagnosisService.diagnosisGroupId;
                service.push(item);
            } else if (diagnosisGroupId == item.diagnosisService.diagnosisGroupId) {
                service.push(item);
            } else if (diagnosisGroupId != item.diagnosisService.diagnosisGroupId) {
                group.push(service);
                diagnosisGroupId = item.diagnosisService.diagnosisGroupId;
                service = [];
                service.push(item);
            }
            if (index + 1 == dataDiagnosisReport.length) {
                group.push(service);
            }
        })

        group.map((itemListService, index) => {
            if (index + 1 == group.length) {
                pageBreaks = "";;
            }
            var groupName = null;
            var dataRowTable = [[
                {
                    fillColor: "#eeeeee",
                    style: ["textCenter"],
                    text: [
                        {
                            text: "STT",
                            style: ["bold"],
                        },
                        {
                            text: "\n (No.)",
                            style: ["textSmall", "italics"],
                        },
                    ],
                },
                {
                    fillColor: "#eeeeee",
                    style: ["textCenter"],
                    text: [
                        {
                            text: "TÊN DỊCH VỤ",
                            style: ["bold", ""],
                        },
                        {
                            text: "\n (Service name)",
                            style: ["textSmall", "italics"],
                        },
                    ],
                },
            ]];

            itemListService.map((item, index) => {
                groupName = item.diagnosisService.diagnosisGroup.name;

                return dataRowTable.push([
                    { text: index + 1, style: ["bold", "textCenter"] },
                    item.diagnosisService.name + (item.quantity > 1 ? ( ". SL : " + item.quantity ) : " "),
                ])

            });

            bodyContent = [
                // TODO: the screen for each group
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
                                    margin: [0, 0, 50, 0],
                                    stack: [
                                        {
                                            margin: [0, 20, 0, 0],
                                            style: ["bold", "textLarge", "textCenter"],
                                            text: "PHIẾU CHỈ ĐỊNH",
                                        },
                                        {
                                            style: [
                                                "textCenter",
                                                "italics",
                                                "textLarge",
                                            ],
                                            text: "(Indication)",
                                        },
                                        // {
                                        //     text: "Liên 2: Giao Người Nộp Tiền",
                                        //     style: [
                                        //         "textSmall",
                                        //         "italics",
                                        //         "textCenter",
                                        //     ],
                                        // },
                                        // {
                                        //     text: "(Sheet 2: To Payment Applicant)",
                                        //     style: [
                                        //         "textSmall",
                                        //         "italics",
                                        //         "textCenter",
                                        //     ],
                                        // },
                                    ],
                                },
                                // End
                            ],
                        ],
                    },
                },
                // End Block 1
                // Block 2: Breadcrumb Page
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
                                            text: patientCode,
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
                                        moment(prescriptionDate).format("YYYY"),
                                    ],
                                },
                            ],
                        ],
                    },
                },
                // End Block 2
                // Block 3: Customer Information
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
                                                patientName,
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
                                                tuoi + "                      ",
                                                "Giới tính ",
                                                {
                                                    text: "(Sex): ",
                                                    style: ["textSmall", "italics"],
                                                },
                                                t(gender),
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
                                                address ? address : '',
                                            ],
                                        },
                                        // {
                                        //     style: ["marginBottomSmall"],
                                        //     text: [
                                        //         "Mã Thẻ BHYT ",
                                        //         {
                                        //             text: "(Insurance code): ",
                                        //             style: ["textSmall", "italics"],
                                        //         },
                                        //         "01234567891",
                                        //     ],
                                        // },
                                        {
                                            style: ["marginBottomSmall"],
                                            text: [
                                                "Mã Bệnh Án ",
                                                {
                                                    text: "(Prescription code): ",
                                                    style: ["textSmall", "italics"],
                                                },
                                                currentPrescription.id,
                                            ],
                                        },
                                        {
                                            text: [
                                                "Ngày khám ",
                                                {
                                                    text: "(Date of Examination): ",
                                                    style: ["textSmall", "italics"],
                                                },
                                                DateUtils.formatDateForScreen(prescriptionDate),
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
                // Block 4: Diagnosis Information
                {
                    style: ["marginBottomLarge"],
                    text: [
                        {
                            text: "Chẩn đoán ",
                            style: ["bold", ""],
                        },
                        {
                            text: "(Diagnosis): ",
                            style: ["textSmall", "italics"],
                        },
                        {
                            text: analysis,
                        },
                    ],
                },
                {
                    style: ["marginBottomLarge"],
                    text: [
                        {
                            text: "Triệu chứng ",
                            style: ["bold", ""],
                        },
                        {
                            text: "(Symptom): ",
                            style: ["textSmall", "italics"],
                        },
                        {
                            text: cls,
                        },
                    ],
                },
                {
                    style: ["marginBottomSmall"],
                    text: [
                        {
                            text: "Nhóm ",
                            style: ["bold", ""],
                        },
                        {
                            text: "(Kind): ",
                            style: ["textSmall", "italics"],
                        },
                        {
                            text: groupName,
                        },
                    ],
                },
                // End Block 4
                // Block 5: Services
                {
                    style: ["marginBottomBase"],
                    table: {
                        widths: ["auto", "*"],
                        body: dataRowTable,
                    },
                },
                // End Block 5
                // Block 6: Signature
                {
                    style: ["textCenter", "textMedium"],
                    layout: "noBorders",
                    margin: [0, 15, 0, 0],
                    table: {
                        widths: ["*", "*"],
                        body: [
                            [
                                // Column 1
                                {},
                                // End
                                // Column 2
                                {
                                    stack: [
                                        {
                                            text: "BÁC SĨ CHỈ ĐỊNH",
                                            style: ["bold", "marginBottomSmall"],
                                        },
                                        {
                                            text: "(Ký, ghi rõ họ tên)",
                                            style: ["bold", "marginBottomSmall"],
                                        },
                                        {
                                            text:
                                                "(Doctor indicate - Signature and full name)",
                                            style: ["textSmall", "italics"],
                                            pageBreak: pageBreaks
                                        },
                                    ],
                                },
                                // End
                            ],
                        ],
                    },
                },
                // End Block 6

                // content table
                // tableBody,
                
            ]

            contents.push(bodyContent);
        });

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
            // Content Page
            content: contents,
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
    },
    getDataExportNoPayment(dataDiagnosisReportAll, _this) {
        let dataDiagnosisReport = [];
        if(dataDiagnosisReportAll.length > 0){
            dataDiagnosisReportAll.map( item => {
                if(!item.statusPayment){
                    dataDiagnosisReport.push(item);
                }
            })
        }
        var leftCornerLogo = _this.state.leftCornerLogo;
        const {t} = _this.props;

        var currentPrescription = _this.props.currentPrescription;
        var checkCodeId = currentPrescription.id;
        var numberRandomRange = 7;
        var checkCode = checkCodeId.toString().length;
        var totalRange = numberRandomRange - checkCode;
        var title = "PXN";
        var codeNumber = "";
        for (var i = 0; i < totalRange; i++) {
            codeNumber += '0';
        }
        var barcode = title + codeNumber + currentPrescription.id;
        var patientBarcode = FormatterUtils.convertTextToBarcodeDisplayValue(barcode);
        var bodyContent = [];
        var contents = [];
        var prescriptionDate = currentPrescription.arriveTime;
        var diagnosisGroupId = null;
        var group = [];
        var service = [];

        var address = null;
        var patientName = null;
        var patientCode = null;
        var gender = null;
        var tuoi = null;
        var analysis = null;
        var itemPrice = 0;
        var pageBreaks = 'after';

        analysis = currentPrescription.analysis ? currentPrescription.analysis : "";
        var cls = currentPrescription.analysis ? currentPrescription.cls : "";
        dataDiagnosisReport.map((item, index) => {

            address = item.prescription.patient ? item.prescription.patient.address : null;
            patientName = item.prescription.patient ? item.prescription.patient.fullName : "....................................................................";
            patientCode = item.prescription.patient ? item.prescription.patient.code : "....................................................................";
            gender = item.prescription.patient ? item.prescription.patient.gender : "..................";
            tuoi = item.prescription.patient ? DateUtils.formatDateForScreen(item.prescription.patient.birthday) : "......................";
            itemPrice = item.diagnosisService.price;

            if (diagnosisGroupId == null) {
                diagnosisGroupId = item.diagnosisService.diagnosisGroupId;
                service.push(item);
            } else if (diagnosisGroupId == item.diagnosisService.diagnosisGroupId) {
                service.push(item);
            } else if (diagnosisGroupId != item.diagnosisService.diagnosisGroupId) {
                group.push(service);
                diagnosisGroupId = item.diagnosisService.diagnosisGroupId;
                service = [];
                service.push(item);
            }
            if (index + 1 == dataDiagnosisReport.length) {
                group.push(service);
            }
        })

        group.map((itemListService, index) => {
            if (index + 1 == group.length) {
                pageBreaks = "";;
            }
            var groupName = null;
            var dataRowTable = [[
                {
                    fillColor: "#eeeeee",
                    style: ["textCenter"],
                    text: [
                        {
                            text: "STT",
                            style: ["bold"],
                        },
                        {
                            text: "\n (No.)",
                            style: ["textSmall", "italics"],
                        },
                    ],
                },
                {
                    fillColor: "#eeeeee",
                    style: ["textCenter"],
                    text: [
                        {
                            text: "TÊN DỊCH VỤ",
                            style: ["bold", ""],
                        },
                        {
                            text: "\n (Service name)",
                            style: ["textSmall", "italics"],
                        },
                    ],
                },
            ]];

            itemListService.map((item, index) => {
                groupName = item.diagnosisService.diagnosisGroup.name;

                return dataRowTable.push([
                    { text: index + 1, style: ["bold", "textCenter"] },
                    item.diagnosisService.name + (item.quantity > 1 ? ( ". SL : " + item.quantity ) : " "),
                ])

            });

            bodyContent = [
                // TODO: the screen for each group
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
                                    margin: [0, 0, 50, 0],
                                    stack: [
                                        {
                                            margin: [0, 20, 0, 0],
                                            style: ["bold", "textLarge", "textCenter"],
                                            text: "PHIẾU CHỈ ĐỊNH",
                                        },
                                        {
                                            style: [
                                                "textCenter",
                                                "italics",
                                                "textLarge",
                                            ],
                                            text: "(Indication)",
                                        },
                                        // {
                                        //     text: "Liên 2: Giao Người Nộp Tiền",
                                        //     style: [
                                        //         "textSmall",
                                        //         "italics",
                                        //         "textCenter",
                                        //     ],
                                        // },
                                        // {
                                        //     text: "(Sheet 2: To Payment Applicant)",
                                        //     style: [
                                        //         "textSmall",
                                        //         "italics",
                                        //         "textCenter",
                                        //     ],
                                        // },
                                    ],
                                },
                                // End
                            ],
                        ],
                    },
                },
                // End Block 1
                // Block 2: Breadcrumb Page
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
                                            text: patientCode,
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
                                        moment(prescriptionDate).format("YYYY"),
                                    ],
                                },
                            ],
                        ],
                    },
                },
                // End Block 2
                // Block 3: Customer Information
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
                                                patientName,
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
                                                tuoi + "                      ",
                                                "Giới tính ",
                                                {
                                                    text: "(Sex): ",
                                                    style: ["textSmall", "italics"],
                                                },
                                                t(gender),
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
                                                address ? address : '',
                                            ],
                                        },
                                        // {
                                        //     style: ["marginBottomSmall"],
                                        //     text: [
                                        //         "Mã Thẻ BHYT ",
                                        //         {
                                        //             text: "(Insurance code): ",
                                        //             style: ["textSmall", "italics"],
                                        //         },
                                        //         "01234567891",
                                        //     ],
                                        // },
                                        {
                                            style: ["marginBottomSmall"],
                                            text: [
                                                "Mã Bệnh Án ",
                                                {
                                                    text: "(Prescription code): ",
                                                    style: ["textSmall", "italics"],
                                                },
                                                currentPrescription.id,
                                            ],
                                        },
                                        {
                                            text: [
                                                "Ngày khám ",
                                                {
                                                    text: "(Date of Examination): ",
                                                    style: ["textSmall", "italics"],
                                                },
                                                DateUtils.formatDateForScreen(prescriptionDate),
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
                // Block 4: Diagnosis Information
                {
                    style: ["marginBottomLarge"],
                    text: [
                        {
                            text: "Chẩn đoán ",
                            style: ["bold", ""],
                        },
                        {
                            text: "(Diagnosis): ",
                            style: ["textSmall", "italics"],
                        },
                        {
                            text: analysis,
                        },
                    ],
                },
                {
                    style: ["marginBottomLarge"],
                    text: [
                        {
                            text: "Triệu chứng ",
                            style: ["bold", ""],
                        },
                        {
                            text: "(Symptom): ",
                            style: ["textSmall", "italics"],
                        },
                        {
                            text: cls,
                        },
                    ],
                },
                {
                    style: ["marginBottomSmall"],
                    text: [
                        {
                            text: "Nhóm ",
                            style: ["bold", ""],
                        },
                        {
                            text: "(Kind): ",
                            style: ["textSmall", "italics"],
                        },
                        {
                            text: groupName,
                        },
                    ],
                },
                // End Block 4
                // Block 5: Services
                {
                    style: ["marginBottomBase"],
                    table: {
                        widths: ["auto", "*"],
                        body: dataRowTable,
                    },
                },
                // End Block 5
                // Block 6: Signature
                {
                    style: ["textCenter", "textMedium"],
                    layout: "noBorders",
                    margin: [0, 15, 0, 0],
                    table: {
                        widths: ["*", "*"],
                        body: [
                            [
                                // Column 1
                                {},
                                // End
                                // Column 2
                                {
                                    stack: [
                                        {
                                            text: "BÁC SĨ CHỈ ĐỊNH",
                                            style: ["bold", "marginBottomSmall"],
                                        },
                                        {
                                            text: "(Ký, ghi rõ họ tên)",
                                            style: ["bold", "marginBottomSmall"],
                                        },
                                        {
                                            text:
                                                "(Doctor indicate - Signature and full name)",
                                            style: ["textSmall", "italics"],
                                            pageBreak: pageBreaks
                                        },
                                    ],
                                },
                                // End
                            ],
                        ],
                    },
                },
                // End Block 6

                // content table
                // tableBody,
                
            ]

            contents.push(bodyContent);
        });

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
            // Content Page
            content: contents,
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
export { RenderPDFDiagnosisReport };
