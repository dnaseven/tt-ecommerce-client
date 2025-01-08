import { FC, ReactNode } from "react";
import styles from './styles.module.css';

interface Props {
    Header: ReactNode;
    Content: ReactNode;
    Footer: ReactNode;
}

export const CartTemplate: FC<Props> = ({ Header, Content, Footer }) => {
    return (
        <div className={styles.wrapper}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {Header}
            </div>
            <div>
                {Content}
            </div>
            <div style={{ display: 'flex', flexDirection: 'row-reverse', borderTop: '1px solid #eaeaea', padding: '20px 0' }}>
                {Footer}
            </div>
        </div>
    );
}