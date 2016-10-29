for(let imageMenuItem of Array.from(document.querySelectorAll('.image-menu-item'))){
	imageMenuItem.addEventListener('click', () => {
		for(let activeItem of Array.from(document.querySelectorAll('.image-menu-item.active'))){
			activeItem.classList.remove('active');
		}
		imageMenuItem.classList.add('active');
	});
}
