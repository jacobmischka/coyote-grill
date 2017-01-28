import { h, Component } from 'preact';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

import { BREAKPOINTS } from '../constants.js';

export default class SignIn extends Component {
	constructor(){
		super();

		this.signOut = this.signOut.bind(this);
		this.facebookSignIn = this.facebookSignIn.bind(this);
	}

	render(){
		return (
			<div className={`sign-in ${this.props.user ? 'signed-in' : 'not-signed-in' }`}>
				<style jsx>
				{`
					.sign-in {
						box-sizing: border-box;
						text-align: center;
						width: 100%;
						font-size: 0.66em;
					}

					.sign-in.signed-in {
						order: 10000;
					}

					button {
						border-radius: 5px;
						background-clip: padding-box;
						border: none;
						outline: none;
						cursor: pointer;
						color: white;
						font-size: 1em;
						padding: 1em;
					}

					.facebook-button {
						background-color: #3b5998;
					}

					.facebook-button:hover {
						background-color: #5270b0;
					}

					.facebook-button img {
						height: 2em;
						padding-right: 1em;
						vertical-align: middle;
					}

					.sign-out-button {
						background: transparent;
						color: rgba(255, 255, 255, 0.2);
					}

					.sign-out-button:hover {
						background: rgba(255, 255, 255, 0.05);
					}

					@media (min-width: ${BREAKPOINTS.VERY_SMALL_SCREEN}px) {
						.facebook-button {
							font-size: 1.25em;
						}
					}
				`}
				</style>
	{
		this.props.user
			? (
				<button type="button" className="sign-out-button"
						onClick={this.signOut}>
					Sign out
				</button>
			)
			: (
				<button type="button" className="facebook-button"
						onClick={this.facebookSignIn}>
					<img alt="" src="/images/icons/facebook.svg" />
					Sign in with Facebook
				</button>
			)

	}
			</div>
		);
	}

	signOut(){
		firebase.auth().signOut();
	}

	facebookSignIn(){
		const provider = new firebase.auth.FacebookAuthProvider();
		firebase.auth().signInWithPopup(provider);
	}
}

SignIn.propTypes = {
	user: Object
};
