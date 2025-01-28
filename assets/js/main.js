// Inventario disponible de productos

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

function iniciarSimulador() {
  // Ingresar codigo del producto
  let ingresarSku;

  do {
    ingresarSku = prompt("Ingresa el código del producto: (solo numeros)");
  } while (isNaN(ingresarSku) || ingresarSku.trim() === "");

  ingresarSku = Number(ingresarSku);

  let skuIngresado = inventario.find(item => item.sku === ingresarSku);

  // Consultar inventario
  function consultarInventario() {
    if (skuIngresado) {
      if (skuIngresado.stock > 0) {
        alert(
          `Producto encontrado: ${skuIngresado.descripcion}\n` +
          `Precio por unidad: $${skuIngresado.precio}\n` +
          `Stock disponible: ${skuIngresado.stock}`
        );

        let deseaComprar = confirm("¿Desea comprar este producto?");
        if (deseaComprar) {
          let cantidad;
          do {
            cantidad = prompt(`¿Cuántas unidades desea comprar? (Stock disponible: ${skuIngresado.stock})`);
          } while (isNaN(cantidad) || cantidad.trim() === "" || Number(cantidad) <= 0 || Number(cantidad) > skuIngresado.stock);

          cantidad = Number(cantidad);
          const impuesto = 7/100; // Impuesto del 7%
          const total = skuIngresado.precio * cantidad * (1 + impuesto);
          skuIngresado.stock -= cantidad;

          alert(
            `Has comprado ${cantidad} unidades de ${skuIngresado.descripcion}.\n` +
            `El total a pagar con un impuesto del 7% es: $${total.toFixed(2)}\n` +
            `Gracias por tu compra.`
          );
        } else {
          alert("Gracias por visitar nuestra tienda. ¡Hasta luego!");
        }
      } else {
        alert(`El producto ${skuIngresado.descripcion} está agotado.`);
      }
    } else {
      alert("El producto no está en inventario.");
    }
  }

  consultarInventario();
}

document.getElementById("ejecutarPrograma").addEventListener("click", iniciarSimulador);
