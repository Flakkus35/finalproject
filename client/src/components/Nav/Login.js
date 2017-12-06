import React, { Component } from "react";

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
								<div className="card-body" id="user-options">
									<a 
										id="profile-link" 
										onClick={this.props.navigate}
										value="Settings"
									>
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
				</div>
			</div>
		);
	}
}

export default Login;
	