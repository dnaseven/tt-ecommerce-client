import { FC, ReactNode } from "react";
import styles from './styles.module.css';
import { Box, Grid, Spinner } from "@radix-ui/themes";
import { LoadingScreen } from "../../../components/loading-screen";

interface Props {
    loading: boolean;
    Filter: ReactNode;
    Content: ReactNode;
    CartDrawer: ReactNode;
}

export const ProductsPageTemplate: FC<Props> = ({ loading, Filter, Content, CartDrawer }) => {
    if (loading) {
        return (
            <LoadingScreen />
        )
    }

    return (
        <Grid gap="5" className={styles.wrapper}>
            <Box className={styles.filter}>{Filter}</Box>
            <Box className={styles.content}>{Content}</Box>
        </Grid>
    );
}