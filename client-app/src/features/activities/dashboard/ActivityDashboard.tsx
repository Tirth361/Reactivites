import React from "react";
import { Grid, GridColumn, List, ListItem } from "semantic-ui-react";
import { Activity } from "../../../app/model/activity";
import ActivityDetail from "../details/ActivityDetail";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface Props {
    activites : Activity[];
    selectedActivity : Activity | undefined;
    selectActivity : (id : string) => void;
    cancelActivity : () => void;
    openForm : (id : string) => void;
    closeForm : () => void;
    editMode: Boolean;
    createOrEditActivity : (activity : Activity) => void;
    deleteActivity : (id:string) => void;
}

const ActivityDashBoard = ({activites , selectedActivity , selectActivity , cancelActivity,openForm,closeForm,editMode,createOrEditActivity,deleteActivity} : Props) => {
    return (
        <>
            <Grid>
                <GridColumn width={10}>
                    <ActivityList activites={activites} selectActivity = {selectActivity} deleteActivity = {deleteActivity} />
                </GridColumn>
                <GridColumn width={6}>
                    {
                        selectedActivity && !editMode && <ActivityDetail activity = {selectedActivity} cancelActivity = {cancelActivity} openForm = {openForm}   />
                    }
                    {
                        editMode && <ActivityForm closeForm = {closeForm} activity = {selectedActivity} createOrEditActivity = {createOrEditActivity}  />
                    }
                </GridColumn>
            </Grid>
        </>
    )
}

export default ActivityDashBoard;