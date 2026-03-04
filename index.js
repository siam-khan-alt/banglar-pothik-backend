require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
app.use(cors())
app.use(express.json())
const port = process.env.PORT || 5000;

const uri =`${process.env.MONGODB_URI}`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    await client.connect();

    const db = client.db("banglar_pothik");
    const divisionscollection = db.collection("divisions")
    const districtsCollection = db.collection("districts");
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    app.get('/', (req, res) => {
  res.send('Hello banglar pothik!')
})

app.get('/divisions', async (req, res) => {
  const divisions = await divisionscollection.find().toArray();
  res.send(divisions);
});
app.get('/districts', async (req, res) => {
  const divisions = await districtsCollection.find().toArray();
  res.send(divisions);
});


  } finally {
    // await client.close();
  }
}
run().catch(console.dir);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})