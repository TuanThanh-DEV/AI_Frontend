import React from 'react';
import { Modal } from 'react-bootstrap';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Field, reduxForm } from 'redux-form';
import { LoadingScreen } from '../../components/commonWidgets';
import { RenderNumberInput, RenderSelect, RenderTextArea } from '../../components/formInputs';
import agent from '../../services/agent';
import { LOAD_UPDATING_CONFIG_DAY_DRUG } from './action-types';

const validate = values => {
}
const mapStateToProps = state => {
    var updateValue = {
        ...state.configDayDrugReducer.updatingConfigDayDrug,
    };
    return {
        initialValues: updateValue
    };
};
const mapDispatchToProps = dispatch => ({
    loadConfigDayDrug: (payload) =>
        dispatch({ type: LOAD_UPDATING_CONFIG_DAY_DRUG, payload: payload })
});
class ModalConfigDayDrug extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllStock: null,
        }

        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.getlistAllStock = this.getlistAllStock.bind(this);
    };
    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        onHide();
        destroy();
    }
    handleAdd(values) {
        var onHide = this.props.onHide;
        var id = this.props.idConfigDayDrug;
        var url = '/configDayDrug/add';
        var bodyObject = {
            numberDay: values.numberDay,
        };
        if (id) {
            url = '/configDayDrug/update';
            bodyObject.id = id;
        }
        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && result.id) {
                onHide();
            } else {
                toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    };

    componentWillMount() {
        const { loadConfigDayDrug } = this.props;
        let id = this.props.idConfigDayDrug;
        this.getlistAllStock();

        const dataPromise = agent.ConfigDayDrugAPI.getConfigDayDrug(id);
        loadConfigDayDrug(Promise.resolve(dataPromise))

    }

    getlistAllStock() {
        let setStateInRequest = (list) => { this.setState({ listAllStock: list }) }
        return agent.StockApi.listAllStock(
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

    render() {
        const { handleSubmit, submitting, title, invalid } = this.props;
        const modalConfig = {
            backdrop: 'static', show: this.props.show, bsSize: "md",
            onHide: this.props.onHide,
            submitting: this.props.submitting
        };
        let optionDrug = [];
        let listAllStock = this.state.listAllStock;
        if (listAllStock != null) {
            listAllStock.map(item => {
                optionDrug.push({ label: item.drug.name, value: item.drugId })
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
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <Field name="numberDay" label="Số Ngày Hạn Dùng Thuốc Tối Đa" placeholder="Nhập số ngày..." component={RenderNumberInput}></Field>
                                        </div>
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
            form: 'ModalConfigDayDrug',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalConfigDayDrug)));
