"use client";

import { useState } from "react";
import Head from "next/head";
import StockTradingForm from "../components/StockTradingForm";
import styles from "./page.module.css";
import axios from "axios";

export default function Home() {
  const [orders, setOrders] = useState([]);
  const onSubmit = (order) => {
    setOrders([...orders, order]);
  };

  axios.post("/",)

  return (
    <div className="container">
      <Head>
        <title>Stock Trading App</title>
      </Head>

      <main>
        <h1 className={styles.header}>Stock Trading App</h1>
        <StockTradingForm onSubmit={onSubmit} />
        <h2 className={styles.header}>Orders</h2>
        <h2 className={styles.stockMatched}> Stock Matched</h2>
        <div className={styles.stockList}>
        <ul>
          {orders.map((order, index) => (
            <li key={index}>{`Stock: ${order.stockName}, Price: ${order.price}, Quantity: ${order.quantity}, Type: ${order.type}`}</li>
          ))}
        </ul>
        </div>
      </main>
    </div>
  );
}
