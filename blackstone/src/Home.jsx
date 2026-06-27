import react from 'react';
import Header from "./header.jsx";
import Footer from "./footer.jsx";
import Options from './options.jsx';
import Utility from './utility.jsx';
import './index.css';

function Home() {

    return(<div className="w-full overflow-x-hidden">
    
     <div >
            <img src="/image2.jpg" alt="Home_Image" className="w-full "/>
     </div>
     <Options />
     <Utility />
     <div>
       <img src="/image.png" alt="Home_Image" className="w-full pt-12 " />
     </div>
     <div className="pt-8 text-center text-2xl font-serif">
      <h2 className="text-5xl md:text-6xl font-serif tracking-widest uppercase mb-8">
        Knot by Blackstone
      </h2>
        
        <p className="text-lg pt-4">Inspired by an archival bow crafted in 1889—a symbol of love's most <br />enduring ties— Knot embodies meaningful connection.</p>
     </div>


  

    </div>
  )


}

export default Home;