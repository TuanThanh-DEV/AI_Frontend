import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderDatePicker, RenderSelect } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_PRETEMPLATEFIELD } from './action-types';
import moment from 'moment';

const validate = values => {
    const errors = {};
    if (!values.name) {
        errors.name = "Vui lòng nhập!"
    }
    if (!values.code) {
        errors.code = "Vui lòng nhập!"
    }
    if (moment(values.expiredDate) < moment(values.userDate)) {
        errors.expiredDate = 'Hạn sử dụng không được nhỏ hơn ngày đưa vào sử dụng!, vui lòng thử lại!'
    }
    return errors;
}
const mapStateToProps = state => {
    var updateValue = {
        ...state.preTemplateFieldReducer.updatingPreTemplateField,
        userDate: state.preTemplateFieldReducer.updatingPreTemplateField && state.preTemplateFieldReducer.updatingPreTemplateField.userDate ? moment(state.preTemplateFieldReducer.updatingPreTemplateField.userDate) : null,
        expiredDate: state.preTemplateFieldReducer.updatingPreTemplateField && state.preTemplateFieldReducer.updatingPreTemplateField.expiredDate ? moment(state.preTemplateFieldReducer.updatingPreTemplateField.expiredDate) : null,
    };
    return {
        initialValues: updateValue
    };
};
const mapDispatchToProps = dispatch => ({
    loadPreTemplateField: (payload) =>
        dispatch({ type: LOAD_UPDATING_PRETEMPLATEFIELD, payload: payload })
});
class ModalPreTemplateField extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listAllSupplier: [],
        }

        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
    };

    getlistAllSupplier() {
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
        var id = this.props.idPreTemplateField;
        var url = '/preTemplateField/add';
        var bodyObject = {
            itemKey: values.itemKey,
            fieldType: values.fieldType,
            suggestedList: values.suggestedList,
            ranking: values.ranking,
        };
        if (id) {
            url = '/preTemplateField/update';
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
        const { loadPreTemplateField } = this.props;
        var id = this.props.idPreTemplateField;
        {
            const dataPromise = agent.PreTemplateFieldApi.getPreTemplateField(id);
            loadPreTemplateField(Promise.resolve(dataPromise))
        }


        this.getlistAllSupplier();
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
                                    <div className="row">
                                        <div className="col-md-12">
                                            <Field name="itemKey" label="Key" placeholder=" ..." component={RenderInputWithDiv}></Field>
                                            <Field name="fieldType" label="Type" placeholder=" ..." component={RenderInputWithDiv}></Field>
                                            <Field name="suggestedList" label="List" placeholder=" ..." component={RenderInputWithDiv}></Field>
                                            <Field name="ranking" label="ranking" placeholder=" ..." component={RenderInputWithDiv}></Field>
                                        </div>
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
            form: 'ModalPreTemplateField',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalPreTemplateField)));















