import { connectToMongoDB } from "../../../helper/mongodb";

export default async function summaryHandler(req, res) {
  var userId = req.query.id;
  if (userId === undefined) {
    console.log("User id not set. Try logging in?");
    res.status(401).end();
    return;
  }

  // get mongo connection
  const mongoClient = await connectToMongoDB();
  try {
    // connect to database
    const db = mongoClient.db();

    const summary = await db.collection("budgets").findOne({ userId: userId });
    if (
      summary === null ||
      summary.incomes.length === 0 ||
      summary.expenses.length === 0
    ) {
      res.status(404).end();
      mongoClient.close();
      return;
    }
    console.log(summary);
    res.status(200).json({
      incomes: summary.incomes,
      expenses: summary.expenses,
    });
  } catch (err) {
    res.status(500).json(err);
  } finally {
    mongoClient.close();
  }
}
