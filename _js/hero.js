import Flickity from 'flickity';
import fadeInHeader from './fade-in-header.js';

let flickity = new Flickity('.carousel', {
	cellSelector: '.carousel-image',
	wrapAround: true,
	autoPlay: true
});

fadeInHeader('.carousel-overlay', 'header.site-header');
