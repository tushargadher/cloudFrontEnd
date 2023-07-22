import React from "react";

import AddNote from "./AddNote";
import ViewNote from "./ViewNote";
const Home = (props) => {
  document.title = "CloudNotes - Your Notes At Cloud";
  return (
    <>
      <div className="box-border bg-slate-200 h-screen min-w-screen w-auto ">
        <div className="h-auto flex bg-slate-200 flex-col">
          <div className="w-screen h-[6vh] md:h-[15vh]">
            <AddNote showAlert={props.showAlert} />
          </div>
          {/* <div className="text-xl font-medium px-6">Saved Notes </div> */}

          <div
            className=" box-border w-screen md:w-4/5 h-auto m-auto "
            // style={{ width: "90vw" }}
          >
            <ViewNote showAlert={props.showAlert} />
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
