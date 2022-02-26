import classess from "./auth-form.module.css";

const AuthForm = () => {
	return (
		<div>
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
			</form>
		</div>
	);
};

export default AuthForm;
