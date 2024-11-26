const urlPostSessao = 'http://localhost:5058/api/eleicao/importacoes-secoes'
document.querySelector('#sessao').addEventListener('change', (event)=>{lerArquivo(event, urlPostSessao)});