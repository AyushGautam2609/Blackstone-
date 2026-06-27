import react from 'react';
import './index.css';
import {Link}from 'react-router-dom';

function Options() { 
    return (
        <div className='bg-white text-black p-4 text-center font-serif text-3xl'>
            <section className="py-4 px-4">
          <h2 className="text-center text-3xl font-playfair mb-12">Shop by Category</h2>
  
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
    {/* Repeat this block for each category */}
    <div className="group cursor-pointer">
      <div className="aspect-square bg-gray-100 overflow-hidden mb-4">
       <Link to={`/products/category/0`}>
         <img src="Necklace.jpg" alt="Necklaces" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
       </Link>
      </div>    
      <p className="text-center text-sm uppercase tracking-widest font-medium"><Link to={`/products/category/0`}>NECKLACES & PENDENTS</Link></p>
      
    </div>
    {/* End of block */}
    {/* Repeat this block for each category */}
    <div className="group cursor-pointer">
      <div className="aspect-square bg-gray-100 overflow-hidden mb-4">
        <Link to={`/products/category/1`}>  
        <img src="/Bracelet.jpg" alt="Bracelets" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </Link>
      </div>    
      <p className="text-center text-sm uppercase tracking-widest font-medium"><Link to={`/products/category/1`}>BRACELETS</Link></p>
    </div>
    {/* End of block */}
    {/* Repeat this block for each category */}
    <div className="group cursor-pointer">
      <div className="aspect-square bg-gray-100 overflow-hidden mb-4">
        <Link to={`/products/category/2`}>
          <img src="/Earing.jpg" alt="Earrings" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </Link>
      </div>    
      <p className="text-center text-sm uppercase tracking-widest font-medium"><Link to={`/products/category/2`}>EARINGS</Link></p>
    </div>
    {/* End of block */}
    {/* Repeat this block for each category */}
    <div className="group cursor-pointer">
      <div className="aspect-square bg-gray-100 overflow-hidden mb-4">
        <Link to={`/products/category/3`}>
          <img src="/Ring.jpg" alt="Rings" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </Link>
      </div>    
      <p className="text-center text-sm uppercase tracking-widest font-medium"><Link to={`/products/category/3`}>RINGS</Link></p>
    </div>
    {/* End of block */}
    {/* Repeat this block for each category */}
    <div className="group cursor-pointer">
      <div className="aspect-square bg-gray-100 overflow-hidden mb-4">
        <Link to={`/products/category/4`}>
          <img src="/Watch.jpg" alt="Watches" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </Link>
      </div>    
      <p className="text-center text-sm uppercase tracking-widest font-medium"><Link to={`/products/category/4`}>Watches</Link></p>
    </div>
    {/* End of block */}

  </div>
</section>
        </div>
    )
}

export default Options;         