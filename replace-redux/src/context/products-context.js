import React, { useState } from "react";

export const ProductsContext = React.createContext({
  products: [],
  toggleFavorite: id => {},
});

const ProductsProvider = props => {
  const [products, setProducts] = useState([
    {
      id: "p1",
      title: "Red Scarf",
      description: "A pretty red scarf.",
      isFavorite: false,
    },
    {
      id: "p2",
      title: "Blue T-Shirt",
      description: "A pretty blue t-shirt.",
      isFavorite: false,
    },
    {
      id: "p3",
      title: "Green Trousers",
      description: "A pair of lightly green trousers.",
      isFavorite: false,
    },
    {
      id: "p4",
      title: "Orange Hat",
      description: "Street style! An orange hat.",
      isFavorite: false,
    },
  ]);

  const toggleFavorite = id => {
    setProducts(products => {
      const updatedProducts = [...products];
      const productIndex = updatedProducts.findIndex(
        product => id === product.id
      );
      const updatedProduct = { ...updatedProducts[productIndex] };
      updatedProduct.isFavorite = !updatedProduct.isFavorite;
      updatedProducts[productIndex] = updatedProduct;
      return updatedProducts;
    });
  };

  return (
    <ProductsContext.Provider value={{ products, toggleFavorite }}>
      {props.children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
