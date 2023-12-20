import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderSelect, RenderMoneyFormat} from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_MEDICALSUPPIES } from './action-types';


const validate = values => {
    const errors = {};
    if(!values.name){
        errors.name = "Vui lòng nhập tên vật tư!"
    }
    if(!values.importPrice){
        errors.importPrice = "Vui lòng nhập giá nhập!"
    }
    if(!values.salePrice){
        errors.salePrice = "Vui lòng nhập giá bán!"
    }
    return errors;
}
const mapStateToProps = state => {
    var updateValue = {
        ...state.medicalSuppliesReducer.updatingMedicalSupplies,
    };
    return {
        initialValues: updateValue
    };
};
const mapDispatchToProps = dispatch => ({
    loadMedicalSupplies: (payload) =>
        dispatch({ type: LOAD_UPDATING_MEDICALSUPPIES, payload: payload })
});
class ModalMedicalSupplies extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listAllDrugCategory: [],
            listAllUom:[],
        }

        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
     };

     getlistAllDrugCategory(){
        let setStateInRequest = (list) => { this.setState({ listAllDrugCategory: list }) }
        return agent.MedicalSuppliesCategoryApi.listAllMedicalSuppliesCategory(
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


    getlistAllUom(){
        let setStateInRequest = (list) => { this.setState({ listAllUom: list }) }
        return agent.UomApi.listAllUom(
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

    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        onHide();
        destroy(); }

    handleAdd(values) {
        var onHide = this.props.onHide;
        var id = this.props.idMedicalSupplies;
        var url = '/medicalSupplies/add';
        var bodyObject = {
            name: values.name,
            guideline: values.guideline,
            ingredient: values.ingredient,
            uom: values.uom,
            salePrice: values.salePrice,
            drugCategoryId: values.drugCategoryId,
            drugType : 'MEDICAL',
            packageUom : values.packageUom,
            packageSalePrice : values.packageSalePrice,
            numberOfPackageItems : values.numberOfPackageItems
        };
        if (id) {
            url = '/medicalSupplies/update';
            bodyObject.id = id;
        }
        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && result.id) {
                onHide();
                toast.success("Lưu Thành Công", { autoClose: 1000, position: toast.POSITION.TOP_RIGHT});
            } else {
                toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    };

    componentWillMount() {
        const { loadMedicalSupplies } = this.props;
        var id = this.props.idMedicalSupplies;
       
        const dataPromise = agent.MedicalSuppliesApi.getMedicalSupplies(id);
        loadMedicalSupplies(Promise.resolve(dataPromise))

        this.getlistAllDrugCategory();

        this.getlistAllUom();
    }
    render() {
        const { handleSubmit, submitting, title, invalid } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show,bsSize:"sm",  
        onHide: this.props.onHide, 
        submitting: this.props.submitting };

        var optionAllDrugCategory=[];
        var dataListDrugCategory = this.state.listAllDrugCategory;
        if(dataListDrugCategory){
            dataListDrugCategory.map(item=>{
                optionAllDrugCategory.push({label:item.name,value:item.id});
            })
        }


        var optionDonviTinh=[];
            var dataListUom = this.state.listAllUom;
            if(dataListUom){
                dataListUom.map(item=>{
                    optionDonviTinh.push({label:item.name, value:item.name});
                })
            }

        var id = this.props.idDrug;
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
                                <Field name="name" label="Tên Vật Tư Y Tế (*)" placeholder="Nhập tên vật tư y tế..." component={RenderInputWithDiv}></Field>
                                {/* <Field name="ingredient" label="Hoạt Chất" placeholder="Nhập tên hoạt chất..." component={RenderInputWithDiv}></Field> */}
                                <Field name="guideline" label="Cách Sử Dụng"  placeholder="Nhập cách sử dụng..." component={RenderInputWithDiv} ></Field>
                                <Field name="uom" label="Đơn Vị Tính" options={optionDonviTinh} component={RenderSelect}></Field>
                                <Field name="salePrice" label="Giá Bán" placeholder="Nhập giá bán..." component={RenderMoneyFormat}></Field>
                                <Field name="packageUom" label="Đơn Vị Tính Đóng Sỉ" options={optionDonviTinh} component={RenderSelect}></Field>
                                <Field name="packageSalePrice" label="Giá Bán Sỉ" placeholder="VND"  component={RenderMoneyFormat}></Field>
                                <Field name="numberOfPackageItems" label="Số Lượng Đóng Sỉ" placeholder="Điền Số Lượng Mỗi Hộp Sỉ"  component={RenderMoneyFormat}></Field>
                                {/* <Field name="importPrice" label="Giá Nhập" placeholder="Nhập giá nhập..." component={RenderMoneyFormat}></Field> */}
                                <Field name="drugCategoryId" label="Loại Vật Tư Y Tế" options={optionAllDrugCategory} component={RenderSelect}></Field>
                                
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
            form: 'ModalMedicalSupplies',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalMedicalSupplies)));
