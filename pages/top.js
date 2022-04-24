import { connectToDatabase } from "../util/mongodbxxx";
let col = process.env.MONGODB_COL;

export default function Top({ features }) {
  return (
    <div>
      <h1>Top 1,000 Features</h1>
      <ul>
        {features.map((f, i) => (
          <li key={`f${i}`}>
            <p>{`${f.properties.SUBTYPE}: ${f._id}`}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const { db } = await connectToDatabase();
  const features = await db
    .collection(col)
    .find({})
    .sort({ "properties.SUBTYPE": 1 })
    .limit(1000)
    .toArray();
  //
  return {
    props: {
      features: JSON.parse(JSON.stringify(features)),
    },
  };
}
