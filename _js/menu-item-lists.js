import React from 'react';
import ReactDOM from 'react-dom';

import ImageMenuItemList from './components/ImageMenuItemList.js';

import baskets from '../_data/baskets.yaml';
import burgers from '../_data/burgers.yaml';
import chickenSandwiches from '../_data/chicken_sandwiches.yaml';
import extras from '../_data/extras.yaml';
import fryer from '../_data/fryer.yaml';
import menu from '../_data/menu.yaml';
import otherSandwiches from '../_data/other_sandwiches.yaml';
import soup from '../_data/soup.yaml';

const menuGroups = {
	baskets: baskets,
	burgers: burgers,
	'chicken-sandwiches': chickenSandwiches,
	extras: extras,
	fryer: fryer,
	menu: menu,
	'other-sandwiches': otherSandwiches,
	soup: soup
};

for(let menuItemList of Array.from(document.querySelectorAll('.image-menu-item-list'))){
	while(menuItemList.firstChild)
		menuItemList.removeChild(menuItemList.firstChild);
	const menuGroup = menuItemList.dataset.menuGroup;
	ReactDOM.render(<ImageMenuItemList menuGroup={menuGroups[menuGroup]} />, menuItemList);
}
