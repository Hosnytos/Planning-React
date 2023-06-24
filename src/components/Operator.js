import React, { useState } from "react";
import "../styles/Operator.css";
import DataTable from "react-data-table-component";

function Operator() {
  const operators = [
    {
      idOperateur: 1,
      nomOperateur: "John Doe",
      idCar: "CAR123",
      homeLocation: "506Fic",
      type: "tit",
      secteur: "HT",
      isTeamLeader: 0,
      startDate: "2022-01-01",
      endDate: "2022-12-31",
      activeStatus: 0,
    },
    {
      idOperateur: 2,
      nomOperateur: "Jane Smith",
      idCar: "CAR456",
      homeLocation: "514DEP",
      type: "temp",
      secteur: "Préhenseur",
      isTeamLeader: 1,
      startDate: "2022-03-15",
      endDate: "2022-09-30",
      activeStatus: 1,
    },
    {
      idOperateur: 3,
      nomOperateur: "Robert Johnson",
      idCar: "CAR789",
      homeLocation: "512ABC",
      type: "tit",
      secteur: "Collecteur",
      isTeamLeader: 0,
      startDate: "2022-02-01",
      endDate: "2022-12-31",
      activeStatus: 1,
    },
    {
      idOperateur: 4,
      nomOperateur: "Alice Brown",
      idCar: "CAR246",
      homeLocation: "507GHI",
      type: "temp",
      secteur: "Préhenseur",
      isTeamLeader: 0,
      startDate: "2022-04-10",
      endDate: "2022-11-30",
      activeStatus: 1,
    },
    {
      idOperateur: 5,
      nomOperateur: "Michael Wilson",
      idCar: "CAR135",
      homeLocation: "515JKL",
      type: "tit",
      secteur: "HT",
      isTeamLeader: 1,
      startDate: "2022-01-15",
      endDate: "2022-12-31",
      activeStatus: 1,
    },
    {
      idOperateur: 6,
      nomOperateur: "Emily Davis",
      idCar: "CAR789",
      homeLocation: "511MNO",
      type: "temp",
      secteur: "Collecteur",
      isTeamLeader: 0,
      startDate: "2022-05-01",
      endDate: "2022-09-30",
      activeStatus: 1,
    },
    {
      idOperateur: 7,
      nomOperateur: "William Wilson",
      idCar: "CAR357",
      homeLocation: "516PQR",
      type: "tit",
      secteur: "Préhenseur",
      isTeamLeader: 0,
      startDate: "2022-03-01",
      endDate: "2022-12-31",
      activeStatus: 1,
    },
    {
      idOperateur: 8,
      nomOperateur: "Olivia Clark",
      idCar: "CAR468",
      homeLocation: "513STU",
      type: "temp",
      secteur: "Collecteur",
      isTeamLeader: 0,
      startDate: "2022-02-15",
      endDate: "2022-10-31",
      activeStatus: 1,
    },
    {
      idOperateur: 9,
      nomOperateur: "James Martinez",
      idCar: "CAR246",
      homeLocation: "507VWX",
      type: "tit",
      secteur: "HT",
      isTeamLeader: 0,
      startDate: "2022-04-01",
      endDate: "2022-12-31",
      activeStatus: 1,
    },
    {
      idOperateur: 10,
      nomOperateur: "Sophia Adams",
      idCar: "CAR369",
      homeLocation: "516YZA",
      type: "temp",
      secteur: "Préhenseur",
      isTeamLeader: 1,
      startDate: "2022-03-15",
      endDate: "2022-09-30",
      activeStatus: 1,
    },
    {
      idOperateur: 11,
      nomOperateur: "Jacob Thomas",
      idCar: "CAR258",
      homeLocation: "510BCD",
      type: "tit",
      secteur: "Collecteur",
      isTeamLeader: 0,
      startDate: "2022-01-01",
      endDate: "2022-12-31",
      activeStatus: 1,
    },
    {
      idOperateur: 12,
      nomOperateur: "Isabella Turner",
      idCar: "CAR123",
      homeLocation: "506EFG",
      type: "temp",
      secteur: "HT",
      isTeamLeader: 0,
      startDate: "2022-05-10",
      endDate: "2022-11-30",
      activeStatus: 1,
    },
    {
      idOperateur: 13,
      nomOperateur: "Mason Wilson",
      idCar: "CAR456",
      homeLocation: "514HIJ",
      type: "tit",
      secteur: "Collecteur",
      isTeamLeader: 0,
      startDate: "2022-02-01",
      endDate: "2022-12-31",
      activeStatus: 1,
    },
    {
      idOperateur: 14,
      nomOperateur: "Emma Martin",
      idCar: "CAR789",
      homeLocation: "512KLM",
      type: "temp",
      secteur: "Préhenseur",
      isTeamLeader: 1,
      startDate: "2022-01-15",
      endDate: "2022-12-31",
      activeStatus: 1,
    },
    {
      idOperateur: 15,
      nomOperateur: "Daniel Roberts",
      idCar: "CAR246",
      homeLocation: "507NOP",
      type: "tit",
      secteur: "HT",
      isTeamLeader: 0,
      startDate: "2022-03-01",
      endDate: "2022-12-31",
      activeStatus: 1,
    },
    {
      idOperateur: 16,
      nomOperateur: "Olivia Thompson",
      idCar: "CAR369",
      homeLocation: "509QRS",
      type: "tit",
      secteur: "Collecteur",
      isTeamLeader: 0,
      startDate: "2022-02-15",
      endDate: "2022-10-31",
      activeStatus: 1,
    },
    {
      idOperateur: 17,
      nomOperateur: "Liam Harris",
      idCar: "CAR258",
      homeLocation: "511TUV",
      type: "temp",
      secteur: "Préhenseur",
      isTeamLeader: 1,
      startDate: "2022-04-01",
      endDate: "2022-12-31",
      activeStatus: 1,
    },
    {
      idOperateur: 18,
      nomOperateur: "Ava Clark",
      idCar: "CAR123",
      homeLocation: "513WXY",
      type: "tit",
      secteur: "Collecteur",
      isTeamLeader: 0,
      startDate: "2022-03-15",
      endDate: "2022-09-30",
      activeStatus: 1,
    },
    {
      idOperateur: 19,
      nomOperateur: "Noah Rodriguez",
      idCar: "CAR456",
      homeLocation: "508ZAB",
      type: "temp",
      secteur: "HT",
      isTeamLeader: 0,
      startDate: "2022-01-01",
      endDate: "2022-12-31",
      activeStatus: 1,
    },
    {
      idOperateur: 20,
      nomOperateur: "Charlotte Lee",
      idCar: "CAR789",
      homeLocation: "510BCD",
      type: "tit",
      secteur: "Collecteur",
      isTeamLeader: 0,
      startDate: "2022-05-10",
      endDate: "2022-11-30",
      activeStatus: 1,
    },
    {
      idOperateur: 21,
      nomOperateur: "William Young",
      idCar: "CAR246",
      homeLocation: "512EFG",
      type: "temp",
      secteur: "Préhenseur",
      isTeamLeader: 1,
      startDate: "2022-02-01",
      endDate: "2022-12-31",
      activeStatus: 1,
    },
    {
      idOperateur: 22,
      nomOperateur: "Mia Walker",
      idCar: "CAR369",
      homeLocation: "514HIJ",
      type: "tit",
      secteur: "HT",
      isTeamLeader: 0,
      startDate: "2022-01-15",
      endDate: "2022-12-31",
      activeStatus: 1,
    },
    {
      idOperateur: 23,
      nomOperateur: "Benjamin Lewis",
      idCar: "CAR258",
      homeLocation: "515KLM",
      type: "temp",
      secteur: "Collecteur",
      isTeamLeader: 0,
      startDate: "2022-03-01",
      endDate: "2022-10-31",
      activeStatus: 1,
    },
    {
      idOperateur: 24,
      nomOperateur: "Amelia Hall",
      idCar: "CAR123",
      homeLocation: "507NOP",
      type: "tit",
      secteur: "Préhenseur",
      isTeamLeader: 0,
      startDate: "2022-02-15",
      endDate: "2022-09-30",
      activeStatus: 1,
    },
    {
      idOperateur: 25,
      nomOperateur: "James King",
      idCar: "CAR456",
      homeLocation: "509QRS",
      type: "temp",
      secteur: "HT",
      isTeamLeader: 0,
      startDate: "2022-01-01",
      endDate: "2022-12-31",
      activeStatus: 1,
    },
    {
      idOperateur: 26,
      nomOperateur: "Sophia Turner",
      idCar: "CAR789",
      homeLocation: "511TUV",
      type: "tit",
      secteur: "Préhenseur",
      isTeamLeader: 0,
      startDate: "2022-05-10",
      endDate: "2022-11-30",
      activeStatus: 1,
    },
    {
      idOperateur: 27,
      nomOperateur: "Daniel Martin",
      idCar: "CAR246",
      homeLocation: "513WXY",
      type: "temp",
      secteur: "Collecteur",
      isTeamLeader: 1,
      startDate: "2022-04-01",
      endDate: "2022-12-31",
      activeStatus: 1,
    },
    {
      idOperateur: 28,
      nomOperateur: "Ella Hill",
      idCar: "CAR369",
      homeLocation: "508ZAB",
      type: "tit",
      secteur: "Collecteur",
      isTeamLeader: 0,
      startDate: "2022-02-01",
      endDate: "2022-12-31",
      activeStatus: 1,
    },
    {
      idOperateur: 29,
      nomOperateur: "Michael Allen",
      idCar: "CAR258",
      homeLocation: "510BCD",
      type: "temp",
      secteur: "HT",
      isTeamLeader: 0,
      startDate: "2022-01-15",
      endDate: "2022-12-31",
      activeStatus: 1,
    },
    {
      idOperateur: 30,
      nomOperateur: "Sofia Turner",
      idCar: "CAR123",
      homeLocation: "512EFG",
      type: "tit",
      secteur: "Préhenseur",
      isTeamLeader: 0,
      startDate: "2022-03-01",
      endDate: "2022-10-31",
      activeStatus: 1,
    },
  ];

  const column = [
    {
      name: "Opérateur",
      selector: (row) => row.nomOperateur,
      sortable: true,
    },
    {
      name: "CardID",
      selector: (row) => row.idCar,
    },
    {
      name: "Station",
      selector: (row) => row.homeLocation,
      sortable: true,
    },
    {
      name: "Type de contrat",
      selector: (row) => row.type,
    },
    {
      name: "Secteur",
      selector: (row) => row.secteur,
      sortable: true,
    },
    {
      name: "TeamLeader",
      selector: (row) => row.isTeamLeader,
    },
    {
      name: "Date d'entrée",
      selector: (row) => row.startDate,
    },
    {
      name: "Date de fin",
      selector: (row) => row.endDate,
    },
    {
      name: "Statut",
      selector: (row) => row.activeStatus,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <button
          className="btn btn-primary"
          onClick={() => alert(row.nomOperateur)}
        >
          Modifier
        </button>
      ),
    },
  ];

  const [operatorSearch, setOperatorSearch] = useState(operators);

  const customStyles = {
    headRow : {
      style : {
        backgroundColor : '#3dcd58',
        borderRadius : '15px 15px 0 0'
      }
    },
    pagination : {
      style : {
        borderRadius : '0 0 15px 15px'
      }
    },
}

  function handleOperatorSearch(event) {
    const newOperator = operators.filter((row) => {
      return row.nomOperateur
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });

    setOperatorSearch(newOperator);
  }

  return (
    <div className="main-operator">
      <div className="operator-search-bar">
        <input type="text" placeholder="Recherche" onChange={handleOperatorSearch} />
      </div>
      <DataTable
        columns={column}
        data={operatorSearch}
        selectableRows
        pagination
        fixedHeader
        fixedHeaderScrollHeight="540px"
        highlightOnHover
        pointerOnHover
        responsive
        customStyles={customStyles}
      ></DataTable>
    </div>
  );
}

export default Operator;
