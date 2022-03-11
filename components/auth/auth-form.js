import { useState, useRef } from "react";
// Use next-auth for frontend login authentication
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";

import { Center, Spinner } from "@chakra-ui/react";

import classes from "./auth-form.module.css";
import { CreateUser } from "./auth-create-user";
import { GetUserID } from "./auth-get-user-id";

// Use Jotai to manage and consume userId
import { useAtom } from "jotai";
import { userIdAtom } from "../../store/atom";

const AuthForm = () => {
	// set up this state to know whether users want to login or create new account
	const [chooseLogin, setChooseLogin] = useState(true);
	// Set up this for spinner to show up when loading to create account or log user in
	const [isLoading, setIsLoading] = useState(false);
	// Set up the router from next.js
	const router = useRouter();
	// Jotai, by default, we set to null for userIdAtom
	const [userId, setUserId] = useAtom(userIdAtom);

	// useRef can help us get user input of email and password
	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	// Toggle between login and sign up options
	const switchAuthModeHandler = () => {
		// Clean out all the old error message when toggling
		document.getElementById("generalError").innerHTML = "";
		document.getElementById("emailError").innerHTML = "";
		document.getElementById("passwordError").innerHTML = "";
		if (chooseLogin) {
			setChooseLogin(false);
		} else {
			setChooseLogin(true);
		}
	};

	// use async here because we call backend api to create user below
	const formSubmitHandler = async (event) => {
		// First clean out all the old error message
		document.getElementById("generalError").innerHTML = "";
		document.getElementById("emailError").innerHTML = "";
		document.getElementById("passwordError").innerHTML = "";

		setIsLoading(true);
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

			// If there is any error message
			if (result.error) {
				document.getElementById("generalError").innerHTML = result.error;
				setIsLoading(false);
			}

			if (!result.error) {
				// Get the unique user id from database
				const mongoUserObject = await GetUserID(enteredEmail);
				const mongoUserId = mongoUserObject.userId;
			
				// Set up the Mongo user id for the entire app to use
				setUserId(mongoUserId);
				setIsLoading(false);

				// no error, log the user in, redirect to the main page (index.js) for now
				router.replace("/");
			}
		} else {
			// otherwise, call CreateUser function
			try {
				// CreateUser is an async function, so we need to wait for the response data
				const result = await CreateUser(enteredEmail, enteredPassword);

				setIsLoading(false);
				if (result.status === "succeed") {
					// Redirect to the login form after creating an account successfully
					router.replace("/");
				}
			} catch (error) {
				setIsLoading(false);
				console.log(error);
			}
		}
	};

	return (
		<div>
			{isLoading && (
				<Center>
					<Spinner size="xl" />
				</Center>
			)}
			<div className={classes.card}>
				<h1 className={classes.headerText}>
					{chooseLogin ? "Login" : "Sign Up"}
				</h1>
				<form onSubmit={formSubmitHandler}>
					<div>
						<label htmlFor="email">Email</label>
						<br />
						<input
							type="email"
							id="email"
							name="email"
							ref={emailInputRef}
							required
							className={classes.inputField}
						/>
					</div>
					<div>
						<p id="emailError" style={{ color: "red" }}></p>
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
							required
							className={classes.inputField}
						/>
					</div>
					<div>
						<p id="passwordError" style={{ color: "red" }}></p>
					</div>
					<div>
						<p
							id="generalError"
							style={{ color: "red", marginTop: "10px" }}
						></p>
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
								? "No account yet? Create new account"
								: "Login with existing account"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AuthForm;
