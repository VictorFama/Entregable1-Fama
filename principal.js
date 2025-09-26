const CLIENTES = [  
  { nombre: `Victor`,   alias: `victor`,    pin: `1234`, saldo: 50000,  movimientos: [] },
  { nombre: `Martin`,   alias: `martin`,    pin: `2222`, saldo: 120000, movimientos: [] },
  { nombre: `Alicia`,   alias: `alicia`,    pin: `9999`, saldo: 35000,  movimientos: [] },
  { nombre: `Ruben`,    alias: `ruben`,     pin: `9999`, saldo: 85000,  movimientos: [] }
];

const user = localStorage.getItem('user');
const nombre = JSON.parse(user || 'null')?.nombre ?? null;
const alias = JSON.parse(user || 'null')?.alias ?? null;

const generalDiv = document.createElement('div');
generalDiv.className = 'container py-4';
generalDiv.innerHTML = `<h1 class="bienvenida">Bienvenido: <strong>${nombre}</strong></h1>`;
document.body.appendChild(generalDiv);

const radiosDiv = document.getElementById('radios'); 
generalDiv.appendChild(radiosDiv)

let descDiv = document.getElementById('actionDesc');
if (!descDiv) {
  descDiv = document.createElement('div');
  descDiv.id = 'actionDesc';
  descDiv.className = 'container py-3';
  radiosDiv.insertAdjacentElement('afterend', descDiv);
}

function renderDesc(html) {
  descDiv.innerHTML = html;
}

const selected = document.querySelector('input[name="radioDefault"]:checked');
if (selected) {
  console.log('id:', selected.id);
  console.log('value:', selected.value);
  const labelText = document.querySelector(`label[for="${selected.id}"]`)?.textContent.trim();
  console.log('label:', labelText);
}

function showBalance() {

    const user = CLIENTES.find(c => c.alias === alias);
    const saldo = user?.saldo ?? 0;

    renderDesc(`
        <div class="container text-center mb-4">
            <div class="row justify-content-center">
                <div class="col-8 card">
                    <div class="card-body">
                    <h5 class="card-title mb-2">Saldo Actual.</h5>
                    <p class="mb-0">Tu saldo es: <strong>$${(saldo)}</strong>.</p>
                    </div>
                </div>
            </div>
        </div>
    `);
    addLogoutButton();
}

function showDeposit() {
  renderDesc(`
    <div class="container text-center mb-4">
        <div class="row justify-content-center">
            <div class="col-8 card">
                <div class="card-body">
                    <h5 class="card-title mb-2">Deposito</h5>
                    <p class="mb-2">Ingrese la cantidad que desea depositar.</p>
                    <div class="input-group">
                    <span class="input-group-text">$</span>
                    <input id="depositAmount" type="number" min="1" class="form-control" placeholder="Cantidad">
                    <button class="btn btn-custom" id="btnDeposit">Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  `);

  addLogoutButton();
}

function showWithdraw() {
  renderDesc(`
    <div class="container text-center mb-4">
        <div class="row justify-content-center">
            <div class="col-8 card">
                <div class="card-body">
                    <h5 class="card-title mb-2">Retiro</h5>
                    <p class="mb-2">Ingrese la cantidad que desea retirar.</p>
                    <div class="input-group">
                    <span class="input-group-text">$</span>
                    <input id="withdrawAmount" type="number" min="1" class="form-control" placeholder="Cantidad">
                    <button class="btn btn-custom" id="btnWithdraw">Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  `);
  addLogoutButton();
}

function showTransfer() {
  renderDesc(`
    <div class="container text-center mb-4">
        <div class="row justify-content-center">
            <div class="col-8 card">
                <div class="card-body">
                    <h5 class="card-title mb-2">Transferencia</h5>
                    <p class="mb-2">Enviar dinero a otro usuario.</p>
                    <div class="row g-2">
                    <div class="col-md-6">
                        <input id="toAlias" type="text" class="form-control" placeholder="Recipient alias">
                    </div>
                    <div class="col-md-6">
                        <div class="input-group">
                        <span class="input-group-text">$</span>
                        <input id="transferAmount" type="number" min="1" class="form-control" placeholder="Amount">
                        </div>
                    </div>
                    <div class="col-12">
                        <button class="btn btn-custom" id="btnTransfer">Confirm</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  `);
  addLogoutButton();
}

function showHistory() {
  renderDesc(`
    <div class="container text-center mb-4">
        <div class="row justify-content-center">
            <div class="col-8 card">
                <div class="card-body">
                    <h5 class="card-title mb-2">Historial</h5>
                    <p class="mb-0">Consulta tus depositos, retiros y transferencias recientes.</p>
                </div>
            </div>
        </div>
    </div>
  `);
  addLogoutButton();
}

function addLogoutButton() {
  const logoutDiv = document.createElement('div');
  logoutDiv.className = 'text-center mt-3';
  logoutDiv.innerHTML = `
    <button class="btn btn-danger" id="btnLogout">Cerrar sesión</button>
  `;
  descDiv.appendChild(logoutDiv);

  document.getElementById('btnLogout').addEventListener('click', () => {
    localStorage.removeItem('user');
    window.location.href = 'index.html';
  });
}


document.addEventListener('change', (e) => {
  if (e.target.name === 'radioDefault') {
    const { id, value } = e.target;
    const labelText = document.querySelector(`label[for="${id}"]`)?.textContent.trim();

    console.log('Seleccionado:', { id, value, labelText });

    // Ejemplo: actuar según la opción
    switch (id) {
      case 'Balance':   showBalance();  break;
      case 'Deposit':   showDeposit();  break;
      case 'Withdraw':  showWithdraw(); break;
      case 'Transfer':  showTransfer(); break;
      case 'History':   showHistory();  break;
    }
  }
});