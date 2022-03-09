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

	if (!response.ok) {
		// throw new Error(data.message);
		document.getElementById("emailError").innerHTML = data.message;	
	}

	return data;
};
