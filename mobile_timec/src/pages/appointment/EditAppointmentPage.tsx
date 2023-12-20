import React, { useState, useEffect } from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonButtons,
  IonMenuButton,
  IonRow,
  IonCol,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonText,
  IonToast,
  IonSelect,
  IonSelectOption,
  IonDatetime,
  IonTextarea,
  IonIcon,
} from "@ionic/react";
import "../EditPage.scss";
// import { setIsLoggedIn, setAppointmentname } from '../../data/appointment/appointment.actions';
import { connect } from "../../data/connect";
import { RouteComponentProps, useParams } from "react-router";
import {
  AuthService,
  asyncRequests,
  PermanentCacheService,
} from "../../data/dataApi";
import * as appointmentselectors from "./AppointmentSelectors";
import {
  loadListAppointment,
  loadListHospital,
  loadListDepartment,
} from "./listappointment.actions";
import { Appointment } from "./Appointment";

import {
  closeCircle,
  pulse,
  add,
  calendar,
  medkit,
  gitNetwork,
  time,
  navigate,
  person,
} from "ionicons/icons";
import { Hospital } from "../../models/Hospital";
import { Department } from "../../models/Department";

interface OwnProps extends RouteComponentProps {}

interface StateProps {
  listAppointmentOptions: Appointment[];
  listHosital: Hospital[];
  listDepartment: Department[];

}

interface DispatchProps {
  loadListAppointment: typeof loadListAppointment;
  loadListHospital: typeof loadListHospital;
  loadListDepartment: typeof loadListDepartment;
}

type EditLeaveLetterProps = OwnProps & StateProps & DispatchProps;

const EditLeaveLetterPage: React.FC<EditLeaveLetterProps> = ({
  listAppointmentOptions,
  loadListAppointment,
  loadListHospital,
  listHosital,
  loadListDepartment,
  listDepartment,
  history,
}) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [appointDate, setAppointDate] = useState(Date);
  const [status, setStatus] = useState(false);
  // const [userId, setHositalId] = useState(false);
  // const [patientId, setPatientId] = useState(false);
  const [hospitalId, setHospitalId] = useState(false);
  const [departmentId, setDepartmentId] = useState(false);
  const [currentUserName, setcurrentUserName] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(false);
  if (PermanentCacheService.hasItem("currentUser")) {
    PermanentCacheService.getItem("currentUser").then((user) => {
      setcurrentUserName(user.fullName);
      setCurrentUserId(user.id);
    });
  }
  const handleEditLeaveLetter = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    // if(!startLeaveDateError) {
    //   setStartLeaveDateError(true);
    // }
    // if(!endLeaveDateError) {
    //   setEndLeaveDateError(true);
    // }
    // if(!startWorkDateError) {
    //   setStartWorkDateeError(true);
    // }

    var url = "/appointment/add";
    var bodyObject = {
      // appointmentId: appointmentId,
      appointDate: appointDate,
      status: "OPEN",
      // userId: 1,
      patientId: currentUserId,
      hospitalId: hospitalId,
      departmentId: departmentId,
    };

    asyncRequests.post(url, bodyObject).then((result) => {
      if (result && result.id) {
        history.push("/appointmentSuccess");
      } else {
        setShowToast(true);
      }
    });
  };

  useEffect(() => {
    loadListAppointment();
    loadListHospital();
    loadListDepartment();
  }, []);

  return (
    <IonPage id="editappointment-page">
      <IonHeader>
        <IonToolbar color="timec">
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Đặt lịch khám</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form noValidate onSubmit={handleEditLeaveLetter}>
          <IonList>
            <IonItem>
              <IonIcon icon={person} slot="start" color="timec" />
              <IonLabel position="stacked" color="timec">
                Họ và tên
              </IonLabel>
              <IonText>{currentUserName}</IonText>
            </IonItem>
            <IonItem>
              <IonIcon icon={navigate} slot="start" color="timec" />
              <IonLabel position="stacked" color="timec">
                Phòng Khám
              </IonLabel>
              <IonSelect
                value={hospitalId}
                placeholder="Chọn Nơi Làm Việc"
                onIonChange={(e) => setHospitalId(e.detail.value!)}
              >
                {listHosital.map(option => (
                  <IonSelectOption value={option.id}>
                    {option.name}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>

            <IonItem>
              <IonIcon icon={calendar} slot="start" color="timec" />
              <IonLabel position="stacked" color="timec">
                Ngày khám (*)
              </IonLabel>
              <IonDatetime
                displayFormat="DD/MM/YY"
                placeholder="Chọn Ngày"
                value={appointDate}
                onIonChange={(e) => setAppointDate(e.detail.value!)}
              ></IonDatetime>
            </IonItem>
            {/* {formSubmitted && appointDate && (
              <IonText color="danger">
                <p className="ion-padding-start">Vui Lòng Chọn Ngày Khám</p>
              </IonText>
            )} */}

            <IonItem>
              <IonIcon icon={gitNetwork} slot="start" color="timec" />
              <IonLabel position="stacked" color="timec">
                Chuyên khoa
              </IonLabel>
              <IonSelect
                value={departmentId}
                placeholder="Chọn Chuyên khoa"
                onIonChange={(e) => setDepartmentId(e.detail.value!)}
              >
                {listDepartment.map((option) => (
                  <IonSelectOption value={option.id}>
                    {option.name}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
          </IonList>
          <IonItem>
            <IonIcon icon={time} slot="start" color="timec" />
            <IonLabel position="stacked" color="timec">
              Giờ khám (*)
            </IonLabel>
            <IonDatetime
              displayFormat="HH:mm"
              minuteValues="0,30"
              placeholder="Chọn Ngày"
              value={appointDate}
              onIonChange={(e) => setAppointDate(e.detail.value!)}
            ></IonDatetime>
          </IonItem>
          {/* {formSubmitted && appointDate && (
            <IonText color="danger">
              <p className="ion-padding-start">Vui Lòng Chọn Ngày Khám</p>
            </IonText>
          )} */}
          <IonRow>
            <IonCol>
              <IonButton type="submit" color="timec" expand="block">
                Đặt lịch
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton
                routerLink="/tabs/appointment"
                color="light"
                expand="block"
              >
                Bỏ Qua
              </IonButton>
            </IonCol>
          </IonRow>
        </form>
      </IonContent>
      <IonToast
        isOpen={showToast}
        duration={3000}
        message={"Không thể lưu trữ!"}
        onDidDismiss={() => setShowToast(false)}
      />
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    listAppointmentOptions: appointmentselectors.getFilteredAppointments(state),
    listHosital: appointmentselectors.getHospital(state),
    listDepartment: appointmentselectors.getDepartment(state),
  }),
  mapDispatchToProps: {
    loadListAppointment,
    loadListHospital,
    loadListDepartment,
  },
  component: React.memo(EditLeaveLetterPage),
});
