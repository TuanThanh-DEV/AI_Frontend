import React, { useState, useRef, useEffect } from 'react';
import { IonToolbar, IonContent, IonPage, IonButtons, IonMenuButton, IonSegment, IonSegmentButton, IonButton, IonIcon, IonSearchbar, IonRefresher, IonRefresherContent, IonToast, IonModal, IonHeader, getConfig, IonTitle, IonList, IonItem, IonLabel, IonItemSliding, IonAvatar } from '@ionic/react';
import { connect } from '../../data/connect';
import { options } from 'ionicons/icons';
import '../ListPage.scss'
import * as userselectors from './UserSelectors';
import { setSearchText} from '../../data/sessions/sessions.actions';
import { User } from './User';
import { loadListUser } from './listuser.actions';

interface OwnProps { }

interface StateProps {
  listUsers: User[];
  mode: 'ios' | 'md'
}

interface DispatchProps {
  setSearchText: typeof setSearchText;
  loadListUser: typeof loadListUser;
}

type ListUserPageProps = OwnProps & StateProps & DispatchProps;

const ListUserPage: React.FC<ListUserPageProps> = ({ listUsers, setSearchText,loadListUser, mode }) => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const ionRefresherRef = useRef<HTMLIonRefresherElement>(null);
  const [showCompleteToast, setShowCompleteToast] = useState(false);

  const doRefresh = () => {
    setTimeout(() => {
      ionRefresherRef.current!.complete();
      setShowCompleteToast(true);
    }, 2500)
  };

  // const listUsers = [{id: 1, name: "Nguyễn Văn A", email: "nguyenvana@gmail.com", phone: "0909825783"},
  //                 {id: 2, name: "Nguyễn Văn B", email: "nguyenvana@gmail.com", phone: "0909825783"},
  //                 {id: 3, name: "Nguyễn Văn C", email: "nguyenvana@gmail.com", phone: "0909825783"}];

  useEffect(() => {
    loadListUser();
  }, []);

  return (
    <IonPage id="list-user-page" className="list-page">
      <IonHeader>
        <IonToolbar color="timec">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>

          <IonTitle>Danh Sách Nhân Viên</IonTitle>

        </IonToolbar>

        <IonToolbar color="timec">
          <IonSearchbar
            placeholder="Tìm tên, email, phone"
            onIonChange={(e: CustomEvent) => setSearchText(e.detail.value)}
          />
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonRefresher slot="fixed" ref={ionRefresherRef} onIonRefresh={doRefresh}>
          <IonRefresherContent />
        </IonRefresher>
        {/* <IonToast
          isOpen={showCompleteToast}
          message="Refresh complete"
          duration={2000}
          onDidDismiss={() => setShowCompleteToast(false)}
        /> */}

        <IonList>
        {listUsers.map((user, index: number) => (
          <IonItemSliding key={user.id}>
            <IonItem routerLink={`/editLeaveLetter/${user.id}`}>
              <IonAvatar slot="start">
                <img src="/assets/img/person-circle-outline.svg"/>
              </IonAvatar>
              
              <IonLabel>
                
                <h3>{user.fullName}</h3>
                <p>
                  Email: {user.email}
                </p>
                <p>
                  Phone: {user.phone}
                </p>
              </IonLabel>
            </IonItem>
          </IonItemSliding>
          
        ))}
      </IonList>
      </IonContent>

      <IonModal
        isOpen={showFilterModal}
        onDidDismiss={() => setShowFilterModal(false)}
      >
      </IonModal>

    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    listUsers: userselectors.getFilteredUsers(state),
    mode: getConfig()!.get('mode')
  }),
  mapDispatchToProps: {
    setSearchText, loadListUser
  },
  component: React.memo(ListUserPage)
});