import { FC } from "react";
import { Product } from "../../../entities/product";
import styles from './styles.module.css';
import { StringService } from "../../../services/string";
import { AspectRatio, Badge, Box, Button, Card, Em, Inset, Strong, Text } from "@radix-ui/themes";
import { CartIcon } from "../../../components/cart-icon";
import { Link } from "react-router";

interface Props {
    product: Product;
    onAdd: (product: Product) => void;
}

export const ProductsListItem: FC<Props> = ({ product, onAdd }) => {
    const isValid = StringService.isValidUrl(product.images[0]);
    const url = isValid ? product.images[0] : '/product-placeholder.png';
    const alt = isValid ? product.title : 'Basket';

    return (
        <Box maxWidth="400px" minHeight="310px">
            <Card size="1" style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <Inset clip="padding-box" side="top" pb="current">
                    <AspectRatio ratio={1 / 1}>
                        <img
                            src={url}
                            alt={alt}
                            style={{
                                display: "block",
                                objectFit: isValid ? "cover" : "scale-down",
                                width: "100%",
                                height: "100%",
                                backgroundColor: "var(--gray-5)",
                            }}
                        />
                    </AspectRatio>
                </Inset>
                <Text as="p" size="3" mb="3" className={styles.titleWrapper}>
                    <Link to={`/products/${product.id}`}>
                        <Strong>{product.title}</Strong>
                    </Link>
                </Text>
                <Text as="p" size="2" mb="3">
                    <Badge>{product.category.name}</Badge>
                </Text>
                <Text as="p" size="3" color="gray" mb="3">
                    <Strong>${product.price}</Strong>
                </Text>
                <Button size="3" variant="soft" onClick={() => onAdd(product)}>
                    <CartIcon />
                    Add To Cart
                </Button>
            </Card>
        </Box>
    )
}