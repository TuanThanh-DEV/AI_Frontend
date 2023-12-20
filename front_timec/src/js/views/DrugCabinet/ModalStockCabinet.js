import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderSelect, RenderMoneyFormat} from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_DRUG } from './action-types';


const validate = values => {
    const errors = {};
    if(!values.name){
        errors.name = "Vui lòng nhập tên thuốc!"
    }

    if (values.packageUom) {
        if (!values.packageSalePrice) {
            errors.packageSalePrice = "Vui lòng nhập Giá Bán Sỉ! Hoặc chọn ĐVT Đóng Sỉ là -Không có-!";
        }
        if (!values.numberOfPackageItems) {
            errors.numberOfPackageItems = "Vui lòng nhập Số Lượng Đóng Sỉ! Hoặc chọn ĐVT Đóng Sỉ là -Không có-!";
        }
        if (values.packageUom == values.uom) {
            errors.packageUom = "Vui lòng chọn ĐVT Đóng Sỉ khác với ĐVT Lẻ!";
        }
    }
    return errors;
}
const mapStateToProps = state => {
    var updateValue = {
        ...state.drugReducer.updatingDrug,
    };
    return {
        initialValues: updateValue
    };
};
const mapDispatchToProps = dispatch => ({
    loadDrug: (payload) =>
        dispatch({ type: LOAD_UPDATING_DRUG, payload: payload })
});
class ModalStockCabinet extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listAllDrugCategory: [],
            listAllUom:[],
            listAllSupplier:[],
        }

        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
     };

    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        onHide();
        destroy(); }
    handleAdd(values) {

        // return agent.asyncRequests.post(url, bodyObject
        // ).then(function (res) {
        //     var result = res.body.resultData;
        //     if (result && result.id) {
        //         if(inputFormId != null){
        //             onHide("success");
        //         }else{
        //             onHide(); 
        //         }
        //         toast.success("Lưu Thành Công", { autoClose: 1000, position: toast.POSITION.TOP_RIGHT});
        //     } else {
        //         toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
        //     }
        // }, function (err) {
        //     toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        // });
    };

    componentWillMount() {
        const { loadDrug } = this.props;
        var id = this.props.idDrug;
            const dataPromise = agent.StockCabinetApi.
            loadDrug(Promise.resolve(dataPromise))
    }

    render() {
        const { handleSubmit, submitting, title, invalid } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show,bsSize:"sm",  
        onHide: this.props.onHide, 
        submitting: this.props.submitting };

        var newModal = null;
        newModal =
            <div style={{ width: '30%' }}>
                <Modal
                    {...modalConfig}
                    aria-labelledby="contained-modal-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-sm"><center>{title}</center> </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {submitting ? <LoadingScreen /> :
                            <form className="form-horizontal" role="form" onSubmit={handleSubmit(this.handleAdd)}>
                                 <Field name="name" label="Tên Thuốc (*)" placeholder="Nhập tên thuốc..." component={RenderInputWithDiv}></Field>
                                <Field name="placeCode" label="Mã Vị Trí (*)" placeholder="Ví dụ: A2-3: (ô A, hàng 2, cột 3)" component={RenderInputWithDiv}></Field>                         
                                <Field name="ingredient" label="Hoạt Chất" placeholder="Nhập tên hoạt chất..." component={RenderInputWithDiv}></Field>
                                <Field name="guideline" label="Cách Sử Dụng"  placeholder="Nhập cách sử dụng..." component={RenderInputWithDiv} ></Field>
                                <Field name="uom" label="Đơn Vị Tính Cơ Bản" options={optionDonviTinh} component={RenderSelect}></Field>
                                <Field name="salePrice" label="Giá Bán Lẻ" placeholder="VND"  component={RenderMoneyFormat}></Field>
                                <Field name="packageUom" label="Đơn Vị Tính Đóng Sỉ" options={optionDonviTinh} component={RenderSelect}></Field>
                                <Field name="packageSalePrice" label="Giá Bán Sỉ" placeholder="VND"  component={RenderMoneyFormat}></Field>
                                <Field name="numberOfPackageItems" label="Số Lượng Đóng Sỉ" placeholder="Điền Số Lượng Mỗi Hộp Sỉ"  component={RenderMoneyFormat}></Field>
                                <Field name="drugCategoryId" label="Loại Thuốc" options={optionAllDrugCategory} component={RenderSelect}></Field>
                                <Field name="supplierDrugId" label="Nhà Cung Cấp Thuốc" options={optionAllSupplierDrug} component={RenderSelect}></Field>                        
                                <Field name="barCode" label="Barcode" placeholder="Scan barcode tại đây"  component={RenderInputWithDiv}></Field>
                                
                                <div className="text-right">
                                <button type="button" style={{marginRight:"20px"}} className="btn btn-default" onClick={this.handleHideAndClear} ><i class="icon-cross" aria-hidden="true"></i> Đóng</button>                                
                                <button type="submit"  className="btn bg-success" disabled={submitting}> Lưu Lại</button>
                                     </div>
                            </form>
                        }
                    </Modal.Body>
                </Modal>
            </div>
        return newModal;
    }
};
export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'ModalStockCabinet',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalStockCabinet)));
