let nome = document.getElementById('edNome');
let nm = document.getElementById('nome');
let periodo = document.getElementById('periodo');
let freq = document.getElementById('frequencia');
let tbody = document.getElementById('tbody');
let erro = document.getElementById('erro');

const Buscar = async () => {
    tbody.innerHTML = '';
    nm.innerHTML = '';
    if (nome.value != '') {
        erro.innerHTML = '';


        // Criando o Efeito de Carregar
        let loading = document.createElement('h1');
        loading.innerHTML = 'Loading...';
        document.body.appendChild(loading);

        //Consulta a API 
        const response = await fetch(`https://servicodados.ibge.gov.br/api/v2/censos/nomes/${nome.value}`)
        //Pega apenas o Json
        const data = await response.json();
        //Retira o Efeito de carregando
        nome.value = '';

        loading.innerHTML = '';
        if (data != '') {
            for (let i in data) {
                nm.innerHTML = data[i]['nome']

                tbody.innerHTML = '';
                for (const p of data[i]['res']) {
                    let tr = tbody.insertRow();
                    let td_periodo = tr.insertCell();
                    let td_frequencia = tr.insertCell();
                    td_periodo.innerHTML = p['periodo'].replaceAll('[', '')
                    td_frequencia.innerHTML = p['frequencia']
                }
            }
        }
        else {
            erro.innerHTML = 'Nome não Encontrado!'
        }

    }
    else {
        erro.innerHTML = 'Informe um Nome!';
    }
}

document.getElementById('form').addEventListener('submit', event => {
    event.preventDefault();
    Buscar()
})
