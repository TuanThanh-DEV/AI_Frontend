import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderNumber, RenderTextArea, RenderDatePicker, RenderSelect } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import {LOAD_UPDATING_USER_SALARY} from './action-types';
import moment from 'moment';
const validate = values => {
    const errors = {};
    return errors;
}

const mapStateToProps = state => {
    var updateValue = {
        ...state.userSalaryReducer.updatingUserSalary,
        lastedUpdateDate: state.userSalaryReducer.updatingUserSalary && state.userSalaryReducer.updatingUserSalary.lastedUpdateDate ? moment(state.userSalaryReducer.updatingUserSalary.lastedUpdateDate) : null,

    };
    return {
        initialValues: updateValue,
        currentUser: state.common.currentUser,
    };
};

const mapDispatchToProps = dispatch => ({
        loadUserSalary: (payload) => 
        dispatch({ type: LOAD_UPDATING_USER_SALARY, payload: payload }),
        updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalUserSalary", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});

class ModalUserSalary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllUser: []
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
    }

  componentWillMount() {
        const { loadUserSalary,updateField, currentUser } = this.props;
        var id = this.props.idUserSalary;
        const dataPromise = agent.UserSalaryApi.getUserSalary(id);
        loadUserSalary(Promise.resolve(dataPromise)); 
    }

    handleAdd(values) {
        const {currentUser,onHide, editType} = this.props;
        var today = new Date();
        var id = this.props.idUserSalary;
        var url = '/userSalary/update?editType=' + editType;
        var bodyObject = {
            id: id,
            userId:values.userId,
            month:values.month,
            year:values.year,
            grossSalary : values.grossSalary,
            birthdayFee : values.birthdayFee,
            holidayFee : values.holidayFee,
            lunchFee : values.lunchFee,
            diligenceFee : values.diligenceFee,
            additional : values.additional,
            otherSupportFee : values.otherSupportFee,
            inssurance : values.inssurance,
            incomeTax : values.incomeTax,
            penaltyFee : values.penaltyFee,
            otherMinusFee : values.otherMinusFee,
            note:values.note,
            lastedUpdateUser: id ? currentUser : null,
            lastedUpdateDate: id ? moment(today) : null,
        };
        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && result.id) {
              onHide();
            //   toast.info("Lưu Thành Công.", {autoClose: 1000});
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
        // event.preventDefault();
        onHide();
        destroy();
    }
    render() {
       // const { objectUserSalary, listfile, title, onHide } = this.props;
        
       const {handleSubmit,submitting,invalid,currentUser, initialValues,editType } = this.props;
        const modalConfig = { backdrop: 'static',show: this.props.show,bsSize:"sm",  onHide:this.props.onHide,submitting: this.props.submitting};
        var id = this.props.idUserSalary;
        var dataUser = this.state.listAllUser;
        var optionUsers = [];
              dataUser.map(item => {
                  optionUsers.push({ label: item.fullName, value: item.id })
              })
        var newModal = null;
        var showLastedUpdateUser = [];
        var title = null;
        if(editType=="grossSalaryEdit"){
            title ="Chỉnh Sửa Tiền Lương Theo Giờ";
        }else if(editType=="supportFeeEdit"){
            title ="Chỉnh Sửa Các Khoản Tiền Cộng";
        }
        else if(editType=="minusFeeEdit"){
            title ="Chỉnh Sửa Các Khoản Trừ";
        }
        // Push Updated User
              showLastedUpdateUser.push({
                  label: initialValues.lastedUpdateUser ? initialValues.lastedUpdateUser.fullName + " || " + initialValues.lastedUpdateUser.email
                      : currentUser.fullName + " || " + currentUser.email,
                  value: initialValues.lastedUpdateUser ? initialValues.lastedUpdateUser.id : currentUser.id
              });
            newModal =
            <div style={{ width: '30%' }}>
                <Modal
                    {...modalConfig}
                    aria-labelledby="contained-modal-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-sm"><center>{title}</center> </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    {submitting ? <LoadingScreen /> :
                                <form className="form-horizontal" role="form" onSubmit={handleSubmit(this.handleAdd)}>
                                    <Field type="hidden" disabled={true} name="month" component={RenderInputWithDiv}></Field>
                                    <Field type="hidden" disabled={true}  name="year"   component={RenderInputWithDiv}></Field>
                                    <Field disabled={true} name="user.fullName" label="Tên Nhân Viên" component={RenderInputWithDiv}></Field>
                                    <div style={ editType=="grossSalaryEdit"?{display:'block'}:{display:'none'}}>
                                    <Field name="grossSalary" type="number" label="Lương Theo Giờ" placeholder="Nhập Lương Theo Giờ..." component={RenderNumber}></Field>  
                                    </div>
                                    <div style={ editType=="supportFeeEdit"?{display:'block'}:{display:'none'}}>
                                    <Field name="holidayFee" type="number" label="Tiền Thưởng Ngày Lễ" placeholder="Nhập Tiền Thưởng Ngày Lễ..." component={RenderNumber}></Field>  
                                    <Field name="diligenceFee" type="number" label="Tiền Thưởng Chuyên Cần" placeholder="Nhập Tiền Thưởng Chuyên Cần..." component={RenderNumber}></Field>  
                                    <Field name="birthdayFee" type="number" label="Tiền Phụ Cấp Sinh Nhật" placeholder="Nhập Tiền Phụ Cấp Sinh Nhật..." component={RenderNumber}></Field>  
                                    <Field name="lunchFee" type="number" label="Tiền Phụ Cấp Ăn Trưa" placeholder="Nhập Tiền Phụ Cấp Ăn Trưa..." component={RenderNumber}></Field>  
                                    <Field name="additional" type="number" label="Tiền Phụ Cấp Thêm" placeholder="Nhập Tiền Phụ Cấp Thêm..." component={RenderNumber}></Field>  
                                    <Field name="otherSupportFee" type="number" label="Khác Khoản Cộng Khác" placeholder="Nhập Khác Khoản Cộng Khác..." component={RenderNumber}></Field>  
                                    </div>
                                    <div style={ editType=="minusFeeEdit"?{display:'block'}:{display:'none'}}>
                                    <Field name="inssurance" type="number" label="Tổng Tiền Bảo Hiểm" placeholder="Nhập Tổng Tiền Bảo Hiểm..." component={RenderNumber}></Field>  
                                    <Field name="incomeTax" type="number" label="Tổng Tiền Thuế Thu Nhập Cá Nhân" placeholder="Nhập Tổng Tiền Thuế Thu Nhập Cá Nhân..." component={RenderNumber}></Field>  
                                    <Field name="penaltyFee" type="number" label="Tổng Tiền Phạt Vi Phạm" placeholder="Nhập Tổng Tiền Phạt Vi Phạm..." component={RenderNumber}></Field>  
                                    <Field name="otherMinusFee" type="number" label="Tổng Các Khoản Trừ Khác" placeholder="Nhập Tổng Các Khoản Trừ Khác..." component={RenderNumber}></Field>  
                                    </div>

                                     
                                    {/* End Hidden Field */}
                                    <Field name="note"  label="Ghi Chú" placeholder="Nhập Ghi Chú..." rows={3} component={RenderTextArea}></Field>
                                    <div style={initialValues.lastedUpdateUser ? { display: 'block' } : { display: 'none' }}>
                                    <Field disabled={true} name="lastedUpdateUser.id" label="Người Chỉnh Sửa Gần Nhất" options={showLastedUpdateUser} component={RenderSelect}></Field>
                                    <Field disabled={true} name="lastedUpdateDate" label="Ngày Chỉnh Sửa Gần Nhất" dateFormat="DD/MM/YYYY" component={RenderDatePicker}></Field> </div>
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
            form: 'ModalUserSalary',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalUserSalary)));
