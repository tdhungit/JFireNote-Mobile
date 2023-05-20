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
import { addCircle, options, trash } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import Linkify from 'react-linkify';
import { RouteComponentProps } from 'react-router';
import AddGroup from '../../components/AddGroup/AddGroup';
import AddNote from '../../components/AddNote/AddNote';
import DeleteGroup from '../../components/DeleteGroup/DeleteGroup';
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
  const [errorMessage, setErrorMessage] = useState('');

  const [title, setTitle] = useState('');
  const [group, setGroup] = useState<any>({});
  const [isEditGroup, setIsEditGroup] = useState(false);
  const [isDeleteGroup, setIsDeleteGroup] = useState(false);
  const [isAddNote, setIsAddNote] = useState(false);

  const [activeNote, setActiveNote] = useState<any>(null);
  const [isOpenNote, setIsOpenNote] = useState(false);

  const getNotesGroup = async (groupId: string) => {
    setLoading(true);
    const groupData: any = await getGroup(db, groupId);
    setTitle(groupData.name);
    setGroup(groupData);
    getNotes(db, match.params.id, (notes: any, error: any) => {
      if (error) {
        console.log(error);
        setErrorMessage(error.message);
        setLoading(false);
      } else if (notes) {
        setNotes(notes);
        setLoading(false);
        setErrorMessage('');
      }
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
          <IonButtons slot='start'>
            {group.id && (
              <IonButton onClick={() => setIsDeleteGroup(true)}>
                <IonIcon icon={trash} />
              </IonButton>
            )}
          </IonButtons>
          <IonTitle>{title}</IonTitle>
          <IonButtons slot='end'>
            {group.name && (
              <IonButton onClick={() => setIsEditGroup(true)}>
                <IonIcon icon={options}></IonIcon>
              </IonButton>
            )}
            <IonButton onClick={() => setIsAddNote(true)}>
              <IonIcon icon={addCircle}></IonIcon>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <AddGroup
          db={db}
          open={isEditGroup}
          onOpenChange={setIsEditGroup}
          id={match.params.id}
          name={group.name}
          onFinish={(values: any) => setTitle(values.name)}
        />
        <DeleteGroup open={isDeleteGroup} onOpenChange={setIsDeleteGroup} db={db} group={group} />
        <AddNote db={db} groupId={match.params.id} open={isAddNote} onOpenChange={setIsAddNote} />
        {activeNote && (
          <NoteDetail db={db} open={isOpenNote} onOpenChange={setIsOpenNote} note={activeNote} />
        )}
        {loading && (
          <div style={{ padding: 10, textAlign: 'center' }}>
            <IonSpinner />
          </div>
        )}
        {errorMessage && (
          <div style={{ padding: 10 }}>
            <Linkify>{errorMessage}</Linkify>
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
