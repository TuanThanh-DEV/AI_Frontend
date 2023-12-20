// import React from 'react';
// import { connect } from 'react-redux';
// import agent from '../../services/agent';
// import { RenderInputWithDiv, RenderInputWithGen, RenderTextArea, RenderDatePicker, RenderCheckbox, RenderSelect, RenderNumberInput, RenderMoneyFormat } from '../../components/formInputs';
// import { Field, reduxForm, formValueSelector } from 'redux-form';
// import { toast } from 'react-toastify';
// import { translate } from 'react-i18next';
// import { LOAD_UPDATING_PRESCRIPTIONITEM } from '../prescriptionItem/action-types';

// const validate = values => {
//     const errors = {};
//     // if (!values.drugId) {
//     //     errors.drugId = 'Vui lòng nhập Thuốc.';
//     // }
//     return errors;
// }
// const selector = formValueSelector("RowEditDrugRetail");
// const mapStateToProps = state => {
//     var updateValue = {
//         ...state.prescriptionItemReducer.updatingPrescriptionItem,

//     };
//     return {
//         initialValues: updateValue,
//         currentValues: selector(state, 'drugId',
//             'drug.ingredient',
//             'totalAmount',
//             'instruction',
//             'morningAmount',
//             'noonAmount',
//             'afternoonAmount',
//             'eveningAmount',
//             'numberOfDays'
//             )

//     };
// };

// const mapDispatchToProps = dispatch => ({
//     loadPrescriptionItem: (payload) =>
//         dispatch({ type: LOAD_UPDATING_PRESCRIPTIONITEM, payload: payload }),
//         updateField: (fieldName, value) =>
//         dispatch({
//             meta: { form: "RowEditDrugRetail", field: fieldName },
//             payload: value,
//             type: "@@redux-form/CHANGE"
//         })
// });


// class RowEditDrugRetail extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             // listAllPrescriptionItems:[],
//             listAllStock:[],
//         }
//         this.handleAdd = this.handleAdd.bind(this);
//         this.handleHideAndClear = this.handleHideAndClear.bind(this);
//         this.handleOnKeyPress=(ev)=>{
//             // alert(ev.keyCode);
//             //TODO  ecep 
//             const { currentValues , eventNewRow} = this.props;
//             if(ev.keyCode === 13){
//                 // alert("hello Enter")
//                 this.handleAdd(currentValues, false);
//             }else if(ev.keyCode === 27){
//                 if(!eventNewRow){
//                     this.handleAdd(currentValues, false);
//                 }
//                 this.props.handleGetListPrescriptionItemByPrescriptionId()

//             }
//         }
//         this.handleEndTab=(ev)=>{
//             const {eventNewRow, currentValues , validate} = this.props;
//             if(validate){
//                 if(eventNewRow && ev.keyCode === 9){
//                     this.handleAddEndTabs(currentValues, true)
//                 }
//                 else if(eventNewRow && ev.keyCode === 13){
//                   this.handleAdd(currentValues, false);
                
//                 }
//                 else if(!eventNewRow && ev.keyCode === 13){
//                     this.handleAdd(currentValues, false);
                
//                 }else if(!eventNewRow && ev.keyCode === 9){
//                     this.handleAddEndTabs(currentValues, false);
//                 }
//             }else{
                
//             }
//         }
//         this.handleChangeDrug=(drugId)=>{
//             const {updateField,drugIdSelector} = this.props;
//             if(drugId){
//             this.state.listAllStock.map(item =>{
//                 if(item.drug.id === drugId){
//                     // TODO: failed to update
//                     setTimeout(() => {
//                         updateField("drug.ingredient", item.drug.ingredient);
//                     }, 50);
//                 }
//             })
//             }
//         }
        
//     }
//     getlistAllStock(){
//         let setStateInRequest = (list) => { this.setState({ listAllStock: list }) }
//         return agent.StockApi.listAllStock(
//             ).then(function (res) {
//                 var result = res.resultData;
//                 if (result) {
//                     setStateInRequest(result);
//                 } else {
//                     toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
//                 }
//             }, function (err) {
//                 toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
//                 +" Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
//             });
//     }
   
//     componentWillMount() {
//         const { loadPrescriptionItem, item} = this.props;
//         this.getlistAllStock();
//             loadPrescriptionItem({ resultData: item});
//     }

//     handleAdd(values, dowRow) {
//         const { item , indexRow, prescriptionId} = this.props;
//         var _this = this;
//         var url = '/prescriptionItem/add';
//         var bodyObject = {

//             prescriptionId: prescriptionId,
//             drugId: values.drugId,
//             morningAmount: values.morningAmount,
//             noonAmount: values.noonAmount,
//             afternoonAmount: values.afternoonAmount,
//             eveningAmount: values.eveningAmount,
//             numberOfDays: values.numberOfDays,
           
//             totalAmount: (values.morningAmount?values.morningAmount:0) * values.numberOfDays + 
//             (values.noonAmount?values.noonAmount:0) * values.numberOfDays + (values.afternoonAmount?values.afternoonAmount:0) * values.numberOfDays + 
//             (values.eveningAmount?values.eveningAmount:0) * values.numberOfDays,

