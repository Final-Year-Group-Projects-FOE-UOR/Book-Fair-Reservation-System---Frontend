import { Button } from "@/components/ui/button";

type LoginButtonProps = {
  buttonText: string;
  onClick?: () => void;
};

const LoginButton = ({ buttonText, onClick }: LoginButtonProps) => {
  return (
    <Button
      type="button"
      variant={"default"}
      className="w-full bg-linear-to-r  from-pink-500 to-purple-600 text-white text-[16px] font-geist-sans py-3 rounded-xl h-[50px] font-normal  hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all shadow-lg shadow-pink-500/50"
      onClick={onClick}
    >
      {buttonText}
    </Button>
  );
};

export default LoginButton;
