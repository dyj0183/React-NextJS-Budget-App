import { hash, compare } from "bcryptjs";

// return the hashed password
export const hashPassword = async (password) => {
	const hashedPassword = await hash(password, 12);
	return hashedPassword;
};

// Compare the user login password with the hashedPassword from the database
export const verifyPassword = async (password, hashedPassword) => {
	const isValid = await compare(password, hashedPassword);
	return isValid;
};
