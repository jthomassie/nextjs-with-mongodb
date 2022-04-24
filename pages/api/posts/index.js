// pages/api/posts/index.js

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { connectToDatabase } from "../../../util/mongodb";
const ObjectId = require("mongodb").ObjectId;
let col = process.env.MONGODB_COL;

export default async function handler(req, res) {
  // switch the methods
  switch (req.method) {
    case "GET": {
      return getPosts(req, res);
    }

    case "POST": {
      return addPost(req, res);
    }

    case "PUT": {
      return updatePost(req, res);
    }

    case "DELETE": {
      return deletePost(req, res);
    }
  }
}

// get all posts
async function getPosts(req, res) {
  console.log("REQ", req);
  try {
    let { db } = await connectToDatabase();
    let posts = await db
      .collection(col)
      .find({})
      //.sort({ published: -1 })
      .toArray();
    return res.json({
      message: JSON.parse(JSON.stringify(posts)),
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

// add new post
async function addPost(req, res) {
  try {
    let { db } = await connectToDatabase();
    await db.collection("odnr_waterway_points").insertOne(JSON.parse(req.body));
    return res.json({
      message: "Post added successfully",
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

// update post
async function updatePost(req, res) {
  try {
    let { db } = await connectToDatabase();

    await db.collection("odnr_waterway_points").updateOne(
      {
        _id: new ObjectId(req.body),
      },
      { $set: { published: true } }
    );

    return res.json({
      message: "Post updated successfully",
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

// delete post
async function deletePost(req, res) {
  try {
    let { db } = await connectToDatabase();

    await db.collection("odnr_waterway_points").deleteOne({
      _id: new ObjectId(req.body),
    });

    return res.json({
      message: "Post deleted successfully",
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}
