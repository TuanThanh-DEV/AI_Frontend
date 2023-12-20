import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderDatePicker, RenderSelect, RenderMoneyFormat } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_PACKAGE } from './action-types';
import moment from 'moment';

const validate = values => {
    const errors = {};


    return errors;
}
const mapStateToProps = state => {
    var updateValue = {
        ...state.packageReducer.updatingPackage
    };
    return {
        initialValues: updateValue
    };
};
const mapDispatchToProps = dispatch => ({
    loadPackage: (payload) =>
        dispatch({ type: LOAD_UPDATING_PACKAGE, payload: payload })
});
class ModalPackage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listAllSupplier: [],
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
        var onHide = this.props.onHide;
        var id = this.props.idPackage;
        var url = '/package/add';
        var bodyObject = {
            name: values.name,
            code: values.code,
            pricePackage: values.pricePackage,

        };
        if (id) {
            url = '/package/update';
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
        const { loadPackage } = this.props;
        var id = this.props.idPackage;
        const dataPromise = agent.PackageApi.getPackage(id);
        loadPackage(Promise.resolve(dataPromise))
    }
    render() {
        const { handleSubmit, submitting, title, invalid } = this.props;
        const modalConfig = {
            backdrop: 'static', show: this.props.show, bsSize: "sm",
            onHide: this.props.onHide,
            submitting: this.props.submitting
        };

        var optionAllSupplier = [];
        var dataListSupplier = this.state.listAllSupplier;
        if (dataListSupplier) {
            dataListSupplier.map(item => {
                optionAllSupplier.push({ label: item.name, value: item.id });
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
                                    <div className="col col-md-12">
                                        <Field name="name" label="Tên gói khám" placeholder="Nhập tên gói khám..." component={RenderInputWithDiv}></Field>
                                        <Field name="code" label="Mã gói khám" placeholder="Nhập mã gói khám ..." component={RenderInputWithDiv}></Field>
                                        <Field name="pricePackage" label="Giá gói khám  " placeholder="Nhập nhóm thiết bị ..." component={RenderMoneyFormat}></Field>
                                    </div>
                                    <div className="text-right">
                                        <button type="button" style={{ marginRight: "20px" }} className="btn btn-default" onClick={this.handleHideAndClear} ><i class="icon-cross" aria-hidden="true"></i> Đóng</button>
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
            form: 'ModalPackage',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalPackage)));















