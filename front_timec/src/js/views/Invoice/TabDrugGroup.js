import React from 'react';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import agent from '../../services/agent';
import moment from 'moment';
import { FormatterUtils } from '../../utils/javascriptUtils';
import ModalPayment from '../Payment/ModalPayment';
import RowEditDrugRetailBarCode from './RowEditDrugRetailBarCode';
import { Field } from 'redux-form';
import { RenderInputWithDiv } from '../../components/formInputs';


class TabDrugGroup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPrescriptionModalShown: false,
            prescriptionId: null,
            patientId: null,
            listPrescriptionItem: [],
            isShowModalPrescriptionItemOld: false,
            columnNameClicked: null,
            currentShowItem: false,
            isPaymentModalShown: false,
            idPayment: null,
            invoiceDto: null,
            status: "TODO",
            isPrescription: false,
            barCodeGroup: [],
            idPrescriptionItemSupper: null

        }
        this.handleAddModalRow = this.handleAddModalRow.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.handleNewDrug = this.handleNewDrug.bind(this);
        this.deletePrescriptionItem = this.deletePrescriptionItem.bind(this);
        this.getListPrescriptionItemByPrescriptionId = this.getListPrescriptionItemByPrescriptionId.bind(this);
        this.handleDoneGroup = this.handleDoneGroup.bind(this);
        this.handleHidemodal = (result) => {
            // var this_=this;   
            var dataPrescriptionItemList = this.state.listPrescriptionItem;
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
        var groupId = this.props.groupId;
        var this_ = this;
        if (eventNewRow && !forcusToTotalAmount) {
            let setStateInRequest = (list) => { this.setState({ listPrescriptionItem: list }) }
            return agent.PrescriptionItemApi.findByPrescriptionId(id
            ).then(function (res) {
                var result = res.resultData;
                if (result) {
                    result = result.filter(function (e) {
                        return e.invoiceItemType == 'IN_GROUP_ITEM' && e.supperId == groupId;
                    });
                    result.map(item => {
                        item.isShowEdit = false;
                    });
                    
                    setStateInRequest(result);
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
            let setStateInRequest = (list) => { this.setState({ listPrescriptionItem: list, columnNameClicked: "totalAmount" }) }
            return agent.PrescriptionItemApi.findByPrescriptionId(id
            ).then(function (res) {
                var result = res.resultData;
                if (result) {
                    result = result.filter(function (e) {
                        return e.invoiceItemType == 'IN_GROUP_ITEM' && e.supperId == groupId;
                    });
                    result.map((item, index) => {
                        if (indexRow != null) {
                            if (indexRow === index) {
                                item.isShowEdit = true;
                            }
                        } else {
                            item.isShowEdit = false;
                        }
                    })
                    setStateInRequest(result);
                    this_.handleSum();
                } else {
                    toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                    + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
            });

        } else {
            let setStateInRequest = (list) => { this.setState({ listPrescriptionItem: list, columnNameClicked: "drugName" }) }
            return agent.PrescriptionItemApi.findByPrescriptionId(id
            ).then(function (res) {
                var result = res.resultData;
                if (result) {
                    result = result.filter(function (e) {
                        return e.invoiceItemType == 'IN_GROUP_ITEM' && e.supperId == groupId;
                    });
                    result.map((item, index) => {
                        if (indexRow != null) {
                            if (indexRow + 1 === index && dowRow) {
                                item.isShowEdit = true;
                            }
                        } else {
                            item.isShowEdit = false;
                        }
                    })
                    setStateInRequest(result);
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
    // handleSuccessDrugGroup() {
    //     this.getListPrescriptionItemByPrescriptionId();
    //     this.setState({
    //         idPrescriptionItemSupper: null
    //     })
    // }

    handleDoneGroup() {
        this.props.handleDoneDrugGroupOfInvoice();
        this.setState({listPrescriptionItem: []});
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
        // this.handleAddModalRow();

    }
    // componentDidUpdate() {
    //     ScriptUtils.loadFootable();
    // }


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
        window.location.href = "/listInvoice";
    }

    render() {
        const dataPrescriptionItemList = this.state.listPrescriptionItem;
        var status = this.state.status;
        var buttonHandleDoneGroup = (this.props.groupId ? <button type="button" className="btn btn-info" onClick={this.handleDoneGroup}>Hoàn Tất Liều Thuốc</button> : null)
        var buttonAddDrug = (this.props.groupId ? <button type="button" className="btn bg-teal" onClick={this.handleAddModalRow}>Thêm Thuốc Liều</button> : null)
        var prescriptionItemRows = [];
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
                            price = price + (itemChild.totalAmount * itemChild.drug.salePrice);
                        }
                    })
                }
                if (!parent_item.isShowEdit && parent_item.invoiceItemType == "IN_GROUP_ITEM") {
                    var elsementActive = parent_item.drug.hasPrescription ? "red" : "";
                    return (<tr key={"prescriptionItemId" + parent_item.id} style={{ color: elsementActive }} >
                        <td>{presciptionCurrentNo}</td>
                        <td style={{ textAlign: "center" }}>{(parent_item.drug.barCode)}</td>
                        <td style={{ textAlign: "center" }} onClick={() => { this.reloadEditable(parent_item, "drugName") }}>{(parent_item.drug.name)}</td>
                        <td style={{ textAlign: "center" }} onClick={() => { this.reloadEditable(parent_item, "drugUom") }}>{(parent_item.drug.uom)}</td>
                        <td style={{ textAlign: "center" }} onClick={() => { this.reloadEditable(parent_item, "totalAmount") }}>{FormatterUtils.formatCurrency(parent_item.totalAmount) }</td>
                        <td style={{ textAlign: "center" }} onClick={() => { this.reloadEditable(parent_item, "totalAmount") }}>{FormatterUtils.formatCurrency(parent_item.totalAmount * parent_item.drug.salePrice)}</td>
                        <td> {status === "SUCCESS" ? "" :
                            <div>
                                <ul className="icons-list" style={{ float: "right" }}>
                                    <li className="dropdown">
                                        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                            <i className="icon-menu9"></i>
                                        </a>
                                        <ul className="dropdown-menu dropdown-menu-right" style={{ minWidth: "100%", padding: "0", boxShadow: "none" }}>

                                            <li> <button style={{ margin: "auto", boxShadow: "none" }} className="btn btn-default" onClick={() => this.deletePrescriptionItem(parent_item.id)}>Xoá</button></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        }</td>
                    </tr>
                    )
                }
                else {
                    return <RowEditDrugRetailBarCode columnNameClicked={columnNameClicked}
                        key={"RowsEditDrugGroup_" + parent_item.id}
                        isShowEdit={parent_item.isShowEdit}
                        item={parent_item}
                        eventNewRow={index + 1 === lengthList ? true : false}
                        handleNewDrug={(indexRow, eventNewRow, dowRow, idPrescriptionItemSupper, forcusToTotalAmount) => this.handleNewDrug(indexRow, eventNewRow, dowRow, idPrescriptionItemSupper, forcusToTotalAmount)}
                        indexRow={index}
                        prescriptionId={this.props.prescriptionId}
                        handleGetListPrescriptionItemByPrescriptionId={this.getListPrescriptionItemByPrescriptionId}
                        barCodeGroup={this.state.barCodeGroup}
                        idPrescriptionItemSupper={this.props.groupId}
                        invoiceItemType="IN_GROUP_ITEM"
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
                    {buttonHandleDoneGroup}
                </div>
            </div>
        </div>

    }
}


export default translate('translations')(TabDrugGroup);