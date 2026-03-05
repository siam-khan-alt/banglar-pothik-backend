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
    // await client.connect();

    const db = client.db("banglar_pothik");
    const divisionscollection = db.collection("divisions")
    const districtsCollection = db.collection("districts");
    const upazilasCollection = db.collection("upazilas");
    const unionsCollection = db.collection("unions");
    const usersCollection = db.collection("users");


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
  const districts = await districtsCollection.find().toArray();
  res.send(districts);
});

app.get('/upazilas',  async (req, res) => {
  const upazilas = await upazilasCollection.find().toArray();
  res.send(upazilas);
});

app.get('/unions',  async (req, res) => {
  const unions = await unionsCollection.find().toArray();
  res.send(unions);
});


app.post('/users', async (req, res) => {
  const user = req.body;
  
  const query = { email: user.email };
  const existingUser = await usersCollection.findOne(query);

  if (existingUser) {
    return res.send({ message: 'User already exists', insertedId: null });
  }

  const result = await usersCollection.insertOne(user);
  res.send(result);
});


app.get('/users', async (req, res) => {
  const result = await usersCollection.find().toArray();
  res.send(result);
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

  } finally {
    // await client.close();
  }
}
run().catch(console.dir);
