import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderSelect } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_STOCK } from './action-types';

const validate = values => {
    const errors = {};
    if (!values.available) {
        errors.available = "Vui lòng số lượng tồn kho!"
    }
    return errors;
}
const mapStateToProps = state => {
    var updateValue = {
        ...state.stockReducer.updatingStock,
    };
    return {
        initialValues: updateValue
    };
};
const mapDispatchToProps = dispatch => ({
    loadStock: (payload) =>
        dispatch({ type: LOAD_UPDATING_STOCK, payload: payload })
});
class ModalAlertStock extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listAllDrug: [],

            listAllDrugStore: [],
        }

        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
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

    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        onHide();
        destroy();
    }
    handleAdd(values) {
        var onHide = this.props.onHide;
        var id = this.props.idStock;
        var url = '/stock/addAlertStock';
        var bodyObject = {

            drugId: values.drugId,
            drugStoreId: values.drugStoreId,
            available: values.available,
            warningGrey: values.warningGrey,
            warningYellow: values.warningYellow,
            warningRed: values.warningRed,
        };
        if (id) {
            url = '/stock/updateAlertStock';
            bodyObject.id = id;
        }
        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && result.id) {
                onHide();
                toast.info("Lưu Thành Công.", { autoClose: 1000 });
            } else {
                toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    };

    componentWillMount() {
        const { loadStock } = this.props;
        var id = this.props.idStock;

        const dataPromise = agent.StockApi.getStock(id);
        loadStock(Promise.resolve(dataPromise))


        this.getlistAllDrug();

        this.getlistAllDrugStore();
    }
    render() {
        const { handleSubmit, submitting, title, invalid } = this.props;
        const modalConfig = {
            backdrop: 'static', show: this.props.show, bsSize: "sm",
            onHide: this.props.onHide,
            submitting: this.props.submitting
        };

        var optionAllDrug = [];
        var dataListDrug = this.state.listAllDrug;
        if (dataListDrug) {
            dataListDrug.map(item => {
                optionAllDrug.push({ label: item.name, value: item.id });
            })
        }


        var optionDrugStore = [];
        var dataListDrugStore = this.state.listAllDrugStore;
        if (dataListDrugStore) {
            dataListDrugStore.map(item => {
                optionDrugStore.push({ label: item.name, value: item.id });
            })
        }
        var id = this.props.idStock;
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
                                <Field name="drugStoreId" label="Kho Thuốc" options={optionDrugStore} component={RenderSelect}></Field>
                                <Field name="drugId" label="Tên Thuốc" options={optionAllDrug} component={RenderSelect}></Field>
                                <Field disabled={true} name="available" label="Tồn Kho" placeholder="Nhập số lượng tồn kho..." component={RenderInputWithDiv}></Field>
                                <Field name="warningGrey" label="Cảnh báo thấp" placeholder="Nhập số lượng cảnh báo xám..." component={RenderInputWithDiv}></Field>
                                <Field name="warningYellow" label="Cảnh báo vừa" placeholder="Nhập số cảnh báo vàng..." component={RenderInputWithDiv}></Field>
                                <Field name="warningRed" label="Cảnh báo cao" placeholder="Nhập số lượng cảnh báo đỏ..." component={RenderInputWithDiv}></Field>


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
            form: 'ModalAlertStock',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalAlertStock)));
