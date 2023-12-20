import React from 'react';
import { connect } from 'react-redux';
import agent from '../../services/agent';
import { RenderInputWithDiv, RenderInputWithGen, RenderTextArea, RenderDatePicker, RenderCheckbox, RenderSelect, RenderNumberInput, RenderMoneyFormat, RenderHiddenInput } from '../../components/formInputs';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { LOAD_UPDATING_PRESCRIPTIONITEM } from '../prescriptionItem/action-types';
import { StringUtils } from '../../utils/javascriptUtils';

const validate = values => {
    const errors = {};
    // if (!values.drugId) {
    //     errors.drugId = 'Vui lòng nhập Thuốc.';
    // }
    if (!values.id) {
        errors.id = 'Dữ liệu chưa lưu. Vui lòng điền thông tin và enter. Hoặc nhấn Esc để hủy.';
    }
    if (!values.drugId) {
        errors.drugId = 'Vui lòng chọn thuốc kê đơn. Hoặc nhấn Esc để bỏ qua';
    }
    if (!StringUtils.isValidFloat(values.morningAmount)) {
        errors.morningAmount = 'Số lượng thuốc phải là số nguyên hoặc tỉ lệ 1/2 hoặc 0.5';
    }
    if (!StringUtils.isValidFloat(values.noonAmount)) {
        errors.noonAmount = 'Số lượng thuốc phải là số nguyên hoặc tỉ lệ 1/2 hoặc 0.5';
    }
    if (!StringUtils.isValidFloat(values.afternoonAmount)) {
        errors.afternoonAmount = 'Số lượng thuốc phải là số nguyên hoặc tỉ lệ 1/2 hoặc 0.5';
    }
    if (!StringUtils.isValidFloat(values.eveningAmount)) {
        errors.eveningAmount = 'Số lượng thuốc phải là số nguyên hoặc tỉ lệ 1/2 hoặc 0.5';
    }

    return errors;
}
const selector = formValueSelector("RowEditPrescriptionItemBHYT");
const mapStateToProps = state => {
    var updateValue = {
        ...state.prescriptionItemReducer.updatingPrescriptionItem,

    };
    return {
        initialValues: updateValue,
        currentValues: selector(state, 'drugId',
            'drug.ingredient',
            'totalAmount',
            'instruction',
            'morningAmount',
            'noonAmount',
            'afternoonAmount',
            'eveningAmount',
            'numberOfDays',
            'note',
            'stockId'
        )

    };
};

const mapDispatchToProps = dispatch => ({
    loadPrescriptionItem: (payload) =>
        dispatch({ type: LOAD_UPDATING_PRESCRIPTIONITEM, payload: payload }),
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "RowEditPrescriptionItemBHYT", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        })
});


