import styles from './Button.module.css';

interface ButtonProps {
  children: React.ReactNode,
  type?: "button" | "submit" | "reset" | undefined,
  onClick?: () => void
}

export default function Button ({ children, type = "button", onClick }: ButtonProps ) {
  return (
    <button onClick={onClick} type={type} className={styles.button}>
      {children}
    </button>
  )
}
