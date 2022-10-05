import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/model/activity";
import { useStore } from "../../../app/stores/store";
import { observer } from 'mobx-react-lite'
import { useParams, useHistory, Link, useLocation } from 'react-router-dom'
import LoadingComponents from "../../../app/layout/LoadingComponents";
import { v4 as uuid } from 'uuid'
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup'
import MyTextInput from "../../../app/common/form/MyTextInput";
import MytextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";

interface Props {
    activity: Activity | undefined;
}

const ActivityForm = () => {

    const { activityStore } = useStore();
    const { createActivity, updateActivity, loading, loadActivity, loadingInitial } = activityStore;
    const { id } = useParams<{ id: string }>();
    const history = useHistory();
    const [activity, setActivity] = useState<Activity>({
        id: "",
        title: '',
        category: '',
        description: '',
        date: null,
        city: '',
        venue: ''
    })

    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required'),
        description: Yup.string().required('The activity description is required'),
        category: Yup.string().required(),
        date: Yup.string().required('Date is required').nullable(),
        venue: Yup.string().required(),
        city: Yup.string().required(),
    })

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!))
    }, [id, loadActivity])

    const handleFormSubmit = (activity : Activity) => {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            };
            createActivity(newActivity).then(() => history.push(`activities/${newActivity.id}`))
        }
        else {
            updateActivity(activity).then(() => history.push(`/activities/${activity.id}`))
        }
    }

    if (loadingInitial) return <LoadingComponents content="Loading Activity..." />

    return (
        <Segment clearing>
            <Header content = 'Activity Details' sub color="teal" />
            <Formik validationSchema={validationSchema} initialValues={activity} enableReinitialize onSubmit={value => handleFormSubmit(value)}>
                {({ handleSubmit , isValid , isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput placeholder='Title' name='title' />
                        <MytextArea rows={3} placeholder='Description' name='description' />
                        <MySelectInput options={categoryOptions} placeholder='Category' name='category' />
                        <MyDateInput
                            placeholderText='Date'
                            name='date'
                            showTimeSelect
                            timeCaption="time"
                            dateFormat='MMMM d, yyyy h:mm aa'
                        />
                        <Header content = 'Locations Details' sub color="teal" />
                        <MyTextInput placeholder='City' name='city' />
                        <MyTextInput placeholder='Venue' name='venue' />
                        <Button disabled = {isSubmitting || !dirty || !isValid} loading={loading} floated="right" positive type="submit" content='Submit' />
                        <Button as={Link} to='/activities' floated="right" type="button" color="red" content='Cancel' />
                    </Form>

                )}
            </Formik>
        </Segment>
    )
}
export default observer(ActivityForm);