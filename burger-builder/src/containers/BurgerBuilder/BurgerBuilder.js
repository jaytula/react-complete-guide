import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from  '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    }
  }

  addIngredient = (name, quantity) => {
    const updatedIngredents = {...this.state.ingredients};
    updatedIngredents[name] += quantity;
    this.setState({ingredients: updatedIngredents});
  }

  render() {
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls />
      </Aux>
    );
  }
}

export default BurgerBuilder;
