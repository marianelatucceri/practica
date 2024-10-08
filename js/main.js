// Creo un div padre para vincular el js al html
const contenedorProd = document.getElementById("contenedorProduct");

const verCarrito = document.getElementById("verCarrito");

const modalContainer = document.getElementById("modal-container");

const cantidadCarrito = document.getElementById("cantidadCarrito");

const modalFinal = document.getElementById("modal.finalizar");

const formularioFooter = document.getElementById("form-footer");


// Carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
                  

const getProducts = async () => {
    const response = await fetch ("data.json");
    const data = await response.json();

    data.forEach((producto) => {
        let contenedor = document.createElement("div");  //Creo elem
        contenedor.className = "card"; //Asigno clase
        
        contenedor.innerHTML = `
          <img src="${producto.img}">
          <h3>${producto.nombre}</h3>    
          <p class="precio">$${producto.precio}</p>
        `;   //Creo las etiquetas del HTML
    
        contenedorProd.append(contenedor);  //Llamo al div padre y le agrego todo el contenido del contenedor
    
        // Boton Agregar al carrito
        let agregarCarrito = document.createElement("button"); 
        agregarCarrito.innerText = "Agregar al carrito"; 
        agregarCarrito.className = "boton"; 
    
        contenedor.append(agregarCarrito); 
    
        // EVENTO (cada vez que el usuario haga click sobre el boton, se pushea el producto dentro del carrito)
        agregarCarrito.addEventListener("click", () =>{
            const repeat = carrito.some((repeatProduct) => repeatProduct.id === producto.id); //Some: me devuelve un booleano
            
            if (repeat){
                carrito.map((prod) => {
                    if (prod.id === producto.id){
                        prod.cantidad++;
                    }
                });
            } else {
               carrito.push({
                 id: producto.id,
                 nombre: producto.nombre,
                 precio: producto.precio,
                 img: producto.img,
                 cantidad: producto.cantidad,
                });
                carritoContador();
                localSave();   // setItem (localStorage)
            }

            Toastify({
                text: "Producto agregado al carrito",
                duration: 1000,
                destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                gravity: "top",
                position: "right", 
                stopOnFocus: true, 
                offset: {
                    x: "1.5rem", 
                    y: "1.5rem", 
                  },
                style: {
                  background: "rgba(44, 42, 42, 0.699)",
                },
                onClick: function(){} 
            }).showToast();
        });
    });
};

getProducts();



// localStorage
const localSave = () => {
    
    localStorage.setItem("carrito", JSON.stringify(carrito));
    localStorage.setItem("formFooter", JSON.stringify(formularioFooter));
    
}

JSON.parse(localStorage.getItem("carrito"));
JSON.parse(localStorage.getItem("formFooter"));
 

