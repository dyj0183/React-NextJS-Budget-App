// this function calls the backend api to create a new user (an async function)
export const CreateUser = async (email, password) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		body: JSON.stringify({ email, password }),
		headers: {
			"Content-Type": "application/json",
		},
	});

	const data = await response.json();

	// Clean up all the error message first
	document.getElementById("emailError").innerHTML = "";
	document.getElementById("passwordError").innerHTML = "";
	document.getElementById("generalError").innerHTML = "";	
	
	if (!response.ok) {
		// throw new Error(data.message);
		if (data.errorType === "email") {
			document.getElementById("emailError").innerHTML = data.message;	
		} else if (data.errorType === "password") {
			// display general error message
			document.getElementById("passwordError").innerHTML = data.message;	
		} else {
			// display general error message
			document.getElementById("generalError").innerHTML = data.message;	
		}
	}

	return data;
};
