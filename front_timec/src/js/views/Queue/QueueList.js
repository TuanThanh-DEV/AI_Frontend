import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { ScriptUtils } from '../../utils/javascriptUtils';
import TablePagination from '../../components/TablePagination';
import agent from '../../services/agent';
import ModalQueue from './ModalQueue';
import moment from 'moment'
import SecuredComponent from '../../components/SecuredComponent';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import QueueTableGroup from "./QueueTableGroup";
import { LoadingScreen } from '../../components/commonWidgets';


class QueueList extends React.Component {
    constructor() {
        super();
        this.state = {
            listQueue: [],
            isQueueModalShown: false,
            idQueue: null
        }
        this.updateListQueue = () => {
            var search = qs.parse(this.props.location.search).search;
            var page = qs.parse(this.props.location.search).page;
            let setStateInRequest = (list) => { this.setState({ listQueue: list }) }
            return agent.QueueApi.listQueue(search, page
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
                isQueueModalShown: true,
                idQueue: id
            });
        }
        this.handleHidemodal = () => {
            this.setState({ isQueueModalShown: false });
            this.updateListQueue();
        };

    };




    componentWillMount() {
        this.updateListQueue();

    };

    deleteQueue(id) {
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
                <QueueTableGroup key={"QueueList" + item.id} onReloadQueue={this.updateListQueue} currentNo={currentNo} queueObject={item}></QueueTableGroup>
            );
        });

        return (
            <div className="content-wrapper">
                <div className="page-header page-header-default">
                    <div className="breadcrumb-line">
                        <ul className="breadcrumb">
                            <li><a href=""><i className="icon-home2 position-left"></i> Home</a> </li>
                            <li className="active">Quản Lý Lịch Khám</li>
                            <li className="active">Hàng Chờ</li>
                        </ul>
                        <div className="heading-elements">
                            <div className="heading-btn-group">
                                <Link className="btn bg-primary" to={"/editQueueNumber/new"}>Tiếp nhận</Link>
                                <button className="btn bg-green" onClick={() => this.handleShowmodal()}>Tạo Hàng Chờ Khám</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div>
                                {/* <form className="form-horizontal" role="form" onSubmit={handleSubmit(this.setPermanetCache)}>
                                    <div className="row">
                                        <div className="page-header"> </div>
                                    </div>
                                    <div className="row">
                                        <div className="col col-md-12">
                                            <div className="col col-md-4">
                                                <div className="col col-md-6" style={{ paddingLeft: "20px" }}>
                                                    <Field label="Từ Ngày" name="fromDate" component={RenderDatePicker}></Field>
                                                </div>
                                                <div className="col col-md-6" style={{ paddingLeft: "20px" }}>
                                                    <Field label="Đến Ngày" name="toDate" component={RenderDatePicker}></Field>
                                                </div>
                                            </div>
                                            <div className="col col-md-3" style={{ paddingLeft: "20px" }}>
                                                <Field name="status" label="Trạng Thái" options={optionStatus} component={RenderSelect}></Field>
                                            </div>
                                            <div className="col col-md-3" style={{ paddingLeft: "20px" }}>
                                                <Field label="Tìm Kiếm" name="search" placeholder="Tìm Tên, Mã Bệnh Nhân..." autoFocus={true} component={RenderInputWithDiv}></Field>
                                            </div>
                                            <div className="col col-md-1" style={{ paddingLeft: "10px", paddingTop: "28px" }}>
                                                <button type="submit" className="btn bg-success btn-xlg">Tìm</button>
                                            </div>
                                            <div className="col col-md-1" style={{ paddingLeft: "10px", paddingTop: "28px" }}>
                                                <button type="button" className="btn bg-success btn-xlg" onClick={this.handleFindAll}>Làm mới</button>
                                            </div>
                                        </div>
                                    </div>
                                </form> */}
                            </div>


                            <div className="panel panel-flat">
                                <table className="table table-xxs table-bordered">
                                    <thead>
                                        <tr className="bg-teal">
                                            <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                            <th data-toggle="true">STT</th>
                                            <th data-toggle="true">Tên Chuyên Khoa </th>
                                            <th data-toggle="true">Tên Bác Sĩ</th>
                                            <th data-toggle="true">Tên</th>
                                            <th data-toggle="true">Số Thứ Tự Hiện Tại</th>
                                            <th data-toggle="true">Số Thứ Tự Tiếp Theo</th>
                                            <th data-toggle="true">Hàng Đợi Tối Đa</th>
                                            <th data-toggle="true">Ngày Hiện Tại</th>
                                            <th data-toggle="true"> Trạng Thái </th>
                                            {/* <th className="text-center footable-visible footable-last-column" style={{ width: '150px' }}><i className="icon-menu-open2"></i></th> */}
                                            <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows}
                                    </tbody>
                                </table>
                            </div>
                            {this.state.isQueueModalShown ? <ModalQueue
                                title="Hàng Chờ Khám Bệnh"
                                idQueue={this.state.idQueue}
                                show={this.state.isQueueModalShown}
                                onHide={this.handleHidemodal} /> : null
                            }
                            <TablePagination data={data} baseUrl="/listQueue" />
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default translate('translations')(QueueList);