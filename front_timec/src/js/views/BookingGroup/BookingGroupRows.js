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
import ModalPatientBookingGroup from '../PatientBookingGroup/ModalPatientBookingGroup';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import pdfMake from 'pdfmake/build/pdfmake';

class PatientBookingGroupRows extends React.Component {
    constructor() {
        super();
        this.state = {
            isPatientBookingGroupModalShown: false,
            idPatientBookingGroup: null,
            isUpdateStatus: false,
            listPackageItem: null
        }
        this.handleAfterSave = () => {
            this.setState({
                isPatientBookingGroupModalShown: false
            });
            // this.props.onReloadPatientBookingGroup();
            this.props.onReloadQueue();

        }
        this.handleHidemodal = () => {
            this.setState({
                isPatientBookingGroupModalShown: false
            });
            // this.props.onReloadPatientBookingGroup();
            this.props.onReloadQueue();
        };
        this.handleShowPatientBookingGroupModal = (id) => {
            this.setState({
                isPatientBookingGroupModalShown: true,
                idPatientBookingGroup: id
            })
        }
        this.hanleShowUpdateStatus = (id, isUpdateStatus) => {
            this.setState({
                isPatientBookingGroupModalShown: true,
                idPatientBookingGroup: id,
                isUpdateStatus: isUpdateStatus
            })
        }
        this.deletePatientBookingGroup = (id) => {
            if (confirm("Bạn có chắc sẽ xoá !")) {
                var url = `/patientBookingGroup/${id}`;
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
    handlePrintTotalPrescription(dataInvoiceItem) {

        this.getListPackageItem(dataInvoiceItem.bookingGroup.packages.id);
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        pdfMake.createPdf(this.renderPDFBarCode(dataInvoiceItem)).print();
    }
    getListPackageItem(packageId) {
        let setStateInRequest = (list) => { this.setState({ listPackageItem: list }) }
        return (agent.asyncRequests.get("/packageItem/listAllByPackageId?packageId=" + packageId).then(function (res) {
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
    renderPDFBarCode(dataInvoieForPDFs) {
        var dataPackageItem = this.state.listPackageItem;
        if (dataPackageItem) {
            var name = [];
            dataPackageItem.map(item => {
                name.push(item.diagnosisService ? item.diagnosisService.name : null);
                return (name);
            });
        }
        var dataExport = {
            content: [
                {
                    columns: [
                        { text: 'Sở Y Tế TPHCM' + '\n Phòng Khám Đa Khoa Quốc Tế TIMEC' + '\n Số: ...../20...../GCT', fontSize: 11, alignment: 'center' },
                        { text: 'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM' + '\n Độc lập - Tự do - Hạnh phúc' + '\n ---------------', fontSize: 11, alignment: 'center' },
                        { text: 'Mã Bệnh Án : ' + name + '\n Mã Bệnh Nhân: ' + "N/A", fontSize: 11, alignment: 'center' },
                    ]
                },
            ],

            defaultStyle: {
                columnGap: 10
            },
        }

        return dataExport;
    }
    componentWillMount() {
        var url = '/assets/images/logo_timec.png';
        FormatterUtils.downloadImageDataUri(url, this, "imageLogo");
    }

    render() {
        const { patientBookingGroupObject, currentNoPatientBookingGroup ,t} = this.props;


        return (
            [<tr className="success" key={patientBookingGroupObject.id}>
                <td>{currentNoPatientBookingGroup}</td>
                <td>{patientBookingGroupObject.patient ? patientBookingGroupObject.patient.fullName : null}</td>
        <th>{patientBookingGroupObject.patient ? t(patientBookingGroupObject.patient.gender) : null}</th>
        <th>{patientBookingGroupObject.patient ? patientBookingGroupObject.patient.phone : null}</th>
                <td>{patientBookingGroupObject.status}</td>
                <td>{patientBookingGroupObject.note}</td>
                <th></th>
                <th></th>

                <td className="text-center footable-visible footable-last-column">
                    <ul className="icons-list">
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                <i className="icon-menu9"></i>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-right">
                                
                                <li><a onClick={() => this.handleShowPatientBookingGroupModal(patientBookingGroupObject.id, true)}><i className="icon-pencil"></i>Chỉnh Sửa</a></li>
                                <li><a onClick={() => this.deletePatientBookingGroup(patientBookingGroupObject.id)}><i className="icon-cross2"></i>Xóa</a></li>
                            </ul>
                        </li>
                    </ul>
                </td>
                {this.state.isPatientBookingGroupModalShown ? <ModalPatientBookingGroup
                    title="Chỉnh Sửa Bệnh Nhân"
                    idPatientBookingGroup={this.state.idPatientBookingGroup}
                    isUpdateStatus={this.state.isUpdateStatus}
                    show={this.state.isPatientBookingGroupModalShown}
                    onHide={this.handleHidemodal}
                    handleAfterSave={this.handleAfterSave} /> : null
                }
            </tr>]


        );

    }

}
export default translate('translations')(PatientBookingGroupRows);