// EVENTO del carrito y creación del modal que muestra el interior 
const pintarCarrito = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "block";
    // Cuando clikeo el carrito vuelvo a ver su contenido

    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
      <h1 class="modal-header-titulo">Carrito</h1>
    `;

    modalContainer.append(modalHeader);
    // Creamos el Header de la ventana

    const modalButton = document.createElement("h2");
    modalButton.innerText = "X";
    modalButton.className = "modal-header-button";

    // Cuando clickeo la X la ventana se cierra
    modalButton.addEventListener("click", () =>{
        modalContainer.style.display = "none";
    });   // Estilo display none de css

    modalHeader.append(modalButton);

    // Creamos los productos que se muestran por ventana
    carrito.forEach((producto) => {
        let carritoContent = document.createElement("div");
        carritoContent.className = "modal-content";
        carritoContent.innerHTML = `
          <img src="${producto.img}">
          <h3>${producto.nombre}</h3>    
          <p class="precio">$${producto.precio}</p>
          <span class="restar"> - </span>
          <p>Cantidad: ${producto.cantidad}</p>
          <span class="sumar"> + </span>
          <p>Total: $${producto.cantidad * producto.precio}</p>
          <span class="delete-product"> ✕ </span>  
        `;

        modalContainer.append(carritoContent);


        //Restar productos
        let restar = carritoContent.querySelector(".restar");
        restar.addEventListener("click", () => {
            if(producto.cantidad !== 1) {
               producto.cantidad--;
            }
            pintarCarrito();
            localSave();
        });

        //Sumar productos
        let sumar = carritoContent.querySelector(".sumar");
        sumar.addEventListener("click", () => {
            producto.cantidad++;
            pintarCarrito();
            localSave();
        });


        //Eliminar productos
        let eliminar = carritoContent.querySelector(".delete-product");
        eliminar.addEventListener("click", () => {
            eliminarProducto(producto.id);

            Toastify({
                text: "Producto eliminado",
                duration: 1000,
                destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                gravity: "top",
                position: "right", 
                stopOnFocus: true, 
                offset: {
                    x: "1.5rem", 
                    y: "1.5rem", 
                  },
                style: {
                  background: "rgba(44, 42, 42, 0.699)",
                },
                onClick: function(){} 
            }).showToast();
        });
    });


    // Footer de ventana con el Total de productos
    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
                            //acumulador //cada producto      
    const totalPrecio = document.createElement("div");
    totalPrecio.className = "total-content";
    totalPrecio.innerHTML = `total a pagar: $${total}`;

    modalContainer.append(totalPrecio);

    // Boton para Finalizar Compra
    const finalizarCompra = document.createElement("button");
    finalizarCompra.innerText = "Finalizar compra";
    finalizarCompra.className = "finalizar-compra";
    modalContainer.append(finalizarCompra);

    finalizarCompra.addEventListener("click", () => {
        abrirFormularioCompra();
    });
};

verCarrito.addEventListener("click", pintarCarrito);

// Función para eliminar el producto del carrito
const eliminarProducto = (id) => {
    const foundId = carrito.find ((elemento) => elemento.id === id);

    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId;
    });

    carritoContador();

    localSave();

    pintarCarrito();
};

// Contador de prod del carrito
const carritoContador = () => {
    cantidadCarrito.style.display = "block";

    const carritoLength = carrito.length;
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
}
carritoContador();

// Modal Finalizar Compra
const abrirFormularioCompra = () => {
    modalContainer.innerHTML = "";
    modalContainer.style.display = "block";
  
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
        <h1 class="modal-header-titulo">Finalizar Compra</h1>
      `;
    modalContainer.append(modalHeader);
  
    const modalButton = document.createElement("h2");
    modalButton.innerText = "X";
    modalButton.className = "modal-header-button";
    modalButton.addEventListener("click", () => {
      modalContainer.style.display = "none";

    });
    modalHeader.append(modalButton);

    const formulario = document.createElement("form");
    formulario.className = "formulario-compra";
    formulario.innerHTML = `
        <label for="nombre">Nombre y Apellido:</label>
        <input type="text" id="nombre" name="nombre" required><br><br>
        <label for="nombre">Número de tarjeta débito/crédito:</label>
        <input type="text" id="tarjeta" name="Número de tarjeta" required><br><br>
        <label for="nombre">Nombre y Apellido del titular:</label>
        <input type="text" id="nombretarjeta" name="nombretarjeta" required><br><br>
        <label for="nombre">Fecha de Vencimiento:</label>
        <input type="date" id="date" name="date" required><br><br>
        <label for="nombre">Código de seguridad:</label>
        <input type="text" id="codigo" name="codigo" required><br><br>
        <label for="direccion">Dirección:</label>
        <input type="text" id="direccion" name="direccion" required><br><br>
        <button type="submit" class="confirmar-compra">Confirmar Compra</button>
    `;
  
  modalContainer.append(formulario);

  formulario.addEventListener("submit", (e) => {
    e.preventDefault();


    const nombre = document.getElementById("nombre").value;
    const direccion = document.getElementById("direccion").value;


    modalContainer.innerHTML = `
          <h2 class="h2-m">Gracias, ${nombre}!</h2>
          <p class="p-m">Su pedido será enviado a la dirección: ${direccion} en las próximas 2 horas.</p>
          <button class="cerrar-modal">Cerrar</button>
        `;

    const cerrarModalBtn = document.querySelector(".cerrar-modal");
    cerrarModalBtn.addEventListener("click", () => {
      modalContainer.style.display = "none";

    });  
  }) 
};

// Footer
formularioFooter.addEventListener ("submit", validarFormulario);

function validarFormulario(e){
    e.preventDefault();

    const nombreForm = document.getElementById("nombreForm").value;
    const email = document.getElementById("email").value;   

    Swal.fire({
        position: "center",
        icon: "success",
        title: "¡Bienvenido/a al Reino!",
        text: `${nombreForm}, te enviaremos toda la info al email ${email}`,
        showConfirmButton: false,
        timer: 3500,
        customClass: {
            title: "titulo"
        }
    }); 

    localSave()
};

const respuesta = document.getElementById("boton-form");
respuesta.addEventListener("submit", () => {
    validarFormulario();
});










  























