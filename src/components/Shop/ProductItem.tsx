import { useDispatch } from "react-redux";
import { cartActions, ItemModel } from "../../store/cart-slice";
import Card from "../UI/Card";
import classes from "./ProductItem.module.css";

type Props = {
  id: string;
  title: string;
  price: number;
  description: string;
};

const ProductItem = (props: Props) => {
  const dispatch = useDispatch();
  const { id, title, price, description } = props;

  const addToCartHandler = () => {
    dispatch(
      cartActions.addItemToCart({ id, title, price, description } as ItemModel)
    );
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
