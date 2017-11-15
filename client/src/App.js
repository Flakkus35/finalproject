import React, { Component } from 'react';
import Nav from "./components/Nav";
import "./App.css";
import { Container, Row, Col } from "./components/Grid";
import { Sidebar } from "./components/Sidebar";
import { View } from "./components/View";

class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        <Container fluid>
        	<Row>
        		<Col size="md-2">
        			<Sidebar 
        				module1="Categories"
        				module2="Social"
        			/>
        		</Col>
        		<Col size="md-10">
        			<View />
        		</Col>
        	</Row>
        </Container>
      </div>
    );
  }
}

export default App;
