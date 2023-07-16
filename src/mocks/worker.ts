import { rest } from "msw";
import products from "./data/products.json";
import coupons from "./data/coupons.json";
import orders from "./data/orders.json";
import { getCart, addCartItem, setCartItem } from "mocks/server/cart";

export const handlers = [
  rest.get("*/products", (req, res, ctx) => {
    return res(
      ctx.delay(500),
      ctx.status(200),
      ctx.set("Content-Type", "application/json"),
      ctx.json(products)
    );
  }),

  rest.get("*/cart-items", (req, res, ctx) => {
    return res(
      ctx.delay(200),
      ctx.status(200),
      ctx.set("Content-Type", "application/json"),
      ctx.json(getCart())
    );
  }),

  rest.post("*/cart-items", async (req, res, ctx) => {
    const { productId } = await req.json();

    const cartItemId = addCartItem(productId);

    return res(ctx.delay(100), ctx.status(201), ctx.set("Location", `/cart-items/${cartItemId}`));
  }),

  rest.patch("*/cart-items/:cartItemId", async (req, res, ctx) => {
    const { cartItemId } = req.params;
    const { quantity } = await req.json();

    setCartItem(Number(cartItemId), quantity);

    return res(ctx.delay(100), ctx.status(200));
  }),

  rest.delete("*/cart-items/:cartItemId", async (req, res, ctx) => {
    const { cartItemId } = req.params;

    setCartItem(Number(cartItemId), 0);

    return res(ctx.delay(100), ctx.status(204));
  }),

  rest.get("*/coupons", (req, res, ctx) => {
    return res(
      ctx.delay(500),
      ctx.status(200),
      ctx.set("Content-Type", "application/json"),
      ctx.json(coupons)
    );
  }),

  rest.get("*/orders", (req, res, ctx) => {
    return res(
      ctx.delay(500),
      ctx.status(200),
      ctx.set("Content-Type", "application/json"),
      ctx.json(orders)
    );
  }),

  rest.post("*/orders", (req, res, ctx) => res(ctx.delay(300), ctx.status(204))),
];
