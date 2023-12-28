const detailsOverlay = document.getElementById('detailsOverlay');
const detailsContent = document.querySelector('.details-content');

// Exibir os detalhes do Pokémon
const showPokemonDetails = pokemon => {
    const { number, photo, species, height, weight, abilities, hp, attack, defense, speed, total,} = pokemon;
    detailsContent.innerHTML = `
        <h1>Informações</h1>
        <img src="${photo}" alt="Imagem do ${species}">
        <p><strong>Número:</strong> ${number}</p>
        <p><strong>Espécie:</strong> ${species}</p>
        <p><strong>Altura:</strong> ${height}</p>
        <p><strong>Peso:</strong> ${weight}</p>
        <p><strong>Habilidades:</strong> ${abilities.join(', ')}</p>
        <p><strong>HP:</strong> ${hp}</p>
        <p><strong>Ataque:</strong> ${attack}</p>
        <p><strong>Defesa:</strong> ${defense}</p>
        <p><strong>Velocidade:</strong> ${speed}</p>
        <p><strong>Total:</strong> ${total}</p>
    `;
    detailsOverlay.style.display = 'flex';
}

// Mostra os detalhes do Pokémon ao clicar no botão "detalhes"
pokemonList.addEventListener('click', async event => {
    const detailsButton = event.target.closest('.details-button');
    if (detailsButton) {
        const pokemonId = parseInt(detailsButton.getAttribute('data-pokemon-id'));
        try {
            const pokemonDetails = await pokeApi.getPokemonDetailById(pokemonId); 
            showPokemonDetails(pokemonDetails);
        } catch (error) {
            console.error("Erro ao obter detalhes do Pokémon:", error);
        }
    }
});


// Fechar tela de detalhes/botão
let closeButton = document.createElement('button');
closeButton.className = 'close-details-button'; 
closeButton.innerHTML = '×';

closeButton.addEventListener('click', () => {
    detailsOverlay.style.display = 'none';
});

detailsOverlay.appendChild(closeButton);

detailsOverlay.addEventListener('click', event => {
    if (event.target === detailsOverlay) {
        detailsOverlay.style.display = 'none';
    }
});




