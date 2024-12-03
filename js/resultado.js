// URL Endpoint com as informações do resultado da eleição
const urlGet = 'http://localhost:5058/api/eleicao/resultados';

// Chama as informações gerais
getResultado();

// Busca todas as informações
async function getResultado() {
    const resultado = await fetchUrl(urlGet, 'GET', "application/json");;
    atualizarResultado(resultado);
}

document.querySelector('#formFiltroSecao').addEventListener('submit', function (event) {
    event.preventDefault();
    filtrarDados(event, '#formFiltroSecao', 'secaoId').then(dados => {
        atualizarResultado(dados);
    });
})

document.querySelector('#formFiltroZona').addEventListener('submit', function (event) {
    event.preventDefault();
    filtrarDados(event, '#formFiltroZona', 'zonaId').then(dados => {
        atualizarResultado(dados);
    });
})

// Atualiza as informações na tela
function atualizarResultado(resultado) {
    if (resultado && resultado.totalVotosValidos > 0) {
        document.querySelector('#lista-candidatos').innerHTML = '';

        atualizarValores([
            ['#votos-validos', '#numeroVotosValidos', 'innerText', formatString(resultado.totalVotosValidos)],
            ['#votos-validos', '#porcentagemVotosValidos', 'innerText', Math.ceil(resultado.percentualVotosValidos) + '%']
        ])

        resultado.candidatos.sort((a, b) => b.quantidadeVotos - a.quantidadeVotos);

        resultado.candidatos.length > 0 && resultado.candidatos.forEach((candidato, index) => {
            if (index == 0) {
                criarItemCandidato(candidato, true);
                atualizarVencedor(candidato);
                return;
            }
            criarItemCandidato(candidato);
        })
    } else { alerta('error'); }
}

function atualizarVencedor(candidato) {
    atualizarValores([
        ['#item-vencedor', '#nome-candidato', 'innerText', candidato.nomeCandidato],
        ['#item-vencedor', '#total-votos', 'innerText', formatString(candidato.quantidadeVotos)]
    ])
}