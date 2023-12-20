import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import agent from '../../services/agent';
import moment from 'moment'


class Dashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            listNotification: null,
            listAppointment: null,
            countAppointment: 0,
            countDashboardNotification: 0
        }

    };

    getCountAppointment() {
        let setStateInRequest = (number) => {
            this.setState({
                countAppointment: number
            })
        }
        return (agent.asyncRequests.get("/appointment/count").then(function (res) {
            var result = res.body.resultData;
            if (result || result == 0) {
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
    getCountDashboardNotification() {
        let setStateInRequest = (number) => {
            this.setState({
                countDashboardNotification: number
            })
        }
        return (agent.asyncRequests.get("/dashboardNotification/count").then(function (res) {
            var result = res.body.resultData;
            if (result || result == 0) {
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
    getNotification() {
        let setStateInRequest = (list) => {
            this.setState({
                listNotification: list
            })
        }
        return (agent.asyncRequests.get("/dashboardNotification/listAllByDay").then(function (res) {
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
    getAppointment() {
        let setStateInRequest = (list) => {
            this.setState({
                listAppointment: list
            })
        }
        return (agent.asyncRequests.get("/appointment/listByCurrentUser").then(function (res) {
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
        // this.updateListDashboardNotification();
        this.getNotification()
        this.getAppointment()
        this.getCountAppointment()
        this.getCountDashboardNotification()
    };
    render() {

        const dataNotification = this.state.listNotification;
        const dataAppointment = this.state.listAppointment;
        const countAppointment = this.state.countAppointment;
        const countDashboardNotification = this.state.countDashboardNotification;
        if (!dataNotification) {
            return null;
        }
        if (!dataAppointment) {
            return null;
        }
        
        var rowsNotification = dataNotification.map(item => {

            return (
                <li className="media" key={item.id}>
                    <div className="media-left"> <img src="/assets/images/icon-thong-bao.png" className="img-circle img-xs" alt="" /> <span className="badge bg-danger-400 media-badge">{item.id}</span> </div>
                    <div className="media-body">
                        <span style={{ color: "#039296" }}>{item.title}</span>
                        <span className="media-annotation pull-right">{moment(item.fromDate).format("DD/MM/YYYY")} - {moment(item.toDate).format("DD/MM/YYYY")}</span>
                        <span className="display-block text-muted">{item.description}</span> </div>
                </li>
            );

        }





        );
        var rowAppointment = dataAppointment.map(item => {

            return (
                <li className="media" key={item.id}>
                    <div className="media-left"> <img src="/assets/images/doctor-icon.png" className="img-circle img-xs" alt="" /> <span className="badge bg-danger-400 media-badge">{item.id}</span> </div>
                    <div className="media-body">
                        Bạn Có Cuộc Hẹn Với Bệnh Nhân <span style={{ color: "#039296" }}>{item.patient ? item.patient.fullName : null}</span> Vào Lúc <span style={{ color: "#2E9AFE" }}>{moment(item.appointDate).format("hh:mm DD/MM/YYYY")}</span>
                        <span className="media-annotation pull-right">Tại {item.hospital ? item.hospital.name : null}</span>
                        <span className="display-block text-muted">{item.status}</span> </div>
                </li>
            );

        }





        );
        return (
            <div className="content-wrapper">
                <div className="page-header page-header-default">
                    <div className="breadcrumb-line">
                        <ul className="breadcrumb">
                            <li><a href="#"><i className="icon-home2 position-left"></i> Home</a> </li>
                            <li className="active">Dashboard</li>
                        </ul>
                    </div>
                </div>
                <div className="content">
                    <div className="row">

                        <div className="col-lg-7">
                            <div style={{ height: "375px", overflow: "auto" }} className="panel panel-flat">
                                <div className="panel-heading">
                                    <h6 className="panel-title">Thông Báo Mới Nhất</h6>
                                    <div className="heading-elements"> <span className="label bg-teal heading-text">{countDashboardNotification}</span>
                                        <ul className="icons-list">
                                            <li className="dropdown"> <a href="#" className="dropdown-toggle" data-toggle="dropdown"><i className="icon-menu7"></i> <span className="caret"></span></a> </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="tab-content">
                                    <div className="tab-pane active fade in has-padding" id="messages-tue">
                                        <ul className="media-list"> {rowsNotification} </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-5">
                            <div style={{ height: "375px", overflow: "auto" }} className="panel panel-flat">
                                <div className="panel-heading">
                                    <h6 className="panel-title">Cuộc Hẹn Hôm Nay</h6>
                                    <div className="heading-elements"> <span className="label bg-teal heading-text">{countAppointment}</span>
                                        <ul className="icons-list">
                                            <li className="dropdown"> <a href="#" className="dropdown-toggle" data-toggle="dropdown"><i className="icon-menu7"></i> <span className="caret"></span></a> </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="tab-content">
                                    <div className="tab-pane active fade in has-padding" id="messages-tue">
                                        <ul className="media-list"> {rowAppointment} </ul>
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
export default translate('translations')(Dashboard);