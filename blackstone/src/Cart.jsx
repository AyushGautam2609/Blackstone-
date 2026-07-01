import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './index.css';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Fetch live database cart data on mount
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/cart", {
          withCredentials: true // Crucial to pass your session login cookie
        });
        setCartItems(response.data);
      } catch (err) {
        console.error("Error fetching cart data:", err);
        setError(err.response?.data?.message || "Failed to load cart.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, []);

  // 2. Handle Quantity dropdown changes in the database
  const handleQuantityChange = async (productId, newQty) => {
    try {
      // Optimistically update frontend state locally first
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.product_id === productId ? { ...item, quantity: Number(newQty) } : item
        )
      );

      // Send update payload to backend (reusing your cart add endpoint or an update endpoint)
      await axios.post("http://localhost:3000/cart/add", {
        productId: productId,
        quantity: Number(newQty)
      }, { withCredentials: true });

    } catch (err) {
      console.error("Failed to sync updated quantity:", err);
    }
  };

  // 3. Handle removing a specific item entirely
  const handleDeleteItem = async (cartItemId) => {
    try {
      // Remove from frontend state array
      setCartItems(prevItems => prevItems.filter(item => item.cart_item_id !== cartItemId));
      
      // Optional: Add an axios.delete endpoint call here if you have one on your backend
      // await axios.delete(`http://localhost:3000/cart/${cartItemId}`, { withCredentials: true });
    } catch (err) {
      console.error("Failed to delete cart item:", err);
    }
  };

  // 4. Cumulative calculations matching array collections
  const subtotal = cartItems.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
  const deliveryFee = 0.00;
  const estimatedTax = 0.00;
  const estimatedTotal = subtotal + deliveryFee + estimatedTax;

  // Render conditional states
  if (loading) return <div className="text-center mt-20 font-serif">Loading your cart...</div>;
  if (error) return <div className="text-center mt-20 text-red-600 font-sans">{error}</div>;

  return (
    <div className="min-h-screen bg-white text-black font-sans antialiased selection:bg-neutral-200">
      
      {/* --- Main Workspace Wrapper --- */}
      <main className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        {/* Total global items count badge */}
        <h2 className="text-center font-serif text-xl md:text-2xl tracking-wide mb-14 text-neutral-900">
          Shopping Cart ({cartItems.reduce((acc, curr) => acc + curr.quantity, 0)})
        </h2>

        {/* Empty State Fallback */}
        {cartItems.length === 0 ? (
          <div className="text-center py-20 border-t border-neutral-200">
            <p className="font-serif text-lg text-neutral-600 mb-6">Your shopping cart is completely empty.</p>
            <Link to="/" className="bg-black text-white px-8 py-3 text-xs uppercase tracking-widest font-semibold hover:bg-neutral-800 transition">
              Continue Shopping
            </Link>
          </div>
        ) : (
          /* Two-Column Structured Grid System */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-12 items-start border-t border-neutral-200 pt-10">
            
            {/* COLUMN LEFT: Loop over your array rows list */}
            <div className="lg:col-span-7 flex flex-col gap-12 divide-y divide-neutral-100">
              {cartItems.map((item, index) => (
                <div key={item.cart_item_id} className={`flex flex-col sm:flex-row gap-8 ${index > 0 ? 'pt-12' : ''}`}>
                  
                  {/* Embedded Asset Panel Wrapper */}
              
                  <div className="w-full sm:w-44 h-44 bg-white flex items-center justify-center border border-neutral-100 p-2 flex-shrink-0">
                    <img 
                      src={`http://localhost:3000${item.image_url}`} 
                      alt={item.category_name_des} 
                      className="max-h-full max-w-full object-contain mix-blend-multiply"
                    />
                  </div>
                  

                  {/* Core Item Properties Detail Column */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="space-y-4">
                      {/* Product Name Descriptor & Unit Cost Line */}
                      <div className="flex justify-between items-start gap-4">
                        <h3 className="text-lg md:text-xl font-normal font-serif tracking-normal text-neutral-900">
                          {item.category_name_des}
                        </h3>
                        <span className="text-sm font-medium whitespace-nowrap text-neutral-900">
                          ${(item.price * item.quantity).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      
                      <p className="text-sm text-neutral-600 font-light -mt-2">
                        {item.description}
                      </p>
                      
                      {/* Attribute Key-Value Listing Grid */}
                      <div className="pt-2 space-y-1.5 text-xs text-neutral-800 tracking-wide">
                        <div className="flex">
                          <span className="w-20 font-semibold text-neutral-900">Material</span>
                          <span className="text-neutral-600">18k Yellow Gold</span> {/* Database fallback info */}
                        </div>
                        <div className="flex">
                          <span className="w-20 font-semibold text-neutral-900">Size</span>
                          <span className="text-neutral-600">Medium</span>
                        </div>
                        
                        {/* Native Quantity Picker Control Input */}
                        <div className="flex items-center">
                          <span className="w-20 font-semibold text-neutral-900">Qty</span>
                          <div className="relative">
                            <select 
                              value={item.quantity} 
                              onChange={(e) => handleQuantityChange(item.product_id, e.target.value)}
                              className="appearance-none border border-neutral-300 rounded pl-2.5 pr-7 py-0.5 text-xs bg-white focus:outline-none focus:border-black cursor-pointer text-neutral-900"
                            >
                              {[...Array(Math.min(item.stock, 10)).keys()].map((num) => (
                                <option key={num + 1} value={num + 1}>{num + 1}</option>
                              ))}
                            </select>
                            <span className="absolute right-2 top-1.5 text-[8px] pointer-events-none text-neutral-500">▼</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Auxiliary Meta Messaging & Modification Links */}
                    <div className="pt-6 sm:pt-4">
                      <p className="text-xs text-neutral-500 mb-5 flex items-center gap-2 font-light">
                        <span className="w-1 h-1 bg-neutral-400 rounded-full"></span>
                        Complimentary Express Delivery With Signature
                      </p>
                      
                      <div className="flex gap-5 text-xs underline text-neutral-600 tracking-wide font-light">
                        <button className="hover:text-black transition">Edit</button>
                        <button className="hover:text-black transition">Save for Later</button>
                        <button 
                          onClick={() => handleDeleteItem(item.cart_item_id)} 
                          className="hover:text-red-700 text-neutral-500 transition cursor-pointer"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {/* COLUMN RIGHT: Checkout Operations Summary Panel */}
            <div className="lg:col-span-5 bg-[#F6F5F3] p-8 space-y-6 rounded-xs lg:sticky lg:top-6">
              <div className="space-y-4 text-xs tracking-wide text-neutral-800">
                
                {/* Financial Calculation Row: Subtotal */}
                <div className="flex justify-between items-center">
                  <span className="font-light">Subtotal</span>
                  <span className="font-semibold text-sm text-neutral-900">
                    ${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                {/* Financial Calculation Row: Express Shipping Protection */}
                <div className="flex justify-between items-start gap-4">
                  <span className="font-light max-w-[75%] leading-relaxed">
                    Complimentary Express Delivery With Signature
                  </span>
                  <span className="font-medium text-neutral-900">
                    ${deliveryFee.toFixed(2)}
                  </span>
                </div>

                {/* Financial Calculation Row: Estimated Tax Breakdown */}
                <div className="flex justify-between items-center border-b border-neutral-300 pb-4">
                  <div className="flex items-center gap-1.5">
                    <span className="font-light">Estimated Tax</span>
                    <button 
                      className="text-[9px] border border-neutral-400 rounded-full w-3.5 h-3.5 inline-flex items-center justify-center text-neutral-500 hover:border-black hover:text-black transition-colors"
                      title="Tax calculated at checkout phase"
                    >
                      i
                    </button>
                  </div>
                  <span className="font-medium text-neutral-900">
                    ${estimatedTax.toFixed(2)}
                  </span>
                </div>

                {/* Expanding Collapse Action Trigger Component */}
                <div>
                  <button className="text-neutral-700 flex items-center gap-1.5 hover:text-black text-[11px] font-light transition">
                    Taxes and other shipping methods 
                    <span className="text-[8px] opacity-70">▼</span>
                  </button>
                </div>
              </div>

              {/* Total Balance Block Indicator */}
              <div className="pt-2 border-t border-neutral-200 flex flex-col space-y-1">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-semibold tracking-widest uppercase text-neutral-900">
                    Estimated Total
                  </span>
                  <span className="text-lg font-medium font-sans text-neutral-900">
                    ${estimatedTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <p className="text-[11px] text-neutral-500 italic font-light">
                  Complimentary Delivery & Returns
                </p>
              </div>

              {/* Final Submission Target CTA Element Action Link */}
              <div className="pt-4">
                <button className="w-full bg-black text-white py-4 text-xs font-bold uppercase tracking-[0.2em] shadow-sm hover:bg-neutral-800 transition duration-150 ease-in-out active:scale-[0.995]">
                  Proceed To Checkout
                </button>
              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}

export default Cart;