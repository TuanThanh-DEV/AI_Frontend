import {  default as React } from 'react';
import { Modal } from 'react-bootstrap';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Field, reduxForm } from 'redux-form';
import { LoadingScreen } from '../../components/commonWidgets';
import { RenderMoneyFormat, RenderSelect, RenderTextArea } from '../../components/formInputs';
import agent from '../../services/agent';
import { PermanentCacheService } from '../../services/middleware';
import { FormatterUtils } from '../../utils/javascriptUtils';


const validate = values => {
    const errors = {};
    return errors;
}
const mapStateToProps = state => {
    var updateValue = {}
    return {
        initialValues: updateValue
    } 
};

const mapDispatchToProps = dispatch => ({
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "PagePaymentGroup", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});
class PagePaymentGroup extends React.Component {
    constructor() {
        super();
        this.state = {
            listAllCompany: null
        }
        this.handleAdd = this.handleAdd.bind(this);
    };

    handleAdd(values) {
        const {onHide} = this.props;
        var currentUser = PermanentCacheService.getItem("currentUser");
        var url = '/invoice/addFromPageGroup';
        var moneyReducedAmount = 0;
        if(values.reducedAmount > 0 ){
            moneyReducedAmount = (values.originAmount * values.reducedAmount) / 100
        }
        var bodyObject = {

            userId: currentUser.id,
            createdDate: new Date(),
            status: "OPEN",
            invoiceType: "PRESCRIPTIONCOMPANY",
            companyId : values.companyId,
            originAmount : values.originAmount,
            reducedAmount : moneyReducedAmount,
            insurranceAmount : 0,
            totalAmountNoVat : 0,
            totalAmountWithVat : values.originAmount - moneyReducedAmount,
            note : values.note
        };
        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && result.id) {
                onHide(result);
            } else {
                toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    }

    getAllCompany(){
        let setStateInRequest = (list) => { this.setState({ listAllCompany: list }) };
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
        var url = '/assets/images/logo_timec.png';
        FormatterUtils.downloadImageDataUri(url, this, "imageLogo");
        const {updateField} = this.props;
        this.getAllCompany();
        updateField("reducedAmount", 0);
        updateField("originAmount", 0);
    };
   

    render() {

            const { handleSubmit, submitting, title, invalid } = this.props;
            const modalConfig = { backdrop: 'static', show: this.props.show, bsSize: "lg"};

            var listAllCompany = this.state.listAllCompany;
            var optionCompany = [];
            if(listAllCompany){
                listAllCompany.map(company =>{
                    optionCompany.push({label : company.name, value : company.id })
                })
            }
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
                                    <div className="row">
                                        <div className="page-header"> </div>
                                    </div>
                                    <div className="row" style={{ paddingLeft: "10px" }}>
                                        <div className="col col-md-6" >
                                            <Field label="Khách Hàng" name="companyId"  options={optionCompany} component={RenderSelect}></Field>
                                        </div>
                                    </div>
                                    <div className="row" style={{ paddingLeft: "10px" }}>
                                        <div className="col col-md-6" style={{ paddingLeft: "10px" }}>
                                            <Field label="Số Tiền" name="originAmount" component={RenderMoneyFormat}></Field>
                                        </div>
                                    </div>
                                    <div className="row" style={{ paddingLeft: "10px" }}>
                                        <div className="col col-md-6" style={{ paddingLeft: "10px" , float : "left"}}>
                                        <   Field label="Thông tin Chi Tiết" name="note" rows={10} component={RenderTextArea}></Field>
                                        </div>
                                    </div>
                                    <div className="row" style={{ paddingLeft: "10px" }}>
                                        <div className="col col-md-1" style={{ paddingLeft: "10px", paddingTop: "30px" }}>
                                            <button type="submit" className="btn bg-success btn-xlg" disabled={submitting}>Tạo Phiếu Thu</button>
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
            form: 'PagePaymentGroup',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(PagePaymentGroup)));