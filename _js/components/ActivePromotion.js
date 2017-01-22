import { h, Component } from 'preact';
import firebase from 'firebase';

import { isPromotionRedeemed } from '../utils.js';

export default class ActivePromotion extends Component {
	constructor(){
		super();
		this.state = {
			redeemed: false
		};

		this.redeem = this.redeem.bind(this);
		this.handleKeyup = this.handleKeyup.bind(this);
	}

	componentDidMount(){
		document.querySelector('html').classList.add('locked');
		document.addEventListener('keyup', this.handleKeyup);
	}

	render(){
		const redeemed = isPromotionRedeemed(this.props.id, this.props.userData);

		const style = {
			backgroundColor: redeemed
				? this.state.redeemed
					? 'rgba(0, 255, 0, 0.5)'
					: 'rgba(255, 0, 0, 0.5)'
				: 'rgba(255, 255, 255, 0.3)'
		};

		return (
			<div className="active-promotion" style={style}>
				<style jsx>
				{`
					.active-promotion {
						z-index: 10000;
						position: fixed;
						top: 0;
						right: 0;
						bottom: 0;
						left: 0;
						backface-visibility: hidden;
						overflow: auto;

						display: flex;
						flex-direction: column;
						justify-content: space-around;
						align-items: center;

						color: white;
						font-size: 2em;
						font-family: sans-serif;
					}

					h2 {
						text-align: center;
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

					.redeem-button[disabled] {
						transform: none;
						background: rgba(0, 0, 0, 0.3);
						background-clip: padding-box;
						color: rgba(255, 255, 255, 0.8);
						cursor: not-allowed;
					}

				`}
				</style>
				<h2>{this.props.title}</h2>

	{
		redeemed
			? (
				<span>
		{
			this.state.redeemed
				? 'Redeemed successfully'
				: 'This promotion has already been redeemed'
		}
				</span>
			)
			: (
				<button type="button" className="button"
						onClick={this.redeem}>
					Redeem
				</button>

			)
	}


				<button type="button" className="button"
						onClick={this.props.close}>
					Close
				</button>
			</div>
		);
	}

	redeem(){
		this.setState({redeemed: true});

		const userId = this.props.user.uid;
		firebase.database()
			.ref(`users/${userId}/redeemedPromotions/${this.props.id}`).set({
				redeemed: true,
				redeemedAt: new Date().toISOString()
			});
	}

	handleKeyup(event){
		if(event.key === 'Escape')
			this.props.close();
	}

	componentWillUnmount(){
		document.querySelector('html').classList.remove('locked');
		document.removeEventListener('keyup', this.handleKeyup);
	}
}

ActivePromotion.propTypes = {
	user: Object,
	userData: Object,
	id: String,
	title: String,
	desc: String,
	close: Function
};
