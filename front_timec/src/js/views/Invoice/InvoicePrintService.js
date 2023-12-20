import pdfFonts from 'pdfmake/build/vfs_fonts';
import pdfMake from 'pdfmake/build/pdfmake';
import moment from 'moment';
import { FormatterUtils } from '../../utils/javascriptUtils';

export const InvoicePrintService = {

    handleSavePDFRetail: (dataExport) => {
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        pdfMake.createPdf(dataExport).print();
    },

    getDataExportRetail: (dataPrescriptionItemList, currentUser, invoiceDto) => {
        var patientString = null;
        if (dataPrescriptionItemList.length > 0) {
            var patient = dataPrescriptionItemList[0].prescription.patient;
            patientString = patient? (patient.code) + ' - ' + (patient.fullName) : '';
        }

        var totalInvoicePrice = 0;
        var listDrugGroups = []; // {drugGroupObject, listGroupItems, totalDrugGroupPrice}
        dataPrescriptionItemList.map(item => {
            if (item.invoiceItemType == "DRUG_GROUP") {
                listDrugGroups.push({ drugGroupObject: item, listGroupItems: [], totalDrugGroupPrice: 0 });
            }
        });
        let addToDrugGroup = (listDrugGroups, child) => {
            listDrugGroups.map(group => {
                if (group.drugGroupObject.id == child.supperId) {
                    group.listGroupItems.push(child);
                }
            });
        }
        var itemRows = dataPrescriptionItemList.map(item => {
            if (item.invoiceItemType == "IN_GROUP_ITEM") {
                addToDrugGroup(listDrugGroups, item);
                return null;
            } else if (item.invoiceItemType == "DRUG_GROUP") {
                return null;
            } else {
                //drug
                totalInvoicePrice += InvoicePrintService.calculateTotalSaleAmount(item);
                return [
                    [item.drug.name + " " + item.drug.hamLuongBHYT],
                    [item.totalAmount],[item.saleUom],
                    [{ text: FormatterUtils.formatCurrency(InvoicePrintService.calculateTotalSaleAmount(item)), alignment: 'right' }],
                ]
            }
        });
        listDrugGroups.map(group => {
            group.totalDrugGroupPrice = group.drugGroupObject.drug.salePrice * group.drugGroupObject.totalAmount;
            group.listGroupItems.map(item => {
                group.totalDrugGroupPrice +=  InvoicePrintService.calculateTotalSaleAmount(item);
            })

            totalInvoicePrice += group.totalDrugGroupPrice;

            itemRows.push(
                [
                    [group.drugGroupObject.drug.name + " " + group.drugGroupObject.drug.hamLuongBHYT],
                    [group.drugGroupObject.totalAmount], group.drugGroupObject.drug.uom,
                    [{ text: FormatterUtils.formatCurrency(group.totalDrugGroupPrice), alignment: 'right' }],
                ]
            );
        })

        itemRows = itemRows.filter(function (e) {
            return e != null;
        });
        var today = moment(new Date, "DD/MM/YYYY");
        var tableItems = {
            style: 'tableExample',
            fontSize: 10,
            table: {
                widths: [100, 30, 30, 40],
                body: itemRows
            },
            layout: 'noBorders'
        },
            dataExport =
            {

                pageSize: {
                    width: 302,
                    height: 'auto'
                },
                content: [


                    {

                        columns:
                            [
                                {
                                    width: 250,
                                    fontSize: 20,
                                    alignment: 'center',
                                    text: 'TIMEC \n'
                                }
                            ]
                    },
                    {
                        fontSize: 10,
                        alignment: 'center',
                        text: 'Chăm Sóc Với Tất Cả Yêu Thương \n\n'
                    },

                    {
                        fontSize: 10,
                        text: 'Kính Chào Quý Khách \n\n'
                    },
                    patientString ? {
                        fontSize: 10,
                        text: 'Mã: ' + patientString + ' \n\n'
                    } : null,
                    {
                        fontSize: 10,
                        text: '* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  \n\n'

                    },
                    {
                        fontSize: 10,
                        text: ['Thu ngân: ' + (currentUser ? currentUser.fullName : "") + '\n']

                    },

                    {
                        columns:
                            [
                                {
                                    fontSize: 10,
                                    width: 250,
                                    alignment: 'left',
                                    text: ['Địa chỉ: 4449 Nguyễn Cửu Phú, P. Tân Tạo A,\nQ. Bình Tân,TP.HCM \n']
                                }
                            ]
                    },
                    {
                        style: 'tableExample',
                        fontSize: 10,
                        table: {
                            widths: [150, 50],
                            fontSize: 10,
                            body: [
                                [['Ngày: ' + moment().format("DD/MM/YYYY")]],
                                [{ text: 'Giờ: ' + today.hour() + ':' + (today.minutes() > 10 ? today.minutes() : "0" + today.minutes()) }]
                            ]
                        },
                        layout: 'noBorders'
                    },
                    {
                        fontSize: 10,
                        text: ['Hoá đơn: ' + (invoiceDto ? invoiceDto.barCode : "") + '\n\n']

                    },
                    {
                        fontSize: 10,
                        text: '* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *  \n\n'

                    },
                    {
                        style: 'tableExample',
                        table: {
                            widths: [100, 30, 30, 40],
                            fontSize: 10,
                            body: [
                                ['Tên', 'SL', 'ĐVT', { text: 'TT', alignment: 'right' }],

                            ]
                        },
                        layout: 'noBorders'
                    },
                    // table row 
                    tableItems,
                    {
                        fontSize: 14,
                        text: '\n- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - \n'

                    },
                    {
                        style: 'tableExample',
                        table: {
                            widths: [150, 50],
                            fontSize: 10,
                            body: [
                                ['Tổng', { text: FormatterUtils.formatCurrency(totalInvoicePrice) + '', alignment: 'right' }],

                            ]
                        },
                        layout: 'noBorders'
                    },
                    {
                        fontSize: 14,
                        text: '- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - \n'

                    },
                    {
                        style: 'tableExample',
                        fontSize: 10,
                        table: {
                            widths: [200, 50],
                            body: [
                                ['Quý khách chỉ thanh toán theo giá hóa đơn', { text: '' + '\n', alignment: 'right' }],
                                ['Quý khách vui lòng không đổi trả hàng khi', { text: '' + '\n', alignment: 'right' }],
                                ['ra khỏi cửa hàng', { text: '' + '\n', alignment: 'right' }],
                                ['Có giá trị xuất hóa đơn VAT trong 24 tiếng', { text: '' + '\n\n', alignment: 'right' }]
                            ]
                        },
                        layout: 'noBorders'
                    },
                    {
                        columns:
                            [
                                {
                                    fontSize: 10,
                                    width: 200,
                                    alignment: 'center',
                                    text: '\tCảm ơn quý khách đã sử dụng dịch vụ TIMEC'
                                }
                            ]
                    },

                ]
            }
        return dataExport;
    },

    calculateTotalSaleAmount: (prescriptionItem) => {
        var totalSaleAmount = 0;
        if (prescriptionItem.invoiceItemType == 'DRUG_GROUP') {
            // totalSaleAmount = prescriptionItem.totalAmount * DRUG_GROUP_SALE_PRICE;
            totalSaleAmount = prescriptionItem.totalAmount * prescriptionItem.drug.salePrice;
        }
        else if (prescriptionItem.saleUom == prescriptionItem.drug.packageUom) {
            totalSaleAmount = prescriptionItem.totalAmount * prescriptionItem.drug.packageSalePrice;
        }
        else { // basic uom drug
            totalSaleAmount = prescriptionItem.totalAmount * prescriptionItem.drug.salePrice;
        }
        return totalSaleAmount;
    }
}