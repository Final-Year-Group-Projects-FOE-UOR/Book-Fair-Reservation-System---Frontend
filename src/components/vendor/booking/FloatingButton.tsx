interface FloatingButtonProps {
  selectedStalls: (number | null)[];
  onClick: () => void;
}

const FloatingButton = ({ selectedStalls, onClick }: FloatingButtonProps) => {
  return (
    <div className="fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] sm:w-auto max-w-sm sm:max-w-none px-0">
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-5 sm:px-8 py-3 sm:py-4 rounded-full shadow-2xl flex items-center justify-between sm:justify-start gap-3 sm:gap-4">
        <span className="font-bold text-sm sm:text-base whitespace-nowrap">
          {selectedStalls.length} stall{selectedStalls.length !== 1 ? "s" : ""}{" "}
          selected
        </span>
        <button
          type="button"
          onClick={onClick}
          className="bg-white cursor-pointer text-purple-600 px-4 sm:px-6 py-1.5 sm:py-2 rounded-full font-bold text-sm sm:text-base hover:bg-gray-100 transition whitespace-nowrap"
        >
          Review Selection
        </button>
      </div>
    </div>
  );
};

export default FloatingButton;
