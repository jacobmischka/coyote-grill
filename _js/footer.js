const picture = document.querySelector('#coyote-grill-external');
const pictureSwitch = document.querySelector('#coyote-grill-external-switch');

const dayWide = '/images/external/front-wide.jpg';
const day = '/images/external/front.jpg';
const nightWide = '/images/external/front-wide-night.jpg';
const night = '/images/external/front-night.jpg';

let now = new Date();
if(now.getHours() < 6 || now.getHours() > 17){
	picture.classList.remove('day-picture');
	picture.classList.add('night-picture');
	picture.querySelector('source').setAttribute('srcset', nightWide);
	picture.querySelector('img').setAttribute('src', night);

	pictureSwitch.querySelector('#external-night').checked = true;
}

for(let option of Array.from(pictureSwitch.querySelectorAll('input[name="coyote-grill-external-switch"]'))){
	option.addEventListener('change', event => {
		if(event.target.checked){
			picture.style.opacity = 0;

			switch(event.target.value){
				case 'night':
					picture.querySelector('source').setAttribute('srcset', nightWide);
					picture.querySelector('img').setAttribute('src', night);
					break;
				case 'day':
				default:
					picture.querySelector('source').setAttribute('srcset', dayWide);
					picture.querySelector('img').setAttribute('src', day);
					break;
			}

			picture.style.opacity = null;
		}
	});
}
