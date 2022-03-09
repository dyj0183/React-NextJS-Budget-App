import { useState, useRef } from "react";
// Use next-auth for frontend login authentication
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";

import classes from "./auth-form.module.css";
import { CreateUser } from "./auth-create-user";
import { GetUserID } from "./auth-get-user-id";

import Test from "./fake_navbar";

const AuthForm = () => {
	// set up this state to know whether users want to login or create new account
	const [chooseLogin, setChooseLogin] = useState(true);
	// Set up the router from next.js
	const router = useRouter();

	// useRef can help us get user input of email and password
	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	// this toggles between login and sign up options
	const switchAuthModeHandler = () => {
		if (chooseLogin) {
			setChooseLogin(false);
		} else {
			setChooseLogin(true);
		}
	};

	// use async here because we call backend api to create user below
	const formSubmitHandler = async (event) => {
		// we want to prevent default form submission because we need to validate data first
		event.preventDefault();

		// get the entered values from the users
		const enteredEmail = emailInputRef.current.value;
		const enteredPassword = passwordInputRef.current.value;

		// if the users want to login, called backend to login
		if (chooseLogin) {
			// This is from Next-Auth
			// When errors happened on the backend, we want to stay on login page, so no redirect
			// signIn will always return a promise even though there is an error, the error can be found in the object's error message
			const result = await signIn("credentials", {
				redirect: false,
				email: enteredEmail,
				password: enteredPassword,
			});

			if (!result.error) {
				// I want to get the unique user id from database
				const userId = await GetUserID(enteredEmail);
				console.log("data got back from api");
				console.log(userId);

				// no error, log the user in, redirect to the main page (index.js) for now
				router.replace("/");
			}
		} else {
			// otherwise, call CreateUser function
			try {
				// CreateUser is an async function, so we need to wait for the response data
				const result = await CreateUser(enteredEmail, enteredPassword);
				console.log(result);
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<div>
			<Test></Test>
			<div className={classes.card}>
				<h1>{chooseLogin ? "Login" : "Sign Up"}</h1>
				<form onSubmit={formSubmitHandler}>
					<div>
						<label htmlFor="email">Email</label>
						<br />
						<input type="email" id="email" name="email" ref={emailInputRef} />
					</div>
					<div>
						<label htmlFor="password">Password</label>
						<br />
						<input
							type="text"
							id="password"
							name="password"
							placeholder="At least 7 characters"
							ref={passwordInputRef}
						/>
					</div>
					<div>
						<button className={classes.authButton}>
							{chooseLogin ? "Login" : "Create Account"}
						</button>
						<button
							type="button"
							className={classes.toggleButton}
							onClick={switchAuthModeHandler}
						>
							{chooseLogin
								? "Create new account"
								: "Login with existing account"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AuthForm;
