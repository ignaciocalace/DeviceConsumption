const addForm = document.querySelector("#formAddDevice");
const devicesList = document.querySelector("#devices");
const sorting = document.querySelector("#sorting");
const cleanTable = document.querySelector("#cleanTable");
const totals = document.getElementById("totals");
const totalD = document.getElementById("totalD");
const totalM = document.getElementById("totalM");
const totalA = document.getElementById("totalA");
const inputPriceKw = document.querySelector("#priceKw");
const textGas = document.querySelector("#textGas");

let list = [];

let listTemp = JSON.parse(localStorage.getItem("list"));
listTemp != null && (list = listTemp);

// On Load
let priceKw = JSON.parse(localStorage.getItem("priceKw"));
priceKw == undefined && (inputPriceKw.value = 0);
inputPriceKw.value = priceKw;
loadTable();

// Fetch API
function callFetch(totalEnergy) {
  fetch("https://beta3.api.climatiq.io/estimate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer 93953XXPZE4NPRPEJDCT9HGJ92VR",
    },
    body: JSON.stringify({
      emission_factor: {
        activity_id: "heat-and-steam-type_purchased",
      },
      parameters: {
        energy: totalEnergy,
        energy_unit: "kWh",
      },
    }),
  })
    .then((response) => response.json())
    .then(
      (response) =>
        (textGas.innerHTML = `Using  ${totalEnergy}KWh produces a total of ${response.co2e.toFixed(
          1
        )}kg of greenhouse gases`)
    )
    .catch((err) => console.error(err));
}

// Functions
function totalWh(list) {
  return list.reduce(function (a, b) {
    return a + b.consumption * b.time_on;
  }, 0);
}

function loadTable() {
  devicesList.innerHTML = "";
  list.forEach((Device) => {
    createTable(Device);
  });
  let totalEnergy = totalWh(list) / 1000;
  callFetch(totalEnergy);
  total(list);
}

function createDevice() {
  let up_device = new Device();
  up_device.id = list.length + 1;
  up_device.name = document.getElementById("deviceName").value;
  up_device.consumption = document.getElementById("consumption").value;
  up_device.efficiency = document.getElementById("efficiency").value;
  up_device.time_on = document.getElementById("time_on").value;
  up_device.room = document.getElementById("room").value;
  return up_device;
}

function addDeviceToList() {
  list.push(createDevice());
  Toastify({
    text: "Added Device",
    duration: 3000,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "#67c29c",
    },
    onClick: function () {},
  }).showToast();
}

function cleanList() {
  list = [];
  localStorage.setItem("list", JSON.stringify(list));
  Toastify({
    text: "Lista Eliminada",
    duration: 3000,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "#895558",
    },
    onClick: function () {},
  }).showToast();
}

function sortList(list) {
  list.sort((actual, next) => {
    return actual.consumption - next.consumption;
  });
  localStorage.setItem("list", JSON.stringify(list));
  Toastify({
    text: "Sorted List",
    duration: 3000,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "#1cabc4",
    },
    onClick: function () {},
  }).showToast();
}

function createTable(dev) {
  let row = document.createElement("tr");
  let pos = list.indexOf(dev);
  // Btn Delete Device
  let cell = document.createElement("td");
  let btnDel = document.createElement("button");
  btnDel.className = "btn btn-danger p-2";
  btnDel.innerText = "X";
  cell.append(btnDel);
  row.append(cell);
  // Name
  cell = document.createElement("td");
  cell.innerText = dev.name;
  row.append(cell);
  // Consumption
  cell = document.createElement("td");
  cell.innerText = dev.consumption + "W";
  row.append(cell);
  //Efficiency
  cell = document.createElement("td");
  cell.className = "d-none d-lg-table-cell";
  cell.innerText = dev.efficiency;
  row.append(cell);
  // Tieme on
  cell = document.createElement("td");
  cell.innerText = dev.time_on + "hs";
  row.append(cell);
  // Room
  cell = document.createElement("td");
  cell.className = "d-none d-lg-table-cell";
  cell.innerText = dev.room;
  row.append(cell);

  // Daily Cost
  let daily_consumption = ((dev.consumption * dev.time_on) / 1000) * priceKw;
  cell = document.createElement("td");
  cell.className = "d-none d-sm-table-cell";
  cell.innerText = "$" + daily_consumption.toFixed(1);
  row.append(cell);

  // Monthly Cost
  cell = document.createElement("td");
  cell.className = "d-none d-sm-table-cell";
  cell.innerText = "$" + (daily_consumption * 30).toFixed(1);
  row.append(cell);

  // Anual Cost
  cell = document.createElement("td");
  cell.className = "d-none d-sm-table-cell";
  cell.innerText = "$" + (daily_consumption * 365).toFixed(1);
  row.append(cell);
  devicesList.appendChild(row);
  // splice
  btnDel.addEventListener("click", (e) => {
    list.splice(pos, 1);
    loadTable();
    localStorage.setItem("list", JSON.stringify(list));
    Toastify({
      text: "Dispositivo Eliminado",
      duration: 3000,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "#a16468",
      },
      onClick: function () {},
    }).showToast();
  });
}

function total(list) {
  totalD.innerHTML = "";
  totalM.innerHTML = "";
  totalA.innerHTML = "";
  // Total Price
  let totalKw = (totalWh(list) / 1000) * priceKw;
  // Total Daily
  let cell = document.createElement("td");
  cell.innerText = `$${totalKw.toFixed(1)}`;
  totalD.append(cell);
  // Total Monthly
  cell = document.createElement("td");
  cell.innerText = `$${(totalKw * 30).toFixed(1)}`;
  totalM.append(cell);
  // Total Anual
  cell = document.createElement("td");
  cell.innerText = `$${(totalKw * 365).toFixed(1)}`;
  totalA.append(cell);
}

// Events Listeners
inputPriceKw.addEventListener("change", (e) => {
  priceKw = e.target.value;
  localStorage.setItem("priceKw", JSON.stringify(priceKw));
  loadTable();
});

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addDeviceToList();
  localStorage.setItem("list", JSON.stringify(list));
  addForm.reset();
  loadTable();
});

cleanTable.addEventListener("click", (e) => {
  cleanList(list);
  loadTable();
});

sorting.addEventListener("click", (e) => {
  if (list != null) {
    sortList(list);
    loadTable();
  }
});
