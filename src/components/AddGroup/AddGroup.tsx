import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonList,
  IonLoading,
  IonModal,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { Firestore } from 'firebase/firestore';
import { close, save } from 'ionicons/icons';
import { useState } from 'react';
import { addGroupNote } from '../../utils/notes';

interface Props {
  db: Firestore;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id?: string;
  name?: string;
}

function AddGroup({ db, open, onOpenChange, id }: Props) {
  const [title, setTitle] = useState('Add Group');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const onSave = async () => {
    if (!name) {
      return;
    }

    setLoading(true);
    if (id) {
    } else {
      await addGroupNote(db, name);
    }
    setLoading(false);
    onOpenChange(false);
  };

  return (
    <IonModal isOpen={open}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonButton onClick={() => onOpenChange(false)}>
              <IonIcon icon={close} />
            </IonButton>
          </IonButtons>
          <IonTitle>{title}</IonTitle>
          <IonButtons slot='end'>
            <IonButton onClick={() => onSave()}>
              <IonIcon icon={save} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonLoading isOpen={loading} />
        <IonList>
          <IonItem>
            <IonInput
              label='Group Name'
              labelPlacement='stacked'
              clearInput={true}
              placeholder='Enter group name'
              value={name}
              onIonChange={(e) => setName(e.target.value?.toString() || '')}
            ></IonInput>
          </IonItem>
        </IonList>
      </IonContent>
    </IonModal>
  );
}

export default AddGroup;
