import React from 'react';
import './styles.css';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const REGISTER_MUTATION = gql`
	mutation RegisterMutation($email: String!, $password: String!) {
		register(email: $email, password: $password)
	}
`;

const MySwal = withReactContent(Swal);

export default function RegisterView() {
	const [ register ] = useMutation(REGISTER_MUTATION);
	let data = { register };
	//TODO: FORM VALIDATION
	return (
		<div id="container">
			<form onSubmit={(e) => submitForm(e, data)} name="registerForm" className="form">
				<span className="fontawesome-user" />
				<input ref={(val) => (data.email = val)} type="text" id="user" placeholder="Username" />

				<span className="fontawesome-lock" />
				<input ref={(val) => (data.password = val)} type="password" id="pass" placeholder="Password" />

				<input type="submit" value="Register" />
			</form>
		</div>
	);
}

function submitForm(e, data) {
	e.preventDefault();

	let [ register, email, password ] = Object.values(data);

	register({ variables: { email: email.value, password: password.value } })
		.then((res) => {
			var prompt = { title: 'Failed to Register', type: 'error' };

			if (res.data.register) {
				prompt = { title: 'Succesfully Registered', type: 'success' };
			}

			MySwal.fire({
				title: prompt.title,
				type: prompt.type
			}).then((result) => {
				if (result.value) {
					if (prompt.type == 'success') {
						window.location.href = '/';
					}
				}
			});
		})
		.catch((err) => {
			console.error(err + ' => ' + 'Register View : FAILED AT submitForm');
			MySwal.fire('Error', 'Internal Server Error', 'error');
		});
}
