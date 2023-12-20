import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { ScriptUtils } from '../../utils/javascriptUtils';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import moment from 'moment';
import { FormatterUtils } from '../../utils/javascriptUtils';

class DayRevenueRows extends React.Component {
    constructor() {
        super();
        this.state = {
            listCashDesk: null,
            listCashDesk: [],
            isShowCashDeskRows: false,
            dayRevenueObj: [],
            idCashDesk: null,
            isShownApprovalDayRevenueModal:false,
            isShowUpdateDayRevenue:false
        }
        this.handleShowCashDesk = this.handleShowCashDesk.bind(this);
        this.handleApprovalDayRevenueStatus=(id)=>{ 
            this.setState({
                isShownApprovalDayRevenueModal:true,
                idDayRevenue:id
            })
        }
        this.handleHidemodal=()=>{
            this.setState({
                isShownApprovalDayRevenueModal:false,
                isShowUpdateDayRevenue:false
            })
            this.props.reloadDayRevenue();
        }
        this.handleReloadDayRevenue = (id)=>{
        this.setState({
            isShowUpdateDayRevenue:true,
            idDayRevenue:id
        })
        }
    };
    handleShowCashDesk() {
        let isShowCashDeskRows = this.state.isShowCashDeskRows;
        isShowCashDeskRows = !this.state.isShowCashDeskRows;
        this.setState({ isShowCashDeskRows: isShowCashDeskRows })
        if (isShowCashDeskRows) {
            this.getListCashDesk();
        }
    }
    getListCashDesk() {
        const fromDate = moment(this.props.dayRevenueObj.applyDate).format("YYYY-MM-DD-HH:mm:ss");
        let setStateInRequest = (list) => { this.setState({ listCashDesk: list }) }
        return (agent.asyncRequests.get("/cashDesk/listByCashDeskDay?fromDate=" + fromDate).then(function (res) {
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
    render() {
        const { dayRevenueObj,t } = this.props;
        var isShowCashDeskRows = this.state.isShowCashDeskRows;
        var dataCashDesk = this.state.listCashDesk;
        var cashDeskRows = [];
        var cashDesk = [];
        var cashDeskCurrentNo = 0;
        if(!dayRevenueObj){
            return null; 
        }
        if (dataCashDesk) {
            cashDeskRows = dataCashDesk.map(item => {
                return (
                    <tr className="success" key={"cashDesk_" + item.id}>
                        <td></td>
                        <td>{item.cashier ? item.cashier.fullName : "N/A"}</td>
                        <td>{moment(item.openTime).format("DD/MM/YYYY HH:mm")}</td>
                        <td>{moment(item.closeTime).format("DD/MM/YYYY HH:mm")}</td>
                        <td>{FormatterUtils.formatCurrency(item.initialAmount)} VNĐ</td>
                        <td>{FormatterUtils.formatCurrency(item.closeAmount)} VNĐ</td>
                        <td>{FormatterUtils.formatCurrency(item.saleAmount)} VNĐ</td>
                        <td>{FormatterUtils.formatCurrency(item.withdrawalAmount)} VNĐ</td>
                        <td>{item.isBalanced ? <img src="assets/images/icon-check.png" width="18" height="18" /> : <img src="assets/images/icon-uncheck.png" width="18" height="18" />}</td>
                        <td>{item.note}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                );
            })
            cashDesk = [<tr style={{WebkitTextStroke:'medium'}} className="warning">
                <td></td>
                <th data-toggle="true">Tên Người Thu Ngân</th>
                <th data-toggle="true">Thời Gian Mở</th>
                <th data-toggle="true">Thời Gian Đóng</th>
                <th data-toggle="true">Số Tiền Ban Đầu</th>
                <th data-toggle="true">Số Tiền Sau Khi Đóng</th>
                <th data-toggle="true">Số Tiền Đã Bán</th>
                <th data-toggle="true">Số Tiền Đã Rút</th>
                <th data-toggle="true">Cân Bằng</th>
                <th data-toggle="true">Ghi Chú</th>
                <th data-toggle="true"></th>
                <th data-toggle="true"></th>
                <th data-toggle="true"></th>
            </tr>
            ].concat(isShowCashDeskRows ? cashDeskRows : null);
        }
        return (
            [<tr key={dayRevenueObj.id}>
                <td> {isShowCashDeskRows ? <button className="bg-info-600 icon-dash" onClick={() => this.handleShowCashDesk(dayRevenueObj.id)}></button> :
                    <button className="bg-info-600 icon-plus22" onClick={() => this.handleShowCashDesk(dayRevenueObj.id)}></button>}
                </td>
                <td>{moment(dayRevenueObj.applyDate).format("DD/MM/YYYY")}</td>
                <td>{FormatterUtils.formatCurrency(dayRevenueObj.revenueAmount)}</td>
                <td>{FormatterUtils.formatCurrency(dayRevenueObj.buyAmount)}</td>
                <td>{FormatterUtils.formatCurrency(dayRevenueObj.internalDrugAmount)}</td>
                <td>{FormatterUtils.formatCurrency(dayRevenueObj.totalAmount)}</td>
                <td>{FormatterUtils.formatCurrency(dayRevenueObj.saleDrugAmount)}</td>
                <td>{FormatterUtils.formatCurrency(dayRevenueObj.salePrescriptionAmount)}</td>
                <td>{FormatterUtils.formatCurrency(dayRevenueObj.saleDiagnosisAmount)}</td>
                {/* <td>{FormatterUtils.formatCurrency(dayRevenueObj.saleProcedureAmount)}</td> */}
                <td>{FormatterUtils.formatCurrency(dayRevenueObj.saleInsuranceAmount)}</td>
                <td className="footable-last-column">{FormatterUtils.formatCurrency(dayRevenueObj.saleOtherAmount)}</td>
                
            </tr>].concat(isShowCashDeskRows ? cashDesk : null)

        );

    }
}
export default translate('translations')(DayRevenueRows);