import React from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import TableOutputCabinet from '../InputCabinetForm/TableOutputCabinet';
import { PermanentCacheService } from '../../services/middleware';
import agent from '../../services/agent';
import { RenderSelect, RenderDatePicker } from '../../components/formInputs';
import TablePagination from '../../components/TablePagination';
import qs from 'query-string';
import moment from 'moment';
import { Link } from 'react-router-dom';
import ModalOutputCabinet from './ModalOutputCabinet';


const validate = values => {
    const errors = {};
    return errors;
};

const mapStateToProps = state => ({
    currentUser: state.common.currentUser,
});

const mapDispatchToProps = dispatch => ({
    updateField: (fieldName, value) =>
    dispatch({
        meta: { form: "NursingList", field: fieldName },
        payload: value,
        type: "@@redux-form/CHANGE"
    })
});

class NursingList extends React.Component {
    constructor() {
        super();
        this.state = {
            listAllDepartment : null,
            listDoctor : null,
            listPrescription : null,
            isShowModalOutputCabinet : false,
            prescription : null
        };
        this.handleSearchForm = this.handleSearchForm.bind(this);
        this.handleClearFormSearch = this.handleClearFormSearch.bind(this);
        this.handleHidemodal = () => {
            this.setState({ isShowModalOutputCabinet: false });
        };
    };

    handleShowmodalOutputCabinet(prescription){
        this.setState({
            isShowModalOutputCabinet : true,
            prescription : prescription
        })
    }

