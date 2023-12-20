import React from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import { RenderDatePicker, RenderInputWithDiv, RenderMoneyFormat, RenderNumberInput, RenderSelect } from '../../components/formInputs';
import agent from '../../services/agent';
import { LOAD_UPDATING_INPUT_STOCK } from './action-types';

const validate = values => {
    const errors = {};
    if(values.salePrice){
        if(parseInt(values.salePrice)<parseInt(values.importPrice)){
            errors.salePrice = "Giá Bán Không Được Nhỏ Hơn Giá Nhập!"
        }
    }
    if(parseInt(values.inputAmount) <= 0){
        errors.inputAmount = "Số Lượng phải lớn hơn 0!"
    }
    // if (!values.producedDate) {
    //     errors.producedDate = 'Vui lòng ngày sản xuất!';
    // }else if(values.inputDate < values.producedDate){
    //     errors.producedDate = 'Ngày Nhập phải lớn hơn ngày SX!';
    // }else if(values.inputDate > values.expiredDate){
    //     errors.producedDate = 'Thuốc quá hạn dùng, không được nhập vào kho!';
    // }
    return errors;
}
const selector = formValueSelector("RowEditDrugByInputForm");
const mapStateToProps = state => {
    var updateValue = {
        ...state.inputStockReducer.updatingInputStock,

    };
    return {
        initialValues: updateValue,
        currentUser:state.common.currentUser ,
        currentValues: selector(state, 
            'drugId',
            "batchBarcode",
            "producedDate",
            "inputDate",
            "expiredDate",
            "importPrice",
            "salePrice",
            "inputAmount","producedCode"
            )

    };
};

const mapDispatchToProps = dispatch => ({
    loadInputStock: (payload) =>
        dispatch({ type: LOAD_UPDATING_INPUT_STOCK, payload: payload }),
        updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "RowEditDrugByInputForm", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});


class RowEditDrugByInputForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllDrug:[],
        }
        // this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.handleOnKeyPress=(ev)=>{
            if(ev.keyCode === 27){
                this.props.getListInputStockByINputForm()
                // window.location.reload(true);
            }
            
        }
        this.handleEndTab=(ev)=>{
            const {eventNewRow, currentValues , validate} = this.props;
            if(currentValues.inputAmount == 0){
                if(ev.keyCode === 27){
                    this.props.getListInputStockByINputForm();
                }else{
                    validate(currentValues.inputAmount);
                }
            }else{
                if(eventNewRow && (ev.keyCode === 13 || ev.keyCode === 9)){
                    this.handleAdd(currentValues, true);
                }else if(!eventNewRow && (ev.keyCode === 13 || ev.keyCode === 9) ){
                    this.handleAdd(currentValues, false);
                }else if(ev.keyCode === 27){
                    this.props.getListInputStockByINputForm();
                }
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
        const { loadInputStock, item} = this.props;
        this.getlistAllDrug();
        loadInputStock({ resultData: item});
    }

    handleAdd(values, dowRow) {
        const { indexRow,item, inputFormId, currentUser, updateField,drugStoreId, destroy} = this.props;
        var _this = this;
        var id = item.id;
        if(id == null){
            var url = "/inputStock/addByInputForm";
        }else{
            var url = "/inputStock/update";
        }
        
        var bodyObject = {
            id : id,
            inputFormId: inputFormId,
            drugId: values.drugId,
            drugStoreId : drugStoreId,
            inputAmount: values.inputAmount ? values.inputAmount : 0,
            batchBarcode : values.batchBarcode,
            producedDate : values.producedDate,
            inputDate : values.inputDate,
            expiredDate : values.expiredDate,
            importPrice : values.importPrice,
            salePrice : values.salePrice,
            remainAmount : values.inputAmount,
            producedCode : values.producedCode,
        };
        // if(!producedDate ){
        //     toast.info("Chưa nhập ngày sản xuất");
        // }else if(producedDate > inputDate){
        //     toast.info("Ngày nhập kho chưa đúng!");
        // }else if(producedDate > expiredDate){
        //     toast.info("Ngày nhập kho chưa đúng!");
        // }
        return agent.asyncRequests.post(url, bodyObject
            ).then(function (res) {
                var result = res.body.resultData;
                if (result) {
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
    
        deleteInputStock(id) {
            var this_ = this;
            var url = `/inputStock/${id}`;
            return agent.asyncRequests.del(url
            ).then(function (res) {
                var result = res.body.resultData;
                if (result && !result.error) {
                    // alert("Xoá Thành Công !");
                    this_.props.getListInputStockByINputForm();
                } else {
                    toast.error("Có lỗi khi xóa dữ liệu. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Không thể xóa dữ liệu đang được sử dụng từ màn hình khác! ", { autoClose: 15000 });
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

        const {columnNameClicked, item } = this.props;
        var editRow = null;
        var optionStock = []; 
        this.state.listAllDrug.map(item=>{
            optionStock.push({label:item.name + " (" + item.uom + ")", value:item.id})
        })
        if(this.props.isShowEdit ==true){
        editRow = (<tr onKeyDown={(ev)=>this.handleOnKeyPress(ev)}  role="form" >
               <td></td>
                <td>
                    <Field name="batchBarcode" placeholder="Mã Lô..."  autoFocus={ columnNameClicked =="batchBarcode"  } component={RenderInputWithDiv}></Field>
                </td>
                <td>
                    <Field name="drugId" options={optionStock}  component={RenderSelect} autoFocus={ columnNameClicked =="drugName" } ></Field>
                </td>
                <td>
                    <Field name="producedCode"     autoFocus={ columnNameClicked =="producedCode" }        component={RenderInputWithDiv}></Field>
                </td>
                <td>
                    <Field name="inputDate"     autoFocus={ columnNameClicked =="inputDate" }        component={RenderDatePicker}></Field>
                </td>
                <td>
                    <Field name="salePrice"     autoFocus={ columnNameClicked =="salePrice" }        component={RenderMoneyFormat}></Field>
                </td>
                <td>
                    <Field name="importPrice"     autoFocus={ columnNameClicked =="importPrice" }        component={RenderMoneyFormat}></Field>
                </td>
                <td>
                    <Field name="producedDate"     autoFocus={ columnNameClicked =="producedDate" }          component={RenderDatePicker}></Field>
                </td>
                <td>
                    <Field name="expiredDate"     autoFocus={ columnNameClicked =="expiredDate" }        component={RenderDatePicker}></Field>
                </td>
                <td>
                    <Field name="inputAmount"     autoFocus={ columnNameClicked =="inputAmount" }     onEnterAction={(e)=>this.handleEndTab(e)}      component={RenderNumberInput}></Field>
                </td>
                <td>
                    <button style={{ margin: "auto", boxShadow: "none" }} className="btn btn-default" onClick={() => this.deleteInputStock(item.id)}>Xoá</button>
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
            form: 'RowEditDrugByInputForm',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(RowEditDrugByInputForm)));
