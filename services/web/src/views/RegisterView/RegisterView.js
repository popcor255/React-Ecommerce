//basic react imports
import React from 'react';
import './styles.css';

//sweet-alert is for a pop up to prompt the user the result if they try to register
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

//gql and useMutation is for graphql API
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

//MySwal with reactContent allows MySwal to work with react outside of the return function
const MySwal = withReactContent(Swal);

//REGISTER MUTATION -
//is the mutation that will be sent the GraphQL API
//A mutation is kinda like a query
//A query can be done concurrently, a mutation is not
//Since we dont want to users signing up with the same credentials, I used a mutation

const REGISTER_MUTATION = gql`
	mutation RegisterMutation($email: String!, $password: String!) {
		register(email: $email, password: $password)
	}
`;

//main function that renders the view
export default function RegisterView() {
	let email;
	let password;
	let register;

	//assinging the mutation to a function
	register = useMutation(REGISTER_MUTATION);

	return (
		//TODO: FORM VALIDATION
		<div id="container">
			<form onSubmit={(e) => registerUser(e, { register, email, password })} name="registerForm" className="form">
				<span className="fontawesome-user" />
				<input ref={(val) => (email = val)} type="text" id="user" placeholder="Username" />

				<span className="fontawesome-lock" />
				<input ref={(val) => (password = val)} type="password" id="pass" placeholder="Password" />

				<input type="submit" value="Register" />
			</form>
		</div>
	);
}

//This functions registers a user
function registerUser(e, data) {
	//Disable page refresh with preventDefault
	//preventDefault does have some weird behaviors
	//so it make cause some UI problems later
	//to avoid, use a div instead of a button or input
	//and do not submit
	e.preventDefault();

	let register = data.register[0];
	let email = data.email;
	let password = data.password;

	//call the graphQL endpoint with the given variables, since its an outside API call its a promise
	register({ variables: { email: email.value, password: password.value } })
		.then((res) => {
			//default prompt should display an error
			var prompt = { title: 'Failed to Register', type: 'error' };

			//if registered return true from the GRAPHQL API then change prompt
			if (res.data.register) {
				prompt = { title: 'Succesfully Registered', type: 'success' };
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
			console.error(err + ' => ' + 'Register View : FAILED AT registerUser');
			//Displays error to user
			MySwal.fire('Error', 'Internal Server Error', 'error');
		});
}
