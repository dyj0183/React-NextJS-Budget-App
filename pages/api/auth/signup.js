import { connectToMongoDB } from "../../../helper/mongodb";
import { hashPassword } from "../../../helper/bcrypt";

// This is the api endpoint for signing up (create) a new user
const SignupHandler = async (req, res) => {
	// The request must be POST because we are creating a new user
	if (req.method !== "POST") {
		return;
	}

	// Get the data from frontend, use destructuring to access them
	const data = req.body;
	const { email, password } = data;

	// Do backend data error validation in case frontend error checking got disabled
	// Password must be at least 7 characters long
	if (!email || !email.includes("@") || !password) {
		res.status(422).json({
			message: "No empty or invalid input is allowed.",
		});
		return;
	}

	if (password.trim().length < 7) {
		res.status(422).json({
			message: "Please make sure the password has at least 7 characters.",
			errorType: "password",
		});
		return;
	}

	// get the MongoDB connection
	const mongoClient = await connectToMongoDB();
	// connect to the database
	const db = mongoClient.db();

	// Need to make sure no duplcated email is used to sign up
	const existingUser = await db.collection("users").findOne({ email: email });

	if (existingUser) {
		res.status(422).json({
			message: "User already exists. Please use a different email.",
			errorType: "email",
		});
		// Make sure to close database connection
		mongoClient.close();
		return;
	}

	// I need to hash the password before I save it into database
	const hashedPassword = await hashPassword(password);

	// Insert a new user into the "users" collection
	const result = await db.collection("users").insertOne({
		email: email,
		password: hashedPassword,
	});

	res.status(201).json({ message: "Created User Successfully!", status: "succeed" });
	mongoClient.close();
};

// IMPORTANT: I learned that I must use the "default" key word, otherwise I would get a 500 error
// I can't do "export const SignHandler = async (req, res) => {}"
// differences between export & export default: https://stackoverflow.com/questions/33611812/export-const-vs-export-default-in-es6
export default SignupHandler;
