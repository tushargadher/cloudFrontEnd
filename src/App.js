import Navabar from "../src/Components/Navbar";
import Home from "../src/Components/Home";
import About from "./Components/About";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Features from "./Components/Features";
import NoteState from './context/notes/NoteState';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
 
  return (
    <>
      <NoteState>{/*here we wrap all component in NoteState so that all comopnet can use the state of NoteState*/}
        <Router>
          <Navabar />

              <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/features" element={<Features />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/signup" element={<SignUp/>} />

          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
