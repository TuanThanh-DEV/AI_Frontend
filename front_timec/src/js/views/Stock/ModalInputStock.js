import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderDatePicker, RenderNumberInput, RenderSelect } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LOAD_UPDATING_INPUT_STOCK } from './action-types';
import moment from 'moment';
import ModalDrug from '../Drug/ModalDrug';

const validate = values => {
    const errors = {};

    if (!values.inputDate) {
        errors.inputDate = "Vui lòng chọn Ngày Nhập!"
    }
    if (!values.expiredDate) {
        errors.expiredDate = "Vui lòng Nhập Ngày Hết Hạn!"
    }
    if (values.expiredDate < values.inputDate) {
        errors.expiredDate = "Ngày hết hạn phải lớn hơn ngày Nhập - SX !"
    }
    if(!values.inputAmount && values.drug ){
        errors.inputAmount = "Vui lòng Nhập Số Lượng!"
    }
    if (!values.drugStore) {
        errors.drugStore = { id: "Vui lòng chọn quầy bán" }
    }
    if (!values.drug) {
        errors.drug = { id: "Vui lòng chọn thuốc" }
    }
    return errors;
}


var today = new Date();
const mapStateToProps = state => {
    var updateValue = {
        ...state.stockReducer.updatingInputStock,
        inputDate: state.stockReducer.updatingInputStock && stockReducer.updatingInputStock.inputDate ? moment(today) : today,
        expiredDate: state.stockReducer.updatingInputStock && stockReducer.updatingInputStock.expiredDate ? moment(state.stockReducer.updatingInputStock.expiredDate) : null,
    };
    return {
        initialValues: updateValue,
        currentUser: state.common.currentUser,
    };
};
const mapDispatchToProps = dispatch => ({
    loadInputStock: (payload) =>
        dispatch({ type: LOAD_UPDATING_INPUT_STOCK, payload: payload })
});
class ModalInputStock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllDrug: [],
            listAllDrugStore: [],
            dataRowInput: 0,
            productRowInsert: [],
            productRowShow: [],
            index: 0,
            isDrugModalShown: false,
        }
        this.handAddArrayToStock = this.handAddArrayToStock.bind(this);
        this.handelAddRow = this.handelAddRow.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.handelClearRow = this.handelClearRow.bind(this);
        this.handlShowModalDrug = this.handlShowModalDrug.bind(this);
        this.handleHidemodal = () => {
            this.setState({ isDrugModalShown: false });
            this.getlistAllDrug();
        };

    };

    getlistAllDrug() {
        let setStateInRequest = (list) => { this.setState({ listAllDrug: list }) }
        return agent.DrugApi.listAllDrug(
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
    getlistAllDrugStore() {
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
                + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });

    }
    handlShowModalDrug(id) {
        this.setState({
            isDrugModalShown: true,
            idDrug: id
        });
    }
    componentWillMount() {
        this.getlistAllDrug();
        this.getlistAllDrugStore();
    };

    handAddArrayToStock(listInputStock) {
        var onHide = this.props.onHide;
        if (listInputStock.length > 0) {
            var url = '/inputStock/addListInputStock';
            var bodyObject = {
                listInputStockDto: listInputStock
            }
            return agent.asyncRequests.post(url, bodyObject
            ).then(function (res) {
                var result = res.body.resultData;
                if (result) {
                    onHide();
                    toast.info("Lưu Thành Công.", { autoClose: 1000 });
                } else {
                    toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
            });
        } else {
            toast.info('Vui lòng chọn "Thêm Thuốc Vào Danh Sách"', { autoClose: 2000 });
        }

    };

    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        onHide();
        destroy();
    };

    handelClearRow(elementRows) {

        let productRowShow = this.state.productRowShow;
        let productRowInsert = this.state.productRowInsert;
        var index = productRowShow.indexOf(elementRows);
        productRowShow.splice(index, 1);
        productRowInsert.splice(index, 1);
        this.setState({
            productRowShow: productRowShow,
            productRowInsert: productRowInsert
        });
    }

    handelAddRow(values) {
        const { destroy, reset } = this.props;
        var productRowInsert = this.state.productRowInsert;
        var productRowShow = this.state.productRowShow;

        var elementRowsShow = {
            drug: values.drug,
            drugStore: values.drugStore,
            inputDate: values.inputDate,
            expiredDate: values.expiredDate,
            inputAmount: values.inputAmount,
        }
        var elementRowInsert = {
            drugId: values.drug.id,
            drugStoreId: values.drugStore.id,
            inputDate: values.inputDate,
            expiredDate: values.expiredDate,
            inputAmount: values.inputAmount,
        }
        productRowInsert.push(elementRowInsert);
        productRowShow.push(elementRowsShow);
        this.setState({
            productRowShow: productRowShow,
            productRowInsert: productRowInsert,
        });
        reset();
        // mapStateToProps();
    };

    render() {
        const { handleSubmit, submitting, title, currentUser } = this.props;
        const modalConfig = {
            backdrop: 'static', show: this.props.show, bsSize: "lg",
            onHide: this.props.onHide,
            submitting: this.props.submitting
        };

        var optionAllDrug = [];
        var dataListDrug = this.state.listAllDrug;
        if (dataListDrug) {
            dataListDrug.map(item => {
                optionAllDrug.push({ value: item.id, label: item.name });
            })
        }

        var optionDrugStore = [];
        var dataListDrugStore = this.state.listAllDrugStore;
        if (dataListDrugStore) {
            dataListDrugStore.map(item => {
                // todo check hospital
                // if(item.hospital.id == currentUser.hospitalId){
                //     optionDrugStore.push({value:item.id,label:item.name});
                // }
                optionDrugStore.push({ value: item.id, label: item.name });
            })
        }

        var productRowShow = this.state.productRowShow;
        var productRowInsert = this.state.productRowInsert;
        var row = productRowShow.map((item, index) => {
            var drugName = "";
            var drugStoreName = "";
            dataListDrug.map(drug => {
                if (drug.id == (item.drug ? item.drug.id : null)) {
                    drugName = drug.name + " " + drug.hamLuongBHYT;
                }
            })
            dataListDrugStore.map(drugStore => {
                if (drugStore.id == (item.drugStore ? item.drugStore.id : null)) {
                    drugStoreName = drugStore.name;
                }
            })
            return <tr key={index}>
                <td>{index + 1}</td>
                <td>{drugName}</td>
                <td>{drugStoreName}</td>
                <td>{moment(item.inputDate).format("DD/MM/YYYY")}</td>
                <td>{moment(item.expiredDate).format("DD/MM/YYYY")}</td>
                <td>{item.inputAmount}</td>
                <td><button type="button" className="btn btn-info" onClick={() => this.handelClearRow(item)} >Xoá</button></td>
            </tr>
        })

        var selectRow =
            <form className="row" role="form" onSubmit={handleSubmit(this.handelAddRow)}>
                <div className="col-md-12">
                    <div className="col-md-3">
                        <Field name="drugStore.id" label="Tên Quầy Thuốc" options={optionDrugStore} component={RenderSelect}></Field>
                    </div>
                    <div className="col-md-3">
                        <Field name="drug.id" label="Tên Thuốc" options={optionAllDrug} component={RenderSelect}></Field>
                    </div>
                    <div className="col-md-2">
                        <Field name="inputDate" label="Ngày Nhập - SX " component={RenderDatePicker}></Field>
                    </div>
                    <div className="col-md-2">
                        <Field name="expiredDate" label="Ngày Hết Hạn" component={RenderDatePicker}></Field>
                    </div>
                    <div className="col-md-2">
                        <Field name="inputAmount" label="Số Lượng" placeholder="Số Lượng Nhập..." component={RenderNumberInput}></Field>
                    </div>

                </div>
                <hr />
                <div className="text-right">
                    <button type="button" className="btn btn-info" onClick={() => this.handlShowModalDrug()} >Thêm Mới Loại Thuốc</button>
                    <button type="submit" className="btn btn-info" disabled={submitting} >Thêm Thuốc Vào Danh Sách</button>
                </div>
                <hr />
            </form>;

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

                        <div className="row">
                            <div className="text-left">
                                {selectRow}
                            </div>
                        </div>
                        <div>
                            <table style={{ fontSize: "13px" }} className="table table-xxs table-bordered">
                                <thead>
                                    <tr className="bg-teal">
                                        <th data-toggle="true">STT</th>
                                        <th data-toggle="true">Tên Thuốc</th>
                                        <th data-toggle="true">Tên Quầy Thuốc</th>
                                        <th data-toggle="true">Ngày Nhập - SX</th>
                                        <th data-toggle="true">Ngày Hết Hạn</th>
                                        <th data-toggle="true">Số Lượng</th>
                                        <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {row}
                                </tbody>
                            </table>
                        </div>
                        <hr />
                        <div className="text-right">
                                <button type="button" style={{marginRight:"20px"}} className="btn btn-default" onClick={this.handleHideAndClear} ><i class="icon-cross" aria-hidden="true"></i> Đóng</button>                                
                                <button type="button" className="btn bg-success" disabled={submitting} onClick={() => this.handAddArrayToStock(productRowInsert)}>Thêm Thuốc Vào Kho</button>
                                     </div>
                     
                    </Modal.Body>
                </Modal>
                {this.state.isDrugModalShown ? <ModalDrug
                    title="Thêm Thuốc Mới"
                    idDrug={this.state.idDrug}
                    show={this.state.isDrugModalShown}
                    onHide={this.handleHidemodal} /> : null
                }
            </div>
        return newModal;
    }
};
export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'ModalInputStock',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalInputStock)));
