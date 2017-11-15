import React from "react";
import "./View.css";
import { Container, Col, Row } from "../Grid";
import { LinkBlock } from "./LinkBlock";

export const View = () =>
	<div id="main-view">
		<Container fluid>
			<Row>
				<Col size="md-12">
					<div className="card-header" className="view-header">
						Home
					</div>
				</Col>
			</Row>
			<div className="card">
				<div className="card-body">
					<Row>
						<Col size="md-3">
							<LinkBlock />
						</Col>
						<Col size="md-3">
							<LinkBlock />
						</Col>
						<Col size="md-3">
							<LinkBlock />
						</Col>
						<Col size="md-3">
							<LinkBlock />
						</Col>
					</Row>
					<Row>
						<Col size="md-3">
							<LinkBlock />
						</Col>
						<Col size="md-3">
							<LinkBlock />
						</Col>
						<Col size="md-3">
							<LinkBlock />
						</Col>
						<Col size="md-3">
							<LinkBlock />
						</Col>
					</Row>
				</div>
			</div>
		</Container>
	</div>;