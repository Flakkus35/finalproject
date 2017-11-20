import React, { Component } from "react";
import "./Sidebar.css";
import { Catlist } from "./Catlist";

class Sidebar extends Component {

	render() {
		return (
			<div id="sidebar">
				<div className="sidebar-link">
					<Catlist name={this.props.module1}/>
					<Catlist name={this.props.module2}/>
					<button
						id="setting-link"
						className="btn"
						onClick={this.props.goto}
					>
					Settings
					</button>
				</div>
			</div>
		);
	}
}

export default Sidebar;