import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { ScriptUtils } from '../../utils/javascriptUtils';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import ModalBookingGroup from './ModalBookingGroup';
import moment from 'moment'
import { Field, reduxForm } from 'redux-form';
import { RenderDatePicker, RenderInputWithDiv, RenderSelect } from '../../components/formInputs';
import SecuredComponent from '../../components/SecuredComponent';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import BookingGroupTable from "./BookingGroupTable";
import { LoadingScreen } from '../../components/commonWidgets';
import ModalImportExcelFileForBookingGroup from './ModalImportExcelFileForBookingGroup';

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
            meta: { form: "BookingGroupList", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});
class BookingGroupList extends React.Component {
    constructor() {
        super();
        this.state = {
            listBookingGroup: [],
            isBookingGroupModalShown: false,
            listAllCompany: [],
            idBookingGroup: null,
            isShowModalImportPatientFile : false
        }
      
        this.handleShowmodal=(id)=> {
            this.setState({
                isBookingGroupModalShown: true,
                idBookingGroup: id
            });
        }
        this.handleSearchForm = this.handleSearchForm.bind(this);
        this.handleHidemodal = () => {
            this.setState({ isBookingGroupModalShown: false ,isShowModalImportPatientFile : false});
            var startOfMonth = moment(new Date).startOf('month');
            var endOfMonth = moment(new Date).endOf('month');
            this.handleSearchForm({fromDate: startOfMonth, toDate: endOfMonth });
        };
        this.handleImportPatientFile = () =>{
            this.setState({ isShowModalImportPatientFile: true });
        }
    };
   

    handleSearchForm(values) {
        var fromDate = moment(values.fromDate).format("YYYY-MM-DD-HH:mm:ss");
        var toDate = moment(values.toDate).format("YYYY-MM-DD-HH:mm:ss");
    
        
        var status = values.status;
        if (!status) {
            status = 'ALL'
        }
        var companyId = values.companyId;
        if (!companyId) {
            companyId = 'ALL'
        }

        var page = qs.parse(this.props.location.search).page;
        if (!page) {
            page = 1;
        }


        let setStateInRequest = (list) => { this.setState({ listBookingGroup: list }) }

        return agent.asyncRequests.getPage('/bookingGroup/listFindByBookingGroup?fromDate=' + fromDate + '&toDate=' + toDate
            + '&companyId=' + companyId + '&status=' + status, page
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

    getlistAllCompany() {
        let setStateInRequest = (list) => { this.setState({ listAllCompany: list }) }
        return agent.CompanyApi.listAllCompany().then(function (res) {
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
        var startOfMonth = moment(new Date).startOf('month');
        var endOfMonth = moment(new Date).endOf('month');
        this.handleSearchForm({fromDate: startOfMonth, toDate: endOfMonth });
        const { updateField } = this.props;
        updateField("fromDate",startOfMonth);
        updateField("toDate",endOfMonth);
        updateField("companyId",'ALL');
        updateField("status",'ALL');
        this.getlistAllCompany();
    };

    deleteBookingGroup(id) {
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
    
    render() {
        const { handleSubmit, submitting } = this.props;
        var optionStatus = [
            {label: "Tất Cả", value: "ALL"},
            { label: "Mở", value: "OPEN" },
            { label: "Đặt", value: "BOOKED" },
            { label: "Hoàn Thành", value: "DONE" },
            { label: "Hủy Bỏ", value: "CANCELLED" }
        ];
        var optionCompany = [{label: "Tất Cả", value: "ALL"}];
        this.state.listAllCompany.map(item => {
            optionCompany.push({ label: item.name, value: item.id })
        })
        var search = qs.parse(this.props.location.search).search;
        const data = this.state.listBookingGroup;
        
        var currentNo = 0;
        var page = qs.parse(this.props.location.search).page;
        if (!page) {
            page = 1; }
        var currentNo = ((page - 1) * 20);
        if (!data.content) {
            return <LoadingScreen></LoadingScreen>
         }
        var rows = data.content.map(item => {
            currentNo++
            return (
                <BookingGroupTable key={"BookingGroupList" + item.id} onReloadBookingGroup={this.updateListBookingGroup}  currentNo={currentNo}  bookingGroupObject={item}></BookingGroupTable>
                );
        });
        
        return (
            <div className="content-wrapper">
            <div className="page-header page-header-default">
                <div className="breadcrumb-line">
                    <ul className="breadcrumb">
                        <li><a href=""><i className="icon-home2 position-left"></i> Home</a> </li>
                        <li className="active">Quản Lý Lịch Khám</li>
                        <li className="active">Khám Theo Nhóm</li>
                    </ul>
                    <div className="heading-elements">
							<div className="heading-btn-group">
                            <button className="btn bg-teal" onClick={() => this.handleImportPatientFile()}>Nhập Khách Hàng Theo File</button>
                            <button className="btn bg-teal" onClick={() => this.handleShowmodal()}>Thêm Nhóm Khám</button>
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
                                                <Field name="companyId" label="Thu Ngân" options={optionCompany} component={RenderSelect}></Field>
                                            </div>
                                            <div className="col col-md-2" style={{ paddingLeft: "20px" }}>
                                                <Field name="status" label="Trạng Thái" options={optionStatus} component={RenderSelect}></Field>
                                            </div>
                                            <div className="col col-md-1" style={{ paddingLeft: "10px", paddingTop: "30px" }}>
                                                <button type="submit" className="btn bg-success btn-xlg"> <i className="icon-search4"></i>Tìm</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>          
                            <div className="panel panel-flat">
                                <table className="table table-xxs table-bordered">
                                    <thead>
                                        <tr className="bg-teal">
                                        <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                            <th data-toggle="true">STT</th>
                                            <th data-toggle="true">Tên Công Ty</th>
                                            <th data-toggle="true">Ngày Tạo</th>
                                            <th data-toggle="true">Ngày Lên Kế Hoạch Khám</th>
                                            <th data-toggle="true">Gói Khám</th>
                                            <th data-toggle="true">Trạng Thái</th>
                                            <th data-toggle="true">Ghi Chú</th>
                                            <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows}
                                    </tbody>
                                </table>
                            </div>
                            {this.state.isBookingGroupModalShown ? <ModalBookingGroup 
                                title= {this.state.idBookingGroup ? "Chỉnh Sửa Nhóm Khám Bệnh" : "Thêm Mới Nhóm Khám Bệnh"} 
                                idBookingGroup={this.state.idBookingGroup} 
                                show={this.state.isBookingGroupModalShown} 
                                onHide={this.handleHidemodal} /> : null
                            }
                             {this.state.isShowModalImportPatientFile ? <ModalImportExcelFileForBookingGroup title={" Excel"}  show={this.state.isShowModalImportPatientFile} 
                                onHide={this.handleHidemodal}></ModalImportExcelFileForBookingGroup>: null}
                             <TablePagination data={data} baseUrl="/listBookingGroup" />
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
            form: 'BookingGroupList',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(BookingGroupList)));