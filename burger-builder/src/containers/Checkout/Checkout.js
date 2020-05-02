import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends React.Component {
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    const summary = this.props.ingredients ? (
      <div>
        <CheckoutSummary
          ingredients={this.props.ingredients}
          onCheckoutCancelled={this.checkoutCancelledHandler}
          onCheckoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={this.props.match.path + '/contact-data'}
          component={ContactData}
        />
      </div>
    ) : (
      <Redirect to='/' />
    );
    return summary;
  }
}

const mapStateToProps = ({burgerBuilder}) => ({
  ingredients: burgerBuilder.ingredients,
  totalPrice: burgerBuilder.totalPrice,
});

export default connect(mapStateToProps)(Checkout);
