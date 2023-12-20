import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { FormatterUtils } from '../../utils/javascriptUtils';
import TabDrugByOutputForm from './TabDrugByOutputForm';
import { RenderInputWithDiv, RenderInputWithGen, RenderTextArea, RenderDatePicker, RenderCheckbox, RenderSelect, RenderNumberInput, RenderMoneyFormat } from '../../components/formInputs';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import moment from 'moment';


const validate = values => {
    const errors = {};
    return errors;
}
var today = new Date();

const mapStateToProps = state => {
    var updateValue = {
    };
    return {
        initialValues: updateValue,
        currentUser: state.common.currentUser,
    };
};

const mapDispatchToProps = dispatch => ({
        updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "OutputStockFrom", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});
class OutputStockFrom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            totalPrice : 0,
            listAllDrugStore : null,
            outputForm : null, 
            listAllDrug : null,
            listAllDrugByInputForm : null , 
            drugChoose : null

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
        this.getOutputForm  = this.getOutputForm.bind(this);
     };
  
     getOutputForm(){
        let id = this.props.match.params.id;
        let setStateInRequest = (obj) => { this.setState({ outputForm: obj }) }
        return agent.asyncRequests.get("/outputForm/getId?id="+id
            ).then(function (res) {
                var result = res.body.resultData;
                if (result) {
                    setStateInRequest(result);
                } else {
                    toast.error("Có lỗi khi tải dữ liệu", { autoClose: 4000 });
                }
            }, function (err) {
                toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                +" Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
            });
    }

    componentWillMount() {
        this.getOutputForm();
        this.setState({
            totalPrice : 0
        })
    }

    handleBackInvoiceList(){
        window.location.href = "/listInvoice";
    }
    render() {
        const { handleSubmit, submitting, title, updateField,invalid,patientIdSelector, backToList, hospitalId,hospitalIdSelector,
            doctorId, currentUser, insuranceTypeIdSelector } = this.props;
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

        let id = this.props.match.params.id;
        
        var totalPrice = this.state.totalPrice;
        var newModal = null;
        newModal =
            <div className="content-wrapper">
                <div className="page-header page-header-default">
                    <div className="breadcrumb-line">
                        <ul className="breadcrumb">
                            <li><a href=""><i className="icon-home2 position-left"></i> Home</a> </li>
                            <li className="active">Phiếu Xuất Kho</li>
                        </ul>
                        <div className="heading-elements">
                            <div className="heading-btn-group">
                                {/* <button className="btn bg-teal" onClick={() => this.handleBackInvoiceList()}>Về "Tổng Kho"</button> */}
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
                                            <span>Tổng tiền: </span>{FormatterUtils.formatCurrency(totalPrice)}
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="panel panel-flat">
                                        <div className="panel-body">
                                            
                                            <br/>
                                            <div className="tabbable">
                                                <ul className="nav nav-tabs nav-tabs-solid nav-tabs-component bg-teal" style={{marginBottom:"0"}}>
                                                    <li className="active">
                                                        <a href="#default-justified-tab1" data-toggle="tab"><i className="icon-menu6"></i> Danh Sách Thuốc - Mã Phiếu {id} </a>
                                                    </li>
                                                </ul>

                                                <div className="tab-content">
                                                   {this.state.outputForm ?  <TabDrugByOutputForm currentUser={currentUser} 
                                                    outputForm ={this.state.outputForm}
                                                    handleShowPrice = {(priice, status) => this.handleShowPrice(priice, status)}
                                                    drugChoose = {this.state.drugChoose}
                                                    >
                                                    </TabDrugByOutputForm> : null}
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
            form: 'OutputStockFrom',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(OutputStockFrom)));
