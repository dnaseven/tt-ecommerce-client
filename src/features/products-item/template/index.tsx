import { FC, Fragment } from "react";
import styles from './styles.module.css';
import { useParams } from "react-router";
import { AspectRatio, Badge, Box, Button, Inset, Strong, Text } from "@radix-ui/themes";
import { useSelector } from "react-redux";
import { selectProduct } from "../../products/store";
import { StringService } from "../../../services/string";
import { CartIcon } from "../../../components/cart-icon";
import { Product } from "../../../entities/product";
import { ProductsService } from "../../products/service";
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import { LoadingScreen } from "../../../components/loading-screen";

export const ProductsItemPageTemplate: FC = () => {
    const params = useParams();
    const id = Number(params.id);
    const product = useSelector(selectProduct(id));

    if (!product) {
        return <LoadingScreen />
    }

    const isValid = StringService.isValidUrl(product.images[0]);
    const url = isValid ? product.images[0] : '/product-placeholder.png';
    const alt = isValid ? product.title : 'Basket';

    const handleAddProductToCart = (product: Product) => () => {
        ProductsService.addProductToCart(product);
    }

    const randomRating = () => {
        const value = Math.floor(Math.random() * 6);

        return [1, 2, 3, 4, 5].map((star, idx) => ({
            id: `${idx}-${star}`,
            value: value >= star,
        }));
    }

    return (
        <div className={styles.wrapper}>
            <Text size="7" className={styles.titleWrapper}>
                <Strong>
                    {product.title}
                </Strong>
            </Text>

            <Box className={styles.imageWrapper}>
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
                                borderRadius: 4,
                            }}
                        />
                    </AspectRatio>
                </Inset>
            </Box>
            <Text className={styles.descriptionWrapper}>
                {product.description}
            </Text>

            <Box className={styles.ratingWrapper}>
                {randomRating().map((star) => (
                    <Fragment key={star.id}>
                        {star.value
                            ? <StarFilledIcon color="green" height={25} width={25} />
                            : <StarIcon color="green" height={25} width={25} />}
                    </Fragment>
                ))}
            </Box>

            <Text className={styles.categoryWrapper}>
                <Badge size="3">
                    {product.category.name}
                </Badge>
            </Text>
            <Text className={styles.priceWrapper}>
                <Strong>
                    ${product.price}
                </Strong>
            </Text>

            <Button size="3" variant="soft" onClick={handleAddProductToCart(product)} className={styles.button}>
                <CartIcon />
                Add To Cart
            </Button>

        </div>
    );
}