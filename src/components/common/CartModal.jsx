import React, { useState } from "react";
import { FaTimes, FaTrash, FaWhatsapp } from "react-icons/fa";
import { useCart } from "../../context/CartContext";

const ADMIN_PHONE = "919603655683";

const CartModal = () => {
  const { cartItems, isCartOpen, toggleCart, removeFromCart, updateQuantity } = useCart();
  const [userInfo, setUserInfo] = useState(() => {
    const saved = localStorage.getItem("whatsappUserInfo");
    return saved ? JSON.parse(saved) : { name: "", phone: "", address: "" };
  });

  if (!isCartOpen) return null;

  const handleChange = (e) => {
    const updatedInfo = { ...userInfo, [e.target.name]: e.target.value };
    setUserInfo(updatedInfo);
    localStorage.setItem("whatsappUserInfo", JSON.stringify(updatedInfo));
  };

  const getProductImage = (product) => {
    if (Array.isArray(product.images) && product.images.length > 0) {
      return product.images[0];
    }
    return product.image || "No Image";
  };

  const handleOrder = () => {
    const orderItems = cartItems
      .map((item, index) => {
        const img = getProductImage(item);
        const price = item.price === "N/A" || item.price === "  N/A" ? "Custom" : `₹${item.price}`;
        return `
${index + 1}. *${item.name}*
   💰 Price: ${price}
   🖼️ Image: ${img}
   🔢 Qty: ${item.quantity || 1}`;
      })
      .join("\n\n");

    const message = `🛍️ *THE PAINTED DREAM - BULK ORDER* 🛍️

👤 *Customer Details:*
------------------
Name: ${userInfo.name || "Not Provided"}
Phone: ${userInfo.phone || "Not Provided"}
Address: ${userInfo.address || "Not Provided"}

🛒 *Order Summary:*
------------------
${orderItems}

------------------
🌐 Page: ${window.location.href}`;

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const whatsappURL = isMobile
      ? `whatsapp://send?phone=${ADMIN_PHONE}&text=${encodeURIComponent(message)}`
      : `https://wa.me/${ADMIN_PHONE}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank");
    // toggleCart(false); // Optional: close cart after order
  };

  return (
    <div className="fixed inset-0 z-[200] flex justify-end bg-black/50 transition-opacity">
      {/* Sidebar */}
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col transform transition-transform duration-300">
        
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between bg-gray-50">
          <h2 className="text-xl font-bold text-gray-800">Your Cart ({cartItems.length})</h2>
          <button onClick={() => toggleCart(false)} className="text-gray-500 hover:text-red-500 transition">
            <FaTimes size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <p>Your cart is empty.</p>
              <button onClick={() => toggleCart(false)} className="mt-4 text-indigo-600 font-medium hover:underline">
                Continue Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="flex gap-4 border p-3 rounded-lg shadow-sm bg-white">
                <img
                  src={getProductImage(item)}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800 line-clamp-1">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      {item.price === "N/A" || item.price === "  N/A" ? "Price on Request" : `₹${item.price}`}
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                       <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-6 h-6 flex items-center justify-center bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                       >
                         -
                       </button>
                        <span className="text-sm font-bold w-4 text-center">
                          {item.quantity || 1}
                        </span>
                        <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-6 h-6 flex items-center justify-center bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                       >
                         +
                       </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 transition"
                      title="Remove Item"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout */}
        {cartItems.length > 0 && (
          <div className="p-4 bg-gray-50 border-t space-y-3">
            <h3 className="font-bold text-gray-700">Checkout Details</h3>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={userInfo.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Your Phone Number"
              value={userInfo.phone}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
             <textarea
              name="address"
              placeholder="Your Shipping Address"
              value={userInfo.address}
              onChange={handleChange}
              rows="2"
              className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
            
            <button
              onClick={handleOrder}
              disabled={!userInfo.name || !userInfo.phone}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-white transition
                ${!userInfo.name || !userInfo.phone 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transform active:scale-[0.98]"
                }`}
            >
              <FaWhatsapp size={20} /> Order via WhatsApp
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
