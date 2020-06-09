import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import * as actions from '../../store/actions/index';

export const BurgerBuilder = props => {
  const [purchasing, setPurchasing] = useState(false);

  const dispatch = useDispatch();

  const ingredients = useSelector(state => state.burgerBuilder.ingredients);
  const totalPrice = useSelector(state => state.burgerBuilder.totalPrice);
  const error = useSelector(state => state.burgerBuilder.error);
  const isAuth = useSelector(state => !!state.auth.token);

  const onIngredientAdded = ingredientName =>
    dispatch(actions.addIngredient(ingredientName));
  const onIngredientRemoved = ingredientName =>
    dispatch(actions.removeIngredient(ingredientName));
  const onInitIngredients = useCallback(() => {
    dispatch(actions.initIngredients());
  }, [dispatch]);
  const onInitPurchase = () => {
    dispatch(actions.purchaseInit());
  };
  const onSetAuthRedirect = redirectPath =>
    dispatch(actions.setAuthRedirect(redirectPath));

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const isPurchasable = () => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => sum + el, 0);

    return !!sum;
  };

  const purchaseHandler = () => {
    if (!props.isAuth) {
      onSetAuthRedirect('/checkout');
      props.history.push('/auth');
    }
    setPurchasing(true);
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    onInitPurchase();
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
  let burger = error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

  if (ingredients) {
    orderSummary = (
      <OrderSummary
        ingredients={ingredients}
        purchaseCanceled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
        price={totalPrice}
      />
    );

    burger = (
      <Aux>
        {' '}
        <Burger ingredients={ingredients} />
        <BuildControls
          disabled={disabledInfo}
          ingredientAdded={onIngredientAdded}
          ingredientRemoved={onIngredientRemoved}
          purchasable={isPurchasable()}
          price={totalPrice}
          ordered={purchaseHandler}
          isAuth={isAuth}
        />
      </Aux>
    );
  }

  return (
    <Aux>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
};

export default withErrorHandler(BurgerBuilder, axios);
