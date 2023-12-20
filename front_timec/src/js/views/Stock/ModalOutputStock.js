import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderNumberInput, RenderSelect } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LOAD_UPDATING_OUTPUT_STOCK } from './action-types';
import ModalDrug from '../Drug/ModalDrug';

const validate = values => {
    const errors = {};
    if(!values.outAmount){
        errors.available = "Vui lòng số lượng tồn kho!"
    }
    if(!values.drugId){
        errors.drugId =  "Vui lòng chọn Thuốc!"
    } 
    return errors;
}
const mapStateToProps = state => { 
    var updateValue = {
        ...state.stockReducer.updatingOutputStock,
    };
    return {
        initialValues: updateValue,
        currentUser: state.common.currentUser,
    };
};
const mapDispatchToProps = dispatch => ({
    loadOutputStock: (payload) =>
        dispatch({ type: LOAD_UPDATING_OUTPUT_STOCK, payload: payload }),
        updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalOutputStock", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});
class ModalOutputStock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllDrugByDrugStore : [],
            dataRowOutput: 0,
            productRowShow:[],
            index : 0,
            isDrugModalShown: false,
            listAllDrugStore : [],
            productRowShow : [],
            productRowInsert :[],
            autoFocus : "false", 
        }
        this.handAddArrayToStock = this.handAddArrayToStock.bind(this);
        this.handelAddRow = this.handelAddRow.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.handelClearRow = this.handelClearRow.bind(this);
        this.handlShowModalDrug = this.handlShowModalDrug.bind(this);
        this.getAllDrugInStockByDrugStore = this.getAllDrugInStockByDrugStore.bind(this);
        this.getlistAllDrugStore = this.getlistAllDrugStore.bind(this);
        this.handleHidemodal = () => {
            this.setState({ isDrugModalShown: false });
        };
     };


     getAllDrugInStockByDrugStore(idDrugStore){
        if(idDrugStore){
        let setStateInRequest = (list) => { this.setState({ listAllDrugByDrugStore: list }) }
            return agent.asyncRequests.get("/stock/fingByIdDrugStore?idDrugStore=" + idDrugStore)
                .then(function (res) {
                    var result = res.body.resultData;
                    if (result.length > 0) {
                        setStateInRequest(result);
                    } else if(result.length === 0) {
                        toast.info("Chưa Nhập Thuốc Trong Kho này! Vui Lòng Thêm Thuốc Mới Vào Kho. " , { autoClose: 4000 });
                    }else{
                        toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                    +" Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
                    }
                }, function (err) {
                    toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                    +" Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
                });
               
        }else{
            onHide();
            toast.info("Chưa có quyền Xuất Kho!", {autoClose: 2000});
        }
    }
    getlistAllDrugStore(){
        let setStateInRequest = (list) => { this.setState({ listAllDrugStore: list }) }
        return agent.DrugStoreApi.listAllDrugStore(
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

    handlShowModalDrug(id) {
        this.setState({
            isDrugModalShown: true,
            idDrug: id
        });
    }
    componentWillMount() {
        this.getlistAllDrugStore();
    };
    handleChangeDrugStore(idDrugStore){
        this.getAllDrugInStockByDrugStore(idDrugStore);
    }
    handAddArrayToStock(listOutputStock) {
        var onHide = this.props.onHide;
        if(listOutputStock.length > 0){
            var url = '/outputStock/listOutputStock';
        var bodyObject = {
                listOutputStockDto : listOutputStock
        }
            return agent.asyncRequests.post(url, bodyObject
            ).then(function (res) {
                var result = res.body.resultData;
                if (result == "success") {
                    onHide();
                    toast.info("Lưu Thành Công.", {autoClose: 1000});
                } else {
                    toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
            });
        }else{
            toast.info('Vui lòng chọn "Thêm Thuốc Vào Danh Sách"', {autoClose: 2000});
        }
    };

    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        onHide();
        destroy();
    };

    handelClearRow(elementRows){
       
        let productRowShow =this.state.productRowShow;
        let productRowInsert =this.state.productRowInsert;
        var index = productRowShow.indexOf(elementRows);
        productRowShow.splice(index ,1);
        productRowInsert.splice(index ,1);
        this.setState({
            productRowShow: productRowShow,
            productRowInsert: productRowInsert
        });
    }

    handelAddRow(values){
        const { reset,updateField } = this.props;
        var productRowInsert =this.state.productRowInsert;
        var productRowShow =this.state.productRowShow;
        var listAllDrugByDrugStore =this.state.listAllDrugByDrugStore;
        listAllDrugByDrugStore.map( item =>{
            if(item.drugId == values.drug.id && item.available > values.outAmount){
                var elementRowsShow = {
                    drug : values.drug,
                    outputDate: new Date(),
                    drugStore : values.drugStore,
                    outAmount : values.outAmount,
                }
                var elementRowInsert = {
                        drugId : values.drug.id,
                        drugStoreId : values.drugStore.id,
                        outputDate: new Date(),
                        outAmount : values.outAmount,
                }
                productRowInsert.push(elementRowInsert);
                productRowShow.push(elementRowsShow);
                this.setState({
                    productRowShow: productRowShow,
                    productRowInsert: productRowInsert,
                    autoFocus : "true"
                    });
                    reset();
                updateField("drugStore.id",values.drugStore.id);
            }else if(item.drugId == values.drug.id && item.available <= values.outAmount){
                toast.warning("Thuốc trong kho không đủ! vui lòng nhập thêm hoặc nhập số lượng nhỏ hơn.", {autoClose: 2000});
            }
        })
        
    }

    render() {
        var dataDrugInStock = this.state.listAllDrugByDrugStore;
        var autoFocus = this.state.autoFocus;
        const { handleSubmit, submitting, title } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show,bsSize:"lg",  
        onHide: this.props.onHide, 
        submitting: this.props.submitting };
        var optionAllDrug = [];
        var items = [];
        if(dataDrugInStock){
            dataDrugInStock.map(item=>{
                if(item.drug){
                    optionAllDrug.push({value:item.drug.id,label:item.drug.name + " " + item.drug.hamLuongBHYT});
                }
                items.push(item);
            })
        }

        var optionDrugStore=[];
        var dataListDrugStore = this.state.listAllDrugStore;
        if(dataListDrugStore){
            dataListDrugStore.map(item=>{
                optionDrugStore.push({value:item.id,label:item.name});
            })
        }

        var selectRow =  
            <form  autoFocus={true} className="row" role="form" onSubmit={handleSubmit(this.handelAddRow)}>
                <div className="col-md-12">
                    <div className="col-md-3">
                        <Field name="drugStore.id" label="Tên Quầy Thuốc" options={optionDrugStore} onChangeAction={(value)=>{this.handleChangeDrugStore(value)}} component={RenderSelect}></Field>
                    </div>
                    <div className="col-md-3">
                        <Field  name="drug.id" label="Tên Thuốc"  options={optionAllDrug} component={RenderSelect}></Field>
                    </div>
                    
                    <div className="col-md-2">
                        <Field  name="outAmount" label="Số Lượng"  placeholder="Số Lượng Xuất..." component={RenderNumberInput}></Field>
                    </div>
                <div className="col-md-3" style={{paddingTop: "30px"}}>
                    <button type="submit" className="btn btn-info" disabled={submitting} >Thêm Thuốc Vào Danh Sách</button>
                </div>
                </div>
            </form>;

        var productRowShow = this.state.productRowShow;
        var productRowInsert = this.state.productRowInsert;
        var warningRow = null;
        var row = productRowShow.map((item, index ) =>{ 
            var drugName = "";
            var drugStoreName = "";
            var drugSalePrice = 0;
            dataDrugInStock.map(drugStock=> {
                if(drugStock.drug.id == (item.drug ? item.drug.id : null)){
                 drugName = drugStock.drug.name  + " " + drugStock.drug.hamLuongBHYT,
                 drugSalePrice = drugStock.drug.salePrice
                }
                })
            dataListDrugStore.map(drugStore=> {
                if(drugStore.id == (item.drugStore ? item.drugStore.id : null)){
                    drugStoreName = drugStore.name
                }
                })
            
            return   <tr key={index}>
                <td>{index+1}</td>
                <td>{drugStoreName}</td>
                <td>{drugName}</td>
                <td>{item.outAmount}</td>
                <td>{drugSalePrice * item.outAmount}</td>
                <td><button type="button" className="btn btn-info" onClick={ () => this.handelClearRow(item)} >Xoá</button></td>
            </tr>
        })

        var newModal = null;
        newModal =
            (<div style={{ width: '30%' }}>
                <Modal
                    {...modalConfig}
                    aria-labelledby="contained-modal-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-sm"><center>{title}</center> </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
               
                                <div className="row">
                                    <div className="text-left">
                                        {selectRow}
                                    </div>
                                </div>
                                <div>
                                    <table style={{fontSize:"13px"}} className="table table-xxs table-bordered">
                                        <thead>
                                            <tr className="bg-teal">
                                                <th data-toggle="true">STT</th>
                                                <th data-toggle="true">Kho Thuốc</th>
                                                <th data-toggle="true">Tên Thuốc</th>
                                                <th data-toggle="true">Số Lượng</th>
                                                <th data-toggle="true">Giá</th>
                                                <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>   
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {row}
                                        </tbody>
                                    </table>
                                </div>
                                <hr/>
                                <div className="text-right">
                                <button type="button" style={{marginRight:"20px"}} className="btn btn-default" onClick={this.handleHideAndClear} ><i class="icon-cross" aria-hidden="true"></i> Đóng</button>           
                                    <button type="button" className="btn bg-success" disabled={submitting} onClick={()=>this.handAddArrayToStock(productRowInsert)}>Xuất Thuốc</button>
                                </div>
                    </Modal.Body>
                </Modal>
                {this.state.isDrugModalShown ? <ModalDrug 
                    title="Thêm Thuốc Mới" 
                    idDrug={this.state.idDrug} 
                    show={this.state.isDrugModalShown} 
                    onHide={this.handleHidemodal} /> : null
                }
            </div>)
        return newModal;
    }
};
export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'ModalOutputStock',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalOutputStock)));
