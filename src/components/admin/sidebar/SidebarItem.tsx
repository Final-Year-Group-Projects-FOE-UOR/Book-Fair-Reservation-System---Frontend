import React from 'react'

type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
  tag: string;
  sidebarOpen: boolean;
  superAdminTab: string;
  setSuperAdminTab: (tab: string) => void;
  onClick: () => void;
}

const SidebarItem = (props: SidebarItemProps) => {
  return (
    <button
      onClick={props.onClick}
      className={`w-full flex items-center gap-3 ${
        props.sidebarOpen
          ? "px-4 py-3 justify-left"
          : "px-2 py-3 justify-center"
      } rounded-xl transition ${
        props.superAdminTab === props.tag
          ? "bg-linear-to-r from-purple-500/20 to-pink-600/20 text-white border border-purple-500/30"
          : "text-gray-400 hover:text-white hover:bg-white/5"
      }`}
    >
      {props.icon}
      {props.sidebarOpen && <span className="font-semibold">{props.label}</span>}
    </button>
  );
}

export default SidebarItem