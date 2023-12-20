import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { PermanentCacheService } from '../../services/middleware';
import { DateUtils } from '../../utils/javascriptUtils';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import dateFns from 'date-fns';
import ModalAppointment from './ModalAppointment';
import moment from 'moment'
import { connect } from 'react-redux';
import { Field , formValueSelector, reduxForm} from 'redux-form';
import {  RenderDatePicker, RenderInputWithDiv} from '../../components/formInputs';
import { LoadingScreen } from '../../components/commonWidgets';

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

const selector = formValueSelector('AppointmentList');

const mapStateToProps = state => {
    return {
        fromDate: selector(state, "fromDate"),
        toDate: selector(state, "toDate"),
    };
};

const mapDispatchToProps = dispatch => ({
    updateField: (fieldName, value) =>
   dispatch({
       meta: { form: "AppointmentList", field: fieldName },
       payload: value,
       type: "@@redux-form/CHANGE"
   })
});

class AppointmentList extends React.Component {
    constructor() {
        super();
        let initialDate = new Date()
        initialDate = PermanentCacheService.getItem("selected_month") ? new Date(PermanentCacheService.getItem("selected_month")) : dateFns.setDate(initialDate, 1)
        this.state = {
            currentDate: initialDate,
            listAppointment: null,
            isAppointmentModalShown: false,
            objectappointment: null, 
            idAppointment: null
        }
        this.handleShowmodal = this.handleShowmodal.bind(this);
        this.handleSearchForm = this.handleSearchForm.bind(this);
        this.handleHidemodal = () => {
            const {fromDate, toDate} = this.props;
            this.setState({ isAppointmentModalShown: false });
            this.handleSearchForm({fromDate: fromDate, toDate: toDate });
        };
        

    };
    handleShowmodal(id) {
        this.setState({
            isAppointmentModalShown: true,
            idAppointment: id
        });
    }
   
    componentWillMount() {
        var startOfMonth = moment(new Date).startOf('month');
        var endOfMonth = moment(new Date).endOf('month');
        this.handleSearchForm({fromDate: startOfMonth, toDate: endOfMonth });
        const {updateField} = this.props;
        updateField("fromDate",startOfMonth);
        updateField("toDate",endOfMonth);
       
        
    };
  
