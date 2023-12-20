import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { Field, reduxForm } from 'redux-form';
import agent from '../../services/agent';
import { connect } from 'react-redux';
import { RenderDatePicker, RenderSelect } from '../../components/formInputs';
import moment from 'moment'
import TablePagination from '../../components/TablePagination';
import InputCabinetFormRow from './InputCabinetFormRow';



const validate = values => {
    const errors = {};
    if (moment(values.toDate) < moment(values.fromDate)) {
        errors.toDate = 'Ngày kết thúc nhỏ hơn ngày bắt đầu!, vui lòng thử lại!'
    }
    return errors;
}
const mapStateToProps = state => {
    return {
        currentUser: state.common.currentUser
    };
};

const mapDispatchToProps = dispatch => ({
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "InputCabinetFormList", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});
class InputCabinetFormList extends React.Component {
    constructor() {
        super();
        this.state = {
            listUser : []
        }

        this.handleHidemodal = () => {
            this.setState({ isInvoiceModalShown: false });
        };
        this.handleSearchForm = this.handleSearchForm.bind(this);
        this.handleGetToday = this.handleGetToday.bind(this);
     
    };

    getUser(){

        let setStateInRequest = (list) => { this.setState({ listUser: list }) }
        return agent.UserApi.listAllPersonel(
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
        })
        
    };


    handleSearchForm(values) {
        var page = qs.parse(this.props.location.search).page;
        if(!page){
            page = 1;
        }
        if(values){
            let setStateInRequest = (list) => { this.setState({ listInputCabietForm: list }) }
            return agent.asyncRequests.getPage('/inputCabinetForm/search?fromDate=' + moment(values.fromDate ? values.fromDate : "").format("YYYY-MM-DD") + '&toDate=' + moment(values.toDate ? values.toDate : "").format("YYYY-MM-DD")
            + '&createdUserId=' +  (values.createdUserId ? values.createdUserId : ""), page, 20
                ).then(function (res) {
                    var result = res.body.resultData;
                    if (result) {
                        setStateInRequest(result);
                    } else {
                        toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                    }
                }, function (err) {
                    toast.error("Vui lòng chọn khoảng thời gian", { autoClose: 2000 });
                }
            )
        }else{
            let setStateInRequest = (list) => { this.setState({ listInputCabietForm: list }) }
            return agent.asyncRequests.getPage('/inputCabinetForm/search?fromDate=' + moment(new Date).format("YYYY-MM-DD") + '&toDate=' + moment(new Date).format("YYYY-MM-DD")
                + '&createdUserId=', page, 20
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
                }
            )
        }
    }
    handleGetToday(){
        const {updateField} = this.props;
        this.handleSearchForm();
        updateField("fromDate", moment(new Date).format("YYYY-MM-DD"));
        updateField("toDate", moment(new Date).format("YYYY-MM-DD"));

    }
    componentWillMount() {
        this.handleSearchForm();
        this.getUser();
    };


    render() {

        const { handleSubmit, submitting ,currentUser, t} = this.props;
        const data = this.state.listInputCabietForm;
        const dataUser = this.state.listUser;
        let optionUser = []
        if(dataUser){
            dataUser.map(item =>{
                optionUser.push({label :item.fullName, value : item.id})
            })
        }
        if (!data) {
            return null;
        }
        var rows = data.content.map(item =>{
            return <InputCabinetFormRow key={"InputCabinetFormRow"+item.id} InputCabietForm={item} currentUserId={currentUser.id}></InputCabinetFormRow>
        })
        return (
            <div className="content-wrapper">
                <div className="page-header page-header-default">
                    <div className="breadcrumb-line">
                        <ul className="breadcrumb">
                            <li><a href=""><i className="icon-home2 position-left"></i> Home</a> </li>
                            <li className="active">Quản Lý Hóa Đơn</li>
                            <li className="active">Danh Sách Hóa Đơn</li>
                        </ul>
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
                                            <div className="col col-md-10">
                                                <div className="col col-md-3" style={{ paddingLeft: "20px" }}>
                                                    <Field label="Từ Ngày" name="fromDate" component={RenderDatePicker}></Field>
                                                </div>
                                                <div className="col col-md-3" style={{ paddingLeft: "20px" }}>
                                                    <Field label="Đến Ngày" name="toDate" component={RenderDatePicker}></Field>
                                                </div>
                                                <div className="col col-md-6" style={{ paddingLeft: "20px" }}>
                                                    <Field name="createdUserId" label="Người Lĩnh Dược" options={optionUser} component={RenderSelect}></Field>
                                                </div>
                                                
                                            </div>
                                            <div className="col col-md-2" style={{ paddingLeft: "10px", paddingTop: "30px" }}>
                                                <button type="submit" className="btn bg-success btn-xlg pull-left">Tìm</button>
                                                <button type="button" className="btn bg-success btn-xlg pull-right" onClick={this.handleGetToday}>Hôm nay</button>
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
                                            <th data-toggle="true">Tủ Thuốc</th>
                                            <th data-toggle="true">Ngày Tạo Phiếu</th>
                                            <th data-toggle="true">Người Tạo Phiếu </th>
                                            <th data-toggle="true">Trạng Thái</th>
                                            <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {data ? <TablePagination data={data} baseUrl="/listInputCabinetForm" /> : null}
                    </div>
                </div>
            </div>
        );
    }
}
export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'InputCabinetFormList',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(InputCabinetFormList)));

