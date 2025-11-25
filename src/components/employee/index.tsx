"use client";

import React, { useState, useEffect } from 'react';
import EmployeeLanding from '@/components/employee/landing';
import EmployeeLogin from '@/components/employee/login';
import EmployeeDashboard from '@/components/employee/dashboard';
import { useStalls } from '@/components/employee/hooks/useStalls';

// Add interface for employee type
interface Employee {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
}

const EmployeePortal = () => {
  const [currentView, setCurrentView] = useState('employee_landing');
  const [employeeTab, setEmployeeTab] = useState('requests');
  const [fadeIn, setFadeIn] = useState(false);
  
  const {
    stalls,
    stats,
    reservations,
    pendingRequests,
    approveBooking,
    rejectBooking
  } = useStalls();

  
  useEffect(() => {
    setFadeIn(false);
    const timer = setTimeout(() => setFadeIn(true), 50);
    return () => clearTimeout(timer);
  }, [currentView]);

  const handleEmployeeLogin = (email: string, password: string) => {
    const employee = employeeList.find((e: Employee) => e.email === email && e.password === password);
    if (employee) {
      setCurrentView('employee_dashboard');
      return true;
    }
    return false;
  };

  return (
    <div>
      <EmployeeLanding fadeIn={fadeIn} setCurrentView={setCurrentView} />
      {/* {currentView === "employee_landing" && (
        <EmployeeLanding fadeIn={fadeIn} setCurrentView={setCurrentView} />
      )}
      {currentView === "employee_login" && (
        <EmployeeLogin
          fadeIn={fadeIn}
          setCurrentView={setCurrentView}
          handleEmployeeLogin={handleEmployeeLogin}
        />
      )}
      {currentView === "employee_dashboard" && (
        <EmployeeDashboard
          fadeIn={fadeIn}
          setCurrentView={setCurrentView}
          employeeTab={employeeTab}
          setEmployeeTab={setEmployeeTab}
          stats={stats}
          stalls={stalls}
          pendingRequests={pendingRequests}
          reservations={reservations}
          approveBooking={approveBooking}
          rejectBooking={rejectBooking}
        />
      )} */}
    </div>
  );
};

export default EmployeePortal;