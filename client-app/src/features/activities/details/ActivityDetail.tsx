import React from "react";
import { Button, Card, Icon ,Image } from "semantic-ui-react";
import { Activity } from "../../../app/model/activity";

interface Props {
    activity : Activity;
    cancelActivity : () => void;
    openForm : (id : string) => void;
}
const ActivityDetail = ({activity , cancelActivity,openForm} : Props) => {
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
                <Button onClick={() => openForm(activity.id)} basic color="blue" content ='Edit' />
                <Button onClick={() => cancelActivity()} basic color="grey" content ='Cancel' />
            </Card.Content>
        </Card>
    )
}

export default ActivityDetail;