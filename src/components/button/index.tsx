import { FC } from "react";
import styles from "./styles.module.css";

interface Props {
    children: string;
    onClick: () => void;
}

export const Button: FC<Props> = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className={styles.button}>{children}</button>
  );
}