type ButtonProps = {
  children: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
};
export default function Button({ children, onClick, type, className }: ButtonProps) {
  return (
    <button type={type} className={`${className}`} onClick={onClick}>
      {children}
    </button>
  );
}
