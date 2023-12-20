import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { RenderInputWithDiv, RenderInputWithGen, RenderTextArea, RenderDatePicker, RenderCheckbox, RenderSelect, RenderNumberInput, RenderMoneyFormat, RenderNumber } from '../../components/formInputs';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LOAD_UPDATING_PRESCRIPTIONITEM } from '../prescriptionItem/action-types';
import KeyboardEventHandler from 'react-keyboard-event-handler';
const validate = values => {
    const errors = {};
    // if (!values.drugId) {
    //     errors.drugId = 'Vui lòng nhập Thuốc.';
    // }
    return errors;
}
const selector = formValueSelector("RowEditDrugRetailBarCode");
const mapStateToProps = state => {
    var updateValue = {
        ...state.prescriptionItemReducer.updatingPrescriptionItem,

    };
    return {
        initialValues: updateValue,
        currentUser: state.common.currentUser,
        currentValues: selector(state, 'drugId',
            'drug.ingredient',
            'totalAmount',
            'instruction',
            'morningAmount',
            'noonAmount',
            'afternoonAmount',
            'eveningAmount',
            'numberOfDays',
            'barCode',
            'saleUom'
        )

    };
};

const mapDispatchToProps = dispatch => ({
    loadPrescriptionItem: (payload) =>
        dispatch({ type: LOAD_UPDATING_PRESCRIPTIONITEM, payload: payload }),
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "RowEditDrugRetailBarCode", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});


