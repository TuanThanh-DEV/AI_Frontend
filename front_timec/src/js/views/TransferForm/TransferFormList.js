import dateFns from 'date-fns';
import moment from 'moment';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import qs from 'query-string';
import React from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Field, reduxForm } from 'redux-form';
import { LoadingScreen } from '../../components/commonWidgets';
import { RenderDatePicker } from '../../components/formInputs';
import agent from '../../services/agent';
import { PermanentCacheService } from '../../services/middleware';
import { FormatterUtils } from '../../utils/javascriptUtils';
import { LOAD_UPDATING_TRANSFERFORM } from './action-types';
import { printTransferFormPDF } from './ModalPDFTransferFrom';
import ModalTransferForm from './ModalTransferForm';
const validate = values => {
    const errors = {};
    if (!values.fromDate) {
        errors.fromDate = "Vui lòng nhập ngày bắt đầu..."
    }
    if (!values.toDate) {
        errors.toDate = "Vui lòng nhập Ngày kết thúc..."
    }
    if (moment(values.toDate) < moment(values.fromDate)) {
        errors.toDate = 'Ngày kết thúc nhỏ hơn ngày bắt đầu!, vui lòng thử lại!'
    }
    return errors;
}
const mapStateToProps = state => {
    var updateValue = {
        ...state.transferFormReducer.updatingTransferForm,
        fromDate: state.transferFormReducer.updatingTransferForm && state.transferFormReducer.updatingTransferForm.fromDate ? moment(state.transferFormReducer.updatingTransferForm.fromDate) : null,
        toDate: state.transferFormReducer.updatingTransferForm && state.transferFormReducer.updatingTransferForm.toDate ? moment(state.transferFormReducer.updatingTransferForm.toDate) : null,
    };
    return {
        initialValues: updateValue,
    };
};

const mapDispatchToProps = dispatch => ({
    loadTransferForm: (payload) =>
        dispatch({ type: LOAD_UPDATING_TRANSFERFORM, payload: payload }),
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "TransferFormList", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});
const FormDate = (props) => {
    const { handleSearchDate, handleSubmit, today, submitting } = props;
    return submitting ? <LoadingScreen /> : <form className="form-horizontal" role="form" onSubmit={handleSubmit(handleSearchDate)} >
        <div className="form-group">
            <div className="row">
                <div className="page-header">
                    <h4>
                        {/* TODO add incon menu serch */}
                        <p className="font-weight-bold" style={{ paddingLeft: "10px", fontWeight: "bold" }}>Chọn Khoảng Thời Gian Hiển Thị Danh Sách</p></h4>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="col col-md-3">
                        <div className="form-group">
                            <Field name="fromDate" label="Từ Ngày" component={RenderDatePicker}></Field>
                        </div>
                    </div>
                    <div className="col col-md-3"> <div className="form-group">
                        <Field name="toDate" label="Đến ngày" component={RenderDatePicker}></Field>
                    </div>
                    </div>
                    <div className="col col-md-6" style={{ paddingTop: "30px" }}> <div className="form-group">
                        <div className="pull-left">
                            <button type="submit" className="btn bg-teal btn-xlg" >Tìm Theo Khoảng Thời Gian</button>
                        </div>
                        <div className="pull-right">
                            <button type="button" className="btn btn-primary" onClick={today}>Tìm Theo Tháng Hiện Tại</button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
}

class TransferFormList extends React.Component {
    constructor() {
        super();
        let initialDate = new Date()
        initialDate = PermanentCacheService.getItem("selected_month") ? new Date(PermanentCacheService.getItem("selected_month")) : dateFns.setDate(initialDate, 1)
        this.state = {
            currentDate: initialDate,
            listTransferForm: null,
            isTransferFormModalShown: false,
            objecttransferForm: null,
            idTransferForm: "",
            TransferForm: [],
            imageLogo: ""
        }
        this.handleShowmodal = this.handleShowmodal.bind(this);
        this.handleSearchDate = this.handleSearchDate.bind(this);
        this.handleHidemodal = () => {
            this.setState({ isTransferFormModalShown: false, });
            this.updateListTransferForm();
        };

        this.today = () => {
            let today = new Date()
            today = dateFns.setDate(today, 1)
            PermanentCacheService.setItem("selected_month", today);
            this.setState({ currentDate: today }, () => {
                this.updateListTransferForm();
            })
        }

        this.handlePrintPdf = (transferFormObj) => {
            var dataExport = printTransferFormPDF.getTransferFormDataExport(transferFormObj, this.state.imageLogo, this.props)
            if (dataExport) {
                pdfMake.vfs = pdfFonts.pdfMake.vfs;
                pdfMake.createPdf(dataExport).print();
            }
        }

    };



