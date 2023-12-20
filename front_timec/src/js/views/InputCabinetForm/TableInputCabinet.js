import React from 'react';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import agent from '../../services/agent';
import moment from 'moment';
import { FormatterUtils } from '../../utils/javascriptUtils';
import RowEditInputCabinet from './RowEditInputCabinet';

class TableInputCabinet extends React.Component {
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
           listInputCabinet : [],
            isShowModalInputForm : false

        }
        this.handleAddModalRow = this.handleAddModalRow.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.handleNewRow = this.handleNewRow.bind(this);
        this.getListInputCabinet = this.getListInputCabinet.bind(this);
        this.handleHidemodal = (result) => {
            // var this_=this;   
            var dataInputCabinet = this.state.listInputCabinet;
            dataInputCabinet.map(item => {
                item.isShowEdit = false;
                item.newRow = false;
                if (!item.id) {
                    dataInputCabinet.splice(-1, 1);
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

        this.reloadEditable = (selectedItem, columnName) => {
            var status = this.state.status;
            if (!(status === "SUCCESS")) {
                var dataInputCabinet = this.state.listInputCabinet;
               
                // Set false all item not selected
                dataInputCabinet.map(item => {
                    item.isShowEdit = false;
                    item.newRow = false;
                    if (!item.id) {
                        dataInputCabinet.splice(-1, 1);
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
        this.handleDeleteInputCabinetForm = this.handleDeleteInputCabinetForm.bind(this)
        this.checkInputForm = this.checkInputForm.bind(this)
    };

 
    getListInputCabinet(indexRow,newRow, defalut){
        const {inputCabinetFormId} = this.props
        var this_=this;
        if(newRow){
            let setStateInRequest = (list) => { this.setState({listInputCabinet: list }) }
            return agent.asyncRequests.get("/inputCabinet/getByFormId?formId=" + inputCabinetFormId
                ).then(function (res) {
                    var result = res.body.resultData;
                    if (result) {
                        result.map(item => {
                            item.isShowEdit = false;
                        })
                        setStateInRequest(result);
                        this_.handleAddModalRow();

                    } else {
                        toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                    }
                }, function (err) {
                    toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                    +" Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
                });
        }else if(defalut){
            let setStateInRequest = (list) => { this.setState({listInputCabinet: list }) }
            return agent.asyncRequests.get("/inputCabinet/getByFormId?formId=" + inputCabinetFormId
            ).then(function (res) {
                var result = res.body.resultData;
                if (result.length != 0) {
                    result.map(item => {
                        item.isShowEdit = false;
                    })
                    setStateInRequest(result);
                   
                } else {
                    this_.handleAddModalRow();
                }
            }, function (err) {
                toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                +" Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
            });
        }else{
            let setStateInRequest = (list) => { this.setState({listInputCabinet: list }) }
            return agent.asyncRequests.get("/inputCabinet/getByFormId?formId=" + inputCabinetFormId
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

        let listInputCabinet = this.state.listInputCabinet;
        listInputCabinet.map(item => {
            item.isShowEdit = false;
            item.newRow = false;
            if (!item.id) {
               listInputCabinet.splice(-1, 1);
            }
        })
       listInputCabinet.push(
            {
                isShowEdit: true,
                inputCabinetFormId: this.props.inputCabinetFormId,
            }
        );
        this.setState({
           listInputCabinet:listInputCabinet,
            columnNameClicked: "drugId",
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
        let id = this.props.inputCabinetFormId;
        return agent.asyncRequests.get("/inputCabinetForm/getById?id="+id
            ).then(function (res) {
                var result = res.body.resultData;
                if (result) {
                    if(result.status == "OPEN"){
                        this_.getListInputCabinet(null, null, true);
                        // this_.handleAddModalRow();
                    }else if(result.status == "DONE"){
                        this_.getListInputCabinet();
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
        this.checkInputForm();
        // this.handleAddModalRow();
    }

    handleNewRow(indexRow,newRow, dowRow) {
        this.getListInputCabinet(indexRow,newRow, dowRow);
        this.setState({
            currentShowItem: null,
            columnNameClicked: null
        })
    }
   

    deleteInputCabinet(id) {
        var this_ = this;
        var url = `/inputCabinet/${id}`;
        return agent.asyncRequests.del(url
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && !result.error) {
                // alert("Xoá Thành Công !");
                this_.getListInputCabinet();
            } else {
                toast.error("Có lỗi khi xóa dữ liệu. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Không thể xóa dữ liệu đang được sử dụng từ màn hình khác! ", { autoClose: 15000 });
        });
    }
    handleSubmitForm() {

        if (confirm("Đã Gửi Phiếu Lĩnh Dược. Về Trang Tủ Thuốc!")) {
            window.location.href = "/listDrugCabinet";
        }
    }

    handleDeleteInputCabinetForm() {
        var id = this.props.inputCabinetFormId;
        if (confirm("Xác Nhận Hủy Lệnh")) {
            var url = '/inputCabinetForm/'+id;
            return agent.asyncRequests.get(url
            ).then(function (res) {
                var result = res.body.resultData;
                if (result== "success") {
                    toast.success("Huỷ thành công!", { autoClose: 4000, position: toast.POSITION.TOP_RIGHT });
                    window.location.href = "/listDrugCabinet";
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

    handleShowModalInputForm(){
        this.setState({
            isShowModalInputForm : true,
        });
    }

    render() {
        const dataInputCabinet = this.state.listInputCabinet;
    
        var status = this.state.status;
        var buttonSumbitForm = (status === "TODO" ? <button type="button" className="btn bg-teal" onClick={this.handleSubmitForm}>Hoàn Thành</button> : null)
        var buttonAddDrugRow = (status === "TODO" ? <button type="button" className="btn bg-teal" onClick={this.handleAddModalRow}>Thêm Hàng Nhập</button> : null)
        var buttonHandleDelete = (status === "TODO" ? <button type="button" className="btn btn-warning" onClick={this.handleDeleteInputCabinetForm}>Huỷ Phiếu Lĩnh Dược</button> : null)
        var inputFormRows = [];
        if (dataInputCabinet) {
            var lengthList = dataInputCabinet.length;
            let columnNameClicked = this.state.columnNameClicked;
            var itemNo = 0;
            inputFormRows = dataInputCabinet.map((item, index) => {
                itemNo++;
                 if (!item.isShowEdit && item.id != null) {
                    return (<tr key={"inputCabinet" + item.id} >
                        <td>{itemNo}</td>
                        <td style={{ textAlign: "center" }} onClick={() => { this.reloadEditable(item, "drugName") }}>{item.drug.name + " " + item.drug.hamLuongBHYT + " (" + item.drug.uom + ") " +"/" +item.available }</td>
                        <td style={{ textAlign: "center" }} onClick={() => { this.reloadEditable(item, "inputAmount") }}>{(item.inputAmount)}</td>
                        <td> {status === "SUCCESS" ? "" :
                            <div>
                                <ul className="icons-list" style={{ float: "right" }}>
                                    <li className="dropdown">
                                        <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                            <i className="icon-menu9"></i>
                                        </a>
                                        <ul className="dropdown-menu dropdown-menu-right" style={{ minWidth: "100%", padding: "0", boxShadow: "none" }}>

                                            <li> <button style={{ margin: "auto", boxShadow: "none" }} className="btn btn-default" onClick={() => this.deleteInputCabinet(item.id)}>Xoá</button></li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        }</td>
                    </tr>
                    )
                }
                else {
                    return <RowEditInputCabinet columnNameClicked={columnNameClicked}
                        key={"RowsEdit_" + item.id}
                        isShowEdit={item.isShowEdit}
                        item={item}
                        newRow={index + 1 === lengthList ? true : false}
                        handleNewRow={(indexRow, newRow, dowRow) => this.handleNewRow(indexRow, newRow, dowRow)}
                        indexRow={index}
                        inputCabinetFormId={this.props.inputCabinetFormId}
                        drugStoreId = {this.props.drugStoreId}
                        getListInputCabinet = {this.getListInputCabinet}
                        />
                }
            })
        }

        return <div className="tab-pane active" id="default-justified-tab1">
            <table className="table table-xxs table-bordered">
                <thead>
                    <tr className="bg-teal" >
                        <th rowSpan="2" width="5%" style={{ textAlign: "center", width: '5%' }}><i className="icon-menu-open2"></i></th>
                        <th rowSpan="2" style={{ textAlign: "center", width: '60%' }}>Tên Thuốc</th>
                        <th rowSpan="2" style={{ textAlign: "center", width: '30%' }}>Số Lượng</th>
                        <th rowSpan="2" width="5%" style={{ textAlign: "center", width: '5%' }}><i className="icon-menu-open2"></i></th>
                    </tr>
                </thead>
                <tbody>
                    {inputFormRows}
                </tbody>
            </table>
            <div className="panel-body">
                <div className="heading-elements">
                    {buttonSumbitForm}
                    {buttonAddDrugRow}
                    {buttonHandleDelete}
                </div>
            </div>
        </div>

    }
}


export default translate('translations')(TableInputCabinet);