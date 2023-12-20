import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { ScriptUtils } from '../../utils/javascriptUtils';
import { connect } from 'react-redux';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import { Link } from 'react-router-dom';
import SecuredComponent from '../../components/SecuredComponent';
import ModalHelpTicket from './ModalHelpTicket';
import moment from 'moment'
import HelpTicketCommentRows from './HelpTicketCommentRows';
import { LoadingScreen } from '../../components/commonWidgets';



class HelpTicketList extends React.Component {
    constructor() {
        super();
        this.state = {
            listQueue: [],
            isHelpTicketModalShown: false,
            idHelpTicket: null
        }
        this.updateListHelpTicket = () => {
            var search = qs.parse(this.props.location.search).search;
            var page = qs.parse(this.props.location.search).page;
            let setStateInRequest = (list) => { this.setState({ listQueue: list }) }
            return agent.HelpTicketApi.listHelpTicket(search, page
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
        this.handleShowmodal = (id) => {
            this.setState({
                isHelpTicketModalShown: true,
                idHelpTicket: id
            });
        }
        this.handleHidemodal = () => {
            this.setState({ isHelpTicketModalShown: false });
            this.updateListHelpTicket();
        };

    };



    componentWillMount() {
        this.updateListHelpTicket();

    };


    render() {
        var search = qs.parse(this.props.location.search).search;
        const data = this.state.listQueue;

        var currentNo = 0;
        var page = qs.parse(this.props.location.search).page;
        if (!page) {
            page = 1;
        }
        var currentNo = ((page - 1) * 20);
        if (!data.content) {
            return <LoadingScreen></LoadingScreen>
        }
        var rows = data.content.map(item => {
            currentNo++
            return (
                <HelpTicketCommentRows key={"QueueList" + item.id} onReloadQueue={this.updateListHelpTicket} currentNo={currentNo} helpTicketObject={item}></HelpTicketCommentRows>
            );
        });

        return (
            <div className="content-wrapper">
                <div className="content">
                    <div className="page-header">
                        <h4>
                            <i className=" icon-paragraph-justify2 position-left"></i>
                            <span className="text-semibold">Hàng Chờ </span>
                            <span className="pull-right">
                                <button className="btn bg-green" onClick={() => this.handleShowmodal()}>Yêu Cầu Hỗ Trợ</button>
                            </span>

                        </h4>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="panel panel-flat">
                                <div className="panel-body">
                                    {/* <form className="main-search" role="form">
                                        <div className="input-group content-group">
                                            <div className="has-feedback has-feedback-left">
                                                <input type="text" className="form-control input-xlg" placeholder="Tìm kiếm theo tên..." name="search" defaultValue={search} autoFocus={true} />
                                                <div className="form-control-feedback">
                                                    <i className="icon-search4 text-muted text-size-base"></i>
                                                </div>
                                            </div>
                                            <div className="input-group-btn">
                                                <button type="submit" className="btn bg-teal btn-xlg">Tìm</button>
                                            </div>
                                        </div>
                                    </form>    */}
                                    <div className="panel panel-flat">
                                        <table className="table table-xxs table-bordered">
                                            <thead>
                                                <tr className="bg-teal">
                                                    <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu"></i></th>
                                                    <th data-toggle="true">Người cần Hỗ trợ </th>
                                                    <th data-toggle="true">Nội dung cần hỗ trợ </th>
                                                    <th data-toggle="true">Người được giao</th>
                                                    <th data-toggle="true">Trạng Thái</th>
                                                    <th className="text-center footable-visible footable-last-column" style={{ width: '10%' }}><i className="icon-menu-open2"></i></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {rows}
                                            </tbody>
                                        </table>
                                    </div>
                                    {this.state.isHelpTicketModalShown ? <ModalHelpTicket
                                        title="Thêm Mới Yêu Cầu"
                                        idHelpTicket={this.state.idHelpTicket}
                                        show={this.state.isHelpTicketModalShown}
                                        onHide={this.handleHidemodal} /> : null
                                    }
                                    <TablePagination data={data} baseUrl="/listQueue" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default translate('translations')(HelpTicketList);