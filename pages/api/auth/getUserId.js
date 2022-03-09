import { connectToMongoDB } from "../../../helper/mongodb";
import { getSession } from "next-auth/client";

const GetUserIdHandler = async (req, res) => {
	const session = await getSession();
	if (session) {
		console.log("get session returned");
		console.log(session);
		// console.log("fake summary page");
		// console.log(session.user.email);
		// const userEmail = session.user.email;

		// const mongoClient = await connectToMongoDB();
		// const db = mongoClient.db();

		// const existingUser = db.collection("users").findOne({ email: userEmail });
		// console.log(existingUser);

		res.status(200).json({ userId: 1 });
	}
};

export default GetUserIdHandler;
