import React, { Component } from "react";
import facebook from "../../util/images/facebook_login.png";
import twitter from "../../util/images/twitter_login.png";
import google from "../../util/images/google_login.png";

class Login extends Component {
	state = {
		username: this.props.user
	};

	render() {
		return (
			<div>	
				<div className="navbar-nav login-panel">
					{ this.state.username 
						?	<button
								className="btn"
								id="user-btn"
							>
							{this.state.username}
							</button>
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
	