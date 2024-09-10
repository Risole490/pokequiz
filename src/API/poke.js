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

async function extraiDadosPokemons() {
    const pokemons = await pega4Pokemons();
    const pokemonEscolhido = pokemons[Math.floor(Math.random() * pokemons.length)];

    const detalhesPokemons = await Promise.all(pokemons.map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        const data = await response.json();
        return {
            nome: data.name,
            sprite: data.sprites.other['official-artwork']['front_default']
        };
    }));

    const pokemonCorreto = detalhesPokemons.find(pokemon => pokemon.nome === pokemonEscolhido.name);
    const alternativasErradas = detalhesPokemons
        .filter(pokemon => pokemon.nome !== pokemonEscolhido.name)
        .map(pokemon => pokemon.nome);

    // Adiciona o nome do Pokémon correto às alternativas
    const alternativas = [...alternativasErradas, pokemonCorreto.nome];

    return {
        correto: {
            nome: pokemonCorreto.nome,
            sprite: pokemonCorreto.sprite
        },
        alternativas: alternativas,
        pergunta: `Qual o nome desse pokémon?`
    };
}

    

module.exports = { extraiDadosPokemons }; // Exporta a função pegaPokemon