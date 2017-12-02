import React, { Component } from "react";
import "./Nav.css";
import API from "../../util/API";
/* global $ */

class LoginModal extends Component {
	state = {
		usernameInput: "",
		passwordInput: ""
	};

	handleInputChange = event => {
		const { id, value } = event.target;
	    this.setState({
	      [id]: value
	    });
	};

	clearForm() {
		this.setState({
			usernameInput: "",
			passwordInput: ""
		});
	}

	componentDidMount() {
		$("#login-modal").on("shown.bs.modal", function() {
			$("#usernameInput").trigger("focus");
		});
	}

	closeModal() {
		$("#login-modal").modal("hide");
	}

	handleFormSubmit = event => {
		event.preventDefault();
		if (this.state.usernameInput && this.state.passwordInput) {
			API.loginUser({
				username: this.state.usernameInput,
				password: this.state.passwordInput
			})
			.then(res => {
				console.log(res);
				document.cookie = `username=${res.data.username}; path=/`;
				document.cookie = `session=${res.data.password}; path=/`;
				this.props.update();
				this.clearForm();
				this.closeModal();
			})
			.catch(err => {
				console.log(err);
				this.clearForm();
			});
		} else {
			alert(`Please enter both a username and password`);
			this.clearForm();
		}

	}

	render() {
		return (
			<div className="modal fade" id="login-modal">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Login</h5>
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
						<div className="modal-footer">
							<button 
								className="btn btn-success mr-auto"
								id="signup-btn"
								data-toggle="modal"
								data-target="#signup-modal, #login-modal"
							>
							Sign Up
							</button>
							<button 
								className="btn btn-primary"
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