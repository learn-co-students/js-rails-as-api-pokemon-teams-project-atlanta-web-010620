const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

window.onload = event => {
    renderTrainers();
}


function renderTrainers(){
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(trainers => trainers.forEach(trainer => renderTrainer(trainer)))
}

function renderTrainer(trainer){
    const trainerCard = document.createElement('div'); 
    trainerCard.className = "card"; 
    trainerCard.dataset.id = trainer.id; 
    trainerCard.dataset.numberPokemon = trainer.pokemons.length; 
        const trainerName = document.createElement('p'); 
        trainerName.innerText = trainer.name; 
    const addPokemonBtn = document.createElement('button'); 
    addPokemonBtn.dataset.trainerId = trainer.id
    addPokemonBtn.innerText = "Add Pokemon"
    addPokemonBtn.addEventListener('click',function(e){
        let numberPokemon = parseInt(this.parentElement.dataset.numberPokemon); 
        if (numberPokemon < 6){

            const objData = { 
                "species": 'example',
                "nickname": `anotherexample`,
                "trainer_id": parseInt(this.dataset.trainerId)
            };
            fetch(`${POKEMONS_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(objData)
            })
            .then(resp => resp.json())
            .then((data) => {
                console.log('Success:', data);
                renderPokemon(data);
            })
            .then(pokemon => console.log(pokemon))
            .catch(function(error){
                console.error('Error:', error);
            });
            numberPokemon +=1; 
            this.parentElement.dataset.numberPokemon = numberPokemon;
        }else{
            console.log("this trainer has too many pokemon!")
        }

    })
    
    const pokemonList = document.createElement('ul'); 

    // create and append pokemon 
    trainer.pokemons.forEach(function(pokemon){
        const pokemonListItem = document.createElement('li'); 
        pokemonListItem.innerText = `${pokemon.nickname} (${pokemon.species})`

        const releaseBtn = document.createElement('button'); 
        releaseBtn.innerText = "Release"; 
        releaseBtn.dataset.pokemonId = pokemon.id; 
        
        // event listener for release button 
        releaseBtn.addEventListener('click', function(e){
            fetch(`${POKEMONS_URL}/${this.dataset.pokemonId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            this.parentElement.remove()
        })
        pokemonListItem.appendChild(releaseBtn)
        pokemonList.appendChild(pokemonListItem)
    })

    // append 
    trainerCard.append(trainerName,addPokemonBtn,pokemonList); 

    
    const main = document.querySelector("main");    
    // debugger
    main.appendChild(trainerCard); 
}

/* TO DO 
need to add a 'renderPokemon(pokemon)' function 
split responsibilities up 
*/