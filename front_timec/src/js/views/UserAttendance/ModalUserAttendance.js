import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderDatePicker, RenderSelect, RenderNumberInput , RenderNumber} from '../../components/formInputs';
import { Field, reduxForm,formValueSelector } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import {LOAD_UPDATING_USER_ATTENDANCE, LOAD_USER_DTO} from './action-types';
import moment from 'moment';

const validate = values => {
    var weekdays = new Array(
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    );
    const errors = {};
    // if(weekdays[moment(values.dateToWork).day()] != "Sunday" && (values.attendanceType == "CN" || values.attendanceType == "CN2") ){
    //     errors.attendanceType = "Ngày "+moment(values.dateToWork)+ " không là Chủ Nhật, vui lòng chọn lại trạng thái .";
    //         }
    // if(weekdays[moment(values.dateToWork).day()] == "Saturday" && values.user.position != "GS" &&values.user.position != "KTK" 
    // && (values.value == "X"||values.value =="KP"||values.value =="KL"||values.value =="PN"||values.value =="NL"||values.value =="NB")  ){
    //     errors.attendanceType = "Lưu ý: Thứ 7 chỉ có Giám Sát và Kế Toán Kho Làm Full ngày, bộ phận khác làm nữa ngày!";
                
    //         }
    if(values.workHours > 24){
        errors.workHours = "Số giờ ngoài 24h, vui lòng nhập lại!";
    }
    return errors;
    
}

var today = moment(new Date,"DD/MM/YYYY");
const selector = formValueSelector('ModalUserAttendance');
const mapStateToProps = state => {
    var updateValue = {
        ...state.userAttendanceReducer.updatingUserAttendance, 
        dateToWork: state.userAttendanceReducer.updatingUserAttendance && state.userAttendanceReducer.updatingUserAttendance.dateToWork ? moment(state.userAttendanceReducer.updatingUserAttendance.dateToWork) : null,
    };
    return {
        initialValues: updateValue,
        currentUser: state.common.currentUser,
        dateToWork: selector(state,"dateToWork"),
        user: selector(state,"userId"),
    };
};

const mapDispatchToProps = dispatch => ({
        loadUserAttendance: (payload) => 
        dispatch({ type: LOAD_UPDATING_USER_ATTENDANCE, payload: payload }),
        loadUserDto: (payload) => 
        dispatch({ type: LOAD_USER_DTO, payload: payload }),
        updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalUserAttendance", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});

class ModalUserAttendance extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllUser:[]
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
    };
    
    getListUserforUser(){
        const {updateField,userDto,dayToAttendance} = this.props;
        let setStateInRequest = (list) => { this.setState({ listAllUser: list }) }
                return agent.asyncRequests.get("/user/listAll").then(function (res) {
                    var result = res.body.resultData;
                    if (result) {
                        setStateInRequest(result);
                    if(userDto && dayToAttendance){
                        setTimeout(() => {
                        updateField("userId",userDto.id);
                        updateField("dateToWork",moment(dayToAttendance));
                    }, 100);
                    }
                    } else {
                        toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
                    }
                }, function (err) {
                    toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
                });
    };
   
    componentWillMount() {
        const { loadUserAttendance } = this.props;
        var id = this.props.idUserAttendance;
        if(id){
            const dataPromise = agent.UserAttendanceApi.getUserAttendance(id);
            loadUserAttendance(Promise.resolve(dataPromise));
        }
        
        this.getListUserforUser();
        // this.checkDayAndUpdateField();
    }
 
    handleAdd(values) {
        var onHide = this.props.onHide;
        var id = this.props.idUserAttendance;
        var url = '/userAttendance/add';
        var bodyObject = {
            userId: values.userId,
            dateToWork: values.dateToWork,
            workHours : values.workHours
         
        };
        if (id) {
            url = '/userAttendance/update';
            bodyObject.id = id;
        }

        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && result.id) {
                onHide();
            } else {
                toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    
    }

    ///Hide and Clean Value
    handleHideAndClear(){
       const{destroy,onHide} = this.props;
        onHide();
        destroy();
    };

    render() {
        const {handleSubmit,submitting, title,invalid, initialValues,currentUser,dateToWork,user,dayToAttendance,userDto } = this.props;
        const modalConfig = { backdrop: 'static',show: this.props.show,bsSize:"sm",  onHide:this.props.onHide,submitting: this.props.submitting};
        const dataUser = this.state.listAllUser;

        var optionUser = [];
        dataUser.map(item => {
            optionUser.push({ label: item.fullName, value: item.id })
        });
        
        var id = this.props.idUserAttendance;
        var newModal = null;
            newModal =
            <div style={{ width: '30%' }}>
                <Modal
                    {...modalConfig}
                    aria-labelledby="contained-modal-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-sm"><center>{id?"Chỉnh Sửa "+title:title}</center> </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    {submitting ? <LoadingScreen /> :
                                <form className="form-horizontal" role="form" onSubmit={handleSubmit(this.handleAdd)}>
                                    <Field  disabled={true} name="userId" label="Tên Nhân Viên" placeholder="Tên Nhân Viên..." options={optionUser}  component={RenderSelect}></Field>
                                    <Field disabled={true} name="dateToWork"  dateFormat="DD/MM/YYYY"  label="Ngày Làm" component={RenderDatePicker}></Field>
                                    <Field  name="workHours" label="Số giờ làm việc" component={RenderNumberInput}></Field>
                                    <div className="text-right">
                                <button type="button" style={{marginRight:"20px"}} className="btn btn-default" onClick={this.handleHideAndClear} ><i class="icon-cross" aria-hidden="true"></i> Đóng</button>                                
                                <button type="submit"  className="btn bg-success" disabled={submitting}> Lưu Lại</button>
                                     </div>
                                </form>
                            }
                    </Modal.Body>
                </Modal>
            </div>
        return newModal;
    }
};

export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'ModalUserAttendance',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalUserAttendance)));
