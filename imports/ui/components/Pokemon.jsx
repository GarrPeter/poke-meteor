import React from "react";
import { PokeType } from "/imports/ui/components/PokeType";
import { PokeStatBox } from "/imports/ui/components/PokeStatBox";

export const Pokemon = ({}) => {
  return (
    <div className="pokemon-card">
      <div className="pokemon-name">Agumon</div>
      <div className="pokemon-types">
        <PokeType />
        <PokeType />
      </div>
      <img src="/images/groudon.gif" alt="" className="pokemon-img" />
      <div className="pokemon-stats">
        <PokeStatBox name="HP" value="27" />
        <PokeStatBox name="Atk" value="27" />
        <PokeStatBox name="Def" value="27" />
        <PokeStatBox name="SpA" value="27" />
        <PokeStatBox name="SpD" value="27" />
        <PokeStatBox name="Spe" value="27" />
      </div>
    </div>
  );
};
