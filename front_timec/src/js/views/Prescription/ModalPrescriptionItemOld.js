import React from 'react';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import moment from 'moment';
import qs from 'query-string';
import { Field , reduxForm} from 'redux-form';
import {  RenderDatePicker, RenderInputWithDiv, RenderSelect} from '../../components/formInputs';
import { LoadingScreen } from '../../components/commonWidgets';
import { connect } from 'react-redux';
import PrescriptionRow from './PrescriptionRow';


const validate = values => {
    const errors = {};
    if (moment(values.toDate) < moment(values.fromDate) ) {
        errors.toDate = 'Ngày kết thúc nhỏ hơn ngày bắt đầu!, vui lòng thử lại!'
    }
    return errors;
}
const mapStateToProps = state => {
    var updateValue = {
        ...state.prescriptionReducer.updatingPrescription,
    };
    return {
        // initialValues: updateValue,
    };
};

const mapDispatchToProps = dispatch => ({
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalPrescriptionItemOld", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        }),
});

class ModalPrescriptionItemOld extends React.Component {
    constructor() {
        super();
        this.state = {
            listPrescriptionItem : null,
            listICD : null,
            numberDrugChoose : 0,
            
        }
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        // this.handleSearchForm = this.handleSearchForm.bind(this);
        this.getListICD = this.getListICD.bind(this);
        this.handleClearFormSearch = this.handleClearFormSearch.bind(this);
    };
    handleHideAndClear() {
        const { destroy,onHide } = this.props;
        onHide();
        destroy();
    }
    handleClearFormSearch(){
        const { destroy } = this.props;
        destroy();
    }
     
