// import React, { useEffect, useState } from 'react'
// import Navbar from '../../component/Navbar'
// import NoteModal from '../../component/NoteModal'
// import axios from 'axios'
// import Notecard from '../../component/Notecard'
// const Home = () => {
//   const [isModalOpen,setModalOpen]=useState(false)
//   const [notes,setnotes]=useState([])
//   useEffect(()=>{
//     const fetchNotes=async()=>{
//       try{
//          const {data}=await axios.post("http://localhost:1234/api/note")
//          setnotes(data.notes)
//       }
//       catch(error){
//          console.log(error)
//       }
//     }
//     fetchNotes()
//   },[])
//   const closeModal =()=>{
//     setModalOpen(false)
//   }
//   const addNote=async(title,description)=>{
//     try{
//       const response=await axios.get(
//         "http://localhost:1234/api/note/add",{title,description},{
//           headers:{
//             Authorization:`Bearer ${localStorage.getItem("token")}`
//           }
//         }
//       );
//       if(response.data.success){
        
//         closeModal()
//       }
//     }
//     catch(error){
//       console.log(error)
//     }
//   }
//   return (
//     <div className='bg-gray-100 min-h-screen '>
//     <Navbar/>
//     <div className='grid grid-cols-1 md:grid-cols-3 px-8 pt-5'>

//     {notes.length > 0 ? (
//           notes.map((note) => (
//             <Notecard key={ note.id||note._id} note={note} />
//           ))
//         ) : (
//           <p className="text-center text-gray-600">No notes available</p>
//     )}
//     </div>
    
//     <button
//     onClick={()=>setModalOpen(true)}
//     className=' fixed right-4 bottom-4 text-2xl bg-teal-500 text-white font-bold p-4 rounded-full'>
//      +
//     </button>
//     {isModalOpen && <NoteModal closeModal={closeModal} addNote={addNote}/>}
//     </div>
//   )
// }

// export default Home
// import React, { useEffect, useState } from "react";
// import Navbar from "../../component/Navbar";
// import NoteModal from "../../component/NoteModal";
// import axios from "axios";
// import Notecard from "../../component/Notecard";

// const Home = () => {
//   const [isModalOpen, setModalOpen] = useState(false);
//   const [notes, setNotes] = useState([]);

//   // Fetch notes on component mount
//   useEffect(() => {
//     const fetchNotes = async () => {
//       try {
//         const { data } = await axios.get("http://localhost:1234/api/note");
//         setNotes(data.notes); // Ensure backend returns `data.notes`
//       } catch (error) {
//         console.error("Error fetching notes:", error);
//       }
//     };
//     fetchNotes();
//   }, []);

//   // Close modal
//   const closeModal = () => {
//     setModalOpen(false);
//   };

//   // Add new note
//   const addNote = async (title, description) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:1234/api/note/add",
//         { title, description },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       if (response.data.success) {
//         setNotes((prevNotes) => [...prevNotes, response.data.note]); // Add new note to the state
//         closeModal();
//       }
//     } catch (error) {
//       console.error("Error adding note:", error);
//     }
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <Navbar />
//       <div className="p-4">
//         {notes.length > 0 ? (
//           notes.map((note) => (
//             <Notecard key={nd ote.i|| note._id} note={note} />
//           ))
//         ) : (
//           <p className="text-center text-gray-600">No notes available</p>
//         )}
//       </div>
//       <button
//         onClick={() => setModalOpen(true)}
//         className="fixed right-4 bottom-4 text-2xl bg-teal-500 text-white font-bold p-4 rounded-full"
//       >
//         +
//       </button>
//       {isModalOpen && <NoteModal closeModal={closeModal} addNote={addNote} />}
//     </div>
//   );
// };

// export default Home;
import React, { useEffect, useState } from "react";
import Navbar from "../../component/Navbar";
import NoteModal from "../../component/NoteModal";
import axios from "axios";
import Notecard from "../../component/Notecard";
import {toast} from 'react-toastify'
const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [filterNotes, setFilterNotes] = useState([]);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [query, setQuery] = useState("");

  // Fetch notes on component mount
  const fetchNotes = async () => {
    try {
      const { data } = await axios.get("http://localhost:1234/api/note", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setNotes(data.notes);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Filter notes based on query
  useEffect(() => {
    setFilterNotes(
      notes.filter(
        (note) =>
          note.title.toLowerCase().includes(query.toLowerCase()) ||
          note.description.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, notes]);

  // Close the modal
  const closeModal = () => {
    setModalOpen(false);
    setCurrentNote(null);
  };

  // Open modal for editing a note
  const onEdit = (note) => {
    setCurrentNote(note);
    setModalOpen(true);
  };

  // Delete a note
  const deleteNote = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:1234/api/note/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("note deleted")
        fetchNotes()
        

      };
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // Add a new note
  const addNote = async (title, description) => {
    try {
      const response = await axios.post(
        "http://localhost:1234/api/note/add",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        fetchNotes();
        closeModal();
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  // Edit an existing note
  const editNote = async (id, title, description) => {
    try {
      const response = await axios.put(
        `http://localhost:1234/api/note/${id}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        fetchNotes();
        closeModal();
      }
    } catch (error) {
      console.error("Error editing note:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar setquery={setQuery} />
      <div className="px-7 gap-2 pt-8 grid grid-cols-1 md:grid-cols-3">
        {/* Render notes or a message if no notes are available */}
        {notes.length > 0 ? (
          filterNotes.length > 0 ? (
            filterNotes.map((note) => (
              <Notecard
                key={note.id || note._id}
                note={note}
                onEdit={onEdit}
                deleteNote={deleteNote}
              />
            ))
          ) : (
            <p className="text-center text-gray-600">No matching notes found</p>
          )
        ) : (
          <p className="text-center text-gray-600">No notes available</p>
        )}
      </div>
      {/* Button to open the modal */}
      <button
        onClick={() => setModalOpen(true)}
        className="fixed right-4 bottom-4 text-2xl bg-teal-500 text-white font-bold p-4 rounded-full"
      >
        +
      </button>
      {/* Modal for adding/editing a note */}
      {isModalOpen && (
        <NoteModal
          closeModal={closeModal}
          addNote={addNote}
          currentNote={currentNote}
          editNote={editNote}
        />
      )}
    </div>
  );
};

export default Home;
