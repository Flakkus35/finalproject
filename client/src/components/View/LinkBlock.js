import React from "react";
import { Col } from "../Grid";

export const LinkBlock = (props) =>
	<div>		
		<Col size="md-3">
			<div className="link-block">
				<div>
					<img className="url-image" alt={props.name} />
				</div>
				<div className="url-link-block">
					<a>{props.url}</a>
				</div>
			</div>
		</Col>
	</div>;