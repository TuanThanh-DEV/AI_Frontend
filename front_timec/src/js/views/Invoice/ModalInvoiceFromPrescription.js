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
    if(!values.prescriptionBarcode){
        errors.prescriptionBarcode = {id:"Vui lòng điền mã toa!"}
    }   
    return errors;
}

const mapStateToProps = state => {
    var updateValue = {}
    return {
        initialValues: updateValue
    } 

};
const mapDispatchToProps = dispatch => ({

});
class ModalInvoiceFromPrescription extends React.Component {
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
        const {onHide} = this.props;
        var url = "";
        if(barcode != ""){
            var prescriptionId = null;
            if (barcode.indexOf("DT") > -1) {
                prescriptionId = barcode.replace("DT", "");
                url = '/invoice/createInvoiceFromPrescriptionItem?prescriptionId=';
            }else if (barcode.indexOf("TBHYT") > -1) {
                prescriptionId = barcode.replace("TBHYT", "");
                url = '/invoice/createInvoiceFromPrescriptionItemBHYT?prescriptionId=';
            }else if (barcode.indexOf("PXN") > -1) {
                prescriptionId = barcode.replace("PXN", "");
                url = '/invoice/createInvoiceFromDiagnosisReport?prescriptionId=';
            }else if (barcode.indexOf("DVBHYT") > -1) {
                prescriptionId = barcode.replace("DVBHYT", "");
                url = '/invoice/createInvoiceFromDiagnosisReportBHYT?prescriptionId=';
            }else if (barcode.indexOf("PTT") > -1) {
                prescriptionId = barcode.replace("PTT", "");
                url = '/invoice/createInvoiceFromProcudureReport?prescriptionId=';
            }else if (barcode.indexOf("PK") > -1) {
                prescriptionId = barcode.replace("PK", "");
                url = '/invoice/createInvoiceFromPackage?prescriptionId=';
            }else if (barcode.indexOf("KB") > -1) {
                prescriptionId = barcode.replace("KB", "");
                url = '/invoice/createInvoiceFromPrescriptionKB?prescriptionId=';
            }else if (barcode.indexOf("PBHYT") > -1) {
                prescriptionId = barcode.replace("PBHYT", "");
                url = '/invoice/createInvoiceFromPrescriptionPBHYT?prescriptionId=';
            }else if (barcode.indexOf("DD") > -1) {
                prescriptionId = barcode.replace("DD", "");
                url = '/invoice/createInvoiceFromPrescriptionDD?prescriptionId=';
            
            }else if (barcode.indexOf("CK") > -1) {
                prescriptionId = barcode.replace("CK", "");
                url = '/invoice/createInvoiceFromPrescriptionKBCK?prescriptionId=';
            }
            if(!prescriptionId){
                toast.info("Lỗi! Mã barcode không chính xác.", { autoClose: 4000 })
                return;
            }
            var _this = this;
            return agent.asyncRequests.get( url+ prescriptionId
            ).then(function (res) {
                var result = res.body.resultData;
                if (result) {
                    toast.info("Đã tạo thành công hóa đơn :  " + result.barCode, { autoClose: 5000 });
                    onHide(result);
                    // window.location.reload(true);
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
                                <Field name="search" placeholder="Quét mã Đơn Thuốc, Phiếu Chỉ Định, Phiếu Thủ Thuật, Khám Bệnh..."  autoFocus={true} component={RenderInputWithDiv}></Field>
                                <div className="text-right">
                                <button type="button" style={{marginRight:"20px"}} className="btn btn-default" onClick={this.handleHideAndClear} ><i class="icon-cross" aria-hidden="true"></i> Đóng</button>                                
                                <button type="submit"  className="btn bg-success" disabled={submitting}> Tạo Hóa Đơn</button>
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
            form: 'ModalInvoiceFromPrescription',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalInvoiceFromPrescription)));
