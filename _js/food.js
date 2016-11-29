import ScrollReveal from 'scrollreveal';

const imageMenuItemListsSection = document.querySelector('#image-menu-item-lists');
const tabs = imageMenuItemListsSection.querySelector('.tabs');
const content = imageMenuItemListsSection.querySelector('.content');
for(let tabLink of Array.from(tabs.querySelectorAll('.tab-link'))){
	tabLink.addEventListener('click', event => {
		event.preventDefault();

		Array.from(content.querySelectorAll('.active')).map(activeGroup => {
			activeGroup.classList.remove('active');
		});
		Array.from(tabs.querySelectorAll('.tab-link.active')).map(activeLink => {
			if(activeLink !== event.target)
				activeLink.classList.remove('active');
		});

		event.target.classList.toggle('active');
		if(event.target.classList.contains('active')){
			let group = event.target.getAttribute('href');
			content.querySelector(group).classList.add('active');
		}
	});
}

const showMenuButton = document.querySelector('#show-menu');
const menu = document.querySelector('#menu');
showMenuButton.addEventListener('click', event => {
	event.preventDefault();

	menu.classList.toggle('collapsed');

	if(menu.classList.contains('collapsed'))
		showMenuButton.textContent = 'Show full menu';
	else
		showMenuButton.textContent = 'Hide full menu';
});

ScrollReveal().reveal('.food-special-details', {
	duration: 500,
	opacity: 0,
	distance: '500px',
	easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
	viewFactor: 1.3,
	afterReveal(special){
		special.classList.add('revealed');
	}
}, 50);
