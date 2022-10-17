import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Divider, Grid, Header, Item, Reveal, Segment, Statistic } from "semantic-ui-react";
import { Profile } from "../../app/model/profile";

interface prop {
    profile : Profile
}

const ProfileHeader = ({profile} : prop) => {
    return (
        <Segment>
            <Grid>
                <Grid.Column width={12}>
                    <Item.Group>
                        <Item>
                            <Item.Image avatar size="small" src = {profile.image || '/assets/user.png'} />
                            <Item.Content verticalAlign="middle">
                                <Header as='h1' content ='Displayname' />
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Statistic.Group widths={2}>
                        <Statistic label = 'Follwers' value = '5' />
                        <Statistic label = 'Follwing' value = '42' />
                    </Statistic.Group>
                    <Divider />
                    <Reveal animated="move">
                        <Reveal.Content>
                            <Button fluid color= {true ? 'red' : 'green'} content = {true ? 'Unfollw' : 'Follow'} />
                        </Reveal.Content>
                    </Reveal>
                </Grid.Column>
            </Grid>
        </Segment>
    )
}
export default observer(ProfileHeader)
