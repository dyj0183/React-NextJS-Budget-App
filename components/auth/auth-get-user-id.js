// this function calls the backend api to get unique user id for the entire project to use
export const GetUserID = async () => {
	const response = await fetch("/api/auth/getUserId");

	if (!response.ok) {
		throw new Error("Failed to get user id");
	}

	const data = await response.json();
	return data;
};
