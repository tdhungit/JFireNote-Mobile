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
import { useEffect, useState } from 'react';
import { addGroupNote, updateGroup } from '../../utils/notes';

interface Props {
  db: Firestore;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  id?: string;
  name?: string;
  onFinish?: (values: any) => void;
}

function AddGroup({ db, open, onOpenChange, id, name, onFinish }: Props) {
  const [title, setTitle] = useState('Add Group');
  const [newName, setNewName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id && name) {
      setNewName(name);
      setTitle('Edit Group');
    }
  }, [id, name]);

  const onSave = async () => {
    if (!newName) {
      return;
    }

    setLoading(true);
    if (id) {
      await updateGroup(db, id, newName);
    } else {
      await addGroupNote(db, newName);
    }
    setLoading(false);
    onOpenChange(false);
    onFinish && onFinish({ name: newName });
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
              value={newName}
              onIonChange={(e) => setNewName(e.target.value?.toString() || '')}
            ></IonInput>
          </IonItem>
        </IonList>
      </IonContent>
    </IonModal>
  );
}

export default AddGroup;
