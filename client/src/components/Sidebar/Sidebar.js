import React, { Component } from "react";
import "./Sidebar.css";
import { Catlist } from "./Catlist";

class Sidebar extends Component {

	render() {
		return (
			<div id="sidebar">
				<div className="sidebar-link">
					<div className="card" id="group-card">
						<div className="card-header">
							Groups
						</div>
						<ul className="list-group list-group-flush">
							{this.props.cats.map(cat => (
								<Catlist 
									group={cat} 
									key={cat + "=key"}
									goto={this.props.gohome}
								/>
							))}
						</ul>
					</div>
					<div className="card" id="group-card">
						<div className="card-header">
							Social
						</div>
						<ul className="list-group list-group-flush">
							<li className="list-group-item">
								<a id="facebook-link" href="http://facebook.com">Facebook</a>
							</li>
							<li className="list-group-item">
								<a id="twitter-link" href="http://twitter.com">Twitter</a>
							</li>
							<li className="list-group-item">
								<a id="google-link" href="http://google.com">Google</a>
							</li>
						</ul>
					</div>
					<a
						id="setting-link"
						onClick={this.props.settings}
					>
					Settings
					</a>
				</div>
			</div>
		);
	}
}

export default Sidebar;