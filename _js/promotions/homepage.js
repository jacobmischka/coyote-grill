import * as firebase from 'firebase/app';
import 'firebase/database';
import 'typeface-lato';
import 'typeface-oswald';

import CallToActionButton from '../svelte-components/CallToActionButton.html';
import PromotionList from '../svelte-components/PromotionList.html';

import { FIREBASE_CONFIG } from '../constants.js';
import { isoDateString, promotionIsValid } from '../utils.js';

firebase.initializeApp(FIREBASE_CONFIG);
firebase.database().ref('/promotions').orderByChild('startDate')
	.endAt(isoDateString(new Date())).once('value').then(snapshot => {
		const promotions = snapshot.val();
		const validPromotions = promotions.filter(promotionIsValid);

		if(validPromotions.length > 0){
			createComponents(validPromotions);
		}
	});

function createComponents(promotions){
	const heroButtonContainer = document.querySelector('.hero-button');
	while(heroButtonContainer.firstChild)
		heroButtonContainer.removeChild(heroButtonContainer.firstChild);

	new CallToActionButton({
		target: heroButtonContainer,
		data: {
			promotions
		}
	});

	const promotionsContainer = document.querySelector('#promotions');

	new PromotionList({
		target: promotionsContainer,
		data: {
			promotions
		}
	});
}
