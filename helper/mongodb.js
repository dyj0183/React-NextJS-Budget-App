//  must import this in order to connect with MongoDB
import { MongoClient } from "mongodb";

export const connectToMongoDB = async () => {
	const client = await MongoClient.connect(process.env.MONGODB);

	return client;
};
