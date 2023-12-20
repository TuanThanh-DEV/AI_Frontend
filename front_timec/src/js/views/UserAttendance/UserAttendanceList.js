import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import qs from 'query-string';
import agent from '../../services/agent';
import { toast } from 'react-toastify';
import { translate } from 'react-i18next';
import { RenderSelect } from '../../components/formInputs';
import moment from 'moment';
import dateFns from 'date-fns';
import { PermanentCacheService } from '../../services/middleware';
import { LoadingScreen } from '../../components/commonWidgets';
import ModalUserAttendance from './ModalUserAttendance';

const validate = values => {
    const errors = {};
    return errors;
  };

const selector = formValueSelector('UserAttendanceList');

const mapStateToProps = state => {
  return {
    userId: selector(state, "userId"),
  };
};

const mapDispatchToProps = dispatch => ({
  updateField: (fieldName, value) =>
    dispatch({
      meta: { form: "UserAttendanceList", field: fieldName },
      payload: value,
      type: "@@redux-form/CHANGE"
    }),
});

const CalendarHeader = (props) => {
  return (
      <div>
        <br />
        <div className="btn-group">
            <button className="btn btn-primary" onClick={props.prev}>&lt;</button>
            <button className="btn btn-primary" onClick={props.today}>Tháng Hiện Tại</button>
            <button className="btn btn-primary" onClick={props.next}>&gt;</button>
        </div>
        <h3>Tháng {dateFns.format(props.currentDate, 'MM / YYYY')}</h3>
      </div>
  )
}



const DaysInMonth = (props) => {
    const { date } = props
    var theadAttendance =
      <th key={"dayInMonth_"}>
        {dateFns.getDay(date) == 0 ? dateFns.format(date, 'D') + ".CN" :
          dateFns.format(date, 'D') + ".T" + (dateFns.getDay(date) + 1)} </th>
    return [theadAttendance]
  }
  
const BodyAttendance = (props) => {
const { userId,listUserAttendance, listUser, date,handleShowModalEditAttendance, handleShowModalAddAttendance } = props;  

let getMatchedAttendance = (attendanceList, day, userId) => {
  // var datdat = moment(day).format("YYYY-MM-DD");
  if(attendanceList){
    for (var i = 0; i < attendanceList.length; i++) {
      // if (userId == attendanceList[i].user.id && moment(attendanceList[i].dateToWork).format("YYYY-MM-DD")== moment(day)) {
      if (userId == attendanceList[i].user.id && attendanceList[i].dateToWork== moment(day).format("YYYY-MM-DD")) {
      return attendanceList[i];
      }
    }
  }
  return null
}

var dataUser = [];
listUser.map(item=>{
    if(item.id==userId){
    dataUser.push(item);
    }else if(userId=="ALL"){
    dataUser.push(item)
    }
})
    // if(grou)
    if(dataUser){
      var currentNo = 0;
      var body = dataUser.map(item => { 
      currentNo++;
      return (<tr key={"userKey_" + item.id}>
        <td className="warning" style={{ position: 'sticky', left: 0 }}>{currentNo}</td>
        <td className="warning" style={{ position: 'sticky', left: 38 }}>{item.user.fullName}</td>
        {date.map(day => {
          var matchedAttendanceDay = getMatchedAttendance(listUserAttendance, day, item.user.id);
          if (listUserAttendance) {
            if(matchedAttendanceDay){
              return (<td className={"success"}><center><a onClick={() => handleShowModalEditAttendance(matchedAttendanceDay.id)}>{matchedAttendanceDay.workHours}</a></center></td>)
            }else{
              return <td><button style={{ fontSize: 12 }} onClick={() => handleShowModalAddAttendance(day, item)}>+</button></td>
            }
          }
          // return <td><button style={{ fontSize: 12 }} onClick={() => handleShowModalAddAttendance(day, item)}>+</button></td>
        })}
      </tr>)}
    );
  
    return [body]
    }
    // return [dataUser]
}


class UserAttendanceList extends React.Component {

