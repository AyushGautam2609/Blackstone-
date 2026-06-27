import react from 'react'
import './index.css';
import { useState,useEffect } from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom';

function ProductsCategory() {
    const [products,setProducts] = useState([]);
    const { id } = useParams();
    

    useEffect(() => {
        axios.get(`http://localhost:3000/products/category/${id}`)
        .then((response) => {  
            setProducts(response.data);
        })
        .catch((err) => {console.error(err); })
    },[id])

    

    if(products.length === 0){
        return <h2>Loading...</h2>
    }

    return (
           
           <div>
    <div className='bg-white text-black p-4 text-center font-serif text-3xl'>
        <h2>{products.length > 0 ? products[0].category_name : "Category"}</h2>
    </div>    

    
    <div className='grid grid-cols-1 md:grid-cols-3 gap-8 p-6'>
        {products.map((product, index) => (
            <div key={index} className='flex flex-col items-center group cursor-pointer'>
                
                <div className="aspect-square w-full bg-gray-50 overflow-hidden mb-4 p-8 flex items-center justify-center">
                    <Link to={`/products/category/item/${product.serial_id}`}>
                        <img 
                            onMouseEnter={(e) => {
                                e.target.style.transform = "scale(1.05)";
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = "scale(1)";
                            }}
                            src={`http://localhost:3000${product.image_url}`} 
                            alt={product.category_name} 
                            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' 
                        />
                    </Link>
                
                </div>
                <Link to={`/products/category/item/${product.serial_id}`}><h3 className='text-sm font-bold uppercase tracking-widest text-center'>{product.category_name_des}</h3></Link>
                <Link to={`/products/category/item/${product.serial_id}`}><p className='text-sm text-gray-600 text-center mt-1'>{product.description}</p></Link>
                <Link to={`/products/category/item/${product.serial_id}`}><p className='text-sm font-semibold mt-2'>${product.price}</p></Link>
            </div>
            
        ))}
    </div> 
</div>
            
        
        )
}

export default ProductsCategory