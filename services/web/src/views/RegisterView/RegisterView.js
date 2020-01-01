import React from 'react';
import './styles.css';

import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useQuery } from '@apollo/react-hooks';

const REGISTER_MUTATION = gql`
	mutation RegisterMutation($email: String!, $password: String!) {
		register(email: $email, password: $password)
	}
`;

export default function RegisterView() {
	let email;
	let password;
	let address;

	const [ register, { data } ] = useMutation(REGISTER_MUTATION);

	function submitForm(e) {
		e.preventDefault();
		register({ variables: { email: email.value, password: password.value } })
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	//TODO: FORM VALIDATION
	return (
		<div id="container">
			<form onSubmit={(e) => submitForm(e)} name="registerForm" className="form">
				<span className="fontawesome-user" />
				<input ref={(val) => (email = val)} type="text" id="user" placeholder="Username" />

				<span className="fontawesome-lock" />
				<input ref={(val) => (password = val)} type="password" id="pass" placeholder="Password" />

				<span className="fontawesome-home" />
				<input ref={(val) => (address = val)} type="text" id="user" placeholder="Address" />

				<input type="submit" value="Register" />
			</form>
		</div>
	);
}
