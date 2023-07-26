import axios from "axios";
import React, { useState } from "react";
import "../styles/Competences.css";
import colors from "../styles/colors";
import DataTable from "react-data-table-component";
import { FaSearch } from "react-icons/fa";

const ope_skills = [
  {
    name_operateur: "Alice Smith",
    Co_Az: 1,
    SIM_Leader: 3,
    Leader_5S: 0,
    SST: 4,
  },
  {
    name_operateur: "Bob Johnson",
    Co_Az: 2,
    SIM_Leader: 1,
    Leader_5S: 2,
    SST: 3,
  },
  {
    name_operateur: "Charlie Brown",
    Co_Az: 4,
    SIM_Leader: 0,
    Leader_5S: 4,
    SST: 1,
  },
  {
    name_operateur: "David Lee",
    Co_Az: 3,
    SIM_Leader: 2,
    Leader_5S: 3,
    SST: 0,
  },
  {
    name_operateur: "Emma Taylor",
    Co_Az: 1,
    SIM_Leader: 3,
    Leader_5S: 1,
    SST: 4,
  },
  {
    name_operateur: "Frank Martin",
    Co_Az: 0,
    SIM_Leader: 4,
    Leader_5S: 2,
    SST: 1,
  },
  {
    name_operateur: "Grace Wilson",
    Co_Az: 2,
    SIM_Leader: 1,
    Leader_5S: 3,
    SST: 4,
  },
  {
    name_operateur: "Henry Anderson",
    Co_Az: 3,
    SIM_Leader: 0,
    Leader_5S: 4,
    SST: 2,
  },
  {
    name_operateur: "Isabella Martinez",
    Co_Az: 1,
    SIM_Leader: 2,
    Leader_5S: 1,
    SST: 3,
  },
  {
    name_operateur: "Jack Robinson",
    Co_Az: 4,
    SIM_Leader: 3,
    Leader_5S: 0,
    SST: 2,
  },
];

const column = [
  {
    name: "Nom",
    selector: (row) => row.name_operateur,
    sortable: true,
    wrap: true,
  },
  {
    name: "Co_Az",
    selector: (row) => row.Co_Az,
  },
  {
    name: "SIM_Leader",
    selector: (row) => row.SIM_Leader,
  },
  {
    name: "5S_Leader",
    selector: (row) => row.Leader_5S,
  },
  {
    name: "SST",
    selector: (row) => row.SST,
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



function Competence() {
  const [operatorSearch, setOperatorSearch] = useState([]);
  

  React.useEffect(() => {
    setOperatorSearch(ope_skills);
  }, []);


  function handleOperatorSearch(event) {
    const newOperator = ope_skills.filter((row) => {
      return row.name_operateur
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });

    setOperatorSearch(newOperator);
  }

  return (
    <div className="main-skill">
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
    </div>
  );
}

export default Competence;
