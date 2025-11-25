"use client";

import React, { useEffect, useState } from 'react'
import { Stall } from '@/components/vendor/types';
import Cookies from 'js-cookie';
import { getStalls } from '@/actions/stallActions';
import LoadingScreen from '@/components/common/loading';
import MapView from './map';

const StallAvailability = () => {
  const [stalls, setStalls] = useState<Stall[]>([]);
  const [selectedStalls, setSelectedStalls] = useState<(number | null)[]>([]);
  const [loading, setLoading] = useState(false);

  const getAllConfiguredStalls = async () => {
    const jwt = Cookies.get("jwt");
    if (!jwt) return;
    try {
      setLoading(true);
      const response = await getStalls(jwt);
      if (response.success) {
        const fetchedStalls = response.data;
        const configuredStalls = fetchedStalls.filter(
          (stall: Stall) => stall.mapMetadata?.configured === true,
        );
        setStalls(configuredStalls);
      }
    } catch (error) {
      console.log("An error occurred while fetching configured stalls:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      getAllConfiguredStalls();
    }, []);

  if(loading) {
    return <LoadingScreen/>
  }
  
  return (
    <div
      className={`min-h-[calc(100vh-80px)] bg-linear-to-br w-full font-geist-sans from-[#1a1f37] via-[#2d1b4e] to-[#1a1f37] p-8 opacity-100 relative overflow-hidden`}
    >
      <div className="w-full overflow-auto rounded-md">
        <MapView
          stallMapImage={Cookies.get("mapUrl") || null}
          stalls={stalls}
          selectedStalls={selectedStalls}
          setSelectedStalls={setSelectedStalls}
        />
      </div>
    </div>
  );
}

export default StallAvailability