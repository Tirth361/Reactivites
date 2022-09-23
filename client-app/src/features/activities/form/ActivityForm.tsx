import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/model/activity";


interface Props  {
    closeForm : () => void;
    activity : Activity | undefined;
    createOrEditActivity : (activity : Activity) => void;
    submitting : boolean
}

const ActivityForm = ({closeForm , activity:selectedActivtiy ,createOrEditActivity,submitting}:Props) => {

    const initisialState = selectedActivtiy ?? {
        id : "",
        title : '',
        category : '',
        description : '',
        date : '',
        city : '',
        venue : ''
    }

    const [activity , setActivity] = useState<Activity>(initisialState)

    const handleSubmit = () => {
        createOrEditActivity(activity)
    }

    const handleInputChanges = (event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name , value} = event.target;
        setActivity({...activity , [name]:value})
    }

    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete = 'off'>
                <Form.Input placeholder = 'Title' value = {activity.title} name = 'title' onChange={handleInputChanges} />
                <Form.TextArea placeholder = 'Description' value = {activity.description} name = 'description' onChange={handleInputChanges} />
                <Form.Input placeholder = 'Category' value = {activity.category} name = 'category' onChange={handleInputChanges} />
                <Form.Input type="date" placeholder = 'Date' value = {activity.date} name = 'date' onChange={handleInputChanges} />
                <Form.Input placeholder = 'City' value = {activity.city} name = 'city' onChange={handleInputChanges} />
                <Form.Input placeholder = 'Venue' value = {activity.venue} name = 'venue' onChange={handleInputChanges} />
                <Button loading = {submitting} floated="right" positive type="submit" content = 'Submit' />
                <Button onClick={closeForm} floated="right" type="button" color="red" content = 'Cancel' />
            </Form>
        </Segment>
    )
}
export default ActivityForm;