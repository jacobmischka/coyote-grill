import CallToActionButton from '../svelte-components/CallToActionButton.html';
import * as firebase from 'firebase/app';
import 'firebase/database';

import { FIREBASE_CONFIG } from '../constants.js';
import { isoDateString } from '../utils.js';

// firebase.initializeApp(FIREBASE_CONFIG);
// firebase.database().ref('/promotions').orderByChild('startDate')
// 	.endAt(isoDateString(new Date())).once('value').then(snapshot => {
//
// 	});

// function createComponents(promotions){
	new CallToActionButton({
		target: document.querySelector('.hero-button')
	});


// }
