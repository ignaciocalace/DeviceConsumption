let carrito = [];
let stock = [];

const tabla = document.getElementById("items");
const agregar = document.querySelector("#agregar");
const aumentar = document.querySelector("#aumentar");
const ordenar = document.getElementById("ordenar");
const vaciar = document.getElementById("vaciar");
const productosEnStock = document.getElementById("productos");

stock.push(new Producto("Arroz", 300));
stock.push(new Producto("Leche", 100));
stock.push(new Producto("Pan", 50));
stock.push(new Producto("Huevos", 400));

stock.forEach((producto) => {
  let option = document.createElement("option");
  option.innerText = `${producto.nombre} costo: $${producto.precio}`;
  option.value = stock.indexOf(producto); ///nos devuelve el indice en el array
  productosEnStock.appendChild(option); ///le agregamos al select el option
});

function newRow(item) {
  let row = document.createElement("tr");
  let pos = carrito.indexOf(item); ///el indice en el carrito

  ///creo celda con NOMBRE
  let celda = document.createElement("td");
  celda.innerText = item.producto.nombre;
  row.append(celda); ///agregue el nombre

  ///creo la celda CANTIDAD
  celda = document.createElement("td");
  celda.innerText = item.cantidad;

  ///le agrego los botones INCREMENTO y DECREMENTO
  let botonIncremento = document.createElement("button");
  botonIncremento.className = "btn btn-primary";
  botonIncremento.innerText = "+";

  let botonDecremento = document.createElement("button");
  botonDecremento.className = "btn btn-primary";
  botonDecremento.innerText = "-";

  botonIncremento.onclick = () => {
    carrito[pos].cantidad++;
    listadoUpdate();
    localStorage.setItem("carrito", JSON.stringify(carrito));
  };

  botonDecremento.onclick = () => {
    if (carrito[pos].cantidad > 0) {
      carrito[pos].cantidad--;
      listadoUpdate();
      localStorage.setItem("carrito", JSON.stringify(carrito));
    }
  };

  celda.append(botonIncremento);
  celda.append(botonDecremento);
  row.append(celda);

  ///creo la celda precio

  celda = document.createElement("td");
  celda.innerText = item.producto.precio;
  row.append(celda);

  ///AGREGAMOS EL BOTON ELIMINAR
  let botonEliminar = document.createElement("button");
  botonEliminar.className = "btn btn-danger";
  botonEliminar.innerText = "Eliminar";

  botonEliminar.onclick = () => {
    carrito.splice(pos, 1); ///elimina el objeto en la posicion pos del carrito
    listadoUpdate(); //vuelvo a generar los elementos del DOM
    localStorage.setItem("carrito", JSON.stringify(carrito));
  };

  celda = document.createElement("td");
  celda.append(botonEliminar);
  row.append(celda);
  tabla.append(row);
}
/* calculo el total de todas las rows */
function calculoTotal() {
  ////HAGO LA ACUMULACION EN PRECIOTOTAL
  total = document.getElementById("total");
  total.innerText = carrito.reduce(
    (suma, item) => suma + item.producto.precio * item.cantidad,
    0
  );
}

/* se actualiza la tabla nuevamente */
function listadoUpdate() {
  tabla.innerHTML = "";
  carrito.forEach((item) => {
    newRow(item);
  });
  calculoTotal();
}

/* agregamos un nuevo item al carrito  */
agregar.addEventListener("submit", (e) => {
  e.preventDefault();
  let producto = stock[productosEnStock.value];

  let nuevoElementoCarrito = new Item(producto, 1); ///creamos el item de carrito
  carrito.push(nuevoElementoCarrito); ///agrego el elemento al carrito
  newRow(nuevoElementoCarrito);
  calculoTotal();
  localStorage.setItem("carrito", JSON.stringify(carrito));
});
/* Generamos el multiplicador de precio (descuento de 0 a 1, de 1 a... aumento) */
aumentar.addEventListener("submit", (e) => {
  e.preventDefault();
  let valor = document.getElementById("aumento").value;
  if (valor > 0) {
    carrito = carrito.map((item) => {
      return new Item(
        new Producto(item.producto.nombre, item.producto.precio * valor),
        item.cantidad
      );
    });
    listadoUpdate();
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
});

/* ORDENAMOS EL CARRITO POR NOMBRE */
ordenar.onclick = () => {
  carrito.sort((actual, siguiente) => {
    return actual.producto.nombre.localeCompare(siguiente.producto.nombre);
  });
  listadoUpdate();
};

/* vaciamos el carrito */
vaciar.onclick = () => {
  carrito = [];
  ///carrito.length = 0
  listadoUpdate();
  localStorage.setItem("carrito", JSON.stringify(carrito));
};
