import { FC, ReactNode } from "react";
import styles from './styles.module.css';

interface Props {
    Header: ReactNode;
    Content: ReactNode;
    Footer: ReactNode;
}

export const Layout: FC<Props> = ({ Header, Content, Footer }) => {
    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>{Header}</header>
            <main className={styles.content}>{Content}</main>
            {/* <footer className={styles.footer}>{Footer}</footer> */}
        </div>
    );
}