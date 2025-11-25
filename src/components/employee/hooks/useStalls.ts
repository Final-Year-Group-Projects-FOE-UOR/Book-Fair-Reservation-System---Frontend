import { useState, useEffect } from 'react';

interface Stall {
  id: string;
  isEmpty?: boolean;
  reserved: boolean;
  pending: boolean;
  status?: string | null;
  businessName?: string | null;
  email?: string | null;
  requestDate?: string | null;
  approvedDate?: string | null;
  size: 'small' | 'medium' | 'large';
}

interface Stats {
  total: number;
  reserved: number;
  available: number;
  pending: number;
}

export const useStalls = () => {
  const [stalls, setStalls] = useState<Stall[]>(() => {
    if (typeof window !== 'undefined') {
      const savedStalls = localStorage.getItem('tradeHallStalls');
      return savedStalls ? JSON.parse(savedStalls) : [];
    }
    return [];
  });

  // Listen for storage changes from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'tradeHallStalls' && e.newValue) {
        setStalls(JSON.parse(e.newValue));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Calculate statistics
  const stats: Stats = {
    total: stalls.filter(s => !s.isEmpty).length,
    reserved: stalls.filter(s => s.reserved).length,
    available: stalls.filter(s => !s.isEmpty && !s.reserved && !s.pending).length,
    pending: stalls.filter(s => s.pending).length
  };

  // Filter reservations and pending requests
  const reservations = stalls.filter(s => s.reserved && s.businessName);
  const pendingRequests = stalls.filter(s => s.pending && s.businessName);

  // Approve booking function
  const approveBooking = (stallId: string) => {
    if (window.confirm('Approve this booking request?')) {
      const updatedStalls = stalls.map(stall => {
        if (stall.id === stallId && stall.pending) {
          return {
            ...stall,
            reserved: true,
            pending: false,
            status: 'approved',
            approvedDate: new Date().toISOString()
          };
        }
        return stall;
      });
      
      setStalls(updatedStalls);
      localStorage.setItem('tradeHallStalls', JSON.stringify(updatedStalls));
      
      // Dispatch custom event for cross-component sync
      window.dispatchEvent(new CustomEvent('stallsUpdated', { 
        detail: { stalls: updatedStalls } 
      }));
      
      alert('✅ Booking request approved successfully!');
    }
  };

  // Reject booking function
  const rejectBooking = (stallId: string) => {
    if (window.confirm('Reject this booking request?\n\nThis will cancel the vendor\'s request.')) {
      const updatedStalls = stalls.map(stall => {
        if (stall.id === stallId && stall.pending) {
          return {
            ...stall,
            reserved: false,
            pending: false,
            status: null,
            businessName: null,
            email: null,
            requestDate: null
          };
        }
        return stall;
      });
      
      setStalls(updatedStalls);
      localStorage.setItem('tradeHallStalls', JSON.stringify(updatedStalls));
      
      // Dispatch custom event for cross-component sync
      window.dispatchEvent(new CustomEvent('stallsUpdated', { 
        detail: { stalls: updatedStalls } 
      }));
      
      alert('❌ Booking request rejected.');
    }
  };

  // Cancel/Delete reservation function
  const cancelReservation = (stallId: string) => {
    if (window.confirm('Cancel this reservation?\n\nThis will free up the stall for new bookings.')) {
      const updatedStalls = stalls.map(stall => {
        if (stall.id === stallId && stall.reserved) {
          return {
            ...stall,
            reserved: false,
            pending: false,
            status: null,
            businessName: null,
            email: null,
            requestDate: null,
            approvedDate: null
          };
        }
        return stall;
      });
      
      setStalls(updatedStalls);
      localStorage.setItem('tradeHallStalls', JSON.stringify(updatedStalls));
      
      window.dispatchEvent(new CustomEvent('stallsUpdated', { 
        detail: { stalls: updatedStalls } 
      }));
      
      alert('✅ Reservation cancelled successfully!');
    }
  };

  // Get stall by ID
  const getStallById = (stallId: string): Stall | undefined => {
    return stalls.find(s => s.id === stallId);
  };

  // Get stalls by size
  const getStallsBySize = (size: 'small' | 'medium' | 'large'): Stall[] => {
    return stalls.filter(s => s.size === size && !s.isEmpty);
  };

  // Get available stalls only
  const getAvailableStalls = (): Stall[] => {
    return stalls.filter(s => !s.isEmpty && !s.reserved && !s.pending);
  };

  return {
    stalls,
    stats,
    reservations,
    pendingRequests,
    approveBooking,
    rejectBooking,
    cancelReservation,
    getStallById,
    getStallsBySize,
    getAvailableStalls
  };
};