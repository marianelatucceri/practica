// Creo un div padre para vincular el js al html
const contenedorProd = document.getElementById("contenedorProduct");

const verCarrito = document.getElementById("verCarrito");

const modalContainer = document.getElementById("modal-container");

const cantidadCarrito = document.getElementById("cantidadCarrito");

// Array de productos
const productos = [
    {
     id: 1,
     nombre: "Gin Flowers & Berries", 
     precio: 23000,
     img: "assets/flowers.berries.png",
     cantidad: 1,
    },
    {
     id: 2,
     nombre: "Gin London Dry", 
     precio: 20000,
     img: "assets/london.dry.png",
     cantidad: 1,
    },
    {
     id: 3,
     nombre: "Whisky Blanco",
     precio: 50000,
     img: "assets/whisky.blanco.png",
     cantidad: 1,
    },
    {
     id: 4,
     nombre: "Tripel Beer", 
     precio: 4000,
     img: "assets/tripel.png",
     cantidad: 1,
    },
    {
     id: 5,
     nombre: "Apa Beer", 
     precio: 4200,
     img: "assets/apa.png",
     cantidad: 1,
    },
];


// Carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
                     // getItem (localStorage)          // O  // Array vacío

// Método forEach para recorrer el Array
productos.forEach((producto) => {
    let contenedor = document.createElement("div");  // Creamos elemento
    contenedor.className = "card";  // Le asigno una clase al contenedor
    
    contenedor.innerHTML = `
      <img src="${producto.img}">
      <h3>${producto.nombre}</h3>    
      <p class="precio">$${producto.precio}</p>
    `;   // Creamos las etiquetas del HTML

    contenedorProd.append(contenedor);  //Llamo al div padre y le agrego todo el contenido del contenedor

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
    });
});



// localStorage
const localSave = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

JSON.parse(localStorage.getItem("carrito"));  



// EVENTO del carrito y creación de la ventana que muestra el interior 
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
        });
    });


    // Footer de ventana con el Total de productos
    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
                            //acumulador //cada producto      
    const totalPrecio = document.createElement("div");
    totalPrecio.className = "total-content";
    totalPrecio.innerHTML = `total a pagar: $${total}`;

    modalContainer.append(totalPrecio);
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
    // Agrego una variable al localStorage

    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
}

carritoContador();