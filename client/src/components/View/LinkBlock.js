import React, { Component } from "react";
import { Col } from "../Grid";
import noView from "../../util/images/anchor.png";

class LinkBlock extends Component {
	state = {
		url: this.props.urlname,
		imgLink: this.props.shorturl
	};

	// Sets default image if get logo fails
	handleImgFail() {
		this.setState({
			imgLink: noView
		})
	};

	render() {
		return (
			<div>		
				<Col size="md-3">
					<div className="link-block">
						<div>
							<a href={this.state.url}><img className="url-image" src={this.state.imgLink} onError={this.handleImgFail.bind(this)} alt={this.state.url} /></a>
						</div>
						<div className="url-link-block">
							<a href={this.state.url}>{this.state.url}</a>
						</div>
					</div>
				</Col>
			</div>
		);
	}
}

export default LinkBlock;