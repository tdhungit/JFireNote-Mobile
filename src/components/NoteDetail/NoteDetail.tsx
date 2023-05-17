import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { Firestore } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { saveNote } from '../../utils/notes';

interface Props {
  db: Firestore;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  note: any;
}

function NoteDetail({ db, open, onOpenChange, note }: Props) {
  const [text, setText] = useState('');

  useEffect(() => {
    setText(note.content);
  }, [note]);

  const saveText = async (text: string) => {
    await saveNote(db, note.id, undefined, text);
  };

  useMemo(() => {
    saveText(text);
  }, [text]);

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
          <IonTitle>{note.name}</IonTitle>
          <IonButtons slot='end'>
            <IonButton onClick={() => onOpenChange(false)}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent style={{ height: '100vh' }}>
        <ReactQuill
          theme='snow'
          value={text}
          onChange={setText}
          style={{ height: '90%' }}
          modules={textOptions}
        />
      </IonContent>
    </IonModal>
  );
}

export default NoteDetail;
