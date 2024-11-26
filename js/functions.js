function lerArquivo(event, url){
    const arquivo = event.target.files[0];
    if(arquivo){
        const leitor = new FileReader();
        leitor.onload = function(event){
            try{
                const dados = JSON.parse(event.target.result);
                fetchUrl(url, 'POST', dados);
            } catch(error){
                console.log("Erro ao ler json:", error);
            }
        }
        leitor.readAsText(arquivo);
    } else{
        console.log("Nenhum arquivo encontrado");
    }
}

async function filtro(evento, parametro, url){
    const id = evento.target.querySelector('input')?.value;
    const dados = await fetchUrl(`${url}?${parametro}=${id}`, "GET");
    
    parametro == 'zonaId' && (atualizarValor('#aviso-wrapper', null, 'innerHTML', `<p>*Informações sobre a Zona Eleitoral: ${id}</p>`));
    parametro == 'secaoId' && (atualizarValor('#aviso-wrapper', null, 'innerHTML', `<p>*Informações sobre a Zona Eleitoral: ${id}</p>`));
    alerta('success');
    return dados;
}

async function fetchUrl(url, method, dados = null){
    try{
        const response = await fetch(url, {
            method: method,
            headers: {'Content-Type': 'application/json'},
            ...(method === 'POST' && { body: JSON.stringify(dados)} )
        })
        
        if (method == 'POST' && !response.ok) {
            const errorData = await response.json();
            throw new Error(`Erro ${response.status}: ${errorData.error || response.statusText}`);
        }

        if(method == 'POST'){
            alerta('success');    
        }

        if(method == 'GET'){
            const data = await response.json();
            return data;
        }
    }catch (error) {
        console.error('Erro na requisição:', error.message);
        alerta('error');    
    }
}

function atualizarValor(elemento, subElemento = null, propriedade, valor){
    if(subElemento){
        document.querySelector(elemento).querySelector(subElemento) && (document.querySelector(elemento).querySelector(subElemento)[propriedade] = valor);
    } else{
        document.querySelector(elemento) && (document.querySelector(elemento)[propriedade] = valor);
    }
}

function css(elemento, subElemento = null, propriedade, valor){
    if(subElemento){
        document.querySelector(elemento).querySelector(subElemento) && (document.querySelector(elemento).querySelector(subElemento).style[propriedade] = valor);
    } else{
        document.querySelector(elemento) && (document.querySelector(elemento).style[propriedade] = valor);
    }
}

function criarItemCandidato(candidato, vencedor = null){
    const candidatoEl = `
        <div class="w-full h-[60px] rounded-md shadow-md  ${vencedor ? 'bg-accent border-2 border-primary' : 'bg-primary sm:hover:bg-secondary'} flex justify-between items-center pl-5 text-white transition">
            <div class="grow text-base sm:text-xl">${candidato.nomeCandidato}</div>
            <div class="px-5 text-base sm:text-lg border-r-2 border-gray-400 totalVotos">${formatString(candidato.quantidadeVotos)}</div>
            <div class="px-5 text-base sm:text-lg porcentagemVotos">${Math.ceil(candidato.percentualVotos)}%</div>
        </div>
    `;

    const listaEl = document.querySelector('#lista-candidatos');
    listaEl && (listaEl.innerHTML += candidatoEl);
}

function alerta(tipo){
    const alertas = ['success', 'error'];
    alertas.forEach((alerta)=>{
        document.querySelector(`.alert-${alerta}`).classList.add('hidden');
        
        if(alerta == tipo){
            document.querySelector(`.alert-${alerta}`).classList.remove('hidden');
        }

    })
}

function formatString(string){
    return string.toLocaleString('pt-br');
}


const menuMobile = document.querySelector('#side-menu');
document.querySelector('#toggleMenu').addEventListener('click', function(e){
    e.stopPropagation();

    menuMobile.classList.toggle('active');
    if(menuMobile.classList.contains('active')){
        css('#side-menu', null, 'right', '16px');
    } else{
        css('#side-menu', null, 'right', '-80px');
    }
})

document.querySelector('body').addEventListener('click', function(event){
    if(!(event.target.classList.contains('side-menu')) && !(event.target.classList.contains('toggleMenu'))){
        menuMobile.classList.remove('active');
        css('#side-menu', null, 'right', '-80px');
    }
})

