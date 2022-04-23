// pages/features.js
import { connectToDatabase } from "../util/mongodbxxx";
import { sevenCounty } from "../geojson/sevenCounty";

const Features = ({ features }) => {
  //
  // const { data, error } = useSWR("/api/user/123", fetcher);

  return (
    <div>
      <h1>ODNR Waterway Points</h1>
      <ul>
        {features.map((f, i) => (
          <li key={`f${i}`}>
            <p>{`${f._id}: ${f.count}`}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export async function getServerSideProps() {
  //
  const { db } = await connectToDatabase();
  const collection = db.collection("odnr_waterway_points");

  // code examples can be pasted here...

  // is point within 7-couunty boundary
  let geoquery = {
    "geometry.coordinates": {
      $geoWithin: {
        $geometry: sevenCounty,
      },
    },
  };
  let subtype = {
    _id: "$properties.SUBTYPE",
    count: { $count: {} },
  };

  // agg filters, groups, sorts by count in group
  const agg = await collection
    .aggregate([
      { $match: geoquery },
      { $group: subtype },
      { $sort: { count: -1, _id: 1 } },
    ])
    .toArray();
  return {
    props: {
      features: JSON.parse(JSON.stringify(agg, null, "  ")),
    },
  };
}

export default Features;
