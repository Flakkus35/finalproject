import React, { Component } from "react";
import { Col, Row } from "../Grid";
import SettingsList from "./SettingsList";
import "./View.css";
import API from "../../util/API";

class Settings extends Component {
	state = {
		urlInput: "",
		userKey: this.props.user,
		urlOption: "Home"
	}

	handleInputChange = event => {
		const { id, value } = event.target;
	    this.setState({
	      [id]: value
	    });
	};

	handleFormSubmit = event => {
		event.preventDefault();
		if (this.state.urlInput) {
			console.log(this.state.userKey);
			console.log(this.state.urlOption);
			console.log(this.state.urlInput);
			API.addUrl({
				_id: this.state.userKey,
				url: this.state.urlInput,
				cat: this.state.urlOption
			})
			.then(res => this.props.update())
			.catch(err => console.log(err));
		} else {
			return alert("Enter a link to add first!");
		}
	}

	render() {
		return (
			<div className="card">
				<div className="card-body">
					<h4 className="setting-title">Add New Link</h4>
					<Row>
						<form className="form-group">
							<Col size="md-1">
								<label htmlFor="url-input" id="url-tag" className="form-control">Url:</label>
							</Col>
							<Col size="md-6">
								<input 
									type="text" 
									className="form-control" 
									id="urlInput"
									value={this.state.urlInput}
									onChange={this.handleInputChange} 
								/>
							</Col>
							<Col size="md-2">
								<select className="form-control">
									<option 
										value={this.state.urlOption}
										onChange={this.handleInputChange}
										id="urlOption"
									>
									Home
									</option>
								</select>
							</Col>
							<Col size="md-2">
								<button 
									type="button"
									className="btn btn-primary"
									onClick={this.handleFormSubmit}
								>
								Add
								</button>
							</Col>
						</form>
					</Row>
					<Row>
						<Col size="md-12">
							<div className="card" id="settings-list">
								<div id="inner-settings-list">
									<div className="card-body">
										<h4>Site List</h4>
									</div>
									<ul className="list-group">
										{this.props.urls.map((url, index) => (
											<SettingsList 
												url={url} 
												key={url + "=key"} 
												urlkeys={this.props.urlkeys[index]}
												userkey={this.props.user}
												update={this.props.update} 
											/>
										))}
									</ul>
								</div>
							</div>	
						</Col>
					</Row>		
				</div>
			</div>
		);
	}
}

export default Settings;