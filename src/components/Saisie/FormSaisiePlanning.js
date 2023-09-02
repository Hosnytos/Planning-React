import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import colors from "../../styles/colors";
//import axios from "axios";
import { BiPlus } from "react-icons/bi";
import AddPlanningFields from "./AddPlanningFields";
import "../../styles/FormSaisiePlanning.css";

const FormSaisiePlanning = ({ nextStep, prevStep, values, handlePlanning }) => {
  const [addPlanningFields, setAddPlanningFields] = useState(false);
  const [operators, setOperators] = useState([]);
  const [planningList, setPlanningList] = useState([]);

  //const baseURL = "http://127.0.0.1:8000/setting/operateur";
  //const [operatorSearch, setOperatorSearch] = useState([]);

  useEffect(() => {
    setOperators(values.operators);
  }, [values.operators]);

  useEffect(() => {
    setPlanningList(JSON.parse(localStorage.getItem("planningList")) || []);
  }, []);

  // Column of datatable entries
  const column = [
    {
      name: "5S",
      selector: (row) => row.leader5S,
      sortable: true,
      wrap: true,
    },
    {
      name: "SST",
      selector: (row) => row.SST,
      sortable: true,
      wrap: true,
    },
    {
      name: "Niv",
      selector: (row) => row.tut,
      sortable: true,
      wrap: true,
    },
    {
      name: "Equipe",
      selector: (row) => row.shift,
      sortable: true,
    },
    {
      name: "TL",
      selector: (row) => row.tl,
      sortable: true,
      wrap: true,
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
      wrap: true,
    },
    {
      name: "Semaine",
      selector: (row) => row.semaine,
      sortable: true,
      wrap: true,
    },
    {
      name: "Jour",
      selector: (row) => row.jour,
      sortable: true,
      wrap: true,
    },
    {
      name: "Station",
      selector: (row) => row.station,
      sortable: true,
      wrap: true,
    },
    {
      name: "Operateurs",
      selector: (row) => row.personne,
      sortable: true,
      wrap: true,
    },
  ];

  const customStyles = {
    table: {
      style: {
        borderRadius: "15px 15px 0 0",
        zIndex: 0,
      },
    },
    headRow: {
      style: {
        backgroundColor: "#3dcd58",
        textTransform: "uppercase",
        borderRadius: "15px 15px 0 0",
        fontWeight: "bold",
        color: colors.white,
      },
    },
    headCells: {
      style: {
        justifyContent: "center",
      },
    },
    cells: {
      style: {
        justifyContent: "center",
      },
    },
    pagination: {
      style: {
        borderRadius: "0 0 15px 15px",
      },
    },
  };

  const handleBack = (e) => {
    e.preventDefault();
    prevStep();
  };

  /*const handleValidate = (e) => {
    e.preventDefault();
    // On vide le tableau
    setPlanningList([]);
    localStorage.removeItem("planningList");
  };*/

  const handleValidate = (e) => {
    e.preventDefault();

    // Créez un objet pour stocker les jours et vérifiez s'il y a au moins une entrée SST = 1 pour chaque jour
    const daysWithSST = {};
    const invalidDays = [];
    const missingTut3 = [];

    planningList.forEach((entry) => {
      const { date, SST, station, tut } = entry;

      // Vérifiez si le jour existe dans l'objet, sinon initialisez-le avec false
      if (!daysWithSST[date]) {
        daysWithSST[date] = false;
      }

      // Si SST = 1, définissez le jour correspondant sur true
      if (SST === 1) {
        daysWithSST[date] = true;
      }

      // Vérifiez si tut = 1, s'il y a un tut = 3 pour la même date et la même station
      if (tut === 1) {
        const hasTut3 = planningList.some(
          (item) =>
            item.date === date && item.station === station && item.tut === 3
        );
        if (!hasTut3) {
          missingTut3.push({ date, station });
        }
      }
    });

    // Vérifiez s'il y a au moins une entrée avec SST = 1 pour chaque jour
    Object.keys(daysWithSST).forEach((date) => {
      if (!daysWithSST[date]) {
        invalidDays.push(date);
      }
    });

    if (invalidDays.length === 0) {
      if (missingTut3.length === 0) {
        // Tous les jours ont au moins une entrée SST = 1, et la vérification Tut1 et Tut3 est également réussie.
        // Vous pouvez procéder à la suppression du tableau ou effectuer d'autres actions nécessaires ici
        setPlanningList([]);
        localStorage.removeItem("planningList");
      } else {
        // Affichez un message d'erreur pour les dates et les stations manquantes de Tut3
        const errorMessage = `Il doit y avoir un Tut 3 pour les dates et les stations suivantes : ${missingTut3
          .map((item) => `\nDate : ${item.date} | Station : ${item.station}`)
          .join(", ")}`;
        alert(errorMessage);
      }
    } else {
      // Affichez un message d'erreur avec les jours concernés pour SST = 1
      const errorMessage = `Il doit y avoir au moins un SST pour chaque jour. Non présent le ${invalidDays.join(
        ", "
      )}`;
      alert(errorMessage);
    }
  };

  const handlePlanningList = (newPL) => {
    setPlanningList((prevList) => [...prevList, ...newPL]);
    // Sauvegarder les données dans le localStorage
    const storedPlanningList =
      JSON.parse(localStorage.getItem("planningList")) || [];
    const updatedPlanningList = [...storedPlanningList, ...newPL];
    localStorage.setItem("planningList", JSON.stringify(updatedPlanningList));
  };

  return (
    <div className="main-planningForm">
      <div>
        <div className="add-pl-section">
          <button
            className="button-add-planning"
            onClick={() => {
              setAddPlanningFields(true);
            }}
          >
            <BiPlus />
          </button>
        </div>

        <div>
          <DataTable
            className="data-table-container-pl"
            columns={column}
            data={planningList}
            responsive={true}
            responsiveSm={true}
            responsiveMd={true}
            responsiveLg={true}
            responsiveXl={true}
            pagination
            fixedHeader
            fixedHeaderScrollHeight="440px"
            highlightOnHover
            pointerOnHover
            customStyles={customStyles}
            noDataComponent="Aucune information trouvée"
          ></DataTable>
        </div>

        <div className="btn-pl-main">
          <Button color="secondary" variant="contained" onClick={handleBack}>
            Retour
          </Button>

          <Button color="primary" variant="contained" onClick={handleValidate}>
            Valider
          </Button>
        </div>
      </div>
      <div className="add-planning-modal">
        {addPlanningFields && (
          <AddPlanningFields
            setOpenModal={setAddPlanningFields}
            operatorsList={operators}
            values={values}
            handlePlanningList={handlePlanningList}
          />
        )}
      </div>
    </div>
  );
};

export default FormSaisiePlanning;
