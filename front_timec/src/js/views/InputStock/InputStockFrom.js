import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { FormatterUtils } from '../../utils/javascriptUtils';
import TabDrugByInputForm from './TabDrugByInputForm';
import { RenderInputWithDiv, RenderPlainTextArea, RenderTextArea, RenderMoneyFormat } from '../../components/formInputs';
import {LOAD_UPDATING_INPUT_FORM_1} from './action-types';
import FormSearchBarcode from './FormSearchBarcode';

const validate = values => {
    const errors = {};
    if (!values.invoiceNumberSupplier) {
        errors.invoiceNumberSupplier = "Vui lòng điền mã đơn mua hàng từ nhà cung cấp."
    }
    return errors;
}
var today = new Date();

const mapStateToProps = state => {
    var updateValue = {
        ...state.inputStockReducer.updatingInputForm, 

    };
    return {
        initialValues: updateValue,
        currentUser: state.common.currentUser,
    };
};

const mapDispatchToProps = dispatch => ({
    loadInputForm: (payload) => 
        dispatch({ type: LOAD_UPDATING_INPUT_FORM_1, payload: payload }),
        updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "InputStockFrom", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});
class InputStockFrom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            totalPrice : 0,
            listAllDrugStore : null,
            drugStoreId : null
        }
        this.handleHidemodal = () => {
            this.setState({
                isPrescriptionItemShown: false,
            });
            
        }
        this.handleHidemodalControl = () => {
            this.setState({
                isShowMenuControl: false,
            });
        }
        this.handleShowPrice = (price, status) => {
            // var totalPrice = this.state.totalPrice;
            if(status == "add"){
                // totalPrice =  totalPrice + price;
                this.setState({
                    totalPrice: price.totalPriceDug
                });
            }else if(status == "payment_success"){
                this.setState({
                    totalPrice: 0,
                });
            }
            
        }
        this.getDrugStore  = this.getDrugStore.bind(this);
        this.handleUpdate  = this.handleUpdate.bind(this);
     };
  
    getDrugStore(){
        let id = this.props.match.params.id;
        let setStateInRequest = (id) => { this.setState({ drugStoreId: id }) }
        return agent.asyncRequests.get("/inputForm/getId?id="+id
            ).then(function (res) {
                var result = res.body.resultData;
                if (result) {
                    setStateInRequest(result.drugStoreId);
                } else {
                    toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                +" Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
            });
    }

    componentWillMount() {
        const { loadInputForm , destroy } = this.props;
        var id = this.props.match.params.id;
        destroy();
        if(id){
            const dataPromise = agent.InputFormApi.getInputForm(id);
            loadInputForm(Promise.resolve(dataPromise));
        }
        this.getDrugStore();
        this.setState({
            totalPrice : 0
        })
    }
    handleChangeDrugStore(values){
        alert(values)
    }
    handleBackInvoiceList(){
        window.location.href = "/listInvoice";
    }

    handleUpdate(values) {
        var id = this.props.match.params.id;
        var url = '/inputForm/updateNote';
        var bodyObject = {
            id: id,
            invoiceNumberSupplier: values.invoiceNumberSupplier,
            reducedAmountSupplier: values.reducedAmountSupplier,
            invoiceAmountSupplier : values.invoiceAmountSupplier,
            supplierName : values.supplierName,
            note: values.note,
        };

        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && result.id) {
              toast.info("Lưu Thành Công.", {autoClose: 1000});
            } else {
                toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    
    }

    render() {
        const { handleSubmit, submitting, title, updateField,invalid,patientIdSelector, backToList, hospitalId,hospitalIdSelector,
            doctorId, currentUser, insuranceTypeIdSelector, initialValues } = this.props;
        var inputFormId = this.props.match.params.id;

        const modalConfig = {
            backdrop: 'static', show: this.props.show, bsSize: "sm",
            onHide: this.props.onHide,
            submitting: this.props.submitting,
            idPrescription : this.props.idPrescription
        };

        var dataDrugStore = this.state.listAllDrugStore;
        var optionDrugStore = []
        if(dataDrugStore){
            dataDrugStore.map(item => {
                optionDrugStore.push({label:item.name , value:item.id} );
            })
        }

        var totalPrice = this.state.totalPrice;
        var newModal = null;
        newModal =
            <div className="content-wrapper">
                <div className="page-header page-header-default">
                    <div className="breadcrumb-line">
                        <ul className="breadcrumb">
                            <li><a href=""><i className="icon-home2 position-left"></i> Home</a> </li>
                            <li className="active">Phiếu Nhập Kho</li>
                        </ul>
                        <div className="heading-elements">
                            <div className="heading-btn-group">
                                <a className="btn bg-teal" href="/listAllInputForm" ><i className="icon-backward2"></i> Về Danh Sách Phiếu Nhập</a>
                                <a className="btn bg-teal" href="/listStock" ><i className="icon-backward2"></i> Về Tổng Kho</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="row">
                        <div className="panel panel-flat">
                            <div className="panel-body">
                                <div className="pull-right" style={{width:'200px', marginRight:"32px", height:'30px'}}>
                                    <div className="bg bg-teal" style={{height: "50px",lineHeight: "30px", fontSize: "13px",paddingLeft: "10px"}} >
                                    <span>Giá Trị Nhập Kho: </span>{FormatterUtils.formatCurrency(totalPrice)} VNĐ
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="panel panel-flat">
                                    
                                        <div className="panel-body">
                                            <form className="form-horizontal" role="form"  onSubmit={handleSubmit(this.handleUpdate)}>
                                                <div className="form-group">
                                                    <div className="col-md-4">
                                                        <Field name="invoiceNumberSupplier" label="Mã hóa đơn mua hàng (Nhà Cung Cấp)" placeholder="Mã hóa đơn từ nhà cung cấp" component={RenderInputWithDiv}></Field>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <Field name="invoiceAmountSupplier" label="Tổng hóa đơn mua hàng" placeholder="Tiền hóa đơn từ nhà cung cấp" component={RenderMoneyFormat}></Field>
                                                    </div>
                                                    <div className="col-md-4">
                                                        <Field name="reducedAmountSupplier" label="Giảm giá" placeholder="Số tiền được chiết khấu" component={RenderMoneyFormat}></Field>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <Field name="supplierName" label="Thông Tin Nhà Cung Cấp" placeholder="Nhà cung cấp..." component={RenderTextArea}></Field>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <Field name="note" label="Ghi chú nhập kho" placeholder="Ghi chú..." component={RenderTextArea}></Field>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <button type="submit"  className="btn bg-success" disabled={submitting}> Lưu Lại</button>
                                                </div>
                                            </form>
                                            
                                        </div>
                                    </div>
                                </div>

                                {/* form search */}
                                {initialValues.status == 'OPEN' ? <FormSearchBarcode  inputFormId={inputFormId}  drugStoreId={this.state.drugStoreId} /> : null}

                                <div className="col-md-12">
                                    <div className="panel panel-flat">
                                    
                                        <div className="panel-body">
                                            <div className="tabbable">
                                            
                                                <ul className="nav nav-tabs nav-tabs-solid nav-tabs-component bg-teal" style={{marginBottom:"0"}}>
                                                    <li className="active">
                                                        <a href="#default-justified-tab1" data-toggle="tab"><i className="icon-menu6"></i> Danh Sách Thuốc / Vật Tư - Phiếu Nhập {inputFormId ? inputFormId : 'Mới'} </a>
                                                    </li>
                                                </ul>

                                                <div className="tab-content">
                                                    <TabDrugByInputForm currentUser={currentUser} 
                                                    inputFormId={this.props.match.params.id}
                                                    drugStoreId ={this.state.drugStoreId}
                                                    handleShowPrice = {(priice, status) => this.handleShowPrice(priice, status)}
                                                    >
                                                    </TabDrugByInputForm>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>

                                
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.isShowMenuControl ? <ModalMenuControll
                                title="Hàng Chờ" 
                                currentUser={currentUser} 
                                show={this.state.isShowMenuControl} 
                                onHide={this.handleHidemodalControl}
                                fillDataFromQueueNumberToPresciption ={(id) => this.fillDataFromQueueNumberToPresciption(id)}
                                /> : null
                }
            </div >
        return newModal;
    }
};
export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'InputStockFrom',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(InputStockFrom)));
