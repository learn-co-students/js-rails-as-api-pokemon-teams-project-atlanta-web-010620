class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all
        render json: pokemons.to_json(:include => {
            :trainer => {:except => [:updated_at, :created_at]}
        }, :only => [:id, :nickname, :species, :trainer_id])
    end

    def create
        pokemon = Pokemon.new
        pokemon.trainer_id = params[:trainer_id]
        pokemon.nickname = Faker::Name.first_name
        pokemon.species = Faker::Games::Pokemon.name 
        pokemon.save
        render json: pokemon.to_json(:include => {
            :trainer => {:except => [:updated_at, :created_at]}
        }, :only => [:id, :nickname, :species, :trainer_id])
    end

    def destroy
        pokemon = Pokemon.find(params[:id])
        render json: pokemon.destroy.to_json(:include => {
            :trainer => {:except => [:updated_at, :created_at]}
        }, :only => [:id, :nickname, :species, :trainer_id])
    end
end
