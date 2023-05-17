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
import { addNote } from '../../utils/notes';

interface Props {
  db: Firestore;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groupId: string;
  id?: string;
  name?: string;
}

function AddNote({ db, open, onOpenChange, groupId, id }: Props) {
  const [title, setTitle] = useState('Add Note');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const onSave = async () => {
    if (!name) {
      return;
    }

    setLoading(true);
    if (id) {
    } else {
      await addNote(db, name, groupId);
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
              label='Note Name'
              labelPlacement='stacked'
              clearInput={true}
              placeholder='Enter note name'
              value={name}
              onIonChange={(e) => setName(e.target.value?.toString() || '')}
            ></IonInput>
          </IonItem>
        </IonList>
      </IonContent>
    </IonModal>
  );
}

export default AddNote;
