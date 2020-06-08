import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as actions from '../../store/actions/index';

export const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);

  const {onInitIngredients} = props;
  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const isPurchasable = ()  => {
    const ingredients = props.ingredients;
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => sum + el, 0);

    return !!sum;
  }

  const purchaseHandler = () => {
    if (!props.isAuth) {
      props.onSetAuthRedirect('/checkout');
      props.history.push('/auth');
    }
    setPurchasing(true);
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    props.onInitPurchase();
    props.history.push({
      pathname: '/checkout',
    });
  };

    const disabledInfo = {
      ...props.ingredients,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = props.error ? (
      <p>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );

    if (props.ingredients) {
      orderSummary = (
        <OrderSummary
          ingredients={props.ingredients}
          purchaseCanceled={purchaseCancelHandler}
          purchaseContinued={purchaseContinueHandler}
          price={props.totalPrice}
        />
      );

      burger = (
        <Aux>
          {' '}
          <Burger ingredients={props.ingredients} />
          <BuildControls
            disabled={disabledInfo}
            ingredientAdded={props.onIngredientAdded}
            ingredientRemoved={props.onIngredientRemoved}
            purchasable={isPurchasable()}
            price={props.totalPrice}
            ordered={purchaseHandler}
            isAuth={props.isAuth}
          />
        </Aux>
      );
    }

    return (
      <Aux>
        <Modal
          show={purchasing}
          modalClosed={purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  
}

const mapStateToProps = ({ burgerBuilder, auth }) => ({
  ingredients: burgerBuilder.ingredients,
  totalPrice: burgerBuilder.totalPrice,
  error: burgerBuilder.error,
  isAuth: !!auth.token,
  building: burgerBuilder.building,
});

const mapDispatchToProps = dispatch => ({
  onIngredientAdded: ingredientName =>
    dispatch(actions.addIngredient(ingredientName)),
  onIngredientRemoved: ingredientName =>
    dispatch(actions.removeIngredient(ingredientName)),
  onInitIngredients: () => {
    dispatch(actions.initIngredients());
  },
  onInitPurchase: () => {
    dispatch(actions.purchaseInit());
  },
  onSetAuthRedirect: (redirectPath) => dispatch(actions.setAuthRedirect(redirectPath))
});

export default withErrorHandler(
  connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder),
  axios
);
