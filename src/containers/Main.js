import React, { PureComponent } from "react";
import SearchBar from "../components/SearchBar";
import PokeList from "./PokeList";
import axios from "axios";
export default class Main extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pokemonData: {}
    };
  }

  componentDidMount = () => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=900")
      .then(res => this.setState({ pokemonData: res }))
      .catch(err => console.log(err, "<===err"));
  };
  render() {
    const { pokemonData } = this.state;
    return (
      <div>
        <SearchBar pokemonData={pokemonData} />
        <PokeList pokemonData={pokemonData} />
      </div>
    );
  }
}
