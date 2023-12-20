import moment from 'moment';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import React from 'react';
import { translate } from 'react-i18next';
import { toast } from 'react-toastify';
import agent from '../../services/agent';
import { DateUtils, FormatterUtils, ScriptUtils } from '../../utils/javascriptUtils';
import ModalPrescriptionItem from '../PrescriptionItem/ModalPrescriptionItem';
import ModalPrescriptionItemOld from './ModalPrescriptionItemOld';
import RowEditPrescriptionItemBHYT from './RowEditPrescriptionItemBHYT';


class TabPrescriptionBHYT extends React.Component {
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
            listAllDianosisService: []
            // listHandlePlus : {
            //     // isShowModalNewRow : true,
            //     isShowEdit : true,
            //     prescriptionId : this.props.prescriptionId
            // }
        }
        this.handleAddModalRow = this.handleAddModalRow.bind(this);
        this.handleHideAndClear = this.handleHideAndClear.bind(this);
        this.handleEventEditTables = this.handleEventEditTables.bind(this);
        this.deletePrescriptionItem = this.deletePrescriptionItem.bind(this);
        this.getListPrescriptionItemByPrescriptionId = this.getListPrescriptionItemByPrescriptionId.bind(this);
        this.handleHidemodal = (ev) => {
            this.setState({ isPrescriptionModalShown: false, isShowModalPrescriptionItemOld: false });
            this.getListPrescriptionItemByPrescriptionId();
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
        var listAllDianosisService = this.state.listAllDianosisService;

        var currentPrescription = this.props.currentPrescription;
        var bhytPrescription = this.props.bhytPrescription;

        // Show list items
        var currentNo = 0;
        var dataInsuranceCard = this.props.listIncuranceCard;
        var insuranceCode = dataInsuranceCard[0].insuranceCode;
        var checkCodeId = currentPrescription.id;
        var note = currentPrescription.note ? currentPrescription.note : "";
        var dayBack = currentPrescription.dayBack ? currentPrescription.dayBack : "";
        var numberRandomRange = 8;
        var checkCode = checkCodeId.toString().length;
        var totalRange = numberRandomRange - checkCode;
        var title = "TBHYT";
        var codeNumber = "";
        for (var i = 0; i < totalRange; i++) {
            codeNumber += '0';
        }
        var barcode = title + codeNumber + bhytPrescription.id;
        var patientBarcode = FormatterUtils.convertTextToBarcode(barcode);
        // var sumPrice = 0 ;

        const currentUser = this.props.currentUser;
        const { t } = this.props;
        var prescriptionDate = currentPrescription.arriveTime;
        var address = currentPrescription.patient && currentPrescription.patient.address ? currentPrescription.patient.address : "";
        var analysis = currentPrescription.analysis ? currentPrescription.analysis : "";
        var cls = currentPrescription.cls ? currentPrescription.cls : "";
        var dsCanLamSan = '';
        if (listAllDianosisService.length > 0) {
            listAllDianosisService.map(item => {
                dsCanLamSan += item.diagnosisService.name + '(' + item.quantity + '), '
            })
        }
        var tableItems = null;
        if (dataPrescriptionItemList.length > 0) {
            var itemRows = dataPrescriptionItemList.map(item => {
                currentNo++;
                // sumPrice += item.drug.salePrice * item.totalAmount;
                return [
                    [currentNo + '. '], [item.drug ? item.drug.name + " " + item.drug.hamLuongBHYT 
                    + " (" + item.drug.ingredient + ")" : "", "Cách dùng: \t " + item.instruction], [{ text: item.totalAmount }], [{ text: item.drug ? item.drug.uom : '' }]
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
                        { text: barcode, fontSize: 11, alignment: 'right', margin: [0, 0, 35, 0] },

                    ]
                },
                {
                    columns: [
                        { text: '\n ĐƠN THUỐC', fontSize: 15, alignment: 'center' },
                    ]
                },
                {
                    text: ['\n Họ và tên người bệnh: ', { text: currentPrescription.patient ? currentPrescription.patient.fullName : "....................................................................",  fontSize: 11, bold: true  },
                        "\t Giới tính: ", { text: t(currentPrescription.patient ? currentPrescription.patient.gender : "..................") },
                        "\t Ngày sinh: ", { text: currentPrescription.patient ? DateUtils.formatDateForScreen(currentPrescription.patient.birthday) : "......................" }], fontSize: 11, alignment: 'left',

                },

                { text: '\n' },
                {
                    columns: [
                        { text: 'Mã Thẻ BHYT: ' + insuranceCode + '\n\n', fontSize: 11, },


                    ]
                },
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
                    text: [
                        { text: 'Cận Lâm Sàng: ', fontSize: 11, bold: true },
                        { text: dsCanLamSan + '\n\n', fontSize: 11 },
                    ]
                },
                {
                    text: [
                        { text: 'Chẩn Đoán:  ', fontSize: 11 },
                        { text: analysis + '\n\n', fontSize: 11, bold: true },
                    ]
                },

                {
                    text: [
                        { text: 'Thuốc Điều Trị: ', fontSize: 11 , bold: true},
                        { text: (tableItems ? '' : 'Không Thuốc' ) + '\n\n', fontSize: 11 },
                    ]
                },


                tableItems,

                // {
                //     columns: [

                //         { text: 'Tổng tiền : ' + FormatterUtils.formatCurrency(sumPrice) +" VNĐ" , fontSize: 11,alignment: 'right' },

                //     ]
                // },
                
                {
                    text: [
                        { text: '* Lời dặn:  ', fontSize: 11 },
                        { text: note + '\n\n', fontSize: 11, bold: true },
                    ]
                },
                {
                    columns: [
                        { text: '\n\n Ngày Tái khám:' + dayBack, bold: 'true', fontSize: 11, alignment: 'left' },

                    ]
                },
                {
                    columns: [
                        { text: '\n Ngày ' + moment(prescriptionDate).format("LL") + '\n\n BÁC SĨ ĐIỀU TRỊ \n\n\n', alignment: 'right', fontSize: 11 },

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
        var id = this.props.prescriptionId;
        var this_ = this;
        if (id != 'new') {
            if (eventNewRow) {
                let setStateInRequest = (list) => { this.setState({ listPrescriptionItem: list, columnNameClicked: "drugName" }) }
                return agent.PrescriptionItemApi.findByPrescriptionBHYTId(id
                ).then(function (res) {
                    var result = res.resultData;
                    if (result) {
                        result.map((item, index) => {
                            item.isShowEdit = false;
                        })
                        // result.push({
                        //     isShowEdit : true,
                        //     prescriptionId : id
                        // })
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
                return agent.PrescriptionItemApi.findByPrescriptionBHYTId(id
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
                prescriptionId: this.props.prescriptionId
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

    getAllDianosisService() {
        var id = this.props.prescriptionId;
        let setStateInRequest = (list) => { this.setState({ listAllDianosisService: list }) }
        return (agent.asyncRequests.get("/diagnosisReport/getByPrescriptionBHYTId?prescriptionId=" + id).then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + res.body.errorMessage, {
                    autoClose: 15000
                });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", {
                autoClose: 15000
            });
        }))
    }
    componentWillMount() {
        this.getListPrescriptionItemByPrescriptionId();
        this.getAllDianosisService();

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
        const { prescriptionStatus } = this.props;
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

                        <td style={{ textAlign: "center" }} onClick={() => { this.reloadEditable(item, "drugName") }}>{(item.drug ? item.drug.name + " " + item.drug.hamLuongBHYT + " (" + item.drug.ingredient + ")" + " (" + item.drug.uom + ")" : " - ")}</td>
                        {/* <td style={{ textAlign: "center" }} onClick={() => { this.reloadEditable(item, "drugIngredient") }}>{item.drug ? item.drug.ingredient : ""} </td> */}
                        <td style={{ textAlign: "center" }} onClick={() => { this.reloadEditable(item, "morningAmount") }}>{(item.morningAmount)}</td>
                        <td style={{ textAlign: "center" }} onClick={() => { this.reloadEditable(item, "noonAmount") }}>{(item.noonAmount)}</td>
                        <td style={{ textAlign: "center" }} onClick={() => { this.reloadEditable(item, "afternoonAmount") }}>{(item.afternoonAmount)}</td>
                        <td style={{ textAlign: "center" }} onClick={() => { this.reloadEditable(item, "eveningAmount") }}>{(item.eveningAmount)}</td>
                        <td style={{ textAlign: "center" }} onClick={() => { this.reloadEditable(item, "numberOfDays") }}>{(item.numberOfDays)}</td>
                        <td style={{ textAlign: "center" }} onClick={() => { this.reloadEditable(item, "totalAmount") }}>{item.totalAmount}</td>
                        <td style={{ textAlign: "center", width: '15%' }} onClick={() => { this.reloadEditable(item, "note") }}>{(item.note)}</td>
                        <td style={{ textAlign: "center" }} onClick={() => { this.reloadEditable(item, "priceDrug") }}>{item.drug ? FormatterUtils.formatCurrency(item.drug.salePrice) : ''}</td>
                        <td>
                            {prescriptionStatus != 'DONE' ? <button className="btn btn-default" onClick={() => this.deletePrescriptionItem(item.id)}>X</button> : null}
                        </td>
                    </tr>
                    )
                }
                else {
                    return <RowEditPrescriptionItemBHYT columnNameClicked={columnNameClicked}
                        key={"RowsEdit_" + item.id}
                        isShowEdit={item.isShowEdit}
                        onBlurUpdate={this.onBlurUpdate}
                        item={item}
                        currentNoList={presciptionCurrentNo}
                        eventNewRow={index + 1 === lengthList ? true : false}
                        handleEventEditTable={(indexRow, eventNewRow, dowRow) => this.handleEventEditTables(indexRow, eventNewRow, dowRow)}
                        indexRow={index}
                        prescriptionId={this.props.prescriptionId}
                    ></RowEditPrescriptionItemBHYT>
                }

            })
        }

        return <div className="tab-pane active" id="default-justified-TabPrescriptionBHYT">
            <table className="table table-xxs table-bordered">
                <thead>
                    <tr className="bg-teal" >
                        <th rowSpan="2" width="5%" style={{ textAlign: "center" }}><i className="icon-menu-open2"></i></th>
                        <th rowSpan="2" width="25%" style={{ textAlign: "center" }}>Tên Thuốc</th>
                        {/* <th rowSpan="2" style={{ textAlign: "center" }}>Hoạt Chất</th> */}
                        <th colSpan="5" style={{ textAlign: "center" }}>Cách Dùng</th>
                        <th rowSpan="2" style={{ textAlign: "center" }}>Số Lượng</th>
                        <th rowSpan="2" style={{ textAlign: "center", width: '15%' }}>Ghi chú</th>
                        <th rowSpan="2" style={{ textAlign: "center" }}>Đơn Giá</th>
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
                {
                    this.state.isPrescriptionModalShown ? <ModalPrescriptionItem
                        title={this.state.idPopupPrescriptionItem ? "Chỉnh Sửa Đơn Thuốc" : "Nhập Đơn Thuốc"}
                        idPopupPrescriptionItem={this.state.idPopupPrescriptionItem}
                        show={this.state.isPrescriptionModalShown}
                        onHide={this.handleHidemodal}
                        prescriptionId={this.props.prescriptionId}
                        patientId={this.props.patientId}
                    /> : null
                }

            </table>
            <div className="panel-body">
                <div className="pull-left">
                    <button type="button" className="btn btn-default" onClick={() => this.handleShowModalPrescriptionItemOld()} >Đơn Thuốc Cũ</button>
                    Tổng tiền : {FormatterUtils.formatCurrency(sumPrice)} VNĐ
                </div>
                <div className="heading-elements">
                    <button type="button" className="btn btn-warning" onClick={() => this.handleSavePDF(this.getDataExport(dataPrescriptionItemList))}><i className="icon-printer2"></i> In Đơn thuốc</button>
                    {/* <button type="button" className="btn btn-info" onClick={() => this.handleAddModalRow(null,this.props.prescriptionId,this.props.patientId)}>Nhập đơn thuốc</button> */}

                    {prescriptionStatus != 'DONE' ? <button type="button" className="btn btn-info" onClick={this.handleAddModalRow}>Thêm thuốc vào đơn</button> : null}
                </div>

            </div>
            {
                this.state.isShowModalPrescriptionItemOld ? <ModalPrescriptionItemOld
                    title={"Danh Sách Đơn Thuốc"}
                    // idPopupPrescriptionItem={this.state.idPopupPrescriptionItem}
                    show={this.state.isShowModalPrescriptionItemOld}
                    onHide={this.handleHidemodal}
                    prescriptionId={this.props.idPrescription}
                    patientId={this.props.patientId}
                /> : null
            }
            <div>
                <i>* Bác sĩ kê toa sử dụng phím Tab để di chuyển. Tab ở cột "Ghi chú" sẽ lưu đơn thuốc. Esc để bỏ qua dòng hiện tại.</i>
            </div>
            {prescriptionStatus == 'DONE' ? <div>
                <i>* Phiếu khám đã Hoàn Thành và không thể chỉnh sửa. Vui lòng liên hệ Admin nếu bác sĩ thấy cần phải chỉnh sửa toa này.</i>
            </div> : null}
        </div>

    }
}

export default translate('translations')(TabPrescriptionBHYT);