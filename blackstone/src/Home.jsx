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
     <section className="w-full bg-[#FAFAFA] text-center pt-28 pb-24 px-6 border-t border-neutral-100">
  <div className="max-w-3xl mx-auto">
    
    {/* Clean, tracked luxury header */}
    <h2 className="text-4xl md:text-5xl font-serif tracking-[0.2em] text-neutral-900 uppercase mb-8 leading-tight">
      Knot by Blackstone
    </h2>
    
    {/* Delicate decorative divider line to ground the text */}
    <div className="w-12 h-[1px] bg-neutral-350 mx-auto my-6 opacity-60"></div>
    
    {/* Editorial description with balanced spacing */}
    <p className="text-[15px] md:text-base font-normal text-neutral-700 leading-relaxed max-w-2xl mx-auto tracking-wide">
      Inspired by an archival bow crafted in 1889—a symbol of love's most <br className="hidden sm:inline" />
      enduring ties—Knot embodies meaningful connection.
    </p>

  </div>
</section>


  

    </div>
  )


}

export default Home;