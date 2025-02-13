//traigo los productos del localStorage
let productosEncarrito = localStorage.getItem("productos-en-carrito");

productosEncarrito = JSON.parse(productosEncarrito);

const contenedorCarritoVacio= document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total")
const botonComprar = document.querySelector("#carrito-acciones-comprar");


function cargarProductosCarrito(){

    if (productosEncarrito && productosEncarrito.length > 0) {

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
        contenedorCarritoProductos.innerHTML = "";
    
        productosEncarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Titulo</small>
                    <h3>${producto.titulo}</h3>
                </div>
                        
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
        
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
        
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                
                <button class="carrito-producto-eliminar" id="${producto.id}">
                    <i class="bi bi-trash"></i>
                </button>
            `;
            contenedorCarritoProductos.appendChild(div);
        });
    } else {
    
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }
    actualizarBotonesEliminar();
    actualizarTotal();

}

cargarProductosCarrito();



//Botones de borrar productos
function actualizarBotonesEliminar(){
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");      

    botonesEliminar.forEach(boton => {boton.addEventListener("click",EliminarDelCarrito);
    });
}

function EliminarDelCarrito(e){
    const idBoton = e.currentTarget.id;
    const index = productosEncarrito.findIndex(producto => producto.id === idBoton);

    productosEncarrito.splice(index,1);
    cargarProductosCarrito();
    localStorage.setItem("productos-en-carrito",JSON.stringify(productosEncarrito));
}

botonVaciar.addEventListener("click",vaciarCarrito);

function vaciarCarrito(){

    productosEncarrito.length = 0;
    localStorage.setItem("productos-en-carrito",JSON.stringify(productosEncarrito));
    cargarProductosCarrito();
}


//Desectructuración
function actualizarTotal() {
    const totalCalculado = productosEncarrito.reduce(
        (acc, { precio, cantidad }) => acc + (precio * cantidad),
        0
    );
    contenedorTotal.innerText = `$${totalCalculado}`;
}


botonComprar.addEventListener("click", comprarCarrito);

function comprarCarrito(){

    productosEncarrito.length = 0;
    localStorage.setItem("productos-en-carrito",JSON.stringify(productosEncarrito));



    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");

}

