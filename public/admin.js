const defaultTeams = [
  { name: "Team 1", case1: 0, case2: 0, cipher: 0 },
  { name: "Team 2", case1: 0, case2: 0, cipher: 0 }
];

function loadData() {
  const data = localStorage.getItem("teamsData");
  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      return defaultTeams;
    }
  }
  return defaultTeams;
}

function saveData(data) {
  localStorage.setItem("teamsData", JSON.stringify(data));
  
  window.dispatchEvent(new Event('storage'));
}

function updateTotal(row, data) {
  const totalCell = row.querySelector(".total");
  const total = Number(data.case1) + Number(data.case2) + Number(data.cipher);
  totalCell.textContent = total;
}

function renderTable() {
  const tbody = document.querySelector("#scoreTable tbody");
  tbody.innerHTML = "";
  const teams = loadData();

  teams.forEach((team, index) => {
    const tr = document.createElement("tr");

    // Название команды
    const tdName = document.createElement("td");
    const inputName = document.createElement("input");
    inputName.type = "text";
    inputName.value = team.name;
    inputName.addEventListener("input", (e) => {
      teams[index].name = e.target.value;
      saveData(teams);
    });
    tdName.appendChild(inputName);
    tr.appendChild(tdName);

    // Баллы
    ["case1", "case2", "cipher"].forEach(key => {
      const td = document.createElement("td");
      const inputNum = document.createElement("input");
      inputNum.type = "number";
      inputNum.min = "0";
      inputNum.value = team[key];
      inputNum.addEventListener("input", (e) => {
        const val = e.target.value;
        teams[index][key] = val === "" ? 0 : Number(val);
        updateTotal(tr, teams[index]);
        saveData(teams);
      });
      td.appendChild(inputNum);
      tr.appendChild(td);
    });

    // Итог
    const tdTotal = document.createElement("td");
    tdTotal.className = "total";
    tdTotal.textContent = Number(team.case1) + Number(team.case2) + Number(team.cipher);
    tr.appendChild(tdTotal);

    tbody.appendChild(tr);
  });
}

window.addEventListener("DOMContentLoaded", renderTable);
