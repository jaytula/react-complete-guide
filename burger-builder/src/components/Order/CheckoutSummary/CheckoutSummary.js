import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import classes from './CheckoutSummary.module.css';
import { withRouter } from 'react-router-dom';

const CheckoutSummary = props => {
  console.log({CheckoutSummary: props});
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We home it tastes well!</h1>
      <div style={{ width: '100%', margin: 'auto' }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType='Danger' clicked={props.onCheckoutCancelled}>
        CANCEL
      </Button>
      <Button btnType='Success' clicked={props.onCheckoutContinued}>
        CONTINUE
      </Button>
    </div>
  );
};

export default withRouter(CheckoutSummary);
