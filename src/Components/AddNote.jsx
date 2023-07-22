import React, { useContext, useState } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import noteContext from "../context/notes/NoteContext";
const AddNote = (props) => {
  const context = useContext(noteContext);

  const { addNote, display, toggleDisplay } = context;

  //addnote Components useState
  const [note, setNote] = useState({ title: "", description: "", tag: "" }); //value of note varible is change when user enter input

  // const [display, setDisplay] = useState('false');//for toggling the edit note model

  //after entering value when user click on submit button below funtion is called
  const handleClick = (e) => {
    e.preventDefault();
    //here we are calling the addNote function with the three argumnent
    addNote(note.title, note.description, note.tag);

    //for clearing the input field after user click on save note
    setNote({ title: "", description: "", tag: "" });
    // props.showAlert("Note saved...", "true")
    toast.success("Note Saved...");
  };

  const hanldeOnchange = (event) => {
    //here we are adding user input into the varible 'note'
    //spread operation means new value are added in previous value
    setNote({ ...note, [event.target.name]: event.target.value });
  };
  return (
    <>
      <ToastContainer
        transition={Slide}
        position="top-center"
        autoClose={3000}
      />
      <div
        className={`h-3/4 md:h-2/3  md:p-5 flex flex-col justify-between ${
          display === "false" ? " " : "blur-[3px]"
        }`}

      >
        {/* add note btn */}
        <div className="flex items-center justify-center">
          <button
            type="button"
            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br  hover:shadow-lg hover:shadow-blue-500/50  font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 flex"
            onClick={() => {
              toggleDisplay("true");
            }}
          >
            New Note
            <svg
              aria-hidden="true"
              className="w-5 h-5 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* add note popup  by default it is hidden  */}
      <div
        className={`${
          display === "false" ? "hidden" : "visible"
        } modal fade fixed top-1/4 left-[5%] md:top-1/4 md:left-[37%] w-4/5 md:w-3/12 outline-none overflow-x-hidden overflow-y-auto z-10 shadow-lg shadow-gray-400`}
      >
        <form onSubmit={handleClick}>
          <div className="modal-dialog relative w-auto pointer-events-none ">
            <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
              <div className="modal-body relative p-4">
                <div className="mb-6">
                  <label
                    htmlhtmlfor="title"
                    className="block mb-2 text-base font-medium text-gray-900 "
                  >
                    Note Title
                  </label>
                  <input
                    type="text"
                    value={note.title}
                    id="title"
                    name="title"
                    className="block p-2.5 w-full text-sm text-gray-900 rounded-md shadow-md bg-gray-100 dark:border-gray-600 outline-gray-600"
                    placeholder="Add Note title..."
                    onChange={hanldeOnchange}
                    maxLength="15"
                  />
                </div>
                <div>
                  <label
                    htmlhtmlfor="description"
                    className="block mb-2 text-base font-medium text-gray-900 "
                  >
                    Note Description
                  </label>
                  <textarea
                    id="description"
                    value={note.description}
                    name="description"
                    rows="7"
                    className="block p-2.5 w-full text-sm text-gray-900 rounded-lg shadow-md bg-gray-100 dark:border-gray-600 outline-gray-600 resize-none"
                    placeholder="Add Note description..."
                    onChange={hanldeOnchange}
                  ></textarea>
                </div>
                <div>
                  <label
                    htmlhtmlfor="tag"
                    className="block mb-2 text-base font-medium text-gray-900 "
                  >
                    Note Tag
                  </label>
                  <input
                    type="text"
                    value={note.tag}
                    id="tag"
                    name="tag"
                    className="block p-2.5 w-full text-sm text-gray-900 rounded-md  shadow-md bg-gray-100 dark:border-gray-600 outline-gray-600"
                    placeholder="Add Note tag..."
                    onChange={hanldeOnchange}
                    maxLength="12"
                  />
                </div>
              </div>
              <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                <button
                  type="button"
                  className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight  rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1"
                  onClick={() => toggleDisplay("false")}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1 ${
                    note.title.length < 5 || note.description.length < 5
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  onClick={() => {
                    toggleDisplay("false");
                  }}
                  disabled={
                    note.title.length < 5 || note.description.length < 5
                      ? true
                      : false
                  }
                >
                  Save Note
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default AddNote;
