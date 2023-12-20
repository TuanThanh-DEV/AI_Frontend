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

interface SignUpSuccessPageProps extends OwnProps, DispatchProps {}

const SignUpSuccessPage: React.FC<SignUpSuccessPageProps> = ({

}) => {
  return (
    <IonPage id="signup-success-page">
      <IonContent>
    
          <div className="login-logo">
            <img src="assets/img/logo_timec.png" alt="TIMEC" />
          </div>
          <div className="login-text">
            <p>
              Bạn đã đăng ký tài khoản thành công. Vui lòng đăng nhập để đặt lịch hẹn.
              Bạn có thể liên hệ 0879 115 115 khi cần tư vấn về các dịch vụ của TIMEC.
            </p>
          </div>
          
          <IonRow>
            <IonCol>
              <IonButton routerLink="/login" color="timec" expand="block">
                Về Đăng Nhập
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
  component: SignUpSuccessPage,
});
