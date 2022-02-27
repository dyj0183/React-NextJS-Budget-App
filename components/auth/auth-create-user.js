// since we are calling the api endpoint, this is an async function
export const CreateUser = async (email, password) => {
	//call the backend api to create a new user
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
