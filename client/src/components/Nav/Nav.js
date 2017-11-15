import React from "react";
import "./Nav.css";
import { Login } from "./Login";

const Nav = () =>
    <nav className="navbar navbar-inverse navbar-top">
    	<div className="container-fluid">
        	<div className="navbar-header">
        		<a href="/" id="title" className="navbar-brand">
          			Working Title
        		</a>
      		</div>
      		<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      			<Login />
      		</div>
   		</div>
  	</nav>;

export default Nav;
