// import React from 'react';
// import { connect } from 'react-redux';
// import agent from '../../services/agent';
// import { Modal } from 'react-bootstrap';
// import { RenderInputWithDiv, RenderSelect} from '../../components/formInputs';
// import { Field, reduxForm } from 'redux-form';
// import { toast } from 'react-toastify';
// import { translate } from 'react-i18next';
// import { LoadingScreen } from '../../components/commonWidgets';
// import { LOAD_UPDATING_DRUG } from './action-types';


// const validate = values => {
//     const errors = {};
//     if(!values.name){
//         errors.name = "Vui lòng nhập tên thuốc!"
//     }
//     return errors;
// }
// const mapStateToProps = state => {
//     var updateValue = {
//         ...state.drugReducer.updatingDrug,
//     };
//     return {
//         initialValues: updateValue
//     };
// };
// const mapDispatchToProps = dispatch => ({
//     loadDrug: (payload) =>
//         dispatch({ type: LOAD_UPDATING_DRUG, payload: payload })
// });
// class ModalInputStock extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             listAllDrugCategory: [],
//             listAllUom:[],
//         }

//         this.handleAdd = this.handleAdd.bind(this);
//         this.handleHideAndClear = this.handleHideAndClear.bind(this);
//      };

     

//     handleHideAndClear() {
//         const { destroy, onHide } = this.props;
//         onHide();
//         destroy(); }
    

//     componentWillMount() {
//         const { loadDrug } = this.props;
//         var id = this.props.idDrug;
//             const dataPromise = agent.DrugApi.getDrug(id);
//             loadDrug(Promise.resolve(dataPromise))
//             this.getlistAllDrugCategory();
//             this.getlistAllUom();
//     }

//     render() {
//         const { handleSubmit, submitting, title, invalid } = this.props;
//         const modalConfig = { backdrop: 'static', show: this.props.show,bsSize:"sm",  
//         onHide: this.props.onHide, 
//         submitting: this.props.submitting };

//         var optionAllDrugCategory=[];
//         var dataListDrugCategory = this.state.listAllDrugCategory;
//         if(dataListDrugCategory){
//             dataListDrugCategory.map(item=>{
//                 optionAllDrugCategory.push({label:item.name,value:item.id});
//             })
//         }


//         var optionDonviTinh=[];
//             var dataListUom = this.state.listAllUom;
//             if(dataListUom){
//                 dataListUom.map(item=>{
//                     optionDonviTinh.push({label:item.name, value:item.name});
//                 })
//             }

//         var id = this.props.idDrug;
//         var newModal = null;
//         newModal =
//             <div style={{ width: '30%' }}>
//                 <Modal
//                     {...modalConfig}
//                     aria-labelledby="contained-modal-title-lg"
//                 >
//                     <Modal.Header closeButton>
//                         <Modal.Title id="contained-modal-title-sm"><center>{title}</center> </Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         {submitting ? <LoadingScreen /> :
//                             <form className="form-horizontal" role="form" onSubmit={handleSubmit(this.handleAdd)}>
//                                 <Field name="placeCode" label="Mã Vị Trí (*)" placeholder="Ví dụ: A2-3: (ô A, hàng 2, cột 3)" component={RenderInputWithDiv}></Field>                         
//                                 <Field name="name" label="Tên Thuốc (*)" placeholder="Nhập tên thuốc..." component={RenderInputWithDiv}></Field>
//                                 <Field name="ingredient" label="Hoạt Chất" placeholder="Nhập tên hoạt chất..." component={RenderInputWithDiv}></Field>
//                                 <Field name="guideline" label="Cách Sử Dụng"  placeholder="Nhập cách sử dụng..." component={RenderInputWithDiv} ></Field>
//                                 <Field name="uom" label="Đơn Vị Tính" options={optionDonviTinh} component={RenderSelect}></Field>
//                                 <Field name="drugCategoryId" label="Loại Thuốc" options={optionAllDrugCategory} component={RenderSelect}></Field>
//                                 <Field name="barCode" label="Mã Thuốc" placeholder="Nhập mã thuốc..."  component={RenderInputWithDiv}></Field>
//                                 <div className="text-right">
//                                 <button type="button" style={{marginRight:"20px"}} className="btn btn-default" onClick={this.handleHideAndClear} ><i class="icon-cross" aria-hidden="true"></i> Đóng</button>                                
//                                 <button type="submit"  className="btn bg-success" disabled={submitting}> Lưu Lại</button>
//                                      </div>
//                             </form>
//                         }
//                     </Modal.Body>
//                 </Modal>
//             </div>
//         return newModal;
//     }
// };
// export default translate('translations')(connect(
//     mapStateToProps, mapDispatchToProps)(
//         reduxForm({
//             form: 'ModalInputStock',
//             destroyOnUnmount: true,
//             enableReinitialize: true,
//             validate
//         })(ModalInputStock)));
