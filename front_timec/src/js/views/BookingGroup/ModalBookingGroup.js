import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderTextArea, RenderDatePicker, RenderSelect } from '../../components/formInputs';
import { Field, reduxForm,formValueSelector } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_BOOKINGGROUP } from './action-types';
import moment from 'moment';

const validate = values => {
    const errors = {};
    if(!values.numberOfAttendees){
        errors.numberOfAttendees = "Vui lòng nhập số lượng người khám!"
    }
   
    return errors;
}
const selector = formValueSelector('ModalBookingGroup');
var today = moment(new Date,"DD/MM/YYYY");
const mapStateToProps = state => {
    var updateValue = {
        ...state.bookingGroupReducer.updatingBookingGroup,
        appointmentDate: state.bookingGroupReducer.updatingBookingGroup && state.bookingGroupReducer.updatingBookingGroup.appointmentDate ? moment(state.bookingGroupReducer.updatingBookingGroup.appointmentDate) : null,
        createdDate: state.bookingGroupReducer.updatingBookingGroup && state.bookingGroupReducer.updatingBookingGroup.createdDate ? moment(state.bookingGroupReducer.updatingBookingGroup.createdDate) : today,
            };
    return {
        initialValues: updateValue,
       
    };
};
const mapDispatchToProps = dispatch => ({
    loadBookingGroup: (payload) =>
        dispatch({ type: LOAD_UPDATING_BOOKINGGROUP, payload: payload })
});
class ModalBookingGroup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listAllCompany: [],

        }

        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
     };

     getlistAllCompany(){
        let setStateInRequest = (list) => { this.setState({ listAllCompany: list }) }
        return agent.CompanyApi.listAllCompany(
        ).then(function (res) {
            var result = res.resultData;
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


    

    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        onHide();
        destroy(); }
    handleAdd(values) {
        var onHide = this.props.onHide;
        var id = this.props.idBookingGroup;
        var url = '/bookingGroup/add';
        var bodyObject = {
            companyId: values.companyId,
            createdDate: values.createdDate,
            appointmentDate: values.appointmentDate,
            numberOfAttendees: values.numberOfAttendees,
            note: values.note,
            status: values.status
        };
        if (id) {
            url = '/bookingGroup/update';
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
    };

    componentWillMount() {
        const { loadBookingGroup } = this.props;
        var id = this.props.idBookingGroup;
       {
            const dataPromise = agent.BookingGroupApi.getBookingGroup(id);
            loadBookingGroup(Promise.resolve(dataPromise))
        }

       
        this.getlistAllCompany();
    }
    render() {
        const { handleSubmit, submitting, title, invalid, currentUser,createdUser } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show,bsSize:"sm",  
        onHide: this.props.onHide, 
        submitting: this.props.submitting };

        var optionAllCompany=[];
        var dataListCompany = this.state.listAllCompany;
        if(dataListCompany){
            dataListCompany.map(item=>{
                optionAllCompany.push({label:item.name,value:item.id});
            })
        }

        var optionStatus =[

            {label:"Mở",value:"OPEN"},
            {label:"Đặt Lịch",value:"BOOKED"},
            {label:"Hoàn Thành",value:"DONE"},
            {label:"Hủy Bỏ",value:"CANCELLED"},
        ]

        var newModal = null;
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
                      <div className="form-group"> 
                      <div className="row">
                      <div className="col-md-12">                                 
                      <Field name="companyId" label="Chọn Nhóm Công Ty" options={optionAllCompany} component={RenderSelect}></Field>
                      </div>
                      <div className="col-md-6"> 
                      <br/>
                      <Field disabled={true} name="createdDate" label="Ngày Tạo" dateFormat="DD/MM/YYYY"  component={RenderDatePicker}></Field>                    
                      </div>    
                      <div className="col-md-6"> 
                      <br/>
                      <Field name="appointmentDate" label="Ngày Lên Kế Hoạch" dateFormat="DD/MM/YYYY"  component={RenderDatePicker}></Field>         
                      </div>
                      <div className="col-md-6">
                      <br/>
                      <Field name="numberOfAttendees" label="Số Người Khám" placeholder="Nhập số người khám" component={RenderInputWithDiv}></Field>
                      </div>
                      <div className="col-md-6"> 
                      <br/>
                      <Field name="status" label="Trạng Thái"  options={optionStatus} component={RenderSelect}></Field>  
                      </div>
                      <div className="col-md-12"> 
                      <br/>
                      <Field name="note" label="Ghi Chú" placeholder="Nhập nội dung ghi chú..." row={3} component={RenderTextArea}></Field>                              
                      </div>                                                        
                      </div>
                      <br/>
                      <div className="text-right">
                      <button type="button" style={{marginRight:"20px"}} className="btn btn-default" onClick={this.handleHideAndClear} ><i class="icon-cross" aria-hidden="true"></i> Đóng</button>                                
                      <button type="submit"  className="btn bg-success" disabled={submitting}> Lưu Lại</button>
                           </div>
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
            form: 'ModalBookingGroup',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalBookingGroup)));
