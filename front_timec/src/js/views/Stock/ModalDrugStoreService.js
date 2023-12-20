import React from 'react';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { translate } from 'react-i18next';
import {  reduxForm} from 'redux-form';
import { LoadingScreen } from '../../components/commonWidgets';
import { connect } from 'react-redux';
import RowEditDrugStoreService from './RowEditDrugStoreService';
import { ScriptUtils } from '../../utils/javascriptUtils';


const validate = values => {
    const errors = {};
    return errors;
}
const mapStateToProps = state => {
    var updateValue = {
        ...state.prescriptionReducer.updatingPrescription,
    };
    return {
        // initialValues: updateValue,
        currentUser: state.common.currentUser
    };
};

const mapDispatchToProps = dispatch => ({
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalDrugStoreService", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        }),
});


// create prescriptionItem -> Invoceid ->  InvoiceItem  
class ModalDrugStoreService extends React.Component {
    constructor() {
        super();
        this.state = {
            listPrescriptionItem : [],
            columnNameClicked: null,
            currentShowItem: false,
            prescriptionId : null
            
        }
        this.reloadEditable=(selectedItem, columnName)=>{
            var dataPrescriptionItem = this.state.listPrescriptionItem;
            // Set false all item not selected
            dataPrescriptionItem.map(item=>{
                item.isShowEdit =false;
                item.newRow =false;
                if(!item.id ){
                    dataPrescriptionItem.splice(-1, 1);
                }
             })

            //  Set true particular item
            selectedItem.isShowEdit = true;
             this.setState({
                currentShowItem : selectedItem,
                columnNameClicked : columnName
             })
        }
        this.handleAddModalRow = this.handleAddModalRow.bind(this);
        this.handleEventEditTables = this.handleEventEditTables.bind(this);
        this.deletePrescriptionItem = this.deletePrescriptionItem.bind(this);
        this.createPrescriptionId = this.createPrescriptionId.bind(this);
    };
    getListDataInsert(indexRow,dowRow , eventNewRow, obj, status){
        // var this_ = this;
        var objInsert = {
            prescriptionId : obj.prescriptionId,
            drug : obj.drug,
            morningAmount : obj.morningAmount,
            noonAmount : obj.noonAmount,
            afternoonAmount : obj.afternoonAmount,
            eveningAmount : obj.eveningAmount,
            numberOfDays : obj.numberOfDays,
            totalAmount : obj.totalAmount
        }
        var list = this.state.listPrescriptionItem;
        if(status === "add" && indexRow != 0){
            list.push(objInsert)
        }else if(status === "add" && indexRow === 0){
            list.splice(indexRow,1,objInsert)
        }else{
            list.splice(indexRow,1,objInsert)
        }
        if(eventNewRow){
            let setStateInRequest = (list) => {this.setState({ listPrescriptionItem : list, columnNameClicked : "drugName"})}
            list.map((item, index)=>{
                item.isShowEdit =false;
            })
            return(setStateInRequest(list),this.handleAddModalRow())
                
            
            
        }else{
            let setStateInRequest = (list) => {this.setState({ listPrescriptionItem : list, columnNameClicked : "drugName"})}
            list.map((item, index)=>{
                if(indexRow != null ){
                    if(indexRow +1  === index && dowRow){
                        item.isShowEdit =true;
                    }
                }else {
                    item.isShowEdit =false;
                    item.isShowModalNewRow =false;
                }
            })
            return(setStateInRequest(list))
        }    
    }

    handleAddModalRow() {
        let  listPrescriptionItem = this.state.listPrescriptionItem;
        listPrescriptionItem.push(
            {
            isShowEdit : true,
            prescriptionId : null
            }
        );
        this.setState({
            listPrescriptionItem : listPrescriptionItem,
            columnNameClicked : "drugName"
        })
    }
   
