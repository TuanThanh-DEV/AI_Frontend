import moment from 'moment';
import { FormatterUtils } from '../../utils/javascriptUtils';

const RenderPDFKBCB01 = {
    getDataExport: (prescription, props, state) => {

        // Show list items
        var currentNo = 0;
        const currentUser = props.currentUser;
        const { t } = props;
        var today = new Date();
        var tongSoNgayDiieuTri = 0;
        if(Math.round(Math.abs(prescription.finishTime - prescription.examineTime) / (1000 * 60 * 60 * 24) ) == 0 ){
            tongSoNgayDiieuTri = 1;
        }else{
            tongSoNgayDiieuTri = Math.round(Math.abs(prescription.finishTime - prescription.examineTime) / (1000 * 60 * 60 * 24) );
        }
        var itemRows = [
            [
                // { text: 'Họ Tên', style: 'tableHeader', alignment: 'center', fillColor: '#DA9694' },
                {rowSpan: 2 ,text: 'Nội dung', style: 'tableHeader', alignment: 'center' },
                {rowSpan: 2 ,text: 'Đơn vị tính', style: 'tableHeader', alignment: 'center' },
                {rowSpan: 2 ,text: 'Số lượng', style: 'tableHeader', alignment: 'center' },
                {rowSpan: 2 ,text: 'Đơn giá BV (đồng)', style: 'tableHeader', alignment: 'center' },
                {rowSpan: 2 ,text: 'Đơn giá BH (đồng)', style: 'tableHeader', alignment: 'center' },
                {rowSpan: 2 ,text: 'Tỷ lệ thanh toán theo dịch vụ (%)', style: 'tableHeader', alignment: 'center' },
                {rowSpan: 2 ,text: 'Thành tiền BV (Đồng)', style: 'tableHeader', alignment: 'center' },
                {rowSpan: 2 ,text: 'Tỷ lệ thanh toán BHYT (%)', style: 'tableHeader', alignment: 'center' },
                {rowSpan: 2 ,text: 'Thành tiền BH (đồng)', style: 'tableHeader', alignment: 'center' },
                {text: 'Nguồn thanh toán (đồng)',colSpan: 4, style: 'tableHeader', alignment: 'center' },
                {},
                {},
                {},
            ],
            [
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                {},
                { text: 'Quỹ BHYT', style: 'tableHeader', alignment: 'center' },
                { text: 'Người bệnh cùng chi trả', style: 'tableHeader', alignment: 'center' },
                { text: 'Khác', style: 'tableHeader', alignment: 'center' },
                { text: 'Người bệnh tự trả ', style: 'tableHeader', alignment: 'center' },

            ],
            [
                { text: '(1)', style: 'tableHeader', alignment: 'center' },
                { text: '(2)', style: 'tableHeader', alignment: 'center' },
                { text: '(3)', style: 'tableHeader', alignment: 'center' },
                { text: '(4)', style: 'tableHeader', alignment: 'center' },
                { text: '(5)', style: 'tableHeader', alignment: 'center' },
                { text: '(6)', style: 'tableHeader', alignment: 'center' },
                { text: '(7)', style: 'tableHeader', alignment: 'center' },
                { text: '(8)', style: 'tableHeader', alignment: 'center' },
                { text: '(9)', style: 'tableHeader', alignment: 'center' },
                { text: '(10)', style: 'tableHeader', alignment: 'center' },
                { text: '(11)', style: 'tableHeader', alignment: 'center' },
                { text: '(12)', style: 'tableHeader', alignment: 'center' },
                { text: '(13)', style: 'tableHeader', alignment: 'center' },
            ],
            [
                {text: '1. Khám bệnh: ', colSpan: 6, style: 'tableHeader', alignment: 'left' },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
            ],
            [
                {text: ' ', style: 'tableHeader', alignment: 'left'},
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
            ],
            [
                {text: ' ', style: 'tableHeader', alignment: 'left'},
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
            ],
            // [
            //     {text: '2. Ngày giường: ', colSpan: 6, style: 'tableHeader', alignment: 'left' },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            // ],
            // [
            //     {text: '2.1. Ngày giường điều trị ban ngày: ', colSpan: 6, style: 'tableHeader', alignment: 'left' },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            // ],
            // [
            //     {text: ' ', style: 'tableHeader', alignment: 'left'},
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            // ],
            // [
            //     {},
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     {text: ' ', style: 'tableHeader', alignment: 'left',},
                
            // ],
             
            // [
            //     {text: '2.2. Ngày giường điều trị nội trú: ', pageBreak: 'before', colSpan: 6, style: 'tableHeader', alignment: 'left' },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            // ],
            // [
            //     {},
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     {text: ' ', style: 'tableHeader', alignment: 'left' },
                
            // ],
            // [
            //     {},
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     {text: ' ', style: 'tableHeader', alignment: 'left' },
                
            // ],
            // [
            //     {text : [
            //         {text: '2.3. Ngày giường lưu: ', style: 'tableHeader', alignment: 'left' },
            //         {text: ' (Áp dụng đối với Phòng khám đa khoa khu vực và Trạm y tế tuyến xã) ', bold : false,style: 'tableHeader', alignment: 'left', italics: true},
            //         ],
            //         colSpan: 13
            //     },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            // ],
            // [
            //     {},
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     {text: ' ', style: 'tableHeader', alignment: 'left' },
                
            // ],
            // [
            //     {},
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     {text: ' ', style: 'tableHeader', alignment: 'left' },
                
            // ],

            [
                {text: '3. Xét nghiệm: ', colSpan: 6, style: 'tableHeader', alignment: 'left' },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
            ],
            [
                {},
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                {text: ' ', style: 'tableHeader', alignment: 'left' },
                
            ],
            [
                {},
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                {text: ' ', style: 'tableHeader', alignment: 'left' },
            ],

            [
                {text: '4. Chẩn đoán hình ảnh: ', colSpan: 6, style: 'tableHeader', alignment: 'left' },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
            ],
            [
                {},
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                {text: ' ', style: 'tableHeader', alignment: 'left' },
                
            ],
            [
                {},
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                {text: ' ', style: 'tableHeader', alignment: 'left' },
            ],
            [
                {text: '5. Thăm dò chức năng: ', colSpan: 6, style: 'tableHeader', alignment: 'left' },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
            ],
            [
                {},
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                {text: ' ', style: 'tableHeader', alignment: 'left' },
                
            ],
            [
                {},
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                {text: ' ', style: 'tableHeader', alignment: 'left' },
            ],

            [
                {text: '6. Thủ thuật, phẫu thuật: ', colSpan: 6, style: 'tableHeader', alignment: 'left' },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
            ],
            [
                {},
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                {text: ' ', style: 'tableHeader', alignment: 'left' },
                
            ],
            [
                {},
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                {text: ' ', style: 'tableHeader', alignment: 'left' },
            ],
            // [
            //     {text: '7. Máu, chế phẩm máu, vận chuyển máu: ', colSpan: 6, style: 'tableHeader', alignment: 'left' },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            // ],
            // [
            //     {},
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     {text: ' ', style: 'tableHeader', alignment: 'left' },
                
            // ],
            // [
            //     {},
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     {text: ' ', style: 'tableHeader', alignment: 'left' },
            // ],
            // [
            //     {text: '8. Thuốc, dịch truyền: ', colSpan: 6, style: 'tableHeader', alignment: 'left' },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            // ],
            // [
            //     {},
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     {text: ' ', style: 'tableHeader', alignment: 'left' },
                
            // ],
            // [
            //     {},
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     {text: ' ', style: 'tableHeader', alignment: 'left' },
            // ],
            // [
            //     {text : [
            //         {text: '9. Vật tư y tế:  ', style: 'tableHeader', alignment: 'left' },
            //         {text: '(Vật tư y tế chưa bao gồm với dịch vụ kỹ thuật nào, Ví dụ: Bơm cho ăn 50ml, dây truyền dịch…)', bold : false, style: 'tableHeader', alignment: 'left', italics: true},
                    
            //         ],
            //         colSpan: 13
            //     },
            // ],
            // [
            //     {},
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     {text: ' ', style: 'tableHeader', alignment: 'left' },
                
            // ],
            // [
            //     {},
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     {text: ' ', style: 'tableHeader', alignment: 'left' },
            // ],
            // [
              
            //     {text : [
            //         {text: '10. Gói vật tư y tế:  ', style: 'tableHeader', alignment: 'left' },
            //         {text: '(Các vật tư y tế đi kèm trong một lần thực hiện dịch vụ kỹ thuật, không ghi các vật tư y tế đã tính kết cấu trong giá dịch vụ kỹ thuật đó)', bold : false, style: 'tableHeader', alignment: 'left', italics: true},
                    
            //         ],
            //         colSpan: 13
            //     },
            // ],
            // [
                
            //     {text : [
            //         {text: '10.1. Gói vật tư y tế 1 ', style: 'tableHeader', alignment: 'left' },
            //         {text: '(Ghi kèm theo tên dịch vụ kỹ thuật thực hiện)', bold : false, style: 'tableHeader', alignment: 'left', italics: true},
                    
            //         ],
            //         colSpan: 13
            //     },
            // ],
            // [
            //     {text: '- Tên VTYT 1 ', style: 'tableHeader', alignment: 'left'},
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
                
            // ],
            // [
            //     {text: '- Tên VTYT 2 ', style: 'tableHeader', alignment: 'left'},
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     {},
            // ],
            // [
            //     {text : [
            //         {text: '10.2. Gói vật tư y tế 2 ', style: 'tableHeader', alignment: 'left' },
            //         {text: '(Ghi kèm theo tên dịch vụ kỹ thuật thực hiện)', bold : false, style: 'tableHeader', alignment: 'left', italics: true},
                    
            //         ],
            //         colSpan: 13
            //     },
            // ],
            // [
            //     {text: '- Tên VTYT 1 ', style: 'tableHeader', alignment: 'left'},
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
                
            // ],
            // [
            //     {text: '- Tên VTYT 2 ', style: 'tableHeader', alignment: 'left'},
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     {},
            // ],
            // [
            //     {text : [
            //         {text: '10.n. Gói vật tư y tế n ',style: 'tableHeader', alignment: 'left' },
            //         {text: '(Ghi kèm theo tên dịch vụ kỹ thuật thực hiện)', bold : false, style: 'tableHeader', alignment: 'left', italics: true},
                    
            //         ],
            //         colSpan: 13, pageBreak: 'before'
            //     },
            // ],
            // [
            //     {text: '- Tên VTYT 1 ', style: 'tableHeader', alignment: 'left'},
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
                
            // ],
            // [
            //     {text: '- Tên VTYT 2 ', style: 'tableHeader', alignment: 'left'},
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     {},
            // ],
            // [
            //     {text: '11. Vận chuyển người bệnh: ', colSpan: 6, style: 'tableHeader', alignment: 'left' },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            // ],
            // [
            //     {text: ' ', style: 'tableHeader', alignment: 'left'},
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
                
            // ],
            // [
            //     {text: ' ', style: 'tableHeader', alignment: 'left'},
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     {},
            // ],
            // [
            //     {text: '12. Dịch vụ khác: ', colSpan: 6, style: 'tableHeader', alignment: 'left' },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            // ],
            // [
            //     {text: ' ', style: 'tableHeader', alignment: 'left'},
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
                
            // ],
            // [
            //     {text: ' ', style: 'tableHeader', alignment: 'left'},
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     { },
            //     {},
            // ],
            [
                {text: 'Cộng: ', colSpan: 6, style: 'tableHeader', alignment: 'left' },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
                { },
            ],
          
        ];

        var tableItems = {
            style: 'tableExample',
            headerRows: 1,
            table: {
                widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
                body: itemRows
            },
            layout: {
                fillColor: function (rowIndex, node, columnIndex) {
                    return (rowIndex === 0) ? '#FFD700' : null;
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

                { text: '\n MẪU BẢNG KÊ CHI PHÍ KHÁM BỆNH, CHỮA BỆNH ', bold: true, fontSize: 11, alignment: 'center', italics: 'true' },
                { text: '(Ban hành kèm theo Quyết định số 6556/QĐ-BYT ngày 30 tháng 10 năm 2018 của Bộ trưởng Bộ Y tế) ', fontSize: 11, alignment: 'center', italics: 'true' },
                { text: '\n', fontSize: 9, alignment: 'center', italics: 'true' },
                {
                    columns: [
                        [
                            {
                                width: '*',
                                text: [
                                    { text: 'Bộ Y tế/Sở Y tế/Y tế ngành: …………………', bold: true, fontSize: 9, alignment: 'left' },
                                    { text: '\n Cơ sở khám, chữa bệnh:', bold: true, fontSize: 9, alignment: 'left' }, { text: '\n \t\t     Phòng Khám Đa Khoa Quốc Tế TIMEC', fontSize: 9, alignment: 'left' },
                                    { text: '\n Khoa: ', bold: true, fontSize: 9, alignment: 'left' }, { text: prescription.department.name, fontSize: 9, alignment: 'left' },
                                    { text: '\n Mã Khoa: ', bold: true, fontSize: 9, alignment: 'left' }, { text: prescription.department.departmentCode, fontSize: 9, alignment: 'left' },
                                ]
                            }
                        ],
                        [],
                        [{
                            width: 'auto',
                            text: [
                                { text: 'Mẫu số: 01/KBCB', bold: true, fontSize: 9, alignment: 'reight' },
                                { text: '\n Mã số người bệnh: ', bold: true, fontSize: 9, alignment: 'reight' }, { text: prescription.patient.code, fontSize: 9, alignment: 'reight' },
                                { text: '\n Số khám bệnh: ', bold: true, fontSize: 9, alignment: 'reight' }, { text: (prescription.queueNumber != null? prescription.queueNumber.theNumber :''), fontSize: 9, alignment: 'reight' },
                            ]
                        }
                        ]
                    ]
                },
                { text: '\n BẢNG KÊ CHI PHÍ… ', fontSize: 9, bold: true, alignment: 'center' },
                { text: '\n I. Phần Hành chính: ', fontSize: 9, bold: true, alignment: 'left'},
                // (1) Họ tên người bệnh: 
                {text : [
                    { text: '\n (1) Họ tên người bệnh:  ', fontSize: 9, alignment: 'left'},
                    { text: prescription.patient.fullName, fontSize: 9,alignment: 'left'},
                    { text: '; \t Ngày, tháng, năm sinh:   ', fontSize: 9,  alignment: 'left'},
                    { text: moment(prescription.patient.birthday).format("DD/MM/YYYY")  , fontSize: 9,  alignment: 'left'},
                    { text: '; \t Giới tính:  ', fontSize: 9, alignment: 'left'},
                    { text: t(prescription.patient.gender), fontSize: 9,  alignment: 'left'},
                ]},
                
                //(2) Địa chỉ hiện tại
                {text : [
                    { text: '\n (2) Địa chỉ hiện tại: ', fontSize: 9,  alignment: 'left'},
                    { text: prescription.patient.address, fontSize: 9,  alignment: 'left'},
                    { text: ';\t (3) Mã khu vực (K1/K2/K3): ..........', fontSize: 9, alignment: 'left'},
                ]},
                //(4)  Mã thẻ BHYT
                {text : [
                    { text: '\n (4)  Mã thẻ BHYT: ', fontSize: 9, alignment: 'left'},
                    { text: '.....................', fontSize: 9,  alignment: 'left'},
                    { text: ',\t Từ Ngày :', fontSize: 9, alignment: 'left'},
                    { text: '.....................', fontSize: 9, alignment: 'left'},
                    { text: ',\t Đến Ngày :', fontSize: 9, alignment: 'left'},
                    { text: '.....................', fontSize: 9, alignment: 'left'},
                ]},
                // (5) Nơi ĐK KCB ban đầu: 
                {text : [
                    { text: '\n (5) Nơi ĐK KCB ban đầu:  ', fontSize: 9, alignment: 'left'},
                    { text: '.................................................................', fontSize: 9,  alignment: 'left'},
                    { text: ';\t Mã: ', fontSize: 9,  alignment: 'left'},
                    { text: '...........', fontSize: 9,  alignment: 'left'},
                ]},
                // (7) Đến khám: 
                {text : [
                    { text: '\n (7) Đến khám:  ', fontSize: 9, alignment: 'left'},
                    { text: moment(prescription.examineTime).format("HH")  , fontSize: 9,  alignment: 'left'},
                    { text: '\t Giờ  ', fontSize: 9,  alignment: 'left'},

                    { text: moment(prescription.examineTime).format("mm")  , fontSize: 9,  alignment: 'left'},
                    { text: '\t Phút  ', fontSize: 9,  alignment: 'left'},
                    { text: ';\t Ngày :  ', fontSize: 9,  alignment: 'left'},
                    { text: moment(prescription.examineTime).format("DD/MM/YYYY")  , fontSize: 9,  alignment: 'left'},
                ]},
                // (8) Điều trị ngoại trú/nội trú từ: ……….. giờ.............phút, ngày …../…..../……...
                {text : [
                    { text: '\n (8) Điều trị ngoại trú/nội trú từ: ……….. giờ.............phút, ngày …../…..../……...  ', fontSize: 9, alignment: 'left'},
                ]},
                //(9) Kết thúc khám/điều trị:...................... giờ ........... phút, ngày …../..…../ ……..    Tổng số ngày điều trị: …….
                {text : [
                    { text: '\n (9) Kết thúc khám/điều trị:  ', fontSize: 9, alignment: 'left'},
                    { text: moment(prescription.finishTime).format("HH")  , fontSize: 9,  alignment: 'left'},
                    { text: '\t Giờ  ', fontSize: 9,  alignment: 'left'},

                    { text: moment(prescription.finishTime).format("mm")  , fontSize: 9,  alignment: 'left'},
                    { text: '\t Phút  ', fontSize: 9,  alignment: 'left'},
                    { text: ';\t Ngày :  ', fontSize: 9,  alignment: 'left'},
                    { text: moment(prescription.finishTime).format("DD/MM/YYYY")  , fontSize: 9,  alignment: 'left'},
                    { text: ';\t Tổng số ngày điều trị: :  ', fontSize: 9,  alignment: 'left'},

                    { text:  tongSoNgayDiieuTri , fontSize: 9,  alignment: 'left'},
                   
                ]},

                //(10) Tình trạng ra viện
                {text : [
                    { text:  "\n (10) Tình trạng ra viện" , fontSize: 9,  alignment: 'left'},
                    { text:  '...............' , fontSize: 9,  alignment: 'left'},
                ]},
                //(11) Cấp cứu      (12) Đúng tuyến   Nơi chuyển đến từ: ……………….…… Nơi chuyển đi:…………………….;  (13) Thông tuyến       (14) Trái tuyến 
                {text : [
                    { text: '\n (11) Cấp cứu:  ', fontSize: 9, alignment: 'left'},
                    { text: '\t ...... ', fontSize: 9,  alignment: 'left'},
                    { text: '\t (12) Đúng tuyến:  ', fontSize: 9, alignment: 'left'},
                    { text: '\t ...... ', fontSize: 9,  alignment: 'left'},
                    { text: '\t (13) Thông tuyến : ...... ', fontSize: 9,  alignment: 'left'},
                    { text: '\t (14) Trái tuyến : ...... ', fontSize: 9, alignment: 'left'},
                ]},

                //(13) Thông tuyến
                {text : [
                    { text: '\n Nơi chuyển đến từ: ', fontSize: 9, alignment: 'left'},
                    { text: '..........................................................  ', fontSize: 9, alignment: 'left'},
                    { text: '\t Nơi chuyển đi: ', fontSize: 9, alignment: 'left'},
                    { text: '..........................................................  ', fontSize: 9, alignment: 'left'},
                ]},
                //(15) Chẩn đoán xác định
                {text : [
                    { text: '\n (15) Chẩn đoán xác định: ', fontSize: 9, alignment: 'left'},
                    { text: '...........................................................................................  ', fontSize: 9, alignment: 'left'},
                    { text: '\t (16) Mã bệnh: ', fontSize: 9, alignment: 'left'},
                    { text: '.........................  ', fontSize: 9, alignment: 'left'},
                ]},
                //(17) Bệnh kèm theo: 
                {text : [
                    { text: '\n (17) Bệnh kèm theo: : ', fontSize: 9, alignment: 'left'},
                    { text: '...........................................................................................  ', fontSize: 9, alignment: 'left'},
                    { text: '\t; (18) Mã bệnh kèm theo : ', fontSize: 9, alignment: 'left'},
                    { text: '.........................  ', fontSize: 9, alignment: 'left'},
                ]},
                //(19) Thời điểm đủ 05 năm liên tục từ ngày: ….……/..……./……..;                         
                {text : [
                    { text: '\n (19) Thời điểm đủ 05 năm liên tục từ ngày: ….……/..……./……..; ', fontSize: 9, alignment: 'left'},
                    { text: '\t (20) Miễn cùng chi trả trong năm từ ngày:..…../……./…….... : ', fontSize: 9, alignment: 'left'},
                ]},
                
                //II. Phần Chi phí khám bệnh, chữa bệnh: 
                { text: '\n II. Phần Chi phí khám bệnh, chữa bệnh:  ', fontSize: 9, bold: true, alignment: 'center' },
                { text: '(Mỗi mã thẻ BHYT thống kê phần chi khí khám bệnh, chữa bệnh phát sinh tương ứng theo mã thẻ đó).  ', fontSize: 9, alignment: 'center' ,italics: 'true' },
                
                {text : [
                    { text: '\n Mã thẻ BHYT: ', fontSize: 9, alignment: 'left'},
                    { text: '.....................', fontSize: 9,  alignment: 'left'},
                    { text: ',\t Giá trị từ  : ..../…../ ….. ', fontSize: 9, alignment: 'left'},
                    { text: ',\t đến : …../…../…..', fontSize: 9, alignment: 'left'},
                    { text: ' \t Mức hưởng: .....................', fontSize: 9, alignment: 'left'},
                ]},

                { text: '\n (Chi phí KBCB tính từ ngày…./…/… đến ngày…/…/…)  ', fontSize: 9, alignment: 'center' },

                { text: '\n' },

                //  table
                tableItems,

                { text: '\n' },

                { text: '\n Tổng chi phí lần khám bệnh/cả đợt điều trị (làm tròn đến đơn vị đồng):......................................................  đồng ', fontSize: 9, alignment: 'left' },
                { text: '\n (Viết bằng chữ:.............................................................................................................................................)', fontSize: 9, alignment: 'left' },
                { text: '\n Trong đó, số tiền do: ', fontSize: 9, bold : true, alignment: 'left' },
                { text: '\n - Quỹ BHYT thanh toán: ..........................................................................................................................................', fontSize: 9, alignment: 'left' },
                { text: '\n - Người bệnh trả, trong đó: .....................................................................................................................................', fontSize: 9, alignment: 'left' },
                { text: '\n  + Cùng trả trong phạm vi BHYT: ............................................................................................................................', fontSize: 9, alignment: 'left' },
                { text: '\n  + Các khoản phải trả khác: ....................................................................................................................................', fontSize: 9, alignment: 'left' },
                { text: '\n - Nguồn khác:  .........................................................................................................................................................', fontSize: 9, alignment: 'left' },
            
                { text: '\n' },

                {
                    columns: [
                        [
                            {
                                width: '*',
                                text: [
                                    { text: 'NGƯỜI LẬP BẢNG KÊ', bold: true, fontSize: 9, alignment: 'center' },
                                    { text: '\n (ký, ghi rõ họ tên)', bold: false,italics: 'true',fontSize: 9, alignment: 'center' },
                                ]
                            }
                        ],
                        [],
                        [
                            {
                                width: '*',
                                text: [
                                    { text: ' Ngày.... tháng... năm ...', bold: false,italics: 'true',fontSize: 9, alignment: 'center' },
                                    { text: '\n KẾ TOÁN VIỆN PHÍ', bold: true, fontSize: 9, alignment: 'center' },
                                    { text: '\n (ký, ghi rõ họ tên)', bold: false,italics: 'true',fontSize: 9, alignment: 'center' },
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
                                    { text: '\n (ký, ghi rõ họ tên)', bold: false,italics: 'true',fontSize: 9, alignment: 'center' },
                                    { text: '\n (Tôi đã nhận … phim … Xquang/CT/MRI)', bold: true, fontSize: 9, alignment: 'center' },
                                ]
                            }
                        ],
                        [],
                        [
                            {
                                width: '*',
                                text: [
                                    { text: ' Ngày.... tháng... năm ...', bold: false,italics: 'true',fontSize: 9, alignment: 'center' },
                                    { text: '\n GIÁM ĐỊNH BHYT', bold: true, fontSize: 9, alignment: 'center' },
                                    { text: '\n (ký, ghi rõ họ tên)', bold: false,italics: 'true',fontSize: 9, alignment: 'center' },
                                ]
                            }
                        ],
                        
                    ]
                },

                { text: '\n' },
                { text: '\n' },
                { text: '\n' },
                { text: '\n' },
                { text: '\n' },

                { text: 'Ghi chú: ', bold: true, italics: 'true', fontSize: 9, alignment: 'left', textDecorationLine : 'underline solid ' },
                { text: '\n - Trường hợp khám bệnh, chữa bệnh tại Trạm y tế tuyến xã và tương đương: Thay thế chữ ký, họ tên của Kế toán viện phí bằng chữ ký, họ tên của người phụ trách đơn vị và phần ký xác nhận của Giám định BHYT không bắt buộc.  ', bold: false, fontSize: 9, alignment: 'left' },
                { text: '\n - Trường hợp KBCB ngoại trú, người bệnh đã được nhận phim chụp (Xquang, Ct, MRI,…) thì thực hiện theo quy định tại Điều 1 Thông tư số 50/2017/TT-BYT ngày 29/12/2017 của Bộ Y tế: Người bệnh ghi số lượng từng loại phim đã nhận vào ô “Xác nhận của người bệnh” và ký xác nhận, ghi rõ họ tên. Trường hợp cơ sở KBCB giữ lại phim để phục vụ công tác nghiên cứu khoa học, đào tạo… thì phải tổng hợp và thông báo để cơ quan BHXH biết. Quy định này không áp dụng đối với các cơ sở KBCB đã tham gia Đề án thí điểm không in phim và KCB nội trú và KCB nội trú ban ngày.  ', bold: false, fontSize: 9, alignment: 'left' },
                { text: '\n - Trường hợp phần ký xác nhận chuyển sang trang khác thì cơ sở khám bệnh, chữa bệnh có trách nhiệm căn chỉnh mẫu bảng kê để đảm bảo chữ ký gắn với nội dung bảng kê./.  ', bold: false, fontSize: 9, alignment: 'left' },

            
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
export { RenderPDFKBCB01 };



