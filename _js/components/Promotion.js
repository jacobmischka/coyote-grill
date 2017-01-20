import { h, Component } from 'preact';
import firebase from 'firebase';

export default class Promotion extends Component {
	constructor(){
		super();
		this.state = {
			waitingForConfirmation: false
		};

		this.redeem = this.redeem.bind(this);
		this.cancel = this.cancel.bind(this);
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

					.button {
						border-radius: 5px;
						background-clip: padding-box;
						border: 2px solid;
						outline: none;
						cursor: pointer;
						font-size: 1em;
					}

					.redeem-button {
						background: rgba(255, 255, 255, 0.5);
						border-color: rgba(255, 255, 255, 0.5);
						background-clip: padding-box;
						padding: 0.25em 1em;
					}

					.redeem-button:hover {
						background: rgba(255, 255, 255, 0.3);
						background-clip: padding-box;
					}

					.redeem-button.waiting-for-confirmation {
						background: rgba(0, 255, 0, 0.5);
						border-color: rgba(0, 255, 0, 0.5);
						background-clip: padding-box;
					}

					.redeem-button.waiting-for-confirmation:hover {
						background: rgba(0, 255, 0, 0.3);
						background-clip: padding-box;
					}

					.redeem-button[disabled] {
						transform: none;
						background: rgba(0, 0, 0, 0.3);
						background-clip: padding-box;
						color: rgba(255, 255, 255, 0.8);
						cursor: not-allowed;
					}

					.cancel-button {
						background: rgba(255, 0, 0, 0.5);
						border-color: rgba(255, 0, 0, 0.5);
						background-clip: padding-box;
					}

					.cancel-button:hover {
						background: rgba(255, 0, 0, 0.3);
						background-clip: padding-box;
					}

					p {
						margin: 0;
						pointer-events: none;
					}
				`}
				</style>
				<h2>{this.props.title}</h2>

		{
			this.props.user && !redeemed && this.state.waitingForConfirmation && (
				<span>Are you sure? This can't be undone.</span>
			)
		}

				<button className={`button redeem-button
						${!redeemed && this.state.waitingForConfirmation ? 'waiting-for-confirmation' : null}`}
						disabled={!this.props.user || redeemed}
						onClick={this.redeem}>
			{
				this.props.user
					? redeemed
						? `Reedeemed on ${redeemedAt}`
						: this.state.waitingForConfirmation
							? 'Confirm'
							: 'Redeem'
					: 'Sign in to redeem promotion'
			}
				</button>

		{
			this.props.user && !redeemed && this.state.waitingForConfirmation && (
				<button className="button cancel-button"
						onClick={this.cancel}>
					Cancel
				</button>
			)
		}

				<p>
					{this.props.desc}
				</p>
			</div>
		);
	}

	redeem(){
		if(this.state.waitingForConfirmation){
			const userId = this.props.user.uid;
			firebase.database()
				.ref(`users/${userId}/redeemedPromotions/${this.props.id}`).set({
					redeemed: true,
					redeemedAt: new Date().toISOString()
				});
		}
		else {
			this.setState({
				waitingForConfirmation: true
			});
		}
	}

	cancel(){
		this.setState({
			waitingForConfirmation: false
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
	startDate: String,
	image: String
};
