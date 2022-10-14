show();
let value_kw = parseInt(prompt("Ingrese el valor del kw en su moneda"));
let list = [];
do {
  option = parseInt(
    prompt(
      "Elija una opción: \n1 - Agregar nuevo dispositivo\n2 - Mostrar Lista (consola)\n3 - Mostrar consumo y gasto total\n4 - Salir "
    )
  );
  switch (option) {
    case 1: {
      addDeviceToList();
      break;
    }
    case 2: {
      showList();
      break;
    }
    case 3: {
      showSummary();
      break;
    }
    case 4: {
      alert("Hasta la próxima");
      break;
    }
    default:
      alert("Opción inválida, ingrese nuevamente");
  }
} while (option != 4);

function show() {
  alert(
    "Esto es un programa para calcular el consumo eléctrico y coste monetario diario, mensual y anual de cualquier dispositivo electrónico"
  );
}

function createDevice() {
  let device = new Device();
  device.id = list.length + 1;
  device.name = prompt("Ingrese nombre del dispositivo");
  device.consumption = parseInt(
    prompt("Ingrese el consumo de su dispositivo en watts")
  );
  device.efficiency = prompt(
    "Ingrese eficiencia del dispositivo, rango de A - F"
  );
  device.time_on = parseInt(
    prompt("Ingrese cuantas horas al día que utiliza el dispositivo")
  );
  device.room = prompt("Ingrese en que habitación se encuentra su dispositivo");
  return device;
}

function addDeviceToList() {
  list.push(createDevice());
}

function showList() {
  for (let item of list) {
    let daily_consumption = (item.consumption * item.time_on) / 1000;
    let monthly_consumption = daily_consumption * 30;
    let anual_consumption = monthly_consumption * 12;
    console.log(
      `Nombre: ${item.name} \n` +
        `Eficiencia: ${item.efficiency} \n` +
        `Tiempo encendido: ${item.time_on} \n` +
        `Habitación: ${item.room} \n` +
        `Consumo y gasto diario: ${Math.ceil(
          daily_consumption
        )}kw y $${Math.ceil(daily_consumption * value_kw)}\n` +
        `Consumo y gasto mensual: ${Math.ceil(
          monthly_consumption
        )}kw y $${Math.ceil(monthly_consumption * value_kw)}\n` +
        `Consumo y gasto anual: ${Math.ceil(
          anual_consumption
        )}kw y $${Math.ceil(anual_consumption * value_kw)}\n`
    );
  }
}

function showSummary() {
  let totalDaily = 0;
  let totalMonthly = 0;
  let totalAnual = 0;
  for (let item of list) {
    totalDaily += (item.consumption * item.time_on) / 1000;
    totalMonthly += totalDaily * 30;
    totalAnual += totalMonthly * 12;
  }
  alert(
    `Consumo y gasto diario: ${Math.ceil(totalDaily)}kw y $${Math.ceil(
      totalDaily * value_kw
    )}\n` +
      `Consumo y gasto mensual: ${Math.ceil(totalMonthly)}kw y $${Math.ceil(
        totalMonthly * value_kw
      )}\n` +
      `Consumo y gasto anual: ${Math.ceil(totalAnual)}kw y $${Math.ceil(
        totalAnual * value_kw
      )}\n`
  );
}
