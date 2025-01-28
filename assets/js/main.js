//  inventario
const inventario = [
  { sku: 8345, descripcion: "Assassins Creed Mirage PS5", precio: 35, stock: 16 },
  { sku: 4441, descripcion: "Mortal Kombat 1 PS5", precio: 44, stock: 5 },
  { sku: 5455, descripcion: "Dragon Ball Fighter Z PS5", precio: 25, stock: 78 },
  { sku: 1717, descripcion: "EA Sports FC 25 PS5", precio: 45, stock: 0 },
  { sku: 4350, descripcion: "Gran Turismo 7 PS5", precio: 15, stock: 12 },
  { sku: 2715, descripcion: "Super Mario Odyssey NSW", precio: 40, stock: 45 },
  { sku: 7524, descripcion: "Mario Kart 8 Deluxe NSW", precio: 42, stock: 0 },
  { sku: 2509, descripcion: "NBA 2K25 NSW", precio: 38, stock: 8 },
  { sku: 6265, descripcion: "Luigi's Mansion 3 NSW", precio: 42, stock: 10 },
  { sku: 5661, descripcion: "Just Dance 2024 NSW", precio: 49, stock: 10 }
];

// Función para buscar un producto en el inventario por SKU
function buscarProductoPorSku(sku) {
  return inventario.find(item => item.sku === sku);
}

// Función para validar y solicitar un número (SKU o cantidad)
function solicitarNumero(mensaje, validacion) {
  let numero;
  do {
    numero = prompt(mensaje);
  } while (!validacion(numero));
  return Number(numero);
}

// Función para validar el SKU ingresado
function esSkuValido(input) {
  return !isNaN(input) && input.trim() !== "" && Number(input) > 0;
}

// Función para validar la cantidad de compra
function esCantidadValida(input, maxCantidad) {
  return !isNaN(input) && input.trim() !== "" && Number(input) > 0 && Number(input) <= maxCantidad;
}

// Función para calcular el total de la compra
function calcularTotal(precio, cantidad, impuesto) {
  return precio * cantidad * (1 + impuesto);
}

// Función principal para iniciar el simulador
function iniciarSimulador() {
  const impuesto = 0.07; // Impuesto del 7%
  let continuar = true;

  while (continuar) {
    const skuIngresado = solicitarNumero(
      "Ingresa el código del producto (solo números):",
      esSkuValido
    );

    const producto = buscarProductoPorSku(skuIngresado);

    if (producto) {
      if (producto.stock > 0) {
        alert(
          `Producto encontrado: ${producto.descripcion}\n` +
          `Precio por unidad: $${producto.precio}\n` +
          `Stock disponible: ${producto.stock}`
        );

        const deseaComprar = confirm("¿Desea comprar este producto?");
        if (deseaComprar) {
          const cantidad = solicitarNumero(
            `¿Cuántas unidades desea comprar? (Stock disponible: ${producto.stock})`,
            input => esCantidadValida(input, producto.stock)
          );

          const total = calcularTotal(producto.precio, cantidad, impuesto);
          producto.stock -= cantidad;

          alert(
            `Has comprado ${cantidad} unidades de ${producto.descripcion}.\n` +
            `El total a pagar con un impuesto del 7% es: $${total.toFixed(2)}.\n` +
            `Gracias por tu compra.`
          );
        } else {
          alert("Gracias por visitar nuestra tienda. ¡Hasta luego!");
        }
      } else {
        alert(`El producto ${producto.descripcion} está agotado.`);
      }
    } else {
      continuar = confirm("El producto no está en inventario. ¿Desea buscar otro producto?");
      if (!continuar) {
        alert("Gracias por visitar nuestra tienda. ¡Hasta luego!");
      }
    }
  }
}

document.getElementById("ejecutarPrograma").addEventListener("click", iniciarSimulador);
