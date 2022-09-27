import { Button, Card, Image } from "semantic-ui-react";
import LoadingComponents from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import {observer} from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import { useEffect } from "react";
import { Link } from 'react-router-dom'

const ActivityDetail = () => {
    const {activityStore} = useStore();
    const {selectedActivity : activity,loadActivity , loadingInitial} = activityStore;
    const { id } = useParams<{id : string}>()

    useEffect(() => {
        if(id) loadActivity(id)
    })

    if(!activity || loadingInitial) return <LoadingComponents /> ;
    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span className='date'>{activity.date.toString()}</span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button as={Link} to = {`/manage/${activity.id}`} basic color="blue" content ='Edit' />
                <Button as={Link} to = {'/activities'} basic color="grey" content ='Cancel' />
            </Card.Content>
        </Card>
    )
}

export default observer(ActivityDetail);