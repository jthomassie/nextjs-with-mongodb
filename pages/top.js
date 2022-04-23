import { connectToDatabase } from "../util/mongodbxxx";

export default function Top({ features }) {
  return (
    <div>
      <h1>Top 1000 Features</h1>
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
    .collection("odnr_waterway_points")
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
