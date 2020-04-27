import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as actionTypes from '../../store/actions';



class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    purchasing: false,
    loading: false,
    error: null,
  };

  componentDidMount() {
    // axios
    //   .get('/ingredients.json')
    //   .then(response => {
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch(error => {
    //     this.setState({ error: true });
    //   });
  }

  // updatePurchaseState(ingredients) {
  //   const sum = Object.keys(ingredients)
  //     .map(igKey => {
  //       return ingredients[igKey];
  //     })
  //     .reduce((sum, el) => sum + el, 0);

  //   this.setState({ purchasable: sum > 0 });
  // }


  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // alert('You continue!');

    const search = new URLSearchParams();
    Object.entries(this.state.ingredients).forEach(([key, value]) => {
      search.append(key, value);
    });
    search.append('price', this.props.totalPrice);

    this.props.history.push({
      pathname: '/checkout',
      search: search.toString(),
    });
  };

  render() {
    const disabledInfo = {
      ...this.props.ingredients,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error ? (
      <p>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );

    if (this.props.ingredients) {
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.props.totalPrice}
        />
      );

      burger = (
        <Aux>
          {' '}
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            disabled={disabledInfo}
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            purchasable={this.state.purchasable}
            price={this.props.totalPrice}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => ({
  ingredients: state.ingredients,
  totalPrice: state.totalPrice,
});

const mapDispatchToProps = dispatch => ({
  onIngredientAdded: ingredientName =>
    dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName }),
  onIngredientRemoved: ingredientName =>
    dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName }),
});

export default withErrorHandler(
  connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder),
  axios
);
