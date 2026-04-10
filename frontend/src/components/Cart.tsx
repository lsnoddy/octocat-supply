import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const { darkMode } = useTheme();

  return (
    <div
      className={`min-h-screen ${darkMode ? 'bg-dark' : 'bg-gray-100'} pt-20 pb-16 px-4 transition-colors duration-300`}
    >
      <div className="max-w-4xl mx-auto">
        <h1
          className={`text-3xl font-bold mb-8 ${darkMode ? 'text-light' : 'text-gray-800'} transition-colors duration-300`}
        >
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div
            className={`flex flex-col items-center justify-center py-20 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'
              } shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-16 w-16 mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <p
              className={`text-lg ${darkMode ? 'text-light' : 'text-gray-700'} mb-4`}
            >
              Your cart is empty
            </p>
            <Link
              to="/products"
              className="bg-primary hover:bg-accent text-white px-6 py-2 rounded-md font-medium transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div
                className={`rounded-lg shadow-sm border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                  } overflow-hidden`}
              >
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className={darkMode ? 'bg-gray-700' : 'bg-gray-100'}>
                      <tr>
                        <th className={`px-4 py-3 text-sm font-semibold text-left ${darkMode ? 'text-light' : 'text-gray-800'}`}>Product</th>
                        <th className={`px-4 py-3 text-sm font-semibold text-right ${darkMode ? 'text-light' : 'text-gray-800'}`}>Price</th>
                        <th className={`px-4 py-3 text-sm font-semibold text-center ${darkMode ? 'text-light' : 'text-gray-800'}`}>Quantity</th>
                        <th className={`px-4 py-3 text-sm font-semibold text-right ${darkMode ? 'text-light' : 'text-gray-800'}`}>Total</th>
                        <th className={`px-4 py-3 text-sm font-semibold text-center ${darkMode ? 'text-light' : 'text-gray-800'}`}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item) => (
                        <tr key={item.productId} className={darkMode ? 'border-t border-gray-700' : 'border-t border-gray-200'}>
                          <td className={`px-4 py-4 text-sm ${darkMode ? 'text-light' : 'text-gray-700'}`}>
                            <div className="flex items-center space-x-3">
                              {item.imgName && (
                                <img
                                  src={`/api/products/${item.productId}/image`}
                                  alt={item.name}
                                  className="h-12 w-12 rounded object-cover"
                                  onError={(e) => {
                                    const img = e.target as HTMLImageElement;
                                    img.src = '/placeholder.png';
                                  }}
                                />
                              )}
                              <span className="font-medium">{item.name}</span>
                            </div>
                          </td>
                          <td className={`px-4 py-4 text-sm text-right ${darkMode ? 'text-light' : 'text-gray-700'}`}>
                            ${item.price.toFixed(2)}
                          </td>
                          <td className="px-4 py-4 text-center">
                            <div className="flex items-center justify-center space-x-2">
                              <button
                                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                                className={`px-2 py-1 rounded ${darkMode ? 'bg-gray-700 text-light hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} transition-colors`}
                              >
                                −
                              </button>
                              <span className={`w-8 text-center ${darkMode ? 'text-light' : 'text-gray-700'}`}>
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                                className={`px-2 py-1 rounded ${darkMode ? 'bg-gray-700 text-light hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} transition-colors`}
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className={`px-4 py-4 text-sm text-right font-semibold ${darkMode ? 'text-light' : 'text-gray-700'}`}>
                            ${(item.price * item.quantity).toFixed(2)}
                          </td>
                          <td className="px-4 py-4 text-center">
                            <button
                              onClick={() => removeFromCart(item.productId)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                              aria-label="Remove item"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 inline"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div
                className={`rounded-lg shadow-sm border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                  } p-6 sticky top-24`}
              >
                <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-light' : 'text-gray-800'}`}>
                  Order Summary
                </h2>

                <div className={`flex justify-between mb-3 ${darkMode ? 'text-light' : 'text-gray-700'}`}>
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>

                <div className={`flex justify-between mb-4 pb-4 border-b ${darkMode ? 'border-gray-700 text-light' : 'border-gray-200 text-gray-700'}`}>
                  <span>Shipping</span>
                  <span className="text-green-500">Free</span>
                </div>

                <div className={`flex justify-between text-lg font-semibold mb-6 ${darkMode ? 'text-light' : 'text-gray-800'}`}>
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>

                <button
                  onClick={clearCart}
                  className={`w-full mb-3 px-4 py-2 rounded text-sm font-medium transition-colors ${darkMode ? 'bg-gray-700 text-light hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                >
                  Clear Cart
                </button>

                <Link
                  to="/products"
                  className="block text-center px-4 py-2 rounded text-sm font-medium bg-primary hover:bg-accent text-white transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
