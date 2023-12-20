import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { ScriptUtils, FormatterUtils } from '../../utils/javascriptUtils';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import moment from 'moment'
import SecuredComponent from '../../components/SecuredComponent';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ModalQueueNumber from '../QueueNumber/ModalQueueNumber';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import pdfMake from 'pdfmake/build/pdfmake';


class QueueNumberRows extends React.Component {
    constructor() {
        super();
        this.state = {
            isQueueNumberModalShown: false,
            idQueueNumber: null,
            isUpdateStatus: false
        }
        this.handleHidemodal = () => {
            this.setState({
                isQueueNumberModalShown: false
            });
            this.props.onReloadQueueNumber();
            this.props.onReloadQueue();
        };
        this.handleShowQueueNumberModal = (id) => {
            this.setState({
                isQueueNumberModalShown: true,
                idQueueNumber: id
            })
        }
        this.hanleShowUpdateStatus = (id, isUpdateStatus) => {
            this.setState({
                isQueueNumberModalShown: true,
                idQueueNumber: id,
                isUpdateStatus: isUpdateStatus
            })
        }
        this.deleteQueueNumber = (id) => {
            if (confirm("Bạn có chắc sẽ xoá !")) {
                var url = `/queueNumber/${id}`;
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
        this.handleNewPrescription = this.handleNewPrescription.bind(this);
    };
    renderPDFBarCode(dataPrintQueueNumber) {



        if (dataPrintQueueNumber) {

            var imageLogo = this.state.imageLogo;
            var listInputForm = this.state.listInputForm;
            var today = new Date();
            // var batchCode = FormatterUtils.convertTextToBarcode(dataPrintQueueNumber);
            var id = dataPrintQueueNumber.id;
            var patientName = dataPrintQueueNumber.patient.fullName;
            var address = dataPrintQueueNumber.patient.address;
            var birthday = moment(dataPrintQueueNumber.patient.birthday).format("DD/MM/YYYY") ;
            var nation = dataPrintQueueNumber.patient ? dataPrintQueueNumber.patient.nation : "";
            var theNumber = dataPrintQueueNumber.theNumber;
            var department = dataPrintQueueNumber.queue.department.name;
            var departmentClass = dataPrintQueueNumber.queue.department.description;
            var hospital = dataPrintQueueNumber.queue.department.hospital.name;
            var barcode = dataPrintQueueNumber.patient ? dataPrintQueueNumber.patient.code : "";
            
            var patientBarcode = FormatterUtils.convertTextToBarcode(dataPrintQueueNumber.patient ? dataPrintQueueNumber.patient.code : "");
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
                            { text: 'Phòng khám : ' + hospital + '\n Chuyên khoa : ' + department, fontSize: 11, alignment: 'left' },
                            [{ text: '\n', fontSize: 11, alignment: 'right' }, { text: 'Số thứ tự : ', fontSize: 11, alignment: 'right' }],
                            { text: theNumber, fontSize: 25, alignment: 'left' }
                        ]
                    },

                    {
                        columns: [
                            { text: '_________________________________________________________________________________________________', fontSize: 11, alignment: 'center' },
                        ]
                    },
                    {
                        columns: [
                            { text: '', fontSize: 14, bold: true,width: '30%' , alignment: 'left' },
                            { text: '\n\n\n PHIẾU KHÁM BỆNH' , fontSize: 11, bold: true, alignment: 'center' },
                            { image: patientBarcode, fit: [80, 80] , margin : [0, 10, 20, 0], alignment: 'right' }
                        ]
                        
                    },
                    {
                        columns: [
                            { text: '', fontSize: 14, bold: true,width: '30%' , alignment: 'left' },
                            { text: '\n\n', fontSize: 11,margin : [20, 0, 0, 0],bold: true,width: '30%', alignment: 'center' },
                            { text: barcode, fontSize: 11, bold: true, width: '30%', alignment: 'right' },
                        ]
                        
                    },
                    
                    { text: 'Họ và tên : ' + patientName + '\n\n', fontSize: 11 },
                    {
                        columns: [
                            [{ text: 'Ngày sinh : ' + birthday + '\n\n', fontSize: 11 }],

                        ]
                    },
                    // { text: 'Quốc tịch : ' + (dataPrintQueueNumber.patient ? dataPrintQueueNumber.patient.nation : '') + '\n\n', fontSize: 11 },
                    {
                        columns: [

                            { text: 'Địa chỉ : ' + (address ? address: '') + '\n\n', fontSize: 11 },

                        ]
                    },
                    {
                        columns: [

                            { text: 'Yêu cầu khám : ' + dataPrintQueueNumber ? dataPrintQueueNumber.note : department + " + " + departmentClass + '\n\n', fontSize: 11 },

                        ]
                    },
                    {
                        columns: [

                            { text: 'Khám tại : ' + department + " + " + departmentClass + '\n\n', fontSize: 11 },

                        ]
                    },

                    { text: 'Tiền công khám : ' + '\n\n', fontSize: 11 },

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
    }

    handleSavePDFBarcode(dataExportBarCode) {
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        pdfMake.createPdf(dataExportBarCode).download('Phieu_kham.pdf');
    }

    handlegetListToPrintQueueNumber(dataPrintQueueNumber) {
        this.handleSavePDFBarcode(this.renderPDFBarCode(dataPrintQueueNumber));
    }

    getListInputStock() {
        const inputFormId = this.props.queueNumberObject.queueId;
        let setStateInRequest = (list) => { this.setState({ listInputForm: list }) }
        return (agent.asyncRequests.get("/queueNumber/listfindByQueueId?QueueId=" + inputFormId).then(function (res) {
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

    handleNewPrescription(queueuNumberId) {
        return agent.asyncRequests.get("/prescriptionEdit/createPrescriptionForChoose?idQueueNumber=" + queueuNumberId
        ).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                window.location.href = "/editPrescription/" + result.id;
            } else {
                toast.error("Có lỗi khi xóa dữ liệu. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Không thể xóa dữ liệu đang được sử dụng từ màn hình khác! ", { autoClose: 15000 });
        });

    }
    componentWillMount() {
        var url = '/assets/images/logo_timec.png';
        FormatterUtils.downloadImageDataUri(url, this, "imageLogo");

    }
    render() {
        const { queueNumberObject, currentNoQueueNumber, t } = this.props;


        return (
            [<tr className="success" key={queueNumberObject.id}>
                <td></td>
                <td>{currentNoQueueNumber}</td>
                <td colSpan="3"><center>Tên: {queueNumberObject.patient.fullName}</center></td>

                {/* <td>{queueNumberObject.queue ? queueNumberObject.queue.name}</td> */}

                <td>Số Thứ Tự: {queueNumberObject.theNumber}</td>
                <td>Ngày Đặt Số: {moment(queueNumberObject.callTime).format("DD/MM/YYYY hh:mm")}</td>
                <td><center>Loại Phiếu Chờ: {t(queueNumberObject.type)}</center></td>
                <td><center>Trạng Thái: {t(queueNumberObject.status)}</center></td>
                {/* <td>Ghi Chú:{queueNumberObject.note}</td> */}
                {/* <td><a onClick={() => this.deleteQueueNumber(queueNumberObject.id)}><i className="icon-trash"></i> Xóa</a></td> */}
                <td>
                    <a onClick={() => this.handlegetListToPrintQueueNumber(queueNumberObject)}><i className="icon-printer"></i> Phiếu Khám</a>
                </td>
                <td className="text-center footable-visible footable-last-column">
                    <ul className="icons-list">
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                <i className="icon-menu9"></i>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-right">
                                {/* <li><a onClick={() => this.hanleShowUpdateStatus(queueNumberObject.id,true)}><i className="icon-pencil"></i>Cật Nhật Trạng Thái</a></li> */}
                                {/* <li><a onClick={() => this.handleNewPrescription(queueNumberObject.id)}><i className="icon-pencil"></i>Khám bệnh</a></li> */}
                                <li><a onClick={() => this.handleShowQueueNumberModal(queueNumberObject.id)}><i className="icon-pencil"></i>Chỉnh Sửa</a></li>
                                <li><Link to={"/editQueueNumber/" + queueNumberObject.id}><i className="icon-pencil"></i>Sửa thông tin</Link></li>
                            </ul>
                        </li>
                    </ul>
                </td>
                {this.state.isQueueNumberModalShown ? <ModalQueueNumber
                    title="Số Khám Bệnh"
                    idQueueNumber={this.state.idQueueNumber}
                    isUpdateStatus={this.state.isUpdateStatus}
                    show={this.state.isQueueNumberModalShown}
                    onHide={this.handleHidemodal} /> : null
                }
            </tr>]
        );

    }
}
export default translate('translations')(QueueNumberRows);