import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import colors from "../../styles/colors";
import axios from "axios";
import { BiPlus } from "react-icons/bi";
import AddPlanningFields from "./AddPlanningFields";
import "../../styles/FormSaisiePlanning.css";

const FormSaisiePlanning = ({ nextStep, prevStep, values }) => {
  const [addPlanningFields, setAddPlanningFields] = useState(false);
  const [operators, setOperators] = useState([]);
  //const baseURL = "http://127.0.0.1:8000/setting/operateur";
  //const [operatorSearch, setOperatorSearch] = useState([]);

  useEffect(() => {
    setOperators(values.operators);
  }, [values.operators]);

  // Column of datatable entries
  const column = [
    {
      name: "5S",
      selector: (row) => row.id_shift,
      sortable: true,
      wrap: true,
    },
    {
      name: "SST",
      selector: (row) => row.id_shift,
      sortable: true,
      wrap: true,
    },
    {
      name: "Tuteur",
      selector: (row) => row.id_shift,
      sortable: true,
      wrap: true,
    },
    {
      name: "Equipe",
      selector: (row) => row.id_shift,
      sortable: true,
    },
    {
      name: "TL",
      selector: (row) => row.name_operateur,
      sortable: true,
      wrap: true,
    },
    {
      name: "Date",
      selector: (row) => row.name_operateur,
      sortable: true,
      wrap: true,
    },
    {
      name: "Semaine",
      selector: (row) => row.name_operateur,
      sortable: true,
      wrap: true,
    },
    {
      name: "Jour",
      selector: (row) => row.name_operateur,
      sortable: true,
      wrap: true,
    },
    {
      name: "Station",
      selector: (row) => row.name_operateur,
      sortable: true,
      wrap: true,
    },
    {
      name: "Opérateurs",
      selector: (row) => row,
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

  const handleValidate = (e) => {
    e.preventDefault();
    // Ajouter le code de validation ici
  };

  return (
    <div className="main-planningForm">
      <div>
        <h3>Saisie du Planning</h3>

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
            data={operators}
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
            Annuler
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
          />
        )}
      </div>
    </div>
  );
};

export default FormSaisiePlanning;
