import { h, Component } from 'preact';
import firebase from 'firebase';

// TODO: Store auth type and only allow that type afterward

export default class SignIn extends Component {
	constructor(){
		super();
		
		this.signOut = this.signOut.bind(this);
		this.googleSignIn = this.googleSignIn.bind(this);
		this.facebookSignIn = this.facebookSignIn.bind(this);
	}
	
	render(){
		return this.props.user
			? (
				<button type="button" onClick={this.signOut}>
					Sign out
				</button>
			)
			: (
				<div>
					<button type="button" onClick={this.googleSignIn}>
						Google
					</button>
					<button type="button" onClick={this.facebookSignIn}>
						Facebook
					</button>
				</div>
			);
	}
	
	signOut(){
		firebase.auth().signOut();
	}
	
	googleSignIn(){
		const provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithRedirect(provider);
	}
	
	facebookSignIn(){
		const provider = new firebase.auth.FacebookAuthProvider();
		firebase.auth().signInWithRedirect(provider);
	}
}

SignIn.propTypes = {
	user: Object
};
