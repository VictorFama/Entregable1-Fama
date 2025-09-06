
const CLIENTES = [  
  { nombre: `Victor`,   alias: `victor`,    pin: `1234`, saldo: 50000,  movimientos: [] },
  { nombre: `Martin`,   alias: `martin`,    pin: `2222`, saldo: 120000, movimientos: [] },
  { nombre: `Alicia`,   alias: `alicia`,    pin: `9999`, saldo: 35000,  movimientos: [] },
  { nombre: `Ruben`,    alias: `ruben`,     pin: `9999`, saldo: 85000,  movimientos: [] }
];

const MAX_INTENTOS = 3;

let sesion = null;

//Funcion para loguearse, tiene un maximo de intentos definido en la variable MAX_INTENTOS
function login(maxIntentos) {
    for(let i = 1;  i <= maxIntentos; i++) {
        const alias = prompt(`Ingrese su alias:`);
        if (alias === null) return false;
        const pin = prompt(`Ingrese su PIN:`);
        if (pin === null) return false;
        const usuario = CLIENTES.find(c => c.alias.trim() === alias.trim() && c.pin === pin);
        if (usuario) {
            sesion = usuario;
            return true;
        }else {
            alert(`Alias o PIN incorrecto. Te quedan ${maxIntentos - i} intentos.`);
            if (i === maxIntentos) {
            alert(`Has agotado tus intentos. Vuelve a iniciar el simulador.`);
            return false;
            }
        }
    }
}

//Funcion para consultar el saldo actual del usuario logueado
function consultarSaldo() {
    alert(`Tu saldo actual es: $${sesion.saldo.toFixed(2)}`);
}

//Funcion para registrar el deposito, actualizar el saldo y agregar la transaccion al historial de movimientos
function depositar() {
    const deposito = parseFloat(prompt(`Ingrese el monto a depositar:`));
    //Si deposito no es un numero o es menor o igual a 0 muestra mensaje de error.
    if (isNaN(deposito) || deposito <= 0) {
        alert(`Monto invalido. El deposito debe ser un numero positivo.`);
        return;
    }
    sesion.saldo += deposito;
    alert(`Deposito exitoso. Nuevo saldo: $${sesion.saldo.toFixed(2)}`);
    sesion.movimientos.push({ tipo: `DEPOSITO`, monto: deposito, saldoActual: sesion.saldo, fecha: new Date() });
}


//Funcion para registrar el retiro, actualizar el saldo y agregar la transaccion al historial de movimientos
function retirar() {
    const retiro = parseFloat(prompt(`Ingrese el monto a retirar:`));
    //Si retiro no es un numero o es menor o igual a 0 muestra mensaje de error.
    if (isNaN(retiro) || retiro <= 0) {
        alert(`Monto invalido. El retiro debe ser un numero positivo.`);
        return;
    }
    if (retiro > sesion.saldo) {
        alert(`Fondos insuficientes para realizar el retiro.`);
        return;
    }
    sesion.saldo -= retiro;
    alert(`Retiro exitoso. Nuevo saldo: $${sesion.saldo.toFixed(2)}`);
    sesion.movimientos.push({ tipo: `RETIRO`, monto: retiro, saldoActual: sesion.saldo, fecha: new Date() });
}


