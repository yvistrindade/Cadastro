// Buscar CEP
function buscarCEP() {
    let cep = document.getElementById('inputCEPClient').value;
    let urlAPI = `https://viacep.com.br/ws/${cep}/json/`;

    fetch(urlAPI)
        .then(response => response.json())
        .then(dados => {
            document.getElementById('inputAddressClient').value = dados.logradouro;
            document.getElementById('inputNeighborhoodClient').value = dados.bairro;
            document.getElementById('inputCityClient').value = dados.localidade;
            document.getElementById('inputUFClient').value = dados.uf;
        })
        .catch(error => console.log(error));
}

// Capturar o foco na busca pelo nome do cliente
const foco = document.getElementById('searchClient');

// criar um vetor global para extrair os dados do cliente 
let arrayClient = []

document.addEventListener('DOMContentLoaded', () => {
    btnUpdate.disabled = true;
    btnDelete.disabled = true;
    foco.focus();
});

// Captura dos inputs do formulário
let frmClient = document.getElementById('frmClient');
let nameClient = document.getElementById('inputNameClient');
let cpfClient = document.getElementById('inputCPFClient');
let emailClient = document.getElementById('inputEmailClient');
let phoneClient = document.getElementById('inputPhoneClient');
let cepClient = document.getElementById('inputCEPClient');
let addressClient = document.getElementById('inputAddressClient');
let numberClient = document.getElementById('inputNumberClient');
let complementClient = document.getElementById('inputComplementClient');
let neighborhoodClient = document.getElementById('inputNeighborhoodClient');
let cityClient = document.getElementById('inputCityClient');
let ufClient = document.getElementById('inputUFClient');

// ============================================================
// == Validação do CPF ========================================
function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0, resto;

    for (let i = 1; i <= 9; i++) soma += parseInt(cpf[i - 1]) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[9])) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf[i - 1]) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf[10])) return false;

    return true;
}

// Evento para validar CPF enquanto o usuário digita
cpfClient.addEventListener('input', () => {
    let mensagemCPF = document.getElementById('mensagem-cpf');

    if (!validarCPF(cpfClient.value)) {
        mensagemCPF.textContent = "CPF inválido!";
        mensagemCPF.style.color = "red";
    } else {
        mensagemCPF.textContent = "";
    }
});

// ============================================================
// == CRUD Create/Update ======================================
frmClient.addEventListener('submit', async (event) => {
    event.preventDefault();

    const client = {
        nameCli: nameClient.value,
        cpfCli: cpfClient.value,
        emailCli: emailClient.value,
        phoneCli: phoneClient.value,
        cepCli: cepClient.value,
        addressCli: addressClient.value,
        numberCli: numberClient.value,
        complementCli: complementClient.value,
        neighborhoodCli: neighborhoodClient.value,
        cityCli: cityClient.value,
        ufCli: ufClient.value
    };

    api.newClient(client);
});

// == Fim CRUD Create/Update ==================================
// ============================================================

// ============================================================
// == CRUD Read ===============================================
 
function searchC() {
    // console.log("teste do botão buscar")
    // Capturar o nome a ser pesquisado (Passo 1)
    let cliName = document.getElementById('searchClient').value
    console.log(cliName) // Teste do passo 1
    //enviar o nome do cliente ao main passo 2
    api.searchName(cliName)
    //receber os dados do cliente (passo 5)
    api.renderClient((event,client) => {
        // teste de recebimento de dados do cliente 
        console.log(client)
        // passo 6 rederização de dados do cliente (preencher os inputs dp form) - nao esquecer de converter os dados do string para JSON
        const clientData = JSON.parse(client)
        arrayClient = clientData
        // uso do forEach para percorrer o vetor e extrair os dados
        arrayClient.forEach((c) => {
            nameClient.value = c.nomeCliente
            cpfClient.value = c.cpfCliente
            emailClient.value = c.emailCliente
            phoneClient.value = c.foneCliente
            cepClient.value = c.cepCliente
            addressClient.value = c.logradouroCliente
            numberClient.value = c.numeroCliente
            complementClient.value = c.complementoCliente
            neighborhoodClient.value = c.bairroCliente
            cityClient.value = c.cidadeCliente
            ufClient.value = c.ufCliente
        })
    })
 }
  
 // == Fim - CRUD Read =========================================
 // ============================================================

// ============================================================
// == Reset Form ==============================================
function resetForm() {
    location.reload();
}

api.resetForm((args) => {
    resetForm();
});
// == Fim Reset Form ==========================================
//=============================================================
