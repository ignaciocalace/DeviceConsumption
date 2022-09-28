// Solicita al user consumo energético en kw
let consumption_watts = parseInt(
  prompt("Ingrese el consumo de su dispositivo en watts")
);

// Solicita al user valor del kw en su moneda
let value_kw = parseInt(prompt("Ingrese el valor del kw en su moneda"));

// Solicita al user cantidad de horas al día con el dispositivo funcionando
let hours_day = parseInt(
  prompt("Ingrese cuantas horas al día que utiliza el dispositivo")
);

let daily_consumption = (consumption_watts * hours_day) / 1000;
let monthly_consumption = daily_consumption * 30;
let anual_consumption = monthly_consumption * 12;

function total_value(rate) {
  return rate * value_kw;
}

function value_account(rate) {
  switch (rate) {
    case "daily":
      return total_value(daily_consumption);
    case "monthly":
      return total_value(monthly_consumption);
    case "anual":
      return total_value(anual_consumption);
    default:
      return 0;
  }
}

// Respuesta del programa diario
alert(
  "El consumo diario es de " +
    daily_consumption +
    "kw" +
    " a un precio de $" +
    value_account("daily")
);

// Respuesta del programa mensual
alert(
  "El consumo mensual es de " +
    monthly_consumption +
    "kw" +
    " a un precio de $" +
    value_account("monthly")
);

// Respuesta del programa anual
alert(
  "El consumo anual es de " +
    anual_consumption +
    "kw" +
    " a un precio de $" +
    value_account("anual")
);
