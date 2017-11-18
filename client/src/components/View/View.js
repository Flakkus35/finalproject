import React, { Component } from "react";
import "./View.css";
import { Container, Col, Row } from "../Grid";
import { LinkBlock } from "./LinkBlock";

class View extends Component {
	state = {
		name: this.props.user,
		linksTop: [{ url: "example.com", name: "example", key: "sldjlkfd" }, { url: "example2.com", name: "example2", key: "slkjljsdf" }],
		linksBot: []
	}

	render() {
		return (
			<div id="main-view">
				<Container fluid>
					<Row>
						<Col size="md-12">
							<div className="card-header" className="view-header">
								{this.state.name}
							</div>
						</Col>
					</Row>
					{ this.state.name
						?	<div className="card">
								<div className="card-body">
									<Row>
										{this.state.linksTop.map(links => (
											<LinkBlock 
												url={links.url}
												name={links.name}
												key={links.key}
											/>
										))}
									</Row>
									<Row>
										{this.state.linksBot.map(links => (
											<LinkBlock 
												url={links.url}
												name={links.name}
												key={links.key}
											/>
										))}
									</Row>
								</div>
							</div>
						:   <div className="card">
								<div className="card-body">
									<Row>
										<Col size="md-12">
											<h1 id="show-none">Login to start adding links!</h1>
										</Col>
									</Row>
								</div>
							</div>
					}
				</Container>
			</div>
		);
	}
}

export default View;