import { useDispatch } from "react-redux";
import { cartActions, CartItemModel, ItemModel } from "../../store/cart-slice";
import classes from "./CartItem.module.css";

type Props = {
  item: CartItemModel;
};

const CartItem = (props: Props) => {
  const dispatch = useDispatch();
  const { name, quantity, totalPrice, price } = props.item;

  const addHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        id: props.item.itemId,
        title: name,
        price,
        description: "",
      } as ItemModel)
    );
  };
  const removeHandler = () => {
    dispatch(cartActions.removeItemFromCart(props.item.itemId));
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{name}</h3>
        <div className={classes.price}>
          ${totalPrice.toFixed(2)}{" "}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeHandler}>-</button>
          <button onClick={addHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
