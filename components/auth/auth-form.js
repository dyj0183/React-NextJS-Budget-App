import classes from "./auth-form.module.css";
import { useState } from "react";

const AuthForm = () => {
	const [chooseLogin, setChooseLogin] = useState(true);

	// this toggles between login and sign up
	const switchAuthModeHandler = () => {
		if (chooseLogin) {
			setChooseLogin(false);
		} else {
			setChooseLogin(true);
		}
	};

	return (
		<div className={classes.card}>
			<h1>{chooseLogin ? "Login" : "Sign Up"}</h1>
			<form>
				<div>
					<label htmlFor="email">Email</label>
					<br />
					<input type="email" id="email" name="email" />
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<br />
					<input type="text" id="password" name="password" />
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
