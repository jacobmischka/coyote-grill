import React from 'react';

import ImageMenuItem from './ImageMenuItem.js';

export default class ImageMenuItemList extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			active: null
		};
	}

	render(){
		let items = [];
		for(let i in this.props.menuGroup){
			let groupItem = this.props.menuGroup[i];
			items.push(
				<ImageMenuItem key={groupItem.name}
					item={groupItem} active={this.state.active === i}
					onClick={this.handleItemClick(i)} />
			);
		}

		return (
			<section className="image-menu-item-list">
				{items}
			</section>
		);
	}

	handleItemClick(index){
		this.setState(previousState => {
			if(previousState.active === index)
				return { active: null };
			return { active: index };
		});
	}
}

ImageMenuItemList.propTypes = {
	menuGroup: React.PropTypes.array
};
