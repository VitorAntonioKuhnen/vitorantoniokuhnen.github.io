let nome = document.getElementById('edNome');
let nm  = document.getElementById('nome');
let periodo = document.getElementById('periodo');
let freq = document.getElementById('frequencia');
let tbody = document.getElementById('tbody');

const Buscar = async () => {

    // nome.value;
    // Criando o Efeito de Carregar
    let loading = document.createElement('h1');
    loading.innerHTML = 'Loading...';
    document.body.appendChild(loading);

    //Consulta a API 
    const response = await fetch(`https://servicodados.ibge.gov.br/api/v2/censos/nomes/${nome.value}`)
    //Pega apenas o Json
    const data = await response.json();

    //Retira o Efeito de carregando
    loading.innerHTML = '';

    for (let i in data) {
        nm.innerHTML = data[i]['nome']

        tbody.innerHTML = '';
        for (const p of data[i]['res']) {
            let tr = tbody.insertRow();
            let td_periodo = tr.insertCell();
            let td_frequencia = tr.insertCell();
            let period = p['periodo']
            td_periodo.innerHTML = period.replace([],'')
            td_frequencia.innerHTML = p['frequencia']

        }
    }
}    