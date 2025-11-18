
interface FloatingButtonProps {
  selectedStalls: (string | null)[];
  onClick: () => void;
}

const FloatingButton = ({selectedStalls,onClick}:FloatingButtonProps) => {
  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-4">
        <span className="font-bold">
          {selectedStalls.length} stall(s) selected
        </span>
        <button
          type="button"
          onClick={onClick}
          className="bg-white text-purple-600 px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition"
        >
          Review Selection
        </button>
      </div>
    </div>
  );
};

export default FloatingButton;