class RowEditPrescriptionItemBHYT extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // listAllPrescriptionItems:[],
            listAllStock: [],
        }
        this.handleAdd = this.handleAdd.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.handleOnKeyPress = (ev) => {
            var _this = this;
            const { currentValues, indexRow } = this.props;
            if (ev.keyCode === 13) {
            } else if (ev.keyCode === 27) {
                _this.props.handleEventEditTable();
            }
        }
        this.handleEndTab = (ev) => {
            const { eventNewRow, currentValues, validate } = this.props;

            if (eventNewRow && ev.keyCode === 9) {
                this.handleAddEndTabs(currentValues)
            } else if (eventNewRow && ev.keyCode === 13) {
                this.handleAddEndTabs(currentValues);

            } else if (!eventNewRow && ev.keyCode === 9) {
                this.handleAdd(currentValues, true);
            }

        }

        this.handleCalculateTotalAmount = (ev) => {
            const { currentValues, updateField } = this.props;
            if (ev.keyCode === 9 || ev.keyCode === 13) {
                var totalAmount = this.calculateTotalAmount(currentValues);
                updateField("totalAmount", totalAmount);
            }
        }

        this.handleOutsideClick = (event) => {
            const { currentValues } = this.props;
            if (currentValues.drugId) { // Doctor is inputting prescription
                return;
            }
            var _this = this;
            if (this.refs.detailItemEditTable && !this.refs.detailItemEditTable.contains(event.target)) {
                _this.props.handleEventEditTable();
            }
            // if (this.refs.popoverEditDiv && this.refs.popoverEditDiv.contains(event.target)) {
            //     checkClickOutSide = false
            // }
            // if (checkClickOutSide) {
            //         this.handleAdd(formValueProps); 
            // }
        }
        this.handleChangeDrug = (stockId) => {
            const { updateField, drugIdSelector } = this.props;
            if (stockId) {
                this.state.listAllStock.map(item => {
                    if (item.id === stockId) {
                        // TODO: failed to update
                        setTimeout(() => {
                            updateField("drug.ingredient", item.drug.ingredient);
                            updateField("drugId", item.drugId);
                        }, 50);
                    }
                })
            }
        }

    }
    getlistAllStock() {
        let setStateInRequest = (list) => { this.setState({ listAllStock: list }) }
        return agent.StockApi.listAllStockBHYT(
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
        document.addEventListener('click', this.handleOutsideClick, false);
        this.getlistAllStock();
        loadPrescriptionItem({ resultData: item });
    }

    calculateTotalAmount(values) {
        return Math.ceil(StringUtils.parseStringToFloat(values.morningAmount ? values.morningAmount : 0) * values.numberOfDays +
            StringUtils.parseStringToFloat(values.noonAmount ? values.noonAmount : 0) * values.numberOfDays +
            StringUtils.parseStringToFloat(values.afternoonAmount ? values.afternoonAmount : 0) * values.numberOfDays +
            StringUtils.parseStringToFloat(values.eveningAmount ? values.eveningAmount : 0) * values.numberOfDays)
    }

    handleAdd(values, dowRow) {
        const { item, indexRow, prescriptionId } = this.props;
        var _this = this;
        var url = '/prescriptionItem/add';
        var bodyObject = {

            prescriptionId: prescriptionId,
            drugId: values.drugId,
            morningAmount: values.morningAmount,
            noonAmount: values.noonAmount,
            afternoonAmount: values.afternoonAmount,
            eveningAmount: values.eveningAmount,
            numberOfDays: values.numberOfDays,
            note: values.note,
            stockId: values.stockId,

            totalAmount: values.totalAmount,

            instruction: "Sáng " + (values.morningAmount ? values.morningAmount : 0) + " , Trưa " + (values.noonAmount ? values.noonAmount : 0)
                + " , Chiều " + (values.afternoonAmount ? values.afternoonAmount : 0) + " , Tối " + (values.eveningAmount ? values.eveningAmount : 0)
                + ' - ' + (values.numberOfDays ? 'dùng ' + values.numberOfDays + " Ngày" : '') + "    " + (values.note ? values.note : ''),

        };
        if (item.id) {
            url = '/prescriptionItem/update';
            bodyObject.id = item.id;
        }
        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && result.id) {
                _this.props.handleEventEditTable(indexRow, false, dowRow);
            } else {
                toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });

    }

    handleAddEndTabs(values) {
        const { item, indexRow, prescriptionId } = this.props;
        var _this = this;
        var url = '/prescriptionItemBHYT/add';
        var bodyObject = {

            prescriptionId: prescriptionId,
            drugId: values.drugId,
            stockId: values.stockId,
            morningAmount: values.morningAmount,
            noonAmount: values.noonAmount,
            afternoonAmount: values.afternoonAmount,
            eveningAmount: values.eveningAmount,
            numberOfDays: values.numberOfDays,
            note: values.note,
            totalAmount: values.totalAmount,
            instruction: "Sáng " + (values.morningAmount ? values.morningAmount : 0) + " , Trưa " + (values.noonAmount ? values.noonAmount : 0)
                + " , Chiều " + (values.afternoonAmount ? values.afternoonAmount : 0) + " , Tối " + (values.eveningAmount ? values.eveningAmount : 0)
                + ' - ' + (values.numberOfDays ? 'dùng ' + values.numberOfDays + " Ngày" : '') + "    " + (values.note ? values.note : ''),

        };
        if (item ? item.id : null) {
            url = '/prescriptionItemBHYT/update';
            bodyObject.id = item.id;
        }

        return agent.asyncRequests.post(url, bodyObject
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && result.id) {
                _this.props.handleEventEditTable(indexRow, true, true);
                // toast.info("Lưu Thành Công.", { autoClose: 1000 });
            } else {

                toast.error("Có lỗi khi lưu trữ. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });

    }


    ///Hide and Clean Value
    handleHideAndClear() {
        const { destroy, onHide } = this.props;
        // event.preventDefault();
        onHide();
        destroy();
    }
    render() {

        const { item, columnNameClicked } = this.props;
        var editRow = null;
        var optionStock = [];
        this.state.listAllStock.map(item => {
            optionStock.push({label:item.drug.name  + " " + item.drug.hamLuongBHYT + (item.drug.ingredient ? " " + item.drug.ingredient : "") + ' (' + item.available + ' ' + item.drug.uom + ') ', value: item.id })
        })
        if (this.props.isShowEdit == true) {
            editRow = (<tr ref="detailItemEditTable" onKeyDown={(ev) => this.handleOnKeyPress(ev)} role="form" >
                <td>
                    <Field name="id" component={RenderHiddenInput}  ></Field>
                </td>
                <td>
                    <Field name="stockId" options={optionStock} component={RenderSelect} onChangeAction={(value) => { this.handleChangeDrug(value) }} autoFocus={columnNameClicked == "drugName"} countAccents={true}></Field>
                </td>
                <td style={{display : 'none'}}>
                    <Field name="drugId" component={RenderNumberInput}  ></Field>
                </td>
                <td>
                    <Field name="morningAmount" placeholder="Sáng..." autoFocus={columnNameClicked == "instruction"} rows={1} component={RenderInputWithDiv}></Field>
                </td>
                <td>
                    <Field name="noonAmount" placeholder="Trưa..." autoFocus={columnNameClicked == "noonAmount"} component={RenderInputWithDiv}></Field>
                </td>
                <td>
                    <Field name="afternoonAmount" placeholder="Chiều..." autoFocus={columnNameClicked == "afternoonAmount"} component={RenderInputWithDiv}></Field>
                </td>
                <td>
                    <Field name="eveningAmount" placeholder="Tối..." autoFocus={columnNameClicked == "eveningAmount"} component={RenderInputWithDiv}></Field>
                </td>
                <td>
                    <Field name="numberOfDays" placeholder="Ngày..." autoFocus={columnNameClicked == "numberOfDays"} component={RenderInputWithDiv} onEnterAction={(e) => this.handleCalculateTotalAmount(e)}></Field>
                </td>
                <td>
                    <Field name="totalAmount" autoFocus={columnNameClicked == "totalAmount"} component={RenderMoneyFormat}></Field>
                </td>
                <td>
                    <Field style={{ width: '15%' }} name="note" placeholder="Ghi chú..." autoFocus={columnNameClicked == "note"} component={RenderInputWithDiv} onEnterAction={(e) => this.handleEndTab(e)}></Field>
                </td>

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
            form: 'RowEditPrescriptionItemBHYT',
            destroyOnUnmount: true,
            enableReinitialize: true,
            validate
        })(RowEditPrescriptionItemBHYT)));
