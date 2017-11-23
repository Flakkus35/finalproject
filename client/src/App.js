import React, { Component } from 'react';
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import "./App.css";
import { Container, Row, Col } from "./components/Grid";
import Sidebar from "./components/Sidebar/Sidebar";
import View from "./components/View/View";
import LoginModal from "./components/Nav/LoginModal";
import SignupModal from "./components/Nav/SignupModal";
import API from "./util/API";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            key: "",
            page: "",
            urlArray: [],
            urlCatArray: [],
            urlKeyArray: [],
            catArray: [],
            count: 0
        }
    };

    // Grabs any user cookies to display
    componentWillMount() {
        var temp = this.getCookie("username");
        if (temp) {
            this.updateUser();
        }
    };

    // Grab all urls from logged in user
    loadUrls() {
        console.log(this.state.key);
        API.findUrls({
            _id: this.state.key
        })
        .then(res => {
            console.log(res);
            let tempUrlArr = [];
            let tempUrlKeyArr = [];
            let tempCatUrlArr = [];
            let tempCatArr = ["Home"];
            let tempCount = 0;
            console.log(res.data);
            for (var i = 0; i < res.data.links.length; i++) {
                if (this.state.page === "Settings") {
                    tempUrlArr.push(res.data.links[i].url);
                    tempUrlKeyArr.push(res.data.links[i]._id);
                    tempCatUrlArr.push(res.data.links[i].cat);
                    tempCount++;
                }
                if (res.data.links[i].cat === this.state.page) {
                    if (tempUrlArr.length < 8) {
                        tempUrlArr.push(res.data.links[i].url);
                        tempUrlKeyArr.push(res.data.links[i]._id);
                        tempCatUrlArr.push(res.data.links[i].cat);
                        tempCount++;
                    }
                }
            }
            for (var j = 0; j < res.data.cat.length; j++) {
                tempCatArr.push(res.data.cat[j]);
            }
            this.setState({
                urlArray: tempUrlArr,
                urlCatArray: tempCatUrlArr,
                urlKeyArray: tempUrlKeyArr,
                catArray: tempCatArr,
                count: tempCount
            },
            () => {
                console.log(this.state.urlArray);
                console.log(this.state.catArray);
            });
        })
        .catch(err => console.log(err));
    };

    // Updates App state and cookie with username
    updateUser() {
        var temp = document.cookie;
        console.log(temp);
        var updatedUser = this.getCookie("username");
        var updatedKey = this.getCookie("key");
        // console.log(updatedUser);
        this.setState({
            user: updatedUser,
            key: updatedKey,
            page: "Home"
        },
        () => this.loadUrls());
    };

    // Registers that App's state was changed
    componentDidUpdate() {
        console.log(`App updated ${this.state.user}`);
    };

    // Grabs a cookie by key name
    getCookie(cookName) {
        var name = cookName + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    };

    // Logs user out
    logout() {
        document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
        document.cookie = "key=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
        this.setState({
            user: "",
            key: "",
            page: "Home"
        });
    };

    // Switch to Settings View component
    // goToSettings() {
    //     this.setState({
    //         page: "Settings"
    //     });
    // };

    // Switch to Home View component
    goToHome() {
        this.setState({
            page: "Home"
        },
        () => this.loadUrls());
    };

    navigate = event => {
        const name = (event.target.getAttribute("value"));
        this.setState({
            page: name
        },
        () => this.loadUrls());
    }

    render() {
        return ( 
            <div>
                <Nav 
                    name={this.state.user}
                    logout={this.logout.bind(this)}
                    home={this.goToHome.bind(this)}
                />
                <Container fluid>
                	<Row>
                		<Col size="md-2">
                			<Sidebar 
                				module1="Categories"
                				module2="Social"
                                navigate={this.navigate.bind(this)}
                                cats={this.state.catArray}
                                name={this.state.page}
                			/>
                		</Col>
                		<Col size="md-10">
                            { this.state.user 
                                ?    <View 
                                        view={this.state.page} 
                                        userkey={this.state.key} 
                                        urls={this.state.urlArray}
                                        cats={this.state.catArray} 
                                        count={this.state.count}
                                        update={this.loadUrls.bind(this)}
                                        urlkeys={this.state.urlKeyArray}
                                        urlcats={this.state.urlCatArray}
                                     />
                                :    <View view="" />
                            }
                        </Col>
                	</Row>
                </Container>
                <LoginModal update={this.updateUser.bind(this)}/>
                <SignupModal update={this.updateUser.bind(this)}/>
            </div>
        );
    }
}

export default App;
