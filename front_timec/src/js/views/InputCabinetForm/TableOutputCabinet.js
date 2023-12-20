import React from 'react';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import agent from '../../services/agent';
import RowEditOutputCabinet from './RowEditOutputCabinet';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import pdfMake from 'pdfmake/build/pdfmake';
import { FormatterUtils } from '../../utils/javascriptUtils';
import moment from 'moment'

class TableOutputCabinet extends React.Component {
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
           listOutputCabinet : [],
            isShowModalInputForm : false

        }
        this.handleAddModalRow = this.handleAddModalRow.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.handleNewRow = this.handleNewRow.bind(this);
        this.getListOutputCabinet = this.getListOutputCabinet.bind(this);
        this.handleHidemodal = (result) => {
            // var this_=this;   
            var dataOutputCabinet = this.state.listOutputCabinet;
            dataOutputCabinet.map(item => {
                item.isShowEdit = false;
                item.newRow = false;
                if (!item.id) {
                    dataOutputCabinet.splice(-1, 1);
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
            }

        };

        this.reloadEditable = (selectedItem, columnName) => {
            var status = this.state.status;
            if (!(status === "SUCCESS")) {
                var dataOutputCabinet = this.state.listOutputCabinet;
               
                // Set false all item not selected
                dataOutputCabinet.map(item => {
                    item.isShowEdit = false;
                    item.newRow = false;
                    if (!item.id) {
                        dataOutputCabinet.splice(-1, 1);
                    }
                })

                //  Set true particular item
                selectedItem.isShowEdit = true;
                this.setState({
                    currentShowItem: selectedItem,
                    columnNameClicked: columnName
                })
            }
        };
        this.handlePrintPDF = (dataExport) => {
            pdfMake.vfs = pdfFonts.pdfMake.vfs;
            pdfMake.createPdf(dataExport).print();

        }

    };

    getDataExport(dataOutputCabinet) {
        var imageLogo = this.state.imageLogo;
        const {currentUserName,prescriptionId, patientCode} = this.props;

        var numberRandomRange = 8;
        var lengthPrescriptionCode = prescriptionId.toString().length;
        var totalRange = numberRandomRange - lengthPrescriptionCode;
        var title = "DD";
        var codeNumber = "";
        for (var i = 0; i < totalRange; i++) {
            codeNumber += '0';
        }
        var barcode = title + codeNumber + prescriptionId;
        var prescriptionCode = FormatterUtils.convertTextToBarcode(barcode);
        
        var today = new Date();
        var drugName = [];
        var outAmount = [];
        var salePrice = [];
        var totalAmount = 0;
        var stt = [];
        var curentNo = 0;
        dataOutputCabinet.map(item => {
            curentNo++
            drugName.push(item.drug ? item.drug.name  + " " + item.drug.hamLuongBHYT : null);
            outAmount.push(item.outAmount);
            salePrice.push(item.drug ? item.drug.salePrice : 0);
            totalAmount += (item.drug ? item.drug.salePrice : 0);
            stt.push(curentNo);
            return (
                stt,drugName, outAmount, salePrice
            )
        });

        var tableItems = {
            style: 'tableExample',
            table: {
                widths: [50, 200, 100, 100],
                body: [
                    [{ text: 'STT', style: 'tableHeader', alignment: 'center' },{ text: 'Tên thuốc', style: 'tableHeader', alignment: 'center' }, { text: 'Giá Bán', style: 'tableHeader', alignment: 'center' }, { text: 'Số Lượng', style: 'tableHeader', alignment: 'center' }],
                    [stt,drugName, salePrice, outAmount]
                ]
            },
        },
        dataExport = {
            content: [
                {
                    columns: [
                        { text: 'Sở Y Tế TPHCM' + '\n Phòng Khám Đa Khoa Quốc Tế TIMEC' + '\n Số: ...../20...../GCT', fontSize: 11, alignment: 'center' },
                        { text: 'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM' + '\n Độc Lập - Tự Do - Hạnh Phúc' + '\n ---------------', fontSize: 11, alignment: 'center' },
                        { text: 'Mã Toa: ' +prescriptionId + '\n Mã Bệnh Nhân: ' + patientCode, fontSize: 11, alignment: 'center' },
                    ]
                },
                {
                    columns: [
                        imageLogo ? {
                            image: imageLogo,
                            fit: [100, 100],
                            alignment: 'left',
                            margin: [20, 0, 0, 0],
                        } : null,
                        { image: prescriptionCode , fit: [100, 100], alignment: 'right', margin: [0, -20, 15, 0] },
                    ]
                },
                {
                    columns: [
                        { text: barcode, fontSize: 11, alignment: 'right', margin: [0, 0, 50, 0] },

                    ]
                },
                {
                    columns: [
                        { text: '\n ĐƠN DƯỢC', fontSize: 15, alignment: 'center' }
                    ]
                },
                { text: '\n' },

                tableItems,

                {
                    columns: [
                        { text: '\n Ngày ' + moment(today).format("LL") + '\n\n BÁC SĨ ĐIỀU TRỊ \n\n\n' + currentUserName, alignment: 'center', fontSize: 11,margin: [0, 0, -300, 0] }
                    ]
                }
            ],
            styles: {
                header: {
                    fontSize: 10,
                    bold: true
                },
                bigger: {
                    fontSize: 10,
                    italics: true
                },
                tableExample: {
                    margin: [0, 5, 0, 15]
                },
                tableHeader: {
                    bold: true,
                    fontSize: 13,
                    color: 'black'
                }
            }
           
        }
        return dataExport;

    }

    getListOutputCabinet(indexRow, newRow, defalut){
      const {prescriptionId} = this.props;
        var this_=this;
        if(newRow){
            let setStateInRequest = (list) => { this.setState({listOutputCabinet: list }) }
            return agent.asyncRequests.get("/outputCabinet/getByPrescriptionId?prescriptionId=" +prescriptionId
                ).then(function (res) {
                    var result = res.body.resultData;
                    if (result) {
                        result.map(item => {
                            item.isShowEdit = false;
                        })
                        setStateInRequest(result);
                        this_.handleAddModalRow();

                    } else {
                        toast.error("Có lỗi khi tải dữ liệu. ", { autoClose: 15000 });
                    }
                }, function (err) {
                    toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                    +" Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
                });
        }else if(defalut){
            let setStateInRequest = (list) => { this.setState({listOutputCabinet: list }) }
            return agent.asyncRequests.get("/outputCabinet/getByPrescriptionId?prescriptionId=" +prescriptionId
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
            let setStateInRequest = (list) => { this.setState({listOutputCabinet: list }) }
            return agent.asyncRequests.get("/outputCabinet/getByPrescriptionId?prescriptionId=" +prescriptionId
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
                        toast.error("Có lỗi khi tải dữ liệu. ", { autoClose: 15000 });
                    }
                }, function (err) {
                    toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                    +" Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
                });
            }
    }

    handleAddModalRow() {

        let listOutputCabinet = this.state.listOutputCabinet;
        listOutputCabinet.map(item => {
            item.isShowEdit = false;
            item.newRow = false;
            if (!item.id) {
               listOutputCabinet.splice(-1, 1);
            }
        })
       listOutputCabinet.push(
            {
                isShowEdit: true,
                inputCabinetFormId: this.props.inputCabinetFormId,
            }
        );
        this.setState({
           listOutputCabinet:listOutputCabinet,
            columnNameClicked: "drugId",
        })

    };

    handleHideAndClear() {
        const { destroy, backToList, onHide } = this.props;
        onHide();
        destroy();
        backToList()
    }
  
    handleNewRow(indexRow,newRow, dowRow) {
        this.getListOutputCabinet(indexRow,newRow, dowRow);
        this.setState({
            currentShowItem: null,
            columnNameClicked: null
        })
    }

    deleteInputCabinet(id) {
        var this_ = this;
        var url = `/outputCabinet/${id}`;
        return agent.asyncRequests.del(url
        ).then(function (res) {
            var result = res.body.resultData;
            if (result && !result.error) {
                // alert("Xoá Thành Công !");
                this_.getListOutputCabinet();
            } else {
                toast.error("Có lỗi khi xóa dữ liệu. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Không thể xóa dữ liệu đang được sử dụng từ màn hình khác! ", { autoClose: 15000 });
        });
    }
   

    

    componentWillMount() {
        this.getListOutputCabinet();
        var url = '/assets/images/logo_timec.png';
        FormatterUtils.downloadImageDataUri(url, this, "imageLogo");
    }


    render() {
        const dataOutputCabinet = this.state.listOutputCabinet;
        var status = this.state.status;
        var inputFormRows = [];

        if (dataOutputCabinet) {
            var lengthList = dataOutputCabinet.length;
            let columnNameClicked = this.state.columnNameClicked;
            var itemNo = 0;
            inputFormRows = dataOutputCabinet.map((item, index) => {
                itemNo++;
                 if(item.status != "CANCELLED" ){
                    if (!item.isShowEdit && item.id != null ) {
                        return (<tr key={"inputCabinet" + item.id} >
                            <td>{itemNo}</td>
                            <td style={{ textAlign: "center" }} onClick={() => item.status != "DONE" ?  this.reloadEditable(item, "drugId") : null}>{item.drug.name + " " + item.drug.hamLuongBHYT + " (" + item.drug.uom + ")" }</td>
                            <td style={{ textAlign: "center" }} onClick={() => item.status != "DONE" ? this.reloadEditable(item, "outAmount") : null }>{(item.outAmount)}</td>
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
                      
                            return <RowEditOutputCabinet columnNameClicked={columnNameClicked}
                                key={"RowsEdit_" + item.id}
                                isShowEdit={item.isShowEdit}
                                item={item}
                                newRow={index + 1 === lengthList ? true : false}
                                handleNewRow={(indexRow, newRow, dowRow) => this.handleNewRow(indexRow, newRow, dowRow)}
                                indexRow={index}
                                inputCabinetFormId={this.props.inputCabinetFormId}
                                departmentId = {this.props.departmentId}
                                getListOutputCabinet = {this.getListOutputCabinet} 
                                prescriptionId = {this.props.prescriptionId}
                                />
                        
                    }
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
                    <button type="button" className="btn bg-teal" onClick={this.handleAddModalRow}>Thêm Thuốc</button>
                    <button type="button" className="btn bg-success" onClick={ () => this.handlePrintPDF(this.getDataExport(dataOutputCabinet))}><i className="icon-printer2"></i> In Đơn </button> 
                </div>
            </div>
      
        </div>

    }
}


export default translate('translations')(TableOutputCabinet);