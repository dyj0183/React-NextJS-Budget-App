import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { verifyPassword } from "../../../helper/bcrypt";
import { connectToMongoDB } from "../../../helper/mongodb";

export default NextAuth({
	session: {
		jwt: true,
	},
	providers: [
		Providers.Credentials({
			async authorize(credentials) {
				const mongoClient = await connectToMongoDB();

				const usersCollection = mongoClient.db().collection("users");

				const user = await usersCollection.findOne({
					email: credentials.email,
				});

				if (credentials.email === "" || credentials.password === "") {
					mongoClient.close();
					throw new Error("Empty field is not allowed."); 
				}

				if (!user) {
					mongoClient.close();
					throw new Error("No user found with this email address.");
				}

				// Verify the password
				const isValid = await verifyPassword(credentials.password, user.password);

				if (!isValid) {
					mongoClient.close();
					throw new Error("Password doesn't match. Please try again.");
				}

				mongoClient.close();
				// Return to let next auth know that it succeed
				return { email: user.email };
			},
		}),
	],
});
