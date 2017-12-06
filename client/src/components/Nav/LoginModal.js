import React, { Component } from "react";
import "./Nav.css";
import API from "../../util/API";
/* global $ */

class LoginModal extends Component {
	state = {
		usernameInput: "",
		passwordInput: "",
		remember: false
	};

	// handles state and input changes for input boxes
	handleInputChange = event => {
		const { id, value } = event.target;
	    this.setState({
	      [id]: value
	    });
	};

	// wipes state and text from input form
	clearForm() {
		this.setState({
			usernameInput: "",
			passwordInput: ""
		});
	}

	// focuses modal on username input when modal is opened
	componentDidMount() {
		$("#login-modal").on("shown.bs.modal", function() {
			$("#usernameInput").trigger("focus");
		});
	}

	// closes modal
	closeModal() {
		$("#login-modal").modal("hide");
	}

	// handles login submit event
	handleFormSubmit = event => {
		event.preventDefault();
		// Checks if both a username and password are entered
		if (this.state.usernameInput && this.state.passwordInput) {
			API.loginUser({
				username: this.state.usernameInput,
				password: this.state.passwordInput
			})
			.then(res => {
				// Checks if "Remember Me" checkbox is checked
				if (this.state.remember) {
					let currentDate = new Date();
					currentDate.setTime(currentDate.getTime() + (30*24*60*60*1000));
					let expires = currentDate.toGMTString();
					document.cookie = `username=${res.data.username}; expires=${expires}; path=/`;
					document.cookie = `session=${res.data.password}; expires=${expires}; path=/`;
				} else {
					document.cookie = `username=${res.data.username}; path=/`;
					document.cookie = `session=${res.data.password}; path=/`;
				}
				this.props.update();
				this.clearForm();
				this.closeModal();
			})
			.catch(err => {
				console.log(err);
				this.clearForm();
			});
		} else {
			// error case if one of more required fields is empty
			alert(`Please enter both a username and password`);
			this.clearForm();
		}
	}

	// handles state change of "Remember Me" checkbox
	switchCheck = event => {
		if (this.state.remember) {
			this.setState({
				remember: false
			});
		} else {
			this.setState({
				remember: true
			});
		}
	}

	render() {
		return (
			<div className="modal fade" id="login-modal">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h3 className="modal-title">Login</h3>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<form>
								<div className="form-group">
									<label htmlFor="usernameInput">Username</label>
									<input 
										className="form-control" 
										id="usernameInput" 
										placeholder="Enter your username"
										value={this.state.usernameInput}
										onChange={this.handleInputChange}
									/>
								</div>
								<div className="form-group">
									<label htmlFor="passwordInput">Password</label>
									<input 
										className="form-control"
										type="password" 
										id="passwordInput" 
										placeholder="Enter your password"
										value={this.state.passwordInput}
										onChange={this.handleInputChange}
									/>
								</div>
							</form>
						</div>
						<div className="form-check">
							<label className="form-check-label remember-check">
								<input type="checkbox" className="form-check-input" id="checkbox-btn" onClick={this.switchCheck}/>
								Remember me
							</label>
						</div>
						<div className="modal-footer">
							<button 
								className="btn mr-auto modal-btn"
								id="signup-btn"
								data-toggle="modal"
								data-target="#signup-modal, #login-modal"
							>
							Sign Up
							</button>
							<button 
								className="btn modal-btn"
								onClick={this.handleFormSubmit}
							>
							Submit
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default LoginModal;