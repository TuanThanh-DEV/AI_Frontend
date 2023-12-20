import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { DateUtils, ScriptUtils, UrlUtils } from '../../utils/javascriptUtils';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import ModalDiagnosisReport from './ModalDiagnosisReport';
import moment from 'moment';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import pdfMake from 'pdfmake/build/pdfmake';
import { FormatterUtils } from '../../utils/javascriptUtils';
import { RenderSelect, RenderInputWithDiv } from '../../components/formInputs';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';


const selector = formValueSelector('DiagnosisReportList');
const mapStateToProps = state => {
    var updateValue = {
        ...state.prescriptionReducer.updatingPrescription,
    };
    return {
        initialValues: updateValue,
        search: selector(state, "search"),
        prescriptionType: selector(state, "prescriptionType"),
        diagnosisGroup: selector(state, "diagnosisGroup"),
    }
}

const mapDispatchToProps = dispatch => ({
  
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "DiagnosisReportList", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
})
class DiagnosisReportList extends React.Component {
    constructor() {
        super();
        this.state = {
            listDiagnosisReport: null,
            isDiagnosisReportModalShown: false,
            objectdiagnosisReport: null,
            idDiagnosisReport: null,
            isPDFModalShown: false,
            DiagnosisReport: [],
            diagnosisGroups : null,
            imageLogo: null,

        }
        this.handleShowmodal = this.handleShowmodal.bind(this);
        this.updateListDiagnosisReport = this.updateListDiagnosisReport.bind(this);
        this.handleHidemodal = () => {
            const {search, prescriptionType, diagnosisGroup} = this.props;
            this.setState({ isDiagnosisReportModalShown: false });
            this.updateListDiagnosisReport({search: search, prescriptionType: prescriptionType, diagnosisGroup: diagnosisGroup});
        };
        this.handleHidemodalPDF = () => {
            this.setState({ isPDFModalShown: false, });
            this.UpdatePrescriptionItem();
        };
    };
    handleShowmodal(id) {
        this.setState({
            isDiagnosisReportModalShown: true,
            idDiagnosisReport: id
        });
    }
    handleInPDFShowmodal(DiagnosisReport) {
        this.setState({
            isPDFModalShown: true,
            DiagnosisReport: DiagnosisReport
        });
    }
    updateListDiagnosisReport(values) {
        var page = qs.parse(this.props.location.search).page;
        if(!page){
            page = 1
        }
        var prescriptionTypes = values ? values.prescriptionType : "ALL";
        let group = values ? values.diagnosisGroup : "";
        var search = values ? values.search : "";
        var insuranceType ='ALL';
        if(values){
            insuranceType = values.insuranceType ? values.insuranceType : insuranceType;
        } 
        let setStateInRequest = (list) => { this.setState({ listDiagnosisReport: list }) }
        return agent.asyncRequests.getPage("/diagnosisReport/list?search=" + search + "&prescriptionType=" +(prescriptionTypes ? prescriptionTypes : "PRESCRIPTION" ) +"&diagnosisGroup="+ (group ? group : "") + '&insuranceType=' + insuranceType, page
        ).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });

    }
    getAllDiagnosisGroup(){
        let setStateInRequest = (list) => { this.setState({ diagnosisGroups: list }) }
        return agent.DiagnosisGroupApi.listAllDiagnosisGroup(
        ).then(function (res) {
            var result = res.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    }
    componentWillMount() {
        this.updateListDiagnosisReport();
        this.getAllDiagnosisGroup();

        var url = '/assets/images/logo_timec.png';
        FormatterUtils.downloadImageDataUri(url, this, "imageLogo");
    };

    deleteDiagnosisReport(id) {
        if (confirm("Bạn có chắc sẽ xoá !")) {
            var url = `/diagnosisReport/${id}`;
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
    handleSavePDFPatientCode(dataExportBarCode) {
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        pdfMake.createPdf(dataExportBarCode).print();
    }
    handlegetListToPrintPatientCode(batchBarcode) {
        this.handleSavePDFPatientCode(this.renderPDFPatientCode(batchBarcode));
    }
    renderPDFPatientCode(batchBarcode) {
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
                        ]
                    }
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
    }

    handleSavePDFResultDiagnosisReport(dataDiagnosisReport) {
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        pdfMake.createPdf(dataDiagnosisReport).print();
    }
    handlePrintDiagnosisReport(dataDiagnosisReport) {
        this.handleSavePDFResultDiagnosisReport(this.renderPDFResultDiagnosisReport(dataDiagnosisReport));
    }
    renderPDFResultDiagnosisReport(dataDiagnosisReport) {
        const {t} = this.props;
        var imageLogo = this.state.imageLogo;
        var patientBarcode = FormatterUtils.convertTextToBarcode(dataDiagnosisReport.prescription.patient.code);
        var diagnosisDate = dataDiagnosisReport.diagnosisDate;
        var dataExport = {
            content: [
                    {
                        columns: [
                            imageLogo ? {
                                image: imageLogo,
                                fit: [100, 100],
                                alignment: 'left',
                                margin: [-20, -15, 0, 0],
                            } : "",
                            { image: patientBarcode, fit: [100, 100], alignment: 'right', margin: [0, -20, -10, 0] },
                        ]
                    },
                    {
                        columns: [
                            { text: "Mã BN:"+dataDiagnosisReport.prescription.patient.code, fontSize: 11, alignment: 'right', margin: [0, 0, -20, 0] },

                        ]
                    },

                    {text: 'PHÒNG KHÁM ĐA KHOA QUỐC TẾ TIMEC ' , fontSize: 15, alignment: 'center', bold: true },
                    {text: 'Địa Chỉ : Lô F-G, Chung cư TECCO TOWN, 4449 Nguyễn Cữu Phú, P.Tân Tạo A \n Q.Bình Tân, TP.HCM' , fontSize: 11, alignment: 'center' },
                    {text: 'Điện Thoại: 0879.115.115' , fontSize: 11, alignment: 'center' },
                   
                    {text: '\n\n' , fontSize: 15, alignment: 'center', bold: true },
  
                    {text: 'PHIẾU KẾT QUẢ ' , fontSize: 15, alignment: 'center', bold: true },
                    {text: dataDiagnosisReport.diagnosisService.name , fontSize: 11, alignment: 'center', bold: true },
                   
                    {
                        text: ['\n Họ và Tên : ', { text: dataDiagnosisReport.prescription.patient ? dataDiagnosisReport.prescription.patient.fullName : "...................................................................." },
                            "\t Giới tính: ", { text: t(dataDiagnosisReport.prescription.patient ? dataDiagnosisReport.prescription.patient.gender : "..................") },
                            "\t Ngày Sinh: ", { text: dataDiagnosisReport.prescription.patient ? DateUtils.formatDateForScreen(dataDiagnosisReport.prescription.patient.birthday): "......................" }], fontSize: 11, alignment: 'left'
                    },
                    {
                        columns: [
                            { text: '\n Địa chỉ: ' + (dataDiagnosisReport.prescription.patient ? dataDiagnosisReport.prescription.patient.address : ""), fontSize: 11, },
                        ]
                    },
                    {
                        columns: [
                            { text: '\n Số Điện Thoại: ' + (dataDiagnosisReport.prescription.patient  ? dataDiagnosisReport.prescription.patient.phone : ""), fontSize: 11 },
                        ]
                    },
                    {
                        columns: [
                            { text: '\n Bác Sĩ Chỉ Định : ' + (dataDiagnosisReport.prescription.user  ? dataDiagnosisReport.prescription.user.fullName : ""), fontSize: 11 },
                        ]
                    },
                    {
                        columns: [
                            { text: '\n Chẩn Đoán: ' , fontSize: 11 , alignment: 'left', bold: true},
                        ]
                    },
                    {
                        columns: [
                            { text: (dataDiagnosisReport.diagnose ? dataDiagnosisReport.diagnose : ""), fontSize: 11 },
                        ]
                    },
                    {
                        columns: [
                            { text: '\n Mô Tả: ' , fontSize: 11 , alignment: 'left', bold: true},
                        ]
                    },
                    {
                        columns: [
                            { text: '\n' + (dataDiagnosisReport.description ? dataDiagnosisReport.description : ""), fontSize: 11 },
                        ]
                    },
                    {
                        columns: [
                            { text: '', fontSize: 11 },
                            { text: '', fontSize: 11 },
                        ]
                    },

                  {
                        columns: [
                            {
                                text: '', alignment: 'center', fontSize: 11,
                            },
                            {
                                
                                text: '\n TP. Hồ Chí Minh, Ngày ' + moment(diagnosisDate).format("LL") + '\n\n Bác sĩ chuyên khoa \n\n\n' , alignment: 'center', fontSize: 11,
                            },
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

            }
        return dataExport;
        }
    render() {
        const { t, handleSubmit, submitting } = this.props;
        const data = this.state.listDiagnosisReport;
        var baseUrl = UrlUtils.getPathWithParamsNotPaging();
        const dataDiagnosisGroups = this.state.diagnosisGroups;
        if (!data) {
            return null;
        }
        var currentNo = 0;
        var page = qs.parse(this.props.location.search).page;
        if (!page) {
            page = 1;
        }

        let optionPrescriptionType = [
            {label: "Tất cả", value: ""},
            { label: "Bệnh Án", value: "PRESCRIPTION" },
            { label: "Khám Đoàn", value: "PRESCRIPTIONCOMPANY" }
        ]
        let optionInsuranceType = [
            {label: "Tất cả", value: "ALL"},
            { label: "Dịch Vụ", value: "1" },
            { label: "BHYT", value: "2" }
        ]
        let optionDiagnosisGroup = [{ label: "Tất Cả", value: '' }];
        if(dataDiagnosisGroups){
            dataDiagnosisGroups.map(item =>{
                optionDiagnosisGroup.push({label : item.name, value : item.id})
            })
        }
        var currentNo = ((page - 1) * 20);

        var rows = data.content.map(item => {
            currentNo++
            var Delete = ""

            var elementColor = ""
            if (item.status == "OPEN") {
                elementColor = <td style={{ 'color': '#0040ff' }}>{t(item.status)}</td>;
                Delete = <li><a onClick={() => this.deleteDiagnosisReport(item.id)}><i className="icon-cross2"></i>Xóa</a></li>;
            } else if (item.status == "IN_PROGRESS") {
                elementColor = <td style={{ 'color': '#ff0000' }}>{t(item.status)}</td>;
            }
            else if (item.status == "DONE") {
                elementColor = <td style={{ 'color': '#039296' }}>{t(item.status)}</td>;
            } else {
                elementColor = <td style={{ 'color': '#777' }}>{t(item.status)}</td>;
            }
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.diagnosisService ? item.diagnosisService.name : null}</td>
                    <td>{item.prescription ? item.prescription.id : null}</td>
                    <td>{item.prescription && item.prescription.patient ? item.prescription.patient.fullName : null}</td>
                    <td>{item.prescription && item.prescription.patient ? item.prescription.patient.code : null}</td>
                    <td>{item.prescription && item.prescription.user ? item.prescription.user.fullName : null}</td>
                    
                    <td>{item.description}</td>
                    <td>{moment(item.diagnosisDate).format("DD/MM/YYYY")}</td>
                    <td>{item.laboratorist && item.laboratorist ? item.laboratorist.fullName : null}</td>
                    {/* <td>{(item.hospital ? item.hospital.name : "")}</td> */}
                    {/* <td>{(item.hospital? item.hospital.name : "" )+ " - " + (item.prescription.department ? item.prescription.department.name  : "")}</td> */}

                    {elementColor}
                    <td className="text-center footable-visible footable-last-column">
                        <ul className="icons-list">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="icon-menu9"></i>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-right">
                                    
                                    <li><a onClick={() => this.handleShowmodal(item.id)}><i className="icon-pencil"></i>Nhập Kết Quả</a></li>
                                    {/* <td className="text-center footable-visible footable-last-column"> */}
                                    <li>  <a onClick={() => this.handlegetListToPrintPatientCode(item.prescription.patient.code)}><i className="icon-printer"></i>In Mã Bệnh Nhân</a></li>
                                    <li>  <a onClick={() => this.handlePrintDiagnosisReport(item)}><i className="icon-printer"></i>In Phiếu Kết Quả</a></li>
                                    {/* </td> */}
                                    {/* <li><a onClick={() => this.deleteDiagnosisReport(item.id)}><i className="icon-cross2"></i>Xóa</a></li> */}
                                    {Delete}
                                </ul>
                            </li>
                        </ul>
                    </td>
                </tr>);
        });
        return (
            <div className="content-wrapper">
                <div className="page-header page-header-default">
                    <div className="breadcrumb-line">
                        <ul className="breadcrumb">
                            <li><a href=""><i className="icon-home2 position-left"></i> Home</a> </li>
                            <li className="active">Chỉ Định</li>
                            <li className="active">Kết Quả Chỉ Định</li>
                        </ul>
                       
                    </div>
                </div>
                
                <form className="main-search" style={{paddingLeft : '10px'}} role="form" onSubmit={handleSubmit(this.updateListDiagnosisReport)} >
                    <div className="row">
                        <div className="col-md-2">
                            <Field name="prescriptionType" label="Hình Thức Khám" options={optionPrescriptionType} component={RenderSelect}></Field>
                        </div>
                        <div className="col-md-2">
                            <Field name="diagnosisGroup" label="Nhóm Dịch Vụ" options={optionDiagnosisGroup} component={RenderSelect}></Field>
                        </div>
                        <div className="col-md-2">
                            <Field name="insuranceType" label="Loại Dịch Vụ" options={optionInsuranceType} component={RenderSelect}></Field>
                        </div>
                        <div className="col-md-3">
                            <Field name="search" label="Mã Chỉ Định, Mã Bệnh Nhân" placeholder="Tìm Mã Chỉ Định PXN..., Mã Bệnh Nhân, Tên Bệnh Nhân..." component={RenderInputWithDiv}></Field>
                        </div>
                        <div className="col-md-3" style={{ paddingTop: "30px" }} >
                            <div className="pull-right">
                                <button type="submit" className="btn bg-success btn-xlg" disabled={submitting} >Tìm Kiếm</button>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="content">
                    <div className="row">
                        <div className="panel panel-flat">
                            <table className="table table-xxs table-bordered">
                                <thead>
                                    <tr className="bg-teal">
                                        <th rowSpan="2" data-toggle="true">Id</th>
                                        <th rowSpan="2" data-toggle="true">Dịch Vụ Chỉ Định</th>
                                        <th data-toggle="true">Mã Bệnh Án</th>
                                        <th data-toggle="true">Tên bệnh nhân</th>
                                        <th data-toggle="true">Mã bệnh nhân</th>
                                        <th data-toggle="true">Bác sĩ chỉ định</th>
                                        <th rowSpan="2" data-toggle="true">Kết Quả</th>
                                        <th rowSpan="2" data-toggle="true">Ngày Chỉ Định</th>
                                        <th rowSpan="2" data-toggle="true">Chuyên viên thực hiện</th>
                                        {/* <th rowSpan="2" data-toggle="true">Bệnh Viện - Chuyên Khoa</th> */}
                                        <th rowSpan="2" data-toggle="true">Trạng Thái</th>
                                        <th rowSpan="2" className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows}
                                </tbody>
                            </table>
                        </div>
                        {this.state.isDiagnosisReportModalShown ? <ModalDiagnosisReport
                            title="Báo cáo kết quả Chỉ Định"
                            idDiagnosisReport={this.state.idDiagnosisReport}
                            show={this.state.isDiagnosisReportModalShown}
                            onHide={this.handleHidemodal}
                            isEditale={true}
                        /> : null
                        }

                        <TablePagination data={data} baseUrl={baseUrl} />

                    </div>
                </div>
            </div>

        );
    }
}

export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'DiagnosisReportList',
            destroyOnUnmount: true,
            enableReinitialize: true,
        })(DiagnosisReportList)));