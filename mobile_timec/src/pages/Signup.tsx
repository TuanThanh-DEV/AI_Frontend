import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonText, IonToast } from '@ionic/react';
import './Login.scss';
import { setIsLoggedIn, setUsername } from '../data/user/user.actions';
import { connect } from '../data/connect';
import { RouteComponentProps } from 'react-router';
import { asyncRequests } from '../data/dataApi';

interface OwnProps extends RouteComponentProps {}

interface DispatchProps {
  setIsLoggedIn: typeof setIsLoggedIn;
  setUsername: typeof setUsername;
}

interface SignupProps extends OwnProps,  DispatchProps { }

const Signup: React.FC<SignupProps> = ({setIsLoggedIn, history, setUsername: setUsernameAction}) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const Signup = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    if(!name) {
      setNameError(true);
    }
    if(!username) {
      setUsernameError(true);
    }

    if(!password) {
      setPasswordError(true);
    }

    // if(username && password) {
    //   await setIsLoggedIn(true);
    //   await setUsernameAction(username);
    //   history.push('/login', {direction: 'none'});
    // }
  };
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);

    var url = "/patient/add";
    var bodyObject = {
      phone: username,
      password: password,
      fullName: name,
    };

    asyncRequests.signupPatient(url, bodyObject).then((result) => {
      if (result && result.id) {
        history.push("/signupSuccessPage");
      } else {
        setShowToast(true);
      }
    });
  };

  return (
    <IonPage id="signup-page">
      {/* <IonHeader>
        <IonToolbar>
          <IonTitle>Đăng ký</IonTitle>
        </IonToolbar>
      </IonHeader> */}
      <IonContent>

        <div className="login-logo">
          <img src="assets/img/logo_timec.png" alt="TIMEC" />
        </div>

        <form noValidate onSubmit={handleSignup}>
          <IonList>
          <IonItem>
              <IonLabel position="stacked" color="timec">Tên của bạn</IonLabel>
              <IonInput name="name" type="text" value={name} onIonChange={e => {
                setName(e.detail.value!);
                setNameError(false);
              }}>
              </IonInput>
            </IonItem>

            {formSubmitted && nameError && <IonText color="danger">
              <p className="ion-padding-start">
                Vui lòng nhập tên của bạn
              </p>
            </IonText>}

            <IonItem>
              <IonLabel position="stacked" color="timec">Số điện thoại</IonLabel>
              <IonInput name="username" type="text"  value={username} spellCheck={false} autocapitalize="off" onIonChange={e => {
                setUsername(e.detail.value!);
                setUsernameError(false);
              }}
                required>
              </IonInput>
            </IonItem>

            {formSubmitted && usernameError && <IonText color="danger">
              <p className="ion-padding-start">
                Vui lòng nhập số điện thoại 
              </p>
            </IonText>}

            <IonItem>
              <IonLabel position="stacked" color="timec">Mật khẩu</IonLabel>
              <IonInput name="password" type="password" value={password} onIonChange={e => {
                setPassword(e.detail.value!);
                setPasswordError(false);
              }}>
              </IonInput>
            </IonItem>

            {formSubmitted && passwordError && <IonText color="danger">
              <p className="ion-padding-start">
                Vui lòng nhập mật khẩu
              </p>
            </IonText>}
          </IonList>

          <IonRow>
            <IonCol size="6" size-sm>
              <IonButton type="submit" color="timec" expand="block">Đăng ký</IonButton>
            </IonCol>
            <IonCol size="6" size-sm>
              <IonButton routerLink="/login"  type="submit" color="medium" expand="block">Quay lại</IonButton>
            </IonCol>
          </IonRow>
          
        </form>
        <IonRow>
            
          </IonRow>
      </IonContent>

      <IonToast
        isOpen={showToast}
        duration={3000}
        message={"Không thể đăng ký. Vui lòng liên hệ 0879 115 115 để được hỗ trợ."}
        onDidDismiss={() => setShowToast(false)}
      />

    </IonPage>
  );
};

export default connect<OwnProps, {}, DispatchProps>({
  mapDispatchToProps: {
    setIsLoggedIn,
    setUsername
  },
  component: Signup
})