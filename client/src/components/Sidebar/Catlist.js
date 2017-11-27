import React from "react";
import "./Sidebar.css";

export const Catlist = props =>
	<div className="start-cat">
		<li className="list-group-item side-cat-list" onClick={props.goto}>
			<p 
				className="cat-header"
				value={props.group}
			>
				{props.group}
			</p>
		</li>
	</div>;