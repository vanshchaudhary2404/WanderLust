const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override"); 

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then((res)=>{
    console.log("connected to DB");
  })
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views" , path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));


app.get("/" , (req, res)=>{
  res.send("Hi i am root");
});


//Index Route
app.get("/listings" , async (req, res)=>{
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", {allListings});
});

//New Route--write it before show route bcoz it may be use show route first and got error in loading page
app.get("/listings/new" , (req, res)=>{
  res.render("listings/new");
});

//Show Route
app.get("/listings/:id" , async (req, res)=>{
  let {id} = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs" , {listing});
});

//Create Route
app.post("/listings", async (req,res)=>{
  // let {title , description , image , price , country , location}
  // let listing = req.body.listing; //this print data as in JS Object form to convert it into our model document dirtectly we use 
  let newListing= new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
});

//Edit Route
app.get("/listings/:id/edit" , async(req, res)=>{
  let {id} = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs" ,{listing});
});

//Update Route
app.put("/listings/:id", async (req,res)=>{
  let {id} = req.params;
  await Listing.findByIdAndUpdate( id , {...req.body.listing});
  // res.redirect("/listings");//to redirect directly on updated page 
  res.redirect(`/listings/${id}`);
});


//Delete Route
app.delete("/listings/:id" , async(req, res)=>{
  let{id} = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listings");
});


//testListing using listing.js (Listing).
// app.get("/testListing" , async (req, res)=>{
//   let sampleListing = new Listing({
//     title: "My new villa",
//     description: "By the branch",
//     price: 1200,
//     location: "Calanguate , Goa",
//     country: "India",
//   });

//   await sampleListing.save();
//   console.log("sample was saved");
//   res.send("successful testing");
// });



app.listen( 8080 , ()=>{
  console.log("Server is listening to the port 8080 ")
});