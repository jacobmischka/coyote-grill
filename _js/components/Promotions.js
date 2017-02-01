import { h, Component } from 'preact';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import Promotion from './Promotion.js';
import ActivePromotion from './ActivePromotion.js';
import SignIn from './SignIn.js';

import { BREAKPOINTS, CONTACT_EMAIL, FIREBASE_CONFIG } from '../constants.js';
import {
	isoDateString,
	isPromotionRedeemed,
	getBaseUrl,
	promotionIsValid
} from '../utils.js';

export default class Promotions extends Component {
	constructor(){
		super();
		this.state = {
			firebaseConfig: FIREBASE_CONFIG,
			user: null,
			userData: null,
			promotions: [],
			activePromotion: null
		};

		this.onPopstate = event => {
			if(event.state)
				this.setActivePromotion(event.state, false);
			else
				this.unsetActivePromotion(false);
		};

		this.subToPromotions = this.subToPromotions.bind(this);
		this.setActivePromotion = this.setActivePromotion.bind(this);
		this.unsetActivePromotion = this.unsetActivePromotion.bind(this);
	}

	componentDidMount(){
		firebase.initializeApp(this.state.firebaseConfig);
		firebase.auth().onAuthStateChanged(user => {
			this.setState({user});
			if(user){
				const userRef = firebase.database().ref(`users/${user.uid}`);
				userRef.child('id').set(user.uid);
				userRef.child('lastLoggedIn').set(new Date().toISOString());

				if(user.displayName)
					userRef.child('name').set(user.displayName);

				if(user.email)
					userRef.child('email').set(user.email);

				userRef.on('value', snapshot => {
					let userData = snapshot.val();
					if(userData)
						this.setState({userData});
				});
			} else {
				this.setState({userData: null});
			}
		});
		this.subToPromotions();

		window.addEventListener('popstate', this.onPopstate);
	}

	componentDidUpdate(){
		let searchId = window.location.search.replace('?', '');

		if(searchId && searchId !== this.state.activePromotion)
			this.setActivePromotion(searchId, false);
	}

	render(){
		return (
			<div className="promotions">
				<style jsx>
				{`
					@import url('https://fonts.googleapis.com/css?family=Lato:300|Oswald');

					.promotions {
						position: relative;
						box-sizing: border-box;
						min-height: 100%;
						width: 100%;
						font-size: 1.75em;
						padding: 1.5em 10%;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: stretch;
						font-family: sans-serif;
						color: rgba(255, 255, 255, 0.95);
					}

					@media (min-width: ${BREAKPOINTS.VERY_SMALL_SCREEN}px) {
						.promotions {
							font-size: 2em;
						}
					}

					@media (min-width: ${BREAKPOINTS.SMALL_DESKTOP}px) {
						.promotions {
							font-size: 2em;
						}
					}

					p {
						text-align: center;
						font-size: 1.1em;
						font-family: 'Oswald', sans-serif;
					}

					small {
						color: rgba(255, 255, 255, 0.5);
						text-align: center;
						font-size: 0.5em;
						position: absolute;
						bottom: 0.5em;
						width: 100%;
						left: 50%;
						transform: translateX(-50%);
					}

					small a {
						color: rgba(255, 255, 255, 0.3);
					}
				`}
				</style>

				<SignIn user={this.state.user} />

				<div>
					<p>
						Promotions must be redeemed in front of bartender.
					</p>
					<p>
						Each promotion is redeemable once per customer.
					</p>
				</div>

		{ this.state.activePromotion && (
				<ActivePromotion user={this.state.user} userData={this.state.userData}
					{...this.state.promotions[this.state.activePromotion]}
					close={this.unsetActivePromotion} />
		)}

		{
			Object.values(this.state.promotions).map(promotion => (
				<Promotion user={this.state.user} userData={this.state.userData}
					{...promotion} activate={this.setActivePromotion} />
			))
		}

				<small>
					<span>Problems? Email </span>
					<a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
				</small>
			</div>
		);
	}

	subToPromotions(){
		const database = firebase.database();
		const today = new Date();

		this.promotionsRef = database.ref('/promotions')
			.orderByChild('startDate').endAt(isoDateString(today));

		this.promotionsRef.on('child_added', snapshot => {
			const promotion = snapshot.val();
			promotion.id = snapshot.key;

			if(promotionIsValid(promotion))
				this.setState(prevState => {
					let promotions = Object.assign({}, prevState.promotions);
					promotions[promotion.id] = promotion;

					return {
						promotions
					};
				});
		});

		this.promotionsRef.on('child_changed', snapshot => {
			const promotion = snapshot.val();
			promotion.id = snapshot.key;
			this.setState(prevState => {
				let promotions = Object.assign({}, prevState.promotions);

				if(promotionIsValid(promotion))
					promotions[promotion.id] = promotion;
				else if(promotions[promotion.id])
					delete promotions[promotion.id];

				return {
					promotions
				};
			});
		});

		this.promotionsRef.on('child_removed', snapshot => {
			const promotionId = snapshot.key;
			this.setState(prevState => {
				if(prevState.promotions[promotionId]){
					let promotions = Object.assign({}, prevState.promotions);
					delete promotions[promotionId];

					return {
						promotions
					};
				}
			});
		});
	}

	setActivePromotion(activePromotion, pushState = true){
		if(activePromotion in this.state.promotions
				&& !isPromotionRedeemed(activePromotion, this.state.userData)){
			if(pushState)
				window.history.pushState(activePromotion,
					this.state.promotions[activePromotion],
					`${getBaseUrl()}?${activePromotion}`);

			this.setState({activePromotion});
		}
	}

	unsetActivePromotion(pushState = true){
		if(pushState)
			window.history.pushState(null, null, getBaseUrl());
		this.setState({activePromotion: null});
	}

	componentWillUnmount(){
		if(this.promotionsRef)
			this.promotionsRef.off('child_added');

		if(this.onPopstate)
			window.removeEventListener('popstate', this.onPopstate);
	}
}
