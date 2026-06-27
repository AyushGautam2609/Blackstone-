import react from 'react'
import './index.css';
import {Link} from 'react-router-dom';


function Header() {

    return (<div className='Header'>
        
        <header className='bg-teal-500 text-black p-4 text-center'>
            <h1>Discover Blackstone's Graduation Gifts—a loving reminder of this milestone.</h1>
        </header>
        
        <header className="w-full py-6 px-8 border-b border-gray-200">
  <div className="flex justify-between items-center">
    
    {/* Left: Search & Location */}
    <div className="flex gap-4">
      <span>🔍</span>
      <span>📍</span>
    </div>

    {/* Center: Logo */}
   <div className='bg-white text-black p-4 text-center font-serif text-7xl'>
            <h1>BLACKSTONE AND CO.</h1>
        </div>  

    {/* Right: Account & Cart */}
    <div className="flex gap-6">
      <span>💍</span>
      <Link to={`/Account`}> <span>👤</span> </Link>
      <span>🛒</span>
    </div>
  </div>

  {/* Navigation Menu */}
  <nav className="flex justify-center gap-8 mt-6 text-sm uppercase tracking-wider">
    {['High Jewelry', 'Jewelry', 'Engagement', 'Watches', 'Home'].map((item) => (
      <a href="#" key={item} className="hover:text-gray-500 transition-colors">
        {item}
      </a>
    ))}
  </nav>
</header> 
        
    </div>
    )
}

export default Header;