let button = document.getElementById("botao-buscar"); // Obtém o elemento do botão usando seu ID
let campo = document.getElementById("campo-pokemon"); // Obtém o elemento do campo de entrada usando seu ID

async function buscarPokemon(valor) {
    let resultado = document.getElementById("info-pokemon");

    if (!valor) { // Verifica se o valor do campo de entrada está vazio, o ! significa "não"
        resultado.innerHTML = "<p>Por favor, insira o nome do Pokémon.</p>";
        return;
    }

    try { // Início do bloco try para lidar com erros
        resultado.innerHTML = "<p>Carregando...</p>"; // Exibe uma mensagem de carregamento enquanto os dados estão sendo buscados

        let resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${valor}`); // Faz uma requisição para a API do Pokémon usando o valor do campo de entrada

        if (!resposta.ok) { // Verifica se a resposta da API não foi bem-sucedida
            throw new Error("Pokémon não encontrado");
        }

        let dados = await resposta.json(); // Converte a resposta da API para um objeto JavaScript
        let respostaSpecies = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${valor}`);
        let dadosSpecies = await respostaSpecies.json();

        let urlEvolucao = dadosSpecies.evolution_chain.url; // Obtém a URL da cadeia de evolução do Pokémon
        let respostaEvolucao = await fetch(urlEvolucao); // Faz uma requisição para a URL da cadeia de evolução
        let dadosEvolucao = await respostaEvolucao.json(); // Converte a resposta da API para um objeto JavaScript
        
        function montarEvolucoes(no) { // Função recursiva para montar a cadeia de evolução do Pokémon
            let nome = no.species.name; // Obtém o nome do Pokémon na cadeia de evolução

            let resultado = `<span class="evolucao" data-nome="${nome}" style="cursor:pointer; color: purple; text-decoration: underline;"> 
                ${nome.charAt(0).toUpperCase() + nome.slice(1)}</span>`; // Formata o nome do Pokémon para que a primeira letra seja maiúscula e as demais minúsculas, e adiciona um span com uma classe e um atributo de dados para o nome do Pokémon

            if (no.evolves_to.length > 0) { // Verifica se o Pokémon evolui para outro Pokémon
               let proximas = no.evolves_to.map(evo => montarEvolucoes(evo));
               resultado += " → " + proximas.join(" | "); // Adiciona as evoluções seguintes à string de resultado, separadas por uma seta e um pipe
            }
            return resultado;
        }

        let evolucaoFormatada = montarEvolucoes(dadosEvolucao.chain);



        let descricao = ""; // Inicializa uma string para armazenar a descrição do Pokémon
        for (let entry of dadosSpecies.flavor_text_entries) { // Loop para percorrer as entradas de texto de sabor e encontrar a descrição em português
            if (entry.language.name === "pt-br") { // Verifica se a linguagem da entrada é português do Brasil
                descricao = entry.flavor_text;
                break; // Encerra o loop após encontrar a primeira descrição em português
            }
        }
        //fallback em inglês
        if (!descricao) {
            for (let entry of dadosSpecies.flavor_text_entries) {
                if (entry.language.name === "en") { // Verifica se a linguagem da entrada é inglês
                    descricao = entry.flavor_text;
                    break; // Encerra o loop após encontrar a primeira descrição em inglês
                }
            }
        }

        descricao = descricao.replace(/\f/g, " ").replace(/\n/g, " "); // Remove caracteres de form feed e nova linha da descrição    

        let nome = dados.name.charAt(0).toUpperCase() + dados.name.slice(1); // Formata o nome do Pokémon para que a primeira letra seja maiúscula e as demais minúsculas

        let tipos = ""; // Inicializa uma string para armazenar os tipos do Pokémon
        for (let t of dados.types) { // Loop para percorrer os tipos do Pokémon e adicionar seus nomes à string
            tipos += t.type.name + " "; // Adiciona o nome do tipo à string, seguido de um espaço
        }

        let danos = {}; // Inicializa um objeto para armazenar os tipos de dano e seus multiplicadores

        //LOOP PRINCIPAL
        for (let t of dados.types) { // Loop para percorrer os tipos do Pokémon e buscar as informações de dano para cada tipo
            let tipoNome = t.type.name;

            let respostaTipo = await fetch(`https://pokeapi.co/api/v2/type/${tipoNome}`); // Faz uma requisição para a API do Pokémon para obter as informações de dano do tipo
            let dadosTipo = await respostaTipo.json(); // Converte a resposta da API para um objeto JavaScript

            for (let f of dadosTipo.damage_relations.double_damage_from) { // Loop para percorrer os tipos que causam dano dobrado ao tipo do Pokémon e atualizar o objeto de danos
                let nomeTipo = f.name;

                if (danos[nomeTipo]) { // Verifica se o tipo já existe no objeto de danos, se sim, multiplica o valor por 2, caso contrário, define o valor como 2
                    danos[nomeTipo] *= 2; // Multiplica o valor existente por 2 para refletir o dano dobrado
                } else {
                    danos[nomeTipo] = 2; // Define o valor como 2 para indicar que o tipo causa dano dobrado
                }
            }

            
        for (let r of dadosTipo.damage_relations.half_damage_from) { // Loop para percorrer os tipos que causam dano reduzido ao tipo do Pokémon e atualizar o objeto de danos
            let nomeTipo = r.name;

            if (danos[nomeTipo]) {
                danos[nomeTipo] *= 0.5; // Multiplica o valor existente por 0.5 para refletir o dano reduzido
            } else {
                danos[nomeTipo] = 0.5; // Define o valor como 0.5 para indicar que o tipo causa dano reduzido
            }
        }

        for (let i of dadosTipo.damage_relations.no_damage_from) { // Loop para percorrer os tipos que não causam dano ao tipo do Pokémon e atualizar o objeto de danos
            let nomeTipo = i.name; // Obtém o nome do tipo que não causa dano
            danos[nomeTipo] = 0; // Define o valor como 0 para indicar que o tipo não causa dano
        }
        }


        let fraquezas = "";
        let resistencias = "";
        let imunidades = "";

        for (let tipo in danos) {
            if (danos[tipo] === 0) {
                imunidades += `${tipo} `;
            } else if (danos[tipo] > 1) {
                fraquezas += `${tipo} (x${danos[tipo]}) `;
            } else if (danos[tipo] < 1) {
                resistencias += `${tipo} (x${danos[tipo]}) `;
            }
        }

    resultado.innerHTML = `
        <h2>${nome}</h2>
        <img src="${dados.sprites.front_default || 'https://via.placeholder.com/150'}">
        <p>Tipo: ${tipos.trim()}</p>
        <p>Descrição: ${descricao}</p>
        <p>Evolução: ${evolucaoFormatada}</p>
        <p>Fraquezas: ${fraquezas}</p>
        <p>Resistencias: ${resistencias}</p>
        <p>Imunidades: ${imunidades}</p>
        <button id="btn-favorito">Adicionar aos Favoritos</button>
        `; // Atualiza o conteúdo HTML do elemento de resultado para exibir as informações do Pokémon, incluindo nome, imagem, tipo, descrição, evolução, fraquezas, resistências, imunidades e um botão para adicionar aos favoritos

        let btnFav = document.getElementById("btn-favorito");
        
        if (btnFav){
        btnFav.addEventListener("click", function () {
            let favoritos = JSON.parse(localStorage.getItem("favoritos")) || []; // Obtém a lista de favoritos do localStorage ou inicializa como um array vazio

            if (!favoritos.some(f => f.nome === valor.toLowerCase())) { // Verifica se o Pokémon já está nos favoritos, comparando o nome do Pokémon com os nomes na lista de favoritos} 
                favoritos.push({
                    nome: valor.toLowerCase(),
                    imagem: dados.sprites.front_default
                });
                localStorage.setItem("favoritos", JSON.stringify(favoritos)); // Salva a lista de favoritos atualizada no localStorage
                resultado.innerHTML += "<p>Pokémon adicionado aos favoritos!</p>"; // Exibe uma mensagem de confirmação para o usuário
            }else {
                alert("Pokemon já está nos favoritos!"); // Exibe um alerta para informar que o Pokémon já está nos favoritos
            }
            });
        }   

        let evolucoes = document.querySelectorAll(".evolucao"); // Seleciona todos os elementos com a classe "evolucao" para adicionar um ouvinte de evento de clique
            evolucoes.forEach(evo => {
                evo.addEventListener("click", function () { // Adiciona um ouvinte de evento de clique para cada elemento de evolução
                    let nome = evo.getAttribute("data-nome"); // Obtém o nome do Pokémon a partir do atributo de dados do elemento clicado
                    buscarPokemon(nome); // Chama a função buscarPokemon com o nome do Pokémon para exibir suas informações.
                });
        });

    mostrarFavoritos(); // Chama a função mostrarFavoritos para atualizar a lista de favoritos exibida na página após adicionar um novo favorito.

    } catch (error) { // Bloco catch para lidar com erros que possam ocorrer durante a execução do código dentro do bloco try
    resultado.innerHTML = "<p>Pokémon não encontrado. Tente novamente.</p>";
    console.log("error:", error);
    }
}

