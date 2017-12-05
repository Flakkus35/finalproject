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
							Plans
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
							{this.props.socialUrls.map((soc, index) => (
								<Catlist
									group="Social"
									goto={soc}
									key={soc + "=key"}
									name={this.props.socNames[index]}
								/>
							))}
						</ul>
						<ul className="list-group list-group-flush sidebar-body">
							<li className="list-group-item list-group-flush">
								<p 
									id="help-page" 
									className="cat-header" 
									value="Info"
									onClick={this.props.navigate}
								>
									Getting Started
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