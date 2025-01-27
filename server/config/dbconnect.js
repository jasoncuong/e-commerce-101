const mongoose = require("mongoose");

const DBConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    if (conn.connection.readyState === 1) {
      console.log("Connected to MongoDB");
    } else {
      console.log("Connection failed");
    }
  } catch (error) {
    console.log("DB connection is failed");
  }
};

module.exports = DBConnect;
