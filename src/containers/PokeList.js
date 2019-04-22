import React, { PureComponent } from "react";
import Card from "@material-ui/core/Card";
import { Grid } from "@material-ui/core";
import { object } from "prop-types";
import Fuse from "fuse.js";
export default class Pokelist extends PureComponent {
  static propTypes = {
    pokemonData: object
  };

  static defaultProps = {
    pokemonData: {}
  };

  fuse = (e, y) => {
    const { searchTerm } = this.props;
    const nested =
      y === 2
        ? [
            { name: "typechild.name", weight: 0.4 },
            { name: "typechild.vals", weight: 0.3 }
          ]
        : [{ name: "name", weight: 0.4 }, { name: "vals", weight: 0.2 }];
    const threshhold = y === 2 ? 0.3 : 0.3;
    // 2 means it is nested
    let opts = {
      shouldSort: true,
      threshold: threshhold,
      keys: nested
    };
    let fuse = new Fuse(e, opts);
    let res = fuse.search(searchTerm);

    return res;
  };

  getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  render() {
    const { pokemonData } = this.props;

    const pokeResults =
      pokemonData && pokemonData.data && pokemonData.data.results;

    let searchResults = pokeResults !== undefined && this.fuse(pokeResults);

    return (
      <div style={{ width: "100%" }}>
        {searchResults.length ? (
          <Grid container spacing={16}>
            {searchResults &&
              searchResults.map(pokemon => (
                <Grid item lg={3} key={pokemon.name}>
                  <Card
                    className="pokemon-name"
                    style={{
                      backgroundColor: `${this.getRandomColor()}`,
                      padding: 20,
                      color: "inherit"
                    }}
                  >
                    {pokemon.name}
                  </Card>
                </Grid>
              ))}
          </Grid>
        ) : (
          <Grid container spacing={16}>
            {pokeResults &&
              pokeResults.map(pokemon => (
                <Grid item lg={3} key={pokemon.name}>
                  <Card
                    className="pokemon-name"
                    style={{
                      backgroundColor: `${this.getRandomColor()}`,
                      padding: 20,
                      color: "inherit"
                    }}
                  >
                    {pokemon.name}
                  </Card>
                </Grid>
              ))}
          </Grid>
        )}
      </div>
    );
  }
}
