// URL Endpoint de Importação de Seções
const urlPostSessao = 'http://localhost:5058/api/eleicao/importacoes-secoes'

// Detecta a mudança no input de arquivo e chama a função ler arquivo
document.querySelector('#sessao').addEventListener('change', (event) => { lerArquivos(event, urlPostSessao) });