class RowEditDrugRetailBarCode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listAllStock: [],
            optionDrugUom: []
        }
        // this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.updateOptionDrugUom = this.updateOptionDrugUom.bind(this);
        this.handleOnKeyPress = (ev) => {
            if (ev.keyCode === 27) {
                this.props.handleGetListPrescriptionItemByPrescriptionId()
            }

        }
        this.handleEndTab = (ev) => {

            const { eventNewRow, currentValues, validate, handlePayment } = this.props;
            if (validate) {
                if (eventNewRow && (ev.keyCode === 13 || ev.keyCode === 9)) {
                    this.handleUpdateDrugChild(currentValues, false);

                } else if (!eventNewRow && (ev.keyCode === 13 || ev.keyCode === 9)) {
                    this.handleUpdateDrugChild(currentValues, true);
                } else if (ev.keyCode === 27) {
                    this.props.handleGetListPrescriptionItemByPrescriptionId()
                    // } else if (ev.shiftKey) {
                    //     alert("Bạn có muốn thanh toán ? ")
                    //     this.handleUpdateDrugChild(currentValues, false);
                    //     this.props.handleGetListPrescriptionItemByPrescriptionId()
                    //     this.props.handlePayment()
                }
            } else {

            }

        }
        this.handleFindBarCode = (ev) => {
            const { eventNewRow, currentValues, validate } = this.props;
            if (validate) {
                if (eventNewRow && ev.keyCode === 13) {
                    this.handleInsertDrugByBarCode(currentValues, true);
                } else if (ev.keyCode === 27) {
                    this.props.handleGetListPrescriptionItemByPrescriptionId()
                }
            } else {
            }
        }
        this.handleChangeDrug = (drugId) => {
            const { updateField, drugIdSelector } = this.props;
            if (drugId) {
                this.state.listAllStock.map(item => {
                    if (item.drug.id === drugId) {
                        // TODO: failed to update
                        setTimeout(() => {
                            updateField("drug.ingredient", item.drug.ingredient);
                        }, 50);
                    }
                })
            }
        }

    }

    updateOptionDrugUom (drug) {
        if (drug) {
            if (drug.packageUom) {
                this.setState({optionDrugUom: [drug.uom, drug.packageUom]});
            } else {
                this.setState({optionDrugUom: [drug.uom]});
            }
        }
    }

    handleshift() {
        const { eventNewRow, currentValues, validate, handlePayment } = this.props;
        alert("Bạn có muốn thanh toán ? ")
        this.handleUpdateDrugChild(currentValues, false);
        this.props.handleGetListPrescriptionItemByPrescriptionId();
        this.props.handlePayment();
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

    componentWillMount() {
        const { loadPrescriptionItem, item } = this.props;
        this.getlistAllStock();
        loadPrescriptionItem({ resultData: item });
        this.updateOptionDrugUom(item.drug);
    }

    handleInsertDrugByBarCode(values, dowRow) {
        const { indexRow, prescriptionId, idPrescriptionItemSupper, currentUser, updateField, destroy, invoiceItemType } = this.props;
        var _this = this;
        var totalAmount = values.totalAmount ? values.totalAmount : 0;
        if (!values.saleUom) {
            values.saleUom = this.state.optionDrugUom[0];
        }
        var url = "/prescriptionItem/createByBarCode";
        var bodyObject = {
            prescriptionId: prescriptionId,
            drugId: values.drugId,
            barCode: values.barCode,
            totalAmount: totalAmount,
            supperId: idPrescriptionItemSupper,
            prescriptionItemId: null,
            hospitalId: currentUser.hospitalId,
            invoiceItemType: invoiceItemType,
            saleUom: values.saleUom
        };

        if (values.barCode) {
            return agent.asyncRequests.post(url, bodyObject
            ).then(function (res) {
                var result = res.body.resultData;
                if (result && result.prescriptionItemId) {
                    // _this.updateOptionDrugUom(drug);

                    // drugChild
                    if (result.supperId && !result.drug.hasGroup) {

                        _this.props.handleNewDrug(indexRow, false, false, result.supperId, true);
                        //drug
                    } else if (!result.drug.hasGroup && !result.supperId) {
                        _this.props.handleNewDrug(indexRow, false, false, null, true);
                        //drugGroup
                    } else {
                        _this.props.handleNewDrug(indexRow, true, dowRow, result.prescriptionItemId, false);
                    }
                } else {
                    // toast.error("Mã Thuốc Không Đúng!");
                    toast.error(res.body.errorMessage);
                }
            }, function (err) {
                toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
            });
        } else {
            toast.info("Chưa Nhập Mã Thuốc!", { autoClose: 1500 });
        }
    }
    handleUpdateDrugChild(values, dowRow) {
        const { item, indexRow, barCodeGroup, prescriptionId, idPrescriptionItemSupper, updateField, destroy, invoiceItemType  } = this.props;
        var _this = this;
        var url = "/prescriptionItem/updateByBarCode";
        if (!values.saleUom) {
            values.saleUom = this.state.optionDrugUom[0];
        }
        // TODO: if uom is packageUom, recalculate totalAmount
        // Or use new field "amount_in_stock" in invoice_item => correct output stock 
        var bodyObject = {
            prescriptionId: prescriptionId,
            drugId: values.drugId,
            barCode: values.barCode,
            totalAmount: values.totalAmount ? values.totalAmount : 0,
            supperId: idPrescriptionItemSupper,
            prescriptionItemId: item.id,
            invoiceItemType: invoiceItemType,
            saleUom: values.saleUom
        };
        if (values.barCode || item.id != null) {
            return agent.asyncRequests.post(url, bodyObject
            ).then(function (res) {
                var result = res.body.resultData;
                if (result && result.id) {
                    _this.props.handleNewDrug(indexRow, true, dowRow, result.supperId, false);
                } else {
                    // toast.error("Mã Thuốc Không Đúng!");
                    toast.error(res.body.errorMessage);
                }
            }, function (err) {
                toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
            });
        } else {
            // toast.info("Chưa Nhập Mã Thuốc!", { autoClose: 1500 });
        }
    }


    ///Hide and Clean Value
    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        // event.preventDefault();
        onHide();
        destroy();
    }
    render() {

        const { columnNameClicked } = this.props;
        var editRow = null;
        var optionStock = [];
        this.state.listAllStock.map(item => {
            optionStock.push({ label: item.drug.name + " " + item.drug.hamLuongBHYT + ' (' + item.available + ')', value: item.drug.id })
        });

        var renderOptionDrugUom = [];
        this.state.optionDrugUom.map(item => {
            renderOptionDrugUom.push({label: item, value: item});
        });

        if (this.props.isShowEdit == true) {
            editRow = (<tr onKeyDown={(ev) => this.handleOnKeyPress(ev)} role="form" >
                <td>
                {/* <KeyboardEventHandler handleKeys={['shift']} handleFocusableElements onKeyEvent={(e) => this.handleshift(e)} /> */}
                </td>
                <td>
                    <Field name="barCode" placeholder="Mã Lô Thuốc..." autoFocus={columnNameClicked == "barCode"} component={RenderInputWithDiv} onEnterAction={(e) => this.handleFindBarCode(e)}></Field>
                </td>
                <td>
                    <Field name="drugId" options={optionStock} component={RenderSelect} autoFocus={columnNameClicked == "drugId"} ></Field>
                </td>
                <td>
                    <Field name="saleUom" component={RenderSelect} options={renderOptionDrugUom} autoFocus={columnNameClicked == "saleUom"}></Field>
                </td>
                <td>
                    <Field name="totalAmount" autoFocus={columnNameClicked == "totalAmount"} component={RenderInputWithDiv} onEnterAction={(e) => this.handleEndTab(e)}></Field>
                </td>
                <td></td>
                <td></td>
            </tr>
            )
        }
        return editRow;
    }
};


export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'RowEditDrugRetailBarCode',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(RowEditDrugRetailBarCode)));
