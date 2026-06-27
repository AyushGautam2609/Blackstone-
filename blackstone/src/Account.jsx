import react from "react";
import './index.css';
import { useState , useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import { Navigate } from "react-router-dom";
import axios from 'axios';
import toast , {Toaster} from "react-hot-toast";


function Account() {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('signin'); 
  const [registerform , setregisterform] = useState({
    name : '',
    email : '',
    password : '',
    confirmpassword : '',
    number : '',
  }
  )
  const [loginform , setloginform]= useState(
    {
    email:'',
    password : ''
    }
  )
  const navigate = useNavigate();
  
  function Handlechange (event){

    const {name,value}=event.target;

    if(activeTab==='create'){
        setregisterform({
          ...registerform,
          [name]:value,
        })
    }
    else{
       setloginform({
        ...loginform,
        [name]:value,
       })
    }
  }
       
  function Handlesubmit (event){
       event.preventDefault();
       

       if(activeTab==='create'){
       
         if(registerform.confirmpassword==registerform.password && registerform.number.length==10){
           axios.post("http://localhost:3000/register",registerform)
         .then((response) => {
          if(response.status==201){

           toast.success('Successfully registered in! Redirecting...', {
              duration: 2000, 
              position: 'top-center',
            });

            setTimeout(() => {
              navigate("/");
            }, 1500);

          }
         })
         .catch((error)=>{
          toast.error('Something went wrong. Please try again later.');
         })
         }
         else if(registerform.confirmpassword!=registerform.password){
              toast.error('Confirmpassword and password do not match !');
              return ;
         }
         else if(registerform.number.length!=10){
             toast.error('Mobile Number should be of lenth of 10.');
             return;
         }
         
     }

       else{
          
        axios.post("http://localhost:3000/login",loginform)
         .then((response) => {
          if(response.status==201){

           toast.success('Successfully logged in! Redirecting...', {
              duration: 2000, 
              position: 'top-center',
            });

            setTimeout(() => {
              navigate("/");
            }, 1500);

          }
          else{
            toast.error('Mobile Number should be of lenth of 10.');
          }
         })
         .catch((error)=>{
          toast.error('Something went wrong. Please try again later.');
         })
        
       }
  }
  
  

  
 
return (
  <div className="flex  w-screen h-screen items-center justify-center bg-gray-100  font-sans text-[#111111]">

    <Toaster />

    <div className="relative flex w-screen h-screen overflow-hidden bg-white shadow-sm">
        
      
      <Link to="/">
      <button className="absolute right-6 top-6 z-10 p-1 bg-gray-200 rounded-full transition hover:text-black">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor" className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      </Link>
        

      <div className=" w-1/2 bg-[#A3E5D9]/20 p-12 md:flex md:items-center md:justify-center">
        <div className="relative aspect-square w-full max-w-[460px]">
          <img 
            src= {"/Account.jpg"} 
            alt="Tiffany Gift Boxes" 
            className="h-full w-full"
          />
        </div>
      </div>

      <div className="w-full px-6 py-12 sm:px-12 md:w-1/2 lg:px-16">
          
        <div className="mb-10 pt-10 border-b border-gray-200 text-sm tracking-wide">
          <button 
            type="button"
            onClick={() => setActiveTab('signin')} 
            className={`pb-3 pr-6 font-medium transition ${activeTab === 'signin' ? 'border-b border-black text-black' : 'text-gray-400 hover:text-black'}`}
          >
            Sign In
          </button>
          <button 
            type="button"
            onClick={() => setActiveTab('create')} 
            className={`pb-3 pl-6 font-medium transition ${activeTab === 'create' ? 'border-b border-black text-black' : 'text-gray-400 hover:text-black'}`}
          >
            Create an account
          </button>
        </div>

        {activeTab === 'signin' && (
          <form onSubmit={Handlesubmit} className="space-y-7">
            <div className="relative pt-1">
              <input
                name="email"
                type="email"
                onChange={Handlechange}
                value = {loginform.name}
                required
                placeholder="Email address*"
                className="peer w-full border-b border-gray-300 py-2.5 text-sm outline-none transition placeholder-shown:border-gray-300 focus:border-black"
              />
              <label className="absolute left-0 top-2.5 -z-10 origin-[0%] -translate-y-5 scale-75 text-xs text-gray-500 transition-all duration-200 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-sm peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:text-black">
                Email address*
              </label>
            </div>


            <div className="relative pt-1">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                onChange={Handlechange}
                value = {loginform.name}
                required
                placeholder="password*"
                className="peer w-full border-b border-gray-300 py-2.5 pr-8 text-sm outline-none transition placeholder-shown:border-gray-300 focus:border-black"
              />
              <label className="absolute left-0 top-2.5 -z-10 origin-[0%] -translate-y-5 scale-75 text-xs text-gray-500 transition-all duration-200 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-sm peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:text-black">
                Password*
              </label>

              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-2 text-gray-400 hover:text-black"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>

            <div className="text-right">
              <a href="#forgot" className="text-xs tracking-wide text-gray-600 underline underline-offset-2 transition hover:text-black">
                Forgot password
              </a>
            </div>

            {/* Action Button */}
            <button
              type="submit"
              className="w-full bg-black py-4 text-center text-xs font-medium uppercase tracking-[0.15em] text-white transition duration-300 hover:bg-neutral-800"
            >
              Sign In
            </button>
            <a
  href="http://localhost:3000/auth/google"
  className="flex items-center justify-center gap-3 w-full border border-black bg-white py-4 text-center text-xs font-medium uppercase tracking-[0.15em] text-black transition duration-300 hover:bg-neutral-50"
>
  
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      fill="#EA4335"
    />
  </svg>
  <span>Sign In With Google</span>
</a>
          </form>
        )}

           {activeTab === 'create' && (
          <form onSubmit={Handlesubmit} className="space-y-7">
            
            {/* First Name Field */}
            <div className="relative pt-1">
              <input
                name="name"
                type="text"
                required
                placeholder="Name*"
                value = {registerform.name}
                onChange={Handlechange}
                className="peer w-full border-b border-gray-300 py-2.5 text-sm outline-none transition placeholder-shown:border-gray-300 focus:border-black"
              />
              <label className="absolute left-0 top-2.5 -z-10 origin-[0%] -translate-y-5 scale-75 text-xs text-gray-500 transition-all duration-200 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-sm peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:text-black">
                First name*
              </label>
            </div>

            <div className="relative pt-1">
              <input
                name="email"
                type="email"
                required
                placeholder="Email address*"
                value={registerform.email}
                onChange={Handlechange}
                className="peer w-full border-b border-gray-300 py-2.5 text-sm outline-none transition placeholder-shown:border-gray-300 focus:border-black"
              />
              <label className="absolute left-0 top-2.5 -z-10 origin-[0%] -translate-y-5 scale-75 text-xs text-gray-500 transition-all duration-200 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-sm peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:text-black">
                Email address*
              </label>
            </div>

            <div className="relative pt-1">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="Password*"
                value={registerform.password}
                onChange={Handlechange}
                className="peer w-full border-b border-gray-300 py-2.5 pr-8 text-sm outline-none transition placeholder-shown:border-gray-300 focus:border-black"
              />
              <label className="absolute left-0 top-2.5 -z-10 origin-[0%] -translate-y-5 scale-75 text-xs text-gray-500 transition-all duration-200 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-sm peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:text-black">
                Password*
              </label>
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-2 text-gray-400 hover:text-black"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>

            
            <div className="relative pt-1">
              <input
                name="confirmpassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                placeholder="Confirm password*"
                value={registerform.confirmpassword}
                onChange={Handlechange}
                className="peer w-full border-b border-gray-300 py-2.5 pr-8 text-sm outline-none transition placeholder-shown:border-gray-300 focus:border-black"
              />
              <label className="absolute left-0 top-2.5 -z-10 origin-[0%] -translate-y-5 scale-75 text-xs text-gray-500 transition-all duration-200 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-sm peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:text-black">
                Confirm password*
              </label>
              <button 
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-0 top-2 text-gray-400 hover:text-black"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.2" stroke="currentColor" className="h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </div>

            
            <div className="flex gap-4 items-end">
              <div className="w-1/4 relative pt-1">
                <select
                  name="phonePrefix"
                  className="w-full bg-transparent border-b border-gray-300 py-2.5 text-sm outline-none focus:border-black appearance-none cursor-pointer text-gray-700"
                  defaultValue="+1"
                >
                  <option value="+1">+1</option>
                  <option value="+44">+44</option>
                  <option value="+91">+91</option>
                </select>
                <label className="absolute left-0 -top-3 scale-75 text-xs text-gray-500">Phone Prefix*</label>
                <span className="absolute right-1 bottom-3 pointer-events-none text-xs text-gray-500">▼</span>
              </div>

              <div className="w-3/4 relative pt-1">
                <input
                  name="number"
                  type="tel"
                  required
                  placeholder="Mobile Phone Number*"
                  onChange ={Handlechange}
                  value={registerform.number}
                  className="peer w-full border-b border-gray-300 py-2.5 text-sm outline-none transition placeholder-shown:border-gray-300 focus:border-black"
                />
                <label className="absolute left-0 top-2.5 -z-10 origin-[0%] -translate-y-5 scale-75 text-xs text-gray-500 transition-all duration-200 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-sm peer-focus:-translate-y-5 peer-focus:scale-75 peer-focus:text-black">
                  Mobile Phone Number*
                </label>
              </div>
            </div>

           

            <button
              type="submit"
              className="w-full bg-black py-4 text-center text-xs font-medium uppercase tracking-[0.15em] text-white transition duration-300 hover:bg-neutral-800"
            >
              Create Account
            </button>
            <a
  href="http://localhost:3000/auth/google"
  className="flex items-center justify-center gap-3 w-full border border-black bg-white py-4 text-center text-xs font-medium uppercase tracking-[0.15em] text-black transition duration-300 hover:bg-neutral-50"
>
  
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      fill="#EA4335"
    />
  </svg>
  <span>Sign In With Google</span>
</a>
          </form>
        )}

        
        <p className="mt-4 text-[11px] text-gray-500">*Required Fields</p>

        
        {activeTab === 'signin' && (
          <div className="mt-10 pt-8 border-t border-gray-100">
            <h3 className="mb-4 text-base tracking-wide font-serif text-black">
              Create an Account
            </h3>
              
            <ul className="grid grid-cols-1 gap-x-6 gap-y-2.5 text-xs text-gray-600 sm:grid-cols-2">
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-black"></span>
                <span>Faster Checkout</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-black"></span>
                <span>View saved addresses & payments</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-black"></span>
                <span>Access your order history</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-black"></span>
                <span>Receive email communications</span>
              </li>
            </ul>
          </div>
        )}

      </div>
    </div>
  </div>
);
}



export default Account;