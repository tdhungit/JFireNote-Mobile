import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { cog, help, home } from 'ionicons/icons';
import { Redirect, Route } from 'react-router-dom';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/display.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';

/* Theme variables */
import GroupNotes from './pages/GroupNotes/GroupNotes';
import Help from './pages/Help/Help';
import Home from './pages/Home/Home';
import Setting from './pages/Setting/Setting';
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path='/home' component={Home} />
          <Route exact path='/setting' component={Setting} />
          <Route exact path='/help' component={Help} />
          <Route exact path='/group/:id' component={GroupNotes} />
          <Route exact path='/'>
            <Redirect to='/home' />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot='bottom'>
          <IonTabButton tab='home' href='/home'>
            <IonIcon aria-hidden='true' icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab='help' href='/help'>
            <IonIcon aria-hidden='true' icon={help} />
            <IonLabel>Help</IonLabel>
          </IonTabButton>
          <IonTabButton tab='setting' href='/setting'>
            <IonIcon aria-hidden='true' icon={cog} />
            <IonLabel>Setting</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
