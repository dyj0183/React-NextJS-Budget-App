// this function calls the backend api to create a new user (an async function)
export const CreateUser = async (email, password) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		body: JSON.stringify({ email, password }),
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error("Failed to create a new user");
	}

	const data = await response.json();
	return data;
};
