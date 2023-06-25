import React from "react";
import "../styles/AddOperator.css";
import CloseWindow from "./CloseWindow";

function AddOperator({ setOpenModal }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            <CloseWindow/>
          </button>
        </div>

        <form></form>

        <div className="footer">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Annuler
          </button>
          <button>Valider</button>
        </div>
      </div>
    </div>
  );
}

export default AddOperator;
