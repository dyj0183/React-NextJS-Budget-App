import { connectToMongoDB } from "../../../helper/mongodb";

export default async function summaryHandler(req, res) {
  var userId;
  try {
    // TODO: check for if the user is logged in with session and get their user id into the request body
    userId = "621d742436c291324f692b38";
  } catch (err) {
    // handle not logged in or bad user id
  }

  try {
    // get mongo connection
    const mongoClient = await connectToMongoDB();
    // connect to database
    const db = mongoClient.db();

    const summary = await db.collection("budgets").findOne({ userId: userId });
    res.status(200).json({
      incomes: summary.incomes,
      expenses: summary.expenses,
    });
  } catch (err) {
    // handle no budget found
    // handle other problems
  }
}
