import { h, Component } from 'preact';
import Color from 'color';

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

		const expiresAt = new Date(this.props.endDate).toLocaleDateString();

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
						text-align: center;
						font-family: 'Lato', sans-serif;
						font-weight: 300;

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
						margin: 0.6em 0;
					}

					.promotion > *:first-child {
						margin-top: 0;
					}

					.promotion > *:last-child {
						margin-bottom: 0;
					}


					h2 {
						margin: 0;
						font-size: 2.5em;
						pointer-events: none;
						font-family: 'Oswald', sans-serif;
						font-weight: normal;
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
						font-family: 'Lato', sans-serif;
						font-weight: 300;
					}

					.redeem-button {
						background: #eb5795;
						border-color: #eb5795;
					}

					.redeem-button:hover {
						background: #f081b0;
					}

					.redeem-button[disabled] {
						transform: none;
						background: none;
						cursor: not-allowed;
						background: rgba(0, 0, 0, 0.15);
						border-color: rgba(255, 255, 255, 0.4);
						color: rgba(255, 255, 255, 0.8);
					}


					p {
						margin: 0;
						pointer-events: none;
					}

					small {
						color: rgba(255, 255, 255, 0.8);
						font-size: 0.6em;
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
						? `Redeemed on ${redeemedAt}`
						: 'Redeem'
					: 'Sign in to redeem promotion'
			}
				</button>


				<div>
					<p>
						{this.props.desc}
					</p>

					<small>
						Expires {expiresAt}
					</small>
				</div>
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
