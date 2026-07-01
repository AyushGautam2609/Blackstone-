import react from 'react'
import './index.css';
import {Link} from 'react-router-dom';
import { Search } from 'lucide-react';
import { Sparkles, User, ShoppingBag } from 'lucide-react';


function Header({ isAuthenticated, currentUser }) {

  const userInitial = isAuthenticated && currentUser?.name 
        ? currentUser.name.charAt(0).toUpperCase() 
        : null;

    return (<div className='Header'>
        
        <header className='bg-teal-500 text-black p-4 text-center'>
            <h1>Discover Blackstone's Graduation Gifts—a loving reminder of this milestone.</h1>
        </header>
        
        <header className="w-full py-6 px-8 border-b border-gray-200">
  <div className="flex justify-between items-center">
    
    {/* Left: Search & Location */}
    <div className="flex gap-4">
      <button className="hover:opacity-60 transition-opacity">
  <Search size={20} strokeWidth={1.2} className="text-neutral-900" />
</button>
      
    </div>

    {/* Center: Logo */}
   <div className='bg-white text-black p-4 text-center font-serif text-7xl'>
            <h1>BLACKSTONE AND CO.</h1>
        </div>  

    {/* Right: Account & Cart */}
    <div className="flex gap-6">
      <span className="cursor-pointer hover:opacity-60 transition-opacity text-neutral-900">
        <Sparkles 
          size={20} 
          strokeWidth={1.2} 
        />
      </span>
     <Link to="/Account" className="flex items-center justify-center">
        {isAuthenticated && userInitial ? (
          <span className="w-6 h-6 flex items-center justify-center border border-neutral-900 text-neutral-950 rounded-full font-medium text-xs tracking-tighter hover:bg-neutral-50 transition-colors">
            {userInitial}
          </span>
        ) : (
          <span className="cursor-pointer hover:opacity-60 transition-opacity text-neutral-900">
            <User 
              size={20} 
              strokeWidth={1.2} 
            />
          </span>
        )}
      </Link>

      <Link to = "/Cart" className="flex items-center justify-center">
        <span className="cursor-pointer hover:opacity-60 transition-opacity text-neutral-900">
          <ShoppingBag 
            size={20} 
            strokeWidth={1.2} 
          />
        </span>
      </Link>
    
    </div>
  </div>

  {/* Navigation Menu */}
  <nav className="flex justify-center gap-8 mt-6 text-sm uppercase text-neutral-900">
      
      <Link to={`/products/category/0`} className="hover:text-neutral-500 transition-colors font-medium text-[13px] tracking-[0.15em]">
        NECKLACE
      </Link>
      
      <Link to={`/products/category/1`} className="hover:text-neutral-500 transition-colors font-medium text-[13px] tracking-[0.15em]">
        BRACELETS
      </Link>
      
      <Link to={`/products/category/2`} className="hover:text-neutral-500 transition-colors font-medium text-[13px] tracking-[0.15em]">
        EARRINGS
      </Link>
      
      <Link to={`/products/category/3`} className="hover:text-neutral-500 transition-colors font-medium text-[13px] tracking-[0.15em]">
        RINGS
      </Link>
      
      <Link to={`/products/category/4`} className="hover:text-neutral-500 transition-colors font-medium text-[13px] tracking-[0.15em]">
        WATCHES
      </Link>
      
      <Link to={`/Cart`} className="hover:text-neutral-500 transition-colors font-medium text-[13px] tracking-[0.15em]">
        CART
      </Link>

    </nav>
</header> 
        
    </div>
    )
}

export default Header;