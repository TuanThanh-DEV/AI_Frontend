import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv} from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';

const validate = values => {
    const errors = {};
    if(!values.search){
        errors.search = "Vui lòng điền mã toa!";
    }   
    return errors;
}

const mapStateToProps = state => {
    var updateValue = {}
    return {
        initialValues: updateValue,
        currentUser: state.common.currentUser
    } 

};
const mapDispatchToProps = dispatch => ({

});
class ModalInputNamePatientForDrugRetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
    };
    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        onHide();
        destroy(); 
    }
    
    handleAdd(values) {
        var barcode =  values.search ? values.search : "";
        var url = "";
        if(barcode != ""){
            //TODO : create patien
            const {currentUser} = this.props;
            return agent.asyncRequests.get("/prescription/newPrescription?currentUserId=" +currentUser.id
                ).then(function (res) {
                    var result = res.body.resultData;
                    if (result) {
                        window.location.href = "/drugRetail/" + result.id;
                    } else {
                        toast.error("Không thể tạo mới đơn khám bệnh cho bán thuốc ngoài luồng ( Đơn bán lẻ )! Lỗi: " + result.errorMessage, { autoClose: 15000 });
                    }
                }, function (err) {
                    toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                    +" Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
                });
        }else{
            return;
        }
    };

    componentWillMount() {
       
    }

    render() {
        const { handleSubmit, submitting, title, invalid,createdUser,currentUser, } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show,bsSize:"md",  
        onHide: this.props.onHide, 
        submitting: this.props.submitting };
        
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
                                <Field name="search" placeholder="Tên Người Mua..."  autoFocus={true} component={RenderInputWithDiv}></Field>
                                <div className="text-right">
                                <button type="button" style={{marginRight:"20px"}} className="btn btn-default" onClick={this.handleHideAndClear} ><i class="icon-cross" aria-hidden="true"></i> Đóng</button>                                
                                <button type="submit"  className="btn bg-success" disabled={submitting}> Nhập Đơn Thuốc</button>
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
            form: 'ModalInputNamePatientForDrugRetail',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalInputNamePatientForDrugRetail)));
