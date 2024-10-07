import React, { useEffect, useState } from "react";
import SummaryApi from "../common/API";
import { useSelector } from "react-redux";
import cartImg from "../assest/Images/Cart.webp";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import displayINRCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
  const user = useSelector((state) => state?.user?.user);
  const { cartCount, countCartProducts } = useCart();
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(false);

  const cartLoadingList = Array.from(
    { length: cartCount },
    (_, index) => index
  );

  const fetchCartData = async () => {
    const apiResponse = await fetch(
      `${SummaryApi.countCart.url}/${user?._id}`,
      {
        method: SummaryApi.countCart.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      }
    );

    const apiResponseData = await apiResponse.json();
    if (apiResponseData.success) {
      setCartData(apiResponseData.data);
    }
  };

  const handleLoading = async () => {
    await fetchCartData();
  };

  useEffect(() => {
    setLoading(true);
    handleLoading();
    setLoading(false);
  }, [user?._id]);

  const updateQuantity = async (productId, qty, increase = true) => {
    const newQty = increase ? qty + 1 : qty - 1;
    if (newQty < 1) return;

    const apiResponse = await fetch(SummaryApi.updateProductQuantity.url, {
      method: SummaryApi.updateProductQuantity.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId,
        quantity: newQty,
      }),
    });

    const apiData = await apiResponse.json();

    if (apiData.success) {
      fetchCartData();
    }
  };

  const deletedProduct = async (id) => {
    const apiResponse = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        cartProductId: id,
      }),
    });

    const apiData = await apiResponse.json();

    if (apiData.success) {
      toast.success(apiData.message);
      fetchCartData();
      setCartData((prevCartData) =>
        prevCartData.filter((product) => product._id !== id)
      );
      countCartProducts();
    }
  };

  const totalQty = cartData.reduce(
    (previousQty, currentQty) => previousQty + currentQty.quantity,
    0
  );

  const totalPrice = cartData.reduce(
    (previousValue, currentValue) =>
      previousValue +
      currentValue?.quantity * currentValue?.productId?.sellingPrice,
    0
  );

  const handlePayment = async () => {
    const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
    const response = await fetch(SummaryApi.checkout.url, {
      method: SummaryApi.checkout.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        cartItems: cartData,
      }),
    });

    const apiData = await response.json();
    if (apiData?.id) {
      stripePromise.redirectToCheckout({ sessionId: apiData?.id });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <p className="w-fit px-4 py-2 bg-white rounded text-slate-700 font-bold text-2xl">
        Shopping Cart
      </p>

      {cartData.length === 0 && !loading && (
        <div className="flex flex-col items-center mt-5">
          <img src={cartImg} className="w-64 h-64 object-contain mix-blend-multiply" alt="Empty Cart"/>
          <p className="mt-4 text-slate-500 font-semibold text-lg">
            Your cart is empty. Explore our products and add items to your cart.
          </p>
          <Link to={"/"} className="mt-6">
            <button className="bg-blue-600 rounded text-white font-semibold px-8 py-3">
              Continue Shopping
            </button>
          </Link>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8 mt-8">
        <div className="w-full lg:w-3/4">
          {loading ? (
            cartLoadingList.map((el) => (
              <div
                className="w-full bg-gray-200 h-40 p-1 my-2 rounded-lg animate-pulse"
                key={el}
              ></div>
            ))
          ) : (
            cartData.map((product) => (
              <div
                className="w-full bg-white shadow-md p-4 rounded-lg mb-4 flex"
                key={product?._id}
              >
                <div className="w-40 h-40 bg-gray-200 rounded overflow-hidden">
                  <img
                    src={product?.productId?.productImage[0]}
                    className="w-full h-full object-contain"
                    alt={product?.productId?.productName}
                  />
                </div>
                <div className="flex-grow pl-4">
                  <h2 className="font-semibold text-lg line-clamp-1">
                    {product?.productId?.productName}
                  </h2>
                  <p className="text-slate-500">{product?.productId?.category}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-lg text-red-600 font-semibold">
                      {displayINRCurrency(product?.productId?.sellingPrice)}
                    </p>
                    <p className="text-lg text-slate-700 font-semibold">
                      {displayINRCurrency(
                        product?.quantity * product?.productId?.sellingPrice
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <button
                      className="text-slate-700 hover:text-slate-900"
                      onClick={() =>
                        updateQuantity(product?._id, product?.quantity, false)
                      }
                    >
                      <FaMinusCircle className="text-2xl" />
                    </button>
                    <span className="text-lg font-semibold">
                      {product?.quantity}
                    </span>
                    <button
                      className="text-slate-700 hover:text-slate-900"
                      onClick={() =>
                        updateQuantity(product?._id, product.quantity, true)
                      }
                    >
                      <FaPlusCircle className="text-2xl" />
                    </button>
                    <button
                      className="ml-auto text-red-600 hover:text-red-800"
                      onClick={() => deletedProduct(product?._id)}
                    >
                      <MdDelete className="text-2xl" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartCount !== 0 && (
          <div className="w-full lg:w-1/4 bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            <div className="flex justify-between mb-4">
              <p className="text-lg font-medium">Total Items:</p>
              <p className="text-lg font-semibold">{totalQty}</p>
            </div>
            <div className="flex justify-between mb-6">
              <p className="text-lg font-medium">Total Price:</p>
              <p className="text-lg font-semibold">
                {displayINRCurrency(totalPrice)}
              </p>
            </div>
            <button
              className="w-full bg-blue-600 text-white text-lg font-semibold py-3 rounded-lg"
              onClick={handlePayment}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
