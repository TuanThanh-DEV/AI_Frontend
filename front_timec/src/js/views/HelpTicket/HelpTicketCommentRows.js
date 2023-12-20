import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { ScriptUtils } from '../../utils/javascriptUtils';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import ModalHelpTicket from './ModalHelpTicket';
import ModalHelpComment from '../HelpComment/ModalHelpComment';

class HelpTicketCommentRows extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listHelpCommentById: null,
            isHelpCommentModalShown: false,
            idHelpComment: null,
            idHelpTicket: null,
            isShowHelpCommentRows: false,
            isHelpTicketModalShow: false,
            listHelpComment: []
        }
        this.handleShowDepartment = this.handleShowDepartment.bind(this);
        this.handleShowmodalDepartment = this.handleShowmodalDepartment.bind(this);
        this.handleHidemodal = () => {
            this.setState({ isHelpTicketModalShow: false });
            this.props.handleHidemodal();
        };
        this.handleHidemodalDepartment = (idHospitalForDepartment) => {
            this.setState({ isHelpCommentModalShown: false });
            this.props.handleHidemodal();
            if (idHospitalForDepartment) {
                this.getListDepartment(idHospitalForDepartment);
            }
        };

    };

    getListDepartment(helpTicketObject) {
        let setStateInRequest = (list) => { this.setState({ listHelpComment: list }) }
        return (agent.asyncRequests.get("/helpComment/listAllByHelpTicketId?helpTicketId=" + helpTicketObject.id).then(function (res) {
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
    handleShowDepartment(helpTicketId) {
        let isShowHelpCommentRows = this.state.isShowHelpCommentRows;
        isShowHelpCommentRows = !this.state.isShowHelpCommentRows;
        this.setState({ isShowHelpCommentRows: isShowHelpCommentRows })
        if (isShowHelpCommentRows) {
            this.getListDepartment(helpTicketId);
        }
    }
    handleShowmodalDepartment(id) {
        this.setState({
            isHelpCommentModalShown: true,
            idHelpComment: id
        });
    }
    handleShowmodalHospital(id) {
        this.setState({
            isHelpTicketModalShow: true,
            idHelpTicket: id
        });
    }
    componentWillMount() {
    };

    deleteHelpComment(id) {
        if (confirm("Bạn có chắc sẽ xoá !")) {
            var url = `/helpComment/${id}`;
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
    render() {
        const { helpTicketObject, t } = this.props;
        var isShowHelpCommentRows = this.state.isShowHelpCommentRows;
        var dataHelpComment = this.state.listHelpComment;
        var helpCommentRows = [];
        var helpComment = [];
        var helpCommentCurrentNo = 0;
        if (dataHelpComment) {
            helpCommentRows = dataHelpComment.map(item => {
                helpCommentCurrentNo++;
                return (
                    <tr key={"department_" + item.id}>
                        <td>{helpCommentCurrentNo}</td>
                        <td colSpan="1">{item.created.fullName}</td>
                        <td colSpan="3">{item.content}</td>
                        <td><a onClick={() => this.deleteHelpComment(item.id)}><i className="icon-cross2"></i>Xóa</a></td>

                        {/* <td className="text-center footable-visible footable-last-column">
                            <ul className="icons-list">
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                        <i className="icon-menu9"></i>
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-right">
                                        <li><a onClick={() => this.handleShowmodalDepartment(item.id)}><i className="icon-pencil"></i>Chỉnh Sửa</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </td> */}
                    </tr>
                );

            })
            helpComment = [<tr className="success">
                <th data-toggle="true">STT</th>
                <th colSpan="1" data-toggle="true">Nguười trả lời</th>
                <th colSpan="3" data-toggle="true">Câu trả lời</th>
                <th className="text-center footable-visible footable-last-column" style={{ width: '10%' }}><i className="icon-menu-open2"></i></th>

            </tr>
            ].concat(isShowHelpCommentRows ? helpCommentRows : null);
        }

        // currentNo++
        return (
            [<tr className="bg-success-300" key={helpTicketObject.id}>
                {isShowHelpCommentRows ? null : <td><button className="bg-info-600 icon-plus22" onClick={() => this.handleShowDepartment(helpTicketObject)}></button></td>}
                {isShowHelpCommentRows ? <td><button className="bg-info-600 icon-dash" onClick={() => this.handleShowDepartment(helpTicketObject)}></button></td> : null}
                <td>{helpTicketObject.reporter ? helpTicketObject.reporter.fullName : null}</td>
                <td>{helpTicketObject.question}</td>
                <td>{helpTicketObject.assignee ? helpTicketObject.assignee.fullName : null}</td>
                <td>{helpTicketObject.status}</td>
                <td><a onClick={() => this.handleShowmodalDepartment()}><i className="icon-reply"></i> Trả lời</a></td>
                {
                    this.state.isHelpTicketModalShow ? <ModalHelpTicket
                        title={this.state.idHelpTicket ? "Chỉnh sửa Phòng Khám" : "Thêm Mới Phòng Khám"}
                        idHelpTicket={this.state.idHelpTicket}
                        show={this.state.isHelpTicketModalShow}
                        onHide={this.handleHidemodal}
                        handleShowmodal={this.handleShowmodal()}
                        updateListHelpTicket={this.props.updateListHelpTicket}
                    /> : null
                }
                {
                    this.state.isHelpCommentModalShown ? <ModalHelpComment
                        title={this.state.idHelpComment ? "Chỉnh sửa Chuyên Khoa" : "Thêm Mới Chuyên Khoa"}
                        idHelpComment={this.state.idHelpComment}
                        show={this.state.isHelpCommentModalShown}
                        onHide={(idHospitalForDepartment) => this.handleHidemodalDepartment(idHospitalForDepartment)}
                        idHospitalForDepartment={helpTicketObject.id} /> : null
                }
            </tr >].concat(isShowHelpCommentRows ? helpComment : null)

        );
    }
}
export default translate('translations')(HelpTicketCommentRows);