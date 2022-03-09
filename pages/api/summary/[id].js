import { connectToMongoDB } from "../../../helper/mongodb";

export default async function summaryHandler(req, res) {
  var userId = req.query.id;
  if (userId === undefined) {
    res.status(401);
    return;
  }

  try {
    // get mongo connection
    const mongoClient = await connectToMongoDB();
    // connect to database
    const db = mongoClient.db();

    const summary = await db.collection("budgets").findOne({ userId: userId });
    if (summary === null) {
      res.status(404);
      mongoClient.close();
      return;
    }
    res.status(200).json({
      incomes: summary.incomes,
      expenses: summary.expenses,
    });
    mongoClient.close();
  } catch (err) {
    res.status(500);
  }
}