    handleShowmodal(id) {
        this.setState({
            isTransferFormModalShown: true,
            idTransferForm: id
        });
    }
    updateListTransferForm() {
        var search = qs.parse(this.props.location.search).search;
        var page = qs.parse(this.props.location.search).page;
        const currentDate = this.state.currentDate;
        var startDateOfMonth = moment(dateFns.startOfMonth(currentDate)).format("YYYY-MM-DD-HH:mm:ss");
        var endDateOfMonth = moment(dateFns.lastDayOfMonth(currentDate)).format("YYYY-MM-DD-HH:mm:ss");
        // var search = qs.parse(this.props.location.search).search;
        // var page = qs.parse(this.props.location.search).page;
        let setStateInRequest = (list) => { this.setState({ listTransferForm: list }) }
        if (search != null) {
            return (agent.TransferFormApi.listTransferForm(search, page
            ).then(function (res) {
                var result = res.body.resultData.content;
                if (result) {
                    setStateInRequest(result);
                }
                else {
                    toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
            }))
        } else {
            return agent.asyncRequests.get('/transferForm/listFindByTransferDateBetween?startDate=' + startDateOfMonth + '&endDate=' + endDateOfMonth
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
    }
    componentWillMount() {
        this.updateListTransferForm();
        var url = '/assets/images/logo_timec.png';
        FormatterUtils.downloadImageDataUri(url, this, "imageLogo");
    };

    handleSearchDate(values) {
        const { destroy } = this.props;
        var fromDate = moment(values.fromDate).format("YYYY-MM-DD-HH:mm:ss");
        var toDate = moment(values.toDate).format("YYYY-MM-DD-HH:mm:ss");
        let setStateInRequest = (list) => { this.setState({ listTransferForm: list }) }
        // return agent.asyncRequests.get('/transferForm/listAll'
        // if(fromDate != null && toDate != null){
        return agent.asyncRequests.get('/transferForm/listFindByTransferDateBetween?fromDate=' + fromDate + '&toDate=' + toDate
        ).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                destroy();
                setStateInRequest(result);
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        })
        // }else{
        //     return this.validate();
        // }
    }

    deleteTransferForm(id) {
        if (confirm("Bạn có chắc sẽ xoá !")) {
            var url = `/transferForm/${id}`;
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

    render() {
        const { handleSubmit, submitting } = this.props;
        const currentDate = new Date(this.state.currentDate.getTime());
        var search = qs.parse(this.props.location.search).search;
        const data = this.state.listTransferForm;
        if (!data) {
            return null;
        }
        var currentNo = 0;
        var page = qs.parse(this.props.location.search).page;
        if (!page) {
            page = 1;
        }
        var currentNo = ((page - 1) * 20);
        var rows = data.map(item => {
            currentNo++
            return (
                <tr key={item.id}>
                    <td>{currentNo}</td>
                    <td>{item.barCode}</td>
                    <td>{item.prescription && item.prescription.patient ? item.prescription.patient.fullName : "N/A"}</td>
                    <td>{item.transferHospital ? item.transferHospital.name : "N/A"}</td>
                    {/* <td>{item.createdBy ? item.createdBy.fullName : "N/A"}</td> */}

                    {/* <td>{item.cls}</td> */}
                    {/* <td>{item.diagnosisReports}</td> */}
                    {/* <td>{item.analysis}</td> */}
                    {/* <td>{item.therapyNote}</td> */}
                    <td>{item.transferReason}</td>
                    <td>{item.patientStatus}</td>
                    <td>{item.createdDate}</td>
                    <td>{item.transferDate}</td>
                    {/* <td>{item.treatmentGuide}</td> */}
                    {/* <td>{item.transportMethod}</td> */}
                    {/* <td>{item.transportPerson}</td> */}
                    {/* <td>{item.shouldReview ? "Có" : "Không"}</td> */}
                    <td className="text-center footable-visible footable-last-column">
                        <ul className="icons-list">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="icon-menu9"></i>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-right">
                                    <li><a onClick={() => this.handlePrintPdf(item)}><i className="icon-file-pdf"></i>In PDF</a></li>
                                    <li><a onClick={() => this.handleShowmodal(item.id)}><i className="icon-pencil"></i>Chỉnh Sửa</a></li>
                                    <li><a onClick={() => this.deleteTransferForm(item.id)}><i className="icon-cross2"></i>Xóa</a></li>
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
                            <li className="active">Khám Bệnh</li>
                            <li className="active">Danh Sách Giấy Chuyển Viện</li>
                        </ul>
                        <div className="heading-elements">
                            <div className="heading-btn-group">
                                {/* TODO  create a new TransferForm to PrescriptionId Or PatientId */}
                                {/* <button className="btn bg-teal" onClick={() => this.handleShowmodal()}>Thêm Mới</button> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="panel panel-flat">
                                <div className="panel-body">
                                    <form className="main-search" role="form">
                                        <div>
                                            <FormDate handleSearchDate={this.handleSearchDate}
                                                today={this.today}
                                                handleSubmit={handleSubmit}
                                                submitting={submitting} >
                                            </FormDate>
                                        </div>
                                        <div className="input-group content-group">
                                            <div className="has-feedback has-feedback-left">
                                                <input type="text" className="form-control input-xlg" placeholder="Tìm kiếm theo mã bệnh án ..." name="search" defaultValue={search} autoFocus={true} />
                                                <div className="form-control-feedback">
                                                    <i className="icon-search4 text-muted text-size-base"></i>
                                                </div>
                                            </div>
                                            <div className="input-group-btn">
                                                <button type="submit" className="btn bg-teal btn-xlg">Tìm</button>
                                            </div>
                                        </div>
                                    </form>

                                </div>
                            </div>
                            <div className="panel panel-flat">
                                <table className="table table-xxs table-bordered">
                                    <thead>
                                        <tr className="bg-teal">
                                            <th data-toggle="true"><center>STT</center></th>
                                            <th data-toggle="true"><center>Mã</center></th>
                                            <th data-toggle="true"><center>Tên Bệnh Nhân</center></th>
                                            <th data-toggle="true"><center>Bệnh Viện Chuyển Đi</center></th>
                                            {/* <th data-toggle="true"><center>Người Lập</center></th> */}
                                            <th data-toggle="true"><center>Lý Do Chuyển Viện</center></th>
                                            <th data-toggle="true"><center>Tình Trạng Bệnh Nhân</center></th>
                                            <th data-toggle="true"><center>Ngày Lập</center></th>
                                            <th data-toggle="true"><center>Ngày Chuyển Viện</center></th>
                                            {/* <th data-toggle="true"><center>Dấu Hiệu Lâm Sàng</center></th> */}
                                            
                                            {/* <th data-toggle="true"><center>Chẩn Đoán</center></th> */}
                                            {/* <th data-toggle="true"><center>Phương Pháp Điều Trị</center></th> */}
                                            {/* <th data-toggle="true"><center>Hướng Điều Trị</center></th> */}
                                            {/* <th data-toggle="true"><center>Phương Pháp Vận Chuyển</center></th> */}
                                            {/* <th data-toggle="true"><center>Người Đưa Đi</center></th> */}
                                            {/* <th data-toggle="true"><center>Nội Dung Chuyên Môn Cần Rút Ki/nh Nghiệm</center></th> */}


                                            <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows}
                                    </tbody>
                                </table>
                            </div>
                            {this.state.isTransferFormModalShown ? <ModalTransferForm
                                title="Giấy Chuyển Viện"
                                idTransferForm={this.state.idTransferForm}
                                show={this.state.isTransferFormModalShown}
                                onHide={this.handleHidemodal} /> : null
                            }

                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'TransferFormList',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(TransferFormList)));