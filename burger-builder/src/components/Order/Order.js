import React from "react";
import classes from "./Order.module.css";

const Order = (props) => {
  const ingredients = [];
  for (let key in props.ingredients) {
    ingredients.push({ name: key, amount: props.ingredients[key] });
  }
  const ingredientsOutput = ingredients.map((ig) => (
    <span
      key={ig.name}
      style={{
        border: "1px solid #ccc",
        padding: "5px",
        margin: "0 8px",
        display: "inline-block",
      }}
    >
      {ig.name} ({ig.amount})
    </span>
  ));
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientsOutput}</p>
      <p>
        Price: <strong>USD {(+props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
