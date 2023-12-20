import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { Modal } from 'react-bootstrap';
import { RenderInputWithDiv, RenderDatePicker, RenderSelect, RenderNumber, RenderNumberInput } from '../../components/formInputs';
import { Field, reduxForm } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LoadingScreen } from '../../components/commonWidgets';
import { LOAD_UPDATING_COUPON } from './action-types';
import moment from 'moment';

const validate = values => {
    const errors = {};
    if(values.discountPercent > 101 ){
        errors.discountPercent = "Phần trăm không được vượt quá 100%"
    } 
    return errors;
}
const mapStateToProps = state => {
    var updateValue = {
        ...state.couponReducer.updatingCoupon,
        validFrom: state.couponReducer.updatingCoupon && state.couponReducer.updatingCoupon.validFrom ? moment(state.couponReducer.updatingCoupon.validFrom) : null,
        validTo: state.couponReducer.updatingCoupon && state.couponReducer.updatingCoupon.validTo ? moment(state.couponReducer.updatingCoupon.validTo) : null,
    };
    return {
        initialValues: updateValue
    };
};
const mapDispatchToProps = dispatch => ({
    loadCoupon: (payload) =>
        dispatch({ type: LOAD_UPDATING_COUPON, payload: payload })
});
class ModalCoupon extends React.Component {
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
        var id = this.props.idCoupon;
        var url = '/coupon/add';
        var bodyObject = {
            code: values.code,
            discountPercent:values.discountPercent,
            validFrom:values.validFrom,
            validTo:values.validTo,
        };
        if (id) {
            url = '/coupon/update';
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
        const { loadCoupon } = this.props;
        var id = this.props.idCoupon;
        const dataPromise = agent.CouponApi.getCoupon(id);
        loadCoupon(Promise.resolve(dataPromise))
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
                                    <div className="col col-md-12">
                                        <Field name="code" label="Mã Mã Giảm Giá" placeholder="Nhập mã giảm giá ..." component={RenderInputWithDiv}></Field>
                                        <Field name="discountPercent" label="Phần trăm giảm giá" placeholder="Nhập phẩn trăm giảm giá ..." component={RenderNumberInput}></Field>
                                        <Field name="validFrom" dateFormat="DD/MM/YYYY" label="Từ ngày " placeholder="Nhập ngày bắt đầu ..."component={RenderDatePicker}></Field>
                                        <Field name="validTo" dateFormat="DD/MM/YYYY" label="Đến ngày " placeholder="Nhập ngày kết thúc ..."component={RenderDatePicker}></Field>
                                    </div>
                                    <br/>
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
            form: 'ModalCoupon',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(ModalCoupon)));















