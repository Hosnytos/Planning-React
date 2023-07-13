import React, { useState } from "react";
import "../styles/EditOperator.css";
import CloseWindow from "./CloseWindow";
import { Grid, TextField } from "@mui/material";
import Controls from "./controls/Controls";
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
import axios from "axios";

const typeItems = [
  { id: "tit", title: "Tit" },
  { id: "temp", title: "Temp" },
];
const statusItems = [
  { id: "active", title: "Actif" },
  { id: "offline", title: "Hors-ligne" },
];

function EditOperator({ setOpenModal, EditOperator }) {
  const [operator, setOperator] = useState(null);
  const [shiftList, setShiftList] = useState([]);
  const [stationList, setStationList] = useState([]);
  const [selectedStationItem, setSelectedStationItem] = useState("");

  const [selectedShiftItem, setSelectedShiftItem] = useState(
    EditOperator.id_shift
  );

  const [selectedDateEntree, setSelectedDateEntree] = useState(
    EditOperator.start_date
  );
  const handleDateEntreeChange = (date) => {
    setSelectedDateEntree(date);
  };

  const [selectedDateFin, setSelectedDateFin] = useState(EditOperator.end_date);
  const handleDateFinChange = (date) => {
    setSelectedDateFin(date);
  };
  const handleShiftChange = (event) => {
    setSelectedShiftItem(event.target.value);
  };
  const handleStationChange = (event) => {
    setSelectedStationItem(event.target.value);
  };

  React.useEffect(() => {
    axios
      .get(
        `http://127.0.0.1:8000/setting/operateur/${EditOperator.id_operateur}`
      )
      .then((response) => {
        setOperator(response.data);
      });
  }, [EditOperator.id_operateur]);

  React.useEffect(() => {
    axios.get(`http://127.0.0.1:8000/setting/shift`).then((response) => {
      const shiftIds = response.data.map((item) => item.id_shift);
      setShiftList(shiftIds);
    });
  }, []);

  React.useEffect(() => {
    axios.get(`http://127.0.0.1:8000/setting/station`).then((response) => {
      const stationIds = response.data.map((item) => item.id_station);
      setStationList(stationIds);
    });
  }, []);

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <h3>Modifier un opérateur</h3>
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            <CloseWindow />
          </button>
        </div>
        <hr className="edit-operator-search-hr" />

        <form>
          <Grid container className="operator-grid-container">
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                name="fullName"
                label="Nom"
                value={operator?.name_operateur || ""}
              />
              <TextField
                variant="outlined"
                name="CardID"
                label="CardID"
                value={operator?.id_card || ""}
              />
              <div>
                <FormControl variant="outlined">
                  <InputLabel>Station</InputLabel>
                  <MuiSelect
                    value={selectedStationItem}
                    onChange={handleStationChange}
                    label="Station"
                  >
                    <MenuItem value={operator?.id_station}>Sélectionner une station</MenuItem>
                    {stationList.map((item) => (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    ))}
                  </MuiSelect>
                </FormControl>
                <FormControl variant="outlined">
                  <InputLabel>Shift</InputLabel>
                  <MuiSelect
                    value={selectedShiftItem}
                    onChange={handleShiftChange}
                    label="Shift"
                  >
                    <MenuItem value={operator?.id_shift}>Sélectionner un shift</MenuItem>
                    {shiftList.map((item) => (
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
                  format="yyyy-MM-dd"
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
                  format="yyyy-MM-dd"
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
              <Controls.RadioGroup name="type" label="Type" items={typeItems} />
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

export default EditOperator;