  constructor() {
    super()
        let initialDate = new Date()
        initialDate = PermanentCacheService.getItem("selected_month") ? new Date(PermanentCacheService.getItem("selected_month")) : dateFns.setDate(initialDate, 1)
        this.state = {
            currentDate: initialDate,
            userDto: null,
            isWPModalShown: false,
            listUserAttendance: [],
            currentPage: 1,
            numberOfPage: 1,
            listAllUser: [],
            dayToAttendance: null,
            idUserAttendance: null,
            isShownUserAttendance: false,
            isEditUserAttendanceModal: false,
            userId:null, 
        }

        this.prev = () => {
        const prev = dateFns.subMonths(this.state.currentDate, 1)
        PermanentCacheService.setItem("selected_month", prev);
        this.setState({ currentDate: prev }, () => {
            this.updateUserAttendance(this.state.userId);
        })
        }

        this.next = () => {
        const next = dateFns.addMonths(this.state.currentDate, 1)
        PermanentCacheService.setItem("selected_month", next);
        this.setState({ currentDate: next }, () => {
            this.updateUserAttendance(this.state.userId);
        })
        }

        this.today = () => {
        let today = new Date()
        today = dateFns.setDate(today, 1)
        PermanentCacheService.setItem("selected_month", today);
        this.setState({ currentDate: today }, () => {
            this.updateUserAttendance(this.state.userId);
        })
        }

        this.goToPage = (page) => {
        this.setState({ currentPage: page });
        }

        this.handleShowModalAddAttendance = this.handleShowModalAddAttendance.bind(this);
        this.handleShowModalEditAttendance = this.handleShowModalEditAttendance.bind(this);
        this.handleHideAttendanceModal = () => {
        this.setState({ isShownUserAttendance: false,isEditUserAttendanceModal:false });
        this.updateUserAttendance(this.state.userId);
        };
        this.handleDeleteAttendanceModal = this.handleDeleteAttendanceModal.bind(this);
    }


