import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { ScriptUtils } from '../../utils/javascriptUtils';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import {  RenderDatePicker, RenderInputWithDiv, RenderSelect} from '../../components/formInputs';
import { connect } from 'react-redux';
import { Field , reduxForm} from 'redux-form';
import ModalPrescriptionReview from './ModalPrescriptionReview';
import moment from 'moment';
const validate = values => {
    const errors = {};
    // if(!values.fromDate){
    //     errors.fromDate = "Vui lòng nhập ngày bắt đầu..."
    // }
    // if(!values.toDate){
    //     errors.toDate = "Vui lòng nhập Ngày kết thúc..."
    // }
    if (moment(values.toDate) < moment(values.fromDate) ) {
        errors.toDate = 'Ngày kết thúc nhỏ hơn ngày bắt đầu!, vui lòng thử lại!'
    }
    return errors;
}
const mapStateToProps = state => {
    // var updateValue = {
    //     toDate: new Date(),
    //     search: 'hihi'
    // };
    // return {
    //     initialValues: updateValue,
    // };
};

const mapDispatchToProps = dispatch => ({
    updateField: (fieldName, value) =>
   dispatch({
       meta: { form: "PrescriptionReviewList", field: fieldName },
       payload: value,
       type: "@@redux-form/CHANGE"
   })
});
class PrescriptionReviewList extends React.Component {
    constructor() {
        super();
        this.state = {
            listPrescriptionReview: null,
            isPrescriptionReviewModalShown: false,
            objectprescriptionReview: null, 
            idPrescriptionReview: null,
            listAllUser:[],
        }
        this.handleShowmodal = this.handleShowmodal.bind(this);
        this.handleSearchForm = this.handleSearchForm.bind(this);
        this.handleHidemodal = () => {
            this.setState({ isPrescriptionReviewModalShown: false });
            var startOfMonth = moment(new Date).startOf('month');
            var endOfMonth = moment(new Date).endOf('month');
            this.handleSearchForm({fromDate: startOfMonth, toDate: endOfMonth });
        };

    };
    handleShowmodal(id) {
        this.setState({
            isPrescriptionReviewModalShown: true,
            idPrescriptionReview: id
        });
    }
    getlistAllPersonel(){
        let setStateInRequest = (list) => { this.setState({ listAllUser: list }) }
        return agent.UserApi.listAllPersonel().then(function (res) {
            var result = res.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    }
    componentWillMount() {
        this.handleSearchForm({fromDate: startOfMonth, toDate: endOfMonth });
        const {updateField} = this.props;
        var startOfMonth = moment(new Date).startOf('month');
        var endOfMonth = moment(new Date).endOf('month');
        updateField("fromDate",startOfMonth);
        updateField("toDate",endOfMonth);
        this.getlistAllPersonel();
        
    };

    handleSearchForm(values) {
        var fromDate = moment(values.fromDate).startOf('month').format("YYYY-MM-DD-HH:mm:ss");
        var toDate = moment(values.toDate).endOf('month').format("YYYY-MM-DD-HH:mm:ss");

        var prescriptionId = values.prescriptionId;
        if (!prescriptionId) {
            prescriptionId = 'ALL'
        }
        var doctorId = values.doctorId;
        if (!doctorId) {
            doctorId = 'ALL'
        }
        var reviewerId = values.reviewerId;
        if (!reviewerId) {
            reviewerId = 'ALL'
        }
        
        var page = qs.parse(this.props.location.search).page;
        if (!page) {
            page = 1; }
          
           
        let setStateInRequest = (list) => { this.setState({ listPrescriptionReview: list }) }
        
            return agent.asyncRequests.getPage('/prescriptionReview/listFindByPrescriptionReview?fromDate='+ fromDate + '&toDate='+toDate
            + '&doctorId=' + doctorId + '&reviewerId=' +  reviewerId  + '&prescriptionId='+ prescriptionId, page
                ).then(function (res) {
                    var result = res.body.resultData;
                    if (result) {
                     
                        setStateInRequest(result);
                    } else {
                        toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                    }
                }, function (err) {
                    toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                    +" Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
                })
    } 
    deletePrescriptionReview(id) {
        if (confirm("Bạn có chắc sẽ xoá !")) {
            var url = `/prescriptionReview/${id}`;
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
        var optionUserPersonel = []; 
           this.state.listAllUser.map(item=>{
               optionUserPersonel.push({label:item.fullName,value:item.id})
           })
        const {t,handleSubmit, submitting} = this.props;
        var search = qs.parse(this.props.location.search).search;
        const data = this.state.listPrescriptionReview;
        if (!data) {
            return null; }
        var currentNo = 0;
        var page = qs.parse(this.props.location.search).page;
        if (!page) {
            page = 1; }
        var currentNo = ((page - 1) * 20);
        var rows = data.content.map(item => {
            currentNo++
            return (
                <tr key={item.id}>
                    <td>{currentNo}</td>
                    <td>{item.reviewer?item.reviewer.fullName:null}</td>
                    <td>{item.prescription?(item.prescription.user.fullName+' - ' + item.prescription.department.name):null} - {item.prescription?item.prescription.id:null}</td>
                    <td>{item.doctor?item.doctor.fullName:null}</td>
                    <td>{item.score}</td>
                    <td>{item.createdDate? moment(item.createdDate).format("DD/MM/YYYY HH:mm"):null}</td>
                    <td>{item.dueDate? moment(item.dueDate).format("DD/MM/YYYY HH:mm"):null}</td>
                    <td>{item.finishDate? moment(item.finishDate).format("DD/MM/YYYY HH:mm"):null}</td>
                    <td>{item.note}</td>
                    <td>{t(item.status)}</td>
                  
                    <td className="text-center footable-visible footable-last-column">
                        <ul className="icons-list">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="icon-menu9"></i>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-right">
                                    <li><a onClick={() => this.handleShowmodal(item.id)}><i className="icon-pencil"></i>Chỉnh Sửa</a></li>
                                    <li><a onClick={() => this.deletePrescriptionReview(item.id)}><i className="icon-cross2"></i>Xóa</a></li>
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
                        <li className="active">Chấm Công</li>
                        <li className="active">Phân Công Chấm Công</li>
                    </ul>
                    <div className="heading-elements">
							<div className="heading-btn-group">
                            <button className="btn bg-teal" onClick={() => this.handleShowmodal()}>Thêm Mới</button>
							</div>
						</div>
                </div>
            </div>
            <div className="content">
    <div className="row">
        <div className="col-md-12">
            <div>
                <form className="form-horizontal" role="form" onSubmit={handleSubmit(this.handleSearchForm)}>
                    <div className="row">
                        <div className="page-header"> </div>
                    </div>
                    <div className="row">
                        <div className="col col-md-12">
                            <div className="col col-md-4">
                                <div className="col col-md-6" style={{paddingLeft: "20px"}}>
                                    <Field label="Từ Ngày" name="fromDate" component={RenderDatePicker}></Field>
                                </div>
                                <div className="col col-md-6" style={{paddingLeft: "20px"}}>
                                    <Field label="Đến Ngày" name="toDate" component={RenderDatePicker}></Field>
                                </div>
                            </div>
                            <div className="col col-md-2">
                                <Field name="doctorId" label="Bác Sĩ Chẩn Đoán" options={optionUserPersonel} component={RenderSelect}></Field>
                            </div>
                            <div className="col col-md-2" style={{paddingLeft: "20px"}}>
                                <Field name="reviewerId" label="Bác Sĩ Chấm Điểm" options={optionUserPersonel} component={RenderSelect}></Field>
                            </div>
                            <div className="col col-md-3" style={{paddingLeft: "20px"}}>
                                <Field label="Tìm Kiếm" name="prescriptionId" placeholder="Tìm Mã Bệnh Án..." autoFocus={true} component={RenderInputWithDiv}></Field>
                            </div>
                            <div className="col col-md-1" style={{paddingLeft: "10px",paddingTop: "27px"}}>
                                <button type="submit" className="btn bg-success btn-xlg">Tìm</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>  
                            <div className="panel panel-flat">
                                <table className="table table-xxs table-bordered">
                                    <thead>
                                        <tr className="bg-teal">
                                            <th data-toggle="true">STT</th>
                                            <th data-toggle="true">Người Chấm Điểm</th>
                                            <th data-toggle="true">Phiếu Khám</th>
                                            <th data-toggle="true">Bác Sĩ</th>
                                            <th data-toggle="true">Điểm</th>
                                            <th data-toggle="true">Ngày Chấm Điểm</th>
                                            <th data-toggle="true">Thời Hạn</th>
                                            <th data-toggle="true">Ngày Hoàn Thành</th>
                                            <th data-toggle="true">Ghi Chú</th>
                                            <th data-toggle="true">Trạng Thái</th>
                                            <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows}
                                    </tbody>
                                </table>
                            </div>
                            {this.state.isPrescriptionReviewModalShown ? <ModalPrescriptionReview 
                                title={this.state.idPrescriptionReview?"Chỉnh Sửa Chấm Điểm":"Thêm Chấm Điểm"}
                                idPrescriptionReview={this.state.idPrescriptionReview} 
                                show={this.state.isPrescriptionReviewModalShown} 
                                onHide={this.handleHidemodal} /> : null
                            }
                        </div>
                        <TablePagination data={data} baseUrl="/listPrescriptionReview" />  
                    </div>
                </div>
            </div>
            
        );
    }
}
export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'PrescriptionReviewList',
            destroyOnUnmount: true,
            enableReinitialize: true,
         validate
        })(PrescriptionReviewList)));