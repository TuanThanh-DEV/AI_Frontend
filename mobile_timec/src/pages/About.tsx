import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonButton, IonIcon, IonDatetime, IonSelectOption, IonList, IonItem, IonLabel, IonSelect, IonPopover } from '@ionic/react';
import './About.scss';
import { calendar, pin, more } from 'ionicons/icons';
import AboutPopover from '../components/AboutPopover';

interface AboutProps { }

const About: React.FC<AboutProps> = () => {

  const [showPopover, setShowPopover] = useState(false);
  const [popoverEvent, setPopoverEvent] = useState();

  const presentPopover = (e: React.MouseEvent) => {
    // setPopoverEvent(e.nativeEvent);
    setShowPopover(true);
  };
  const conferenceDate = '2047-05-17';

  return (
    <IonPage id="about-page">
      <IonHeader>
        <IonToolbar color="timec">
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>About</IonTitle>
          {/* <IonButtons slot="end">
            <IonButton icon-only onClick={presentPopover}>
              <IonIcon slot="icon-only" icon={more}></IonIcon>
            </IonButton>
          </IonButtons> */}
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <div className="about-header">
          <img src="assets/img/logo_timec.png" alt="TIMEC logo" />
        </div>
        <div className="about-info">
          {/* <h4 className="ion-padding-start">TIMEC Mobile App</h4> */}

          <p className="ion-padding-start ion-padding-end">
          Hệ thống phòng khám quốc tế Timec là nơi tinh hoa y học châu Âu hội tụ cùng sự ân cần nồng hậu của người châu Á. Chúng tôi tạo ra một môi trường hiện đại, thoải mái, nơi bác sĩ là những người bạn thân của bạn, và bạn chính là trung tâm của dịch vụ chất lượng cao với giá phải chăng.
          </p>
        </div>
      </IonContent>
      <IonPopover
        isOpen={showPopover}
        event={popoverEvent}
        onDidDismiss={() => setShowPopover(false)}
      >
        <AboutPopover dismiss={() => setShowPopover(false)} /> 
      </IonPopover>
    </IonPage>
  );
};

export default React.memo(About);