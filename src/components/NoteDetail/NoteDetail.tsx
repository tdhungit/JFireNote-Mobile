import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonLoading,
  IonModal,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from '@ionic/react';
import { Firestore } from 'firebase/firestore';
import { trash } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { deleteNote, saveNote } from '../../utils/notes';

interface Props {
  db: Firestore;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  note: any;
}

function NoteDetail({ db, open, onOpenChange, note }: Props) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const [presentAlert] = useIonAlert();

  useEffect(() => {
    setText(note.content);
  }, [note]);

  const updateText = (value: string) => {
    setText(value);
  };

  const saveText = async (text: string) => {
    await saveNote(db, note.id, undefined, text);
  };

  useEffect(() => {
    saveText(text);
  }, [text]);

  const handleDelete = async () => {
    setLoading(true);
    onOpenChange(false);
    await deleteNote(db, note.id);
    setLoading(false);
  };

  const onDelete = () => {
    presentAlert({
      header: 'Confirm',
      message: 'Are you sure you will delete this note?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            handleDelete();
          },
        },
      ],
    });
  };

  const textOptions = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link'],
    ],
  };

  return (
    <IonModal isOpen={open}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonButton onClick={onDelete}>
              <IonIcon icon={trash} />
            </IonButton>
          </IonButtons>
          <IonTitle>{note.name}</IonTitle>
          <IonButtons slot='end'>
            <IonButton onClick={() => onOpenChange(false)}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent style={{ height: '100vh' }}>
        <IonLoading isOpen={loading} />
        <ReactQuill
          theme='snow'
          value={text}
          onChange={updateText}
          style={{ height: '90%' }}
          modules={textOptions}
        />
      </IonContent>
    </IonModal>
  );
}

export default NoteDetail;
