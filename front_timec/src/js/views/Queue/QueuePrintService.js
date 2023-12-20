import pdfFonts from 'pdfmake/build/vfs_fonts';
import pdfMake from 'pdfmake/build/pdfmake';
import moment from 'moment';
import { FormatterUtils } from '../../utils/javascriptUtils';
import agent from '../../services/agent';
import { toast } from 'react-toastify';

export const QueuePrintService = {
    renderPDFBarCode(dataPrintPrescription, imageLogo, configTable, type, insuranceCode) {

        // var dataPrintPrescription = this.state.currentQueueNumber;

        if (dataPrintPrescription) {

            // var imageLogo = this.state.imageLogo;
            // var configTable = this.state.configTable;
            var today = new Date();
            // var batchCode = FormatterUtils.convertTextToBarcode(dataPrintPrescription);
            var id = dataPrintPrescription.id;
            var patientName = dataPrintPrescription.patient.fullName;
            var address = dataPrintPrescription.patient.address;
            var birthday = moment(dataPrintPrescription.patient.birthday).format("DD/MM/YYYY") ;
            var nation = dataPrintPrescription.patient ? dataPrintPrescription.nation : "";
            var theNumber = dataPrintPrescription.queueNumber.theNumber;
            var department = dataPrintPrescription.department.name;
            var departmentClass = dataPrintPrescription.department ? (dataPrintPrescription.department.departmentCode + " - " + dataPrintPrescription.department.name) : "NA";
            // var barcode = dataPrintPrescription.patient ? dataPrintPrescription.patient.code : "";
            var callTime = moment(dataPrintPrescription.queueNumber.callTime).format("DD/MM/YYYY hh:mm");
            var checkCodeId = dataPrintPrescription.id;
            var numberRandomRange = 8 ;
            var checkCode = checkCodeId.toString().length;
            var totalRange = numberRandomRange - checkCode;
            var title = type; // normal prescription
            var dongiaKham = 27500;
            if (dataPrintPrescription.packages) {
                title = "PK"; // package
            }
            if(dataPrintPrescription.insuranceTypeId > 1){
                if(title == "CK"){
                    title = "CK"
                }else{
                    title = "PBHYT"
                }
            }
            var codeNumber = "";
            for (var i = 0; i < totalRange ; i++) {
                codeNumber += '0';
            }
            var barcode = title + codeNumber + dataPrintPrescription.id;
            var patientBarcode = FormatterUtils.convertTextToBarcode(barcode);
            var priceOfInvoice = { text: 'Tiền công khám : '+ FormatterUtils.formatCurrency(configTable.configValue) + ' VNĐ' +  '\n\n', fontSize: 11 };
            var priceOfInvoiceBHYT = {}
            if(dataPrintPrescription.insuranceTypeId > 1){
                priceOfInvoiceBHYT = { text: 'Bảo Hiểm Y Tế Chi Trả : '+ FormatterUtils.formatCurrency(dongiaKham) + ' VNĐ' +  '\n\n', fontSize: 11 };
            } 
            var infoInvoice = null;
            if (dataPrintPrescription.packages) {
                var priceOfInvoice = { text: 'Giá gói khám : '+ FormatterUtils.formatCurrency(dataPrintPrescription.packages.pricePackage) + ' VNĐ' +  '\n\n', fontSize: 11 };
                var infoInvoice = { text: 'Tên gói khám : '+ dataPrintPrescription.packages.name +  '\n\n', fontSize: 11 };
            }

            var dataExport = {


                content: [

                    {
                        columns: [
                            imageLogo ? {
                                image: imageLogo,
                                fit: [100, 100],
                                alignment: 'left',
                                margin: [20, 0, 0, 0],
                            } : null,
                            { text: ' Chuyên khoa : ' + '\n' + department, fontSize: 11, alignment: 'left' },
                            [{ text: '\n', fontSize: 11, alignment: 'right' }, { text: 'Số thứ tự : ', fontSize: 11, alignment: 'right' }],
                            { text: theNumber+1, fontSize: 25, alignment: 'left' }
                        ]
                    },

                    {
                        columns: [
                            { text: '_________________________________________________________________________________________________', fontSize: 11, alignment: 'center' },
                        ]
                    },
                    {
                        columns: [
                            { text: '', fontSize: 14, bold: true, width: '30%', alignment: 'left' },
                            { text: '\n\n\n PHIẾU KHÁM BỆNH', fontSize: 11, bold: true, alignment: 'center' },
                            { image: patientBarcode, fit: [80, 80], margin: [0, 10, 20, 0], alignment: 'right' },
                        ]

                    },
                    {
                        columns: [
                            { text: '', fontSize: 14, bold: true, width: '30%', alignment: 'left' },
                            { text: '\n\n', fontSize: 11, margin: [20, 0, 0, 0], bold: true, width: '30%', alignment: 'center' },
                            { text: barcode, fontSize: 11, bold: true, width: '30%', alignment: 'right' },
                        ]

                    },
                    
                    { text: dataPrintPrescription.insuranceTypeId > 1 ?  [
                        { text: 'Họ và tên : ' + patientName , fontSize: 11 },
                        { text: ', Mã Thẻ BHYT : ' + insuranceCode + '\n\n', fontSize: 11 },
                    ] : [{ text: 'Họ và tên : ' + patientName + '\n\n', fontSize: 11 },] },
                    {
                        columns: [
                            [{ text: 'Ngày sinh : ' + birthday + '\n\n', fontSize: 11 }],

                        ]
                    },
                    // { text: 'Quốc tịch : ' + (dataPrintPrescription.patient && dataPrintPrescription.patient.nation ? dataPrintPrescription.patient.nation : '') + '\n\n', fontSize: 11 },
                    {
                        columns: [

                            { text: 'Địa chỉ : ' + (address ? address : '') + '\n\n', fontSize: 11 },

                        ]
                    },
                    {
                        columns: [

                            { text: 'Yêu cầu khám : ' + dataPrintPrescription ? dataPrintPrescription.note : department + " + " + departmentClass + '\n\n', fontSize: 11 },

                        ]
                    },
                    {
                        columns: [

                            { text: 'Khám tại : ' + departmentClass + '\n\n', fontSize: 11 },

                        ]
                    },
                    {
                        columns: [

                            { text: 'Thời gian đặt số  : ' + callTime + '\n\n', fontSize: 11 },

                        ]
                    },
                    infoInvoice,

                    priceOfInvoice,
                    priceOfInvoiceBHYT,

                    { text: 'Ghi chú  ' + '\n\n', fontSize: 9 },

                    { text: ' - Quý khách vui lòng kiểm tra lại thông tin bệnh nhân trước khi vào khám . ' + '\n\n', fontSize: 9 },

                    {
                        columns: [
                            {

                                text: '\n Ngày ' + moment(today).format("LL") + '\n\n NGƯỜI LẬP PHIẾU \n\n\n' + '', alignment: 'right', fontSize: 11,

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


                // TODO build json
            }

            return dataExport;
        }
    }, 

    handleSavePDFBarcode(dataExportBarCode) {
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        pdfMake.createPdf(dataExportBarCode).print();
    },

    handlePrinter(queueNumberId, imageLogo, configTable, type, insuranceCode) {
    
        return agent.asyncRequests.get("/prescription/listFindByQueueNumberId?queueNumberId=" + queueNumberId).then(function (res) {
            var result = res.body.resultData;
            if (result && result.id) {
                QueuePrintService.handleSavePDFBarcode(QueuePrintService.renderPDFBarCode(result, imageLogo, configTable, type, insuranceCode ));

            } else {
                toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });

    }
    
}