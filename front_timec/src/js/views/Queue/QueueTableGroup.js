import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { ScriptUtils } from '../../utils/javascriptUtils';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import moment from 'moment'
import SecuredComponent from '../../components/SecuredComponent';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import QueueNumberRows from './QueueNumberRows';
import ModalQueue from './ModalQueue';
import ModalQueueNumber from '../QueueNumber/ModalQueueNumber';


class QueueTableGroup extends React.Component {
    constructor() {
        super();
        this.state = {
            // listQueue: []
            listQueueNumber: [],
            isShowQueueNumber: false,
            listQueueNumber: [],
            isQueueModalShown: false,
            isQueueNumberModalShown: false,
            idQueue: null,
            idQueueNumber: null,
            queueObject: null
        }
        this.getListQueueNumberFollowByQueueId = this.getListQueueNumberFollowByQueueId.bind(this);
        this.handleShowQueueNumberModal = this.handleShowQueueNumberModal.bind(this);
        this.reloadListQueueNumber = () => {
            const { queueObject } = this.props;
            var status = "TODO"
            this.setState({
                isShowQueueNumber: true
            })

            let setStateInRequest = (list) => { this.setState({ listQueueNumber: list }) }
            return agent.asyncRequests.get('/queueNumber/listFindByQueueIdAndStatus?queueId=' + queueObject.id + "&status=" + status
            ).then(function (res) {
                var result = res.body.resultData;
                if (result) {
                    setStateInRequest(result);
                } else {
                    toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại"
                    + " Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
            });
        }

        this.handleHidemodal = (status) => {
            this.setState({
                isQueueModalShown: false,
                isQueueNumberModalShown: false
            });
            this.props.onReloadQueue();
            // this.reloadListQueueNumber();
            if (status != null && status == "CLOSED") {
                this.handleHideQueueNumber();
            }
        };

        this.handleShowmodal = (id) => {
            this.setState({
                isQueueModalShown: true,
                idQueue: id
            });
        }

        this.deleteQueue = (id) => {
            if (confirm("Bạn có chắc sẽ xoá !")) {
                var url = `/queue/${id}`;
                return agent.asyncRequests.del(url
                ).then(function (res) {
                    var result = res.body.resultData;
                    if (result && !result.error) {
                        alert("Xoá Thành Công !");
                        window.location.reload(true);
                    } else {
                        toast.error("Có lỗi khi xóa dữ liệu. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
                    }
                }, function (err) {
                    toast.error("Không thể xóa dữ liệu đang được sử dụng từ màn hình khác! ", { autoClose: 15000 });
                });
            } else {
            }
        }
    };

    handleShowQueueNumberModal(queueObject) {
        this.setState({
            isQueueNumberModalShown: true,
            idQueueNumber: null,
            queueObject: queueObject ? queueObject : null
        })
    }

    getListQueueNumberFollowByQueueId(QueueObj) {
        if (QueueObj.status == "OPEN" || QueueObj.status == "SUSPENDED") {
            var status = "TODO"
            this.setState({
                isShowQueueNumber: true
            })

            let setStateInRequest = (list) => { this.setState({ listQueueNumber: list }) }
            return agent.asyncRequests.get('/queueNumber/listFindByQueueIdAndStatus?queueId=' + QueueObj.id + "&status=" + status
            ).then(function (res) {
                var result = res.body.resultData;
                if (result) {
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

    handleHideQueueNumber() {
        this.setState({
            isShowQueueNumber: false
        })
    }

    render() {
        const { currentNo, queueObject, t } = this.props;
        const dateQueueNumber = this.state.listQueueNumber;
        var isShowQueueNumber = this.state.isShowQueueNumber;
        var currentNoQueueNumber = 0;
        var queueNumberRows = dateQueueNumber.map(item => {
            currentNoQueueNumber++;
            return <QueueNumberRows key={"QueueNumber" + item.id} currentNoQueueNumber={currentNoQueueNumber} onReloadQueue={this.props.onReloadQueue} onReloadQueueNumber={this.reloadListQueueNumber} queueObject={queueObject} queueNumberObject={item}> </QueueNumberRows>
        })

        return (
            [<tr key={queueObject.id}>
                {isShowQueueNumber ? null : <td><button className="bg-info-600 icon-plus22" onClick={() => this.getListQueueNumberFollowByQueueId(queueObject)}></button></td>}
                {isShowQueueNumber ?
                    <td><button className="bg-info-600 icon-dash" onClick={() => this.handleHideQueueNumber()}></button></td> : null}
                <td>{currentNo}</td>
                <td>{queueObject.department.name}</td>
                <td>{queueObject.caller.fullName}</td>
                <td>{queueObject.name}</td>
                <td>{queueObject.currentNumber}</td>
                <td>{queueObject.nextNumber}</td>
                <td>{queueObject.maxNumber}</td>
                <td>{moment(queueObject.createdDate).format("DD/MM/YYYY")}</td>
                <td>{t(queueObject.status)}</td>
                {/* <td>
                    {queueObject.status == "OPEN" ? <a onClick={() => this.handleShowQueueNumberModal(queueObject)}>Tiếp nhận</a> :""}
                </td> */}
                <td className="text-center footable-visible footable-last-column">
                    <ul className="icons-list">
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                <i className="icon-menu9"></i>
                            </a>
                            <ul className="dropdown-menu dropdown-menu-right">
                                {/* <li><Link to={"/editPrescription/" + queueObject.id}><i className="icon-pencil"></i>Khám bệnh</Link></li> */}
                                <li><a onClick={() => this.handleShowmodal(queueObject.id)}><i className="icon-pencil"></i>Chỉnh Sửa</a></li>
                                <li><a onClick={() => this.deleteQueue(queueObject.id)}><i className="icon-cross2"></i>Xóa</a></li>
                            </ul>
                        </li>
                    </ul>
                </td>
                {this.state.isQueueModalShown ? <ModalQueue
                    title="Hàng Chờ Khám Bệnh"
                    idQueue={this.state.idQueue}
                    show={this.state.isQueueModalShown}
                    onHide={(status) => this.handleHidemodal(status)} /> : null
                }
                {this.state.isQueueNumberModalShown ? <ModalQueueNumber
                    title="Số Khám Bệnh"
                    idQueueNumber={this.state.idQueueNumber}
                    show={this.state.isQueueNumberModalShown}
                    onHide={this.handleHidemodal}
                    queueObject={this.state.queueObject}
                /> : null
                }
            </tr>].concat(isShowQueueNumber ? queueNumberRows : null)
        );
    }
}
export default translate('translations')(QueueTableGroup);