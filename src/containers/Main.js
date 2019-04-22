import React, { PureComponent } from "react";
import SearchBar from "../components/SearchBar";
import PokeList from "./PokeList";
import axios from "axios";
export default class Main extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pokemonData: {},
      searchTerm: ""
    };
  }

  componentDidMount = () => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=900")
      .then(res => this.setState({ pokemonData: res }))
      .catch(err => console.log(err, "<===err"));

    console.log("%c I dont care bitch ", "background: green; color: white");
  };

  getChildData = data => {
    this.setState({ searchTerm: data.join() });
  };
  render() {
    const { pokemonData, searchTerm } = this.state;
    return (
      <div>
        <SearchBar pokemonData={pokemonData} getChildData={this.getChildData} />
        <PokeList pokemonData={pokemonData} searchTerm={searchTerm} />
      </div>
    );
  }
}
