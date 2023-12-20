import moment from 'moment';
import { DateUtils, FormatterUtils } from '../../utils/javascriptUtils';

const RenderPDFPrescriptionDrug = {
    getDataExport(dataPrescriptionItemList, _this) {
        var listAllDianosisService = _this.state.listAllDianosisService;

        var leftCornerLogo = _this.state.leftCornerLogo;

        var currentPrescription = _this.props.currentPrescription;
        
        const { t } = _this.props;

        // Show list items
        var currentNo = 0;

        var checkCodeId = currentPrescription.id;
        var note = currentPrescription.note ? currentPrescription.note : "";
        var dayBack = currentPrescription.dayBack ? currentPrescription.dayBack : "";
        var numberRandomRange = 8;
        var checkCode = checkCodeId.toString().length;
        var totalRange = numberRandomRange - checkCode;
        var title = "DT";
        var codeNumber = "";
        for (var i = 0; i < totalRange; i++) {
            codeNumber += '0';
        }
        var barcode = title + codeNumber + currentPrescription.id;
        var patientBarcode = FormatterUtils.convertTextToBarcodeDisplayValue(barcode);
        // var sumPrice = 0 ;

        var dsCanLamSan = '';
        if (listAllDianosisService.length > 0) {
            listAllDianosisService.map(item => {
                dsCanLamSan += item.diagnosisService.name + '(' + item.quantity + '), '
            })
        }

        var prescriptionDate = currentPrescription.arriveTime;
        var address = currentPrescription.patient && currentPrescription.patient.address ? currentPrescription.patient.address : "";
        var analysis = currentPrescription.analysis ? currentPrescription.analysis : "";
        var cls = currentPrescription.cls ? currentPrescription.cls : "";

        var tableItems = null;
        if (dataPrescriptionItemList.length > 0) {
            var itemRows = dataPrescriptionItemList.map(item => {
                currentNo++;
                // sumPrice += item.drug.salePrice * item.totalAmount;
                return [
                    [currentNo + '. '], [item.drug ? item.drug.name + " " + item.drug.hamLuongBHYT : "", "Cách dùng: \t " + item.instruction], [{ text: item.totalAmount }], [{ text: item.drug ? item.drug.uom : '' }]
                ];
            });
            tableItems = {
                style: 'tableExample',
                table: {
                    widths: ['auto', '*', 'auto', 'auto'],
                    body: itemRows,
                },
                layout: 'noBorders'
            }
        }

        var dataExport = {
            // Setup Page Dimensions
            pageMargins: [20, 10, 20, 40],
            // Footer
            footer: function () {
                return [
                    // Line Break
                    // {
                    //     style: ["marginBottomSmall"],
                    //     canvas: [
                    //         {
                    //             type: "line",
                    //             x1: 20,
                    //             y1: 0,
                    //             x2: 515 + 20 + 20 + 20,
                    //             y2: 0,
                    //             lineWidth: 1,
                    //         },
                    //     ],
                    // },
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
                    style: ["marginBottomBase"],
                    layout: {
                        vLineWidth: function (i, node) {
                            return i === 1 || i === node.table.body.length ? 0 : 1;
                        },
                    },
                    table: {
                        widths: ["*", "auto"],
                        body: [
                            [
                                // Column 1
                                {
                                    margin: [20, 10, 10, 10],
                                    stack: [
                                        {
                                            image: leftCornerLogo,
                                            width: 150,
                                            height: 75,
                                        },
                                        // {
                                        //     text: "PHÒNG KHÁM ĐA KHOA QUỐC TẾ TIMEC",
                                        //     style: ["bold"],
                                        // },
                                        // {
                                        //     text: "TIMEC INTERNATIONAL CLINIC",
                                        //     style: ["textSmall"],
                                        // },
                                        // {
                                        //     text:
                                        //         "Timec Chăm Sóc Với Tất Cả Yêu Thương",
                                        //     style: ["bold"],
                                        // },
                                    ],
                                },
        
                                // End
                                // Column 2
                                {
                                    margin: [10, 10, 20, 10],
                                    style: ["textMedium"],
                                    stack: [
                                        {
                                            style: ["marginBottomSmall"],
                                            text: [
                                                "Họ và Tên ",
                                                {
                                                    text: "(Name): ",
                                                    style: ["textSmall", "italics"],
                                                },
                                                currentPrescription.patient ? currentPrescription.patient.fullName : "...........................",
                                            ],
                                        },
                                        {
                                            style: ["marginBottomSmall"],
                                            text: [
                                                "Bảo hiểm Y tế ",
                                                {
                                                    text: "(Insurance): ",
                                                    style: ["textSmall", "italics"],
                                                },
                                                "......................................",
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
                                        {
                                            style: ["marginBottomSmall"],
                                            text: [
                                                "Ngày sinh ",
                                                {
                                                    text: "(Date of birth): ",
                                                    style: ["textSmall", "italics"],
                                                },
                                                currentPrescription.patient ? DateUtils.formatDateForScreen(currentPrescription.patient.birthday) : "...................",
                                                "     Tuổi ",
                                                {
                                                    text: "(Age): ",
                                                    style: ["textSmall", "italics"],
                                                },
                                                currentPrescription.patient ? FormatterUtils.formatYearFromBirthday(currentPrescription.patient.birthday): "",
                                                "     Giới tính ",
                                                {
                                                    text: "(Sex): ",
                                                    style: ["textSmall", "italics"],
                                                },
                                                currentPrescription.patient ? t( currentPrescription.patient.gender) : ".....",
                                            ],
                                        },
                                        {
                                            style: ["marginBottomSmall"],
                                            text: [
                                                "Chiều cao ",
                                                {
                                                    text: "(Height): ",
                                                    style: ["textSmall", "italics"],
                                                },
                                                currentPrescription.height ? currentPrescription.height + "                         " : ".....                         ",
                                                "Cân nặng ",
                                                {
                                                    text: "(Weight): ",
                                                    style: ["textSmall", "italics"],
                                                },
                                                currentPrescription.weight ? currentPrescription.weight: ".....   ",
                                            ],
                                        },
                                        {
                                            text: [
                                                "Ngày và giờ ",
                                                {
                                                    text: "(Date & Time): ",
                                                    style: ["textSmall", "italics"],
                                                },
                                                moment(prescriptionDate).format("DD/MM/YYYY HH:mm"),
                                            ],
                                        },
                                    ],
                                },
        
                                // End
                            ],
                        ],
                    },
                },
        
                // End Block 1
                // Block 2: Barcode
                {
                    style: ["marginBottomBase"],
                    layout: "noBorders",
                    table: {
                        widths: ["auto", "*", "auto"],
                        body: [
                            [
                                // Column 1
                                {
                                    image: patientBarcode,
                                    width: 110,
                                    height: 55,
                                },
                                // End
                                // Column 2
                                {
                                    margin: [0, 20, 0, 0],
                                    style: ["textCenter", "textMedium"],
                                    stack: [
                                        {
                                            style: ["marginBottomSmall"],
                                            text: [
                                                "Mã Toa ",
                                                {
                                                    text: "(Prescription code):",
                                                    style: ["textSmall", "italics"],
                                                },
                                                currentPrescription.id,
                                            ],
                                        },
                                        {
                                            text: [
                                                "Mã Khách Hàng ",
                                                {
                                                    text: "(Customer code):",
                                                    style: ["textSmall", "italics"],
                                                },
                                                currentPrescription && currentPrescription.patient ? currentPrescription.patient.code : ' ....',
                                            ],
                                        },
                                    ],
                                },
                                // End
                                // Column 3
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
                // End Block 2
                // Block 3: Customer Information
                {
                    style: ["marginBottomBase"],
                    layout: {
                        vLineWidth: function (i, node) {
                            return i === 1 || i === node.table.body.length ? 1 : 1;
                        },
                    },
                    table: {
                        widths: ["*"],
                        body: [
                            [
                                // Column
                                {
                                    margin: [30, 10, 30, 10],
                                    stack: [
                                        {
                                            style: ["marginBottomSmall"],
                                            text: [
                                                {
                                                    text: "ĐƠN THUỐC ",
                                                    style: [
                                                        "textCenter",
                                                        "textLarge",
                                                        "bold",
                                                    ],
                                                },
                                                {
                                                    text: "(PRESCRIPTION): ",
                                                    style: ["italics"],
                                                },
                                            ],
                                        },
                                        {
                                            style: ["marginBottomSmall"],
                                            text: [
                                                {
                                                    text: "DỊ ỨNG ",
                                                    style: ["bold"],
                                                },
                                                {
                                                    text: "(ALLERGY): ",
                                                    style: ["italics"],
                                                },
                                                "Không rõ",
                                            ],
                                        },
                                        {
                                            style: ["marginBottomSmall"],
                                            text: [
                                                {
                                                    text: "TRIỆU CHỨNG ",
                                                    style: ["textMedium", "bold"],
                                                },
                                                {
                                                    text: "(SYMPTOM): ",
                                                    style: ["italics"],
                                                },
                                                cls,
                                            ],
                                        },
                                        {
                                            style: ["marginBottomSmall"],
                                            text: [
                                                {
                                                    text: "CHẨN ĐOÁN ",
                                                    style: ["bold"],
                                                },
                                                {
                                                    text: "(DIAGNOSIS): ",
                                                    style: ["italics"],
                                                },
                                                analysis,
                                            ],
                                        },
                                        // Medicine Row
                                        {
                                            style: ["marginBottomSmall"],
                                            text: [
                                                {
                                                    text: "THUỐC ĐIỀU TRỊ ",
                                                    style: ["bold"],
                                                },
                                                {
                                                    text: "(MEDICINE): ",
                                                    style: ["italics"],
                                                },
                                                { text: (tableItems ? '' : 'Không Thuốc' ) + '\n\n', fontSize: 11 },,
                                            ],
                                        },

                                        tableItems,
                                        // End
                                        // Remark Row
                                        {
                                            margin: [0, 20, 0, 20],
                                            text: [
                                                {
                                                    text: "*Lời dặn ",
                                                    style: ["bold"],
                                                },
                                                {
                                                    text: "(Remark): ",
                                                    style: ["textSmall", "italics"],
                                                },
                                                note
                                            ],
                                        },
                                        // Date
                                        {
                                            style: ["textMedium", "marginBottomBase"],
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
                                                moment(prescriptionDate).format("MM"),
                                                " Năm ",
                                                {
                                                    text: "(Year) ",
                                                    style: ["textSmall", "italics"],
                                                },
                                                moment(prescriptionDate).format("YYYY"),
                                            ],
                                        },
                                        // Signature
                                        {
                                            layout: "noBorders",
                                            table: {
                                                widths: ["*", "*"],
                                                body: [
                                                    [
                                                        // Column 1
                                                        {
                                                            style: ["textCenter"],
                                                            stack: [
                                                                {
                                                                    text:
                                                                        "BÁC SĨ ĐIỀU TRỊ",
                                                                    style: [
                                                                        "bold",
                                                                        "marginBottomSmall",
                                                                    ],
                                                                },
                                                                {
                                                                    text:
                                                                        "(Doctor’s signature, name)",
                                                                    style: ["italics"],
                                                                },
                                                            ],
                                                        },
                                                        // End
                                                        // Column 2
                                                        {
                                                            text: [
                                                                {
                                                                    text:
                                                                        "Ngày tái khám ",
                                                                    style: [
                                                                        "bold",
                                                                        "marginBottomSmall",
                                                                    ],
                                                                },
        
                                                                {
                                                                    text:
                                                                        "(Follow up visit)",
                                                                    style: ["italics"],
                                                                },
                                                            ],
                                                        },
                                                        // End
                                                    ],
                                                ],
                                            },
                                        },
                                        {
                                            margin: [0, 100, 0, 0],
                                            style: ["italics"],
                                            text: [
                                                "Kê đơn bởi (prescribe by): ",
                                                "",
                                            ],
                                        },
                                    ],
                                },
                                // End
                            ],
                        ],
                    },
                },
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
export { RenderPDFPrescriptionDrug };



