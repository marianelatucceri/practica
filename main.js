// Creo un div padre para vincular el js al html
const contenedorProd = document.getElementById("contenedorProduct");

const verCarrito = document.getElementById("verCarrito");

const modalContainer = document.getElementById("modal-container");

// Array de productos
const productos = [
    {
     id: 1,
     nombre: "Gin Flowers & Berries", 
     precio: 23000,
     img: "assets/flowers.berries.png",
    },
    {
     id: 2,
     nombre: "Gin London Dry", 
     precio: 20000,
     img: "assets/london.dry.png",
    },
    {
     id: 3,
     nombre: "Whisky Blanco",
     precio: 50000,
     img: "assets/whisky.blanco.png",
    },
];


// Carrito
let carrito = [];


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

    let agregarCarrito = document.createElement("button"); //Creamos elemento
    agregarCarrito.innerText = "Agregar al carrito"; // Agregamos el texto del boton
    agregarCarrito.className = "boton"; // Le asigno una clase al boton

    contenedor.append(agregarCarrito); //Le agrego el boton al div 

    // EVENTO (cada vez que el usuario haga click sobre el boton, se pushea el producto dentro del carrito)
    agregarCarrito.addEventListener("click", () =>{
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            img: producto.img,
        });
        console.log(carrito);
    });
});


// EVENTO del carrito y creación de la ventana que muestra el interior 
verCarrito.addEventListener("click", () => {
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
        `;

        modalContainer.append(carritoContent);
    });
    

    // Footer de ventana con el Total de productos
    const total = carrito.reduce((acc, el) => acc + el.precio, 0);
                            //acumulador //cada producto      
    const totalPrecio = document.createElement("div");
    totalPrecio.className = "total-content";
    totalPrecio.innerHTML = `total a pagar: $${total}`;

    modalContainer.append(totalPrecio);
});