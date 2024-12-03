// URL Endpoint com as informações de acompanhamento da eleição
const urlGet = 'http://localhost:5058/api/eleicao/importacoes-secoes'


getDados();


// Busca todas as informações
async function getDados() {
    const dados = await fetchUrl(urlGet, 'GET', "application/json");
    console.log(dados);
    atualizarAcompanhamento(dados);
}

document.querySelector('#formFiltroSecao').addEventListener('submit', function (event) {
    event.preventDefault();
    filtrarDados(event, '#formFiltroSecao', 'secaoId').then(dados => {
        atualizarAcompanhamento(dados);
    });
})

document.querySelector('#formFiltroZona').addEventListener('submit', function (event) {
    event.preventDefault();
    filtrarDados(event, '#formFiltroZona', 'zonaId').then(dados => {
        atualizarAcompanhamento(dados);
    });
})

//Atualiza as informações na tela
function atualizarAcompanhamento(dados) {
    if (dados && dados.totalSecoes > 0) {
        atualizarValores([
            ['#sessoes', '#numeroSessoes', 'innerText', formatString(dados.secoesImportadas)],
            ['#sessoes', '#porcentagemSessoes', 'innerText', Math.ceil(dados.secoesImportadas / dados.totalSecoes * 100) + "%"],
            ['#votos', '#numeroVotos', 'innerText', formatString(dados.totalEleitoresPresentes)],
            ['#votos', '#porcentagemVotos', 'innerText', dados.percentualPresentes + "%"],
            ['#abstencoes', '#numeroAbstencoes', 'innerText', formatString(dados.totalAbstencoes)],
            ['#abstencoes', '#porcentagemAbstencoes', 'innerText', dados.percentualAbstencoes + "%"]
        ])

        if (dados.totalSecoes > 1) {
            css('#barra-de-progresso', 'div', 'display', 'block');
            css('#barra-de-progresso', 'div', 'width', Math.ceil(dados.secoesImportadas / dados.totalSecoes * 100) + "%");
            alerta();
        } else {
            css('#barra-de-progresso', null, 'display', 'none');
            alerta('success')
        }
    } else { alerta('error'); }
}


