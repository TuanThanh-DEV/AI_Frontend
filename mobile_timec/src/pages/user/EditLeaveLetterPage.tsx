import React, { useState, useEffect } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonText, IonToast, IonSelect, IonSelectOption, IonDatetime, IonTextarea } from '@ionic/react';
import '../EditPage.scss';
import { setIsLoggedIn, setUsername } from '../../data/user/user.actions';
import { connect } from '../../data/connect';
import { RouteComponentProps, useParams } from 'react-router';
import { AuthService, asyncRequests } from '../../data/dataApi';
import * as userselectors from './UserSelectors';
import { loadListUser } from './listuser.actions';
import { User } from './User';

interface OwnProps extends RouteComponentProps {}

interface StateProps {
  listUserOptions: User[];
}

interface DispatchProps {
  loadListUser: typeof loadListUser;
}

type EditLeaveLetterProps = OwnProps & StateProps & DispatchProps;

const EditLeaveLetterPage: React.FC<EditLeaveLetterProps> = ({listUserOptions, loadListUser, history}) => {

  const [leaveType, setLeaveType] = useState('ANNUAL_HOLIDAY');
  const [workPlace, setWorkPlace] = useState('Văn Phòng');
  const [startLeaveDate, setStartLeaveDate] = useState('');
  const [endLeaveDate, setEndLeaveDate] = useState('');
  const [startWorkDate, setStartWorkDate] = useState('');
  const [reason, setReason] = useState('');
  const [status, setStatus] = useState('DANG_CHO_DUYET');
  const [approvedById, setApprovedById] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [startLeaveDateError, setStartLeaveDateError] = useState(false);
  const [endLeaveDateError, setEndLeaveDateError] = useState(false);
  const [startWorkDateError, setStartWorkDateeError] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const { userId } = useParams();

  const handleEditLeaveLetter = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    if(!startLeaveDateError) {
      setStartLeaveDateError(true);
    }
    if(!endLeaveDateError) {
      setEndLeaveDateError(true);
    }
    if(!startWorkDateError) {
      setStartWorkDateeError(true);
    }

    
    var url = '/leaveLetter/add';
    var bodyObject = {
        userId: userId,
        startLeaveDate: startLeaveDate,
        endLeaveDate: endLeaveDate,
        startWorkDate: startWorkDate,
        approvedById: approvedById,
        status: status, // TODO
        reason: reason,
        leaveType: leaveType,
        workPlace: workPlace,
    };

    asyncRequests.post(url, bodyObject).then (result => {
        if (result && result.id) {
          history.push('/listUser');
        } else {
          setShowToast(true);
        }
    });

  };
  
  const employee = {id: 1, fullName: "Nguyễn Văn A", department: {name: "Kế toán"}};
  var optionLeaveTypes = [
    {label:"Nghỉ phép", value:"ANNUAL_HOLIDAY"},
    {label:"Nghỉ phép nữa ngày", value:"ANNUAL_HOLIDAY_2"}
    ];
  var optionWorkplace = [
      { label: "Văn Phòng", value: "Văn Phòng" },
      { label: "Công Trường", value: "Công Trường" },
      { label: "Khác", value: "Khác" }
  ];
  var optionStatus = [{ label: "Đang Chờ Duyệt", value: "DANG_CHO_DUYET" },
        { label: "Không Được Duyệt", value: "KHONG_DUOC_DUYET" }, { label: "Đã Duyệt", value: "DA_DUYET" }
      ];

    useEffect(() => {
      loadListUser();
    }, []);

  return (
    <IonPage id="edituser-page">
      <IonHeader>
        <IonToolbar color="timec">
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Tạo Đơn Nghỉ Phép</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <form noValidate onSubmit={handleEditLeaveLetter}>
          <IonList>
            <IonItem>
              <IonLabel>
              <h2>Tên: {employee.fullName}</h2>
              <h2>Bộ Phận: {employee.department.name}</h2>
              </IonLabel>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked" color="primary">Loại Nghỉ Phép (*)</IonLabel>
              <IonSelect value={leaveType} placeholder="Chọn Loại" onIonChange={e => setLeaveType(e.detail.value!)}>
                {optionLeaveTypes.map(option => 
                  <IonSelectOption value={option.value}>{option.label}</IonSelectOption>)}
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked" color="primary">Nơi Làm Việc</IonLabel>
              <IonSelect value={workPlace} placeholder="Chọn Nơi Làm Việc" onIonChange={e => setWorkPlace(e.detail.value!)}>
                {optionWorkplace.map(option => 
                  <IonSelectOption value={option.value}>{option.label}</IonSelectOption>)}
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked" color="primary">Nghỉ Phép Từ (*)</IonLabel>
              <IonDatetime displayFormat="DD/MM/YY" placeholder="Chọn Ngày" value={startLeaveDate} onIonChange={e => setStartLeaveDate(e.detail.value!)}></IonDatetime>
            </IonItem>
            {formSubmitted && startLeaveDateError && <IonText color="danger">
              <p className="ion-padding-start">
                Vui Lòng Nhập Nghỉ Phép Từ
              </p>
            </IonText>}

            <IonItem>
              <IonLabel position="stacked" color="primary">Đến Hết Ngày (*)</IonLabel>
              <IonDatetime displayFormat="DD/MM/YY" placeholder="Chọn Ngày" value={endLeaveDate} onIonChange={e => setEndLeaveDate(e.detail.value!)}></IonDatetime>
            </IonItem>
            {formSubmitted && endLeaveDateError && <IonText color="danger">
              <p className="ion-padding-start">
                Vui Lòng Nhập Đến Hết Ngày
              </p>
            </IonText>}

            <IonItem>
              <IonLabel position="stacked" color="primary">Ngày Đi Làm Lại (*)</IonLabel>
              <IonDatetime displayFormat="DD/MM/YY" placeholder="Chọn Ngày" value={startWorkDate} onIonChange={e => setStartWorkDate(e.detail.value!)}></IonDatetime>
            </IonItem>
            {formSubmitted && startWorkDateError && <IonText color="danger">
              <p className="ion-padding-start">
                Vui Lòng Nhập Ngày Đi Làm
              </p>
            </IonText>}

            <IonItem>
              <IonLabel position="stacked" color="primary">Lý Do Nghỉ</IonLabel>
              <IonTextarea name="reason"  value={reason} onIonChange={e => setReason(e.detail.value!)}>
              </IonTextarea>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked" color="primary">Người Duyệt (*)</IonLabel>
              <IonSelect value={approvedById} placeholder="Chọn Người Duyệt" onIonChange={e => setApprovedById(e.detail.value!)}>
                {listUserOptions.map(option => 
                  <IonSelectOption value={option.id}>{option.email + " | " + option.fullName}</IonSelectOption>)}
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonLabel position="stacked" color="primary">Trạng Thái Duyệt</IonLabel>
              <IonSelect value={status} placeholder="Chọn Trạng Thái" onIonChange={e => setStatus(e.detail.value!)}>
                {optionStatus.map(option => 
                  <IonSelectOption value={option.value}>{option.label}</IonSelectOption>)}
              </IonSelect>
            </IonItem>

          </IonList>

          <IonRow>
            <IonCol>
              <IonButton type="submit" color="timec" expand="block">Tạo Đơn</IonButton>
            </IonCol>
            <IonCol>
              <IonButton routerLink="/listUser" color="light" expand="block">Bỏ Qua</IonButton>
            </IonCol>
          </IonRow>
        </form>

      </IonContent>
      <IonToast
        isOpen={showToast}
        duration={3000}
        message={"Không thể lưu trữ!"}
        onDidDismiss={() => setShowToast(false)} />

    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    listUserOptions: userselectors.getAllowApprovalUsers(state)
  }),
  mapDispatchToProps: {
    loadListUser
  },
  component: EditLeaveLetterPage
});