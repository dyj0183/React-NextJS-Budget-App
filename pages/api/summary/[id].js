import { connectToMongoDB } from "../../../helper/mongodb";

export default async function summaryHandler(req, res) {
  var userId = req.query.id;

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
