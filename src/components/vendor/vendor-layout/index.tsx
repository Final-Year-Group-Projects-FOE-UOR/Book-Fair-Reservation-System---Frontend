import React from 'react'
import VendorHeader from './Header';
import Tabs from './Tabs';

const VendorLayout = () => {
  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-[#1a1f37] via-[#2d1b4e] to-[#1a1f37] p-8 transition-opacity duration-500
        "opacity-100" relative overflow-hidden`}
    >
      <div className="background-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <VendorHeader
          stallMapImage={stallMapImage}
          useMapView={useMapView}
          setUseMapView={setUseMapView}
          vendorInfo={vendorInfo}
          handleVendorLogout={handleVendorLogout}
          bookingStep={bookingStep}
        />
        <Tabs
          vendorHomeTab={vendorHomeTab}
        />

       

        
       
      </div>
    </div>
  );
}

export default VendorLayout