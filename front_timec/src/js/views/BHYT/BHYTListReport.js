import React from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import moment from 'moment';
import { RenderSelect } from '../../components/formInputs';
import { FormatterUtils } from '../../utils/javascriptUtils';
import agent from '../../services/agent';
import { toast } from 'react-toastify';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { parseFloat } from 'core-js/core/number';

const selector = formValueSelector('BHYTListReport');

const validate = values => {
    const errors = {};
    return errors;
};


const mapStateToProps = state => {
    return {
        yearSelector: selector(state, "year"),
        monthSelector: selector(state, "month")
    };
};

const mapDispatchToProps = dispatch => ({
});

class BHYTListReport extends React.Component {
    constructor() {
        super();
        this.state = {
            listReport: null,
            listReportDrug: null,
            listReportService: null,
            month: null,
            year: null,
        }
        this.handleGetDataAll = this.handleGetDataAll.bind(this);
        this.handleGetDataDrug = this.handleGetDataDrug.bind(this);
        this.handleGetDataService = this.handleGetDataService.bind(this);


    };


    componentWillMount() {

    };
    handleGetDataAll() {
        const { yearSelector, monthSelector } = this.props;
        if (yearSelector && monthSelector) {
            let setStateInRequest = (list) => this.setState({
                listReport: list,
                listReportDrug: null,
                listReportService: null,
                month: monthSelector,
                year: yearSelector
            });
            return agent.asyncRequests.get("/bhyt/getReportByMonth?month=" + monthSelector + '&year=' + yearSelector).then(function (res) {
                var result = res.body.resultData;
                if (result) {
                    toast.success("Lấy Dữ Liệu Thành Công!", { autoClose: 1500 });
                    setStateInRequest(result);
                } else {
                    toast.error(res.body.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
            });
        }
    }
    handleGetDataDrug() {
        const { yearSelector, monthSelector } = this.props;
        if (yearSelector && monthSelector) {
            let setStateInRequest = (list) => this.setState({
                listReportDrug: list,
                listReport: null,
                listReportService: null,
                month: monthSelector,
                year: yearSelector
            });
            return agent.asyncRequests.get("/bhyt/getReportDrugByMonth?month=" + monthSelector + '&year=' + yearSelector).then(function (res) {
                var result = res.body.resultData;
                if (result) {
                    toast.success("Lấy Dữ Liệu Thành Công!", { autoClose: 1500 });
                    setStateInRequest(result);
                } else {
                    toast.error(res.body.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
            });
        }
    }
    handleGetDataService() {
        const { yearSelector, monthSelector } = this.props;
        if (yearSelector && monthSelector) {
            let setStateInRequest = (list) => this.setState({
                listReportService: list,
                listReport: null,
                listReportDrug: null,
                month: monthSelector,
                year: yearSelector
            });
            return agent.asyncRequests.get("/bhyt/getReportServiceByMonth?month=" + monthSelector + '&year=' + yearSelector).then(function (res) {
                var result = res.body.resultData;
                if (result) {
                    toast.success("Lấy Dữ Liệu Thành Công!", { autoClose: 1500 });
                    setStateInRequest(result);
                } else {
                    toast.error(res.body.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Có lỗi khi lưu trữ. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
            });
        }
    }

    render() {
        const { handleSubmit, submitting, t } = this.props;

        let optionMonth = [
            { label: '1', value: 1 },
            { label: '2', value: 2 },
            { label: '3', value: 3 },
            { label: '4', value: 4 },
            { label: '5', value: 5 },
            { label: '6', value: 6 },
            { label: '7', value: 7 },
            { label: '8', value: 8 },
            { label: '9', value: 9 },
            { label: '10', value: 10 },
            { label: '11', value: 11 },
            { label: '12', value: 12 },
        ]
        const { month, year } = this.state;
        var sheetString = 'T' + month + '-' + year;
        var fileNameReport = 'Báo Cáo 79a T' + month + '_' + year;
        var buttonNameReport = 'Xuất Excel Báo Cáo 79a T' + month + '_' + year;
        var fileNameReportDrug = 'Báo Cáo THUOC 20 T' + month + '_' + year;
        var buttonNameReportDrug = 'Xuất Excal Báo Cáo THUOC 20 T' + month + '_' + year;
        var fileNameReportService = 'Báo Cáo DVKT 21 T' + month + '_' + year;
        var buttonNameReportService = 'Xuất Excel Báo Cáo DVKT 21 T' + month + '_' + year;
        let optionYear = [
            { label: '2020', value: 2020 },
            { label: '2021', value: 2021 },
            { label: '2022', value: 2022 },
            { label: '2023', value: 2023 },
            { label: '2024', value: 2024 },
            { label: '2025', value: 2025 },
            { label: '2026', value: 2026 },
            { label: '2027', value: 2027 },
            { label: '2028', value: 2028 },
            { label: '2029', value: 2029 },
            { label: '2030', value: 2030 },
        ];
        let dataReport = this.state.listReport;
        let rowReport = null;

        if (dataReport) {
            let currentNo = 1;
            rowReport = dataReport.map(item => {
                return <tr>
                    <td>{currentNo++}</td>
                    <td>{item.maBN}</td>
                    <td>{item.hoTen}</td>
                    <td>{moment(item.ngaySinh).format("YYYYMMDD")}</td>
                    <td>{item.gioiTinh}</td>
                    <td>{item.diaChi}</td>
                    <td>{item.maThe}</td>
                    <td>{item.maDKBD}</td>
                    <td>{moment(item.gtTheTu).format("YYYYMMDD")}</td>
                    <td>{moment(item.gtTheDen).format("YYYYMMDD")}</td>
                    <td>{item.maBenh}</td>
                    <td>{item.maBenhKhac}</td>
                    <td>{item.maLyDoVVien}</td>
                    <td>{item.maNoiChuyen}</td>
                    <td>{moment(item.ngayVao).format("YYYYMMDDHHmm")}</td>
                    <td>{moment(item.ngayRa).format("YYYYMMDDHHmm")}</td>
                    <td>{item.soNgayDieuTri}</td>
                    <td>{item.ketQuaDieuTri}</td>
                    <td>{item.tinhTrangRaVien}</td>
                    <td>{item.tienTongChi * 1.00 }</td>
                    <td>{item.tienXetNghiem * 1.00}</td>
                    <td>{item.tienCDHA * 1.00}</td>
                    <td>{item.tienThuoc * 1.00 }</td>
                    <td>{item.tienMau * 1.00 }</td>
                    <td>{item.tienPhieuThuThuat * 1.00 }</td>
                    <td>{item.tienVatTuYTe * 1.00}</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>{item.tienKham * 1.00 }</td>
                    <td>{item.tienGiuong * 1.00  }</td>
                    <td>{item.tienVanChuyen * 1.00 }</td>
                    {/* <td>{item.tienBenhNhanTuTra}</td> */}
                    <td>{FormatterUtils.round2Decimals(item.tienTongChi - item.tienBaoHiemThanhToan )}</td>
                    <td>{item.tienBaoHiemThanhToan * 1.00}</td>
                    <td>{item.tienNgoaiDS * 1.00  }</td>
                    <td>{item.maKhoa  }</td>
                    <td>{item.namQT }</td>
                    <td>{item.thangQT  }</td>
                    <td>{item.maKhuVuc}</td>
                    <td>{item.maLoaiKCB  }</td>
                    <td>{item.maCSKCB }</td>
                    <td>{item.tienNguonKhac * 1.00 }</td>
                    <td>{item.maLienKet }</td>
                </tr>
            })
        }

        let rowReportDrug = null;
        let dataReportDrug = this.state.listReportDrug;
        if (dataReportDrug) {
            let currentNo = 1;
            rowReportDrug = dataReportDrug.map(item => {
                return <tr>
                    <td>{currentNo++}</td>
                    <td>{item.maThuoc}</td>
                    <td>{item.tenHoatChat}</td>
                    <td>{item.tenThuoc}</td>
                    <td>{item.duongDung}</td>
                    <td>{item.hamLuong}</td>
                    <td>{item.soDKy}</td>
                    <td>{item.donVi}</td>
                    <td>{item.soLuongNoiTru}</td>
                    <td>{item.soLuongNgoaiTru}</td>
                    <td>{FormatterUtils.formatCurrency(item.donGia * 1.00)}</td>
                    <td>{FormatterUtils.formatCurrency(item.thanhTien * 1.00)}</td>
                </tr>
            })
        }
        let rowReportService = null;
        let dataReportService = this.state.listReportService;
        if (dataReportService) {
            let currentNo = 1;
            rowReportService = dataReportService.map(item => {
                return <tr>
                    <td>{currentNo++}</td>
                    <td>{item.maDVKT}</td>
                    <td>{item.tenDVKT}</td>
                    <td>{item.slNoiTru}</td>
                    <td>{item.slNgoaiTru}</td>
                    <td>{item.donGia}</td>
                    <td>{item.thanhTien}</td>
                </tr>
            })
        }
        return (
            <div className="content-wrapper">
                <div className="page-header page-header-default">
                    <div className="breadcrumb-line">
                        <ul className="breadcrumb">
                            <li><a href=""><i className="icon-home2 position-left"></i> Home</a> </li>
                            <li className="active">Cáo Cáo BHYT</li>
                        </ul>
                    </div>
                </div>
                <div className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="panel panel-flat">
                                <div className="panel-body">
                                    <form className="main-search" role="form" >
                                        <div className="col-md-12">
                                            <div className="col-md-2">
                                                <Field name="month" label="Chọn Tháng" options={optionMonth} component={RenderSelect} ></Field>
                                            </div>
                                            <div className="col-md-2">
                                                <Field name="year" label="Chọn Năm" options={optionYear} component={RenderSelect} ></Field>
                                            </div>

                                        </div>
                                    </form>
                                    <div>
                                        <div className="col-md-2" style={{ marginTop: '25px' }}>
                                            <button className="btn bg-success btn-xlg" onClick={() => this.handleGetDataAll()}  >Lấy Dữ Liệu Tổng Hợp  </button>
                                        </div>
                                        <div className="col-md-2" style={{ marginTop: '25px' }}>
                                            <button className="btn bg-success btn-xlg" onClick={() => this.handleGetDataDrug()}  >Lấy Dữ Liệu Thuốc</button>
                                        </div>
                                        <div className="col-md-2" style={{ marginTop: '25px' }}>
                                            <button className="btn bg-success btn-xlg" onClick={() => this.handleGetDataService()}  >Lấy Dữ Liệu DVKT</button>
                                        </div>
                                    </div>
                                    <div className='row'> 
                                        {this.state.listReport ? <div className="col-md-1" style={{ marginTop: '25px' }}>
                                            <ReactHTMLTableToExcel
                                                id="test-table-all-report-xls-button"
                                                className="download-payment-xls-button btn btn-info marginL"
                                                table="table-all-report-xls"
                                                filename={fileNameReport}
                                                sheet={sheetString}
                                                buttonText={buttonNameReport} /> </div> : null}
                                        {this.state.listReportDrug ? <div className="col-md-1" style={{ marginTop: '25px' }}>
                                            <ReactHTMLTableToExcel
                                                id="test-table-all-reportDrug-xls-button"
                                                className="download-reportDrug-xls-button btn btn-info marginL"
                                                table="table-all-reportDrug-xls"
                                                filename={fileNameReportDrug}
                                                sheet={sheetString}
                                                buttonText={buttonNameReportDrug} /> </div> : null}
                                        {this.state.listReportService ? <div className="col-md-1" style={{ marginTop: '25px' }}>
                                            <ReactHTMLTableToExcel
                                                id="test-table-all-reportService-xls-button"
                                                className="download-reportService-xls-button btn btn-info marginL"
                                                table="table-all-reportService-xls"
                                                filename={fileNameReportService}
                                                sheet={sheetString}
                                                buttonText={buttonNameReportService} /> </div> : null}
                                    </div>

                                    <div className="panel panel-flat" style={{ display: '' }}>
                                        <table className="table table-xxs table-bordered" id="table-all-report-xls">
                                            <thead>
                                                <tr className="bg-teal">
                                                    <th >STT</th>
                                                    <th >MA_BN</th>
                                                    <th >HO_TEN</th>
                                                    <th >NGAY_SINH</th>
                                                    <th >GIOI_TINH</th>
                                                    <th >DIA_CHI</th>
                                                    <th >MA_THE</th>
                                                    <th >MA_DKBD</th>
                                                    <th >GT_THE_TU</th>
                                                    <th >GT_THE_DEN</th>
                                                    <th >MA_BENH</th>
                                                    <th >MA_BENHKHAC</th>
                                                    <th >MA_LYDO_VVIEN</th>
                                                    <th >MA_NOI_CHUYEN</th>
                                                    <th >NGAY_VAO</th>
                                                    <th >NGAY_RA</th>
                                                    <th >SO_NGAY_DTRI</th>
                                                    <th >KET_QUA_DTRI</th>
                                                    <th >TINH_TRANG_RV</th>
                                                    <th >T_TONGCHI</th>
                                                    <th >T_XN</th>
                                                    <th >T_CDHA</th>
                                                    <th >T_THUOC</th>
                                                    <th >T_MAU</th>
                                                    <th >T_PTTT</th>
                                                    <th >T_VTYT</th>
                                                    <th >T_DVKT_TYLE</th>
                                                    <th >T_THUOC_TYLE</th>
                                                    <th >T_VTYT_TYLE</th>
                                                    <th >T_KHAM</th>
                                                    <th >T_GIUONG</th>
                                                    <th >T_VCHUYEN</th>
                                                    <th >T_BNTT</th>
                                                    <th >T_BHTT</th>
                                                    <th >T_NGOAIDS</th>
                                                    <th >MA_KHOA</th>
                                                    <th >NAM_QT</th>
                                                    <th >THANG_QT</th>
                                                    <th >MA_KHUVUC</th>
                                                    <th >MA_LOAIKCB</th>
                                                    <th >MA_CSKCB</th>
                                                    <th >T_NGUONKHAC</th>
                                                    <th >MA_LIENKET</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {rowReport}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="panel panel-flat" style={{ display: 'none' }}>
                                        <table className="table table-xxs table-bordered" id="table-all-reportDrug-xls">
                                            <thead>
                                                <tr className="bg-teal">
                                                    <th >stt</th>
                                                    <th >ma_thuoc</th>
                                                    <th >ten_hoatchat</th>
                                                    <th >ten_thuoc</th>
                                                    <th >duong_dung</th>
                                                    <th >ham_luong</th>
                                                    <th >so_dky</th>
                                                    <th >don_vi</th>
                                                    <th >sl_noitru</th>
                                                    <th >sl_ngoaitru</th>
                                                    <th >don_gia</th>
                                                    <th >thanh_tien</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {rowReportDrug}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="panel panel-flat" style={{ display: 'none' }}>
                                        <table className="table table-xxs table-bordered" id="table-all-reportService-xls">
                                            <thead>
                                                <tr className="bg-teal">
                                                    <th >stt</th>
                                                    <th >ma_dvkt</th>
                                                    <th >ten_dvkt</th>
                                                    <th >sl_noitru</th>
                                                    <th >sl_ngoaitru</th>
                                                    <th >don_gia</th>
                                                    <th >thanh_tien</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {rowReportService}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default translate('translations')(connect(
    mapStateToProps, mapDispatchToProps)(
        reduxForm({
            form: 'BHYTListReport',
            destroyOnUnmount: false,
            enableReinitialize: true,
            validate
        })(BHYTListReport)));