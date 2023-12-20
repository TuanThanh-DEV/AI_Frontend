import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { ScriptUtils, FormatterUtils, DateUtils } from '../../utils/javascriptUtils';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import moment from 'moment'
import SecuredComponent from '../../components/SecuredComponent';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import BookingGroupRows from './BookingGroupRows';
import ModalBookingGroup from './ModalBookingGroup';
import ModalPatientBookingGroup from '../PatientBookingGroup/ModalPatientBookingGroup';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import pdfMake from 'pdfmake/build/pdfmake';

class BookingGroupTable extends React.Component {
    constructor() {
        super();
        this.state = {
            listPatientBookingGroup: [],
            isShowPatientBookingGroup: false,
            listPatientBookingGroup: [],
            isBookingGroupModalShown: false,
            isPatientBookingGroupModalShown: false,
            idBookingGroup: null,
            idPatientBookingGroup: null,
            idCompany: null,
            listPackageItem: null,
            imageLogo: "",
        }
        this.getListPatientBookingGroupFollowByBookingGroupId = this.getListPatientBookingGroupFollowByBookingGroupId.bind(this);
        // this.reloadListPatientBookingGroup = () => {
        //     const { bookingGroupObject } = this.props;
        //     this.setState({ isShowPatientBookingGroup: true })
        //     let setStateInRequest = (list) => { this.setState({ listPatientBookingGroup: list }) }
        //     return (agent.asyncRequests.get("/patientBookingGroup/listAllByBookingGroupId?bookingGroupId=" + bookingGroupObject.id).then(function (res) {
        //         var result = res.body.resultData;
        //         if (result) {
        //             setStateInRequest(result);
        //         } else {
        //             toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + res.body.errorMessage, {
        //                 autoClose: 15000
        //             });
        //         }
        //     }, function (err) {
        //         toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", {
        //             autoClose: 15000
        //         });
        //     }))
        // }
        this.handleHidemodal = () => {
            this.setState({
                isBookingGroupModalShown: false,
                isPatientBookingGroupModalShown: false
            });
            // this.props.onReloadBookingGroup();
            // this.reloadListPatientBookingGroup();
        };
        this.handleAfterSave = () => {
            this.setState({
                isBookingGroupModalShown: false,
                isPatientBookingGroupModalShown: false
            });
            this.props.onReloadBookingGroup();
            // this.reloadListPatientBookingGroup();
        }
        this.handleShowmodal = (id) => {
            this.setState({
                isBookingGroupModalShown: true,
                idBookingGroup: id
            });
        }
        this.handleShowPatientBookingGroupModal = (idCompany) => {
            this.setState({
                isPatientBookingGroupModalShown: true,
                idPatientBookingGroup: null,
                idCompany: idCompany
            })

        }
        this.deleteBookingGroup = (id) => {
            if (confirm("Bạn có chắc sẽ xoá !")) {
                var url = `/bookingGroup/${id}`;
                return agent.asyncRequests.del(url
                ).then(function (res) {
                    var result = res.body.resultData;
                    if (result && !result.error) {
                        alert("Xoá Thành Công !");
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


    };


    getListPatientBookingGroupFollowByBookingGroupId(bookingGroupId) {
        this.setState({ isShowPatientBookingGroup: true })
        let setStateInRequest = (list) => { this.setState({ listPatientBookingGroup: list }) }
        return (agent.asyncRequests.get("/patientBookingGroup/listAllByBookingGroupId?bookingGroupId=" + bookingGroupId).then(function (res) {
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
    handleHidePatientBookingGroup() {
        this.setState({
            isShowPatientBookingGroup: false
        })
    }
    handlePrintTotalPrescription(dataInvoiceItem) {
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        pdfMake.createPdf(this.renderPDFBarCode(dataInvoiceItem)).print();
    }
    componentWillMount() {
        var url = '/assets/images/logo_timec.png';
        FormatterUtils.downloadImageDataUri(url, this, "imageLogo");
    }
    renderPDFBarCode(dataInvoiceItem) {
        const { t } = this.props;
        var body = [];
        var contents = [];
        var imageLogo = this.state.imageLogo;

        //state
        dataInvoiceItem.map(parentItem => {
            var gioitinh = parentItem.pbg.patient.gender ? parentItem.pbg.patient.gender : "..................";
            var checkCodeId = parentItem.prescription.id;
            var numberRandomRange = 7;
            var checkCode = checkCodeId.toString().length;
            var totalRange = numberRandomRange - checkCode;
            var title = "PXN";
            var codeNumber = "";
            for (var i = 0; i < totalRange; i++) {
                codeNumber += '0';
            }
            var pageBreaks= 'after';

            var barcode = title + codeNumber + parentItem.prescription.id;
            var patientBarcode = FormatterUtils.convertTextToBarcode(barcode);

            var dataRowTable = [[{ text: 'Tên Chỉ Định', alignment: 'center' }, { text: 'Dịch Vụ Chỉ Định', alignment: 'center' }],]

            parentItem.listItem.map( (item, index) => {
                if(index + 1 == parentItem.length){
                    pageBreaks= "";;
                }
                return  dataRowTable.push([item.diagnosisService.name, item.diagnosisService.diagnosisGroup.name],)
                
            })
            var dataTable = {

                style: 'tableExample',
                alignment: 'center',
                table: {
                    widths: ['*', 'auto'],
                    body:dataRowTable, 
                },
            }
            body =
                [
                    {
                        columns: [
                            { text: 'Sở Y Tế TPHCM' + '\n Phòng Khám Đa Khoa Quốc Tế TIMEC' + '\n Số: ...../20...../GCT', fontSize: 11, alignment: 'center' },
                            { text: 'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM' + '\n Độc lập - Tự do - Hạnh phúc' + '\n ---------------', fontSize: 11, alignment: 'center' },
                            { text: 'Mã Bệnh Án : ' + (parentItem.pbg ? parentItem.pbg.id : ' ....') + '\n Mã Bệnh Nhân: ' + (parentItem.pbg ? parentItem.pbg.patient.code : ' ....'), fontSize: 11, alignment: 'center' },
                        ]
                    },
                    {
                        columns: [
                            imageLogo ? {
                                image: imageLogo,
                                fit: [100, 100],
                                alignment: 'left',
                                margin: [20, 0, 0, 0],
                            } : null,
                            { image: patientBarcode, fit: [100, 100], alignment: 'right', margin: [0, -20, 15, 0] },
                        ]
                    },
                    {
                        columns: [
                            { text: barcode, fontSize: 11, alignment: 'right', margin: [0, 0, 50, 0] },

                        ]
                    },
                    {
                        columns: [

                            { text: '\n PHIẾU CHỈ ĐỊNH', fontSize: 15, alignment: 'center' },

                        ]
                    },

                    {
                        text: ['\n Họ và tên người bệnh: ', { text: parentItem.pbg.patient ? parentItem.pbg.patient.fullName : "...................................................................." }, "\t Nam/Nữ: ",
                            { text: t(gioitinh) },
                            "\t Ngày Sinh: ", { text: parentItem.pbg.patient.birthday ? DateUtils.formatDateForScreen(parentItem.pbg.patient.birthday)  : "......................" }], fontSize: 11, alignment: 'left'
                    },
                    {
                        columns: [
                            { text: 'Địa chỉ: ' + (parentItem.pbg.patient.address ? parentItem.pbg.patient.address : ""), fontSize: 11, },


                        ]
                    },
                    {
                        columns: [
                            { text: 'Chẩn đoán: ' + (parentItem.prescription.analysis ? parentItem.prescription.analysis : "Chưa có"), fontSize: 11, },


                        ]
                    },
                    '\n',
                    dataTable,
                    {
                        columns: [

                            { text: '', fontSize: 11 },
                            { text: '', fontSize: 11 },
                            { text: '\n\n Bác sĩ chỉ định ',pageBreak : pageBreaks, alignment: 'center', fontSize: 11 },
                        ]
                    },

                ];
                contents.push(body);
            })
                
   
        //end


        var dataExport = {
            content: contents,

            defaultStyle: {
                columnGap: 10
            },
        }
        console.log(dataExport);
        return dataExport;
    }
    handlePrintDiagnosticsServices(bookingGroupObject) {
        var _this = this;
        return (agent.asyncRequests.get("/patientBookingGroup/createAllByBookingGroupId?bookingGroupId=" + bookingGroupObject.id).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                _this.handlePrintTotalPrescription(result);
                _this.setState({ listPatientBookingGroup: list });
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



    render() {
        const { currentNo, bookingGroupObject } = this.props;

        const datePatientBookingGroup = this.state.listPatientBookingGroup;
        var isShowPatientBookingGroup = this.state.isShowPatientBookingGroup;
        var currentNoPatientBookingGroup = 0;

        var bookingGroupRows = datePatientBookingGroup.map(item => {
            currentNoPatientBookingGroup++;
            return <BookingGroupRows key={"PatientBookingGroup" + item.pbg.id} currentNoPatientBookingGroup={currentNoPatientBookingGroup} onReloadBookingGroup={this.props.onReloadBookingGroup} bookingGroupObject={bookingGroupObject} patientBookingGroupObject={item.pbg}> </BookingGroupRows>
            // return <BookingGroupRows key={"PatientBookingGroup" + item.pbg.id} currentNoPatientBookingGroup={currentNoPatientBookingGroup} onReloadBookingGroup={this.props.onReloadBookingGroup} onReloadPatientBookingGroup={this.reloadListPatientBookingGroup} bookingGroupObject={bookingGroupObject} patientBookingGroupObject={item.pbg}> </BookingGroupRows>
        })
        var patientBookingGroupHeader = [
            <tr className="success">
                <th data-toggle="true">STT</th>
                <th data-toggle="true">Tên Bệnh Nhân</th>
                <th data-toggle="true">Giới Tính </th>
                <th data-toggle="true">Số Điện Thoại</th>
                <th data-toggle="true">Trạng Thái</th>
                <th data-toggle="true">Ghi Chú</th>
                <th></th>
                <th></th>
                <th></th>
            </tr>
            // ]
        ].concat(isShowPatientBookingGroup ? bookingGroupRows : null)


        return (
            [<tr key={bookingGroupObject.id}>
                {isShowPatientBookingGroup ? null : <td><button className="bg-info icon-arrow-down22" onClick={() => this.getListPatientBookingGroupFollowByBookingGroupId(bookingGroupObject.id)}></button></td>}
                {isShowPatientBookingGroup ?
                    <td><button className="bg-info-600 icon-dash" onClick={() => this.handleHidePatientBookingGroup()}></button></td> : null}
                <td>{currentNo}</td>
                <td>{bookingGroupObject.company.name}</td>
                <td>{moment(bookingGroupObject.createdDate).format("DD/MM/YYYY")}</td>
                <td>{moment(bookingGroupObject.appointmentDate).format("DD/MM/YYYY")}</td>
                <td>{bookingGroupObject.packages ? bookingGroupObject.packages.name : null}</td>
                <td>{bookingGroupObject.status}</td>
                <td>{bookingGroupObject.note}</td>
                <td className="text-center footable-visible footable-last-column">
                    <ul className="icons-list">
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                <i className="icon-menu9"></i>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-right">
                                {/* <li><a onClick={() => this.handleShowPatientBookingGroupModal(bookingGroupObject)}><i className="icon-pencil"></i>Thêm Bệnh Nhân Cho Nhóm</a></li> */}
                                {bookingGroupObject.status == 'OPEN' ? <li><a onClick={() => this.handlePrintDiagnosticsServices(bookingGroupObject)}><i className="icon-pencil"></i>Khởi Tạo Phiếu Khám</a></li>: null}
                                <li><a onClick={() => this.handleShowmodal(bookingGroupObject.id)}><i className="icon-pencil"></i>Chỉnh Sửa</a></li>
                                {bookingGroupObject.status == "OPEN" ? <li><a onClick={() => this.deleteBookingGroup(bookingGroupObject.id)}><i className="icon-cross2"></i>Xóa</a></li> : null}
                            </ul>
                        </li>
                    </ul>
                </td>
                {this.state.isBookingGroupModalShown ? <ModalBookingGroup
                    title="Hàng chờ khám bệnh"
                    idBookingGroup={this.state.idBookingGroup}
                    show={this.state.isBookingGroupModalShown}
                    onHide={this.handleHidemodal}

                /> : null
                }
                {this.state.isPatientBookingGroupModalShown ? <ModalPatientBookingGroup
                    title="Thêm Bệnh Nhân Cho Nhóm"
                    idPatientBookingGroup={this.state.idPatientBookingGroup}
                    idCompany={this.state.idCompany}
                    show={this.state.isPatientBookingGroupModalShown}
                    onHide={this.handleHidemodal}
                    handleAfterSave={this.handleAfterSave} /> : null
                }
            </tr>].concat(isShowPatientBookingGroup ?
                patientBookingGroupHeader : null)
        );



    }
}
export default translate('translations')(BookingGroupTable);