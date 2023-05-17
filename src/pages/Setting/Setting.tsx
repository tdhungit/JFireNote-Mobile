import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonList,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import Alert from '../../components/Alert/Alert';
import { getFbSettings, saveFbSettings } from '../../config/firebase';

function Setting() {
  const [firebaseConfig, setFirebaseConfig] = useState<any>('');
  const [alertMessage, setAlertMessage] = useState('');

  useEffect(() => {
    const config = getFbSettings();
    if (config) {
      setFirebaseConfig(config);
    }
  }, []);

  const saveConfig = () => {
    saveFbSettings(firebaseConfig);
    setAlertMessage('Success');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Setting</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <Alert message={alertMessage} setMessage={setAlertMessage} />
        <div>
          <IonList>
            <IonItem>
              <IonTextarea
                label='Firebase config'
                labelPlacement='floating'
                placeholder='Copy Paste Firebase Config to Here'
                autoGrow={true}
                value={firebaseConfig}
                onIonChange={(e) => setFirebaseConfig(e.target.value)}
              ></IonTextarea>
            </IonItem>
          </IonList>
          <IonButton expand='block' onClick={saveConfig}>
            Save
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default Setting;
