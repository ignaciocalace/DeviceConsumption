show();
do {
  option = parseInt(
    prompt(
      "Elija una opción: \n1 - Nuevo calculo de consumo de dispositivo\n2 - Salir "
    )
  );
  switch (option) {
    case 1: {
      program();
      break;
    }
    case 2: {
      alert("Hasta la próxima");
      break;
    }
    default:
      alert("Opción inválida, ingrese nuevamente");
  }
} while (option != 2);

function show() {
  alert(
    "Esto es un programa para calcular el consumo eléctrico y coste monetario diario, mensual y anual de cualquier dispositivo electrónico"
  );
}

function program() {
  // Solicita al user consumo energético en kw
  let consumption_watts;
  do {
    consumption_watts = parseInt(
      prompt("Ingrese el consumo de su dispositivo en watts")
    );
  } while (isNaN(consumption_watts) || consumption_watts < 0);

  // Solicita al user valor del kw en su moneda
  let value_kw;
  do {
    value_kw = parseInt(prompt("Ingrese el valor del kw en su moneda"));
  } while (isNaN(value_kw) || value_kw < 0);

  // Solicita al user cantidad de horas al día con el dispositivo funcionando
  let hours_day = 0;
  do {
    hours_day = parseInt(
      prompt("Ingrese cuantas horas al día que utiliza el dispositivo")
    );
  } while (isNaN(hours_day) || hours_day < 0);

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
  // console.log(daily_consumption);
  // console.log(hours_day);
  if (daily_consumption == 0 || hours_day == 0) {
    alert("No existe consumo");
  } else {
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
  }
}
