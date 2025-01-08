import { FC, MouseEventHandler } from "react";
import { Button, Strong, Text } from '@radix-ui/themes';
import { useSelector } from "react-redux";
import { selectCart } from "../store";
import { Product } from "../../../entities/product";
import { StringService } from "../../../services/string";
import { CartService } from "../service";
import styles from './styles.module.css';

export const CartContent: FC = () => {
    const cart = useSelector(selectCart);

    const isValid = (product: Product) => StringService.isValidUrl(product.images[0]);
    const getUrl = (product: Product) => isValid(product) ? product.images[0] : '/product-placeholder.png';
    const getAlt = (product: Product) => isValid(product) ? product.title : 'Basket';

    const handleIncrease: (product: Product) => MouseEventHandler<HTMLButtonElement> = (product) => () => {
        CartService.increaseQuantity(product.id)
    }

    const handleDecrease: (product: Product) => MouseEventHandler<HTMLButtonElement> = (product) => () => {
        CartService.decreaseQuantity(product.id)
    }

    const handleRemove: (product: Product) => MouseEventHandler<HTMLButtonElement> = (product) => () => {
        CartService.removeProductFromCart(product.id)
    }

    return (
        <>
            {cart.map((item) => (
                <div key={item.id} className={styles.wrapper}>
                    <div className={styles.imageWrapper}>
                        <img src={getUrl(item)} alt={getAlt(item)} data-valid={isValid(item)} />
                    </div>
                    <div className={styles.titleWrapper}>
                        <Text as="p" size="4" >
                            <Strong>
                                {item.title}
                            </Strong>
                        </Text>
                    </div>
                    <div className={styles.quantityWrapper}>
                        <Button color="gray" size="1" radius="full" onClick={handleIncrease(item)}>+</Button>
                        <Text as="p">{item.quantity}</Text>
                        <Button color="gray" size="1" radius="full" onClick={handleDecrease(item)} disabled={item.quantity === 1}>-</Button>
                    </div>
                    <div className={styles.priceWrapper}>
                        <Text as="p" size="4">
                            <Strong>
                                ${item.price}
                            </Strong>
                        </Text>
                        <div>
                            <Button size="1" variant="ghost" onClick={handleRemove(item)}>
                                Remove
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}