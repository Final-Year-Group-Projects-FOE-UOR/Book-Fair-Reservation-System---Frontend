import React from 'react'

type AdminHeaderProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  children?: React.ReactNode;
};

const AdminHeader = ({ sidebarOpen, setSidebarOpen, children }: AdminHeaderProps) => {
  return (
    <div
      className={`w-full font-geist-sans bg-linear-to-br from-[#1a1f37] via-[#2d1b4e] to-[#1a1f37] fixed top-0 left-0 h-20  flex items-center  border-b border-white/10 px-8 z-80`}
    >
      <div
        className={`${
          sidebarOpen ? "pl-64" : "pl-20"
        } flex items-center justify-center h-full `}
      >
        {children}
      </div>
    </div>
  );
}

export default AdminHeader