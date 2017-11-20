import React, { Component } from "react";
import "./View.css";
import { Container, Col, Row } from "../Grid";
import { LinkBlock } from "./LinkBlock";
import Settings from "./Settings";

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
	
	// Returns chosen page
	viewPage() {
		if (this.state.page === "Home" && this.props.urls.length !== 0) {
			return (
				<div className="card">
					<div className="card-body">
						<Row>
							{this.props.urls.map(url => (
								<LinkBlock urlname={url} key={url + "=key"}/>
							))}
						</Row>
					</div>
				</div>
			);
		} else if (this.state.page === "Settings") {
			return (
				<Settings user={this.props.userkey} />
			);
		} else if (this.state.page === "Custom") {
			return (
				<div className="card">
					<div className="card-body">
						<Row>
							<Col size="md-12">
								<h1>Custom</h1>
							</Col>
						</Row>
					</div>
				</div>
			);
		} else {
			return (
				<div className="card">
					<div className="card-body">
						<Row>
							<Col size="md-12">
								<p>Whoops there are no urls in this page!</p>
								<p>Head over to the Settings page to add some.</p>
							</Col>
						</Row>
					</div>
				</div>
			);
		}
	}

	render() {
		return (
			<div id="main-view">
				<Container fluid>
					<Row>
						<Col size="md-12">
							<div className="card-header" className="view-header">
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