import React from "react";
import "./View.css";

export const Info = props => 

	<div className="card-body info-body">
		<div className="inner-info">
			<div className="info-text">
				<h3 className="about-title">About</h3>
				<p>Cast Off is a one-stop gateway to your favorite sites, 
				fully-customizable to what you are looking for! You can save 
				up to 8 links(waypoints) to sites in however many groupings
				(plans) as you wish. Once you are set just click the plan you 
				wish to see then click on the waypoint you wish to go to. To 
				get started login with your account or sign up as a new user.
				</p>
				<h3 className="about-title">Using Cast Off</h3>
				<p>All your plans are located on the sidebar under Plans and
				can be added through your profile page. By default every new
				user starts with a "Home" plan that will show up every time 
				this page is loaded. It is recommended that you put your most
				viewed links on this page so you have easy access to them. 
				The "Waypoints" tab in your profile allow you to add new links
				and well as see your full collection. Any link that has it's 
				plan labeled as "None" or if you have more than 8 links under 
				one page will not show up in any plan page but will show up here. 
				Feel free to edit your plans and waypoints as you see fit.</p>
				<p>The Social tab on the sidebar act as a quickbar for any well
				used social links you have. Just scroll over to the social tab	
				in your profile page to start adding them.</p>
				<p>To make full use of this site it is recommended to change 
				the "New Tab" page on your web browswer to this one. Use one of
				the following for your favorite browser.</p>
				<ul>
					<li><strong><u>In Chrome:</u></strong> Go to Chrome's settings page then scroll down
					to the <strong>On startup</strong> option. Check the <strong>"Open a specific page 
					or set of pages"</strong> and change to this site.</li>
					<li><strong><u>In Internet Explorer:</u></strong> Go to <strong>Tool's/Internet Options</strong> then
					under the <strong>General</strong> tab click <strong>Settings</strong> under the Tabs option. 
					While in the <strong>Tabbed Browser Settings</strong> use the dropdown under <strong>"When a new tab is opened, open:"</strong> and choose <strong>"Your first 
					home page"</strong> then change your home page to be Cast Off.</li>
					<li><strong><u>In Firefox:</u></strong> Current versions of Firefox do not support 
					changing your new tab page by default. Either look into 
					addons that allow you to do so or use this page only as a 
					home page.</li>
				</ul>
			</div>
		</div>
	</div>