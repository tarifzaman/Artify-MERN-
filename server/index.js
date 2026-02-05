const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// আপনার কানেকশন স্ট্রিং
const uri = "mongodb+srv://ArtifyDB:algorithm@cluster0.da9dhi6.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // ডাটাবেসে কানেক্ট করা
    await client.connect();
    console.log("✅ Successfully connected to MongoDB!");

    const db = client.db("artwork-db");
    const artworkCollection = db.collection("artworks");

    // সব আর্টওয়ার্ক পাওয়ার জন্য রাউট
    app.get('/artworks', async (req, res) => {
      const result = await artworkCollection.find().toArray(); // ডাটা রিড করার নিয়ম
      res.send(result);
    });

    // নতুন আর্টওয়ার্ক সেভ করার জন্য রাউট (Add Model এর জন্য)
    app.post('/artworks', async (req, res) => {
      const newArt = req.body;
      const result = await artworkCollection.insertOne(newArt);
      res.send(result);
    });

  } catch (error) {
    console.error("❌ Connection Error:", error);
  }
  // নোট: client.close() সরিয়ে ফেলেছি যাতে কানেকশন চালু থাকে।
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Artify server is running 🚀");
});

app.listen(port, () => {
  console.log(`🚀 Server running on port: ${port}`);
});