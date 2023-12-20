import moment from 'moment';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import React from 'react';
import { translate } from 'react-i18next';
import { toast } from 'react-toastify';
import agent from '../../services/agent';
import { DateUtils, FormatterUtils, ScriptUtils } from '../../utils/javascriptUtils';
import RowEditPrescriptionItemByStore from './RowEditPrescriptionItemByStore';
import qs from 'query-string';
import ModalSearchpatient from '../Patient/ModalSearchpatient';



class TabPrescription extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPrescriptionModalShown: false,
            prescriptionId: null,
            patientId: null,
            isPDFModalShown: false,
            listPrescriptionItem: [],
            imageLogo: "",
            isShowModalPrescriptionItemOld: false,
            columnNameClicked: null,
            isPrescriptionItemModalShown: false,
            currentShowItem: false,
            reloadNum: 0,
            isShowModalNewRow: false,
            listDefault: [],
            prescriptionId : qs.parse(this.props.location.search).id,
            drugStoreId : qs.parse(this.props.location.search).store,
            currentPrescription : null,
            isPatientModalShown : false
      
        }
        this.handleAddModalRow = this.handleAddModalRow.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.handleEventEditTables = this.handleEventEditTables.bind(this);
        this.deletePrescriptionItem = this.deletePrescriptionItem.bind(this);
        this.getListPrescriptionItemByPrescriptionId = this.getListPrescriptionItemByPrescriptionId.bind(this);
        this.getPrescription = this.getPrescription.bind(this);
        this.handleAddPatient = this.handleAddPatient.bind(this);
        this.handleHidemodal = (ev) => {
            this.setState({ isPrescriptionModalShown: false, isShowModalPrescriptionItemOld: false , isPatientModalShown : false});
            this.getListPrescriptionItemByPrescriptionId();
            this.getPrescription();
        };
        this.handleHidemodalPDF = () => {
            this.setState({ isPDFModalShown: false, });
        };
        this.handleSavePDF = (dataExport) => {
            pdfMake.vfs = pdfFonts.pdfMake.vfs;
            pdfMake.createPdf(dataExport).print();

        }


        this.reloadEditable = (selectedItem, columnName) => {
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
    };

    getDataExport(dataPrescriptionItemList) {
        var imageLogo = this.state.imageLogo;
        var currentPrescription = this.state.currentPrescription;
        var currentNo = 0;
        var prescriptionId = this.state.prescriptionId;
        var note = currentPrescription.note ? currentPrescription.note : "";
        var dayBack = currentPrescription.dayBack ? currentPrescription.dayBack : "";
        var numberRandomRange = 8;
        var checkCode = prescriptionId.toString().length;
        var totalRange = numberRandomRange - checkCode;
        var title = "DT";
        var codeNumber = "";
        for (var i = 0; i < totalRange; i++) {
            codeNumber += '0';
        }
        var barcode = title + codeNumber + currentPrescription.id;
        var patientBarcode = FormatterUtils.convertTextToBarcode(barcode);
        // var sumPrice = 0 ;
    
        const currentUser = this.props.currentUser;
        const { t } = this.props;
        var today = new Date();
        var address = currentPrescription.patient && currentPrescription.patient.address ? currentPrescription.patient.address : "";
        var analysis = currentPrescription.analysis ? currentPrescription.analysis : "";
        var cls = currentPrescription.cls ? currentPrescription.cls : "";
        
        var tableItems = null;
        if(dataPrescriptionItemList.length > 0 ){
            var itemRows = dataPrescriptionItemList.map(item => {
                currentNo++;
                // sumPrice += item.drug.salePrice * item.totalAmount;
                return [
                    [currentNo + '. '], [item.drug ? item.drug.name + " " + item.drug.hamLuongBHYT : "", "Cách dùng: \t " + item.instruction], [{ text: item.totalAmount }], [{ text: item.drug ? item.drug.uom : '' }]
                ];
            });
            tableItems = {
                style: 'tableExample',
                table: {
                    widths: ['auto', '*', 'auto', 'auto'],
                    body: itemRows,
                },
                layout: 'noBorders'
            }
        }
         
            var dataExport = {


                content: [

                    {
                        columns: [
                            { text: 'Sở Y Tế TPHCM' + '\n Phòng Khám Đa Khoa Quốc Tế TIMEC' + '\n Số: ...../20...../GCT', fontSize: 11, alignment: 'center' },
                            { text: 'CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM' + '\n Độc Lập - Tự Do - Hạnh Phúc' + '\n ---------------', fontSize: 11, alignment: 'center' },
                            { text: 'Mã Toa: ' + (currentPrescription ? currentPrescription.id : ' ....') + '\n Mã Bệnh Nhân: ' + (currentPrescription && currentPrescription.patient ? currentPrescription.patient.code : ' ....'), fontSize: 11, alignment: 'center' },
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
                            { image: patientBarcode, fit: [100, 100], alignment: 'right', margin: [0, -20, 15, 0] },
                        ]
                    },
                    {
                        columns: [
                            { text: barcode, fontSize: 11, alignment: 'right', margin: [0, 0, 50, 0] },

                        ]
                    },
                    {
                        columns: [
                            { text: '\n ĐƠN THUỐC', fontSize: 15, alignment: 'center' },
                        ]
                    },
                    {
                        text: ['\n Họ và tên người bệnh: ', { text: currentPrescription.patient ? currentPrescription.patient.fullName : "...................................................................." },
                            "\t Giới tính: ", { text: t(currentPrescription.patient ? currentPrescription.patient.gender : "..................") },
                            "\t Ngày Sinh: ", { text: currentPrescription.patient ? DateUtils.formatDateForScreen(currentPrescription.patient.birthday ) : "......................" }], fontSize: 11, alignment: 'left',

                    },
                    { text: '\n' },
                    {
                        columns: [
                            { text: 'Địa chỉ: ' + (address ? address : '') + '\n\n', fontSize: 11, },


                        ]
                    },
                    {
                        columns: [

                            { text: 'Triệu chứng: ' + cls + '\n\n', fontSize: 11, },

                        ]
                    },
                    {
                        columns: [

                            { text: 'Chẩn Đoán: ' + analysis + '\n\n', fontSize: 11, },

                        ]
                    },

                    tableItems,

                    { text: '\n\n' },
                    {
                        columns: [
                            { text: '* Lời dặn:' + '\n\n  ' + note, fontSize: 11, alignment: 'left' },
                        ]
                    },
                    {
                        columns: [
                            { text: '\n\n Ngày Tái khám:' + dayBack, bold: 'true', fontSize: 11, alignment: 'left' },

                        ]
                    },
                    {
                        columns: [
                            { text: '\n Ngày ' + moment(today).format("LL") + '\n\n ', alignment: 'right', fontSize: 11 },

                        ]
                    },
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
                },
                defaultStyle: {
                    columnGap: 10
                }


                // TODO build json
            }
        return dataExport;


    }
    getListPrescriptionItemByPrescriptionId(indexRow, dowRow, eventNewRow) {
        var prescriptionId = this.state.prescriptionId;
        var this_ = this;
        if (prescriptionId != 'new') {
            if (eventNewRow) {
                let setStateInRequest = (list) => { this.setState({ listPrescriptionItem: list, columnNameClicked: "drugName" }) }
                return agent.PrescriptionItemApi.findByPrescriptionId(prescriptionId
                ).then(function (res) {
                    var result = res.resultData;
                    if (result) {
                        result.map((item, index) => {
                            item.isShowEdit = false;
                        })
                        setStateInRequest(result);
                        this_.handleAddModalRow();
                    } else {
                        toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                    }
                }, function (err) {
                    toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                        + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
                });

            } else {
                let setStateInRequest = (list) => { this.setState({ listPrescriptionItem: list, columnNameClicked: "drugName" }) }
                return agent.PrescriptionItemApi.findByPrescriptionId(prescriptionId
                ).then(function (res) {
                    var result = res.resultData;
                    if (result) {
                        result.map((item, index) => {
                            if (indexRow != null) {
                                if (indexRow + 1 === index && dowRow) {
                                    item.isShowEdit = true;
                                }
                            } else {
                                item.isShowEdit = false;
                                item.isShowModalNewRow = false;
                            }
                        })
                        setStateInRequest(result);
                    } else {
                        toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                    }
                }, function (err) {
                    toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                        + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
                });
            }
        }
    }

    getPrescription(){
        var prescriptionId = this.state.prescriptionId;
        let setStateInRequest = (list) => { this.setState({ currentPrescription: list }) }
        return agent.PrescriptionApi.getPrescription(prescriptionId
            ).then(function (res) {
                var result = res.resultData;
                if (result) {
                    setStateInRequest(result);
                } else {
                    toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                +" Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
            });
    }
    handleAddModalRow() {
        let listPrescriptionItem = this.state.listPrescriptionItem;
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
                prescriptionId: this.state.prescriptionId
            }
        );
        this.setState({
            listPrescriptionItem: listPrescriptionItem,
            columnNameClicked: "drugName"
        })
    }
    handleHideAndClear() {
        const { destroy, backToList, onHide } = this.props;
        onHide();
        destroy();
        backToList()
    }
    componentWillMount() {
        this.getListPrescriptionItemByPrescriptionId();
        this.getPrescription();
        var url = '/assets/images/logo_timec.png';
        FormatterUtils.downloadImageDataUri(url, this, "imageLogo");

    }
    componentDidUpdate() {
        ScriptUtils.loadFootable();
    }
    handleShowModalPrescriptionItemOld() {
        this.setState({
            isShowModalPrescriptionItemOld: true
        })
    }

    handleEventEditTables(indexRow, eventNewRow, dowRow) {
        this.getListPrescriptionItemByPrescriptionId(indexRow, dowRow, eventNewRow);
        this.setState({
            currentShowItem: null,
            columnNameClicked: null
        })
    }
    handleAddPatient() {
        this.setState({
            isPatientModalShown: true
        });

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
    render() {
        const dataPrescriptionItemList = this.state.listPrescriptionItem;
        var prescriptionItemRows = [];
        if (dataPrescriptionItemList) {
            var presciptionCurrentNo = 0;
            var sumPrice = 0;
            var lengthList = dataPrescriptionItemList.length;
            let columnNameClicked = this.state.columnNameClicked;
            prescriptionItemRows = dataPrescriptionItemList.map((item, index) => {
                presciptionCurrentNo++;
                sumPrice += (item.drug ? item.drug.salePrice : 0) * item.totalAmount;
                if (!item.isShowEdit && item.id) {
                    return (<tr key={"prescriptionItemId" + item.id} >
                        <td>{presciptionCurrentNo}</td>

                        <td style={{ textAlign: "center" }} onClick={() => { this.reloadEditable(item, "drugName") }}>{(item.drug ? item.drug.name + " " + item.drug.hamLuongBHYT + " (" + item.drug.uom + ")" : " - ")}</td>
                        {/* <td style={{ textAlign: "center" }} onClick={() => { this.reloadEditable(item, "drugIngredient") }}>{item.drug ? item.drug.ingredient : ""} </td> */}
                        <td style={{ textAlign: "center" }} onClick={() => { this.reloadEditable(item, "morningAmount") }}>{(item.morningAmount)}</td>
                        <td style={{ textAlign: "center" }} onClick={() => { this.reloadEditable(item, "noonAmount") }}>{(item.noonAmount)}</td>
                        <td style={{ textAlign: "center" }} onClick={() => { this.reloadEditable(item, "afternoonAmount") }}>{(item.afternoonAmount)}</td>
                        <td style={{ textAlign: "center" }} onClick={() => { this.reloadEditable(item, "eveningAmount") }}>{(item.eveningAmount)}</td>
                        <td style={{ textAlign: "center" }} onClick={() => { this.reloadEditable(item, "numberOfDays") }}>{(item.numberOfDays)}</td>
                        <td style={{ textAlign: "center", width: '15%' }} onClick={() => { this.reloadEditable(item, "note") }}>{(item.note)}</td>
                        <td style={{ textAlign: "center" }} onClick={() => { this.reloadEditable(item, "totalAmount") }}>{item.totalAmount}</td>
                        <td><button className="btn btn-default" onClick={() => this.deletePrescriptionItem(item.id)}>X</button></td>
                    </tr>
                    )
                }
                else {
                    return <RowEditPrescriptionItemByStore columnNameClicked={columnNameClicked}
                        key={"RowsEdit_" + item.id}
                        isShowEdit={item.isShowEdit}
                        onBlurUpdate={this.onBlurUpdate}
                        item={item}
                        currentNoList={presciptionCurrentNo}
                        eventNewRow={index + 1 === lengthList ? true : false}
                        handleEventEditTable={(indexRow, eventNewRow, dowRow) => this.handleEventEditTables(indexRow, eventNewRow, dowRow)}
                        indexRow={index}
                        prescriptionId={this.state.prescriptionId}
                        drugStoreId={this.state.drugStoreId}
                    ></RowEditPrescriptionItemByStore>
                }

            })
        }

        return <div className="content-wrapper">
                    <div className="content">
                        <div className="panel panel-flat">
                            <div className="panel-body">
                                <div className="tab-pane active" id="default-justified-tab-tabPrescription">
                                    <table className="table table-xxs table-bordered">
                                        <thead>
                                            <tr className="bg-teal" >
                                                <th rowSpan="2" width="5%" style={{ textAlign: "center" }}><i className="icon-menu-open2"></i></th>
                                                <th rowSpan="2" width="25%" style={{ textAlign: "center" }}>Tên Thuốc</th>
                                                {/* <th rowSpan="2" style={{ textAlign: "center" }}>Hoạt Chất</th> */}
                                                <th colSpan="5" style={{ textAlign: "center" }}>Cách Dùng</th>
                                                <th rowSpan="2" style={{ textAlign: "center", width: '15%' }}>Ghi chú</th>
                                                <th rowSpan="2" style={{ textAlign: "center" }}>Số Lượng</th>
                                                <th rowSpan="2" width="5%" style={{ textAlign: "center" }}><i className="icon-menu-open2"></i></th>
                                            </tr>
                                            <tr className="bg-teal">
                                                <th style={{ textAlign: "center" }}>Sáng</th>
                                                <th style={{ textAlign: "center" }}>Trưa</th>
                                                <th style={{ textAlign: "center" }}>Chiều</th>
                                                <th style={{ textAlign: "center" }}>Tối</th>
                                                <th style={{ textAlign: "center" }}>Số Ngày</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {prescriptionItemRows}
                                        </tbody>

                                    </table>
                                    <div className="panel-body">
                                        <div className="pull-left">
                                            Tổng tiền : {FormatterUtils.formatCurrency(sumPrice)} VNĐ
                                        </div>
                                        <br/>
                                        <div className="pull-left">
                                            Bệnh Nhân : {this.state.currentPrescription ? (this.state.currentPrescription.patient? this.state.currentPrescription.patient.fullName :"") : ""}
                                        </div>
                                        
                                        <div className="heading-elements">
                                            <button type="button" className="btn btn-warning" onClick={() => this.handleSavePDF(this.getDataExport(dataPrescriptionItemList))}><i className="icon-printer2"></i> In Đơn thuốc</button>
                                            <button type="button" className="btn btn-info" onClick={this.handleAddModalRow}>Thêm thuốc vào đơn</button>
                                            <button className="btn bg-teal" onClick={() => this.handleAddPatient()}>Chọn bệnh nhân</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.state.isPatientModalShown ? <ModalSearchpatient
                    title={this.state.idPatient ? "Chỉnh Sửa Bệnh Nhân" : "Thêm Mới Bệnh Nhân"}
                    prescriptionId={this.state.prescriptionId}
                    show={this.state.isPatientModalShown}
                    onHide={this.handleHidemodal} /> : null}
                </div>

    }
}

export default translate('translations')(TabPrescription);