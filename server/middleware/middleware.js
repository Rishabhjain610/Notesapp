// const jwt=require("jsonwebtoken");
// const User=require("../models/User")
// const Middleware=async(req,res,next)=>{
//   try{
//    const token=req.headers.authorization.split(' ')[1]
//    if(!token){
//     return res.status(401).json({success:false,message:"Unauthorized"})   
//   }
//   const decoded=jwt.verify(token,"secretkey");
//   if(!decoded){
//     return res.status(401).json({success:false,message:"Wrong token"})   
//   }
//   const User=await User.findById({_id:decoded.id})
//   if(!User){
//     return res.status(404).json({success:false,message:"No User"})  
//   }
//   const newUser={name:User.name};
//   req.User=newUser
//   next()
//   }catch(error){

//   }
// }
// module
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const Middleware = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];

    // Verify the token
    const decoded = jwt.verify(token, "secretkey");
    if (!decoded) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    // Find the user in the database
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Attach user details to the request object
    req.user = { id: user._id, name: user.name };
    next();
  } catch (error) {
    console.error("Middleware Error:", error.message);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = Middleware;
