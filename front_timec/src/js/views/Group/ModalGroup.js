import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderSelect, RenderMoneyFormat} from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_GROUP } from './action-types';


const validate = values => {
    const errors = {};
    // if(!values.name){
    //     errors.name = "Vui lòng nhập tên vật tư!"
    // }
    // if(!values.importPrice){
    //     errors.importPrice = "Vui lòng nhập giá nhập!"
    // }
    // if(!values.salePrice){
    //     errors.salePrice = "Vui lòng nhập giá bán!"
    // }
    return errors;
}
const mapStateToProps = state => {
    var updateValue = {
        ...state.groupReducer.updatingGroup,
    };
    return {
        initialValues: updateValue
    };
};
const mapDispatchToProps = dispatch => ({
    loadGroup: (payload) =>
        dispatch({ type: LOAD_UPDATING_GROUP, payload: payload })
});

class ModalGroup extends React.Component {
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
        return agent.DrugCategoryApi.listAllDrugCategory(
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
        var id = this.props.idGroup;
        var url = '/group/add';
        var bodyObject = {
            name: values.name,
            // guideline: values.guideline,
            // ingredient: values.ingredient,
            // uom: values.uom,
            // salePrice: values.salePrice,
            // importPrice: values.importPrice,
            // drugCategoryId: values.drugCategoryId,
            drugType : 'GROUP',
            hasGroup: 1,
            barCode : values.barCode,
            salePrice : values.salePrice,
            uom : "liều",

        };
        if (id) {
            url = '/group/update';
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
        const { loadGroup } = this.props;
        var id = this.props.idGroup;
       
        const dataPromise = agent.GroupApi.getGroup(id);
        loadGroup(Promise.resolve(dataPromise))

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
                                <Field name="name" label="Tên Liều Thuốc (*)" placeholder="Nhập Tên..." component={RenderInputWithDiv}></Field>
                                <Field name="barCode" label="Mã Code" placeholder="Nhập Mã..." component={RenderInputWithDiv}></Field>
                                <Field name="salePrice" label="Giá Bán" placeholder="Nhập phụ thu mỗi liều..." component={RenderMoneyFormat}></Field>
                                {/* <Field name="ingredient" label="Hoạt Chất" placeholder="Nhập tên hoạt chất..." component={RenderInputWithDiv}></Field> */}
                                
                                {/* <Field name="guideline" label="Cách Sử Dụng"  placeholder="Nhập cách sử dụng..." component={RenderInputWithDiv} ></Field>
                                <Field name="uom" label="Đơn Vị Tính" options={optionDonviTinh} component={RenderSelect}></Field>
                                <Field name="salePrice" label="Giá Bán" placeholder="Nhập giá bán..." component={RenderInputWithDiv}></Field>
                                <Field name="importPrice" label="Giá Nhập" placeholder="Nhập giá nhập..." component={RenderInputWithDiv}></Field>
                                <Field name="drugCategoryId" label="Loại Vật Tư Y Tế" options={optionAllDrugCategory} component={RenderSelect}></Field>
                                <Field name="hasGroup" label="Group" component={RenderInputWithDiv}></Field> */}
                                
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
            form: 'ModalGroup',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalGroup)));
