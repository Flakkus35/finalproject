import React from "react";
import "./Sidebar.css";

export const Catlist = props =>
	<div className="card" id="group-card">
		<div className="card-header" {...props}>
			{props.name}
		</div>
		<ul className="list-group list-group-flush">
			<li className="list-group-item">Custom</li>
			<li className="list-group-item">Custom</li>
			<li className="list-group-item">Custom</li>
		</ul>
	</div>;