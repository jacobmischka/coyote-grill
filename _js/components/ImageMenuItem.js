import React from 'react';

export default class ImageMenuItem extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		const defaultImage = 'http://lorempixel.com/400/400/food?q=' + this.props.item.name;

		if(this.props.active){
			return (
				<div key={this.props.item.name} className="image-menu-item expanded">
					<img src={this.props.item.image || defaultImage} alt="" />
					<span className="name">{this.props.item.name}</span>
				</div>
			);
		}

		else {
			return (
				<div key={this.props.item.name} className="image-menu-item">
					<img src={this.props.item.image || defaultImage} alt="" />
					<span className="name">{this.props.item.name}</span>
				</div>
			);
		}
	}
}

ImageMenuItem.propTypes = {
	item: React.PropTypes.object,
	active: React.PropTypes.bool
};
