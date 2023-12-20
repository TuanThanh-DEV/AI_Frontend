import React, { useState, useEffect, useRef } from "react";

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonPage,
  IonButtons,
  IonMenuButton,
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonRow,
  IonCol,
  IonGrid,
  getConfig,
  IonList,
  IonItemSliding,
  IonThumbnail,
  IonRouterLink,
  IonSearchbar,
} from "@ionic/react";
import { connect } from "../data/connect";
import "./About.scss";
import {
  calendar,
  pin,
  more,
  star,
  personAdd,
  closeCircle,
} from "ionicons/icons";
import "./Home.scss";
import { loadListWeb } from "./appointment/listappointment.actions";
import { DataWebsite } from "../models/DataWebsite";
import * as appointmentselectors from "./appointment/AppointmentSelectors";

interface OwnProps {}

interface StateProps {
  listWebs: DataWebsite[];
  mode: "ios" | "md";
}

interface DispatchProps {
  loadListWeb: typeof loadListWeb;
}
type HomeProps = OwnProps & StateProps & DispatchProps;

const Home: React.FC<HomeProps> = ({
  // listWebs,
  // loadListWeb,
 }) => {
  useEffect(() => {
    loadListWeb();
  }, []);
  const listWebs = [
    {
      id: 1,
      title: "RA MẮT GÓI KIỂM TRA TỔNG QUÁT DẬY THÌ SỚM Ở TRẺ",
      url: "https://timec.vn/ra-mat-goi-kiem-tra-tong-quat-day-thi-som-o-tre/",
      img: "https://timec.vn/wp-content/uploads/2019/09/feature-picture-vn_0003298_700-428x260.png",
    },
    {
      id: 2,
      title: "GÓI TẨY TRẮNG RĂNG",
      url: "https://timec.vn/giam-20-goi-tay-trang-rang-bang-den-philips-zoom-whitespeed/",
      img: "https://timec.vn/wp-content/uploads/2019/09/fb-goi-tay-trang-rang_0003236_700-428x260.png",
    },
    {
      id: 3,
      title: "CÁC GÓI KHÁM SỨC KHỎE CHO NỮ",
      url: "https://timec.vn/giam-20-cac-goi-kham-suc-khoe-cho-nu/",
      img: "https://timec.vn/wp-content/uploads/2019/09/hin1525958990_4832-428x260.jpg",
    },
    {
      id: 4,
      title: "CÁC GÓI KHÁM BEST-SELLER KHI ĐĂNG KÝ ONLINE",
      url: "https://timec.vn/giam-15-cac-goi-kham-best-seller-khi-dang-ky-online/",
      img: "https://timec.vn/wp-content/uploads/2019/09/doktorhasta-428x260.jpg",
    },
    {
      id: 5,
      title: "KHÁM SỨC KHỎE TIỀN HÔN NHÂN CHO NAM",
      url: "https://timec.vn/goi_kham_suc_khoe/kham-suc-khoe-tien-hon-nhan-cho-nam/",
      img: "https://timec.vn/wp-content/uploads/2019/09/nam-428x260.jpg",
    },
    {
      id: 6,
      title: "TẦM SOÁT TIỂU ĐƯỜNG",
      url: "https://timec.vn/goi_kham_suc_khoe/tam-soat-tieu-duong/",
      img: "https://timec.vn/wp-content/uploads/2019/09/tieuduong-428x260.jpg",
    },
    {
      id: 7,
      title: "XÉT NGHIỆM HPV COBAS – PHÁT HIỆN SỚM NGUY CƠ UNG THƯ CỔ TỬ CUNG",
      url: "https://timec.vn/goi_kham_suc_khoe/xet-nghiem-hpv-cobas-phat-hien-som-nguy-co-ung-thu-co-tu-cung/",
      img: "https://timec.vn/wp-content/uploads/2019/09/khamsuckhoe-428x260.jpg",
    },
    {
      id: 8,
      title: "KHÁM PHỤ KHOA TOÀN DIỆN CHO NỮ ĐỘC THÂN",
      url: "https://timec.vn/goi_kham_suc_khoe/kham-phu-khoa-toan-dien-cho-nu-doc-than/",
      img: "https://timec.vn/wp-content/uploads/2019/09/phukhoa-428x260.jpg",
    },
    
  ];
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="timec">
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle style={{ textAlign: "center" }}>
            <img src="assets/img/logo_light.png" alt="TIMEC logo" width="50%" />
          </IonTitle>
          <IonButtons slot="end">
            {/* <IonButton icon-only onClick={presentPopover}>
              <IonIcon slot="icon-only" icon={more}></IonIcon>
            </IonButton> */}
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonToolbar color="timec">
          <IonSearchbar
            style={{ width: "80%" }}
            className="ion-center"
            placeholder="Phòng khám TIMEC"
            value=""
            animated
          ></IonSearchbar>
        </IonToolbar>
        <IonRow>
          <img src="assets/img/banner.jpg" alt="TIMEC banner" className="ion-banner"/>
        </IonRow>
        <IonRow>
          <IonButton
            size="default"
            color="timec"
            className="ion-center"
            routerLink="/editAppointment/new"
          >
            <IonIcon slot="start" icon={personAdd} />
            Đặt Lịch Khám
          </IonButton>
        </IonRow>

        <IonList>
          {listWebs.map((posts) => (
            <a className="ion-a-decoration" target="_blank" href={posts.url} key={posts.id}>
              <IonItem >
                <IonThumbnail slot="start">
                  <img src={posts.img} />
                </IonThumbnail>
                <IonLabel className="icon-wrap">
                  {posts.title}
                  {/* <p>
                  {posts.artist}, {posts.year}
                </p> */}
                </IonLabel>
              </IonItem>
            </a>
          ))}
        </IonList>
        {/* <IonGrid>
          <IonRow className="ion-center">
            <IonCol size="6" size-sm>
              <IonButton color="default" className="ion-panel">
                <IonItem lines="none">
                  <IonToolbar className="ion-center ">
                    <img
                      src="assets/img/bookPlus.png"
                      alt="TIMEC logo"
                      width="40%"
                    />
                    <IonLabel>
                      Phiếu Khám <br /> Bệnh
                    </IonLabel>
                  </IonToolbar>
                </IonItem>
              </IonButton>
            </IonCol>
            <IonCol size="6" size-sm>
              <IonButton
                color="default"
                className="ion-panel"
                onClick={() => {}}
              >
                <IonItem lines="none">
                  <IonToolbar className="ion-center ">
                    <img
                      src="assets/img/calendar.png"
                      alt="TIMEC logo"
                      width="40%"
                    />
                    <IonLabel>
                      Lịch <br /> Tái Khám
                    </IonLabel>
                  </IonToolbar>
                </IonItem>
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid> */}
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    listWebs: appointmentselectors.getDataWebsite(state),
    mode: getConfig()!.get("mode"),
  }),
  mapDispatchToProps: {
    loadListWeb,
  },
  component: React.memo(Home),
});
