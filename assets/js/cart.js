document.addEventListener("DOMContentLoaded", () => {
    const carritoLista = document.querySelector(".carrito-lista");
    const subtotalElement = document.getElementById("subtotal");
    const impuestoElement = document.getElementById("impuesto");
    const totalElement = document.getElementById("total");
    const botonActualizar = document.getElementById("actualizar-carrito");
    const botonFinalizar = document.getElementById("finalizar-orden");
    const botonSeguirComprando = document.getElementById("seguir-comprando");

    // Obtener los productos del pedido desde localStorage
    let pedido = JSON.parse(localStorage.getItem("pedido")) || [];

    if (pedido.length === 0) {
        carritoLista.innerHTML = "<p>No hay productos en el carrito.</p>";
        subtotalElement.textContent = "Subtotal: $0";
        impuestoElement.textContent = "Impuesto (7%): $0";
        totalElement.textContent = "Total a Pagar: $0";
        return;
    }

    // Función para renderizar la lista de productos y actualizar totales
    function renderizarCarrito() {
        carritoLista.innerHTML = "";
        let subtotal = 0;

        const div = document.createElement("div");
        div.classList.add("carrito-item");

        div.innerHTML = `
            <div class="productos-cuadro-header">Borrar</div>
            <div class="productos-cuadro-header">Código</div>
            <div class="productos-cuadro-header">Descripción</div>
            <div class="productos-cuadro-header">Precio</div>
            <div class="productos-cuadro-header">Orden</div>
            <div class="productos-cuadro-header">total</div>
            `;

        pedido.forEach((producto, index) => {

            div.innerHTML += `
                <div class="item"><button class="eliminar-btn" data-index="${index}"><i class="fa-solid fa-trash"></i></button></div>
                <div class="item item-align-left">${producto.id}</div>
                <div class="item item-align-left"><strong>${producto.nombre}</strong></div>
                <div class="item">$${producto.precio}</div>
                <input type="number" class="cantidad-input" data-index="${index}" min="1" value="${producto.cantidad}">
                <div class="item">$<span class="total-item">${producto.total}</span></div>

            `;
            subtotal += producto.total;
        });

        carritoLista.appendChild(div);

        const impuesto = subtotal * 0.07;
        const total = subtotal + impuesto;

        subtotalElement.textContent = `Subtotal: $${subtotal.toFixed(2)}`;
        impuestoElement.textContent = `Impuesto (7%): $${impuesto.toFixed(2)}`;
        totalElement.textContent = `Total a Pagar: $${total.toFixed(2)}`;

        localStorage.setItem("pedido", JSON.stringify(pedido)); // Guardar cambios

        // Agregar eventos a los inputs de cantidad
        document.querySelectorAll(".cantidad-input").forEach(input => {
            input.addEventListener("input", () => { // Cambiar "change" por "input" para detectar cambios en tiempo real
                mostrarBotonActualizar();
            });
        });

        // Agregar eventos a los botones de eliminar
        document.querySelectorAll(".eliminar-btn").forEach(boton => {
            boton.addEventListener("click", eliminarProducto);
        });

        // Ocultar el botón de actualizar al cargar
        botonActualizar.style.display = "none";

        // Llamar a la funcion para actualizar visibilidad de botones
        actualizarVisibilidadBotones();
        actualizarVisibilidadDesglose();
        actualizarVisibilidadBotonMenu();
        actualizarCarritoHeader();
    }

    function actualizarVisibilidadDesglose() {
        const desglosePago = document.querySelector(".desglose-pago");

        if (pedido.length === 0) {
            desglosePago.style.visibility = "hidden";
            desglosePago.style.opacity = "0";
        } else {
            desglosePago.style.visibility = "visible";
            desglosePago.style.opacity = "1";
        }
    }

    function actualizarVisibilidadBotones() {
        const botonFinalizar = document.getElementById("finalizar-orden");
        const botonSeguirComprando = document.getElementById("seguir-comprando");

        if (pedido.length === 0) {
            botonFinalizar.style.display = "none";
            botonSeguirComprando.style.display = "none";
        } else {
            botonFinalizar.style.display = "block";
            botonSeguirComprando.style.display = "block";
        }
    }

    function actualizarVisibilidadBotonMenu() {
        const botonRegresar = document.getElementById("regresar-menu");
        const carritoVacio = pedido.length === 0;

        if (botonRegresar) {
            botonRegresar.style.display = carritoVacio ? "block" : "none";
        }
    }

    // Función para actualizar la cantidad de productos
    function actualizarCarrito() {
        document.querySelectorAll(".cantidad-input").forEach(input => {
            const index = input.dataset.index;
            let nuevaCantidad = parseInt(input.value);

            if (isNaN(nuevaCantidad) || nuevaCantidad < 1) {
                nuevaCantidad = 1;
                input.value = 1;
            }

            pedido[index].cantidad = nuevaCantidad;
            pedido[index].total = pedido[index].precio * nuevaCantidad;
        });

        renderizarCarrito(); // Actualizar la vista del carrito
    }

    function mostrarBotonActualizar() {
        const botonActualizar = document.getElementById("actualizar-carrito");
        if (botonActualizar) {
            botonActualizar.style.display = "block"; // Asegurar que el botón se muestre cuando el usuario cambia la cantidad
        }
    }

    // Función para eliminar un producto del carrito
    function eliminarProducto(event) {
        const index = event.target.dataset.index;
        pedido.splice(index, 1); // Elimina el producto del array

        if (pedido.length === 0) {
            localStorage.removeItem("pedido");
            carritoLista.innerHTML = "<p>No hay productos en el carrito.</p>";
            subtotalElement.textContent = "Subtotal: $0";
            impuestoElement.textContent = "Impuesto (7%): $0";
            totalElement.textContent = "Total a Pagar: $0";
        } else {
            renderizarCarrito();
        }

        actualizarVisibilidadBotones(); // Verificar visibilidad de los botones
        actualizarVisibilidadDesglose();
        actualizarVisibilidadBotonMenu();
        actualizarCarritoHeader();
    }

    // Evento para actualizar el carrito
    botonActualizar.addEventListener("click", () => {
        actualizarCarrito();
    });

    // Evento para finalizar la orden
    botonFinalizar.addEventListener("click", () => {
        const numeroOrden = Math.floor(100000 + Math.random() * 900000); // Genera un número aleatorio
        localStorage.setItem("numero-orden", numeroOrden); // Guarda el número de orden en localStorage

        localStorage.removeItem("pedido"); // Limpia el carrito después de finalizar
        window.location.href = "order-confirmation.html"; // Redirige a la página de confirmación
    });

    // Evento para seguir comprando
    botonSeguirComprando.addEventListener("click", () => {
        window.location.href = "products.html"; // Redirige a la página de productos
    });

    // Evento para regresar al menú principal cuando el carrito está vacío
    const botonRegresar = document.getElementById("regresar-menu");
    if (botonRegresar) {
        botonRegresar.addEventListener("click", () => {
            window.location.href = "../index.html";
        });
    }

    // Renderizar el carrito al cargar la página
    renderizarCarrito();
});
