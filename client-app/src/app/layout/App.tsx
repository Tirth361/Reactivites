import Navbar from "./Navbar";
import { Container } from "semantic-ui-react";
import ActivityDashBoard from './../../features/activities/dashboard/ActivityDashboard'
import { observer } from 'mobx-react-lite'
import { Route, useLocation } from 'react-router-dom'
import Home from '../home/Home'
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetail from "../../features/activities/details/ActivityDetail";

function App() {
  const location = useLocation();
  return (
    <>
      <Route exact path='/' component={Home} />
      <Route path={'/(.+)'} render={() => (
        <>
          <Navbar />
          <Container style={{ marginTop: '90px' }}>
            <Route exact path='/activities' component={ActivityDashBoard} />
            <Route path='/activities/:id' component={ActivityDetail} />
            <Route path={['/createActivity', '/manage/:id']} key={location.key} component={ActivityForm} />
          </Container>

        </>
      )} />
    </>
  );
}

export default observer(App);
