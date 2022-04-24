import { connectToDatabase } from "../../../util/mongodb";
const ObjectId = require("mongodb").ObjectId;
let col = process.env.MONGODB_COL;

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const features = await db
    .collection(col)
    .find({ _id: new ObjectId(req.body) })
    // .sort({ "properties.SUBTYPE": 1 })
    // .limit(60)
    .toArray();

  res.json(features);
};
