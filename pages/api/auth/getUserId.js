import { connectToMongoDB } from "../../../helper/mongodb";
// import { useSession } from "next-auth/client";

const GetUserIdHandler = async (req, res) => {
	// const [session, loading] = useSession();

	res.status(200).json({ userid: '1' })

	// if (session) {
	// 	console.log("fake summary page");
	// 	console.log(session.user.email);
	// 	const userEmail = session.user.email;

	// 	const mongoClient = await connectToMongoDB();
	// 	const db = mongoClient.db();

	// 	const existingUser = db.collection("users").findOne({ email: userEmail });
	// 	console.log(existingUser);

	// 	res.status(200).json({ testuser: existingUser });
	// }
};

export default GetUserIdHandler;
