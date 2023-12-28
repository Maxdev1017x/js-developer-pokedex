const pokeApi = {};

// Converter os detalhes do Pokémon
function convertPokeApiDetailToPokemon(pokeDetail) {
    // Criando uma nova instância de Pokémon
    const pokemon = {};

    // Atribuindo os detalhes do Pokémon
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;
    pokemon.species = pokeDetail.species.name;
    pokemon.height = pokeDetail.height;
    pokemon.weight = pokeDetail.weight;

    // Mapeando as habilidades
    pokemon.abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name);

    // Encontrando e atribuindo as estatísticas
    pokemon.hp = pokeDetail.stats.find((stat) => stat.stat.name === 'hp').base_stat;
    pokemon.attack = pokeDetail.stats.find((stat) => stat.stat.name === 'attack').base_stat;
    pokemon.defense = pokeDetail.stats.find((stat) => stat.stat.name === 'defense').base_stat;
    pokemon.speed = pokeDetail.stats.find((stat) => stat.stat.name === 'speed').base_stat;

    // Calculando estatísticas (total)
    pokemon.total = pokeDetail.stats.reduce((total, stat) => total + stat.base_stat, 0);

    // Mapeando os tipos
    pokemon.types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);

    // Atribuindo a imagem
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    // Atribuindo os tipos e tipo principal
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type

    // Retornando o Pokémon formatado
    return pokemon;
}

// Obtenção de detalhes de um Pokémon específico
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

// obtenção da lista de Pokémons
pokeApi.getPokemons = (offset = 0, limit = 12) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

// Obtem detalhes de um Pokémon com base na ID
pokeApi.getPokemonDetailById = (pokemonId) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`;

    return fetch(url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon);
};
