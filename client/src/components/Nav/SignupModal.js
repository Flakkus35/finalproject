import React, { Component } from "react";
import API from "../../util/API";

class SignupModal extends Component {
	state = {
		signupUser: "",
		signupPassword: "",
		confirmPassword: ""
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
			passwordInput: "",
			confirmPassword: ""
		});
	}

	handleFormSubmit = event => {
		event.preventDefault();
		if (this.state.signupUser && this.state.signupPassword) {
			if (this.state.signupPassword === this.state.confirmPassword) {
				API.createUser({
					username: this.state.signupUser,
					password: this.state.signupPassword
				})
				.then(res => {
					var test = [{ name: "TestName", url: "test.com"}, { name: "TestName2", url: "test2.com"}];
					console.log(JSON.stringify(test));
					console.log(res);
					document.cookie = `username=${res.data.username}; path=/`;
					document.cookie = `key=${res.data._id}; path=/`;
					this.props.update();
					this.clearForm();
				})
				.catch(err => {
					console.log(err);
					this.clearForm();
				});
			} else {
				this.clearForm();
				alert(`Passwords do not match`);
				
			}
		} else {
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
							<h5 className="modal-title">Signup</h5>
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
								className="btn btn-success mr-auto"
								id="signup-btn"
								data-toggle="modal"
								data-target="#signup-modal, #login-modal"
							>
							Back to login
							</button>
							<button 
								className="btn btn-primary"
								onClick={this.handleFormSubmit}
								data-toggle="modal"
								data-target="#signup-modal"
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