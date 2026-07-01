import react from 'react'
import './index.css';

function Footer() {

    const sectionHeaderStyle = "text-xs font-bold tracking-[0.18em] text-neutral-900 uppercase mb-5";
    const linkItemStyle = "text-[13px] text-neutral-800 hover:text-neutral-500 transition-colors block font-normal cursor-pointer";

    return (
    <div className="Footer">
      <footer className="w-full bg-[#FAFAFA] border-t border-neutral-200 pt-16 pb-12 px-6 md:px-16 lg:px-24 font-sans">
        {/* Main Footer Links Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 mb-16">
          
          {/* Column 1: Support */}
          <div>
            <h4 className={sectionHeaderStyle}>Support</h4>
            <div className="space-y-3.5">
              <a href="#" className={linkItemStyle}>Track Your Order</a>
              <a href="#" className={linkItemStyle}>Contact Us</a>
              <a href="#" className={linkItemStyle}>Book a Virtual Appointment</a>
              <a href="#" className={linkItemStyle}>Frequently Asked Questions</a>
              <a href="#" className={linkItemStyle}>Shipping & Return Policy</a>
              <a href="#" className={linkItemStyle}>Store Information | Store List</a>
              <a href="#" className={linkItemStyle}>Site Index</a>
              <a href="#" className={linkItemStyle}>Gift Card</a>
              <a href="#" className={linkItemStyle}>Jewelry Gift Guide</a>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 className={sectionHeaderStyle}>Services</h4>
            <div className="space-y-3.5">
              <a href="#" className={linkItemStyle}>Contact a Tiffany Diamond Expert</a>
              <a href="#" className={linkItemStyle}>Request Repair</a>
              <a href="#" className={linkItemStyle}>Personalization</a>
              <a href="#" className={linkItemStyle}>Business Accounts</a>
              <a href="#" className={linkItemStyle}>Tiffany Select Financing</a>
              <a href="#" className={linkItemStyle}>Alertline</a>
            </div>
          </div>

          {/* Column 3: About */}
          <div>
            <h4 className={sectionHeaderStyle}>About</h4>
            <div className="space-y-3.5">
              <a href="#" className={linkItemStyle}>Sustainability</a>
              <a href="#" className={linkItemStyle}>Tiffany & Co Foundation</a>
              <a href="#" className={linkItemStyle}>Tiffany Careers</a>
              <a href="#" className={linkItemStyle}>Tiffany for the Press</a>
            </div>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h4 className={sectionHeaderStyle}>Legal</h4>
            <div className="space-y-3.5">
              <a href="#" className={linkItemStyle}>Privacy Policy</a>
              <a href="#" className={linkItemStyle}>Terms & Conditions</a>
              <a href="#" className={linkItemStyle}>Accessibility Statement</a>
              <a href="#" className={linkItemStyle}>Transparency in Coverage</a>
              <a href="#" className={linkItemStyle}>California Privacy</a>
              <a href="#" className={linkItemStyle}>Human Rights and Supply Chain Transparency</a>
              <a href="#" className={linkItemStyle}>LVMH Human Rights Charter</a>
              <a href="#" className={linkItemStyle}>Product Safety</a>
              
              {/* Custom SVG Privacy Toggle */}
              <a href="#" className={`${linkItemStyle} flex items-center gap-1.5`}>
                <span>Your Privacy Choices</span>
                <svg className="w-6 h-3 inline-block" viewBox="0 0 30 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="30" height="14" rx="7" fill="#000000"/>
                  <circle cx="23" cy="7" r="5" fill="#FAFAFA"/>
                  <path d="M6 7L9 10L14 4" stroke="#FAFAFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Beautifully integrated Copyright Bar */}
        <div className="border-t border-neutral-200/60 pt-8 text-center bg-[#f4f0ea] -mx-6 md:-mx-16 lg:-mx-24 -mb-12 py-6">
          <h1 className="text-[11px] font-medium tracking-[0.15em] text-neutral-600 uppercase">
            Copyright © 2026 Blackstone and Co. All rights reserved.
          </h1>
        </div>

      </footer>
    </div>
  );
}

export default Footer;