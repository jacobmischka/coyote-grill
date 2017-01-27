import { h, Component } from 'preact';

import { isPromotionRedeemed } from '../utils.js';

export default class Promotion extends Component {
	constructor(){
		super();

		this.handleClick = this.handleClick.bind(this);
	}

	render(){
		const redeemed = isPromotionRedeemed(this.props.id, this.props.userData);

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
						flex: 1 1;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						align-items: center;

						background-position: center;
						background-size: cover;
						margin: 1em 0;
						padding: 1em;
						min-height: 200px;
						border-radius: 3px;
						box-shadow: 0 2px 5px 2px rgba(0, 0, 0, 0.25);
						border: none;
						color: white;
						font-family: sans-serif;
						text-align: center;

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

					.promotion > * {
						margin: 0.5em 0;
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
						color: white;
						font-size: 1em;
						padding: 0.25em 1em;
					}

					.redeem-button {
						background: rgba(255, 255, 255, 0.4);
						border-color: rgba(255, 255, 255, 0.4);
						background-clip: padding-box;
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


				<button className="button redeem-button"
						disabled={!this.props.user || redeemed}
						onClick={this.handleClick}>
			{
				this.props.user
					? redeemed
						? `Reedeemed on ${redeemedAt}`
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

	handleClick(){
		this.props.activate(this.props.id);
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
	image: String,
	activate: Function
};
