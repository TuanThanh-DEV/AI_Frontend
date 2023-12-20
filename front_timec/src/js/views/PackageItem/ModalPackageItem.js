import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderDatePicker, RenderSelect, RenderMoneyFormat } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_PACKAGEITEM } from './action-types';
import moment from 'moment';

const validate = values => {
    const errors = {};
    if (!values.diagnosisServiceId) {
        errors.diagnosisServiceId = 'Vui lòng chọn dịch vụ';
    };

    return errors;
}
const mapStateToProps = state => {
    var updateValue = {
        ...state.packageItemReducer.updatingPackageItem
    };
    return {
        initialValues: updateValue
    };
};
const mapDispatchToProps = dispatch => ({
    loadPackageItem: (payload) =>
        dispatch({ type: LOAD_UPDATING_PACKAGEITEM, payload: payload }),
        updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "ModalPackageItem", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});
class ModalPackageItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            listAllPackage: [],
            listAllDiagnosisService: [],
        }

        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
    };

    getlistAllPackage() {
        let setStateInRequest = (list) => { this.setState({ listAllPackage: list }) }
        return agent.PackageApi.listAllPackage(
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
    getlistAllDiagnosisService() {
        let setStateInRequest = (list) => { this.setState({ listAllDiagnosisService: list }) }
        return agent.DiagnosisServiceApi.listAllDiagnosisService(
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
        const { destroy, onHide, idPackageForPackageItem } = this.props;
        onHide(idPackageForPackageItem);
        destroy();
    }
    handleAdd(values) {
        var { onHide, idPackageForPackageItem } = this.props;
        var id = this.props.idPackageItem;
        var url = '/packageItem/add';
        var bodyObject = {
            name: values.name,
            price: values.price,
            packageId: values.packageId,
            diagnosisServiceId: values.diagnosisServiceId,
            price: values.price,

        };
        if (id) {
            url = '/packageItem/update';
            bodyObject.id = id;
        }
        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && result.id) {
                onHide(idPackageForPackageItem);
            } else {
                toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    };

    componentWillMount() {
        const { loadPackageItem, idPackageForPackageItem ,updateField} = this.props;
        var id = this.props.idPackageItem;
        const dataPromise = agent.PackageItemApi.getPackageItem(id);
        loadPackageItem(Promise.resolve(dataPromise))
        this.getlistAllPackage();
        this.getlistAllDiagnosisService();
        if (idPackageForPackageItem) {
            updateField("packageId", idPackageForPackageItem);
        }
    }
    render() {
        const { handleSubmit, submitting, title, invalid } = this.props;
        const modalConfig = {
            backdrop: 'static', show: this.props.show, bsSize: "sm",
            onHide: this.props.onHide,
            submitting: this.props.submitting
        };

        var optionAllPackage = [];
        var dataListPackage = this.state.listAllPackage;
        if (dataListPackage) {
            dataListPackage.map(item => {
                optionAllPackage.push({ label: item.name, value: item.id });
            })
        }
        var optionAllDiagnosisService = [];
        var dataListDiagnosisService = this.state.listAllDiagnosisService;
        if (dataListDiagnosisService) {
            dataListDiagnosisService.map(item => {
                optionAllDiagnosisService.push({ label: item.name, value: item.id });
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
                                        <Field name="packageId" label="Tên gói khám" options={optionAllPackage} component={RenderSelect}></Field>
                                        {/* <Field name="name" label="Tên gói khám" placeholder="Nhập tên gói khám..." component={RenderInputWithDiv}></Field> */}
                                        <Field name="diagnosisServiceId" label="Tên dịch vụ" options={optionAllDiagnosisService} component={RenderSelect}></Field>
                                        <Field name="price" label="Giá dịch vụ" placeholder="Nhập giá tiền..." component={RenderMoneyFormat}></Field>
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
            form: 'ModalPackageItem',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalPackageItem)));















