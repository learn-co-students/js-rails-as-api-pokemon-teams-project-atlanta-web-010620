class PokemonsController < ApplicationController
    def destroy 
        pokemon = Pokemon.find(params[:id])
        pokemon.delete 
    end

    def create
        pokemon = Pokemon.create(pokemon_params)
        render json: pokemon
        # byebug
    end

    private 
    def pokemon_params 
        params.require(:pokemon).permit(:species, :nickname,:trainer_id)
    end
end
