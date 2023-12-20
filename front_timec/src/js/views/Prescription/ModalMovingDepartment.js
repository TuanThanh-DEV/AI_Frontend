import React from 'react';
import { Modal } from 'react-bootstrap';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import { RenderSelect } from '../../components/formInputs';
import agent from '../../services/agent';
import { FormatterUtils } from '../../utils/javascriptUtils';
import { QueuePrintService } from '../Queue/QueuePrintService';

const selector = formValueSelector("ModalMovingDepartment");

const validate = values => {
    const errors = {};
    return errors;
}
const mapStateToProps = state => {
    var updateValue = {
    };
    return {
        initialValues: updateValue,
        analysisSelector: selector(state, "analysis"),
    };
};
const mapDispatchToProps = dispatch => ({
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalMovingDepartment", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});


class ModalMovingDepartment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllICD: [],
            idICD: null,
            listAllQueueToday: [],
            configTable : null,
            imageLogo : null
        }
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.handleMovingDepartment = this.handleMovingDepartment.bind(this);

    }

    getlistAllQueueToday() {
        let setStateInRequest = (list) => { this.setState({ listAllQueueToday: list }) }
        return agent.asyncRequests.get("/queue/findAllToday"
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
    getConfigTable() {
        let setStateInRequest = (list) => { this.setState({ configTable : list }) }
        return agent.ConfigTableApi.getAllConfigTable().then(function (res) {
            var result = res.resultData[0];
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    }


    componentWillMount() {
        this.getlistAllQueueToday();
        this.getConfigTable();
        var url = '/assets/images/logo_timec.png';
        FormatterUtils.downloadImageDataUri(url, this, "imageLogo");
    }

    ///Hide and Clean Value
    handleHideAndClear() {
        const { destroy, onHide, analysisSelector, icdType } = this.props;
        const { idICD } = this.state;

        onHide(analysisSelector, idICD, icdType);
        destroy();
    }


    handleMovingDepartment(values) {
        var imageLogo = this.state.imageLogo;
        var configTable = this.state.configTable;

        const { destroy, onHide, prescriptionId,insuranceCard } = this.props;
        if (confirm("Xác Nhận Chuyển Chuyên Khoa")) {

            let setStateInRequest = (queueNumber) => {
                QueuePrintService.handlePrinter(queueNumber.id, imageLogo, configTable, "CK", insuranceCard.insuranceCode);
                onHide();
            }
            return agent.asyncRequests.get("/queueNumber/CreateNextTheNumberByPrescriptionId?prescriptionId=" +prescriptionId + "&queueId=" +values.queueId
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
    }



    render() {

        const { handleSubmit, submitting, title, invalid } = this.props;
        const modalConfig = { backdrop: 'static', show: this.props.show, bsSize: "lg", onHide: this.props.onHide, submitting: this.props.submitting };

        const dataQueue = this.state.listAllQueueToday;
        var optionAllQueueToday = [];
        if (dataQueue) {
            dataQueue.map(item => {
                optionAllQueueToday.push({ label: item.name + " - Bác Sĩ: " + item.caller.fullName, value: item.id });
            })
        }

        var newModal = null;

        newModal =
            <div style={{ width: '30%' }}>
                <Modal {...modalConfig} aria-labelledby="contained-modal-title-lg"  >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-sm"><center>{title}</center> </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="">
                            <div className="row">
                                <div className="panel-flat">
                                    <form className="main-search" role="form" onSubmit={handleSubmit(this.handleMovingDepartment)}>
                                        <div className="panel-flat">
                                            <Field name="queueId" label="Hàng chờ theo chuyên khoa (*)" options={optionAllQueueToday} component={RenderSelect}></Field>
                                        </div>
                                        <div className="col-md-2">
                                            <button type="submit" className="btn bg-success btn-xlg" disabled={submitting} >Lưu</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        return newModal;
    }
};


export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'ModalMovingDepartment',
            destroyOnUnmount: true,
            enableReinitialize: true,

        })(ModalMovingDepartment)));
