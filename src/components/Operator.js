import React, { useState } from "react";
import "../styles/Operator.css";
import colors from "../styles/colors";
import DataTable from "react-data-table-component";
import { FaSearch, FaUserCheck, FaUserTimes } from "react-icons/fa";
import { BiPlus } from "react-icons/bi";
import { MdModeEdit, MdDelete } from "react-icons/md";
import AddOperator from "./AddOperator";
import axios from "axios";

function Operator() {
  const [addOperator, setAddOperator] = useState(false);

  const baseURL = "http://127.0.0.1:8000/setting/operateur";
  const [operators, setOperators] = useState([]);
  const [operatorSearch, setOperatorSearch] = useState([]);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setOperators(response.data);
      setOperatorSearch(response.data);
    });
  }, []);
  const column = [
    {
      name: "Nom",
      selector: (row) => row.name_operateur,
      sortable: true,
    },
    {
      name: "CardID",
      selector: (row) => row.id_card,
    },
    {
      name: "Station",
      selector: (row) => row.home_station,
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.isTemp ? (
        <p>Temp</p>
      ) : (
        <p >Not temp</p>
      ),
      sortable: true,
    },
    {
      name: "Secteur",
      selector: (row) => row.id_shift,
      sortable: true,
    },
    {
      name: "Date entrée",
      selector: (row) => row.start_date,
    },
    {
      name: "Date fin",
      selector: (row) => row.end_date,
    },
    {
      name: "Statut",
      selector: (row) =>
        row.active_status ? (
          <FaUserCheck className="status-icon-active" />
        ) : (
          <FaUserTimes className="status-icon-inactive" />
        ),
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <button
            className="btn-edit-operator"
            onClick={() => {
              setAddOperator(true);
            }}
          >
            <MdModeEdit />
          </button>
          <button
            className="btn-delete-operator"
            onClick={() => alert("Voulez vous supprimer ?")}
          >
            <MdDelete />
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

  function handleOperatorSearch(event) {
    const newOperator = operators.filter((row) => {
      return row.name_operateur
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });

    setOperatorSearch(newOperator);
  }

  return (
    <div className="main-operator">
      <div>
        <div className="operator-search-bar">
          <div className="input-wrapper">
            <FaSearch id="search-icon" />
            <input
              type="text"
              placeholder="Recherche..."
              onChange={handleOperatorSearch}
            />
          </div>
          <button
            className="button-add-operator"
            onClick={() => {
              setAddOperator(true);
            }}
          >
            <BiPlus />
          </button>
        </div>
        <hr className="operator-search-hr" />
        <div>
          <DataTable
            className="data-table-container"
            columns={column}
            data={operatorSearch}
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
      </div>
      {addOperator && <AddOperator setOpenModal={setAddOperator} />}
    </div>
  );
}

export default Operator;
