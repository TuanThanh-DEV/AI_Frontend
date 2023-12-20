import React, { useState } from "react";
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
} from "@ionic/react";
import "./Login.scss";
import { setIsLoggedIn, setUsername } from "../data/user/user.actions";
import { connect } from "../data/connect";
import { RouteComponentProps } from "react-router";
import { AuthService } from "../data/dataApi";
import { Plugins } from "@capacitor/core";

interface OwnProps extends RouteComponentProps {}
const { Storage } = Plugins;
interface DispatchProps {
  setIsLoggedIn: typeof setIsLoggedIn;
  setUsername: typeof setUsername;
}

interface LoginProps extends OwnProps, DispatchProps {}

const Login: React.FC<LoginProps> = ({
  setIsLoggedIn,
  history,
  setUsername: setUsernameAction,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    if (!username) {
      setUsernameError(true);
    }
    if (!password) {
      setPasswordError(true);
    }

    if (username && password) {
      AuthService.login(username, password).then((token) => {
        if (token) {
          setIsLoggedIn(true);
          setUsernameAction(username);
          AuthService.current();
          history.push("/tabs/home", { direction: "none" });
        } else {
          setShowToast(true);
        }
      });
    }
  };

  return (
    <IonPage id="login-page">
      {/* <IonHeader>
        <IonToolbar>
          <IonTitle>Đăng nhập</IonTitle>
        </IonToolbar>
      </IonHeader> */}
      <IonContent>
        <form noValidate onSubmit={login}>
          <div className="login-logo">
            <img src="assets/img/logo_timec.png" alt="TIMEC" />
          </div>
          <div className="login-text">
            <p>
              Chào mừng bạn đến với ứng dụng Đăng ký khám bệnh của phòng khám đa
              khoa TIMEC
            </p>
          </div>

          <IonList>
            <IonItem>
              <IonLabel position="stacked" color="timec">
                Số điện thoại
              </IonLabel>
              <IonInput
                name="username"
                type="text"
                value={username}
                spellCheck={false}
                autocapitalize="off"
                onIonChange={(e) => setUsername(e.detail.value!)}
                required
              ></IonInput>
            </IonItem>

            {formSubmitted && usernameError && (
              <IonText color="danger">
                <p className="ion-padding-start">Vui lòng nhập số điện thoại</p>
              </IonText>
            )}

            <IonItem>
              <IonLabel position="stacked" color="timec">
                Mật Khẩu
              </IonLabel>
              <IonInput
                name="password"
                type="password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
              ></IonInput>
            </IonItem>

            {formSubmitted && passwordError && (
              <IonText color="danger">
                <p className="ion-padding-start">Vui lòng nhập mật khẩu</p>
              </IonText>
            )}
          </IonList>

          <IonRow>
            <IonCol>
              <IonButton type="submit" color="timec" expand="block">
                Đăng nhập
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton routerLink="/signup" color="warning" expand="block">
                Đăng ký
              </IonButton>
            </IonCol>
          </IonRow>
        </form>
      </IonContent>
      <IonToast
        isOpen={showToast}
        duration={3000}
        message={"Không thể đăng nhập. Vui lòng kiểm tra lại thông tin!"}
        onDidDismiss={() => setShowToast(false)}
      />
    </IonPage>
  );
};

export default connect<OwnProps, {}, DispatchProps>({
  mapDispatchToProps: {
    setIsLoggedIn,
    setUsername,
  },
  component: Login,
});
