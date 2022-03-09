// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectToMongoDB } from '../../helper/mongodb';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const body = req.body

        const mongoClient = await connectToMongoDB()
        const db = mongoClient.db()
        // TODO: use the currently logged in user's id
        await db.collection('budgets').updateOne({ userId: body.userId }, { 
            $set: { incomes: body.incomes, expenses: body.expenses }
        }, { upsert: true })

        mongoClient.close()

        return res.status(200).end()
    }

    res.status(404).end()
}
