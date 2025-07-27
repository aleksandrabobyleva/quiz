async function loadData() {
  const res = await fetch("/teams");
  return await res.json();
}

async function saveData(data) {
  await fetch("/teams", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

function updateTotal(row, data) {
  row.querySelector(".total").textContent =
    data.case1 + data.case2 + data.cipher;
}

async function renderTable() {
  const tbody = document.querySelector("#scoreTable tbody");
  tbody.innerHTML = "";
  const teams = await loadData();

  teams.forEach((team, index) => {
    const tr = document.createElement("tr");

    // Имя команды
    const tdName = document.createElement("td");
    const inputName = document.createElement("input");
    inputName.type = "text";
    inputName.value = team.name;
    inputName.addEventListener("input", e => {
      teams[index].name = e.target.value;
      saveData(teams);
    });
    tdName.appendChild(inputName);
    tr.appendChild(tdName);

    // Баллы
    ["case1", "case2", "cipher"].forEach(key => {
      const td = document.createElement("td");
      const input = document.createElement("input");
      input.type = "number";
      input.value = team[key];
      input.addEventListener("input", e => {
        teams[index][key] = Number(e.target.value) || 0;
        updateTotal(tr, teams[index]);
        saveData(teams);
      });
      td.appendChild(input);
      tr.appendChild(td);
    });

    // Итог
    const tdTotal = document.createElement("td");
    tdTotal.className = "total";
    tdTotal.textContent =
      team.case1 + team.case2 + team.cipher;
    tr.appendChild(tdTotal);

    tbody.appendChild(tr);
  });
}

window.addEventListener("DOMContentLoaded", renderTable);
