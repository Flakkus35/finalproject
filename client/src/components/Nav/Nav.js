import React, { Component } from "react";
import "./Nav.css";
import Login from "./Login";
import cast from "../../util/images/castoff-favicon.png";
import searchIcon from "../../util/images/search-icon.png";

class Nav extends Component {
  state = {
    view: this.props.name,
    googleInput: ""
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.name !== nextProps.name) {
      this.setState({
        view: nextProps.name
      });
    }
  }

  // handles state change in search bar
  handleInputChange = event => {
    const { id, value } = event.target;
      this.setState({
        [id]: value
      });
  };

  render() {
    return (
      <nav className="navbar navbar-inverse navbar-top">
      	<div className="container-fluid">
          	<div className="navbar-header">
              <a className="navbar-brand">
                <img id="brand-cast" src={cast} width="80" height="80" alt="" />
              </a>
          		<a 
                id="title" 
                className="nav-title navbar-brand"
                onClick={this.props.home}
              >
            		Cast Off
          		</a>
        		</div>
        		<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        			<Login 
                user={this.state.view}
                logout={this.props.logout}
                navigate={this.props.navigate}
              />
        		  <div className="google-search navbar-form navbar-right">
                <div className="form-group">
                  <form method="get" action="https://www.google.com/search">
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <input 
                              className="form-control" 
                              id="googleInput" 
                              type="text" 
                              value={this.state.googleInput} 
                              name="q"
                              autoComplete="on"
                              onChange={this.handleInputChange}
                              placeholder="Google"
                            />
                            <button 
                              id="google-search-btn" 
                              className="btn"
                              type="submit" 
                            ><img src={searchIcon} id="search-icon" height="25" width="25" alt="search" />
                              Search 
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </form>
                </div>
              </div>
            </div>
     		</div>
    	</nav>
    );
  }
}
export default Nav;
