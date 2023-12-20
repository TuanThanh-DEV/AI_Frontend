import React from 'react';
import { connect } from 'react-redux';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import agent from '../../services/agent';
import {RenderSelect, RenderTextArea, RenderTextAreaShortCode} from '../../components/formInputs';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LOAD_UPDATING_PRESCRIPTION } from './action-types';
import { LoadingScreen } from '../../components/commonWidgets';
import { DateUtils } from '../../utils/javascriptUtils';
import moment from 'moment';
import ListFile from '../../components/ListFile';

const validate = values => {
    const errors = {};

    return errors;
}

const selector = formValueSelector("PrescriptionSummaryEdit");

var today = new Date;
const mapStateToProps = state => {
    var updateValue = {
        ...state.prescriptionReducer.updatingPrescription,
    };
    return {
        initialValues: updateValue,
        patient: updateValue.patient,
        arriveTime: updateValue.arriveTime
    };
};

const mapDispatchToProps = dispatch => ({
    loadPrescription: (payload) =>
        dispatch({ type: LOAD_UPDATING_PRESCRIPTION, payload: payload }),
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "PrescriptionSummaryEdit", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});

class PrescriptionSummaryEdit extends React.Component {
    constructor() {
        super();
        this.state = {
            listShortCodes: [],
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.getDataExport = this.getDataExport.bind(this);
        this.getMyShortCodes = this.getMyShortCodes.bind(this);

        this.handleSavePDF = (values) => {
            var dataExport = this.getDataExport(values);
            pdfMake.vfs = pdfFonts.pdfMake.vfs;
            pdfMake.createPdf(dataExport).print();
        }
    }

    getMyShortCodes() {
        let setStateInRequest = (list) => { this.setState({ listShortCodes: list }) }
        return agent.ShortCodeApi.listMyShortCode(
        ).then(function (res) {
            var result = res.resultData;
            if (result) {
                var list = result.map(item => {
                    return { shortCode: item.shortcode, replaceText: item.replaceText };
                });
                setStateInRequest(list);
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });

    }

    getDataExport(prescription) {
        const { t, prescriptionId } = this.props;
        var prescriptionDate = this.props.arriveTime;
        var patient = this.props.patient;
        
        var dataExport = {
            content: [
                {text: ' ' , fontSize: 15, alignment: 'center', bold: true },
                {text: ' ' , fontSize: 15, alignment: 'center', bold: true },
                {text: ' ' , fontSize: 15, alignment: 'center', bold: true },

                // {text: 'PHÒNG KHÁM ĐA KHOA QUỐC TẾ TIMEC ' , fontSize: 15, alignment: 'center', bold: true },
                // {text: 'Địa Chỉ : Lô F-G, Chung cư TECCO TOWN, 4449 Nguyễn Cữu Phú, P.Tân Tạo A \n Q.Bình Tân, TP.HCM' , fontSize: 11, alignment: 'center' },
                // {text: 'Điện Thoại: 0879.115.115' , fontSize: 11, alignment: 'center' },
                
                { text: '\n PHIẾU KẾT LUẬN KHÁM TỔNG QUÁT', fontSize: 15, alignment: 'center' },
                

                {
                    text: ['\n Họ và Tên : ', { text: patient ? patient.fullName : "...................................................................." },
                        "\t Giới tính: ", { text: t(patient ? patient.gender : "..................") },
                        "\t Ngày Sinh: ", { text: patient ? DateUtils.formatDateForScreen(patient.birthday) : "......................" }], fontSize: 11, alignment: 'left'
                },

                {
                    columns: [
                        { text: '\n Địa chỉ: ' + (patient && patient.address ? patient.address : ""), fontSize: 11, },


                    ]
                },
                {
                    columns: [
                        { text: ['\n Số Điện Thoại: ' + (patient && patient.phone ? patient.phone : ""), 
                        "\t Mã Bệnh Nhân: " + patient.code], fontSize: 11 },
                         
                    ]
                },
                {
                    columns: [
                        { text: '\n I. PHÂN LOẠI SỨC KHỎE: ' + prescription.summary0, fontSize: 11 },
                    ]
                },
                {
                    columns: [
                        { text: '\n II. CÁC DẤU HIỆU BẤT THƯỜNG ', fontSize: 11 },
                    ]
                },
                {
                    columns: [
                        { text: '\n ' + prescription.summary1, fontSize: 11 },
                    ]
                },
                {
                    columns: [
                        { text: '\n III. BẤT THƯỜNG CẬN LÂM SÀNG', fontSize: 11 },
                    ]
                },
                {
                    columns: [
                        { text: '\n ' + prescription.summary2, fontSize: 11 },
                    ]
                },
                {
                    columns: [
                        { text: '\n IV. TƯ VẤN ', fontSize: 11 },
                    ]
                },
                {
                    columns: [
                        { text: '\n ' + (prescription.summary3 ? prescription.summary3 : ''), fontSize: 11 },
                    ]
                },
                {
                    columns: [
                        { text: '\n V. ĐỀ NGHỊ KHÁM CHUYÊN KHOA / XÉT NGHIỆM LẠI ', fontSize: 11 },
                    ]
                },
                {
                    columns: [
                        { text: '\n ' + (prescription.summary4 ? prescription.summary4 : 'Không có.'), fontSize: 11 },
                    ]
                },
                
                
                {
                    columns: [
                        {
                            text: '\n\n\n  \n\n\n' , alignment: 'center', fontSize: 11,
                        },
                        {
                            text: '', alignment: 'center', fontSize: 11,
                        },
                        {

                            text: '\n Ngày ' + moment(prescriptionDate).format("LL") + '\n\n BÁC SĨ KẾT LUẬN \n\n\n' , alignment: 'center', fontSize: 11,

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

        }
        return dataExport;
    }
    
    componentWillMount() {
        const {loadPrescription, prescriptionId} = this.props;
        if (prescriptionId) {
            const dataPromise = agent.PrescriptionApi.getPrescription(prescriptionId);
            loadPrescription(Promise.resolve(dataPromise))
        }
        this.getMyShortCodes();
        return;
    }

    handleAdd(values) {
        const {loadPrescription} = this.props;
        var prescriptionId = this.props.prescriptionId;
        var url = '/prescription/updateSummary';
        var bodyObject = {
            id: prescriptionId,
            summary0: values.summary0,
            summary1: values.summary1,
            summary2: values.summary2,
            summary3: values.summary3,
            summary4: values.summary4,
            prescriptionSummaryFile: values.prescriptionSummaryFile,
            
        };
        let setStateInRequest = (objPrescription) => {
            this.setState({
                currentPrescription: objPrescription
            })
        }
        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && result.id) {
                setStateInRequest(result);
                // reload again the object for parent screen
                const dataPromise = agent.PrescriptionApi.getPrescription(prescriptionId);
                loadPrescription(Promise.resolve(dataPromise));
                toast.info("Đã cập nhật kết quả thành công", { autoClose: 8000 });
            } else {
                toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    }
    
    render() {
        const {  handleSubmit, submitting, invalid, } = this.props;
        var optionHealthTypes = [
            {label: "I. Rất khoẻ. Đủ sức khoẻ làm việc, công tác, và học tập.", value: "I. Rất khoẻ. Đủ sức khoẻ làm việc, công tác, và học tập."},
            {label: "II. Khoẻ. Đủ sức khoẻ làm việc, công tác, và học tập.", value: "II. Khoẻ. Đủ sức khoẻ làm việc, công tác, và học tập."},
            {label: "III. Trung bình. Đủ sức khoẻ làm việc, công tác, và học tập.", value: "III. Trung bình. Đủ sức khoẻ làm việc, công tác, và học tập."},
            {label: "IV. Yếu.", value: "IV. Yếu."},
            {label: "V. Rất yếu.", value: "V. Rất yếu."},
        ];

        var listShortCodes = this.state.listShortCodes;
        
        var editView =
            <div className="content-wrapper">
                
                <div className="content">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h6 className="">Phiếu Kết Luận Khám Tổng Quát </h6>
                            <div class="heading-elements"><i className="icon-arrow-down132"></i><i>Vui lòng điền thông tin kết quả. Sau đó lưu và in bên dưới.</i></div>
                        </div>
                        <div className="panel-body">
                            {submitting ? <LoadingScreen /> :
                                <form className="form-horizontal" role="form" onSubmit={handleSubmit(this.handleAdd)}>
                                    <div className="row">
                                    <div className="form-group">

                                        <div className="col-md-12">
                                        <Field name="summary0" label="I. PHÂN LOẠI SỨC KHỎE" options={optionHealthTypes} component={RenderSelect}></Field>
                                        </div>
                                        <div className="col-md-12" style={{paddingTop:'10px'}}>
                                        <Field name="summary1" label="II. CÁC DẤU HIỆU BẤT THƯỜNG" placeholder="Nhập các dấu hiệu, có thể gõ tắt..." 
                                        component={RenderTextAreaShortCode} rows={5} listShortCodes={listShortCodes}></Field>
                                        </div>                                        
                                        <div className="col-md-12" style={{paddingTop:'10px'}} >
                                        <Field name="summary2" label="III. BẤT THƯỜNG CẬN LÂM SÀNG" placeholder="Nhập các bất thường, có thể gõ tắt..." 
                                        component={RenderTextAreaShortCode} rows={5} listShortCodes={listShortCodes}></Field>
                                        </div>
                                        <div className="col-md-12" style={{paddingTop:'10px'}}>
                                        <Field name="summary3" label="IV. TƯ VẤN" placeholder="Nhập nội dung tư vấn..." 
                                        component={RenderTextAreaShortCode} rows={5} listShortCodes={listShortCodes}></Field>
                                        </div>
                                        <div className="col-md-12" style={{paddingTop:'10px'}}>
                                        <Field name="summary4" label="V. ĐỀ NGHỊ KHÁM CHUYÊN KHOA / XÉT NGHIỆM THÊM" placeholder="Nhập các đề nghị, có thể gõ tắt..." 
                                        component={RenderTextAreaShortCode} rows={5} listShortCodes={listShortCodes}></Field>
                                        </div>

                                        <div className="col-md-12" style={{paddingTop:'10px'}}>
                                            <Field name="prescriptionSummaryFile" label="File Kết Quả" component={ListFile} fileTitle="Upload File Kết Quả Tổng Quát" modalUrl="/uploadPrescriptionSummaryFile"></Field>
                                        </div>

                                    </div>
                                    </div>
                                        
                                    <div className="text-right">
                                        <button onClick={handleSubmit(this.handleAdd)} className="btn btn-primary" disabled={submitting || invalid}> Lưu Kết Luận</button>
                                        <a className="btn btn-warning" onClick={handleSubmit(this.handleSavePDF)}><i className="icon-printer"></i> In Phiếu Kết Luận</a>
                                    </div>
                                </form>
                            }
                        </div>
                    </div>
                </div>
            </div >
        return editView;
    }
};

export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'PrescriptionSummaryEdit',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(PrescriptionSummaryEdit)));
