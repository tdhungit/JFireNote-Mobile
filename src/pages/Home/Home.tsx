import {
  IonButton,
  IonButtons,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from '@ionic/react';
import { add } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import AddGroup from '../../components/AddGroup/AddGroup';
import { getDatabase } from '../../config/firebase';
import { getGroups } from '../../utils/notes';

function Home() {
  const router = useIonRouter();
  const { app, db } = getDatabase();

  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState<any>([]);

  const [isAddGroup, setIsAddGroup] = useState(false);

  useEffect(() => {
    if (!app) {
      return router.push('/setting');
    }

    loadGroups();
  }, []);

  const loadGroups = async () => {
    setLoading(true);
    getGroups(db, (groups) => {
      setGroups(groups);
      setLoading(false);
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Groups</IonTitle>
          <IonButtons slot='end'>
            <IonButton onClick={() => setIsAddGroup(true)}>
              <IonIcon icon={add}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <AddGroup db={db} open={isAddGroup} onOpenChange={setIsAddGroup} />
        {loading && (
          <div style={{ textAlign: 'center', padding: 10 }}>
            <IonSpinner />
          </div>
        )}
        <IonList inset={true}>
          {groups.map((g: any) => (
            <IonItem key={g.id} href={`/group/${g.id}`}>
              <IonLabel>{g.name}</IonLabel>
              <IonChip outline={true} slot='end'>
                {g.count || 0}
              </IonChip>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
}

export default Home;
