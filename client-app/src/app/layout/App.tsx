import Navbar from "./Navbar";
import { Container } from "semantic-ui-react";
import ActivityDashBoard from './../../features/activities/dashboard/ActivityDashboard'
import { observer } from 'mobx-react-lite'
import { Route, useLocation , Switch} from 'react-router-dom'
import Home from '../home/Home'
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetail from "../../features/activities/details/ActivityDetail";
import TestError from "../../features/errors/TestError";
import { ToastContainer } from 'react-toastify'
import Notfound from "../../features/errors/Notfound";
import ServerError from "../../features/errors/ServerError";
import LoginForm from "../../features/users/LoginForm";
import { useStore } from "../stores/store";
import { useEffect } from "react";
import LoadingComponents from "./LoadingComponents";
import ModalContainer from "../common/modals/ModalContainer";
import ProfilePage from "../../features/profiles/ProfilePage";

function App() {
  const location = useLocation();
  const { userStore , commonStore } = useStore();

  useEffect(() => {
    if(commonStore.token){
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    }
    else{
      commonStore.setAppLoaded();
    }
  },[commonStore,userStore])

  if(!commonStore.appLoaded) return <LoadingComponents content="Loading app..." />
  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar />
      <ModalContainer />
      <Route exact path='/' component={Home} />
      <Route path={'/(.+)'} render={() => (
        <>
          <Navbar />
          <Container style={{ marginTop: '90px' }}>
            <Switch>
            <Route exact path='/activities' component={ActivityDashBoard} />
            <Route path='/activities/:id' component={ActivityDetail} />
            <Route path={['/createActivity', '/manage/:id']} key={location.key} component={ActivityForm} />
            <Route path= '/profile/:username' component={ProfilePage} />
            <Route path= '/errors' component={TestError} />
            <Route path= '/server-error' component={ServerError} />
            <Route path= '/login' component={LoginForm} />
            <Route component={Notfound} />
            </Switch>
          </Container>
        </>
      )} />
    </>
  );
}

export default observer(App);
