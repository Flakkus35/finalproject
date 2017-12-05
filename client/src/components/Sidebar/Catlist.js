import React, { Component } from "react";
import "./Sidebar.css";

class Catlist extends Component {

	goToSocial = event => {
		window.location.href(this.props.goto);
	}
			
	render() {
		if (this.props.group === "Social") {
			return (
				<div className="start-cat">
					<li className="list-group-item side-cat-list">
						<a href={this.props.goto}><p 
							className="cat-header"
						>
							{this.props.name}
						</p></a>
					</li>
				</div>
			);
		}
		if (this.props.group !== "None") {
			return (
				<div className="start-cat">
					<li className="list-group-item side-cat-list" onClick={this.props.goto}>
						<p 
							className="cat-header"
							value={this.props.group}
						>
							{this.props.group}
						</p>
					</li>
				</div>
			);
		} else {
			return ( <div /> );
		}
	}
}

export default Catlist;