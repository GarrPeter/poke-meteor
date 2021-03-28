import React from "react";
import { PokeType } from "/imports/ui/components/PokeType";
import { PokeStatBox } from "/imports/ui/components/PokeStatBox";

export const Pokemon = ({ pokemon, clickHandler }) => {
  return (
    <div className="pokemon-card" onClick={(e) => clickHandler(e, pokemon)}>
      <div className="pokemon-name">{pokemon.name}</div>
      <div className="pokemon-types">
        {pokemon.types.map((type) => (
          <PokeType key={type} type={type} />
        ))}
      </div>
      <img src="/images/groudon.gif" alt="" className="pokemon-img" />
      <div className="pokemon-stats">
        <PokeStatBox name="HP" value={pokemon.baseStats.hp} />
        <PokeStatBox name="Atk" value={pokemon.baseStats.atk} />
        <PokeStatBox name="Def" value={pokemon.baseStats.def} />
        <PokeStatBox name="SpA" value={pokemon.baseStats.spa} />
        <PokeStatBox name="SpD" value={pokemon.baseStats.spd} />
        <PokeStatBox name="Spe" value={pokemon.baseStats.spe} />
      </div>
    </div>
  );
};
