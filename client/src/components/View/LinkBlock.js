import React, { Component } from "react";
import { Col } from "../Grid";
import noView from "../../util/images/anchor.png";

class LinkBlock extends Component {
	state = {
		url: this.props.urlname,
		imgLink: this.props.shorturl,
		shorturl: ""
	};

	// Sets default image if get logo fails
	handleImgFail() {
		this.setState({
			imgLink: noView
		})
	};

	componentWillMount() {
		let temp = this.props.urlname;
		let firstLetter;
		if (temp.includes("https://")) {
			temp = temp.split("https://");
			firstLetter = temp[1].charAt(0).toUpperCase();
			temp = firstLetter + temp[1].slice(1)
		} else if (temp.includes("http://")) {
			temp = temp.split("http://");
			firstLetter = temp[1].charAt(0).toUpperCase();
			temp = firstLetter + temp[1].slice(1)
		}
		this.setState({
			shorturl: temp
		});
	}

	render() {
		return (
			<div>		
				<Col size="md-3">
					<div className="link-block">
						<div>
							<a href={this.state.url}><img className="url-image" src={this.state.imgLink} onError={this.handleImgFail.bind(this)} alt={this.state.url} /></a>
						</div>
						<div className="url-link-block">
							<a href={this.state.url}>{this.state.shorturl}</a>
						</div>
					</div>
				</Col>
			</div>
		);
	}
}

export default LinkBlock;