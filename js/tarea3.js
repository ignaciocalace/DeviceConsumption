let list = [];

let listTemp = JSON.parse(localStorage.getItem("list"));
if (listTemp != null) {
  list = listTemp;
}

const addForm = document.querySelector("#formAddDevice");
const devicesList = document.querySelector("#devices");
const sorting = document.querySelector("#sorting");
const cleanTable = document.querySelector("#cleanTable");
const totals = document.getElementById("totals");
const totalD = document.getElementById("totalD");
const totalM = document.getElementById("totalM");
const totalA = document.getElementById("totalA");
const inputPriceKw = document.querySelector("#priceKw");

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
// On Load
let priceKw;
let priceKwTemp = JSON.parse(localStorage.getItem("priceKw"));
if (priceKwTemp != undefined) {
  priceKw = priceKwTemp;
  inputPriceKw.value = priceKw;
} else {
  inputPriceKw.value = 0;
}

loadTable();
// Funciones
function loadTable() {
  devicesList.innerHTML = "";
  list.forEach((Device) => {
    createTable(Device);
  });
  total(list);
}

function addDeviceToList() {
  list.push(createDevice());
}

function cleanList() {
  list = [];
  localStorage.setItem("list", JSON.stringify(list));
}

function sortList(list) {
  list.sort((actual, siguiente) => {
    return actual.consumption - siguiente.consumption;
  });
  localStorage.setItem("list", JSON.stringify(list));
}

function createTable(dev) {
  let row = document.createElement("tr");
  let pos = list.indexOf(dev);
  // Btn Eliminar Dispositivo
  let cell = document.createElement("td");
  let btnDel = document.createElement("button");
  btnDel.className = "btn btn-danger";
  btnDel.innerText = "X";
  cell.append(btnDel);
  row.append(cell);
  // Nombre a la tabla
  cell = document.createElement("td");
  cell.innerText = dev.name;
  row.append(cell);
  // Consumo en watts
  cell = document.createElement("td");
  cell.innerText = dev.consumption + "W";
  row.append(cell);
  //Eficiencia
  cell = document.createElement("td");
  cell.innerText = dev.efficiency;
  row.append(cell);
  // Tiempo encendido
  cell = document.createElement("td");
  cell.innerText = dev.time_on + "hs";
  row.append(cell);
  // Habitación
  cell = document.createElement("td");
  cell.innerText = dev.room;
  row.append(cell);
  // Gasto Diario
  let daily_consumption = Math.ceil(
    ((dev.consumption * dev.time_on) / 1000) * priceKw
  );
  cell = document.createElement("td");
  cell.innerText = "$" + daily_consumption;
  row.append(cell);
  // Gasto Mensual
  cell = document.createElement("td");
  cell.innerText = "$" + daily_consumption * 30;
  row.append(cell);
  // Gasto Anual
  cell = document.createElement("td");
  cell.innerText = "$" + daily_consumption * 365;
  row.append(cell);
  devicesList.appendChild(row);
  btnDel.onclick = () => {
    list.splice(pos, 1);
    loadTable();
    localStorage.setItem("list", JSON.stringify(list));
  };
}

function total(list) {
  // Borro lo que está
  totalD.innerHTML = "";
  totalM.innerHTML = "";
  totalA.innerHTML = "";
  // Cálculos
  let totalKw = list.reduce(function (a, b) {
    return a + b.consumption * b.time_on;
  }, 0);
  totalKw = Math.ceil((parseInt(totalKw) / 1000) * priceKw);

  // Total Diario
  let cell = document.createElement("td");
  cell.innerText = `$${totalKw}`;
  totalD.append(cell);
  // Total Mensual
  cell = document.createElement("td");
  cell.innerText = `$${totalKw * 30}`;
  totalM.append(cell);
  // Total Anual
  cell = document.createElement("td");
  cell.innerText = `$${totalKw * 365}`;
  totalA.append(cell);
}

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

cleanTable.onclick = () => {
  cleanList(list);
  loadTable();
};

sorting.onclick = () => {
  if (list != null) {
    sortList(list);
    loadTable();
  }
};
