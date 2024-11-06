import { Search } from "lucide-react";

type InputProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  id?: string;
  type?: string;
};

export const RegularInput = ({
  id,
  value,
  type,
  placeholder,
  onChange,
}: InputProps) => {
  return (
    <input
      type={type}
      id={id}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className="input w-full h-[2.1875rem] md:h-[2.5rem] rounded-lg outline outline-offset-2 outline-1 outline-[--color-primary] py-1.5 px-3 placeholder-opacity-30 text-opacity-30"
    />
  );
};

export const NavbarSearch = ({ value, onChange, placeholder }: InputProps) => {
  return (
    <div className="relative flex items-center">
      <span className="absolute left-2 rounded-full">
        <Search className="size-4 text-[--color-text-primary] cursor-pointer m-[0.4rem] md:m-2" />
      </span>
      <input
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Search..."}
        className="input w-[15.625rem] md:w-[21.875rem] h-[2.8125rem] md:h-[3.125rem] outline outline-offset-2 outline-1 outline-[--color-primary] rounded-lg py-1.5 pl-[3rem] pr-3 placeholder-opacity-30 text-opacity-30"
      />
    </div>
  );
};

export const LandingPageSearch = ({
  value,
  onChange,
  placeholder,
}: InputProps) => {
  return (
    <div className="relative flex items-center">
      <span className="absolute left-2 bg-[--color-primary] rounded-full">
        <Search className="size-4 text-[--color-text-secondary] cursor-pointer m-[0.4rem] md:m-2" />
      </span>
      <input
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Search..."}
        className="input w-[15.625rem] md:w-[21.875rem] h-[2.8125rem] md:h-[3.125rem] outline outline-offset-2 outline-1 outline-[--color-primary] rounded-lg py-1.5 pl-[3rem] pr-3 placeholder-opacity-30 text-opacity-30"
      />
    </div>
  );
};