  getListUser() {
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

  updateUserAttendance(userId) {
    const currentDate = this.state.currentDate;
    var startDateOfMonth = moment(dateFns.startOfMonth(currentDate)).format("YYYY-MM-DD-HH:mm:ss");
    var endDateOfMonth = moment(dateFns.lastDayOfMonth(currentDate)).format("YYYY-MM-DD-HH:mm:ss");
    if (!userId) {
      return null;
    }
    if (userId && userId == "ALL") {
      let setStateInRequest = (list) => {
        this.setState({ userId: userId, listUserAttendance: [] });
        this.setState({ listUserAttendance: list });
      }
      return (agent.asyncRequests.get('/userAttendance/findByDateToWork?dateToWorkStart=' + startDateOfMonth +
        "&dateToWorkEnd=" + endDateOfMonth).then(function (res) {
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
    } else if (userId) {
      this.setState({ userId: userId, listUserAttendance: [] });
      let setStateInRequest = (list) => {
        this.setState({ listUserAttendance: list });
      }
      return (agent.asyncRequests.get('/userAttendance/findByUserId?userId=' +
        userId + "&dateToWorkStart=" + startDateOfMonth +
        "&dateToWorkEnd=" + endDateOfMonth).then(function (res) {
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

  }

  componentWillMount() {
    const { updateField, userId } = this.props;
    // try get from property, if not exist, try from query param
    var paramUserId = qs.parse(this.props.location.search).userId;
    if (paramUserId) {
      updateField("userId", paramUserId);
      this.updateUserAttendance(paramUserId);
    } else if (userId) {
      this.updateUserAttendance(userId);
    }
    else if (!userId) {
      this.updateUserAttendance("ALL");
    }
    return (
      this.getListUser()
    )
  }
  handleShowModalEditAttendance(id) {
    this.setState({
      idUserAttendance: id,
      isEditUserAttendanceModal: true,
      userDto: null,
      dayToAttendance: null,

    })
  }

  handleShowModalAddAttendance(dayToAttendance, userDto) {
    this.setState({
      idUserAttendance: null,
      dayToAttendance: dayToAttendance,
      userDto: userDto.user,
      isShownUserAttendance: true
    })
  }
  
  handleDeleteAttendanceModal(id) {
    var updateUserAttendance = this.updateUserAttendance;
    if (confirm("Bạn có chắc sẽ xoá ngày công này!")) {
      var url = `/userAttendance/${id}`;
      return agent.asyncRequests.del(url
      ).then(function (res) {
        var result = res.body.resultData;
        if (result && !result.error) {
          alert("Xoá Thành Công: ");
          updateUserAttendance();
        } else {
          toast.error("Có lỗi khi xoá dữ liệu. Lỗi: " + result.errorMessage, { autoClose: 15000 });
        }
      }, function (err) {
        toast.error("Không thể xóa dữ liệu đang được sử dụng từ màn hình khác!", { autoClose: 15000 });
      });
    } else {
    }
  };
  render() {
    const firstOfTheWeek = this.state.currentDate;
    const currentDate = new Date(this.state.currentDate.getTime());
    var listUserAttendance = this.state.listUserAttendance;
    if (!listUserAttendance) {
      return null;
    }


    const dataUser = this.state.listAllUser;
    const calendarDays = [];
    const body = [];
    var page = qs.parse(this.props.location.search).page;
    let dateIncrement = new Date(firstOfTheWeek.getTime());
    var numberOfDays = moment(currentDate).daysInMonth()
    let inc = 0;
    var dateArray = [];
    while (inc < numberOfDays) {

      calendarDays.push(<DaysInMonth
        date={dateIncrement}
        currentDate={currentDate}
        listUserAttendance={listUserAttendance}
        userId={this.state.userId}
        key={inc}></DaysInMonth>)
      dateArray.push(dateIncrement);

      inc += 1
      dateIncrement = dateFns.addDays(dateIncrement, 1)

    }
    if (!dataUser) {
      <LoadingScreen></LoadingScreen>
    }

    body.push(<BodyAttendance
      key={"_BodyAttendance"}
      date={dateArray}
      eachDate={dateIncrement}
      currentDate={currentDate}
      listUser={dataUser}
      userId={this.state.userId}
      listUserAttendance={listUserAttendance}
      handleShowModalEditAttendance={this.handleShowModalEditAttendance}
      handleShowModalAddAttendance={this.handleShowModalAddAttendance}
      handleHideAttendanceModal={this.handleHideAttendanceModal}
      handleDeleteAttendanceModal={this.handleDeleteAttendanceModal}
    ></BodyAttendance>)
    const wrapperStyle = {
      height: '100%',
      width: '100%'
    }

    var optionUser = [{ label: "Tất Cả", value: "ALL" }];
    if (dataUser) {
      dataUser.map(item => {
        optionUser.push({ label: item.user.fullName, value: item.id })
      })
    }


    if (!page) {
      page = 1;
    }
    return (
      <div className="content-wrapper">
      <div className="page-header page-header-default">
          <div className="breadcrumb-line">
              <ul className="breadcrumb">
                  <li><a href=""><i className="icon-home2 position-left"></i> Home</a> </li>
                  <li className="active">Chấm Công</li>
                  <li className="active">Quản Lý Chấm Ngày Công</li>
              </ul>
              <div className="heading-elements">
      </div>
          </div>
      </div>
      <div className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="panel panel-flat">
                <div className="panel-body">
                  <div style={{ height: '100%', width: '100%' }} className="input-group">
                          <CalendarHeader
                              currentDate={currentDate}
                              next={this.next}
                              prev={this.prev}
                              today={this.today} />
                      <br />
                      <div>
                        <Field name="userId" placeholder="Chọn Nhân Viên"
                          options={optionUser} component={RenderSelect}
                          onChangeAction={(userId) => this.updateUserAttendance(userId)}></Field>
                      </div>
                  </div>
                </div>
              </div>
              {this.state.isEditUserAttendanceModal ? <ModalUserAttendance title="Chấm Công" idUserAttendance={this.state.idUserAttendance} userDto={this.state.userDto} dayToAttendance={this.state.dayToAttendance} show={this.state.isEditUserAttendanceModal} onHide={this.handleHideAttendanceModal} /> : null}
              {this.state.isShownUserAttendance ? <ModalUserAttendance title="Chấm Công" idUserAttendance={null} userDto={this.state.userDto} dayToAttendance={this.state.dayToAttendance} show={this.state.isShownUserAttendance} onHide={this.handleHideAttendanceModal} /> : null}
              <div style={{ overflowX: 'auto' }} className="panel panel-flat">
                <table style={{ whiteSpace: 'nowrap' }} className="table table-bordered">
                    <thead>
                        <tr>
                            <th className="bg-success" style={{ position: 'sticky', left: 0 }} rowSpan={2}>STT</th>
                            <th className="bg-success" style={{ position: 'sticky', left: 38 }} rowSpan={2}>Tên Nhân Công</th>
                            <th style={{ position: 'sticky', left: 200 }} colSpan={10}><center>Ngày Trong Tháng</center></th>
                        </tr>
                        <tr>
                            {calendarDays}
                        </tr>
                    </thead>
                    <tbody>
                        {body}
                    </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export default translate('translations')(connect(
  mapStateToProps, mapDispatchToProps)(
    reduxForm({
      form: 'UserAttendanceList',
      destroyOnUnmount: false,
      enableReinitialize: true,
      validate
    })(UserAttendanceList)));