    getListICD(){
        let setStateInRequest = (list) => this.setState({
            listICD: list
        });
        return agent.IcdApi.listAllIcd().then(function (res) {
            var result = res.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error(res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    }
    handleSumNumberDrugChoose(number){
        if(number){
            this.setState({
                numberDrugChoose :  this.state.numberDrugChoose + number
            })
        }
    }
    getListPrescriptionByPatientId(patientId){

        let setStateInRequest = (list) => { this.setState({ listPrescriptionItem: list }) }
        return (agent.asyncRequests.get("/prescription/listFindByPatientId?patientId="+patientId).then(function(res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + res.body.errorMessage, {
                    autoClose: 15000
                });
            }
        }, function(err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", {
                autoClose: 15000
            });
        }))
    }
    // handleSearchForm(values) {
    //     var fromDate = ""; 
    //     var toDate = "";
    //     var icdId = ""; 
    //     var userFullname ="";
    //     if(values){
    //     fromDate = values.fromDate ? moment(values.fromDate).format("YYYY-MM-DD-HH:mm:ss"): "";
    //     toDate = values.toDate ? moment(values.toDate).format("YYYY-MM-DD-HH:mm:ss") : "";
    //     icdId = values.icdId ? values.icdId: ""; 
    //     userFullname = values.search ? values.search : "";
    // }
    //     var page = 1;
    //     let setStateInRequest = (list) => { this.setState({ listPrescriptionItem: list }) }
    //         return agent.asyncRequests.getPage('/prescription/modal/filterPrescription?fromDate='+ fromDate + '&toDate='+toDate
    //         + '&icdId=' +  icdId + '&userFullname=' +userFullname , page
    //             ).then(function (res) {
    //                 var result = res.body.resultData.content;
    //                 if (result) {
    //                     setStateInRequest(result);
    //                 } else {
    //                     toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
    //                 }
    //             }, function (err) {
    //                 toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
    //                 +" Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
    //             })
    // }

    componentWillMount() {
        this.getListICD();
        // this.handleSearchForm();
        var patientId = this.props.patientId;
        this.getListPrescriptionByPatientId(patientId);
    }
    render() {
        const { title, onHide, t, handleSubmit , submitting, prescriptionId} = this.props;
        const modalconfig = {show: this.props.show,bsSize:"lg", onHide: this.props.onHide};
        const listPrescriptionItem = this.state.listPrescriptionItem;
        const numberDrugChoose = this.state.numberDrugChoose;
        const dataListICD = this.state.listICD;
        var optionAllIcD  = [];
        if (dataListICD) {
            dataListICD.map(item => {
                optionAllIcD.push({ label: item.name, value: item.id });
            })
        }
        if(listPrescriptionItem){
            var row = listPrescriptionItem.map(item =>{
                return <PrescriptionRow prescriptionObject={item} key={"tab_prescription_"+item.id} 
                 handleShowPrescriptionItem = {this.handleShowPrescriptionItem}
                 prescriptionId ={prescriptionId}
                 onHide = {onHide}
                 handleSumNumberDrugChoose = { (number ) => this.handleSumNumberDrugChoose(number)}
                 ></PrescriptionRow>
            })
        }
        var newModal = null;
            newModal =
            <div style={{ width: '30%' }}>
                <Modal
                    {...modalconfig}
                    aria-labelledby="contained-modal-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg"><center>Thông Tin {title}</center></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    {/* {submitting ? <LoadingScreen /> :
                    <form className="form-horizontal"  role="form" onSubmit={handleSubmit(this.handleSearchForm)} >
                        <div className="row">
                            <h4><p class="font-weight-bold" style={{paddingLeft: "10px", fontWeight: "bold"}}>Chọn Khoảng Thời Gian Hiển Thị Danh Sách</p></h4>
                        </div>
                        <div className="row" style={{marginLeft:"0"}}>
                            <div className="col-md-2">
                                <span class="label label-primary">Chọn Ngày Bắt Đầu</span>
                                <Field name="fromDate" component={RenderDatePicker} ></Field>
                            </div>
                            <div className="col-md-2">
                                <span class="label label-primary">Chọn Ngày Kết Thúc</span>
                                <Field name="toDate"  component={RenderDatePicker}></Field>
                            </div>
                            <div className="col-md-2" style={{textAlign:"center"}} >
                                <span class="label label-primary">ICD</span>
                                <Field name="icdId" options={optionAllIcD} component={RenderSelect}></Field>
                            </div>
                            <div className="col-md-6" style={{paddingTop:"20px"}}>
                                <Field name="search" placeholder="Tìm Tên Bác Sĩ..."  autoFocus={true} component={RenderInputWithDiv}></Field>
                            </div>
                        </div>
                        <div className="row" >
                            <div className="pull-right"> 
                                <button type="button" className="btn bg-warning btn-xlg" onClick={this.handleHideAndClear} ><i className="con icon-undo2">Quay Lại</i></button>
                            </div>
                            <div className="pull-right"> 
                                <button type="button" className="btn bg-warning btn-xlg" onClick={this.handleClearFormSearch} >Làm Mới</button>
                            </div>
                            <div className="pull-right">
                                <button type="submit" className="btn bg-success btn-xlg" disabled={submitting} >Tìm Kiếm</button>
                            </div>
                            <div className="pull-right">
                                <button type="button" className="btn bg-info btn-xlg"  >{numberDrugChoose}</button>
                            </div>
                        </div>
                    </form>} */}
                    <table className="table table-xxs table-bordered">  
                            <thead>
                                <tr className="bg-teal">
                                    <th width="5%"><i className="icon-menu-open2"></i></th>
                                    <th>Mã Toa</th>
                                    <th>Ngày Khám</th>
                                    <th>Bác Sĩ </th>
                                    <th>ICD </th>
                                    <th width="10%" className="text-center footable-visible footable-last-column"><i className="icon-menu-open2"></i></th>
                                    {/* <th>Chẩn Đoán</th>
                                    <th>Tên Thuốc</th>
                                    <th>Hướng Dẫn</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {row}
                            </tbody>
                        </table>
                    </Modal.Body>
                </Modal>
            </div>
        return newModal;
    }
};
export default translate('translations')(connect(
        mapStateToProps, mapDispatchToProps)(
            reduxForm({
                form: 'ModalPrescriptionItemOld',
                destroyOnUnmount: true,
                enableReinitialize: true,
                validate
            })(ModalPrescriptionItemOld)));