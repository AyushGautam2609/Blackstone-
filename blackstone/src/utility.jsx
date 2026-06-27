import react from 'react';
import './index.css';

function Utility() {

  
  return (
    <div>
      
      <h2 className="text-center text-3xl font-playfair mb-12 pt-8 font-serif">Icons of Summer</h2>
      <section className="flex flex-col md:flex-row items-center w-full h-[700px]">
        <div className="w-full md:w-1/2 h-full">
          <video src="/First.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
        </div>
        <div className="w-full md:w-1/2 p-12 text-center">
          <h2 className="text-4xl font-serif mb-6">HardWear by Blackstone</h2>
          <p>A design from 1962 inspired by New York, HardWear is an <br /> expression of love's strength.</p>
        </div>
      </section>

      
      <section className="flex flex-col md:flex-row-reverse items-center w-full h-[700px]">
        <div className="w-full md:w-1/2 h-full">
          <video src="/Second.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
        </div>
        <div className="w-full md:w-1/2 p-12 text-center">
          <h2 className="text-4xl font-serif mb-6">Another Collection</h2>
          <p>A feat of ingenuity and technical artistry designed in 1959, Sixteen Stone is a symbol of love's nurturing forces.</p>
        </div>
      </section>
    </div>
  )
}
 

export default Utility; 