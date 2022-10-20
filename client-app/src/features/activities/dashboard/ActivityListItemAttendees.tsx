import { observer } from 'mobx-react-lite';
import react from 'react';
import { Image, List, Popup } from 'semantic-ui-react';
import { Profile } from '../../../app/model/profile';
import {Link} from 'react-router-dom';
import ProfileCard from '../../profiles/ProfileCard';

interface Props {
    attendees : Profile[];
}

const ActivityListItemAttendees = ({attendees} : Props) => {

    const styles = {
        borderColor : 'orange',
        borderWidth : 3
    }

    return (
        <List horizontal>
            {attendees.map(attendees => (
                <Popup hoverable key={attendees.username} trigger = {
                    <List.Item key={attendees.username} as = {Link} to = {`/profile/${attendees.username}`}>
                    <Image size='mini' circular src = 'assets/user.png'
                    style = {attendees.following ? styles : null}
                    />
                </List.Item>
                } >
                    <Popup.Content>
                        <ProfileCard profile={attendees} />
                    </Popup.Content>
                </Popup>
            ))}
        </List>
    )
}

export default observer(ActivityListItemAttendees);