import React, { Component } from "react";
import "./Nav.css";
import Login from "./Login";
import tree from "../../util/images/brand-tree.png";

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
              <a className="navbar-brand">
                <img id="brand-tree" src={tree} width="50" height="50" alt="" />
              </a>
          		<a 
                id="title" 
                className="nav-title navbar-brand"
                onClick={this.props.home}
              >
            		Sprout
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
