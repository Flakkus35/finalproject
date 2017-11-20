import React, { Component } from "react";
import API from "../../util/API";
import "./View.css";

class SettingsList extends Component {
	state = {
		delUrlKey: "",
		url: this.props.urlkey
	};

	componentWillReceiveProps(nextProps) {
		if (this.state.url !== nextProps.urlkey) {
			this.setState({
				url: nextProps.urlkey
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

	render() {
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
			</li>
		);
	};
}

export default SettingsList;