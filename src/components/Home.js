import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import axios from "axios";

function Home() {
  const weeks = [
    "2022-47",
    "2022-48",
    "2022-49",
    "2022-50",
    "2022-51",
    "2022-52",
    "2023-01",
    "2023-02",
    "2023-13",
    "2023-04",
    "2023-05",
    "2023-06",
    "2023-07",
    "2023-08",
    "2023-09",
    "2023-10",
    "2023-11",
    "2023-12",
    "2023-13",
    "2023-14",
    "2023-15",
    "2023-16",
    "2023-17",
    "2023-18",
    "2023-19",
    "2023-20",
    "2023-21",
    "2023-22",
    "2023-23",
    "2023-24",
    "2023-25",
    "2023-26",
    "2023-27",
    "2023-28",
    "2023-29",
    "2023-30",
    "2023-31",
    "2023-32",
    "2023-33",
    "2023-34",
    "2023-35",
    "2023-36",
    "2023-37",
    "2023-38",
    "2023-39",
    "2023-40",
    "2023-41",
    "2023-42",
    "2023-43",
    "2023-44",
    "2023-45",
    "2023-46",
    "2023-47",
    "2023-48",
    "2023-49",
    "2023-50",
    "2023-51",
    "2023-52",
  ]; // Liste des semaines

  const [switchState, setSwitchState] = useState(true);

  //trouver la semaine actuelle en fonction des semaines de weeks
  function getCurrentWeekIndex() {
    const now = new Date();
    const year = now.getFullYear();
    const weekNumber = getWeekNumber(now);

    // Construire la semaine actuelle au format "année-semaine"
    const currentWeek = `${year}-${weekNumber.toString().padStart(2, "0")}`;

    // Trouver l'index de la semaine actuelle dans le tableau des semaines
    const currentWeekIndex = weeks.indexOf(currentWeek);

    return currentWeekIndex !== -1 ? currentWeekIndex : 0; // Utilisez 0 si la semaine actuelle n'est pas trouvée
  }

  function getWeekNumber(date) {
    const d = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  }

  const currentWeekIndex = getCurrentWeekIndex();
  const [selectedWeekIndex, setSelectedWeekIndex] = useState(currentWeekIndex); // Indice de la semaine actuellement sélectionnée

  //Plannings

  // Planning en fonction des paramètres année-semaine et équipe Mat ou AM
  const [rightPlanning, setRightPlanning] = useState([]);

  React.useEffect(() => {
    axios.get("http://localhost:8000/planning").then((response) => {
      const filteredSoftSkills = Object.values(response.data).filter((item) => {
        const date = item.date;
        const week = item.week;
        const id_shift = item.id_shift;
        return (
          week === "52" &&
          date.split("-")[0] === "2022" &&
          id_shift === "Equipe 2 "
        );
      });
      setRightPlanning(filteredSoftSkills);
    });
  }, []);

  console.log(rightPlanning);
  const planningList = rightPlanning;

  // On trie par id_station de façon ascendante
  planningList.sort((a, b) => a.id_station - b.id_station);

  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 40,
    height: 20,
    padding: 0,
    display: "flex",
    border: "3px solid #3dcd58",
    borderRadius: 8,
    ".css-5ryogn-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track":
      {
        backgroundColor: "#F3F4F8",
      },
    ".css-5ryogn-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked": {
      color: "#3dcd58",
    },

    "&:active": {
      "& .MuiSwitch-thumb": {
        width: 15,
      },
      "& .MuiSwitch-switchBase.Mui-checked": {
        transform: "translateX(9px)",
      },
    },
    "& .MuiSwitch-switchBase": {
      padding: 2,
      color: "#3dcd58",
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
      width: 12,
      height: 12,
      borderRadius: 5,
      transition: theme.transitions.create(["width"], {
        duration: 200,
      }),
    },
    "& .MuiSwitch-track": {
      borderRadius: 16 / 2,
      opacity: 0,
      boxSizing: "border-box",
    },
  }));

  const handleSwitchClick = () => {
    setSwitchState(!switchState); // Inverse l'état du switch lorsqu'il est cliqué
  };

  const handlePrevWeekClick = () => {
    // Mettre à jour la semaine précédente
    setSelectedWeekIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  const handleNextWeekClick = () => {
    // Mettre à jour la semaine suivante
    setSelectedWeekIndex((prevIndex) =>
      prevIndex < weeks.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  // Fonction pour obtenir la date correspondante à une semaine donnée
  const getMonthYearFromDate = (week) => {
    const [year, weekNumber] = week.split("-");
    const date = new Date(year, 0, 1 + (weekNumber - 1) * 7);
    const options = { year: "numeric", month: "long" };
    return date.toLocaleDateString(undefined, options);
  };

  //===============================================================================================================
  //================================================ CODE DU DESSUS OK NORMALEMENT =================================
  //===============================================================================================================

  // Fonction pour regrouper les données par id_station et id_operateur
  const groupData = () => {
    const groupedData = {};

    planningList.forEach((item) => {
      const equipeKey = `${item.id_station}_${item.id_operateur}`;
      if (!groupedData[equipeKey]) {
        groupedData[equipeKey] = {
          id_station: item.id_station,
          id_operateur: item.id_operateur,
          jours: {
            lundi: [],
            mardi: [],
            mercredi: [],
            jeudi: [],
            vendredi: [],
          },
        };
      }
      const jourData = groupedData[equipeKey].jours[item.day];
      jourData.push({
        "5S": 0,
        SST: 0,
        Niv: 0,
      });
    });

    return Object.values(groupedData);
  };

  const equipeData = groupData();

  const renderTableData = () => {
    return equipeData.map((equipe) => (
      <tr key={`${equipe.id_station}_${equipe.id_operateur}`}>
        <td>{equipe.id_station}</td>
        {["lundi", "mardi", "mercredi", "jeudi", "vendredi"].map((jour) => (
          <React.Fragment key={jour}>
            {equipe.jours[jour].length > 0 ? (
              <>
                <td>{equipe.id_operateur}</td>
                {equipe.jours[jour].map((data, dataIndex) => (
                  <React.Fragment key={dataIndex}>
                    <td>{data["5S"]}</td>
                    <td>{data.SST}</td>
                    <td>{data.Niv}</td>
                  </React.Fragment>
                ))}
              </>
            ) : (
              <>
                <td>0</td>
                <td>0</td>
                <td>0</td>
                <td>0</td>
              </>
            )}
          </React.Fragment>
        ))}
      </tr>
    ));
  };

  return (
    <div className="main-home">
      {/* DATAS */}
      <div className="main-home-datas-section">
        <div className="home-dashboard-section"></div>

        {/* MAGIC FULLFILL BUTTON */}
        <div className="home-fullfill-section">
          <button className="fullfill-button">MagicFullFill</button>
        </div>
      </div>

      <div className="main-home-planning-section">
        {/* PLANNING ITEMS */}
        <div className="main-planning-items">
          {/* PRESENCE */}
          <div className="presence-selection">
            <input
              type="radio"
              name="presence"
              id="present-list"
              checked
            ></input>
            <label htmlFor="present-list">Présents</label>

            <input type="radio" name="presence" id="absent-list"></input>
            <label htmlFor="absent-list">Absents</label>
          </div>

          {/* WEEK */}
          <div className="week-selection">
            <div>
              <button
                className="button-prev-week"
                onClick={handlePrevWeekClick}
              >
                <BsArrowLeft />
              </button>
            </div>

            <div>
              <div className="month-year-text">
                {getMonthYearFromDate(weeks[selectedWeekIndex])} /{" "}
                <select
                  className="week-dropdown"
                  value={weeks[selectedWeekIndex]}
                  onChange={(e) => {
                    const selectedIndex = weeks.indexOf(e.target.value);
                    setSelectedWeekIndex(selectedIndex);
                  }}
                >
                  {weeks.map((week) => (
                    <option key={week} value={week}>
                      {week}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <button
                className="button-next-week"
                onClick={handleNextWeekClick}
              >
                <BsArrowRight />
              </button>
            </div>
          </div>

          {/* SHIFT */}
          <div className="shift-selection" onClick={handleSwitchClick}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography
                value="1"
                className={switchState ? "active" : "inactive"}
              >
                Mat
              </Typography>
              <AntSwitch
                defaultChecked={switchState}
                inputProps={{ "aria-label": "ant design" }}
              />
              <Typography
                value="2"
                className={switchState ? "inactive" : "active"}
              >
                A-M
              </Typography>
            </Stack>
          </div>
        </div>

        {/* ===============  PLANNING TABLE  =================== */}
        <div className="main-planning-table">
          <table cellspacing="0" border="2px" bordercolor="#000">
            <thead>
              <tr>
                <th className="table-equipe" rowSpan="2">
                  Equipe
                </th>
                <th colSpan="4">Lundi</th>
                <th colSpan="4">Mardi</th>
                <th colSpan="4">Mercredi</th>
                <th colSpan="4">Jeudi</th>
                <th colSpan="4">Vendredi</th>
              </tr>
              <tr className="sub-col-compt">
                <th>ID Opérateur</th>
                <th>5S</th>
                <th>SST</th>
                <th>Niv</th>
                <th>ID Opérateur</th>
                <th>5S</th>
                <th>SST</th>
                <th>Niv</th>
                <th>ID Opérateur</th>
                <th>5S</th>
                <th>SST</th>
                <th>Niv</th>
                <th>ID Opérateur</th>
                <th>5S</th>
                <th>SST</th>
                <th>Niv</th>
                <th>ID Opérateur</th>
                <th>5S</th>
                <th>SST</th>
                <th>Niv</th>
              </tr>
            </thead>
            <tbody>{renderTableData()}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;
