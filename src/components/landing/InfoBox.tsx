import React from "react";

type InfoBoxProps = {
  icon: React.ReactNode;
  title: string;
  value: string | number;
};

const InfoBox = ({ icon, title, value }: InfoBoxProps) => {
  return (
    <div className="bg-linear-to-br from-[#2a2f4a]/60 to-[#1e2337]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
      <div className="flex items-center justify-center gap-3">
        {icon}
        <div className="text-left">
          <div className="text-sm text-gray-400">{title}</div>
          <div className="text-white font-bold">{value}</div>
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
