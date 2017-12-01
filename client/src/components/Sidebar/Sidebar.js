import React, { Component } from "react";
import "./Sidebar.css";
import Catlist from "./Catlist";

class Sidebar extends Component {

	goToSocial = event => {
		let name = event.target.getAttribute("href");
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
						<ul className="list-group list-group-flush sidebar-body">
							{this.props.cats.map(cat => (
								<Catlist 
									group={cat} 
									key={cat + "=key"}
									goto={this.props.navigate}
								/>
							))}
						</ul>
						<div className="card-header group-card-header">
							Social
						</div>
						<ul className="list-group list-group-flush sidebar-body">
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
						<ul className="list-group list-group-flush sidebar-body">
							<li className="list-group-item list-group-flush">
								<p id="help-page" className="cat-header">
									How To Use
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