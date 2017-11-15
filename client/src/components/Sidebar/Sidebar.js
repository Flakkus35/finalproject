import React from "react";
import "./Sidebar.css";
import { Catlist } from "./Catlist";

export const Sidebar = props => 
	<div id="sidebar">
		<div className="sidebar-link">
			<Catlist name={props.module1}/>
			<Catlist name={props.module2}/>
			<a id="setting-link">Settings</a>
		</div>
	</div>;