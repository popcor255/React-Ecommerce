//basic react imports
import React from 'react';
import './styles.css';

//sweet-alert is for a pop up to prompt the user the result if they try to login
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

//gql and useMutation is for graphql API
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

//MySwal with reactContent allows MySwal to work with react outside of the return function
const MySwal = withReactContent(Swal);

//LOGIN MUTATION -
//is the mutation that will be sent the GraphQL API
//A mutation is kinda like a query
//A query can be done concurrently, a mutation is not
//Since we dont want multiple users signing up at the same time

const LOGIN_MUTATION = gql`
	mutation LoginMutation($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			id
			email
		}
	}
`;

export default function LoginView() {
	let login;
	let email;
	let password;

	//assinging the mutation to a function
	login = useMutation(LOGIN_MUTATION);

	return (
		//TODO: FORM VALIDATION
		<div id="container">
			<form onSubmit={(e) => loginUser(e, { login, email, password })} name="loginForm" className="form">
				<span className="fontawesome-user" />
				<input ref={(val) => (email = val)} type="text" id="user" placeholder="Username" />

				<span className="fontawesome-lock" />
				<input ref={(val) => (password = val)} type="password" id="pass" placeholder="Password" />

				<input type="submit" value="LogIn" />
			</form>
		</div>
	);
}

function loginUser(e, data) {
	e.preventDefault();
	console.log(data);

	//map values to variables
	let login = data.login[0];
	let email = data.email;
	let password = data.password;

	//call the graphQL endpoint with the given variables, since its an outside API call its a promise
	login({ variables: { email: email.value, password: password.value } })
		.then((res) => {
			//default prompt should display an error
			var prompt = { title: 'Failed to Login', type: 'error' };
			//if logged in return true from the GRAPHQL API then change prompt
			if (res.data.login) {
				prompt = { title: 'Welcome back ' + res.data.login.email + '!', type: 'success' };
			}

			//function that calls UI component
			MySwal.fire({
				title: prompt.title,
				type: prompt.type
			}).then((result) => {
				//if the prompt is successful and the pop up button is clicked go home
				if (result.value) {
					if (prompt.type == 'success') {
						window.location.href = '/';
					}
				}
			});
		})
		.catch((err) => {
			//This logs the error onto the console
			console.error(err + ' => ' + 'LoginIn View : FAILED AT loginUser');
			//Displays error to user
			MySwal.fire('Error', 'Internal Server Error', 'error');
		});
}
