import Navbar from "./Navbar";
import { Container } from "semantic-ui-react";
import { useEffect,useState } from "react";
import axios from "axios";
import { Activity } from "../model/activity";
import ActivityDashBoard from './../../features/activities/dashboard/ActivityDashboard'
import {v4 as uuid} from 'uuid'

function App() {

  const [activities , setActivities] = useState<Activity[]>([]);
  const [selectedActivity , setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode , setEditMode] = useState<Boolean>(false);

  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities').then(res => setActivities(res.data)).catch(err => console.log(err))
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
    activity.id ? setActivities([...activities.filter(x => x.id !== activity.id),activity])
    : setActivities([...activities,{...activity,id : uuid()}])
    setEditMode(false);
    setSelectedActivity(activity);
  }
  const handleDeleteActivity = (id : string) => {
    setActivities([...activities.filter(x => x.id !== id)])
  }

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
        />
      </Container>
    </>
  );
}

export default App;
