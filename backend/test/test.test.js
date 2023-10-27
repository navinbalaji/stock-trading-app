import supertest from "supertest";
import { stockApp } from "../index.js";
import { matchingEngine,Stock } from "../StockMatching.js";

const request = supertest(stockApp);

describe("MatchingEngine", function () {
  it("should match buy and sell orders", function () {
    matchingEngine.placeOrder(new Stock("TATA", 100, 10, "buy"));
    matchingEngine.placeOrder(new Stock("TATA", 110, 5, "sell"));
    matchingEngine.placeOrder(new Stock("RELIANCE", 1500, 7, "buy"));
    matchingEngine.placeOrder(new Stock("RELIANCE", 1480, 8, "sell"));

  });

});

describe("Stock Trading API", function () {
  it("should place a stock order", function (done) {
    request
      .post("/stock/match")
      .send({
        stockName: "TATA",
        price: 100,
        quantity: 10,
        type: "buy",
      })
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        // Implement your assertions for API response here
        done();
      });
  });

  // Add more test cases for your API as needed
});
