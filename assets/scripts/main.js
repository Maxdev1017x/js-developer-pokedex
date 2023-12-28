const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');

// Define as constantes e deslocamento(offset)
const maxRecords = 151;
const limit = 12;
let offset = 0;

// Converte os dados do Pokémon em um elemento de lista
function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
            <div class="details-button-container">
                <button class="details-button" data-pokemon-id="${pokemon.number}">Detalhes</button>
            </div>
        </li>
    `;
}

// Carregar os itens do Pokémon
async function loadPokemonItems(offset, limit) {
    const pokemons = await pokeApi.getPokemons(offset, limit);
    const newHtml = pokemons.map(convertPokemonToLi).join('');
    pokemonList.innerHTML += newHtml;
}
// Carrega os itens iniciais do Pokémon
loadPokemonItems(offset, limit);

// Ouvinte do botão "carregar mais"
loadMoreButton.addEventListener('click', async () => {
    offset += limit;
    const qtdRecordsWithNextPage = offset + limit;

    if (qtdRecordsWithNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        await loadPokemonItems(offset, newLimit);
        loadMoreButton.remove();
    } else {
        await loadPokemonItems(offset, limit);
    }
});
