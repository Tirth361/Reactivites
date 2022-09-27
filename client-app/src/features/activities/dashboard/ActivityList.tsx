import { SyntheticEvent, useState } from "react"
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import {observer} from 'mobx-react-lite'
import {NavLink} from'react-router-dom'


const ActivityList = () => {

    const {activityStore} = useStore()
    const { deleteActivity } = activityStore;

    const [target , setTarget] = useState('');

    const handleActivityDelete = (e:SyntheticEvent<HTMLButtonElement> , id:string) => {
        setTarget(e.currentTarget.name)
        deleteActivity(id)
    }

    return (
        <Segment>
            <Item.Group divided>
                {activityStore.activitesByDate.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date.toString()}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city}, {activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button as={NavLink} to = {`activities/${activity.id}`}  floated="right" content = 'View' color="blue" />
                                <Button 
                                name = {activity.id} 
                                loading = {activityStore.loading && target == activity.id} 
                                onClick={(e) => handleActivityDelete(e,activity.id)} 
                                floated="right" content = 'Delete' color="red" />
                                <Label basic content = {activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    );
}
export default observer(ActivityList);