import Color from 'color';

export default function(heroPattern, headerPattern){
	const hero = document.querySelector(heroPattern);
	const header = document.querySelector(headerPattern);
	const collapseMargin = 40;
	const expandMargin = 200;

	let initialHeroBackgroundColor = hero.style.backgroundColor;
	hero.style.backgroundColor = null;
	let heroBackgroundColor = new Color(window.getComputedStyle(hero)
		.getPropertyValue('background-color'));
	if(initialHeroBackgroundColor)
		hero.style.backgroundColor = initialHeroBackgroundColor;

	let isCollapsed = header.classList.contains('collapsed');
	if(!isCollapsed)
		header.classList.add('collapsed');
	let headerBackgroundColor = new Color(window.getComputedStyle(header)
		.getPropertyValue('background-color'));
	if(!isCollapsed)
		header.classList.remove('collapsed');

	console.log(heroBackgroundColor.red(), heroBackgroundColor.blue(), heroBackgroundColor.green(), heroBackgroundColor.alpha());
	console.log(headerBackgroundColor.red(), headerBackgroundColor.blue(), headerBackgroundColor.green(), headerBackgroundColor.alpha());

	if(header.classList.contains('expanded')
			&& (hero.getBoundingClientRect().bottom
			< header.getBoundingClientRect().bottom + collapseMargin)){
		header.classList.add('notransition');
		header.classList.remove('expanded');
		header.classList.add('collapsed');
		window.requestAnimationFrame(() => {
			window.requestAnimationFrame(() => {
				header.classList.remove('notransition');
			});
		});
	}

	['resize', 'scroll'].map(event => {
		window.addEventListener(event, () => {
			window.requestAnimationFrame(step);
		});
	});

	function step(){
		console.log('step');
		const heroRect = hero.getBoundingClientRect();
		const headerHeight = header.clientHeight;
		const headerRect = header.getBoundingClientRect();

		if(header.classList.contains('expanded')){
			if(heroRect.bottom < headerRect.bottom + collapseMargin){

				header.classList.remove('expanded');
			}
		}
		else {
			if(heroRect.bottom > headerRect.bottom + expandMargin){

				header.classList.add('expanded');
			}
		}

		if(header.classList.contains('collapsed')){
			if(heroRect.bottom > headerHeight){
				header.classList.remove('collapsed');
			}
		}
		else {
			if(heroRect.bottom < headerHeight){
				header.classList.add('collapsed');
			}
		}

		let scrolledValue = ((heroRect.height - (heroRect.bottom - headerHeight)) / heroRect.height);
		scrolledValue > 0 ? scrolledValue : 0;
		scrolledValue < 1 ? scrolledValue : 1;

		const newHeroColor = Color().red(heroBackgroundColor.red() + (Math.pow(scrolledValue, 2) * (headerBackgroundColor.red() - heroBackgroundColor.red())))
			.green(heroBackgroundColor.green() + (Math.pow(scrolledValue, 2) * (headerBackgroundColor.green() - heroBackgroundColor.green())))
			.blue(heroBackgroundColor.blue() + (Math.pow(scrolledValue, 2) * (headerBackgroundColor.blue() - heroBackgroundColor.blue())))
			.alpha(heroBackgroundColor.alpha() + (Math.pow(scrolledValue, 2) * (headerBackgroundColor.alpha() - heroBackgroundColor.alpha()))).rgb().string(0);

		hero.style.backgroundColor = newHeroColor;
	}
}
