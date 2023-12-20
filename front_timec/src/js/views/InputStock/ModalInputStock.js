// import React from 'react';
// import { connect } from 'react-redux';
// import agent from '../../services/agent';
// import { Modal } from 'react-bootstrap';
// import { RenderInputWithDiv, RenderSelect } from '../../components/formInputs';
// import { Field, reduxForm } from 'redux-form';
// import { toast } from 'react-toastify';
// import { translate } from 'react-i18next';
// import { LoadingScreen } from '../../components/commonWidgets';
// import { LOAD_UPDATING_ICD } from './action-types';


// const validate = values => {
//     const errors = {};
//     if(!values.code){
//         errors.code = "Vui lòng nhập mã code ICD!"
//     }  
//     if(!values.name){
//         errors.name = "Vui lòng nhập tên ICD!"
//     }  
//     return errors;
// }
// const mapStateToProps = state => {
//     var updateValue = {
//         ...state.icdReducer.updatingIcd,
//     };
//     return {
//         initialValues: updateValue
//     };
// };
// const mapDispatchToProps = dispatch => ({
//     loadIcd: (payload) =>
//         dispatch({ type: LOAD_UPDATING_ICD, payload: payload })
// });
// class ModalIcd extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             listAllIcdCategory:[],
//         }

//         this.handleAdd = this.handleAdd.bind(this);
//         this.handleHideAndClear = this.handleHideAndClear.bind(this);
//      };
//     handleHideAndClear() {
//         const { destroy, onHide } = this.props;
//         onHide();
//         destroy(); }
//     handleAdd(values) {
//         var onHide = this.props.onHide;
//         var id = this.props.idIcd;
//         var url = '/icd/add';
//         var bodyObject = {
//             code: values.code,
//             name: values.name,
//             icdCategory: values.icdCategory

//         };
//         if (id) {
//             url = '/icd/update';
//             bodyObject.id = id;
//         }
//         return agent.asyncRequests.post(url, bodyObject
//         ).then(function (res) {
//             var result = res.body.resultData;
//             if (result && result.id) {
//                 onHide();
//                 toast.success("Lưu Thành Công", { autoClose: 1000, position: toast.POSITION.TOP_RIGHT});
//             } else {
//                 toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
//             }
//         }, function (err) {
//             toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
//         });
//     };

//     componentWillMount() {
//         const { loadIcd } = this.props;
//         var id = this.props.idIcd;
//         if(id != null ){
//             const dataPromise = agent.IcdApi.getIcd(id);
//             loadIcd(Promise.resolve(dataPromise))
//         }
//         this.getlistAllIcdCategory();
//     }

//     getlistAllIcdCategory(){
//         let setStateInRequest = (list) => { this.setState({ listAllIcdCategory: list }) }
//         return agent.IcdCategoryApi.listAllIcdCategory().then(function (res) {
//             var result = res.resultData;
//             if (result) {
//                 setStateInRequest(result);
//             } else {
//                 toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
//             }
//         }, function (err) {
//             toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
//         });
//     }

//     render() {
//         const { handleSubmit, submitting, title, invalid } = this.props;
//         const modalConfig = { backdrop: 'static', show: this.props.show,bsSize:"sm",  
//         onHide: this.props.onHide, 
//         submitting: this.props.submitting };
//         var id = this.props.idIcd;
//         var optionUserIcdCategory = []; 
//         this.state.listAllIcdCategory.map(item=>{
//             optionUserIcdCategory.push({label:item.categoryName,value:item.id})
//         })
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
//                                 <Field name="code" label="Mã Code ICD (*)" placeholder="Nhập mã code ICD..." component={RenderInputWithDiv}></Field>
//                                 <Field name="name" label="Tên ICD (*)" placeholder="Nhập tên ICD..." component={RenderInputWithDiv}></Field>
//                                 <Field name="icdCategory.id" label="Nhóm ICD" placeholder="Vui lòng chọn nhóm ICD..." options={optionUserIcdCategory} component={RenderSelect}></Field>
//                                 <div className="text-right">
                                // <button type="button" className="btn btn-default" onClick={this.handleHideAndClear} ><i class="icon-cross" aria-hidden="true"></i> Đóng</button>                                
                                // <button type="submit"  className="btn bg-success" disabled={submitting}> Lưu Lại</button>
                                //      </div>
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
//             form: 'ModalIcd',
//             destroyOnUnmount: true,
//             enableReinitialize: true,
//             validate
//         })(ModalIcd)));
