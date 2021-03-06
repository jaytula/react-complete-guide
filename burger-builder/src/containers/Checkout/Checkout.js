import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

const Checkout = props => {

  const checkoutCancelledHandler = () => {
    props.history.goBack();
  };

  const checkoutContinuedHandler = () => {
    props.history.replace('/checkout/contact-data');
  };

    let summary = <Redirect to='/' />;

    if (props.ingredients) {
      const purchasedRedirect = props.purchased ? (
        <Redirect to='/' />
      ) : null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={props.ingredients}
            onCheckoutCancelled={checkoutCancelledHandler}
            onCheckoutContinued={checkoutContinuedHandler}
          />
          <Route
            path={props.match.path + '/contact-data'}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  
}

const mapStateToProps = ({ burgerBuilder, order }) => ({
  ingredients: burgerBuilder.ingredients,
  purchased: order.purchased,
  totalPrice: burgerBuilder.totalPrice,
});


export default connect(mapStateToProps)(Checkout);