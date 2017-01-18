import { h, Component } from 'preact';
import firebase from 'firebase';

export default class Promotion extends Component {
	constructor(){
		super();
		
		this.redeem = this.redeem.bind(this);
	}
	
	render(){
		const redeemed = this.props.userData
			&& this.props.userData.redeemedPromotions
			&& this.props.userData.redeemedPromotions[this.props.id]
			&& this.props.userData.redeemedPromotions[this.props.id].redeemed;

		return (
			<div>
				<h2>{this.props.title}</h2>
				<p>{this.props.desc}</p>
	{
		this.props.user
			? redeemed
				? (
					<span>Already been redeemed</span>
				)
				: (
					<button type="button" onClick={this.redeem}>
						Redeem
					</button>

				)
			: (
				<span>Sign in to redeem promotion</span>
			)
	}
			</div>
		);
	}
	
	redeem(){
		const userId = this.props.user.uid;
		firebase.database()
			.ref(`users/${userId}/redeemedPromotions/${this.props.id}`).set({
				redeemed: true,
				redeemedAt: new Date().toISOString()
			});
	}
}

Promotion.propTypes = {
	user: Object,
	userData: Object,
	id: String,
	title: String,
	desc: String,
	endDate: String,
	startDate: String
};
