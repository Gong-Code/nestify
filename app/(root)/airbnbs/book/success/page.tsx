import { Check } from "lucide-react";

const SuccessPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[--color-background]">
      <div className="p-8 rounded-lg flex flex-col md:flex-row items-center text-center md:text-left">
        <div className="w-16 h-16 rounded-full flex items-center justify-center border-4 border-[--color-primary] text-[--color-primary] mb-4 md:mb-0">
          <Check className="w-10 h-10" />
        </div>
        <p className="ml-0 md:ml-6 text-2xl md:text-4xl font-bold text-[--color-primary]">
          Payment Successful!
        </p>
      </div>
    </div>
  );
};

export default SuccessPage;
