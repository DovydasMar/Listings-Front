type ButtonProps = {
  children: string;
  onClick?: (e) => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
};
export default function Button({ children, onClick, type, className }: ButtonProps) {
  return (
    <button
      type={type}
      className={`${className} inline-block border border-blue-400 bg-blue-400 text-white px-4 py-1 rounded-md`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
