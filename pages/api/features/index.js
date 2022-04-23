import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();

  const features = await db
    .collection("odnr_waterway_points")
    .find({})
    .sort({ "properties.SUBTYPE": 1 })
    .limit(60)
    .toArray();

  res.json(features);
};