//             instruction: "Sáng " + (values.morningAmount ? values.morningAmount : 0) + " , Trưa " + (values.noonAmount  ? values.noonAmount :0)
//             + " , Chiều " + (values.afternoonAmount ? values.afternoonAmount : 0) + " , Tối " + (values.eveningAmount ? values.eveningAmount : 0 ),

//         };
//         if (item.id) {
//             url = '/prescriptionItem/update';
//             bodyObject.id = item.id;
//         }
//         return agent.asyncRequests.post(url, bodyObject
//         ).then(function (res) {
//             var result = res.body.resultData;
//             if (result && result.id) {
//                 _this.props.handleEventEditTable(indexRow,false, dowRow);
//             } else {
//                 toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
//             }
//         }, function (err) {
//             toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
//         });

//     }

//     handleAddEndTabs(values, dowRow) {
//         const { item , indexRow, prescriptionId} = this.props;
//         var _this = this;
//         var url = '/prescriptionItem/add';
//         var bodyObject = {

//             prescriptionId: prescriptionId,
//             drugId: values.drugId,
//             morningAmount: values.morningAmount,
//             noonAmount: values.noonAmount,
//             afternoonAmount: values.afternoonAmount,
//             eveningAmount: values.eveningAmount,
//             numberOfDays: values.numberOfDays,
//             totalAmount: (values.morningAmount?values.morningAmount:0) * values.numberOfDays + 
//             (values.noonAmount?values.noonAmount:0) * values.numberOfDays + (values.afternoonAmount?values.afternoonAmount:0) * values.numberOfDays + 
//             (values.eveningAmount?values.eveningAmount:0) * values.numberOfDays,
//             instruction: "Sáng " + (values.morningAmount ? values.morningAmount : 0) + " , Trưa " + (values.noonAmount  ? values.noonAmount :0)
//             + " , Chiều " + (values.afternoonAmount ? values.afternoonAmount : 0) + " , Tối " + (values.eveningAmount ? values.eveningAmount : 0 ),

//         };
//         if (item ? item.id : null) {
//             url = '/prescriptionItem/update';
//             bodyObject.id = item.id;
//         }

//         return agent.asyncRequests.post(url, bodyObject
//         ).then(function (res) {
//             var result = res.body.resultData;
//             if (result && result.id) {
//                 _this.props.handleEventEditTable(indexRow,true, dowRow );
//                 // toast.info("Lưu Thành Công.", { autoClose: 1000 });
//             } else {

//                 toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
//             }
//         }, function (err) {
//             toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
//         });

//     }
    

//     ///Hide and Clean Value
//     handleHideAndClear() {
//         const { destroy, onHide } = this.props;
//         // event.preventDefault();
//         onHide();
//         destroy();
//     }
//     render() {

//         const { item,columnNameClicked } = this.props;
//         var editRow = null;
//         var optionStock = []; 
//         this.state.listAllStock.map(item=>{
//             optionStock.push({label:item.drug.name + ' (' + item.available +')', value:item.id})
//         })
//         if(this.props.isShowEdit ==true){
//         editRow = (<tr onKeyDown={(ev)=>this.handleOnKeyPress(ev)}  role="form" >
//                 <td>
//                 </td>
//                 <td>
//                     <Field name="drugId" options={optionStock}  component={RenderSelect}  onChangeAction={(value)=>{this.handleChangeDrug(value)}}  autoFocus={columnNameClicked=="drugName"} ></Field>
//                 </td>
//                 <td>
//                     <Field disabled="true" name="drug.ingredient" placeholder="Hoạt Chất..."    autoFocus={columnNameClicked=="drugIngredient"}           component={RenderInputWithDiv}></Field>
//                 </td>
                
//                 <td>
//                     <Field name="morningAmount" placeholder="Sáng..."   autoFocus={columnNameClicked=="instruction"} rows={1} component={RenderInputWithDiv}></Field>
//                 </td>
//                 <td>
//                     <Field name="noonAmount" placeholder="Trưa..."   autoFocus={columnNameClicked=="noonAmount"} component={RenderInputWithDiv}></Field>
//                 </td>
//                 <td>
//                     <Field name="afternoonAmount" placeholder="Chiều..."   autoFocus={columnNameClicked=="afternoonAmount"} component={RenderInputWithDiv}></Field>
//                 </td>
//                 <td>
//                     <Field name="eveningAmount" placeholder="Tối..."   autoFocus={columnNameClicked=="eveningAmount"} component={RenderInputWithDiv}></Field>
//                 </td>
//                 <td>
//                     <Field name="numberOfDays" placeholder="Ngày..."   autoFocus={columnNameClicked=="numberOfDays"} component={RenderInputWithDiv} onEnterAction={(e)=>this.handleEndTab(e)}></Field>
//                 </td>
//                 <td>
//                     <Field disabled="true" name="totalAmount"     autoFocus={columnNameClicked=="totalAmount"}           component={RenderInputWithDiv}></Field>
//                 </td>
//                 <td></td>
//                 <td></td>
//             </tr>
//         )
//     }
//         return editRow;
//     }
// };


// export default translate('translations')(connect(
//     mapStateToProps, mapDispatchToProps)(
//         reduxForm({
//             form: 'RowEditDrugRetail',
//             destroyOnUnmount: true,
//             enableReinitialize: true,
//             validate
//         })(RowEditDrugRetail)));
