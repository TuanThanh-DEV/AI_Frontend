import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import {RenderSelect, RenderNumberInput } from '../../components/formInputs';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';

const validate = values => {
    const errors = {};
    if(!values.inputAmount || values.inputAmount == 0){
        errors.inputAmount = "Nhập số lượng!";
    }
    return errors;
}
const selector = formValueSelector("RowEditInputCabinet");
const mapStateToProps = state => {
    return {
        currentUser:state.common.currentUser ,
        currentValues: selector(state, 
            'drugId',
            "inputAmount"
            )
    };
};

const mapDispatchToProps = dispatch => ({
        updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "RowEditInputCabinet", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});


class RowEditInputCabinet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listStock:[],
        }
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.handleOnKeyPress=(ev)=>{
            if(ev.keyCode === 27){
                this.props.getListInputCabinet()
            }
        }
        this.handleEndTab=(ev)=>{
            const {eventNewRow, currentValues , validate} = this.props;
            if(eventNewRow && (ev.keyCode === 13 || ev.keyCode === 9)){
                this.handleAdd(currentValues, true);
            }
            else if(!eventNewRow && (ev.keyCode === 13 || ev.keyCode === 9)){
                this.handleAdd(currentValues, false);
            }else if(ev.keyCode === 27){
                this.props.getListInputCabinet()
            }
        }
    }
    getDrugByHospital(){
        const {currentUser} = this.props;
        let setStateInRequest = (list) => { this.setState({ listStock: list }) }
        return agent.asyncRequests.get('/stock/getByHospitalId?hospitalId=' + currentUser.hospitalId
            ).then(function (res) {
                var result = res.body.resultData;
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
        const {  item, updateField} = this.props;
        this.getDrugByHospital();
        updateField("drugId", item.drugId);
        updateField("inputAmount", item.inputAmount);
    }

    handleAdd(values, dowRow) {
        const { indexRow,item, inputCabinetFormId, destroy} = this.props;
        var _this = this;
        var id = item.id;
        if(id == null){
            var url = "/inputCabinet/add";
        }else{
            var url = "/inputCabinet/update";
        }
        
        var bodyObject = {
            id : id,
            inputCabinetFormId: inputCabinetFormId,
            drugId: values.drugId,
            inputAmount : values.inputAmount
        };
   
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
    

    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        onHide();
        destroy();
    }
    render() {

        const {columnNameClicked } = this.props;
        var editRow = null;
        var optionStock = []; 
        this.state.listStock.map(item=>{
            optionStock.push({label:item.drug.name + " " + item.drug.hamLuongBHYT + " \t ( " + item.drug.uom + " ) " + " / " +item.available  , value:item.drug.id})

        })
        if(this.props.isShowEdit ==true){
        editRow = (<tr onKeyDown={(ev)=>this.handleOnKeyPress(ev)}  role="form" >
               <td></td>
                <td>
                    <Field name="drugId" placeholder="Tên Thuốc..."  autoFocus={ columnNameClicked =="drugId"} options={optionStock}  component={RenderSelect}></Field>
                </td>
                <td>
                    <Field name="inputAmount"     autoFocus={ columnNameClicked =="inputAmount" }     onEnterAction={(e)=>this.handleEndTab(e)}      component={RenderNumberInput}></Field>
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
            form: 'RowEditInputCabinet',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(RowEditInputCabinet)));