    handleSearchForm(values) {
        var fromDate = moment(values.fromDate).format("YYYY-MM-DD-HH:mm:ss");
        var toDate = moment(values.toDate).format("YYYY-MM-DD-HH:mm:ss");
        var doctorNameOrPatientName = values.search;
        if (!doctorNameOrPatientName) {
            doctorNameOrPatientName = ''
        }
        var page = qs.parse(this.props.location.search).page;
        if (!page) {
            page = 1; }

        let setStateInRequest = (list) => { this.setState({ listAppointment: list }) }
        // return agent.asyncRequests.get('/transferForm/listAll'
        // if(fromDate != null && toDate != null){
            return agent.asyncRequests.getPage('/appointment/listFindByAppointmentDateBetween?fromDate='+ fromDate + '&toDate='+toDate
            + '&doctorNameOrPatientName=' + doctorNameOrPatientName, page
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
        // }else{
        //     return this.validate();
        // }
    } 

    deleteAppointment(id) {
        if (confirm("Bạn có chắc sẽ xoá !")) {
            var url = `/appointment/${id}`;
            return agent.asyncRequests.del(url
            ).then(function (res) {
                var result = res.body.resultData;
                if (result && !result.error) {
                    toast.success("Xóa Thành Công", { autoClose: 5000, position: toast.POSITION.TOP_RIGHT});
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
        const { handleSubmit, submitting} = this.props;
        const currentDate = new Date(this.state.currentDate.getTime());
        var search = qs.parse(this.props.location.search).search;
        const data = this.state.listAppointment;
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
                    <td>{moment(item.appointDate).format("DD/MM/YYYY")}</td>
                    <td>{moment(item.appointDate).format("HH:mm")}</td>
                    <td>{item.status}</td>
                    <td>{item.patient ? item.patient.fullName : null}</td>
                    <td>{item.patient ? DateUtils.formatDateForScreen(item.patient.birthday) : null}</td>
                    <td>{item.patient ? item.patient.phone : null}</td>
                    <td>{item.user ? item.user.fullName : null}</td>
                    <td>{item.department ? item.department.name : null}</td>
                    <td className="text-center footable-visible footable-last-column">
                        <ul className="icons-list">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="icon-menu9"></i>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-right">
                                    <li><a onClick={() => this.handleShowmodal(item.id)}><i className="icon-pencil"></i>Chỉnh Sửa</a></li>
                                    <li><a onClick={() => this.deleteAppointment(item.id)}><i className="icon-cross2"></i>Xóa</a></li>
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
                        <li className="active">Thông Báo</li>
                        <li className="active">Cuộc Hẹn</li>
                    </ul>
                    <ul className="breadcrumb-elements">
                        <li><button className="btn bg-teal" onClick={() => this.handleShowmodal()}>Thêm Mới</button></li>
                    </ul>
                </div>
            </div>
            <div className="content">
                <div className="row">                    
                        <div className="col-md-12">   
                        <form className="main-search" role="form">
                        <div>
                                        <form className="form-horizontal"  role="form" onSubmit={handleSubmit(this.handleSearchForm)} >
                                            <div className="row">
                                                <div className="page-header">
                                                  
                                                </div>
                                            </div>
                                            <div className="row">
                                                    <div className="col col-md-12">
                                                    <div className="col col-md-4">
                                                  
                                                        <div className="col col-md-6" style={{paddingLeft:"20px"}}>
                                                            <Field  label="Từ Ngày" name="fromDate" component={RenderDatePicker}></Field>
                                                        </div>
                                                        <div className="col col-md-6" style={{paddingLeft:"20px"}}>
                                                            <Field label="Đến Ngày" name="toDate"  component={RenderDatePicker}></Field>
                                                        </div>
                                                        </div>
                                                     
                                                        <div className="col col-md-7" style={{paddingLeft:"20px"}}>
                                                     
                                                            <Field label="Tìm Kiếm" name="search" placeholder="Tìm Tên Bác Sĩ, Bệnh Nhân..." autoFocus={true} component={RenderInputWithDiv}></Field>
                                                      
                                                        </div>
                                                        <div className="col col-md-1" style={{paddingLeft:"10px",paddingTop:"27px"}}>
                                                       
                                                        <button type="submit" className="btn bg-success btn-xlg" >Tìm</button>
                                                            
                                                      
                                                      
                                                      </div>
                                                        </div>
                                                    
                                            </div>
                                        </form>
                                    </div>
                                    </form>                       
                            <div className="panel panel-flat">
                                <table className="table table-xxs table-bordered">
                                    <thead>
                                        <tr className="bg-teal">
                                            <th data-toggle="true">STT</th>
                                            <th data-toggle="true">Ngày Hẹn</th>
                                            <th data-toggle="true">Giờ Hẹn</th>
                                            <th data-toggle="true">Nội Dung Cuộc Hẹn</th>
                                            <th data-toggle="true">Tên Bệnh Nhân</th>
                                            <th data-toggle="true">Ngày Sinh</th>
                                            <th data-toggle="true">Số Điện Thoại</th>
                                            <th data-toggle="true">Tên Bác Sĩ</th>
                                            <th data-toggle="true">Chuyên Khoa</th>                                        
                                            <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows}
                                    </tbody>
                                </table>
                            </div>
                            {this.state.isAppointmentModalShown ? <ModalAppointment 
                                title= {this.state.idAppointment ? "Chỉnh Sửa Cuộc Hẹn" : "Thêm Mới Cuộc Hẹn"} 
                                idAppointment={this.state.idAppointment} 
                                show={this.state.isAppointmentModalShown} 
                                onHide={this.handleHidemodal} /> : null
                            }
                        </div>
                        <TablePagination data={data} baseUrl="/listAppointment" />
                    </div>
                </div>
            </div>
            
        );
    }
}
export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'AppointmentList',
            destroyOnUnmount: true,
            enableReinitialize: true,
         validate
        })(AppointmentList)));