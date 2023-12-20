import React from 'react';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import agent from '../../services/agent';

import { FormatterUtils } from '../../utils/javascriptUtils';
import ModalPayment from '../Payment/ModalPayment';
import RowEditDrugRetailBarCode from './RowEditDrugRetailBarCode';
import { Field } from 'redux-form';
import { RenderInputWithDiv } from '../../components/formInputs';

import {InvoicePrintService} from './InvoicePrintService';

// const DRUG_GROUP_SALE_PRICE = 5000;
class TabDrugRetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPrescriptionModalShown: false,
            prescriptionId: null,
            patientId: null,
            listPrescriptionItem: [],
            allPrescriptionItem: [],
            isShowModalPrescriptionItemOld: false,
            columnNameClicked: null,
            currentShowItem: false,
            isPaymentModalShown: false,
            idPayment: null,
            invoiceDto: null,
            status: "TODO",
            isPrescription: false,
            barCodeGroup: [],
            idPrescriptionItemSupper: null,
            listprescription: []
        }
        this.handleAddModalRow = this.handleAddModalRow.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.handleNewDrug = this.handleNewDrug.bind(this);
        this.deletePrescriptionItem = this.deletePrescriptionItem.bind(this);
        this.handleCreatePrescription = this.handleCreatePrescription.bind(this);
        this.handlePayment = this.handlePayment.bind(this);
        this.getListPrescriptionItemByPrescriptionId = this.getListPrescriptionItemByPrescriptionId.bind(this);
        this.handleSuccessDrugGroup = this.handleSuccessDrugGroup.bind(this);
        this.handleHidemodal = (result) => {
            // var this_=this;   
            var dataPrescriptionItemList = this.state.allPrescriptionItem;
            dataPrescriptionItemList.map(item => {
                item.isShowEdit = false;
                item.newRow = false;
                if (!item.id) {
                    dataPrescriptionItemList.splice(-1, 1);
                }
            })
            this.setState({
                isPrescriptionModalShown: false,
                isShowModalPrescriptionItemOld: false,
                isPaymentModalShown: false,
            });
            if (result === "success") {
                this.setState({
                    status: "SUCCESS"
                })
            }

        };

        this.reloadEditable = (selectedItem, columnName) => {
            var status = this.state.status;
            if (!(status === "SUCCESS")) {
                var dataPrescriptionItem = this.state.listPrescriptionItem;
                // Set false all item not selected
                dataPrescriptionItem.map(item => {
                    item.isShowEdit = false;
                    item.newRow = false;
                    if (!item.id) {
                        dataPrescriptionItem.splice(-1, 1);
                    }
                })

                //  Set true particular item
                selectedItem.isShowEdit = true;
                this.setState({
                    currentShowItem: selectedItem,
                    columnNameClicked: columnName
                })
            }
        }
    };

    

    getListPrescriptionItemByPrescriptionId(indexRow, eventNewRow, dowRow, idPrescriptionItemSupper, forcusToTotalAmount) {
        var id = this.props.prescriptionId;
        var this_ = this;
        if (eventNewRow && !forcusToTotalAmount) {
            let setStateInRequest = (list, all) => { this.setState({ listPrescriptionItem: list, allPrescriptionItem: all }) }
            return agent.PrescriptionItemApi.findByPrescriptionId(id
            ).then(function (res) {
                var result = res.resultData;
                var all = [].concat(result);
                if (result) {
                    var list = result.filter(function (e) {
                        return e.invoiceItemType == 'DRUG_ITEM' ||
                            e.invoiceItemType == 'DRUG_GROUP' || e.invoiceItemType == 'IN_GROUP_ITEM';
                    });
                    list.map(item => {
                        item.isShowEdit = false;
                    })

                    setStateInRequest(list, all);
                    this_.handleAddModalRow();
                    this_.handleSum();


                } else {
                    toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                    + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
            });

        } else if (!eventNewRow && forcusToTotalAmount) {
            let setStateInRequest = (list, all) => { this.setState({ listPrescriptionItem: list, columnNameClicked: "totalAmount", allPrescriptionItem: all }) }
            return agent.PrescriptionItemApi.findByPrescriptionId(id
            ).then(function (res) {
                var result = res.resultData;
                var all = [].concat(result);
                if (result) {
                    result.map((item, index) => {
                        if (indexRow != null) {
                            if (indexRow === index) {
                                item.isShowEdit = true;
                            }
                        } else {
                            item.isShowEdit = false;
                        }
                    })
                    setStateInRequest(result, all);
                    this_.handleSum();
                } else {
                    toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                    + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
            });

        } else {
            let setStateInRequest = (list, all) => { this.setState({ listPrescriptionItem: list, columnNameClicked: "drugName", allPrescriptionItem: all }) }
            return agent.PrescriptionItemApi.findByPrescriptionId(id
            ).then(function (res) {
                var result = res.resultData;
                var all = [].concat(result);
                if (result) {
                    result.map((item, index) => {
                        if (indexRow != null) {
                            if (indexRow + 1 === index && dowRow) {
                                item.isShowEdit = true;
                            }
                        } else {
                            item.isShowEdit = false;
                        }
                    })
                    setStateInRequest(result, all);
                    this_.handleSum();
                } else {
                    toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                    + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
            });
        }
    }
   
    handleSuccessDrugGroup() { // TODO: same as handleDoneGroup - should remove this
        this.getListPrescriptionItemByPrescriptionId();
        this.setState({
            idPrescriptionItemSupper: null
        })
    }

    handleAddModalRow() {

        let listPrescriptionItem = this.state.listPrescriptionItem;
        let idPrescriptionItemSupper = this.state.idPrescriptionItemSupper;
        listPrescriptionItem.map(item => {
            item.isShowEdit = false;
            item.newRow = false;
            if (!item.id) {
                listPrescriptionItem.splice(-1, 1);
            }
        })
        listPrescriptionItem.push(
            {
                isShowEdit: true,
                prescriptionId: this.props.prescriptionId,

            }
        );
        this.setState({
            listPrescriptionItem: listPrescriptionItem,
            columnNameClicked: "barCode",
            idPrescriptionItemSupper: idPrescriptionItemSupper
        })

    };

    handleHideAndClear() {
        const { destroy, backToList, onHide } = this.props;
        onHide();
        destroy();
        backToList()
    }
    componentWillMount() {
        this.getCurrentPrescription();
        this.getListPrescriptionItemByPrescriptionId();
        this.handleAddModalRow(); // TODO: Add row after all list screen has been updated

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.countReloadTabDrugRetail !== this.props.countReloadTabDrugRetail) {
            this.getListPrescriptionItemByPrescriptionId();
        }
    }

    // componentDidUpdate() {
    //     ScriptUtils.loadFootable();
    // }

    getCurrentPrescription() {
        var id = this.props.prescriptionId;
        let setStateInRequest = (list) => { this.setState({ currentPrescription: list }) }
        return agent.PrescriptionApi.getPrescription(id
        ).then(function (res) {
            var result = res.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error("Có lỗi khi xóa dữ liệu. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Không thể xóa dữ liệu đang được sử dụng từ màn hình khác! ", { autoClose: 15000 });
        });
    }
    handleSum() {
        this.props.handleShowPrice();
    }
    handleNewDrug(indexRow, eventNewRow, dowRow, idPrescriptionItemSupper, forcusToTotalAmount) {
        this.getListPrescriptionItemByPrescriptionId(indexRow, eventNewRow, dowRow, idPrescriptionItemSupper, forcusToTotalAmount);
        this.setState({
            currentShowItem: null,
            columnNameClicked: null,
            idPrescriptionItemSupper: idPrescriptionItemSupper ? idPrescriptionItemSupper : null
        })
    }
    deletePrescriptionItem(id) {
        var this_ = this;
        var url = `/prescriptionItem/${id}`;
        return agent.asyncRequests.del(url
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && !result.error) {
                // alert("Xoá Thành Công !");
                this_.getListPrescriptionItemByPrescriptionId();
            } else {
                toast.error("Có lỗi khi xóa dữ liệu. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Không thể xóa dữ liệu đang được sử dụng từ màn hình khác! ", { autoClose: 15000 });
        });
    }
    handleShowModalPayment(invoiceDto) {
        if (invoiceDto.status == 'OPEN') {
            this.setState({
                isPaymentModalShown: true,
                invoiceDto: invoiceDto,
                idPayment: null
            });
        } else {
            toast.error("Hóa Đơn Này Đã Thanh Toán Rồi!", {
                autoClose: 5000
            });
        }
    }
    handleDeleteAllPrescriptionById() {
        // TODO: Remove prescription if cancel
        window.location.href = "/listInvoice";
    }
    handleCreatePrescription() {
        const { currentUser } = this.props;
        var this_ = this;
        // this.setState({
        //     isShowModalInputNamePatientForDrugRetail: true
        // });

        return agent.asyncRequests.get("/prescription/newPrescription?currentUserId=" + currentUser.id
        ).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                this_.setState({
                    status: "TODO"
                })
                window.location.href = "/drugRetail/" + result.id;
            } else {
                toast.error("Không thể tạo mới đơn khám bệnh cho bán thuốc ngoài luồng ( Đơn bán lẻ )! Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });

    }

    handlePayment() {
        var this_ = this;
        var url = '/invoice/createInvoiceFromPrescriptionItem?prescriptionId=';
        var prescriptionId = this.props.prescriptionId;
        //    var dataPrescriptionItemList = this.state.listPrescriptionItem;
        return agent.asyncRequests.get(url + prescriptionId
        ).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                this_.handleShowModalPayment(result);

                // TODO: After run payment, the allPrescriptionItem is still incorrect
                this_.getListPrescriptionItemByPrescriptionId();
                // toast.info("Đã tạo thành công Invoice Id " + result.id, { autoClose: 5000 });

            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });


    }
    handlerPrint(ev) {
        const { currentUser } = this.props;
        if (ev.keyCode === 13) {
            InvoicePrintService.handleSavePDFRetail(InvoicePrintService.getDataExportRetail(this.state.allPrescriptionItem, currentUser, this.state.invoiceDto));
        }
    }

    render() {
        const dataPrescriptionItemList = this.state.listPrescriptionItem;
        const allPrescriptionItem = this.state.allPrescriptionItem;
        var status = this.state.status;
        const { currentUser } = this.props;
       


        


        var buttonHandleCreate = (status === "SUCCESS" ? <button type="button" className="btn bg-teal" onClick={this.handleCreatePrescription}>Tạo Đơn Mới</button> : null)

        // TODO: check status of invoice to show this button.
        // var buttonHandlePrintPDF = (status === "SUCCESS" ? <button type="button" className="btn bg-info" onClick={() => this.handleSavePDF(this.getDataExport(allPrescriptionItem))}>In Đơn Thuốc</button> : null)
        var buttonHandlePrintPDF = (status === "SUCCESS" ? <button type="button" className="btn bg-info" onClick={() => InvoicePrintService.handleSavePDFRetail(InvoicePrintService.getDataExportRetail(allPrescriptionItem, currentUser, this.state.invoiceDto))}>In Đơn Thuốc</button>: null)
        // var buttonAutoPrintPDF = (status === "SUCCESS" ? <Field readOnly={true} autoFocus={true} component={RenderInputWithDiv} onEnterAction={(e) => this.handlerPrint(e)}>In Đơn Thuốc</Field> : null)
        var buttonHandleCancel = (status === "TODO" ? <button type="button" className="btn btn-warning" onClick={this.handleDeleteAllPrescriptionById}>Huỷ Đơn</button> : null)
        var buttonHandlePayment = (status === "TODO" ? <button type="button" className="btn btn-info" onClick={this.handlePayment}>Thanh Toán</button> : null)
        var buttonAddDrug = (status === "TODO" ? <button type="button" className="btn bg-teal" onClick={this.handleAddModalRow}>Thêm Thuốc Lẻ</button> : null)
        var prescriptionItemRows = [];
        var _this = this;
        if (dataPrescriptionItemList) {
            var presciptionCurrentNoSupper = 0;
            var presciptionCurrentNoChild = 0;
            var presciptionCurrentNo = 1;
            var price = 0;
            var lengthList = dataPrescriptionItemList.length;
            let columnNameClicked = this.state.columnNameClicked;
            prescriptionItemRows = dataPrescriptionItemList.map((parent_item, index) => {
                // var elementCss = parent_item.drug.hasPrescription ? "" : "";
                // TODO: Remove supperId from prescriptionItem.
                if (parent_item.supperId) {
                    presciptionCurrentNoChild++
                    presciptionCurrentNo = presciptionCurrentNoSupper + "." + presciptionCurrentNoChild;
                    price = 0
                } else {
                    presciptionCurrentNoSupper++
                    presciptionCurrentNo = presciptionCurrentNoSupper;
                    presciptionCurrentNoChild = 0;
                    dataPrescriptionItemList.map(itemChild => {
                        if (parent_item.id && parent_item.id === itemChild.supperId) {
                            price = price + _this.calculateTotalSaleAmount(itemChild);
                        }
                    })
                }
                if (!parent_item.isShowEdit) {
                    var elsementActive = parent_item.drug.hasPrescription ? "red" : "";
                    var totalSaleAmount = this.calculateTotalSaleAmount(parent_item);
                    return (<tr key={"prescriptionItemId" + parent_item.id} style={{ color: elsementActive }} >
                        <td>{presciptionCurrentNo}</td>
                        <td style={{ textAlign: "center" }}>{(parent_item.inputStock ? parent_item.inputStock.batchBarcode : "")}</td>
                        <td style={{ textAlign: "center" }} onClick={() => { this.reloadEditable(parent_item, "drugName") }}>{(parent_item.drug.name)}</td>
                        <td style={{ textAlign: "center" }} onClick={() => { this.reloadEditable(parent_item, "saleUom") }}>{(parent_item.saleUom)}</td>
                        <td style={{ textAlign: "center" }} onClick={() => { this.reloadEditable(parent_item, "totalAmount") }}>{FormatterUtils.formatCurrency(parent_item.totalAmount)}</td>
                        <td style={{ textAlign: "center" }} onClick={() => { this.reloadEditable(parent_item, "totalAmount") }}>{FormatterUtils.formatCurrency(totalSaleAmount)}</td>
                        <td> {status === "SUCCESS" ? "" :
                            <div><button style={{ margin: "auto", boxShadow: "none" }} className="btn btn-default" onClick={() => this.deletePrescriptionItem(parent_item.id)}>Xoá</button></div>
                        }</td>
                    </tr>
                    )
                }
                else {
                    return <RowEditDrugRetailBarCode columnNameClicked={columnNameClicked}
                        key={"RowsEdit_" + parent_item.id}
                        isShowEdit={parent_item.isShowEdit}
                        item={parent_item}
                        eventNewRow={index + 1 === lengthList ? true : false}
                        handleNewDrug={(indexRow, eventNewRow, dowRow, idPrescriptionItemSupper, forcusToTotalAmount) => this.handleNewDrug(indexRow, eventNewRow, dowRow, idPrescriptionItemSupper, forcusToTotalAmount)}
                        indexRow={index}
                        prescriptionId={this.props.prescriptionId}
                        handleGetListPrescriptionItemByPrescriptionId={this.getListPrescriptionItemByPrescriptionId}
                        barCodeGroup={this.state.barCodeGroup}
                        idPrescriptionItemSupper={this.state.idPrescriptionItemSupper}
                        invoiceItemType="DRUG_ITEM"
                        handlePayment={this.handlePayment}
                    ></RowEditDrugRetailBarCode>
                }

            })
        }

        return <div className="tab-pane active" id="default-justified-tab1">

        <table className="table table-xxs table-bordered">
            <thead>
                <tr className="bg-teal" >
                    <th rowSpan="2" width="5%" style={{ textAlign: "center", width: '5%' }}><i className="icon-menu-open2"></i></th>
                    <th rowSpan="2" style={{ textAlign: "center", width: '15%' }}>Mã Lô Thuốc</th>
                    <th rowSpan="2" style={{ textAlign: "center", width: '20%' }}>Tên Thuốc</th>
                    <th rowSpan="2" style={{ textAlign: "center", width: '10%' }}>ĐVT</th>
                    <th rowSpan="2" style={{ textAlign: "center", width: '10%' }}>Số Lượng</th>
                    <th rowSpan="2" style={{ textAlign: "center", width: '10%' }}>Thành Tiền</th>
                    <th rowSpan="2" width="10%" style={{ textAlign: "center", width: '5%' }}><i className="icon-menu-open2"></i></th>
                </tr>
            </thead>
            <tbody>
                {prescriptionItemRows}

            </tbody>

            {this.state.isPaymentModalShown ? <ModalPayment
                title="Thanh Toán Hóa Đơn"
                invoiceDto={this.state.invoiceDto}
                idPayment={this.state.idPayment}
                show={this.state.isPaymentModalShown}
                onHide={(success) => this.handleHidemodal(success)}
                idPatient={this.state.idPatient} /> : null
            }
        </table>
        <div className="panel-body">
            <div className="heading-elements">
                {buttonAddDrug}
                {buttonHandleCreate}
                {buttonHandleCancel}
                {buttonHandlePayment}
                {buttonHandlePrintPDF}
                {/* {<div style={{ opacity: 0 }}> {buttonAutoPrintPDF}</div>} */}
            </div>
        </div>
    </div>


    }

    calculateTotalSaleAmount(prescriptionItem) {
        var totalSaleAmount = 0;
        if (prescriptionItem.invoiceItemType == 'DRUG_GROUP') {
            // totalSaleAmount = prescriptionItem.totalAmount * DRUG_GROUP_SALE_PRICE;
            totalSaleAmount = prescriptionItem.totalAmount * prescriptionItem.drug.salePrice;
        }
        else if (prescriptionItem.saleUom == prescriptionItem.drug.packageUom) {
            totalSaleAmount = prescriptionItem.totalAmount * prescriptionItem.drug.packageSalePrice;
        }
        else { // basic uom drug
            totalSaleAmount = prescriptionItem.totalAmount * prescriptionItem.drug.salePrice;
        }
        return totalSaleAmount;
    }
}


export default translate('translations')(TabDrugRetail);