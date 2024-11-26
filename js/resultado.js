const urlGetResultado = 'http://localhost:5058/api/eleicao/resultados';

// Chama as informações gerais
getResultado();

// Busca as informações de uma Seção
document.querySelector('#formFiltroSecao').addEventListener('submit', function(event){
    event.preventDefault();
    filtrarResultado(event, '#formFiltroSecao', 'secaoId');
})

// Busca as informações de uma Zona Eleitoral
document.querySelector('#formFiltroZona').addEventListener('submit', function(event){
    event.preventDefault();
    filtrarResultado(event, '#formFiltroZona', 'zonaId');
})

// Busca todas as informações
async function getResultado(){
    const resultado  = await fetchUrl(urlGetResultado, 'GET', "application/json");;
    atualizarResultado(resultado);
}

function atualizarResultado(resultado){
    if(resultado && resultado.totalVotosValidos > 0){
        document.querySelector('#lista-candidatos').innerHTML = '';
        console.log(resultado);
    
        atualizarValor('#votos-validos', '#numeroVotosValidos', 'innerText', formatString(resultado.totalVotosValidos));
        atualizarValor('#votos-validos', '#porcentagemVotosValidos', 'innerText', Math.ceil(resultado.percentualVotosValidos) + '%');
    
        resultado.candidatos.sort((a, b) => b.quantidadeVotos - a.quantidadeVotos);
    
        resultado.candidatos.length > 0 && resultado.candidatos.forEach((candidato, index) =>{
            if(index == 0){
                criarItemCandidato(candidato, true);
                atualizarVencedor(candidato);
                return;
            }
            criarItemCandidato(candidato);
        })
    } else{alerta('error');}
}

async function filtrarResultado(evento, elemento, parametroPesquisa){
    const resultado = await filtro(evento, parametroPesquisa, urlGetResultado);
    atualizarResultado(resultado);
    atualizarValor(elemento, 'input', 'value', '');
}

function atualizarVencedor(candidato){
    atualizarValor('#item-vencedor', '#nome-candidato', 'innerText', candidato.nomeCandidato);
    atualizarValor('#item-vencedor', '#total-votos', 'innerText', formatString(candidato.quantidadeVotos));
}