const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// আপনার MongoDB URI
const uri =
  "mongodb+srv://ArtifyDB:algorithm@cluster0.da9dhi6.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // ডাটাবেসে কানেক্ট করা
    await client.connect();
    console.log("✅ Successfully connected to MongoDB (artwork-db)!");

    const db = client.db("artwork-db");
    const artworkCollection = db.collection("artworks");

    // ১. POST Route: নতুন আর্টওয়ার্ক ডাটাবেসে সেভ করা
    app.post("/artworks", async (req, res) => {
      const newArtwork = req.body;
      const result = await artworkCollection.insertOne(newArtwork);
      res.send(result);
    });

    // ২. GET Route: সব আর্টওয়ার্ক ডাটাবেস থেকে নিয়ে আসা
    app.get("/artworks", async (req, res) => {
      const result = await artworkCollection.find().toArray();
      res.send(result);
    });
    // ১. নির্দিষ্ট ইউজারের ইমেইল অনুযায়ী ডাটা পাওয়ার API (My Gallery-র জন্য)
    app.get("/my-artworks/:email", async (req, res) => {
      const email = req.params.email;
      const query = { userEmail: email }; // আপনার ডাটাবেসে ফিল্ডের নাম 'userEmail' আছে কি না চেক করে নিন
      const result = await artworkCollection.find(query).toArray();
      res.send(result);
    });

    // ২. আর্টওয়ার্ক ডিলিট করার API
    app.delete("/artwork/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await artworkCollection.deleteOne(query);
      res.send(result);
    });
    // ৩. Ping: কানেকশন চেক করা
    await client.db("admin").command({ ping: 1 });
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Artify server is running smoothly 🚀");
});

app.listen(port, () => {
  console.log(`🚀 Server listening on port: ${port}`);
});
