const fs = require('fs');
const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");
const app = express();
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads/images",express.static(path.join(__dirname,"uploads","images")));

app.use((req,res,next) => {
  res.setHeader('Acsess-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE');
  next();
});
app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});
app.use((error, req, res, next) => {
  if(req.file){
    fs.unlink(req.file.path, err => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(500);
  res.json({ message: error.message || "An unknown error occured!" });
});

mongoose
  .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xwbhbcv.mongodb.net/${process.env.DB_NAME}?appName=Cluster0`)
  .then(() => {
    console.log("connected to database");
    app.listen(5000,() => {
        console.log("Server is running on port 5000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
