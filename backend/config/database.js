const mongoose = require("mongoose");

// MONGOBD -- COMPASS

// const connectDatabase = () => {
//   mongoose.connect(process.env.DB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
// };

// module.exports = connectDatabase;

//---------------------------------------------------------------//

// MONGOBD -- ATLAS

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI_CLOUD, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connected to cloud");
    })
    .catch((e) => console.log("connection issue", e));
};

module.exports = connectDatabase;
