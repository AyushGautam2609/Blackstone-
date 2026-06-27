import React from 'react';
import { useState,useEffect } from 'react';
import { useParams , useNavigate } from 'react-router-dom';
import axios from 'axios';
import './index.css';
import { Link} from 'react-router-dom';
import {useRef} from 'react';
import toast , {Toaster} from "react-hot-toast";



function ItemView({ isAuthenticated }) {
    
    const [products,setProducts] = useState(null);
    const { serial_id } = useParams();
    const [options,setOptions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        setProducts(null);
        axios.get(`http://localhost:3000/products/category/item/${serial_id}`)
        .then((response) => {  
            setProducts(response.data);     
        })
        .catch((err) => {console.error(err); }) 
    },[serial_id]
  )

  useEffect(() => {
        axios.get(`http://localhost:3000/products/option/jewels`)
        .then((response) => {  
            setOptions(response.data);     
        })
        .catch((err) => {console.error(err); }) 
    },[]
  )

    const scrollRef = useRef(null);

    const handleScroll = (direction) => {  
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollAmount = direction === 'left' ?
                (scrollLeft - clientWidth)/2 : (scrollLeft + clientWidth)/2;

            scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }
    
   if(!products){
        return <h2>Loading...</h2>
    }
    
    //HandleCartClick

    const handleaddtocartclick = async () => {
    if (!isAuthenticated) {
      navigate("/Account");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/cart/add", {
        productId: products.serial_id,
        quantity: 1
      });
      toast.success('Product Successfully added to cart', {
              duration: 2000, 
              position: 'top-center',
            });
    } catch (err) {
      console.error("Cart action failed:", err);
       toast.error('Cart Action Failed');
    }
  };
    
    //Handle click buy click
    const handlebuyclick = async () => {
    
    if (!isAuthenticated) {
      navigate("/Account");
      return;
    }

  };

        return (

<div className="min-h-screen bg-white font-sans py-12 px-6">
  <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
    
    
    <div className="lg:sticky lg:top-12 flex flex-col space-y-8">
      
      
      <div className="space-y-3">
        <h1 className="text-3xl font-light text-black tracking-tight">{products.category_name_des}</h1>
        <p className="text-md text-gray-700 leading-relaxed">{products.description}</p>
        <p className="text-xl text-black pt-2">${products.price?.toLocaleString()}</p>
      </div>

      
      <div className="flex gap-4">
        <div className="border border-black p-2 cursor-pointer w-20 text-center">
          <img src={`http://localhost:3000${products.image_url}`} alt="Variant" className="w-full h-16 object-contain" />
          <span className="block text-[10px] mt-2 uppercase tracking-widest font-semibold">18k Rose Gold</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button className="w-full bg-[#F5F2ED] text-black text-xs font-bold tracking-[0.2em] py-4 hover:bg-stone-200 transition">
            STOCKS AVAILABLE: {products.stock}
        </button>
        <button
        onClick={handleaddtocartclick}
        className="w-full bg-black text-white text-xs font-bold tracking-[0.2em] py-4 hover:bg-gray-800 transition">
          ADD TO CART
        </button>
        <button 
        onClick={handlebuyclick}
        className="w-full bg-[#F5F2ED] text-black text-xs font-bold tracking-[0.2em] py-4 hover:bg-stone-200 transition">
          BUY NOW
        </button>
      </div>

      
      <button
      className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] hover:underline">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
        Find IN STORE
      </button>
    </div>

    
    <div className="flex flex-col items-center">
      <img 
        src={`http://localhost:3000${products.image_url}`} 
        alt="Product View" 
        className="w-full object-contain mix-blend-multiply" 
      />
      <h3 className="mt-8 text-sm text-black-200 bold uppercase tracking-widest">Scroll to discover</h3>

      <div className="mt-16 border-t border-gray-200 pt-8 max-w-3xl">
  <div class="mb-8 text-sm">
    <p>Buy now and pay later with <span class="font-bold">PayPal</span>. <a href="#" class="underline">Learn more</a></p>
  </div>

  <div class="prose prose-sm text-gray-800 leading-relaxed mb-8">
    <h3>{products.category_name_des} is an expression of love's transformative strength. Inspired by 
      a quintessential piece found in the House's archives, this design embodies enduring resilience 
      and uninhibited spirit. Featuring our signature links, this piece makes a bold statement. 
      An excellent gift for someone with distinctive taste.</h3>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-sm">
    <div class="flex items-center">
      <span class="w-1 h-1 bg-black rounded-full mr-3"></span>
      <span>18k yellow gold</span>
    </div>
    <div class="flex items-center">
      <span class="w-1 h-1 bg-black rounded-full mr-3"></span>
      <span>Motif size, medium</span>
    </div>
    <div class="flex items-center">
      <span class="w-1 h-1 bg-black rounded-full mr-3"></span>
      <span>1.1" long</span>
    </div>
  </div>

  <a href="#" class="inline-flex items-center text-sm font-medium hover:underline">
    More details 
    <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
    </svg>
  </a>

  <div class="mt-8">
    <button class="flex items-center text-sm uppercase tracking-widest hover:text-gray-600">
      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
      Save
    </button>
  </div>
</div>
    </div>


  </div>

  <section class="max-w-6xl mx-auto py-20 px-4">
  <h2 class="text-2xl font-serif text-center text-gray-900 mb-10">You May Also Like</h2>

  {/* Added 'flex-nowrap' and 'w-full' to ensure single row scrolling */}
  <div ref={scrollRef} class="flex flex-nowrap overflow-x-auto gap-6 pb-4 scrollbar-hide snap-x">
    {options.map((option) => (
      // Added 'flex-shrink-0' and a specific width (e.g., w-48) so items don't squish
      <div key={option.serial_id} class="flex-shrink-0 w-70 flex flex-col items-center text-center group snap-start">
        <Link to={`/products/category/item/${option.serial_id}`} class="block">
          <div class="mb-4 h-48 flex items-center justify-center">
            <img 
              src={`http://localhost:3000${option.image_url}`} 
              alt={option.category_name_des} 
              class="max-h-full object-contain"
            />
          </div>
          {/* <h3 class="text-sm font-medium text-gray-900 truncate w-full">{option.category_name_des}</h3> */}
          <p class="text-xs text-gray-500 mt-1">{option.category_name_des}</p>
          <p class="text-xs text-gray-500 mt-1">${option.price.toFixed(2)}</p>
        </Link>
      </div>
    ))}
  </div>

  <div className="flex items-center justify-center mt-8 gap-4">
    <button onClick={() => handleScroll('left')} className="p-2 border rounded-full hover:bg-gray-100">&lt;</button>
    <button onClick={() => handleScroll('right')} className="p-2 border rounded-full hover:bg-gray-100">&gt;</button>
  </div>
</section>

</div>
        )

}




export default ItemView;