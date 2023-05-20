import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonList,
  IonLoading,
  IonModal,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from '@ionic/react';
import { Firestore } from 'firebase/firestore';
import { trash } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { deleteGroup, getGroups } from '../../utils/notes';

interface Props {
  db: Firestore;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  group: any;
}

function DeleteGroup({ db, open, group, onOpenChange }: Props) {
  const router = useIonRouter();

  const [choiceGroups, setChoiceGroups] = useState<any>([]);
  const [moveToGroupId, setMoveToGroupId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let moveToGroups: any = [];
    getGroups(db, (groups: any) => {
      groups.map((g: any) => {
        if (g.id !== group.id) {
          moveToGroups.push(g);
        }
      });
      setChoiceGroups(moveToGroups);
    });
  }, [group]);

  const onDelete = () => {
    setLoading(true);
    deleteGroup(db, group.id, moveToGroupId, () => {
      router.push('/');
      setLoading(false);
      onOpenChange(false);
    });
  };

  return (
    <IonModal isOpen={open}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Delete group?</IonTitle>
          <IonButtons slot='end'>
            <IonButton onClick={() => onOpenChange(false)}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <IonLoading isOpen={loading} />

        <IonText>
          <h4>Are you sure to delete group {group.name}?</h4>
        </IonText>

        <IonList inset>
          <IonItem>
            <IonSelect
              placeholder='Choose new group to move notes'
              onIonChange={(e) => setMoveToGroupId(e.target.value)}
            >
              {choiceGroups &&
                choiceGroups.forEach((g: any, index: number) => (
                  <IonSelectOption key={index} value={g.id}>
                    {g.name}
                  </IonSelectOption>
                ))}
            </IonSelect>
          </IonItem>
        </IonList>
        <IonButton expand='block' onClick={onDelete}>
          <IonIcon icon={trash} /> Delete
        </IonButton>
      </IonContent>
    </IonModal>
  );
}

export default DeleteGroup;
