import { useState,useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes , useLocation } from 'react-router-dom';
import Header from "./header.jsx";
import Footer from "./footer.jsx";
import react from   'react';
import './index.css';
import Options from './options.jsx';
import Cart from './Cart.jsx';
import Utility from './utility.jsx';
import axios from 'axios';
import Home from './Home.jsx';
import ProductsCategory from './ProductsCategory.jsx';
import ItemView from './ItemView.jsx';
import Account from './Account.jsx';


axios.defaults.withCredentials = true;

function UseApp(){
  const location = useLocation();

  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchAuthStatus = async () => {
    try {
      const response = await axios.get("http://localhost:3000/auth/status");
      if (response.data.isAuthenticated) {
        setIsAuthenticated(true);
        setCurrentUser(response.data.user);
      } else {
        setIsAuthenticated(false);
        setCurrentUser(null);
      }
    } catch (err) {
      console.error("Auth status verification failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthStatus();
  }, []);

  if (loading) return <div className="text-center mt-20">Loading Blackstone Store...</div>;
  else{
     const hideHeaderFooter = location.pathname === '/Account';
  return (
    <>
    { !hideHeaderFooter && (
          <Header isAuthenticated={isAuthenticated} currentUser={currentUser} />
        ) }
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/category/:id" element={<ProductsCategory />} />
          <Route 
          path="/products/category/item/:serial_id" element={<ItemView />} 
          element={<ItemView isAuthenticated={isAuthenticated} currentUser={currentUser} />}
          />
          <Route path="/Account" element={<Account />} />
          <Route path="/Cart" element={<Cart />} />
      
        </Routes>
       { !hideHeaderFooter && <Footer /> }
    </>
    
  )
  }

 
}

function App() {
  
  
  return (
    <Router>
      <UseApp />
    </Router>
    
  )
}



 export default App


