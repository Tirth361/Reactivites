import { SyntheticEvent , useState } from "react";
import { Item, Button, SegmentGroup, Segment, ItemGroup, ItemImage, ItemContent, ItemHeader, ItemDescription, Icon } from "semantic-ui-react";
import { Activity } from "../../../app/model/activity";
import {Link} from 'react-router-dom'
import { useStore } from "../../../app/stores/store";
import {format} from 'date-fns'

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
               <Item.Group>
                <Item>
                    <Item.Image size="tiny" circular src = 'assets/user.png' />
                    <Item.Content>
                        <Item.Header as={Link} to = {`/activities/${activity.id}`}>{activity.title}</Item.Header>
                        <Item.Description>Hosted By Bob</Item.Description>
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
                Attendees go here
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
