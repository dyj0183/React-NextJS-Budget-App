import classes from "./auth-form.module.css";
import { useState, useRef } from "react";

const AuthForm = () => {
    // set up this state to know whether users want to login or create new account
	const [chooseLogin, setChooseLogin] = useState(true);

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

	const formSubmitHandler = (event) => {
		// we want to prevent default form submission because we need to validate data first
		event.preventDefault();

        // get the entered values from the users
		const enteredEmail = emailInputRef.current.value;
		const enteredPassword = passwordInputRef.current.value;

	};

	return (
		<div className={classes.card}>
			<h1>{chooseLogin ? "Login" : "Sign Up"}</h1>
			<form onSubmit={formSubmitHandler}>
				<div>
					<label htmlFor="email">Email</label>
					<br />
					<input type="email" id="email" name="email" ref={emailInputRef}/>
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<br />
					<input
						type="text"
						id="password"
						name="password"
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
						{chooseLogin ? "Create new account" : "Login with existing account"}
					</button>
				</div>
			</form>
		</div>
	);
};

export default AuthForm;
