import qs from 'query-string';
import React from 'react';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Field, formValueSelector, reduxForm } from 'redux-form';
import { RenderDatePicker, RenderSelect } from '../../components/formInputs';
import agent from '../../services/agent';
import { FormatterUtils } from '../../utils/javascriptUtils';
import { QueuePrintService } from './QueuePrintService';
import moment from 'moment'

const selector = formValueSelector("QueueListByDepartment");
const mapStateToProps = state => {
    return {
        searchDate: selector(state, "searchDate"),
        departmentId: selector(state, "departmentId"),
    };
};
const mapDispatchToProps = dispatch => ({
});

class QueueListByDepartment extends React.Component {
    constructor() {
        super();
        this.state = {
            listQueue: [],
            isQueueModalShown: false,
            idQueue: null,
            listAllDepartment: [],
            departmentId: null
        }

        this.handleShowmodal = (id) => {
            this.setState({
                isQueueModalShown: true,
                idQueue: id
            });
        }
        this.handleHidemodal = () => {
            this.setState({ isQueueModalShown: false });
        };
        this.updateListByDate = this.updateListByDate.bind(this);
        this.updateListByDepartment = this.updateListByDepartment.bind(this);
        this.updateListQueue = this.updateListQueue.bind(this);

    };
    getlistAllDepartment() {
        let setStateInRequest = (list) => { this.setState({ listAllDepartment: list }) }
        return agent.DepartmentApi.listAllDepartment().then(function (res) {
            var result = res.resultData;
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    }

    updateListByDate(values) {
        const { departmentId } = this.props;
        let setStateInRequest = (list) => { this.setState({ listQueue: list }) }
        return (agent.asyncRequests.get('/queueNumber/search?departmentId=' + (departmentId ? departmentId : "ALL")
            + '&searchDate=' + moment(values ? values : new Date()).format("YYYY-MM-DD")).then(function (res) {
                var result = res.body.resultData;
                if (result) {
                    setStateInRequest(result);
                }
                else {
                    toast.info("Chưa có hàng chờ! ", { autoClose: 4000 });
                }
            }, function (err) {
                toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
            }))
    }
    updateListByDepartment(values) {
        const { searchDate } = this.props;
        let setStateInRequest = (list) => { this.setState({ listQueue: list }) }
        return (agent.asyncRequests.get('/queueNumber/search?departmentId=' + values
            + '&searchDate=' + moment(searchDate).format("YYYY-MM-DD")).then(function (res) {
                var result = res.body.resultData;
                if (result) {
                    setStateInRequest(result);
                }
                else {
                    toast.info("Chưa có hàng chờ! ", { autoClose: 4000 });
                }
            }, function (err) {
                toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
            }))
    }
    updateListQueue() {
        const { searchDate, departmentId } = this.props;
        let paramDepartmentId = 'ALL';
        departmentId ? paramDepartmentId = departmentId : paramDepartmentId;
        let paramDate = moment(new Date).format('YYYY-MM-DD')
        searchDate ? paramDate = moment(initialFormDate).format("YYYY-MM-DD") : paramDate
        let setStateInRequest = (list) => { this.setState({ listQueue: list }) }
        return (agent.asyncRequests.get('/queueNumber/search?departmentId=' + paramDepartmentId
            + '&searchDate=' + paramDate).then(function (res) {
                var result = res.body.resultData;
                if (result) {
                    setStateInRequest(result);
                }
                else {
                    toast.info("Chưa có hàng chờ! ", { autoClose: 4000 });
                }
            }, function (err) {
                toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
            }))
    }

    getConfigTable() {
        let setStateInRequest = (list) => { this.setState({ configTable: list }) }
        return agent.ConfigTableApi.getAllConfigTable().then(function (res) {
            var result = res.resultData[0];
            if (result) {
                setStateInRequest(result);
            } else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        });
    }

    componentWillMount() {
        this.updateListQueue();
        FormatterUtils.downloadImageDataUri('/assets/images/logo_timec.png', this, "imageLogo");
        return (
            this.getlistAllDepartment(),
            this.getConfigTable()
        )
    };

    render() {
        const data = this.state.listQueue;
        const t = this.props.t;
        var currentNo = 0;
        var optionDepartment = [{ label: "Tất Cả", value: "ALL" }];
        this.state.listAllDepartment.map(item => {
            optionDepartment.push({ label: item.name, value: item.id })
        })
        var imageLogo = this.state.imageLogo;
        var configTable = this.state.configTable;
        var page = qs.parse(this.props.location.search).page;
        if (!page) {
            page = 1;
        }
        var currentNo = ((page - 1) * 20);
        var rows = data.map(item => {
            currentNo++
            return (
                <tr key={item.id}>
                    {/* <td>{currentNo}</td> */}
                    <td>{item.theNumber}</td>
                    <td>{item.patient ? item.patient.fullName : null}</td>
                    <td>{item.queue ? (item.queue.department? item.queue.department.name : '') : '' }</td>
                    {/* <td>{t(item.type)}</td> */}
                    <td className="text-center footable-visible footable-last-column">
                        <ul className="icons-list">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="icon-menu9"></i>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-right">
                                    <li><a onClick={() => QueuePrintService.handlePrinter(item.id, imageLogo, configTable, "KB")}><i className="icon-printer"></i> In Số Khám </a></li>
                                </ul>
                            </li>
                        </ul>
                    </td>
                </tr>);
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
                    </div>
                </div>
                <div className="content">
                    <div className="row">
                        <div className="col col-md-12">
                            <div className="panel panel-flat">
                                <div className="panel-body">
                                    <div className="col col-md-4" style={{ paddingLeft: "20px" }}>
                                        <Field name="searchDate" placeholder="Ngày Khám"
                                            component={RenderDatePicker}
                                            onChangeAction={(values) => this.updateListByDate(values)}></Field>
                                    </div>
                                    <div className="col col-md-8" style={{ paddingLeft: "20px" }}>
                                        <Field name="departmentId" placeholder="Chọn Chuyên Khoa"
                                            options={optionDepartment} component={RenderSelect}
                                            onChangeAction={(values) => this.updateListByDepartment(values)}></Field>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="panel panel-flat">
                                <table className="table table-xxs table-bordered">
                                    <thead>
                                        <tr className="bg-teal">
                                            {/* <th >STT</th> */}
                                            <th >Số Hàng Đợi</th>
                                            <th >Tên Bệnh Nhân</th>
                                            <th >Chuyên Khoa</th>
                                            {/* <th >Trạng Thái</th> */}
                                            <th className="text-center footable-visible footable-last-column"><i className="icon-menu-open2"></i></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {rows}
                                    </tbody>
                                </table>
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
            form: 'QueueListByDepartment',
            destroyOnUnmount: true,
            enableReinitialize: true
        })(QueueListByDepartment)));