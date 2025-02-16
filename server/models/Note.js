const mongoose=require("mongoose");
const NoteSchema=new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,red:"User"
  },
});
const Note=mongoose.model('Note', NoteSchema);
module.exports = Note;