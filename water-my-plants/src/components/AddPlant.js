import React from 'react';
import { connect } from 'react-redux';
import { addNewPlant } from '../actions';

class AddPlant extends React.Component {
	constructor() {
		super();
		this.state = {
			id: Date.now(),
			nickname: '',
			h2OFrequency: '',
			speciesName: '',
			image: '',
		};
	}

	handleChange = (e) => {
		this.setState({ ...this.state, [e.target.name]: e.target.value });
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.addNewPlant(this.state);

		this.setState({
			id: Date.now(),
			nickname: '',
			h2OFrequency: '',
			speciesName: '',
			image: '',
		});
	};

	render() {
		return (
			<section>
				<h2>Add Plant</h2>
				<form onSubmit={this.handleSubmit}>
					<div className="newPlant">
						<input
							value={this.state.nickname}
							onChange={this.handleChange}
							name="nickname"
							id="nickname"
							placeholder="Nickname"
						/>
						<input
							value={this.state.h2OFrequency}
							onChange={this.handleChange}
							name="h2OFrequency"
							id="h2OFrequency"
							placeholder="H2O Frequency"
						/>
						<input
							value={this.state.speciesName}
							onChange={this.handleChange}
							name="speciesName"
							id="speciesName"
							placeholder="Species Name"
						/>
						<input
							value={this.state.image}
							onChange={this.handleChange}
							name="image"
							id="image"
							placeholder="Image URL"
						/>
					</div>
					<button>Submit Plant</button>
				</form>
			</section>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		plants: state.plants,
		isLoading: state.inLoading,
		error: state.error,
	};
};

export default connect(mapStateToProps, { addNewPlant })(AddPlant);
