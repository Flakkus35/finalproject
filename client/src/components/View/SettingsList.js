import React, { Component } from "react";
import API from "../../util/API";
import "./View.css";

class SettingsList extends Component {
	state = {
		delUrlKey: "",
		delCatKey: "",
		url: this.props.urlkey,
		catArray: this.props.catArray,
		fullUrls: this.props.fullUrls,
		changedUrls: []
	};

	componentWillReceiveProps(nextProps) {
		if (this.state.url !== nextProps.urlkey) {
			this.setState({
				url: nextProps.urlkey
			});
		}
		if (this.state.cat !== nextProps.catkey) {
			this.setState({
				cat: nextProps.catkey
			});
		}
		if (this.state.catArray !== nextProps.catArray) {
			let tempCats = [];
			nextProps.catArray.forEach(cat => {
				if (cat !== this.props.cat) {
					tempCats.push(cat);
				}
			});
			this.setState({
				catArray: tempCats
			});
		}
	}

	componentDidMount() {
		console.log(this.state.fullUrls);
	}

	handleFormSubmit = event => {
		event.preventDefault();
		const urlkey = event.target.getAttribute("name");
		this.setState({
			delUrlKey: urlkey
		},
		() => {
			API.removeUrl({
				session: this.props.userkey,
				url_id: urlkey
			})
			.then(res => this.props.update())
			.catch(err => console.log(err));
		});
	};

	handleCatSubmit = event => {
		event.preventDefault();
		API.removeCat({
			session: this.props.userkey,
			cat: this.props.cat
		})
		.then(res => this.props.update())
		.catch(err => console.log(err));
	};

	switchCat = event => {
		let chosenCat = event.target.parentNode.childNodes[2].value;
		let chosenUrl = event.target.parentNode.childNodes[0].data;
		let chosenUrlKey = event.target.parentNode.childNodes[1].name;
		let tempFullUrls = [];
		this.state.fullUrls.forEach(object => {
			if (object.url === chosenUrl) {
				if (object.cat !== chosenCat) {
					object.cat = chosenCat;
					object.isChanged = true;
					tempFullUrls.push(object);
				}
			} 
		});
		console.log(tempFullUrls);
		API.changeCat({
			userkey: this.props.userkey,
			url_id: chosenUrlKey,
			cat: chosenCat
		})
		.then(res => console.log(res))
		.catch(err => console.log(err));
	}

	render() {
		if (this.props.name === "urlList") {
			return (
				<li className="url-list-full list-group-item d-flex justify-content-between align-items-center">
					{this.props.url}
					<button 
						name={this.state.url} 
						className="btn btn-danger remove-url" 
						type="button"
						onClick={this.handleFormSubmit}
					>
						X
					</button>
					<select className="form-control url-list-select" onChange={this.switchCat}>
						<option>{this.props.cat}</option>
						{this.state.catArray.map(cat => (
							<option name={cat} key={cat + "=key"}>{cat}</option>
						))}
					</select>
				</li>
			);
		} else if (this.props.name === "catList") {
			if (this.props.cat === "Home" || this.props.cat === "None") {
				return ( <div/> );
			} else {
				return (
					<li className="url-list-full list-group-item d-flex justify-content-between align-items-center">
						{this.props.cat}
						<button
							name={this.props.cat}
							className="btn btn-danger remove-url"
							type="button"
							onClick={this.handleCatSubmit}
						>
							X
						</button>
					</li>
				);
			}
		}
	};
}

export default SettingsList;