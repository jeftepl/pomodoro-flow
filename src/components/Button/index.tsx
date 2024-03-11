import './Button.scss';

interface ButtonProps {
  children: React.ReactNode,
  type?: "button" | "submit" | "reset" | undefined,
  onClick?: () => void
}

export default function Button ({ children, type = "button", onClick }: ButtonProps ) {
  return (
    <button onClick={onClick} type={type} className="button">
      {children}
    </button>
  )
}
