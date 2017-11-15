import React from "react";
import facebook from "../../util/images/facebook_login.png";
import twitter from "../../util/images/twitter_login.png";
import google from "../../util/images/google_login.png";

export const Login = () =>
	<div className="navbar-nav login-panel">
		<button className="btn btn-primary" id="login-btn">Login</button>
		<img className="login-img" src={facebook} alt="facebook" />
		<img className="login-img" src={twitter} alt="twitter" />
		<img className="login-img" src={google} alt="google" />
	</div>;