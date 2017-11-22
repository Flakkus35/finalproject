import React, { Component } from "react";
import facebook from "../../util/images/facebook_login.png";
import twitter from "../../util/images/twitter_login.png";
import google from "../../util/images/google_login.png";

class Login extends Component {
	state = {
		username: this.props.user
	};

	componentWillReceiveProps(nextProps) {
		if (this.state.username !== nextProps.user) {
			this.setState({
				username: nextProps.user
			});
		}
	}

	render() {
		return (
			<div>	
				<div className="navbar-nav login-panel">
					{ this.state.username 
						?	<div className="card" id="profile-card">
								<div className="card-header" id="user-welcome">
									Hello {this.state.username}
								</div>
								<div className="card-body">
									<a id="profile-link">
										Profile
									</a>
									<a 
										id="logout-link"
										onClick={this.props.logout}
									>
										Logout
									</a>
								</div>
							</div>
						:	<button 
								className="btn btn-primary" 
								id="login-btn"
								data-toggle="modal"
								data-target="#login-modal"
								>
								Login
							</button>
					}
					<img className="login-img" src={facebook} alt="facebook" />
					<img className="login-img" src={twitter} alt="twitter" />
					<img className="login-img" src={google} alt="google" />
				</div>
			</div>
		);
	}
}

export default Login;
	