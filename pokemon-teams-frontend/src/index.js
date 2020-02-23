const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', function (e) {

    const main = document.querySelector('main')

    fetch(TRAINERS_URL).then(resp => resp.json())
    .then(json => json.forEach( function (trainer) {
        makeTrainer(trainer)
    }));


    function makeTrainer(object) {
        let trainer = document.createElement('div')
        main.appendChild(trainer)
        trainer.className = 'card'
        trainer.dataset.id = object.id
        let trainerName = document.createElement('p')
        trainerName.innerText = object.name
        trainer.appendChild(trainerName)
        let addPokemonButton = document.createElement('button')
        addPokemonButton.innerText = 'Add Pokemon'
        addPokemonButton.addEventListener('click', function (e) {
            clickAddPoke(e.target);
        })
        trainer.appendChild(addPokemonButton)
        let pokemonContainer = document.createElement('ul')
        trainer.appendChild(pokemonContainer)
        object.pokemons.forEach( function (pokemon) {
            makePokemon(pokemon, pokemonContainer)
        })
    }


    function makePokemon(object, container) {
        let pokemon = document.createElement('li')
        pokemon.innerText = `${object.nickname} (${object.species}) `
        let releaseButton = document.createElement('button')
        releaseButton.className = 'release'
        pokemon.dataset.id = object.id
        releaseButton.innerText = 'Release'
        pokemon.appendChild(releaseButton)
        container.appendChild(pokemon)
        releaseButton.addEventListener('click', function(e) {
            releasePokemon(pokemon, container);
        })
    }

    function clickAddPoke(button) {
        if (button.parentElement.querySelectorAll('li').length < 6) {
            addPokemon(button)
        }
        
    }

    function addPokemon(button) {
        container = button.parentElement.querySelector('ul')
        let configObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"trainer_id": button.parentElement.dataset.id})
        };
        fetch("http://localhost:3000/pokemons", configObj)
        .then(function(response) {
            return response.json();
        })
        .then(function(pokemon) {
            makePokemon(pokemon, container);
        })
    }

    function releasePokemon(pokemon, container) {
        let pokemon_id = pokemon.dataset.id
        let configObj = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        };

        fetch(`http://localhost:3000/pokemons/${pokemon_id}`, configObj)
        .then(function(response) {
            return response.json();
        })
        .then(function(deletedP) {
            container.removeChild(pokemon);
        })
    }
})