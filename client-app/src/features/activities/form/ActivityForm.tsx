import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/model/activity";
import { useStore } from "../../../app/stores/store";
import { observer } from 'mobx-react-lite'
import { useParams , useHistory , Link , useLocation  } from 'react-router-dom'
import LoadingComponents from "../../../app/layout/LoadingComponents";
import { v4 as uuid } from 'uuid'

interface Props {
    activity: Activity | undefined;
}

const ActivityForm = ({ activity: selectedActivtiy }: Props) => {

    const { activityStore } = useStore();
    const { createActivity, updateActivity, loading , loadActivity , loadingInitial} = activityStore;
    const { id } = useParams<{ id: string }>();
    const history = useHistory();
    const location = useLocation()
    const [activity, setActivity] = useState({
        id: "",
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    })

    useEffect(() => {
        if(id) loadActivity(id).then(activity => setActivity(activity!))
    },[id,loadActivity])

    const handleSubmit = () => {
        if(activity.id.length === 0 ){
            let newActivity = {
                ...activity,
                id : uuid()
            };
            createActivity(newActivity).then(() => history.push(`activities/${newActivity.id}`))
        }
        else{
            updateActivity(activity).then(() => history.push(`/activities/${activity.id}`))
        }
    }

    const handleInputChanges = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value })
    }

    if(loadingInitial) return <LoadingComponents content="Loading Activity..." />

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleInputChanges} />
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleInputChanges} />
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handleInputChanges} />
                <Form.Input type="date" placeholder='Date' value={activity.date} name='date' onChange={handleInputChanges} />
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handleInputChanges} />
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handleInputChanges} />
                <Button loading={loading} floated="right" positive type="submit" content='Submit' />
                <Button as={Link} to = '/activities'  floated="right" type="button" color="red" content='Cancel' />
            </Form>
        </Segment>
    )
}
export default observer(ActivityForm);