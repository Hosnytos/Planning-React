import { React, useState } from "react";
import "../../styles/AddPlanningFields.css";
import CloseWindow from "../CloseWindow";
import { Grid } from "@mui/material";
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
} from "@material-ui/core";

const tableau = ["504TF", "506Fic", "402TD"];
const tab = ["SS", "FT", "HT"];

function AddPlanningFields({ setOpenModal }) {
  const [selectedStationItem, setSelectedStationItem] = useState("");
  const handleStationChange = (event) => {
    setSelectedStationItem(event.target.value);
  };

  const [selectedSecteurItem, setSelectedSecteurItem] = useState("");

  const handleSecteurChange = (event) => {
    setSelectedSecteurItem(event.target.value);
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <h3>Ajouter un opérateur au planning</h3>
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            <CloseWindow />
          </button>
        </div>
        <hr className="add-operator-search-hr" />

        <form>
          <Grid container className="operator-grid-container">
            <Grid item xs={6}>
              <div>
                <FormControl variant="outlined">
                  <InputLabel>Station</InputLabel>
                  <MuiSelect
                    value={selectedStationItem}
                    onChange={handleStationChange}
                    label="Station"
                  >
                    <MenuItem value="">Sélectionner un élément</MenuItem>
                    {tableau.map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </MuiSelect>
                </FormControl>
                <FormControl variant="outlined">
                  <InputLabel>Secteur</InputLabel>
                  <MuiSelect
                    value={selectedSecteurItem}
                    onChange={handleSecteurChange}
                    label="Secteur"
                  >
                    <MenuItem value="">Sélectionner un élément</MenuItem>
                    {tab.map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </MuiSelect>
                </FormControl>
              </div>
            </Grid>
          </Grid>
        </form>

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

export default AddPlanningFields;
