import React, { useState, useRef, useEffect } from 'react';
import { IonToolbar, IonContent, IonPage, IonButtons, IonMenuButton, IonSegment, IonSegmentButton, IonButton, IonIcon, IonSearchbar, IonRefresher, IonRefresherContent, IonToast, IonModal, IonHeader, getConfig, IonTitle, IonList, IonItem, IonLabel, IonItemSliding, IonAvatar, IonRow } from '@ionic/react';
import { connect } from '../../data/connect';
import { options, personAdd } from 'ionicons/icons';
import '../ListPage.scss'
import * as appointmentselectors from './AppointmentSelectors';
import { Appointment } from './Appointment';
import { loadListAppointment } from './listappointment.actions';
import { setSearchNumber} from './listappointment.actions';
import { SecurityUtils } from '../../util/javascriptUtils';
import moment from 'moment';

interface OwnProps { }

interface StateProps {
  listAppointments: Appointment[];
  mode: 'ios' | 'md'
}

interface DispatchProps {
  setSearchNumber: typeof setSearchNumber;
  loadListAppointment: typeof loadListAppointment;
}

type ListAppointmentPageProps = OwnProps & StateProps & DispatchProps;

const ListAppointmentPage: React.FC<ListAppointmentPageProps> = ({ listAppointments, setSearchNumber,loadListAppointment, mode }) => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const ionRefresherRef = useRef<HTMLIonRefresherElement>(null);
  const [showCompleteToast, setShowCompleteToast] = useState(false);

  const doRefresh = () => {
    setTimeout(() => {
      ionRefresherRef.current!.complete();
      setShowCompleteToast(true);
    }, 2500)
  };

  

  useEffect(() => {
    loadListAppointment();
  }, []);

  return (
    <IonPage id="list-appointment-page" className="list-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>

          <IonTitle>Danh Sách Lịch Khám</IonTitle>

        </IonToolbar>

        <IonToolbar>
          <IonSearchbar
            placeholder="Tìm tên, email, phone"
            onIonChange={(e: CustomEvent) => setSearchNumber(e.detail.value)}
          />
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonRefresher slot="fixed" ref={ionRefresherRef} onIonRefresh={doRefresh}>
          <IonRefresherContent />
        </IonRefresher>
        <IonList>
        {listAppointments && listAppointments.length > 0 ? listAppointments.map((appointment, index: number) => (
          <IonItemSliding key={appointment.id}>
            <IonItem routerLink={`/editAppointment/${appointment.id}`} detail> 
              <IonLabel>
                <h3> Tên: {appointment.patient.fullName}</h3>
                <p> Ngày khám : {moment(appointment.appointDate).format('DD/MM/YYYY')} </p>
                
              </IonLabel>
            </IonItem>
          </IonItemSliding>
          
        )) : <IonRow>
        <IonButton
          size="default"
          color="timec"
          className="ion-center"
          routerLink="/editAppointment/new"
        >
          <IonIcon slot="start" icon={personAdd} />
          Đặt Lịch Khám
        </IonButton>
      </IonRow>}
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
    listAppointments: appointmentselectors.getFilteredAppointments(state),
    mode: getConfig()!.get('mode')
  }),
  mapDispatchToProps: {
    setSearchNumber, loadListAppointment
  },
  component: React.memo(ListAppointmentPage)
});