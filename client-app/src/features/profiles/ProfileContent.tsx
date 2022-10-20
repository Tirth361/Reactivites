import { observer } from "mobx-react-lite";
import React from "react";
import { Tab } from "semantic-ui-react";
import { Profile } from "../../app/model/profile";
import { useStore } from "../../app/stores/store";
import ProfileFollowings from "./ProfileFollowings";
import ProfilePhoto from "./ProfilePhoto";

interface Props {
    profile : Profile
}

const ProfileContetnt = ({profile} : Props) => {

    const { profileStore } = useStore()

    const panes = [
        {menuItem : 'About' , render : () => <Tab.Pane>About Content</Tab.Pane>},
        {menuItem : 'Photos' , render : () => <Tab.Pane><ProfilePhoto profile={profile} /></Tab.Pane>},
        {menuItem : 'Events' , render : () => <Tab.Pane>Event Content</Tab.Pane>},
        {menuItem : 'Followers' , render : () => <ProfileFollowings />},
        {menuItem : 'Following' , render : () => <ProfileFollowings />},
    ]

    return (
        <Tab 
        menu={{fluid : true , vertical : true}}
        menuPosition = 'right'
        panes={panes}
        onTabChange = {(e,data) => profileStore.setActiveTab(data.activeIndex)}
        />
    )
}

export default observer(ProfileContetnt)