import React, { Component } from "react";
import { Col, Row } from "../Grid";
import SettingsList from "./SettingsList";
import "./View.css";
import API from "../../util/API";
/* global $ */

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
		changedUrls: []
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.urlkeys !== nextProps.urlkeys) {
			this.setState({
				urlArray: nextProps.urlkeys
			},
			() => console.log(this.state.urlArray));
		}
		if (this.props.cats !== nextProps.cats) {
			this.setState({
				catArray: nextProps.cats
			},
			() => console.log(this.state.catArray));
		}
		if (this.props.urlcats !== nextProps.urlcats) {
			this.setState({
				urlCatArray: nextProps.urlcats
			},
			() => console.log(this.state.urlCatArray));
		}
	};

	clearForm() {
		this.setState({
			urlInput: "",
			catInput: ""
		});
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
			const tempUrl = ("http://" + this.state.urlInput);
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
		} else {
			return alert("Enter a link to add first!");
		}
	}

	handleCatSubmit = event => {
		event.preventDefault();
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
		} else {
			return alert("Enter a new category first!");
		}
	}

	switchCat = event => {
		console.log(event.target.value);
		if (this.state.catChoice !== event.target.value) {
			this.setState({
				catChoice: event.target.value
			},
			() => console.log(this.state.catChoice));
		}
	}

	makeWaypoint = (title) => {
		console.log(title);
	}

	setChanges = urlObject => {
		urlObject.forEach(object => {
			if (object.isChanged) {
				return this.setState({
					changed: true,
					changedUrls: urlObject
				});
			}
		})
	}

	testChange() {
		if (this.state.changed) {
			return (
				<button 
					className="btn btn-success" 
					id="save-changes-btn" 
					type="button"
					onClick={this.saveChanges}
				>
					Save Changes
				</button>
			);
		} else {
			return ( <div /> );
		}
	}

	saveChanges = event => {
		event.preventDefault();
		console.log(this.state.changedUrls);
		this.state.changedUrls.forEach(object => {
			if (object.isChanged) {
				console.log('changed');
			}
		})
	}

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
	}

	render() {
		return (
			<div className="card">
				<div className="card-body">
					<div id="add-url">	
						<h4 className="setting-title">Add New Link</h4>
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
										className="btn btn-primary"
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
							<div id="accordion" role="tablist">
								<div className="card" id="settings-list">
									<div id="inner-settings-list">
										<div className="card-header" role="tab" id="headingOne">
											<h4 className="mb-0">
												<a className="list-header" data-toggle="collapse" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
													Site List
												<span className="badge badge-secondary array-total">{this.state.urlArray.length}</span>
												</a>
											</h4>
										</div>
										<div id="collapseOne" className="collapse" role="tabpanel" aria-labelledby="headingOne" data-parent="#accordion">
											<div className="card-body">
												<ul className="list-group">
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
															save={this.setChanges.bind(this)}
														/>
													))}
												</ul>
												{this.testChange()}
											</div>
										</div>
									</div>
								</div>
							</div>	
						</Col>
					</Row>
					<div id="add-cat">	
						<h4 className="setting-title">Add New Category</h4>
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
										className="btn btn-primary"
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
							<div id="accordion" role="tablist">
								<div className="card" id="cat-list">
									<div id="inner-cat-list">
										<div className="card-header" role="tab" id="headingTwo">
											<h4 className="mb-0">
												<a className="list-header" data-toggle="collapse" href="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
													Category List
												<span className="badge badge-secondary array-total">{this.state.catArray.length - 2}</span>
												</a>
											</h4>
										</div>
										<div id="collapseTwo" className="collapse" role="tabpanel" aria-labelledby="headingTwo" data-parent="#accordion">
											<ul className="list-group">
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
			</div>
		);
	}
}

export default Settings;