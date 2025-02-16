// const express=require("express");
// const Note=require("../models/Note")
// const router=express.Router()
// const Middleware=require("../middleware/middleware")
// router.post('/add',Middleware,async(req,res)=>{
//   try {
//     const { title,description } = req.body;
   

    
//     const newNote = new Note({
//       title,description,userId:req.user.id
//     });
//     await newNote.save()
//     return res.status(200).json({
//       success: true,
//       message: "Note created successfully"
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Error in server"
//     });
//   }
// })
// router.get('/',Middleware,async (req,res)=>{
//  try{
//   const notes=await Note.find({_id:})
//   return res.status(200).json({success:true,notes})
//  }
//  catch(error){
//   return res.status(500).json({success:false,message:"Cant retrevie notes"})
//  }
// })
// router.put("/:id",async (req,res)=>{
//   try{
//      const {id}=req.params;
//      const updateNote=await Note.findByIdAndUpdate(id,req.body)
//      return res.status(200).json({success:true,updateNote})
//     }
//     catch(error){
//      return res.status(500).json({success:false,message:"Cant update notes"})
//     }

// })
// router.delete("/:id",async (req,res)=>{
//   try{
//      const {id}=req.params;
//      const updateNote=await Note.findByIdAndDelete(id)
//      return res.status(200).json({success:true,updateNote})
//     }
//     catch(error){
//      return res.status(500).json({success:false,message:"Cant delete notes"})
//     }

// })
// module.exports = router;
const express = require("express");
const Note = require("../models/Note");
const router = express.Router();
const Middleware = require("../middleware/middleware");

// Add a new note
router.post('/add', Middleware, async (req, res) => {
  try {
    const { title, description } = req.body;

    // Ensure required fields are provided
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    const newNote = new Note({
      title,
      description,
      userId: req.user.id, // Assuming `req.user` is set by your middleware
    });
    await newNote.save();

    return res.status(200).json({
      success: true,
      message: "Note created successfully",
      note: newNote,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// Get all notes for the authenticated user
router.get('/', Middleware, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id });
    return res.status(200).json({
      success: true,
      notes,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Cannot retrieve notes",
    });
  }
});

// Update a note by ID
router.put("/:id", Middleware, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true } // Return the updated document
    );

    if (!updatedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note updated successfully",
      note: updatedNote,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Cannot update note",
    });
  }
});

// Delete a note by ID
router.delete("/:id", Middleware, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note deleted successfully",
      note: deletedNote,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Cannot delete note",
    });
  }
});

module.exports = router;
