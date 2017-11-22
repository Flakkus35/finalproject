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
		catChoice: "Home"
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
				_id: this.state.userKey,
				url: tempUrl,
				cat: this.state.catChoice
			})
			.then(res => this.props.update())
			.catch(err => console.log(err));
		} else {
			return alert("Enter a link to add first!");
		}
	}

	handleCatSubmit = event => {
		event.preventDefault();
		if (this.state.catInput) {
			API.addCat({
				_id: this.state.userKey,
				cat: this.state.catInput
			})
			.then(res => this.props.update())
			.catch(err => console.log(err));
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
							<div className="card" id="settings-list">
								<div id="inner-settings-list">
									<div className="card-body">
										<h4>Site List</h4>
									</div>
									<ul className="list-group">
										{this.props.urls.map((url, index) => (
											<SettingsList 
												name="urlList"
												cat={this.state.urlCatArray[index]}
												url={url} 
												key={url + "=urlkey"} 
												urlkey={this.state.urlArray[index]}
												userkey={this.props.user}
												update={this.props.update} 
											/>
										))}
									</ul>
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
							<div className="card" id="cat-list">
								<div id="inner-cat-list">
									<div className="card-body">
										<h4>Category List</h4>
									</div>
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
						</Col>
					</Row>		
				</div>
			</div>
		);
	}
}

export default Settings;