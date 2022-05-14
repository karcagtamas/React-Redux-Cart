import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { NotificationModel } from "./store/ui-slice";
import Notification from "./components/UI/Notification";
import { CartState } from "./store/cart-slice";
import { AppDispatch, RootState } from "./store";
import { fetchCartData, sendCartData } from "./store/cart-actions";

let isInitial = true;

function App() {
  const dispatch: AppDispatch = useDispatch();

  const cartIsVisible = useSelector<RootState, boolean>(
    (state) => state.ui.cartIsVisible
  );
  const cart = useSelector<RootState, CartState>((state) => state.cart);
  const notification: NotificationModel | null = useSelector<
    RootState,
    NotificationModel | null
  >((state) => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    dispatch(sendCartData(cart));
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        ></Notification>
      )}
      <Layout>
        {cartIsVisible && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
