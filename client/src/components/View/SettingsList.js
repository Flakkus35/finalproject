import React, { Component } from "react";
import API from "../../util/API";
import "./View.css";

class SettingsList extends Component {
	state = {
		delUrlKey: "",
		delCatKey: "",
		url: this.props.urlkey
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
	}

	handleFormSubmit = event => {
		event.preventDefault();
		/*API.removeUrl({
			_id: 
		})*/
		const urlkey = event.target.getAttribute("urlkey");
		this.setState({
			delUrlKey: urlkey
		},
		() => {
			API.removeUrl({
				user_id: this.props.userkey,
				url_id: urlkey
			})
			.then(res => this.props.update())
			.catch(err => console.log(err));
		});
	};

	handleCatSubmit = event => {
		event.preventDefault();
		API.removeCat({
			_id: this.props.userkey,
			cat: this.props.cat
		})
		.then(res => this.props.update())
		.catch(err => console.log(err));
	}

	render() {
		if (this.props.name === "urlList") {
			return (
				<li className="list-group-item d-flex justify-content-between align-items-center">
					{this.props.url}
					<button 
						urlkey={this.state.url} 
						className="btn btn-danger remove-url" 
						type="button"
						onClick={this.handleFormSubmit}
					>
						X
					</button>
					<button 
						className="btn btn-success save-btn"
						type="button"
					>
						Save
					</button>
					<select className="form-control url-cat-drop">
						{this.props.catArray.map((cat, index) => (
							<option value={cat} key={index}>
								{this.props.cat}
							</option>
						))}
					</select>
				</li>
			);
		} else if (this.props.name === "catList") {
			if (this.props.cat === "Home") {
				return ( <div/> );
			} else {
				return (
					<li className="list-group-item d-flex justify-content-between align-items-center">
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