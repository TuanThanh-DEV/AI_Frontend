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
import RowEditDrugByOutputForm from './RowEditDrugByOutputForm';
import { RenderInputWithDiv, RenderInputWithGen, RenderTextArea, RenderDatePicker, RenderCheckbox, RenderSelect, RenderNumberInput, RenderMoneyFormat } from '../../components/formInputs';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import ModalOutputFormChooseDrugStore from './ModalOutputFormChooseDrugStore';
import { PermanentCacheService } from '../../services/middleware';



class TabDrugByOutputForm extends React.Component {
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
            listOutputStock : [], 
            isShowModalOutputForm : false

        }
        this.handleAddModalRow = this.handleAddModalRow.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.handleNewRow = this.handleNewRow.bind(this);
        this.handleOutputStock = this.handleOutputStock.bind(this);
        this.handleShowModalDrug = this.handleShowModalDrug.bind(this);
        this.getListOutputStockByOutputForm = this.getListOutputStockByOutputForm.bind(this);
        this.handleShowModalOutputForm = this.handleShowModalOutputForm.bind(this);
        this.handleCanelOutputStockByOutputFormId = this.handleCanelOutputStockByOutputFormId.bind(this);
        this.checkOutputForm = this.checkOutputForm.bind(this);
        this.handleHidemodal = (result) => {
            // var this_=this;   
            var dataOutputStock = this.state.listOutputStock;
            dataOutputStock.map(item => {
                item.isShowEdit = false;
                item.newRow = false;
                if (!item.id) {
                    dataOutputStock.splice(-1, 1);
                }
            })
            this.setState({
                isPrescriptionModalShown: false,
                isShowModalPrescriptionItemOld: false,
                isPaymentModalShown: false,
                isShowModalDrug : false,
                isShowModalOutputForm: false
            });
            if (result === "success") {
                this.setState({
                    status: "SUCCESS"
                })
                // this.handleSavePDF(this.getDataExport(dataOutputStock))
            }

        };

        this.reloadEditable = (selectedItem, columnName) => {
            var status = this.state.status;
            if (!(status === "SUCCESS")) {
                var dataPrescriptionItem = this.state.listOutputStock;
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

    handleSavePDF(dataExport) {
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        pdfMake.createPdf(dataExport).print();
    }
    getDataExport(dataOutputStock) {
        var totalInvoicePrice= 0;
        var itemRows = dataOutputStock.map(item => {
            if (item.drug.hasGroup && item.supperId == null) {
                var pricePrint = 0;
                dataOutputStock.map(itemChild => {
                    if (item.id && item.id === itemChild.supperId) {
                        pricePrint = pricePrint + (itemChild.outputAmount * itemChild.drug.importPrice);
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
                totalInvoicePrice += (item.drug.salePrice * item.outputAmount);
                return [
                    [item.drug.name + " " + item.drug.hamLuongBHYT],
                    [item.outputAmount],
                    [{ text: FormatterUtils.formatCurrency(item.drug.salePrice * item.outputAmount), alignment: 'right' }],
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

    getListOutputStockByOutputForm(indexRow,eventNewRow, dowRow){
        const {outputForm} = this.props
        var this_=this;
        if(eventNewRow){
            let setStateInRequest = (list) => { this.setState({ listOutputStock: list }) }
            return agent.asyncRequests.get("/outputStock/findByOutputFormId?outputFormId=" + outputForm.id
                ).then(function (res) {
                    var result = res.body.resultData;
                    if (result) {
                        result.map(item => {
                            item.isShowEdit = false;
                        })
                        setStateInRequest(result);
                        this_.handleAddModalRow();
                        this_.handleSum();

                    } else {
                        toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                    }
                }, function (err) {
                    toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                    +" Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
                });
        } else if(!eventNewRow){
            let setStateInRequest = (list) => { this.setState({ listOutputStock: list , columnNameClicked: "outAmount" }) }
            return agent.asyncRequests.get("/outputStock/findByOutputFormId?outputFormId=" + outputForm.id
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
                    + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
            });
        }else{
            let setStateInRequest = (list) => { this.setState({ listOutputStock: list }) }
            return agent.asyncRequests.get("/outputStock/findByOutputFormId?outputFormId=" + outputForm.id
                ).then(function (res) {
                    var result = res.body.resultData;
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
                    setStateInRequest(result);
                    this_.handleSum("add");
                } else {
                    toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                    + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
            });
        }
    }

    handleAddModalRow() {
       
        let listOutputStock = this.state.listOutputStock;
        listOutputStock.map(item => {
            item.isShowEdit = false;
            item.newRow = false;
            if (!item.id) {
                listOutputStock.splice(-1, 1);
            }
        })
        listOutputStock.push(
            {
                isShowEdit: true,
                outputFormId: this.props.outputForm.id
,
            }
        );
        this.setState({
            listOutputStock: listOutputStock,
            columnNameClicked: "barCode",
        })

    };

    handleHideAndClear() {
        const { destroy, backToList, onHide } = this.props;
        onHide();
        destroy();
        backToList()
    }

    checkOutputForm(){
        var this_ = this;
        const {outputForm} = this.props;
        return agent.asyncRequests.get("/outputForm/getId?id="+outputForm.id
            ).then(function (res) {
                var result = res.body.resultData;
                if (result) {
                    if(result.status == "OPEN"){
                        this_.getListOutputStockByOutputForm(null, null, null, true);
                        // this_.handleAddModalRow();
                    }else if(result.status == "DONE"){
                        this_.getListOutputStockByOutputForm();

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
        this.checkOutputForm();
        this.handleAddModalRow();

    }

    handleSum(status) {
        var listOutputStock = this.state.listOutputStock;
        var totalPriceDug = 0;
        listOutputStock.map(item => {
            if (!item.isShowEdit && item.id) {
                totalPriceDug = totalPriceDug + (item.outAmount * item.salePrice);
            }
        })
        this.props.handleShowPrice({ totalPriceDug }, "add");
    }
    handleNewRow(indexRow,eventNewRow, dowRow) {
        this.getListOutputStockByOutputForm(indexRow,eventNewRow, dowRow);
        this.setState({
            currentShowItem: null,
            columnNameClicked: null
        })
    }
   

    deleteOutputStock(id) {
        var this_ = this;
        var url = `/outputStock/${id}`;
        return agent.asyncRequests.del(url
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && !result.error) {
                // alert("Xoá Thành Công !");
                this_.getListOutputStockByOutputForm();
            } else {
                toast.error("Có lỗi khi xóa dữ liệu. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Không thể xóa dữ liệu đang được sử dụng từ màn hình khác! ", { autoClose: 15000 });
        });
    }
    handleShowModalPayment(invoiceDto) {
       
    }
    handleShowModalOutputForm(id) {
        this.setState({
            isShowModalOutputForm: true,
            idOutputForm : id 
        });
    }

    handleCanelOutputStockByOutputFormId() {
        const {outputForm} = this.props;

        if (confirm("Xác Nhận Huỷ Đơn!")) {
            var url = '/outputForm/cancelOutputStock?outputFormId=';
            return agent.asyncRequests.get(url + (outputForm.id)
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

    handleOutputStock() {
        const { currentUser } = this.props;
        if (confirm("Xác Nhận Xuất Kho!")) {
            var this_ = this;
            var url = '/outputForm/finishOutputStock?outputFormId=';
            const {outputForm} = this.props;
            //    var dataOutputStock = this.state.listOutputStock;
            return agent.asyncRequests.get(url + (outputForm.id)+ "&validateduserId=" + currentUser.id
            ).then(function (res) {
                var result = res.body.resultData;
                if (result== "success") {
                    toast.success("Xuất kho thành công!", { autoClose: 4000, position: toast.POSITION.TOP_RIGHT });
                    this_.handleHidemodal(result);
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
    render() {
        const dataOutputStock = this.state.listOutputStock;
        const currentUser = this.state.currentUser;
        const {outputForm} = this.props;
        var status = this.state.status;
        var buttonHandleCreate = (status === "SUCCESS" ? <button type="button" className="btn bg-teal" onClick={this.handleShowModalOutputForm}>Tạo Đơn Mới</button> : null)
        var buttonHandleMoveStock = (status === "SUCCESS" && outputForm.outputFormType == null && outputForm.toDrugStoreId == null ? <button type="button" className="btn bg-warning" onClick= { () => this.handleShowModalOutputForm(outputForm.id)}>Xuất Kho Đến</button> : null)
        // var buttonHandlePrintPDF = (status === "SUCCESS" ? <button type="button" className="btn bg-info" onClick={() => this.handleSavePDF(this.getDataExport(dataOutputStock))}>In Đơn Thuốc</button> : null)
        var buttonHandleCancel = (status === "TODO" ? <button type="button" className="btn btn-warning" onClick={this.handleCanelOutputStockByOutputFormId}>Huỷ Đơn</button> : null)
        var buttonAddDrugRow = (status === "TODO" ? <button type="button" className="btn bg-teal" onClick={this.handleAddModalRow}>Thêm Hàng Xuất</button> : null)
        // var buttonAddNewDrug = (status === "TODO" ? <button type="button" className="btn bg-teal" onClick={this.handleShowModalDrug}>Thêm Thuốc</button> : null)
        var buttonOutputStock = SecurityUtils.hasPermission(currentUser, "admin.stock.validate") ? (status === "TODO" ? <button type="button" className="btn bg-teal" onClick={this.handleOutputStock}>Xuất Kho</button> : null): null;
        var outputFormRows = [];
        if (dataOutputStock) {
            var lengthList = dataOutputStock.length;
            let columnNameClicked = this.state.columnNameClicked;
            var itemNo = 0;
            outputFormRows = dataOutputStock.map((item, index) => {
                itemNo++;
                 if (!item.isShowEdit && item.id != null) {
                    return (<tr key={"outputForm" + item.id} >
                        <td>{itemNo}</td>
                        <td style={{ textAlign: "center" }} onClick={() => { this.reloadEditable(item, "barCode") }}>{item.batchBarcode}</td>
                        <td style={{ textAlign: "center" }} onClick={() => { this.reloadEditable(item, "drugName") }}>{item.drug.name + " " + item.drug.hamLuongBHYT}</td>
                        <td style={{ textAlign: "center" }} onClick={() => { this.reloadEditable(item, "producedDate") }}>{moment(item.producedDate).format("DD/MM/YYYY")}</td>
                        <td style={{ textAlign: "center" }} onClick={() => { this.reloadEditable(item, "outputDate") }}>{moment(item.outputDate).format("DD/MM/YYYY")}</td>
                        <td style={{ textAlign: "center" }} onClick={() => { this.reloadEditable(item, "expiredDate") }}>{moment(item.expiredDate).format("DD/MM/YYYY")}</td>
                        <td style={{ textAlign: "center" }} onClick={() => { this.reloadEditable(item, "importPrice") }}>{FormatterUtils.formatCurrency(item.importPrice) }</td>
                        <td style={{ textAlign: "center" }} onClick={() => { this.reloadEditable(item, "salePrice") }}>{FormatterUtils.formatCurrency(item.salePrice)}</td>
                        <td style={{ textAlign: "center" }} onClick={() => { this.reloadEditable(item, "outAmount") }}>{FormatterUtils.formatCurrency(item.outAmount)}</td>
                        <td> {status === "SUCCESS" ? "" :
                            <div>
                                <ul className="icons-list" style={{ float: "right" }}>
                                    <li className="dropdown">
                                        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                            <i className="icon-menu9"></i>
                                        </a>
                                        <ul className="dropdown-menu dropdown-menu-right" style={{ minWidth: "100%", padding: "0", boxShadow: "none" }}>

                                            <li> <button style={{ margin: "auto", boxShadow: "none" }} className="btn btn-default" onClick={() => this.deleteOutputStock(item.id)}>Xoá</button></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        }</td>
                    </tr>
                    )
                }
                else {
                    return <RowEditDrugByOutputForm columnNameClicked={columnNameClicked}
                        key={"RowsEdit_" + item.id}
                        isShowEdit={item.isShowEdit}
                        item={item}
                        eventNewRow={index + 1 === lengthList ? true : false}
                        handleNewRow={(indexRow, eventNewRow, dowRow) => this.handleNewRow(indexRow, eventNewRow, dowRow)}
                        indexRow={index}
                        outputForm={this.props.outputForm}
                        getListOutputStockByOutputForm = {this.getListOutputStockByOutputForm}
                    ></RowEditDrugByOutputForm>
                }
            })
        }

        return <div className="tab-pane active" id="default-justified-tab1">
            <table className="table table-xxs table-bordered">
                <thead>
                    <tr className="bg-teal" >
                        <th rowSpan="2" width="5%" style={{ textAlign: "center", width: '5%' }}><i className="icon-menu-open2"></i></th>
                        <th rowSpan="2" style={{ textAlign: "center", width: '15%' }}>Mã Thuốc</th>
                        <th rowSpan="2" style={{ textAlign: "center", width: '15%' }}>Tên Thuốc</th>
                        <th rowSpan="2" style={{ textAlign: "center", width: '10%' }}>Ngày SX</th>
                        <th rowSpan="2" style={{ textAlign: "center", width: '10%' }}>Ngày Nhập</th>
                        <th rowSpan="2" style={{ textAlign: "center", width: '10%' }}>Ngày Hết Hạn</th>
                        <th rowSpan="2" style={{ textAlign: "center", width: '10%' }}>Giá Nhập</th>
                        <th rowSpan="2" style={{ textAlign: "center", width: '10%' }}>Giá Bán</th>
                        <th rowSpan="2" style={{ textAlign: "center", width: '10%' }}>Số Lượng</th>
                        <th rowSpan="2" width="5%" style={{ textAlign: "center", width: '5%' }}><i className="icon-menu-open2"></i></th>
                    </tr>
                </thead>
                <tbody>
                    {outputFormRows}

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
                    outputFormId={this.props.outputFormId}
                    title="Thanh Toán Hóa Đơn"
                    show={this.state.isShowModalDrug}
                    onHide={this.handleHidemodal}
                    idPatient={this.state.idPatient} /> : null
                }
                {this.state.isShowModalOutputForm ? <ModalOutputFormChooseDrugStore
                    title="Phiếu Xuất Kho" 
                    show={this.state.isShowModalOutputForm} 
                    idOutputForm={this.props.outputForm.id}
                    onHide={this.handleHidemodal} 
                    /> : null
                }
            </table>
            <div className="panel-body">
                <div className="heading-elements">
                    {buttonOutputStock}
                    {buttonAddDrugRow}
                    {/* {buttonAddNewDrug} */}
                    {buttonHandleCreate}
                    {/* {buttonHandlePrintPDF} */}
                    {buttonHandleCancel}
                    {buttonHandleMoveStock}
                </div>
            </div>
        </div>

    }
}


export default translate('translations')(TabDrugByOutputForm);