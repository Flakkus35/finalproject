import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import "./App.css";
import { Container, Row, Col } from "./components/Grid";
import { Sidebar } from "./components/Sidebar";
import View from "./components/View/View";
import LoginModal from "./components/Nav/LoginModal";
import SignupModal from "./components/Nav/SignupModal";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: ""
        }
    }

    changeView() {
        this.setState
    }

    render() {
        return ( 
            <div>
                <Nav name={this.state.user}/>
                <Container fluid>
                	<Row>
                		<Col size="md-2">
                			<Sidebar 
                				module1="Categories"
                				module2="Social"
                			/>
                		</Col>
                		<Col size="md-10">
                            { this.state.user 
                                ?    <View user="Home" />
                                :    <View view="" />
                            }
                        </Col>
                	</Row>
                </Container>
                <LoginModal />
                <SignupModal />
            </div>
        );
    }
}

export default App;
