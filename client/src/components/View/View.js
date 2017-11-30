import React, { Component } from "react";
import "./View.css";
import { Container, Col, Row } from "../Grid";
import LinkBlock from "./LinkBlock";
import Settings from "./Settings";
import notFound from "../../util/images/no-view-map.png";

class View extends Component {
	state = {
		page: this.props.view
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.view !== nextProps.view) {
			// console.log(`old: ${this.props.user}, new: ${nextProps.user}`);
			this.setState({
				page: nextProps.view
			});
		}
	}

	// Shows header based on login status
	viewHeader() {
		if (!this.state.page) {
			return (
				<div>Login to start adding sites</div>
			);
		} else {
			return (
				<div>{this.state.page}</div>
			);
		}
	}

	viewNone() {
		if (!this.props.userkey) {
			return (
				<div>
					<p>Login to start adding waypoints</p>
				</div>
			)
		} else {
			return (
				<div>
					<p className="no-url-p">No waypoints charted yet!</p>
					<img className="no-url-img" alt="No Urls" height="300" width="300" src={notFound} />
				</div>
			)
		}
	}

	makeWaypoint = title => {
		console.log('works');
	}
	
	// Returns chosen page
	viewPage() {
		if (this.state.page !== "Settings" && (!this.props.urls || !this.props.urls[0])) {
			return (
				<div className="card">
					<div className="card-body">
						<Row>
							<Col size="md-12">
								<div className="no-login-view">
									{this.viewNone()}
								</div>
							</Col>
						</Row>
					</div>
				</div>
			);
		} else if (this.state.page !== "Settings") {
			return (
				<div className="card">
					<div className="card-body">
						<Row>
							{this.props.urls.map(url => (
								<LinkBlock 
									urlname={url} 
									key={url + "=key"}
									shorturl={"//logo.clearbit.com/" + url}
								/>
							))}
						</Row>
					</div>
				</div>
			);
		} else if (this.state.page === "Settings") {
			return (
				<Settings 
					user={this.props.userkey} 
					urls={this.props.urls} 
					update={this.props.update}
					urlkeys={this.props.urlkeys}
					cats={this.props.cats}
					urlcats={this.props.urlcats}
					bookmark={this.makeWaypoint.bind(this)}
				/>
			);
		}
	}

	render() {
		return (
			<div id="main-view">
				<Container fluid>
					<Row>
						<Col size="md-12">
							<div className="card-header view-header">
								{this.viewHeader()}
							</div>
						</Col>
					</Row>
					{this.viewPage()}
				</Container>
			</div>
		);
	}
}

export default View;