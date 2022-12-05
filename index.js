const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const dotenv = require("dotenv");
const ObjectId = require('mongodb').ObjectId;

// use middleware
app.use(cors());
app.use(express.json());
dotenv.config();


//connect with node server
const uri ="mongodb+srv://BatteryLow:C07McLUDJHnF90bM@cluster0.pyjf9x0.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
    try {
      await client.connect();
      const planningCollection = client.db("BatteryLowServer").collection("Project-Planning");

      app.post("/planning", async (req, res)=>{
        const newPlanning= req.body;
        console.log("adding new plan",newPlanning);
        const result = await planningCollection.insertOne(newPlanning);
        res.send(result)
      })
      app.get("/planning", async (req, res) => {
        const query = {};
        const cursor = planningCollection.find(query);
        const planning = await cursor.toArray();
        res.send(planning);
      });
    }
    catch(err){
        console.log(err)
        }
    finally {
        // await client.close();
      }
    }
    
    run().catch(console.dir);
    
    app.get("/", (req, res) => {
      res.send("Running My Pet Server");
    });
    
    app.listen(port, () => {
      console.log("Battery Server is running");
    });