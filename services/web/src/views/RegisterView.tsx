import React, { PureComponent } from 'react';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Mutation } from 'react-apollo';

import { gql } from 'apollo-boost';
import { RegisterMutationVariables, RegisterMutation } from '../schemaTypes';

const registerMutation = gql`
	mutation RegisterMutation($email: String!, $password: String!) {
		register(email: $email, password: $passowrd)
	}
`;

const formStyle = {
	width: '300px',
	margin: '30vh auto',
	backgroundColor: '#ffffff',
	borderRadius: 10,
	padding: 10,
	shadowColor: '#000000',
	shadowOffset: {
		width: 0,
		height: 3
	},
	shadowRadius: 5,
	shadowOpacity: 1.0
};

export class RegisterView extends PureComponent {
	state = {
		email: '',
		password: ''
	};

	handleChange = (e: any) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		});
	};

	render() {
		const { email, password } = this.state;
		return (
			<Mutation<RegisterMutation, RegisterMutationVariables> mutation={registerMutation}>
				{(mutate) => (
					<Form style={formStyle}>
						<Form.Group controlId="formBasicEmail">
							<Form.Label>Email address</Form.Label>
							<Form.Control
								name="email"
								type="email"
								placeholder="Enter email"
								value={email}
								onChange={this.handleChange}
							/>
							<Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
						</Form.Group>

						<Form.Group controlId="formBasicPassword">
							<Form.Label>Password</Form.Label>
							<Form.Control
								name="password"
								type="password"
								placeholder="Password"
								value={password}
								onChange={this.handleChange}
							/>
						</Form.Group>
						<Button
							onClick={() => {
								console.log('submit!');
							}}
							variant="primary"
							type="submit"
						>
							Submit
						</Button>
					</Form>
				)}
			</Mutation>
		);
	}
}
