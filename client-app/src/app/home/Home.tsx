import React from "react";
import {Link} from 'react-router-dom'
import { Container } from "semantic-ui-react";

const Home = () => {
    return (
        <Container>
        <h1>Home page</h1>
        <p>Go To <Link to='activities'>Activity</Link></p>
        </Container>
    )
}
export default Home;