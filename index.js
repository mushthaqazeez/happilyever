const express = require("express");
const res = require("express/lib/response");
const app = express();
const cors = require("cors");
const pool = require("./db");


//middleware
app.use(cors());
app.use(express.json()); // req.body

//ROUTES//

//create a profile

app.post("/profiles", async (req, res) => {
  try {
    console.log(req.body);
    const newprofile = await pool.query(
      "INSERT INTO profiles(name,DOB,status) VALUES (?,?,?)",[req.body.name,req.body.DOB,req.body.status]
     
    );

    res.json("profile was added");
  } catch (err) {
    console.error(err.message);
  }
});

//show all profiles
app.get("/profiles",async (req,res) =>{
  try {
    const showprofiles= await pool.query("SELECT * FROM profiles ");
    res.json(showprofiles[0]);
  } catch(err) {
    console.log(err.message);
  }
})



// list all paused profiles
app.get("/profiles/paused",async (req,res) =>{
  try {
    const pausedprof= await pool.query("SELECT * FROM profiles where status='paused' ");
    res.json(pausedprof[0]);
  } catch(err) {
    console.log(err.message);
  }
})

//pause a profile

app.put("/profiles/pause/:id",async (req,res) =>{
  try {
    const {id} = req.params;
    const pause_status= await pool.query("UPDATE profiles set status='PAUSED' WHERE name = ? ",[id]
    
    );

    res.json("profile was updated");

  } catch(err) {
    console.log(err.message);
  }
})

//UNPAUSE A PROFILE

app.put("/profiles/active/:id",async (req,res) =>{
  try {
    const {id} = req.params;
    const pause_status= await pool.query("UPDATE profiles set status='ACTIVE' WHERE name = ? ",[id]
    
    );

    res.json("profile was updated");

  } catch(err) {
    console.log(err.message);
  }
})

//DELETE A PROFILE

app.delete("/profiles/delete/:id",async (req,res) =>{
  try {
    const {id} = req.params;
    const delete_prof= await pool.query("DELETE FROM profiles WHERE name = ? ",[id]
    
    );

    res.json("profile was deleted");

  } catch(err) {
    console.log(err.message);
  }
})


app.listen(3200, () => {
    console.log("Server is running on port 3200");
  });

app.get('/', (req,res) => {
  res.send("HappilyEver Assignment");
});