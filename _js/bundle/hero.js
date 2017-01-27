import Flickity from 'flickity';

new Flickity('.carousel', {
	cellSelector: '.carousel-image',
	wrapAround: true,
	autoPlay: 6000,
});
