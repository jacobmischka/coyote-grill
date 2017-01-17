import { h, Component } from 'preact';

export default class Ad extends Component {
	constructor(){
		super();
		this.state = {
			active: false
		};

		this.handleButtonClick = this.handleButtonClick.bind(this);
	}

	render(){
		return (
			<div className={`ad-container ${this.state.active && 'active'}`}>
	{
		this.state.active
			? (
				<p>Cake</p>
			)
			: (
				<button type="button" onClick={this.handleButtonClick}>
					Login
				</button>
			)
	}
			</div>
		);
	}

	handleButtonClick(){
		this.setState({active: true});
	}
}
