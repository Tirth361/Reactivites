import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { useStore } from "../stores/store";
import { NavLink } from 'react-router-dom'

interface Props {
    openForm : () => void;
}

const Navbar = () => {
    const {activityStore} = useStore();
    return (
        <>
            <Menu inverted fixed="top">
                <Container>
                    <Menu.Item as={NavLink} to = '/' exact header>
                        <img src="/assets/logo.png" alt="logo" style={{marginRight : "10px"}} />
                    </Menu.Item>
                    <Menu.Item as={NavLink} to = '/activities' name="Activities" />
                    <Menu.Item>
                        <Button as={NavLink} to = '/createActivity' positive content='Create Activity' />
                    </Menu.Item>
                    <Menu.Item>
                        <Button as={NavLink} to = '/errors' positive content='error' />
                    </Menu.Item>
                </Container>
            </Menu>
        </>
    )
}
export default Navbar;