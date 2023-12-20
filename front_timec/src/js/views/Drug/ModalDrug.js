import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderSelect, RenderMoneyFormat, RenderHiddenInput, RenderSwitch } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_DRUG } from './action-types';


const validate = values => {
    const errors = {};
    if (!values.name) {
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
        dispatch({ type: LOAD_UPDATING_DRUG, payload: payload }),
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalDrug", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});
class ModalDrug extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listAllDrugCategory: [],
            listAllUom: [],
            listAllSupplier: [],
        }

        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
    };

    getlistAllDrugCategory() {
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
                + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });

    }


    getlistAllUom() {
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
                + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });

    }

    getlistAllSupplierDrug() {
        let setStateInRequest = (list) => { this.setState({ listAllSupplier: list }) }
        return agent.SupplierApi.listAllSupplier(
        ).then(function (res) {
            var result = res.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });

    }

    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        onHide();
        destroy();
    }
    handleAdd(values) {
        var onHide = this.props.onHide;
        const { inputFormId, isAddInForm, drugStoreId } = this.props
        var id = this.props.idDrug;
        var url = '/drug/add';
        var bodyObject = {
            ...values,
            placeCode: values.placeCode,
            name: values.name,
            guideline: values.guideline,
            ingredient: values.ingredient,
            uom: values.uom,
            drugCategoryId: values.drugCategoryId,
            supplierDrugId: values.supplierDrugId,
            drugType: 'DRUG',
            barCode: values.barCode,
            importPrice: values.importPrice,
            salePrice: values.salePrice,
            packageUom: values.packageUom,
            packageSalePrice: values.packageSalePrice,
            numberOfPackageItems: values.numberOfPackageItems,
            drugStoreId: drugStoreId,
            inputFormId: inputFormId,
            hamLuong: values.hamLuong,
            deleted: values.deleted,
            sellable: values.sellable,
        };

        if (id) {
            url = '/drug/update';
            bodyObject.id = id;
        }

        if (isAddInForm) {
            url = '/drug/addForInputForm';
        }

        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && result.id) {
                if (inputFormId != null && !isAddInForm) {
                    onHide("success");
                } else if (inputFormId != null && isAddInForm) {
                    onHide("success");
                } else {
                    onHide();
                }
                toast.success("Lưu Thành Công", { autoClose: 1000, position: toast.POSITION.TOP_RIGHT });
            } else {
                toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    };

    componentWillMount() {
        const { loadDrug, updateField } = this.props;
        var id = this.props.idDrug;
        const dataPromise = agent.DrugApi.getDrug(id);
        loadDrug(Promise.resolve(dataPromise))
        this.getlistAllDrugCategory();
        this.getlistAllUom();
        this.getlistAllSupplierDrug();
        if(!id){
            updateField("sellable" ,true);
        }
    }

    render() {
        const { handleSubmit, submitting, title, invalid } = this.props;
        const modalConfig = {
            backdrop: 'static', show: this.props.show, bsSize: "lg",
            onHide: this.props.onHide,
            submitting: this.props.submitting
        };

        var optionAllDrugCategory = [];
        var dataListDrugCategory = this.state.listAllDrugCategory;
        if (dataListDrugCategory) {
            dataListDrugCategory.map(item => {
                optionAllDrugCategory.push({ label: item.name, value: item.id });
            })
        }

        var optionAllSupplierDrug = [];
        var dataListSupplierDrug = this.state.listAllSupplier;
        if (dataListSupplierDrug) {
            dataListSupplierDrug.map(item => {
                if (item.hasSellDrug == 1) {
                    optionAllSupplierDrug.push({ label: item.name, value: item.id });
                }
            })
        }


        var optionDonviTinh = [];
        var dataListUom = this.state.listAllUom;
        if (dataListUom) {
            dataListUom.map(item => {
                optionDonviTinh.push({ label: item.name, value: item.name });
            })
        }
        optionDonviTinh.push({ label: "-Không có-", value: "" });

        var id = this.props.idDrug;
        var newModal = null;
        newModal =
            <div style={{ width: '80%' }}>
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
                                <div className="col-md-12">
                                    <div className="col-md-5">
                                        <Field name="name" label="Tên Thuốc (*)" placeholder="Nhập tên thuốc..." component={RenderInputWithDiv}></Field>
                                        <Field name="placeCode" label="Mã Vị Trí (*)" placeholder="Ví dụ: A2-3: (ô A, hàng 2, cột 3)" component={RenderInputWithDiv}></Field>
                                        <Field name="ingredient" label="Hoạt Chất" placeholder="Nhập tên hoạt chất..." component={RenderInputWithDiv}></Field>
                                        <Field name="guideline" label="Cách Sử Dụng" placeholder="Nhập cách sử dụng..." component={RenderInputWithDiv} ></Field>
                                        <Field name="uom" label="Đơn Vị Tính Cơ Bản" options={optionDonviTinh} component={RenderSelect}></Field>
                                        <Field name="hamLuong" label="Hàm Lượng" component={RenderInputWithDiv}></Field>
                                        <Field name="salePrice" label="Giá Bán Lẻ" placeholder="VND" component={RenderMoneyFormat}></Field>
                                        <Field name="packageUom" label="Đơn Vị Tính Đóng Sỉ" options={optionDonviTinh} component={RenderSelect}></Field>
                                        <Field name="packageSalePrice" label="Giá Bán Sỉ" placeholder="VND" component={RenderMoneyFormat}></Field>
                                        <Field name="numberOfPackageItems" label="Số Lượng Đóng Sỉ" placeholder="Điền Số Lượng Mỗi Hộp Sỉ" component={RenderMoneyFormat}></Field>
                                        <Field name="drugCategoryId" label="Loại Thuốc" options={optionAllDrugCategory} component={RenderSelect}></Field>
                                        <Field name="supplierDrugId" label="Nhà Cung Cấp Thuốc" options={optionAllSupplierDrug} component={RenderSelect}></Field>
                                        <Field name="barCode" label="Barcode (*)" placeholder="Scan barcode tại đây" component={RenderInputWithDiv}></Field>

                                        <Field name="importPrice" label="Giá Bán Lẻ" placeholder="VND" component={RenderHiddenInput}></Field>


                                    </div>
                                    <div className="col-md-1"></div>
                                    <div className="col-md-5">
                                        <Field name="maHoatChat" label="Mã Hoạt Chất BHYT" placeholder="" component={RenderInputWithDiv}></Field>
                                        <Field name="maNhomBHYT" label="Mã Nhóm BHYT" placeholder="" component={RenderInputWithDiv}></Field>
                                        <Field name="hamLuongBHYT" label="Hàm Lượng BHYT" placeholder="" component={RenderInputWithDiv}></Field>
                                        <Field name="duongDungBHYT" label="Đường Dùng BHYT" placeholder="" component={RenderInputWithDiv}></Field>
                                        <Field name="lieuDungBHYT" label="Liều Dùng BHYT" placeholder="" component={RenderInputWithDiv}></Field>
                                        <Field name="soDangKyBHYT" label="Số Đăng Ký BHYT" placeholder="" component={RenderInputWithDiv}></Field>
                                        <Field name="thongTinThau" label="Thông Tin Thầu BHYT" placeholder="" component={RenderInputWithDiv}></Field>
                                        <Field name="phamVi" label="Phạm Vi BHYT" placeholder="" component={RenderInputWithDiv}></Field>

                                        <Field name="producerCompany" label="Hãng Sản Xuất" placeholder="" component={RenderInputWithDiv}></Field>
                                        <Field name="producerCountry" label="Nước Sản Xuất" placeholder="" component={RenderInputWithDiv}></Field>
                                        <Field name="contractorBHYT" label="Nhà Thầu BHYT" placeholder="" component={RenderInputWithDiv}></Field>
                                        <Field name="publishedDate" label="Ngày Công Bố" placeholder="" component={RenderInputWithDiv}></Field>
                                        <div className='col-md-6'>
                                            <Field name="sellable" label="Được Phép Bán" component={RenderSwitch}></Field>
                                        </div>
                                        <div className='col-md-6'>
                                            <Field name="deleted" label="Ẩn Thuốc" component={RenderSwitch}></Field>
                                        </div>
                                        {/* update drug set ma_nhom_bHYT = '4', ham_luong_bHYT = '500mg', duong_dung_bHYT = '1.01', lieu_dung_bHYT = '500mg', so_dang_ky_bHYT = 'VD-22745-15', thong_tin_thau = '907/QĐ-BVQY7A;G1;N4', pham_vi = '1', ma_hoat_chat = '40.685' where name = 'Coatangapon in 500 mg'; */}
                                    </div>

                                </div>


                                <div className="text-right">
                                    <button type="button" style={{ marginRight: "20px" }} className="btn btn-default" onClick={this.handleHideAndClear} ><i class="icon-cross" aria-hidden="true"></i> Đóng</button>
                                    <button type="submit" className="btn bg-success" disabled={submitting}> Lưu Lại</button>
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
            form: 'ModalDrug',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalDrug)));
