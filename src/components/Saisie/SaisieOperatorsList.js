import React, { useState } from "react";
import "../../styles/SaisieOperatorsList.css";
import colors from "../../styles/colors";
import DataTable from "react-data-table-component";
import { FaSearch, FaUserCheck, FaUserTimes } from "react-icons/fa";
import axios from "axios";

function SaiseOperatorsList({ handleNewOperators }) {
  const baseURL = "http://127.0.0.1:8000/setting/operateur";
  const [operators, setOperators] = useState([]);
  const [operatorSearch, setOperatorSearch] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

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
      wrap: true,
    },
    {
      name: "Shift",
      selector: (row) => row.id_shift,
      sortable: true,
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

  function handleShitSearch(event) {
    const newOperator = operators.filter((row) => {
      return row.id_shift
        .toString()
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });

    setOperatorSearch(newOperator);
  }

  function handleOperatorSearch(event) {
    const newOperator = operators.filter((row) => {
      return row.name_operateur
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });

    setOperatorSearch(newOperator);
  }

  function handleSelectedRowsChange(rows) {
    setSelectedRows(rows.selectedRows);
    const newOperators = rows.selectedRows.map((row) => row.name_operateur);
    handleNewOperators(newOperators);
  }

  return (
    <div className="main-operator-saisie">
      <div>
        <div className="operator-search-bar-saisie">
          <div className="input-wrapper">
            <FaSearch id="search-icon" />
            <input
              type="text"
              placeholder="Recherche..."
              onChange={handleOperatorSearch}
            />
          </div>
        </div>
        <hr className="operator-search-hr-saisie" />
        <div>
          <DataTable
            className="data-table-container"
            columns={column}
            data={operatorSearch}
            selectableRows={true}
            onSelectedRowsChange={handleSelectedRowsChange}
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
    </div>
  );
}

export default SaiseOperatorsList;
