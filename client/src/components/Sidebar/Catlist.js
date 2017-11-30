import React, { Component } from "react";
import "./Sidebar.css";

class Catlist extends Component {
			
	render() {
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