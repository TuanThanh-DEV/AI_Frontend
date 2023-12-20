import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderSelect, RenderDatePickerWithTime, RenderDatePicker } from '../../components/formInputs';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_INVOICE } from './action-types';
import ModalInvoiceItem from './ModalInvoiceItemRefurn';
import moment from 'moment';
const validate = values => {
    const errors = {};
    if (!values.patientId) {
        errors.patientId = "Vui lòng chọn tên bệnh nhân!"
    }
    if (!values.userId) {
        errors.userId = "Vui lòng chọn tên người chịu trách nhiệm!"
    }
    if (!values.cashDesk) {
        errors.cashDesk = "Vui lòng chọn quầy thu ngân"
    }
    if (!values.prescriptionId) {
        errors.prescriptionId = "Vui lòng chọn đơn thuốc"
    }
    if (!values.createdDate) {
        errors.createdDate = "Vui lòng chọn ngày lập"
    }
    if (!values.paymentDate) {
        errors.paymentDate = "Vui lòng chọn ngày thanh toán"
    }
    return errors;
}
const selector = formValueSelector('ModalInvoiceRefurn');
var today = moment(new Date, "HH:mm DD/MM/YYYY");
const mapStateToProps = state => {

    var updateValue = {
        ...state.invoiceReducer.updatingInvoice,
        createdDate: state.invoiceReducer.updatingInvoice && state.invoiceReducer.updatingInvoice.createdDate ? moment(state.invoiceReducer.updatingInvoice.createdDate) : today,
        userId: state.invoiceReducer.updatingInvoice && state.invoiceReducer.updatingInvoice.userId ? state.invoiceReducer.updatingInvoice.userId : state.common.currentUser

    };
    return {
        initialValues: updateValue,
        createdUser: selector(state, "userId"),
        currentUser: state.common.currentUser,
    };
};
const mapDispatchToProps = dispatch => ({
    loadInvoice: (payload) =>
        dispatch({ type: LOAD_UPDATING_INVOICE, payload: payload }),
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalInvoiceRefurn", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});
class ModalInvoiceRefurn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isInvoiceItemModalShown: false,
            isInvoiceModalRefurnShown: false,
        }

        this.handleShowmodal = this.handleShowmodal.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.handleHidemodal = () => {
            this.setState({ isInvoiceItemModalShown: false });
            this.setState({ isInvoiceModalRefurnShown: false });
        };
        this.handleLoadPatientCodeByPatientId = (patientId) => {
            const { updateField } = this.props;
            
        }
    };
    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        destroy();
        onHide();
    }
    handleShowmodal(id,invoiceType,invoiceId) {
        this.setState({
            isInvoiceItemModalShown: true,
            idInvoiceItem: id,
            invoiceType: invoiceType,
            invoiceId: invoiceId
        });
    }
    handleShowInvoiceItem(invoiceId, invoiceType) {
        this.setState({
            invoiceType: invoiceType
        })
        let setStateInRequest = (list) => { this.setState({ listInvoiceItem: list }) }
        return (agent.asyncRequests.get("/invoiceItem/listAllByInvoiceId?invoiceId=" + invoiceId).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
               
            }
        }, function (err) {
            
        }))
    }

    componentWillMount() {
        const { loadInvoice , currentUser } = this.props;
        var id = this.props.idInvoice;
        var invoiceId = this.props.idInvoiceItemRefurn;
        const dataPromise = agent.InvoiceApi.getInvoice(id);
        loadInvoice(Promise.resolve(dataPromise))
        this.handleShowInvoiceItem(invoiceId.id, invoiceId.invoiceType);

    }

  

    render() {
        const { handleSubmit, submitting, title, invalid,createdUser,currentUser, } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show,bsSize:"md",  
        onHide: this.props.onHide, 
        submitting: this.props.submitting };
        var invoiceId = this.props.idInvoiceItemRefurn;
        var invoiceType = invoiceId.invoiceType;
        const { invoiceObject, t } = this.props;
        var dataInvoiceItem = this.state.listInvoiceItem;
        var invoiceItemRows = [];
        var groupDrugTypeHeader = [];
        var drug = [];
        var invoiceItemCurrentNo = 0;
        if (dataInvoiceItem) {
            invoiceItemRows = dataInvoiceItem.map(item => {
                if (item.invoice.invoiceType == "DRUG") {
                    invoiceItemCurrentNo++;
                    return (
                        <tr key={item.id} >
                         
                            <td>{invoiceItemCurrentNo}</td>
                            {/* <td >{item.invoice.patient.fullName}</td> */}
                            <td colSpan="2" >{item.inputStock.drug ? item.inputStock.drug.name + " " + item.inputStock.drug.hamLuongBHYT : ""}</td>
                            <td colSpan="2" >{item.numberOfItems}</td>
                            <td colSpan="2" >{item.amountNoVat}</td>
                            <td colSpan="2" >{item.amountWithVat}</td>
                            <td colSpan="2" > <button type="button" className="btn bg-success btn-xlg" onClick={() => this.handleShowmodal(item,item.invoice.invoiceType,invoiceId)}>Hoàn Trả</button></td>
                        </tr>
                    );
                } else if (item.invoice.invoiceType == "DIAGNOSIS_SERVICE") {
                    invoiceItemCurrentNo++;
                    return (
                        <tr key={item.id}>
                          
                            <td>{invoiceItemCurrentNo}</td>
                            {/* <td >{item.invoice.patient.fullName}</td> */}
                            <td colSpan="3" >{item.diagnosisService ? item.diagnosisService.name : ""}</td>
                            <td colSpan="3" > {(item.prescription ? item.prescription.analysis : "")}</td>
                            {/* <td colSpan="2" >{item.numberOfItems}</td> */}
                            <td colSpan="2" >{item.amountNoVat}</td>
                            <td colSpan="2" >{item.amountWithVat}</td>
                        </tr>
                    );
                } else if (item.invoice.invoiceType == "PROCEDURE_SERVICE") {
                    invoiceItemCurrentNo++;
                    return (
                        [<tr key={item.id}>
                        
                            <td>{invoiceItemCurrentNo}</td>
                            <td colSpan="3">{item.procedureService ? item.procedureService.name : ""}</td>
                            <td colSpan="3">{(item.prescription ? item.prescription.analysis : "")}</td>
                            {/* <td colSpan="2">{item.numberOfItems}</td> */}
                            <td colSpan="2">{item.amountNoVat}</td>
                            <td colSpan="2">{item.amountWithVat}</td>
                        </tr>
                        ]

                    )
                };
            })
        }
        if (invoiceType && invoiceType == "DRUG") {
            drug = [
                <tr className="bg-success">
                   
                    <th style={{ textAlign: "center" }} data-toggle="true">STT</th>
                    {/* <th  data-toggle="true">Tên Bệnh Nhân </th> */}
                    <th style={{ textAlign: "center" }} colSpan="2" data-toggle="true">Tên Thuốc </th>
                    <th style={{ textAlign: "center" }} colSpan="2" data-toggle="true"> Số Lượng Thuốc Đã Mua </th>
                    <th style={{ textAlign: "center" }} colSpan="2" data-toggle="true">Tiền Không VAT </th>
                    <th style={{ textAlign: "center" }} colSpan="2" data-toggle="true">Tiền Gồm VAT </th>
                    <th></th>
                </tr>
            ]
        } else if (invoiceType && invoiceType == "DIAGNOSIS_SERVICE") {
            drug = [
                <tr className="bg-success">
                   
                    <th data-toggle="true">STT</th>
                    {/* <th   data-toggle="true">Tên Bệnh Nhân </th>                */}
                    <th colSpan="3" data-toggle="true">Tên Dịch Vụ Chỉ Định</th>
                    <th colSpan="3" data-toggle="true">Chẩn đoán </th>
                    {/* <th colSpan="2" data-toggle="true">Số  Chẩn Đoán</th> */}
                    <th colSpan="2" data-toggle="true">Tiền Không VAT </th>
                    <th colSpan="2" data-toggle="true">Tiền Gồm VAT </th>
            
                </tr>
            ]
        } else if (invoiceType && invoiceType == "PROCEDURE_SERVICE") {
            drug = [
                <tr className="bg-success">
                   
                    <th data-toggle="true">STT</th>
                    {/* <th   data-toggle="true">Tên Bệnh Nhân </th>         */}
                    <th  colSpan="3" data-toggle="true">Tên Dịch Vụ Thủ Thuật </th>
                    <th  colSpan="3" data-toggle="true">Chẩn đoán</th>
                    {/* <th  colSpan="2" data-toggle="true">Số Thủ Thuật </th> */}
                    <th  colSpan="2" data-toggle="true">Tiền Không VAT </th>
                    <th  colSpan="2" data-toggle="true">Tiền Gồm VAT </th>
                </tr>
            ]
        }
     

       

        // var optionUser = []; 
        // this.state.listAllPersonel.map(item=>{
        //     optionUser.push({label:item.fullName ,value:item.id})
        // })
      
        var newModal = null;
        newModal =
            <div style={{ width: '30%' }}>
                <Modal
                    {...modalConfig}
                    
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-sm"><center>{title}</center> </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {submitting ? <LoadingScreen /> :
                          <div className="panel panel-flat">
                          <table className="table table-xxs table-bordered">
                              <thead>
                                  {drug}
                                 
                              </thead>
                              <tbody>
                              {invoiceItemRows}
                              </tbody>
                          </table>
                      </div>
                               
                        
                        }
                    </Modal.Body>
                </Modal>
                {this.state.isInvoiceItemModalShown ? <ModalInvoiceItem
                                title= "Nhập Số Lượng Hoàn Trả"
                                idInvoiceItem={this.state.idInvoiceItem} 
                                invoiceType={this.state.invoiceType}
                                invoiceId={this.state.invoiceId}
                                show={this.state.isInvoiceItemModalShown} 
                                onHide={this.handleHidemodal} /> : null
                            }
            </div>
        return newModal;
    }
};
export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'ModalInvoiceRefurn',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalInvoiceRefurn)));
