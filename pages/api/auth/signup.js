// this is the api endpoint for signing up (create) a new user
export const SignupHandler = (req, res) => {
	// the request must be POST because we are creating a new user
	if (req.method !== "POST") {
		return;
	}

	// get the data from frontend, use destructuring to access them
	const data = req.body;
	const { email, password } = data;

	// do backend data error validation in case frontend error checking got disabled
    // password must be at least 6 characters long
	if (
		!email ||
		!email.includes("@") ||
		!password ||
		!password.trim().length < 7
	) {
		res.status(422).json({
			message: "Invalid input",
		});
        return;
	}
};
