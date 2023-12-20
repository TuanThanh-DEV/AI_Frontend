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
    return errors;
}

const mapStateToProps = state => {
};
const mapDispatchToProps = dispatch => ({

});
class ModalPaymentForBarCode extends React.Component {
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
        var search =  values.search ? values.search : "";
        var url = "";
        var firstCode =  this.props.firstCode;
        if(search != ""){
            
            if(firstCode === "idPrescription"){
                // search = search.replace("DT", "");
                url = "/payment/listFindByInvoicePrescriptionId?idPrescription=";
            }else if(firstCode === "idInvoice"){
                // search = search.replace("PXN", "");
                url = "/payment/listFindByInvoiceId?invoiceId="
            }else{
                // prescriptionId = barcode.replace("PTT", "");
                url = "/payment/listFindByPatientCode?patientCode="
            }
            var _this = this;
            return agent.asyncRequests.get( url + search
            ).then(function (res) {
                var result = res.body.resultData;
                if (result) {
                        _this.props.listPaymentObj(result);
                        _this.props.onHide();
                } else {
                    toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                    + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
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
                                <Field name="search"   autoFocus={true} component={RenderInputWithDiv}></Field>
                                <div className="text-right">
                                <button type="button" style={{marginRight:"20px"}} className="btn btn-default" onClick={this.handleHideAndClear} ><i class="icon-cross" aria-hidden="true"></i> Đóng</button>                                
                                <button type="submit"  className="btn bg-success" disabled={submitting}> Tìm</button>
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
            form: 'ModalPaymentForBarCode',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalPaymentForBarCode)));
