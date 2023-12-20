import pdfFonts from 'pdfmake/build/vfs_fonts';
import pdfMake from 'pdfmake/build/pdfmake';
import moment from 'moment';
import { FormatterUtils } from '../utils/javascriptUtils';

export const DataPrintService = {
    renderPDFBarCode(batchBarcode, fullName) {
        if (fullName) {
            fullName= fullName.toUpperCase();
        }
        if (batchBarcode) {
            var batchCode = FormatterUtils.convertTextToBarcode(batchBarcode);
            var dataExport = {
                pageSize: {
                    width: 415,
                    height: 'auto'
                },
                content: [
                    {
                        margin: [-15, -35, 0, 0],
                        columns: [
                            { image: batchCode, fit: [115, 83] },
                            { image: batchCode, fit: [115, 83] },
                            { image: batchCode, fit: [115, 83], }
                        ]
                    }, {
                        margin: [-35, 0],
                        columns: [
                            { text: batchBarcode, alignment: 'center' },
                            { text: batchBarcode, alignment: 'center' },
                            { text: batchBarcode, alignment: 'center' }
                        ],
                        fontSize: 7,
                    },
                    fullName ? {
                        margin: [-35, 0],
                        columns: [
                            { text: fullName, alignment: 'center' },
                            { text: fullName, alignment: 'center' },
                            { text: fullName, alignment: 'center' }
                        ],
                        fontSize: 7,
                    } : null,
                ],
                styles: {
                    header: {
                        // margin: [-25, 0],

                        fontSize: 18,
                        bold: true
                    }
                },
                defaultStyle: {
                    columnGap: 20
                }
            }
            return dataExport;
        }
    },

    handleGetListToPrintBarcode(batchBarcode, fullName) {
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        pdfMake.createPdf(DataPrintService.renderPDFBarCode(batchBarcode, fullName)).print();
    },
    
}