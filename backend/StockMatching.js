import express from "express";
const stockMatchRouter = express.Router();

class Stock {
  constructor(name, price, quantity,type) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.type=type;
  }
}

class MatchingEngine {
  constructor() {
    this.result = null;
    this.orders = {
      TATA: { buy: [], sell: [] },
      RELIANCE: { buy: [], sell: [] },
    };
  }

  placeOrder(order) {
    this.orders[order.name][order.type].push(order);
    this.matchOrders(order.name);
  }

  matchOrders(stockName) {
    const buyOrders = this.orders[stockName].buy;
    const sellOrders = this.orders[stockName].sell;

    while (buyOrders.length > 0 && sellOrders.length > 0) {
      const buyOrder = buyOrders[0];
      const sellOrder = sellOrders[0];

      if (buyOrder.price >= sellOrder.price) {
        const matchedPrice = (buyOrder.price + sellOrder.price) / 2;
        const matchedQuantity = Math.min(buyOrder.quantity, sellOrder.quantity);

        this.result = `Matched ${stockName} at price ${matchedPrice} for quantity ${matchedQuantity}`;
        console.log(this.result);

        buyOrder.quantity -= matchedQuantity;
        sellOrder.quantity -= matchedQuantity;

        if (buyOrder.quantity === 0) {
          buyOrders.shift();
        }

        if (sellOrder.quantity === 0) {
          sellOrders.shift();
        }
      } else {
        break; // No more matches at current prices
      }
    }

    return this.result;
  }
}

const matchingEngine = new MatchingEngine();

stockMatchRouter.post("/match", (req, res) => {
  try {
    const { stockName, price, quantity, type } = req.body;
    matchingEngine.placeOrder(new Stock(stockName, price, quantity, type));
    return res.status(200).json({ result: matchingEngine.result });
  } catch (err) {
    console.log(err)
    return res.status(404).json({ result: null });
  }
});

export default stockMatchRouter;
