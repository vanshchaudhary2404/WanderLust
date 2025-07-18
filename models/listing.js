const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title:{
    type: String,
    required: true,
  },
  description:{
    type: String,
  },
  image:{
    filename: String,
    url: String,
    // default:"https://unsplash.com/photos/white-and-grey-concrete-building-near-swimming-pool-under-clear-sky-during-daytime-2d4lAQAlbDA",
    // set: (v) => v === ""? "https://unsplash.com/photos/white-and-grey-concrete-building-near-swimming-pool-under-clear-sky-during-daytime-2d4lAQAlbDA" : v,
  },
  price:{
    type: Number,
  },
  location:{
    type: String,
  },
  country:{
    type: String,
  },
});

//Creating model
const Listing = mongoose.model("Listing" , listingSchema);
//Export model like this
module.exports = Listing;