    deletePrescriptionItem(index) {
        var list = this.state.listPrescriptionItem;
        list.splice(index,1)
        this.setState({
            listPrescriptionItem : list
        })
    }
    createPrescriptionId(){
        const {currentUser} = this.props;
        let setStateInRequest = (id) => { this.setState({ prescriptionId: id }) }
        return agent.asyncRequests.get("/prescription/newPrescription?currentUserId=" +currentUser.id
            ).then(function (res) {
                var result = res.resultData;
                if (result) {
                    setStateInRequest(result);
                } else {
                    toast.error("Không thể tạo mới đơn khám bệnh cho bán thuốc ngoài luồng ( Đơn bán lẻ )! Lỗi: " + result.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                +" Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
            });
    }
    componentWillMount() {
        this.createPrescriptionId();
        this.handleAddModalRow();
    }
    componentDidUpdate() {
        ScriptUtils.loadFootable();
    }
    handleEventEditTables (indexRow, eventNewRow, dowRow, obj ,status){
        this.getListDataInsert(indexRow,dowRow , eventNewRow, obj ,status);
        this.setState({
            currentShowItem : null ,
            columnNameClicked : null
        })
    }
    render() {
        const { title, onHide, t, handleSubmit , submitting, prescriptionId} = this.props;
        const modalconfig = {show: this.props.show,bsSize:"lg", onHide: this.props.onHide};
        const dataPrescriptionItemList = this.state.listPrescriptionItem ;
    var prescriptionItemRows = [];
        if (dataPrescriptionItemList) {
            var presciptionCurrentNo = 0;
            var lengthList = dataPrescriptionItemList.length;
            let columnNameClicked = this.state.columnNameClicked;
            prescriptionItemRows = dataPrescriptionItemList.map((item, index) => {
                presciptionCurrentNo++
                
                if(!item.isShowEdit){
                    return (<tr key={"prescriptionItemId" + item.id} >
                    <td>{presciptionCurrentNo}</td>
                    <td style={{textAlign:"center"}} onClick={()=>{this.reloadEditable(item, "drugName")}}>{(item.drug.name + " " + item.drug.hamLuongBHYT)}</td>
                    <td style={{textAlign:"center"}} onClick={()=>{this.reloadEditable(item, "morningAmount")}}>{(item.morningAmount)}</td>
                    <td style={{textAlign:"center"}} onClick={()=>{this.reloadEditable(item, "noonAmount")}}>{(item.noonAmount)}</td>
                    <td style={{textAlign:"center"}} onClick={()=>{this.reloadEditable(item, "afternoonAmount")}}>{(item.afternoonAmount)}</td>
                    <td style={{textAlign:"center"}} onClick={()=>{this.reloadEditable(item, "eveningAmount")}}>{(item.eveningAmount)}</td>
                    <td style={{textAlign:"center"}} onClick={()=>{this.reloadEditable(item, "numberOfDays")}}>{(item.numberOfDays)}</td>
                    <td style={{textAlign:"center"}} onClick={()=>{this.reloadEditable(item, "totalAmount")}}>{item.totalAmount}</td>
                    <td style={{textAlign:"center"}} onClick={()=>{this.reloadEditable(item, "drugIngredient")}}>{item.drug.ingredient + " . Số  Ngày: " + item.numberOfDays} </td>
                    <td><button className="btn btn-default" onClick={() => this.deletePrescriptionItem(index)}>X</button></td>
                    </tr>
                    )
                }
                else{
                    return <RowEditDrugStoreService columnNameClicked={columnNameClicked} 
                    key={"RowsEdit_"+item.id} 
                    isShowEdit={item.isShowEdit}  
                    onBlurUpdate={this.onBlurUpdate} 
                    item ={item} 
                    currentNoList={presciptionCurrentNo}
                    eventNewRow={index +1 === lengthList? true: false}
                    handleEventEditTable={(indexRow, eventNewRow, dowRow, obj, status) =>this.handleEventEditTables(indexRow, eventNewRow, dowRow, obj, status)}
                    indexRow={index}
                    prescriptionId={this.props.prescriptionId}
                    ></RowEditDrugStoreService>
                }
                
            })
        }
        
        var newModal = null;
            newModal =
            <div style={{ width: '30%' }}>
                <Modal
                    {...modalconfig}
                    aria-labelledby="contained-modal-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-lg"><center>Thông Tin {title}</center></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    {submitting ? <LoadingScreen /> :
                    <table className="table table-xxs table-bordered">  
                            <thead>
                                <tr className="bg-teal" >
                                    <th rowSpan="2" width="5%" style={{textAlign:"center"}}><i className="icon-menu-open2"></i></th>
                                    <th rowSpan="2" width="25%" style={{textAlign:"center"}}>Tên Thuốc</th>
                                    <th colSpan="5" style={{textAlign:"center"}}>Cách Dùng</th>
                                    <th rowSpan="2" style={{textAlign:"center"}}>Số Lượng</th>
                                    <th rowSpan="2" style={{textAlign:"center"}}>Hoạt Chất</th>
                                    <th rowSpan="2" width="5%" style={{textAlign:"center"}}><i className="icon-menu-open2"></i></th>
                                </tr>
                                <tr className="bg-teal">
                                    <th style={{textAlign:"center"}}>Sáng</th>
                                    <th style={{textAlign:"center"}}>Trưa</th>
                                    <th style={{textAlign:"center"}}>Chiều</th>
                                    <th style={{textAlign:"center"}}>Tối</th>
                                    <th style={{textAlign:"center"}}>Số Ngày</th>
                                </tr>
                            </thead>
                            <tbody>
                                {prescriptionItemRows}
                            </tbody>
                            <div>
                                <button onClick={this.hanldleSaveList} >Lưu Tạm</button>
                            </div>
                        </table>}
                    </Modal.Body>
                </Modal>
            </div>
        return newModal;
    }
};
export default translate('translations')(connect(
        mapStateToProps, mapDispatchToProps)(
            reduxForm({
                form: 'ModalDrugStoreService',
                destroyOnUnmount: true,
                enableReinitialize: true,
                validate
            })(ModalDrugStoreService)));