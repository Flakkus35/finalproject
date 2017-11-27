import React, { Component } from "react";
import "./Sidebar.css";
import { Catlist } from "./Catlist";

class Sidebar extends Component {

	goToSocial = event => {
		let name = event.target.getAttribute("href");
		console.log(name);
		window.location=name;
	};

	render() {
		return (
			<div id="sidebar">
				<div className="sidebar-link">
					<div className="card group-card">
						<div className="card-header group-card-header">
							Pages
						</div>
						<ul className="list-group list-group-flush">
							{this.props.cats.map(cat => (
								<Catlist 
									group={cat} 
									key={cat + "=key"}
									goto={this.props.navigate}
								/>
							))}
						</ul>
					</div>
					<div className="card group-card">
						<div className="card-header group-card-header">
							Social
						</div>
						<ul className="list-group list-group-flush">
							<div className="start-cat">
								<li className="list-group-item list-group-flush side-cat-list" onClick={this.goToSocial}>
									<p id="facebook-link" className="cat-header" href="http://facebook.com">Facebook</p>
								</li>
							</div>
							<div className="start-cat">
								<li className="list-group-item list-group-flush side-cat-list" onClick={this.goToSocial}>
									<p id="twitter-link" className="cat-header" href="http://twitter.com">Twitter</p>
								</li>
							</div>
							<div className="start-cat">
								<li className="list-group-item list-group-flush side-cat-list" onClick={this.goToSocial}>
									<p id="google-link" className="cat-header" href="http://google.com">Google</p>
								</li>
							</div>
						</ul>
					</div>
					<div className="card setting-card">
						<ul className="list-group list-group-flush" id="side-set-list">
							<li className="list-group-item" id="settings-btn" onClick={this.props.navigate}>
								<p
									className="setting-link"
									value="Settings"
								>
								Settings
								</p>
							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default Sidebar;