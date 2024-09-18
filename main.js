// Creo un div padre para vincular el js al html
let contenedorProd = document.getElementById("contenedorProduct");

// Array de productos
let productos = [
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
console.log(productos)

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
});