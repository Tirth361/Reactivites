import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponents from "../../app/layout/LoadingComponents";
import { useStore } from "../../app/stores/store";
import ProfileContetnt from "./ProfileContent";
import ProfileHeader from "./ProfileHeader";

const ProfilePage = () => {

    const { username } = useParams<{ username: string }>();
    const { profileStore: { loadProfile, loadingProfile, profile , setActiveTab } } = useStore()

    useEffect(() => {
        loadProfile(username);
        return () => {
            setActiveTab(0);
        }
    }, [loadProfile, username])

    if (loadingProfile) return <LoadingComponents content="Loading Profile" />

    return (
        <Grid>
            <Grid.Column width={16}>
                {
                    profile &&
                    <>
                        <ProfileHeader profile={profile} />
                        <ProfileContetnt profile={profile} />
                    </>
                }
            </Grid.Column>
        </Grid>
    )
}

export default observer(ProfilePage)