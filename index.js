//Creo el array de clientes con sus datos de alias y pin
const CLIENTES = [  
  { name: `Victor`,   alias: `victor`,    pin: `1234`},
  { name: `Martin`,   alias: `martin`,    pin: `2222`},
  { name: `Alicia`,   alias: `alicia`,    pin: `9999`},
  { name: `Ruben`,    alias: `ruben`,     pin: `9999`}
];

//Cuando se envia el formulario de login
document.querySelector('.form-container').addEventListener('submit', function(event) {
    event.preventDefault();

    //Obtengo los valores de alias y pin ingresados en el formulario
    const alias = document.getElementById('alias').value;
    const pin = document.getElementById('pin').value;

    const user = CLIENTES.find(c => c.alias.trim() === alias.trim() && c.pin === pin);
        if (user) {
            localStorage.setItem('user', JSON.stringify({ alias: user.alias, name: user.name }));
            window.location.href = 'principal.html'
        }else {
            alert(`Alias o PIN incorrecto.`);
        }
});
