import React, { Component } from "react";
import "./Nav.css";
import Login from "./Login";

class Nav extends Component {
  state = {
    view: this.props.name
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.name !== nextProps.name) {
      // console.log(`old: ${this.props.name}, new: ${nextProps.name}`);
      this.setState({
        view: nextProps.name
      });
    }
  }

  render() {
    return (
      <nav className="navbar navbar-inverse navbar-top">
      	<div className="container-fluid">
          	<div className="navbar-header">
          		<a href="/" id="title" className="navbar-brand">
            			Working Title
          		</a>
        		</div>
        		<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        			<Login 
                user={this.state.view}
                logout={this.props.logout}
              />
        		</div>
     		</div>
    	</nav>
    );
  }
}
export default Nav;
