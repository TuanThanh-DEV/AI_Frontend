import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import {RenderSelect, RenderNumberInput } from '../../components/formInputs';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';

const validate = values => {
    const errors = {};
    if(!values.outAmount || values.outAmount == 0){
        errors.outAmount = "Nhập số lượng!";
    }
    return errors;
}
const selector = formValueSelector("RowEditOutputCabinet");
const mapStateToProps = state => {
    return {
        currentUser:state.common.currentUser ,
        currentValues: selector(state, 
            'drugId',
            "outAmount"
            )
    };
};

const mapDispatchToProps = dispatch => ({
        updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "RowEditOutputCabinet", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});


class RowEditOutputCabinet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listStock:[],
            drugCabinet : null
        }
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.handleOnKeyPress=(ev)=>{
            if(ev.keyCode === 27){
                this.props.getListOutputCabinet()
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
                this.props.getListOutputCabinet()
            }
        }
    }
    getDrugByHospital(){
        const {currentUser, departmentId} = this.props;
        let setStateInRequest = (list) => { this.setState({ listStock: list }) }
        return agent.asyncRequests.get('/stockCabinet/getByDepartmentAndUser?departmentId='+departmentId+"&userId=" + currentUser.id
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

    getDrugCabinet(){
        const {currentUser, departmentId} = this.props;
        let setStateInRequest = (drugCabinet) => { this.setState({ drugCabinet: drugCabinet }) }
        return agent.asyncRequests.get('/drugCabinet/getByDepartmentAndUser?departmentId='+departmentId+"&userId=" + currentUser.id
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
        this.getDrugCabinet();
        updateField("drugId", item.drugId);
        updateField("outAmount", item.outAmount);
    }

    handleAdd(values, dowRow) {
        const { indexRow,item, inputCabinetFormId,prescriptionId, destroy} = this.props;
        let drugCabinetId = this.state.drugCabinet.id;

        var _this = this;
        var id = item.id;
        if(id == null){
            var url = "/outputCabinet/add";
        }else{
            var url = "/outputCabinet/update";
        }
        
        var bodyObject = {
            id : id,
            drugId: values.drugId,
            outAmount : values.outAmount,
            drugCabinetId : drugCabinetId,
            prescriptionId : prescriptionId

        };
   
        return agent.asyncRequests.post(url, bodyObject
            ).then(function (res) {
                var result = res.body;
                if (result.resultData) {
                    destroy();
                    _this.props.handleNewRow(indexRow,true,dowRow);
                } else {
                    // toast.error("Mã Thuốc Không Đúng!");
                    if(result.number > 0){

                        toast.error("Số lượng không đủ. tối đa : " + result.number );
                    }else{
                        toast.error("Thuốc này đã hết, vui lòng nhập thêm!" );
                    }
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
            if(item.available > 0 ){

                optionStock.push({label:item.drug.name + " " + item.drug.hamLuongBHYT + " \t ( " + item.drug.uom + " ) " + " / " +item.available  , value:item.drug.id})
            }

        })
        if(this.props.isShowEdit ==true){
        editRow = (<tr onKeyDown={(ev)=>this.handleOnKeyPress(ev)}  role="form" >
               <td></td>
                <td>
                    <Field name="drugId" placeholder="Tên Thuốc..."  autoFocus={ columnNameClicked =="drugId"} options={optionStock}  component={RenderSelect}></Field>
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
            form: 'RowEditOutputCabinet',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(RowEditOutputCabinet)));
