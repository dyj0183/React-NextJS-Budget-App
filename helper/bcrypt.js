import { hash, compare } from "bcryptjs";

// return the hashed password
export const hashPassword = async (password) => {
	const hashedPassword = await hash(password, 12);
	return hashedPassword;
};
