//Todos mis elementos...

//Array de contactos
const contactos = [];
let recuperoContactos = JSON.parse(localStorage.getItem("contactos"));

//Array de movimientos
const movimientos = [];
let recuperoMovimientos = JSON.parse(localStorage.getItem("movimientos"));
//Array de ahorros
const ahorros = [];

//Objeto de datos usuario
const datosUsuario = {};
let recuperoDatosUsuario = JSON.parse(localStorage.getItem("datosUsuario"));

//Objeto fecha
const hoy = new Date();

//Variables
let dineroIngresado; 
let dineroRetirado;
let dinero=0;
let recuperoDinero = JSON.parse(localStorage.getItem("dinero"));
let movimiento;
let contacto;
//estee
let agregaContacto;


// Elementos DOM
let listadoMovimientos = document.getElementById("listadoMovimientos");
let contenedorBilletera = document.getElementById("contenedorBilletera");
let contenedorBeneficios = document.getElementById("contenedorBeneficios");
let contenedorContactos = document.getElementById("contenedorContactos");


