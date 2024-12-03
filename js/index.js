// URL Endpoint de Configuração da Eleição
const urlPostConfig = 'http://localhost:5058/api/eleicao'

// Detecta a mudança no input de arquivo e chama a função ler arquivo
document.querySelector('#arquivo').addEventListener('change', (event) => { lerArquivos(event, urlPostConfig) });


