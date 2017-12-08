import React, { Component } from "react";
import API from "../../util/API";
/* global $ */

class SignupModal extends Component {
	state = {
		signupUser: "",
		signupPassword: "",
		confirmPassword: ""
	};

	// handles state and input changes for text boxes
	handleInputChange = event => {
		const { id, value } = event.target;
	    this.setState({
	      [id]: value
	    });
	};

	// Wipes state and text from input boxes
	clearForm() {
		this.setState({
			signupUser: "",
			signupPassword: "",
			confirmPassword: ""
		});
	};

	// focuses the modal on the username box when the modal opens
	componentDidMount() {
		$("#signup-modal").on("shown.bs.modal", function() {
			$("#signupUser").trigger("focus");
		});
	};

	// closes modal
	closeModal() {
		$("#signup-modal").modal("hide");
	};

	// handles new user submit
	handleFormSubmit = event => {
		event.preventDefault();
		// Checks if there are entered values in username and password fields
		if (this.state.signupUser && this.state.signupPassword) {
			// Check if passwords match in password boxes/Used for error handling
			if (this.state.signupPassword === this.state.confirmPassword) {
				API.createUser({
					username: this.state.signupUser,
					password: this.state.signupPassword
				})
				.then(res => {
					if (!res.data.username) {
						alert("User already exists");
						this.clearForm();
						return;
					} else {
						document.cookie = `username=${res.data.username}; path=/`;
						document.cookie = `session=${res.data.password}; path=/`;
						this.props.update();
						this.clearForm();
						this.closeModal();
					}
				})
				.catch(err => {
					console.log(err);
					this.clearForm();
				});
			} else {
				// error case when passwords don't match
				this.clearForm();
				alert(`Passwords do not match`);
				
			}
		} else {
			// error case for when there isn't an entered value in username or password
			this.clearForm();
			alert(`Please enter both a username and password`);
			
		}
	}

	render() {
		return (
			<div className="modal fade" id="signup-modal">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h3 className="modal-title">Signup</h3>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<form>
								<div className="form-group">
									<label htmlFor="signupUser">Username</label>
									<input 
										className="form-control" 
										id="signupUser" 
										placeholder="Enter your username"
										value={this.state.signupUser}
										onChange={this.handleInputChange}
									/>
								</div>
								<div className="form-group">
									<label htmlFor="signupPassword">Password</label>
									<input 
										className="form-control" 
										type="password"
										id="signupPassword" 
										placeholder="Enter your password"
										value={this.state.signupPassword}
										onChange={this.handleInputChange}
									/>
								</div>
								<div className="form-group">
									<label htmlFor="confirmPassword">Re-enter password</label>
									<input 
										className="form-control" 
										type="password"
										id="confirmPassword" 
										placeholder="Re-enter password"
										value={this.state.confirmPassword}
										onChange={this.handleInputChange}
									/>
								</div>
							</form>
						</div>
						<div className="modal-footer">
							<button 
								className="btn mr-auto modal-btn"
								id="signup-btn"
								data-toggle="modal"
								data-target="#signup-modal, #login-modal"
							>
							Back to login
							</button>
							<button 
								className="btn modal-btn"
								onClick={this.handleFormSubmit}
								disabled={!(this.state.signupUser && this.state.signupPassword)}
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

export default SignupModal;