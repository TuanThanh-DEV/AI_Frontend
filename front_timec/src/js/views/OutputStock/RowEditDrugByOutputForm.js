import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { RenderInputWithDiv, RenderInputWithGen, RenderTextArea, RenderDatePicker, RenderCheckbox, RenderSelect, RenderNumberInput, RenderMoneyFormat } from '../../components/formInputs';
import { LOAD_UPDATING_OUTPUT_STOCK } from './action-types';


const validate = values => {
    const errors = {};
    
    return errors;
}
const selector = formValueSelector("RowEditDrugByOutputForm");
const mapStateToProps = state => {
    var updateValue = {
        ...state.outputStockReducer.updatingOutputStock,

    };
    return {
        initialValues: updateValue,
        currentUser:state.common.currentUser ,
        currentValues: selector(state, 
            'drugId',
            "barCode",
            "producedDate",
            "outputDate",
            "expiredDate",
            "importPrice",
            "salePrice",
            "outAmount"
            )

    };
};

const mapDispatchToProps = dispatch => ({
    loadOutputStock: (payload) =>
        dispatch({ type: LOAD_UPDATING_OUTPUT_STOCK, payload: payload }),
        updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "RowEditDrugByOutputForm", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});


class RowEditDrugByOutputForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllDrug:[],
        }
        // this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.handleOnKeyPress=(ev)=>{
            if(ev.keyCode === 27){
                this.props.getListOutputStockByOutputForm();
            }
            
        }
        this.handleEndTab=(ev)=>{
            const {eventNewRow, currentValues , validate} = this.props;
            if(eventNewRow && ev.keyCode === 13){
                this.handleAdd(currentValues, false);
            }
            else if(!eventNewRow && ev.keyCode === 13){
                this.handleAdd(currentValues, true);
            }else if(ev.keyCode === 27){
                this.props.getListOutputStockByOutputForm();
            }
        }
        this.handleFindBarCode=(ev)=>{
            const {eventNewRow, currentValues , validate} = this.props;
                if(eventNewRow && ev.keyCode === 13){
                  this.handleInsertDrugByBarCode(currentValues, false);
                }else if(ev.keyCode === 27){
                    this.props.getListOutputStockByOutputForm();
                }
        }
    }
    getlistAllDrug(){
        let setStateInRequest = (list) => { this.setState({ listAllDrug: list }) }
        return agent.DrugApi.listAllDrug(
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
   
    componentWillMount() {
        const { loadOutputStock, item} = this.props;
        this.getlistAllDrug();
        loadOutputStock({ resultData: item});
    }

    handleInsertDrugByBarCode(values, dowRow){
        var _this = this;
        const {outputForm, indexRow} = this.props;
        return agent.asyncRequests.get("/outputStock/newByOutputForm?barCode="+ values.barCode +"&outputFormId=" +outputForm.id
            ).then(function (res) {
                var result = res.body.resultData;
                if (result) {
                    _this.props.handleNewRow(indexRow,false,dowRow);
                } else {
                    // toast.error("Mã Thuốc Không Đúng!");
                    toast.info(res.body.errorMessage, { autoClose: 4000 });
                }
            }, function (err) {
                toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
            });
    }
    handleAdd(values, dowRow) {
        const { indexRow ,item  ,outputForm , destroy} = this.props;
        var _this = this;
        var url = "/outputStock/updateByOutputForm";
        var bodyObject = {
            id : item.id,
            outputFormId: outputForm.id,
            drugId: values.drugId,
            drugStoreId : item.drugStoreId,
            batchBarcode : item.batchBarcode,
            producedDate : values.producedDate,
            outputDate : values.outputDate,
            expiredDate : values.expiredDate,
            importPrice : values.importPrice,
            salePrice : values.salePrice,
            outAmount : values.outAmount,
        };
        return agent.asyncRequests.post(url, bodyObject
            ).then(function (res) {
                var result = res.body.resultData;
                if (result == "success") {
                    destroy();
                        _this.props.handleNewRow(indexRow,true,dowRow);
                } else {
                    // toast.error("Mã Thuốc Không Đúng!");
                    toast.error(res.body.errorMessage);
                }
            }, function (err) {
                toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
            });
        }
    
    

    ///Hide and Clean Value
    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        // event.preventDefault();
        onHide();
        destroy();
    }
    render() {

        const {columnNameClicked , item} = this.props;
        var activeDisabled = false;
        if(item.id){
            activeDisabled = true
        }
        var editRow = null;
        var optionStock = []; 
        this.state.listAllDrug.map(item=>{
            optionStock.push({label:item.name , value:item.id})
        })
        if(this.props.isShowEdit ==true){
        editRow = (<tr onKeyDown={(ev)=>this.handleOnKeyPress(ev)}  role="form" >
               <td></td>
                <td>
                    <Field name="barCode" disabled={activeDisabled} autoFocus={ columnNameClicked =="barCode"  } onEnterAction={(e)=>this.handleFindBarCode(e)} component={RenderInputWithDiv}></Field>
                </td>
                <td>
                    <Field name="drugId" disabled={true} autoFocus={ columnNameClicked =="drugName" } options={optionStock}  component={RenderSelect}  ></Field>
                </td>
                <td>
                    <Field name="producedDate"  disabled={true}   autoFocus={ columnNameClicked =="producedDate" }          component={RenderDatePicker}></Field>
                </td>
                <td>
                    <Field name="outputDate"   disabled={true}  autoFocus={ columnNameClicked =="outputDate" }        component={RenderDatePicker}></Field>
                </td>
                <td>
                    <Field name="expiredDate"  disabled={true}   autoFocus={ columnNameClicked =="expiredDate" }        component={RenderDatePicker}></Field>
                </td>
                <td>
                    <Field name="importPrice"  disabled={true}  autoFocus={ columnNameClicked =="importPrice" }        component={RenderNumberInput}></Field>
                </td>
                <td>
                    <Field name="salePrice"   disabled={true}  autoFocus={ columnNameClicked =="salePrice" }        component={RenderNumberInput}></Field>
                </td>
                <td>
                    <Field name="outAmount"     autoFocus={ columnNameClicked =="outAmount" }     onEnterAction={(e)=>this.handleEndTab(e)}      component={RenderNumberInput}></Field>
                </td>
            </tr>
        )
    }
        return editRow;
    }
};


export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'RowEditDrugByOutputForm',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(RowEditDrugByOutputForm)));
