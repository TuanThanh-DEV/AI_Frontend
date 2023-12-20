import React from "react";
import {
  IonContent,
  IonPage,
  IonRow,
  IonCol,
  IonButton,

} from "@ionic/react";
import "./Login.scss";
import { connect } from "../data/connect";
import { RouteComponentProps } from "react-router";
import { Plugins } from "@capacitor/core";

interface OwnProps extends RouteComponentProps {}
interface DispatchProps {
}

interface AppointmentSuccessPageProps extends OwnProps, DispatchProps {}

const AppointmentSuccessPage: React.FC<AppointmentSuccessPageProps> = ({

}) => {
  return (
    <IonPage id="appointment-success-page">
      <IonContent>
    
          <div className="login-logo">
            <img src="assets/img/logo_timec.png" alt="TIMEC" />
          </div>
          <div className="login-text">
            <p>
              Bạn đã đặt lịch hẹn thành công. Chúng tôi sẽ xác nhận lịch hẹn với bạn.
              Vui lòng liên hệ 0879 115 115 khi cần tư vấn về các dịch vụ của TIMEC.
            </p>
          </div>
          
          <IonRow>
            <IonCol>
              <IonButton routerLink="/tabs/home" color="timec" expand="block">
                Về Trang Chủ
              </IonButton>
            </IonCol>
          </IonRow>
      </IonContent>
      
    </IonPage>
  );
};

export default connect<OwnProps, {}, DispatchProps>({
  mapDispatchToProps: {
  },
  component: AppointmentSuccessPage,
});
