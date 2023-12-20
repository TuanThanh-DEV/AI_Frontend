import React from 'react';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import agent from '../../services/agent';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import pdfMake from 'pdfmake/build/pdfmake';
import moment from 'moment';
import { FormatterUtils, SecurityUtils } from '../../utils/javascriptUtils';
import ModalPayment from '../Payment/ModalPayment';
import ModalDrug from '../Drug/ModalDrug';
import RowEditDrugByInputForm from './RowEditDrugByInputForm';
import ModalInputFormChooseDrugStore from './ModalInputFormChooseDrugStore';
import { PermanentCacheService } from '../../services/middleware';

class TabDrugByInputForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPrescriptionModalShown: false,
            columnNameClicked: null,
            currentShowItem: false,
            isPaymentModalShown: false,
            idPayment: null,
            invoiceDto: null,
            status: "TODO",
            isShowModalDrug : false,
            listInputStock : [],
            isShowModalInputForm : false

        }
        this.handleAddModalRow = this.handleAddModalRow.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.handleNewRow = this.handleNewRow.bind(this);
        this.handleInputStock = this.handleInputStock.bind(this);
        this.handleShowModalDrug = this.handleShowModalDrug.bind(this);
        this.getListInputStockByINputForm = this.getListInputStockByINputForm.bind(this);
        this.handleHidemodal = (result) => {
            // var this_=this;   
            var dataInputStock = this.state.listInputStock;
            dataInputStock.map(item => {
                item.isShowEdit = false;
                item.newRow = false;
                if (!item.id) {
                    dataInputStock.splice(-1, 1);
                }
            })
            this.setState({
                isPrescriptionModalShown: false,
                isShowModalPrescriptionItemOld: false,
                isPaymentModalShown: false,
                isShowModalDrug : false,
                isShowModalInputForm : false
            });
            if (result === "success") {
                this.setState({
                    status: "SUCCESS"
                })
                // this.handleSavePDF(this.getDataExport(dataInputStock))
            }

        };

        this.handleHidemodalDrug = () => {
            this.setState({
                isShowModalDrug : false,
            });
        }

        this.reloadEditable = (selectedItem, columnName) => {
            var status = this.state.status;
            if (!(status === "SUCCESS")) {
                var dataPrescriptionItem = this.state.listInputStock;
               
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
        this.handleShowModalInputForm = this.handleShowModalInputForm.bind(this)
        this.handleCanelInputStockByInputFormId = this.handleCanelInputStockByInputFormId.bind(this)
        this.checkInputForm = this.checkInputForm.bind(this)
    };

    handleSavePDF(dataExport) {
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        pdfMake.createPdf(dataExport).print();
    }
    getDataExport(dataInputStock) {
        var totalInvoicePrice= 0;
        var itemRows = dataInputStock.map(item => {
            if (item.drug.hasGroup && item.supperId == null) {
                var pricePrint = 0;
                dataInputStock.map(itemChild => {
                    if (item.id && item.id === itemChild.supperId) {
                        pricePrint = pricePrint + (itemChild.inputAmount * itemChild.drug.salePrice);
                    }
                    
                })
                totalInvoicePrice += pricePrint;
                return [
                    [item.drug.name  + " " + item.drug.hamLuongBHYT],
                    [{ text: "" }],
                    [{ text: FormatterUtils.formatCurrency(pricePrint), alignment: 'right' }],
                ]
            } else if (!item.drug.hasGroup && item.supperId != null) {
                return [
                    [{ text: "" }],
                    [{ text: "" }],
                    [{ text: "" }]
                ];
            } else {
                //drug
                totalInvoicePrice += (item.drug.salePrice * item.inputAmount);
                return [
                    [item.drug.name + " " + item.drug.hamLuongBHYT],
                    [item.inputAmount],
                    [{ text: FormatterUtils.formatCurrency(item.drug.salePrice * item.inputAmount), alignment: 'right' }],
                ]
            }

        });
        var today = moment(new Date, "DD/MM/YYYY");
        const { currentUser } = this.props;
        var tableItems = {
            style: 'tableExample',
            table: {
                widths: [150, 50, 50],
                body: itemRows
            },
            layout: 'noBorders'
        },
            dataExport =
            {


                content: [


                    {
                        columns:
                            [
                                {
                                    width: 300,
                                    fontSize: 20,
                                    alignment: 'center',
                                    text: 'TIMEC \n\n'
                                }
                            ]
                    },

                    {
                        fontSize: 14,
                        text: 'Kính chào quý khách : khách hàng \n\n'
                    },
                    {
                        fontSize: 14,
                        text: '* * * * * * * * * * * * * * * * * * * * * * * * * * * * \n\n'

                    },
                    {
                       
                         text: ['Thu ngân: ' + (currentUser ? currentUser.fullName : "") + '\n']

                    },
                 
                    {
                        columns:
                            [
                                {
                                    // fontSize: 12,
                                    width: 300,
                                    alignment: 'left',
                                    text: ['Địa chỉ: Võ Trần Chí, P. Tân Tạo A,\nQ. Bình Tân,TP.HCM \n']
                                }
                            ]
                    },
                    {
                        style: 'tableExample',
                        table: {
                            widths: [150, 100],
                            fontSize: 10,
                            body: [
                                [['Ngày: ' + today.date() + '/' + today.month() + '/' + today.year()], [{ text: 'Giờ: ' + today.hour() + ':' + today.minutes()+'\n\n', alignment: 'right'}]],
                            ]
                        },
                        layout: 'noBorders'
                    },

                    {
                        fontSize: 14,
                        text: '* * * * * * * * * * * * * * * * * * * * * * * * * * * * \n\n'

                    },
                    {
                        style: 'tableExample',
                        table: {
                            widths: [150, 50, 50],
                            body: [
                                ['Tên', 'SL', { text: 'TT', alignment: 'right' }],

                            ]
                        },
                        layout: 'noBorders'
                    },
                    tableItems,
                    {
                        fontSize: 14,
                        text: '\n- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  \n'

                    },
                    {
                        style: 'tableExample',
                        table: {
                            widths: [150, 100],
                            body: [
                                ['Tổng',{ text: FormatterUtils.formatCurrency(totalInvoicePrice) +'' , alignment: 'right' }],

                            ]
                        },
                        layout: 'noBorders'
                    },
                    {
                        fontSize: 14,
                        text: '- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  \n'

                    },
                    {
                        style: 'tableExample',
                        table: {
                            widths: [200, 100],
                            body: [
                                ['Tiền mặt',{ text: '' + '\n\n' , alignment: 'right' }],
                                ['Trả lại (Tiền mặt)',{ text: '' + '\n' , alignment: 'right' }],
                                ['Điểm tích luỹ trong giao dịch',{ text: '' + '\n' , alignment: 'right' }],
                                ['Điểm sử dụng trong giao dịch',{ text: '' + '\n\n' , alignment: 'right' }],
                            ]
                        },
                        layout: 'noBorders'
                    },
                    {
                        columns:
                            [
                                {
                                    fontSize: 10,
                                    width: 250,
                                    alignment: 'center',
                                    text: '\tCảm ơn quý khách đã sử dụng dịch vụ TIMEC'
                                }
                            ]
                    },

                ]
            }
        return dataExport;


    }

    getListInputStockByINputForm(indexRow,eventNewRow, dowRow, defalut){
        const {inputFormId} = this.props
        var this_=this;
        if(eventNewRow){
            let setStateInRequest = (list) => { this.setState({ listInputStock: list }) }
            return agent.asyncRequests.get("/inputStock/findByInputFormId?inputFormId=" + inputFormId
                ).then(function (res) {
                    var result = res.body.resultData;
                    if (result) {
                        result.map(item => {
                            item.isShowEdit = false;
                        })
                        setStateInRequest(result);
                        if(dowRow){
                            this_.handleAddModalRow();
                        }
                        this_.handleSum();

                    } else {
                        toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                    }
                }, function (err) {
                    toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                    +" Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
                });
        }else if(defalut){
            let setStateInRequest = (list) => { this.setState({ listInputStock: list }) }
            return agent.asyncRequests.get("/inputStock/findByInputFormId?inputFormId=" + inputFormId
            ).then(function (res) {
                var result = res.body.resultData;
                if (result) {
                    result.map(item => {
                        item.isShowEdit = false;
                    })
                    setStateInRequest(result);
                    // this_.handleAddModalRow();
                    this_.handleSum();

                } else {
                    toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                +" Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
            });
        }else{
            let setStateInRequest = (list) => { this.setState({ listInputStock: list }) }
            return agent.asyncRequests.get("/inputStock/findByInputFormId?inputFormId=" + inputFormId
                ).then(function (res) {
                    var result = res.body.resultData;
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
                        setStateInRequest(result);
                        this_.handleSum("add");
                    } else {
                        toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                    }
                }, function (err) {
                    toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                    +" Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
                });
            }
    }

    handleAddModalRow() {

        let listInputStock = this.state.listInputStock;
        listInputStock.map(item => {
            item.isShowEdit = false;
            item.newRow = false;
            if (!item.id) {
                listInputStock.splice(-1, 1);
            }
        })
        listInputStock.push(
            {
                isShowEdit: true,
                inputFormId: this.props.inputFormId,
            }
        );
        this.setState({
            listInputStock: listInputStock,
            columnNameClicked: "batchBarcode",
        })

    };

    handleHideAndClear() {
        const { destroy, backToList, onHide } = this.props;
        onHide();
        destroy();
        backToList()
    }

    checkInputForm(){
        var this_ = this;
        let id = this.props.inputFormId;
        return agent.asyncRequests.get("/inputForm/getId?id="+id
            ).then(function (res) {
                var result = res.body.resultData;
                if (result) {
                    if(result.status == "OPEN"){
                        this_.getListInputStockByINputForm(null, null, null, true);
                        // this_.handleAddModalRow();
                    }else if(result.status == "DONE"){
                        this_.getListInputStockByINputForm();

                        this_.setState({
                            status: "SUCCESS"
                        })
                    }
                } else {
                    toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                +" Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
            });

    }
    componentWillMount() {
        this.setState({currentUser: PermanentCacheService.getItem("currentUser")});
        this.checkInputForm();
        // this.handleAddModalRow();
    }

    handleSum(status) {
        var listInputStock = this.state.listInputStock;
        var totalPriceDug = 0;
        listInputStock.map(item => {
            if (!item.isShowEdit && item.id) {
                totalPriceDug = totalPriceDug + (item.inputAmount * item.importPrice);
            }
        })
        this.props.handleShowPrice({ totalPriceDug }, "add");
    }
    handleNewRow(indexRow,eventNewRow, dowRow) {
        this.getListInputStockByINputForm(indexRow,eventNewRow, dowRow);
        this.setState({
            currentShowItem: null,
            columnNameClicked: null
        })
    }
   

    deleteInputStock(id) {
        var this_ = this;
        var url = `/inputStock/${id}`;
        return agent.asyncRequests.del(url
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && !result.error) {
                // alert("Xoá Thành Công !");
                this_.getListInputStockByINputForm();
            } else {
                toast.error("Có lỗi khi xóa dữ liệu. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Không thể xóa dữ liệu đang được sử dụng từ màn hình khác! ", { autoClose: 15000 });
        });
    }
    handleShowModalPayment(invoiceDto) {
        // if (invoiceDto.status == 'OPEN') {
        //     this.setState({
        //         isPaymentModalShown: true,
        //         invoiceDto: invoiceDto,
        //         idPayment: null
        //     });
        // } else {
        //     toast.error("Hóa Đơn Này Đã Thanh Toán Rồi!", {
        //         autoClose: 5000
        //     });
        // }
    }
    handleCanelInputStockByInputFormId() {
        var inputFormId = this.props.inputFormId;
        if (confirm("Xác Nhận Huỷ Đơn!")) {
            var this_ = this;
            var url = '/inputForm/cancelInputStock?inputFormId=';
            return agent.asyncRequests.get(url + inputFormId
            ).then(function (res) {
                var result = res.body.resultData;
                if (result== "success") {
                    toast.success("Huỷ thành công!", { autoClose: 4000, position: toast.POSITION.TOP_RIGHT });
                    window.location.href = "/listStock";
                } else  if (result.errorMessage){
                    toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 4000, position: toast.POSITION.TOP_RIGHT });
                }
            }, function (err) {
                toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                    + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
            });
        }else{

        }
    }

    handleShowModalDrug(){
        this.setState({
            isShowModalDrug : true
        })
    }
    handleShowModalInputForm(){
        this.setState({
            isShowModalInputForm : true,
        });
    }

    handleInputStock() {
        const currentUser = this.state.currentUser;

        if (confirm("Xác Nhận Nhập Kho")) {
            var this_ = this;
            var url = '/inputForm/finishAndAddStock?inputFormId=';
            var inputFormId = this.props.inputFormId;
            //    var dataInputStock = this.state.listInputStock;
            return agent.asyncRequests.get(url + inputFormId + "&validateduserId=" + currentUser.id
            ).then(function (res) {
                var result = res.body.resultData;
                if (result== "success") {
                    toast.success("Nhập kho thành công!", { autoClose: 4000, position: toast.POSITION.TOP_RIGHT });
                    // this_.handleHidemodal(result);
                    window.location.reload(true);
                } else  if (res.body.errorMessage){
                    toast.error("Lỗi: " + res.body.errorMessage, { autoClose: 10000, position: toast.POSITION.TOP_RIGHT });
                }
            }, function (err) {
                toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                    + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
            });
        }else{

        }
    }
    render() {
        const dataInputStock = this.state.listInputStock;
        const currentUser = this.state.currentUser;
    
        var status = this.state.status;
        var buttonHandleCreate = (status === "SUCCESS" ? <button type="button" className="btn bg-teal" onClick={this.handleShowModalInputForm}>Tạo Đơn Mới</button> : null)
        var buttonHandleCancel = (status === "TODO" ? <button type="button" className="btn btn-warning" onClick={this.handleCanelInputStockByInputFormId}>Huỷ Đơn</button> : null)
        var buttonAddDrugRow = (status === "TODO" ? <button type="button" className="btn bg-teal" onClick={this.handleAddModalRow}>Thêm Hàng Nhập</button> : null)
        var buttonAddNewDrug = (status === "TODO" ? <button type="button" className="btn bg-teal" onClick={this.handleShowModalDrug}>Thêm Thuốc</button> : null)
        var buttonInputStock = SecurityUtils.hasPermission(currentUser, "admin.stock.validate") ? (status === "TODO" ? <button type="button" className="btn bg-teal" onClick={this.handleInputStock}>Nhập Kho</button> : null): null;
        var inputFormRows = [];
        var numberEditRow  = 0;
        if (dataInputStock) {
            var lengthList = dataInputStock.length;
            let columnNameClicked = this.state.columnNameClicked;
            var itemNo = 0;
            inputFormRows = dataInputStock.map((item, index) => {
                itemNo++;
                 if (!item.isShowEdit && item.id != null && item.inputAmount >0) {
                    return (<tr key={"inputForm" + item.id} >
                        <td>{itemNo}</td>
                        <td style={{ textAlign: "center" }} onClick={() => { this.reloadEditable(item, "batchBarcode") }}>{(item.batchBarcode)}</td>
                        <td style={{ textAlign: "center" }} onClick={() => { this.reloadEditable(item, "drugName") }}>{item.drug.name  + " " + item.drug.hamLuongBHYT + " (" + item.drug.uom + ")"}</td>
                        <td style={{ textAlign: "center" }} onClick={() => { this.reloadEditable(item, "producedCode") }}>{item.producedCode}</td>
                        <td style={{ textAlign: "center" }} onClick={() => { this.reloadEditable(item, "inputDate") }}>{moment(item.inputDate).format("DD/MM/YYYY")}</td>
                        <td style={{ textAlign: "center" }} onClick={() => { this.reloadEditable(item, "salePrice") }}>{FormatterUtils.formatCurrency(item.salePrice)}</td>
                        <td style={{ textAlign: "center" }} onClick={() => { this.reloadEditable(item, "importPrice") }}>{FormatterUtils.formatCurrency(item.importPrice) }</td>
                        <td style={{ textAlign: "center" }} onClick={() => { this.reloadEditable(item, "producedDate") }}>{moment(item.producedDate).format("DD/MM/YYYY")}</td>
                        <td style={{ textAlign: "center" }} onClick={() => { this.reloadEditable(item, "expiredDate") }}>{moment(item.expiredDate).format("DD/MM/YYYY")}</td>
                        <td style={{ textAlign: "center" }} onClick={() => { this.reloadEditable(item, "inputAmount") }}>{FormatterUtils.formatCurrency(item.inputAmount)}</td>
                        <td> {status === "SUCCESS" ? "" :
                            <div>
                                <ul className="icons-list" style={{ float: "right" }}>
                                    <li className="dropdown">
                                        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                            <i className="icon-menu9"></i>
                                        </a>
                                        <ul className="dropdown-menu dropdown-menu-right" style={{ minWidth: "100%", padding: "0", boxShadow: "none" }}>
                                            <li> <button style={{ margin: "auto", boxShadow: "none" }} className="btn btn-default" onClick={() => this.deleteInputStock(item.id)}>Xoá</button></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        }</td>
                    </tr>
                    )
                }else {
                    if (item.inputAmount == 0 && numberEditRow == 0){
                    numberEditRow ++;

                        return <RowEditDrugByInputForm columnNameClicked={"importPrice"}
                            key={"RowsEdit_" + item.id}
                            isShowEdit={true}
                            item={item}
                            eventNewRow={index + 1 === lengthList ? true : false}
                            handleNewRow={(indexRow, eventNewRow, dowRow) => this.handleNewRow(indexRow, eventNewRow, dowRow)}
                            indexRow={index}
                            inputFormId={this.props.inputFormId}
                            drugStoreId = {this.props.drugStoreId}
                            getListInputStockByINputForm = {this.getListInputStockByINputForm}
                        ></RowEditDrugByInputForm>
                    }else if(numberEditRow == 0){
                    numberEditRow ++;

                        return <RowEditDrugByInputForm columnNameClicked={columnNameClicked}
                            key={"RowsEdit_" + item.id}
                            isShowEdit={item.isShowEdit}
                            item={item}
                            eventNewRow={index + 1 === lengthList ? true : false}
                            handleNewRow={(indexRow, eventNewRow, dowRow) => this.handleNewRow(indexRow, eventNewRow, dowRow)}
                            indexRow={index}
                            inputFormId={this.props.inputFormId}
                            drugStoreId = {this.props.drugStoreId}
                            getListInputStockByINputForm = {this.getListInputStockByINputForm}
                        ></RowEditDrugByInputForm>
                    }
                }
            })
        }

        return <div className="tab-pane active" id="default-justified-tab1">
            <table className="table table-xxs table-bordered">
                <thead>
                    <tr className="bg-teal" >
                        <th rowSpan="2" width="5%" style={{ textAlign: "center", width: '5%' }}><i className="icon-menu-open2"></i></th>
                        <th rowSpan="2" style={{ textAlign: "center", width: '12%' }}>Mã Lô</th>
                        <th rowSpan="2" style={{ textAlign: "center", width: '12%' }}>Tên Thuốc</th>
                        <th rowSpan="2" style={{ textAlign: "center", width: '12%' }}>Số Lô Thuốc</th>
                        <th rowSpan="2" style={{ textAlign: "center", width: '12%' }}>Ngày Nhập</th>
                        <th rowSpan="2" style={{ textAlign: "center", width: '10%' }}>Giá Bán</th>
                        <th rowSpan="2" style={{ textAlign: "center", width: '10%' }}>Giá Nhập</th>
                        <th rowSpan="2" style={{ textAlign: "center", width: '12%' }}>Ngày SX</th>
                        <th rowSpan="2" style={{ textAlign: "center", width: '12%' }}>Ngày Hết Hạn</th>
                        <th rowSpan="2" style={{ textAlign: "center", width: '10%' }}>Số Lượng</th>
                        <th rowSpan="2" width="5%" style={{ textAlign: "center", width: '5%' }}><i className="icon-menu-open2"></i></th>
                    </tr>
                </thead>
                <tbody>
                    {inputFormRows}
                </tbody>

                {this.state.isPaymentModalShown ? <ModalPayment
                    title="Thanh Toán Hóa Đơn"
                    invoiceDto={this.state.invoiceDto}
                    idPayment={this.state.idPayment}
                    show={this.state.isPaymentModalShown}
                    onHide={(success) => this.handleHidemodal(success)}
                    idPatient={this.state.idPatient} /> : null
                }
                {this.state.isShowModalDrug ? <ModalDrug
                    inputFormId={this.props.inputFormId}
                    title="Thông Tin Thuốc"
                    show={this.state.isShowModalDrug}
                    onHide={this.handleHidemodalDrug}
                    idPatient={this.state.idPatient} /> : null
                }
                {this.state.isShowModalInputForm ? <ModalInputFormChooseDrugStore
                                title="Phiếu Nhập Kho" 
                                show={this.state.isShowModalInputForm} 
                                onHide={this.handleHidemodal} /> : null
                            }
            </table>
            <div className="panel-body">
                <div className="heading-elements">
                    {buttonInputStock}
                    {buttonAddDrugRow}
                    {buttonAddNewDrug}
                    {buttonHandleCreate}
                    {/* {buttonHandlePrintPDF} */}
                    {buttonHandleCancel}
                </div>
            </div>
        </div>

    }
}


export default translate('translations')(TabDrugByInputForm);