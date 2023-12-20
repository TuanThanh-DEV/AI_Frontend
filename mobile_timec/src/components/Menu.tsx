import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonTitle,
  IonToolbar,
  IonToggle
} from '@ionic/react';
import { calendar, contacts, hammer, help, informationCircle, logIn, logOut, map, person, personAdd, home } from 'ionicons/icons';
import React, { useState } from 'react';
import { connect } from '../data/connect';
import { RouteComponentProps, withRouter } from 'react-router';
import { setDarkMode } from '../data/user/user.actions';
import { Storage } from '@capacitor/core';
import { PermanentCacheService } from '../data/dataApi';

const routes = {
  appPages: [
    // { title: 'Schedule', path: '/tabs/schedule', icon: calendar },
    // { title: 'Speakers', path: '/tabs/speakers', icon: contacts },
    { title: 'Trang chủ', path: '/tabs/home', icon: home },
    { title: 'Giới thiệu', path: '/tabs/about', icon: informationCircle },
    { title: 'Địa chỉ', path: '/tabs/map', icon: map },
  ],
  loggedInPages: [
    // { title: 'Account', path: '/account', icon: person },
    // { title: 'Quản Lý Nhân Viên', path: '/listUser', icon: person },
    { title: 'Lịch Khám', path: '/tabs/appointment', icon: person },
    // { title: 'Lương Nhân Viên', path: '/listEmployeeSalary', icon: person },
    // { title: 'Support', path: '/support', icon: help },
    { title: 'Logout', path: '/login', icon: logOut }
  ],
  addPages: [
    // { title: 'Account', path: '/account', icon: person },
    // { title: 'Quản Lý Kho', path: '/listStock', icon: person },
    // { title: 'Support', path: '/support', icon: help },
    // { title: 'Logout', path: '/login', icon: logOut }
  ],
  loggedOutPages: [
    { title: 'Login', path: '/login', icon: logIn },
    // { title: 'Support', path: '/support', icon: help },
    // { title: 'Signup', path: '/signup', icon: personAdd }
  ]
};

interface Pages {
  title: string,
  path: string,
  icon: { ios: string, md: string },
  routerDirection?: string
}
interface StateProps {
  darkMode: boolean;
  isAuthenticated: boolean;
}

interface DispatchProps {
  setDarkMode: typeof setDarkMode
}

interface MenuProps extends RouteComponentProps, StateProps, DispatchProps { }

const Menu: React.FC<MenuProps> = ({ darkMode, history, isAuthenticated, setDarkMode }) => {
  const [disableMenu, setDisableMenu] = useState(false);
  // const [currentUserName, setCurrentUserName] = useState();
  function renderlistItems(list: Pages[]) {
    return list
      .filter(route => !!route.path)
      .map(p => (
        <IonMenuToggle key={p.title} auto-hide="false">
          <IonItem button routerLink={p.path} routerDirection="none">
            <IonIcon slot="start" icon={p.icon} />
            <IonLabel>{p.title}</IonLabel>
          </IonItem>
        </IonMenuToggle>
      ));
  }

  // var currentUserName = "";
  // if (PermanentCacheService.hasItem("currentUser") ){
  //   PermanentCacheService.getItem("currentUser").then(user => {
  //     setCurrentUserName(user.fullName);
  //   })
  // }

  return (
    <IonMenu type="overlay" disabled={disableMenu} contentId="main">
      <IonHeader>
        <IonToolbar color="timec">
          <IonTitle>Menu</IonTitle>
          {/* <IonTitle>{currentUserName}
          </IonTitle> */}
        </IonToolbar>
      </IonHeader>
      <IonContent class="outer-content">
        <IonList>
          {/* <IonListHeader>Navigate</IonListHeader> */}
          {renderlistItems(routes.appPages)}
        </IonList>
        <IonList>
          <IonListHeader>Tài khoản</IonListHeader>
          {isAuthenticated ? renderlistItems(routes.loggedInPages) : renderlistItems(routes.loggedOutPages)}
        </IonList>
        <IonList>
          <IonItem>
            <IonLabel>Dark Theme</IonLabel>
            <IonToggle checked={darkMode} onClick={() => setDarkMode(!darkMode)} />
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default connect<{}, StateProps, {}>({
  mapStateToProps: (state) => ({
    darkMode: state.user.darkMode,
    isAuthenticated: state.user.isLoggedin
  }),
  mapDispatchToProps: ({
    setDarkMode
  }),
  component: withRouter(Menu)
})
