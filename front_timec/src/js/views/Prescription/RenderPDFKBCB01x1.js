import moment from 'moment';
import { FormatterUtils } from '../../utils/javascriptUtils';

const RenderPDFKBCB01x1 = {
    getDataExport: (prescription, props, state) => {

        // Show list items
        var totalALLPrice = 0;
        var listXetNghiepGroup = [];
        var listChuanDoanHinhAnhGroup = [];
        var listThamDoChucNangGroup = [];
        var listThuThuatGroup = [];
        var listDonThuocGroup = [];
        var listKhamBenhGroup = [];

        if (state.listAllInvoiceItem.length > 0) {
            state.listAllInvoiceItem.map((item, index) => {
                if (item.invoice.status == "CLOSED") {
                    if (item.diagnosisServiceId != 888) {
                        totalALLPrice += (item.bhyt + item.dongChiTra);
                    }

                    if (item.invoiceItemType == "DRUG_ITEM") {
                        listDonThuocGroup.push(item);
                    } else if (item.invoiceItemType == "KHAM_BENH_ITEM" || item.invoiceItemType == "CHUYEN_KHOA_KHAM_BENH") {
                        listKhamBenhGroup.push(item);
                    } else if (item.diagnosisService && item.diagnosisServiceId != 888) {
                        if (item.prescription.bhytPrescriptionId) {

                            if (item.diagnosisService.serviceType == "XET_NGHIEM") {
                                listXetNghiepGroup.push(item);
                            }
                            else if (item.diagnosisService.serviceType == "CHAN_DOAN_HINH_ANH") {
                                listChuanDoanHinhAnhGroup.push(item);
                            }
                            else if (item.diagnosisService.serviceType == "THAM_DO_CHUC_NANG") {
                                listThamDoChucNangGroup.push(item);
                            }
                            else if (item.diagnosisService.serviceType == "THU_THUAT") {
                                listThuThuatGroup.push(item);
                            }
                        }
                    }
                }
            })
        }

        var chanDoan = '';
        var maBenh = '';
        var benhKemTheo = ''
        var mabenhKemTheo = '';
        if (listKhamBenhGroup.length > 0) {
            listKhamBenhGroup.map(item => {
                if (item.prescription.analysis) {
                    chanDoan += (item.prescription.analysis + ', ');
                }
                if (item.prescription.icd) {
                    maBenh += (item.prescription.icd.code + ', ');
                }
                if (item.prescription.subIcd) {
                    benhKemTheo += (item.prescription.subIcd.name + ', ');
                    mabenhKemTheo += (item.prescription.subIcd.code + ', ');
                }
            })
        }else{
            if (prescription.analysis) {
                chanDoan += (prescription.analysis + ', ');
            }
            if (prescription.icd) {
                maBenh += (prescription.icd.code + ', ');
            }
            if (prescription.subIcd) {
                benhKemTheo += (prescription.subIcd.name + ', ');
                mabenhKemTheo += (prescription.subIcd.code + ', ');
            }
        }
        var currentNo = 0;
        const currentUser = props.currentUser;
        const { t } = props;
        var today = new Date();
        var currentNoBody = 1;

        // console.log(listXetNghiepGroup);
        // console.log(listThamDoChucNangGroup);
        // console.log(listThuThuatGroup);
        // console.log(listChuanDoanHinhAnhGroup);
        var tongSoNgayDiieuTri = 0;
        if (Math.round(Math.abs(prescription.finishTime - prescription.arriveTime) / (1000 * 60 * 60 * 24)) == 0) {
            tongSoNgayDiieuTri = 1;
        } else {
            tongSoNgayDiieuTri = Math.round(Math.abs(prescription.finishTime - prescription.arriveTime) / (1000 * 60 * 60 * 24));
        }
        var itemRows = [
            [
                { rowSpan: 2, text: 'STT', style: 'tableHeader', alignment: 'center' },
                { rowSpan: 2, text: 'Nội dung', style: 'tableHeader', alignment: 'center' },
                { rowSpan: 2, text: 'Đơn vị tính', style: 'tableHeader', alignment: 'center' },
                { rowSpan: 2, text: 'Số lượng', style: 'tableHeader', alignment: 'center' },
                { rowSpan: 2, text: 'Đơn giá (đồng)', style: 'tableHeader', alignment: 'center' },
                { rowSpan: 2, text: 'Thành Tiền (đồng)', style: 'tableHeader', alignment: 'center' },
                { colSpan: 3, text: 'Nguồn thanh toán (đồng)', style: 'tableHeader', alignment: 'center' },
                { text: '', style: 'tableHeader', alignment: 'center' },
                { text: '', style: 'tableHeader', alignment: 'center' },
            ],
            [
                { text: '', style: 'tableHeader', alignment: 'center' },
                { text: '', style: 'tableHeader', alignment: 'center' },
                { text: '', style: 'tableHeader', alignment: 'center' },
                { text: '', style: 'tableHeader', alignment: 'center' },
                { text: '', style: 'tableHeader', alignment: 'center' },
                { text: '', style: 'tableHeader', alignment: 'center' },
                { text: 'Quỹ BHYT', style: 'tableHeader', alignment: 'center' },
                { text: 'Khác', style: 'tableHeader', alignment: 'center' },
                { text: 'Người bệnh', style: 'tableHeader', alignment: 'center' },
            ],
        ];


        // Kham Benh
        var tongThanhTien_KhamBenh = 0;
        var tongQuyBHYT_KhamBenh = 0;
        var tongTienCungChiTra_KhamBenh = 0;
        if (listKhamBenhGroup.length > 0) {
            listKhamBenhGroup.map(item => {
                let quyBHYT_KB_Item = item.bhyt;
                let cungChiTra_KB_Item = item.dongChiTra;
                tongThanhTien_KhamBenh += quyBHYT_KB_Item + cungChiTra_KB_Item;
                tongQuyBHYT_KhamBenh += quyBHYT_KB_Item;
                tongTienCungChiTra_KhamBenh += cungChiTra_KB_Item
            })

            itemRows.push([
                { text: currentNoBody + '. Khám Bệnh: ', colSpan: 4, style: 'tableHeader', alignment: 'left' },
                {},
                {},
                {},
                {},
                { text: FormatterUtils.formatCurrencyFloat(tongThanhTien_KhamBenh), style: 'tableHeader', alignment: 'left' },
                { text: FormatterUtils.formatCurrencyFloat(tongQuyBHYT_KhamBenh), style: 'tableHeader', alignment: 'left' },
                { text: 0, style: 'tableHeader', alignment: 'left' },
                { text: FormatterUtils.formatCurrencyFloat(tongTienCungChiTra_KhamBenh), style: 'tableHeader', alignment: 'left' },
            ])

            listKhamBenhGroup.map((item, index) => {

                return (itemRows.push(
                    [
                        { text: currentNoBody + "." + (index + 1), style: 'tableHeader', alignment: 'left' },
                        { text: (item.prescription.department ? item.prescription.department.tenBhyt : ""), style: 'tableHeader', alignment: 'left' },
                        { text: "Lần", style: 'tableHeader', alignment: 'left' },
                        { text: item.numberOfItems, style: 'tableHeader', alignment: 'left' },
                        { text: FormatterUtils.formatCurrencyFloat((item.bhyt + item.dongChiTra) / item.numberOfItems), style: 'tableHeader', alignment: 'left' },
                        { text: FormatterUtils.formatCurrencyFloat((item.bhyt + item.dongChiTra)), style: 'tableHeader', alignment: 'left' },
                        { text: FormatterUtils.formatCurrencyFloat(item.bhyt), style: 'tableHeader', alignment: 'left' },
                        { text: 0, style: 'tableHeader', alignment: 'left' },
                        { text: FormatterUtils.formatCurrencyFloat(item.dongChiTra), style: 'tableHeader', alignment: 'left' },
                    ],
                ))

            })
            currentNoBody++;
        }
        // xet nghiem
        var tongThanhTien_xetNgiem = 0;
        var tongQuyBHYT_xetNghiem = 0;
        var tongTienCungChiTra_xetNghiem = 0;
        if (listXetNghiepGroup.length > 0) {
            listXetNghiepGroup.map(item => {
                let quyBHYT_XN_Item = item.bhyt;
                let cungChiTra_XN_Item = item.dongChiTra

                tongThanhTien_xetNgiem += quyBHYT_XN_Item + cungChiTra_XN_Item;
                tongQuyBHYT_xetNghiem += quyBHYT_XN_Item;
                tongTienCungChiTra_xetNghiem += cungChiTra_XN_Item
            })

            itemRows.push([
                { text: currentNoBody + '. Xét nghiệm: ', colSpan: 4, style: 'tableHeader', alignment: 'left' },
                {},
                {},
                {},
                {},
                { text: FormatterUtils.formatCurrencyFloat(tongThanhTien_xetNgiem), style: 'tableHeader', alignment: 'left' },
                { text: FormatterUtils.formatCurrencyFloat(tongQuyBHYT_xetNghiem), style: 'tableHeader', alignment: 'left' },
                { text: 0, style: 'tableHeader', alignment: 'left' },
                { text: FormatterUtils.formatCurrencyFloat(tongTienCungChiTra_xetNghiem), style: 'tableHeader', alignment: 'left' },
            ])

            listXetNghiepGroup.map((item, index) => {
                return (itemRows.push(
                    [
                        { text: currentNoBody + "." + (index + 1), style: 'tableHeader', alignment: 'left' },
                        { text: item.diagnosisService.name, style: 'tableHeader', alignment: 'left' },
                        { text: "Lần", style: 'tableHeader', alignment: 'left' },
                        { text: item.numberOfItems, style: 'tableHeader', alignment: 'left' },
                        { text: FormatterUtils.formatCurrencyFloat((item.bhyt + item.dongChiTra) / item.numberOfItems), style: 'tableHeader', alignment: 'left' },
                        { text: FormatterUtils.formatCurrencyFloat((item.bhyt + item.dongChiTra)), style: 'tableHeader', alignment: 'left' },
                        { text: FormatterUtils.formatCurrencyFloat(item.bhyt), style: 'tableHeader', alignment: 'left' },
                        { text: 0, style: 'tableHeader', alignment: 'left' },
                        { text: FormatterUtils.formatCurrencyFloat(item.dongChiTra), style: 'tableHeader', alignment: 'left' },
                    ],
                ))
            })
            currentNoBody++;
        }

        // chan doan hinh anh
        var tongThanhTien_chanDoan = 0;
        var tongQuyBHYT_chanDoan = 0;
        var tongTienCungChiTra_chanDoan = 0;
        if (listChuanDoanHinhAnhGroup.length > 0) {
            listChuanDoanHinhAnhGroup.map(item => {
                let quyBHYT_CD_Item = item.bhyt;
                let cungChiTra_CD_Item = item.dongChiTra
                tongThanhTien_chanDoan += quyBHYT_CD_Item + cungChiTra_CD_Item
                tongQuyBHYT_chanDoan += quyBHYT_CD_Item;
                tongTienCungChiTra_chanDoan += cungChiTra_CD_Item

            })

            itemRows.push([
                { text: currentNoBody + '. Chẩn đoán hình ảnh: ', colSpan: 4, style: 'tableHeader', alignment: 'left' },
                {},
                {},
                {},
                {},
                { text: FormatterUtils.formatCurrencyFloat(tongThanhTien_chanDoan), style: 'tableHeader', alignment: 'left' },
                { text: FormatterUtils.formatCurrencyFloat(tongQuyBHYT_chanDoan), style: 'tableHeader', alignment: 'left' },
                { text: 0, style: 'tableHeader', alignment: 'left' },
                { text: FormatterUtils.formatCurrencyFloat(tongTienCungChiTra_chanDoan), style: 'tableHeader', alignment: 'left' },
            ])

            listChuanDoanHinhAnhGroup.map((item, index) => {
                return (itemRows.push(
                    [
                        { text: currentNoBody + "." + (index + 1), style: 'tableHeader', alignment: 'left' },
                        { text: item.diagnosisService.name, style: 'tableHeader', alignment: 'left' },
                        { text: "Lần", style: 'tableHeader', alignment: 'left' },
                        { text: item.numberOfItems, style: 'tableHeader', alignment: 'left' },
                        { text: FormatterUtils.formatCurrencyFloat((item.bhyt + item.dongChiTra) / item.numberOfItems), style: 'tableHeader', alignment: 'left' },
                        { text: FormatterUtils.formatCurrencyFloat((item.bhyt + item.dongChiTra)), style: 'tableHeader', alignment: 'left' },
                        { text: FormatterUtils.formatCurrencyFloat(item.bhyt), style: 'tableHeader', alignment: 'left' },
                        { text: 0, style: 'tableHeader', alignment: 'left' },
                        { text: FormatterUtils.formatCurrencyFloat(item.dongChiTra), style: 'tableHeader', alignment: 'left' },
                    ],
                ))
            })
            currentNoBody++;
        }

        // Tham do chuc nang
        var tongThanhTien_thamDo = 0;
        var tongQuyBHYT_thamDo = 0;
        var tongTienCungChiTra_thamDo = 0;
        if (listThamDoChucNangGroup.length > 0) {

            listThamDoChucNangGroup.map(item => {
                let quyBHYT_TD_Item = item.bhyt
                let cungChiTra_TD_Item = item.dongChiTra
                tongThanhTien_thamDo += quyBHYT_TD_Item + cungChiTra_TD_Item
                tongQuyBHYT_thamDo += quyBHYT_TD_Item;
                tongTienCungChiTra_thamDo += cungChiTra_TD_Item
            })

            itemRows.push([
                { text: currentNoBody + '. Thăm dò chức năng: ', colSpan: 4, style: 'tableHeader', alignment: 'left' },
                {},
                {},
                {},
                {},
                { text: FormatterUtils.formatCurrencyFloat(tongThanhTien_thamDo), style: 'tableHeader', alignment: 'left' },
                { text: FormatterUtils.formatCurrencyFloat(tongQuyBHYT_thamDo), style: 'tableHeader', alignment: 'left' },
                { text: 0, style: 'tableHeader', alignment: 'left' },
                { text: FormatterUtils.formatCurrencyFloat(tongTienCungChiTra_thamDo), style: 'tableHeader', alignment: 'left' },
            ])

            listThamDoChucNangGroup.map((item, index) => {
                return (itemRows.push(
                    [
                        { text: currentNoBody + "." + (index + 1), style: 'tableHeader', alignment: 'left' },
                        { text: item.diagnosisService.name, style: 'tableHeader', alignment: 'left' },
                        { text: "Lần", style: 'tableHeader', alignment: 'left' },
                        { text: item.numberOfItems, style: 'tableHeader', alignment: 'left' },
                        { text: FormatterUtils.formatCurrencyFloat((item.bhyt + item.dongChiTra) / item.numberOfItems), style: 'tableHeader', alignment: 'left' },
                        { text: FormatterUtils.formatCurrencyFloat((item.bhyt + item.dongChiTra)), style: 'tableHeader', alignment: 'left' },
                        { text: FormatterUtils.formatCurrencyFloat(item.bhyt), style: 'tableHeader', alignment: 'left' },
                        { text: 0, style: 'tableHeader', alignment: 'left' },
                        { text: FormatterUtils.formatCurrencyFloat(item.dongChiTra), style: 'tableHeader', alignment: 'left' },
                    ],
                ))
            })
            currentNoBody++;
        }

        // Thu Thuat
        var tongThanhTien_thuThuat = 0;
        var tongQuyBHYT_thuThuat = 0;
        var tongTienCungChiTra_thuThuat = 0;
        if (listThuThuatGroup.length > 0) {

            listThuThuatGroup.map(item => {
                let quyBHYT_TT_Item = item.bhyt
                let cungChiTra_TT_Item = item.dongChiTra

                tongThanhTien_thuThuat += cungChiTra_TT_Item + quyBHYT_TT_Item
                tongQuyBHYT_thuThuat += quyBHYT_TT_Item;
                tongTienCungChiTra_thuThuat += cungChiTra_TT_Item

            })

            itemRows.push([
                { text: currentNoBody + '. Thủ thuật, phẫu thuật: ', colSpan: 4, style: 'tableHeader', alignment: 'left' },
                {},
                {},
                {},
                {},
                { text: FormatterUtils.formatCurrencyFloat(tongThanhTien_thuThuat), style: 'tableHeader', alignment: 'left' },
                { text: FormatterUtils.formatCurrencyFloat(tongQuyBHYT_thuThuat), style: 'tableHeader', alignment: 'left' },
                { text: 0, style: 'tableHeader', alignment: 'left' },
                { text: FormatterUtils.formatCurrencyFloat(tongTienCungChiTra_thuThuat), style: 'tableHeader', alignment: 'left' },
            ])

            listThuThuatGroup.map((item, index) => {
                return (itemRows.push(
                    [
                        { text: currentNoBody + "." + (index + 1), style: 'tableHeader', alignment: 'left' },
                        { text: item.diagnosisService.name, style: 'tableHeader', alignment: 'left' },
                        { text: "Lần", style: 'tableHeader', alignment: 'left' },
                        { text: item.numberOfItems, style: 'tableHeader', alignment: 'left' },
                        { text: FormatterUtils.formatCurrencyFloat((item.bhyt + item.dongChiTra) / item.numberOfItems), style: 'tableHeader', alignment: 'left' },
                        { text: FormatterUtils.formatCurrencyFloat((item.bhyt + item.dongChiTra)), style: 'tableHeader', alignment: 'left' },
                        { text: FormatterUtils.formatCurrencyFloat(item.bhyt), style: 'tableHeader', alignment: 'left' },
                        { text: 0, style: 'tableHeader', alignment: 'left' },
                        { text: FormatterUtils.formatCurrencyFloat(item.dongChiTra), style: 'tableHeader', alignment: 'left' },
                    ],
                ))
            })
            currentNoBody++;
        }

        // Thuoc
        var tongThanhTien_donThuoc = 0;
        var tongQuyBHYT_donThuoc = 0;
        var tongTienCungChiTra_donThuoc = 0;
        if (listDonThuocGroup.length > 0) {

            listDonThuocGroup.map(item => {
                let quyBHYT_DT_Item = item.bhyt;
                let cungChiTra_DT_Item = item.dongChiTra;
                tongThanhTien_donThuoc += quyBHYT_DT_Item + cungChiTra_DT_Item;
                tongQuyBHYT_donThuoc += quyBHYT_DT_Item;
                tongTienCungChiTra_donThuoc += cungChiTra_DT_Item;

            })

            itemRows.push([
                { text: currentNoBody + '. Thuốc: ', colSpan: 4, style: 'tableHeader', alignment: 'left' },
                {},
                {},
                {},
                {},
                { text: FormatterUtils.formatCurrencyFloat(tongThanhTien_donThuoc), style: 'tableHeader', alignment: 'left' },
                { text: FormatterUtils.formatCurrencyFloat(tongQuyBHYT_donThuoc), style: 'tableHeader', alignment: 'left' },
                { text: 0, style: 'tableHeader', alignment: 'left' },
                { text: FormatterUtils.formatCurrencyFloat(tongTienCungChiTra_donThuoc), style: 'tableHeader', alignment: 'left' },
            ])

            listDonThuocGroup.map((item, index) => {
                return (itemRows.push(
                    [
                        { text: currentNoBody + "." + (index + 1), style: 'tableHeader', alignment: 'left' },
                        { text: item.drug.name + " " + item.drug.hamLuongBHYT, style: 'tableHeader', alignment: 'left' },
                        { text: item.drug.uom, style: 'tableHeader', alignment: 'left' },
                        { text: item.numberOfItems, style: 'tableHeader', alignment: 'left' },
                        { text: FormatterUtils.formatCurrencyFloat((item.bhyt + item.dongChiTra) / item.numberOfItems), style: 'tableHeader', alignment: 'left' },
                        { text: FormatterUtils.formatCurrencyFloat((item.bhyt + item.dongChiTra)), style: 'tableHeader', alignment: 'left' },
                        { text: FormatterUtils.formatCurrencyFloat(item.bhyt), style: 'tableHeader', alignment: 'left' },
                        { text: 0, style: 'tableHeader', alignment: 'left' },
                        { text: FormatterUtils.formatCurrencyFloat(item.dongChiTra), style: 'tableHeader', alignment: 'left' },
                    ],
                ))
            })
            currentNoBody++;
        }

        itemRows.push([
            { text: 'Cộng: ', colSpan: 4, style: 'tableHeader', alignment: 'left' },
            {},
            {},
            {},
            {},
            { text: FormatterUtils.formatCurrencyFloat(tongThanhTien_KhamBenh + tongThanhTien_donThuoc + tongThanhTien_chanDoan + tongThanhTien_xetNgiem + tongThanhTien_thamDo + tongThanhTien_thuThuat), style: 'tableHeader', alignment: 'left' },
            { text: FormatterUtils.formatCurrencyFloat(tongQuyBHYT_KhamBenh + tongQuyBHYT_donThuoc + tongQuyBHYT_xetNghiem + tongQuyBHYT_chanDoan + tongQuyBHYT_thamDo + tongQuyBHYT_thuThuat), style: 'tableHeader', alignment: 'left' },
            { text: 0, style: 'tableHeader', alignment: 'left' },
            { text: FormatterUtils.formatCurrencyFloat(tongTienCungChiTra_KhamBenh + tongTienCungChiTra_xetNghiem + tongTienCungChiTra_chanDoan + tongTienCungChiTra_thamDo + tongTienCungChiTra_thuThuat + tongTienCungChiTra_donThuoc), style: 'tableHeader', alignment: 'left' },
        ])

        var tableItems = {
            style: 'tableExample',
            headerRows: 1,
            table: {
                widths: [30, '*', 30, 30, '*', '*', 50, 50, 50],
                body: itemRows
            },
            layout: {
                fillColor: function (rowcurrentNoBody, node, columncurrentNoBody) {
                    return (rowcurrentNoBody < 2) ? '#FFD700' : null;
                }
            }
        }



        var saleObject = {
            content: [
                {
                    style: 'tableExample',
                    table: {
                        body: [
                            [
                                {
                                    columns: [
                                        state.companyLogo ? {
                                            image: state.companyLogo,
                                            fit: [500, 250],
                                            alignment: 'center',
                                            margin: [20, 0, 0, 0],
                                        } : null,
                                    ]
                                },
                            ]
                        ]
                    },
                    layout: 'noBorders'
                },

                // { text: '\n MẪU BẢNG KÊ CHI PHÍ KHÁM BỆNH, CHỮA BỆNH ', bold: true, fontSize: 11, alignment: 'center', italics: 'true' },
                // { text: '(Ban hành kèm theo Quyết định số 6556/QĐ-BYT ngày 30 tháng 10 năm 2018 của Bộ trưởng Bộ Y tế) ', fontSize: 11, alignment: 'center', italics: 'true' },
                // { text: '\n', fontSize: 9, alignment: 'center', italics: 'true' },
                {
                    columns: [
                        [
                            {
                                width: '*',
                                text: [
                                    { text: 'Sở Y Tế Hồ Chí Minh', bold: true, fontSize: 9, alignment: 'left' },
                                    { text: '\n \t\t     Phòng Khám Đa Khoa Quốc Tế TIMEC', bold: true, fontSize: 9, alignment: 'left' },
                                    // { text: '\n Khoa: ', bold: true, fontSize: 9, alignment: 'left' }, { text: prescription.department.name, fontSize: 9, alignment: 'left' },
                                    // { text: '\n Mã Khoa: ', bold: true, fontSize: 9, alignment: 'left' }, { text: prescription.department.departmentCode, fontSize: 9, alignment: 'left' },
                                ]
                            }
                        ],
                        [],
                        [{
                            width: 'auto',
                            text: [
                                { text: 'Mẫu số: 01/KBCB', bold: true, fontSize: 9, alignment: 'reight' },
                                { text: '\n Mã số người bệnh: ', bold: true, fontSize: 9, alignment: 'reight' }, { text: prescription.patient.code, fontSize: 9, alignment: 'reight' },
                                { text: '\n Số khám bệnh: ', bold: true, fontSize: 9, alignment: 'reight' }, { text: (prescription ? prescription.id : ''), fontSize: 9, alignment: 'reight' },
                            ]
                        }
                        ]
                    ]
                },
                { text: '\n BẢNG KÊ CHI PHÍ KHÁM BỆNH, CHỮA BỆNH NGOẠI TRÚ ', fontSize: 9, bold: true, alignment: 'center' },
                { text: '\n I. Phần Hành chính: ', fontSize: 9, bold: true, alignment: 'left' },
                // (1) Họ tên người bệnh: 
                {
                    text: [
                        { text: '\n Họ tên người bệnh:  ', fontSize: 9, alignment: 'left' },
                        { text: prescription.patient.fullName, fontSize: 9, alignment: 'left' },
                        { text: '; \t Ngày, tháng, năm sinh:   ', fontSize: 9, alignment: 'left' },
                        { text: moment(prescription.patient.birthday).format("DD/MM/YYYY"), fontSize: 9, alignment: 'left' },
                        { text: '; \t Giới tính:  ', fontSize: 9, alignment: 'left' },
                        { text: t(prescription.patient.gender), fontSize: 9, alignment: 'left' },
                    ]
                },

                //(2) Địa chỉ hiện tại
                {
                    text: [
                        { text: '\n Địa chỉ hiện tại: ', fontSize: 9, alignment: 'left' },
                        { text: prescription.patient.address, fontSize: 9, alignment: 'left' },
                        { text: ';\t Mã khu vực (K1/K2/K3): K1', fontSize: 9, alignment: 'left' },
                    ]
                },
                //(4)  Mã thẻ BHYT
                {
                    text: [
                        { text: '\n Mã thẻ BHYT: ', fontSize: 9, alignment: 'left' },
                        { text: state.listIncuranceCard[0].insuranceCode, fontSize: 9, alignment: 'left' },
                        { text: ',\t Từ Ngày :', fontSize: 9, alignment: 'left' },
                        { text: moment(state.listIncuranceCard[0].fromDate).format("DD/MM/YYYY"), fontSize: 9, alignment: 'left' },
                        { text: ',\t Đến Ngày :', fontSize: 9, alignment: 'left' },
                        { text: moment(state.listIncuranceCard[0].toDate).format("DD/MM/YYYY"), fontSize: 9, alignment: 'left' },
                        { text: ' \t Mức hưởng: ' + prescription.insuranceType.percentPaid, fontSize: 9, alignment: 'left' },
                    ]
                },
                // (5) Nơi ĐK KCB ban đầu: 
                {
                    text: [
                        { text: '\n Nơi ĐK KCB ban đầu:  ', fontSize: 9, alignment: 'left' },
                        { text: state.listIncuranceCard[0].addressDKBD ? state.listIncuranceCard[0].addressDKBD : '...........................................................................................', fontSize: 9, alignment: 'left' },
                        { text: ';\t Mã: ', fontSize: 9, alignment: 'left' },
                        { text: state.listIncuranceCard[0].maDKBD ? state.listIncuranceCard[0].maDKBD : '.....................', fontSize: 9, alignment: 'left' },
                    ]
                },
                // (7) Đến khám: 
                {
                    text: [
                        { text: '\n Đến khám:  ', fontSize: 9, alignment: 'left' },
                        { text: moment(prescription.arriveTime).format("HH"), fontSize: 9, alignment: 'left' },
                        { text: '\t Giờ  ', fontSize: 9, alignment: 'left' },

                        { text: moment(prescription.arriveTime).format("mm"), fontSize: 9, alignment: 'left' },
                        { text: '\t Phút  ', fontSize: 9, alignment: 'left' },
                        { text: ';\t Ngày :  ', fontSize: 9, alignment: 'left' },
                        { text: moment(prescription.arriveTime).format("DD/MM/YYYY"), fontSize: 9, alignment: 'left' },
                    ]
                },
                // (8) Điều trị ngoại trú/nội trú từ: ……….. giờ.............phút, ngày …../…..../……...
                // {
                //     text: [
                //         { text: '\n (8) Điều trị ngoại trú/nội trú từ: ……….. giờ.............phút, ngày …../…..../……...  ', fontSize: 9, alignment: 'left' },
                //     ]
                // },
                //(9) Kết thúc khám/điều trị:...................... giờ ........... phút, ngày …../..…../ ……..    Tổng số ngày điều trị: …….
                {
                    text: [
                        { text: '\n Kết thúc khám/điều trị:  ', fontSize: 9, alignment: 'left' },
                        { text: moment(prescription.finishTime).format("HH"), fontSize: 9, alignment: 'left' },
                        { text: '\t Giờ  ', fontSize: 9, alignment: 'left' },

                        { text: moment(prescription.finishTime).format("mm"), fontSize: 9, alignment: 'left' },
                        { text: '\t Phút  ', fontSize: 9, alignment: 'left' },
                        { text: ';\t Ngày :  ', fontSize: 9, alignment: 'left' },
                        { text: moment(prescription.finishTime).format("DD/MM/YYYY"), fontSize: 9, alignment: 'left' },
                        { text: ';\t Tổng số ngày điều trị: :  ', fontSize: 9, alignment: 'left' },

                        { text: prescription.dayPrescription, fontSize: 9, alignment: 'left' },

                    ]
                },

                //(11) Cấp cứu      (12) Đúng tuyến   Nơi chuyển đến từ: ……………….…… Nơi chuyển đi:…………………….;  (13) Thông tuyến       (14) Trái tuyến 
                {
                    text: [
                        { text: '\n Cấp cứu:  ', fontSize: 9, alignment: 'left' },
                        { text: '\t ...... ', fontSize: 9, alignment: 'left' },
                        { text: '\t Đúng tuyến: ...... ', fontSize: 9, alignment: 'left' },
                        { text: '\t Thông tuyến: ', fontSize: 9, alignment: 'left' },
                        { text: '\t x ', fontSize: 9, alignment: 'left' },
                        { text: '\t Trái tuyến : ...... ', fontSize: 9, alignment: 'left' },
                    ]
                },

                //(13) Thông tuyến
                // {text : [
                //     { text: '\n Nơi chuyển đến từ: ', fontSize: 9, alignment: 'left'},
                //     { text: '..........................................................  ', fontSize: 9, alignment: 'left'},
                //     { text: '\t Nơi chuyển đi: ', fontSize: 9, alignment: 'left'},
                //     { text: '..........................................................  ', fontSize: 9, alignment: 'left'},
                // ]},
                //(15) Chẩn đoán xác định
                {
                    text: [
                        { text: '\n Chẩn đoán xác định: ', fontSize: 9, alignment: 'left' },
                        // { text: chanDoan : '...........................................................................................  ', fontSize: 9, alignment: 'left' },
                        { text: chanDoan, fontSize: 9, alignment: 'left' },
                        { text: '\t Mã bệnh: ', fontSize: 9, alignment: 'left' },
                        // { text: prescription.icd ? prescription.icd.code : '.........................', fontSize: 9, alignment: 'left' },
                        { text: maBenh, fontSize: 9, alignment: 'left' },
                    ]
                },
                //(17) Bệnh kèm theo: 
                {
                    text: [
                        { text: '\n Bệnh kèm theo : ', fontSize: 9, alignment: 'left' },
                        // { text: prescription.subIcd ? prescription.subIcd.name : ".........................................", fontSize: 9, alignment: 'left' },
                        { text: benhKemTheo, fontSize: 9, alignment: 'left' },
                        { text: '\t; Mã bệnh kèm theo : ', fontSize: 9, alignment: 'left' },
                        // { text: prescription.subIcd ? prescription.subIcd.code : '.........................  ', fontSize: 9, alignment: 'left' },
                        { text: mabenhKemTheo, fontSize: 9, alignment: 'left' },
                    ]
                },
                //(19) Thời điểm đủ 05 năm liên tục từ ngày: ….……/..……./……..;                         
                // {text : [
                //     { text: '\n (19) Thời điểm đủ 05 năm liên tục từ ngày: ….……/..……./……..; ', fontSize: 9, alignment: 'left'},
                //     { text: '\t (20) Miễn cùng chi trả trong năm từ ngày:..…../……./…….... : ', fontSize: 9, alignment: 'left'},
                // ]},

                //II. Phần Chi phí khám bệnh, chữa bệnh: 
                { text: '\n II. Phần Chi phí khám bệnh, chữa bệnh:  ', fontSize: 9, bold: true, alignment: 'center' },
                { text: '(Mỗi mã thẻ BHYT thống kê phần chi khí khám bệnh, chữa bệnh phát sinh tương ứng theo mã thẻ đó).  ', fontSize: 9, alignment: 'center', italics: 'true' },

                {
                    text: [
                        { text: '\n Mã thẻ BHYT: ', fontSize: 9, alignment: 'left' },
                        { text: state.listIncuranceCard[0].insuranceCode, fontSize: 9, alignment: 'left' },
                        { text: ',\t Giá trị từ  : ' + moment(state.listIncuranceCard[0].fromDate).format("DD/MM/YYYY"), fontSize: 9, alignment: 'left' },
                        { text: ',\t đến : ' + moment(state.listIncuranceCard[0].toDate).format("DD/MM/YYYY"), fontSize: 9, alignment: 'left' },
                        { text: ' \t Mức hưởng: ' + prescription.insuranceType.percentPaid, fontSize: 9, alignment: 'left' },

                    ]
                },

                { text: '\n (Chi phí KBCB tính từ ngày: ' + moment(prescription.arriveTime).format("DD/MM/YYYY") + ' đến ngày: ' + moment(prescription.finishTime).format("DD/MM/YYYY") + ' )  ', fontSize: 9, alignment: 'center' },

                { text: '\n' },

                //  table
                tableItems,

                { text: '\n' },

                { text: '\n Tổng chi phí lần khám bệnh/cả đợt điều trị (làm tròn đến đơn vị đồng): ' + FormatterUtils.formatCurrencyFloat(tongThanhTien_donThuoc + tongThanhTien_KhamBenh + tongThanhTien_chanDoan + tongThanhTien_xetNgiem + tongThanhTien_thamDo + tongThanhTien_thuThuat) + ' đồng ', fontSize: 9, alignment: 'left' },
                { text: '\n (Viết bằng chữ: ' + FormatterUtils.number2words(tongThanhTien_donThuoc + tongThanhTien_KhamBenh + tongThanhTien_chanDoan + tongThanhTien_xetNgiem + tongThanhTien_thamDo + tongThanhTien_thuThuat) + ' đồng.)', fontSize: 9, alignment: 'left' },
                { text: '\n Trong đó, số tiền do: ', fontSize: 9, bold: true, alignment: 'left' },
                { text: '\n - Quỹ BHYT thanh toán: ' + FormatterUtils.formatCurrencyFloat(tongQuyBHYT_donThuoc + tongQuyBHYT_KhamBenh + tongQuyBHYT_xetNghiem + tongQuyBHYT_chanDoan + tongQuyBHYT_thamDo + tongQuyBHYT_thuThuat) + ' đồng. ', fontSize: 9, alignment: 'left' },
                { text: '\n - Người bệnh trả, trong đó: ', fontSize: 9, alignment: 'left' },
                { text: '\n  + Cùng trả trong phạm vi BHYT: ' + FormatterUtils.formatCurrencyFloat(tongTienCungChiTra_donThuoc + tongTienCungChiTra_KhamBenh + tongTienCungChiTra_xetNghiem + tongTienCungChiTra_chanDoan + tongTienCungChiTra_thamDo + tongTienCungChiTra_thuThuat) + ' đồng ', fontSize: 9, alignment: 'left' },
                { text: '\n  + Các khoản phải trả khác: 0 đồng.', fontSize: 9, alignment: 'left' },
                { text: '\n - Nguồn khác: 0 đồng.', fontSize: 9, alignment: 'left' },

                { text: '\n' },

                {
                    columns: [
                        [
                            {
                                width: '*',
                                text: [
                                    { text: 'NGƯỜI LẬP BẢNG KÊ', bold: true, fontSize: 9, alignment: 'center' },
                                    { text: '\n (ký, ghi rõ họ tên)', bold: false, italics: 'true', fontSize: 9, alignment: 'center' },
                                ]
                            }
                        ],
                        [],
                        [
                            {
                                width: '*',
                                text: [
                                    { text: ' Ngày.... tháng... năm ...', bold: false, italics: 'true', fontSize: 9, alignment: 'center' },
                                    { text: '\n KẾ TOÁN VIỆN PHÍ', bold: true, fontSize: 9, alignment: 'center' },
                                    { text: '\n (ký, ghi rõ họ tên)', bold: false, italics: 'true', fontSize: 9, alignment: 'center' },
                                ]
                            }
                        ],

                    ]
                },
                { text: '\n' },
                { text: '\n' },
                { text: '\n' },
                { text: '\n' },

                {
                    columns: [
                        [
                            {
                                width: '*',
                                text: [
                                    { text: ' XÁC NHẬN CỦA NGƯỜI BỆNH', bold: true, fontSize: 9, alignment: 'center' },
                                    { text: '\n (ký, ghi rõ họ tên)', bold: false, italics: 'true', fontSize: 9, alignment: 'center' },
                                    { text: '\n (Tôi đã nhận … phim … Xquang/CT/MRI)', bold: true, fontSize: 9, alignment: 'center' },
                                ]
                            }
                        ],
                        [],
                        [
                            {
                                width: '*',
                                text: [
                                    { text: ' Ngày.... tháng... năm ...', bold: false, italics: 'true', fontSize: 9, alignment: 'center' },
                                    { text: '\n GIÁM ĐỊNH BHYT', bold: true, fontSize: 9, alignment: 'center' },
                                    { text: '\n (ký, ghi rõ họ tên)', bold: false, italics: 'true', fontSize: 9, alignment: 'center' },
                                ]
                            }
                        ],

                    ]
                },

                // { text: '\n' },
                // { text: '\n' },
                // { text: '\n' },
                // { text: '\n' },
                // { text: '\n' },

                // { text: 'Ghi chú: ', bold: true, italics: 'true', fontSize: 9, alignment: 'left', textDecorationLine: 'underline solid ' },
                // { text: '\n - Trường hợp khám bệnh, chữa bệnh tại Trạm y tế tuyến xã và tương đương: Thay thế chữ ký, họ tên của Kế toán viện phí bằng chữ ký, họ tên của người phụ trách đơn vị và phần ký xác nhận của Giám định BHYT không bắt buộc.  ', bold: false, fontSize: 9, alignment: 'left' },
                // { text: '\n - Trường hợp KBCB ngoại trú, người bệnh đã được nhận phim chụp (Xquang, Ct, MRI,…) thì thực hiện theo quy định tại Điều 1 Thông tư số 50/2017/TT-BYT ngày 29/12/2017 của Bộ Y tế: Người bệnh ghi số lượng từng loại phim đã nhận vào ô “Xác nhận của người bệnh” và ký xác nhận, ghi rõ họ tên. Trường hợp cơ sở KBCB giữ lại phim để phục vụ công tác nghiên cứu khoa học, đào tạo… thì phải tổng hợp và thông báo để cơ quan BHXH biết. Quy định này không áp dụng đối với các cơ sở KBCB đã tham gia Đề án thí điểm không in phim và KCB nội trú và KCB nội trú ban ngày.  ', bold: false, fontSize: 9, alignment: 'left' },
                // { text: '\n - Trường hợp phần ký xác nhận chuyển sang trang khác thì cơ sở khám bệnh, chữa bệnh có trách nhiệm căn chỉnh mẫu bảng kê để đảm bảo chữ ký gắn với nội dung bảng kê./.  ', bold: false, fontSize: 9, alignment: 'left' },


            ],
            styles: {
                header: {
                    fontSize: 15,
                    bold: true,
                    margin: [0, 0, 0, 10]
                },
                subheader: {
                    fontSize: 13,
                    bold: true,
                    margin: [0, 10, 0, 5]
                },
                tableExample: {
                    margin: [0, 0, 0, 0]
                },
                tableHeader: {
                    bold: true,
                    fontSize: 11,
                    color: 'black'
                },
                italics: {
                    italics: true
                },
            },
        }

        return saleObject;


    }
}
export { RenderPDFKBCB01x1 };



