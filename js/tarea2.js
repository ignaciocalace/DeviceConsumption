show();
let value_kw;
do {
  value_kw = parseInt(prompt("Ingrese el valor del kw en su moneda"));
} while (isNaN(value_kw) || value_kw < 0);
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
    "Esto es un programa para calcular el consumo eléctrico y coste monetario diario, mensual y anual de uno o más dispositivos electrónicos"
  );
}

function createDevice() {
  let device = new Device();
  let consumptionWatts;
  let hoursDay = 0;
  device.id = list.length + 1;
  device.name = prompt("Ingrese nombre del dispositivo");
  do {
    consumptionWatts = parseInt(
      prompt("Ingrese el consumo de su dispositivo en watts")
    );
  } while (isNaN(consumptionWatts) || consumptionWatts < 0);
  do {
    hoursDay = parseInt(
      prompt("Ingrese cuantas horas al día que utiliza el dispositivo")
    );
  } while (isNaN(hoursDay) || hoursDay < 0);

  device.consumption = consumptionWatts;
  device.efficiency = prompt(
    "Ingrese eficiencia del dispositivo, rango de A - F"
  );
  device.time_on = hoursDay;
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
      `Id: ${item.id} \n ` +
        ` Nombre: ${item.name} \n` +
        `Eficiencia: ${item.efficiency} \n` +
        `Tiempo encendido: ${item.time_on}hs \n` +
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
  switch (list.length) {
    case 0: {
      alert(`No tiene ningun dispositivo agregado`);
      break;
    }
    case 1: {
      alert(`Tiene un dispositivo agregado`);
      break;
    }
    default: {
      alert(`Tiene agregados ${list.length} dispositivos`);
      break;
    }
  }
  alert(
    `Su consumo diario es de ${Math.ceil(
      totalDaily
    )}kw y un gasto de $${Math.ceil(totalDaily * value_kw)}\n` +
      `Su consumo mensual es de ${Math.ceil(
        totalMonthly
      )}kw y un gasto de $${Math.ceil(totalMonthly * value_kw)}\n` +
      `Su consumo anual es de ${Math.ceil(
        totalAnual
      )}kw y un gasto de $${Math.ceil(totalAnual * value_kw)}\n`
  );
}
