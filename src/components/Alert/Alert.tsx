import { IonAlert } from '@ionic/react';

interface Props {
  message: string;
  setMessage: (message: string) => void;
}

function Alert({ message, setMessage }: Props) {
  return (
    <IonAlert
      isOpen={message ? true : false}
      header='Alert'
      subHeader='Alert Detail'
      message={message}
      buttons={['OK']}
      onDidDismiss={() => setMessage('')}
    ></IonAlert>
  );
}

export default Alert;
