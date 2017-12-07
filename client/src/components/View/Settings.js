import React, { Component } from "react";
import { Col, Row } from "../Grid";
import SettingsList from "./SettingsList";
import "./View.css";
import API from "../../util/API";

class Settings extends Component {
	state = {
		urlInput: "",
		catInput: "",
		userKey: this.props.user,
		urlArray: this.props.urlkeys,
		catArray: this.props.cats,
		urlCatArray: this.props.urlcats,
		catChoice: "None",
		changed: false,
		changedUrls: [],
		viewChoice: "1",
		fullUrls: this.props.fullUrls
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.urlkeys !== nextProps.urlkeys) {
			this.setState({
				urlArray: nextProps.urlkeys
			});
		}
		if (this.props.cats !== nextProps.cats) {
			this.setState({
				catArray: nextProps.cats
			});
		}
		if (this.props.urlcats !== nextProps.urlcats) {
			this.setState({
				urlCatArray: nextProps.urlcats
			});
		}
	};

	// wipes state and text from input form
	clearForm() {
		this.setState({
			urlInput: "",
			catInput: ""
		});
	}

	// handles state and input change for text forms
	handleInputChange = event => {
		const { id, value } = event.target;
	    this.setState({
	      [id]: value
	    });
	};

	// handles creation event for adding a new link
	handleFormSubmit = event => {
		event.preventDefault();
		// Checks if there is a value in form
		if (this.state.urlInput) {
			let tempUrl;
			// Checks if the value is in the proper format
			if (this.state.urlInput.includes("http://") || this.state.urlInput.includes("https://")) {
				if (this.state.urlInput.includes(".com")) {	
					tempUrl = this.state.urlInput;
				} else {
					tempUrl = (this.state.urlInput + ".com");
				}
			} else {
				if (this.state.urlInput.includes(".com")) {
					tempUrl = ("http://" + this.state.urlInput);
				} else {
					tempUrl = ("http://" + this.state.urlInput + ".com");
				}
			}
			// Checks if the added value should be in the "Social" category
			if (this.state.viewChoice === "3") {
				API.addUrl({
					session: this.state.userKey,
					url: tempUrl,
					cat: "Social"
				})
				.then(res => {
					this.clearForm();
					this.props.update()
				})
				.catch(err => {
					this.clearForm();
					console.log(err)
				});
			// Adds to url list with the chosen category
			} else {
				API.addUrl({
					session: this.state.userKey,
					url: tempUrl,
					cat: this.state.catChoice
				})
				.then(res => {
					this.clearForm();
					this.props.update()
				})
				.catch(err => {
					this.clearForm();
					console.log(err)
				});
			}
		} else {
			return alert("Enter a link to add first!");
		}
	}

	// handles creation event for a new category
	handleCatSubmit = event => {
		event.preventDefault();
		// Checks if there is a value in the input form
		if (this.state.catInput) {
			API.addCat({
				session: this.state.userKey,
				cat: this.state.catInput
			})
			.then(res => {
				this.clearForm();
				this.props.update()
			})
			.catch(err => {
				this.clearForm();
				console.log(err)
			});
		// error case when no input
		} else {
			return alert("Enter a new category first!");
		}
	}

	// handles when the category is changed on the add url input form
	switchCat = event => {
		console.log(event.target.value);
		if (this.state.catChoice !== event.target.value) {
			this.setState({
				catChoice: event.target.value
			},
			() => console.log(this.state.catChoice));
		}
	}

	// makeWaypoint = (title) => {
	// 	console.log(title);
	// }

	placeholder() {
		<a 
			href="javascript:(function() {
				var d=document.createElement('script');
				d.src= 'https://code.jquery.com/jquery-3.2.1.min.js';
				d.onload = function() {
					$.ajax({
						url: 'http://localhost:3000/api/user/addurl',
						dataType: 'jsonp',
						data: {
							url: window.location.href
						},
						type: 'PUT',
						success: function(data) {
							console.log(data)
						}
					})
				};
				document.getElementsByTagName('head')[0].appendChild(d);
			}())"
			value={this.state.userKey}
		>
			Make Waypoint
		</a>
	};

	// handles switch event for tab buttons
	switchView = event => {
		if (this.state.viewChoice !== event.target.value) {
			this.setState({
				viewChoice: event.target.value
			});
		}
	}
	
	// function for returning a bookmarklet link
	test = event => {
		return `javascript:(function() {
							var d=document.createElement('script');
							d.src= 'https://code.jquery.com/jquery-3.2.1.min.js';
							d.onload = function() {
								$.ajax({
									url: 'http://localhost:3000/api/user/addurl',
									dataType: 'json',
									data: {
										session:'${this.props.user}',
										url: window.location.href
									},
									type: 'PUT',
									success: function(data) {
										console.log(data)
									}
								})
							};
							document.getElementsByTagName('head')[0].appendChild(d);
						}())`;
	}

	// renders the view based on the tab button choice
	renderView = event => {
		let btnChoice = this.state.viewChoice;
		if (btnChoice === "1") {
			return (
				<div id="settings-list">
					<div id="add-url">
					<a 
						href={this.test()}
					>
						Make Waypoint
					</a>
						<h4 className="setting-title">Add New Waypoint</h4>
						<Row>
							<form className="form-group">
								<Col size="md-1">
									<label htmlFor="url-input" id="url-tag" className="form-control">http://</label>
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
									<select className="form-control" onChange={this.switchCat}>
										{this.state.catArray.map(cat => (
											<option 
												key={cat + '=dropdownkey'}
												value={cat}
											>
												{cat}
											</option>
										))}
									</select>
								</Col>
								<Col size="md-2">
									<button 
										type="button"
										className="btn add-btn"
										onClick={this.handleFormSubmit}
									>
									Add
									</button>
								</Col>
							</form>
						</Row>
					</div>
					<Row>
						<Col size="md-12">
							<div>
								<div className="card">
									<div id="inner-settings-list">
										<div className="card-header">
											<h4 className="mb-0">
												<p className="setting-title">
													All Waypoints
												<span className="badge badge-secondary array-total">{this.state.urlArray.length}</span>
												</p>
											</h4>
										</div>
										<div>
											<div className="card-body">
												<ul className="list-group list-urls">
													{this.props.urls.map((url, index) => (
														<SettingsList 
															name="urlList"
															cat={this.state.urlCatArray[index]}
															url={url}
															catArray={this.state.catArray} 
															total={index}
															key={url + "=urlkey"} 
															urlkey={this.state.urlArray[index]}
															userkey={this.props.user}
															update={this.props.update}
															fullUrls={this.props.fullUrls}
														/>
													))}
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div>
								<p id="foot-note">* Any waypoint with "None" as their plan will not be available for view</p>
							</div>	
						</Col>
					</Row>
				</div>
			);
		} else if (btnChoice === "2") {
			return (
				<div id="cat-list">
					<div id="add-cat">	
						<h4 className="setting-title">Add New Plan</h4>
						<Row>
							<form className="form-group">
								<Col size="md-3">
									<input 
										type="text" 
										className="form-control" 
										id="catInput"
										value={this.state.catInput}
										onChange={this.handleInputChange}
									/>
								</Col>
								<Col size="md-2">
									<button 
										type="button"
										className="btn add-btn"
										onClick={this.handleCatSubmit}
									>
									Add
									</button>
								</Col>
							</form>
						</Row>
					</div>
					<Row>
						<Col size="md-12">
							<div>
								<div className="card">
									<div id="inner-cat-list">
										<div className="card-header">
											<h4 className="mb-0">
												<p className="setting-title">
													All Plans
												<span className="badge badge-secondary array-total">{this.state.catArray.length - 2}</span>
												</p>
											</h4>
										</div>
										<div>
											<ul className="list-group list-urls">
												{this.props.cats.map((cat, index) => (
													<SettingsList 
														name="catList"
														cat={cat} 
														key={cat + "=catkey"} 
														userkey={this.props.user}
														update={this.props.update} 
													/>
												))}
											</ul>
										</div>
									</div>
								</div>
							</div>	
						</Col>
					</Row>
				</div>
			);
		} else if (btnChoice === "3") {
			return (
				<div id="social-list">
					<div id="add-url">	
						<h4 className="setting-title">Add New Social Waypoint</h4>
						<Row>
							<form className="form-group">
								<Col size="md-1">
									<label htmlFor="url-input" id="url-tag" className="form-control">http://</label>
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
									<button 
										type="button"
										className="btn add-btn"
										onClick={this.handleFormSubmit}
									>
									Add
									</button>
								</Col>
							</form>
						</Row>
					</div>
					<Row>
						<Col size="md-12">
							<div>
								<div className="card">
									<div id="inner-settings-list">
										<div className="card-header">
											<h4 className="mb-0">
												<p className="setting-title">
													All Social Waypoints
												<span className="badge badge-secondary array-total">{this.props.socialUrls.length}</span>
												</p>
											</h4>
										</div>
										<div>
											<div className="card-body">
												<ul className="list-group">
													{this.props.socialUrls.map((url, index) => (
														<SettingsList 
															name="socList"
															url={url} 
															total={index}
															key={url + index + "=sockey"} 
															urlkey={this.props.socialKeys[index]}
															userkey={this.props.user}
															update={this.props.update}
															fullUrls={this.props.fullUrls}
														/>
													))}
												</ul>
											</div>
										</div>
									</div>
								</div>
							</div>	
						</Col>
					</Row>
				</div>
			);
		}
	}

	render() {
		return (
			<div className="card">
				<div className="card-body">
					<div id="btn-panel">
						<button className="chg-btn" id="way-btn" onClick={this.switchView} type="button" value="1">Waypoints</button>
						<button className="chg-btn" id="cat-btn" onClick={this.switchView} type="button" value="2">Plans</button>
						<button className="chg-btn" id="soc-btn" onClick={this.switchView} type="button" value="3">Social</button>
					</div>
					{this.renderView()}		
				</div>
			</div>
		);
	}
}

export default Settings;