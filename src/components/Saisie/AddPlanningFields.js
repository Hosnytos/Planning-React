import React, { useState } from "react";
import "../../styles/AddPlanningFields.css";
import CloseWindow from "../CloseWindow";
import { Checkbox, FormControlLabel, Grid } from "@mui/material";
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
} from "@material-ui/core";
import axios from "axios";

const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];
//const tableau = ["504TF", "506Fic", "402TD"];
//const tab = ["SS", "FT", "HT"];

function AddPlanningFields({ setOpenModal, operatorsList }) {
  const [stationList, setStationList] = useState([]);
  React.useEffect(() => {
    axios.get(`http://127.0.0.1:8000/setting/station`).then((response) => {
      const stationIds = response.data.map((item) => item.id_station);
      setStationList(stationIds);
    });
  }, []);

  const [selectedStationItem, setSelectedStationItem] = useState("");
  const handleStationChange = (event) => {
    setSelectedStationItem(event.target.value);
  };

  //Getsion Selection checkbox
  const [selectedJours, setSelectedJours] = useState([]);

  const handleCheckboxChange = (jour) => (event) => {
    if (event.target.checked) {
      setSelectedJours([...selectedJours, jour]);
    } else {
      setSelectedJours(
        selectedJours.filter((selectedJour) => selectedJour !== jour)
      );
    }
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
          <Grid containe className="operator-grid-container">
            <Grid item xs={6}>
              <div className="add-operator-div-dropdown">
                <FormControl variant="outlined">
                  <InputLabel>Opérateur</InputLabel>
                  <MuiSelect
                    value={selectedStationItem}
                    onChange={handleStationChange}
                    label="Station"
                    style={{ marginTop: "8px", marginBottom: "16px" }}
                  >
                    <MenuItem value="">Sélectionner un élément</MenuItem>
                    {operatorsList.map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </MuiSelect>
                </FormControl>
                <FormControl variant="outlined">
                  <InputLabel>Station</InputLabel>
                  <MuiSelect
                    //value={selectedShiftItem}
                    //onChange={handleShiftChange}
                    label="Station"
                    style={{ marginTop: "8px", marginBottom: "16px" }}
                  >
                    <MenuItem value="">Sélectionner la station</MenuItem>
                    {stationList.map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </MuiSelect>
                </FormControl>

                <div style={{ display: "flex", justifyContent: "center" }}>
                  {jours.map((jour) => (
                    <FormControl variant="outlined" key={jour}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedJours.includes(jour)}
                            onChange={handleCheckboxChange(jour)}
                          />
                        }
                        label={jour}
                        style={{ marginTop: "8px", marginBottom: "16px" }}
                      />
                    </FormControl>
                  ))}
                </div>
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
