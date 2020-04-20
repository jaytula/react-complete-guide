import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: null,
  };

  componentDidMount() {
    axios
      .get('/ingredients.json')
      .then(response => {
        console.log(response);
        this.setState({ ingredients: response.data });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => sum + el, 0);

    this.setState({ purchasable: sum > 0 });
  }

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;

    const priceAddition = INGREDIENT_PRICES[type];
    const updatedTotalPrice = this.state.totalPrice + priceAddition;
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedTotalPrice,
    });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) return;
    const updatedCount = oldCount - 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedCount;

    const priceSubtraction = INGREDIENT_PRICES[type];
    const updatedTotalPrice = this.state.totalPrice + priceSubtraction;
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedTotalPrice,
    });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // alert('You continue!');
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: 'Max S',
    //     address: {
    //       street: 'Teststreet 1',
    //       zipCode: '41351',
    //       country: 'USA',
    //     },
    //     email: 'test@test.com',
    //   },
    //   deliveryMethod: 'fastest',
    // };

    // this.setState({ loading: true });
    // axios
    //   .post('/orders.json', order)
    //   .then((res) => {
    //     console.log(res);
    //     this.setState({ loading: false, purchasing: false });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     this.setState({ loading: false, purchasing: false });
    //   });

    const search = new URLSearchParams();
    Object.entries(this.state.ingredients).forEach(([key, value]) => {
      search.append(key, value);
    });
    this.props.history.push({
      pathname: '/checkout',
      search: search.toString(),
    });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
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

    if (this.state.ingredients) {
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.state.totalPrice}
        />
      );

      burger = (
        <Aux>
          {' '}
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            disabled={disabledInfo}
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            purchasable={this.state.purchasable}
            price={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);
