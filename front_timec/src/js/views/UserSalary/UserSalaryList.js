import React from 'react';
import qs from 'query-string';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { Field, formValueSelector } from 'redux-form';
import { ScriptUtils } from '../../utils/javascriptUtils';
import agent from '../../services/agent';
import { RenderSelect } from '../../components/formInputs';
import moment from 'moment';
import { PermanentCacheService } from '../../services/middleware';
import { connect } from 'react-redux';
import dateFns from 'date-fns';
import ModalUserSalary from './ModalUserSalary';
import FormAddSalary from '../AddSalary/FormAddSalary';
import FormMinusSalary from '../MinusSalary/FormMinusSalary';

const CalendarHeader = (props) => {
    return (
        <div>
            <br />
            <div className="btn-group">
                <button type="button" className="btn btn-primary" onClick={props.prev}>&lt;</button>
                <button type="button" className="btn btn-primary" onClick={props.today}>Tháng Hiện Tại</button>
                <button type="button" className="btn btn-primary" onClick={props.next}>&gt;</button>
            </div>
            <h3>Tháng {dateFns.format(props.currentDate, 'MM / YYYY')}</h3>
        </div>
    )
}

const selector = formValueSelector('UserSalaryList');

const mapStateToProps = state => {
    return {
        userId: selector(state, "userId"),
    };
};

const mapDispatchToProps = dispatch => ({
    updateField: (fieldName, value) =>
        dispatch({
            meta: { form: "UserSalaryList", field: fieldName },
            payload: value,
            type: "@@redux-form/CHANGE"
        }),
});

class UserSalaryList extends React.Component {
    constructor() {
        super();
        let initialDate = new Date()
        initialDate = PermanentCacheService.getItem("selected_month") ? new Date(PermanentCacheService.getItem("selected_month")) : dateFns.setDate(initialDate, 1)
        this.state = {
            currentDate: initialDate,
            listUserSalary: [],
            listAllUser: [],
            isUserSalaryModalShown: false,
            idUserSalary: null,
            editType: null,
            userId: null,
            isShownExportExcelModal: false,
            userSalaryDto: null,
            userDto: null,
            isShowFormAddSalary: false,
            isShowFormMinusSalary: false,

        }
        this.handleShowmodal = this.handleShowmodal.bind(this);
        this.handleExportExcel = this.handleExportExcel.bind(this);
        this.handleHidemodal = () => {
            this.setState({
                isUserSalaryModalShown: false,
                isShownExportExcelModal: false,
                isShowFormAddSalary: false,
                isShowFormMinusSalary: false,
                editType: null
            });
            this.updateListUserSalary(this.state.userId);
        };
        this.prev = () => {
            const prev = dateFns.subMonths(this.state.currentDate, 1)
            PermanentCacheService.setItem("selected_month", prev);
            this.setState({ currentDate: prev }, () => {
                this.updateListUserSalary(this.state.userId);
            })
        }
        this.next = () => {
            const next = dateFns.addMonths(this.state.currentDate, 1)
            PermanentCacheService.setItem("selected_month", next);
            this.setState({ currentDate: next }, () => {
                this.updateListUserSalary(this.state.userId);
            })
        }
        this.today = () => {
            let today = new Date()
            today = dateFns.setDate(today, 1)
            PermanentCacheService.setItem("selected_month", today);
            this.setState({ currentDate: today }, () => {
                this.updateListUserSalary(this.state.userId);
            })
        }
    };
    updateListUserSalary(userId) {
        const currentDate = this.state.currentDate;
        var month = moment(currentDate).format("M");
        var year = moment(dateFns.startOfMonth(currentDate)).format("YYYY");
        if (userId && userId == "ALL") {
            let setStateInRequest = (list) => {
                this.setState({ userId: userId, listUserSalary: [] });
                this.setState({ listUserSalary: list });
            }
            return (agent.asyncRequests.get('/userSalary/listAllUserSalaryByMonthAndYear?month='
                + month + '&year=' + year).then(function (res) {
                    var result = res.body.resultData;
                    if (result) {
                        setStateInRequest(result);
                    }
                    else {
                        toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
                    }
                }, function (err) {
                    toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
                }))
        } else if (userId && userId != "ALL") {
            let setStateInRequest = (list) => {
                this.setState({ userId: userId });
                this.setState({ listUserSalary: list });
            }
            return (agent.asyncRequests.get('/userSalary/listFindByUserIdAndMonthAndYear?userId='
                + userId + '&month=' + month + '&year=' + year).then(function (res) {
                    var result = res.body.resultData;
                    if (result) {
                        var obj = [];
                        obj.push(result)
                        setStateInRequest(obj);
                    }
                    else {
                        toast.info("Chưa chấm công cho nhân viên này! ", { autoClose: 4000 });
                        setStateInRequest([]);
                    }
                }, function (err) {
                    toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
                }))
        }
    }
    componentWillMount() {
        const { updateField, userId } = this.props;
        // try get from property, if not exist, try from query param
        var paramUserSalaryId = qs.parse(this.props.location.search).userId;
        if (paramUserSalaryId) {
            updateField("userId", paramUserSalaryId);
            this.updateListUserSalary(paramUserSalaryId);
        } else if (userId) {
            this.updateListUserSalary(userId);
        } else if (!userId) {
            this.updateListUserSalary('ALL');
        }
        return (
            this.getListUserSalary()
        )
    };
    getListUserSalary() {
        let setStateInRequest = (list) => { this.setState({ listAllUser: list }) }
        return (agent.asyncRequests.get('/userConfig/listAllUserAndHass').then(function (res) {
            var result = res.body.resultData;
            if (result) {
                setStateInRequest(result);
            }
            else {
                toast.error("Có lỗi khi tải dữ liệu. Lỗi: " + res.body.errorMessage, { autoClose: 15000 });
            }
        }, function (err) {
            toast.error("Có lỗi khi tải dữ liệu. Quý khách vui lòng kiểm tra kết nối internet và thử lại. Hoặc liên hệ quản trị viên.", { autoClose: 15000 });
        }))
    }

