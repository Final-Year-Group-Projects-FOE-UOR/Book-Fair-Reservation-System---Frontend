import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash, AlertTriangle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { deleteMap } from "@/actions/mapActions";

type DeleteMapDialogProps = {
  setStallMapImage: React.Dispatch<
    React.SetStateAction<string | null | undefined>
  >;
};

const DeleteMapDialog = ({ setStallMapImage }: DeleteMapDialogProps) => {
  const [loading, setLoading] = useState(false);

  const handleDeleteMap = async () => {
    setLoading(true);
    const jwt = Cookies.get("jwt");
    if (!jwt) {
      toast.error("Authentication error. Please log in again.");
      setLoading(false);
      return;
    }
    try {
      const response = await deleteMap(jwt);
      if (response.success) {
        toast.success("Stall map removed successfully!");
        setStallMapImage(null);
        Cookies.remove("mapUrl");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="px-3 sm:px-4 py-2 rounded-lg font-semibold text-xs sm:text-sm cursor-pointer hover:scale-[1.02] transition-all duration-300 flex items-center gap-2 bg-gradient-to-r from-red-500/20 to-pink-600/20 border border-red-500/30 text-red-300 hover:from-red-500/30 hover:to-pink-600/30 hover:border-red-400/50 shadow-lg hover:shadow-red-500/20">
          <Trash className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
          Remove Map
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-gradient-to-br from-[#2a2f4a]/95 to-[#1e2337]/95 backdrop-blur-xl border border-red-500/20 shadow-2xl w-[calc(100%-2rem)] sm:max-w-md rounded-2xl p-5 sm:p-6 z-[1000]">
        <AlertDialogHeader className="mb-1">
          <AlertDialogTitle className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <div className="bg-gradient-to-br from-red-500 to-pink-600 p-1.5 sm:p-2 rounded-lg shrink-0">
              <Trash className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            Remove Stall Map
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-400 text-xs sm:text-sm mt-1">
            This action cannot be undone
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-3 sm:space-y-4 my-3 sm:my-4">
          {/* Warning Banner */}
          <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-xl p-3 sm:p-4 flex items-start gap-2.5 sm:gap-3">
            <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs sm:text-sm font-semibold text-red-300 mb-1">
                Warning: Permanent Action
              </p>
              <p className="text-xs text-gray-400">
                Deleting the stall map will permanently remove it from the
                system. You will need to upload a new one to replace it.
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-gray-400">
            Are you sure you want to remove the stall map?
          </p>
        </div>

        <AlertDialogFooter className="flex flex-row gap-2 sm:gap-3 mt-1 [&>*]:flex-1">
          <AlertDialogCancel className="h-auto py-2.5 sm:py-3 bg-gradient-to-r from-gray-600/20 to-gray-700/20 border border-gray-500/30 text-gray-300 rounded-xl text-xs sm:text-sm font-bold hover:from-gray-600/30 hover:to-gray-700/30 hover:border-gray-400/50 transition-all duration-300 hover:scale-[1.02] m-0">
            Cancel
          </AlertDialogCancel>
          <button
            onClick={handleDeleteMap}
            disabled={loading}
            className={`py-2.5 sm:py-3 border rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 group
      ${
        loading
          ? "bg-red-500/20 border-red-400/40 text-red-300 cursor-not-allowed opacity-60"
          : "bg-gradient-to-r from-red-500/20 to-pink-600/20 border-red-500/30 text-red-300 hover:from-red-500/30 hover:to-pink-600/30 hover:border-red-400/50 hover:shadow-lg hover:shadow-red-500/20 hover:scale-[1.02]"
      }`}
          >
            {loading ? (
              <>
                <span className="h-3.5 w-3.5 sm:h-4 sm:w-4 border-2 border-red-300 border-t-transparent rounded-full animate-spin shrink-0" />
                Deleting...
              </>
            ) : (
              <>
                <Trash className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform shrink-0" />
                Yes, Remove Map
              </>
            )}
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteMapDialog;
