// const mongoose=require('mongoose');
// const connectdb=async()=>{
//   try{
//     await mongoose.connect(`mongodb://localhost:27017/noteapp`);
//     console.log("connected to mongodb");

//   }
//   catch(error){
//     console.log("error connecting to mongo",error.message);
//   }
// }
// export default connectdb;
const mongoose = require('mongoose');

const connectdb = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/noteapp');
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error.message);
  }
};

module.exports = connectdb;

// import mongoose from 'mongoose';

// const connectdb = async () => {
//   try {
//     await mongoose.connect('mongodb://localhost:27017/noteapp');
//     console.log("Connected to MongoDB");
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error.message);
//   }
// };

// export default connectdb;
