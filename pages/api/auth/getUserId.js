import { connectToMongoDB } from "../../../helper/mongodb";

const GetUserIdHandler = async (req, res) => {
	if (req.method !== "POST") {
		return;
	}

	// Get the data from frontend, use destructuring to access them
	const data = req.body;
	const { email } = data;

	const mongoClient = await connectToMongoDB();
	const db = mongoClient.db();

	const existingUser = await db.collection("users").findOne({ email: email });
	console.log("The existing user id in string");
	console.log(existingUser._id.toString());

	res.status(200).json({ userId: "1" });
	mongoClient.close();
};

export default GetUserIdHandler;
