import { Button, Card, Grid, Image } from "semantic-ui-react";
import LoadingComponents from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import { useEffect } from "react";
import { Link } from 'react-router-dom'
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar";

const ActivityDetail = () => {
    const { activityStore } = useStore();
    const { selectedActivity: activity, loadActivity, loadingInitial } = activityStore;
    const { id } = useParams<{ id: string }>()

    useEffect(() => {
        if (id) loadActivity(id)
    })

    if (!activity || loadingInitial) return <LoadingComponents />;
    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailedHeader activity={activity} />
                <ActivityDetailedInfo activity={activity} />
                <ActivityDetailedChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailedSidebar />
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDetail);