let carrito = [];

const carritoElemento = document.getElementById("cart");
const overlay = document.getElementById("cartOverlay");
const abrirCarrito = document.getElementById("abrirCarrito");
const cerrarCarrito = document.getElementById("cerrarCarrito");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const contadorCarrito = document.getElementById("contadorCarrito");
const volverArriba = document.getElementById("volverArriba");


/* ================= CARRITO ================= */

function actualizarCarrito() {

    cartItems.innerHTML = "";

    if (carrito.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Tu carrito está vacío.
            </p>
        `;

    } else {

        carrito.forEach((producto, index) => {

            const elemento = document.createElement("div");

            elemento.className = "cart-product";

            elemento.innerHTML = `
                <div>
                    <strong>${producto.nombre}</strong>
                    <p>${producto.precio.toFixed(2)} €</p>
                </div>

                <div>
                    <button onclick="cambiarCantidad(${index}, -1)">−</button>
                    <span>${producto.cantidad}</span>
                    <button onclick="cambiarCantidad(${index}, 1)">+</button>
                </div>
            `;

            cartItems.appendChild(elemento);

        });

    }

    actualizarTotal();

}


/* ================= AÑADIR PRODUCTO ================= */

function añadirProducto(nombre, precio) {

    const productoExistente = carrito.find(
        producto => producto.nombre === nombre
    );

    if (productoExistente) {

        productoExistente.cantidad++;

    } else {

        carrito.push({
            nombre: nombre,
            precio: precio,
            cantidad: 1
        });

    }

    actualizarCarrito();

    mostrarMensaje("Producto añadido al carrito 🛒");

}


/* ================= BOTONES AÑADIR ================= */

const botonesAñadir = document.querySelectorAll(".add-button");

botonesAñadir.forEach(boton => {

    boton.addEventListener("click", () => {

        const nombre = boton.dataset.name;
        const precio = Number(boton.dataset.price);

        añadirProducto(nombre, precio);

    });

});


/* ================= CAMBIAR CANTIDAD ================= */

function cambiarCantidad(index, cantidad) {

    carrito[index].cantidad += cantidad;

    if (carrito[index].cantidad <= 0) {

        carrito.splice(index, 1);

    }

    actualizarCarrito();

}


/* ================= TOTAL ================= */

function actualizarTotal() {

    let total = 0;
    let cantidadTotal = 0;

    carrito.forEach(producto => {

        total += producto.precio * producto.cantidad;

        cantidadTotal += producto.cantidad;

    });

    cartTotal.textContent =
        total.toFixed(2).replace(".", ",") + " €";

    contadorCarrito.textContent = cantidadTotal;

}


/* ================= ABRIR CARRITO ================= */

abrirCarrito.addEventListener("click", () => {

    carritoElemento.classList.add("open");

    overlay.classList.add("open");

});


/* ================= CERRAR CARRITO ================= */

function cerrarCarritoFuncion() {

    carritoElemento.classList.remove("open");

    overlay.classList.remove("open");

}

cerrarCarrito.addEventListener(
    "click",
    cerrarCarritoFuncion
);

overlay.addEventListener(
    "click",
    cerrarCarritoFuncion
);


/* ================= FILTROS ================= */

const filtros = document.querySelectorAll(".filter");

const productos = document.querySelectorAll(".product-card");

filtros.forEach(filtro => {

    filtro.addEventListener("click", () => {

        filtros.forEach(f => {
            f.classList.remove("active");
        });

        filtro.classList.add("active");

        const categoria = filtro.dataset.filter;

        productos.forEach(producto => {

            if (
                categoria === "todos" ||
                producto.dataset.category === categoria
            ) {

                producto.style.display = "";

            } else {

                producto.style.display = "none";

            }

        });

    });

});


/* ================= CATEGORÍAS ================= */

const categorias = document.querySelectorAll(".category-card");

categorias.forEach(categoria => {

    categoria.addEventListener("click", () => {

        const categoriaSeleccionada =
            categoria.dataset.category;

        document
            .querySelectorAll(".filter")
            .forEach(filtro => {

                filtro.classList.remove("active");

                if (
                    filtro.dataset.filter ===
                    categoriaSeleccionada
                ) {

                    filtro.classList.add("active");

                }

            });

        productos.forEach(producto => {

            if (
                producto.dataset.category ===
                categoriaSeleccionada
            ) {

                producto.style.display = "";

            } else {

                producto.style.display = "none";

            }

        });

        document
            .getElementById("menu")
            .scrollIntoView({
                behavior: "smooth"
            });

    });

});


/* ================= MENSAJES ================= */

function mostrarMensaje(texto) {

    const mensaje =
        document.getElementById("formMessage");

    if (!mensaje) return;

    mensaje.textContent = texto;

    setTimeout(() => {

        mensaje.textContent = "";

    }, 3000);

}


/* ================= FORMULARIO ================= */

const formulario =
    document.getElementById("contactForm");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const formMessage =
        document.getElementById("formMessage");

    formMessage.textContent =
        "¡Mensaje enviado correctamente! ✅";

    formulario.reset();

});


/* ================= FINALIZAR PEDIDO ================= */

const finalizarPedido =
    document.getElementById("finalizarPedido");

finalizarPedido.addEventListener("click", () => {

    if (carrito.length === 0) {

        alert("Tu carrito está vacío.");

        return;

    }

    let pedido = "Hola, quiero hacer este pedido:%0A%0A";

    carrito.forEach(producto => {

        pedido +=
            `${producto.cantidad}x ${producto.nombre} - ${(producto.precio * producto.cantidad).toFixed(2)} €%0A`;

    });

    const total = carrito.reduce(
        (suma, producto) =>
            suma + producto.precio * producto.cantidad,
        0
    );

    pedido +=
        `%0ATotal: ${total.toFixed(2)} €`;

    window.open(
        `https://wa.me/34600000000?text=${pedido}`,
        "_blank"
    );

});


/* ================= VOLVER ARRIBA ================= */

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        volverArriba.classList.add("show");

    } else {

        volverArriba.classList.remove("show");

    }

});


volverArriba.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* ================= VER MENÚ ================= */

function verMenu() {

    document
        .getElementById("menu")
        .scrollIntoView({
            behavior: "smooth"
        });

}
