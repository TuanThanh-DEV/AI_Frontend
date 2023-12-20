import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderMoneyFormat, RenderSelect, RenderCheckbox, RenderNumberInput, RenderTextArea } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_CONFIG_WARNING_DRUG, LOAD_UPDATING_USER_CONFIG } from './action-types';

const validate = values => {
    const errors = {};
    if (!values.incomeTax) {
        errors.incomeTax = "Vui lòng nhập Thuế Thu Nhập Cá Nhân!"
    }
    if (!values.grossSalary) {
        errors.grossSalary = "Vui lòng nhập Lương Theo Giờ!"
    }
    return errors;
}
const mapStateToProps = state => {
    var updateValue = {
        ...state.configWarningDrugReducer.updatingConfigWarningDrug,
    };
    return {
        initialValues: updateValue
    };
};
const mapDispatchToProps = dispatch => ({
    loadConfigWarningDrug: (payload) =>
        dispatch({ type: LOAD_UPDATING_CONFIG_WARNING_DRUG, payload: payload })
});
class ModalConfigWarningDrug extends React.Component {
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
        var id = this.props.idConfigWarningDrug;
        var url = '/configWarningDrug/add';
        var bodyObject = {
            drugOneId: values.drugOneId,
            drugTwoId: values.drugTwoId,
            numberValidDate: values.numberValidDate,
            description: values.description,

        };
        if (id) {
            url = '/configWarningDrug/update';
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
        const { loadConfigWarningDrug } = this.props;
        let id = this.props.idConfigWarningDrug;
        this.getlistAllStock();

        const dataPromise = agent.ConfigWarningDrugAPI.getConfigWarningDrug(id);
        loadConfigWarningDrug(Promise.resolve(dataPromise))

    }

    getlistAllStock() {
        let setStateInRequest = (list) => { this.setState({ listAllStock: list }) }
        return agent.asyncRequests.get('/stock/listAll'
        ).then(function (res) {
            var result = res.body.resultData;
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
                                            <Field name="drugOneId" label="Tên Thuốc Gốc" placeholder="" options={optionDrug} component={RenderSelect}></Field>
                                            <Field name="drugTwoId" label="Tên Thuốc Phản Ứng" placeholder="" options={optionDrug} component={RenderSelect}></Field>
                                            <Field name="numberValidDate" label="Số Ngày Hiệu Lực Phản Ứng Thuốc" placeholder="Nhập số ngày..." component={RenderNumberInput}></Field>
                                            <Field name="description" label="Mô tả - Chi tiết tác dụng phụ" placeholder="" rows="3" component={RenderTextArea}></Field>
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
            form: 'ModalConfigWarningDrug',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalConfigWarningDrug)));
