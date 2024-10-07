// src/pages/UserWishList.js
import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common/API";
import { useSelector } from "react-redux";
import wishlistImg from "../assest/Images/wishlist.png";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import Context from "../context/Context";
import displayINRCurrency from "../helpers/displayCurrency";
import Button from "../components/ui/Button"; // Ensure the path and casing are correct

const UserWishList = () => {
  const user = useSelector((state) => state?.user?.user);
  const [wishlistData, setWishlistData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const { fetchAddToWishListCount } = useContext(Context);
  const wishlistLoadingList = new Array(context.etchAddToWishListCount).fill(null);

  const fetchWishlistData = async () => {
    setLoading(true);
    try {
      const apiResponse = await fetch(`${SummaryApi.getWishList.url}`, {
        method: SummaryApi.getWishList.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });

      const apiResponseData = await apiResponse.json();
      if (apiResponseData.success) {
        setWishlistData(apiResponseData.data);
      }
    } catch (error) {
      console.error("Error fetching wishlist data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoading = async () => {
    await fetchWishlistData();
  };

  useEffect(() => {
    handleLoading();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?._id]);

  const deleteWishlistProduct = async (e, wishlistId) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      const apiResponse = await fetch(`${SummaryApi.deletewishlistProduct.url}`, {
        method: SummaryApi.deletewishlistProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          wishlistId: wishlistId,
        }),
      });

      const apiResponseData = await apiResponse.json();
      if (apiResponseData.success) {
        fetchWishlistData();
        fetchAddToWishListCount();
        // Optionally, show a success message
      }
    } catch (error) {
      console.error("Error deleting wishlist product:", error);
      // Optionally, show an error message
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-blue-950">My Wishlist</h1>
        <p className="p-2 bg-white dark:bg-gray-50 rounded text-slate-600 dark:text-gray-700 font-semibold text-lg">
          Total Wishlist Products: {wishlistData.length}
        </p>
      </div>

      {/* Empty Wishlist State */}
      {wishlistData.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center mt-10">
          <img src={wishlistImg} alt="Wishlist Empty" className="w-48 h-48 mb-4" />
          <p className="text-gray-500 dark:text-gray-400 text-center mb-6">
            Looks like you have not added anything to your wishlist. Go ahead and explore top products.
          </p>
          <Link to="/" className="mt-5">
            <Button className="bg-blue-600 text-white hover:bg-blue-700 w-64">
              Continue Shopping
            </Button>
          </Link>
        </div>
      )}

      {/* Wishlist Products */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading
          ? wishlistLoadingList.map((el, index) => (
              <div
                className="bg-slate-200 h-64 rounded-lg animate-pulse"
                key={index}
              >
                <div className="w-full h-40 bg-slate-300 rounded-t-lg"></div>
                <div className="p-4">
                  <div className="h-6 bg-slate-300 rounded mb-2"></div>
                  <div className="h-4 bg-slate-300 rounded mb-2"></div>
                  <div className="h-4 bg-slate-300 rounded mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-6 bg-slate-300 rounded w-24"></div>
                    <div className="h-6 bg-slate-300 rounded w-24"></div>
                  </div>
                </div>
              </div>
            ))
          : wishlistData.map((product) => (
              <div
                key={product?._id}
                className="bg-white dark:bg-gray-100 shadow-md rounded-lg p-4 transform transition duration-500 ease-in-out hover:scale-105 flex flex-col"
              >
                {/* Product Image */}
                <Link to={`/product/${product?.productId?._id}`} className="flex-grow">
                  <img
                    src={product?.productId?.productImage[0]}
                    alt={product?.productId?.productName}
                    className="aspect-square object-cover w-full rounded-lg overflow-hidden"
                    loading="lazy"
                  />
                  {/* Product Details */}
                  <h2 className="text-lg font-bold mt-2 text-gray-800 dark:text-gray-700 line-clamp-1">
                    {product?.productId?.productName}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-600 capitalize">
                    {product?.productId?.category}
                  </p>
                  <p className="text-red-400 text-lg font-medium mt-2">
                    {displayINRCurrency(product?.productId?.sellingPrice)}
                  </p>
                </Link>
                {/* Action Buttons */}
                <div className="flex justify-between items-center mt-4">
                  <Button
                    size="sm"
                    onClick={(e) => deleteWishlistProduct(e, product?._id)}
                    variant="outline"
                    className="flex items-center gap-2"
                    aria-label={`Remove ${product?.productId?.productName} from wishlist`}
                  >
                    <MdDelete className="text-red-600" />
                    Remove
                  </Button>
                  {/* <Button
                    size="sm"
                    className="bg-blue-600 text-white hover:bg-blue-700"
                    onClick={() => {
                      // Implement Add to Cart functionality
                      // For example:
                      // dispatch(addToCart(product));
                      // Optionally, remove from wishlist
                    }}
                  >
                    Add to Cart
                  </Button> */}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default UserWishList;
