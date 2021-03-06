import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = props => {
  let authNavItem = <NavigationItem link='/auth'>Authenthicate</NavigationItem>;
  if (props.isAuth) {
    authNavItem = <NavigationItem link='/logout'>Logout</NavigationItem>;
  }
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem exact link='/'>
        Burger Builder
      </NavigationItem>
      {props.isAuth ? (
        <NavigationItem link='/orders'>Orders</NavigationItem>
      ) : null}
      {authNavItem}
    </ul>
  );
};

export default NavigationItems;
