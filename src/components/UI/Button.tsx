type ButtonProps = {
  children: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  danger?: boolean;
};
export default function Button({ children, onClick, type, className, danger }: ButtonProps) {
  return (
    <button
      type={type}
      className={`${className} inline-block border  
      ${
        danger
          ? 'border-red-400 bg-red-500 text-white'
          : 'border-[#90AEB2] bg-[#90AEB2] text-[#0d1312]'
      }  px-4 py-1 rounded-md`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
