import React, { useState, useEffect } from "react";

const NoteModal = ({ closeModal, addNote, currentNote, editNote }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title || "");
      setDescription(currentNote.description || "");
    }
  }, [currentNote]);

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!title.trim() || !description.trim()) {
        setError("Both title and description are required.");
        return;
    }

    try {
        if (currentNote) {
            // Edit an existing note
            await editNote(currentNote._id, title, description);
        } else {
            // Add a new note
            await addNote(title, description);
        }
        closeModal(); // Close the modal on success
    } catch (err) {
        setError("An error occurred while saving the note. Please try again.");
    }
};


  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-white p-8 rounded w-[80vw] h-[50vh]">
        <h2 className="text-xl font-bold mb-4">
          {currentNote ? "Edit Note" : "Add New Note"}
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note Title"
            className="border p-2 w-full mb-4"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Note Description"
            className="border p-2 w-full mb-4"
          />
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-800 text-white px-20 py-2 rounded"
            >
              {currentNote ? "Update Note" : "Add Note"}
            </button>
          </div>
        </form>
        <div className="flex justify-center">
          <button
            className="mt-4 text-red-500"
            onClick={closeModal}
            aria-label="Cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;