function mostrarFavoritos() {
    let lista = document.getElementById("lista-favoritos"); // Obtém o elemento da lista de favoritos usando seu ID
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || []; // Obtém a lista de favoritos do localStorage ou inicializa como um array vazio

    lista.innerHTML = "<h3>Favoritos:</h3>"; // Define o conteúdo HTML da lista de favoritos, começando com um título

    favoritos.forEach(pokemon => { // Loop para percorrer a lista de favoritos e adicionar cada Pokémon à lista
        lista.innerHTML += `
            <div style="margin: 10px; border: 1px solid #ccc; padding: 5px;">
                <img src="${pokemon.imagem}" width="50">

                <span class="fav-item" data-nome="${pokemon.nome}"
                    style="cursor:pointer; color: blue; margin-left: 10px;">
                ${pokemon.nome.charAt(0).toUpperCase() + pokemon.nome.slice(1)}
                </span>

                <button class="remover-fav" data-nome="${pokemon.nome}"
                    style="margin-left: 10px;">
                    &#10060;
                </button>
            </div>
            `; // Adiciona um bloco HTML para cada Pokémon favorito, incluindo uma imagem, o nome do Pokémon e um botão para remover dos favoritos
    });

    document.querySelectorAll(".remover-fav").forEach(btn => { // Seleciona todos os botões de remoção de favoritos usando a classe "remover-fav" para adicionar um ouvinte de evento de clique
        btn.addEventListener("click", function () {
            let nome = btn.getAttribute("data-nome"); // Obtém o nome do Pokémon a partir do atributo de dados do botão clicado

            let favoritos = JSON.parse(localStorage.getItem("favoritos")) || []; // Obtém a lista de favoritos do localStorage ou inicializa como um array vazio
            
            favoritos = favoritos.filter(f => f.nome !== nome); // Filtra a lista de favoritos para remover o Pokémon com o nome correspondente ao botão clicado
            
            localStorage.setItem("favoritos", JSON.stringify(favoritos)); // Atualiza a lista de favoritos no localStorage após remover o Pokémon

            mostrarFavoritos(); // Atualiza a lista de favoritos exibida na página após remover um favorito

        });
    });

    document.querySelectorAll(".fav-item").forEach(el => { // Seleciona todos os elementos com a classe "fav-item" para adicionar um ouvinte de evento de clique)
        el.addEventListener("click", function () { // Adiciona um ouvinte de evento de clique para cada elemento de favorito
           let nome = el.getAttribute("data-nome"); // Obtém o nome do Pokémon a partir do atributo de dados do elemento clicado
           buscarPokemon(nome); // Chama a função buscarPokemon com o nome do Pokémon para exibir suas informações 
        });
    });

}


campo.addEventListener("keydown", function (e) {  // Adiciona um ouvinte de evento para a tecla pressionada no campo de entrada
    if (e.key === "Enter") { // Verifica se a tecla pressionada é "Enter"
        buscarPokemon(campo.value.toLowerCase().trim()); // Simula um clique no botão para acionar a busca do Pokémon
    }
});

button.addEventListener("click", function () { // Adiciona um ouvinte de evento para o clique do botão
    let valor = campo.value.toLowerCase().trim(); // Obtém o valor do campo de entrada, converte para minúsculas e remove espaços extras
    buscarPokemon(valor); // Chama a função buscarPokemon com o valor do campo de entrada

    
});

mostrarFavoritos(); // Chama a função mostrarFavoritos para exibir a lista de favoritos quando a página é carregada pela primeira vez.