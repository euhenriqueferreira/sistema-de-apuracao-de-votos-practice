const urlGet = 'http://localhost:5058/api/eleicao/importacoes-secoes'

// Busca todas as informações
async function getDados(){
    const dados  = await fetchUrl(urlGet, 'GET', "application/json");
    atualizarAcompanhamento(dados);
}

getDados();

// Busca as informações de uma Seção
document.querySelector('#formFiltroSecao').addEventListener('submit', function(event){
    event.preventDefault();
    filtrarAcompanhamento(event, '#formFiltroSecao', 'secaoId');
})

// Busca as informações de uma Zona Eleitoral
document.querySelector('#formFiltroZona').addEventListener('submit', function(event){
    event.preventDefault();
    filtrarAcompanhamento(event, '#formFiltroZona', 'zonaId');
})

async function filtrarAcompanhamento(evento, elemento, parametroPesquisa){
    const dados = await filtro(evento, parametroPesquisa, urlGet);
    atualizarAcompanhamento(dados)
    atualizarValor(elemento, 'input', 'value', '')
}

function atualizarAcompanhamento(dados){
    if(dados && dados.totalSecoes > 0){
        atualizarValor('#sessoes', '#numeroSessoes', 'innerText', formatString(dados.secoesImportadas));
        atualizarValor('#sessoes', '#porcentagemSessoes', 'innerText', Math.ceil(dados.secoesImportadas / dados.totalSecoes * 100) + "%");

        atualizarValor('#votos', '#numeroVotos', 'innerText', formatString(dados.totalEleitoresPresentes));
        atualizarValor('#votos', '#porcentagemVotos', 'innerText', dados.percentualPresentes + "%");
        
        atualizarValor('#abstencoes', '#numeroAbstencoes', 'innerText', formatString(dados.totalAbstencoes));
        atualizarValor('#abstencoes', '#porcentagemAbstencoes', 'innerText', dados.percentualAbstencoes + "%");

        if(dados.totalSecoes > 1){
            css('#barra-de-progresso', 'div', 'display', 'block');
            css('#barra-de-progresso', 'div', 'width', Math.ceil(dados.secoesImportadas / dados.totalSecoes * 100) + "%");
            alerta();
        } else{
            css('#barra-de-progresso', null, 'display', 'none');
            criarAviso()
        }
    } else{alerta('error');}
}


