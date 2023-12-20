import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderDatePicker, RenderSelect, RenderReadOnlyInput, RenderNumberInput } from '../../components/formInputs';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';

const validate = values => {
    const errors = {};
    return errors;
}
const mapStateToProps = state => {
};
const mapDispatchToProps = dispatch => ({
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalUpdateQuantityDiagnosis", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })

});
class ModalUpdateQuantityDiagnosis extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
    };

    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        onHide();
        destroy();
    }
    handleAdd(values) {
        const { diagnosisReport, onHide } = this.props;
        var url = '/diagnosisReport/update';
        var bodyObject = {
            ...diagnosisReport,
            quantity: values.quantity
        };

        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body;
            if (result.resultData) {
                onHide();
            } else if (result.errorMessage) {
                toast.error("Lỗi! Không thể lưu phiếu chỉ định!", { autoClose: 15000 });
            }
            else {
                toast.error("Có lỗi khi lưu trữ. Lỗi: ", { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    };

    componentWillMount() {
        const { updateField, diagnosisReport } = this.props;
        updateField("diagnosisServiceName", diagnosisReport.diagnosisService.name);
        updateField("quantity", diagnosisReport.quantity);
    }

    render() {
        const { handleSubmit, submitting, title, invalid, diagnosisReport } = this.props;
        const modalConfig = {
            backdrop: 'static', show: this.props.show, bsSize: "small",
            onHide: this.props.onHide,
            submitting: this.props.submitting
        };

        
        var newModal = null;
        newModal =
            <div>
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
                                    
                                        <Field name="diagnosisServiceName" label="Tên Dịch Vụ" defaultValue = {diagnosisReport.diagnosisService.name} readOnly={true} component={RenderInputWithDiv}></Field>
                                        <Field name="quantity" label="Số lượng" component={RenderNumberInput} autoFocus={true}></Field>
                                    
                                    <br />
                                    <div className="text-right">
                                        <button type="button" className="btn btn-default" onClick={this.handleHideAndClear} ><i class="icon-cross" aria-hidden="true"></i> Hủy </button>
                                        <button type="submit" className="btn bg-success" disabled={submitting}> Lưu Lại</button>
                                    </div>
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
            form: 'ModalUpdateQuantityDiagnosis',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalUpdateQuantityDiagnosis)));
