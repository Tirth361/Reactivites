import { SyntheticEvent , useState } from "react";
import { Item, Button, SegmentGroup, Segment, ItemGroup, ItemImage, ItemContent, ItemHeader, ItemDescription, Icon, Label } from "semantic-ui-react";
import { Activity } from "../../../app/model/activity";
import {Link} from 'react-router-dom'
import { useStore } from "../../../app/stores/store";
import {format} from 'date-fns'
import ActivityListItemAttendees from "./ActivityListItemAttendees";

interface Props {
    activity : Activity
}

const ActivityListItem = ({ activity } : Props) => {

    const {activityStore} = useStore()
    const { deleteActivity } = activityStore;
    
    const [target , setTarget] = useState('');

    const handleActivityDelete = (e:SyntheticEvent<HTMLButtonElement> , id:string) => {
        setTarget(e.currentTarget.name)
        deleteActivity(id)
    }
    
    return (
        <SegmentGroup>
            <Segment>
                {   
                    activity.isCancelled && 
                    <Label attached="top" color="red" content = 'Cancelled' style = {{TextAlign : 'center'}} />
                }
               <Item.Group>
                <Item>
                    <Item.Image size="tiny" circular src = {activity.host?.image || 'assets/user.png'} style = {{marginBottom : 5}} />
                    <Item.Content>
                        <Item.Header as={Link} to = {`/activities/${activity.id}`}>{activity.title}</Item.Header>
                        <Item.Description>Hosted By <Link to={`profile/${activity.hostUsername}`}>{activity.host?.displayName}</Link></Item.Description>
                        {activity.isHost && (
                            <Item.Description>
                                <Label basic color="orange">
                                    You are hosting this activity
                                </Label>
                            </Item.Description>
                        )}
                        {!activity.isHost && activity.isGoing && (
                            <Item.Description>
                                <Label basic color="green">
                                    You are going this activity
                                </Label>
                            </Item.Description>
                        )}
                    </Item.Content>
                </Item>
               </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name="clock" />{format(activity.date!,'dd MMM yyyy h:mm aa')}
                    <Icon name="marker" />{activity.venue}
                </span>
            </Segment>
            <Segment secondary>
                <ActivityListItemAttendees attendees={activity.attendees!} />
            </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button
                as={Link}
                to = {`/activities/${activity.id}`}
                color = 'teal'
                floated = 'right'
                content = 'View'
                />
            </Segment>
        </SegmentGroup>
    )
}

export default ActivityListItem;
