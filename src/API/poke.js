async function pega4Pokemons() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
    const data = await response.json();
    const totalPokemons = data.results.length;
    const pokemons = [];

    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * totalPokemons);
        const pokemon = data.results[randomIndex];
        pokemons.push(pokemon);
    }

    return pokemons;
}

function formataNome(nome) {
    if (!nome) {
        return '-';
    }

    console.log(nome);
    // Remove hífens e outros caracteres indesejados
    let nomeFormatado = nome.replace(/-/g, ' ').replace(/[^a-zA-Z\s]/g, '');
    // Remove a palavra "standard"
    nomeFormatado = nomeFormatado.replace(/\bstandard\b/gi, '');
    // Remove a palavra tower
    nomeFormatado = nomeFormatado.replace(/\btower\b/gi, '');
    // Remove a palavra totem
    nomeFormatado = nomeFormatado.replace(/\btotem\b/gi, '');
    // Remove a palavra large
    nomeFormatado = nomeFormatado.replace(/\blarge\b/gi, '');
    // Remove a palavra small
    nomeFormatado = nomeFormatado.replace(/\bsmall\b/gi, '');
    // Remove espaços extras
    nomeFormatado = nomeFormatado.trim().replace(/\s+/g, ' ');
    // Coloca a primeira letra de cada palavra em maiúscula
    nomeFormatado = nomeFormatado.replace(/\b\w/g, (char) => char.toUpperCase());
    return nomeFormatado;
}

function chanceShiny() {
    return Math.random() < 0.05; // 5% de chance de ser shiny
}

async function extraiDadosPokemons() {
    const pokemons = await pega4Pokemons();
    const pokemonEscolhido = pokemons[Math.floor(Math.random() * pokemons.length)];

    const detalhesPokemons = await Promise.all(pokemons.map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        const data = await response.json();
        const isShiny = chanceShiny();

        if (data.sprites.other['official-artwork']['front_shiny'] === null || data.sprites.other['official-artwork']['front_default'] === null) {
            return null; // Retorna null se os sprites não estiverem disponíveis
        } else {
            return {
                nome: data.name,
                sprite: isShiny ? data.sprites.other['official-artwork']['front_shiny'] : data.sprites.other['official-artwork']['front_default'],
                shiny: isShiny ? true : false
            };
        }
    }));

    // Filtra valores nulos
    const detalhesPokemonsFiltrados = detalhesPokemons.filter(pokemon => pokemon !== null);

    const pokemonCorreto = detalhesPokemonsFiltrados.find(pokemon => pokemon.nome === pokemonEscolhido.name);

    if (!pokemonCorreto) {
        // Se não encontrar o Pokémon correto, tenta novamente
        return extraiDadosPokemons();
    }

    const alternativasErradas = detalhesPokemonsFiltrados
        .filter(pokemon => pokemon.nome !== pokemonEscolhido.name)
        .map(pokemon => formataNome(pokemon.nome));

    // Adiciona o nome do Pokémon correto às alternativas
    const alternativas = [...alternativasErradas, formataNome(pokemonCorreto.nome)];

    return {
        correto: {
            nome: formataNome(pokemonCorreto.nome),
            sprite: pokemonCorreto.sprite,
            shiny: pokemonCorreto.shiny
        },
        alternativas: alternativas.sort(() => Math.random() - 0.5) // Embaralha as alternativas
    };
}



    

module.exports = { extraiDadosPokemons }; // Exporta a função pegaPokemon