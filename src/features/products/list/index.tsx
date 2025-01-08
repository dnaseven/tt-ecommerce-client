import { FC } from "react";
import { Product } from "../../../entities/product";
import { ProductsListItem } from "../list-item";
import styles from './styles.module.css';
import { Grid } from "@radix-ui/themes";

interface Props {
    products: Product[];
    onAdd: (product: Product) => void;
}

export const ProductsList: FC<Props> = ({ products, onAdd }) => {
    return (
        <Grid columns="repeat(auto-fit, minmax(310px, 1fr))" gap="5">
            {products.map(product => (
                <ProductsListItem key={product.id} product={product} onAdd={onAdd} />
            ))}
        </Grid>
    )
}