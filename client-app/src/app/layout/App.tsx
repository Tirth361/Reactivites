import Navbar from "./Navbar";
import { Container } from "semantic-ui-react";
import { useEffect,useState } from "react";
import { Activity } from "../model/activity";
import ActivityDashBoard from './../../features/activities/dashboard/ActivityDashboard'
import {v4 as uuid} from 'uuid'
import agent from "../api/agent";
import LoadingComponents from "./LoadingComponents";
import axios from 'axios';

function App() {

  const [activities , setActivities] = useState<Activity[]>([]);
  const [selectedActivity , setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode , setEditMode] = useState<Boolean>(false);
  const [loading , setLoading] = useState<boolean>(true);
  const [submitting , setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    agent.Activites.list().then(res => {
      let activities : Activity[] = [];
      res.forEach(activity => {
        activity.date = activity.date.split('T')[0];
        activities.push(activity)
      });
      setActivities(activities)
      setLoading(false);
    }).catch(err => console.log(err))
  },[])

  const handleSelectActivity = (id:string) => {
    setSelectedActivity(activities.find(x => x.id == id))
  }
  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined)
  }
  const handleFormOpen = (id? : string) => {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  }
  const handleFormClose = () => {
    setEditMode(false);
  }
  const handleCreateOrEditActivity = (activity : Activity) => {
    setSubmitting(true);
    if(activity.id){
      console.log(activity)
      agent.Activites.update(activity).then(() => {
        setActivities([...activities.filter(x => x.id !== activity.id),activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    }
    else{
      activity.id = uuid();
      agent.Activites.create(activity).then(() => {
        setActivities([...activities,activity])
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    }
  }
  const handleDeleteActivity = (id : string) => {
    setSubmitting(true);
    agent.Activites.delete(id).then(() => {
      setActivities([...activities.filter(x => x.id !== id)]);
      setSubmitting(false);
    })
    
  }

  if(loading) return <LoadingComponents content="Loading app" />

  return (
    <>
      <Navbar openForm = {handleFormOpen} />
      <Container style={{marginTop : '90px'}}>
        <ActivityDashBoard 
        activites={activities} 
        selectedActivity = {selectedActivity} 
        selectActivity = {handleSelectActivity} 
        cancelActivity = {handleCancelSelectActivity} 
        openForm = {handleFormOpen}
        closeForm = {handleFormClose}
        editMode = {editMode}
        createOrEditActivity = {handleCreateOrEditActivity}
        deleteActivity = {handleDeleteActivity}
        submitting = {submitting}
        />
      </Container>
    </>
  );
}

export default App;
