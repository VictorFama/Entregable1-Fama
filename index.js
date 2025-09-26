const CLIENTES = [  
  { nombre: `Victor`,   alias: `victor`,    pin: `1234`, saldo: 50000,  movimientos: [] },
  { nombre: `Martin`,   alias: `martin`,    pin: `2222`, saldo: 120000, movimientos: [] },
  { nombre: `Alicia`,   alias: `alicia`,    pin: `9999`, saldo: 35000,  movimientos: [] },
  { nombre: `Ruben`,    alias: `ruben`,     pin: `9999`, saldo: 85000,  movimientos: [] }
];


document.querySelector('.form-container').addEventListener('submit', function(event) {
    event.preventDefault();

    const alias = document.getElementById('alias').value;
    const pin = document.getElementById('pin').value;

    const usuario = CLIENTES.find(c => c.alias.trim() === alias.trim() && c.pin === pin);
        if (usuario) {
            localStorage.setItem('user', JSON.stringify({ alias: usuario.alias, nombre: usuario.nombre }));
            window.location.href = 'principal.html'
        }else {
            alert(`Alias o PIN incorrecto.`);
        }
});
