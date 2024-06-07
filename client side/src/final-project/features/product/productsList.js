import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from './productsSlice';
import SingleProduct from './singleProduct';

const ProductsList = ({ update, fil, sort, milk }) => {
  let dispatch = useDispatch();

  const fetchAllProduct = async () => {
    dispatch(fetchAllProducts());
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  const products = useSelector(s => s.product.arrProduct);

  const filteredProducts = products.filter(product => {
    const searchTerm = fil.toLowerCase();
    return (
      product.name?.toLowerCase().includes(searchTerm) ||
      product.description?.toLowerCase().includes(searchTerm)
    );
  });

  const sortedProducts = sort ? [...filteredProducts].sort((a, b) => a.price - b.price) : filteredProducts;

  const milkFilteredProducts = milk
    ? sortedProducts.filter(product => product?.isMilki === "false")
    : sortedProducts;

  return (
    <div style={{background: "#f6f5f7"}}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around", padding: "0 20px" }}>
        {milkFilteredProducts.map((p) => (
          <div key={p.id} style={{ margin: "10px" }}>
            <SingleProduct up={update} product={p.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
