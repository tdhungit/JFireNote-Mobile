import {
  IonContent,
  IonHeader,
  IonImg,
  IonItem,
  IonNote,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

function Help() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Help</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <IonText>
          <h2>How to use?</h2>
        </IonText>
        <IonItem>
          <IonNote>
            <strong>
              Go to <a href='https://console.firebase.google.com'>Firebase Console</a>
            </strong>
            <p>Create Firebase Account and FireStore project</p>
          </IonNote>
        </IonItem>
        <IonItem style={{ paddingTop: 10 }}>
          <IonNote>
            <strong>Go To project setting</strong>
            <p>
              <IonImg src='install_1.png' />
            </p>
          </IonNote>
        </IonItem>
        <IonItem style={{ paddingTop: 10 }}>
          <IonNote>
            <strong>In General tab</strong>
            <p>
              <IonImg src='install_2.png' />
            </p>
          </IonNote>
        </IonItem>
        <IonItem style={{ paddingTop: 10 }}>
          <IonNote>
            <strong>
              Choose project {'-->'} choose config {'-->'} click copy
            </strong>
            <p>
              <IonImg src='install_3.png' />
            </p>
          </IonNote>
        </IonItem>
        <IonItem style={{ paddingTop: 10 }}>
          <IonNote>
            <strong>Go to Setting App and paste it to config after click save</strong>
            <p>
              <IonImg src='install_4.png' />
            </p>
          </IonNote>
        </IonItem>
      </IonContent>
    </IonPage>
  );
}

export default Help;
