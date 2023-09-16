import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import colors from "../../styles/colors";
import axios from "axios";
import { BiPlus } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import AddPlanningFields from "./AddPlanningFields";
import "../../styles/FormSaisiePlanning.css";

const FormSaisiePlanning = ({ nextStep, prevStep, values, handlePlanning }) => {
  const [addPlanningFields, setAddPlanningFields] = useState(false);
  const [operators, setOperators] = useState([]);
  const [planningList, setPlanningList] = useState([]);
  const [stations, setStations] = useState([]);
  const [operatorInfos, setOperatorInfos] = useState([]);
  const [operatorSkills, setOperatorSkills] = useState([]);

  const operatorURL = "http://127.0.0.1:8000/setting/operateur";
  //const [operatorSearch, setOperatorSearch] = useState([]);
  const stationURL = "http://127.0.0.1:8000/setting/station";
  const competenceURL = "http://127.0.0.1:8000/setting/competence";

  useEffect(() => {
    setOperators(values.operators);
  }, [values.operators]);

  useEffect(() => {
    setPlanningList(JSON.parse(localStorage.getItem("planningList")) || []);
  }, []);

  React.useEffect(() => {
    axios.get(operatorURL).then((response) => {
      setOperatorInfos(response.data);
    });
  }, []);

  React.useEffect(() => {
    axios.get(stationURL).then((response) => {
      setStations(response.data);
    });
  }, []);

  React.useEffect(() => {
    axios.get(competenceURL).then((response) => {
      const filteredOperatorSkills = response.data.filter((item) => {
        const id_station = item.id_station;
        const id_operateur = item.id_operateur;

        // Vous pouvez utiliser la méthode find pour vérifier si id_station et id_operateur existent dans planningList
        return (
          planningList.find(
            (planningItem) => planningItem.station === id_station
          ) &&
          planningList.find(
            (planningItem) => planningItem.personne === id_operateur
          )
        );
      });
      setOperatorSkills(filteredOperatorSkills);
    });
  }, [planningList]);

  // Créez un objet pour stocker les compétences uniques avec l'ID le plus élevé
  const uniqueSkills = {};

  // Parcourez la liste des compétences
  for (const skill of operatorSkills) {
    const key = `${skill.id_operateur}-${skill.id_station}`;

    // Vérifiez si cette combinaison de nom et de station existe déjà et si l'ID actuel est plus élevé
    if (!uniqueSkills[key] || skill.id > uniqueSkills[key].id) {
      uniqueSkills[key] = skill;
    }
  }

  // Convertissez l'objet en une liste d'éléments uniques
  const uniqueSkillList = Object.values(uniqueSkills);

  // Créez un objet pour stocker les correspondances entre les stations et les opérateurs
  const operatorStationMap = {};
  const operatorInfosMap = {};
  const operatorSkillsMap = {};

  // Parcourez le tableau des stations et créez une correspondance avec les opérateurs
  stations.forEach((station) => {
    operatorStationMap[station.id_station] = station.name_station;
  });

  operatorInfos.forEach((operatorInfo) => {
    operatorInfosMap[operatorInfo.id_operateur] = operatorInfo.name_operateur;
  });

  uniqueSkillList.forEach((uniqueSkill) => {
    operatorSkillsMap[uniqueSkill.id_operateur] = uniqueSkill.level_competence;
  });

  // Maintenant, ajoutez le nom de la station correspondante à chaque opérateur
  for (const key in planningList) {
    if (planningList.hasOwnProperty(key)) {
      const planning = planningList[key];

      const id_station = planning.station;
      const id_operateur = planning.personne;
      planning.name_station = operatorStationMap[id_station];
      planning.name_operateur = operatorInfosMap[id_operateur];
      planning.tut = operatorSkillsMap[id_operateur];
    }
  }

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
      selector: (row) => {
        if (row.shift === "1") {
          return <p>Equipe 1</p>;
        } else {
          return <p>Equipe 2</p>;
        }
      },
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
      selector: (row) => row.name_station,
      sortable: true,
      wrap: true,
    },
    {
      name: "Operateurs",
      selector: (row) => row.name_operateur,
      sortable: true,
      wrap: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <button
            className="btn-delete-operator"
            onClick={() => handleDeleteEntry(row)}
          >
            <RxCross2 />
          </button>
        </div>
      ),
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

  const handleDeleteEntry = (entryToDelete) => {
    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer cette entrée ?"
    );

    if (confirmed) {
      // Supprimez l'entrée du tableau
      const updatedPlanningList = planningList.filter(
        (entry) => entry !== entryToDelete
      );

      // Mettez à jour le state avec le nouveau tableau
      setPlanningList(updatedPlanningList);

      // Mettez à jour le localStorage
      localStorage.setItem("planningList", JSON.stringify(updatedPlanningList));
    }
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
