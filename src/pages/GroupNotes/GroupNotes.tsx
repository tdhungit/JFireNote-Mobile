import {
  IonButton,
  IonButtons,
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
} from '@ionic/react';
import { add } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import AddNote from '../../components/AddNote/AddNote';
import NoteDetail from '../../components/NoteDetail/NoteDetail';
import { getDatabase } from '../../config/firebase';
import { getGroup, getNotes } from '../../utils/notes';

interface Props
  extends RouteComponentProps<{
    id: string;
  }> {}

function GroupNotes({ match }: Props) {
  const { db } = getDatabase();

  const [notes, setNotes] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState('');

  const [activeNote, setActiveNote] = useState<any>(null);
  const [isOpenNote, setIsOpenNote] = useState(false);

  const [isAddNote, setIsAddNote] = useState(false);

  const getNotesGroup = async (groupId: string) => {
    setLoading(true);
    const group: any = await getGroup(db, groupId);
    setTitle(group.name);
    getNotes(db, match.params.id, (notes: any) => {
      setNotes(notes);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (match.params.id) {
      getNotesGroup(match.params.id);
    }
  }, [match.params.id]);

  const openNote = (note: any) => {
    setActiveNote(note);
    setIsOpenNote(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{title}</IonTitle>
          <IonButtons slot='end'>
            <IonButton onClick={() => setIsAddNote(true)}>
              <IonIcon icon={add}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <AddNote
          db={db}
          groupId={match.params.id}
          open={isAddNote}
          onOpenChange={setIsAddNote}
        />
        {activeNote && (
          <NoteDetail
            db={db}
            open={isOpenNote}
            onOpenChange={setIsOpenNote}
            note={activeNote}
          />
        )}
        {loading && (
          <div style={{ padding: 10, textAlign: 'center' }}>
            <IonSpinner />
          </div>
        )}
        <IonList inset={true}>
          {notes.map((n: any) => (
            <IonItem key={n.id} button onClick={() => openNote(n)}>
              <IonLabel>
                <h2>{n.name}</h2>
                <p>note...</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
}

export default GroupNotes;
