import { Button } from "@/components/ui/button";

type LoginButtonProps = {
  buttonText: string;
  onClick?: () => void;
  loading?: boolean;
};

const LoginButton = ({ buttonText, onClick, loading }: LoginButtonProps) => {
  return (
    <Button

      type="submit"
      variant="default"
      disabled={loading}
      className="w-full bg-linear-to-r from-pink-500 to-purple-600 text-white text-[16px] font-geist-sans py-3 rounded-xl h-[50px] font-normal hover:from-pink-600 hover:to-purple-700 transform transition-all shadow-lg shadow-pink-500/50 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 hover:scale-105 flex items-center justify-center gap-2"
      onClick={onClick}
    >
      {loading ? (
        <>
          <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin shrink-0" />
          Please wait...
        </>
      ) : (
        buttonText
      )}
    </Button>
  );
};

export default LoginButton;
