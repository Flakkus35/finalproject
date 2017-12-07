import React, { Component } from "react";
import "./View.css";

class Info extends Component {

	// function for returning a bookmarklet link
	test = event => {
		return `javascript:(function() {
					var d=document.createElement('script');
					d.src= 'https://code.jquery.com/jquery-3.2.1.min.js';
					d.onload = function() {
						var local;
						if (window.location.href === "https://warm-reef-75717.herokuapp.com/") {
							return;
						} else {
							$.ajax({
								url: 'https://warm-reef-75717.herokuapp.com/api/user/addurl',
								dataType: 'json',
								data: {
									session:'${this.props.user}',
									url: window.location.href
								},
								type: 'PUT',
								success: function(data) {
									return;
								}
							})
						}
					};
					document.getElementsByTagName('head')[0].appendChild(d);
				}())`;
	};

	render() {
		return (	
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
						the "New Tab" page or home page on your web browser to this one. Use one of
						the following for your favorite browser.</p>
						<p>While all browsers allow you to customize what your home page is, 
						changing what page opening up a new tab shows you is a bit more 
						complicated for some but that's where Cast Off shines! Below are just a few choices 
						you can consider for extensions to your web browser to all customization of 
						your "New Tab" page.</p>
						<ul>
							<li><strong><u>In Chrome:</u></strong> <a href="https://chrome.google.com/webstore/detail/new-tab-redirect/icpgjfneehieebagbmdbhnlpiopdcmna">New Tab Redirect</a></li>
							<li><strong><u>In Internet Explorer:</u></strong> Go to <strong>Tool's/Internet Options</strong> then
							under the <strong>General</strong> tab make sure your first home page in the <strong>Home Page</strong> panel is Cast Off. Then click on the <strong>Settings</strong> button under the <strong>Tabs</strong> option. 
							While in the <strong>Tabbed Browser Settings</strong> use the dropdown under <strong>"When a new tab is opened, open:"</strong> and choose <strong>"Your first 
							home page"</strong>. Click <strong>Ok</strong> then restart Internet Explorer.</li>
							<li><strong><u>In Firefox:</u></strong> <a href="https://addons.mozilla.org/en-US/firefox/addon/new-tab-override/">New Tab Override</a></li>
						</ul>
						<p>In each case you use an addon/extension make sure to follow their instructions on how to use them to add 
						a custom url for your "New Tab" page.</p>
						<h3 className="about-title">Using Cast Off Bookmarklet</h3>
						<p>Included in Cast Off is the option to add a bookmarklet that, when 
						clicked on any page out of Cast Off, will add it to your list of links! Setting 
						up the bookmarklet could not be simpler. First, create a new user or 
						login to an existing account. Then just click and drag the link below into 
						your bookmarks panel below the url panel and you are done! Your bookmarklet is now 
						ready to use. Refresh or open up a new instance of Cast Off to see your new link. New 
						links are set with a plan of "None" so be sure to set them to a proper plan to see them 
						in action.</p>
						<ul>
							<li><strong>Click and drag this link: </strong><a href={this.test()}>Make Waypoint</a></li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default Info;