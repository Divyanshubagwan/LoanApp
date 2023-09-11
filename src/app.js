const { log } = require("console");
const express = require("express");
const path = require("path");
const app = express();
require("./db/conn")
const Login = require("./models/login");
const Loan = require("./models/loan");
const { default: mongoose } = require("mongoose");
const port = process.env.PORT || 3000;
const static_path = path.join(__dirname, "../public");
// console.log(path.join(__dirname, "../public")); 
app.use(express.static(static_path));
app.set("view engine", "hbs");

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/admin", async (req,res)=> {
let data = await Loan.find({})
  res.render("admin", {tableData: data})
})

app.get("/repaymentdetails/:id", async (req, res)=>{
  const itemId = req.params.id;
  try{
    loanDetails = await Loan.findById(itemId)
    //.log("====================")
   // console.log(data)
    //console.log("====================")
    //{"_id":"64fe0c056cab74b94268689c","username":"Bunny","status":"approved","total_amount":4000,"num_installments":2,"__v":0}
    //res.json(loanDetails)
    let total_amount = loanDetails.total_amount
    let num_installments = loanDetails.num_installments
    let installmentamount = total_amount/num_installments
    res.json({total_amount, num_installments, installmentamount})
  } catch(error) {
    
  }
})

app.post("/updateStatus/:id", async (req, res) => {
  const itemId = req.params.id;
  const newStatus = req.body.status; 
  //console.log("calling on app.js")
  try {
    const updatedItem = await Loan.findByIdAndUpdate(
      itemId,
      { status: newStatus },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ error: "Loan not found" });
    }

    res.json(updatedItem);
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ error: "Status update failed" });
  }
});


app.get("/status/:username", async (req,res)=> {
  let username = req.params.username
  let data = await Loan.find({username})
  console.log(data[0])
  res.render("status", {tableData: data})
})

app.get("/customer/", (req,res)=> {
  res.render("customer")
})

app.get("/apply", (req,res)=> {
  res.render("apply")
})

app.post("/apply", async (req, res) => {
  try {
    const { total_amount, num_installments, username } = req.body;

    const loan = new Loan({
      total_amount,
      num_installments,
      username
    });

    await loan.save();

    res.status(200).send("Loan application submitted successfully. <a href='/customer'>Go back</a>");

  } catch (error) {
    console.error("Error while processing loan application:", error);
    res.status(500).send("Internal server error");
  }
});




app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

  
    const user = await Login.findOne({ username });

    if (!user) {
      return res.status(400).send("Invalid username or password");
    }

    if (password !== user.password) {
      return res.status(400).send("Invalid username or password");
    }
   
     const role = user.role;

    if (role === "admin") {
      res.redirect('/admin');
    } else if (role === "customer") {

      res.redirect(`/customer/?u=${username}`);
    } else {
      res.status(403).send("Access denied");
    }
  
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Internal server error");
  }
});


app.listen(port, () => {
  console.log(`Server is running at port no ${port}`);
});
