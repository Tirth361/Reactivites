import React from "react";
import { Menu, Container, Button, Image, Dropdown } from "semantic-ui-react";
import { useStore } from "../stores/store";
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { observer } from "mobx-react-lite";

interface Props {
    openForm: () => void;
}

const Navbar = () => {
    const { userStore: { user, logout } } = useStore();
    return (
        <>
            <Menu inverted fixed="top">
                <Container>
                    <Menu.Item as={NavLink} to='/' exact header>
                        <img src="/assets/logo.png" alt="logo" style={{ marginRight: "10px" }} />
                    </Menu.Item>
                    <Menu.Item as={NavLink} to='/activities' name="Activities" />
                    <Menu.Item>
                        <Button as={NavLink} to='/createActivity' positive content='Create Activity' />
                    </Menu.Item>
                    <Menu.Item>
                        <Button as={NavLink} to='/errors' positive content='error' />
                    </Menu.Item>
                    <Menu.Item position="right">
                        <Image src={user?.image || '/assets/user.png'} avatar spaced='right' />
                        <Dropdown pointing='top left' text={user?.displayName}>
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to={`/profile/${user?.username}`} text='My Profile' icon='user' />
                                <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>
                </Container>
            </Menu>
        </>
    )
}
export default observer(Navbar);