"use Client";
import style from "./StockTradingForm.module.css";
import React, { useState } from "react";

export default function StockTradingForm({ onSubmit }) {
  const [stock, setStock] = useState({
    stockName: "-1",
    price: 0,
    quantity: 0,
    type: "-1",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      stockName: stock.stockName,
      price: parseFloat(stock.price),
      quantity: parseInt(stock.quantity),
      type: stock.type,
    });
    setStock({
      stockName: "-1",
      price: 0,
      quantity: 0,
      type: "-1",
    });
  };

  const onChangeEvent = (e) => {
    setStock({ ...stock, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className={style.stockForm}>
      <div className={style.formElement}>
        <label>Stock Name:</label>
        <select value={stock.stockName} name="stockName" onChange={(e) => onChangeEvent(e)}>
          <option value="-1">Select Stock</option>
          <option value="TATA">TATA</option>
          <option value="RELIANCE">RELIANCE</option>
        </select>
      </div>

      <div className={style.formElement}>
        <label>Price:</label>
        <input type="number" value={stock.price} name="price" onChange={(e) => onChangeEvent(e)} />
      </div>

      <div className={style.formElement}>
        <label>Quantity:</label>
        <input type="number" value={stock.quantity} name="quantity" onChange={(e) => onChangeEvent(e)} />
      </div>

      <div className={style.formElement}>
        <label>Order Type:</label>
        <select value={stock.type} name="type" onChange={(e) => onChangeEvent(e)}>
          <option value="-1">Select Type</option>
          <option value="buy">Buy</option>
          <option value="sell">Sell</option>
        </select>
      </div>

      <input type="submit" value="Submit Order" />
    </form>
  );
}
