import React from 'react';
import './styles.css';

export default function LoginView() {
	return (
		//TODO: FORM VALIDATION
		<div id="container">
			<form action="/login" method="post" name="loginForm" className="form" className="form">
				<span className="fontawesome-user" />
				<input type="text" id="user" placeholder="Username" />

				<span className="fontawesome-lock" />
				<input type="password" id="pass" placeholder="Password" />

				<input type="submit" value="Login" />
			</form>
		</div>
	);
}