    componentDidUpdate() {
        ScriptUtils.loadFootable();
    }

    //Delete UserSalary Function
    deleteUserSalary(id) {

        if (confirm("Bạn có chắc sẽ xoá:")) {
            var url = `/userSalary/${id}`;
            return agent.asyncRequests.del(url
            ).then(function (res) {
                var result = res.body.resultData;
                if (result && !result.error) {
                    alert("Xoá Thành Công:");
                    window.location.reload(true);
                } else {
                    toast.error("Có lỗi khi xóa dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
                }
            }, function (err) {
                toast.error("Không thể xóa dữ liệu đang được sử dụng từ màn hình khác! ", { autoClose: 15000 });
            });
        } else {
        }
    }

    handleShowFormAddSalary(id) {
        this.setState({
            isShowFormAddSalary: true,
            idUserSalary: id
        })
    }
    handleShowFormMinusSalary(id) {
        this.setState({
            isShowFormMinusSalary: true,
            idUserSalary: id
        })
    }

    handleShowmodal(editType, id, userDto) {
        this.setState({
            isUserSalaryModalShown: true,
            idUserSalary: id,
            editType: editType,
            userDto: userDto
        });
    }
    handleExportExcel(userSalaryDto) {
        this.setState({
            isShownExportExcelModal: true,
            userSalaryDto: userSalaryDto
        })
    }
    render() {
        const currentDate = new Date(this.state.currentDate.getTime());
        var page = qs.parse(this.props.location.search).page;
        const data = this.state.listUserSalary;
        if (!data) {
            return null;
        }
        if (!page) {
            page = 1;
        }

        var currentNo = ((page - 1) * 20);
        var rows = data.map(item => {

            currentNo = currentNo + 1;
            return (
                <tr key={item.id}>
                    {/* <td><a onClick={() => this.handleExportExcel(item)}><i className="icon-file-excel"></i></a></td> */}
                    <td></td>
                    <td>{currentNo}</td>
                    <td>{item.user ? item.user.code : null}</td>
                    <td>{item.user ? item.user.fullName : null}</td>
                    <td>{item.user ? item.user.position : null}</td>
                    <td>{item.totalTimeAttendance}</td>
                    <td>{item.grossSalary}</td>
                    <td>
                        {item.otherSupportFee}
                        <span style={{ paddingLeft: "5px" }}>
                            <a onClick={() => this.handleShowFormAddSalary(item.id)}><i className="icon-pencil4"></i></a>
                        </span>


                    </td>
                    <td>
                        {item.otherMinusFee}
                        <span style={{ paddingLeft: "5px" }}>
                            <a onClick={() => this.handleShowFormMinusSalary(item.id)}><i className="icon-pencil4"></i></a>
                        </span>

                    </td>
                    {/* <td>{item.birthdayFee}</td>
                    <td>{item.holidayFee}</td>
                    <td>{item.lunchFee}</td>
                    <td>{item.diligenceFee}</td>
                    <td>{item.additional}</td>
                    <td>{item.otherSupportFee}</td>
                    <td>{item.inssurance}</td>
                    <td>{item.penaltyFee}</td>
                    <td>{item.incomeTax}</td>
                    <td>{item.otherMinusFee}</td> */}
                    <td>{item.netSalary}</td>
                    <td>{item.note}</td>
                    <td className="text-center footable-visible footable-last-column">
                        <ul className="icons-list">
                            <li className="dropdown">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <i className="icon-menu9"></i>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-right">
                                    <li><a onClick={() => this.handleShowmodal("grossSalaryEdit", item.id, item.user)}><i className="icon-pencil4"></i>Chỉnh Sửa Tiền Lương Theo Giờ</a></li>
                                    {/* <li><a onClick={() => this.handleShowmodal ("supportFeeEdit",item.id,item.user)}><i className="icon-pencil4"></i>Chỉnh Sửa Các Khoản Cộng</a></li> */}
                                    {/* <li><a onClick={() => this.handleShowmodal("minusFeeEdit",item.id, item.user)}><i className="icon-pencil4"></i>Chỉnh Sửa Các Khoản Trừ</a></li> */}
                                </ul>
                            </li>
                        </ul>
                    </td>
                </tr>);
        });
        const wrapperStyle = {
            height: '100%',
            width: '100%'
        }
        var dataUser = this.state.listAllUser;
        var optionUser = [{ label: "Tất Cả", value: "ALL" }];
        if (dataUser) {
            dataUser.map(item => {
                optionUser.push({ label: item.user.fullName, value: item.user.id })
            })
        }
        return (

            <div className="content-wrapper">
                <div className="page-header page-header-default">
                    <div className="breadcrumb-line">
                        <ul className="breadcrumb">
                            <li><a href=""><i className="icon-home2 position-left"></i> Home</a> </li>
                            <li className="active">Chấm Công</li>
                            <li className="active">Danh Sách Lương Khối Văn Phòng</li>
                        </ul>

                    </div>
                </div>
                <div className="content">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="panel panel-flat">

                                <div className="panel-body">
                                    <div style={{ height: '100%', width: '100%' }} className="input-group content-group">
                                        <div>
                                            <span style={wrapperStyle}>
                                                <CalendarHeader
                                                    currentDate={currentDate}
                                                    next={this.next}
                                                    prev={this.prev}
                                                    today={this.today} />
                                            </span>

                                            <br style={{ lineHeight: '100px' }} />
                                            <Field name="userId" placeholder="Chọn Nhân Viên"
                                                options={optionUser} component={RenderSelect}
                                                onChangeAction={(userId) => this.updateListUserSalary(userId)}></Field>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {this.state.isUserSalaryModalShown ? <ModalUserSalary title="Nhân Viên" idUserSalary={this.state.idUserSalary} userDto={this.state.userDto} editType={this.state.editType} show={this.state.isUserSalaryModalShown} onHide={this.handleHidemodal} /> : null}
                            {this.state.isShowFormAddSalary ? <FormAddSalary title="Các Khoản Cộng Khác" idUserSalary={this.state.idUserSalary} show={this.state.isShowFormAddSalary} onHide={this.handleHidemodal} /> : null}
                            {this.state.isShowFormMinusSalary ? <FormMinusSalary title="Các Khoản Trừ Khác" idUserSalary={this.state.idUserSalary} show={this.state.isShowFormMinusSalary} onHide={this.handleHidemodal} /> : null}

                            <div style={{ overflowX: 'auto' }} className="panel panel-flat">
                                <table className="table table-bordered table-xxs">
                                    <thead>
                                        <tr className="bg-teal">
                                            <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                            <th data-toggle="true">STT</th>
                                            <th data-toggle="phone">Mã Nhân Viên</th>
                                            <th data-toggle="phone">Họ Và tên</th>
                                            <th data-toggle="phone">Chức Vụ</th>
                                            <th data-toggle="phone" width="5%">Giờ Công Thực Tế</th>
                                            <th data-toggle="phone" width="10%">Lương Theo Giờ</th>
                                            <th data-toggle="phone"><center>Các Khoản Cộng</center></th>
                                            <th data-toggle="phone"><center>Các Khoản Trừ</center></th>
                                            <th data-toggle="phone" width="10%">Thực Lĩnh</th>
                                            <th data-toggle="phone">Ghi Chú</th>
                                            <th className="text-center footable-visible footable-last-column" style={{ width: '30px' }}><i className="icon-menu-open2"></i></th>
                                        </tr>
                                        {/* <tr className="bg-teal">
                                        <th data-toggle="phone">Tiền Sinh nhật</th>
                                        <th data-toggle="phone">Thưởng lễ</th>
                                        <th data-toggle="phone">Ăn trưa</th>
                                        <th data-toggle="phone">Chuyên cần</th>
                                        <th data-toggle="phone">Phụ Cấp</th>
                                        <th data-toggle="phone">Cộng Khác</th>
                                        <th data-toggle="phone">BHXH (10.5%)</th>
                                        <th data-toggle="phone">Phạt Vi Phạm</th>
                                        <th data-toggle="phone">Thuế TNCN</th>
                                        <th data-toggle="phone">Trừ Khác</th>
                                        </tr> */}
                                    </thead>
                                    <tbody>
                                        {rows}
                                        <tr>
                                            <td colSpan="28"></td>
                                        </tr>
                                        <tr style={{ height: '100px' }}>
                                            <td colSpan="28"></td>
                                        </tr>

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

export default translate('translations')
    (connect(mapStateToProps, mapDispatchToProps)(UserSalaryList));

