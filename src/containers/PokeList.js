import React, { PureComponent } from "react";
import Card from "@material-ui/core/Card";
import { Grid } from "@material-ui/core";

export default class Pokelist extends PureComponent {
  render() {
    const { pokemonData } = this.props;

    const pokeResults =
      pokemonData && pokemonData.data && pokemonData.data.results;

    return (
      <div>
        <Grid container spacing={16}>
          {pokeResults &&
            pokeResults.map(pokemon => (
              <Grid item lg={3}>
                <Card>{pokemon.name}</Card>
              </Grid>
            ))}
        </Grid>
      </div>
    );
  }
}
