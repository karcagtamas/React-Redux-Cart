import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { NotificationModel, uiActions } from "./store/ui-slice";
import Notification from "./components/UI/Notification";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const cartIsVisible = useSelector(
    (state: { ui: any }) => state.ui.cartIsVisible
  );
  const cart = useSelector((state: any) => state.cart);
  const notification: NotificationModel = useSelector(
    (state: any) => state.ui.notification
  );

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    const send = async () => {
      dispatch(
        uiActions.showNotification({
          status: "pending",
          title: "Sending...",
          message: "Sending cart data!",
        } as NotificationModel)
      );
      const res = await fetch(
        "https://react-demo-4191e-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
        { method: "PUT", body: JSON.stringify(cart) }
      );

      if (!res.ok) {
        throw new Error("Sending cart data failed.");
      }

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success",
          message: "Sent cart data successfully!",
        } as NotificationModel)
      );
    };

    send().catch(() => {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Sending cart data failed!",
        } as NotificationModel)
      );
    });
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
