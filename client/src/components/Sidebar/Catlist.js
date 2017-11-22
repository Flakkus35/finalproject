import React from "react";
import "./Sidebar.css";

export const Catlist = props =>
	<div>
		<li className="list-group-item">
			<a 
				className="cat-header"
				value={props.group}
				onClick={props.goto}
			>
				{props.group}
			</a>
		</li>
	</div>;