let button = document.getElementById("botao-buscar"); // Obtém o elemento do botão usando seu ID
let campo = document.getElementById("campo-pokemon"); // Obtém o elemento do campo de entrada usando seu ID

campo.addEventListener("keydown", function (e) {  // Adiciona um ouvinte de evento para a tecla pressionada no campo de entrada
    if (e.key === "Enter") { // Verifica se a tecla pressionada é "Enter"
        button.click(); // Simula um clique no botão para acionar a busca do Pokémon
    }
});

button.addEventListener("click", async function () { // Adiciona um ouvinte de evento para o clique do botão
    let valor = campo.value.toLowerCase().trim(); // Obtém o valor do campo de entrada, converte para minúsculas e remove espaços extras
    let resultado = document.getElementById("info-pokemon"); // Obtém o elemento onde os resultados serão exibidos usando seu ID

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
        <p>Fraquezas: ${fraquezas}</p>
        <p>Resistencias: ${resistencias}</p>
        <p>Imunidades: ${imunidades}</p>
        `;

} catch (error) { // Bloco catch para lidar com erros que possam ocorrer durante a execução do código dentro do bloco try
    resultado.innerHTML = "<p>Pokémon não encontrado. Tente novamente.</p>";
    console.log("error:", error);
}
});