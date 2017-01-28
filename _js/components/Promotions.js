import { h, Component } from 'preact';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import Promotion from './Promotion.js';
import ActivePromotion from './ActivePromotion.js';
import SignIn from './SignIn.js';

import { BREAKPOINTS, CONTACT_EMAIL, FIREBASE_CONFIG } from '../constants.js';
import { isoDateString, isPromotionRedeemed } from '../utils.js';

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
				userRef.child('lastLoggedIn').set(new Date().toISOString());

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
	}

	render(){
		return (
			<div className="promotions">
				<style jsx>
				{`
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

			if(promotionIsActive(promotion))
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

				if(promotionIsActive(promotion))
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

	setActivePromotion(activePromotion){
		if(!isPromotionRedeemed(activePromotion, this.state.userData))
			this.setState({activePromotion});
	}

	unsetActivePromotion(){
		this.setState({activePromotion: null});
	}

	componentWillUnmount(){
		if(this.promotionsRef)
			this.promotionsRef.off('child_added');
	}
}

function promotionIsActive(promotion){
	const today = new Date();
	const promotionStart = new Date(promotion.startDate);
	const promotionEnd = new Date(promotion.endDate);
	return promotionStart <= today && promotionEnd >= today;
}