    getListDepartment(hospitalId) {

        let setStateInRequest = (list) => { this.setState({ listAllDepartment: list }) }
        if (hospitalId) {
            return agent.asyncRequests.get("/department/listAllByHospitalId?hospitalId=" + hospitalId).then(function (res) {
                var result = res.body.resultData;
                if (result) {
                    setStateInRequest(result);
                } else {
                    toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
            });
        } else {
            return agent.asyncRequests.get("/department/listAll").then(function (res) {
                var result = res.body.resultData;
                if (result) {
                    setStateInRequest(result);
                } else {
                    toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
            });
        }
    }

    handleSearchForm(values){
        var hospitalId = PermanentCacheService.getItem("currentUser").hospitalId;
        var page = qs.parse(this.props.location.search).page;
        let prescriptionType =  "PRESCRIPTION";
        let arriveTime = new Date();
        let userId =  "ALL";
        let departmentId =  "ALL";
        if(values){
            prescriptionType = values.prescriptionType ? values.prescriptionType : prescriptionType;
            arriveTime =  values.arriveTime ? values.arriveTime : arriveTime ;
            userId =  values.userId ? values.userId : userId ;
            departmentId = values.departmentId ? values.departmentId : departmentId ;
        }
        
        let setStateInRequest = (list) => this.setState({
            listPrescription: list
        });
        return agent.asyncRequests.getPage("/prescription/findByHospitalId?hospitalId=" + hospitalId + "&userId=" + userId  + "&departmentId=" + departmentId  + "&prescriptionType=" + prescriptionType + "&arriveTime="+ moment(arriveTime).format("YYYY-MM-DD-HH:mm:ss") , page).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error(res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    }
    handleClearFormSearch(){
        const {updateField} = this.props;
        updateField("userId", "ALL");
        updateField("departmentId","ALL");
        updateField("arriveTime",new Date());
        updateField("prescriptionType","ALL");
        this.handleSearchForm();
    }
    getListDoctor() {
        let setStateInRequest = (list) => this.setState({
            listDoctor: list
        });
        return agent.asyncRequests.get("/user/listAllDoctor").then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error(res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    }
    componentWillMount() {
        const {updateField} = this.props;
        updateField("arriveTime", new Date())
        updateField("prescriptionType","ALL");

        var hospitalId = PermanentCacheService.getItem("currentUser").hospitalId;
        this.getListDepartment(hospitalId);
        this.getListDoctor();
        this.handleSearchForm();
    };

    render() {
        const {handleSubmit , submitting, t} = this.props;
        var optionDepartment = [];
        var dataDepartment = this.state.listAllDepartment;
        const data = this.state.listPrescription;
        if (dataDepartment) {
            dataDepartment.map(item => {
                optionDepartment.push({ label: item.name, value: item.id });
            })
        }

        var dataListDoctor = this.state.listDoctor;
        var optionDoctor = [];
        if (dataListDoctor) {
            dataListDoctor.map(item => {
                optionDoctor.push({ label: item.fullName, value: item.id });
            })
        }
        let optionPrescriptionType = [
            { label: "Tất Cả", value: "ALL" },
            { label: "Bệnh Án", value: "PRESCRIPTION" },
            { label: "Đơn Thuốc Lẻ", value: "PRESCRIPTIONITEM" },
            { label: "Khám Đoàn", value: "PRESCRIPTIONCOMPANY" }
        ]
        if (!data) {
            return null;
        }
        var rows = data.content.map(item => {
            var elementColor = ""
            if (item.status == "OPEN") {
                elementColor = { 'color': '#0040ff' }
            } else if (item.status == "IN_PROGRESS") {
                elementColor = { 'color': '#ff0000' }
            }
            else if (item.status == "DONE") {
                elementColor = { 'color': '#039296' }
            } else {
                elementColor = { 'color': '#777' }
            }
            return (
                <tr key={item.id}>
                    <td>{item.user ? item.user.fullName : null}</td>
                    <td>{item.patient ? item.patient.fullName : null}</td>
                    <td>{item.patient ? item.patient.address : null}</td>
                    {/* <td>{item.hospital ? item.hospital.name : null}</td> */}
                    <td>{item.department ? item.department.name : null}</td>
                    <td>{item.insuranceType ? item.insuranceType.name : "Viện Phí"}</td>
                    <td>{moment(item.arriveTime).format("DD/MM/YYYY")}</td>
                    <td style={elementColor}>{t(item.status)}</td>
                    <td ><button className="btn btn-info" onClick={() => this.handleShowmodalOutputCabinet(item)}> Cấp Thuốc </button></td>
                    {/* <td>{item.weight}</td>  */}
                    
                </tr>);
        });
        return  (
            <div className="content-wrapper">
                <div className="page-header page-header-default" >
                    <div className="breadcrumb-line">
                        <ul className="breadcrumb">
                            <li><a href=""><i className="icon-home2 position-left"></i> Home</a> </li>
                            <li className="active">Khám Bệnh</li>
                        </ul>
                        <div className="heading-elements">
                            <div className="heading-btn-group">
                                <a type="button" className="btn bg-teal" href={"/editPrescription/new"}> Điều Dưỡng</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{paddingLeft :'20px'}} > 
                    <form className="main-search"  role="form" onSubmit={handleSubmit(this.handleSearchForm)} >
                        <div className="row">
                            <div className="col-md-3">
                                <Field name="userId" label="Bác Sĩ Điều Trị" options={optionDoctor} component={RenderSelect}></Field>
                            </div>
                            <div className="col-md-3">
                                <Field name="departmentId" label="Chuyên Khoa" options={optionDepartment} component={RenderSelect}></Field>
                            </div>
                            <div className="col-md-2">
                                <Field name="arriveTime" label="Ngày Khám"  component={RenderDatePicker}></Field>
                            </div>
                            <div className="col-md-2">
                                <Field name="prescriptionType" label="Hình Thức Khám" options={optionPrescriptionType} component={RenderSelect}></Field>
                            </div>
                            <div className="col-md-2" style={{ paddingTop: "30px" }} >
                                <div className="pull-left">
                                    <button type="submit" className="btn bg-success btn-xlg" disabled={submitting} >Tìm Kiếm</button>
                                </div>
                                <div className="pull-left">
                                    <button type="button" className="btn bg-warning btn-xlg" onClick={this.handleClearFormSearch} >Làm Mới</button>
                                </div>

                            </div>
                        </div>
                    </form>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="panel panel-flat">
                            <table className="table table-xxs table-bordered">
                                <thead>
                                    <tr className="bg-teal">
                                        <th data-toggle="true">Bác Sĩ Điều Trị</th>
                                        <th data-toggle="true">Bệnh Nhân </th>
                                        <th data-toggle="true">Địa Chỉ</th>
                                        <th data-toggle="true">Phòng Khám</th>
                                        <th data-toggle="true">Đối Tượng BHYT</th>
                                        <th data-toggle="true">Ngày Khám</th>
                                        <th data-toggle="true">Trạng Thái</th>
                                        <th className="text-center footable-visible footable-last-column" ><i className="icon-menu-open2"></i></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows}
                                </tbody>
                            </table>
                        </div>
                <TablePagination data={data} baseUrl={"listNursing"} />
                {this.state.isShowModalOutputCabinet ? <ModalOutputCabinet title={"Cấp Thuốc"} prescription ={this.state.prescription} show={this.state.isShowModalOutputCabinet} onHide={this.handleHidemodal}/> : null}
                    </div>
                </div>
            </div>
        )    
}
    
}

export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'NursingList',
            destroyOnUnmount: false,
            enableReinitialize: true,
            validate
        })(NursingList)));