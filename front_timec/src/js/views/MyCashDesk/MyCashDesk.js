import React from 'react';
import qs from 'query-string';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import agent from '../../services/agent';
import moment from 'moment'
import ModalCashWidrawal from '../CashWidrawal/ModalCashWidrawal';
import { LoadingScreen } from '../../components/commonWidgets';
import ModalCashDesk from '../MyCashDesk/ModalOpenCashDesk';
import ModalCashDeskClose from '../MyCashDesk/ModalCloseCashDesk';
import { FormatterUtils } from '../../utils/javascriptUtils';
const mapStateToProps = state => {
    return {
        currentUser: state.common.currentUser
    }};

const mapDispatchToProps = dispatch => ({
    onLoad: (payload, token) =>
    dispatch({ type: APP_LOAD, payload: payload, token: token, skipTracking: true }),
    onRedirect: () =>
        dispatch({ type: REDIRECT }),
    fireRedirect: (url) =>
        dispatch({ type: FIRE_REDIRECT, toUrl: url }),
});

class MyCashDesk extends React.Component {
    constructor() {
        super();
        this.state = {
            listCashDesk: null,
            isCashWidrawalModalShown:false,
            cashWidrawalDto: null,
            isShowButtonOpenCashDesk: true,
            objectcashDesk: null, 
            isCashDeskModalShown: false,
            isCashDeskCloseModalShown: false,
            idCashDesk: "",
            initialAmountCheck:null
        }
        this.handleShowmodal = this.handleShowmodal.bind(this);
        this.handleShowCashDeskClosemodal = this.handleShowCashDeskClosemodal.bind(this);
        this.handleShowmodalCashWidrawal=this.handleShowmodalCashWidrawal.bind(this);
        this.handleHidemodal = () => {
        this.getCashDesk(),
        this.setState({ isCashWidrawalModalShown: false,
            isCashDeskCloseModalShown: false,
            isCashDeskModalShown :false,
            initialAmountCheck:null
        });
        };
    };
    handleShowmodalCashWidrawal(cashWidrawalDto,initialAmount) {
        this.setState({
            isCashWidrawalModalShown: true,
            cashWidrawalDto:cashWidrawalDto,
            idCashWidrawal: null,
            initialAmountCheck:initialAmount
        });
    }
    handleShowmodal(id) {
        this.setState({
            isCashDeskModalShown: true,
            idCashDesk: id
        });
    }
    handleShowCashDeskClosemodal(id) {
        this.setState({
            isCashDeskCloseModalShown: true,
            idCashDesk: id
        });
    }
    // handleCloseCashDesk(id){
    //     if (confirm("Bạn Có Muốn Đóng Quầy Này !")) {
    //         var today = new Date;
    //        var url = '/cashDesk/closeCashDesk';
    //          var bodyObject = {
    //        id : id,
    //        closeTime: today
    //    };
    //       return agent.asyncRequests.post(url, bodyObject
    //    ).then(function (res) {
    //             var result = res.body.resultData;
    //            if (result && !result.error) {
    //                toast.success("Đống Quầy Thành Công", { autoClose: 5000, position: toast.POSITION.TOP_RIGHT});
    //                window.location.reload(true);
    //            } else {
    //                toast.error("Có lỗi khi xóa dữ liệu. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
    //            }
    //        }, function (err) {
    //            toast.error("Không thể xóa dữ liệu đang được sử dụng từ màn hình khác! ", { autoClose: 15000 });
    //        });
    //    } else {
    //    }
    // }
    getCashDesk() {
       
         let setStateInRequest = (list) => {
            this.setState({
                listCashDesk: list
            })
        }
        return (agent.asyncRequests.get("/cashDesk/listAll").then(function(res) {
            var result = res.body.resultData;
            if (result) {
                
                
                setStateInRequest(result);
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + res.body.errorMessage, {
                    autoClose: 15000
                });
            }
        }, function(err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", {
                autoClose: 15000
            });
        }))
    }
    componentWillMount() {
        // this.updateListDashboardNotification();
        this.getCashDesk()
    };
    render() {
        const dataMyCashDesk = this.state.listCashDesk;
        var isShowButtonOpenCashDesk = this.state.isShowButtonOpenCashDesk;
        const {currentUser} = this.props;
        if (!dataMyCashDesk) {
         return <LoadingScreen></LoadingScreen>
        }else{
            var rowsMyCashDesk = dataMyCashDesk.map(item => {
           
                if(currentUser.id == item.cashierId && item.closeTime == null){
                    isShowButtonOpenCashDesk = false
                return (
                    <div className="col-sm-6 col-lg-4">
                    <div className="content-group">
                    <div className="panel-body bg-teal border-radius-top text-center">
                    <div className="content-group-sm">
                                            <h5 className="text-semibold no-margin-bottom">
                                            {item.cashier ? item.cashier.fullName : "N/A"}
                                            </h5>
    
                                            <span className="display-block">Thời Gian Mở Quầy <br /><small>{moment(item.openTime).format("DD/MM/YYYY HH:mm")}</small></span>
                                        </div>
    
                                        
    
                                        <ul className="list-inline no-margin-bottom">
                                            <li><a onClick={() => this.handleShowmodalCashWidrawal(item,item.initialAmount)} className="btn bg-teal-700 btn-rounded btn-icon"><i className="icon-coin-dollar"></i> Rút Tiền</a></li>
                                            <li><a onClick={() => this.handleShowCashDeskClosemodal(item.id)} className="btn bg-teal-700 btn-rounded btn-icon"><i className="icon-cross2"></i> Đóng Quầy</a></li>
                                            </ul>
                                    </div>
    
                                    <div className="panel panel-body no-border-top no-border-radius-top">
                                        
                                        <div className="form-group mt-5">
                                            <label className="text-semibold">Số Tiền Ban Đầu:</label>
                                            <span className="pull-right-sm">{item.closeAmount ? FormatterUtils.formatCurrency(item.closeAmount): FormatterUtils.formatCurrency(item.initialAmount)} VNĐ</span>
                                        </div>
    
                                        <div className="form-group">
                                            <label className="text-semibold">Số Tiền Thu Vào:</label>
                                            <span className="pull-right-sm">{item.saleAmount ? FormatterUtils.formatCurrency(item.saleAmount)  : "0"} VNĐ</span>
                                        </div>

                                        <div className="form-group">
                                            <label className="text-semibold">Số Tiền Rút Ra:</label>
                                            <span className="pull-right-sm">{item.withdrawalAmount ? FormatterUtils.formatCurrency(item.withdrawalAmount)  : "0"} VNĐ</span>
                                        </div>
    
                                        <div className="form-group no-margin-bottom">
                                            <span><center>Nội Dung Ghi Chú</center></span>
                                            <span className="text-muted"><center>{item.note ? item.note  : "N/A"}</center></span>
                                        </div>
                                    </div>
    
                                </div>
                               </div>
                        
                    );
                }
            });

            var buttonOpenNewDesk = isShowButtonOpenCashDesk ?   <a onClick={() => this.handleShowmodal()} className="btn bg-danger-400 btn-block"><i className="icon-lifebuoy position-left"></i> Mở Quầy</a>:null 
        }
       
       
        return (
            <div className="content-wrapper">
            <div className="page-header page-header-default">
                
                <div className="breadcrumb-line">
                    <ul className="breadcrumb">
                        <li><a href="#"><i className="icon-home2 position-left"></i> Home</a> </li>
                        <li className="active">Quầy Thu Ngân Của Tôi</li>                     
                    </ul>
                </div>
            </div>
            <div className="content">
                <div className="row center">

                {rowsMyCashDesk}
                {buttonOpenNewDesk}
                {this.state.isCashWidrawalModalShown ? <ModalCashWidrawal 
                    title= "Rút Tiền"
                    cashWidrawalDto={this.state.cashWidrawalDto}
                    initialAmountCheck={this.state.initialAmountCheck}
                    idCashWidrawal={this.state.idCashWidrawal} 
                    show={this.state.isCashWidrawalModalShown} 
                    onHide={this.handleHidemodal} /> : null
                }
                {this.state.isCashDeskModalShown ? <ModalCashDesk 
                    title= "Mở Quầy"
                    idCashDesk ={this.state.idCashDesk} 
                    show={this.state.isCashDeskModalShown} 
                    onHide={this.handleHidemodal} /> : null
                }    
                {this.state.isCashDeskCloseModalShown ? <ModalCashDeskClose 
                    title= "Đóng Quầy"
                    idCashDesk ={this.state.idCashDesk} 
                    show={this.state.isCashDeskCloseModalShown} 
                    onHide={this.handleHidemodal} /> : null
                }       
                </div>
            </div>
        </div>
         
        );
    }
}
export default translate('translations')(connect(mapStateToProps, mapDispatchToProps)(MyCashDesk));
