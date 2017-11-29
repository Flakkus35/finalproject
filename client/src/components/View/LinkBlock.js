import React from "react";
import { Col } from "../Grid";

export const LinkBlock = props =>
	<div>		
		<Col size="md-3">
			<div className="link-block">
				<div>
					<a href={props.urlname}><img className="url-image" src={props.shorturl} alt={props.urlname} /></a>
				</div>
				<div className="url-link-block">
					<a href={props.urlname}>{props.urlname}</a>
				</div>
			</div>
		</Col>
	</div>;