//Funcion para transferir dinero a otro cliente, actualiza ambos saldos y agrega la transferencia a a los historiales de movimientos de ambos clientes
function transferir() {
    //Muestro los clientes disponibles para transferir sacando al usuario actual
    const clientesDisponibles = CLIENTES.filter(c => c.alias !== sesion.alias);
    if (clientesDisponibles.length === 0) {
        alert(`No hay otros clientes disponibles para transferir.`);
        return;
    }
    let listaClientes = `Clientes disponibles para transferir:\n`;
    clientesDisponibles.forEach(c => {
        listaClientes += `  - ${c.nombre} (Alias: ${c.alias})\n`;
    });
    const aliasDestino = prompt(listaClientes + `\nIngrese el alias del destinatario:`);
    if (aliasDestino === sesion.alias) {
        alert(`No podes transferirte a vos mismo`);
        return;
    }
    if (aliasDestino === null) return;
    const clienteDestino = CLIENTES.find(c => c.alias.trim() === aliasDestino.trim());
    if (!clienteDestino) {
        alert(`Alias de destinatario no encontrado.`);
        return;
    }
    const montoTransferencia = parseFloat(prompt(`Ingrese el monto a transferir:`));
    if (isNaN(montoTransferencia) || montoTransferencia <= 0) {
        alert(`Monto invalido. La transferencia debe ser un numero positivo.`);
        return;
    }
    if (montoTransferencia > sesion.saldo) {
        alert(`Fondos insuficientes para realizar la transferencia.`);
        return;
    }
    sesion.saldo -= montoTransferencia;
    clienteDestino.saldo += montoTransferencia;
    alert(`Transferencia exitosa a ${clienteDestino.nombre}. Nuevo saldo: $${sesion.saldo.toFixed(2)}`);
    sesion.movimientos.push({ tipo: `TRANSFERENCIA ENVIADA`, monto: montoTransferencia, saldoActual: sesion.saldo, fecha: new Date(), destinatario: clienteDestino.nombre });
    clienteDestino.movimientos.push({ tipo: `TRANSFERENCIA RECIBIDA`, monto: montoTransferencia, saldoActual: clienteDestino.saldo, fecha: new Date(), remitente: sesion.nombre });
}

//Funcion para ver el historial de movimientos del usuario actual
function verHistorial(){
    //Si no hay movimientos muestra mensaje de alerta
    if (sesion.movimientos.length === 0) {
        alert(`No hay movimientos para mostrar.`);
        return;
    }
    //Si hay movimientos genero el historial y lo muestro por consola
    let historial = `Historial de movimientos de ${sesion.nombre}:\n`;
    sesion.movimientos.forEach(mov => {
        historial += `${mov.fecha.toLocaleString()}: ${mov.tipo}`;
        if (mov.monto) historial += ` - Monto: $${mov.monto.toFixed(2)}`;
        if (mov.saldoActual) historial += ` - Saldo actual: $${mov.saldoActual.toFixed(2)}`;
        if (mov.destinatario) historial += ` - Destinatario: ${mov.destinatario}`;
        if (mov.remitente) historial += ` - Remitente: ${mov.remitente}`;
        historial += `\n`;
    });
    console.log(historial);
    alert(`El historial de movimientos se ha registrado en la consola.`);
    return;
}

function cerrarSesion() {
    if (confirm(`Estas seguro que deseas cerrar sesion?`)) {
        sesion = null;
        alert(`Sesion cerrada.`);
        return true;
    }
    return false;
}

function mostrarMenu() {
    return prompt(`Bienvenido, ${sesion.nombre}.
    Seleccione una opción:
    1) Consultar saldo
    2) Depositar
    3) Retirar
    4) Transferir
    5) Ver historial de movimientos
    6) Cerrar sesion
    7) Salir`)
}

function main() {
    const logueado = login(MAX_INTENTOS);
    if (!logueado) return;
    let activo = true;
    while (activo) {
        const opcion = mostrarMenu();
        if (opcion === null) {
            
        if (confirm(`Deseas salir del simulador?`)) break;
        else continue;
        }

    switch (opcion.trim()) {
        case `1`:
            consultarSaldo();
            break;
        case `2`:
            depositar();
            break;
        case `3`:
            retirar();
            break;
        case `4`:
            transferir();
            break;
        case `5`:
            verHistorial();
            break;
        case `6`:
            const opcionCerrarSesion = cerrarSesion();
            if (opcionCerrarSesion){
                return main();
            }
            break;
        case `7`:
            if (confirm(`Confirmas que queres salir?`)) {
                activo = false;
                alert(`Gracias por utilizar el simulador. Nos vemos.`);
            }
            break;
        default:
            alert(`Opcion invalida. Elegi un numero del 1 al 7.`);
        break;
    }
  }
 console.log(`Simulador finalizado.`);
}

main();