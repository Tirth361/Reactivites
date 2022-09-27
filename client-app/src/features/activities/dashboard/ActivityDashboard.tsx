import { Grid, GridColumn } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import ActivityDetail from "../details/ActivityDetail";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";
import {observer} from 'mobx-react-lite'
import { useEffect } from "react";
import LoadingComponents from "../../../app/layout/LoadingComponents";


const ActivityDashBoard = () => {
    const {activityStore} = useStore();
    const {loadActivites , activityRegistry } = activityStore;

    useEffect(() => {
        if(activityRegistry.size <= 1) loadActivites();
      },[activityRegistry.size , loadActivites])

      if(activityStore.loadingInitial) return <LoadingComponents content="Loading app" />
      
    return (
        <>
            <Grid>
                <GridColumn width={10}>
                    <ActivityList />
                </GridColumn>
                <GridColumn width={6}>
                    <h2>Activity filter</h2>
                </GridColumn>
            </Grid>
        </>
    )
}

export default observer(ActivityDashBoard)