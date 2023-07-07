import { React, useState } from "react";
import "../styles/AddOperator.css";
import CloseWindow from "./CloseWindow";
import { Grid, TextField } from "@mui/material";
import Controls from "../components/controls/Controls";
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const typeItems = [
  { id: "tit", title: "Tit" },
  { id: "temp", title: "Temp" },
];
const statusItems = [
  { id: "active", title: "Actif" },
  { id: "offline", title: "Hors-ligne" },
];

const tableau = ["504TF", "506Fic", "402TD"];
const tab = ["SS", "FT", "HT"];

function AddOperator({ setOpenModal }) {
  const [selectedStationItem, setSelectedStationItem] = useState("");
  const handleStationChange = (event) => {
    setSelectedStationItem(event.target.value);
  };

  const [selectedSecteurItem, setSelectedSecteurItem] = useState("");

  const [selectedDateEntree, setSelectedDateEntree] = useState(null);
  const handleDateEntreeChange = (date) => {
    setSelectedDateEntree(date);
  };

  const [selectedDateFin, setSelectedDateFin] = useState(null);
  const handleDateFinChange = (date) => {
    setSelectedDateFin(date);
  };
  const handleSecteurChange = (event) => {
    setSelectedSecteurItem(event.target.value);
  };


  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <h3>Ajouter un opérateur</h3>
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
              <TextField variant="outlined" name="fullName" label="Nom" />
              <TextField variant="outlined" name="CardID" label="CardID" />
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
            <Grid item xs={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  inputVariant="outlined"
                  format="dd-MM-yyyy"
                  margin="normal"
                  id="date-entree-picker"
                  label="Saisir la date d'entrée"
                  value={selectedDateEntree}
                  onChange={handleDateEntreeChange}
                  KeyboardButtonProps={{
                    "aria-label": "Changer la date",
                  }}
                />
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  inputVariant="outlined"
                  format="dd-MM-yyyy"
                  margin="normal"
                  id="date-fin-picker"
                  label="Saisir la date de fin"
                  value={selectedDateFin}
                  onChange={handleDateFinChange}
                  KeyboardButtonProps={{
                    "aria-label": "Changer la date",
                  }}
                />
              </MuiPickersUtilsProvider>
              <Controls.RadioGroup
                name="type"
                label="Type"
                items={typeItems}
              />
              <Controls.RadioGroup
                name="status"
                label="Statut"
                items={statusItems}
              />
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

export default AddOperator;
