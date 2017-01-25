import { h, Component } from 'preact';
import * as firebase from 'firebase';

import Promotion from './Promotion.js';
import ActivePromotion from './ActivePromotion.js';
import SignIn from './SignIn.js';

import { isoDateString, isPromotionRedeemed } from '../utils.js';

export default class Promotions extends Component {
	constructor(){
		super();
		this.state = {
			firebaseConfig: null,
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


		fetch('/env.json').then(response => {
			if(response.ok)
				return response.json();
			throw new Error(response.message);
		}).then(config => {
			firebase.initializeApp(config);
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
			this.setState({firebaseConfig: config});
			this.subToPromotions();
		}).catch(err => {
			console.error(err);
		});
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
						padding: 3em 10% 6em;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: stretch;
					}
				`}
				</style>

				{this.state.firebaseConfig && <SignIn user={this.state.user} />}

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
