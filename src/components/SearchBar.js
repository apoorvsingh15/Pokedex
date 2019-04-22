import React, { Component } from "react";
import PropTypes from "prop-types";
import deburr from "lodash/deburr";
import Downshift from "downshift";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: "",
      selectedItem: [],
      suggestions: []
    };
  }

  renderInput = inputProps => {
    const { InputProps, classes, ref, ...other } = inputProps;

    return (
      <TextField
        InputProps={{
          inputRef: ref,

          ...InputProps
        }}
        {...other}
      />
    );
  };

  UNSAFE_componentWillReceiveProps = nextProps => {
    if (this.props.pokemonData !== nextProps.pokemonData) {
      this.setState({
        suggestions:
          nextProps.pokemonData &&
          nextProps.pokemonData.data &&
          nextProps.pokemonData.data.results.map(item => {
            const container = {};
            container["label"] = item.name;
            return container;
          })
      });
    }
  };

  renderSuggestion = ({
    suggestion,
    index,
    itemProps,
    highlightedIndex,
    selectedItem
  }) => {
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || "").indexOf(suggestion.label) > -1;

    return (
      <MenuItem
        {...itemProps}
        key={suggestion.label}
        selected={isHighlighted}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400
        }}
      >
        {suggestion.label}
      </MenuItem>
    );
  };

  getSuggestions = value => {
    const { suggestions } = this.state;
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;
    let count = 0;

    return inputLength === 0
      ? []
      : suggestions.filter(suggestion => {
          const keep =
            count < 5 &&
            suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;

          if (keep) {
            count += 1;
          }

          return keep;
        });
  };

  handleKeyDown = event => {
    const { inputValue, selectedItem } = this.state;
    if (
      selectedItem.length &&
      !inputValue.length &&
      event.key === "Backspace"
    ) {
      this.setState({
        selectedItem: selectedItem.slice(0, selectedItem.length - 1)
      });
    }
  };

  handleInputChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  handleChange = item => {
    let { selectedItem } = this.state;

    if (selectedItem.indexOf(item) === -1) {
      selectedItem = [...selectedItem, item];
    }

    this.setState({
      inputValue: "",
      selectedItem
    });
  };

  handleDelete = item => () => {
    this.setState(state => {
      const selectedItem = [...state.selectedItem];
      selectedItem.splice(selectedItem.indexOf(item), 1);
      return { selectedItem };
    });
  };

  render() {
    const { classes } = this.props;
    const { inputValue, selectedItem } = this.state;

    console.log(selectedItem, "<====selected");

    this.props.getChildData(selectedItem);

    return (
      <Downshift
        id="downshift-multiple"
        inputValue={inputValue}
        onChange={this.handleChange}
        selectedItem={selectedItem}
      >
        {({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue: inputValue2,
          selectedItem: selectedItem2,
          highlightedIndex
        }) => (
          <div>
            {this.renderInput({
              fullWidth: true,
              classes,
              InputProps: getInputProps({
                startAdornment: selectedItem.map(item => (
                  <Chip
                    key={item}
                    tabIndex={-1}
                    label={item}
                    onDelete={this.handleDelete(item)}
                  />
                )),
                onChange: this.handleInputChange,
                onKeyDown: this.handleKeyDown,
                placeholder: "Select multiple pokemons"
              }),
              label: "Label"
            })}
            {isOpen ? (
              <Paper square>
                {this.getSuggestions(inputValue2).map((suggestion, index) =>
                  this.renderSuggestion({
                    suggestion,
                    index,
                    itemProps: getItemProps({ item: suggestion.label }),
                    highlightedIndex,
                    selectedItem: selectedItem2
                  })
                )}
              </Paper>
            ) : null}
          </div>
        )}
      </Downshift>
    );
  }
}

SearchBar.propTypes = {
  classes: PropTypes.object
};
