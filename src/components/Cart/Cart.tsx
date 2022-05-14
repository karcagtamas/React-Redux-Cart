import { useSelector } from "react-redux";
import { CartItemModel } from "../../store/cart-slice";
import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = () => {
  const items: CartItemModel[] = useSelector((state: any) => state.cart.items);
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {items.map((i) => (
          <CartItem item={i}></CartItem>
        ))}
      </ul>
    </Card>
  );
};

export default Cart;
