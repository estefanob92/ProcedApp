// Registro inicial y paso a Billetera
function registroInicial(){
    let btnRegistro = document.getElementById("btnRegistro");
    let contenedorHeader = document.getElementById("contenedorHeader");
    let bandaCotizaciones = document.getElementById("bandaCotizaciones");

    // Saluda Usuario 
    function saludoUsuario(valor){
        let saludaUsuario = document.getElementById("saludaUsuario");
        saludaUsuario.innerText = `Bienvenido ${valor}`;
    }

    //Dependiendo de si hay info en la memoria o no:
    if(recuperoDatosUsuario == null){
        btnRegistro.addEventListener("click",()=>{
            // Capturo los valores del registro y los guardo
            let inputRegistroNombre = document.getElementById("inputRegistroNombre");
            let inputRegistroApellido = document.getElementById("inputRegistroApellido");
            let inputRegistroDNI = document.getElementById("inputRegistroDNI");
            let inputRegistroEdad = document.getElementById("inputRegistroEdad");

            //capturo los datos del registro
            datosUsuario.nombre = inputRegistroNombre.value;
            datosUsuario.apellido = inputRegistroApellido.value;
            datosUsuario.dni = inputRegistroDNI.value;
            datosUsuario.edad = inputRegistroEdad.value;

            //funcion warning si no completa los datos de registro
            function warning (){
                let advertencia = document.getElementById("advertencia");
                advertencia.style.display = "block";
            }

            if((datosUsuario.nombre || warning())&&(datosUsuario.apellido || warning())&&(datosUsuario.dni || warning())&&(datosUsuario.edad || warning())){

                // guardo en local
                localStorage.setItem("datosUsuario",JSON.stringify(datosUsuario));

                // Oculto el registro y muestro la siguiente interfaz (billetera)
                contenedorRegistro.style.display="none";
                contenedorBilletera.style.display="flex";
                contenedorHeader.style.display="flex";
                bandaCotizaciones.style.display="inline-block"; 

                // saludo al usuario con su nombre
                saludoUsuario (datosUsuario.nombre);
            }
           
        })
    }
    else{
        // Saltea la parte de registro y pasa directo a billetera
        contenedorRegistro.style.display="none";
        contenedorBilletera.style.display="flex";
        contenedorHeader.style.display="flex";
        //bandaCotizaciones.style.display="inline-block";

        saludoUsuario(recuperoDatosUsuario.nombre);

        //traigo del local el dinero actual de la cuenta del usuario
        let estadoCuenta = document.getElementById("estadoDeCuenta");
        estadoCuenta.innerText = `$${recuperoDinero}`;

        //traigo del local el listado de movimientos a la card movimientos
        if(recuperoMovimientos != null){
            recuperoMovimientos.forEach(element => {
                let movGuardado = document.createElement("p");
                movGuardado.innerText = element;
                movGuardado.className = "movimiento";
                listadoMovimientos.append(movGuardado);
            });
        }

        //traigo del local los contactos agendados
        if(recuperoContactos != null){
            let contactoRecuperado;
            recuperoContactos.forEach(element => {
                contactoRecuperado = document.createElement("p");
                contactoRecuperado.innerText = `${element}`;
                contactoRecuperado.className = "contacto";
                contactoRecuperado.id = `${element}`;
                contenedorContactos.append(contactoRecuperado);

            });
        }
    }
}
// Mostrar los datos del usuario en pantalla
function botonMisDatos (){
    let botonMisDatos = document.getElementById("btnMisDatos");
    let contenedorDatosUsuario = document.getElementById("contenedorDatosUsuario");
    let ocultarDatosUsuario = document.getElementById("ocultarDatosUsuario");

    botonMisDatos.addEventListener("click",()=>{
        
        //muestro el contenedor con la informacion
        contenedorBilletera.style.display="none";
        contenedorDatosUsuario.style.display="flex"
        botonMisDatos.style.display="none";

        if(recuperoDatosUsuario == null){
            document.getElementById("mostrarDatiosUsuarioNombre").innerText=`Nombre: ${datosUsuario.nombre}`;
            document.getElementById("mostrarDatiosUsuarioApellido").innerText=`Apellido: ${datosUsuario.apellido}`;
            document.getElementById("mostrarDatiosUsuarioDNI").innerText=`DNI: ${datosUsuario.dni}`;
            document.getElementById("mostrarDatiosUsuarioEdad").innerText=`Edad: ${datosUsuario.edad}`; 
        }
        else{
            //traigo de la memoria el objeto datosUsuario
            /* datosUsuario == recuperoDatosUsuario; */
            document.getElementById("mostrarDatiosUsuarioNombre").innerText=`Nombre: ${recuperoDatosUsuario.nombre}`;
            document.getElementById("mostrarDatiosUsuarioApellido").innerText=`Apellido: ${recuperoDatosUsuario.apellido}`;
            document.getElementById("mostrarDatiosUsuarioDNI").innerText=`DNI: ${recuperoDatosUsuario.dni}`;
            document.getElementById("mostrarDatiosUsuarioEdad").innerText=`Edad: ${recuperoDatosUsuario.edad}`; 
        }

    })
    //oculto el contenedor
    ocultarDatosUsuario.addEventListener("click",()=>{
        contenedorBilletera.style.display="flex";
        contenedorDatosUsuario.style.display="none";
        botonMisDatos.style.display="flex";
    }) 
    
}
// Desplegables de las funcionalidades
function desplegables (){
    let desplegable;
    let desplegable2;
    let desplegable3;

    // Desplegable Ingresar Dinero
    function desplegarIngresar(){
        desplegable = document.getElementById("contenedorIngresar");

        //despliego
        let boton = document.getElementById("ingresar");
        boton.addEventListener("click",()=>{
            desplegable.style.display="flex";
            desplegable2.style.display="none";
            desplegable3.style.display="none";
        })

        //oculto
        let ocultar = document.getElementById("oculta");
        ocultar.addEventListener("click",()=>{desplegable.style.display="none";})
    }

    // Desplegable Retirar Dinero
    function desplegarRetirar(){
        desplegable2 = document.getElementById("contenedorRetirar");

        //despliego
        let boton = document.getElementById("retirar");
        boton.addEventListener("click",()=>{
            desplegable2.style.display="flex";
            desplegable.style.display="none";
            desplegable3.style.display="none";
        })

        //oculto
        let ocultar = document.getElementById("oculta2");
        ocultar.addEventListener("click",()=>{desplegable2.style.display="none";})
    }

    // Desplegable Transferir Dinero
    function desplegarTransferir(){
        desplegable3 = document.getElementById("contenedorTransferir");

        //despliego
        let boton = document.getElementById("transferir");
        boton.addEventListener("click",()=>{
            desplegable3.style.display="flex";
            desplegable.style.display="none";
            desplegable2.style.display="none";
        })

        //oculto
        let ocultar = document.getElementById("oculta3");
        ocultar.addEventListener("click",()=>{desplegable3.style.display="none";})
    }

    let desplegableBuscar;
    let desplegableAgregar;
    let desplegableEliminar;

    // Desplegable Buscar Contactos
    function desplegarBuscarContactos(){
        desplegableBuscar = document.getElementById("contenedorBuscar");

        //despliego
        let boton = document.getElementById("buscar");
        boton.addEventListener("click",()=>{
            desplegableBuscar.style.display="flex";
            desplegableAgregar.style.display="none";
            desplegableEliminar.style.display="none";
        })

        //oculto
        let ocultar = document.getElementById("ocultaBuscar");
        ocultar.addEventListener("click",()=>{desplegableBuscar.style.display="none";})
    }

    // Desplegable Agregar Contactos
    function desplegarAgregarContactos(){
        desplegableAgregar = document.getElementById("contenedorAgregar");

        //despliego
        let boton = document.getElementById("agregar");
        boton.addEventListener("click",()=>{
            desplegableAgregar.style.display="flex";
            desplegableBuscar.style.display="none";
            desplegableEliminar.style.display="none";
        })

        //oculto
        let ocultar = document.getElementById("ocultaAgregar");
        ocultar.addEventListener("click",()=>{desplegableAgregar.style.display="none";})
    }

    // Desplegable Eliminar Contactos
    function desplegarEliminarContactos(){
        desplegableEliminar = document.getElementById("contenedorEliminar");

        //despliego
        let boton = document.getElementById("eliminar");
        boton.addEventListener("click",()=>{
            desplegableEliminar.style.display="flex";
            desplegableAgregar.style.display="none";
            desplegableBuscar.style.display="none";
        })

        //oculto
        let ocultar = document.getElementById("ocultaEliminar");
        ocultar.addEventListener("click",()=>{desplegableEliminar.style.display="none";})
    }

    desplegarIngresar();
    desplegarRetirar();
    desplegarTransferir();
    desplegarBuscarContactos();
    desplegarAgregarContactos();
    desplegarEliminarContactos();
}
// Funcionalidades relacionadas al Dinero del usuario
function dineroUsuario (){

    // Ingresar Dinero
    function ingresarDinero (){
        let estadoCuenta = document.getElementById("estadoDeCuenta");
        let inputDineroIngresado = document.getElementById("inputIngresarDinero");
        let okIngresarDinero = document.getElementById("okIngresarDinero");

        okIngresarDinero.addEventListener("click",()=>{
            
            if(recuperoDinero == null){
                dineroIngresado = inputDineroIngresado.value;
                dinero += parseInt(dineroIngresado);
                estadoCuenta.innerText = `$${dinero}`;
                localStorage.setItem("dinero",JSON.stringify(dinero));
            }
            else{
                dinero = recuperoDinero;
                dineroIngresado = inputDineroIngresado.value;
                dinero += parseInt(dineroIngresado);
                estadoCuenta.innerText = `$${dinero}`;
                recuperoDinero += parseInt(dineroIngresado);
                localStorage.setItem("dinero",JSON.stringify(dinero));
            }

            // se genera el movimiento
            movimiento = `Has ingresado $${dineroIngresado} a tu cuenta el día ${hoy.toLocaleDateString()}.`;
            
            if(recuperoMovimientos == null){
                // se pushea al array
                movimientos.push(movimiento);
                localStorage.setItem("movimientos",JSON.stringify(movimientos));
            }
            else{
                recuperoMovimientos.push(movimiento);
                movimientos.push(movimiento);
                localStorage.setItem("movimientos",JSON.stringify(recuperoMovimientos));
            }

            let cadaMovimiento;

            if(recuperoMovimientos == null){
                // se sube el movimiento al listado de movimientos
                cadaMovimiento = document.createElement("p");
                cadaMovimiento.innerText = movimiento;
                cadaMovimiento.className = "movimiento";
                listadoMovimientos.append(cadaMovimiento);
            }
            else{
                // rama 2
                cadaMovimiento = document.createElement("p");
                cadaMovimiento.innerText = movimiento;
                cadaMovimiento.className = "movimiento";
                listadoMovimientos.append(cadaMovimiento);
            }

            //Toast
            Toastify({
                text: "Ingresaste dinero a tu cuenta",
                duration: 3000,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                background: "linear-gradient(to bottom, #6b3a66, #6b3a66)",
                },
                onClick: function(){} // Callback after click
            }).showToast();

        })
    }
    // Retirar Dinero
    function retirarDinero (){
        let estadoCuenta = document.getElementById("estadoDeCuenta");
        let inputDineroRetirado = document.getElementById("inputRetirarDinero");
        let okRetirarDinero = document.getElementById("okRetirarDinero");

        

        okRetirarDinero.addEventListener("click",()=>{
            dineroRetirado = inputDineroRetirado.value;






                if(recuperoDinero == null){    
                    // prueba validacion saldo negativo
                    dinero -= parseInt(dineroRetirado);
                    estadoCuenta.innerText = `$${dinero}`;
                    //guardo en memoria
                    localStorage.setItem("dinero",JSON.stringify(dinero)); 
                }
                else{
                   
                        dinero = recuperoDinero;
                        console.log(dinero);
                        dinero -= parseInt(dineroRetirado);
                        estadoCuenta.innerText = `$${dinero}`;
                        //guardo en memoria
                        recuperoDinero -= parseInt(dineroRetirado);
                        localStorage.setItem("dinero",JSON.stringify(dinero));
                    

                }

                // se genera el movimiento
                movimiento = `Has retirado $${dineroRetirado} de tu cuenta el día ${hoy.toLocaleDateString()}.`;

                if(recuperoMovimientos == null){
                    // se pushea al array
                    movimientos.push(movimiento);
                    localStorage.setItem("movimientos",JSON.stringify(movimientos));
                }
                else{
                    recuperoMovimientos.push(movimiento);
                    movimientos.push(movimiento);
                    localStorage.setItem("movimientos",JSON.stringify(recuperoMovimientos));
                }

                // se sube el movimiento al listado de movimientos
                let cadaMovimiento = document.createElement("p");
                cadaMovimiento.innerText = movimiento;
                cadaMovimiento.className = "movimiento";
                listadoMovimientos.append(cadaMovimiento);





                //Toast
                Toastify({
                    text: "Retiraste dinero de tu cuenta",
                    duration: 3000,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                    background: "linear-gradient(to bottom, #6b3a66, #6b3a66)",
                    },
                    onClick: function(){} // Callback after click
                }).showToast();






        })
    }
    // Trasnferir Dinero
    function transferirDinero (){
        let estadoCuenta = document.getElementById("estadoDeCuenta");
        let inputTransferirMonto = document.getElementById("inputTransferirMonto");
        let inputTransferirContacto = document.getElementById("inputTransferirContacto");
        let okTransferirDinero = document.getElementById("okTransferirDinero");

        //contacto a seleccionar de la lista en el dom
        const contactoASeleccionar = document.getElementsByClassName("contacto");

         for(const el of contactoASeleccionar){
            el.addEventListener("click",()=>{
                inputTransferirContacto.value = el.innerText;
            });
        } 

        //para poder seleccionar contactos recien agregados sin haber actualizado la pagina:
        
            inputTransferirContacto.addEventListener("click",()=>{
                agregaContacto.addEventListener("click",()=>{
                    inputTransferirContacto.value = agregaContacto.innerText;
                })
            })
        
            //hago click en ok en la funcion transferir
        okTransferirDinero.addEventListener("click",()=>{

            //monto a transferir
            if(recuperoDinero == null){
                dineroTransferido = inputTransferirMonto.value;
                dinero -= parseInt(dineroTransferido);
                estadoCuenta.innerText = `$${dinero}`;
            }
            else{
                dineroTransferido = inputTransferirMonto.value;
                dinero = recuperoDinero;
                dinero -= parseInt(dineroTransferido);
                estadoCuenta.innerText = `$${dinero}`;
                //guardo en memoria
                recuperoDinero -= parseInt(dineroTransferido);
                localStorage.setItem("dinero",JSON.stringify(dinero)); 
            }

            // se genera el movimiento
            movimiento = `Has transferido $${dineroTransferido} a ${inputTransferirContacto.value} el día ${hoy.toLocaleDateString()}.`;

            if(recuperoMovimientos == null){
                // se pushea al array
                movimientos.push(movimiento);
                localStorage.setItem("movimientos",JSON.stringify(movimientos));
            }
            else{
                recuperoMovimientos.push(movimiento);
                movimientos.push(movimiento);
                localStorage.setItem("movimientos",JSON.stringify(recuperoMovimientos));
            }

            // se sube el movimiento al listado de movimientos
            let cadaMovimiento = document.createElement("p");
            cadaMovimiento.innerText = movimiento;
            cadaMovimiento.className = "movimiento";
            listadoMovimientos.append(cadaMovimiento);
            


            //Toast
            Toastify({
                text: "Transferiste dinero de tu cuenta",
                duration: 3000,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                background: "linear-gradient(to bottom, #6b3a66, #6b3a66)",
                },
                onClick: function(){} // Callback after click
            }).showToast();
        })
    }

    ingresarDinero ();
    retirarDinero();
    transferirDinero();
}
// Funcionalidades relacionadas a los contactos del usuario
function contactosUsuario (){

    //Agregar contactos
    function agregarContactos (){

        document.getElementById("okAgregar").addEventListener("click",()=>{
            //capturo los contactos a agregar y los pusheo al array
            contacto = inputAgregarContacto.value;
            
            //muestro en el dom
            agregaContacto = document.createElement("p");
            agregaContacto.innerText = `${contacto}`;
            agregaContacto.className = "contacto";
            agregaContacto.id = `${contacto}`;
            contenedorContactos.append(agregaContacto);
                        
            //dependiendo si tenia ya o no contactos:
            if(recuperoContactos == null){
                contactos.push(contacto);
                localStorage.setItem("contactos",JSON.stringify(contactos));
            }
            else{
                recuperoContactos.push(contacto);
                localStorage.setItem("contactos",JSON.stringify(recuperoContactos));
            } 
        })
    }

    //Eliminar contactos
    function eliminarContactos (){
        let inputEliminarContacto = document.getElementById("inputEliminarContacto");
        let okEliminar = document.getElementById("okEliminar");
        
        okEliminar.addEventListener("click",()=>{
            let contactoAEliminar = inputEliminarContacto.value;

            if(recuperoContactos == null){
                contactos.splice(contactos.indexOf(contactoAEliminar),1);
                localStorage.setItem("contactos",JSON.stringify(contactos));
                //lo saco de la lista en el dom
                document.getElementById(`${contactoAEliminar}`).remove();
            }
            else{
                recuperoContactos.splice(recuperoContactos.indexOf(contactoAEliminar),1);
                localStorage.setItem("contactos",JSON.stringify(recuperoContactos));
                //lo saco de la lista en el dom
                document.getElementById(`${contactoAEliminar}`).remove();
            }

            //Toast
            Toastify({
                text: "Eliminaste un contacto",
                duration: 3000,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                background: "linear-gradient(to bottom, red, red)",
                },
                onClick: function(){} // Callback after click
            }).showToast();
        })
    }

    //Buscar contactos
    function buscarContactos (){
        let inputBuscarContacto = document.getElementById("inputBuscarContacto");
        let okBuscar = document.getElementById("okBuscar");
        let ocultaBuscar = document.getElementById("ocultaBuscar");

        // busco el contacto y lo muestro en la lista
        okBuscar.addEventListener("click",()=>{
            let contactoBuscado = inputBuscarContacto.value;
            
            if(recuperoContactos == null){
                let resultadoBuscarContacto = contactos.find(elementoBuscado => elementoBuscado == contactoBuscado);
                
                if(resultadoBuscarContacto != undefined){               
                    document.getElementById(`${resultadoBuscarContacto}`).className = "encontrado";

                    // volver a la lista completa al dar click en cerrar desplegable
                    ocultaBuscar.addEventListener("click",()=>{
                        document.getElementById(`${resultadoBuscarContacto}`).className = "contacto";
                    })
                }
                else{
                    //si no lo encuentro
                    alert("Contacto No encontrado");
                }
            }
            else{
                let resultadoBuscarContacto = recuperoContactos.find(elementoBuscado => elementoBuscado == contactoBuscado);

                if(resultadoBuscarContacto != undefined){               
                    document.getElementById(`${resultadoBuscarContacto}`).className = "encontrado";

                    // volver a la lista completa al dar click en cerrar desplegable
                    ocultaBuscar.addEventListener("click",()=>{
                        document.getElementById(`${resultadoBuscarContacto}`).className = "contacto";
                    })
                }
                else{
                    //si no lo encuentro
                    alert("Contacto No encontrado");
                }
            }
        })
    }

    agregarContactos ();
    eliminarContactos ();
    buscarContactos ();
}
// Muestro Beneficios (fetch)
function muestroBeneficios (){
    fetch('local/beneficios.json')
    .then( (res) => res.json())
    .then( (data) => {
        data.forEach((cadaBeneficio) => {
            const li = document.createElement('div');
            li.className = "listaDeBeneficios";
            li.innerHTML = `<img src="${cadaBeneficio.img}" width="110px" alt="logo"><p>${cadaBeneficio.producto}</p><p>${cadaBeneficio.descuento}</p>`;
            contenedorBeneficios.append(li);
        }
        )
    })
}
// vacío los inputs
function reseteoCampos(){
    const resetButtons = document.getElementsByClassName("reset");

    for(const el of resetButtons){
        el.addEventListener("click",()=>{

            const inputs = document.getElementsByTagName("input");
            for(const el of inputs){
                el.value = "";
            }
        })
    }


}


registroInicial();
botonMisDatos ();
desplegables ();
dineroUsuario ();
contactosUsuario ();
muestroBeneficios ();
reseteoCampos ();

















