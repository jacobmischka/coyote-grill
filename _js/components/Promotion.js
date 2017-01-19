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

		const redeemedAt = redeemed
			? new Date(this.props.userData.redeemedPromotions[this.props.id].redeemedAt)
				.toLocaleDateString()
			: null;

		const style = {
			backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
								url(${this.props.image})`
		};

		return (
			<div className={`promotion ${redeemed ? 'redeemed': ''}`}
					style={style}>
				<style jsx>
				{`
					.promotion {
						flex-grow: 1;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						align-items: center;

						background-position: center;
						background-size: cover;
						margin: 1em;
						max-width: 800px;
						min-height: 200px;
						max-height: calc(40vw);
						border-radius: 3px;
						box-shadow: 0 2px 5px 2px rgba(0, 0, 0, 0.25);
						border: none;
						color: white;
						font-size: 2em;
						font-family: sans-serif;

						transition: 0.05s ease-out;
						transition-property: transform, box-shadow;
					}

					.promotion:hover {
						transform: scale(1.01);
						box-shadow: 0 2px 5px 3px rgba(0, 0, 0, 0.25);

					}

					.promotion.redeemed {
						transform: none;
						box-shadow: 0 2px 5px 2px rgba(0, 0, 0, 0.25);
						opacity: 0.8;
					}

					h2 {
						margin: 0;
						font-size: 1.5em;
						pointer-events: none;
					}

					.redeem-button {
						background: rgba(255, 255, 255, 0.5);
						background-clip: padding-box;
						border: 2px solid rgba(255, 255, 255, 0.5);
						outline: none;
						border-radius: 5px;
						padding: 0.25em 1em;
						cursor: pointer;
						font-size: 1em;
						transition: transform 0.05s ease-out;
					}

					.redeem-button:hover {
						background: rgba(255, 255, 255, 0.3);
						background-clip: padding-box;
					}

					.redeem-button[disabled] {
						transform: none;
						background: rgba(0, 0, 0, 0.3);
						background-clip: padding-box;
						color: rgba(255, 255, 255, 0.8);
						cursor: not-allowed;
					}

					p {
						margin: 0;
						pointer-events: none;
					}
				`}
				</style>
				<h2>{this.props.title}</h2>
				<button className="redeem-button"
						disabled={!this.props.user || redeemed}
						onClick={this.redeem}>
			{
				this.props.user
					? redeemed
						? `Reedeemed on ${redeemedAt}`
						: this.state.confirmed
							? 'Are you sure?'
							: 'Redeem'
					: 'Sign in to redeem promotion'
			}
				</button>

				<p>
					{this.props.desc}
				</p>
			</div>
		);
	}

	redeem(){
		if(this.state.confirmed){
			const userId = this.props.user.uid;
			firebase.database()
				.ref(`users/${userId}/redeemedPromotions/${this.props.id}`).set({
					redeemed: true,
					redeemedAt: new Date().toISOString()
				});
		}
		else {
			this.setState({
				confirmed: true
			});
		}
	}
}

Promotion.propTypes = {
	user: Object,
	userData: Object,
	id: String,
	title: String,
	desc: String,
	endDate: String,
	startDate: String,
	image: String
};
