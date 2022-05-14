import { AppDispatch } from ".";
import { cartActions, CartState } from "./cart-slice";
import { uiActions, NotificationModel } from "./ui-slice";

export const fetchCartData = () => {
  return async (dispatch: AppDispatch) => {
    const fetchData = async () => {
      const res = await fetch(
        "https://react-demo-4191e-default-rtdb.europe-west1.firebasedatabase.app/cart.json"
      );

      if (!res.ok) {
        throw new Error("Could not fetch cart data.");
      }

      const data: CartState = await res.json();

      return data;
    };

    try {
      const data = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: data.items || [],
          totalQuantity: data.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Fetching cart data failed!",
        } as NotificationModel)
      );
    }
  };
};

export const sendCartData = (cartData: CartState) => {
  return async (dispatch: AppDispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      } as NotificationModel)
    );

    const send = async () => {
      const res = await fetch(
        "https://react-demo-4191e-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cartData.items,
            totalQuantity: cartData.totalQuantity,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Sending cart data failed.");
      }
    };

    try {
      await send();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success",
          message: "Sent cart data successfully!",
        } as NotificationModel)
      );
    } catch (err) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error",
          message: "Sending cart data failed!",
        } as NotificationModel)
      );
    }
  };
};
