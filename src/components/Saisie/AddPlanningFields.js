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
import { format, addDays, getISOWeek, startOfWeek } from "date-fns";

//==== Gestion de date , semaine et jours ======

//Calcule à partir de la date actuelle de la semaine actuelle et de la semaine prochaine
const currentDate = new Date();
const currentWeekNumber = getISOWeek(currentDate);
const nextWeekNumber = currentWeekNumber + 1;
const currentYear = format(currentDate, "yyyy");
const nextWeekYear = currentWeekNumber === 52 ? currentYear + 1 : currentYear;

const jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"];
const currentWeek = currentWeekNumber.toString().padStart(2, "0");
const nextWeek = nextWeekNumber.toString().padStart(2, "0");
const weekStartDate = startOfWeek(currentDate, { weekStartsOn: 1 });

const choixSemaine = ["Semaine Actuelle", "Semaine Pro"];

function AddPlanningFields({
  setOpenModal,
  operatorsList,
  handlePlanningList,
  values,
}) {
  const [stationList, setStationList] = useState([]);
  React.useEffect(() => {
    axios.get(`http://127.0.0.1:8000/setting/station`).then((response) => {
      const stationIds = response.data.map((item) => item.id_station);
      setStationList(stationIds);
    });
  }, []);

  const [selectedOperateur, setSelectedOperateur] = useState("");
  const [selectedStationItem, setSelectedStationItem] = useState("");
  const [selectedSemaineItem, setSelectedSemaineItem] = useState("");
  const [selectedJours, setSelectedJours] = useState([]);

  const handleOperateurChange = (event) => {
    setSelectedOperateur(event.target.value);
  };

  const handleStationChange = (event) => {
    setSelectedStationItem(event.target.value);
  };

  const handleSemaineChange = (event) => {
    setSelectedSemaineItem(event.target.value);
  };

  //Getsion Selection jours checkbox
  const handleCheckboxChange = (jour) => (event) => {
    if (event.target.checked) {
      setSelectedJours([...selectedJours, jour]);
    } else {
      setSelectedJours(
        selectedJours.filter((selectedJour) => selectedJour !== jour)
      );
    }
  };

  /*
   Fonction qui prends les entrées du formulaire pour le rajouter au planning
   op -> operateur
   st  -> la station
   jr -> tableau de**contenant les jours où va travailler l'opérateur
   */
  const handleValidation = (op, st, jr) => {
    const newPlanningList = jr.map((jour) => ({
      personne: op,
      shift: values.shift,
      tl: values.tl,
      station: st,
      jour: jour,
      date: format(addDays(weekStartDate, jours.indexOf(jour)), "dd-MM-yyyy"),
      semaine: `${currentYear}-${currentWeek}`,
      SST: 0,
      leader5S: 0,
      tut: 0,
    }));

    // Appeler la fonction de mise à jour du composant parent avec le nouveau tableau
    console.log(newPlanningList);
    handlePlanningList(newPlanningList);

    // Vous pouvez faire ce que vous voulez avec le tableau `newPlanningList`
  };

  const handleValidationNextWeek = (op, st, jr) => {
    const newPlanningList = jr.map((jour) => {
      // Récupérer l'index du jour sélectionné dans la liste 'jours'
      const selectedDayIndex = jours.indexOf(jour);

      // Ajouter 7 jours pour obtenir la date de la semaine prochaine
      const nextWeekDate = addDays(weekStartDate, selectedDayIndex + 7);

      return {
        personne: op,
        shift: values.shift,
        tl: values.tl,
        station: st,
        jour: jour,
        date: format(nextWeekDate, "dd-MM-yyyy"),
        semaine: `${nextWeekYear}-${nextWeek}`,
        SST: 0,
        leader5S: 0,
        tut: 0,
      };
    });

    // Appeler la fonction de mise à jour du composant parent avec le nouveau tableau
    console.log(newPlanningList);
    handlePlanningList(newPlanningList);

    // Vous pouvez faire ce que vous voulez avec le tableau `newPlanningList`
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
                {/* FORMULAIRE CHOIX DE L'OPERATEUR */}
                <FormControl variant="outlined">
                  <InputLabel>Opérateur</InputLabel>
                  <MuiSelect
                    value={selectedOperateur}
                    onChange={handleOperateurChange}
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

                {/* FORMULAIRE CHOIX STATION */}
                <FormControl variant="outlined">
                  <InputLabel>Station</InputLabel>
                  <MuiSelect
                    value={selectedStationItem}
                    onChange={handleStationChange}
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

                {/* FORMULAIRE CHOIX SEMAINE */}
                <FormControl variant="outlined">
                  <InputLabel>Semaine</InputLabel>
                  <MuiSelect
                    value={selectedSemaineItem}
                    onChange={handleSemaineChange}
                    label="Station"
                    style={{ marginTop: "8px", marginBottom: "16px" }}
                  >
                    <MenuItem value="">
                      Sélectionner la semaine du planning
                    </MenuItem>
                    {choixSemaine.map((item) => (
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
          <button
            onClick={() => {
              if (selectedSemaineItem === "Semaine Actuelle") {
                handleValidation(
                  selectedOperateur,
                  selectedStationItem,
                  selectedJours
                );
              } else if (selectedSemaineItem === "Semaine Pro") {
                handleValidationNextWeek(
                  selectedOperateur,
                  selectedStationItem,
                  selectedJours
                );
              }

              setOpenModal(false);
            }}
          >
            Valider
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddPlanningFields;
