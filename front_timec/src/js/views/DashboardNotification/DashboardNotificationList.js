import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import { ScriptUtils } from '../../utils/javascriptUtils';
import { FormatterUtils } from '../../utils/javascriptUtils';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment'
import ModalDashboardNotification from './ModalDashboardNotification';
import { RenderDatePicker, RenderInputWithDiv, RenderSelect } from '../../components/formInputs';


const validate = values => {
    const errors = {};
    // if(!values.fromDate){
    //     errors.fromDate = "Vui lòng nhập ngày bắt đầu..."
    // }
    // if(!values.toDate){
    //     errors.toDate = "Vui lòng nhập Ngày kết thúc..."
    // }
    if (moment(values.toDate) < moment(values.fromDate)) {
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
            meta: { form: "DashboardNotificationList", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});
class DashboardNotificationList extends React.Component {
    constructor() {
        super();
        this.state = {
            listDashboardNotification: null,
            isDashboardNotificationModalShown: false,
            objectdashboardNotification: null, 
            listAllHospital:[],
            idDashboardNotification: null
        }
        this.handleShowmodal = this.handleShowmodal.bind(this);
        this.handleSearchForm = this.handleSearchForm.bind(this);
        this.handleHidemodal = () => {
            this.setState({ isDashboardNotificationModalShown: false });
            var startOfMonth = moment(new Date).startOf('month');
            var endOfMonth = moment(new Date).endOf('month');
            this.handleSearchForm({fromDate: startOfMonth, toDate: endOfMonth });
        };

    };
    handleShowmodal(id) {
        this.setState({
            isDashboardNotificationModalShown: true,
            idDashboardNotification: id
        });
    }
    updateListDashboardNotification(){
        var search = qs.parse(this.props.location.search).search;
        var page = qs.parse(this.props.location.search).page;
        let setStateInRequest = (list) => { this.setState({ listDashboardNotification: list }) }
        return agent.DashboardNotificationApi.listDashboardNotification(search, page
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
        });

    }
    componentWillMount() { 
        var startOfMonth = moment(new Date).startOf('month');
        var endOfMonth = moment(new Date).endOf('month');
        this.handleSearchForm({fromDate: startOfMonth, toDate: endOfMonth });
        const {updateField} = this.props;
        updateField("fromDate",startOfMonth);
        updateField("toDate",endOfMonth);
        updateField("hospitalId",'ALL');
        this.getlistAllHospital();
    };


    
    handleSearchForm(values) {
        var fromDate = moment(values.fromDate).format("YYYY-MM-DD-HH:mm:ss");
        var toDate = moment(values.toDate).format("YYYY-MM-DD-HH:mm:ss");
        var titleOrdescription = values.search;
        if (!titleOrdescription) {
            titleOrdescription = ''
        }
       
        var hospitalId = values.hospitalId;
        if (!hospitalId) {
            hospitalId = 'ALL'
        }

        var page = qs.parse(this.props.location.search).page;
        if (!page) {
            page = 1;
        }


        let setStateInRequest = (list) => { this.setState({ listDashboardNotification: list }) }

        return agent.asyncRequests.getPage('/dashboardNotification/listFindByDashboardNotification?fromDate=' + fromDate + '&toDate=' + toDate
            + '&titleOrdescription=' + titleOrdescription + '&hospitalId=' + hospitalId, page
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
        })
    }

    deleteDashboardNotification(id) {
        if (confirm("Bạn có chắc sẽ xoá !")) {
            var url = `/dashboardNotification/${id}`;
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
    getlistAllHospital(){
        let setStateInRequest = (list) => { this.setState({ listAllHospital: list }) }
        return agent.HospitalApi.listAllHospital().then(function (res) {
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
    render() {
        var search = qs.parse(this.props.location.search).search;
        const { handleSubmit, submitting } = this.props;
        const data = this.state.listDashboardNotification;
        if (!data) {
            return null; 
        }

        var optionUserHospital = [{label: "Tất Cả", value: "ALL"}];
        this.state.listAllHospital.map(item => {
            optionUserHospital.push({ label: item.name, value: item.id })
        })

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
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td>{moment(item.fromDate).format("DD/MM/YYYY")}</td>
                    <td>{moment(item.toDate).format("DD/MM/YYYY")}</td>
                    <td>{item.hospital ? item.hospital.name : null}</td>
                    <td className="text-center footable-visible footable-last-column">
                        <ul className="icons-list">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="icon-menu9"></i>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-right">
                                    <li><a onClick={() => this.handleShowmodal(item.id)}><i className="icon-pencil"></i>Chỉnh Sửa</a></li>
                                    <li><a onClick={() => this.deleteDashboardNotification(item.id)}><i className="icon-cross2"></i>Xóa</a></li>
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
                        <li className="active">Quản Lý Thông Báo</li>
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
                                                <div className="col col-md-6" style={{ paddingLeft: "20px" }}>
                                                    <Field label="Từ Ngày" name="fromDate" component={RenderDatePicker}></Field>
                                                </div>
                                                <div className="col col-md-6" style={{ paddingLeft: "20px" }}>
                                                    <Field label="Đến Ngày" name="toDate" component={RenderDatePicker}></Field>
                                                </div>
                                            </div>
                                            <div className="col col-md-2">
                                                <Field name="hospitalId" label="Bệnh Viện" options={optionUserHospital} component={RenderSelect}></Field>
                                            </div>
                                          
                                            <div className="col col-md-5" style={{ paddingLeft: "20px" }}>
                                                <Field label="Tìm Kiếm" name="search" placeholder="Tìm Tên, Nội Dung Thông Báo..." autoFocus={true} component={RenderInputWithDiv}></Field>
                                            </div>
                                            <div className="col col-md-1" style={{ paddingLeft: "10px", paddingTop: "30px" }}>
                                                <button type="submit" className="btn bg-success btn-xlg"><i className="icon-search4"></i> Tìm</button>
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
                                            <th data-toggle="true">Tên Thông Báo</th>
                                            <th data-toggle="true" style={{ width: '40%' }}>Nội Dung Thông Báo</th>
                                            <th data-toggle="true">Ngày Bắt Đầu</th>
                                            <th data-toggle="true">Ngày Kết Thúc</th>
                                            <th data-toggle="true">ID Hospital</th>                                        
                                            <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows}
                                    </tbody>
                                </table>
                            </div>
                            {this.state.isDashboardNotificationModalShown ? <ModalDashboardNotification 
                              title= {this.state.idDashboardNotification ? "Chỉnh sửa Thông Báo" : "Thêm mới Thông Báo"}
                                idDashboardNotification={this.state.idDashboardNotification} 
                                show={this.state.isDashboardNotificationModalShown} 
                                onHide={this.handleHidemodal} /> : null
                            }
                        </div>
                        <TablePagination data={data} baseUrl="/listDashboardNotification" />        
                    </div>
                </div>
            </div>
            
        );
    }
}
export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'DashboardNotificationList',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(DashboardNotificationList)));