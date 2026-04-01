let button = document.getElementById("botao-buscar");
button.addEventListener("click", async function () {
    let campo = document.getElementById("campo-pokemon");
    let valor = campo.value.toLowerCase().trim();
    let resultado = document.getElementById("info-pokemon");
    if (!valor) {
        resultado.innerHTML = "<p>Por favor, insira o nome do Pokémon.</p>";
        return;
    }
    try {
        resultado.innerHTML = "<p>Carregando...</p>";
        let resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${valor}`);
        if(!resposta.ok){
            throw new Error("Pokémon não encontrado");
        }

        let dados = await resposta.json();
        let nome = dados.name.charAt(0).toUpperCase() + dados.name.slice(1);
        let tipos = "";
        for (let t of dados.types) {
            tipos += t.type.name + " ";

        };

        let tipoPrincipal = dados.types[0].type.name;
        let respostaTipo = await fetch(`https://pokeapi.co/api/v2/type/${tipoPrincipal}`);
        let dadosTipo = await respostaTipo.json();
        let fraquezas = "";
        for (let f of dadosTipo.damage_relations.double_damage_from) {
            fraquezas += f.name + " ";

        };

        tipos = tipos.trim();
        fraquezas = fraquezas.trim();

        resultado.innerHTML = `
    <h2>${nome}</h2>
    <img src="${dados.sprites.front_default || 'https://via.placeholder.com/150'}">
    <p>Tipo: ${tipos}</p>
    <p>Fraquezas: ${fraquezas}</p>
    `;
    } catch (error) {
        resultado.innerHTML = "<p>Pokémon não encontrado. Tente novamente.</p>";
        console.log("error:", error);
    }

});
