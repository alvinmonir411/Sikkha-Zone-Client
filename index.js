// LQYxwenluZgCFHsY;
const express = require("express");
const { ObjectId } = require("mongodb");
require("dotenv").config();

const cors = require("cors");
const app = express();
const port = 3000;
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const { MongoClient, ServerApiVersion } = require("mongodb");
const { sign } = require("jsonwebtoken");
const uri =
  "mongodb+srv://alvinmonir411:LQYxwenluZgCFHsY@shikkhazone.dgspkjc.mongodb.net/?retryWrites=true&w=majority&appName=ShikkhaZone";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  const articlescollection = client
    .db("alvinmonir411")
    .collection("AllArticles");
  try {
    // for jwt
    app.post("/jwt", (req, res) => {
      const { email } = req.body;

      const token = jwt.sign({ email }, process.env.jwt_key, {
        expiresIn: "7d",
      });

      res.send({ token, message: "tomar token" });
    });

    app.get("/FeatureArticles", async (req, res) => {
      const result = await articlescollection.find().limit(6).toArray();
      res.send(result);
    });
    app.get("/Articles/:category", async (req, res) => {
      const { category } = req.params;
      const query = { category: category };
      const result = await articlescollection.find(query).toArray();
      res.send(result);
    });

    app.get("/Articles/id/:id", async (req, res) => {
      const { id } = req.params;
      const query = { _id: new ObjectId(id) };
      const result = await articlescollection.findOne(query);
      res.send(result);
    });

    // thsi is add comment
    app.post("/Articles/id/:id/comment", async (req, res) => {
      const { comment, articleId, author_name, author_photoURL } = req.body;
      const { id } = req.params;
      const query = { _id: new ObjectId(id) };
      const newComment = { comment, articleId, author_name, author_photoURL };
      const result = articlescollection.updateOne(query, {
        $push: {
          comment: newComment,
        },
      });
      res.send(result);
    });
    // this is add like
    // Like article by ID
    app.post("/Articles/id/:id/like", async (req, res) => {
      const { id } = req.params;
      const { userEmail } = req.body;

      try {
        const article = await articlescollection.findOne({
          _id: new ObjectId(id),
        });

        if (!article) {
          return res.status(404).json({ message: "Article not found" });
        }

        if (article.likedBy?.includes(userEmail)) {
          return res
            .status(400)
            .json({ message: "You already liked this article" });
        }

        const result = await articlescollection.updateOne(
          { _id: new ObjectId(id) },
          {
            $inc: { likeCount: 1 },
            $push: { likedBy: userEmail },
          }
        );

        if (result.modifiedCount === 0) {
          return res.status(400).json({ message: "Like failed, try again." });
        }

        res.json({ message: "Article liked successfully" });
      } catch (error) {
        console.error("Like error:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    });

    // for my data
    app.get("/MyArticle/author/:author_id", async (req, res) => {
      const { author_id } = req.params;
      const query = { author_id: author_id };
      const result = await articlescollection.find(query).toArray();
      res.send(result);
    });

    // for update my article
    app.post("/Articles", async (req, res) => {
      const newarticle = req.body;
      const result = await articlescollection.insertOne(newarticle);
      res.send(result);
    });
    // get my article

    app.get("/Articles", async (req, res) => {
      const result = await articlescollection.find().toArray();
      res.send(result);
    });
    // update my article
    app.put("/Articles/:id", async (req, res) => {
      const { id } = req.params;
      const updatedArticle = req.body;
      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: updatedArticle,
      };
      const result = await articlescollection.updateOne(query, updateDoc);
      res.send(result);
    });
    // article delete
    app.delete("/Articles/id/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await articlescollection.deleteOne(query);
      res.send(result);
    });
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);
